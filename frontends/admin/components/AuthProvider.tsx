"use client";

import {
  apiLogin,
  apiLogout,
  apiMe,
  apiRegister,
  tryApiRefresh,
  apiUserToMockUser,
} from "@/lib/api/auth";
import { ApiError, apiRequest } from "@/lib/api/client";
import { clearAccessToken, getAccessToken, setAccessToken } from "@/lib/auth/token";
import type { MockUser, UserRole } from "@/lib/auth/types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type AuthContextValue = {
  user: MockUser | null;
  ready: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<
    | { ok: true; role: UserRole }
    | { ok: false; error: string; fieldErrors?: Record<string, string> }
  >;
  signup: (data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
  }) => Promise<
    | { ok: true; role: UserRole }
    | { ok: false; error: string; fieldErrors?: Record<string, string> }
  >;
  logout: () => Promise<void>;
  updateProfile: (
    data: Partial<
      Pick<
        MockUser,
        | "firstName"
        | "lastName"
        | "email"
        | "phone"
        | "addressLine1"
        | "addressLine2"
        | "city"
        | "postcode"
      >
    >
  ) => Promise<void>;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}

function mapApiError(e: unknown) {
  if (e instanceof ApiError) {
    return { error: e.message, fieldErrors: e.fieldErrors };
  }
  return { error: "Something went wrong. Please try again." };
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [ready, setReady] = useState(false);

  const refreshUser = useCallback(async () => {
    try {
      const { user: apiUser } = await apiMe();
      setUser(apiUserToMockUser(apiUser));
    } catch {
      setUser(null);
      clearAccessToken();
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        if (getAccessToken()) {
          const { user: apiUser } = await apiMe();
          if (!cancelled) setUser(apiUserToMockUser(apiUser));
          return;
        }
        const refreshed = await tryApiRefresh();
        if (refreshed && !cancelled) {
          setAccessToken(refreshed.accessToken);
          setUser(apiUserToMockUser(refreshed.user));
        }
      } catch {
        if (!cancelled) {
          setUser(null);
          clearAccessToken();
        }
      } finally {
        if (!cancelled) setReady(true);
      }
    }

    init();
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const result = await apiLogin(email, password);
      setAccessToken(result.accessToken);
      setUser(apiUserToMockUser(result.user));
      return { ok: true as const, role: result.user.role };
    } catch (e) {
      const mapped = mapApiError(e);
      return { ok: false as const, ...mapped };
    }
  }, []);

  const signup = useCallback(
    async (data: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      password: string;
      confirmPassword: string;
    }) => {
      try {
        const result = await apiRegister(data);
        setAccessToken(result.accessToken);
        setUser(apiUserToMockUser(result.user));
        return { ok: true as const, role: result.user.role };
      } catch (e) {
        const mapped = mapApiError(e);
        return { ok: false as const, ...mapped };
      }
    },
    []
  );

  const logout = useCallback(async () => {
    try {
      await apiLogout();
    } catch {
      /* ignore */
    }
    clearAccessToken();
    setUser(null);
  }, []);

  const updateProfile = useCallback(
    async (
      data: Partial<
        Pick<
          MockUser,
          | "firstName"
        | "lastName"
        | "email"
        | "phone"
        | "addressLine1"
        | "addressLine2"
        | "city"
        | "postcode"
        >
      >
    ) => {
      const current = user;
      if (!current) return;

      if (current.role === "caregiver" && data.phone !== undefined) {
        await apiRequest("/caregiver/me", {
          method: "PATCH",
          auth: true,
          body: { phone: data.phone },
        });
        setUser({ ...current, phone: data.phone.trim() });
        return;
      }

      if (current.role === "client") {
        const { user: apiUser } = await apiRequest<{ user: import("@/lib/api/auth").ApiUser }>(
          "/clients/me",
          { method: "PATCH", auth: true, body: data }
        );
        setUser(apiUserToMockUser(apiUser));
      }
    },
    [user]
  );

  const value = useMemo(
    () => ({ user, ready, login, signup, logout, updateProfile, refreshUser }),
    [user, ready, login, signup, logout, updateProfile, refreshUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
