import { prisma } from "../db/prisma.js";
import { hashPassword } from "../utils/password.js";
import { logActivity } from "../utils/activity.js";
import { conflict } from "../utils/errors.js";
import { serializeCaregiverListItem } from "../serializers/caregiver.js";

export async function getDashboardStats() {
  const [activeCaregivers, activeAssignments, totalReports, pendingReports, pendingBookings] =
    await Promise.all([
      prisma.user.count({
        where: {
          role: "caregiver",
          deletedAt: null,
          caregiverProfile: { accountStatus: "active" },
        },
      }),
      prisma.assignment.count({
        where: {
          deletedAt: null,
          status: { in: ["scheduled", "in_progress", "pending_report"] },
        },
      }),
      prisma.careReport.count(),
      prisma.careReport.count({ where: { status: "pending" } }),
      prisma.careRequest.count({
        where: {
          deletedAt: null,
          status: { in: ["pending", "matched"] },
        },
      }),
    ]);

  return {
    activeCaregivers,
    activeAssignments,
    totalReports,
    pendingReports,
    pendingBookings,
  };
}

export async function listCaregivers(query?: string) {
  const users = await prisma.user.findMany({
    where: {
      role: "caregiver",
      deletedAt: null,
      ...(query
        ? {
            OR: [
              { firstName: { contains: query, mode: "insensitive" } },
              { lastName: { contains: query, mode: "insensitive" } },
              { email: { contains: query, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    include: { caregiverProfile: true },
    orderBy: { lastName: "asc" },
  });

  return Promise.all(users.map(serializeCaregiverListItem));
}

export async function createCaregiver(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}) {
  const email = data.email.trim().toLowerCase();
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw conflict("Email already in use.");

  const passwordHash = await hashPassword(data.password);
  const user = await prisma.user.create({
    data: {
      role: "caregiver",
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      email,
      phone: data.phone.trim(),
      emailVerifiedAt: new Date(),
      credential: { create: { passwordHash } },
      caregiverProfile: { create: { accountStatus: "active" } },
    },
    include: { caregiverProfile: true },
  });

  await logActivity({
    type: "caregiver",
    entityType: "user",
    entityId: user.id,
    message: `Caregiver profile created — ${user.firstName} ${user.lastName}`,
  });

  return serializeCaregiverListItem(user);
}

export async function updateCaregiverStatus(userId: string, status: "active" | "inactive") {
  await prisma.caregiverProfile.update({
    where: { userId },
    data: { accountStatus: status },
  });
  return { ok: true };
}

export async function getRecentActivity(limit = 20) {
  return prisma.activityLog.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}
