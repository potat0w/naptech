import { API_URL } from "@/lib/api/config";
import { apiRequest } from "./client";
import type { MockUser, UserRole } from "@/lib/auth/types";

export type ApiUser = {
  id: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  emailVerified: boolean;
  address: {
    addressLine1: string;
    addressLine2: string;
    city: string;
    postcode: string;
  };
};

export function apiUserToMockUser(user: ApiUser): MockUser {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
    role: user.role,
    addressLine1: user.address.addressLine1,
    addressLine2: user.address.addressLine2,
    city: user.address.city,
    postcode: user.address.postcode,
  };
}

export async function apiLogin(email: string, password: string) {
  return apiRequest<{ user: ApiUser; accessToken: string }>("/auth/login", {
    method: "POST",
    body: { email, password },
  });
}

export async function apiRegister(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}) {
  return apiRequest<{ user: ApiUser; accessToken: string }>("/auth/register", {
    method: "POST",
    body: data,
  });
}

export async function apiLogout() {
  return apiRequest<{ ok: boolean }>("/auth/logout", { method: "POST" });
}

export async function apiMe() {
  return apiRequest<{ user: ApiUser }>("/auth/me", { auth: true });
}

export async function requestPasswordResetOtp(email: string) {
  return apiRequest<{ ok: boolean }>("/auth/forgot-password-otp", {
    method: "POST",
    body: { email },
  });
}

export async function resetPasswordWithOtp(data: {
  email: string;
  code: string;
  password: string;
  confirmPassword: string;
}) {
  return apiRequest<{ ok: boolean }>("/auth/reset-password-otp", {
    method: "POST",
    body: data,
  });
}

export async function tryApiRefresh() {
  const res = await fetch(`${API_URL}/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });
  if (res.status === 204 || !res.ok) return null;
  return res.json() as Promise<{ user: ApiUser; accessToken: string }>;
}
