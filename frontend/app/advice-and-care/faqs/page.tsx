import AccordionList from "@/components/AccordionList";
import ContentCarousel, { type CarouselCard } from "@/components/ContentCarousel";
// import FaqTestimonials from "@/components/FaqTestimonials";
import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "FAQs | Naptec",
  description: "Frequently asked questions about Naptec home care services.",
};

const serif = { fontFamily: "var(--font-playfair), ui-serif, serif" } as const;

function DiscoverMore({ href = "/enquire" }: { href?: string }) {
  return (
    <p className="mt-4">
      <Link
        href={href}
        className="text-sm font-medium text-[#3B2A8F] underline underline-offset-4 transition-colors hover:text-[#2d1f6d]"
      >
        Discover more
      </Link>
    </p>
  );
}

function FaqAnswer({ children }: { children: ReactNode }) {
  return <div className="space-y-4">{children}</div>;
}

const adviceCards: CarouselCard[] = [
  {
    image:
      "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933399/pexels-olly-3791666_nap6fe.jpg",
    title: "Meet our magical client, Mr P",
    href: "/advice-and-care/articles",
  },
  {
    image:
      "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933382/pexels-jsme-mila-523821574-18459193_nlhoas.jpg",
    title: "The New Ageing - Brand & Ageism",
    href: "/advice-and-care/how-to-age-well",
  },
  {
    image:
      "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933365/pexels-kampus-7551662_ock8o9.jpg",
    title: "Launching Homecare's Got Talent!",
    href: "/advice-and-care/articles",
  },
  {
    image:
      "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933350/pexels-jsme-mila-523821574-29372720_niar1j.jpg",
    title: "Dementia training: Anthony's journey",
    href: "/advice-and-care/articles",
  },
  {
    image:
      "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933332/pexels-jsme-mila-523821574-18429571_lahwba.jpg",
    title: "Celebrating 10 years of being most recommended home care company",
    href: "/advice-and-care/articles",
  },
  {
    image:
      "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778932857/centre-for-ageing-better-rQJ3xo-0WYE-unsplash_mhe64i.jpg",
    title: "5 Signs an ageing relative may need support",
    href: "/advice-and-care/how-to-age-well",
  },
];

const faqs = [
  {
    id: "who-are-naptec",
    title: "Who are Naptec?",
    content: (
      <FaqAnswer>
        <p>
          We are an award-winning home care provider devoted to providing the
          highest-quality relationship-led care for older people in their own
          homes. We have been at the forefront of specialised home care,
          supporting those being cared for and their families for over a decade.
        </p>
      </FaqAnswer>
    ),
  },
  {
    id: "why-choose-naptec",
    title: "Why choose Naptec care?",
    content: (
      <FaqAnswer>
        <p>
          When it comes to care, there is no one-size-fits-all approach, so we do
          not offer one. People are different, so we are different. Every detail
          of every service we offer is tailored to the needs of the person who
          requires care, but also their close family.
        </p>
        <p>
          Some people simply need help outside of the home, such as when they go
          shopping. Others may need help with personal care including bathing,
          dressing, and enjoying nutritious meals. Our care and support also
          takes into account life-changing or long-term illnesses such as
          dementia, Parkinson&apos;s and many others. Finally, many people we
          support simply want company and conversation due to loneliness, recent
          bereavement or the desire for a new friend.
        </p>
      </FaqAnswer>
    ),
  },
  {
    id: "why-home-care",
    title: "Why should I choose home care?",
    content: (
      <FaqAnswer>
        <p>
          Home visits from a Naptec caregiver can help you to enjoy an
          independent and fulfilled life, living well at home, your way.
        </p>
        <p>
          You will get to stay in your community and live under your own roof,
          surrounded by your own things and continuing to live by your own rules.
        </p>
      </FaqAnswer>
    ),
  },
  {
    id: "what-care",
    title: "What type of care do you offer?",
    content: (
      <FaqAnswer>
        <p>
          We provide a range of domiciliary care services that are tailored to
          suit your needs, from helping with household tasks or companionship, to
          assisting with personal care and specialist care.
        </p>
        <DiscoverMore href="/enquire" />
      </FaqAnswer>
    ),
  },
  {
    id: "who-are-caregivers",
    title: "Who are Naptec caregivers?",
    content: (
      <FaqAnswer>
        <p>
          Our caregivers are the best of the best. During our selection process,
          we look for people who enjoy similar interests so we can find the right
          person to support you. A caregiver is always introduced to you before
          the care service begins, to ensure they are compatible and are the
          right fit for happy home care.
        </p>
        <p>
          We refer to our team as caregivers in recognition of the fact that the
          role of caregiving is a professional one, requiring a high level of
          knowledge and skills.
        </p>
      </FaqAnswer>
    ),
  },
  {
    id: "perfect-match",
    title: "How can you ensure that I get a caregiver that is right for me?",
    content: (
      <FaqAnswer>
        <p>
          We recruit staff based on their values and only employ individuals who
          truly want to care and make a difference to people&apos;s lives.
        </p>
        <p>
          We will meet with you and learn everything we can about you, your
          hobbies and interests, your needs and your preferences. Using this
          information, we will find your perfect match: a caregiver whose
          personality and interests complement yours, together with the skills
          and knowledge to support you to live well at home, your way.
        </p>
        <p>
          We will introduce you to your caregiver before your first visit so you
          can start to get to know each other.
        </p>
      </FaqAnswer>
    ),
  },
  {
    id: "same-caregiver",
    title: "Will I get the same caregiver?",
    content: (
      <FaqAnswer>
        <p>
          At Naptec we believe that the best care is relationship-led and will
          ensure that you or your loved one will have a small group of caregivers
          that have been introduced to you. This ensures consistency and
          continuity in care being provided by a dedicated team of familiar
          people.
        </p>
      </FaqAnswer>
    ),
  },
  {
    id: "dementia-care",
    title: "Do you care for people living with dementia?",
    content: (
      <FaqAnswer>
        <p>
          At Naptec we have specially trained caregivers to support you and your
          loved ones in the best possible way. Our training approach to dementia
          care focuses on delivering the very best care and support to those
          living with dementia, helping keep them happy and healthy at home.
        </p>
        <DiscoverMore href="/what-we-do/dementia-and-alzheimers" />
      </FaqAnswer>
    ),
  },
  {
    id: "pay-for-care",
    title: "How do I pay for the care?",
    content: (
      <FaqAnswer>
        <p>
          There are a number of options when it comes to paying for care, and we
          have pulled together the relevant information for each part of the UK
          depending on the options that are available.
        </p>
        <DiscoverMore href="/advice-and-care/cost-of-care" />
      </FaqAnswer>
    ),
  },
  {
    id: "technology",
    title: "How do you use technology to provide care?",
    content: (
      <FaqAnswer>
        <p>
          We use a digital care management system to schedule your calls and
          allocate them to your familiar caregivers. Caregivers use the digital
          system to log into and out of calls so we know that they have arrived
          on time and completed your call.
        </p>
        <p>
          Digital care planning is available along with an app which your
          representatives can access to see visit records and reassure themselves
          that care is being delivered in accordance with the care plan.
          Medication records are also available digitally which enable us to
          manage your medication safely.
        </p>
      </FaqAnswer>
    ),
  },
  {
    id: "change-service",
    title: "What happens if I want a different kind of service than I started with?",
    content: (
      <FaqAnswer>
        <p>
          We will regularly review your service to ensure we are able to offer
          additional support as required, and your dedicated team of caregivers
          can also alert us to any changes in your condition. If at any time you
          feel your needs are changing, please talk to us about amending your
          service.
        </p>
      </FaqAnswer>
    ),
  },
  {
    id: "medicine",
    title: "Will you make sure my Mum is taking her medicine?",
    content: (
      <FaqAnswer>
        <p>
          Our team of expert caregivers will give your loved one the highest
          standard of care possible: from keeping them up-to-date with medication
          to keeping them company and helping with their daily life, so they can
          live the way they are most comfortable with.
        </p>
      </FaqAnswer>
    ),
  },
  {
    id: "visit-anytime",
    title: "Can I still visit and check in whenever I want?",
    content: (
      <FaqAnswer>
        <p>
          Of course. We are there to help your family live happily, and that
          includes keeping in contact. Whether it is keeping an ear out for the
          phone, or putting the kettle on when you visit, our team are there to
          help.
        </p>
      </FaqAnswer>
    ),
  },
  {
    id: "hours-needed",
    title: "How many hours would my parent need?",
    content: (
      <FaqAnswer>
        <p>
          We work with you to create a plan that works best for you and your
          loved one&apos;s needs. We know care needs can change, so our plans are
          always flexible too.
        </p>
      </FaqAnswer>
    ),
  },
  {
    id: "dementia-alarms",
    title: "What do I do about dementia? Should I be thinking about alarms?",
    content: (
      <FaqAnswer>
        <p>
          A personal alarm is something you can consider, along with plenty of
          other options to help reduce the anxiety associated with living with
          dementia. All of our caregivers are trained to help provide support
          with dementia, and we can suggest more specialist help if required.
        </p>
      </FaqAnswer>
    ),
  },
];

export default function FaqsPage() {
  return (
    <main className="flex flex-1 flex-col">
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
                Frequently asked questions
              </li>
            </ol>
          </nav>

          <h1
            className="mt-8 text-4xl font-normal tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl"
            style={serif}
          >
            Frequently asked questions
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-neutral-600 sm:text-lg">
            At Naptec we understand that beginning to think about care or support
            for you or your loved one can be a difficult decision to make. We hope
            that our FAQs help to answer your questions, and please get in touch
            if you would like to know more.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-5xl sm:mt-16">
          <AccordionList badge="FAQs" items={faqs} />
        </div>
      </section>

      <ContentCarousel
        title="Advice & Support"
        cards={adviceCards}
        ariaLabel="Advice and support articles"
      />

      {/* <FaqTestimonials /> */}
    </main>
  );
}
