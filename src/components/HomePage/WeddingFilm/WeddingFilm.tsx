"use client";

// The wedding-day film. The video comes from Cloudinary (set the URL in
// src/lib/videos.ts). It only starts loading when the section is nearly on
// screen, plays muted while it's visible and pauses when it isn't.
// "Watch with sound" restarts it from the top with sound on.
// People who turn off motion see the poster until they press play.

import { useEffect, useRef, useState } from "react";
import { VIDEOS, videoSources } from "@/lib/videos";
import styles from "./WeddingFilm.module.css";
import LayoutWrapper from "@/components/shared/LayoutWrapper";

const film = VIDEOS.weddingFilm;
const sources = videoSources(film);

export default function WeddingFilm() {
  const videoRef = useRef<HTMLVideoElement>(null);
  // Whether it should play when it's on screen. The buttons flip this.
  const wantsPlay = useRef(true);
  // Both come from the video's own events.
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || sources.length === 0) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) wantsPlay.current = false;
    let onScreen = false;

    const sync = () => {
      if (onScreen && wantsPlay.current) {
        el.play().catch(() => {});
      } else {
        el.pause();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(el);

    const onMotion = (e: MediaQueryListEvent) => {
      wantsPlay.current = !e.matches;
      sync();
    };
    reduced.addEventListener("change", onMotion);

    return () => {
      observer.disconnect();
      reduced.removeEventListener("change", onMotion);
      el.pause();
    };
  }, []);

  const togglePlay = () => {
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

  const toggleSound = () => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = !el.muted;
    if (!el.muted) {
      wantsPlay.current = true;
      el.currentTime = 0;
      el.play().catch(() => {});
    }
  };

  const hasVideo = sources.length > 0;

  return (
    <section className={styles.section} aria-labelledby='film-heading'>
      <LayoutWrapper>
        <div className={styles.container}>
          <div className={styles.frame}>
            <video
              ref={videoRef}
              className={styles.video}
              poster={film.poster}
              muted
              loop
              playsInline
              preload='none'
              disablePictureInPicture
              aria-label='Wedding-day film: Mariana and Theo in Rosalind'
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
            >
              {sources.map((s) => (
                <source key={s.src} src={s.src} type={s.type} />
              ))}
            </video>
            <div className={styles.shade} aria-hidden='true' />

            {hasVideo && (
              <button
                type='button'
                className={styles.playBtn}
                onClick={togglePlay}
                aria-label={playing ? "Pause film" : "Play film"}
              >
                {playing ? (
                  <svg
                    viewBox='0 0 24 24'
                    className={styles.playIcon}
                    aria-hidden='true'
                  >
                    <rect x='6' y='5' width='4' height='14' rx='1' />
                    <rect x='14' y='5' width='4' height='14' rx='1' />
                  </svg>
                ) : (
                  <svg
                    viewBox='0 0 24 24'
                    className={styles.playIcon}
                    aria-hidden='true'
                  >
                    <path d='M8 5v14l11-7z' />
                  </svg>
                )}
              </button>
            )}

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
              </div>
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
