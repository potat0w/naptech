"use client";

import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const serif = { fontFamily: "var(--font-playfair), ui-serif, serif" } as const;

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
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);

  const maxIndex = Math.max(0, cards.length - visibleCount);

  const measure = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    setVisibleCount(viewport.clientWidth >= 640 ? 2 : 1);
  }, []);

  useEffect(() => {
    measure();
    const observer = new ResizeObserver(measure);
    if (viewportRef.current) observer.observe(viewportRef.current);
    return () => observer.disconnect();
  }, [measure]);

  const scrollToIndex = useCallback(
    (index: number) => {
      const viewport = viewportRef.current;
      const track = trackRef.current;
      if (!viewport || !track) return;
      const clamped = Math.max(0, Math.min(index, cards.length - 1));
      const card = track.children[clamped];
      if (!(card instanceof HTMLElement)) return;
      const padLeft = parseFloat(getComputedStyle(track).paddingLeft || "0");
      viewport.scrollTo({ left: card.offsetLeft - padLeft, behavior: "smooth" });
    },
    [cards.length],
  );

  const handleScroll = useCallback(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const padLeft = parseFloat(getComputedStyle(track).paddingLeft || "0");
    let closest = 0;
    let minDist = Infinity;

    for (let i = 0; i < track.children.length; i++) {
      const child = track.children[i];
      if (!(child instanceof HTMLElement)) continue;
      const dist = Math.abs(child.offsetLeft - padLeft - viewport.scrollLeft);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    }

    setActiveIndex(Math.min(closest, Math.max(0, cards.length - visibleCount)));
  }, [cards.length, visibleCount]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    viewport.addEventListener("scroll", handleScroll, { passive: true });
    return () => viewport.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const goPrev = () => scrollToIndex(activeIndex - 1);
  const goNext = () => scrollToIndex(activeIndex + 1);

  if (cards.length === 0) return null;

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
              disabled={activeIndex === 0}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-200 text-neutral-600 transition-[filter] hover:brightness-90 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label={`Previous ${title} item`}
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={activeIndex >= maxIndex}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#3B2A8F] text-white transition-[filter] hover:brightness-90 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label={`Next ${title} item`}
            >
              <ChevronRight className="h-5 w-5" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={viewportRef}
        className="relative mt-10 w-full overflow-x-auto overscroll-x-contain scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] sm:mt-12 [&::-webkit-scrollbar]:hidden"
      >
        <div
          ref={trackRef}
          className="flex gap-6 px-4 sm:px-6 lg:px-8 max-[80rem]:pl-4 min-[80rem]:pl-[max(1rem,calc((100vw-80rem)/2+1rem))]"
        >
          {cards.map((card) => (
            <article
              key={card.title}
              className="w-[calc(100vw-2rem)] shrink-0 snap-start sm:w-[calc(50vw-1.75rem)]"
            >
              <div className="relative aspect-[4/3] w-full bg-[#f2f2f2]">
                <Image
                  src={card.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) calc(100vw - 2rem), 50vw"
                  className="object-contain p-4"
                />
              </div>
              <div className="bg-white pt-5">
                <h3
                  className="mb-4 break-words text-xl font-normal leading-snug text-neutral-900 sm:text-2xl"
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
