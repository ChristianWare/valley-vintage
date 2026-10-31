import type { Metadata } from "next";
import WeddingsHero from "@/components/WeddingsPage/WeddingsHero/WeddingsHero";
import ServicesScroll from "@/components/WeddingsPage/ServicesScroll/ServicesScroll";
import BookingIncludes from "@/components/WeddingsPage/BookingIncludes/BookingIncludes";
import AddOns from "@/components/WeddingsPage/AddOns/AddOns";
import BridalPairing from "@/components/WeddingsPage/BridalPairing/BridalPairing";
import ReservingDate from "@/components/WeddingsPage/ReservingDate/ReservingDate";
import Packages from "@/components/HomePage/Packages/Packages";
import HomeFaq from "@/components/HomePage/HomeFaq/HomeFaq";
import FinalCta from "@/components/HomePage/FinalCta/FinalCta";

export const metadata: Metadata = {
  title: "Wedding Car Packages & Pricing in Phoenix",
  description:
    "Ceremony arrivals, first rides, grand exits and full-day packages from $345. Reserve with a $250 deposit.",
  alternates: { canonical: "/weddings" },
};

export default function Page() {
  return (
    <main>
      <WeddingsHero />
      <ServicesScroll />
      <BookingIncludes />
      <FinalCta />
      <BridalPairing />
      <AddOns />
      <div id='packages'>
        <Packages />
      </div>
      <ReservingDate />
      <HomeFaq />
      {/* <FinalCta /> */}
    </main>
  );
}
