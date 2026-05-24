import { articles as articleContent } from "@/lib/article-content";
import type { NewsEventItem } from "@/lib/news-events";

export const articles: NewsEventItem[] = articleContent.map((article) => ({
  image: article.image,
  title: article.title,
  href: `/advice-and-care/articles/${article.slug}`,
}));
