import type { UserRole } from "@/lib/auth/types";

function baseUrl(envValue: string | undefined, fallback: string) {
  const raw = envValue?.trim() || fallback;
  return raw.replace(/\/$/, "");
}

export const webAppBase = () =>
  baseUrl(process.env.NEXT_PUBLIC_WEB_APP_URL, "http://localhost:3000");

export const adminAppBase = () =>
  baseUrl(process.env.NEXT_PUBLIC_ADMIN_APP_URL, "http://localhost:3001");

export const caregiverAppBase = () =>
  baseUrl(process.env.NEXT_PUBLIC_CAREGIVER_APP_URL, "http://localhost:3002");

export function appUrl(base: string, path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

export function dashboardPathForRole(role: UserRole): string {
  if (role === "admin") return appUrl(adminAppBase(), "/dashboard");
  if (role === "caregiver") return "/dashboard";
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
