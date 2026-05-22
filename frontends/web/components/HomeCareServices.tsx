import {
  containerClass,
  labelEyebrow,
  sectionBgWhite,
  sectionPy,
  sectionTitle,
} from "@/lib/layout";
import { slugify } from "@/lib/slugify";
import {
  ChevronRight,
  HeartHandshake,
  Moon,
  User,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

type ServiceLine = { label: string; href: string };

type ServiceCard = {
  key: string;
  number: string;
  title: string;
  href: string;
  Icon: LucideIcon;
  services: readonly ServiceLine[] | null;
  description: string | null;
};

function line(label: string, slug?: string): ServiceLine {
  return {
    label,
    href: `/what-we-do/${slug ?? slugify(label)}`,
  };
}

const cards: ServiceCard[] = [
  {
    key: "overnight",
    number: "01",
    title: "Overnight Care",
    href: "/what-we-do/overnight-care",
    Icon: Moon,
    services: null,
    description:
      "Reassuring support through the night so your loved one feels safe at home — and family can rest knowing a trusted Naptec caregiver is there when needed.",
  },
  {
    key: "domiciliary",
    number: "02",
    title: "Domiciliary Care",
    href: "/what-we-do/domiciliary-care",
    Icon: User,
    services: [
      line("Companionship", "companionship"),
      line("Meal Preparation", "meal-preparation"),
      line("Home Help", "home-help-and-housekeeping"),
      line("Personal Care", "personal-care"),
      line("Overnight Care", "overnight-care"),
    ],
    description: null,
  },
  {
    key: "companionship",
    number: "03",
    title: "Companionship",
    href: "/what-we-do/companionship",
    Icon: HeartHandshake,
    services: null,
    description:
      "Friendly company and conversation at home — for outings, appointments, or simply sharing time together, so your loved one stays connected and never feels alone.",
  },
];

function ServiceCardBlock({ card }: { card: ServiceCard }) {
  const Icon = card.Icon;

  return (
    <article className="relative flex min-h-[380px] flex-col overflow-hidden rounded-[1.25rem] bg-surface-card p-8 sm:min-h-[420px] sm:p-10">
      <span
        className="pointer-events-none absolute right-7 top-5 select-none font-serif text-[5rem] font-extrabold leading-none text-brand/10 sm:text-[5.5rem]"
        aria-hidden
      >
        {card.number}
      </span>

      <div className="relative mb-6 flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-xl bg-brand/12 text-brand">
        <Icon className="h-6 w-6" strokeWidth={1.8} aria-hidden />
      </div>

      <h3 className="relative shrink-0 font-serif text-2xl font-bold text-brand-deeper sm:text-[1.5rem]">
        {card.title}
      </h3>

      {card.description ? (
        <p className="relative mt-5 flex-1 text-sm leading-[1.7] text-body">
          {card.description}
        </p>
      ) : (
        <ul className="relative mt-5 flex flex-1 flex-col">
          {card.services?.map((item) => (
            <li key={item.label} className="border-b border-brand/15 last:border-b-0">
              <Link
                href={item.href}
                className="group flex items-center justify-between py-2.5 text-sm text-brand-dark transition-colors hover:text-brand"
              >
                <span>{item.label}</span>
                <ChevronRight
                  className="h-3.5 w-3.5 shrink-0 text-brand opacity-50 transition-opacity group-hover:opacity-100"
                  strokeWidth={2}
                  aria-hidden
                />
              </Link>
            </li>
          ))}
        </ul>
      )}

      <Link
        href={card.href}
        className="relative mt-6 inline-flex items-center gap-1.5 self-start text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-brand transition-colors hover:text-brand-dark"
      >
        Learn more
        <ChevronRight className="h-3 w-3" strokeWidth={2.5} aria-hidden />
      </Link>
    </article>
  );
}

export default function HomeCareServices() {
  return (
    <section
      className={`${sectionBgWhite} ${sectionPy}`}
      aria-labelledby="home-care-services-heading"
    >
      <div className={containerClass}>
        <div className="mb-10 lg:mb-12">
          <p className={labelEyebrow}>Our services</p>
          <h2 id="home-care-services-heading" className={`mt-4 ${sectionTitle}`}>
            Our Home Care
            <br />
            Services
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {cards.map((card) => (
            <ServiceCardBlock key={card.key} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
