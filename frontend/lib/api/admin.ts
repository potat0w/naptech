import { apiRequest } from "./client";
import type {
  AdminBooking,
  Assignment,
  Caregiver,
  CareReport,
  Inquiry,
} from "@/lib/portal/types";

export async function fetchAdminDashboard() {
  return apiRequest<{
    stats: {
      activeCaregivers: number;
      activeAssignments: number;
      totalReports: number;
      pendingReports: number;
      pendingBookings: number;
    };
  }>("/admin/dashboard", { auth: true });
}

export async function fetchAdminBookings(status?: string) {
  const q = status ? `?status=${encodeURIComponent(status)}` : "";
  return apiRequest<{ bookings: AdminBooking[] }>(`/admin/bookings${q}`, {
    auth: true,
  });
}

export async function fetchAdminBooking(id: string) {
  return apiRequest<{ booking: AdminBooking }>(`/admin/bookings/${id}`, {
    auth: true,
  });
}

export async function matchBookingToCaregiver(
  bookingId: string,
  data: {
    caregiverUserId: string;
    clientName: string;
    serviceAddress: string;
    shiftDate: string;
    shiftStart: string;
    shiftEnd: string;
    priority: string;
    tasks: string[];
  }
) {
  return apiRequest<{ assignment: Assignment }>(`/admin/bookings/${bookingId}/match`, {
    method: "POST",
    auth: true,
    body: data,
  });
}

export async function fetchAdminActivity(limit = 20) {
  return apiRequest<{
    activity: { id: string; message: string; time: string; type: string }[];
  }>(`/admin/activity?limit=${limit}`, { auth: true });
}

export async function fetchCaregivers(q?: string) {
  const query = q ? `?q=${encodeURIComponent(q)}` : "";
  return apiRequest<{ caregivers: Caregiver[] }>(`/admin/caregivers${query}`, {
    auth: true,
  });
}

export async function createCaregiver(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}) {
  return apiRequest<{ caregiver: Caregiver }>("/admin/caregivers", {
    method: "POST",
    auth: true,
    body: data,
  });
}

export async function fetchAssignments(params?: {
  caregiverId?: string;
  status?: string;
  date?: string;
}) {
  const search = new URLSearchParams();
  if (params?.caregiverId) search.set("caregiverId", params.caregiverId);
  if (params?.status) search.set("status", params.status);
  if (params?.date) search.set("date", params.date);
  const q = search.toString();
  return apiRequest<{ assignments: Assignment[] }>(
    `/admin/assignments${q ? `?${q}` : ""}`,
    { auth: true }
  );
}

export async function cancelAssignment(id: string) {
  return apiRequest<{ assignment: Assignment }>(`/admin/assignments/${id}/cancel`, {
    method: "PATCH",
    auth: true,
  });
}

export async function reassignAssignment(id: string, caregiverUserId: string) {
  return apiRequest<{ assignment: Assignment }>(`/admin/assignments/${id}/reassign`, {
    method: "POST",
    auth: true,
    body: { caregiverUserId },
  });
}

export async function createAssignment(data: {
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
}) {
  return apiRequest<{ assignment: Assignment }>("/admin/assignments", {
    method: "POST",
    auth: true,
    body: data,
  });
}

export async function fetchAdminReports(params?: {
  caregiverId?: string;
  status?: string;
  date?: string;
}) {
  const search = new URLSearchParams();
  if (params?.caregiverId) search.set("caregiverId", params.caregiverId);
  if (params?.status) search.set("status", params.status);
  if (params?.date) search.set("date", params.date);
  const q = search.toString();
  return apiRequest<{ reports: CareReport[] }>(
    `/admin/reports${q ? `?${q}` : ""}`,
    { auth: true }
  );
}

export async function reviewReport(id: string) {
  return apiRequest<{ report: CareReport }>(`/admin/reports/${id}/review`, {
    method: "PATCH",
    auth: true,
  });
}

export async function fetchInquiries(status?: string) {
  const q = status ? `?status=${status}` : "";
  return apiRequest<{ inquiries: Inquiry[] }>(`/admin/inquiries${q}`, {
    auth: true,
  });
}
