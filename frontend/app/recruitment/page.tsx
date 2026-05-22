import AccordionList from "@/components/AccordionList";
import CareProTestimonials from "@/components/CareProTestimonials";
import ContentCarousel, { type CarouselCard } from "@/components/ContentCarousel";
import { btnPrimary, btnPrimaryInverse, containerClass, sectionTitle } from "@/lib/layout";
import {
  Clock,
  HandHeart,
  Monitor,
  Tag,
  UserRound,
  Users,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Home Care Recruitment | Naptec",
  description:
    "Join Naptec as a Care Professional. Make a difference with flexible roles, industry-leading training, and meaningful client relationships.",
};

const serif = { fontFamily: "var(--font-playfair), ui-serif, serif" } as const;

const stats = [
  { value: "96", suffix: "%", label: "are proud to work for Naptec" },
  { value: "95", suffix: "%", label: "feel motivated to go the extra mile" },
  {
    value: "88",
    suffix: "%",
    label: "see themselves working at Naptec in 12 months' time",
  },
  { value: "82", suffix: "%", label: "would recommend Naptec as a great place to work" },
] as const;

const benefits: {
  title: string;
  description: string;
  bg: string;
  icon: LucideIcon;
}[] = [
  {
    title: "One Hour Minimum Visits",
    description:
      "Care should never be rushed, so we've found the best minimum client visit time to be one hour. This helps our Care Professionals focus on the overall health and wellbeing of every client.",
    bg: "#e8ebe4",
    icon: Clock,
  },
  {
    title: "Long Service Recognition",
    description:
      "We wouldn't be industry leaders without the people who've helped us get here. So we're passionate about recognising and rewarding employees for the time they've been with us.",
    bg: "#ebe8f4",
    icon: HandHeart,
  },
  {
    title: "Online Discounts",
    description:
      "We have hundreds of discounts for high street retailers, helping our staff live even more enjoyable and fulfilling lives.",
    bg: "#e8f0f4",
    icon: Tag,
  },
  {
    title: "Employee Assistance Program",
    description:
      "Our staff's health and wellbeing is just as important as our clients'. That's why we offer an Employee Assistance Programme to support people through work-related or personal problems that impact their physical or mental health.",
    bg: "#e8f0f4",
    icon: Monitor,
  },
  {
    title: "Client Matching",
    description:
      "We're all about building lasting relationships. So we match Care Professionals and clients based on their personalities and interests, helping them find an instant rapport with clients they're caring for.",
    bg: "#e8ebe4",
    icon: Users,
  },
  {
    title: "Industry Leading Training",
    description:
      "Every Care Professional receives a breadth of professional knowledge and practical skills to help them keep their clients safe, well, and happy at home.",
    bg: "#ebe8f4",
    icon: UserRound,
  },
];

const responsibilities = [
  "Companionship: ensuring a client enjoys regular and meaningful social interaction is an important part of your visit.",
  "Home help for everyday activities and tasks such as planning and preparing a nutritious meal, doing light housework, and accompanying to appointments or shopping.",
  "Personal care: supporting clients with daily essentials such as bathing, showering, dressing and grooming so they can continue to live independently at home.",
  "Specialist care: if a client's needs change or progress you will receive the training to deliver the person-centred care they need, with confidence.",
] as const;

const positions = [
  {
    title: "Part-time",
    description:
      "We offer part-time positions to suit your needs. If weekends or evenings work best we can make that happen.",
  },
  {
    title: "Full-time",
    description:
      "We offer full-time permanent contracts or zero-hour contracts depending on your needs.",
  },
  {
    title: "Live-in",
    description:
      "Live with your client and make life-long bonds whilst offering the support they need.",
  },
] as const;

const guideCards: CarouselCard[] = [
  {
    image:
      "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933382/pexels-jsme-mila-523821574-18459193_nlhoas.jpg",
    title: "How care professionals can promote dignity in care",
    href: "/advice-and-care/articles",
  },
  {
    image:
      "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933365/pexels-kampus-7551662_ock8o9.jpg",
    title: "What it takes to become a professional dementia carer",
    href: "/advice-and-care/articles",
  },
  {
    image:
      "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933350/pexels-jsme-mila-523821574-29372720_niar1j.jpg",
    title: "What to expect from a domiciliary care interview",
    href: "/advice-and-care/articles",
  },
  {
    image:
      "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933332/pexels-jsme-mila-523821574-18429571_lahwba.jpg",
    title: "Complex care roles at Naptec",
    href: "/advice-and-care/articles",
  },
  {
    image:
      "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778932857/centre-for-ageing-better-rQJ3xo-0WYE-unsplash_mhe64i.jpg",
    title: "Jobs and careers in palliative care",
    href: "/advice-and-care/articles",
  },
  {
    image:
      "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933400/pexels-kampus-8949833_tldckz.jpg",
    title: "What skills and qualities does a good carer need?",
    href: "/advice-and-care/articles",
  },
  {
    image:
      "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933400/pexels-olly-3768131_mdki5q.jpg",
    title: "A guide to typical care interview questions",
    href: "/advice-and-care/articles",
  },
  {
    image:
      "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933399/pexels-olly-3791666_nap6fe.jpg",
    title: "What is a live-in carer?",
    href: "/advice-and-care/articles",
  },
];

function ContentBlock({
  heading,
  children,
  image,
  imageAlt,
  reverse = false,
}: {
  heading: string;
  children: ReactNode;
  image: string;
  imageAlt: string;
  reverse?: boolean;
}) {
  return (
    <div
      className={`mx-auto grid max-w-6xl gap-8 lg:grid-cols-2 lg:items-center lg:gap-12 ${reverse ? "" : ""}`}
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

function ApplyButton({
  className = "",
  variant = "primary",
}: {
  className?: string;
  variant?: "primary" | "inverse";
}) {
  return (
    <Link
      href="/recruitment/apply"
      className={`${variant === "inverse" ? btnPrimaryInverse : btnPrimary} ${className}`}
    >
      Apply now
    </Link>
  );
}

function DiscoverMore({ href = "/enquire" }: { href?: string }) {
  return (
    <Link
      href={href}
      className="text-sm font-medium text-[#3B2A8F] underline underline-offset-4 transition-colors hover:text-[#2d1f6d]"
    >
      Discover more
    </Link>
  );
}

export default function RecruitmentPage() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="bg-[#faf8f4]">
        <div
          className={`${containerClass} grid gap-10 py-12 sm:py-16 lg:grid-cols-2 lg:items-center lg:gap-12 lg:py-20`}
        >
          <div>
            <h1
              className="text-4xl font-normal leading-tight text-neutral-900 sm:text-5xl lg:text-6xl"
              style={serif}
            >
              Make a difference by caring for others
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-neutral-600 sm:text-lg">
              Apply now to become a Naptec Care Professional.
            </p>
            <ApplyButton className="mt-8" />
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-[#f2f2f2] lg:aspect-[5/4]">
            <Image
              src="https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933382/pexels-jsme-mila-523821574-18459193_nlhoas.jpg"
              alt="Care professional with a client at home"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <ContentBlock
          heading="A Financial Times best employer"
          image="https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933365/pexels-kampus-7551662_ock8o9.jpg"
          imageAlt="Naptec team celebrating an award"
          reverse
        >
          <p>
            Naptec has been recognised by the Financial Times as one of the{" "}
            <strong className="font-medium text-neutral-800">
              top employers in the UK
            </strong>
            , standing out amongst major companies nationwide.
          </p>
          <p>
            This ranking is based on extensive feedback from employees who rated
            their experiences in areas like workplace environment, compensation,
            career progression, and company image.
          </p>
          <p>
            Achieving a top place, we&apos;re in great company alongside major
            brands — and proud of the culture we&apos;ve built for our Care
            Professionals.
          </p>
        </ContentBlock>

        <div className={`${containerClass} mt-14 sm:mt-16`}>
          <div className="rounded-2xl bg-brand px-6 py-12 text-center text-white sm:px-10 sm:py-14">
            <h2
              className="text-3xl font-normal sm:text-4xl"
              style={serif}
            >
              Ready to join our team?
            </h2>
            <ApplyButton variant="inverse" className="mt-8" />
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-6xl sm:mt-20">
          <h2
            className="text-3xl font-normal leading-tight text-neutral-900 sm:text-4xl"
            style={serif}
          >
            The role of a Care Professional
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-[1.85] text-neutral-600">
            We&apos;re looking for Care Professionals who are kind and
            compassionate and who, by understanding our values and our mission,
            are dedicated to delivering the highest standard of care. To ensure
            continuity for both clients and Care Professionals, you will see the
            same clients every week, with minimum one hour visits, enabling you to
            build a relationship and a routine focused around quality of life in
            the comfort of the client&apos;s home.
          </p>
        </div>
      </section>

      <section className="bg-[#3B2A8F] px-4 py-14 text-white sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className={containerClass}>
          <h2
            className="text-center text-3xl font-normal sm:text-4xl"
            style={serif}
          >
            What our Care Professionals say
          </h2>
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {stats.map((stat) => (
              <div key={stat.value} className="text-center">
                <p className="text-5xl font-normal tabular-nums sm:text-6xl" style={serif}>
                  {stat.value}
                  <span className="text-3xl sm:text-4xl">{stat.suffix}</span>
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/85">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className={`${containerClass} grid gap-10 lg:grid-cols-2 lg:items-center`}>
          <div>
            <h2
              className="text-3xl font-normal leading-tight text-neutral-900 sm:text-4xl"
              style={serif}
            >
              Become a Care Professional today
            </h2>
            <p className="mt-5 text-base leading-relaxed text-neutral-600">
              As a Care Professional, you have the opportunity to make an
              incredible difference the minute you walk through the door, helping
              your clients live a happier life in their own home.
            </p>
            <ApplyButton className="mt-8" />
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-[#f2f2f2]">
            <Image
              src="https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933350/pexels-jsme-mila-523821574-29372720_niar1j.jpg"
              alt="Client and care professional together at home"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className={containerClass}>
          <h2 className={sectionTitle}>Why Naptec</h2>
          <div className="mt-10 grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <article
                  key={benefit.title}
                  className="flex h-full min-h-[17rem] flex-col p-8 sm:min-h-[18rem] sm:p-9"
                  style={{ backgroundColor: benefit.bg }}
                >
                  <Icon
                    className="h-9 w-9 shrink-0 text-neutral-900"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  <h3
                    className="mt-6 text-2xl font-semibold leading-snug text-neutral-900"
                    style={serif}
                  >
                    {benefit.title}
                  </h3>
                  <p className="mt-4 flex-1 text-sm leading-[1.75] text-neutral-800 sm:text-[0.9375rem]">
                    {benefit.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <ContentBlock
          heading="The responsibilities of a Care Professional"
          image="https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933332/pexels-jsme-mila-523821574-18429571_lahwba.jpg"
          imageAlt="Care professional supporting daily living at home"
        >
          <ul className="space-y-4">
            {responsibilities.map((item) => (
              <li key={item} className="flex gap-3">
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#3B2A8F]"
                  aria-hidden
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </ContentBlock>

        <div className="mx-auto mt-16 max-w-6xl sm:mt-20">
          <h2
            className="text-3xl font-normal leading-tight text-neutral-900 sm:text-4xl"
            style={serif}
          >
            Available Care Professional positions
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {positions.map((position) => (
              <article
                key={position.title}
                className="rounded-xl bg-[#f4f4f2] p-8"
              >
                <h3
                  className="text-2xl font-normal text-[#3B2A8F]"
                  style={serif}
                >
                  {position.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-neutral-600 sm:text-base">
                  {position.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CareProTestimonials />

      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-5xl">
          <AccordionList
            badge="FAQs"
            items={[
              {
                id: "benefits",
                title: "What are the benefits of working for Naptec?",
                content: (
                  <div className="space-y-4 text-base leading-relaxed text-neutral-600">
                    <p>
                      Our motto is personal, relationship-led care — and we live
                      up to this every day in how we treat our clients and our Care
                      Professionals. We match Care Professionals to clients based
                      on personalities, interests and hobbies, with continuity so
                      you can build meaningful relationships.
                    </p>
                    <p>
                      All visits are a minimum of one hour long, so there is
                      plenty of time to provide high quality care. When you join
                      Naptec you have the best of both worlds — a community-based
                      business backed by years of expertise in exceptional home
                      care.
                    </p>
                    <DiscoverMore />
                  </div>
                ),
              },
              {
                id: "experience",
                title: "Do I need previous experience within the care sector?",
                content: (
                  <div className="space-y-4 text-base leading-relaxed text-neutral-600">
                    <p>
                      Whether you are new to care entirely or have never provided
                      it in a professional capacity, we welcome people from all
                      backgrounds for their values, enthusiasm and empathy. Care
                      experience is useful but not always necessary — we provide
                      full training so all our Care Professionals can deliver care
                      confidently and competently.
                    </p>
                    <DiscoverMore />
                  </div>
                ),
              },
              {
                id: "training",
                title: "What training does Naptec provide?",
                content: (
                  <div className="space-y-4 text-base leading-relaxed text-neutral-600">
                    <p>
                      Our Care Professionals receive industry-leading training to
                      give them the confidence, knowledge and skills to care for
                      our clients — from basic moving and handling through to
                      specialist dementia and end of life care.
                    </p>
                    <p>
                      We support opportunities to gain recognised qualifications
                      such as Level 2 and 3 in Health and Social Care. As a Care
                      Professional at Naptec you will be supported through bespoke
                      training and ongoing education.
                    </p>
                    <DiscoverMore />
                  </div>
                ),
              },
              {
                id: "services",
                title: "What types of home care services does Naptec offer?",
                content: (
                  <div className="space-y-4 text-base leading-relaxed text-neutral-600">
                    <p>
                      We support clients with all aspects of day-to-day living so
                      they can flourish and remain independent at home — from
                      personal care and home help to companionship, transport to
                      appointments, and overnight or live-in care.
                    </p>
                    <DiscoverMore href="/what-we-do/domiciliary-care" />
                  </div>
                ),
              },
            ]}
          />
        </div>
      </section>

      <ContentCarousel
        title="Guides"
        cards={guideCards}
        ariaLabel="Care recruitment guides"
      />
    </main>
  );
}
