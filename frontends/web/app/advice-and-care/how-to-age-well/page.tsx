import ContentCarousel, { type CarouselCard } from "@/components/ContentCarousel";
import GetInTouch from "@/components/GetInTouch";
import { articles as articleContent } from "@/lib/article-content";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "How To Age Well | Naptec",
  description:
    "Practical support for healthy ageing at home. Naptec helps families age well with dignified care in familiar surroundings.",
};

const serif = { fontFamily: "var(--font-playfair), ui-serif, serif" } as const;

const pillars = [
  {
    title: "Health & Wellbeing",
    description:
      "We all need to take care of our health and wellbeing no matter our age. We provide tips on different ways to exercise or keep your mind active.",
    href: "/advice-and-care/articles",
  },
  {
    title: "Nutrition",
    description:
      "We aim to raise awareness of the importance of maintaining healthy eating habits and reducing the risk of malnutrition to keep older people healthy at home.",
    href: "/advice-and-care/articles",
  },
  {
    title: "Mental Health",
    description:
      "Getting older does not necessarily mean your mental abilities will be impacted. Keeping an active mind can help keep you physically and mentally well at home.",
    href: "/advice-and-care/articles",
  },
  {
    title: "Frailty",
    description:
      "Frailty is a common condition in which older people become less able to recover from difficulties during everyday life. We offer advice on recovery and fall prevention.",
    href: "/advice-and-care/articles",
  },
] as const;

const guideSlugs = [
  "daily-wellness-tips-for-older-adults",
  "the-importance-of-staying-active-in-later-life",
  "healthy-eating-habits-for-seniors",
  "simple-ways-to-improve-everyday-wellbeing",
  "how-home-care-supports-independent-living",
  "the-value-of-companionship-and-social-connection",
];

const guideCards: CarouselCard[] = articleContent
  .filter((article) => guideSlugs.includes(article.slug))
  .map((article) => ({
    image: article.image,
    title: article.title,
    href: `/advice-and-care/articles/${article.slug}`,
  }));

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

export default function HowToAgeWellPage() {
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
              <li className="font-medium text-neutral-800">How To Age Well</li>
            </ol>
          </nav>

          <h1
            className="mt-8 text-4xl font-normal tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl"
            style={serif}
          >
            How to age well
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-neutral-600 sm:text-lg">
            Getting older can bring challenges that are felt by the whole family;
            let&apos;s face them head on together.
          </p>
        </div>

        <ContentBlock
          heading="At Naptec, we're here to help you age well"
          image="https://res.cloudinary.com/dw1n6qugv/image/upload/v1778932857/centre-for-ageing-better-rQJ3xo-0WYE-unsplash_mhe64i.jpg"
          imageAlt="Older adults enjoying time together at home"
          cta={{ label: "Learn more", href: "/advice-and-care/cost-of-care" }}
        >
          <p>
            Growing old can be difficult, both for the person who is ageing and
            their family. It can be frustrating because they cannot do everything
            they used to and may feel as if they are losing their independence.
            There is only so much that loved ones can do to help.
          </p>
          <p>
            At Naptec, we help people age well by making it possible for them to
            stay at home whilst receiving high-quality, dignified care, whatever
            their needs are. Learn more about how we can help with care costs and
            funding.
          </p>
        </ContentBlock>

        <ContentBlock
          heading="How do people react to ageing?"
          image="https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933400/pexels-kampus-8949833_tldckz.jpg"
          imageAlt="Family conversation about ageing and care"
          reverse
          cta={{ label: "Discover how we can help you", href: "/enquire" }}
        >
          <p>
            There is no simple answer. As a parent becomes older, you might spot
            some changes in their behaviour. Perhaps they start to forget
            appointments, eat or drink less often, take more time to walk to the
            supermarket, or their eyesight might deteriorate. These are often early
            signs that it is time to get some support.
          </p>
          <p>
            Having this conversation is not always easy. Your loved one might see
            this as the first step to losing their independence. But talking about
            care sooner rather than later makes it a more natural process that they
            can be in full control of.
          </p>
          <p>
            Worried your loved one is forgetting things too often? Take a look at
            our guide on how to spot the early signs of dementia in our{" "}
            <Link
              href="/advice-and-care/articles"
              className="font-medium text-[#3B2A8F] underline underline-offset-4"
            >
              articles
            </Link>
            .
          </p>
        </ContentBlock>

        <ContentBlock
          heading="Can home care slow ageing?"
          image="https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933400/pexels-olly-3768131_mdki5q.jpg"
          imageAlt="Caregiver supporting an older adult at home"
        >
          <p>
            Home care has all sorts of benefits, not least the chance to stay in
            familiar surroundings. Often, homes are bursting with happy memories,
            so it can be heartbreaking and incredibly disruptive to move out,
            especially for people living with dementia. Residential care does not
            have to be the answer for anyone struggling with day-to-day tasks.
          </p>
          <p>
            Your older loved one could benefit hugely from somebody making care
            visits to their home and giving support when needed. Over the years we
            have found that caring for somebody at home early on can prevent
            accidents and even delay the need to move out. Our caregivers build a
            strong relationship with the person they visit, helping them spot any
            changes in health or behaviour and taking the necessary actions to
            prevent the situation from worsening.
          </p>
        </ContentBlock>

        <div className="mx-auto mt-16 max-w-6xl sm:mt-20">
          <div className="grid gap-6 sm:grid-cols-2">
            {pillars.map((pillar) => (
              <article
                key={pillar.title}
                className="rounded-2xl bg-[#f4f4f4] p-8"
              >
                <h3
                  className="text-2xl font-normal text-neutral-900"
                  style={serif}
                >
                  {pillar.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-neutral-600">
                  {pillar.description}
                </p>
                <Link
                  href={pillar.href}
                  className="mt-5 inline-block text-sm font-medium text-[#3B2A8F] underline underline-offset-4 transition-colors hover:text-[#2d1f6d]"
                >
                  Discover more
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <GetInTouch />

      <ContentCarousel
        title="Guides"
        cards={guideCards}
        ariaLabel="How to age well guides"
      />
    </main>
  );
}
