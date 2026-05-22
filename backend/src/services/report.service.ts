import type { ReportStatus } from "@prisma/client";
import { env } from "../config/env.js";
import { prisma } from "../db/prisma.js";
import { logActivity } from "../utils/activity.js";
import { buildPreview, generateOrganizedReport } from "../utils/ai-report.js";
import { badRequest, conflict, notFound } from "../utils/errors.js";
import { serializeAssignment } from "../serializers/assignment.js";
import { serializeReport } from "../serializers/report.js";

const assignmentInclude = {
  tasks: true,
  caregiver: true,
} as const;

const reportInclude = {
  caregiver: true,
  assignment: true,
  aiProcessed: true,
} as const;

const REPORTABLE_ASSIGNMENT_STATUSES = [
  "scheduled",
  "in_progress",
  "pending_report",
] as const;

function startOfTodayUtc() {
  const d = new Date();
  d.setUTCHours(0, 0, 0, 0);
  return d;
}

export async function listReportableAssignments(caregiverUserId: string) {
  const today = startOfTodayUtc();

  const items = await prisma.assignment.findMany({
    where: {
      caregiverUserId,
      deletedAt: null,
      status: { in: [...REPORTABLE_ASSIGNMENT_STATUSES] },
      reports: { none: {} },
    },
    include: assignmentInclude,
    orderBy: [{ shiftDate: "desc" }, { shiftStart: "asc" }],
  });

  return items
    .filter((a) => {
      if (a.status !== "scheduled") return true;
      const visitDate = new Date(a.shiftDate);
      visitDate.setUTCHours(0, 0, 0, 0);
      return visitDate.getTime() <= today.getTime();
    })
    .map(serializeAssignment);
}

export async function submitReport(
  caregiverUserId: string,
  data: { assignmentId: string; rawNotes: string }
) {
  const assignment = await prisma.assignment.findFirst({
    where: {
      id: data.assignmentId,
      caregiverUserId,
      deletedAt: null,
    },
    include: { reports: { select: { id: true } } },
  });
  if (!assignment) throw notFound("Assignment not found.");

  if (assignment.status === "cancelled") {
    throw badRequest("You cannot submit a report for a cancelled visit.");
  }

  if (assignment.status === "completed") {
    throw badRequest("A report has already been submitted for this home visit.");
  }

  if (
    !REPORTABLE_ASSIGNMENT_STATUSES.includes(
      assignment.status as (typeof REPORTABLE_ASSIGNMENT_STATUSES)[number]
    )
  ) {
    throw badRequest("You can only submit a report for a home visit you have been assigned to.");
  }

  if (assignment.status === "scheduled") {
    const visitDate = new Date(assignment.shiftDate);
    visitDate.setUTCHours(0, 0, 0, 0);
    if (visitDate.getTime() > startOfTodayUtc().getTime()) {
      throw badRequest("Submit your report after the scheduled home visit has taken place.");
    }
  }

  if (assignment.reports.length > 0) {
    throw conflict("A report has already been submitted for this home visit.");
  }

  const { text: structuredReport, provider: aiProviderUsed } =
    await generateOrganizedReport(data.rawNotes);
  const preview = buildPreview(structuredReport);

  const report = await prisma.careReport.create({
    data: {
      assignmentId: data.assignmentId,
      caregiverUserId,
      rawNotes: data.rawNotes.trim(),
      preview,
      status: "submitted",
      aiProcessed: {
        create: {
          structuredReport,
          summary: structuredReport.split("\n")[0] ?? null,
          aiProvider: aiProviderUsed,
        },
      },
    },
    include: reportInclude,
  });

  await prisma.assignment.update({
    where: { id: data.assignmentId },
    data: { status: "completed" },
  });

  await logActivity({
    actorUserId: caregiverUserId,
    type: "report",
    entityType: "care_report",
    entityId: report.id,
    message: `${report.caregiver.firstName} ${report.caregiver.lastName} submitted a report for ${report.assignment.clientDisplayName}`,
  });

  return serializeReport(report);
}

export async function listReports(filters: {
  caregiverUserId?: string;
  status?: ReportStatus;
  date?: string;
}) {
  const where: Record<string, unknown> = {};
  if (filters.caregiverUserId) where.caregiverUserId = filters.caregiverUserId;
  if (filters.status) where.status = filters.status;
  if (filters.date) {
    where.submittedAt = {
      gte: new Date(`${filters.date}T00:00:00.000Z`),
      lt: new Date(`${filters.date}T23:59:59.999Z`),
    };
  }

  const reports = await prisma.careReport.findMany({
    where,
    include: reportInclude,
    orderBy: { submittedAt: "desc" },
  });

  return reports.map(serializeReport);
}

export async function getReport(id: string) {
  const report = await prisma.careReport.findUnique({
    where: { id },
    include: reportInclude,
  });
  if (!report) throw notFound("Report not found.");
  return serializeReport(report);
}

export async function getReportForCaregiver(id: string, caregiverUserId: string) {
  const report = await prisma.careReport.findFirst({
    where: { id, caregiverUserId },
    include: reportInclude,
  });
  if (!report) throw notFound("Report not found.");
  return serializeReport(report);
}

export async function reviewReport(id: string, reviewerId: string) {
  const report = await prisma.careReport.update({
    where: { id },
    data: {
      status: "reviewed",
      reviewedAt: new Date(),
      reviewedByUserId: reviewerId,
    },
    include: reportInclude,
  });
  return serializeReport(report);
}
