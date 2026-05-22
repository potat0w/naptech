"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useState } from "react";

const serif = { fontFamily: "var(--font-playfair), ui-serif, serif" } as const;

const slides = [
  {
    quote:
      "I feel happy all the time in my work. The relationships that you get to build with clients are special and even after a tough day I go home smiling.",
    author: "Lindsay, Care Professional",
  },
  {
    quote:
      "Working for Naptec is an extremely fulfilling role with great training and support. I particularly enjoy making a positive difference to all my lovely clients every day.",
    author: "Zoe, Care Professional",
  },
  {
    quote:
      "There is so much support for me to do my job effectively and confidently. I have been accurately matched to my clients and have a great relationship with them all — it doesn't feel like work at all.",
    author: "Sarah, Care Professional",
  },
] as const;

export default function CareProTestimonials() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const go = useCallback((delta: number) => {
    setFade(false);
    window.setTimeout(() => {
      setIndex((i) => (i + delta + slides.length) % slides.length);
      setFade(true);
    }, 280);
  }, []);

  const slide = slides[index];

  return (
    <section
      className="bg-[#f4f4f2] px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
      aria-label="Care professional testimonials"
    >
      <div className="mx-auto max-w-4xl text-center">
        <blockquote
          className={`text-2xl font-normal leading-relaxed text-neutral-900 transition-opacity duration-300 sm:text-3xl lg:text-4xl ${fade ? "opacity-100" : "opacity-0"}`}
          style={serif}
        >
          &ldquo;{slide.quote}&rdquo;
        </blockquote>
        <p
          className={`mt-6 text-sm text-neutral-600 transition-opacity duration-300 ${fade ? "opacity-100" : "opacity-0"}`}
        >
          {slide.author}
        </p>
        <div className="mt-10 flex justify-center gap-3">
          <button
            type="button"
            onClick={() => go(-1)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-neutral-700 shadow-sm transition-[filter] hover:brightness-95"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#3B2A8F] text-white transition-[filter] hover:brightness-95"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>
      </div>
    </section>
  );
}
