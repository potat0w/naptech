"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useState } from "react";

const serif = { fontFamily: "var(--font-playfair), ui-serif, serif" } as const;

const testimonials = [
  {
    quote:
      "I am very happy with the support, care and kindness I receive from all the staff of Naptec.",
    author: "B.M, Client",
  },
  {
    quote:
      "This is a company whose staff really do care on a personal level and who are client orientated, providing stimulating activities, conversation and going the extra mile to help client and family.",
    author: "Eileen, Client",
  },
  {
    quote:
      "Naptec have been looking after my father for a few years now, without them we would not be able to manage having him living in his own home. They are always bright and cheerful and Dad enjoys seeing them.",
    author: "Bridget, Client's Family",
  },
];

export default function FaqTestimonials() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const go = useCallback((delta: number) => {
    setFade(false);
    window.setTimeout(() => {
      setIndex((i) => (i + delta + testimonials.length) % testimonials.length);
      setFade(true);
    }, 250);
  }, []);

  const current = testimonials[index];

  return null;

  /*
  return (
    <section
      className="border-t border-neutral-100 bg-[#faf8f4] px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      aria-label="Client testimonials"
    >
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
          Client testimonial
        </p>
        <blockquote
          className={`mt-6 text-2xl font-normal leading-relaxed text-neutral-900 transition-opacity duration-300 sm:text-3xl ${
            fade ? "opacity-100" : "opacity-0"
          }`}
          style={serif}
        >
          &ldquo;{current.quote}&rdquo;
        </blockquote>
        <p
          className={`mt-6 text-sm text-neutral-600 transition-opacity duration-300 ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        >
          {current.author}
        </p>
        <div className="mt-10 flex justify-center gap-3">
          <button
            type="button"
            onClick={() => go(-1)}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-200 text-neutral-700 transition-[filter] hover:brightness-90"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#3B2A8F] text-white transition-[filter] hover:brightness-90"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>
      </div>
    </section>
  );
  */
}
