"use client";

// Celebrations hero: a muted Cloudinary video behind a dark overlay, the
// dark-green nav floating on top, a small h1 and a huge display line.
// Set the video in src/lib/videos.ts (key: celebrationsHero).

import { useEffect, useRef, useState } from "react";
import Nav from "@/components/shared/Nav/Nav";
import Button from "@/components/shared/Button/Button";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import { VIDEOS, videoSources } from "@/lib/videos";
import styles from "./CelebrationsHero.module.css";

const media = VIDEOS.celebrationsHero;
const sources = videoSources(media);

export default function CelebrationsHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wantsPlay = useRef(true);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || sources.length === 0) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) wantsPlay.current = false;
    let onScreen = false;

    const sync = () => {
      if (onScreen && wantsPlay.current) {
        el.muted = true;
        el.play().catch(() => {});
      } else {
        el.pause();
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      sync();
    });
    observer.observe(el);

    return () => {
      observer.disconnect();
      el.pause();
    };
  }, []);

  const toggle = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      wantsPlay.current = true;
      el.play().catch(() => {});
    } else {
      wantsPlay.current = false;
      el.pause();
    }
  };

  return (
    <section className={styles.hero} aria-labelledby='celebrations-heading'>
      <video
        ref={videoRef}
        className={styles.video}
        poster={media.poster}
        muted
        loop
        playsInline
        preload='metadata'
        disablePictureInPicture
        aria-hidden='true'
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        {sources.map((s) => (
          <source key={s.src} src={s.src} type={s.type} />
        ))}
      </video>
      <div className={styles.overlay} aria-hidden='true' />

      <Nav overlay dark />

      <div className={styles.content}>
        <LayoutWrapper>
          <div className={styles.inner}>
            <div className={styles.topRow}>
              <h1 id='celebrations-heading' className={`h6 ${styles.heading}`}>
                Not getting married? Rosalind doesn&apos;t mind. Our cars were
                built for occasions.
              </h1>
              <Button
                href='/book'
                text='Check your date'
                btnType='gold'
                arrow
              />
            </div>
            <div className={styles.display} aria-hidden='true'>
              Celebrations
            </div>
            <p className={styles.sub}>
              Anniversaries, proms, quinceañeras and photo shoots all deserve a
              little old-world glamour.
            </p>
          </div>
        </LayoutWrapper>
      </div>

      {sources.length > 0 && (
        <button
          type='button'
          className={styles.toggle}
          onClick={toggle}
          aria-label={
            playing ? "Pause background video" : "Play background video"
          }
        >
          {playing ? (
            <svg viewBox='0 0 24 24' fill='currentColor' aria-hidden='true'>
              <rect x='6' y='5' width='4' height='14' rx='1' />
              <rect x='14' y='5' width='4' height='14' rx='1' />
            </svg>
          ) : (
            <svg viewBox='0 0 24 24' fill='currentColor' aria-hidden='true'>
              <path d='M8 5v14l11-7z' />
            </svg>
          )}
        </button>
      )}
    </section>
  );
}
