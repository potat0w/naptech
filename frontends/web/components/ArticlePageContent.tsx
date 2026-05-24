import GetInTouch from "@/components/GetInTouch";
import PopularServices from "@/components/PopularServices";
import type { Article } from "@/lib/article-content";
import { containerClass } from "@/lib/layout";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const serif = { fontFamily: "var(--font-playfair), ui-serif, serif" } as const;

export default function ArticlePageContent({ article }: { article: Article }) {
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
              <li>
                <Link
                  href="/advice-and-care/articles"
                  className="transition-colors hover:text-[#3B2A8F]"
                >
                  Articles
                </Link>
              </li>
              <li aria-hidden className="text-neutral-300">
                /
              </li>
              <li className="font-medium text-neutral-800">{article.title}</li>
            </ol>
          </nav>

          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-14">
            <div>
              <h1
                className="text-4xl font-normal tracking-tight text-neutral-900 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]"
                style={serif}
              >
                {article.title}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-neutral-600">
                {article.description}
              </p>
            </div>

            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-[#f2f2f2]">
              <Image
                src={article.image}
                alt=""
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="mx-auto mt-12 max-w-3xl space-y-5 text-base leading-[1.85] text-neutral-600 sm:mt-16">
            {article.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mx-auto mt-12 max-w-3xl border-t border-neutral-200 pt-8 sm:mt-16 sm:pt-10">
            <Link
              href="/advice-and-care/articles"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#3B2A8F] transition-colors hover:text-[#2d1f6d]"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={2} aria-hidden />
              Back to all articles
            </Link>
          </div>
        </div>
      </section>
      <GetInTouch />
      <PopularServices />
      
    </main>
  );
}
