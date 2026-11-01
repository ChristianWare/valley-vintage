import type { Metadata } from "next";
import { SITE } from "@/config/site";
import ContactIntro from "@/components/ContactPage/ContactIntro/ContactIntro";
import ContactSection from "@/components/ContactPage/ContactSection/ContactSection";
import FinalCta from "@/components/HomePage/FinalCta/FinalCta";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with ${SITE.name}: call ${SITE.phone.display}, email or send a note. Garage visits by appointment in central Phoenix.`,
  alternates: { canonical: "/contact" },
};

export default function Page() {
  return (
    <main>
      <ContactIntro />
      <ContactSection />
      <FinalCta />
    </main>
  );
}
