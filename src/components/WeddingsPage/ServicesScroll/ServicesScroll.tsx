// Services and pricing, in the exact same sideways-scrolling cards as the
// Our Story "By the numbers" section.

import ByTheNumbers, {
  type ScrollCard,
} from "@/components/OurStoryPage/ByTheNumbers/ByTheNumbers";

const services: ScrollCard[] = [
  {
    text: "Pickup at your getting-ready suite, a scenic route and arrival at the ceremony with the door held.",
    title: "Ceremony Arrival",
    subtitle: "From $395",
    src: "/images/wedding/wedding7.jpg",
  },
  {
    text: "Your first ride as newlyweds, with a 15-minute stop for photos on the way.",
    title: "Ceremony to Reception",
    subtitle: "From $395",
    src: "/images/wedding/wedding8.jpg",
  },
  {
    text: "A staged departure from the reception for the sparkler send-off, then a drive to your hotel.",
    title: "Grand Exit",
    subtitle: "From $345",
    src: "/images/wedding/wedding9.jpg",
  },
  {
    text: "Car and chauffeur on standby for the arrival, photos, the first ride and the exit. 3-hour minimum, $195 per extra hour.",
    title: "Full Wedding Day",
    subtitle: "From $675 · 3 hrs",
    src: "/images/wedding/wedding10.jpg",
  },
  {
    text: "The car staged and moved between locations for engagement, bridal or wedding portraits. 2-hour minimum.",
    title: "Photo Session",
    subtitle: "From $495 · 2 hrs",
    src: "/images/wedding/wedding11.jpg",
  },
];

export default function ServicesScroll() {
  return (
    <ByTheNumbers
      eyebrow='Services and pricing'
      heading='Choose your moment, or the whole day'
      headingId='services-pricing-heading'
      cards={services}
    />
  );
}
