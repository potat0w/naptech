import { naptecContact, naptecFullAddress } from "@/lib/contact";
import { absoluteUrl, SEO } from "@/lib/seo/config";
import type { ServiceFaq } from "@/lib/services";

type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

export function JsonLd({ data }: JsonLdProps) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload.length === 1 ? payload[0] : payload) }}
    />
  );
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HomeHealthCareBusiness",
    "@id": `${absoluteUrl("/")}#organization`,
    name: SEO.siteName,
    legalName: SEO.legalName,
    url: absoluteUrl("/"),
    email: naptecContact.email,
    telephone: naptecContact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: naptecContact.addressLine1,
      addressLocality: naptecContact.area,
      addressRegion: naptecContact.city,
      postalCode: naptecContact.postcode,
      addressCountry: "GB",
    },
    areaServed: SEO.areaServed.map((name) => ({
      "@type": "City",
      name,
    })),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${absoluteUrl("/")}#website`,
    name: SEO.siteName,
    url: absoluteUrl("/"),
    publisher: { "@id": `${absoluteUrl("/")}#organization` },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceSchema({
  name,
  description,
  slug,
}: {
  name: string;
  description: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: { "@id": `${absoluteUrl("/")}#organization` },
    areaServed: SEO.areaServed.map((area) => ({
      "@type": "AdministrativeArea",
      name: area,
    })),
    url: absoluteUrl(`/what-we-do/${slug}`),
  };
}

export function faqPageSchema(faqs: { title: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.title,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function articleSchema({
  title,
  description,
  slug,
}: {
  title: string;
  description: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    author: {
      "@type": "Organization",
      name: SEO.siteName,
    },
    publisher: {
      "@type": "Organization",
      name: SEO.siteName,
      address: naptecFullAddress,
    },
    mainEntityOfPage: absoluteUrl(`/advice-and-care/articles/${slug}`),
  };
}

export function faqsFromServiceFaqs(faqs: ServiceFaq[]) {
  return faqs.map((f) => ({ title: f.title, answer: f.answer }));
}
