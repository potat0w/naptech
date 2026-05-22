import FormSplitLayout from "@/components/FormSplitLayout";
import SiteLogo from "@/components/SiteLogo";
import { webAppBase } from "@/lib/app-urls";
import { images } from "@/lib/images";
import Link from "next/link";
import type { ReactNode } from "react";

type AuthShellProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: ReactNode;
  alternateLabel?: string;
  alternateHref?: string;
  alternateLinkText?: string;
  callbackUrl?: string;
  formPanelClassName?: string;
  formPanelAlign?: "start" | "center";
  showLogo?: boolean;
};

export default function AuthShell({
  eyebrow,
  title,
  subtitle,
  children,
  alternateLabel,
  alternateHref,
  alternateLinkText,
  callbackUrl,
  formPanelClassName,
  formPanelAlign,
  showLogo = true,
}: AuthShellProps) {
  const alternate =
    alternateHref && callbackUrl
      ? `${alternateHref}?callbackUrl=${encodeURIComponent(callbackUrl)}`
      : alternateHref;

  return (
    <main className="flex min-h-screen flex-col">
      <FormSplitLayout
        imageSrc={images.caregiver}
        imageAlt="Naptec care professional supporting a client at home"
        formPanelClassName={formPanelClassName}
        formPanelAlign={formPanelAlign}
        eyebrow={eyebrow}
        title={title}
        subtitle={subtitle}
        aside={
          <p className="text-sm leading-relaxed text-white/90">
            Need the public site?{" "}
            <a
              href={webAppBase()}
              className="font-medium text-white underline underline-offset-4 transition-colors hover:text-white/80"
            >
              Go to naptec.care
            </a>
          </p>
        }
      >
        {showLogo ? (
          <div className="mb-8">
            <SiteLogo className="h-12 w-auto sm:h-14" width={260} height={68} />
          </div>
        ) : null}
        {children}
        {alternateLabel && alternate && alternateLinkText ? (
          <p className="mt-4 text-center text-sm text-muted">
            {alternateLabel}{" "}
            <Link
              href={alternate}
              className="font-semibold text-brand transition-colors hover:text-brand-dark"
            >
              {alternateLinkText}
            </Link>
          </p>
        ) : null}
      </FormSplitLayout>
    </main>
  );
}
