import ContentCarousel from "@/components/ContentCarousel";
import { costOfCareGuideCards } from "@/lib/carousel-cards";
import {
  bodyText,
  btnPrimary,
  btnPrimaryInverse,
  cardBase,
  containerClass,
  labelEyebrow,
  sectionBgBrand,
  sectionPy,
  sectionTitle,
} from "@/lib/layout";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Home Care Costs & Funding Guide | Naptec – Croydon",
  description:
    "Understand home care costs and funding in Croydon. Compare home care vs care homes, explore financial support, and book a free consultation with Naptec Care.",
};

const costFactors = [
  "The type of care required",
  "The number of care hours needed each week",
  "Whether specialist support is required",
  "Your location",
  "The complexity of care needs",
] as const;

const fundingOptions = [
  "Local Authority funding",
  "NHS Continuing Healthcare funding",
  "Attendance Allowance",
  "Pension Credit",
  "Other disability-related benefits",
] as const;

const croydonLinks = [
  {
    title: "Home care in Croydon",
    description:
      "We provide professional home care across Croydon. Speak with our team for a personalised quote based on your care needs.",
    href: "/home-care-croydon",
    linkText: "Explore home care in Croydon",
  },
  {
    title: "Our care services",
    description:
      "Personal care, dementia support, live-in care, respite, and more — find the type of support that fits your situation.",
    href: "/what-we-do/domiciliary-care",
    linkText: "View our home care services",
  },
  {
    title: "Funding & FAQs",
    description:
      "Answers on arranging care, what to expect, and how we can help you understand your options.",
    href: "/advice-and-care/faqs",
    linkText: "View home care FAQs",
  },
] as const;

const textLink =
  "text-sm font-medium text-brand underline underline-offset-4 transition-colors hover:text-brand-dark";

function ContentBlock({
  heading,
  children,
  image,
  imageAlt,
  reverse = false,
  cta,
}: {
  heading: string;
  children: ReactNode;
  image: string;
  imageAlt: string;
  reverse?: boolean;
  cta?: { label: string; href: string };
}) {
  return (
    <div
      className={`mx-auto mt-14 grid max-w-6xl gap-8 sm:mt-16 lg:mt-20 lg:grid-cols-2 lg:items-center lg:gap-12`}
    >
      <div className={reverse ? "lg:order-2" : ""}>
        <h2 className="text-3xl font-normal leading-tight text-neutral-900 sm:text-4xl">
          {heading}
        </h2>
        <div className={`mt-5 space-y-4 ${bodyText}`}>
          {children}
          {cta ? (
            <p className="pt-2">
              <Link href={cta.href} className={textLink}>
                {cta.label}
              </Link>
            </p>
          ) : null}
        </div>
      </div>
      <div
        className={`relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-surface-card ${reverse ? "lg:order-1" : ""}`}
      >
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}

function ProseSection({
  heading,
  children,
  id,
}: {
  heading: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <div id={id} className="mx-auto mt-14 max-w-6xl scroll-mt-28 sm:mt-16 lg:mt-20">
      <h2 className="text-3xl font-normal leading-tight text-neutral-900 sm:text-4xl">
        {heading}
      </h2>
      <div className={`mt-5 space-y-4 ${bodyText}`}>{children}</div>
    </div>
  );
}

function InlineLink({ href, children }: { href: string; children: ReactNode }) {
  if (href.startsWith("http://") || href.startsWith("https://")) {
    return (
      <a
        href={href}
        className={textLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={textLink}>
      {children}
    </Link>
  );
}

function BulletCardList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-8 grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li
          key={item}
          className={`flex gap-3 ${cardBase} !p-5 text-sm leading-relaxed text-body sm:text-base`}
        >
          <span
            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
            aria-hidden
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function CostOfCarePage() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb" className="text-sm text-muted">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="transition-colors hover:text-brand">
                  Home
                </Link>
              </li>
              <li aria-hidden className="text-neutral-300">
                /
              </li>
              <li>
                <Link
                  href="/advice-and-care"
                  className="transition-colors hover:text-brand"
                >
                  Advice &amp; Support
                </Link>
              </li>
              <li aria-hidden className="text-neutral-300">
                /
              </li>
              <li className="font-medium text-neutral-800">
                The cost of home care
              </li>
            </ol>
          </nav>

          <p className={`mt-8 ${labelEyebrow}`}>Funding Guidance</p>
          <h1 className={`mt-4 tracking-tight text-neutral-900 ${sectionTitle}`}>
            The cost of home care
          </h1>
          <p className={`mt-6 max-w-3xl ${bodyText}`}>
            Practical guidance on home care costs and funding in Croydon and across
            the UK — so you can understand your options, compare care at home with
            residential care, and find support that fits your family&apos;s needs.
          </p>

          <div className="relative mt-10 aspect-[21/9] w-full overflow-hidden rounded-2xl bg-surface-card sm:mt-12">
            <Image
              src="https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933350/pexels-jsme-mila-523821574-29372720_niar1j.jpg"
              alt="Family discussing home care costs at home"
              fill
              priority
              sizes="(max-width: 1152px) 100vw, 1152px"
              className="object-cover"
            />
          </div>
        </div>

        <ContentBlock
          heading="What does home care involve?"
          image="https://res.cloudinary.com/dw1n6qugv/image/upload/v1778932857/centre-for-ageing-better-rQJ3xo-0WYE-unsplash_mhe64i.jpg"
          imageAlt="Caregiver helping with daily activities at home"
          cta={{
            label: "Read our guide to domiciliary care",
            href: "/what-we-do/domiciliary-care",
          }}
        >
          <p>
            Home care (sometimes called domiciliary care) means care received in
            someone&apos;s own home instead of in a hospital, clinic, care home,
            or elsewhere. This could mean help with daily activities like cooking
            or getting dressed, or more intensive support when needed.
          </p>
        </ContentBlock>

        <ContentBlock
          heading="Is home care more affordable than a care home?"
          image="https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933400/pexels-kampus-8949833_tldckz.jpg"
          imageAlt="Older adult receiving care at home"
          reverse
        >
          <p>
            For many families, home care can be a more cost-effective alternative
            to residential care, particularly when only a few hours of support are
            needed each day.
          </p>
          <p>
            According to recent UK care sector data, the average cost of a
            residential care home can exceed £1,300 per week, while nursing homes
            often cost £1,500 per week or more. In contrast, home care allows
            individuals to pay only for the support they require, whether
            that&apos;s a few visits per week, daily assistance, or specialist care.
          </p>
          <p>
            Beyond financial considerations, home care offers the added benefits of
            remaining in familiar surroundings, maintaining independence, and
            receiving one-to-one support tailored to individual needs.
          </p>
          <p className="pt-2">
            <Link href="/enquire" className={btnPrimary}>
              Contact Naptec Care for a personalised assessment
            </Link>
          </p>
        </ContentBlock>

        <ProseSection heading="How much does home care cost?" id="how-much">
          <p>
            The cost of home care varies depending on several factors, including:
          </p>
          <BulletCardList items={costFactors} />
          <p>
            Industry sources suggest that home care costs across the UK can vary
            significantly depending on the level of support required. Because every
            situation is unique, the most accurate way to understand the likely
            cost of care is through a personalised assessment.
          </p>
          <p>
            At Naptec Care, we create bespoke care plans based on individual needs,
            ensuring clients receive the right level of support without paying for
            services they don&apos;t need.
          </p>
          <p>
            Naptec Care provides home care across Croydon. For a quote tailored to
            your situation, speak with our team — we&apos;ll explain costs clearly
            with no obligation.
          </p>
          <p>
            <Link href="/enquire" className={textLink}>
              Get in touch for a personalised care quote
            </Link>
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {croydonLinks.map((item) => (
              <article key={item.title} className={`flex flex-col ${cardBase}`}>
                <h3 className="text-xl font-normal text-brand sm:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-body sm:text-base">
                  {item.description}
                </p>
                <Link href={item.href} className={`mt-5 inline-block ${textLink}`}>
                  {item.linkText}
                </Link>
              </article>
            ))}
          </div>
        </ProseSection>

        <ProseSection heading="Can I get financial help with home care?" id="funding">
          <p>
            Many people are surprised to learn that financial support may be
            available to help cover the cost of care.
          </p>
          <p>Depending on your circumstances, you may be eligible for:</p>
          <BulletCardList items={fundingOptions} />
          <p>
            Our team can help point you in the right direction and explain the
            options that may be available to you. You may also find these official
            resources helpful:
          </p>
          <ul className="mt-6 space-y-3 text-base leading-relaxed text-body">
            <li>
              <InlineLink href="https://www.nhs.uk/social-care-and-support/money-work-and-benefits/paying-for-your-own-care-self-funding/">
                Paying for your own care (NHS)
              </InlineLink>
            </li>
            <li>
              <InlineLink href="https://www.gov.uk/pension-credit/what-youll-get">
                Pension Credit (GOV.UK)
              </InlineLink>
            </li>
            <li>
              <InlineLink href="/advice-and-care/faqs">
                Naptec home care FAQs
              </InlineLink>
            </li>
          </ul>
        </ProseSection>

        <ContentBlock
          heading="How do I arrange home care for myself or a loved one?"
          image="https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933400/pexels-olly-3768131_mdki5q.jpg"
          imageAlt="Naptec caregiver with a client at home"
          reverse
        >
          <p>
            We understand there&apos;s no place like home. Naptec Care provides
            professional, relationship-led home care for older people in their own
            homes across Croydon and nearby areas.
          </p>
          <p>
            Arranging care shouldn&apos;t be stressful. Whatever questions you have,
            our team is here to guide you through funding, care options, and next
            steps — starting with a free, no-obligation conversation.
          </p>
        </ContentBlock>
      </section>

      <section
        className={`${sectionBgBrand} ${sectionPy} text-white`}
        aria-labelledby="cost-care-cta-heading"
      >
        <div className={`${containerClass} max-w-3xl`}>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            Free consultation
          </p>
          <h2
            id="cost-care-cta-heading"
            className={`mt-4 text-white ${sectionTitle}`}
          >
            Need help understanding the cost of care?
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/90 sm:text-lg">
            Every care journey is different. Contact Naptec Care today for a free
            consultation and personalised care assessment. We&apos;ll help you
            understand your options, discuss funding possibilities, and create a
            care plan tailored to your needs.
          </p>
          <Link href="/enquire" className={`mt-8 ${btnPrimaryInverse}`}>
            Enquire today
          </Link>
        </div>
      </section>

      <ContentCarousel
        title="Guides"
        cards={costOfCareGuideCards}
        ariaLabel="Cost of care guides"
        viewAllHref="/advice-and-care/articles"
      />
    </main>
  );
}
