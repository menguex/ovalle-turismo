"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

type FloatingParticlesProps = {
  count?: number;
  colors?: string[];
  className?: string;
  maxSize?: number;
  speed?: number;
};

export function FloatingParticles({
  count = 60,
  colors = ["#FFCB05", "#F7941D", "#3D8FD9", "#ffffff"],
  className,
  maxSize = 3,
  speed = 1,
}: FloatingParticlesProps) {
  const reduced = useReducedMotion();

  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 0.5 + Math.random() * maxSize,
        color: colors[i % colors.length],
        duration: (4 + Math.random() * 8) / speed,
        delay: Math.random() * 4,
        drift: -20 + Math.random() * 40,
      })),
    [count, colors, maxSize, speed]
  );

  if (reduced) return null;

  return (
    <div className={className} aria-hidden>
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: p.size > 2 ? `0 0 ${p.size * 3}px ${p.color}` : undefined,
          }}
          animate={{
            y: [0, p.drift, 0],
            x: [0, p.drift * 0.5, 0],
            opacity: [0, 0.9, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
