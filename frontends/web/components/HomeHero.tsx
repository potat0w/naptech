import { images } from "@/lib/images";
import {
  accentItalic,
  btnPrimaryLg,
  containerClass,
  labelEyebrow,
  sectionBgSurface,
} from "@/lib/layout";
import Image from "next/image";
import Link from "next/link";

export default function HomeHero() {
  return (
    <section className={`relative overflow-x-hidden ${sectionBgSurface}`}>
      <div
        className="pointer-events-none absolute -right-24 top-0 h-[28rem] w-[28rem] rounded-full bg-brand/[0.06] blur-3xl lg:h-[36rem] lg:w-[36rem]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-brand/[0.04] blur-3xl"
        aria-hidden
      />


      <div className="relative flex flex-col gap-6 sm:gap-8 lg:grid lg:min-h-[min(88vh,820px)] lg:grid-cols-2 lg:gap-0">
        <div
          className={`${containerClass} relative z-10 order-2 flex flex-col justify-center py-10 sm:py-14 lg:order-1 lg:col-start-1 lg:row-start-1 lg:max-w-none lg:py-20 xl:pr-8`}
        >
          <p className={`${labelEyebrow} animate-fade-up`}>Welcome to Naptec</p>
          <h1 className="animate-fade-up animate-fade-up-delay-1 mt-4 max-w-lg scroll-mt-20 text-[2.75rem] font-normal leading-[1.08] text-neutral-900 sm:scroll-mt-[4.25rem] sm:text-5xl lg:text-[3.5rem] xl:text-6xl">
            Professional <em className={accentItalic}>home care</em> in Croydon
          </h1>
          <p className="animate-fade-up animate-fade-up-delay-2 mt-6 max-w-md text-base leading-relaxed text-body sm:text-lg sm:leading-[1.7]">
            Compassionate elderly care at home across Croydon — including personal
            care, dementia care, live-in care, and respite for local families.
          </p>

          <div className="animate-fade-up animate-fade-up-delay-3 mt-9 sm:mt-10">
            <Link href="/enquire" className={btnPrimaryLg}>
              Book appointment
              <span
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </Link>
          </div>

        </div>

        <div className="animate-fade-up animate-fade-up-delay-2 relative order-1 mx-4 mt-4 aspect-[5/4] overflow-hidden rounded-2xl sm:mx-6 sm:mt-6 sm:aspect-[16/10] lg:absolute lg:inset-y-0 lg:right-0 lg:order-2 lg:mx-0 lg:mt-0 lg:aspect-auto lg:w-[54%] lg:max-w-none lg:rounded-none">
          <Image
            src={images.hero}
            alt="Care professional supporting a client outdoors in the sunshine"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 52vw"
            className="object-cover object-center"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-brand-deeper/50 via-transparent to-transparent lg:bg-gradient-to-r lg:from-surface lg:via-surface/40 lg:to-transparent"
            aria-hidden
          />
          <div
            className="absolute inset-y-0 left-0 hidden w-24 bg-gradient-to-r from-surface to-transparent lg:block"
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}
