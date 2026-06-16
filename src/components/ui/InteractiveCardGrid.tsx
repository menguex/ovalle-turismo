"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Ficha } from "@/lib/types/ficha";
import { ExperienceFichaCard } from "@/components/ui/ExperienceFichaCard";
import { useFicha } from "@/components/providers/FichaProvider";
import { cn } from "@/lib/utils";

const DEFAULT_PAGE_SIZE = 9;

export function InteractiveCardGrid({
  items,
  className,
  pageSize = DEFAULT_PAGE_SIZE,
  featuredFirst = false,
}: {
  items: readonly Ficha[];
  className?: string;
  pageSize?: number;
  featuredFirst?: boolean;
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
  const featured = featuredFirst && visibleItems.length > 0 ? visibleItems[0] : null;
  const gridItems = featured ? visibleItems.slice(1) : visibleItems;

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
      {featured && (
        <div className="mb-5">
          <ExperienceFichaCard
            item={featured}
            featured
            onOpen={() => openFicha(featured.id)}
          />
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 experience-grid-balanced">
        <AnimatePresence mode="sync">
          {gridItems.map((item, index) => (
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
              className="min-w-0"
            >
              <ExperienceFichaCard item={item} onOpen={() => openFicha(item.id)} />
            </motion.div>
          ))}
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
