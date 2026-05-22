import {
  btnPrimaryInverse,
  containerClass,
  sectionBgBrand,
  sectionPy,
  sectionTitle,
} from "@/lib/layout";
import Link from "next/link";

export default function GetInTouch() {
  return (
    <section
      className={`${sectionBgBrand} ${sectionPy} text-white`}
      aria-labelledby="get-in-touch-heading"
    >
      <div className={`${containerClass} flex flex-col items-center text-center`}>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
          Enquire now
        </p>
        <h2
          id="get-in-touch-heading"
          className={`mt-4 max-w-3xl text-white ${sectionTitle}`}
        >
          Get in touch <em className="font-medium italic text-white/90">today</em>{" "}
          to see how we can
          help
        </h2>
        <Link href="/enquire" className={`mt-8 ${btnPrimaryInverse}`}>
          Get in touch
        </Link>
      </div>
    </section>
  );
}
