import type { Metadata } from "next";
import { SITE } from "@/config/site";
import StoryHero from "@/components/OurStoryPage/StoryHero/StoryHero";
import TheStory from "@/components/OurStoryPage/TheStory/TheStory";
import Promises from "@/components/OurStoryPage/Promises/Promises";
import ByTheNumbers from "@/components/OurStoryPage/ByTheNumbers/ByTheNumbers";
import WeddingFilm from "@/components/HomePage/WeddingFilm/WeddingFilm";
import MeetTheTeam from "@/components/OurStoryPage/MeetTheTeam/MeetTheTeam";
import HomeFaq from "@/components/HomePage/HomeFaq/HomeFaq";
import FinalCta from "@/components/HomePage/FinalCta/FinalCta";

export const metadata: Metadata = {
  title: "Our Story",
  description: `The family and the Phoenix garage behind ${SITE.name}: five hand-restored classics, one wedding per car, per day, since ${SITE.founded}.`,
  alternates: { canonical: "/our-story" },
};

export default function Page() {
  return (
    <main>
      <StoryHero />
      <TheStory />
      <Promises />
      <ByTheNumbers />
      <WeddingFilm />
      <MeetTheTeam />
      <HomeFaq />
      <FinalCta />
    </main>
  );
}
