import { env } from "./env.js";

export function joinAppUrl(base: string, path: string) {
  const normalized = base.replace(/\/+$/, "");
  const segment = path.startsWith("/") ? path : `/${path}`;
  return `${normalized}${segment}`;
}

export const appUrls = {
  web: () => env.webAppUrl,
  admin: () => env.adminAppUrl,
  caregiver: () => env.caregiverAppUrl,
};
