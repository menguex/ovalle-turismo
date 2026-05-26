"use client";

import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Compass, Lightbulb, Rotate3D, Route } from "lucide-react";
import type { Ficha } from "@/lib/types/ficha";
import type { MapCategory } from "@/lib/data/site";
import { IconBadge } from "@/components/ui/IconBadge";
import { PagePanel } from "@/components/ui/PagePanel";
import { RichFichaCard } from "@/components/ui/RichFichaCard";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MapExplorer } from "@/components/sections/MapExplorer";

export type DescubreStat = {
  icon: LucideIcon;
  label: string;
  value: string;
};

export type DescubreTip = {
  icon: LucideIcon;
  title: string;
  text: string;
};

export type DescubreRoute = {
  icon: LucideIcon;
  title: string;
  duration: string;
  stops: string;
  description: string;
};

export type DescubreGalleryImage = {
  src: string;
  alt: string;
};

type DescubreExperienceHubProps = {
  items: readonly Ficha[];
  stats: readonly DescubreStat[];
  tips: readonly DescubreTip[];
  mapCategory: MapCategory;
  mapDefaultPointId?: string;
  sectionIcon: LucideIcon;
  gridEyebrow?: string;
  gridTitle: string;
  gridDescription: string;
  mapEyebrow?: string;
  mapTitle?: string;
  mapDescription?: string;
  routes?: readonly DescubreRoute[];
  gallery?: readonly DescubreGalleryImage[];
  showTour360?: boolean;
  gridMode?: "bento" | "masonry";
};

export function DescubreExperienceHub({
  items,
  stats,
  tips,
  mapCategory,
  mapDefaultPointId,
  sectionIcon,
  gridEyebrow = "Atractivos",
  gridTitle,
  gridDescription,
  mapEyebrow = "Mapa del territorio",
  mapTitle = "Ubícalos en el valle",
  mapDescription = "Selecciona un punto en el mapa interactivo y planifica tu ruta con distancias y referencias del Limarí.",
  routes,
  gallery,
  showTour360,
  gridMode = "bento",
}: DescubreExperienceHubProps) {
  const featured = items.find((i) => i.featured) ?? items[0];
  const rest = items.filter((i) => i.id !== featured?.id);

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
                    <p className="font-accent text-label-sm uppercase tracking-[0.14em] text-muted">
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
        <Reveal className="container-wide mb-10">
          <SectionHeading
            icon={sectionIcon}
            eyebrow={gridEyebrow}
            title={gridTitle}
            description={gridDescription}
          />
        </Reveal>

        <div
          className={
            gridMode === "masonry"
              ? "container-wide space-y-5"
              : "container-wide grid gap-5 lg:grid-cols-3 lg:grid-rows-2"
          }
        >
          {featured && (
            <Reveal
              className={gridMode === "bento" ? "lg:col-span-2 lg:row-span-2" : undefined}
              delay={0.05}
            >
              <RichFichaCard item={featured} featured={gridMode === "bento"} />
            </Reveal>
          )}
          <div
            className={
              gridMode === "masonry"
                ? "grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
                : "contents"
            }
          >
            {rest.map((item, index) => (
              <Reveal key={item.id} delay={0.08 + index * 0.05}>
                <RichFichaCard item={item} className="h-full" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {gallery && gallery.length > 0 && (
        <section className="border-y border-border bg-surface py-12 lg:py-16">
          <Reveal className="container-wide mb-8">
            <SectionHeading
              eyebrow="Galería"
              title="Imágenes del territorio"
              description="Un vistazo visual a los paisajes y experiencias que te esperan en el valle."
            />
          </Reveal>
          <div className="container-wide overflow-x-auto pb-2">
            <Stagger
              className="flex min-w-min gap-4 sm:grid sm:min-w-0 sm:grid-cols-3 lg:grid-cols-6"
              stagger={0.04}
            >
              {gallery.map((img) => (
                <StaggerItem
                  key={img.src}
                  className="relative h-44 w-64 shrink-0 overflow-hidden rounded-2xl sm:h-48 sm:w-auto"
                >
                  <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="200px" />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {routes && routes.length > 0 && (
        <section className="section-alt py-16 lg:py-24">
          <Reveal className="container-wide mb-10">
            <SectionHeading
              icon={Route}
              eyebrow="Rutas sugeridas"
              title="Itinerarios para armar tu viaje"
              description="Combinaciones probadas por el equipo de Ovalle Turismo para aprovechar mejor tu estadía."
            />
          </Reveal>
          <Stagger className="container-wide grid gap-5 lg:grid-cols-3" stagger={0.06}>
            {routes.map((route) => (
              <StaggerItem key={route.title}>
                <PagePanel className="flex h-full flex-col p-6 lg:p-8">
                  <IconBadge icon={route.icon} size="sm" variant="brand" className="mb-4" />
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-xl text-fg">{route.title}</h3>
                    <span className="rounded-full border border-border bg-surface-elevated px-2.5 py-0.5 font-accent text-[10px] uppercase tracking-wider text-muted">
                      {route.duration}
                    </span>
                  </div>
                  <p className="mt-2 font-accent text-[10px] uppercase tracking-wider text-copper">
                    {route.stops}
                  </p>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-fg">
                    {route.description}
                  </p>
                  <Link
                    href="/planifica"
                    className="mt-6 inline-flex w-fit items-center gap-1.5 font-sans text-xs font-semibold text-copper transition hover:gap-2"
                  >
                    Armar mi ruta
                  </Link>
                </PagePanel>
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      )}

      {showTour360 && (
        <section className="relative overflow-hidden bg-night py-14 lg:py-20">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(255,203,5,0.1),transparent_55%)]" />
          <Reveal className="container-wide relative">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <div className="mb-3 flex items-center gap-2">
                  <Rotate3D size={18} className="text-gold" />
                  <span className="font-accent text-[10px] uppercase tracking-wider text-gold">
                    Experiencia inmersiva
                  </span>
                </div>
                <h2 className="font-display text-2xl text-white lg:text-3xl">
                  Explora antes de llegar en 360°
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-sand/80">
                  Recorre virtualmente el Valle del Encanto y el Parque Nacional Fray Jorge desde
                  cualquier dispositivo.
                </p>
              </div>
              <Link
                href="/tour-360"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 font-sans text-sm font-semibold text-night transition hover:brightness-105"
              >
                Iniciar tour 360°
                <Rotate3D size={15} />
              </Link>
            </div>
          </Reveal>
        </section>
      )}

      <section className="section-alt py-16 lg:py-24">
        <Reveal className="container-wide mb-10">
          <SectionHeading
            icon={Compass}
            eyebrow={mapEyebrow}
            title={mapTitle}
            description={mapDescription}
          />
        </Reveal>
        <div className="container-wide">
          <Reveal delay={0.08}>
            <MapExplorer
              defaultCategory={mapCategory}
              lockCategory
              defaultSelectedId={mapDefaultPointId}
            />
          </Reveal>
        </div>
      </section>

      <section className="pb-16 lg:pb-24">
        <div className="container-wide grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <PagePanel className="p-8 lg:p-10">
              <IconBadge icon={Lightbulb} size="sm" variant="brand" className="mb-4" />
              <h2 className="font-display text-2xl text-fg lg:text-3xl">
                Consejos para tu visita
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-fg">
                Recomendaciones prácticas del equipo de Ovalle Turismo para aprovechar mejor
                cada experiencia en el valle.
              </p>
              <ul className="mt-8 space-y-5">
                {tips.map((tip) => (
                  <li key={tip.title} className="flex gap-4">
                    <IconBadge icon={tip.icon} size="sm" variant="soft" />
                    <div>
                      <p className="font-sans text-sm font-semibold text-fg">{tip.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-fg">{tip.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </PagePanel>
          </Reveal>

          <Reveal delay={0.1}>
            <PagePanel animated className="flex h-full flex-col justify-between p-8 lg:p-10">
              <div>
                <p className="eyebrow-brand">Planifica</p>
                <h3 className="mt-3 font-display text-2xl text-fg">
                  Arma tu ruta por el Limarí
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-fg">
                  Combina naturaleza, patrimonio y gastronomía en un mismo viaje. Usa el
                  planificador para recibir sugerencias según tus días e intereses.
                </p>
              </div>
              <a
                href="/planifica"
                className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-copper px-6 py-3 font-sans text-sm font-medium text-white transition hover:bg-copper/90"
              >
                Planificar mi viaje
              </a>
            </PagePanel>
          </Reveal>
        </div>
      </section>
    </>
  );
}
