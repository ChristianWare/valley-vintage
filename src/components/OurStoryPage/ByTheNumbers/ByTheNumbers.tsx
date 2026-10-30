"use client";

// "By the numbers": white cards that slide sideways as you scroll.
// The section pins to the screen, vertical scrolling moves the cards from
// right to left, and once the last card is in place the page scrolls on
// as normal. At 568px and below the cards simply stack.
//
// Reused on other pages (e.g. Wedding Services) by passing your own
// eyebrow, heading and cards. With no props it shows the Our Story numbers.

import { useEffect, useRef } from "react";
import Image from "next/image";
import Eyebrow from "@/components/shared/Eyebrow/Eyebrow";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import Sparkle from "@/components/shared/icons/Sparkle/Sparkle";
import styles from "./ByTheNumbers.module.css";

export type ScrollCard = {
  text: string;
  title: string;
  subtitle: string;
  src: string;
};

const defaultCards: ScrollCard[] = [
  {
    text: "Every car restored by hand in our own garage off 16th Street.",
    title: "5 restored classics",
    subtitle: "From 1928 to 1957",
    src: "/images/vehicles/red.jpg",
  },
  {
    text: "From garden ceremonies in Arcadia to sparkler exits in Scottsdale.",
    title: "400+ Valley weddings",
    subtitle: "And counting",
    src: "/images/vehicles/whiteii.jpg",
  },
  {
    text: "Rosalind's first booking came from two guests at Lucy's own wedding.",
    title: "9 years on the road",
    subtitle: "Since 2017",
    src: "/images/vehicles/blackyellow.jpg",
  },
  {
    text: "No rushing between events and no back-to-back bookings.",
    title: "1 wedding per car",
    subtitle: "Per day, every day",
    src: "/images/vehicles/burg.jpg",
  },
];

// Matches the stacked layout in the CSS
const STACKED = "(max-width: 568px)";

export default function ByTheNumbers({
  eyebrow = "By the numbers",
  heading = "Nine years on the road, and every ride still matters",
  headingId = "numbers-heading",
  cards = defaultCards,
}: {
  eyebrow?: string;
  heading?: string;
  /** Unique per page, used for the section's accessible name */
  headingId?: string;
  cards?: ScrollCard[];
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const stacked = window.matchMedia(STACKED);
    let distance = 0;
    let frame = 0;

    // How far the track has to travel, and how tall the section must be
    // so that travel takes exactly that much vertical scrolling.
    const measure = () => {
      if (stacked.matches) {
        distance = 0;
        section.style.height = "";
        track.style.transform = "";
        return;
      }
      distance = Math.max(0, track.scrollWidth - window.innerWidth);
      section.style.height = `${window.innerHeight + distance}px`;
      move();
    };

    const move = () => {
      frame = 0;
      if (!distance) return;
      const scrolled = -section.getBoundingClientRect().top;
      const progress = Math.min(1, Math.max(0, scrolled / distance));
      track.style.transform = `translate3d(${-progress * distance}px, 0, 0)`;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(move);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    stacked.addEventListener("change", measure);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      stacked.removeEventListener("change", measure);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [cards]);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby={headingId}
    >
      <div className={styles.sticky}>
        <LayoutWrapper>
          <header className={styles.intro}>
            <Eyebrow text={eyebrow} tone='light' />
            <h2 id={headingId} className={styles.heading}>
              {heading}
            </h2>
          </header>
        </LayoutWrapper>

        <ul ref={trackRef} className={styles.track}>
          {cards.map((c) => (
            <li key={c.title} className={styles.card}>
              <div className={styles.cardText}>
                <p className={styles.text}>{c.text}</p>
                <div className={styles.cardBottom}>
                  <Sparkle className={styles.sparkle} />
                  <h3 className={styles.title}>{c.title}</h3>
                  <h4 className={`h5 ${styles.subtitle}`}>{c.subtitle}</h4>
                </div>
              </div>
              <div className={styles.photo}>
                <Image
                  src={c.src}
                  alt=''
                  fill
                  sizes='(max-width: 568px) 100vw, 440px'
                  className={styles.img}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
