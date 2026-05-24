import AccordionList from "@/components/AccordionList";
import RelatedServices from "@/components/RelatedServices";
import { btnPrimary } from "@/lib/layout";
import { croydonHomeCareFaqs } from "@/lib/seo/site-faqs";
import { JsonLd, breadcrumbSchema, faqPageSchema } from "@/lib/seo/json-ld";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Care in Croydon | Elderly & Dementia Care at Home | Naptec",
  description:
    "Trusted home care in Croydon for elderly clients and families. Personal care, live-in care, dementia care, respite & overnight care. Free consultation — call Naptec Care.",
};

const serif = { fontFamily: "var(--font-playfair), ui-serif, serif" } as const;

const serviceLinks = [
  { label: "Personal care at home", href: "/what-we-do/personal-care" },
  { label: "Dementia care at home", href: "/what-we-do/dementia-and-alzheimers" },
  { label: "Live-in care", href: "/what-we-do/live-in-care" },
  { label: "Companionship care", href: "/what-we-do/companionship" },
  { label: "Respite care for carers", href: "/what-we-do/respite-care" },
  { label: "Overnight care", href: "/what-we-do/overnight-care" },
] as const;

const faqItems = croydonHomeCareFaqs.map((faq) => ({
  id: faq.id,
  title: faq.title,
  content: <p>{faq.answer}</p>,
}));

export default function HomeCareCroydonPage() {
  return (
    <main className="flex flex-1 flex-col">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Home Care in Croydon", path: "/home-care-croydon" },
          ]),
          faqPageSchema(croydonHomeCareFaqs),
        ]}
      />

      <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
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
              <li className="font-medium text-neutral-800">Home care in Croydon</li>
            </ol>
          </nav>

          <h1
            className="mt-8 text-4xl font-normal tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl"
            style={serif}
          >
            Home care in Croydon
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-neutral-600 sm:text-lg">
            Naptec Care provides professional elderly care at home across Croydon —
            helping older adults stay safe, independent, and comfortable with
            personalised support from trained, compassionate caregivers.
          </p>
          <Link href="/enquire" className={`mt-8 inline-block ${btnPrimary}`}>
            Book a free consultation
          </Link>
        </div>

        <div className="mx-auto mt-14 max-w-6xl sm:mt-16">
          <h2
            className="text-3xl font-normal text-neutral-900 sm:text-4xl"
            style={serif}
          >
            Elderly care services we provide in Croydon
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-neutral-600">
            Whether you need a few hours of companionship each week or continuous
            live-in support, we tailor home care to your family&apos;s needs. Explore
            our most requested services below.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {serviceLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-lg border border-neutral-200 bg-[#fafafa] px-4 py-3 text-sm font-medium text-[#3B2A8F] transition-colors hover:border-[#3B2A8F]/30 hover:bg-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto mt-14 max-w-6xl sm:mt-16">
          <h2
            className="text-3xl font-normal text-neutral-900 sm:text-4xl"
            style={serif}
          >
            Why families choose Naptec for home care in Croydon
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-neutral-600">
            <p>
              Choosing home care is a big decision. We make it straightforward with
              a free consultation, clear care plans, and caregivers matched to your
              loved one&apos;s personality and routines — not a one-size-fits-all rota.
            </p>
            <p>
              From personal care and medication reminders to dementia support and
              respite for family carers, our team supports clients across Croydon
              including Thornton Heath, Purley, Coulsdon, and Addiscombe.
            </p>
            <p>
              Learn more about{" "}
              <Link
                href="/advice-and-care/cost-of-care"
                className="font-medium text-[#3B2A8F] underline underline-offset-4"
              >
                home care costs and funding
              </Link>
              , read our{" "}
              <Link
                href="/advice-and-care/faqs"
                className="font-medium text-[#3B2A8F] underline underline-offset-4"
              >
                home care FAQs
              </Link>
              , or see{" "}
              <Link
                href="/how-it-works"
                className="font-medium text-[#3B2A8F] underline underline-offset-4"
              >
                how our care process works
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <RelatedServices
        slugs={[
          "domiciliary-care",
          "dementia-and-alzheimers",
          "live-in-care",
          "personal-care",
          "respite-care",
          "overnight-care",
        ]}
        heading="Explore our home care services"
      />

      <section className="border-t border-neutral-100 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <AccordionList badge="FAQs" items={faqItems} />
        </div>
      </section>
    </main>
  );
}
