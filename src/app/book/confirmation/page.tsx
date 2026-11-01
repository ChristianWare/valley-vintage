import type { Metadata } from "next";
import Nav from "@/components/shared/Nav/Nav";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import Confirmation from "@/components/VintageBooking/Confirmation/Confirmation";

export const metadata: Metadata = {
  title: "Booking Confirmed",
  robots: { index: false },
};

export default function Page() {
  return (
    <main style={{ backgroundColor: "var(--green50)" }}>
      <Nav />
      <LayoutWrapper>
        <Confirmation />
      </LayoutWrapper>
    </main>
  );
}
