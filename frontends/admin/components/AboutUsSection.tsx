import { images } from "@/lib/images";
import {
  bodyText,
  btnPrimary,
  containerClass,
  labelEyebrow,
  sectionBgSurfaceAlt,
  sectionPy,
} from "@/lib/layout";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const values = ["Compassion", "Integrity", "Respect"] as const;

const aboutImages = [
  {
    src: images.handsCare,
    alt: "Care professional holding hands with a client at home",
  },
  {
    src: images.caregiver,
    alt: "Caregiver sharing a warm moment with a client",
  },
] as const;

export default function AboutUsSection() {
  return (
    <section
      className={`${sectionBgSurfaceAlt} ${sectionPy}`}
      aria-labelledby="about-us-heading"
    >
      <div
        className={`${containerClass} grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20`}
      >
        <div>
          <p className={labelEyebrow}>About us</p>
          <h2
            id="about-us-heading"
            className="mt-4 max-w-lg text-4xl font-normal leading-[1.15] text-neutral-900 sm:text-5xl lg:text-[3.25rem]"
          >
            Caring for Your Loved Ones, Like Family
          </h2>
          <p className={`mt-6 max-w-xl ${bodyText}`}>
            At Naptec, we believe home care should feel personal, respectful, and
            reassuring. Our team takes the time to understand each client&apos;s
            routines, preferences, and needs — so support always feels thoughtful,
            never rushed.
          </p>

          <h3 className="mt-10 text-2xl font-normal text-neutral-900 sm:text-3xl">
            Our Value:
          </h3>
          <ul className="mt-5 grid grid-cols-2 gap-x-8 gap-y-3 sm:gap-x-12">
            {[...values, ...values].map((value, i) => (
              <li key={`${value}-${i}`} className="flex items-center gap-2.5">
                <Check
                  className="h-4 w-4 shrink-0 text-brand"
                  strokeWidth={2.5}
                  aria-hidden
                />
                <span className="text-sm text-body sm:text-base">{value}</span>
              </li>
            ))}
          </ul>

          <Link
            href="/why-us/our-team"
            className={`mt-10 ${btnPrimary}`}
          >
            Learn more
          </Link>
        </div>

        <div className="flex items-start justify-center gap-4 sm:gap-5 lg:justify-end">
          <div className="relative mt-10 aspect-[3/4] w-[46%] max-w-[220px] overflow-hidden sm:mt-14 sm:max-w-[260px] lg:mt-16 lg:max-w-[280px]">
            <Image
              src={aboutImages[0].src}
              alt={aboutImages[0].alt}
              fill
              sizes="(max-width: 1024px) 42vw, 280px"
              className="object-cover object-center"
            />
          </div>
          <div className="relative aspect-[3/4] w-[46%] max-w-[220px] overflow-hidden sm:max-w-[260px] lg:max-w-[280px]">
            <Image
              src={aboutImages[1].src}
              alt={aboutImages[1].alt}
              fill
              sizes="(max-width: 1024px) 42vw, 280px"
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
