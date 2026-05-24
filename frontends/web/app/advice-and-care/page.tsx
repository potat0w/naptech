import ContentCarousel from "@/components/ContentCarousel";
import GetInTouch from "@/components/GetInTouch";
import { adviceHubGuideCards } from "@/lib/carousel-cards";
import { ArrowRight } from "lucide-react";
import { containerClass } from "@/lib/layout";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Care Advice & Support | Costs, FAQs & Ageing Well | Naptec",
  description:
    "Home care advice for families in Croydon — understand care types, home care costs, funding, FAQs, and how to age well at home.",
};

const serif = { fontFamily: "var(--font-playfair), ui-serif, serif" } as const;

const pillars = [
  {
    title: "The cost of home care",
    description:
      "Naturally, cost comes to mind when looking for care. It can be a difficult and complex area to understand but we can provide guidance to support you.",
    href: "/advice-and-care/cost-of-care",
    image:
      "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933382/pexels-jsme-mila-523821574-18459193_nlhoas.jpg",
  },
  {
    title: "FAQs",
    description:
      "Whatever question you have, chances are you're not alone in having that thought. We hope our FAQs section gives you the information you need.",
    href: "/advice-and-care/faqs",
    image:
      "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933365/pexels-kampus-7551662_ock8o9.jpg",
  },
  {
    title: "How to age well",
    description:
      "We believe that ageing should be a positive experience. Care at home can help someone retain their independence, yet receive the care vital for their health and wellbeing.",
    href: "/advice-and-care/how-to-age-well",
    image:
      "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933350/pexels-jsme-mila-523821574-29372720_niar1j.jpg",
  },
] as const;

function DiscoverMore({ href, label }: { href: string; label?: string }) {
  return (
    <div className="mt-6 flex items-center gap-3">
      <Link
        href={href}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#3B2A8F] text-white transition-[filter] hover:brightness-95"
        aria-label={label ?? "Discover more"}
      >
        <ArrowRight className="h-4 w-4" strokeWidth={2} />
      </Link>
      <Link
        href={href}
        className="text-sm text-neutral-700 underline underline-offset-4 transition-colors hover:text-[#3B2A8F]"
      >
        Discover more
      </Link>
    </div>
  );
}

export default function AdviceAndCarePage() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className={containerClass}>
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
              <li className="font-medium text-neutral-800">Advice &amp; Support</li>
            </ol>
          </nav>

          <h1
            className="mt-8 text-4xl font-normal tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl"
            style={serif}
          >
            Home care advice &amp; support
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-neutral-600 sm:text-lg sm:leading-relaxed">
            Practical guidance for families considering elderly care at home in
            Croydon — from home care costs and funding to FAQs and ageing well.
            Whatever you need, we are here to help.
          </p>

          <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-2 lg:items-center lg:gap-12">
            <div>
              <h2
                className="text-3xl font-normal leading-tight text-neutral-900 sm:text-4xl"
                style={serif}
              >
                Tips for talking about care
              </h2>
              <p className="mt-5 max-w-xl text-base leading-[1.85] text-neutral-600">
                Starting a conversation about care with a loved one can feel
                daunting. Our practical guidance helps you approach the subject
                with empathy, clarity and confidence.
              </p>
              <DiscoverMore
                href="/advice-and-care/articles/benefits-of-professional-home-care-services"
                label="Read about choosing professional home care"
              />
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-[#f2f2f2]">
              <Image
                src="https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933400/pexels-kampus-8949833_tldckz.jpg"
                alt="Family having a conversation about care at home"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="mt-14 grid gap-6 sm:mt-16 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-8">
            {pillars.map((pillar) => (
              <article
                key={pillar.title}
                className="flex flex-col overflow-hidden rounded-xl bg-[#f4f4f2]"
              >
                <div className="relative aspect-[16/10] w-full bg-[#ebebeb]">
                  <Image
                    src={pillar.image}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-8">
                  <h3
                    className="text-2xl font-normal leading-snug text-[#3B2A8F] sm:text-[1.75rem]"
                    style={serif}
                  >
                    {pillar.title}
                  </h3>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-neutral-600 sm:text-base sm:leading-[1.75]">
                    {pillar.description}
                  </p>
                  <DiscoverMore href={pillar.href} label={`Discover more: ${pillar.title}`} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>



      <ContentCarousel
        title="Guides"
        cards={adviceHubGuideCards}
        ariaLabel="Care advice guides"
        viewAllHref="/advice-and-care/articles"
      />

      <GetInTouch />

      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className={`${containerClass} grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14`}>
          <div>
            <h2
              className="text-3xl font-normal leading-tight text-neutral-900 sm:text-4xl lg:text-[2.75rem]"
              style={serif}
            >
              Confused about home care? We can help.
            </h2>
            <div className="mt-6 space-y-5 text-base leading-[1.85] text-neutral-600 sm:text-lg sm:leading-[1.9]">
              <p>
                We know you want the best for your loved one, so when it comes to
                arranging home care, we&apos;ve made it easy with personalised,
                attentive care that adapts as your needs change.
              </p>
              <p>
                Organising care shouldn&apos;t feel like a trust fall. By taking
                the time to listen and understand your unique circumstances,
                we&apos;re confident we can help your loved one live a more
                independent life at home, while helping you find balance as a
                caregiver.
              </p>
              <p>
                From warm and friendly companionship, to specialised, practical
                care that puts their needs and preferences first, we are changing
                the way people think about home care.
              </p>
              <p>
                Whatever questions you would like answered, we&apos;re here to put
                your mind at ease – with no pressure to make a decision until you
                feel ready.
              </p>
            </div>
            <DiscoverMore href="/enquire" label="Discover more about Naptec home care" />
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-[#f2f2f2]">
            <Image
              src="https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933400/pexels-olly-3768131_mdki5q.jpg"
              alt="Caregiver supporting an older adult at home"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
