import AuthShell from "@/components/AuthShell";
import SignupForm from "@/components/SignupForm";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Create account | Naptec",
  description: "Create a Naptec account to book home care.",
};

type PageProps = {
  searchParams: Promise<{ callbackUrl?: string }>;
};

export default async function SignupPage({ searchParams }: PageProps) {
  const { callbackUrl } = await searchParams;

  return (
    <AuthShell
      showLogo={false}
      eyebrow="Book a caregiver"
      title="Create your account"
      subtitle="Register to book a Naptec Care Professional for yourself or a loved one. It only takes a minute."
      alternateLabel="Already have an account?"
      alternateHref="/login"
      alternateLinkText="Sign in"
      callbackUrl={callbackUrl}
    >
      <Suspense fallback={<p className="text-sm text-neutral-500">Loading…</p>}>
        <SignupForm />
      </Suspense>
    </AuthShell>
  );
}
