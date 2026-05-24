"use client";

import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  carouselBtnNext,
  carouselBtnPrev,
  containerClass,
  sectionBgSurfaceAlt,
  sectionPy,
  sectionTitle,
} from "@/lib/layout";

export type CarouselCard = {
  image: string;
  title: string;
  href: string;
};

type ContentCarouselProps = {
  title: string;
  cards: CarouselCard[];
  ariaLabel: string;
  viewAllHref?: string;
};

const GAP_PX = 24;

export default function ContentCarousel({
  title,
  cards,
  ariaLabel,
  viewAllHref,
}: ContentCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [stepPx, setStepPx] = useState(0);
  const [visibleCount, setVisibleCount] = useState(2);
  const maxOffset = Math.max(0, cards.length - visibleCount);

  const measure = useCallback(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    const first = track?.firstElementChild;
    if (!(first instanceof HTMLElement) || !viewport) return;
    const cardWidth = first.offsetWidth;
    setStepPx(cardWidth + GAP_PX);
    const count = Math.max(
      1,
      Math.floor((viewport.offsetWidth + GAP_PX) / (cardWidth + GAP_PX)),
    );
    setVisibleCount(count);
  }, []);

  useEffect(() => {
    measure();
    const observer = new ResizeObserver(measure);
    if (viewportRef.current) observer.observe(viewportRef.current);
    return () => observer.disconnect();
  }, [measure, cards.length]);

  useEffect(() => {
    setOffset((o) => Math.min(o, maxOffset));
  }, [maxOffset]);

  const goPrev = () => setOffset((o) => Math.max(0, o - 1));
  const goNext = () => setOffset((o) => Math.min(maxOffset, o + 1));

  if (cards.length === 0) {
    return null;
  }

  return (
    <section
      className={`overflow-hidden ${sectionBgSurfaceAlt} ${sectionPy}`}
      aria-label={ariaLabel}
    >
      <div className={containerClass}>
        <div className="flex items-end justify-between gap-6">
          <h2 className={sectionTitle}>{title}</h2>
          <div className="flex shrink-0 items-center gap-4">
            {viewAllHref ? (
              <Link
                href={viewAllHref}
                className="hidden text-sm text-body underline underline-offset-4 transition-colors hover:text-brand sm:inline"
              >
                View all
              </Link>
            ) : null}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={goPrev}
                disabled={offset === 0}
                className={`${carouselBtnPrev} disabled:cursor-not-allowed disabled:opacity-40`}
                aria-label={`Previous ${title} item`}
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={2} />
              </button>
              <button
                type="button"
                onClick={goNext}
                disabled={offset >= maxOffset}
                className={`${carouselBtnNext} disabled:cursor-not-allowed disabled:opacity-40`}
                aria-label={`Next ${title} item`}
              >
                <ChevronRight className="h-5 w-5" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={viewportRef}
        className="relative mt-10 overflow-hidden sm:mt-12"
        style={{
          paddingLeft: "max(1rem, calc((100vw - min(100vw, 1600px)) / 2 + 1rem))",
        }}
      >
        <div
          ref={trackRef}
          className="flex gap-6 pr-4 transition-transform duration-500 ease-in-out sm:pr-6 lg:pr-8"
          style={{
            transform:
              stepPx > 0 ? `translateX(-${offset * stepPx}px)` : undefined,
          }}
        >
          {cards.map((card) => (
            <article
              key={card.title}
              className="w-[min(88vw,380px)] shrink-0 sm:w-[min(42vw,420px)] lg:w-[calc((min(100vw,1600px)-4rem-24px)/2)]"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-surface-card">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 768px) 88vw, 42vw"
                  className="object-cover object-center"
                />
              </div>
              <div className="pt-5">
                <h3 className="mb-4 text-xl font-normal leading-snug text-neutral-900 sm:text-2xl [font-family:var(--font-playfair),ui-serif,serif]">
                  {card.title}
                </h3>
                <div className="flex items-center gap-3">
                  <Link
                    href={card.href}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-white transition-colors hover:bg-brand-dark"
                    aria-label={`Discover more: ${card.title}`}
                  >
                    <ArrowRight className="h-4 w-4" strokeWidth={2} />
                  </Link>
                  <Link
                    href={card.href}
                    className="text-sm text-body underline underline-offset-4 transition-colors hover:text-brand"
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
