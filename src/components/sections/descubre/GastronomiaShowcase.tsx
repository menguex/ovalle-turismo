"use client";

import Link from "next/link";
import { ArrowUpRight, ChefHat, Clock, MapPin, UtensilsCrossed, Wine } from "lucide-react";
import { ServiceListingGrid } from "@/components/ui/ServiceListingGrid";
import { IconBadge } from "@/components/ui/IconBadge";
import { PagePanel } from "@/components/ui/PagePanel";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RESTAURANTS } from "@/lib/data/fichas";
import { PAGE_ICONS } from "@/lib/icons/page-icons";

const stats = [
  { icon: UtensilsCrossed, label: "Locales", value: String(RESTAURANTS.length) },
  { icon: ChefHat, label: "Cocina local", value: "Valle" },
  { icon: MapPin, label: "Centro Ovalle", value: "A pie" },
  { icon: Wine, label: "Maridaje", value: "Enoturismo" },
] as const;

const tips = [
  {
    icon: Clock,
    title: "Horarios y reservas",
    text: "Consulta horarios en cada ficha. En verano y fines de semana, reserva en restaurantes destacados.",
  },
  {
    icon: MapPin,
    title: "Ruta en el centro",
    text: "La mayoría de propuestas están en Ovalle centro. Combina almuerzo con museo, plaza y enoturismo.",
  },
  {
    icon: Wine,
    title: "Sabores + vino",
    text: "Pide maridaje con vinos del Limarí o visita viñas y pisquerías el mismo día.",
  },
] as const;

export function GastronomiaShowcase() {
  return (
    <>
      <section className="border-y border-border bg-surface py-12 lg:py-16">
        <div className="container-wide">
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
            {stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <PagePanel className="flex items-center gap-4 p-5">
                  <IconBadge icon={stat.icon} size="sm" variant="brand" />
                  <div>
                    <p className="font-display text-xl text-fg">{stat.value}</p>
                    <p className="font-accent text-label-sm uppercase tracking-[0.12em] text-muted">
                      {stat.label}
                    </p>
                  </div>
                </PagePanel>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <Reveal className="container-wide mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            icon={PAGE_ICONS.gastronomia}
            eyebrow="Restaurantes"
            title="Dónde comer en Ovalle"
            description="Filtra por tipo de local, abre la ficha para ver mapa, contacto y horarios."
            className="mb-0 max-w-2xl"
          />
          <Link
            href="/servicios#gastronomia"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border bg-surface-elevated px-5 py-2.5 font-sans text-sm font-semibold text-fg transition hover:border-copper/40 hover:text-copper"
          >
            Ver en Servicios
            <ArrowUpRight size={15} />
          </Link>
        </Reveal>
        <ServiceListingGrid items={RESTAURANTS} pageSize={9} />
      </section>

      <section className="section-alt pb-16 lg:pb-24">
        <div className="container-wide grid gap-6 lg:grid-cols-3">
          {tips.map((tip) => (
            <Reveal key={tip.title}>
              <PagePanel className="h-full p-7">
                <IconBadge icon={tip.icon} size="sm" variant="brand" className="mb-4" />
                <h3 className="font-display text-display-sm text-fg">{tip.title}</h3>
                <p className="mt-3 text-body-sm leading-relaxed text-muted-fg">{tip.text}</p>
              </PagePanel>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
