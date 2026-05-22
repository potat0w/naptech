import { images } from "@/lib/images";
import {
  bodyText,
  btnPrimary,
  containerClass,
  labelEyebrow,
  sectionBgWhite,
  sectionPy,
  sectionTitle,
} from "@/lib/layout";
import Image from "next/image";
import Link from "next/link";

export default function RecruitmentCta() {
  return (
    <section
      className={`${sectionBgWhite} ${sectionPy}`}
      aria-labelledby="recruitment-cta-heading"
    >
      <div className={containerClass}>
        <div className="overflow-hidden rounded-2xl bg-surface-card shadow-sm">
          <div className="grid lg:grid-cols-2">
            <div className="relative aspect-[4/3] w-full lg:aspect-auto lg:min-h-[400px]">
              <Image
                src={images.crafts}
                alt="Naptec care professionals in a training session"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
            <div className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-14 lg:py-12">
              <p className={labelEyebrow}>Careers at Naptec</p>
              <h2 id="recruitment-cta-heading" className={`mt-4 ${sectionTitle}`}>
                Make a difference as a Care Professional
              </h2>
              <p className={`mt-5 max-w-xl ${bodyText}`}>
                Join our team with flexible roles, industry-leading training, and
                the chance to build meaningful relationships with clients in their
                own homes.
              </p>
              <Link href="/recruitment" className={`mt-8 w-fit ${btnPrimary}`}>
                View careers &amp; apply
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
