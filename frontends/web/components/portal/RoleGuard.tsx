"use client";

import { useAuth } from "@/components/AuthProvider";
import type { UserRole } from "@/lib/auth/types";
import { dashboardPathForRole, isExternalUrl } from "@/lib/portal/role";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

type RoleGuardProps = {
  allowedRole: UserRole;
  children: ReactNode;
};

export default function RoleGuard({ allowedRole, children }: RoleGuardProps) {
  const { user, ready } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!ready) return;

    if (!user) {
      const authPath =
        pathname === "/book"
          ? `/signup?callbackUrl=${encodeURIComponent(pathname)}`
          : `/login?callbackUrl=${encodeURIComponent(pathname)}`;
      router.replace(authPath);
      return;
    }

    if (user.role !== allowedRole) {
      const dest = dashboardPathForRole(user.role);
      if (isExternalUrl(dest)) {
        window.location.href = dest;
        return;
      }
      router.replace(dest);
    }
  }, [ready, user, allowedRole, router, pathname]);

  if (!ready || !user || user.role !== allowedRole) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand/20 border-t-brand" />
      </div>
    );
  }

  return <>{children}</>;
}
