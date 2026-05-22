import {
  accentText,
  bodyText,
  containerClass,
  sectionBgWhite,
  sectionPy,
  sectionTitle,
} from "@/lib/layout";
import Link from "next/link";

const serif = { fontFamily: "var(--font-playfair), ui-serif, serif" } as const;

export default function CqcSection() {
  return null;

  /*
  return (
    <section
      className={`${sectionBgWhite} ${sectionPy}`}
      aria-labelledby="care-quality-heading"
    >
      <div className={`${containerClass} grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14`}>
        <div>
          <h2 id="care-quality-heading" className={sectionTitle}>
            Care Quality
          </h2>
          <p className={`mt-5 max-w-xl ${bodyText}`}>
            We are regulated and monitored by the Care Quality Commission (CQC)
            and maintain a &ldquo;Good&rdquo; rating overall, reflecting safe,
            reliable, and consistent care standards.
          </p>
          <Link
            href="https://www.cqc.org.uk"
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-6 inline-block text-sm font-medium ${accentText} underline underline-offset-4 transition-colors hover:text-brand-dark`}
          >
            View our profile on the CQC website
          </Link>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-sm rounded-2xl border border-surface-card bg-white p-8 shadow-sm">
            <p className="text-center text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[#003087]">
              Care Quality Commission
            </p>
            <p
              className="mt-4 text-center text-xs font-medium uppercase tracking-wide text-muted"
              style={serif}
            >
              Overall rating
            </p>
            <p
              className="mt-2 text-center text-5xl font-semibold leading-none text-[#00703c] sm:text-6xl"
              style={serif}
            >
              Good
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-1">
              {(["Safe", "Effective", "Caring", "Responsive", "Well-led"] as const).map(
                (domain) => (
                  <span
                    key={domain}
                    className="rounded bg-[#00703c]/10 px-2 py-1 text-[0.625rem] font-medium text-[#00703c]"
                  >
                    {domain}
                  </span>
                ),
              )}
            </div>
            <p className="mt-6 text-center text-xs leading-relaxed text-muted">
              Regulated home care provider
            </p>
          </div>
        </div>
      </div>
    </section>
  );
  */
}
