"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, MapPin, Navigation, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MAP_CATEGORIES,
  MAP_POINTS,
  type MapCategory,
} from "@/lib/data/site";
import { cn } from "@/lib/utils";

const TerritoryMap = dynamic(
  () => import("@/components/sections/TerritoryMap").then((m) => m.TerritoryMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-[440px] items-center justify-center bg-night/90 lg:min-h-[520px]">
        <div className="text-center">
          <div className="mx-auto mb-3 h-10 w-10 animate-pulse rounded-full bg-brand-blue/20" />
          <p className="font-accent text-[10px] uppercase tracking-wider text-sand/70">
            Cargando mapa del valle…
          </p>
        </div>
      </div>
    ),
  }
);

const ALL_CATEGORIES = ["Todos", ...Object.keys(MAP_CATEGORIES)] as const;

type MapExplorerProps = {
  defaultCategory?: string;
  lockCategory?: boolean;
  defaultSelectedId?: string;
};

export function MapExplorer({
  defaultCategory = "Todos",
  lockCategory = false,
  defaultSelectedId,
}: MapExplorerProps = {}) {
  const [activeCategory, setActiveCategory] = useState<string>(defaultCategory);
  const [selectedId, setSelectedId] = useState<string | null>(() => {
    if (defaultSelectedId) return defaultSelectedId;
    const initial =
      defaultCategory === "Todos"
        ? MAP_POINTS[0]?.id
        : MAP_POINTS.find((p) => p.category === defaultCategory)?.id;
    return initial ?? MAP_POINTS[0]?.id ?? null;
  });

  const points = useMemo(
    () =>
      MAP_POINTS.map((point) => ({
        id: point.id,
        name: point.name,
        lat: point.lat,
        lng: point.lng,
        category: point.category,
        description: point.description,
        href: point.href,
        color: MAP_CATEGORIES[point.category].color,
      })),
    []
  );

  const filtered = useMemo(
    () =>
      activeCategory === "Todos"
        ? points
        : points.filter((p) => p.category === activeCategory),
    [activeCategory, points]
  );

  const visibleIds = useMemo(() => new Set(filtered.map((p) => p.id)), [filtered]);
  const selected = points.find((p) => p.id === selectedId) ?? null;

  return (
    <div className="grid gap-8 lg:grid-cols-[1.55fr_1fr]">
      <div className="map-tech-frame relative min-h-[440px] overflow-hidden lg:min-h-[520px]">
        <TerritoryMap
          points={points}
          visibleIds={visibleIds}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />

        <div className="pointer-events-none absolute inset-0 z-[400] rounded-[2rem] bg-gradient-to-t from-night/55 via-transparent to-night/15" />

        <div className="pointer-events-none absolute bottom-4 left-4 z-[500] flex flex-wrap gap-2">
          {Object.entries(MAP_CATEGORIES).map(([key, { color, label }]) => (
            <span
              key={key}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-night/75 px-2.5 py-1 font-accent text-[9px] uppercase tracking-wider text-sand/90 backdrop-blur-md"
            >
              <span className="h-2 w-2 rounded-full shadow-sm" style={{ backgroundColor: color }} />
              {label}
            </span>
          ))}
        </div>

        <div className="pointer-events-none absolute right-4 top-4 z-[500] flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-night/60 backdrop-blur-md">
          <span className="font-accent text-[10px] font-bold text-sand/80">N</span>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        {!lockCategory && (
          <div className="flex flex-wrap gap-2">
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 font-accent text-[10px] uppercase tracking-wider transition-all duration-300",
                  activeCategory === cat
                    ? "border-copper/50 bg-copper/15 text-copper"
                    : "border-border bg-surface text-muted hover:border-copper/30 hover:text-fg"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
        {lockCategory && (
          <p className="font-accent text-[10px] uppercase tracking-wider text-copper">
            {MAP_CATEGORIES[activeCategory as MapCategory]?.label ?? activeCategory}
          </p>
        )}

        <AnimatePresence mode="wait">
          {selected && (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-border bg-surface p-6 shadow-card dark:shadow-card-dark"
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-accent text-[10px] uppercase tracking-wider"
                  style={{
                    backgroundColor: `${selected.color}18`,
                    color: selected.color,
                  }}
                >
                  <MapPin size={10} />
                  {selected.category}
                </span>
                <button
                  type="button"
                  className="rounded-full p-1 text-muted transition hover:bg-surface-elevated hover:text-fg lg:hidden"
                  onClick={() => setSelectedId(null)}
                  aria-label="Cerrar detalle"
                >
                  <X size={16} />
                </button>
              </div>
              <h3 className="font-display text-2xl font-bold text-fg">{selected.name}</h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-muted-fg">
                {selected.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href={selected.href}
                  className="inline-flex items-center gap-1.5 rounded-full bg-copper px-4 py-2 font-sans text-sm font-medium text-white transition hover:bg-copper/90"
                >
                  Explorar
                  <ArrowUpRight size={14} />
                </Link>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${selected.lat},${selected.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 font-sans text-sm font-medium text-fg transition hover:bg-surface-elevated"
                >
                  <Navigation size={14} />
                  Cómo llegar
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex-1 space-y-2 overflow-y-auto scroll-fade-edge lg:max-h-[280px]">
          {filtered.map((point) => (
            <button
              key={point.id}
              type="button"
              onClick={() => setSelectedId(point.id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl border p-4 text-left transition-all duration-300",
                selectedId === point.id
                  ? "border-copper/30 bg-copper/5 shadow-sm"
                  : "border-border bg-surface hover:border-copper/20 hover:bg-surface-elevated"
              )}
            >
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: point.color }}
              />
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-sm font-semibold text-fg">
                  {point.name}
                </p>
                <p className="font-accent text-[10px] uppercase tracking-wider text-muted">
                  {point.category}
                </p>
              </div>
              <ArrowUpRight
                size={14}
                className={cn(
                  "shrink-0 transition",
                  selectedId === point.id ? "text-copper" : "text-muted"
                )}
              />
            </button>
          ))}
        </div>

        <p className="font-sans text-xs text-muted">
          {filtered.length} punto{filtered.length !== 1 ? "s" : ""} en el Valle del Limarí
        </p>
      </div>
    </div>
  );
}
