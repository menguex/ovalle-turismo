"use client";

import SiteImage from "@/components/ui/SiteImage";
import { InteractiveCardGrid } from "@/components/ui/InteractiveCardGrid";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  CloudFog,
  MapPin,
  Moon,
  Mountain,
  Sparkles,
  UtensilsCrossed,
  Wine,
} from "lucide-react";
import { TechSectionShell } from "@/components/brand/TechSectionShell";
import { IconBadge } from "@/components/ui/IconBadge";
import { PagePanel } from "@/components/ui/PagePanel";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useFichaOptional } from "@/components/providers/FichaProvider";
import { LIMARI_COMMUNITIES, VALLES_EXPERIENCES } from "@/lib/data/fichas";
import { fichaLabel } from "@/lib/types/ficha";
import { IMAGES, REGIONAL_VIDEOS } from "@/lib/data/site";
import { PAGE_ICONS } from "@/lib/icons/page-icons";
import { cn } from "@/lib/utils";
import { SectionVideoBackground } from "@/components/ui/SectionVideoBackground";

const TERRITORY_STATS = [
  { icon: MapPin, value: "5", label: "Comunas del valle", detail: "Ovalle al corazón del Limarí" },
  { icon: Wine, value: "XVI", label: "Siglo vitivinícola", detail: "Primeras parras de Chile" },
  { icon: Sparkles, value: "2", label: "Denominaciones", detail: "Pisco y Pajarete" },
  { icon: Moon, value: "UNESCO", label: "Cielos limpios", detail: "Astroturismo de clase mundial" },
] as const;

const TERRITORY_FLOW = [
  { icon: Mountain, label: "Cordillera", text: "Nieve, termas y valles transversales" },
  { icon: CloudFog, label: "Camanchaca", text: "Neblina oceánica que refresca el valle" },
  { icon: Wine, label: "Territorio", text: "Suelos calcáreos, viñas y pisco de origen" },
  { icon: Moon, label: "Cielos", text: "Horizontes abiertos y astroturismo excepcional" },
] as const;

const ESSENCE = [
  {
    icon: Wine,
    title: "Vinos de mineralidad",
    text: "Vinos de alta gama bajo la corriente de Humboldt y la niebla costera que modera el clima del valle.",
    href: "/descubre/enoturismo",
  },
  {
    icon: Sparkles,
    title: "Pisco & tradición",
    text: "Denominaciones de Origen Pisco y Pajarete, entre las más antiguas de América.",
    href: "/descubre/enoturismo",
  },
  {
    icon: UtensilsCrossed,
    title: "Mar y campo",
    text: "Pescados y mariscos de aguas frías, cabrito, quesos de cabra, aceitunas y aceites premiados.",
    href: "/descubre/gastronomia",
  },
  {
    icon: Moon,
    title: "Cielos del desierto",
    text: "Biodiversidad, rutas enoturísticas y cielos privilegiados para observación astronómica.",
    href: "/descubre/astroturismo",
  },
] as const;

const GALLERY = [
  { src: IMAGES.limari, alt: "Panorama del Valle del Limarí" },
  { src: IMAGES.desembocadura, alt: "Desembocadura del río Limarí" },
  { src: IMAGES.vinedos, alt: "Viñedos del valle" },
  { src: IMAGES.experiencias, alt: "Experiencias en el territorio" },
] as const;

function VallesStatsStrip() {
  return (
    <section className="relative z-10 -mt-14 pb-6 lg:-mt-20">
      <div className="container-wide">
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
          {TERRITORY_STATS.map((stat) => (
            <StaggerItem key={stat.label}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="tech-card-frame group p-5 shadow-card transition duration-500 hover:border-brand-orange/30 hover:shadow-glow"
              >
                <div className="stat-pill-icon mb-4 transition duration-500 group-hover:bg-brand-gradient group-hover:text-night">
                  <stat.icon size={18} strokeWidth={1.75} />
                </div>
                <p className="stat-value text-brand-gradient">{stat.value}</p>
                <p className="mt-1 font-sans text-sm font-semibold text-fg">{stat.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted">{stat.detail}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function VallesIntro() {
  return (
    <TechSectionShell variant="subtle" glow className="section-alt py-20 lg:py-28">
      <div className="container-wide space-y-12">
        <Reveal>
          <div className="relative aspect-[21/9] overflow-hidden rounded-[2rem] image-frame-glow lg:aspect-[2/1]">
            <SiteImage
              src={IMAGES.vinedos}
              alt="Valle del Limarí"
              fill
              className="object-cover transition duration-700 hover:scale-[1.02]"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night/50 via-transparent to-transparent" />
          </div>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,340px)] lg:gap-14">
          <Reveal direction="left">
            <SectionHeading
              icon={PAGE_ICONS.valles}
              eyebrow="El territorio"
              title="Donde el desierto florece entre Andes y océano"
              description="Un paisaje único en Chile: valles transversales, camanchaca, suelos calcáreos y una cultura viva que se saborea en cada rincón."
            />
            <div className="prose-valle mt-8 space-y-5">
              <p>
                Los Valles del Limarí forman uno de los territorios más singulares de Chile. Entre
                la cordillera de los Andes y el océano Pacífico nace un paisaje marcado por valles
                transversales, la frescura de la camanchaca y la riqueza de suelos calcáreos que no
                se encuentran en ningún otro lugar del país.
              </p>
              <p>
                El resultado es una geografía excepcional, donde el desierto se mezcla con oasis
                fértiles, viñedos, olivares, papayeras, huertos y campos caprinos que dan vida a una
                identidad agrícola única.
              </p>
              <h3 className="font-display text-xl font-bold text-fg">Un territorio con historia vitivinícola</h3>
              <p>
                El Limarí es cuna de la viticultura chilena: por este valle ingresaron algunas de las
                primeras parras del país en el siglo XVI. Aquí nacen vinos de alta gama reconocidos
                por su mineralidad, frescura y pureza, bajo la influencia de la corriente de Humboldt
                y la niebla costera que modera el clima.
              </p>
              <p>
                Además, la zona alberga dos Denominaciones de Origen históricas —Pisco y Pajarete—,
                reflejo del profundo arraigo entre territorio, cultivo y cultura.
              </p>
              <h3 className="font-display text-xl font-bold text-fg">Sabores que nacen del territorio</h3>
              <p>
                La gastronomía del valle es una fusión auténtica entre mar y campo: pescados y
                mariscos de aguas frías, cabrito y quesos de cabra artesanales, aceitunas y
                productos del oasis, acompañados de aceites de oliva de clase mundial.
              </p>
              <h3 className="font-display text-xl font-bold text-fg">Un destino para descubrir</h3>
              <p>
                Visitar el Valle del Limarí es recorrer rutas enoturísticas, viñedos, antiguas
                destilerías y pueblos con identidad; conectar con la naturaleza, la biodiversidad y
                los cielos privilegiados para la observación astronómica — un destino para descubrir
                con todos los sentidos.
              </p>
            </div>
            <Link
              href="/planifica"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 font-sans text-sm font-semibold text-night transition hover:opacity-90"
            >
              Armar mi ruta por el valle
              <ArrowUpRight size={16} />
            </Link>
          </Reveal>

          <Reveal direction="right" className="space-y-4">
            <div className="relative aspect-[2/1] overflow-hidden rounded-2xl image-frame-glow">
              <SiteImage src={IMAGES.desembocadura} alt="Desembocadura Limarí" fill className="object-cover" sizes="340px" />
            </div>
            <div className="relative aspect-[2/1] overflow-hidden rounded-2xl image-frame-glow">
              <SiteImage src={IMAGES.vinedos} alt="Viñedos Limarí" fill className="object-cover" sizes="340px" />
            </div>
          </Reveal>
        </div>
      </div>
    </TechSectionShell>
  );
}

function VallesTerritoryFlow() {
  const reduced = useReducedMotion();
  const geoVideo = REGIONAL_VIDEOS.geografiaValle;

  return (
    <section className="relative overflow-hidden bg-night py-24 text-white lg:py-32">
      <SectionVideoBackground
        src={geoVideo.src}
        poster={geoVideo.poster}
        alt={geoVideo.title}
        playbackRate={geoVideo.playbackRate}
        videoClassName="video-bg-dim-cinematic video-bg-smooth-drift"
        overlayClassName="bg-gradient-to-b from-night/90 via-night/78 to-night/92"
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_75%_50%_at_50%_35%,rgba(11,13,23,0.25),rgba(11,13,23,0.65))]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_80%_80%,rgba(61,143,217,0.1),transparent_50%)]" />

      <div className="container-wide relative z-10">
        <Reveal>
          <SectionHeading
            dark
            align="center"
            icon={Mountain}
            eyebrow="Geografía viva"
            title="Donde la tierra define el carácter del valle"
            description="Suelos calcáreos, bruma que modera el clima y cielos limpios del norte chico configuran un territorio irrepetible: cuna del vino chileno, tradición pisquera y paisajes que invitan a quedarse."
            className="mx-auto mb-16 max-w-2xl text-center"
          />
        </Reveal>

        <div className="relative grid gap-8 md:grid-cols-4">
          <div
            className="pointer-events-none absolute left-[12%] right-[12%] top-10 hidden h-px bg-gradient-to-r from-transparent via-brand-yellow/50 to-transparent md:block"
            aria-hidden
          />
          <Stagger className="contents" stagger={0.12}>
            {TERRITORY_FLOW.map((step, i) => (
              <StaggerItem key={step.label}>
                <motion.div
                  whileHover={reduced ? undefined : { y: -6 }}
                  className="group dark-stat-card cursor-default p-6 text-center"
                >
                  <div className="dark-stat-icon mx-auto">
                    <step.icon size={20} strokeWidth={1.75} />
                  </div>
                  <p className="dark-stat-label mt-4">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-2 font-display text-xl font-bold text-white">{step.label}</h3>
                  <p className="text-on-dark-muted mt-2 text-sm leading-relaxed">{step.text}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

function VallesComunasExplorer() {
  const [activeId, setActiveId] = useState(LIMARI_COMMUNITIES[0]?.id ?? "");
  const fichaCtx = useFichaOptional();
  const active = LIMARI_COMMUNITIES.find((c) => c.id === activeId) ?? LIMARI_COMMUNITIES[0];
  const reduced = useReducedMotion();

  return (
    <TechSectionShell variant="page" glow className="py-20 lg:py-28">
      <div className="container-wide">
        <Reveal>
          <SectionHeading
            icon={PAGE_ICONS.valles}
            eyebrow="Comunas"
            title="Explora nuestras comunas"
            description="Cinco territorios, una misma esencia. Selecciona una comuna para descubrir su carácter."
            className="mb-12 max-w-2xl"
          />
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,220px)_1fr] lg:gap-12">
          <Stagger
            className="flex snap-x snap-mandatory flex-row gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-2 lg:overflow-visible lg:pb-0"
            stagger={0.06}
          >
            {LIMARI_COMMUNITIES.map((comuna) => {
              const selected = comuna.id === activeId;
              return (
                <StaggerItem key={comuna.id} className="snap-start">
                  <button
                    type="button"
                    onClick={() => setActiveId(comuna.id)}
                    className={cn(
                      "group w-full min-w-[8.5rem] shrink-0 rounded-xl border px-4 py-3 text-left transition duration-300 lg:min-w-0 lg:px-5 lg:py-3.5",
                      selected
                        ? "border-brand-blue/50 bg-brand-blue/10 shadow-glow-blue"
                        : "border-border/80 bg-surface/50 hover:border-brand-orange/30 hover:bg-surface-elevated"
                    )}
                  >
                    <p
                      className={cn(
                        "font-accent text-[9px] uppercase tracking-wider transition lg:text-[10px]",
                        selected ? "text-brand-blue" : "text-muted"
                      )}
                    >
                      {comuna.type}
                    </p>
                    <p
                      className={cn(
                        "mt-0.5 font-display text-base font-bold transition lg:text-lg",
                        selected ? "text-fg" : "text-fg/90 group-hover:text-fg"
                      )}
                    >
                      {comuna.name}
                    </p>
                  </button>
                </StaggerItem>
              );
            })}
          </Stagger>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={reduced ? false : { opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduced ? undefined : { opacity: 0, x: -16 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <PagePanel animated className="overflow-hidden">
                <div className="flex flex-col">
                  <div className="relative aspect-[21/9] w-full lg:aspect-[2/1]">
                    <SiteImage
                      src={active.image}
                      alt={fichaLabel(active)}
                      fill
                      className="object-cover"
                      sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-night/40 via-transparent to-transparent" />
                  </div>
                  <div className="flex flex-col justify-center p-8 lg:p-10">
                    <IconBadge icon={MapPin} size="sm" variant="brand" className="mb-4 w-fit" />
                    <h3 className="font-display text-3xl font-bold text-fg lg:text-4xl">
                      {active.name}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed text-muted-fg">{active.description}</p>
                    {active.highlights && (
                      <div className="mt-6 flex flex-wrap gap-2">
                        {active.highlights.map((h) => (
                          <span
                            key={h}
                            className="rounded-full border border-border bg-surface-elevated px-3 py-1 font-accent text-[10px] uppercase tracking-wider text-muted-fg"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => fichaCtx?.openFicha(active.id)}
                      className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-brand-gradient px-5 py-2.5 font-sans text-sm font-semibold text-night transition hover:opacity-90"
                    >
                      Ver ficha completa
                      <ArrowUpRight size={15} />
                    </button>
                  </div>
                </div>
              </PagePanel>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </TechSectionShell>
  );
}

function VallesEssence() {
  const reduced = useReducedMotion();

  return (
    <section className="section-surface py-20 lg:py-28">
      <div className="container-wide">
        <Reveal>
          <SectionHeading
            align="center"
            icon={PAGE_ICONS.experiencias}
            eyebrow="Identidad"
            title="La esencia del Limarí"
            description="Cuatro pilares que definen la experiencia de viaje en el valle."
            className="mx-auto mb-14 max-w-2xl text-center"
          />
        </Reveal>
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
          {ESSENCE.map((item) => (
            <StaggerItem key={item.title}>
              <motion.div
                whileHover={reduced ? undefined : { y: -5 }}
                whileTap={reduced ? undefined : { scale: 0.99 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
              >
              <Link
                href={item.href}
                className="tech-card-frame group pillar-card-shine flex h-full flex-col p-6 transition duration-500 hover:border-brand-orange/30 hover:shadow-glow card-hover"
              >
                <div className="mb-4 inline-flex rounded-full bg-gradient-to-br from-brand-yellow/15 to-brand-blue/10 p-3 text-brand-orange transition duration-500 group-hover:bg-brand-gradient group-hover:text-night">
                  <item.icon size={22} strokeWidth={1.75} />
                </div>
                <h3 className="font-display text-xl font-bold text-fg">{item.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-fg">{item.text}</p>
                <span className="mt-5 inline-flex items-center gap-1 font-accent text-[10px] uppercase tracking-wider text-brand-blue opacity-0 transition group-hover:opacity-100">
                  Explorar <ArrowUpRight size={12} />
                </span>
              </Link>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function VallesExperiences() {
  return (
    <section className="section-alt py-20 lg:py-28">
      <div className="container-wide mb-12">
        <Reveal>
          <SectionHeading
            icon={PAGE_ICONS.experiencias}
            title="Experiencias imperdibles"
            description="Sabores, paisajes y tradiciones que dan vida al valle. Haz clic para abrir cada ficha."
          />
        </Reveal>
      </div>
      <InteractiveCardGrid items={VALLES_EXPERIENCES} featuredFirst pageSize={0} />
    </section>
  );
}

function VallesGalleryStrip() {
  const reduced = useReducedMotion();

  return (
    <section className="overflow-hidden border-y border-border bg-surface py-10">
      <motion.div
        className="flex gap-4"
        animate={reduced ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {[...GALLERY, ...GALLERY].map((item, i) => (
          <div
            key={`${item.src}-${i}`}
            className="relative aspect-[21/9] h-52 w-[min(42rem,85vw)] shrink-0 overflow-hidden rounded-2xl sm:h-60 md:h-72 md:w-[36rem]"
          >
            <SiteImage src={item.src} alt={item.alt} fill className="object-cover" sizes="576px" />
          </div>
        ))}
      </motion.div>
    </section>
  );
}

export function VallesLimariShowcase() {
  return (
    <>
      <VallesStatsStrip />
      <VallesIntro />
      <VallesTerritoryFlow />
      <VallesComunasExplorer />
      <VallesEssence />
      <VallesGalleryStrip />
      <VallesExperiences />
    </>
  );
}
