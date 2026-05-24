import type { CarouselCard } from "@/components/ContentCarousel";
import { articles as articleContent } from "@/lib/article-content";

export function carouselCardsFromSlugs(slugs: string[]): CarouselCard[] {
  return slugs
    .map((slug) => articleContent.find((article) => article.slug === slug))
    .filter((article): article is (typeof articleContent)[number] => Boolean(article))
    .map((article) => ({
      image: article.image,
      title: article.title,
      href: `/advice-and-care/articles/${article.slug}`,
    }));
}

export const adviceHubGuideCards = carouselCardsFromSlugs([
  "understanding-different-types-of-home-care-services",
  "benefits-of-professional-home-care-services",
  "how-home-care-supports-independent-living",
  "maintaining-independence-with-the-right-support",
  "the-value-of-companionship-and-social-connection",
  "how-personalised-care-improves-quality-of-life",
]);

export const costOfCareGuideCards = carouselCardsFromSlugs([
  "benefits-of-professional-home-care-services",
  "understanding-different-types-of-home-care-services",
  "how-home-care-supports-independent-living",
  "maintaining-independence-with-the-right-support",
]);

export function carouselCard(
  image: string,
  title: string,
  href: string,
): CarouselCard {
  return { image, title, href };
}
