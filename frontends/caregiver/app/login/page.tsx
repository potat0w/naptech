import AuthShell from "@/components/AuthShell";
import PortalLoginForm from "@/components/PortalLoginForm";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Caregiver sign in | Naptec",
  description: "Sign in to the Naptec caregiver portal.",
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
      eyebrow="Care portal"
      title="Caregiver sign in"
      subtitle="Sign in to view tasks and submit care reports."
      callbackUrl={callbackUrl}
    >
      <Suspense fallback={<p className="text-sm text-neutral-500">Loading…</p>}>
        <PortalLoginForm allowedRole="caregiver" defaultPath="/dashboard" />
      </Suspense>
    </AuthShell>
  );
}
