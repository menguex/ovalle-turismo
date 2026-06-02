"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Maximize2, Minimize2, Rotate3D, X } from "lucide-react";
import type { Ficha } from "@/lib/types/ficha";
import { fichaLabel } from "@/lib/types/ficha";
import { useScrollLock } from "@/lib/use-scroll-lock";

type Tour360ViewerProps = {
  tour: Ficha | null;
  onClose: () => void;
};

export function Tour360Viewer({ tour, onClose }: Tour360ViewerProps) {
  const [fullscreen, setFullscreen] = useState(false);
  const [iframeBlocked, setIframeBlocked] = useState(false);
  const iframeLoadedRef = useRef(false);

  const label = tour ? fichaLabel(tour) : "";
  const embedUrl = tour?.embedUrl ?? tour?.website;

  useScrollLock(Boolean(tour));

  useEffect(() => {
    if (!tour) return;
    setFullscreen(false);
    setIframeBlocked(false);
    iframeLoadedRef.current = false;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [tour, onClose]);

  useEffect(() => {
    if (!tour || !embedUrl) return;
    iframeLoadedRef.current = false;
    const timer = window.setTimeout(() => {
      if (!iframeLoadedRef.current) setIframeBlocked(true);
    }, 7000);
    return () => window.clearTimeout(timer);
  }, [tour, embedUrl]);

  return (
    <AnimatePresence>
      {tour && embedUrl && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`Tour 360° ${label}`}
          className="fixed inset-0 z-[110] flex flex-col overflow-hidden overscroll-none bg-night"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <header className="flex shrink-0 items-center justify-between gap-4 border-b border-white/10 px-4 py-3 sm:px-6">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-copper/20 text-copper">
                <Rotate3D size={18} />
              </div>
              <div className="min-w-0">
                <p className="font-accent text-[10px] uppercase tracking-wider text-gold">
                  Experiencia 360°
                </p>
                <h2 className="truncate font-display text-lg font-bold text-white">{label}</h2>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <a
                href={embedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-xs text-sand/90 transition hover:bg-white/10 sm:inline-flex"
              >
                Abrir en pestaña
                <ExternalLink size={13} />
              </a>
              <button
                type="button"
                onClick={() => setFullscreen((v) => !v)}
                className="rounded-full border border-white/15 p-2 text-sand/90 transition hover:bg-white/10"
                aria-label={fullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
              >
                {fullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-white/15 p-2 text-sand/90 transition hover:bg-white/10"
                aria-label="Cerrar tour"
              >
                <X size={16} />
              </button>
            </div>
          </header>

          <div className={`relative min-h-0 flex-1 ${fullscreen ? "" : "p-3 sm:p-5"}`}>
            <div
              className={`relative h-full min-h-0 overflow-hidden bg-night ${
                fullscreen ? "" : "rounded-2xl border border-white/10 shadow-2xl"
              }`}
            >
              {!iframeBlocked ? (
                <iframe
                  src={embedUrl}
                  title={`Tour 360° ${label}`}
                  className="h-full w-full border-0"
                  allow="fullscreen; gyroscope; accelerometer"
                  allowFullScreen
                  onLoad={() => {
                    iframeLoadedRef.current = true;
                  }}
                  onError={() => setIframeBlocked(true)}
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-6 p-8 text-center">
                  <div className="relative h-48 w-full max-w-md overflow-hidden rounded-2xl">
                    <Image src={tour.image} alt={label} fill className="object-cover opacity-60" />
                  </div>
                  <p className="max-w-md text-sm text-sand/80">
                    El recorrido se abre mejor en una ventana dedicada. Haz clic abajo para explorar
                    el tour interactivo.
                  </p>
                  <a
                    href={embedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-copper px-6 py-3 text-sm font-semibold text-white transition hover:bg-copper/90"
                  >
                    Iniciar tour 360°
                    <ExternalLink size={16} />
                  </a>
                </div>
              )}
            </div>
          </div>

          <footer className="shrink-0 border-t border-white/10 px-4 py-3 sm:px-6">
            <p className="text-center text-xs text-sand/60">
              Arrastra para mirar alrededor · Usa el scroll para acercar · Tour oficial Ovalle Turismo
            </p>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
