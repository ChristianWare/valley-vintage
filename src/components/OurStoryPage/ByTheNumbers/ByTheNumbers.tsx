"use client";

// "By the numbers": one white card, one slide at a time. The slides are
// stacked inside the card, the current one on top. The section pins to the
// screen; each slide holds still for a moment, then slides off to the left
// as you scroll, revealing the next one already sitting behind it. The card
// itself stays put and clips the slides. After the last slide the page
// scrolls on as normal.
// At 568px and below the slides simply stack as separate cards.
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
  const count = cards.length;

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const stacked = window.matchMedia(STACKED);
    const slides = Array.from(track.children) as HTMLElement[];
    let travel = 0; // how far a slide moves to leave the card
    let scrollLength = 0; // vertical scroll spent going through them all
    let frame = 0;

    // Share of each slide's scroll spent holding still before it slides off
    const HOLD = 0.3;

    const reset = () => slides.forEach((el) => (el.style.transform = ""));

    const measure = () => {
      if (stacked.matches || count < 2) {
        travel = 0;
        scrollLength = 0;
        section.style.height = "";
        reset();
        return;
      }
      // far enough to clear the card's left edge, padding included
      travel = track.offsetLeft + track.clientWidth + 1;
      // about 80% of a screen of scrolling per slide
      scrollLength = window.innerHeight * 0.8 * (count - 1);
      section.style.height = `${window.innerHeight + scrollLength}px`;
      move();
    };

    const move = () => {
      frame = 0;
      if (!scrollLength) return;
      const scrolled = -section.getBoundingClientRect().top;
      const progress = Math.min(1, Math.max(0, scrolled / scrollLength));
      const position = progress * (count - 1); // 0 … count-1

      // the last slide never moves; every other slide holds, then leaves
      slides.forEach((el, i) => {
        if (i === count - 1) return;
        const local = Math.min(1, Math.max(0, position - i));
        const t = Math.min(1, Math.max(0, (local - HOLD) / (1 - HOLD)));
        el.style.transform = `translate3d(${-t * travel}px, 0, 0)`;
      });
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
  }, [count]);

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

        {/* the white card stays still and clips the slides inside it */}
        <div className={styles.frameWrap}>
          <div className={styles.frame}>
            <ul ref={trackRef} className={styles.track}>
              {cards.map((c, i) => (
                <li
                  key={c.title}
                  className={styles.card}
                  // first slide on top, each next one tucked behind it
                  style={{ zIndex: cards.length - i }}
                >
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
        </div>
      </div>
    </section>
  );
}
