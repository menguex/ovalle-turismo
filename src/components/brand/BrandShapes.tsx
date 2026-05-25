"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { LogoMotif } from "@/components/brand/LogoMotif";

export type BrandShapeVariant = "hero" | "page" | "card" | "map" | "subtle";

type BrandShapesProps = {
  variant?: BrandShapeVariant;
  className?: string;
  parallax?: boolean;
};

export function BrandShapes({
  variant = "subtle",
  className,
  parallax = false,
}: BrandShapesProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -60]);

  const showMesh = variant === "hero" || variant === "page" || variant === "map";
  const showOrbs = variant !== "card";
  const showPills = variant === "hero" || variant === "page";
  const showDots = variant === "hero" || variant === "page" || variant === "map";

  return (
    <div
      ref={ref}
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden
    >
      {showMesh && <div className="mesh-bg absolute inset-0 opacity-60 dark:opacity-40" />}

      {showOrbs && (
        <>
          <motion.div
            style={parallax && !reduced ? { y: y1 } : undefined}
            className={cn(
              "absolute rounded-full blur-3xl",
              variant === "hero"
                ? "-left-24 top-1/4 h-72 w-72 bg-brand-yellow/20"
                : variant === "page"
                  ? "-left-16 top-1/3 h-48 w-48 bg-brand-yellow/15"
                  : variant === "map"
                    ? "left-1/4 top-0 h-40 w-40 bg-brand-blue/15"
                    : "right-1/4 top-1/3 h-32 w-32 bg-brand-orange/10"
            )}
            animate={
              reduced
                ? undefined
                : { scale: [1, 1.08, 1], opacity: [0.5, 0.75, 0.5] }
            }
            transition={
              reduced
                ? undefined
                : { duration: 8, repeat: Infinity, ease: "easeInOut" }
            }
          />
          <motion.div
            style={parallax && !reduced ? { y: y2 } : undefined}
            className={cn(
              "absolute rounded-full blur-3xl",
              variant === "hero"
                ? "-right-20 bottom-1/4 h-80 w-80 bg-brand-blue/18"
                : variant === "page"
                  ? "-right-12 bottom-1/3 h-56 w-56 bg-brand-blue/12"
                  : variant === "map"
                    ? "bottom-0 right-1/4 h-48 w-48 bg-brand-orange/12"
                    : "bottom-1/4 left-1/3 h-28 w-28 bg-brand-blue/10"
            )}
            animate={
              reduced
                ? undefined
                : { scale: [1.05, 1, 1.05], opacity: [0.4, 0.65, 0.4] }
            }
            transition={
              reduced
                ? undefined
                : { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }
            }
          />
        </>
      )}

      {showPills && (
        <>
          <motion.div
            className={cn(
              "absolute rounded-full border border-brand-blue/25",
              variant === "hero"
                ? "left-[8%] top-[18%] h-28 w-64"
                : "left-[6%] top-[22%] h-16 w-40"
            )}
            animate={reduced ? undefined : { rotate: [0, 2, 0], y: [0, -8, 0] }}
            transition={
              reduced
                ? undefined
                : { duration: 12, repeat: Infinity, ease: "easeInOut" }
            }
          />
          <motion.div
            className={cn(
              "absolute rounded-full border border-brand-orange/20",
              variant === "hero"
                ? "bottom-[22%] right-[10%] h-20 w-48"
                : "bottom-[28%] right-[8%] h-12 w-32"
            )}
            animate={reduced ? undefined : { rotate: [0, -3, 0], y: [0, 6, 0] }}
            transition={
              reduced
                ? undefined
                : { duration: 14, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
            }
          />
          <div
            className={cn(
              "absolute rounded-full border border-dashed border-brand-yellow/15",
              variant === "hero"
                ? "right-[18%] top-[12%] h-36 w-36"
                : "right-[14%] top-[16%] h-24 w-24"
            )}
          />
        </>
      )}

      {showDots && (
        <div
          className={cn(
            "absolute",
            variant === "hero"
              ? "right-[12%] top-[8%]"
              : variant === "map"
                ? "left-1/2 top-4 -translate-x-1/2"
                : "right-[10%] top-[10%]"
          )}
        >
          <LogoMotif size={variant === "hero" ? "md" : "sm"} showArc={false} orbit />
        </div>
      )}

      {variant === "map" && (
        <>
          <span className="absolute left-3 top-3 h-6 w-6 border-l-2 border-t-2 border-brand-blue/40" />
          <span className="absolute right-3 top-3 h-6 w-6 border-r-2 border-t-2 border-brand-blue/40" />
          <span className="absolute bottom-3 left-3 h-6 w-6 border-b-2 border-l-2 border-brand-orange/35" />
          <span className="absolute bottom-3 right-3 h-6 w-6 border-b-2 border-r-2 border-brand-orange/35" />
        </>
      )}

      {variant === "card" && (
        <>
          <span className="absolute left-0 top-0 h-12 w-12 rounded-br-3xl bg-gradient-to-br from-brand-yellow/20 to-transparent" />
          <span className="absolute bottom-0 right-0 h-12 w-12 rounded-tl-3xl bg-gradient-to-tl from-brand-blue/15 to-transparent" />
        </>
      )}
    </div>
  );
}
