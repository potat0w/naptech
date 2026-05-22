import AuthShell from "@/components/AuthShell";
import PortalLoginForm from "@/components/PortalLoginForm";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Admin sign in | Naptec",
  description: "Sign in to the Naptec admin portal.",
};

type PageProps = {
  searchParams: Promise<{ callbackUrl?: string }>;
};

export default async function LoginPage({ searchParams }: PageProps) {
  const { callbackUrl } = await searchParams;

  return (
    <AuthShell
      formPanelAlign="center"
      formPanelClassName="py-10 sm:py-12 lg:py-14"
      eyebrow="Admin portal"
      title="Staff sign in"
      subtitle="Sign in with your Naptec admin account."
      callbackUrl={callbackUrl}
    >
      <Suspense fallback={<p className="text-sm text-neutral-500">Loading…</p>}>
        <PortalLoginForm allowedRole="admin" defaultPath="/dashboard" />
      </Suspense>
    </AuthShell>
  );
}
