"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, MapPin, Navigation, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MAP_CATEGORIES,
  MAP_POINTS,
} from "@/lib/data/site";
import { cn } from "@/lib/utils";
import { BrandShapes } from "@/components/brand/BrandShapes";

const MAP_BOUNDS = {
  minLat: -30.82,
  maxLat: -30.44,
  minLng: -71.78,
  maxLng: -71.08,
};

function coordsToPercent(lat: number, lng: number) {
  const x =
    ((lng - MAP_BOUNDS.minLng) / (MAP_BOUNDS.maxLng - MAP_BOUNDS.minLng)) * 100;
  const y =
    ((MAP_BOUNDS.maxLat - lat) / (MAP_BOUNDS.maxLat - MAP_BOUNDS.minLat)) * 100;
  return {
    x: Math.min(94, Math.max(6, x)),
    y: Math.min(92, Math.max(8, y)),
  };
}

const ALL_CATEGORIES = ["Todos", ...Object.keys(MAP_CATEGORIES)] as const;

export function MapExplorer() {
  const [activeCategory, setActiveCategory] = useState<string>("Todos");
  const [selectedId, setSelectedId] = useState<string | null>(MAP_POINTS[0]?.id ?? null);

  const points = useMemo(() => {
    return MAP_POINTS.map((point) => ({
      ...point,
      ...coordsToPercent(point.lat, point.lng),
      color: MAP_CATEGORIES[point.category].color,
    }));
  }, []);

  const filtered = useMemo(
    () =>
      activeCategory === "Todos"
        ? points
        : points.filter((p) => p.category === activeCategory),
    [activeCategory, points]
  );

  const selected = points.find((p) => p.id === selectedId) ?? null;

  return (
    <div className="grid gap-8 lg:grid-cols-[1.55fr_1fr]">
      {/* Map canvas */}
      <div className="map-tech-frame relative min-h-[440px] lg:min-h-[520px]">
        <BrandShapes variant="map" />
        <div
          className="absolute inset-0 rounded-[2rem]"
          style={{ background: "var(--map-bg)" }}
        />

        {/* Topographic SVG terrain */}
        <svg
          viewBox="0 0 800 520"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden
        >
          <defs>
            <linearGradient id="terrainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e2438" />
              <stop offset="50%" stopColor="#161b2a" />
              <stop offset="100%" stopColor="#0f131f" />
            </linearGradient>
            <linearGradient id="riverGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3A8F9E" stopOpacity="0.15" />
              <stop offset="50%" stopColor="#3A8F9E" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#3A8F9E" stopOpacity="0.2" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <pattern id="topoLines" width="60" height="60" patternUnits="userSpaceOnUse">
              <path
                d="M0 30 Q15 10 30 30 T60 30"
                fill="none"
                stroke="rgba(255,255,255,0.04)"
                strokeWidth="0.8"
              />
              <path
                d="M0 50 Q20 35 40 50 T80 50"
                fill="none"
                stroke="rgba(255,255,255,0.03)"
                strokeWidth="0.6"
              />
            </pattern>
          </defs>

          <rect width="800" height="520" fill="url(#terrainGrad)" />
          <rect width="800" height="520" fill="url(#topoLines)" />

          {/* Mountain silhouettes */}
          <path
            d="M0 380 L120 280 L200 320 L310 220 L420 300 L520 180 L640 260 L760 200 L800 240 L800 520 L0 520 Z"
            fill="rgba(11,13,23,0.5)"
          />
          <path
            d="M0 420 L80 360 L180 390 L280 310 L400 370 L500 290 L620 350 L720 300 L800 340 L800 520 L0 520 Z"
            fill="rgba(11,13,23,0.35)"
          />

          {/* Limarí river */}
          <path
            d="M680 80 C620 140 580 180 520 220 C460 260 420 300 380 340 C340 380 300 400 240 420 C180 440 120 460 60 480"
            fill="none"
            stroke="url(#riverGrad)"
            strokeWidth="6"
            strokeLinecap="round"
            filter="url(#glow)"
          />
          <path
            d="M680 80 C620 140 580 180 520 220 C460 260 420 300 380 340 C340 380 300 400 240 420 C180 440 120 460 60 480"
            fill="none"
            stroke="#3A8F9E"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="8 12"
            opacity="0.4"
          />

          {/* Valley label */}
          <text
            x="400"
            y="480"
            textAnchor="middle"
            fill="rgba(232,223,212,0.25)"
            fontSize="11"
            fontFamily="system-ui"
            letterSpacing="0.2em"
          >
            VALLE DEL LIMARÍ
          </text>
        </svg>

        {/* Grid overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(var(--map-grid) 1px, transparent 1px),
              linear-gradient(90deg, var(--map-grid) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />

        {/* Connection lines between selected and nearby points */}
        {selected && (
          <svg className="pointer-events-none absolute inset-0 h-full w-full">
            {filtered
              .filter((p) => p.id !== selected.id)
              .slice(0, 3)
              .map((p) => (
                <line
                  key={p.id}
                  x1={`${selected.x}%`}
                  y1={`${selected.y}%`}
                  x2={`${p.x}%`}
                  y2={`${p.y}%`}
                  stroke={selected.color}
                  strokeWidth="1"
                  strokeDasharray="4 6"
                  opacity="0.25"
                />
              ))}
          </svg>
        )}

        {/* Pins */}
        <AnimatePresence>
          {filtered.map((point) => {
            const isActive = selectedId === point.id;
            return (
              <motion.button
                key={point.id}
                type="button"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="group absolute z-10 -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${point.x}%`, top: `${point.y}%` }}
                onClick={() => setSelectedId(point.id)}
                aria-label={point.name}
                aria-pressed={isActive}
              >
                {isActive && (
                  <span
                    className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 animate-pin-pulse rounded-full"
                    style={{ backgroundColor: `${point.color}40` }}
                  />
                )}
                <span
                  className={cn(
                    "relative flex h-4 w-4 items-center justify-center rounded-full border-2 border-white shadow-lg transition-transform duration-300",
                    isActive ? "scale-125" : "scale-100 group-hover:scale-110"
                  )}
                  style={{ backgroundColor: point.color }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-white/90" />
                </span>
                <span
                  className={cn(
                    "pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-full px-2.5 py-1 font-accent text-[9px] uppercase tracking-wider transition-all duration-300",
                    isActive
                      ? "bg-white/15 text-sand backdrop-blur-sm"
                      : "text-sand/75 opacity-0 group-hover:opacity-100"
                  )}
                >
                  {point.name}
                </span>
              </motion.button>
            );
          })}
        </AnimatePresence>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
          {Object.entries(MAP_CATEGORIES).map(([key, { color, label }]) => (
            <span
              key={key}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-night/70 px-2.5 py-1 font-accent text-[9px] uppercase tracking-wider text-sand/85 backdrop-blur-sm"
            >
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
              {label}
            </span>
          ))}
        </div>

        {/* Compass */}
        <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-night/50 backdrop-blur-sm">
          <span className="font-accent text-[10px] font-bold text-sand/70">N</span>
        </div>
      </div>

      {/* Sidebar panel */}
      <div className="flex flex-col gap-5">
        {/* Category filters */}
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

        {/* Selected detail card */}
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

        {/* Points list */}
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
