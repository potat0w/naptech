import type { CaregiverProfile, User } from "@prisma/client";
import { prisma } from "../db/prisma.js";

export async function serializeCaregiverListItem(
  user: User & { caregiverProfile: CaregiverProfile | null }
) {
  const activeAssignments = await prisma.assignment.count({
    where: {
      caregiverUserId: user.id,
      deletedAt: null,
      status: { in: ["scheduled", "in_progress", "pending_report"] },
    },
  });

  const completedReports = await prisma.careReport.count({
    where: {
      caregiverUserId: user.id,
      status: { in: ["submitted", "reviewed"] },
    },
  });

  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone ?? "",
    status: user.caregiverProfile?.accountStatus ?? "inactive",
    activeAssignments,
    completedReports,
  };
}
