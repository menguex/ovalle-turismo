"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLenis } from "@/lib/lenis-context";

/**
 * Detecta visibilidad para animaciones de entrada.
 * Lenis no siempre dispara IntersectionObserver; revalidamos en scroll y con fallback.
 */
export function useRevealVisible(amount = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const lenis = useLenis();
  const inView = useInView(ref, { once: true, amount });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reduced || inView) {
      setVisible(true);
    }
  }, [reduced, inView]);

  useEffect(() => {
    if (reduced || visible) return;

    const check = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.top < vh * 0.92 && rect.bottom > vh * 0.05) {
        setVisible(true);
      }
    };

    lenis?.on("scroll", check);
    check();

    const fallback = window.setTimeout(() => setVisible(true), 1600);

    return () => {
      lenis?.off("scroll", check);
      window.clearTimeout(fallback);
    };
  }, [lenis, reduced, visible]);

  return { ref, visible: reduced || visible };
}
