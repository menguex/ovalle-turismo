"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BrandShapes } from "@/components/brand/BrandShapes";
import { DestinationStats } from "@/components/sections/DestinationStats";
import { IMAGES, SITE } from "@/lib/data/site";

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <>
      <section className="relative flex min-h-[100dvh] items-end overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={IMAGES.hero}
            alt="Corazón del Limarí - Ovalle"
            fill
            priority
            className="object-cover animate-ken-burns"
            sizes="100vw"
          />
        </motion.div>

        <BrandShapes variant="hero" parallax />

        <div className="absolute inset-0 gradient-overlay" />
        <div className="absolute inset-0 gradient-overlay-side opacity-80" />

        <div className="container-wide relative z-10 pb-28 pt-36 lg:pb-36 lg:pt-40">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5 flex flex-wrap items-center gap-3"
          >
            <span className="pill-badge-warm glass-tech-hero !border-white/15 !bg-white/5 !text-brand-yellow">
              <Sparkles size={12} />
              {SITE.subtitle}
            </span>
            <motion.span
              className="pill-badge glass-tech-hero !border-brand-blue/30 !bg-brand-blue/10 !text-brand-blue"
              animate={reduced ? undefined : { y: [0, -4, 0] }}
              transition={
                reduced
                  ? undefined
                  : { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
              }
            >
              Valle del Limarí
            </motion.span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.08 }}
            className="glass-tech-hero max-w-4xl rounded-3xl p-6 sm:p-8 lg:max-w-3xl"
          >
            <h1 className="heading-xl text-white">Bienvenidos a Ovalle</h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.14 }}
              className="mt-3 font-display text-display-md font-semibold text-shimmer"
            >
              Corazón del Limarí
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.18 }}
              className="mt-5 max-w-xl text-pretty font-sans text-body-lg text-sand/95"
            >
              {SITE.tagline}. Donde el desierto aprende a brillar bajo cielos únicos,
              sabores de origen y tradiciones vivas.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.28 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <Button
              href="/descubre"
              className="gradient-border gradient-border-animated shadow-glow"
            >
              Explorar experiencias
            </Button>
            <Button href="/planifica" variant="secondary">
              Planifica tu viaje
            </Button>
          </motion.div>
        </div>

        <motion.a
          href="#explorar"
          animate={reduced ? undefined : { y: [0, 6, 0] }}
          transition={
            reduced
              ? undefined
              : { repeat: Infinity, duration: 2.2, ease: "easeInOut" }
          }
          className="absolute bottom-32 left-1/2 z-10 hidden -translate-x-1/2 text-white/50 transition hover:text-white lg:block"
          aria-label="Desplazarse hacia abajo"
        >
          <ChevronDown size={24} strokeWidth={1.5} />
        </motion.a>
      </section>
      <DestinationStats />
    </>
  );
}
