"use client";

import SiteImage from "@/components/ui/SiteImage";
import {
  ArrowUpRight,
  Calendar,
  Clock,
  MapPin,
  Navigation,
  Rotate3D,
  Timer,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { Ficha } from "@/lib/types/ficha";
import { fichaLabel } from "@/lib/types/ficha";
import { useFichaOptional } from "@/components/providers/FichaProvider";
import { cn } from "@/lib/utils";

type RichFichaCardProps = {
  item: Ficha;
  className?: string;
  featured?: boolean;
};

export function RichFichaCard({ item, className, featured }: RichFichaCardProps) {
  const fichaCtx = useFichaOptional();
  const reduced = useReducedMotion();
  const label = fichaLabel(item);

  return (
    <motion.article
      layout={!reduced}
      whileHover={reduced ? undefined : { y: -4 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "tech-card-frame group flex h-full flex-col overflow-hidden text-left",
        className
      )}
    >
      <button
        type="button"
        onClick={() => fichaCtx?.openFicha(item.id)}
        className="flex h-full flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-copper/40"
      >
        <div
          className={cn(
            "relative isolate w-full shrink-0 overflow-hidden bg-border/40",
            featured ? "aspect-[16/10] lg:aspect-auto lg:min-h-[280px] lg:flex-1" : "aspect-[4/3]"
          )}
        >
          <SiteImage
            src={item.image}
            alt={label}
            fill
            sizes={
              featured
                ? "(max-width: 1024px) 100vw, 50vw"
                : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            }
            className="pointer-events-none object-cover transition duration-700 ease-premium group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/75 via-night/20 to-transparent" />
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            {item.badge && (
              <span className="rounded-full bg-white/90 px-3 py-1 font-accent text-[10px] uppercase tracking-wider text-night shadow-sm">
                {item.badge}
              </span>
            )}
            {item.embedUrl && (
              <span className="inline-flex items-center gap-1 rounded-full bg-gold/90 px-3 py-1 font-accent text-[10px] uppercase tracking-wider text-night shadow-sm">
                <Rotate3D size={10} />
                360°
              </span>
            )}
            {item.type && (
              <span className="rounded-full bg-night/50 px-3 py-1 font-accent text-[10px] uppercase tracking-wider text-sand backdrop-blur-sm">
                {item.type}
              </span>
            )}
          </div>
          <span className="absolute bottom-4 right-4 inline-flex items-center gap-1 rounded-full bg-copper px-3 py-1.5 font-accent text-label-sm uppercase tracking-wider text-white shadow-sm transition duration-300 group-hover:gap-1.5">
            Ver ficha
            <ArrowUpRight size={12} />
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <h3 className={cn("font-display text-fg text-balance", featured ? "text-2xl lg:text-3xl" : "text-xl")}>
            {label}
          </h3>
          <p
            className={cn(
              "mt-2 text-body-sm leading-relaxed text-muted-fg",
              featured ? "line-clamp-4" : "line-clamp-3"
            )}
          >
            {item.description}
          </p>

          {item.highlights && item.highlights.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2">
              {item.highlights.slice(0, featured ? 3 : 2).map((h) => (
                <li
                  key={h}
                  className="rounded-full border border-border bg-surface-elevated px-2.5 py-1 font-accent text-[10px] uppercase tracking-wider text-muted"
                >
                  {h}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-auto grid gap-2 pt-4 sm:grid-cols-2">
            {item.address && (
              <MetaChip icon={MapPin} label={item.address} className="sm:col-span-2" />
            )}
            {item.distanceFromOvalle && (
              <MetaChip icon={MapPin} label={item.distanceFromOvalle} />
            )}
            {item.visitDuration && <MetaChip icon={Timer} label={item.visitDuration} />}
            {item.bestSeason && <MetaChip icon={Calendar} label={item.bestSeason} />}
            {item.schedule && (
              <MetaChip icon={Clock} label={item.schedule} className="sm:col-span-2" />
            )}
          </div>
        </div>
      </button>

      {item.mapUrl && (
        <div className="border-t border-border px-5 py-3 sm:px-6">
          <a
            href={item.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 font-sans text-xs font-medium text-copper transition hover:text-copper/80"
          >
            <Navigation size={13} />
            Cómo llegar
          </a>
        </div>
      )}
    </motion.article>
  );
}

function MetaChip({
  icon: Icon,
  label,
  className,
}: {
  icon: typeof MapPin;
  label: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-start gap-2 rounded-xl border border-border/80 bg-surface-elevated/60 px-3 py-2 text-xs text-muted-fg",
        className
      )}
    >
      <Icon size={13} className="mt-0.5 shrink-0 text-copper" />
      <span className="leading-snug">{label}</span>
    </span>
  );
}
