import { webAppBase } from "@/lib/site-url";

export const SEO = {
  siteUrl: "https://www.naptechealthcareservices.co.uk",
  siteName: "Naptec Care",
  legalName: "NapTech Healthcare Services Ltd",
  defaultTitle: "Home Care in Croydon | Naptec Care",
  defaultDescription:
    "Professional home care, live-in care, dementia care, and personal care at home in Croydon and nearby areas. Free consultation — call Naptec Care.",
  locale: "en_GB",
  areaServed: [
    "Croydon",
    "Thornton Heath",
    "Purley",
    "Coulsdon",
    "Addiscombe",
    "South Croydon",
  ],
} as const;

export function absoluteUrl(path: string): string {
  const base = webAppBase();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}
