import type { Metadata } from "next";
import FaqIntro from "@/components/FaqPage/FaqIntro/FaqIntro";
import FaqGroups from "@/components/FaqPage/FaqGroups/FaqGroups";
import FaqContact from "@/components/FaqPage/FaqContact/FaqContact";
import FinalCta from "@/components/HomePage/FinalCta/FinalCta";

export const metadata: Metadata = {
  title: "Vintage Wedding Car FAQ · Heat, Monsoon & Booking",
  description:
    "Answers on climate control, convertible season, deposits, gowns and how far our cars travel.",
  alternates: { canonical: "/faq" },
};

export default function Page() {
  return (
    <main>
      <FaqIntro />
      <FaqGroups />
      <FaqContact />
      <FinalCta />
    </main>
  );
}
