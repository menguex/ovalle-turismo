"use client";

import Link from "next/link";
import { ArrowUpRight, Bed } from "lucide-react";
import type { Ficha } from "@/lib/types/ficha";
import { RichFichaCard } from "@/components/ui/RichFichaCard";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

type LodgingStripSectionProps = {
  id?: string;
  items: readonly Ficha[];
  title?: string;
  description?: string;
  serviciosHref?: string;
};

export function LodgingStripSection({
  id = "alojamiento",
  items,
  title = "Dónde dormir bajo las estrellas",
  description = "Alojamientos del valle con cielos despejados, cercanía a reservas Starlight o acceso a tours astronómicos. Haz clic en cada ficha para ver contacto, mapa y servicios.",
  serviciosHref = "/servicios#alojamiento",
}: LodgingStripSectionProps) {
  if (items.length === 0) return null;

  return (
    <section id={id} className="scroll-mt-28 border-y border-border bg-surface py-16 lg:py-24">
      <Reveal className="container-wide mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          icon={Bed}
          eyebrow="Alojamiento"
          title={title}
          description={description}
          className="mb-0 max-w-2xl"
        />
        <Link
          href={serviciosHref}
          className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border bg-surface-elevated px-5 py-2.5 font-sans text-sm font-semibold text-fg transition hover:border-copper/40 hover:text-copper"
        >
          Ver todos los alojamientos
          <ArrowUpRight size={15} />
        </Link>
      </Reveal>

      <Stagger
        className="container-wide grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        stagger={0.06}
      >
        {items.map((item) => (
          <StaggerItem key={item.id}>
            <RichFichaCard item={item} className="h-full" />
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
