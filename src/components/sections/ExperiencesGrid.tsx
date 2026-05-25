"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { NATURAL_ATTRACTIONS } from "@/lib/data/fichas";
import { fichaLabel } from "@/lib/types/ficha";
import { HOME_SECTION_ICONS } from "@/lib/icons/page-icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { useFichaOptional } from "@/components/providers/FichaProvider";

export function ExperiencesGrid() {
  const fichaCtx = useFichaOptional();

  return (
    <section className="section-alt py-20 lg:py-28">
      <Reveal className="container-wide mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          icon={HOME_SECTION_ICONS.experiences}
          eyebrow="Destacados"
          title="Experiencias imperdibles"
          description="Patrimonio natural, cultura viva y paisajes que llevan millones de años esperándote."
        />
        <Link
          href="/descubre/naturaleza"
          className="link-underline inline-flex items-center gap-2 font-sans text-sm font-semibold text-copper transition duration-300 hover:gap-3"
        >
          Ver todas <ArrowUpRight size={16} />
        </Link>
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
            <button
              type="button"
              onClick={() => fichaCtx?.openFicha(item.id)}
              className="group relative h-full w-full overflow-hidden rounded-3xl text-left card-hover ring-1 ring-white/0 transition duration-500 hover:ring-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-copper/40"
            >
              <div className="pillar-card-shine" aria-hidden />
              <Image
                src={item.image}
                alt={fichaLabel(item)}
                fill
                className="object-cover transition duration-700 ease-premium group-hover:scale-105"
                sizes="(max-width:768px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night/95 via-night/35 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <h3 className="heading-md text-white">{fichaLabel(item)}</h3>
                <p className="mt-2 line-clamp-2 font-sans text-sm leading-relaxed text-sand/90">
                  {item.description}
                </p>
                <span className="mt-3 inline-block font-accent text-[10px] uppercase tracking-wider text-gold opacity-0 transition group-hover:opacity-100">
                  Ver ficha →
                </span>
              </div>
            </button>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
