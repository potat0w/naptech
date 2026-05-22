"use client";

import { useAuth } from "@/components/AuthProvider";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, type ReactNode } from "react";

export default function EnquireGate({ children }: { children: ReactNode }) {
  const { user, ready } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!ready || user) return;
    const query = searchParams.toString();
    const callback = query ? `${pathname}?${query}` : pathname;
    router.replace(`/signup?callbackUrl=${encodeURIComponent(callback)}`);
  }, [ready, user, router, pathname, searchParams]);

  if (!ready) {
    return (
      <div className="flex flex-1 items-center justify-center py-24">
        <p className="text-sm text-neutral-500">Loading…</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-1 items-center justify-center py-24">
        <p className="text-sm text-neutral-500">Redirecting to sign in…</p>
      </div>
    );
  }

  return <>{children}</>;
}
