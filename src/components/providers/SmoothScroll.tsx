"use client";

import { useEffect, useState, type ReactNode } from "react";
import Lenis from "lenis";
import { LenisProvider } from "@/lib/lenis-context";

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const instance = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      /** Detecta contenedores con overflow y deja scrollear dentro (modales, mapas, etc.) */
      allowNestedScroll: true,
    });

    setLenis(instance);

    let frame: number;
    const raf = (time: number) => {
      instance.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisProvider value={lenis}>{children}</LenisProvider>;
}
