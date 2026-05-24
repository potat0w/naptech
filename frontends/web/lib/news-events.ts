import type { NewsEventItem } from "@/lib/news-events-types";

export type { NewsEventItem } from "@/lib/news-events-types";

const img = {
  a: "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933365/pexels-kampus-7551662_ock8o9.jpg",
  b: "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933399/pexels-olly-3791666_nap6fe.jpg",
  c: "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933400/pexels-olly-3768131_mdki5q.jpg",
  d: "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933382/pexels-jsme-mila-523821574-18459193_nlhoas.jpg",
  e: "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933400/pexels-kampus-8949833_tldckz.jpg",
  f: "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933350/pexels-jsme-mila-523821574-29372720_niar1j.jpg",
  g: "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933332/pexels-jsme-mila-523821574-18429571_lahwba.jpg",
  h: "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778932857/centre-for-ageing-better-rQJ3xo-0WYE-unsplash_mhe64i.jpg",
} as const;

export const newsEvents: NewsEventItem[] = [
  {
    image: img.a,
    title: "How to know when a loved one needs home care",
    href: "/advice-and-care/articles/benefits-of-professional-home-care-services",
  },
  {
    image: img.h,
    title: "Supporting a parent with dementia at home",
    href: "/what-we-do/dementia-and-alzheimers",
  },
  {
    image: img.f,
    title: "What is domiciliary care and how does it work?",
    href: "/advice-and-care/articles/understanding-different-types-of-home-care-services",
  },
  {
    image: img.c,
    title: "Signs of loneliness in older people",
    href: "/advice-and-care/articles/the-value-of-companionship-and-social-connection",
  },
  {
    image: img.b,
    title: "Staying hydrated and eating well in later life",
    href: "/advice-and-care/articles/healthy-eating-habits-for-seniors",
  },
  {
    image: img.e,
    title: "Creating a safer, more comfortable home",
    href: "/advice-and-care/articles/creating-a-comfortable-home-environment",
  },
  {
    image: img.g,
    title: "How home care supports independent living",
    href: "/advice-and-care/articles/how-home-care-supports-independent-living",
  },
  {
    image: img.d,
    title: "Arrange respite care for family carers",
    href: "/what-we-do/respite-care",
  },
  {
    image: img.a,
    title: "Companion care and wellbeing at home",
    href: "/what-we-do/companionship",
  },
  {
    image: img.f,
    title: "Personalised care that improves quality of life",
    href: "/advice-and-care/articles/how-personalised-care-improves-quality-of-life",
  },
  {
    image: img.h,
    title: "Home care in Croydon",
    href: "/home-care-croydon",
  },
  {
    image: img.b,
    title: "Home care costs and funding guidance",
    href: "/advice-and-care/cost-of-care",
  },
];
