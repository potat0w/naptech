import type { UserRole } from "@/lib/auth/types";
import { adminAppBase, caregiverAppBase, webAppBase } from "@/lib/site-url";

export { adminAppBase, caregiverAppBase, webAppBase };

export function appUrl(base: string, path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

export function dashboardPathForRole(role: UserRole): string {
  if (role === "admin") return "/dashboard";
  if (role === "caregiver") return appUrl(caregiverAppBase(), "/dashboard");
  return appUrl(webAppBase(), "/book");
}

export function roleLabel(role: UserRole): string {
  if (role === "admin") return "Admin";
  if (role === "caregiver") return "Caregiver";
  return "Client";
}

export function isExternalUrl(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}
