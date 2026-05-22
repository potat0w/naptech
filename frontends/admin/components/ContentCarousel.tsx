"use client";

import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const serif = { fontFamily: "var(--font-playfair), ui-serif, serif" } as const;
const GAP_PX = 24;

export type CarouselCard = {
  image: string;
  title: string;
  href: string;
};

type ContentCarouselProps = {
  title: string;
  cards: CarouselCard[];
  ariaLabel: string;
};

export default function ContentCarousel({
  title,
  cards,
  ariaLabel,
}: ContentCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [stepPx, setStepPx] = useState(0);
  const maxOffset = Math.max(0, cards.length - 2);

  const measure = useCallback(() => {
    const track = trackRef.current;
    const first = track?.firstElementChild;
    if (!(first instanceof HTMLElement)) return;
    setStepPx(first.offsetWidth + GAP_PX);
  }, []);

  useEffect(() => {
    measure();
    const observer = new ResizeObserver(measure);
    if (viewportRef.current) observer.observe(viewportRef.current);
    return () => observer.disconnect();
  }, [measure]);

  const goPrev = () => setOffset((o) => Math.max(0, o - 1));
  const goNext = () => setOffset((o) => Math.min(maxOffset, o + 1));

  return (
    <section className="overflow-hidden bg-white py-16 sm:py-20" aria-label={ariaLabel}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-6">
          <h2
            className="text-4xl font-normal text-neutral-900 sm:text-5xl lg:text-6xl"
            style={serif}
          >
            {title}
          </h2>
          <div className="flex shrink-0 gap-3">
            <button
              type="button"
              onClick={goPrev}
              disabled={offset === 0}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-200 text-neutral-600 transition-[filter] hover:brightness-90 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label={`Previous ${title} item`}
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={offset === maxOffset}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#3B2A8F] text-white transition-[filter] hover:brightness-90 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label={`Next ${title} item`}
            >
              <ChevronRight className="h-5 w-5" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>

      <div ref={viewportRef} className="relative mt-10 w-full overflow-hidden sm:mt-12">
        <div
          ref={trackRef}
          className="flex gap-6 px-4 transition-transform duration-500 ease-in-out sm:px-6 lg:px-8 max-[80rem]:pl-4 min-[80rem]:pl-[max(1rem,calc((100vw-80rem)/2+1rem))]"
          style={{
            transform:
              stepPx > 0 ? `translateX(-${offset * stepPx}px)` : undefined,
          }}
        >
          {cards.map((card) => (
            <article
              key={card.title}
              className="min-w-[calc(50%-12px)] shrink-0 sm:min-w-[calc(50%-12px)]"
            >
              <div className="relative aspect-[4/3] w-full bg-[#f2f2f2]">
                <Image
                  src={card.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 85vw, 40vw"
                  className="object-contain p-4"
                />
              </div>
              <div className="bg-white pt-5">
                <h3
                  className="mb-4 text-xl font-normal leading-snug text-neutral-900 sm:text-2xl"
                  style={serif}
                >
                  {card.title}
                </h3>
                <div className="flex items-center gap-3">
                  <Link
                    href={card.href}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#3B2A8F] text-white transition-[filter] hover:brightness-90"
                    aria-label={`Discover more: ${card.title}`}
                  >
                    <ArrowRight className="h-4 w-4" strokeWidth={2} />
                  </Link>
                  <Link
                    href={card.href}
                    className="text-sm text-neutral-700 underline transition-colors hover:text-[#3B2A8F]"
                  >
                    Discover more
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
