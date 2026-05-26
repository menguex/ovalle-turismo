"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type TextRevealOnScrollProps = {
  text: string;
  className?: string;
  as?: "h2" | "h3" | "p";
};

export function TextRevealOnScroll({ text, className, as: Tag = "p" }: TextRevealOnScrollProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.3"],
  });

  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  const words = text.split(" ");

  return (
    <div ref={ref}>
      <Tag className={cn("flex flex-wrap", className)}>
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;
          return <WordReveal key={i} word={word} range={[start, end]} progress={scrollYProgress} />;
        })}
      </Tag>
    </div>
  );
}

function WordReveal({
  word,
  range,
  progress,
}: {
  word: string;
  range: [number, number];
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const y = useTransform(progress, range, [4, 0]);

  return (
    <motion.span className="mr-[0.25em] inline-block" style={{ opacity, y }}>
      {word}
    </motion.span>
  );
}
