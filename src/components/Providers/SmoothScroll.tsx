"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { getLenis, setLenis } from "@/lib/smoothScroll";

/**
 * Site-wide smooth (inertia) scrolling via Lenis.
 *
 * - Desktop wheel/trackpad only; touch devices keep native scrolling.
 * - Turns itself off for users with "reduce motion" enabled.
 * - Pauses automatically when a modal sets overflow:hidden on <html>.
 * - Inner scroll areas (modals, dropdowns, date pickers) scroll normally.
 * - In-page "#anchor" links glide, honoring scroll-margin-top.
 */
export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      wheelMultiplier: 1,
      anchors: true,
      autoToggle: true,
      allowNestedScroll: true,
      stopInertiaOnNavigate: true,
    });
    setLenis(lenis);

    return () => {
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  // New page → jump to top without animating.
  useEffect(() => {
    getLenis()?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  return null;
}
