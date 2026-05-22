import GetInTouch from "@/components/GetInTouch";
import MeetOurTeam from "@/components/MeetOurTeam";
import NaptecSocialBar from "@/components/NaptecSocialBar";
import { containerClass, labelEyebrow } from "@/lib/layout";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meet Our Team | Naptec",
  description:
    "Meet the Naptec team — experienced care leaders dedicated to compassionate, reliable home care for every family.",
};

const serif = { fontFamily: "var(--font-playfair), ui-serif, serif" } as const;

export default function MeetOurTeamPage() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="bg-white px-4 pt-10 sm:px-6 sm:pt-14 lg:px-8">
        <div className={`${containerClass}`}>
          <nav aria-label="Breadcrumb" className="text-sm text-neutral-500">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="transition-colors hover:text-brand">
                  Home
                </Link>
              </li>
              <li aria-hidden className="text-neutral-300">
                /
              </li>
              <li className="font-medium text-neutral-800">Meet our team</li>
            </ol>
          </nav>

          <p className={`${labelEyebrow} mt-10`}>Why us</p>
          <h1
            className="mt-4 max-w-3xl text-4xl font-normal tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl"
            style={serif}
          >
            Meet our team
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-body">
            The people behind Naptec — committed to compassionate care, personalised
            support, and helping families feel confident every step of the way.
          </p>
        </div>
      </section>

      <MeetOurTeam />
      <GetInTouch />
      <NaptecSocialBar />
    </main>
  );
}
