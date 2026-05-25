"use client";

import Image from "next/image";
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
  Waves,
  Wine,
} from "lucide-react";
import { TechSectionShell } from "@/components/brand/TechSectionShell";
import { IconBadge } from "@/components/ui/IconBadge";
import { PagePanel } from "@/components/ui/PagePanel";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useFichaOptional } from "@/components/providers/FichaProvider";
import { LIMARI_COMMUNITIES, LIMARI_EXPERIENCES } from "@/lib/data/fichas";
import { fichaLabel } from "@/lib/types/ficha";
import { IMAGES } from "@/lib/data/site";
import { PAGE_ICONS } from "@/lib/icons/page-icons";
import { cn } from "@/lib/utils";

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
  { icon: Waves, label: "Pacífico", text: "Mariscos, pescados y brisa del norte" },
] as const;

const ESSENCE = [
  {
    icon: Wine,
    title: "Vinos de mineralidad",
    text: "Chardonnay y varietales de autor bajo la influencia de Humboldt.",
    href: "/descubre/enoturismo",
  },
  {
    icon: Sparkles,
    title: "Pisco & tradición",
    text: "Denominaciones de Origen entre las más antiguas de América.",
    href: "/descubre/enoturismo",
  },
  {
    icon: UtensilsCrossed,
    title: "Mar y campo",
    text: "Cabrito, quesos de cabra, aceitunas y aceites premiados.",
    href: "/descubre/gastronomia",
  },
  {
    icon: Moon,
    title: "Cielos del desierto",
    text: "Noches despejadas entre valles, observación y astroturismo.",
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
      <div className="container-wide grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal direction="left">
          <SectionHeading
            icon={PAGE_ICONS.valles}
            eyebrow="El territorio"
            title="Donde el desierto florece entre Andes y océano"
            description="Un paisaje único en Chile: valles transversales, camanchaca, suelos calcáreos y una cultura viva que se saborea en cada rincón."
          />
          <div className="prose-valle mt-8 space-y-5">
            <p>
              Los Valles del Limarí forman uno de los territorios más singulares del país. Entre
              la cordillera y el Pacífico nace un valle donde convergen naturaleza, vino, pisco y
              tradiciones milenarias.
            </p>
            <p>
              El Limarí es cuna de la viticultura chilena y hogar de dos Denominaciones de Origen
              históricas: Pisco y Pajarete. Hoy produce vinos de alta gama con mineralidad y
              frescura incomparables.
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

        <Reveal direction="right" className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] image-frame-glow">
            <Image
              src={IMAGES.limari}
              alt="Valle del Limarí"
              fill
              className="object-cover transition duration-700 hover:scale-[1.03]"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="absolute -bottom-6 -left-4 w-44 overflow-hidden rounded-2xl border-4 border-bg shadow-xl lg:-left-8 lg:w-52"
          >
            <div className="relative aspect-square">
              <Image src={IMAGES.desembocadura} alt="Desembocadura Limarí" fill className="object-cover" />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="absolute -right-3 top-8 w-36 overflow-hidden rounded-2xl border-4 border-bg shadow-xl lg:-right-6 lg:w-44"
          >
            <div className="relative aspect-[3/4]">
              <Image src={IMAGES.vinedos} alt="Viñedos Limarí" fill className="object-cover" />
            </div>
          </motion.div>
        </Reveal>
      </div>
    </TechSectionShell>
  );
}

function VallesTerritoryFlow() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-night py-24 text-white lg:py-32">
      <div className="mesh-bg pointer-events-none absolute inset-0 opacity-25" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,203,5,0.1),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgba(61,143,217,0.12),transparent_50%)]" />

      <div className="container-wide relative">
        <Reveal>
          <SectionHeading
            dark
            align="center"
            icon={PAGE_ICONS.valles}
            eyebrow="Geografía viva"
            title="Del altiplano al mar en un solo valle"
            description="La corriente de Humboldt, la camanchaca y los suelos calcáreos esculpen un ecosistema irrepetible."
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

        <div className="grid gap-8 lg:grid-cols-[minmax(0,340px)_1fr] lg:gap-12">
          <Stagger className="flex flex-row gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0" stagger={0.06}>
            {LIMARI_COMMUNITIES.map((comuna) => {
              const selected = comuna.id === activeId;
              return (
                <StaggerItem key={comuna.id}>
                  <button
                    type="button"
                    onClick={() => setActiveId(comuna.id)}
                    className={cn(
                      "group flex w-full min-w-[200px] shrink-0 items-center gap-4 rounded-2xl border px-4 py-4 text-left transition duration-300 lg:min-w-0",
                      selected
                        ? "gradient-border border-brand-blue/40 bg-brand-blue/10 shadow-glow-blue"
                        : "tech-card-frame hover:border-brand-orange/25"
                    )}
                  >
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                      <Image src={comuna.image} alt={comuna.name} fill className="object-cover" sizes="56px" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-accent text-[10px] uppercase tracking-wider text-muted">
                        {comuna.type}
                      </p>
                      <p className="font-display text-lg font-bold text-fg">{comuna.name}</p>
                    </div>
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
                <div className="grid lg:grid-cols-2">
                  <div className="relative min-h-[260px] lg:min-h-[420px]">
                    <Image
                      src={active.image}
                      alt={fichaLabel(active)}
                      fill
                      className="object-cover"
                      sizes="(max-width:1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-night/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-night/20" />
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
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function VallesExperiences() {
  const fichaCtx = useFichaOptional();
  const reduced = useReducedMotion();

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

      <div className="container-wide grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {LIMARI_EXPERIENCES.map((item, i) => (
          <Reveal key={item.id} delay={0.05 * i}>
            <motion.button
              type="button"
              whileHover={reduced ? undefined : { y: -4 }}
              onClick={() => fichaCtx?.openFicha(item.id)}
              className={cn(
                "group tech-card-frame w-full overflow-hidden text-left card-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/40",
                i === 0 && "md:col-span-2 md:row-span-2"
              )}
            >
              <div className={cn("relative overflow-hidden", i === 0 ? "aspect-[16/10] md:aspect-auto md:min-h-[360px]" : "aspect-[4/3]")}>
                <Image
                  src={item.image}
                  alt={fichaLabel(item)}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes={i === 0 ? "66vw" : "33vw"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  {item.type && (
                    <p className="eyebrow-light !text-[10px]">{item.type}</p>
                  )}
                  <h3 className={cn("heading-md text-white", i === 0 && "text-2xl lg:text-3xl")}>
                    {fichaLabel(item)}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-sand/90">
                    {item.description}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 font-accent text-[10px] uppercase tracking-wider text-brand-yellow opacity-0 transition group-hover:opacity-100">
                    Ver ficha <ArrowUpRight size={12} />
                  </span>
                </div>
              </div>
            </motion.button>
          </Reveal>
        ))}
      </div>
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
            className="relative h-48 w-72 shrink-0 overflow-hidden rounded-2xl md:h-56 md:w-96"
          >
            <Image src={item.src} alt={item.alt} fill className="object-cover" sizes="384px" />
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
