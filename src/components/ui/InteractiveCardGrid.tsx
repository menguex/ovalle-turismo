"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Ficha } from "@/lib/types/ficha";
import { fichaLabel } from "@/lib/types/ficha";
import { useFicha } from "@/components/providers/FichaProvider";
import { cn } from "@/lib/utils";

const DEFAULT_PAGE_SIZE = 9;

export function InteractiveCardGrid({
  items,
  className,
  pageSize = DEFAULT_PAGE_SIZE,
}: {
  items: readonly Ficha[];
  className?: string;
  pageSize?: number;
}) {
  const { openFicha } = useFicha();
  const reduced = useReducedMotion();
  const [visibleCount, setVisibleCount] = useState(() =>
    pageSize > 0 ? Math.min(pageSize, items.length) : items.length
  );

  useEffect(() => {
    setVisibleCount(pageSize > 0 ? Math.min(pageSize, items.length) : items.length);
  }, [items, pageSize]);

  const visibleItems = useMemo(
    () => items.slice(0, visibleCount),
    [items, visibleCount]
  );

  const hasMore = visibleCount < items.length;

  if (items.length === 0) {
    return (
      <div className={cn("container-wide", className)}>
        <div className="rounded-2xl border border-dashed border-border bg-surface-elevated/60 px-6 py-12 text-center">
          <p className="font-display text-lg text-fg">Próximamente más opciones</p>
          <p className="mt-2 text-sm text-muted-fg">
            Estamos actualizando esta sección. Mientras tanto, revisa{" "}
            <a href="/servicios" className="font-semibold text-copper hover:underline">
              Servicios turísticos
            </a>
            .
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("container-wide", className)}>
      <div className="grid min-w-0 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="sync">
          {visibleItems.map((item, index) => {
            const label = fichaLabel(item);
            return (
              <motion.div
                key={item.id}
                initial={reduced ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: 8 }}
                transition={{
                  duration: reduced ? 0 : 0.45,
                  ease: [0.22, 1, 0.36, 1],
                  delay: reduced ? 0 : Math.min(index * 0.05, 0.35),
                }}
                whileHover={reduced ? undefined : { y: -4 }}
                whileTap={reduced ? undefined : { scale: 0.99 }}
                className="min-w-0"
              >
                <button
                  type="button"
                  onClick={() => openFicha(item.id)}
                  aria-label={`Ver ficha de ${label}`}
                  className="group tech-card-frame pillar-card-shine flex w-full flex-col overflow-hidden text-left card-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-copper/40"
                >
                  <div className="relative isolate aspect-[4/3] w-full shrink-0 overflow-hidden bg-border/40">
                    <Image
                      src={item.image}
                      alt={label}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="pointer-events-none object-cover transition duration-700 ease-premium group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/55 via-transparent to-transparent opacity-80 transition group-hover:opacity-100" />
                    <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
                      {item.badge && (
                        <span className="rounded-full bg-gold/90 px-2.5 py-1 font-accent text-[10px] uppercase tracking-wider text-night">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-copper px-3 py-1.5 font-accent text-label-sm uppercase tracking-wider text-white shadow-sm transition duration-300 group-hover:gap-1.5">
                      Ver ficha
                      <ArrowUpRight size={12} />
                    </span>
                  </div>
                  <div className="relative z-[1] flex flex-1 flex-col p-6">
                    {item.type && <p className="eyebrow">{item.type}</p>}
                    <h3 className="heading-md mt-1 text-balance transition-colors group-hover:text-brand-orange">
                      {label}
                    </h3>
                    {item.description && (
                      <p className="mt-2 line-clamp-3 text-body-sm leading-relaxed text-muted-fg">
                        {item.description}
                      </p>
                    )}
                  </div>
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {hasMore && (
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-10 flex justify-center"
        >
          <button
            type="button"
            onClick={() =>
              setVisibleCount((count) => Math.min(count + pageSize, items.length))
            }
            className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-6 py-3 font-accent text-xs uppercase tracking-[0.14em] text-fg transition hover:-translate-y-0.5 hover:border-brand-orange/40 hover:shadow-card focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/40"
          >
            Cargar más
            <ChevronDown
              size={16}
              className="transition duration-300 group-hover:translate-y-0.5"
            />
            <span className="sr-only">
              ({items.length - visibleCount} restantes)
            </span>
          </button>
        </motion.div>
      )}
    </div>
  );
}
