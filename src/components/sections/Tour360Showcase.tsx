"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Rotate3D, Sparkles } from "lucide-react";
import { TOUR_360 } from "@/lib/data/fichas";
import type { Ficha } from "@/lib/types/ficha";
import { fichaLabel } from "@/lib/types/ficha";
import { LogoMotif } from "@/components/brand/LogoMotif";
import { Tour360Viewer } from "@/components/ui/Tour360Viewer";
import { Reveal } from "@/components/ui/Reveal";

export function Tour360Showcase({ variant = "full" }: { variant?: "full" | "home" | "page" }) {
  const [activeTour, setActiveTour] = useState<Ficha | null>(null);
  const isHome = variant === "home";
  const isPage = variant === "page";

  return (
    <>
      <section className="relative overflow-hidden bg-night py-16 lg:py-28">
        {!isPage && (
          <>
            <div className="mesh-bg pointer-events-none absolute inset-0 opacity-30" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(255,203,5,0.12),transparent_50%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(61,143,217,0.1),transparent_45%)]" />
          </>
        )}

        <div className="container-wide relative">
          {!isPage && (
            <Reveal>
              <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl">
                  <div className="mb-4 flex items-center gap-4">
                    <LogoMotif size="sm" showArc orbit />
                    <span className="pill-badge !border-gold/30 !bg-gold/10 !text-gold">
                      <Sparkles size={12} />
                      Nuevo · Experiencia inmersiva
                    </span>
                  </div>
                  <h2
                    className={`font-display font-bold text-white text-balance ${
                      isHome ? "text-3xl lg:text-4xl" : "text-4xl lg:text-5xl"
                    }`}
                  >
                    Explora el valle en 360°
                  </h2>
                  <p className="mt-4 text-pretty text-base leading-relaxed text-sand/80 lg:text-lg">
                    Recorre virtualmente el Parque Nacional Fray Jorge y el Valle del Encanto.
                    Tours digitales interactivos, educativos y accesibles desde cualquier dispositivo.
                  </p>
                </div>
                {isHome && (
                  <Link
                    href="/tour-360"
                    className="gradient-border inline-flex shrink-0 items-center gap-2 rounded-full border border-white/20 bg-night/40 px-5 py-2.5 font-accent text-sm uppercase tracking-wider text-sand backdrop-blur-sm transition hover:border-gold/40 hover:bg-white/5"
                  >
                    Ver experiencia completa
                    <ArrowUpRight size={16} />
                  </Link>
                )}
              </div>
            </Reveal>
          )}

          <div className="grid gap-5 lg:grid-cols-2">
            {TOUR_360.map((tour, i) => (
              <Reveal key={tour.id} delay={0.08 + i * 0.06}>
                <TourCard tour={tour} onLaunch={() => setActiveTour(tour)} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Tour360Viewer tour={activeTour} onClose={() => setActiveTour(null)} />
    </>
  );
}

function TourCard({ tour, onLaunch }: { tour: Ficha; onLaunch: () => void }) {
  const label = fichaLabel(tour);
  const reduced = useReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={onLaunch}
      className="group relative flex min-h-[320px] w-full overflow-hidden rounded-[2rem] text-left lg:min-h-[380px]"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.35 }}
    >
      <Image
        src={tour.image}
        alt={label}
        fill
        className="object-cover transition duration-700 group-hover:scale-105"
        sizes="(max-width:1024px) 100vw, 50vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-night via-night/50 to-night/20" />

      <div className="absolute left-1/2 top-8 z-10 -translate-x-1/2">
        <div className="relative flex h-16 w-16 items-center justify-center">
          <span
            className="orbit-ring absolute inset-0"
            style={reduced ? { animation: "none" } : undefined}
            aria-hidden
          />
          <span className="orbit-ring absolute inset-2 opacity-60" aria-hidden />
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-night/50 backdrop-blur-sm">
            <Rotate3D size={16} className="text-gold" />
          </div>
        </div>
      </div>

      <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/20 bg-night/40 px-3 py-1.5 backdrop-blur-sm">
        <LogoMotif size="sm" showArc={false} />
        <span className="font-accent text-[10px] uppercase tracking-wider text-sand">360°</span>
      </div>

      <div className="relative z-10 flex h-full min-h-[320px] flex-col justify-end p-7 lg:min-h-[380px] lg:p-9">
        <h3 className="font-display text-2xl font-bold text-white lg:text-3xl">{label}</h3>
        <p className="mt-3 line-clamp-2 max-w-lg text-sm leading-relaxed text-sand/85">
          {tour.description}
        </p>
        <span className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-brand-gradient px-5 py-2.5 font-sans text-sm font-semibold text-night transition group-hover:brightness-105">
          Iniciar recorrido
          <Rotate3D size={15} />
        </span>
      </div>
    </motion.button>
  );
}
