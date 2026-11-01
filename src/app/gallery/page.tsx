import type { Metadata } from "next";
import GalleryIntro from "@/components/GalleryPage/GalleryIntro/GalleryIntro";
import PhotoGroup from "@/components/GalleryPage/PhotoGroup/PhotoGroup";
import HomeFaq from "@/components/HomePage/HomeFaq/HomeFaq";
import FinalCta from "@/components/HomePage/FinalCta/FinalCta";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Real Valley weddings in our restored classic cars: ceremony arrivals, first rides and grand exits across Phoenix and Scottsdale.",
  alternates: { canonical: "/gallery" },
};

export default function Page() {
  return (
    <main>
      <GalleryIntro />
      <PhotoGroup />
      <HomeFaq />
      <FinalCta />
    </main>
  );
}
