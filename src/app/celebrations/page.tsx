import type { Metadata } from "next";
import CelebrationsHero from "@/components/CelebrationsPage/CelebrationsHero/CelebrationsHero";
import OccasionsMarquee from "@/components/CelebrationsPage/OccasionsMarquee/OccasionsMarquee";
import Occasions from "@/components/CelebrationsPage/Occasions/Occasions";
import HomeFaq from "@/components/HomePage/HomeFaq/HomeFaq";
import FinalCta from "@/components/HomePage/FinalCta/FinalCta";

export const metadata: Metadata = {
  title: "Classic Car Rental for Proms, Anniversaries & Shoots",
  description:
    "Vintage cars with chauffeurs for anniversaries, quinceañeras, proms and photo or film productions in Phoenix.",
  alternates: { canonical: "/celebrations" },
};

export default function Page() {
  return (
    <main>
      <CelebrationsHero />
      <OccasionsMarquee />
      <Occasions />
      <HomeFaq />
      <FinalCta />
    </main>
  );
}
