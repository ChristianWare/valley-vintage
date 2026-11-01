"use client";

// Occasions: a list on the left, a photo on the right. On desktop the
// section pins to the screen and scrolling steps through the occasions
// one by one (the open item and the photo change together); after the
// last one the page scrolls on. At 768px and below there's no pinning:
// it's an accordion. The first occasion starts open, tapping another opens
// it (and closes the rest), and each photo sits under its own text.

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Eyebrow from "@/components/shared/Eyebrow/Eyebrow";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import styles from "./Occasions.module.css";

type Occasion = {
  title: string;
  price: string;
  text: string;
  note?: string;
  cta?: { text: string; href: string };
  src: string;
};

const occasions: Occasion[] = [
  {
    title: "Anniversaries & Vow Renewals",
    price: "Hourly, from $395 (2 hrs)",
    text: "Relive the day, or give it the entrance it never had. Book a car for a vow renewal, an anniversary dinner or a slow drive through Arcadia's citrus groves at sunset. Add a champagne toast and we'll handle the rest.",
    src: "/images/vehicles/red.jpg",
  },
  {
    title: "Prom, Homecoming & Quinceañeras",
    price: "Hourly, from $445 (2 hrs)",
    text: "The night they'll remember, with a chauffeur the parents will love. We pick up for photos, deliver to the dance and bring everyone home on time. Augustine seats four, and Josephine is a quinceañera favorite.",
    note: "Parent note: our chauffeurs are background-checked, and every ride follows the pickup and drop-off times you approve.",
    src: "/images/vehicles/green.jpg",
  },
  {
    title: "Engagement & Portrait Sessions",
    price: "Hourly, from $495 (2 hrs)",
    text: "Photographers, this one's for you. We stage the car, move it between locations and keep it spotless between frames. Clementine and Josephine shine for open-top shots; Rosalind is the classic.",
    src: "/images/vehicles/whiteii.jpg",
  },
  {
    title: "Film, Photo & Commercial",
    price: "Custom quote",
    text: "Need a period car for a music video, a brand campaign or a short film? Our cars are available for static and driving shots with a trained chauffeur on set. Tell us about your production and we'll send a quote within 24 hours.",
    cta: { text: "Request a production quote", href: "/contact" },
    src: "/images/vehicles/blackandwhite.jpg",
  },
  {
    title: "Gatsby & Theme Parties",
    price: "Hourly, from $445 (2 hrs)",
    text: "Throwing a Roaring Twenties birthday, a speakeasy night or a Gatsby gala? Rosalind and Augustine make the perfect red-carpet arrival, and they look right at home outside the party for photos all night.",
    src: "/images/vehicles/blackyellow.jpg",
  },
  {
    title: "Bar & Bat Mitzvahs",
    price: "Hourly, from $445 (2 hrs)",
    text: "An arrival worth celebrating. We bring the guest of honor and family to the service and the party, and pair a classic with a Sprinter when the whole family is coming along.",
    src: "/images/vehicles/blueiii.jpg",
  },
  {
    title: "Date Nights",
    price: "Hourly, from $345 (2 hrs)",
    text: "Dinner in Old Town, a drive along Camelback at sunset and a nightcap downtown. A classic car turns an ordinary Saturday into a story.",
    src: "/images/vehicles/burg.jpg",
  },
  {
    title: "Holiday Light Tours",
    price: "December only, from $395 (2 hrs)",
    text: "Cocoa, blankets and the Valley's best light displays from the back seat of a classic. Book early; December evenings fill quickly.",
    src: "/images/vehicles/tan.jpg",
  },
];

// Pinned scroll only above this width (matches the CSS)
const PINNED = "(min-width: 769px)";
// Vertical scroll per occasion, as a share of the screen height
const STEP = 0.6;

export default function Occasions() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const count = occasions.length;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const pinned = window.matchMedia(PINNED);
    let scrollLength = 0;
    let frame = 0;

    const update = () => {
      frame = 0;
      if (!scrollLength) return;
      const scrolled = -section.getBoundingClientRect().top;
      const progress = Math.min(0.9999, Math.max(0, scrolled / scrollLength));
      setActive(Math.floor(progress * count));
    };

    const measure = () => {
      if (!pinned.matches) {
        scrollLength = 0;
        section.style.height = "";
        return;
      }
      scrollLength = window.innerHeight * STEP * count;
      section.style.height = `${window.innerHeight + scrollLength}px`;
      update();
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    pinned.addEventListener("change", measure);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      pinned.removeEventListener("change", measure);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [count]);

  // Desktop: clicking jumps the page to that occasion's scroll position.
  // Mobile: clicking just opens it.
  const select = (i: number) => {
    const section = sectionRef.current;
    if (section && window.matchMedia(PINNED).matches) {
      const top = section.getBoundingClientRect().top + window.scrollY;
      const step = window.innerHeight * STEP;
      window.scrollTo({ top: top + step * i + 2, behavior: "smooth" });
    } else {
      setActive(i);
    }
  };

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby='occasions-heading'
    >
      <div className={styles.sticky}>
        <LayoutWrapper>
          <div className={styles.container}>
            <header className={styles.intro}>
              <Eyebrow text='Beyond weddings' />
              <h2 id='occasions-heading' className={styles.heading}>
                Every occasion deserves a grand entrance
              </h2>
            </header>

            <div className={styles.body}>
              <ul className={styles.list}>
                {occasions.map((o, i) => {
                  const open = i === active;
                  return (
                    <li
                      key={o.title}
                      className={`${styles.item} ${open ? styles.open : ""}`}
                    >
                      <h3 className={styles.titleWrap}>
                        <button
                          type='button'

                          className={`${styles.itemBtn} ${styles.title}`}

                          aria-expanded={open}

                          onClick={() => select(i)}
                        >
                          {o.title}
                        </button>
                      </h3>
                      <div className={styles.panel}>
                        <div className={styles.panelInner}>
                          <p className={styles.price}>{o.price}</p>
                          <p className={styles.text}>{o.text}</p>
                          {o.note && <p className={styles.note}>{o.note}</p>}
                          {o.cta && (
                            <Link href={o.cta.href} className={styles.cta}>
                              {o.cta.text}
                            </Link>
                          )}
                          {/* phones/tablets only: the photo under the text */}
                          <div className={styles.inlinePhoto}>
                            <Image
                              src={o.src}
                              alt={o.title}
                              fill
                              sizes='100vw'
                              className={styles.inlineImg}
                            />
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className={styles.photo}>
                {occasions.map((o, i) => (
                  <Image
                    key={o.src}
                    src={o.src}
                    alt={i === active ? o.title : ""}
                    fill
                    sizes='(max-width: 768px) 100vw, 55vw'
                    className={`${styles.img} ${i === active ? styles.imgActive : ""}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </LayoutWrapper>
      </div>
    </section>
  );
}
