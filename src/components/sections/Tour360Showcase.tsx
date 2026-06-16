"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Hand, Rotate3D, Sparkles } from "lucide-react";
import { TOUR_360 } from "@/lib/data/fichas";
import type { Ficha } from "@/lib/types/ficha";
import { fichaLabel } from "@/lib/types/ficha";
import { LogoMotif } from "@/components/brand/LogoMotif";
import { Tour360Viewer } from "@/components/ui/Tour360Viewer";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

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
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(255,203,5,0.14),transparent_50%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(61,143,217,0.12),transparent_45%)]" />
            <div
              className="pointer-events-none absolute -right-6 top-1/2 -translate-y-1/2 select-none font-display text-[11rem] font-bold leading-none tracking-tighter text-white/[0.035] lg:text-[18rem]"
              aria-hidden
            >
              360°
            </div>
          </>
        )}

        <div className="container-wide relative">
          {!isPage && (
            <Reveal>
              <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl">
                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    <LogoMotif size="sm" showArc orbit />
                    <span className="pill-badge !border-gold/40 !bg-gold/15 !text-gold">
                      <Sparkles size={12} />
                      Nuevo · Experiencia inmersiva
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-blue/35 bg-brand-blue/10 px-3 py-1 font-accent text-[10px] uppercase tracking-[0.2em] text-[#9ec9f5]">
                      <Rotate3D size={12} />
                      Interactivo
                    </span>
                  </div>
                  <h2
                    className={cn(
                      "font-display font-bold text-white text-balance",
                      isHome ? "text-3xl lg:text-[2.75rem] lg:leading-tight" : "text-4xl lg:text-5xl"
                    )}
                  >
                    Explora el valle en{" "}
                    <span className="bg-gradient-to-r from-gold via-[#ffe566] to-brand-blue bg-clip-text text-transparent">
                      360°
                    </span>
                  </h2>
                  <p className="mt-4 text-pretty text-base leading-relaxed text-sand/80 lg:text-lg">
                    Recorre virtualmente el Parque Nacional Fray Jorge y el Valle del Encanto.
                    Gira la vista, acércate a los detalles y vive el Limarí antes de llegar.
                  </p>
                </div>
                {isHome && (
                  <Link
                    href="/tour-360"
                    className="gradient-border inline-flex shrink-0 items-center gap-2 rounded-full border border-white/20 bg-night/50 px-5 py-2.5 font-accent text-sm uppercase tracking-wider text-sand backdrop-blur-sm transition hover:border-gold/40 hover:bg-white/5"
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
                <TourCard tour={tour} onLaunch={() => setActiveTour(tour)} featured={i === 0} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Tour360Viewer tour={activeTour} onClose={() => setActiveTour(null)} />
    </>
  );
}

function TourCard({
  tour,
  onLaunch,
  featured = false,
}: {
  tour: Ficha;
  onLaunch: () => void;
  featured?: boolean;
}) {
  const label = fichaLabel(tour);
  const reduced = useReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={onLaunch}
      className={cn(
        "group relative flex w-full overflow-hidden rounded-[2rem] border text-left shadow-[0_22px_70px_rgba(0,0,0,0.45)] ring-1 ring-white/10 transition-[border-color,box-shadow] duration-500",
        "min-h-[340px] lg:min-h-[400px]",
        "border-white/15 hover:border-gold/35 hover:shadow-[0_24px_80px_rgba(0,0,0,0.55),0_0_40px_rgba(255,203,5,0.12)]",
        featured && "lg:min-h-[420px]"
      )}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <Image
        src={tour.image}
        alt={label}
        fill
        className="object-cover contrast-[1.05] saturate-[1.08] transition duration-[1.1s] ease-out group-hover:scale-[1.06]"
        sizes="(max-width:1024px) 100vw, 50vw"
        quality={92}
      />

      <div className="tour-360-panorama-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-t from-night from-[28%] via-night/55 to-night/10" />
      <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/10 via-transparent to-gold/10 opacity-80" />

      <div className="absolute left-5 top-5 z-10 flex items-center gap-2 rounded-full border border-gold/35 bg-night/55 px-3 py-1.5 shadow-lg backdrop-blur-md">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold/20">
          <Rotate3D size={13} className="text-gold" />
        </span>
        <span className="font-accent text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
          Tour 360°
        </span>
      </div>

      <div className="absolute right-5 top-5 z-10 hidden rounded-full border border-white/15 bg-night/45 px-3 py-1.5 backdrop-blur-md sm:inline-flex">
        <span className="font-accent text-[10px] uppercase tracking-wider text-sand/80">
          Vista inmersiva
        </span>
      </div>

      <div className="absolute left-1/2 top-[38%] z-10 -translate-x-1/2 -translate-y-1/2">
        <div className="relative flex h-24 w-24 items-center justify-center">
          <span
            className="orbit-ring absolute -inset-1 border-gold/25"
            style={reduced ? { animation: "none" } : undefined}
            aria-hidden
          />
          <span
            className="orbit-ring absolute inset-1 border-brand-blue/30"
            style={reduced ? { animation: "none" } : { animationDirection: "reverse", animationDuration: "22s" }}
            aria-hidden
          />
          <div
            className={cn(
              "relative flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-night/65 backdrop-blur-md",
              !reduced && "tour-360-hud-pulse"
            )}
          >
            <Rotate3D size={22} className="text-gold" strokeWidth={1.75} />
          </div>
        </div>
        <p className="mt-3 flex items-center justify-center gap-1.5 font-accent text-[10px] uppercase tracking-[0.16em] text-sand/75">
          <Hand size={12} className="text-gold/90" />
          Toca para iniciar
        </p>
      </div>

      <div className="relative z-10 flex h-full min-h-[340px] flex-col justify-end p-6 sm:p-7 lg:min-h-[400px] lg:p-9">
        <div className="rounded-2xl border border-white/10 bg-night/55 p-5 backdrop-blur-md sm:p-6">
          <h3 className="font-display text-2xl font-bold text-white lg:text-3xl">{label}</h3>
          <p className="mt-2 line-clamp-2 max-w-lg text-sm leading-relaxed text-sand/88">
            {tour.description}
          </p>
          <span className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-brand-gradient px-5 py-2.5 font-sans text-sm font-semibold text-night shadow-[0_8px_24px_rgba(255,203,5,0.25)] transition group-hover:scale-[1.02] group-hover:brightness-105">
            Iniciar recorrido 360°
            <Rotate3D size={15} />
          </span>
        </div>
      </div>
    </motion.button>
  );
}
