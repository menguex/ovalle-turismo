"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Compass, MapPin, Phone, Users } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { TOUR_OPERATORS } from "@/lib/data/fichas";
import { HOME_SECTION_ICONS } from "@/lib/icons/page-icons";
import { useFichaOptional } from "@/components/providers/FichaProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { MagneticWrapper } from "@/components/ui/MagneticWrapper";
import { cn } from "@/lib/utils";

export function TourOperatorsPreview() {
  const reduced = useReducedMotion();
  const fichaCtx = useFichaOptional();
  const operators = TOUR_OPERATORS.filter((op) => op.id !== "oficina-turismo");

  return (
    <section className="relative overflow-hidden section-alt py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_0%_0%,rgba(247,148,29,0.07),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_100%_100%,rgba(61,143,217,0.06),transparent_50%)]" />

      <div className="container-wide relative">
        <Reveal>
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              icon={HOME_SECTION_ICONS.operators}
              eyebrow="Servicios"
              title="Tour operadores locales"
              description="Guías y operadores del Valle del Limarí para armar tu ruta con expertos del territorio — naturaleza, patrimonio y astroturismo."
              className="max-w-2xl"
            />
            <MagneticWrapper strength={0.2}>
              <Link
                href="/servicios#tours"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 font-accent text-sm uppercase tracking-wider text-fg shadow-sm transition hover:border-copper/40 hover:shadow-md"
              >
                Ver todos
                <ArrowUpRight size={16} />
              </Link>
            </MagneticWrapper>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mb-10 grid grid-cols-2 gap-4 rounded-2xl border border-border bg-surface/80 p-4 backdrop-blur-sm sm:grid-cols-3 lg:p-5">
            {[
              { icon: Users, value: `${operators.length}+`, label: "Operadores locales" },
              { icon: Compass, value: "Valle", label: "Del Limarí" },
              { icon: MapPin, value: "Ovalle", label: "Base de operación" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3 px-2">
                <stat.icon size={18} className="text-copper" />
                <div>
                  <p className="font-display text-lg font-bold leading-none text-fg">{stat.value}</p>
                  <p className="mt-0.5 font-accent text-[10px] uppercase tracking-wider text-muted">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {operators.map((op) => (
            <StaggerItem key={op.id}>
              <motion.article
                className="group tech-card-frame flex h-full flex-col overflow-hidden"
                whileHover={reduced ? undefined : { y: -6 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <button
                  type="button"
                  onClick={() => fichaCtx?.openFicha(op.id)}
                  className="flex h-full flex-col text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-copper/40"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-border/30">
                    <Image
                      src={op.image}
                      alt={op.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      quality={88}
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-night/55 via-transparent to-transparent" />
                    <span className="absolute left-3 top-3 rounded-full bg-copper/95 px-2.5 py-1 font-accent text-[9px] uppercase tracking-wider text-white shadow-sm">
                      {op.type?.split("·")[0]?.trim() ?? "Tour"}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5 lg:p-6">
                    <h3 className="font-display text-xl font-bold text-fg">{op.name}</h3>
                    <p className="mt-2 line-clamp-3 flex-1 text-body-sm leading-relaxed text-muted-fg">
                      {op.description}
                    </p>
                    {op.phone && (
                      <p className="mt-4 flex items-center gap-2 text-body-sm text-muted">
                        <Phone size={13} className="shrink-0 text-copper" />
                        {op.phone.split(" · ")[0]}
                      </p>
                    )}
                    <span
                      className={cn(
                        "mt-5 inline-flex items-center gap-1.5 font-accent text-label-sm uppercase tracking-wider text-copper",
                        "transition group-hover:gap-2.5"
                      )}
                    >
                      Ver ficha del operador
                      <ArrowUpRight size={13} />
                    </span>
                  </div>
                </button>
              </motion.article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
