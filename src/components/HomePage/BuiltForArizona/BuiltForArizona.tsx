"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Eyebrow from "@/components/shared/Eyebrow/Eyebrow";
import Left from "@/components/shared/icons/Left/Left";
import Right from "@/components/shared/icons/Right/Right";
import styles from "./BuiltForArizona.module.css";

const features = [
  {
    title: "Climate-controlled closed cars",
    text: "Rosalind, Augustine and Delphine are fitted with discreet modern climate control, so you arrive cool in July.",
    src: "/images/vehicles/blackyellow.jpg",
  },
  {
    title: "Monsoon backup plan",
    text: "Convertibles carry weather tops. If a storm makes driving unsafe, we wait it out or swap to a closed car at no charge.",
    src: "/images/vehicles/blue.jpg",
  },
  {
    title: "Chilled water and a cool towel",
    text: "Every ride is stocked before pickup, so you step out calm, fresh and ready for photos.",
    src: "/images/vehicles/whiteiii.jpg",
  },
];

const INTERVAL = 6000;

export default function BuiltForArizona() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % features.length),
      INTERVAL,
    );
    return () => window.clearInterval(id);
  }, [paused]);

  const go = (dir: number) =>
    setIndex((i) => (i + dir + features.length) % features.length);

  return (
    <section className={styles.section} aria-labelledby='arizona-heading'>
      <Image
        src='/images/vehicles/blueii.jpg'
        alt=''
        fill
        sizes='100vw'
        className={styles.bg}
      />
      <div className={styles.overlay} aria-hidden='true' />

      <div className={styles.container}>
        <div className={styles.intro}>
          <Eyebrow text='Built for Arizona' tone='light' />
          <h2 id='arizona-heading' className={styles.heading}>
            Vintage looks. <br /> Desert-ready.
          </h2>
          <p className={styles.copy}>
            A 1920s car and a Phoenix afternoon aren&apos;t natural partners, so
            we planned for it. Our closed cars are fitted with modern climate
            control, our convertibles run October through April, and we time
            summer bookings around golden hour. You get the romance without the
            heat.
          </p>
        </div>

        <div
          className={styles.sliderWrap}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className={styles.slider} aria-live='polite'>
            {features.map((f, i) => (
              <div
                key={f.title}
                className={`${styles.card} ${i === index ? styles.active : ""}`}
                aria-hidden={i !== index}
              >
                <div className={styles.thumb}>
                  <Image
                    src={f.src}
                    alt=''
                    fill
                    sizes='120px'
                    className={styles.img}
                  />
                </div>
                <div className={styles.cardBody}>
                  <h3 className={`${styles.cardTitle} h6`}>{f.title}</h3>
                  <p className={styles.cardText}>{f.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.controls}>
            <button
              type='button'
              className={styles.arrowBtn}
              onClick={() => go(-1)}
              aria-label='Previous'
            >
              <Left className={styles.arrowIcon} />
            </button>
            <p className={styles.count}>
              {index + 1}/{features.length}
            </p>
            <button
              type='button'
              className={styles.arrowBtn}
              onClick={() => go(1)}
              aria-label='Next'
            >
              <Right className={styles.arrowIcon} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
