"use client";

import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { useMemo, useRef } from "react";
import { cn } from "@/lib/utils";

type ScrollVelocityTextProps = {
  text: string;
  className?: string;
  baseVelocity?: number;
  repeat?: number;
};

function RibbonContent({ text }: { text: string }) {
  const segments = useMemo(() => text.split(" · ").map((s) => s.trim()), [text]);

  return (
    <>
      {segments.map((segment, index) => (
        <span key={`${segment}-${index}`}>
          {index > 0 && <span className="scroll-ribbon-sep"> · </span>}
          {segment}
        </span>
      ))}
    </>
  );
}

export function ScrollVelocityText({
  text,
  className,
  baseVelocity = -2,
  repeat = 5,
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

  const blocks = Array.from({ length: repeat }, (_, index) => (
    <span key={index} className="inline-flex shrink-0 items-center pr-[0.35em]">
      <RibbonContent text={text} />
    </span>
  ));

  return (
    <div ref={ref} className={cn("scroll-ribbon", className)} aria-hidden>
      <motion.div
        className="scroll-ribbon-text flex w-max whitespace-nowrap"
        style={{ x }}
      >
        {blocks}
      </motion.div>
    </div>
  );
}
