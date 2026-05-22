import type { MockUser } from "@/lib/auth/types";

const USER_KEY = "naptec_mock_user";

export function readStoredUser(): MockUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as MockUser;
  } catch {
    return null;
  }
}

export function writeStoredUser(user: MockUser) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearStoredUser() {
  localStorage.removeItem(USER_KEY);
}
