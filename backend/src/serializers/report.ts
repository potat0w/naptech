import type { AIProcessedReport, CareReport, User } from "@prisma/client";
import { reportStatusToApi } from "../utils/mappers.js";

export function serializeReport(
  report: CareReport & {
    caregiver: User;
    assignment: { clientDisplayName: string };
    aiProcessed: AIProcessedReport | null;
  }
) {
  return {
    id: report.id,
    assignmentId: report.assignmentId,
    caregiverId: report.caregiverUserId,
    caregiverName: `${report.caregiver.firstName} ${report.caregiver.lastName}`,
    clientName: report.assignment.clientDisplayName,
    submittedAt: report.submittedAt.toISOString(),
    rawNotes: report.rawNotes,
    organizedReport: report.aiProcessed?.structuredReport ?? "",
    status: reportStatusToApi(report.status),
    preview: report.preview ?? "",
  };
}
