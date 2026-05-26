"use client";

import { motion, useReducedMotion } from "framer-motion";

export function SectionDivider() {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className="section-divider"
      aria-hidden
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={
        reduced
          ? { duration: 0 }
          : { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
      }
    />
  );
}
