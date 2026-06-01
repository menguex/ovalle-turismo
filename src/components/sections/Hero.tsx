"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { BrandShapes } from "@/components/brand/BrandShapes";
import { DestinationStats } from "@/components/sections/DestinationStats";
import { SplitText } from "@/components/ui/SplitText";
import { MagneticWrapper } from "@/components/ui/MagneticWrapper";
import { FloatingParticles } from "@/components/ui/FloatingParticles";
import { IMAGES, SITE } from "@/lib/data/site";

export function Hero() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0.4, 0.9]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <>
      <section ref={sectionRef} className="relative flex min-h-[100dvh] items-end overflow-hidden">
        {/* Parallax hero image */}
        <motion.div
          className="absolute inset-0"
          style={reduced ? undefined : { scale: imgScale, y: imgY }}
        >
          <motion.div
            className="h-full w-full"
            initial={{ scale: 1.12, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={IMAGES.hero}
              alt="Corazón del Limarí - Ovalle"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>
        </motion.div>

        {/* Floating particles overlay */}
        <FloatingParticles
          className="absolute inset-0 z-[1]"
          count={35}
          colors={["#FFCB05", "#F7941D", "#ffffff"]}
          maxSize={2}
          speed={0.4}
        />

        <BrandShapes variant="hero" parallax />

        <motion.div
          className="absolute inset-0 gradient-overlay"
          style={reduced ? undefined : { opacity: overlayOpacity }}
        />
        <div className="absolute inset-0 gradient-overlay-side opacity-80" />

        {/* Vignette edges */}
        <div className="pointer-events-none absolute inset-0 z-[2] shadow-[inset_0_0_120px_rgba(0,0,0,0.4)]" />

        <motion.div
          className="container-wide relative z-10 pb-28 pt-36 lg:pb-36 lg:pt-40"
          style={reduced ? undefined : { y: contentY }}
        >
          {/* Badge pills */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5 flex flex-wrap items-center gap-3"
          >
            <motion.span
              className="pill-badge-warm glass-tech-hero !border-white/15 !bg-white/5 !text-brand-yellow"
              whileHover={reduced ? undefined : { scale: 1.05 }}
            >
              <Sparkles size={12} />
              {SITE.subtitle}
            </motion.span>
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

          {/* Main content glass panel */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.08 }}
            className="glass-tech-hero max-w-4xl rounded-3xl p-6 sm:p-8 lg:max-w-3xl"
          >
            <SplitText
              text="¡Bienvenidos a Ovalle!"
              className="heading-xl text-white"
              delay={0.3}
              stagger={0.035}
            />
            <motion.p
              initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.85, delay: 0.7 }}
              className="mt-3 font-display text-display-md font-semibold text-shimmer"
            >
              Corazón del Limarí
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.85 }}
              className="mt-5 max-w-xl text-pretty font-sans text-body-lg text-sand/95"
            >
              {SITE.tagline}. Donde el desierto aprende a brillar bajo cielos únicos,
              sabores de origen y tradiciones vivas.
            </motion.p>
          </motion.div>

          {/* CTA Buttons with magnetic effect */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 1 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <MagneticWrapper strength={0.3}>
              <motion.div
                whileHover={reduced ? undefined : { y: -3, scale: 1.02 }}
                whileTap={reduced ? undefined : { scale: 0.97 }}
                transition={{ duration: 0.25 }}
              >
                <Button
                  href="/descubre"
                  className="gradient-border gradient-border-animated shadow-glow"
                >
                  Explorar experiencias
                </Button>
              </motion.div>
            </MagneticWrapper>
            <MagneticWrapper strength={0.3}>
              <motion.div
                whileHover={reduced ? undefined : { y: -3, scale: 1.02 }}
                whileTap={reduced ? undefined : { scale: 0.97 }}
                transition={{ duration: 0.25 }}
              >
                <Button href="/planifica" variant="secondary">
                  Planifica tu viaje
                </Button>
              </motion.div>
            </MagneticWrapper>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.a
          href="#explorar"
          initial={{ opacity: 0 }}
          animate={reduced ? { opacity: 0.5 } : { opacity: [0, 0.5, 0.5], y: [0, 6, 0] }}
          transition={
            reduced
              ? { delay: 1.5 }
              : { opacity: { delay: 1.5 }, y: { repeat: Infinity, duration: 2.2, ease: "easeInOut" } }
          }
          className="absolute bottom-32 left-1/2 z-10 hidden -translate-x-1/2 text-white/50 transition hover:text-white lg:block"
          aria-label="Desplazarse hacia abajo"
        >
          <motion.div
            className="flex flex-col items-center gap-2"
            whileHover={{ y: 3 }}
          >
            <span className="font-accent text-[9px] uppercase tracking-[0.2em] text-white/40">
              Scroll
            </span>
            <ChevronDown size={24} strokeWidth={1.5} />
          </motion.div>
        </motion.a>
      </section>
      <DestinationStats />
    </>
  );
}
