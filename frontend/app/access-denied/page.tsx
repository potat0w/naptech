"use client";

import { useAuth } from "@/components/AuthProvider";
import { headingFont } from "@/lib/auth/form-styles";
import { dashboardPathForRole, roleLabel } from "@/lib/portal/role";
import { ShieldX } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function AccessDeniedContent() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") ?? "";

  const homeHref = user ? dashboardPathForRole(user.role) : "/";
  const triedAdmin = from.startsWith("/admin");
  const triedCaregiver = from.startsWith("/caregiver");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-surface px-4 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
        <ShieldX className="h-8 w-8" />
      </span>
      <h1 className="mt-6 text-3xl text-neutral-900" style={headingFont}>
        403 — Access Denied
      </h1>
      <p className="mt-2 max-w-md text-sm text-muted">
        {user && (triedAdmin || triedCaregiver) ? (
          <>
            You are signed in as a <strong>{roleLabel(user.role)}</strong> account. To open
            that portal, sign out and sign in with an email that contains{" "}
            <strong>{triedAdmin ? "admin" : "caregiver"}</strong> (demo:{" "}
            {triedAdmin ? "admin@naptec.care" : "caregiver@naptec.care"}).
          </>
        ) : (
          <>
            You do not have permission to view this page. Contact your administrator if you
            believe this is an error.
          </>
        )}
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href={homeHref}
          className="rounded-xl bg-brand px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-dark"
        >
          Go to my {user ? roleLabel(user.role).toLowerCase() : "home"} page
        </Link>
        <Link
          href="/login"
          className="rounded-xl border border-surface-card px-5 py-2.5 text-sm font-medium text-body hover:bg-white"
        >
          Sign in as admin / caregiver
        </Link>
      </div>
    </main>
  );
}

export default function AccessDeniedPage() {
  return (
    <Suspense fallback={null}>
      <AccessDeniedContent />
    </Suspense>
  );
}
