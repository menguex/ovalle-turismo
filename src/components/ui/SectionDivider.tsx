"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRevealVisible } from "@/lib/use-reveal-visible";

export function SectionDivider() {
  const reduced = useReducedMotion();
  const { ref, visible } = useRevealVisible(0.5);

  return (
    <motion.div
      ref={ref}
      className="section-divider"
      aria-hidden
      initial={{ scaleX: 0 }}
      animate={{ scaleX: visible || reduced ? 1 : 0 }}
      transition={
        reduced
          ? { duration: 0 }
          : { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
      }
    />
  );
}
