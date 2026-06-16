"use client";

import SiteImage from "@/components/ui/SiteImage";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { Ficha } from "@/lib/types/ficha";
import { fichaLabel } from "@/lib/types/ficha";
import { cn } from "@/lib/utils";

type ExperienceFichaCardProps = {
  item: Ficha;
  onOpen: () => void;
  featured?: boolean;
  className?: string;
};

export function ExperienceFichaCard({
  item,
  onOpen,
  featured = false,
  className,
}: ExperienceFichaCardProps) {
  const reduced = useReducedMotion();
  const label = fichaLabel(item);

  return (
    <motion.button
      type="button"
      whileHover={reduced ? undefined : { y: -4 }}
      whileTap={reduced ? undefined : { scale: 0.99 }}
      onClick={onOpen}
      aria-label={`Ver ficha de ${label}`}
      className={cn(
        "group tech-card-frame pillar-card-shine relative w-full overflow-hidden text-left card-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-copper/40",
        className
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden",
          featured ? "aspect-[21/9] sm:aspect-[2/1]" : "aspect-[4/3] sm:aspect-[16/10]"
        )}
      >
        <SiteImage
          src={item.image}
          alt={label}
          fill
          sizes={
            featured
              ? "(max-width: 768px) 100vw, 66vw"
              : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          }
          className="object-cover transition duration-700 ease-premium group-hover:scale-105"
        />
        {/* Scrim completo: legible sobre fotos claras (Pisco Waqar, arcos blancos) */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/95 via-night/55 to-night/35" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(11,13,23,0.55)_0%,transparent_55%)]" />

        {item.type && (
          <span className="absolute left-4 top-4 z-10 max-w-[calc(100%-2rem)] rounded-full border border-white/10 bg-night/65 px-2.5 py-1 font-accent text-[10px] uppercase tracking-[0.12em] text-gold backdrop-blur-sm">
            {item.type}
          </span>
        )}

        <div className="image-card-caption absolute inset-x-0 bottom-0 z-10">
          <h3
            className={cn(
              "image-card-title text-pretty [overflow-wrap:normal] [word-break:normal]",
              featured ? "image-card-title--lg line-clamp-2" : "image-card-title--sm line-clamp-2"
            )}
          >
            {label}
          </h3>
          {item.description && (
            <p className="mt-2 line-clamp-2 font-sans text-sm leading-relaxed tracking-normal text-sand/90 text-pretty [overflow-wrap:normal] [word-break:normal]">
              {item.description}
            </p>
          )}
          <span className="mt-3 inline-flex items-center gap-1.5 font-accent text-[10px] uppercase tracking-[0.14em] text-gold transition duration-300 group-hover:gap-2">
            Ver ficha
            <ArrowUpRight size={12} aria-hidden />
          </span>
        </div>
      </div>
    </motion.button>
  );
}
