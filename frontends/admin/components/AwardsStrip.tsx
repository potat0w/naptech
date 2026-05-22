import Link from "next/link";
import { containerClass, sectionPy, sectionTitle } from "@/lib/layout";

const awards = [
  "Leaders in Care Award",
  "Home Care Awards 2025",
  "Princess Royal Training Award",
  "95% of clients recommend",
  "HCA Home Care Awards Winner 2025",
] as const;

export default function AwardsStrip() {
  return (
    <section className={`bg-white ${sectionPy}`} aria-labelledby="awards-heading">
      <div className={containerClass}>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <h2 id="awards-heading" className={sectionTitle}>
            Award-winning service you can trust
          </h2>
          <Link
            href="/why-us/trust-and-safety"
            className="shrink-0 text-sm font-medium text-[#3B2A8F] underline underline-offset-4 transition-colors hover:text-[#2d1f6d]"
          >
            View all
          </Link>
        </div>
        <ul className="mt-10 flex flex-wrap items-center justify-center gap-8 sm:justify-start sm:gap-10 lg:mt-12 lg:gap-14">
          {awards.map((label) => (
            <li
              key={label}
              className="flex h-16 min-w-[140px] max-w-[200px] flex-1 items-center justify-center rounded-lg border border-neutral-200 bg-[#fafafa] px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-neutral-600"
            >
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
