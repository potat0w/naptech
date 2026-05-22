import type { Assignment, CareRequest, User } from "@prisma/client";
import { careForToApi, careRequestStatusToApi } from "../utils/mappers.js";

export function adminCareRequestStatusToApi(status: CareRequest["status"]) {
  return status;
}

export function formatServiceAddress(request: CareRequest) {
  const line2 = request.addressLine2 ? `, ${request.addressLine2}` : "";
  return `${request.addressLine1}${line2}, ${request.city} ${request.postcode}`;
}

export function serializeBooking(request: CareRequest, user: User) {
  return {
    id: request.id,
    userId: request.userId,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    telephone: user.phone ?? "",
    addressLine1: request.addressLine1,
    addressLine2: request.addressLine2 ?? "",
    city: request.city,
    postcode: request.postcode,
    careFor: careForToApi(request.careFor),
    preferredDate: request.preferredDate
      ? request.preferredDate.toISOString().slice(0, 10)
      : "",
    careNotes: request.careNotes ?? "",
    status: careRequestStatusToApi(request.status),
    createdAt: request.createdAt.toISOString(),
  };
}

export function serializeAdminBooking(
  request: CareRequest & {
    user: User;
    assignments: (Assignment & { caregiver: User })[];
  }
) {
  const activeAssignment = request.assignments[0] ?? null;
  return {
    ...serializeBooking(request, request.user),
    clientName: request.patientLabel,
    serviceAddress: formatServiceAddress(request),
    status: adminCareRequestStatusToApi(request.status),
    assignedCaregiverId: activeAssignment?.caregiverUserId ?? null,
    assignedCaregiverName: activeAssignment
      ? `${activeAssignment.caregiver.firstName} ${activeAssignment.caregiver.lastName}`
      : null,
    canAssign:
      request.status === "pending" ||
      request.status === "matched" ||
      (request.status === "assigned" && !activeAssignment),
  };
}
