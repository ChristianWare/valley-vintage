"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./WeddingFilm.module.css";

// Drop the film into /public/videos/video1.mp4
const VIDEO_SRC = "/videos/video1.mp4";
const POSTER = "/images/vehicles/red.jpg";

export default function WeddingFilm() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);

  // Respect reduced motion: don't autoplay
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.pause();
    }
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      setPlaying(true);
    } else {
      v.pause();
    }
  };

  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted) {
      v.currentTime = 0;
      v.play().catch(() => {});
    }
  };

  return (
    <section className={styles.section} aria-labelledby='film-heading'>
      <div className={styles.container}>
        <div className={styles.frame}>
          <video
            ref={videoRef}
            className={styles.video}
            src={VIDEO_SRC}
            poster={POSTER}
            autoPlay
            muted
            loop
            playsInline
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            preload='metadata'
            aria-label='Wedding-day film: Mariana and Theo in Rosalind'
          />
          <div className={styles.shade} aria-hidden='true' />

          <button
            type='button'
            className={styles.playBtn}
            onClick={togglePlay}
            aria-label={playing ? "Pause film" : "Play film"}
          >
            {playing ? (
              <svg viewBox='0 0 24 24' className={styles.playIcon}>
                <rect x='6' y='5' width='4' height='14' rx='1' />
                <rect x='14' y='5' width='4' height='14' rx='1' />
              </svg>
            ) : (
              <svg viewBox='0 0 24 24' className={styles.playIcon}>
                <path d='M8 5v14l11-7z' />
              </svg>
            )}
          </button>

          <div className={styles.content}>
            <h2 id='film-heading' className={styles.heading}>
              One day, one car, one love story.
            </h2>
            <div className={styles.bottomRow}>
              <p className={styles.copy}>
                Follow Mariana and Theo from the getting-ready suite to the
                sparkler exit, all in Rosalind. It&apos;s the best way to see
                what a Valley Vintage day really feels like.
              </p>
              <button
                type='button'
                className={styles.soundBtn}
                onClick={toggleSound}
                aria-pressed={!muted}
              >
                {muted ? "Watch with sound" : "Mute sound"}
                <svg viewBox='0 0 24 24' className={styles.soundIcon}>
                  {muted ? (
                    <path d='M4 9v6h4l5 4V5L8 9H4zm12.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4z' />
                  ) : (
                    <path d='M4 9v6h4l5 4V5L8 9H4zm11.6 3 2.4 2.4-1.1 1.1-2.4-2.4-2.4 2.4-1.1-1.1 2.4-2.4-2.4-2.4 1.1-1.1 2.4 2.4 2.4-2.4 1.1 1.1z' />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
