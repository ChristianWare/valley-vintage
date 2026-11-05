// src/lib/smoothScroll.ts
//
// Shared handle to the site's Lenis instance, so programmatic scrolls
// (scroll-to-top, wizard steps, etc.) go through Lenis instead of fighting it.
import type Lenis from "lenis";

let instance: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  instance = lenis;
}

export function getLenis() {
  return instance;
}

/** Scroll the page to a Y position. Falls back to native scrolling. */
export function scrollToY(top: number, opts: { immediate?: boolean } = {}) {
  if (instance) {
    instance.scrollTo(top, { immediate: opts.immediate, force: true });
    return;
  }
  window.scrollTo({ top, behavior: opts.immediate ? "instant" : "smooth" });
}
