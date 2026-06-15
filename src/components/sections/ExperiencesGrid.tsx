"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { NATURAL_ATTRACTIONS } from "@/lib/data/fichas";
import { fichaLabel } from "@/lib/types/ficha";
import { HOME_SECTION_ICONS } from "@/lib/icons/page-icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { useFichaOptional } from "@/components/providers/FichaProvider";
import { TiltCard } from "@/components/ui/TiltCard";
import { cn } from "@/lib/utils";

export function ExperiencesGrid() {
  const fichaCtx = useFichaOptional();
  const reduced = useReducedMotion();

  return (
    <section className="section-alt py-20 lg:py-28">
      <Reveal className="container-wide mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          icon={HOME_SECTION_ICONS.experiences}
          eyebrow="Destacados"
          title="Experiencias imperdibles"
          description="Patrimonio natural, cultura viva y paisajes que llevan millones de años esperándote."
        />
        <motion.div
          whileHover={reduced ? undefined : { x: 4 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href="/descubre/naturaleza"
            className="link-underline inline-flex items-center gap-2 font-sans text-sm font-semibold text-copper transition duration-300 hover:gap-3"
          >
            Ver todas <ArrowUpRight size={16} />
          </Link>
        </motion.div>
      </Reveal>

      <Stagger
        className="container-wide grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2"
        stagger={0.06}
      >
        {NATURAL_ATTRACTIONS.map((item, i) => (
          <StaggerItem
            key={item.id}
            className={i === 0 ? "min-h-[320px] lg:col-span-2 lg:row-span-2" : "min-h-[240px]"}
          >
            <TiltCard tiltStrength={i === 0 ? 5 : 7} glare className="h-full">
              <button
                type="button"
                onClick={() => fichaCtx?.openFicha(item.id)}
                className="group relative h-full w-full overflow-hidden rounded-3xl text-left ring-1 ring-white/0 transition duration-500 hover:ring-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-copper/40"
              >
                <div className="pillar-card-shine" aria-hidden />
                <Image
                  src={item.image}
                  alt={fichaLabel(item)}
                  fill
                  className="object-cover transition duration-700 ease-premium group-hover:scale-105"
                  sizes="(max-width:768px) 100vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night/50 via-transparent to-night/10" />
                <div className="absolute left-4 top-4 z-10 flex flex-wrap gap-2">
                  {item.badge && (
                    <motion.span
                      className="rounded-full bg-gold/90 px-2.5 py-1 font-accent text-[10px] uppercase tracking-wider text-night shadow-sm"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                    >
                      {item.badge}
                    </motion.span>
                  )}
                </div>
                <div className="image-card-caption absolute inset-x-0 bottom-0">
                  <h3
                    className={cn(
                      "image-card-title",
                      i === 0 ? "image-card-title--lg" : "image-card-title--sm line-clamp-2"
                    )}
                  >
                    {fichaLabel(item)}
                  </h3>
                  <p
                    className={cn(
                      "mt-2 font-sans leading-relaxed text-sand/90",
                      i === 0 ? "line-clamp-3 text-sm sm:text-[0.9375rem]" : "line-clamp-2 text-xs sm:text-sm"
                    )}
                  >
                    {item.description}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 font-accent text-[10px] uppercase tracking-wider text-gold opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
                    Ver ficha
                    <ArrowUpRight size={12} />
                  </span>
                </div>
              </button>
            </TiltCard>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
