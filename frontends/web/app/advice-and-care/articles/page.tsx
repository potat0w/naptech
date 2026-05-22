import NewsEventsGrid from "@/components/NewsEventsGrid";
import { articles } from "@/lib/articles";
import { containerClass } from "@/lib/layout";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Articles | Naptec",
  description:
    "Articles and guides from Naptec on home care, ageing well, and supporting loved ones at home.",
};

const serif = { fontFamily: "var(--font-playfair), ui-serif, serif" } as const;

export default function ArticlesPage() {
  return (
    <main className="flex flex-1 flex-col bg-white">
      <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className={containerClass}>
          <nav aria-label="Breadcrumb" className="text-sm text-neutral-500">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="transition-colors hover:text-[#3B2A8F]">
                  Home
                </Link>
              </li>
              <li aria-hidden className="text-neutral-300">
                /
              </li>
              <li>
                <Link
                  href="/advice-and-care"
                  className="transition-colors hover:text-[#3B2A8F]"
                >
                  Advice &amp; Support
                </Link>
              </li>
              <li aria-hidden className="text-neutral-300">
                /
              </li>
              <li className="font-medium text-neutral-800">Articles</li>
            </ol>
          </nav>

          <h1
            className="mt-8 text-4xl font-normal tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl"
            style={serif}
          >
            Articles
          </h1>

          <div className="mt-12 sm:mt-14 lg:mt-16">
            <NewsEventsGrid items={articles} />
          </div>
        </div>
      </section>
    </main>
  );
}
