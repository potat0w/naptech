import AuthShell from "@/components/AuthShell";
import LoginForm from "@/components/LoginForm";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Sign in | Naptec",
  description: "Sign in to book home care with Naptec.",
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
      eyebrow="Book a caregiver"
      title="Welcome back"
      subtitle="Sign in to continue booking care with your Naptec account."
      alternateLabel="New to Naptec?"
      alternateHref="/signup"
      alternateLinkText="Create account"
      callbackUrl={callbackUrl}
    >
      <Suspense fallback={<p className="text-sm text-neutral-500">Loading…</p>}>
        <LoginForm />
      </Suspense>
    </AuthShell>
  );
}
