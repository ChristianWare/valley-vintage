import type { Metadata } from "next";
import { guides } from "@/lib/pageGuides";
import { SITE } from "@/config/site";
import Hero from "@/components/HomePage/Hero/Hero";

export const metadata: Metadata = {
  title: "Home",
  description: `${SITE.description}`,
};

export default function Page() {
  return (
    <main>
     <Hero />
    </main>
  );
}
