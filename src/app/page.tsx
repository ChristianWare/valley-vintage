import type { Metadata } from "next";
import { guides } from "@/lib/pageGuides";
import { SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "Home",
  description: `${SITE.description}`,
};

export default function Page() {
  return (
    <main>
      <span>Holistic mental health</span>
      <h1>
        Expert-supported and mental <br /> wellness therapy and counseling.
      </h1>
    </main>
  );
}
