import ContentCarousel, { type CarouselCard } from "@/components/ContentCarousel";
import GetInTouch from "@/components/GetInTouch";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "The Cost of Home Care | Naptec",
  description:
    "Understand the costs and financial support available when considering home care options with Naptec.",
};

const serif = { fontFamily: "var(--font-playfair), ui-serif, serif" } as const;

const regionCards = [
  {
    title: "England",
    description:
      "Useful information regarding the cost of care for those considering care in England.",
    href: "/advice-and-care/articles",
  },
  {
    title: "Scotland",
    description:
      "Helpful guidance on understanding your care options and costs if you live in Scotland.",
    href: "/advice-and-care/articles",
  },
  {
    title: "Wales",
    description:
      "Advice on understanding care options and cost for those living in Wales.",
    href: "/advice-and-care/articles",
  },
  {
    title: "Northern Ireland",
    description:
      "Guidance on your care options and the cost of them if you live in Northern Ireland.",
    href: "/advice-and-care/articles",
  },
] as const;

const packageExamples = [
  "One client required 7 hours of home visits to take care of their personal care needs, and this cost £231 per week",
  "One client was living with mid-stage dementia and needed a package of specialist care for 14 hours per week, which cost £490 per week",
  "One client with diabetes required 14 hours of home visits per week for diabetes monitoring and other health care needs, and this cost £518 per week",
] as const;

const guideCards: CarouselCard[] = [
  {
    image:
      "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933400/pexels-kampus-8949833_tldckz.jpg",
    title: "Paying for care: who pays what?",
    href: "/advice-and-care/cost-of-care",
  },
  {
    image:
      "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933400/pexels-olly-3768131_mdki5q.jpg",
    title: "Financial benefits for pensioners: topping up your income",
    href: "/advice-and-care/articles",
  },
  {
    image:
      "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933399/pexels-olly-3791666_nap6fe.jpg",
    title: "The benefits of home care versus a care home",
    href: "/advice-and-care/articles",
  },
  {
    image:
      "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933382/pexels-jsme-mila-523821574-18459193_nlhoas.jpg",
    title: "What is home or domiciliary care?",
    href: "/what-we-do/domiciliary-care",
  },
  {
    image:
      "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933365/pexels-kampus-7551662_ock8o9.jpg",
    title: "How to age well at home",
    href: "/advice-and-care/how-to-age-well",
  },
];

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
        <h2
          className="text-3xl font-normal leading-tight text-neutral-900 sm:text-4xl"
          style={serif}
        >
          {heading}
        </h2>
        <div className="mt-5 space-y-4 text-base leading-relaxed text-neutral-600">
          {children}
          {cta ? (
            <p className="pt-2">
              <Link
                href={cta.href}
                className="text-sm font-medium text-[#3B2A8F] underline underline-offset-4 transition-colors hover:text-[#2d1f6d]"
              >
                {cta.label}
              </Link>
            </p>
          ) : null}
        </div>
      </div>
      <div
        className={`relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-[#f2f2f2] ${reverse ? "lg:order-1" : ""}`}
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

function InlineLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="font-medium text-[#3B2A8F] underline underline-offset-4 transition-colors hover:text-[#2d1f6d]"
    >
      {children}
    </Link>
  );
}

export default function CostOfCarePage() {
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
                The Cost of Elderly Care
              </li>
            </ol>
          </nav>

          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-[#3B2A8F]">
            Funding Guidance
          </p>
          <h1
            className="mt-4 text-4xl font-normal tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl"
            style={serif}
          >
            The cost of home care
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-neutral-600 sm:text-lg">
            Understanding the costs and financial support available when
            considering care options.
          </p>

          <div className="relative mt-10 aspect-[21/9] w-full overflow-hidden rounded-sm bg-[#f2f2f2] sm:mt-12">
            <Image
              src="https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933350/pexels-jsme-mila-523821574-29372720_niar1j.jpg"
              alt="Family discussing care costs at home"
              fill
              priority
              sizes="(max-width: 1152px) 100vw, 1152px"
              className="object-cover"
            />
          </div>
        </div>

        <ContentBlock
          heading="Understanding the cost of home care"
          image="https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933332/pexels-jsme-mila-523821574-18429571_lahwba.jpg"
          imageAlt="Care professional supporting a client at home"
        >
          <p>
            Everyone wants the very best care for themselves and their loved
            ones, but the financial considerations of this are undoubtedly
            important and a big part of your decision. If you are unsure where
            to begin when it comes to finding out the cost of the home care
            services you need, we can help by providing a general overview of
            the average prices in different regions around the UK.
          </p>
          <p>
            Home care can offer an excellent, cost-effective alternative to care
            homes that is helpful for those looking for additional support with
            everything from personal care to medical care, so if you are
            currently looking into the home care options available to you,
            you&apos;re in the right place.
          </p>
          <p>
            At Naptec, our aim is to help people age positively and in place by
            bringing expert care to their home. For many years we have been
            providing the highest standard of care, with industry-leading
            training for our caregivers accredited by nursing and medical
            professionals. Whatever questions you have about arranging home care
            services, we can help.
          </p>
        </ContentBlock>

      </section>

      <GetInTouch />

      <section className="px-4 pb-10 sm:px-6 sm:pb-14 lg:px-8 lg:pb-16">
        <ContentBlock
          heading="What does home care involve?"
          image="https://res.cloudinary.com/dw1n6qugv/image/upload/v1778932857/centre-for-ageing-better-rQJ3xo-0WYE-unsplash_mhe64i.jpg"
          imageAlt="Caregiver helping with daily activities at home"
          reverse
          cta={{
            label: "Read our guide to what home or domiciliary care is",
            href: "/what-we-do/domiciliary-care",
          }}
        >
          <p>
            Home care (sometimes called domiciliary care) means care received in
            someone&apos;s own home instead of in a hospital, clinic, care home
            or elsewhere. This could mean help with daily activities like
            cooking or getting dressed, or more intensive medical support.
            Whatever you require, if you are not yet ready to move to a care
            home, your needs can likely be met in the comfort of your own home
            by a trained professional.
          </p>
        </ContentBlock>

        <ContentBlock
          heading="Is home care more affordable than a care home?"
          image="https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933400/pexels-kampus-8949833_tldckz.jpg"
          imageAlt="Older adult receiving care at home"
          cta={{
            label: "Read our guide to the benefits of home care versus a care home",
            href: "/advice-and-care/articles",
          }}
        >
          <p>
            Data from the National Audit Office suggests that the projected
            increase in adults aged 65+ requiring care by 2038 is 57% (compared
            with 2018), and the projected increase in the cost of that care for
            the same demographic is 106%. Not only is demand for care homes set
            to increase, but the price of care will increase too. Home care can
            provide a more affordable alternative to a care home that allows you
            to pay only for the care you need.
          </p>
          <p>
            Since the government actively aims to keep older people living at
            home for as long as possible, there are many support options in place
            if you are interested in choosing home care over moving to a care
            home.
          </p>
        </ContentBlock>

        <div className="mx-auto mt-14 max-w-6xl sm:mt-16 lg:mt-20">
          <h2
            className="text-3xl font-normal leading-tight text-neutral-900 sm:text-4xl"
            style={serif}
          >
            How much does home care cost?
          </h2>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-neutral-600">
            <p>
              As of recent figures, there are thousands of domiciliary care
              services registered with the Care Quality Commission, and all will
              have their own price points. The cost of home care will always
              depend on the services you need (i.e. companionship, specialist
              medical care, housekeeping, etc.), how often you require them
              throughout the week, and the area you live in.
            </p>
            <p>
              With so many home care agencies available, we understand it can be
              hard to know which price point you should be looking at. As a
              provider of home care services, at Naptec we are proud to offer
              premium packages with the highest quality of care, while being
              upfront about costs and ensuring that what we offer our clients is
              fully transparent and fits within their budget – with us, you
              never need to worry about hidden or surprise bills.
            </p>
            <p>
              Depending on where in the UK you are based, you could be looking at
              a slightly different average hourly cost of home care services, so
              the following examples should offer some insight into what you
              might expect to pay in your area:
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:gap-6">
            {regionCards.map((region) => (
              <article
                key={region.title}
                className="rounded-xl bg-[#f4f4f2] p-8 sm:p-9"
              >
                <h3
                  className="text-2xl font-normal text-[#3B2A8F]"
                  style={serif}
                >
                  {region.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-neutral-600 sm:text-base">
                  {region.description}
                </p>
                <Link
                  href={region.href}
                  className="mt-5 inline-block text-sm font-medium text-[#3B2A8F] underline underline-offset-4 transition-colors hover:text-[#2d1f6d]"
                >
                  Discover more
                </Link>
              </article>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-6xl sm:mt-16 lg:mt-20">
          <h2
            className="text-3xl font-normal leading-tight text-neutral-900 sm:text-4xl"
            style={serif}
          >
            Is home care paid hourly or daily?
          </h2>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-neutral-600">
            <p>
              There are many options when it comes to how you will pay for your
              home care, and this will depend on the services you need and the
              options offered by your service provider.
            </p>
            <p>
              For example, if you need ad hoc respite care, this may be billed
              at an hourly rate. Or, if you have a contract with an agency for
              several hours of personal care each week, this may be billed as a
              daily rate.
            </p>
            <p>
              At Naptec, we know that there is no one-size-fits-all when it comes
              to home care, so your package will be completely unique to your
              situation, location, health conditions and other needs. Here are
              some examples of the bespoke packages we have offered to clients in
              the past:
            </p>
          </div>
          <ul className="mt-6 space-y-4 rounded-xl bg-[#f4f4f2] p-8 sm:p-9">
            {packageExamples.map((example) => (
              <li
                key={example}
                className="flex gap-3 text-sm leading-relaxed text-neutral-700 sm:text-base"
              >
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#3B2A8F]"
                  aria-hidden
                />
                {example}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-base leading-relaxed text-neutral-600">
            Whatever your needs, our team of caregivers at Naptec can provide
            exactly what you require and more. Feel free to{" "}
            <InlineLink href="/enquire">reach out to us</InlineLink> at any time
            to discuss the cost of your bespoke home care services.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-6xl sm:mt-16 lg:mt-20">
          <h2
            className="text-3xl font-normal leading-tight text-neutral-900 sm:text-4xl"
            style={serif}
          >
            Do I need to pay for my own home care?
          </h2>
          <div className="mt-6 max-w-3xl space-y-5 text-base leading-[1.85] text-neutral-600 sm:text-lg sm:leading-[1.9]">
            <p>
              You may have to pay for your own home care, but you could also be
              eligible for support or full funding from your local council. We
              have guidance dedicated to figuring out how to pay for your home
              care services:{" "}
              <InlineLink href="/advice-and-care/articles">
                Paying For Care: Who Pays What?
              </InlineLink>
            </p>
            <p>
              You may also be entitled to benefits that could help with the cost
              of your home care. You can read more about these here:{" "}
              <InlineLink href="/advice-and-care/articles">
                Financial Benefits For Pensioners: Topping Up Your Income
              </InlineLink>
            </p>
          </div>
        </div>

        <ContentBlock
          heading="How do I arrange home care for myself or a loved one?"
          image="https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933400/pexels-olly-3768131_mdki5q.jpg"
          imageAlt="Naptec caregiver with a client at home"
          reverse
        >
          <p>
            We understand there&apos;s no place like home, so our Naptec care
            offering aims to help older individuals retain independence and stay
            in familiar surroundings. We offer a number of bespoke services
            which can be tailored to your needs, and our caregivers are highly
            trained to deliver the individualised service you need.
          </p>
          <p>
            We&apos;re an award-winning home care provider devoted to providing
            the highest-quality relationship-led care for older people in their
            own homes. Arranging care for yourself or your loved one
            shouldn&apos;t be stressful, so whatever questions you would like
            answered, feel free to{" "}
            <InlineLink href="/enquire">
              reach out to the Naptec team
            </InlineLink>{" "}
            to discuss your needs.
          </p>
        </ContentBlock>
      </section>

      <ContentCarousel
        title="Guides"
        cards={guideCards}
        ariaLabel="Cost of care guides"
      />
    </main>
  );
}
