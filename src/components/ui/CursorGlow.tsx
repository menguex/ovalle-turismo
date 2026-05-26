"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type CursorGlowProps = {
  className?: string;
  size?: number;
  color?: string;
  opacity?: number;
};

export function CursorGlow({
  className,
  size = 400,
  color = "rgba(255, 203, 5, 0.12)",
  opacity = 1,
}: CursorGlowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 150, damping: 25 });
  const y = useSpring(my, { stiffness: 150, damping: 25 });

  useEffect(() => {
    if (reduced) return;
    const parent = ref.current?.parentElement;
    if (!parent) return;

    const handleMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      mx.set(e.clientX - rect.left - size / 2);
      my.set(e.clientY - rect.top - size / 2);
    };

    parent.addEventListener("mousemove", handleMove);
    return () => parent.removeEventListener("mousemove", handleMove);
  }, [mx, my, size, reduced]);

  if (reduced) return null;

  return (
    <motion.div
      ref={ref}
      className={cn("pointer-events-none absolute z-0 rounded-full blur-3xl", className)}
      style={{
        x,
        y,
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        opacity,
      }}
      aria-hidden
    />
  );
}
