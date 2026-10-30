"use client";

// "Reserving your date": the same look as the home page wedding film, but
// edge to edge. Plays a muted Cloudinary clip if one is set in
// src/lib/videos.ts (key: reserving); otherwise shows the still photo.

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Eyebrow from "@/components/shared/Eyebrow/Eyebrow";
import Button from "@/components/shared/Button/Button";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import { VIDEOS, videoSources } from "@/lib/videos";
import styles from "./ReservingDate.module.css";

const media = VIDEOS.reserving;
const sources = videoSources(media);

export default function ReservingDate() {
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
      { rootMargin: "200px 0px" },
    );
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
    <section className={styles.section} aria-labelledby='reserving-heading'>
      <div className={styles.frame}>
        {hasVideo ? (
          <video
            ref={videoRef}
            className={styles.media}
            poster={media.poster}
            muted
            loop
            playsInline
            preload='none'
            disablePictureInPicture
            aria-hidden='true'
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          >
            {sources.map((s) => (
              <source key={s.src} src={s.src} type={s.type} />
            ))}
          </video>
        ) : (
          <Image
            src={media.poster}
            alt=''
            fill
            sizes='100vw'
            className={styles.media}
          />
        )}
        <div className={styles.shade} aria-hidden='true' />

        {hasVideo && (
          <button
            type='button'
            className={styles.playBtn}
            onClick={toggle}
            aria-label={playing ? "Pause video" : "Play video"}
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
          <LayoutWrapper>
            <Eyebrow text='Reserving your date' tone='light' />
            <h2 id='reserving-heading' className={styles.heading}>
              The price you see is the price you pay.
            </h2>
            <div className={styles.bottomRow}>
              <div className={styles.copyWrap}>
                <p className={styles.copy}>
                  A $250 deposit holds your car and chauffeur and is applied to
                  your total. The balance is charged automatically 14 days
                  before the wedding. Gratuity is never included, but you can
                  add it at checkout or after the ride.
                </p>
                <p className={styles.copy}>
                  Your full total, including any travel fee, appears before
                  checkout. We never add service charges after booking.
                </p>
              </div>
              <Button
                href='/book'
                text='Check your date'
                btnType='gold'
                arrow
              />
            </div>
          </LayoutWrapper>
        </div>
      </div>
    </section>
  );
}
