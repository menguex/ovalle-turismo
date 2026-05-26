"use client";

import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type ScrollVelocityTextProps = {
  text: string;
  className?: string;
  baseVelocity?: number;
  repeat?: number;
};

export function ScrollVelocityText({
  text,
  className,
  baseVelocity = -2,
  repeat = 6,
}: ScrollVelocityTextProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, baseVelocity * 200]),
    { stiffness: 100, damping: 30 }
  );

  if (reduced) return null;

  const repeated = Array.from({ length: repeat }, () => text).join(" — ");

  return (
    <div ref={ref} className={cn("overflow-hidden py-6", className)} aria-hidden>
      <motion.p
        className="whitespace-nowrap font-display text-[clamp(3rem,8vw,8rem)] font-bold leading-none tracking-tighter text-border/60"
        style={{ x }}
      >
        {repeated}
      </motion.p>
    </div>
  );
}
