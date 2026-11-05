"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Close from "@/components/shared/icons/Close/Close";
import Arrow from "@/components/shared/icons/Arrow/Arrow";
import styles from "./PhotoGroup.module.css";

export default function PhotoGroupClient({
  images,
  pattern,
}: {
  images: string[];
  pattern: string[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const stripRef = useRef<HTMLDivElement | null>(null);

  const openAt = (i: number) => {
    setIndex(i);
    setIsOpen(true);
  };

  const close = useCallback(() => setIsOpen(false), []);
  const prev = useCallback(
    () => setIndex((p) => (p === 0 ? images.length - 1 : p - 1)),
    [images.length],
  );
  const next = useCallback(
    () => setIndex((p) => (p + 1) % images.length),
    [images.length],
  );

  // Keyboard controls + lock page scroll while the lightbox is open
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    // Lock on <html> too so smooth scrolling (Lenis) pauses with the lightbox
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen, close, prev, next]);

  // Keep the active thumbnail in view
  useEffect(() => {
    if (!isOpen || !stripRef.current) return;
    const child = stripRef.current.children[index] as HTMLElement | undefined;
    child?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [index, isOpen]);

  return (
    <>
      <div className={styles.gallery}>
        {images.map((src, i) => {
          const extra = pattern[i % pattern.length];
          const cls =
            extra && styles[extra]
              ? `${styles.imgContainer} ${styles[extra]}`
              : styles.imgContainer;
          return (
            <button
              key={`${src}-${i}`}
              type='button'
              className={cls}
              onClick={() => openAt(i)}
              aria-label={`Open photo ${i + 1} of ${images.length}`}
            >
              <Image
                src={src}
                alt=''
                fill
                sizes='(max-width: 568px) 100vw, (max-width: 968px) 50vw, 33vw'
                className={styles.img}
              />
            </button>
          );
        })}
      </div>

      {isOpen && (
        <div
          className={styles.modalOverlay}
          role='dialog'
          aria-modal='true'
          aria-label='Photo viewer'
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <button
            type='button'
            className={styles.closeBtn}
            onClick={close}
            aria-label='Close'
          >
            <Close className={styles.closeIcon} />
          </button>

          <div className={styles.modalContent}>
            <button
              type='button'
              className={`${styles.navBtn} ${styles.prevBtn}`}
              onClick={prev}
              aria-label='Previous photo'
            >
              <Arrow className={styles.navIcon} />
            </button>

            <div className={styles.modalMain}>
              <div className={styles.modalImageWrap}>
                <Image
                  src={images[index]}
                  alt={`Photo ${index + 1} of ${images.length}`}
                  fill
                  sizes='90vw'
                  className={styles.modalImg}
                />
              </div>

              <div className={styles.thumbStrip} ref={stripRef}>
                {images.map((src, i) => (
                  <button
                    key={`thumb-${src}-${i}`}
                    type='button'
                    className={`${styles.thumb} ${i === index ? styles.thumbActive : ""}`}
                    onClick={() => setIndex(i)}
                    aria-label={`Go to photo ${i + 1}`}
                    aria-current={i === index ? "true" : undefined}
                  >
                    <div className={styles.thumbImgWrap}>
                      <Image
                        src={src}
                        alt=''
                        fill
                        sizes='90px'
                        className={styles.thumbImg}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button
              type='button'
              className={`${styles.navBtn} ${styles.nextBtn}`}
              onClick={next}
              aria-label='Next photo'
            >
              <Arrow className={styles.navIcon} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
