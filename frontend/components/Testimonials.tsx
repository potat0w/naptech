"use client";

import { images } from "@/lib/images";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";

const serif = { fontFamily: "var(--font-playfair), ui-serif, serif" } as const;

const slides = [
  {
    image: images.caregiver,
    alt: "A care professional speaking with an older adult at home",
    author: "Paul, Client",
    quote:
      "Naptec provide first class care. My care professionals are patient, kind and very reliable. I am very happy with the service they provide.",
  },
  {
    image: images.handsCare,
    alt: "An older adult smiling outdoors",
    author: "Elisie, Client",
    quote:
      "As I got older, I realised that this service had made me happy in my own home.",
  },
];

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fade, setFade] = useState(true);

  const go = useCallback((delta: number) => {
    setFade(false);
    window.setTimeout(() => {
      setCurrentSlide((s) => (s + delta + slides.length) % slides.length);
      setFade(true);
    }, 300);
  }, []);

  const slide = slides[currentSlide];

  return null;

  /*
  return (
    <section
      className="grid w-full grid-cols-1 lg:grid-cols-2"
      aria-label="Client testimonials"
    >
      <div className="relative aspect-[4/3] w-full lg:aspect-auto lg:min-h-[480px]">
        {slides.map((s, i) => (
          <Image
            key={s.author}
            src={s.image}
            alt={s.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className={`object-cover transition-opacity duration-500 ${
              i === currentSlide ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            priority={i === 0}
          />
        ))}
      </div>

      <div className="flex flex-col justify-center bg-brand px-6 py-14 text-white sm:px-10 lg:px-14 lg:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">
          Client testimonial
        </p>
        <blockquote
          className={`mt-6 text-2xl font-normal leading-relaxed sm:text-3xl lg:text-4xl transition-opacity duration-300 ${fade ? "opacity-100" : "opacity-0"}`}
          style={serif}
        >
          &ldquo;{slide.quote}&rdquo;
        </blockquote>
        <p
          className={`mt-6 text-sm text-white/75 transition-opacity duration-300 ${fade ? "opacity-100" : "opacity-0"}`}
        >
          {slide.author}
        </p>
        <div className="mt-10 flex gap-3">
          <button
            type="button"
            onClick={() => go(-1)}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand transition-colors hover:bg-white/90"
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
