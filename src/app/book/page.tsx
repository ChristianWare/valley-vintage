import type { Metadata } from "next";
import BookingIntro from "@/components/VintageBooking/BookingIntro/BookingIntro";
import BookingWizard from "@/components/VintageBooking/BookingWizard/BookingWizard";
import LayoutWrapper from "@/components/shared/LayoutWrapper";

export const metadata: Metadata = {
  title: "Book a Vintage Wedding Car in Phoenix",
  description:
    "Check availability by date, choose your car and reserve in about three minutes.",
  alternates: { canonical: "/book" },
};

// /book?service=grand-exit&car=rosalind pre-selects a service and car
export default async function BookPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = (await searchParams) ?? {};
  const service = typeof sp.service === "string" ? sp.service : undefined;
  const car = typeof sp.car === "string" ? sp.car : undefined;

  return (
    <main style={{ backgroundColor: "var(--green50)" }}>
      <BookingIntro />
      <LayoutWrapper>
        <BookingWizard initialService={service} initialCar={car} />
      </LayoutWrapper>
    </main>
  );
}
