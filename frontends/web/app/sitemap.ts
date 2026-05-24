import { webAppBase } from "@/lib/site-url";
import { getAllArticleSlugs } from "@/lib/article-content";
import { getAllServiceSlugs } from "@/lib/services";
import type { MetadataRoute } from "next";

export const dynamic = "force-dynamic";

const staticPaths = [
  "",
  "/home-care-croydon",
  "/enquire",
  "/how-it-works",
  "/recruitment",
  "/why-us/our-team",
  "/advice-and-care",
  "/advice-and-care/cost-of-care",
  "/advice-and-care/faqs",
  "/advice-and-care/how-to-age-well",
  "/advice-and-care/articles",
  "/advice-and-care/news-events",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = webAppBase();
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority:
      path === ""
        ? 1
        : path === "/home-care-croydon"
          ? 0.95
          : path.includes("enquire")
            ? 0.9
            : 0.7,
  }));

  const serviceEntries: MetadataRoute.Sitemap = getAllServiceSlugs().map((slug) => ({
    url: `${base}/what-we-do/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: [
      "personal-care",
      "dementia-and-alzheimers",
      "live-in-care",
      "respite-care",
      "companionship",
      "overnight-care",
      "domiciliary-care",
    ].includes(slug)
      ? 0.85
      : 0.75,
  }));

  const articleEntries: MetadataRoute.Sitemap = getAllArticleSlugs().map((slug) => ({
    url: `${base}/advice-and-care/articles/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...serviceEntries, ...articleEntries];
}
