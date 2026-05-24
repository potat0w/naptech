import type { NewsEventItem } from "@/lib/news-events";

const images = [
  "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933400/pexels-kampus-8949833_tldckz.jpg",
  "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933400/pexels-olly-3768131_mdki5q.jpg",
  "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933399/pexels-olly-3791666_nap6fe.jpg",
  "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933382/pexels-jsme-mila-523821574-18459193_nlhoas.jpg",
  "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933365/pexels-kampus-7551662_ock8o9.jpg",
  "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933350/pexels-jsme-mila-523821574-29372720_niar1j.jpg",
  "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933332/pexels-jsme-mila-523821574-18429571_lahwba.jpg",
  "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778932857/centre-for-ageing-better-rQJ3xo-0WYE-unsplash_mhe64i.jpg",
] as const;

export const articles: NewsEventItem[] = [
  {
    image: images[0],
    title: "Benefits of Professional Home Care Services",
    href: "/advice-and-care/articles/benefits-of-professional-home-care-services",
  },
  {
    image: images[1],
    title: "Creating a Comfortable Home Environment",
    href: "/advice-and-care/articles/creating-a-comfortable-home-environment",
  },
  {
    image: images[2],
    title: "Daily Wellness Tips for Older Adults",
    href: "/advice-and-care/articles/daily-wellness-tips-for-older-adults",
  },
  {
    image: images[3],
    title: "The Importance of Staying Active in Later Life",
    href: "/advice-and-care/articles/the-importance-of-staying-active-in-later-life",
  },
  {
    image: images[4],
    title: "Healthy Eating Habits for Seniors",
    href: "/advice-and-care/articles/healthy-eating-habits-for-seniors",
  },
  {
    image: images[5],
    title: "How Home Care Supports Independent Living",
    href: "/advice-and-care/articles/how-home-care-supports-independent-living",
  },
  {
    image: images[6],
    title: "Building Meaningful Relationships Through Care",
    href: "/advice-and-care/articles/building-meaningful-relationships-through-care",
  },
  {
    image: images[7],
    title: "Simple Ways to Improve Everyday Wellbeing",
    href: "/advice-and-care/articles/simple-ways-to-improve-everyday-wellbeing",
  },
  {
    image: images[0],
    title: "The Value of Companionship and Social Connection",
    href: "/advice-and-care/articles/the-value-of-companionship-and-social-connection",
  },
  {
    image: images[1],
    title: "Understanding Different Types of Home Care Services",
    href: "/advice-and-care/articles/understanding-different-types-of-home-care-services",
  },
  {
    image: images[2],
    title: "Maintaining Independence with the Right Support",
    href: "/advice-and-care/articles/maintaining-independence-with-the-right-support",
  },
  {
    image: images[3],
    title: "How Personalised Care Improves Quality of Life",
    href: "/advice-and-care/articles/how-personalised-care-improves-quality-of-life",
  },
];
