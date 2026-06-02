"use client";

import { type ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useScrollLock } from "@/lib/use-scroll-lock";
import { lenisPreventProps } from "@/lib/lenis-context";
import { cn } from "@/lib/utils";

const PANEL_EASE = [0.22, 1, 0.36, 1] as const;

type ModalShellProps = {
  open: boolean;
  onClose: () => void;
  /** Contenido fijo arriba (imagen, título sobre foto, etc.) */
  header: ReactNode;
  /** Contenido con scroll (texto, mapa, botones) */
  children: ReactNode;
  className?: string;
  panelClassName?: string;
  ariaLabelledBy?: string;
  closeLabel?: string;
  zIndex?: string;
};

/**
 * Shell de modal con altura fija y zona de scroll interna.
 * Portal a document.body + data-lenis-prevent para scroll con Lenis activo.
 */
export function ModalShell({
  open,
  onClose,
  header,
  children,
  className,
  panelClassName,
  ariaLabelledBy,
  closeLabel = "Cerrar",
  zIndex = "z-[100]",
}: ModalShellProps) {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useScrollLock(open);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div
          className={cn(
            "fixed inset-0 flex items-end justify-center overflow-hidden overscroll-none sm:items-center sm:p-6",
            zIndex,
            className
          )}
          {...lenisPreventProps}
        >
          <motion.button
            type="button"
            aria-label={closeLabel}
            className="absolute inset-0 bg-night/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={ariaLabelledBy}
            className={cn(
              "relative z-10 grid h-[92dvh] w-full max-w-3xl grid-rows-[auto_minmax(0,1fr)] overflow-hidden rounded-t-[2rem] border border-border bg-surface shadow-2xl sm:h-[min(92vh,92dvh)] sm:max-h-[92dvh] sm:rounded-[2rem]",
              panelClassName
            )}
            initial={reduced ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: 24 }}
            transition={{ duration: reduced ? 0 : 0.35, ease: PANEL_EASE }}
            onClick={(e) => e.stopPropagation()}
            {...lenisPreventProps}
          >
            <div className="min-h-0 min-w-0 overflow-hidden">{header}</div>
            <div
              className="modal-scroll min-h-0 min-w-0 overflow-y-auto overscroll-contain touch-pan-y [-webkit-overflow-scrolling:touch]"
              {...lenisPreventProps}
            >
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
