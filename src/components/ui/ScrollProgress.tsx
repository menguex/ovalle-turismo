"use client";

import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion";

export function ScrollProgress() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const spring = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const width = useTransform(spring, [0, 1], ["0%", "100%"]);
  const glowOpacity = useTransform(spring, [0, 0.1, 1], [0, 1, 1]);

  if (reduced) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]" aria-hidden>
      <motion.div
        className="h-full origin-left bg-brand-accent"
        style={{ width }}
      />
      <motion.div
        className="absolute right-0 top-0 h-full w-8 blur-sm"
        style={{
          opacity: glowOpacity,
          background: "linear-gradient(90deg, transparent, var(--brand-blue), var(--brand-yellow))",
        }}
      />
    </div>
  );
}
