// import FaqTestimonials from "@/components/FaqTestimonials";
import GetInTouch from "@/components/GetInTouch";
import HowItWorksSteps from "@/components/HowItWorksSteps";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works | Naptec",
  description:
    "Learn how Naptec home care works — from your first conversation to meeting your Care Professionals and starting care at home.",
};

const serif = { fontFamily: "var(--font-playfair), ui-serif, serif" } as const;

export default function HowItWorksPage() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="bg-white px-4 pt-10 sm:px-6 sm:pt-14 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb" className="text-sm text-neutral-500">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="transition-colors hover:text-[#3B2A8F]">
                  Home
                </Link>
              </li>
              <li aria-hidden className="text-neutral-300">
                /
              </li>
              <li className="font-medium text-neutral-800">How it works</li>
            </ol>
          </nav>

          <h1
            className="mt-8 text-4xl font-normal tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl"
            style={serif}
          >
            How it works
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-neutral-600">
            Whatever care your loved one needs, we will work quickly to find a
            bespoke solution that is right for you. Care needs can change over
            time, so we are always ready to adapt — and just a phone call away
            when you need us.
          </p>
        </div>
      </section>

      <HowItWorksSteps />

      <GetInTouch />

      <section className="bg-white px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
          <div>
            <h2
              className="text-3xl font-normal leading-tight text-neutral-900 sm:text-4xl"
              style={serif}
            >
              Confused about home care? We can help.
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-neutral-600">
              <p>
                We know you want the best for your loved one. When it comes to
                arranging home care, we have made it straightforward with
                personalised, attentive support that adapts as needs change.
              </p>
              <p>
                Organising care should not feel like a leap in the dark. By
                taking time to listen and understand your circumstances, we help
                your loved one live more independently at home while giving you
                peace of mind.
              </p>
              <p>
                From warm companionship to specialist, practical care that puts
                their preferences first, we are changing how families think about
                home care. Whatever questions you have, we are here to help — with
                no pressure until you feel ready.
              </p>
            </div>
            <Link
              href="/advice-and-care/faqs"
              className="mt-8 inline-block text-sm font-medium text-[#3B2A8F] underline underline-offset-4 transition-colors hover:text-[#2d1f6d]"
            >
              Discover more
            </Link>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-[#f2f2f2]">
            <Image
              src="https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933399/pexels-olly-3791666_nap6fe.jpg"
              alt="Older adult receiving supportive home care"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* <FaqTestimonials /> */}
    </main>
  );
}
