import type { Metadata } from "next";
import { guides } from "@/lib/pageGuides";
import { SITE } from "@/config/site";
import Hero from "@/components/HomePage/Hero/Hero";
import AboutIntro from "@/components/HomePage/AboutIntro/AboutIntro";
import FleetPreview from "@/components/HomePage/FleetPreview/FleetPreview";
import HowItWorks from "@/components/HomePage/HowItWorks/HowItWorks";
import BuiltForArizona from "@/components/HomePage/BuiltForArizona/BuiltForArizona";
import WeddingFilm from "@/components/HomePage/WeddingFilm/WeddingFilm";
import ServicesTeaser from "@/components/HomePage/ServicesTeaser/ServicesTeaser";
import Testimonials from "@/components/HomePage/Testimonials/Testimonials";
import Packages from "@/components/HomePage/Packages/Packages";
import PlannerCallout from "@/components/HomePage/PlannerCallout/PlannerCallout";
import HomeFaq from "@/components/HomePage/HomeFaq/HomeFaq";
import FinalCta from "@/components/HomePage/FinalCta/FinalCta";

export const metadata: Metadata = {
  title: "Home",
  description: `${SITE.description}`,
};

export default function Page() {
  return (
    <main>
      <Hero />
      <AboutIntro />
      <FleetPreview />
      <HowItWorks />
      <BuiltForArizona />
      <WeddingFilm />
      <ServicesTeaser />
      <Testimonials />
      <Packages />
      <PlannerCallout />
      <HomeFaq />
      <FinalCta />
    </main>
  );
}
