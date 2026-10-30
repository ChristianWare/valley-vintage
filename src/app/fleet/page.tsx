import type { Metadata } from "next";
import { SITE } from "@/config/site";
import FleetHero from "@/components/FleetPage/FleetHero/FleetHero";
import FleetCards from "@/components/FleetPage/FleetCards/FleetCards";
import FleetCare from "@/components/FleetPage/FleetCare/FleetCare";
import Packages from "@/components/HomePage/Packages/Packages";
import HomeFaq from "@/components/HomePage/HomeFaq/HomeFaq";
import FinalCta from "@/components/HomePage/FinalCta/FinalCta";

export const metadata: Metadata = {
  title: "Our Classic Wedding Cars",
  description: `Meet Rosalind, Clementine, Augustine, Delphine and Josephine, five restored classics for Valley weddings from ${SITE.name}.`,
  alternates: { canonical: "/fleet" },
};

export default function Page() {
  return (
    <main>
      <FleetHero />
      <FleetCards />
      <FleetCare />
      <Packages />
      <HomeFaq />
      <FinalCta />
    </main>
  );
}
