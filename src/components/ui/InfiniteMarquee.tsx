"use client";

import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type InfiniteMarqueeProps = {
  children: ReactNode;
  className?: string;
  speed?: number;
  pauseOnHover?: boolean;
  direction?: "left" | "right";
};

export function InfiniteMarquee({
  children,
  className,
  speed = 30,
  pauseOnHover = true,
  direction = "left",
}: InfiniteMarqueeProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={cn("flex items-center justify-center gap-10", className)}>{children}</div>;
  }

  return (
    <div
      className={cn("group relative flex overflow-hidden", className)}
      style={{
        maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      {[0, 1].map((i) => (
        <motion.div
          key={i}
          className={cn(
            "flex shrink-0 items-center gap-10 lg:gap-16",
            pauseOnHover && "group-hover:[animation-play-state:paused]"
          )}
          animate={{ x: direction === "left" ? ["0%", "-100%"] : ["-100%", "0%"] }}
          transition={{
            x: { repeat: Infinity, repeatType: "loop", duration: speed, ease: "linear" },
          }}
        >
          {children}
        </motion.div>
      ))}
    </div>
  );
}
