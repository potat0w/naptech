import { webAppBase } from "@/lib/site-url";
import type { MetadataRoute } from "next";

export const dynamic = "force-dynamic";

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
