"use client";

// The moving background on a testimonial photo card. Pulls the clip from
// Cloudinary (set the URL in src/lib/videos.ts), loads it only when the card
// is nearly on screen, plays muted while visible and pauses when it isn't.
// With no URL set, the card shows the still photo instead.

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { VIDEOS, videoSources, type VideoKey } from "@/lib/videos";
import styles from "./Testimonials.module.css";

export default function ReviewVideo({
  video: key,
  alt,
}: {
  video: VideoKey;
  alt: string;
}) {
  const v = VIDEOS[key];
  const sources = videoSources(v);
  const videoRef = useRef<HTMLVideoElement>(null);
  const wantsPlay = useRef(true);
  const [playing, setPlaying] = useState(false);
  const hasVideo = sources.length > 0;

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

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

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { rootMargin: "200px" },
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
  }, [hasVideo]);

  const toggle = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      wantsPlay.current = true;
      el.muted = true;
      el.play().catch(() => {});
    } else {
      wantsPlay.current = false;
      el.pause();
    }
  };

  if (!hasVideo) {
    return (
      <Image
        src={v.poster}
        alt={alt}
        fill
        sizes='(max-width: 968px) 80vw, 45vw'
        className={styles.bgImg}
      />
    );
  }

  return (
    <>
      <video
        ref={videoRef}
        className={styles.bgVideo}
        poster={v.poster}
        muted
        loop
        playsInline
        preload='none'
        disablePictureInPicture
        aria-label={alt}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        {sources.map((s) => (
          <source key={s.src} src={s.src} type={s.type} />
        ))}
      </video>
      <button
        type='button'
        className={styles.videoToggle}
        onClick={toggle}
        aria-label={playing ? "Pause video" : "Play video"}
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
    </>
  );
}
