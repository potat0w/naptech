import type { ServiceCategory } from "@/lib/services";
import { getServicesByCategory } from "@/lib/services";
import Link from "next/link";

const serif = { fontFamily: "var(--font-playfair), ui-serif, serif" } as const;

export default function CategoryServiceLinks({
  category,
}: {
  category: ServiceCategory;
}) {
  const items = getServicesByCategory(category);
  if (items.length === 0) return null;

  return (
    <section className="border-t border-neutral-100 px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h2
          className="text-3xl font-normal text-neutral-900 sm:text-4xl"
          style={serif}
        >
          {category === "live-in"
            ? "Our live-in care services"
            : category === "specialist"
              ? "Our specialist home care services"
              : "Our domiciliary home care services"}
        </h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((service) => (
            <li key={service.slug}>
              <Link
                href={`/what-we-do/${service.slug}`}
                className="block rounded-lg border border-neutral-200 bg-[#fafafa] p-5 transition-colors hover:border-[#3B2A8F]/30"
              >
                <h3 className="text-lg font-medium text-[#3B2A8F]">
                  {service.shortTitle}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  {service.intro.slice(0, 140)}
                  {service.intro.length > 140 ? "…" : ""}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
