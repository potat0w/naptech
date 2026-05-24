import { dementiaCare } from "@/lib/dementia-care";
import {
  dayCare,
  homeHelpHousekeeping,
  overnightCare,
  personalCare,
  respiteCare,
} from "@/lib/domiciliary-services";
import { slugify } from "@/lib/slugify";

export type ServiceCategory = "domiciliary" | "specialist" | "live-in";

export type ServiceGuide = {
  image: string;
  title: string;
  href: string;
};

export type ServiceSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  image: string;
  imageAlt: string;
  cta?: { label: string; href: string };
  discoverMore?: { href?: string };
};

export type ServiceFaq = {
  id: string;
  title: string;
  answer: string;
};

export type ServicePage = {
  slug: string;
  title: string;
  shortTitle: string;
  category: ServiceCategory;
  parentLabel: string;
  parentHref: string;
  intro: string;
  sections: ServiceSection[];
  faqs: ServiceFaq[];
  description: string;
  metaTitle?: string;
  metaDescription?: string;
  relatedSlugs?: string[];
  isCategory?: boolean;
  guidesTitle?: string;
  guides?: ServiceGuide[];
  showConfusedSection?: boolean;
};

const categoryLabels: Record<ServiceCategory, string> = {
  domiciliary: "Domiciliary Care",
  specialist: "Specialist Care",
  "live-in": "Live-In Care",
};

const defaultImage =
  "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933365/pexels-kampus-7551662_ock8o9.jpg";

function domiciliarySections(shortTitle: string, topic: string): ServiceSection[] {
  return [
    {
      heading: `What is ${shortTitle}?`,
      paragraphs: [
        `${shortTitle} is tailored support at home from a caregiver matched to you, focused on ${topic}.`,
        `${shortTitle} can:`,
      ],
      bullets: [
        "Help you or your loved one stay active and engaged",
        "Provide company and someone to socialise with",
        "Build confidence in going outside the home",
        "Encourage participation in activities inside and outside the home",
        "Give families peace of mind with reliable visits",
      ],
      image: "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933350/pexels-jsme-mila-523821574-29372720_niar1j.jpg",
      imageAlt: `Caregiver providing ${shortTitle.toLowerCase()} at home`,
    },
    {
      heading: `Why is ${shortTitle} important?`,
      paragraphs: [
        `The right support at home can protect wellbeing and independence. Naptec aims to prevent isolation by providing ${shortTitle.toLowerCase()} that fits your routine. Many people we support want company, conversation, and practical help that keeps life enjoyable at home.`,
      ],
      image: "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933332/pexels-jsme-mila-523821574-18429571_lahwba.jpg",
      imageAlt: `Older adult benefiting from ${shortTitle.toLowerCase()}`,
    },
    {
      heading: `How can ${shortTitle.toLowerCase()} maintain my quality of life?`,
      paragraphs: [
        `Home visits from Naptec mean you and your loved ones have peace of mind knowing you have the company and support of a friendly, trusted caregiver. We match you with someone who shares your interests and can accompany you in whatever you enjoy, so if your needs change over time, there is already someone you know and trust.`,
      ],
      image: "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778932857/centre-for-ageing-better-rQJ3xo-0WYE-unsplash_mhe64i.jpg",
      imageAlt: "Caregiver and client spending time together",
    },
  ];
}

function defaultFaqs(shortTitle: string): ServiceFaq[] {
  return [
    {
      id: "difference",
      title: `What is the difference between ${shortTitle.toLowerCase()} and personal care?`,
      answer: `${shortTitle} focuses on social needs and daily support at home, whereas personal care includes help with bathing, dressing, and other intimate care tasks.`,
    },
    {
      id: "when",
      title: `When should I consider ${shortTitle.toLowerCase()}?`,
      answer: `It is often most beneficial when someone would like more social interaction, practical help at home, or reassurance for family members who cannot visit as often as they would like.`,
    },
    {
      id: "how-often",
      title: "How often should I have visits at home?",
      answer:
        "Visit frequency depends on what you want and need. We work with you to agree a bespoke plan of care and support, from a few hours a week to several visits a day.",
    },
  ];
}

function buildService(
  shortTitle: string,
  category: ServiceCategory,
  topic: string,
  overrides?: Partial<ServicePage>,
): ServicePage {
  const slug = overrides?.slug ?? slugify(shortTitle);
  return {
    slug,
    title: `${shortTitle} at home`,
    shortTitle,
    category,
    parentLabel: categoryLabels[category],
    parentHref: `/what-we-do/${category === "domiciliary" ? "domiciliary-care" : category === "specialist" ? "specialist-care" : "live-in-care"}`,
    intro: `Whatever support you need, we find the right caregiver to help you stay independent, comfortable, and supported with ${topic}.`,
    sections: domiciliarySections(shortTitle, topic),
    faqs: defaultFaqs(shortTitle),
    description: `${shortTitle} at home from Naptec. Personalised care matched to your needs.`,
    ...overrides,
  };
}

const companionship: ServicePage = {
  slug: "companionship",
  title: "Companionship Care at Home",
  shortTitle: "Companionship",
  category: "domiciliary",
  parentLabel: "Domiciliary Care",
  parentHref: "/what-we-do/domiciliary-care",
  metaTitle: "Companionship Care at Home | Naptec – Croydon",
  metaDescription:
    "Companionship care at home in Croydon. Friendly, matched caregivers for conversation, outings, and elderly support.",
  relatedSlugs: ["personal-care", "day-care", "dementia-and-alzheimers", "respite-care"],
  intro:
    "Whatever it is that you enjoy doing, we will find the right caregiver to support you and to become your companion.",
  description:
    "Companionship care at home from Naptec. Friendly, matched caregivers for company, conversation, and support.",
  sections: [
    {
      heading: "What is Companionship Care?",
      paragraphs: [
        "Companionship is the company of another person whom you enjoy spending time with, such as your carefully matched caregiver.",
        "Companionship care can:",
      ],
      bullets: [
        "Help you or your loved one to keep active",
        "Make sure you have company and someone to socialise with",
        "Help to build confidence in going outside the home",
        "Encourage participation in activities inside and outside the home",
        "Help families take a rest from caring with peace of mind",
      ],
      image: "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933400/pexels-kampus-8949833_tldckz.jpg",
      imageAlt: "Caregiver and client sharing time together at home",
    },
    {
      heading: "Why is Companionship Care important?",
      paragraphs: [
        "Loneliness can have serious effects on a person's health. Naptec aims to prevent social isolation by providing companionship care at home. Many people we support simply want company and conversation, whether they live alone or want a companion for appointments, shopping, or outings.",
      ],
      image: "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933400/pexels-olly-3768131_mdki5q.jpg",
      imageAlt: "Older adults enjoying conversation at home",
    },
    {
      heading: "How can companionship maintain my quality of life?",
      paragraphs: [
        "Home visits from Naptec mean you and your loved ones have peace of mind knowing you have the company and support of a friendly, trusted caregiver. We match you with someone who shares your interests and can accompany you in whatever you like to do. Starting with companionship means that if you need extra help later, there is already someone you know and trust.",
      ],
      image: "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933399/pexels-olly-3791666_nap6fe.jpg",
      imageAlt: "Caregiver supporting a client on an outing",
    },
  ],
  faqs: [
    {
      id: "difference",
      title: "What is the difference between companionship and personal care?",
      answer:
        "Companionship care focuses on social needs and daily tasks at home, whereas personal care is support with daily living such as bathing or dressing.",
    },
    {
      id: "companion-role",
      title: "What does a companion do?",
      answer:
        "Our caregivers are there to listen and interact with clients, providing a trusted, friendly face that can ease feelings of isolation and loneliness.",
    },
    {
      id: "when",
      title: "When should I or my loved one consider companionship care?",
      answer:
        "Companionship is often most beneficial for individuals who would like more social interaction or feel isolated from friends and family.",
    },
    {
      id: "how-often",
      title: "How often should I have companionship calls at home?",
      answer:
        "This can vary from several hours a day to just a few hours a week. We work with you to agree a bespoke plan that meets your needs.",
    },
  ],
};

const categoryPages: ServicePage[] = [
  {
    slug: "domiciliary-care",
    title: "Domiciliary Care at Home",
    shortTitle: "Domiciliary Care",
    category: "domiciliary",
    parentLabel: "What We Do",
    parentHref: "/",
    metaTitle: "Domiciliary Care at Home | Naptec – Croydon",
    metaDescription:
      "Domiciliary home care visits in Croydon — companionship, personal care, overnight care, and respite for elderly clients.",
    intro:
      "Domiciliary care — also called home care or elderly care at home — is professional support delivered through regular visits, tailored to your routine. From companionship and housekeeping to personal care and overnight support, Naptec helps older adults stay independent at home in Croydon.",
    description:
      "Domiciliary home care in Croydon from Naptec Care.",
    isCategory: true,
    sections: [
      {
        heading: "What is domiciliary home care?",
        paragraphs: [
          "Domiciliary care — sometimes called home care or elderly care at home — means a trained caregiver visits you in your own home. Support can range from a few hours of companionship each week to several visits a day for personal care, medication reminders, and household help.",
          "Unlike residential care, domiciliary care keeps your loved one in familiar surroundings with flexible support that can grow as needs change.",
        ],
        image: defaultImage,
        imageAlt: "Domiciliary home care visit in Croydon",
      },
      {
        heading: "Who is domiciliary care for?",
        paragraphs: [
          "Domiciliary care suits older adults who want to remain at home but need help with daily living, families seeking respite, and people recovering from illness who need short-term support. It is often the first step before live-in care if needs become more intensive.",
        ],
        image:
          "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933400/pexels-kampus-8949833_tldckz.jpg",
        imageAlt: "Elderly person receiving home care at home",
        cta: { label: "Arrange home care", href: "/enquire" },
      },
    ],
    faqs: [
      {
        id: "difference-live-in",
        title: "What is the difference between domiciliary care and live-in care?",
        answer:
          "Domiciliary care involves scheduled visits, while live-in care means a caregiver resides in the home for continuous support. We can help you choose the right option during a free consultation.",
      },
      {
        id: "areas",
        title: "Which areas do you provide domiciliary care?",
        answer:
          "We provide home care across Croydon and nearby areas including Thornton Heath, Purley, and Coulsdon. Contact us to confirm availability for your postcode.",
      },
      {
        id: "cost",
        title: "How much does domiciliary care cost?",
        answer:
          "Costs depend on visit frequency, length, and type of support. See our cost of care guide or contact us for a personalised quote.",
      },
    ],
  },
  {
    slug: "specialist-care",
    title: "Specialist Home Care",
    shortTitle: "Specialist Care",
    category: "specialist",
    parentLabel: "What We Do",
    parentHref: "/",
    metaTitle: "Specialist Home Care | Dementia, Parkinson's & More | Naptec",
    metaDescription:
      "Specialist home care in Croydon including dementia care, Parkinson's support, palliative care, and post-operative recovery at home.",
    intro:
      "Specialist home care supports complex or long-term health conditions with trained caregivers who understand your diagnosis, medication needs, and daily routines.",
    description: "Specialist home care from Naptec in Croydon.",
    isCategory: true,
    sections: [
      {
        heading: "What is specialist home care?",
        paragraphs: [
          "Specialist care brings condition-specific expertise into the home. Naptec provides dementia and Alzheimer's care, Parkinson's support, neurological care, cancer care, palliative care, post-operative recovery, and mobility support — always with a person-centred plan.",
        ],
        image: defaultImage,
        imageAlt: "Specialist home care for complex needs",
      },
    ],
    faqs: [
      {
        id: "dementia",
        title: "Do you provide dementia care at home?",
        answer:
          "Yes. Dementia care is one of our core specialist services, with trained caregivers, consistent matching, and options for overnight or live-in support.",
      },
    ],
  },
  {
    slug: "live-in-care",
    title: "Live-In Care at Home",
    shortTitle: "Live-In Care",
    category: "live-in",
    parentLabel: "What We Do",
    parentHref: "/",
    metaTitle: "Live-In Care at Home | Naptec – Croydon",
    metaDescription:
      "Live-in care at home for elderly clients in Croydon. A dedicated caregiver in your home for continuous, personalised support.",
    intro:
      "Live-in care provides continuous support when regular visits are not enough. A dedicated caregiver lives in your home so your loved one stays safe, comfortable, and independent without moving into residential care.",
    description:
      "Live-in home care in Croydon from Naptec Care.",
    isCategory: true,
    relatedSlugs: [
      "dementia-and-alzheimers",
      "personal-care",
      "overnight-care",
      "respite-care",
    ],
    sections: [
      {
        heading: "What is live-in care?",
        paragraphs: [
          "Live-in care means a professional caregiver lives in your home and provides round-the-clock support tailored to daily routines — from personal care and meal preparation to companionship and overnight reassurance.",
          "It is a popular alternative to care homes when families want one-to-one attention, familiar surroundings, and flexible care that adapts over time.",
        ],
        image:
          "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933382/pexels-jsme-mila-523821574-18459193_nlhoas.jpg",
        imageAlt: "Live-in caregiver supporting an elderly client at home",
      },
      {
        heading: "When is live-in care the right choice?",
        paragraphs: [
          "Families often choose live-in care when someone needs frequent supervision, has advanced dementia, cannot be left alone safely, or when several daily visits would be less practical than continuous support.",
          "We discuss sleeping arrangements, household space, and care goals during a free home consultation before matching a caregiver.",
        ],
        image:
          "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933399/pexels-olly-3791666_nap6fe.jpg",
        imageAlt: "Elderly couple at home with live-in care support",
        cta: { label: "Discuss live-in care", href: "/enquire" },
      },
    ],
    faqs: [
      {
        id: "how-works",
        title: "How does live-in care work?",
        answer:
          "A matched caregiver lives in your home and follows a personalised care plan. They provide daily support, companionship, and overnight presence according to agreed hours and rest breaks.",
      },
      {
        id: "vs-care-home",
        title: "Is live-in care better than a care home?",
        answer:
          "It depends on individual needs. Live-in care offers one-to-one support in familiar surroundings, which many families prefer for dementia or when couples wish to stay together at home.",
      },
      {
        id: "cost",
        title: "How much does live-in care cost?",
        answer:
          "Live-in care costs vary based on care needs, hours, and accommodation. Contact Naptec for a tailored quote and funding guidance.",
      },
      {
        id: "dementia",
        title: "Can live-in care support dementia?",
        answer:
          "Yes. Live-in care is often recommended for people with dementia who need continuous supervision, routine, and familiar surroundings.",
      },
    ],
  },
];

const domiciliaryServices: ServicePage[] = [
  companionship,
  homeHelpHousekeeping,
  personalCare,
  overnightCare,
  dayCare,
  respiteCare,
];

const specialistServices = [
  ["Cancer", "cancer care at home"],
  ["Parkinson's Care", "Parkinson's support"],
  ["Neurological", "neurological conditions"],
  ["Palliative", "palliative and end-of-life care"],
  ["Postoperative & Recovery", "recovery after illness or surgery"],
  ["Arthritis & Mobility", "mobility and arthritis support"],
].map(([title, topic]) =>
  buildService(title, "specialist", topic, {
    slug: slugify(title),
    title: `${title} at home`,
  }),
);

export const services: ServicePage[] = [
  ...categoryPages,
  ...domiciliaryServices,
  dementiaCare,
  ...specialistServices,
];

export function getServiceBySlug(slug: string): ServicePage | undefined {
  return services.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return services.map((s) => s.slug);
}

export function getServicesByCategory(category: ServiceCategory): ServicePage[] {
  return services.filter((s) => !s.isCategory && s.category === category);
}

export const careOfferings = [
  {
    title: "Companionship care",
    description:
      "We carefully match caregivers with clients to ensure a meaningful bond is created.",
  },
  {
    title: "Home help & meal prep",
    description:
      "Keeping the home clean, safe, and nourishing with home-cooked meals.",
  },
  {
    title: "Personal care",
    description:
      "Assistance with bathing, dressing, and personal hygiene, always with dignity.",
  },
  {
    title: "Mobility support",
    description:
      "Helping your loved one move around their home safely, including transfers.",
  },
  {
    title: "Health appointment management",
    description: "Support to attend important health appointments.",
  },
  {
    title: "Community engagement",
    description:
      "Enabling your loved one to continue doing the things they enjoy.",
  },
  {
    title: "Medication management",
    description: "Ensuring medicines are taken correctly and on time.",
  },
] as const;
