import {
  cardBase,
  cardTitle,
  containerClass,
  sectionBgWhite,
  sectionPy,
  sectionTitle,
} from "@/lib/layout";
import Link from "next/link";

const services = [
  {
    title: "Home care in Croydon",
    description:
      "Professional elderly care at home across Croydon — personal care, dementia support, and flexible visits tailored to your family.",
    href: "/home-care-croydon",
  },
  {
    title: "Personal care",
    description:
      "Dignified help with bathing, dressing, and daily living at home from trained caregivers in Croydon.",
    href: "/what-we-do/personal-care",
  },
  {
    title: "Dementia care",
    description:
      "Specialist dementia and Alzheimer's care at home with trained caregivers who understand memory loss and changing needs.",
    href: "/what-we-do/dementia-and-alzheimers",
  },
  {
    title: "Live-in care",
    description:
      "Continuous support from a dedicated caregiver living in your home — an alternative to residential care for many families.",
    href: "/what-we-do/live-in-care",
  },
  {
    title: "Respite care",
    description:
      "Planned or short-notice breaks for family carers, with trusted elderly care at home while you rest and recharge.",
    href: "/what-we-do/respite-care",
  },
  {
    title: "Overnight care",
    description:
      "Sleep-in and waking night services so your loved one feels safe at home through the night.",
    href: "/what-we-do/overnight-care",
  },
] as const;

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

export default function PopularServices() {
  return (
    <section
      className={`${sectionBgWhite} ${sectionPy}`}
      aria-labelledby="popular-services-heading"
    >
      <div className={containerClass}>
        <h2 id="popular-services-heading" className={sectionTitle}>
          Home care services in Croydon
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-12 lg:grid-cols-3">
          {services.map((item) => (
            <article
              key={item.title}
              className={`${cardBase} flex min-h-[280px] flex-col`}
            >
              <h3 className={`mb-4 ${cardTitle}`}>{item.title}</h3>
              <p className="mb-8 flex-1 text-sm leading-relaxed text-body">
                {item.description}
              </p>
              <div className="flex items-center gap-4">
                <Link
                  href={item.href}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand text-white transition-colors hover:bg-brand-dark"
                  aria-label={`Discover more about ${item.title}`}
                >
                  <ChevronRightIcon className="h-5 w-5" />
                </Link>
                <Link
                  href={item.href}
                  className="text-sm text-neutral-800 underline underline-offset-4 transition-colors hover:text-brand"
                >
                  Discover more
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
