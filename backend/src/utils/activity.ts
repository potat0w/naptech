import type { ActivityType, Prisma } from "@prisma/client";
import { prisma } from "../db/prisma.js";

export async function logActivity(data: {
  actorUserId?: string | null;
  type: ActivityType;
  entityType: string;
  entityId: string;
  message: string;
}) {
  return prisma.activityLog.create({ data });
}

export async function logAudit(data: {
  userId?: string | null;
  action: string;
  resource: string;
  resourceId?: string | null;
  ipAddress?: string | null;
  userAgent?: string | null;
  metadata?: Prisma.InputJsonValue;
}) {
  return prisma.auditLog.create({ data });
}
