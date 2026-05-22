import { howItWorksSteps } from "@/lib/how-it-works-steps";
import Image from "next/image";
import Link from "next/link";

const serif = { fontFamily: "var(--font-playfair), ui-serif, serif" } as const;

export default function HowItWorksSteps() {
  return (
    <div className="bg-white">
      {howItWorksSteps.map((step, index) => {
        const imageFirst = index % 2 === 1;
        return (
          <article
            key={step.id}
            id={step.id}
            className={`scroll-mt-28 border-b border-neutral-100 px-4 py-14 last:border-b-0 sm:px-6 sm:py-16 lg:px-8 lg:py-20 ${
              index % 2 === 0 ? "bg-white" : "bg-[#faf8f4]"
            }`}
          >
            <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 sm:items-center sm:gap-10 lg:gap-14">
              <div
                className={`min-w-0 ${imageFirst ? "order-2 sm:order-2" : "order-1 sm:order-1"}`}
              >
                <p
                  className="text-xl font-medium text-[#3B2A8F] sm:text-2xl"
                  style={serif}
                >
                  {step.number}
                </p>
                <h2
                  className="mt-3 text-3xl font-normal leading-tight text-neutral-900 sm:text-4xl"
                  style={serif}
                >
                  {step.title}
                </h2>
                <div className="mt-6 space-y-4 text-base leading-relaxed text-neutral-600 sm:text-lg sm:leading-[1.75]">
                  {step.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                  ))}
                </div>
                <Link
                  href="/enquire"
                  className="mt-6 inline-block text-sm font-medium text-[#3B2A8F] underline underline-offset-4 transition-colors hover:text-[#2d1f6d]"
                >
                  Discover more
                </Link>
              </div>

              <div
                className={`relative aspect-[4/3] w-full overflow-hidden bg-neutral-200 sm:aspect-[5/4] ${
                  imageFirst ? "order-1 sm:order-1" : "order-2 sm:order-2"
                }`}
              >
                <Image
                  src={step.image}
                  alt={step.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
