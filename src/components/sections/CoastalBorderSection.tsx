"use client";

import Link from "next/link";
import {
  AlertCircle,
  ArrowUpRight,
  Clock,
  Mail,
  MapPin,
  Phone,
  ShoppingBag,
  Waves,
} from "lucide-react";
import { RichFichaCard } from "@/components/ui/RichFichaCard";
import { IconBadge } from "@/components/ui/IconBadge";
import { PagePanel } from "@/components/ui/PagePanel";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LODGING } from "@/lib/data/fichas";
import { IMAGES, SITE } from "@/lib/data/site";

const COASTAL_PLACES = [
  "Tongoy y playas del sector",
  "Puerto Velero",
  "Desembocadura del Río Limarí",
  "Termas de Socos",
] as const;

const COASTAL_TIPS = [
  {
    icon: ShoppingBag,
    title: "Lleva comida y agua",
    text: "En el borde costero la oferta gastronómica es limitada y no siempre está abierta. Te recomendamos llevar alimentos, snacks y agua para el día.",
  },
  {
    icon: Clock,
    title: "Horarios variables",
    text: "Restaurantes, comercios y algunos servicios funcionan según temporada, fines de semana o feriados. No asumas que encontrarás todo abierto al llegar.",
  },
  {
    icon: Phone,
    title: "Consulta disponibilidad",
    text: "Antes de viajar, contáctanos para confirmar qué servicios están operativos en la fecha de tu visita.",
  },
] as const;

const coastalLodging = LODGING.filter(
  (item) =>
    item.id === "hotel-termas-socos" ||
    item.distanceFromOvalle?.includes("costa") ||
    item.type?.toLowerCase().includes("termas")
);

export function CoastalBorderSection() {
  return (
    <section id="costa" className="section-alt pb-20 lg:pb-28">
      <div className="container-wide mb-8 pt-4">
        <SectionHeading
          icon={Waves}
          eyebrow="Borde costero"
          title="Tongoy · Puerto Velero · Pacífico"
          description="Playas, humedales y termas entre el valle y el mar. Planifica con anticipación: la oferta de servicios en la costa no siempre está disponible."
        />
      </div>

      <div className="container-wide mb-10">
        <Reveal>
          <PagePanel className="overflow-hidden p-0">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
              <div
                className="relative min-h-[220px] bg-cover bg-center lg:min-h-full"
                style={{ backgroundImage: `url(${IMAGES.desembocadura})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-night/35 to-night/10 lg:bg-gradient-to-r lg:from-night/75 lg:via-night/40 lg:to-transparent" />
                <div className="relative flex h-full flex-col justify-end p-6 lg:p-8">
                  <p className="eyebrow-light mb-2">Valle del Limarí · Costa</p>
                  <h3 className="font-display text-2xl text-white lg:text-3xl">
                    Planifica tu visita al borde costero
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-sand/90">
                    A unos 25–60 km de Ovalle encontrarás paisajes entre desierto y océano. Es un
                    territorio hermoso, pero con servicios más dispersos que en el centro urbano.
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-center gap-5 p-6 lg:p-8">
                <div className="flex items-start gap-3 rounded-2xl border border-brand-orange/25 bg-brand-orange/8 p-4">
                  <AlertCircle size={20} className="mt-0.5 shrink-0 text-brand-orange" />
                  <div>
                    <p className="font-display text-base font-semibold text-fg">
                      Servicios gastronómicos no siempre abiertos
                    </p>
                    <p className="mt-1.5 text-body-sm leading-relaxed text-muted-fg">
                      Los locales de comida y algunos servicios en Tongoy, Puerto Velero y sectores
                      costeros pueden estar cerrados fuera de temporada alta o en ciertos días.
                      Lleva provisiones y confirma antes de salir.
                    </p>
                  </div>
                </div>

                <div>
                  <p className="mb-3 font-accent text-label-sm uppercase tracking-[0.12em] text-muted">
                    Destinos del borde costero
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {COASTAL_PLACES.map((place) => (
                      <li
                        key={place}
                        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-elevated px-3 py-1.5 text-body-sm text-muted-fg"
                      >
                        <MapPin size={13} className="shrink-0 text-brand-blue" />
                        {place}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/contacto"
                    className="inline-flex items-center gap-2 rounded-full bg-copper px-5 py-2.5 font-sans text-sm font-semibold text-white transition hover:bg-copper/90"
                  >
                    Consultar disponibilidad
                    <ArrowUpRight size={15} />
                  </Link>
                  <a
                    href={`tel:${SITE.phones[0].replace(/\D/g, "")}`}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-5 py-2.5 font-sans text-sm font-semibold text-fg transition hover:border-brand-blue/40"
                  >
                    <Phone size={15} />
                    {SITE.phones[0]}
                  </a>
                </div>
              </div>
            </div>
          </PagePanel>
        </Reveal>
      </div>

      <div className="container-wide mb-12">
        <Stagger className="grid gap-5 lg:grid-cols-3" stagger={0.07}>
          {COASTAL_TIPS.map((tip) => (
            <StaggerItem key={tip.title}>
              <PagePanel className="h-full p-6">
                <IconBadge icon={tip.icon} size="sm" variant="brand" className="mb-4" />
                <h3 className="font-display text-display-sm text-fg">{tip.title}</h3>
                <p className="mt-3 text-body-sm leading-relaxed text-muted-fg">{tip.text}</p>
              </PagePanel>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      <div className="container-wide mb-10">
        <Reveal>
          <PagePanel className="p-6 lg:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="eyebrow mb-1">Oficina de Turismo Ovalle</p>
                <p className="section-lead max-w-2xl">
                  Escríbenos o llámanos para confirmar qué servicios están disponibles en la costa
                  en la fecha de tu viaje.
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-2 text-body-sm text-muted-fg">
                <a
                  href={`mailto:${SITE.email}`}
                  className="inline-flex items-center gap-2 transition hover:text-copper"
                >
                  <Mail size={15} />
                  {SITE.email}
                </a>
                <p className="inline-flex items-center gap-2">
                  <MapPin size={15} />
                  {SITE.address}
                </p>
              </div>
            </div>
          </PagePanel>
        </Reveal>
      </div>

      {coastalLodging.length > 0 && (
        <div className="container-wide">
          <Reveal className="mb-6">
            <h3 className="heading-md">Alojamiento en el borde costero</h3>
            <p className="section-lead mt-2 max-w-2xl">
              Opciones con servicios propios. Reserva con anticipación y confirma horarios de
              restaurante o pensión.
            </p>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:max-w-4xl">
            {coastalLodging.map((item) => (
              <RichFichaCard key={item.id} item={item} className="h-full" />
            ))}
          </div>
          <Reveal className="mt-6">
            <Link
              href="/descubre/naturaleza"
              className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-copper hover:underline"
            >
              Ver atractivos naturales del borde costero
              <ArrowUpRight size={15} />
            </Link>
          </Reveal>
        </div>
      )}
    </section>
  );
}
