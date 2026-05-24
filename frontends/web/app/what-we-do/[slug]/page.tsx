import ServicePageContent from "@/components/ServicePageContent";
import { JsonLd, breadcrumbSchema, serviceSchema } from "@/lib/seo/json-ld";
import { getAllServiceSlugs, getServiceBySlug } from "@/lib/services";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Not found | Naptec" };
  return {
    title: service.metaTitle ?? `${service.title} | Naptec Care`,
    description: service.metaDescription ?? service.description,
    openGraph: {
      title: service.metaTitle ?? service.title,
      description: service.metaDescription ?? service.description,
    },
  };
}

export default async function WhatWeDoServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();
  const breadcrumbs = [
    { name: "Home", path: "/" },
    ...(service.isCategory
      ? [{ name: service.title, path: `/what-we-do/${service.slug}` }]
      : [
          { name: service.parentLabel, path: service.parentHref },
          { name: service.title, path: `/what-we-do/${service.slug}` },
        ]),
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(breadcrumbs),
          serviceSchema({
            name: service.title,
            description: service.metaDescription ?? service.description,
            slug: service.slug,
          }),
        ]}
      />
      <ServicePageContent service={service} />
    </>
  );
}
