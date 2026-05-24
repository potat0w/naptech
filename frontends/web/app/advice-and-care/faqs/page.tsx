import AccordionList from "@/components/AccordionList";
import { JsonLd, faqPageSchema } from "@/lib/seo/json-ld";
import { mainHomeCareFaqs } from "@/lib/seo/site-faqs";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Care FAQs | Costs, Dementia & Getting Started | Naptec",
  description:
    "Answers to common home care questions — services, costs, dementia care, caregiver matching, and areas we cover in Croydon.",
};

const serif = { fontFamily: "var(--font-playfair), ui-serif, serif" } as const;

const faqs = mainHomeCareFaqs.map((faq) => ({
  id: faq.id,
  title: faq.title,
  content: <p>{faq.answer}</p>,
}));

export default function FaqsPage() {
  return (
    <main className="flex flex-1 flex-col">
      <JsonLd data={faqPageSchema(mainHomeCareFaqs)} />
      <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-5xl">
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
              <li>
                <Link
                  href="/advice-and-care"
                  className="transition-colors hover:text-[#3B2A8F]"
                >
                  Advice &amp; Support
                </Link>
              </li>
              <li aria-hidden className="text-neutral-300">
                /
              </li>
              <li className="font-medium text-neutral-800">
                Home care FAQs
              </li>
            </ol>
          </nav>

          <h1
            className="mt-8 text-4xl font-normal tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl"
            style={serif}
          >
            Home care FAQs
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-neutral-600 sm:text-lg">
            Common questions about home care, costs, dementia support, and getting
            started with Naptec in Croydon.{" "}
            <Link
              href="/home-care-croydon"
              className="font-medium text-[#3B2A8F] underline underline-offset-4"
            >
              View our Croydon home care guide
            </Link>{" "}
            or{" "}
            <Link
              href="/enquire"
              className="font-medium text-[#3B2A8F] underline underline-offset-4"
            >
              book a free consultation
            </Link>
            .
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-5xl sm:mt-16">
          <AccordionList badge="FAQs" items={faqs} />
        </div>
      </section>
    </main>
  );
}
