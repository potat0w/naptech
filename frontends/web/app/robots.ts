import { webAppBase } from "@/lib/app-urls";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = webAppBase();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/book", "/profile", "/login", "/signup"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
