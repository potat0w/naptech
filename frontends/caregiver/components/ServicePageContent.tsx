import AccordionList from "@/components/AccordionList";
import ContentCarousel from "@/components/ContentCarousel";
// import FaqTestimonials from "@/components/FaqTestimonials";
import CareOfferingsCarousel from "@/components/CareOfferingsCarousel";
import GetInTouch from "@/components/GetInTouch";
import { btnPrimary } from "@/lib/layout";
import type { ServicePage } from "@/lib/services";
import Image from "next/image";
import Link from "next/link";

const serif = { fontFamily: "var(--font-playfair), ui-serif, serif" } as const;

const defaultGuides: { image: string; title: string; href: string }[] = [];

export default function ServicePageContent({ service }: { service: ServicePage }) {
  const faqItems = service.faqs.map((faq) => ({
    id: faq.id,
    title: faq.title,
    content: <p>{faq.answer}</p>,
  }));

  const guides = service.guides ?? defaultGuides;
  const showConfused = service.showConfusedSection !== false;

  return (
    <main className="flex flex-1 flex-col">
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
              {!service.isCategory ? (
                <>
                  <li>
                    <Link
                      href={service.parentHref}
                      className="transition-colors hover:text-[#3B2A8F]"
                    >
                      {service.parentLabel}
                    </Link>
                  </li>
                  <li aria-hidden className="text-neutral-300">
                    /
                  </li>
                </>
              ) : null}
              <li className="font-medium text-neutral-800">{service.title}</li>
            </ol>
          </nav>

          <h1
            className="mt-8 text-4xl font-normal tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl"
            style={serif}
          >
            {service.title}
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-neutral-600 sm:text-lg">
            {service.intro}
          </p>
        </div>

        {service.sections.map((section, index) => (
          <div
            key={section.heading}
            className={`mx-auto mt-14 grid max-w-6xl gap-8 sm:mt-16 lg:mt-20 lg:grid-cols-2 lg:items-center lg:gap-12`}
          >
            <div className={index % 2 === 1 ? "lg:order-2" : ""}>
              <h2
                className="text-3xl font-normal leading-tight text-neutral-900 sm:text-4xl"
                style={serif}
              >
                {section.heading}
              </h2>
              <div className="mt-5 space-y-4 text-base leading-relaxed text-neutral-600">
                {section.paragraphs.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
                {section.bullets ? (
                  <ul className="list-disc space-y-2 pl-5">
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
                {section.cta ? (
                  <p className="pt-2">
                    <Link
                      href={section.cta.href}
                      className={btnPrimary}
                    >
                      {section.cta.label}
                    </Link>
                  </p>
                ) : null}
                {section.discoverMore ? (
                  <p className="pt-2">
                    <Link
                      href={section.discoverMore.href ?? "/enquire"}
                      className="text-sm font-medium text-[#3B2A8F] underline underline-offset-4"
                    >
                      Discover more
                    </Link>
                  </p>
                ) : null}
              </div>
            </div>
            <div
              className={`relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-[#f2f2f2] ${index % 2 === 1 ? "lg:order-1" : ""}`}
            >
              <Image
                src={section.image}
                alt={section.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </section>

      <section className="border-y border-neutral-100 bg-[#faf8f4] px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2
              className="text-3xl font-normal text-neutral-900 sm:text-4xl"
              style={serif}
            >
              How can we <em className="italic">help?</em>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-neutral-600">
              We have helped thousands of families to stay safe, comfortable and
              happy at home. Whatever situation you are facing, Naptec is here to
              help.
            </p>
            <p className="mt-6 text-sm text-neutral-600">
              Are you in need of a little guidance right away?
            </p>
            <Link
              href="/enquire"
              className="mt-6 inline-block text-sm text-neutral-600 underline underline-offset-4 transition-colors hover:text-[#3B2A8F]"
            >
              Other non-care-related enquiries
            </Link>
          </div>
          <div className="flex flex-col justify-center">
            <Link
              href="/enquire"
              className={`w-fit ${btnPrimary}`}
            >
              Enquire now
            </Link>
          </div>
        </div>
      </section>

      {/* <FaqTestimonials /> */}

      <CareOfferingsCarousel />

      <GetInTouch />

      {showConfused ? (
        <section className="bg-white px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
            <div>
              <h2
                className="text-3xl font-normal text-neutral-900 sm:text-4xl"
                style={serif}
              >
                Confused about home care? We can help.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                We know you want the best for your loved one. When it comes to
                arranging home care, we have made it easy with personalised,
                attentive care that adapts as your needs change.
              </p>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                From warm and friendly companionship to specialised, practical care
                that puts their needs and preferences first, we are changing the
                way people think about home care.
              </p>
              <Link
                href="/enquire"
                className="mt-6 inline-block text-sm font-medium text-[#3B2A8F] underline underline-offset-4"
              >
                Discover more
              </Link>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-[#f2f2f2]">
              <Image
                src="https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933399/pexels-olly-3791666_nap6fe.jpg"
                alt="Home care support"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>
      ) : null}

      {faqItems.length > 0 ? (
        <section className="border-t border-neutral-100 px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <AccordionList badge="FAQs" items={faqItems} />
          </div>
        </section>
      ) : null}

      {guides.length > 0 ? (
        <ContentCarousel
          title={service.guidesTitle ?? "Guides & Support"}
          cards={guides}
          ariaLabel="Guides and support articles"
        />
      ) : null}
    </main>
  );
}
