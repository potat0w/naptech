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
  title: "Home Care in Croydon | Naptec Care",
  description:
    "Professional home care, live-in care, dementia care, personal care, and respite care at home in Croydon. Free consultation for local families.",
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
