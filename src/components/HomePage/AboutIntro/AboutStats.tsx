"use client";

import { useEffect, useState } from "react";
import styles from "./AboutStats.module.css";

const stats = [
  { value: "400+", label: "Valley weddings since 2017" },
  { value: "5", label: "Hand-restored classics" },
  { value: "5.0", label: "Average from 180+ reviews" },
];

const INTERVAL = 4000;

export default function AboutStats() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % stats.length),
      INTERVAL,
    );
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <>
      {/* Desktop + tablet: one stat at a time */}
      <div
        className={styles.slider}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div className={styles.top}>
          <p className={styles.tag}>By the numbers</p>
          <p className={styles.count}>
            {index + 1}/{stats.length}
          </p>
        </div>

        <div className={styles.track} role='tablist' aria-label='Statistics'>
          {stats.map((s, i) => (
            <button
              key={s.label}
              type='button'
              role='tab'
              aria-selected={i === index}
              aria-label={`${s.value} ${s.label}`}
              className={`${styles.segment} ${i === index ? styles.segmentActive : ""}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>

        <div className={styles.viewport} aria-live='polite'>
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`${styles.slide} ${i === index ? styles.slideActive : ""}`}
              aria-hidden={i !== index}
            >
              <p className={styles.value}>{s.value}</p>
              <p className={styles.label}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 768px and below: all three in a grid */}
      <ul className={styles.grid}>
        {stats.map((s) => (
          <li key={s.label} className={styles.item}>
            <p className={styles.value}>{s.value}</p>
            <p className={styles.label}>{s.label}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
