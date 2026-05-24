import { getServiceBySlug } from "@/lib/services";
import Link from "next/link";

const serif = { fontFamily: "var(--font-playfair), ui-serif, serif" } as const;

type RelatedServicesProps = {
  slugs: string[];
  heading?: string;
};

export default function RelatedServices({
  slugs,
  heading = "Related home care services",
}: RelatedServicesProps) {
  const items = slugs
    .map((slug) => getServiceBySlug(slug))
    .filter((service): service is NonNullable<typeof service> => Boolean(service));

  if (items.length === 0) return null;

  return (
    <section className="border-t border-neutral-100 bg-[#faf8f4] px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h2
          className="text-3xl font-normal text-neutral-900 sm:text-4xl"
          style={serif}
        >
          {heading}
        </h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((service) => (
            <li key={service.slug}>
              <Link
                href={`/what-we-do/${service.slug}`}
                className="block rounded-lg border border-neutral-200 bg-white p-5 transition-colors hover:border-[#3B2A8F]/30 hover:bg-white/90"
              >
                <h3 className="text-lg font-medium text-[#3B2A8F]">
                  {service.shortTitle}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  {service.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-neutral-600">
          <Link
            href="/advice-and-care/faqs"
            className="font-medium text-[#3B2A8F] underline underline-offset-4"
          >
            View all home care FAQs
          </Link>
          {" · "}
          <Link
            href="/advice-and-care/cost-of-care"
            className="font-medium text-[#3B2A8F] underline underline-offset-4"
          >
            Home care costs &amp; funding
          </Link>
        </p>
      </div>
    </section>
  );
}
