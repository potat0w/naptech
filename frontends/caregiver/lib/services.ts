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
  title: "Companionship Care at home",
  shortTitle: "Companionship",
  category: "domiciliary",
  parentLabel: "Domiciliary Care",
  parentHref: "/what-we-do/domiciliary-care",
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
    title: "Domiciliary Care at home",
    shortTitle: "Domiciliary Care",
    category: "domiciliary",
    parentLabel: "What We Do",
    parentHref: "/",
    intro:
      "Domiciliary care helps you stay independent at home with visits tailored to your routine, from companionship and housekeeping to personal care.",
    description: "Domiciliary care at home from Naptec.",
    isCategory: true,
    sections: [
      {
        heading: "What is domiciliary care?",
        paragraphs: [
          "Domiciliary care is professional support delivered in your own home. It can include companionship, help around the house, personal care, and respite for family carers.",
        ],
        image: defaultImage,
        imageAlt: "Domiciliary care at home",
      },
    ],
    faqs: [],
  },
  {
    slug: "specialist-care",
    title: "Specialist Care at home",
    shortTitle: "Specialist Care",
    category: "specialist",
    parentLabel: "What We Do",
    parentHref: "/",
    intro:
      "Specialist care supports complex or long-term conditions at home with trained caregivers who understand your diagnosis and daily needs.",
    description: "Specialist home care from Naptec.",
    isCategory: true,
    sections: [
      {
        heading: "What is specialist care?",
        paragraphs: [
          "Specialist care includes support for dementia, cancer, Parkinson's, neurological conditions, palliative needs, recovery after surgery, and mobility challenges.",
        ],
        image: defaultImage,
        imageAlt: "Specialist care at home",
      },
    ],
    faqs: [],
  },
  {
    slug: "live-in-care",
    title: "Live-In Care at home",
    shortTitle: "Live-In Care",
    category: "live-in",
    parentLabel: "What We Do",
    parentHref: "/",
    intro:
      "When your loved one needs frequent support, live-in care helps them stay independent and comfortable at home with a trusted caregiver.",
    description: "Live-in care at home from Naptec.",
    isCategory: true,
    sections: [
      {
        heading: "What is live-in care?",
        paragraphs: [
          "A caregiver lives in your home to provide continuous support, companionship, and assistance tailored to your loved one's routine and preferences.",
        ],
        image: "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933382/pexels-jsme-mila-523821574-18459193_nlhoas.jpg",
        imageAlt: "Live-in care at home",
      },
    ],
    faqs: [],
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
  ["Dementia & Alzheimer's", "dementia and memory support"],
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
  ...specialistServices,
];

export function getServiceBySlug(slug: string): ServicePage | undefined {
  return services.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return services.map((s) => s.slug);
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
