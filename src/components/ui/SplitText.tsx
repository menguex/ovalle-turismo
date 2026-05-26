"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type SplitTextProps = {
  text: string;
  className?: string;
  charClassName?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
};

export function SplitText({
  text,
  className,
  charClassName,
  delay = 0,
  stagger = 0.03,
  as: Tag = "h1",
}: SplitTextProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  const words = text.split(" ");

  return (
    <Tag className={cn("flex flex-wrap", className)} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} className="mr-[0.25em] inline-flex overflow-hidden">
          {word.split("").map((char, ci) => {
            const idx = words.slice(0, wi).join(" ").length + ci + wi;
            return (
              <motion.span
                key={`${wi}-${ci}`}
                className={cn("inline-block", charClassName)}
                initial={{ y: "110%", opacity: 0, rotateX: -80 }}
                animate={{ y: "0%", opacity: 1, rotateX: 0 }}
                transition={{
                  duration: 0.6,
                  delay: delay + idx * stagger,
                  ease: [0.22, 1, 0.36, 1],
                }}
                aria-hidden
              >
                {char}
              </motion.span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}
