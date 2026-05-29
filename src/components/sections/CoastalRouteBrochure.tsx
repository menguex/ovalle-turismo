"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Download,
  Loader2,
  Printer,
  Sparkles,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const BROCHURE_W = 1024;
const BROCHURE_H = 667;

const BROCHURE = {
  title: "Ruta Costera de Ovalle",
  subtitle: "Tríptico oficial del litoral de Ovalle — tiro y retiro",
  description:
    "Material desplegable de 3 paneles con las caletas artesanales de la comuna. Puedes verlo aquí, descargarlo o imprimirlo tal como lo entrega la Oficina de Turismo.",
  tiro: {
    src: "/brochures/ruta-costera-tiro.png",
    alt: "Tríptico Ruta Costera de Ovalle — tiro (exterior)",
    label: "Tiro",
    hint: "Cara exterior: portada, caletas Sierra y Talca, QR informativo",
  },
  retiro: {
    src: "/brochures/ruta-costera-retiro.png",
    alt: "Tríptico Ruta Costera de Ovalle — retiro (interior)",
    label: "Retiro",
    hint: "Cara interior: 6 caletas artesanales del borde costero de Ovalle",
  },
} as const;

type BrochureSide = "tiro" | "retiro";

const PANEL_EASE = [0.22, 1, 0.36, 1] as const;
const ZOOM_MIN = 1;
const ZOOM_MAX = 2;
const ZOOM_STEP = 0.2;

function printBrochure(which: "both" | BrochureSide) {
  const pages =
    which === "both"
      ? [
          { src: BROCHURE.tiro.src, label: "Tiro — exterior" },
          { src: BROCHURE.retiro.src, label: "Retiro — interior" },
        ]
      : [{ src: BROCHURE[which].src, label: BROCHURE[which].label }];

  const win = window.open("", "_blank", "noopener,noreferrer");
  if (!win) return;

  const origin = window.location.origin;
  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <title>Tríptico — Ruta Costera de Ovalle</title>
  <style>
    * { box-sizing: border-box; }
    @page { size: landscape; margin: 10mm; }
    body { margin: 0; font-family: system-ui, sans-serif; color: #111; }
    header { text-align: center; padding: 8mm 0 4mm; }
    h1 { font-size: 14pt; margin: 0 0 4px; }
    p { font-size: 10pt; margin: 0; color: #444; }
    .sheet { page-break-after: always; padding: 0 0 6mm; }
    .sheet:last-child { page-break-after: auto; }
    .sheet h2 { font-size: 11pt; margin: 0 0 6px; text-align: center; font-weight: 600; }
    img { display: block; width: 100%; height: auto; max-height: 170mm; object-fit: contain; margin: 0 auto; }
    @media screen {
      body { padding: 24px; background: #eee; }
      .sheet { background: #fff; margin: 0 auto 24px; max-width: 1100px; padding: 16px; box-shadow: 0 4px 24px rgba(0,0,0,.12); }
    }
  </style>
</head>
<body>
  <header>
    <h1>Tríptico — Ruta Costera de Ovalle</h1>
    <p>Ovalle Turismo · Imprime en hoja tamaño carta u oficio, orientación horizontal</p>
  </header>
  ${pages
    .map(
      (p) => `
  <section class="sheet">
    <h2>${p.label}</h2>
    <img src="${origin}${p.src}" alt="${p.label}" width="${BROCHURE_W}" height="${BROCHURE_H}" />
  </section>`
    )
    .join("")}
  <script>
    window.onload = function() {
      setTimeout(function() { window.focus(); window.print(); }, 400);
    };
  </script>
</body>
</html>`;

  win.document.open();
  win.document.write(html);
  win.document.close();
}

function BrochureSheet({
  src,
  alt,
  className,
  onLoad,
}: {
  src: string;
  alt: string;
  className?: string;
  onLoad?: () => void;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={BROCHURE_W}
      height={BROCHURE_H}
      draggable={false}
      decoding="sync"
      loading="eager"
      fetchPriority="high"
      onLoad={onLoad}
      className={cn("brochure-crisp h-auto w-full select-none", className)}
    />
  );
}

/** Líneas de pliegue sobre la miniatura — sin recortar la imagen */
function TriptychFoldOverlay({ panels = 3 }: { panels?: number }) {
  if (panels === 3) {
    return (
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-y-0 left-[33.333%] w-px bg-white/35 shadow-[1px_0_0_rgba(0,0,0,0.15)]" />
        <div className="absolute inset-y-0 left-[66.666%] w-px bg-white/35 shadow-[1px_0_0_rgba(0,0,0,0.15)]" />
        <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-black/10" />
      </div>
    );
  }
  return null;
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
  const [zoom, setZoom] = useState(1);
  const [loading, setLoading] = useState(true);

  const goTo = useCallback((next: BrochureSide) => {
    setSide(next);
    setZoom(1);
    setLoading(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    setSide(initialSide);
    setZoom(1);
    setLoading(true);

    [BROCHURE.tiro.src, BROCHURE.retiro.src].forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });

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

  const current = BROCHURE[side];

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[120] flex items-end justify-center sm:items-center sm:p-5">
          <motion.button
            type="button"
            aria-label="Cerrar tríptico"
            className="absolute inset-0 bg-night/85 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={BROCHURE.title}
            className="relative z-10 flex max-h-[96vh] w-full max-w-5xl flex-col overflow-hidden rounded-t-[2rem] border border-white/10 bg-[#0c1524] shadow-2xl sm:rounded-[2rem]"
            initial={reduced ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: 24 }}
            transition={{ duration: reduced ? 0 : 0.4, ease: PANEL_EASE }}
          >
            <div className="border-b border-white/10 px-4 py-4 sm:px-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-accent text-[10px] uppercase tracking-wider text-brand-yellow">
                    Tríptico imprimible · 3 paneles
                  </p>
                  <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
                    {BROCHURE.title}
                  </h2>
                  <p className="mt-1 text-sm text-sand/75">{current.hint}</p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full border border-white/15 p-2.5 text-sand/90 hover:bg-white/10"
                  aria-label="Cerrar"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <div className="inline-flex rounded-full border border-white/12 bg-black/30 p-1">
                  {(["tiro", "retiro"] as const).map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => goTo(key)}
                      className={cn(
                        "rounded-full px-4 py-1.5 font-accent text-[10px] uppercase tracking-wider transition",
                        side === key
                          ? "bg-brand-gradient text-night"
                          : "text-sand/70 hover:text-white"
                      )}
                    >
                      {BROCHURE[key].label}
                    </button>
                  ))}
                </div>

                <div className="ml-auto flex flex-wrap items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setZoom((z) => Math.max(ZOOM_MIN, z - ZOOM_STEP))}
                    disabled={zoom <= ZOOM_MIN}
                    className="rounded-full p-2 text-sand/75 hover:bg-white/10 disabled:opacity-30"
                    aria-label="Alejar"
                  >
                    <ZoomOut size={16} />
                  </button>
                  <span className="min-w-[3rem] text-center font-mono text-xs text-sand/60">
                    {Math.round(zoom * 100)}%
                  </span>
                  <button
                    type="button"
                    onClick={() => setZoom((z) => Math.min(ZOOM_MAX, z + ZOOM_STEP))}
                    disabled={zoom >= ZOOM_MAX}
                    className="rounded-full p-2 text-sand/75 hover:bg-white/10 disabled:opacity-30"
                    aria-label="Acercar"
                  >
                    <ZoomIn size={16} />
                  </button>
                  <a
                    href={current.src}
                    download={`ruta-costera-ovalle-${side}.jpg`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 font-sans text-xs font-medium text-sand/85 hover:text-white"
                  >
                    <Download size={14} />
                    Descargar
                  </a>
                  <button
                    type="button"
                    onClick={() => printBrochure(side)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-brand-gradient px-3 py-1.5 font-sans text-xs font-semibold text-night"
                  >
                    <Printer size={14} />
                    Imprimir
                  </button>
                </div>
              </div>
            </div>

            <div className="relative min-h-0 flex-1 overflow-auto px-4 py-5 sm:px-6">
              {loading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#0c1524]/80">
                  <div className="flex items-center gap-2 text-sm text-sand/80">
                    <Loader2 size={18} className="animate-spin text-brand-yellow" />
                    Cargando tríptico…
                  </div>
                </div>
              )}

              <div className="brochure-zoom-scroll overflow-x-auto overflow-y-visible pb-2">
                <div
                  className="mx-auto transition-[width] duration-200"
                  style={{ width: `${zoom * 100}%`, minWidth: "100%" }}
                >
                <div
                  className="relative overflow-hidden rounded-xl border border-white/15 bg-white shadow-2xl"
                  style={{ aspectRatio: `${BROCHURE_W} / ${BROCHURE_H}` }}
                >
                  <BrochureSheet
                    key={side}
                    src={current.src}
                    alt={current.alt}
                    onLoad={() => setLoading(false)}
                  />
                  <TriptychFoldOverlay panels={3} />
                </div>
              </div>
              </div>

              <p className="mt-4 text-center text-xs leading-relaxed text-sand/55">
                Pliego completo del tríptico ({current.label}). Para imprimir en casa, usa orientación
                horizontal y papel carta u oficio. También puedes imprimir tiro y retiro juntos.
              </p>
              <div className="mt-3 flex justify-center">
                <button
                  type="button"
                  onClick={() => printBrochure("both")}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 font-sans text-xs font-medium text-sand/85 hover:border-brand-yellow/40 hover:text-white"
                >
                  <Printer size={14} />
                  Imprimir tiro y retiro
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-white/10 px-4 py-3 sm:px-6">
              <button
                type="button"
                onClick={() => goTo("tiro")}
                disabled={side === "tiro"}
                className="inline-flex items-center gap-1 text-xs text-sand/75 disabled:opacity-35"
              >
                <ChevronLeft size={16} />
                Tiro
              </button>
              <span className="text-xs text-sand/50">← → para cambiar cara</span>
              <button
                type="button"
                onClick={() => goTo("retiro")}
                disabled={side === "retiro"}
                className="inline-flex items-center gap-1 text-xs text-sand/75 disabled:opacity-35"
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

  return (
    <>
      <div className="overflow-hidden rounded-[1.75rem] border border-brand-blue/25 bg-gradient-to-br from-[#0c1a2e]/5 via-surface to-brand-blue/5 shadow-card">
        <div className="grid lg:grid-cols-[1fr_1.15fr]">
          <div className="flex flex-col justify-center gap-4 p-6 sm:p-8">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-blue/25 bg-brand-blue/10 px-3 py-1 font-accent text-[10px] uppercase tracking-wider text-brand-blue">
              <BookOpen size={12} />
              Tríptico · Tiro y retiro
            </span>
            <div>
              <h3 className="font-display text-2xl font-bold text-fg sm:text-3xl">{BROCHURE.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-fg">{BROCHURE.description}</p>
            </div>
            <ul className="space-y-1.5 text-xs text-muted-fg">
              <li>· 3 paneles desplegables con las caletas del borde costero</li>
              <li>· Descarga el archivo original o imprímelo desde el navegador</li>
            </ul>
            <div className="flex flex-wrap gap-2 pt-1">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-5 py-2.5 font-sans text-sm font-semibold text-night shadow-glow transition hover:opacity-95"
              >
                <Sparkles size={15} />
                Ver tríptico
              </button>
              <a
                href={BROCHURE.tiro.src}
                download="ruta-costera-ovalle-tiro.jpg"
                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2.5 font-sans text-sm font-medium text-fg transition hover:border-brand-blue/40"
              >
                <Download size={15} />
                Descargar
              </a>
              <button
                type="button"
                onClick={() => printBrochure("both")}
                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2.5 font-sans text-sm font-medium text-fg transition hover:border-brand-blue/40"
              >
                <Printer size={15} />
                Imprimir
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="group relative min-h-[220px] border-t border-brand-blue/10 p-4 text-left lg:border-l lg:border-t-0 lg:p-6"
            aria-label="Abrir tríptico Ruta Costera de Ovalle"
          >
            <motion.div
              whileHover={reduced ? undefined : { scale: 1.01 }}
              transition={{ duration: 0.35, ease: PANEL_EASE }}
              className="relative h-full min-h-[180px] overflow-hidden rounded-xl border border-white/15 bg-[#0a1628] shadow-inner"
              style={{ aspectRatio: `${BROCHURE_W} / ${BROCHURE_H}` }}
            >
              <BrochureSheet
                src={BROCHURE.tiro.src}
                alt="Vista previa del tríptico Ruta Costera de Ovalle"
                className="h-full w-full object-contain"
              />
              <TriptychFoldOverlay panels={3} />
              <div className="absolute inset-0 bg-gradient-to-t from-night/50 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
              <span className="absolute bottom-3 left-3 rounded-full bg-night/75 px-3 py-1 font-accent text-[9px] uppercase tracking-wider text-sand/90 backdrop-blur-sm">
                Clic para abrir
              </span>
            </motion.div>
          </button>
        </div>
      </div>

      <BrochureModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
