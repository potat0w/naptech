import ArticlePageContent from "@/components/ArticlePageContent";
import { getAllArticleSlugs, getArticleBySlug } from "@/lib/article-content";
import { JsonLd, articleSchema, breadcrumbSchema } from "@/lib/seo/json-ld";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Not found | Naptec" };
  return {
    title: `${article.title} | Naptec Care`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Articles", path: "/advice-and-care/articles" },
            { name: article.title, path: `/advice-and-care/articles/${slug}` },
          ]),
          articleSchema({
            title: article.title,
            description: article.description,
            slug,
          }),
        ]}
      />
      <ArticlePageContent article={article} />
    </>
  );
}
