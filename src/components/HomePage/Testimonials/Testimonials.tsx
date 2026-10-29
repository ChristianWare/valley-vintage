"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Eyebrow from "@/components/shared/Eyebrow/Eyebrow";
import Left from "@/components/shared/icons/Left/Left";
import Right from "@/components/shared/icons/Right/Right";
import styles from "./Testimonials.module.css";

type Review = {
  couple: string;
  car: string;
  venue: string;
  date: string;
  quote: string;
  photo: string;
  /** "text" = white card with a small photo, "photo" = full photo card */
  kind: "text" | "photo";
  /** layout slot on desktop */
  slot: "a" | "b" | "c" | "d" | "e" | "f";
};

// Fictional reviews for the portfolio build. Format follows the site rule:
// couple's names, a wedding photo, the car + venue, month + year, link to the full review.
const reviews: Review[] = [
  {
    couple: "Priya & James",
    car: "Josephine",
    venue: "Scottsdale resort",
    date: "November 2025",
    quote:
      "Josephine with the top down and sparklers on both sides. Our exit photos are the best of the whole night.",
    photo: "/images/vehicles/green.jpg",
    kind: "text",
    slot: "a",
  },
  {
    couple: "Elena & Marcus",
    car: "Augustine",
    venue: "Downtown Phoenix",
    date: "July 2025",
    quote:
      "A July wedding in a 1936 car sounded crazy. Augustine was cooler than the reception hall, and my dad loved riding with me.",
    photo: "/images/vehicles/blackyellow.jpg",
    kind: "text",
    slot: "b",
  },
  {
    couple: "Mariana & Theo",
    car: "Rosalind",
    venue: "Botanical Garden",
    date: "March 2026",
    quote:
      "When Rosalind pulled up to the Botanical Garden, our guests actually gasped. Our chauffeur, Dominic, had the whole day timed to the minute. It's the part of the wedding everyone still talks about.",
    photo: "/images/vehicles/red.jpg",
    kind: "photo",
    slot: "c",
  },
  {
    couple: "Ava & Sam",
    car: "Clementine",
    venue: "Cave Creek",
    date: "October 2025",
    quote:
      "Clementine at golden hour in the desert foothills. Our photographer couldn't stop shooting.",
    photo: "/images/vehicles/whiteii.jpg",
    kind: "photo",
    slot: "d",
  },
  {
    couple: "Leah & Omar",
    car: "Delphine",
    venue: "Tempe",
    date: "April 2026",
    quote:
      "Lucy planned our timeline down to the minute and Dominic hit every cue. We never once looked at a clock.",
    photo: "/images/vehicles/burg.jpg",
    kind: "text",
    slot: "e",
  },
  {
    couple: "Grace & Daniel",
    car: "Rosalind",
    venue: "Arcadia",
    date: "February 2026",
    quote:
      "The price we saw online was the price we paid. No surprises, just a beautiful car and a chauffeur who cared.",
    photo: "/images/vehicles/tan.jpg",
    kind: "text",
    slot: "f",
  },
];

export default function Testimonials() {
  const trackRef = useRef<HTMLUListElement>(null);

  const scroll = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 16 : 300;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section className={styles.section} aria-labelledby='reviews-heading'>
      <div className={styles.container}>
        <header className={styles.intro}>
          <Eyebrow text='Kind words' />
          <h2 id='reviews-heading' className={`h3 ${styles.heading}`}>
            The part of the wedding everyone still talks about.
          </h2>
        </header>

        <ul ref={trackRef} className={styles.grid}>
          {reviews.map((r) => (
            <li
              key={r.couple}
              className={`${styles.card} ${styles[r.kind]} ${styles[r.slot]}`}
            >
              {r.kind === "photo" && (
                <>
                  <Image
                    src={r.photo}
                    alt={`${r.couple} with ${r.car} on their wedding day`}
                    fill
                    sizes='(max-width: 968px) 80vw, 45vw'
                    className={styles.bgImg}
                  />
                  <div className={styles.shade} aria-hidden='true' />
                </>
              )}

              {r.kind === "text" && (
                <div className={styles.avatar}>
                  <Image
                    src={r.photo}
                    alt={`${r.couple}'s wedding with ${r.car}`}
                    fill
                    sizes='40px'
                    className={styles.img}
                  />
                </div>
              )}

              <div className={styles.cardBody}>
                <blockquote className={styles.quote}>
                  &ldquo;{r.quote}&rdquo;
                </blockquote>

                <div className={styles.footer}>
                  <div>
                    <p className={styles.couple}>{r.couple}</p>
                    <p className={styles.meta}>
                      {r.car} · {r.venue} · {r.date}
                    </p>
                    <Link href='/gallery' className={styles.link}>
                      Read the full review
                    </Link>
                  </div>
                  <p className={styles.mark} aria-hidden='true'>
                    &ldquo;
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className={styles.controls}>
          <button
            type='button'
            className={styles.arrowBtn}
            onClick={() => scroll(-1)}
            aria-label='Previous reviews'
          >
            <Left className={styles.arrowIcon} />
          </button>
          <button
            type='button'
            className={styles.arrowBtn}
            onClick={() => scroll(1)}
            aria-label='Next reviews'
          >
            <Right className={styles.arrowIcon} />
          </button>
        </div>
      </div>
    </section>
  );
}
