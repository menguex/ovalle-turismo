"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Download,
  Layers,
  Maximize2,
  Sparkles,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const BROCHURE = {
  title: "Ruta Costera de Ovalle",
  subtitle: "Tesoros del Litoral de Ovalle",
  tiro: {
    src: "/brochures/ruta-costera-tiro.png",
    alt: "Tríptico Ruta Costera de Ovalle — tiro",
    label: "Tiro",
    hint: "Portada · Caletas Sierra y Talca · QR informativo",
    panels: 3,
  },
  retiro: {
    src: "/brochures/ruta-costera-retiro.png",
    alt: "Tríptico Ruta Costera de Ovalle — retiro",
    label: "Retiro",
    hint: "6 caletas artesanales del litoral de Ovalle",
    panels: 6,
  },
} as const;

type BrochureSide = "tiro" | "retiro";
type ViewMode = "unfold" | "full";

const PANEL_EASE = [0.22, 1, 0.36, 1] as const;

function BrochurePanelSlice({
  src,
  alt,
  col,
  cols,
  row = 0,
  rows = 1,
  index,
  reduced,
}: {
  src: string;
  alt: string;
  col: number;
  cols: number;
  row?: number;
  rows?: number;
  index: number;
  reduced: boolean | null;
}) {
  const rotateY = cols === 3 && rows === 1 ? (col === 0 ? -78 : col === 2 ? 78 : 0) : 0;
  const rotateX = rows > 1 ? 18 : 0;

  return (
    <motion.div
      initial={
        reduced
          ? false
          : {
              opacity: 0,
              rotateY,
              rotateX,
              scale: 0.88,
              y: rows > 1 ? 24 : 0,
            }
      }
      animate={{ opacity: 1, rotateY: 0, rotateX: 0, scale: 1, y: 0 }}
      transition={{
        delay: reduced ? 0 : 0.08 + index * 0.1,
        duration: reduced ? 0 : 0.65,
        ease: PANEL_EASE,
      }}
      className={cn(
        "brochure-panel relative overflow-hidden rounded-xl border border-white/20 bg-[#0c1a2e] shadow-[0_20px_50px_rgba(0,0,0,0.45)]",
        cols === 3 && rows === 1 && col === 1 && "z-10 shadow-[0_28px_70px_rgba(61,143,217,0.25)]"
      )}
      style={{ transformStyle: "preserve-3d", transformOrigin: col === 0 ? "right center" : col === cols - 1 ? "left center" : "center center" }}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden sm:aspect-[2/3]">
        <div
          className="absolute inset-0"
          style={{
            width: `${cols * 100}%`,
            height: `${rows * 100}%`,
            left: `${-(col * 100)}%`,
            top: `${-(row * 100)}%`,
          }}
        >
          <Image src={src} alt={alt} fill className="object-cover object-left-top" sizes="320px" />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-black/20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-px bg-white/10" />
    </motion.div>
  );
}

function BrochureUnfoldView({
  side,
  reduced,
  zoom,
}: {
  side: BrochureSide;
  reduced: boolean | null;
  zoom: number;
}) {
  const meta = BROCHURE[side];

  if (side === "tiro") {
    return (
      <motion.div
        className="mx-auto flex w-full max-w-4xl gap-1.5 sm:gap-2 [perspective:1800px]"
        style={{ scale: zoom }}
      >
        {[0, 1, 2].map((col) => (
          <BrochurePanelSlice
            key={col}
            src={meta.src}
            alt={meta.alt}
            col={col}
            cols={3}
            index={col}
            reduced={reduced}
          />
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      className="mx-auto grid w-full max-w-4xl grid-cols-3 gap-1.5 sm:gap-2 [perspective:1600px]"
      style={{ scale: zoom }}
    >
      {Array.from({ length: 6 }, (_, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        return (
          <BrochurePanelSlice
            key={i}
            src={meta.src}
            alt={meta.alt}
            col={col}
            cols={3}
            row={row}
            rows={2}
            index={i}
            reduced={reduced}
          />
        );
      })}
    </motion.div>
  );
}

function BrochureFullView({
  side,
  reduced,
  zoom,
}: {
  side: BrochureSide;
  reduced: boolean | null;
  zoom: number;
}) {
  const meta = BROCHURE[side];

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: zoom }}
      transition={{ duration: reduced ? 0 : 0.45, ease: PANEL_EASE }}
      className="relative mx-auto w-full max-w-4xl"
    >
      <div className="overflow-hidden rounded-2xl border border-white/15 shadow-[0_32px_90px_rgba(0,0,0,0.5)] ring-1 ring-white/10">
        <Image
          src={meta.src}
          alt={meta.alt}
          width={1800}
          height={1200}
          className="h-auto w-full"
          priority
          sizes="(max-width:1024px) 100vw, 896px"
        />
      </div>
      <div className="pointer-events-none absolute -inset-6 -z-10 rounded-3xl bg-brand-blue/15 blur-3xl" />
    </motion.div>
  );
}

function BrochureModal({
  open,
  onClose,
  initialSide = "tiro",
}: {
  open: boolean;
  onClose: () => void;
  initialSide?: BrochureSide;
}) {
  const reduced = useReducedMotion();
  const [side, setSide] = useState<BrochureSide>(initialSide);
  const [viewMode, setViewMode] = useState<ViewMode>("unfold");
  const [zoom, setZoom] = useState(1);
  const [animKey, setAnimKey] = useState(0);

  const goTo = useCallback((next: BrochureSide) => {
    setSide(next);
    setZoom(1);
    setAnimKey((k) => k + 1);
  }, []);

  useEffect(() => {
    if (!open) return;
    setSide(initialSide);
    setViewMode("unfold");
    setZoom(1);
    setAnimKey((k) => k + 1);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goTo("tiro");
      if (e.key === "ArrowRight") goTo("retiro");
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, initialSide, goTo]);

  const toggleView = () => {
    setViewMode((m) => (m === "unfold" ? "full" : "unfold"));
    setAnimKey((k) => k + 1);
  };

  const current = BROCHURE[side];

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[120] flex items-end justify-center sm:items-center sm:p-5">
          <motion.button
            type="button"
            aria-label="Cerrar tríptico"
            className="absolute inset-0 bg-[#050810]/88 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
            <motion.div
              className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-brand-blue/20 blur-[120px]"
              animate={{ opacity: [0.35, 0.55, 0.35], scale: [1, 1.08, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -right-24 bottom-1/4 h-80 w-80 rounded-full bg-brand-yellow/10 blur-[100px]"
              animate={{ opacity: [0.2, 0.4, 0.2], scale: [1.05, 1, 1.05] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={BROCHURE.title}
            className="relative z-10 flex max-h-[96vh] w-full max-w-6xl flex-col overflow-hidden rounded-t-[2rem] border border-white/10 bg-gradient-to-b from-[#0f1a2e] to-[#0a1220] shadow-[0_40px_120px_rgba(0,0,0,0.65)] sm:rounded-[2rem]"
            initial={reduced ? false : { opacity: 0, y: 48, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? undefined : { opacity: 0, y: 32, scale: 0.97 }}
            transition={{ duration: reduced ? 0 : 0.5, ease: PANEL_EASE }}
          >
            <div className="relative border-b border-white/10 px-4 py-4 sm:px-6">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-yellow/15 px-2.5 py-1 font-accent text-[9px] uppercase tracking-wider text-brand-yellow">
                      <Sparkles size={11} />
                      Material oficial
                    </span>
                    <span className="rounded-full bg-white/8 px-2.5 py-1 font-accent text-[9px] uppercase tracking-wider text-sand/70">
                      {viewMode === "unfold" ? "Desplegado" : "Vista completa"}
                    </span>
                  </div>
                  <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
                    {BROCHURE.title}
                  </h2>
                  <p className="mt-1 text-sm text-sand/70">{current.hint}</p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="shrink-0 rounded-full border border-white/15 bg-white/5 p-2.5 text-sand/90 transition hover:bg-white/10 hover:text-white"
                  aria-label="Cerrar"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <div className="inline-flex rounded-full border border-white/12 bg-black/25 p-1">
                  {(["tiro", "retiro"] as const).map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => goTo(key)}
                      className={cn(
                        "rounded-full px-4 py-1.5 font-accent text-[10px] uppercase tracking-wider transition duration-300",
                        side === key
                          ? "bg-brand-gradient text-night shadow-glow"
                          : "text-sand/70 hover:text-white"
                      )}
                    >
                      {BROCHURE[key].label}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={toggleView}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-sans text-xs font-medium transition",
                    viewMode === "unfold"
                      ? "border-brand-blue/40 bg-brand-blue/10 text-brand-blue"
                      : "border-white/15 text-sand/80 hover:border-white/25 hover:text-white"
                  )}
                >
                  {viewMode === "unfold" ? <Layers size={14} /> : <Maximize2 size={14} />}
                  {viewMode === "unfold" ? "Paneles" : "Pliego"}
                </button>

                <div className="ml-auto flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setZoom((z) => Math.max(0.85, z - 0.1))}
                    disabled={zoom <= 0.85}
                    className="rounded-full p-2 text-sand/75 transition hover:bg-white/10 hover:text-white disabled:opacity-30"
                    aria-label="Alejar"
                  >
                    <ZoomOut size={16} />
                  </button>
                  <span className="min-w-[3rem] text-center font-mono text-xs text-sand/60">
                    {Math.round(zoom * 100)}%
                  </span>
                  <button
                    type="button"
                    onClick={() => setZoom((z) => Math.min(1.35, z + 0.1))}
                    disabled={zoom >= 1.35}
                    className="rounded-full p-2 text-sand/75 transition hover:bg-white/10 hover:text-white disabled:opacity-30"
                    aria-label="Acercar"
                  >
                    <ZoomIn size={16} />
                  </button>
                  <a
                    href={current.src}
                    download
                    className="rounded-full p-2 text-sand/75 transition hover:bg-white/10 hover:text-white"
                    aria-label="Descargar"
                  >
                    <Download size={16} />
                  </a>
                </div>
              </div>
            </div>

            <div className="relative flex-1 overflow-auto px-3 py-5 sm:px-6 sm:py-8">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-[#0f1a2e] to-transparent" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${side}-${viewMode}-${animKey}`}
                  initial={reduced ? false : { opacity: 0, rotateY: side === "tiro" ? -12 : 12 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  exit={reduced ? undefined : { opacity: 0, rotateY: side === "tiro" ? 12 : -12 }}
                  transition={{ duration: reduced ? 0 : 0.45, ease: PANEL_EASE }}
                  className="[perspective:2000px]"
                >
                  {viewMode === "unfold" ? (
                    <BrochureUnfoldView side={side} reduced={reduced} zoom={zoom} />
                  ) : (
                    <BrochureFullView side={side} reduced={reduced} zoom={zoom} />
                  )}
                </motion.div>
              </AnimatePresence>
              <div className="brochure-stage-shadow mx-auto mt-6 h-3 max-w-3xl rounded-[100%] bg-black/40 blur-md" />
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-white/10 px-4 py-3 sm:px-6">
              <button
                type="button"
                onClick={() => goTo("tiro")}
                disabled={side === "tiro"}
                className="inline-flex items-center gap-1 rounded-full px-3 py-2 font-sans text-xs font-medium text-sand/80 transition hover:text-white disabled:opacity-35"
              >
                <ChevronLeft size={16} />
                Tiro
              </button>
              <p className="hidden text-center font-sans text-xs text-sand/55 sm:block">
                Despliega el tríptico · Flechas ← → · Esc para cerrar
              </p>
              <p className="text-center font-sans text-xs text-sand/55 sm:hidden">← → · Esc</p>
              <button
                type="button"
                onClick={() => goTo("retiro")}
                disabled={side === "retiro"}
                className="inline-flex items-center gap-1 rounded-full px-3 py-2 font-sans text-xs font-medium text-sand/80 transition hover:text-white disabled:opacity-35"
              >
                Retiro
                <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function CoastalRouteBrochure() {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const openBrochure = useCallback(() => setOpen(true), []);
  const closeBrochure = useCallback(() => setOpen(false), []);

  return (
    <>
      <motion.button
        type="button"
        onClick={openBrochure}
        whileHover={reduced ? undefined : { y: -3 }}
        transition={{ duration: 0.35, ease: PANEL_EASE }}
        className="group relative w-full overflow-hidden rounded-[1.75rem] border border-brand-blue/30 bg-gradient-to-br from-[#0c1a2e] via-surface to-brand-blue/8 p-0 text-left shadow-card transition duration-500 hover:border-brand-blue/50 hover:shadow-glow-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/50"
      >
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-blue/15 blur-3xl transition duration-700 group-hover:bg-brand-blue/25" />

        <div className="grid lg:grid-cols-[1fr_1.35fr]">
          <div className="relative z-[1] flex flex-col justify-center gap-4 p-6 sm:p-8">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-blue/25 bg-brand-blue/10 px-3 py-1 font-accent text-[10px] uppercase tracking-wider text-brand-blue">
              <BookOpen size={12} />
              Tríptico interactivo
            </span>
            <div>
              <h3 className="font-display text-2xl font-bold text-fg sm:text-3xl">
                {BROCHURE.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-fg">{BROCHURE.subtitle}</p>
            </div>
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-brand-gradient px-5 py-2.5 font-sans text-sm font-semibold text-night shadow-glow transition group-hover:opacity-95">
              <Sparkles size={15} />
              Abrir tríptico animado
            </span>
          </div>

          <div className="relative min-h-[200px] overflow-hidden p-4 sm:min-h-[240px] sm:p-5">
            <div className="flex h-full gap-1.5 [perspective:900px]">
              {[0, 1, 2].map((col) => (
                <motion.div
                  key={col}
                  className={cn(
                    "relative flex-1 overflow-hidden rounded-lg border border-white/15 shadow-lg",
                    col === 1 && "z-10 -mt-2 shadow-xl"
                  )}
                  initial={false}
                  whileHover={
                    reduced
                      ? undefined
                      : {
                          rotateY: col === 0 ? -8 : col === 2 ? 8 : 0,
                          y: col === 1 ? -4 : 0,
                          scale: col === 1 ? 1.03 : 1.01,
                        }
                  }
                  transition={{ duration: 0.4, ease: PANEL_EASE }}
                  style={{
                    transformStyle: "preserve-3d",
                    transformOrigin: col === 0 ? "right center" : col === 2 ? "left center" : "center",
                  }}
                >
                  <div className="relative aspect-[3/4] w-full">
                    <div
                      className="absolute inset-0"
                      style={{ width: "300%", left: `${-col * 100}%` }}
                    >
                      <Image
                        src={BROCHURE.tiro.src}
                        alt=""
                        fill
                        className="object-cover object-left-top"
                        sizes="120px"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="absolute bottom-6 right-6 rounded-full border border-white/20 bg-night/70 px-3 py-1 font-accent text-[9px] uppercase tracking-wider text-sand/90 backdrop-blur-md">
              Tiro · Retiro
            </div>
          </div>
        </div>
      </motion.button>

      <BrochureModal open={open} onClose={closeBrochure} />
    </>
  );
}
