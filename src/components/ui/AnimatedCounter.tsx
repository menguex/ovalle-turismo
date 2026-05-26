"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, useSpring, useTransform } from "framer-motion";

type AnimatedCounterProps = {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
};

export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 2,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();
  const spring = useSpring(0, { duration: duration * 1000, bounce: 0 });
  const display = useTransform(spring, (v) => `${prefix}${Math.round(v)}${suffix}`);
  const [text, setText] = useState(`${prefix}0${suffix}`);

  useEffect(() => {
    if (reduced) {
      setText(`${prefix}${value}${suffix}`);
      return;
    }
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, value, spring, reduced, prefix, suffix]);

  useEffect(() => {
    if (reduced) return;
    const unsub = display.on("change", (v) => setText(v));
    return unsub;
  }, [display, reduced]);

  return (
    <motion.span ref={ref} className={className}>
      {text}
    </motion.span>
  );
}
