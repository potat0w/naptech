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
    title: "Home Help & Housekeeping",
    description:
      "Practical support around the home — from light housekeeping and meal preparation to errands — so daily life stays comfortable and manageable.",
    href: "/what-we-do/home-help-and-housekeeping",
  },
  {
    title: "Personal Care",
    description:
      "With Naptec you can feel confident that our caregivers will assist with your care and support needs discreetly and with dignity.",
    href: "/what-we-do/personal-care",
  },
  {
    title: "Overnight Care",
    description:
      "Reassuring support through the night so your loved one feels safe at home — and family can rest knowing a trusted Naptec caregiver is there when needed.",
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
          Popular Services
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3 lg:mt-12">
          {services.map((item) => (
            <article
              key={item.title}
              className={`${cardBase} flex min-h-[300px] flex-col sm:min-h-[320px]`}
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
