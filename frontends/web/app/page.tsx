import AboutUsSection from "@/components/AboutUsSection";
// import CqcSection from "@/components/CqcSection";
import FadeIn from "@/components/FadeIn";
import GetInTouch from "@/components/GetInTouch";
import HomeHero from "@/components/HomeHero";
import RecruitmentCta from "@/components/RecruitmentCta";
import HomeCareServices from "@/components/HomeCareServices";
import NewsEvents from "@/components/NewsEvents";
import PopularServices from "@/components/PopularServices";
// import Testimonials from "@/components/Testimonials";
import TrustBar from "@/components/TrustBar";
import WhyUs from "@/components/WhyUs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Naptec | Home care built around your family",
  description:
    "Personalised, reliable home care from Naptec so your loved one can stay independent in the place they love.",
};

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <HomeHero />
      <TrustBar />
      <FadeIn>
        <AboutUsSection />
      </FadeIn>
      {/* <FadeIn>
        <CqcSection />
      </FadeIn> */}
      <FadeIn>
        <PopularServices />
      </FadeIn>
      <FadeIn>
        <WhyUs />
      </FadeIn>
      <FadeIn>
        <HomeCareServices />
      </FadeIn>
      <FadeIn>
        <GetInTouch />
      </FadeIn>
      <FadeIn>
        <RecruitmentCta />
      </FadeIn>
      {/* <FadeIn>
        <Testimonials />
      </FadeIn> */}
      <FadeIn>
        <NewsEvents />
      </FadeIn>
    </main>
  );
}
