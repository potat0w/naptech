import type { AssignmentStatus } from "@prisma/client";
import { prisma } from "../db/prisma.js";
import { addDaysToIso, dateOnlyToIso, localTodayIso } from "../utils/dates.js";

const ACTIVE_STATUSES: AssignmentStatus[] = [
  "scheduled",
  "in_progress",
  "pending_report",
];

export async function getCaregiverDashboard(caregiverUserId: string) {
  const today = localTodayIso();
  const weekEnd = addDaysToIso(today, 7);

  const myAssignments = await prisma.assignment.findMany({
    where: {
      caregiverUserId,
      deletedAt: null,
      status: { in: ACTIVE_STATUSES },
    },
    select: { shiftDate: true },
  });

  const dates = myAssignments.map((a) => dateOnlyToIso(a.shiftDate));

  const dueTodayOrOverdue = dates.filter((d) => d <= today).length;
  const upcoming = dates.filter((d) => d > today && d <= weekEnd).length;
  const activeVisits = dates.length;

  const myReports = await prisma.careReport.findMany({
    where: { caregiverUserId },
    select: { status: true },
  });

  const pendingReports = myReports.filter((r) => r.status === "pending").length;
  const completedReports = myReports.filter((r) => r.status !== "pending").length;

  return {
    todayHomes: dueTodayOrOverdue,
    upcoming,
    activeVisits,
    pendingReports,
    completedReports,
  };
}

export async function updateCaregiverPhone(userId: string, phone: string) {
  await prisma.user.update({
    where: { id: userId },
    data: { phone: phone.trim() },
  });
  return { ok: true };
}
