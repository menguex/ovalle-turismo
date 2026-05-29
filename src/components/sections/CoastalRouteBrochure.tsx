"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Download,
  Loader2,
  Maximize2,
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

type BrochureSection = {
  id: string;
  label: string;
  col: number;
  row: number;
  cols: number;
  rows: number;
};

const TIRO_SECTIONS: BrochureSection[] = [
  { id: "tiro-sierra-talca", label: "Sierra y Talca", col: 0, row: 0, cols: 3, rows: 1 },
  { id: "tiro-centro", label: "Centro · QR", col: 1, row: 0, cols: 3, rows: 1 },
  { id: "tiro-portada", label: "Portada", col: 2, row: 0, cols: 3, rows: 1 },
];

const RETIRO_SECTIONS: BrochureSection[] = [
  { id: "ret-el-sauce", label: "El Sauce", col: 0, row: 0, cols: 3, rows: 2 },
  { id: "ret-el-toro", label: "El Toro", col: 1, row: 0, cols: 3, rows: 2 },
  { id: "ret-totoral", label: "Totoral", col: 2, row: 0, cols: 3, rows: 2 },
  { id: "ret-talcaruca", label: "Talcaruca", col: 0, row: 1, cols: 3, rows: 2 },
  { id: "ret-la-cebada", label: "La Cebada", col: 1, row: 1, cols: 3, rows: 2 },
  { id: "ret-talquilla", label: "Talquilla", col: 2, row: 1, cols: 3, rows: 2 },
];

const PANEL_EASE = [0.22, 1, 0.36, 1] as const;
const ZOOM_MIN = 1;
const ZOOM_MAX_FULL = 2;
const ZOOM_MAX_SECTION = 2;
const ZOOM_STEP = 0.25;

function sectionNativeSize(section: BrochureSection) {
  return {
    width: BROCHURE_W / section.cols,
    height: BROCHURE_H / section.rows,
  };
}

function nativeDisplayWidth(
  containerWidth: number,
  nativeWidth: number,
  zoom: number,
  zoomMax: number
) {
  if (!containerWidth) return nativeWidth;
  const fitWidth = Math.min(containerWidth, nativeWidth);
  if (nativeWidth <= fitWidth || zoomMax <= ZOOM_MIN) return nativeWidth;
  const t = (zoom - ZOOM_MIN) / (zoomMax - ZOOM_MIN);
  return Math.min(
    nativeWidth,
    Math.round(fitWidth + t * (nativeWidth - fitWidth))
  );
}

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

function BrochureFullPliego({
  src,
  alt,
  side,
  onSectionClick,
  onLoad,
}: {
  src: string;
  alt: string;
  side: BrochureSide;
  onSectionClick: (id: string) => void;
  onLoad?: () => void;
}) {
  const sections = side === "tiro" ? TIRO_SECTIONS : RETIRO_SECTIONS;
  const gridCols = side === "tiro" ? 3 : 3;
  const gridRows = side === "tiro" ? 1 : 2;

  return (
    <div
      className="relative overflow-hidden rounded-xl border border-white/15 bg-white shadow-2xl"
      style={{ aspectRatio: `${BROCHURE_W} / ${BROCHURE_H}` }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={BROCHURE_W}
        height={BROCHURE_H}
        draggable={false}
        decoding="sync"
        loading="eager"
        onLoad={onLoad}
        className="brochure-crisp block h-auto w-full select-none"
      />

      <div
        className="absolute inset-0 grid"
        style={{ gridTemplateColumns: `repeat(${gridCols}, 1fr)`, gridTemplateRows: `repeat(${gridRows}, 1fr)` }}
      >
        {sections.map((section) => (
          <button
            key={section.id}
            type="button"
            onClick={() => onSectionClick(section.id)}
            className="group relative border border-transparent transition hover:border-brand-yellow/50 hover:bg-brand-yellow/10 focus:outline-none focus-visible:border-brand-yellow/60 focus-visible:bg-brand-yellow/10"
            aria-label={`Ampliar sección: ${section.label}`}
            title={section.label}
          >
            <span className="pointer-events-none absolute bottom-2 left-2 right-2 rounded-md bg-night/70 px-2 py-1 font-accent text-[8px] uppercase tracking-wider text-sand/90 opacity-0 backdrop-blur-sm transition group-hover:opacity-100 group-focus-visible:opacity-100 sm:text-[9px]">
              {section.label}
            </span>
          </button>
        ))}
      </div>

      {side === "tiro" && (
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-y-0 left-[33.333%] w-px bg-white/40" />
          <div className="absolute inset-y-0 left-[66.666%] w-px bg-white/40" />
        </div>
      )}
    </div>
  );
}

function sectionCropMetrics(section: BrochureSection, displayWidth: number) {
  const srcPanelW = BROCHURE_W / section.cols;
  const srcPanelH = BROCHURE_H / section.rows;
  const scale = displayWidth / srcPanelW;
  return {
    displayHeight: Math.round((displayWidth * srcPanelH) / srcPanelW),
    imgW: Math.round(BROCHURE_W * scale),
    imgH: Math.round(BROCHURE_H * scale),
    left: Math.round(-section.col * srcPanelW * scale),
    top: Math.round(-section.row * srcPanelH * scale),
  };
}

function BrochureSectionZoom({
  src,
  alt,
  section,
  displayWidth,
  onLoad,
}: {
  src: string;
  alt: string;
  section: BrochureSection;
  displayWidth: number;
  onLoad?: () => void;
}) {
  const { width: panelW, height: panelH } = sectionNativeSize(section);
  const crop = displayWidth > 0 ? sectionCropMetrics(section, displayWidth) : null;

  return (
    <div
      className="relative overflow-hidden rounded-xl border border-brand-yellow/30 bg-white shadow-2xl ring-1 ring-brand-yellow/20"
      style={
        crop
          ? { width: displayWidth, height: crop.displayHeight }
          : { aspectRatio: `${panelW} / ${panelH}` }
      }
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={`${alt} — ${section.label}`}
        width={BROCHURE_W}
        height={BROCHURE_H}
        draggable={false}
        decoding="sync"
        loading="eager"
        onLoad={onLoad}
        className="brochure-crisp absolute max-w-none select-none"
        style={
          crop
            ? {
                width: crop.imgW,
                height: crop.imgH,
                left: crop.left,
                top: crop.top,
              }
            : {
                width: `${section.cols * 100}%`,
                height: `${section.rows * 100}%`,
                left: `${-section.col * 100}%`,
                top: `${-section.row * 100}%`,
              }
        }
      />
    </div>
  );
}

function BrochureZoomViewport({
  nativeWidth,
  zoom,
  zoomMax,
  children,
}: {
  nativeWidth: number;
  zoom: number;
  zoomMax: number;
  children: (displayWidth: number) => React.ReactNode;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const measure = () => setContainerWidth(el.clientWidth);
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const displayWidth = nativeDisplayWidth(containerWidth, nativeWidth, zoom, zoomMax);

  return (
    <div ref={scrollRef} className="brochure-zoom-scroll overflow-x-auto overflow-y-visible pb-2">
      <div
        className="brochure-zoom-inner mx-auto transition-[width] duration-200"
        style={{
          width: displayWidth,
          maxWidth: nativeWidth,
        }}
      >
        {children(displayWidth)}
      </div>
    </div>
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
  const [focusSectionId, setFocusSectionId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [loading, setLoading] = useState(true);

  const sections = side === "tiro" ? TIRO_SECTIONS : RETIRO_SECTIONS;
  const focusSection = sections.find((s) => s.id === focusSectionId) ?? null;
  const isPliego = focusSection === null;
  const zoomMax = isPliego ? ZOOM_MAX_FULL : ZOOM_MAX_SECTION;
  const nativeViewWidth = isPliego
    ? BROCHURE_W
    : focusSection
      ? sectionNativeSize(focusSection).width
      : BROCHURE_W;

  const goTo = useCallback((next: BrochureSide) => {
    setSide(next);
    setFocusSectionId(null);
    setZoom(1);
    setLoading(true);
  }, []);

  const selectSection = useCallback((id: string | null) => {
    setFocusSectionId(id);
    setZoom(1);
    setLoading(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    setSide(initialSide);
    setFocusSectionId(null);
    setZoom(1);
    setLoading(true);

    [BROCHURE.tiro.src, BROCHURE.retiro.src].forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, [open, initialSide]);

  useEffect(() => {
    if (!open) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (focusSectionId) selectSection(null);
        else onClose();
      }
      if (e.key === "ArrowLeft") goTo("tiro");
      if (e.key === "ArrowRight") goTo("retiro");
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, goTo, focusSectionId, selectSection]);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    const img = new window.Image();
    img.onload = () => setLoading(false);
    img.onerror = () => setLoading(false);
    img.src = BROCHURE[side].src;
  }, [open, side, focusSectionId]);

  const current = BROCHURE[side];

  const viewLabel = useMemo(() => {
    if (isPliego) return "Pliego completo";
    return focusSection?.label ?? "Sección";
  }, [isPliego, focusSection]);

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
                <div className="min-w-0">
                  <p className="font-accent text-[10px] uppercase tracking-wider text-brand-yellow">
                    Tríptico imprimible · {viewLabel}
                  </p>
                  <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
                    {BROCHURE.title}
                  </h2>
                  <p className="mt-1 text-sm text-sand/75">{current.hint}</p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="shrink-0 rounded-full border border-white/15 p-2.5 text-sand/90 hover:bg-white/10"
                  aria-label="Cerrar"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2">
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

                {!isPliego && (
                  <button
                    type="button"
                    onClick={() => selectSection(null)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-brand-blue/40 bg-brand-blue/10 px-3 py-1.5 font-sans text-xs font-medium text-brand-blue"
                  >
                    <Maximize2 size={13} />
                    Volver al pliego
                  </button>
                )}
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => selectSection(null)}
                  className={cn(
                    "rounded-full px-3 py-1 font-accent text-[9px] uppercase tracking-wider transition sm:text-[10px]",
                    isPliego
                      ? "bg-white/15 text-white"
                      : "bg-white/5 text-sand/65 hover:bg-white/10 hover:text-white"
                  )}
                >
                  Pliego completo
                </button>
                {sections.map((section) => (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => selectSection(section.id)}
                    className={cn(
                      "rounded-full px-3 py-1 font-accent text-[9px] uppercase tracking-wider transition sm:text-[10px]",
                      focusSectionId === section.id
                        ? "bg-brand-yellow/20 text-brand-yellow"
                        : "bg-white/5 text-sand/65 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    {section.label}
                  </button>
                ))}
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-1">
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
                  onClick={() => setZoom((z) => Math.min(zoomMax, z + ZOOM_STEP))}
                  disabled={zoom >= zoomMax}
                  className="rounded-full p-2 text-sand/75 hover:bg-white/10 disabled:opacity-30"
                  aria-label="Acercar"
                >
                  <ZoomIn size={16} />
                </button>
                <a
                  href={current.src}
                  download={`ruta-costera-ovalle-${side}.jpg`}
                  className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 font-sans text-xs font-medium text-sand/85 hover:text-white"
                >
                  <Download size={14} />
                  Descargar pliego
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

            <div className="relative min-h-0 flex-1 overflow-auto px-4 py-4 sm:px-6 sm:py-5">
              {loading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#0c1524]/85">
                  <div className="flex items-center gap-2 text-sm text-sand/80">
                    <Loader2 size={18} className="animate-spin text-brand-yellow" />
                    Cargando…
                  </div>
                </div>
              )}

              <BrochureZoomViewport
                nativeWidth={nativeViewWidth}
                zoom={zoom}
                zoomMax={zoomMax}
              >
                {(displayWidth) => (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${side}-${focusSectionId ?? "pliego"}`}
                      initial={reduced ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduced ? undefined : { opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                    >
                      {isPliego ? (
                        <BrochureFullPliego
                          src={current.src}
                          alt={current.alt}
                          side={side}
                          onSectionClick={selectSection}
                          onLoad={() => setLoading(false)}
                        />
                      ) : focusSection ? (
                        <BrochureSectionZoom
                          src={current.src}
                          alt={current.alt}
                          section={focusSection}
                          displayWidth={displayWidth}
                          onLoad={() => setLoading(false)}
                        />
                      ) : null}
                    </motion.div>
                  </AnimatePresence>
                )}
              </BrochureZoomViewport>

              <p className="mt-4 text-center text-xs leading-relaxed text-sand/55">
                {isPliego
                  ? "Haz clic en cualquier panel del pliego para ampliarlo. El zoom llega hasta la resolución nativa del archivo (1024 px) sin pixelar."
                  : `Vista ampliada: ${focusSection?.label}. Zoom hasta resolución nativa del panel (~${Math.round(nativeViewWidth)} px). Esc para volver al pliego.`}
              </p>
              {isPliego && (
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
              )}
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
              <span className="text-xs text-sand/50">← → cara · Esc pliego/cerrar</span>
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

function TriptychFoldOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <div className="absolute inset-y-0 left-[33.333%] w-px bg-white/35" />
      <div className="absolute inset-y-0 left-[66.666%] w-px bg-white/35" />
      <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-black/10" />
    </div>
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
              <li>· Pliego completo tiro y retiro, con zoom por cada panel</li>
              <li>· Descarga o imprime desde el navegador</li>
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={BROCHURE.tiro.src}
                alt="Vista previa del tríptico Ruta Costera de Ovalle"
                width={BROCHURE_W}
                height={BROCHURE_H}
                className="brochure-crisp block h-auto w-full"
                draggable={false}
              />
              <TriptychFoldOverlay />
              <span className="absolute bottom-3 left-3 rounded-full bg-night/75 px-3 py-1 font-accent text-[9px] uppercase tracking-wider text-sand/90 backdrop-blur-sm">
                Clic para abrir · zoom por panel
              </span>
            </motion.div>
          </button>
        </div>
      </div>

      <BrochureModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
