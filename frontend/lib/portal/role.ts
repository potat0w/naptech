import type { UserRole } from "@/lib/auth/types";

export function resolveRoleFromEmail(email: string): UserRole {
  const normalized = email.trim().toLowerCase();
  if (normalized.includes("admin")) return "admin";
  if (normalized.includes("caregiver")) return "caregiver";
  return "client";
}

export function dashboardPathForRole(role: UserRole): string {
  if (role === "admin") return "/admin/dashboard";
  if (role === "caregiver") return "/caregiver/dashboard";
  return "/book";
}

export function roleLabel(role: UserRole): string {
  if (role === "admin") return "Admin";
  if (role === "caregiver") return "Caregiver";
  return "Client";
}
