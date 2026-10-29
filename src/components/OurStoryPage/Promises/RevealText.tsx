"use client";

// A paragraph whose words darken one by one as it scrolls up the screen:
// light grey when it enters at the bottom, fully dark by the time it reaches
// the middle. People who turn off motion see it dark straight away.

import { useEffect, useRef, useState } from "react";
import styles from "./Promises.module.css";

export default function RevealText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");
  // how many words are dark right now
  const [lit, setLit] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;
      if (reduced.matches) {
        setLit(words.length);
        return;
      }
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // starts when the top is 85% down the screen, done when the
      // bottom reaches 55% down the screen
      const start = vh * 0.85;
      const end = vh * 0.55;
      const travelled = start - rect.top;
      const distance = start - end + rect.height;
      const progress = Math.min(1, Math.max(0, travelled / distance));
      setLit(Math.round(progress * words.length));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    reduced.addEventListener("change", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      reduced.removeEventListener("change", update);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [words.length]);

  return (
    <p ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          aria-hidden='true'
          className={`${styles.word} ${i < lit ? styles.wordLit : ""}`}
        >
          {w}{" "}
        </span>
      ))}
    </p>
  );
}
