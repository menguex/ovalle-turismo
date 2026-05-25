"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type LogoMotifProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
  showArc?: boolean;
  orbit?: boolean;
};

const dotSizes = {
  sm: "h-1.5 w-1.5",
  md: "h-2 w-2",
  lg: "h-2.5 w-2.5",
};

const arcSizes = {
  sm: { width: 48, height: 24, stroke: 1.5 },
  md: { width: 72, height: 36, stroke: 2 },
  lg: { width: 96, height: 48, stroke: 2.5 },
};

export function LogoMotif({
  className,
  size = "md",
  showArc = true,
  orbit = false,
}: LogoMotifProps) {
  const reduced = useReducedMotion();
  const arc = arcSizes[size];

  const dots = (
    <div
      className={cn(
        "flex items-center justify-center gap-1.5",
        orbit && !reduced && "dot-orbit",
        className
      )}
      aria-hidden
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className={cn("rounded-full bg-brand-blue", dotSizes[size])}
          animate={
            reduced
              ? undefined
              : {
                  opacity: [0.45, 1, 0.45],
                  scale: [0.85, 1.08, 0.85],
                }
          }
          transition={
            reduced
              ? undefined
              : {
                  duration: 1.4,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }
          }
        />
      ))}
    </div>
  );

  if (!showArc) return dots;

  return (
    <div className={cn("relative flex flex-col items-center", className)} aria-hidden>
      {dots}
      <svg
        width={arc.width}
        height={arc.height}
        viewBox={`0 0 ${arc.width} ${arc.height}`}
        className={cn("mt-1", !reduced && "animate-float")}
        aria-hidden
      >
        <defs>
          <linearGradient id="logoMotifArc" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFCB05" />
            <stop offset="100%" stopColor="#F7941D" />
          </linearGradient>
        </defs>
        <path
          d={`M ${arc.width * 0.08} ${arc.height * 0.85} Q ${arc.width * 0.5} ${arc.height * 0.05} ${arc.width * 0.92} ${arc.height * 0.85}`}
          fill="none"
          stroke="url(#logoMotifArc)"
          strokeWidth={arc.stroke}
          strokeLinecap="round"
          opacity={0.75}
        />
      </svg>
    </div>
  );
}
