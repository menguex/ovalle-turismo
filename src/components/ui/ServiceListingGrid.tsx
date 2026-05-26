"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Ficha } from "@/lib/types/ficha";
import { RichFichaCard } from "@/components/ui/RichFichaCard";
import { cn } from "@/lib/utils";

function extractTypeFilters(items: readonly Ficha[]) {
  const types = new Set<string>();
  for (const item of items) {
    if (!item.type) continue;
    for (const part of item.type.split(/[·,/|]/)) {
      const trimmed = part.trim();
      if (trimmed) types.add(trimmed);
    }
  }
  return ["Todos", ...Array.from(types).sort((a, b) => a.localeCompare(b, "es"))];
}

type ServiceListingGridProps = {
  items: readonly Ficha[];
  pageSize?: number;
  className?: string;
  showTypeFilters?: boolean;
};

export function ServiceListingGrid({
  items,
  pageSize = 9,
  className,
  showTypeFilters = true,
}: ServiceListingGridProps) {
  const reduced = useReducedMotion();
  const typeOptions = useMemo(() => extractTypeFilters(items), [items]);
  const [typeFilter, setTypeFilter] = useState("Todos");
  const [visibleCount, setVisibleCount] = useState(() =>
    Math.min(pageSize, items.length)
  );

  useEffect(() => {
    setTypeFilter("Todos");
    setVisibleCount(Math.min(pageSize, items.length));
  }, [items, pageSize]);

  const filtered = useMemo(() => {
    if (typeFilter === "Todos") return items;
    return items.filter((item) => item.type?.includes(typeFilter));
  }, [items, typeFilter]);

  useEffect(() => {
    setVisibleCount(Math.min(pageSize, filtered.length));
  }, [filtered, pageSize]);

  const visibleItems = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  if (items.length === 0) {
    return (
      <div className={cn("container-wide", className)}>
        <div className="rounded-2xl border border-dashed border-border bg-surface-elevated/60 px-6 py-12 text-center">
          <p className="font-display text-display-sm text-fg">Próximamente más opciones</p>
          <p className="section-lead mx-auto mt-2">
            Estamos actualizando esta sección. Vuelve pronto o revisa otras categorías.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("container-wide", className)}>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-body-sm font-medium text-muted-fg">
          Mostrando{" "}
          <span className="font-semibold text-fg">{visibleItems.length}</span> de{" "}
          <span className="font-semibold text-fg">{filtered.length}</span>
          {typeFilter !== "Todos" && (
            <span>
              {" "}
              · filtro: <span className="text-copper">{typeFilter}</span>
            </span>
          )}
        </p>
        {showTypeFilters && typeOptions.length > 2 && (
          <div className="flex items-center gap-2 text-muted">
            <SlidersHorizontal size={14} className="shrink-0 text-copper" aria-hidden />
            <span className="font-accent text-label-sm uppercase tracking-[0.12em]">
              Tipo
            </span>
          </div>
        )}
      </div>

      {showTypeFilters && typeOptions.length > 2 && (
        <div className="mb-8 flex flex-wrap gap-2">
          {typeOptions.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setTypeFilter(type)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 font-accent text-label-sm uppercase tracking-[0.1em] transition duration-300",
                typeFilter === type
                  ? "border-copper/50 bg-copper/10 text-copper"
                  : "border-border bg-surface-elevated text-muted hover:border-copper/30 hover:text-fg"
              )}
            >
              {type}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-surface-elevated/60 px-6 py-10 text-center">
          <p className="font-display text-lg text-fg">Sin resultados para este filtro</p>
          <button
            type="button"
            onClick={() => setTypeFilter("Todos")}
            className="mt-3 font-sans text-sm font-semibold text-copper hover:underline"
          >
            Ver todos
          </button>
        </div>
      ) : (
        <div className="grid min-w-0 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="sync">
            {visibleItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout={!reduced}
                initial={reduced ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: 8 }}
                transition={{
                  duration: reduced ? 0 : 0.4,
                  ease: [0.22, 1, 0.36, 1],
                  delay: reduced ? 0 : Math.min(index * 0.04, 0.28),
                }}
                className="min-w-0"
              >
                <RichFichaCard item={item} className="h-full" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {hasMore && (
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-10 flex flex-col items-center gap-2"
        >
          <button
            type="button"
            onClick={() =>
              setVisibleCount((count) => Math.min(count + pageSize, filtered.length))
            }
            className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-6 py-3.5 font-accent text-label-sm uppercase tracking-[0.12em] text-fg transition hover:-translate-y-0.5 hover:border-brand-orange/40 hover:shadow-card focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/40"
          >
            Cargar más
            <ChevronDown size={16} className="transition group-hover:translate-y-0.5" />
          </button>
          <p className="text-body-sm text-muted">
            {filtered.length - visibleCount} restantes
          </p>
        </motion.div>
      )}
    </div>
  );
}
