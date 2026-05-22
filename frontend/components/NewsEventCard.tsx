import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { NewsEventItem } from "@/lib/news-events";

const serif = { fontFamily: "var(--font-playfair), ui-serif, serif" } as const;

export default function NewsEventCard({ item }: { item: NewsEventItem }) {
  return (
    <article className="flex flex-col">
      <div className="relative aspect-[4/3] w-full bg-[#f2f2f2]">
        <Image
          src={item.image}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center"
        />
      </div>
      <div className="pt-5">
        <h2
          className="mb-4 text-xl font-normal leading-snug text-neutral-900 sm:text-2xl"
          style={serif}
        >
          {item.title}
        </h2>
        <div className="flex items-center gap-3">
          <Link
            href={item.href}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#3B2A8F] text-white transition-[filter] hover:brightness-90"
            aria-label={`Discover more: ${item.title}`}
          >
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </Link>
          <Link
            href={item.href}
            className="text-sm text-neutral-700 underline underline-offset-4 transition-colors hover:text-[#3B2A8F]"
          >
            Discover more
          </Link>
        </div>
      </div>
    </article>
  );
}
