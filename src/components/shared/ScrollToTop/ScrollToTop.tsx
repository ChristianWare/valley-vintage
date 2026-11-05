"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { scrollToY } from "@/lib/smoothScroll";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    scrollToY(0, { immediate: true });
  }, [pathname]);

  return null;
}
