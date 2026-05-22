import type { AssignmentStatus } from "@prisma/client";
import { prisma } from "../db/prisma.js";
import { logActivity } from "../utils/activity.js";
import { badRequest, conflict, notFound } from "../utils/errors.js";
import { formatServiceAddress } from "../serializers/booking.js";
import { serializeAssignment } from "../serializers/assignment.js";

const assignmentInclude = {
  tasks: true,
  caregiver: true,
} as const;

const ACTIVE_ASSIGNMENT_STATUSES: AssignmentStatus[] = [
  "scheduled",
  "in_progress",
  "pending_report",
];

const CANCELLABLE_STATUSES: AssignmentStatus[] = ["scheduled", "in_progress"];

const DEFAULT_ASSIGNMENT_TASKS = [
  "Medication reminder",
  "Personal care",
  "Mobility support",
  "Wellbeing check-in",
];

function resolveTaskDescriptions(tasks: string[]) {
  const trimmed = tasks.map((t) => t.trim()).filter(Boolean);
  return trimmed.length > 0 ? trimmed : DEFAULT_ASSIGNMENT_TASKS;
}

async function syncCareRequestStatus(careRequestId: string | null) {
  if (!careRequestId) return;
  const activeCount = await prisma.assignment.count({
    where: {
      careRequestId,
      deletedAt: null,
      status: { in: ACTIVE_ASSIGNMENT_STATUSES },
    },
  });
  if (activeCount === 0) {
    await prisma.careRequest.update({
      where: { id: careRequestId },
      data: { status: "matched" },
    });
  }
}

async function assertVisitNotAlreadyAssigned(
  data: {
    clientName: string;
    serviceAddress: string;
    shiftDate: string;
    shiftStart: string;
    shiftEnd: string;
    careRequestId?: string;
  },
  excludeAssignmentId?: string
) {
  const shiftDate = new Date(data.shiftDate);
  const baseWhere = {
    deletedAt: null,
    status: { in: ACTIVE_ASSIGNMENT_STATUSES },
    ...(excludeAssignmentId ? { id: { not: excludeAssignmentId } } : {}),
  };

  if (data.careRequestId) {
    const byBooking = await prisma.assignment.findFirst({
      where: { ...baseWhere, careRequestId: data.careRequestId },
      include: { caregiver: true },
    });
    if (byBooking) {
      throw conflict(
        `This care request is already assigned to ${byBooking.caregiver.firstName} ${byBooking.caregiver.lastName}. Cancel that assignment before assigning another caregiver.`
      );
    }
  }

  const byVisit = await prisma.assignment.findFirst({
    where: {
      ...baseWhere,
      clientDisplayName: { equals: data.clientName.trim(), mode: "insensitive" },
      serviceAddress: { equals: data.serviceAddress.trim(), mode: "insensitive" },
      shiftDate,
      shiftStart: data.shiftStart,
      shiftEnd: data.shiftEnd,
    },
    include: { caregiver: true },
  });

  if (byVisit) {
    throw conflict(
      `This home visit is already assigned to ${byVisit.caregiver.firstName} ${byVisit.caregiver.lastName}. Cancel that assignment or reassign it instead of creating a duplicate.`
    );
  }
}

export async function createAssignment(
  adminId: string,
  data: {
    caregiverUserId: string;
    clientName: string;
    serviceAddress: string;
    shiftDate: string;
    shiftStart: string;
    shiftEnd: string;
    priority: string;
    tasks: string[];
    careRequestId?: string;
    clientUserId?: string;
  }
) {
  const caregiver = await prisma.user.findFirst({
    where: {
      id: data.caregiverUserId,
      role: "caregiver",
      deletedAt: null,
      isActive: true,
    },
    include: { caregiverProfile: true },
  });

  if (!caregiver?.caregiverProfile || caregiver.caregiverProfile.accountStatus !== "active") {
    throw badRequest("Caregiver is not active.");
  }

  await assertVisitNotAlreadyAssigned(data);

  const assignment = await prisma.assignment.create({
    data: {
      caregiverUserId: data.caregiverUserId,
      assignedByUserId: adminId,
      clientUserId: data.clientUserId ?? null,
      careRequestId: data.careRequestId ?? null,
      clientDisplayName: data.clientName.trim(),
      serviceAddress: data.serviceAddress.trim(),
      shiftDate: new Date(data.shiftDate),
      shiftStart: data.shiftStart,
      shiftEnd: data.shiftEnd,
      priority: data.priority as "low" | "medium" | "high",
      status: "scheduled",
      tasks: {
        create: resolveTaskDescriptions(data.tasks).map((description, sortOrder) => ({
          description,
          sortOrder,
        })),
      },
    },
    include: assignmentInclude,
  });

  if (data.careRequestId) {
    await prisma.careRequest.update({
      where: { id: data.careRequestId },
      data: { status: "assigned" },
    });
  }

  await logActivity({
    actorUserId: adminId,
    type: "assignment",
    entityType: "assignment",
    entityId: assignment.id,
    message: `New assignment created for ${caregiver.firstName} ${caregiver.lastName} — ${assignment.clientDisplayName}`,
  });

  return serializeAssignment(assignment);
}

export async function listAssignments(filters: {
  caregiverUserId?: string;
  status?: AssignmentStatus;
  date?: string;
}) {
  const where: Record<string, unknown> = { deletedAt: null };
  if (filters.caregiverUserId) where.caregiverUserId = filters.caregiverUserId;
  if (filters.status) where.status = filters.status;
  if (filters.date) where.shiftDate = new Date(filters.date);

  const items = await prisma.assignment.findMany({
    where,
    include: assignmentInclude,
    orderBy: [{ shiftDate: "asc" }, { shiftStart: "asc" }],
  });

  return items.map(serializeAssignment);
}

export async function getAssignmentForCaregiver(id: string, caregiverUserId: string) {
  const assignment = await prisma.assignment.findFirst({
    where: { id, caregiverUserId, deletedAt: null },
    include: assignmentInclude,
  });
  if (!assignment) throw notFound("Assignment not found.");
  return serializeAssignment(assignment);
}

export async function updateAssignmentStatus(
  id: string,
  caregiverUserId: string,
  status: AssignmentStatus
) {
  const assignment = await prisma.assignment.findFirst({
    where: { id, caregiverUserId, deletedAt: null },
  });
  if (!assignment) throw notFound("Assignment not found.");

  const updated = await prisma.assignment.update({
    where: { id },
    data: { status },
    include: assignmentInclude,
  });

  return serializeAssignment(updated);
}

export async function matchBookingToAssignment(
  adminId: string,
  careRequestId: string,
  assignmentData: Omit<Parameters<typeof createAssignment>[1], "careRequestId">
) {
  const booking = await prisma.careRequest.findFirst({
    where: { id: careRequestId, deletedAt: null },
    include: { user: true },
  });
  if (!booking) throw notFound("Booking request not found.");

  const clientName =
    assignmentData.clientName?.trim() ||
    booking.patientLabel ||
    `${booking.user.firstName} ${booking.user.lastName}`;

  const serviceAddress =
    assignmentData.serviceAddress?.trim() || formatServiceAddress(booking);

  const shiftDate =
    assignmentData.shiftDate ||
    (booking.preferredDate
      ? booking.preferredDate.toISOString().slice(0, 10)
      : new Date().toISOString().slice(0, 10));

  return createAssignment(adminId, {
    ...assignmentData,
    clientName,
    serviceAddress,
    shiftDate,
    careRequestId,
    clientUserId: booking.userId,
  });
}

export async function cancelAssignment(adminId: string, assignmentId: string) {
  const assignment = await prisma.assignment.findFirst({
    where: { id: assignmentId, deletedAt: null },
    include: assignmentInclude,
  });
  if (!assignment) throw notFound("Assignment not found.");

  if (assignment.status === "cancelled") {
    return serializeAssignment(assignment);
  }

  if (!CANCELLABLE_STATUSES.includes(assignment.status)) {
    throw badRequest("Only scheduled or in-progress visits can be cancelled.");
  }

  const updated = await prisma.assignment.update({
    where: { id: assignmentId },
    data: { status: "cancelled" },
    include: assignmentInclude,
  });

  await syncCareRequestStatus(assignment.careRequestId);

  await logActivity({
    actorUserId: adminId,
    type: "assignment",
    entityType: "assignment",
    entityId: assignment.id,
    message: `Assignment cancelled for ${assignment.caregiver.firstName} ${assignment.caregiver.lastName} — ${assignment.clientDisplayName}`,
  });

  return serializeAssignment(updated);
}

export async function reassignAssignment(
  adminId: string,
  assignmentId: string,
  newCaregiverUserId: string
) {
  const assignment = await prisma.assignment.findFirst({
    where: { id: assignmentId, deletedAt: null },
    include: { tasks: true, caregiver: true },
  });
  if (!assignment) throw notFound("Assignment not found.");

  if (assignment.status === "cancelled") {
    throw badRequest("This assignment is already cancelled.");
  }

  if (!CANCELLABLE_STATUSES.includes(assignment.status)) {
    throw badRequest("Only scheduled or in-progress visits can be reassigned.");
  }

  if (assignment.caregiverUserId === newCaregiverUserId) {
    throw badRequest("This visit is already assigned to that caregiver.");
  }

  await prisma.assignment.update({
    where: { id: assignmentId },
    data: { status: "cancelled" },
  });

  await syncCareRequestStatus(assignment.careRequestId);

  const tasks = assignment.tasks
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((t) => t.description);

  const replacement = await createAssignment(adminId, {
    caregiverUserId: newCaregiverUserId,
    clientName: assignment.clientDisplayName,
    serviceAddress: assignment.serviceAddress,
    shiftDate: assignment.shiftDate.toISOString().slice(0, 10),
    shiftStart: assignment.shiftStart,
    shiftEnd: assignment.shiftEnd,
    priority: assignment.priority,
    tasks,
    careRequestId: assignment.careRequestId ?? undefined,
    clientUserId: assignment.clientUserId ?? undefined,
  });

  await logActivity({
    actorUserId: adminId,
    type: "assignment",
    entityType: "assignment",
    entityId: assignment.id,
    message: `Visit reassigned from ${assignment.caregiver.firstName} ${assignment.caregiver.lastName} to ${replacement.caregiverName} — ${assignment.clientDisplayName}`,
  });

  return replacement;
}
