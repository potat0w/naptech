import { apiRequest } from "./client";
import type { Assignment, CareReport } from "@/lib/portal/types";

export async function fetchCaregiverDashboard() {
  return apiRequest<{
    stats: {
      todayHomes: number;
      upcoming: number;
      activeVisits?: number;
      pendingReports: number;
      completedReports: number;
    };
  }>("/caregiver/dashboard", { auth: true });
}

export async function fetchReportableVisits() {
  return apiRequest<{ visits: Assignment[] }>("/caregiver/assignments/reportable", {
    auth: true,
  });
}

export async function fetchCaregiverAssignments(params?: {
  status?: string;
  date?: string;
}) {
  const search = new URLSearchParams();
  if (params?.status) search.set("status", params.status);
  if (params?.date) search.set("date", params.date);
  const q = search.toString();
  return apiRequest<{ assignments: Assignment[] }>(
    `/caregiver/assignments${q ? `?${q}` : ""}`,
    { auth: true }
  );
}

export async function fetchCaregiverReports(status?: string) {
  const q = status ? `?status=${status}` : "";
  return apiRequest<{ reports: CareReport[] }>(`/caregiver/reports${q}`, {
    auth: true,
  });
}

export async function submitCaregiverReport(data: {
  assignmentId: string;
  rawNotes: string;
}) {
  return apiRequest<{ report: CareReport }>("/caregiver/reports", {
    method: "POST",
    auth: true,
    body: data,
  });
}

export async function updateCaregiverPhone(phone: string) {
  return apiRequest<{ ok: boolean }>("/caregiver/me", {
    method: "PATCH",
    auth: true,
    body: { phone },
  });
}
