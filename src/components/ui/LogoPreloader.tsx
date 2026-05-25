"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SITE } from "@/lib/data/site";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { LogoMotif } from "@/components/brand/LogoMotif";
import { BrandShapes } from "@/components/brand/BrandShapes";

const MIN_VISIBLE_MS = 1100;
const MAX_WAIT_MS = 3500;

export function LogoPreloader() {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const started = Date.now();
    let done = false;

    const hide = () => {
      if (done) return;
      done = true;
      const remaining = Math.max(0, MIN_VISIBLE_MS - (Date.now() - started));
      window.setTimeout(() => {
        setExiting(true);
        window.setTimeout(() => {
          setVisible(false);
          document.body.style.overflow = "";
        }, 550);
      }, remaining);
    };

    if (document.readyState === "complete") {
      hide();
    } else {
      window.addEventListener("load", hide, { once: true });
    }

    const fallback = window.setTimeout(hide, MAX_WAIT_MS);

    return () => {
      window.removeEventListener("load", hide);
      window.clearTimeout(fallback);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="status"
          aria-live="polite"
          aria-label={`Cargando ${SITE.name}`}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-night"
          initial={{ opacity: 1 }}
          animate={{ opacity: exiting ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <BrandShapes variant="subtle" className="opacity-60" />

          <motion.div
            className="relative flex flex-col items-center gap-8 px-6"
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative flex flex-col items-center">
              <LogoMotif size="lg" showArc orbit className="mb-4" />
              <motion.div
                animate={reduced ? undefined : { scale: [1, 1.02, 1] }}
                transition={
                  reduced
                    ? undefined
                    : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
                }
                className="logo-glow"
              >
                <BrandLogo variant="preloader" background="dark" priority />
              </motion.div>
            </div>

            <p className="font-accent text-[10px] uppercase tracking-[0.35em] text-sand/70">
              {SITE.tagline}
            </p>

            <div className="relative flex h-8 w-8 items-center justify-center">
              <span
                className="orbit-ring absolute inset-0"
                style={reduced ? { animation: "none" } : undefined}
                aria-hidden
              />
              <motion.span
                className="h-2 w-2 rounded-full bg-brand-blue"
                animate={
                  reduced
                    ? undefined
                    : { opacity: [0.4, 1, 0.4], scale: [0.9, 1.1, 0.9] }
                }
                transition={
                  reduced
                    ? undefined
                    : { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
                }
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
