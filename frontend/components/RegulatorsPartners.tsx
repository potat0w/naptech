import Link from "next/link";
import { containerClass, sectionPy, sectionTitle } from "@/lib/layout";

const regulators = [
  "Care Quality Commission",
  "Care Inspectorate",
  "Care Inspectorate Wales",
  "The Regulation and Quality Improvement Authority",
] as const;

const partners = [
  "Alzheimer's Society",
  "Parkinson's UK",
  "Homecare Association",
  "British Franchise Association",
] as const;

export function Regulators() {
  return (
    <section className={`bg-[#faf8f4] ${sectionPy}`} aria-labelledby="regulators-heading">
      <div className={`${containerClass} text-center`}>
        <h2 id="regulators-heading" className={sectionTitle}>
          Providing quality care regulated by
        </h2>
        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {regulators.map((name) => (
            <li
              key={name}
              className="max-w-[200px] text-sm font-semibold uppercase tracking-wide text-neutral-600"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Partners() {
  return (
    <section className={`border-t border-neutral-100 bg-white ${sectionPy}`} aria-labelledby="partners-heading">
      <div className={containerClass}>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <h2 id="partners-heading" className={sectionTitle}>
            Our partners
          </h2>
          <Link
            href="/enquire"
            className="shrink-0 text-sm font-medium text-[#3B2A8F] underline underline-offset-4"
          >
            View all
          </Link>
        </div>
        <ul className="mt-10 flex flex-wrap items-center justify-center gap-8 sm:justify-start sm:gap-12">
          {partners.map((name) => (
            <li
              key={name}
              className="flex h-14 min-w-[120px] items-center justify-center rounded-lg border border-neutral-200 bg-[#f4f4f4] px-5 text-center text-xs font-semibold text-neutral-600"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
