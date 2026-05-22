import type { CareRequestStatus } from "@prisma/client";
import { prisma } from "../db/prisma.js";
import { logActivity } from "../utils/activity.js";
import { notFound } from "../utils/errors.js";
import {
  careForFromApi,
  patientLabel,
} from "../utils/mappers.js";
import {
  formatServiceAddress,
  serializeAdminBooking,
  serializeBooking,
} from "../serializers/booking.js";
import { sendBookingNotificationEmail } from "../utils/email.js";
import { smtpConfigured } from "../config/env.js";

export async function createBooking(
  userId: string,
  data: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    postcode: string;
    careFor: string;
    preferredDate?: string;
    careNotes?: string;
  }
) {
  const user = await prisma.user.findFirst({
    where: { id: userId, deletedAt: null, role: "client" },
  });
  if (!user) throw notFound("User not found.");

  const careFor = careForFromApi(data.careFor);

  await prisma.userAddress.upsert({
    where: { userId },
    create: {
      userId,
      addressLine1: data.addressLine1,
      addressLine2: data.addressLine2 || null,
      city: data.city,
      postcode: data.postcode,
    },
    update: {
      addressLine1: data.addressLine1,
      addressLine2: data.addressLine2 || null,
      city: data.city,
      postcode: data.postcode,
    },
  });

  const request = await prisma.careRequest.create({
    data: {
      userId,
      careFor,
      patientLabel: patientLabel(careFor, user.firstName, user.lastName),
      addressLine1: data.addressLine1,
      addressLine2: data.addressLine2 || null,
      city: data.city,
      postcode: data.postcode,
      preferredDate: data.preferredDate ? new Date(data.preferredDate) : null,
      careNotes: data.careNotes || null,
      status: "pending",
    },
  });

  await logActivity({
    actorUserId: userId,
    type: "booking",
    entityType: "care_request",
    entityId: request.id,
    message: `${user.firstName} ${user.lastName} submitted a care booking request`,
  });

  if (smtpConfigured()) {
    try {
      await sendBookingNotificationEmail({
        clientName: request.patientLabel,
        email: user.email,
        phone: user.phone ?? "",
        address: formatServiceAddress(request),
        careNotes: request.careNotes ?? undefined,
      });
    } catch (err) {
      console.error("Failed to send booking notification email:", err);
    }
  }

  return serializeBooking(request, user);
}

export async function listBookingsForUser(userId: string) {
  const user = await prisma.user.findFirst({ where: { id: userId, deletedAt: null } });
  if (!user) throw notFound("User not found.");

  const requests = await prisma.careRequest.findMany({
    where: { userId, deletedAt: null },
    orderBy: { createdAt: "desc" },
  });

  return requests.map((r) => serializeBooking(r, user));
}

export async function listBookingsForAdmin(status?: string) {
  let statusWhere: CareRequestStatus | { in: CareRequestStatus[] } | undefined;
  if (status === "pending") {
    statusWhere = { in: ["pending", "matched"] };
  } else if (status) {
    statusWhere = status as CareRequestStatus;
  }

  const requests = await prisma.careRequest.findMany({
    where: {
      deletedAt: null,
      ...(statusWhere !== undefined ? { status: statusWhere } : {}),
    },
    include: {
      user: true,
      assignments: {
        where: {
          deletedAt: null,
          status: { not: "cancelled" },
        },
        orderBy: { createdAt: "desc" },
        take: 1,
        include: { caregiver: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return requests.map(serializeAdminBooking);
}

export async function getBookingForAdmin(bookingId: string) {
  const request = await prisma.careRequest.findFirst({
    where: { id: bookingId, deletedAt: null },
    include: {
      user: true,
      assignments: {
        where: { deletedAt: null },
        orderBy: { createdAt: "desc" },
        include: { caregiver: true },
      },
    },
  });
  if (!request) throw notFound("Booking request not found.");
  return serializeAdminBooking({
    ...request,
    assignments: request.assignments.filter((a) => a.status !== "cancelled").slice(0, 1),
  });
}

export async function updateClientProfile(
  userId: string,
  data: Partial<{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    postcode: string;
  }>
) {
  const { conflict } = await import("../utils/errors.js");

  if (data.email !== undefined) {
    const normalized = data.email.trim().toLowerCase();
    const existing = await prisma.user.findFirst({
      where: { email: normalized, NOT: { id: userId } },
    });
    if (existing) throw conflict("An account with this email already exists.");
  }

  const userUpdate: Record<string, string> = {};
  if (data.firstName !== undefined) userUpdate.firstName = data.firstName;
  if (data.lastName !== undefined) userUpdate.lastName = data.lastName;
  if (data.phone !== undefined) userUpdate.phone = data.phone;
  if (data.email !== undefined) userUpdate.email = data.email.trim().toLowerCase();

  if (Object.keys(userUpdate).length > 0) {
    await prisma.user.update({
      where: { id: userId },
      data: userUpdate,
    });
  }

  const hasAddressChange =
    data.addressLine1 !== undefined ||
    data.addressLine2 !== undefined ||
    data.city !== undefined ||
    data.postcode !== undefined;

  if (hasAddressChange) {
    const existing = await prisma.userAddress.findUnique({ where: { userId } });
    const addressLine1 = data.addressLine1 ?? existing?.addressLine1 ?? "";
    const addressLine2 =
      data.addressLine2 !== undefined ? data.addressLine2 : (existing?.addressLine2 ?? "");
    const city = data.city ?? existing?.city ?? "";
    const postcode = data.postcode ?? existing?.postcode ?? "";

    await prisma.userAddress.upsert({
      where: { userId },
      create: {
        userId,
        addressLine1,
        addressLine2: addressLine2 || null,
        city,
        postcode,
      },
      update: {
        ...(data.addressLine1 !== undefined && { addressLine1: data.addressLine1 }),
        ...(data.addressLine2 !== undefined && {
          addressLine2: data.addressLine2 || null,
        }),
        ...(data.city !== undefined && { city: data.city }),
        ...(data.postcode !== undefined && { postcode: data.postcode }),
      },
    });
  }

  const refreshed = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    include: { address: true },
  });

  const { serializeUserMe } = await import("../serializers/user.js");
  return serializeUserMe(refreshed);
}
