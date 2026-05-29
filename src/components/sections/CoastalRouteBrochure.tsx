"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Download,
  RotateCw,
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
    alt: "Tríptico Ruta Costera de Ovalle — tiro (portada y caletas Sierra y Talca)",
    label: "Tiro",
  },
  retiro: {
    src: "/brochures/ruta-costera-retiro.png",
    alt: "Tríptico Ruta Costera de Ovalle — retiro (caletas El Sauce, El Toro, Totoral, Talcaruca, La Cebada y Talquilla)",
    label: "Retiro",
  },
} as const;

type BrochureSide = "tiro" | "retiro";

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
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    if (!open) return;
    setSide(initialSide);
    setZoom(1);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") setSide("tiro");
      if (e.key === "ArrowRight") setSide("retiro");
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, initialSide]);

  const current = side === "tiro" ? BROCHURE.tiro : BROCHURE.retiro;
  const flipTo = (next: BrochureSide) => {
    setSide(next);
    setZoom(1);
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6">
          <motion.button
            type="button"
            aria-label="Cerrar tríptico"
            className="absolute inset-0 bg-night/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={BROCHURE.title}
            className="relative z-10 flex max-h-[96vh] w-full max-w-5xl flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-night shadow-2xl"
            initial={reduced ? false : { opacity: 0, y: 32, scale: 0.94, rotateX: 8 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: reduced ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{ perspective: "1200px" }}
          >
            <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
              <div className="min-w-0">
                <p className="font-accent text-[10px] uppercase tracking-wider text-brand-yellow">
                  Tríptico interactivo
                </p>
                <h2 className="truncate font-display text-lg font-bold text-white sm:text-xl">
                  {BROCHURE.title}
                </h2>
              </div>
              <div className="flex shrink-0 items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setZoom((z) => Math.max(1, z - 0.25))}
                  className="rounded-full p-2 text-sand/80 transition hover:bg-white/10 hover:text-white"
                  aria-label="Alejar"
                  disabled={zoom <= 1}
                >
                  <ZoomOut size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => setZoom((z) => Math.min(2.5, z + 0.25))}
                  className="rounded-full p-2 text-sand/80 transition hover:bg-white/10 hover:text-white"
                  aria-label="Acercar"
                >
                  <ZoomIn size={18} />
                </button>
                <a
                  href={current.src}
                  download
                  className="rounded-full p-2 text-sand/80 transition hover:bg-white/10 hover:text-white"
                  aria-label="Descargar imagen"
                >
                  <Download size={18} />
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full p-2 text-sand/80 transition hover:bg-white/10 hover:text-white"
                  aria-label="Cerrar"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 border-b border-white/10 px-4 py-2.5">
              {(["tiro", "retiro"] as const).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => flipTo(key)}
                  className={cn(
                    "rounded-full px-4 py-1.5 font-accent text-[10px] uppercase tracking-wider transition duration-300",
                    side === key
                      ? "bg-brand-gradient text-night shadow-glow"
                      : "bg-white/8 text-sand/75 hover:bg-white/12 hover:text-white"
                  )}
                >
                  {BROCHURE[key].label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => flipTo(side === "tiro" ? "retiro" : "tiro")}
                className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 font-sans text-xs font-medium text-sand/85 transition hover:border-brand-yellow/40 hover:text-white"
              >
                <RotateCw size={14} />
                Voltear
              </button>
            </div>

            <div className="relative flex-1 overflow-auto bg-[#0a1628] p-3 sm:p-5">
              <div className="mx-auto flex min-h-[min(58vh,520px)] max-w-4xl items-center justify-center [perspective:1400px]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={side}
                    initial={
                      reduced
                        ? false
                        : {
                            opacity: 0,
                            rotateY: side === "tiro" ? -72 : 72,
                            scale: 0.92,
                          }
                    }
                    animate={{ opacity: 1, rotateY: 0, scale: zoom }}
                    exit={
                      reduced
                        ? undefined
                        : {
                            opacity: 0,
                            rotateY: side === "tiro" ? 72 : -72,
                            scale: 0.92,
                          }
                    }
                    transition={{ duration: reduced ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="brochure-sheet relative w-full origin-center"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="overflow-hidden rounded-xl border border-white/12 shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
                      <Image
                        src={current.src}
                        alt={current.alt}
                        width={1600}
                        height={1131}
                        className="h-auto w-full"
                        priority
                        sizes="(max-width:1024px) 100vw, 896px"
                      />
                    </div>
                    <motion.div
                      className="pointer-events-none absolute -inset-3 rounded-2xl bg-brand-blue/10 blur-2xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.6 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-white/10 px-4 py-3 sm:px-5">
              <button
                type="button"
                onClick={() => flipTo("tiro")}
                disabled={side === "tiro"}
                className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 font-sans text-xs font-medium text-sand/80 transition hover:text-white disabled:opacity-40"
              >
                <ChevronLeft size={16} />
                Tiro
              </button>
              <p className="text-center font-sans text-xs text-sand/60">
                Usa las flechas ← → o voltea para ver ambas caras
              </p>
              <button
                type="button"
                onClick={() => flipTo("retiro")}
                disabled={side === "retiro"}
                className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 font-sans text-xs font-medium text-sand/80 transition hover:text-white disabled:opacity-40"
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
  const openBrochure = useCallback(() => setOpen(true), []);
  const closeBrochure = useCallback(() => setOpen(false), []);

  return (
    <>
      <button
        type="button"
        onClick={openBrochure}
        className="group relative w-full overflow-hidden rounded-2xl border border-brand-blue/25 bg-gradient-to-br from-brand-blue/10 via-surface to-brand-blue/5 p-0 text-left transition duration-500 hover:border-brand-blue/45 hover:shadow-glow-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/50"
      >
        <div className="grid sm:grid-cols-[1fr_1.4fr]">
          <div className="flex flex-col justify-center gap-3 p-5 sm:p-6">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-brand-blue/15 px-3 py-1 font-accent text-[10px] uppercase tracking-wider text-brand-blue">
              <BookOpen size={12} />
              Material oficial
            </span>
            <h3 className="font-display text-xl font-bold text-fg sm:text-2xl">
              {BROCHURE.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted-fg">{BROCHURE.subtitle}</p>
            <span className="mt-1 inline-flex w-fit items-center gap-2 rounded-full bg-brand-gradient px-4 py-2 font-sans text-sm font-semibold text-night transition group-hover:opacity-90">
              Ver tríptico interactivo
              <RotateCw size={15} className="transition duration-500 group-hover:rotate-180" />
            </span>
          </div>
          <div className="relative min-h-[160px] overflow-hidden sm:min-h-[200px]">
            <Image
              src={BROCHURE.tiro.src}
              alt="Vista previa del tríptico Ruta Costera de Ovalle"
              fill
              className="object-cover object-left transition duration-700 group-hover:scale-[1.03]"
              sizes="(max-width:640px) 100vw, 420px"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/20 to-transparent sm:from-surface/90" />
            <div className="absolute bottom-3 right-3 rounded-full border border-white/20 bg-night/60 px-3 py-1 font-accent text-[9px] uppercase tracking-wider text-sand/90 backdrop-blur-sm">
              Tiro · Retiro
            </div>
          </div>
        </div>
      </button>

      <BrochureModal open={open} onClose={closeBrochure} />
    </>
  );
}
