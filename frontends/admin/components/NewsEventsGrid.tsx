"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

import NewsEventCard from "@/components/NewsEventCard";
import { newsEvents, type NewsEventItem } from "@/lib/news-events";

const PER_PAGE = 6;

type NewsEventsGridProps = {
  items?: NewsEventItem[];
};

export default function NewsEventsGrid({ items: itemsProp }: NewsEventsGridProps) {
  const allItems = itemsProp ?? newsEvents;
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(allItems.length / PER_PAGE);
  const start = page * PER_PAGE;
  const items = allItems.slice(start, start + PER_PAGE);

  if (allItems.length === 0) {
    return (
      <p className="max-w-2xl text-base leading-relaxed text-neutral-600">
        New content is on the way. Please check back soon.
      </p>
    );
  }

  return (
    <>
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-14">
        {items.map((item) => (
          <NewsEventCard key={item.title} item={item} />
        ))}
      </div>

      {totalPages > 1 ? (
        <div className="mt-14 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e8e8e4] text-neutral-700 transition-[filter] hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2} />
          </button>
          <p className="text-sm tabular-nums text-neutral-600">
            {page + 1} of {totalPages}
          </p>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#3B2A8F] text-white transition-[filter] hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Next page"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>
      ) : null}
    </>
  );
}
