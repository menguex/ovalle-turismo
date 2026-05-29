"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { TOUR_OPERATORS } from "@/lib/data/fichas";
import { HOME_SECTION_ICONS } from "@/lib/icons/page-icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { MagneticWrapper } from "@/components/ui/MagneticWrapper";

export function TourOperatorsPreview() {
  const reduced = useReducedMotion();
  const operators = TOUR_OPERATORS.filter((op) => op.id !== "oficina-turismo");

  return (
    <section className="section-surface py-20 lg:py-28">
      <div className="container-wide">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            icon={HOME_SECTION_ICONS.operators}
            eyebrow="Servicios"
            title="Tour operadores locales"
            description="Guías y operadores del Valle del Limarí para armar tu ruta con expertos del territorio."
          />
          <MagneticWrapper strength={0.2}>
            <Link
              href="/servicios#tours"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-5 py-2.5 font-accent text-sm uppercase tracking-wider text-fg transition hover:border-copper/40 hover:shadow-md"
            >
              Ver todos
              <ArrowUpRight size={16} />
            </Link>
          </MagneticWrapper>
        </div>

        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
          {operators.map((op) => (
            <StaggerItem key={op.id}>
              <Link href="/servicios#tours" className="block h-full">
                <motion.div
                  className="tech-card-frame flex h-full flex-col p-5 card-spotlight transition hover:border-brand-orange/30"
                  whileHover={reduced ? undefined : { y: -6, scale: 1.01 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="font-accent text-label-sm uppercase tracking-wider text-copper">
                    {op.type}
                  </p>
                  <h3 className="mt-2 font-display text-lg font-semibold text-fg">{op.name}</h3>
                  <p className="mt-2 line-clamp-3 flex-1 text-body-sm leading-relaxed text-muted-fg">
                    {op.description}
                  </p>
                  {op.phone && (
                    <p className="mt-4 text-body-sm text-muted">{op.phone.split(" · ")[0]}</p>
                  )}
                  <span className="mt-4 inline-flex items-center gap-1 font-accent text-label-sm uppercase tracking-wider text-copper">
                    Ver en servicios
                    <ArrowUpRight size={12} />
                  </span>
                </motion.div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
