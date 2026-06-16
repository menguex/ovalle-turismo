"use client";

import SiteImage from "@/components/ui/SiteImage";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { PILLARS } from "@/lib/data/site";
import { HOME_SECTION_ICONS } from "@/lib/icons/page-icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";

export function Pillars() {
  const reduced = useReducedMotion();
  return (
    <section className="section-surface py-20 lg:py-28">
      <Reveal className="container-wide mb-12">
        <SectionHeading
          icon={HOME_SECTION_ICONS.pillars}
          eyebrow="Experiencias"
          title="¿Qué quieres vivir?"
          description="Seis formas de descubrir Ovalle: desde cielos estrellados hasta sabores de origen y tradiciones vivas."
        />
      </Reveal>

      <Stagger className="container-wide grid gap-4 sm:grid-cols-2 xl:grid-cols-3" stagger={0.07}>
        {PILLARS.map((pillar) => (
          <StaggerItem key={pillar.id}>
            <TiltCard tiltStrength={8} glare className="h-full">
              <Link
                href={pillar.href}
                className="group relative block aspect-[4/5] overflow-hidden rounded-3xl ring-1 ring-white/0 transition duration-500 hover:ring-white/15"
              >
                <div className="pillar-card-shine" aria-hidden />
                <SiteImage
                  src={pillar.image}
                  alt={pillar.title}
                  fill
                  className="object-cover transition duration-700 ease-premium group-hover:scale-105"
                  sizes="(max-width:768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night/50 via-transparent to-night/10" />

                {/* Hover glow */}
                <motion.div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 80%, rgba(255,203,5,0.12) 0%, transparent 60%)",
                  }}
                />

                <div className="image-card-caption absolute inset-x-0 bottom-0">
                  <motion.div
                    initial={false}
                    className="origin-left"
                    whileHover={reduced ? undefined : { x: 4 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="eyebrow-light !text-[10px]">{pillar.subtitle}</p>
                    <h3 className="image-card-title image-card-title--sm mt-1.5 line-clamp-2">
                      {pillar.title}
                    </h3>
                  </motion.div>
                  <p className="mt-2 line-clamp-2 font-sans text-xs leading-relaxed text-sand/90 sm:text-sm">
                    {pillar.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 font-sans text-sm font-semibold text-gold opacity-90 transition-all duration-300 group-hover:gap-2.5 group-hover:opacity-100">
                    Descubrir
                    <motion.span
                      className="inline-block"
                      whileHover={reduced ? undefined : { x: 3, y: -3 }}
                    >
                      <ArrowUpRight size={15} />
                    </motion.span>
                  </span>
                </div>
              </Link>
            </TiltCard>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
