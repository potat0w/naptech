"use client";

import { careOfferings } from "@/lib/services";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Home,
  Pill,
  Users,
  UserRound,
  Accessibility,
  HeartHandshake,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const serif = { fontFamily: "var(--font-playfair), ui-serif, serif" } as const;
const GAP_PX = 20;

const iconMap: Record<string, LucideIcon> = {
  "Companionship care": Users,
  "Home help & meal prep": Home,
  "Personal care": UserRound,
  "Mobility support": Accessibility,
  "Health appointment management": Calendar,
  "Community engagement": HeartHandshake,
  "Medication management": Pill,
};

export default function CareOfferingsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [stepPx, setStepPx] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const maxOffset = Math.max(0, careOfferings.length - visibleCount);

  const measure = useCallback(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    const first = track?.firstElementChild;
    if (!(first instanceof HTMLElement) || !viewport) return;
    const cardWidth = first.offsetWidth;
    setStepPx(cardWidth + GAP_PX);
    const count = Math.max(1, Math.floor((viewport.offsetWidth + GAP_PX) / (cardWidth + GAP_PX)));
    setVisibleCount(count);
  }, []);

  useEffect(() => {
    measure();
    const observer = new ResizeObserver(measure);
    if (viewportRef.current) observer.observe(viewportRef.current);
    return () => observer.disconnect();
  }, [measure]);

  useEffect(() => {
    setOffset((o) => Math.min(o, maxOffset));
  }, [maxOffset]);

  const goPrev = () => setOffset((o) => Math.max(0, o - 1));
  const goNext = () => setOffset((o) => Math.min(maxOffset, o + 1));

  return (
    <section
      className="overflow-hidden bg-white px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
      aria-labelledby="care-offerings-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <h2
              id="care-offerings-heading"
              className="text-3xl font-normal text-neutral-900 sm:text-4xl lg:text-5xl"
              style={serif}
            >
              What we do to care for your loved ones
            </h2>
            <p className="mt-4 text-base leading-relaxed text-neutral-600">
              We offer two types of home care: hourly care, where we visit at set
              times, or live-in care, where a caregiver resides in the home. Each
              care package is made up of a unique mix of services to meet your needs.
            </p>
          </div>
          <div className="flex shrink-0 gap-3">
            <button
              type="button"
              onClick={goPrev}
              disabled={offset === 0}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#c5c9b8] text-white transition-[filter] hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Previous care service"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={offset >= maxOffset}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#3B2A8F] text-white transition-[filter] hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Next care service"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={2} />
            </button>
          </div>
        </div>

        <div
          ref={viewportRef}
          className="relative mt-10 w-full overflow-hidden sm:mt-12"
        >
          <div
            ref={trackRef}
            className="flex gap-5 transition-transform duration-500 ease-in-out"
            style={{
              transform:
                stepPx > 0 ? `translateX(-${offset * stepPx}px)` : undefined,
            }}
          >
            {careOfferings.map((item) => {
              const Icon = iconMap[item.title] ?? Users;
              return (
                <article
                  key={item.title}
                  className="w-[min(85vw,300px)] shrink-0 rounded-2xl bg-[#f4f4f4] p-8 sm:w-[min(42vw,320px)] lg:w-[calc((100%-40px)/3)]"
                >
                  <Icon
                    className="h-9 w-9 text-[#3B2A8F]"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                  <h3
                    className="mt-6 text-2xl font-normal leading-snug text-neutral-900 sm:text-[1.65rem]"
                    style={serif}
                  >
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-neutral-600">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
