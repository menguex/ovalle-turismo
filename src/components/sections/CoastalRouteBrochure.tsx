"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Maximize2,
  Printer,
  Sparkles,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const BROCHURE_DIMS = {
  tiro: { width: 3897, height: 2540 },
  retiro: { width: 3897, height: 2540 },
} as const;

const BROCHURE = {
  title: "Ruta Costera de Ovalle",
  subtitle: "Tríptico oficial del litoral de Ovalle — tiro y retiro",
  description:
    "Material desplegable de 3 paneles con las caletas artesanales de la comuna. Puedes verlo aquí o imprimirlo tal como lo entrega la Oficina de Turismo.",
  tiro: {
    src: "/brochures/ruta-costera-tiro.png",
    thumbSrc: "/brochures/ruta-costera-tiro-thumb.jpg",
    alt: "Tríptico Ruta Costera de Ovalle — tiro (exterior)",
    label: "Tiro",
    hint: "Cara exterior: Sierra y Talca, centro con QR y portada",
  },
  retiro: {
    src: "/brochures/ruta-costera-retiro.png",
    thumbSrc: "/brochures/ruta-costera-retiro-thumb.jpg",
    alt: "Tríptico Ruta Costera de Ovalle — retiro (interior)",
    label: "Retiro",
    hint: "Cara interior: 6 caletas artesanales del borde costero de Ovalle",
  },
} as const;

function brochureDims(side: BrochureSide) {
  return BROCHURE_DIMS[side];
}

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
const ZOOM_MAX_SECTION = 2.5;
const ZOOM_STEP = 0.25;

function sectionNativeSize(section: BrochureSection, side: BrochureSide) {
  const { width, height } = brochureDims(side);
  return {
    width: width / section.cols,
    height: height / section.rows,
  };
}

function isImageCached(src: string) {
  if (typeof window === "undefined") return false;
  const img = new window.Image();
  img.src = src;
  return img.complete && img.naturalWidth > 0;
}

function preloadBrochureImages() {
  (["tiro", "retiro"] as const).forEach((key) => {
    const img = new window.Image();
    img.src = BROCHURE[key].src;
  });
}

function computeDisplayWidth(
  containerWidth: number,
  containerHeight: number,
  nativeWidth: number,
  nativeHeight: number,
  zoom: number,
  zoomMax: number,
  fitInView: boolean
) {
  if (!containerWidth) return nativeWidth;

  let fitWidth = Math.min(containerWidth, nativeWidth);
  if (fitInView && containerHeight > 0 && nativeHeight > 0) {
    const inset = 12;
    const widthFromHeight =
      (Math.max(1, containerHeight - inset) * nativeWidth) / nativeHeight;
    fitWidth = Math.min(fitWidth, widthFromHeight);
  }

  fitWidth = Math.max(1, Math.floor(fitWidth));

  if (nativeWidth <= fitWidth || zoomMax <= ZOOM_MIN) {
    return Math.min(nativeWidth, fitWidth);
  }

  const t = (zoom - ZOOM_MIN) / (zoomMax - ZOOM_MIN);
  return Math.min(nativeWidth, Math.round(fitWidth + t * (nativeWidth - fitWidth)));
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
    .map((p) => {
      const side = p.src.includes("tiro") ? "tiro" : "retiro";
      const { width, height } = BROCHURE_DIMS[side as BrochureSide];
      return `
  <section class="sheet">
    <h2>${p.label}</h2>
    <img src="${origin}${p.src}" alt="${p.label}" width="${width}" height="${height}" />
  </section>`;
    })
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
  displayWidth,
  onSectionClick,
  onLoad,
}: {
  src: string;
  alt: string;
  side: BrochureSide;
  displayWidth: number;
  onSectionClick: (id: string) => void;
  onLoad?: () => void;
}) {
  const sections = side === "tiro" ? TIRO_SECTIONS : RETIRO_SECTIONS;
  const gridCols = 3;
  const gridRows = side === "tiro" ? 1 : 2;
  const { width: sheetW, height: sheetH } = brochureDims(side);
  const renderWidth = displayWidth > 0 ? displayWidth : sheetW;
  const renderHeight = Math.floor((renderWidth * sheetH) / sheetW);

  return (
    <div
      className="relative overflow-hidden rounded-xl border border-white/15 bg-white shadow-2xl"
      style={{ width: renderWidth, height: renderHeight }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={sheetW}
        height={sheetH}
        draggable={false}
        decoding="sync"
        loading="eager"
        fetchPriority="high"
        onLoad={onLoad}
        className="brochure-crisp block max-w-none select-none"
        style={{ width: renderWidth, height: renderHeight }}
      />

      <div
        className="absolute inset-0 grid"
        style={{
          gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
          gridTemplateRows: `repeat(${gridRows}, 1fr)`,
        }}
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

      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-y-0 left-[33.333%] w-px bg-white/40" />
        <div className="absolute inset-y-0 left-[66.666%] w-px bg-white/40" />
        {side === "retiro" && (
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/40" />
        )}
      </div>
    </div>
  );
}

function sectionCropMetrics(
  section: BrochureSection,
  displayWidth: number,
  sheetW: number,
  sheetH: number
) {
  const srcPanelW = sheetW / section.cols;
  const srcPanelH = sheetH / section.rows;
  const scale = displayWidth / srcPanelW;
  return {
    displayHeight: Math.floor((displayWidth * srcPanelH) / srcPanelW),
    imgW: Math.floor(sheetW * scale),
    imgH: Math.floor(sheetH * scale),
    left: Math.floor(-section.col * srcPanelW * scale),
    top: Math.floor(-section.row * srcPanelH * scale),
  };
}

function BrochureSectionZoom({
  src,
  alt,
  side,
  section,
  displayWidth,
  onLoad,
}: {
  src: string;
  alt: string;
  side: BrochureSide;
  section: BrochureSection;
  displayWidth: number;
  onLoad?: () => void;
}) {
  const { width: sheetW, height: sheetH } = brochureDims(side);
  const { width: panelW, height: panelH } = sectionNativeSize(section, side);
  const crop =
    displayWidth > 0 ? sectionCropMetrics(section, displayWidth, sheetW, sheetH) : null;

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
        width={sheetW}
        height={sheetH}
        draggable={false}
        decoding="sync"
        loading="eager"
        fetchPriority="high"
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
  nativeHeight,
  zoom,
  zoomMax,
  resetKey,
  fitInView = false,
  children,
}: {
  nativeWidth: number;
  nativeHeight: number;
  zoom: number;
  zoomMax: number;
  resetKey: string;
  fitInView?: boolean;
  children: (displayWidth: number) => React.ReactNode;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const panOrigin = useRef({ x: 0, y: 0, scrollLeft: 0, scrollTop: 0 });
  const panActiveRef = useRef(false);
  const canPanRef = useRef(false);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [canPan, setCanPan] = useState(false);
  const [isPanning, setIsPanning] = useState(false);

  const displayWidth = computeDisplayWidth(
    containerSize.width,
    containerSize.height,
    nativeWidth,
    nativeHeight,
    zoom,
    zoomMax,
    fitInView
  );
  const displayHeight =
    displayWidth > 0 && nativeWidth > 0
      ? Math.floor((displayWidth * nativeHeight) / nativeWidth)
      : 0;

  const updateCanPan = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const overflowX = el.scrollWidth - el.clientWidth > 2;
    const overflowY = el.scrollHeight - el.clientHeight > 2;
    const next = overflowX || overflowY;
    canPanRef.current = next;
    setCanPan(next);
  }, []);

  const centerScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    requestAnimationFrame(() => {
      el.scrollLeft = Math.max(0, (el.scrollWidth - el.clientWidth) / 2);
      el.scrollTop = Math.max(0, (el.scrollHeight - el.clientHeight) / 2);
      updateCanPan();
    });
  }, [updateCanPan]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const measure = () =>
      setContainerSize({ width: el.clientWidth, height: el.clientHeight });
    measure();

    const ro = new ResizeObserver(() => {
      measure();
      updateCanPan();
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [updateCanPan]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollLeft = 0;
    el.scrollTop = 0;
    requestAnimationFrame(updateCanPan);
  }, [resetKey, updateCanPan]);

  useEffect(() => {
    if (zoom > ZOOM_MIN + 0.01) centerScroll();
    else {
      const el = scrollRef.current;
      if (el) {
        el.scrollLeft = 0;
        el.scrollTop = 0;
      }
      updateCanPan();
    }
  }, [zoom, displayWidth, displayHeight, centerScroll, updateCanPan]);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.button !== 0) return;
      if (!canPanRef.current && zoom <= ZOOM_MIN) return;
      const el = scrollRef.current;
      if (!el) return;
      panActiveRef.current = true;
      setIsPanning(true);
      panOrigin.current = {
        x: e.clientX,
        y: e.clientY,
        scrollLeft: el.scrollLeft,
        scrollTop: el.scrollTop,
      };
      el.setPointerCapture(e.pointerId);
    },
    [zoom]
  );

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!panActiveRef.current) return;
    const el = scrollRef.current;
    if (!el) return;
    el.scrollLeft = panOrigin.current.scrollLeft - (e.clientX - panOrigin.current.x);
    el.scrollTop = panOrigin.current.scrollTop - (e.clientY - panOrigin.current.y);
  }, []);

  const endPan = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!panActiveRef.current) return;
    panActiveRef.current = false;
    setIsPanning(false);
    scrollRef.current?.releasePointerCapture(e.pointerId);
    updateCanPan();
  }, [updateCanPan]);

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col gap-2">
      <div
        ref={scrollRef}
        className={cn(
          "brochure-zoom-scroll w-full min-h-0 flex-1 overflow-auto rounded-xl border border-white/10 bg-black/20",
          canPan && "brochure-zoom-scroll--pan",
          isPanning && "brochure-zoom-scroll--panning"
        )}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endPan}
        onPointerCancel={endPan}
        onScroll={updateCanPan}
      >
        <div
          className="flex min-h-full min-w-full items-center justify-center p-2"
          style={{
            minWidth: Math.max(containerSize.width, displayWidth),
            minHeight: Math.max(containerSize.height, displayHeight),
          }}
        >
          <div
            className="brochure-zoom-inner shrink-0"
            style={{
              width: displayWidth,
              height: displayHeight || undefined,
              maxWidth: nativeWidth,
            }}
          >
            {children(displayWidth)}
          </div>
        </div>
      </div>
      {canPan && (
        <p className="text-center text-[10px] text-sand/45">
          Arrastra con el mouse o el dedo · rueda o pellizco para desplazar · zoom + para acercar
        </p>
      )}
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
  const contentScrollRef = useRef<HTMLDivElement>(null);
  const sectionNavRef = useRef<HTMLDivElement>(null);

  const sections = side === "tiro" ? TIRO_SECTIONS : RETIRO_SECTIONS;
  const focusSection = sections.find((s) => s.id === focusSectionId) ?? null;
  const isPliego = focusSection === null;
  const sheetDims = brochureDims(side);
  const zoomMax = isPliego ? ZOOM_MAX_FULL : ZOOM_MAX_SECTION;
  const nativeViewWidth = isPliego
    ? sheetDims.width
    : focusSection
      ? sectionNativeSize(focusSection, side).width
      : sheetDims.width;
  const nativeViewHeight = isPliego
    ? sheetDims.height
    : focusSection
      ? sectionNativeSize(focusSection, side).height
      : sheetDims.height;

  const goTo = useCallback((next: BrochureSide) => {
    setSide(next);
    setFocusSectionId(null);
    setZoom(1);
    setLoading(!isImageCached(BROCHURE[next].src));
  }, []);

  const selectSection = useCallback(
    (id: string | null) => {
      setFocusSectionId(id);
      setZoom(1);
      setLoading(!isImageCached(BROCHURE[side].src));
    },
    [side]
  );

  const stepSection = useCallback(
    (delta: -1 | 1) => {
      if (!focusSectionId) return;
      const idx = sections.findIndex((s) => s.id === focusSectionId);
      if (idx < 0) return;
      const next = sections[idx + delta];
      if (next) selectSection(next.id);
    },
    [focusSectionId, sections, selectSection]
  );

  useEffect(() => {
    if (!open) return;
    setSide(initialSide);
    setFocusSectionId(null);
    setZoom(1);
    setLoading(!isImageCached(BROCHURE[initialSide].src));
    preloadBrochureImages();
  }, [open, initialSide]);

  useEffect(() => {
    if (!open || !focusSectionId || !sectionNavRef.current) return;
    const active = sectionNavRef.current.querySelector<HTMLElement>(
      `[data-section-id="${focusSectionId}"]`
    );
    active?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [open, focusSectionId]);

  useEffect(() => {
    if (!open) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (focusSectionId) selectSection(null);
        else onClose();
        return;
      }
      if (e.key === "ArrowLeft") {
        if (focusSectionId) stepSection(-1);
        else goTo("tiro");
      }
      if (e.key === "ArrowRight") {
        if (focusSectionId) stepSection(1);
        else goTo("retiro");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, goTo, focusSectionId, selectSection, stepSection]);

  useEffect(() => {
    if (!open) return;
    const src = BROCHURE[side].src;
    if (isImageCached(src)) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const img = new window.Image();
    img.src = src;
    img.onload = () => setLoading(false);
    img.onerror = () => setLoading(false);
  }, [open, side]);

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
            className="relative z-10 flex max-h-[96vh] w-full max-w-[min(96vw,3897px)] flex-col overflow-hidden rounded-t-[2rem] border border-white/10 bg-[#0c1524] shadow-2xl sm:rounded-[2rem]"
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

              <div ref={sectionNavRef} className="mt-3 flex flex-wrap gap-1.5 overflow-x-auto pb-0.5">
                <button
                  type="button"
                  onClick={() => selectSection(null)}
                  className={cn(
                    "shrink-0 rounded-full px-3 py-1 font-accent text-[9px] uppercase tracking-wider transition sm:text-[10px]",
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
                    data-section-id={section.id}
                    onClick={() => selectSection(section.id)}
                    className={cn(
                      "shrink-0 rounded-full px-3 py-1 font-accent text-[9px] uppercase tracking-wider transition sm:text-[10px]",
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
                <button
                  type="button"
                  onClick={() => printBrochure(side)}
                  className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-brand-gradient px-3 py-1.5 font-sans text-xs font-semibold text-night"
                >
                  <Printer size={14} />
                  Imprimir
                </button>
              </div>
            </div>

            <div
              ref={contentScrollRef}
              className="relative flex min-h-0 flex-1 flex-col overflow-hidden px-4 py-4 sm:px-6 sm:py-5"
            >
              {loading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#0c1524]/85">
                  <div className="flex items-center gap-2 text-sm text-sand/80">
                    <Loader2 size={18} className="animate-spin text-brand-yellow" />
                    Cargando alta resolución…
                  </div>
                </div>
              )}

              <BrochureZoomViewport
                nativeWidth={nativeViewWidth}
                nativeHeight={nativeViewHeight}
                zoom={zoom}
                zoomMax={zoomMax}
                fitInView
                resetKey={`${side}-${focusSectionId ?? "pliego"}`}
              >
                {(displayWidth) => (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${side}-${focusSectionId ?? "pliego"}`}
                      initial={reduced ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={reduced ? undefined : { opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {isPliego ? (
                        <BrochureFullPliego
                          src={current.src}
                          alt={current.alt}
                          side={side}
                          displayWidth={displayWidth}
                          onSectionClick={selectSection}
                          onLoad={() => setLoading(false)}
                        />
                      ) : focusSection ? (
                        <BrochureSectionZoom
                          src={current.src}
                          alt={current.alt}
                          side={side}
                          section={focusSection}
                          displayWidth={displayWidth}
                          onLoad={() => setLoading(false)}
                        />
                      ) : null}
                    </motion.div>
                  </AnimatePresence>
                )}
              </BrochureZoomViewport>

              <p className="mt-4 shrink-0 text-center text-xs leading-relaxed text-sand/55">
                {isPliego
                  ? `Pliego completo visible en pantalla (${sheetDims.width} px). Haz clic en un panel para ampliarlo · zoom + para acercar.`
                  : `Vista ampliada: ${focusSection?.label}. Panel completo visible · zoom para acercar hasta ~${Math.round(nativeViewWidth)} px nativos. Esc para volver al pliego.`}
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
              <span className="text-xs text-sand/50">
                {isPliego ? "← → cara" : "← → panel"} · Esc pliego/cerrar
              </span>
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

  const handleOpen = useCallback(() => {
    preloadBrochureImages();
    setOpen(true);
  }, []);

  const handlePreload = useCallback(() => {
    preloadBrochureImages();
  }, []);

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
              <li>· Imprime desde el navegador</li>
            </ul>
            <div className="flex flex-wrap gap-2 pt-1">
              <button
                type="button"
                onClick={handleOpen}
                onMouseEnter={handlePreload}
                onFocus={handlePreload}
                className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-5 py-2.5 font-sans text-sm font-semibold text-night shadow-glow transition hover:opacity-95"
              >
                <Sparkles size={15} />
                Ver tríptico
              </button>
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
            onClick={handleOpen}
            onMouseEnter={handlePreload}
            onFocus={handlePreload}
            className="group relative min-h-[220px] border-t border-brand-blue/10 p-4 text-left lg:border-l lg:border-t-0 lg:p-6"
            aria-label="Abrir tríptico Ruta Costera de Ovalle"
          >
            <motion.div
              whileHover={reduced ? undefined : { scale: 1.01 }}
              transition={{ duration: 0.35, ease: PANEL_EASE }}
              className="relative h-full min-h-[180px] overflow-hidden rounded-xl border border-white/15 bg-[#0a1628] shadow-inner"
              style={{ aspectRatio: `${BROCHURE_DIMS.tiro.width} / ${BROCHURE_DIMS.tiro.height}` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={BROCHURE.tiro.thumbSrc}
                alt="Vista previa del tríptico Ruta Costera de Ovalle"
                width={720}
                height={470}
                loading="lazy"
                decoding="async"
                fetchPriority="low"
                className="block h-auto w-full max-w-none object-cover"
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
