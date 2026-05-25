"use client";

import Image from "next/image";
import { Moon, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { IMAGES } from "@/lib/data/site";
import { HOME_SECTION_ICONS } from "@/lib/icons/page-icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";

const ASTRO_STATS = [
  { icon: Star, label: "Cielos limpios", value: "Norte de Chile" },
  { icon: Moon, label: "Mejor época", value: "Abr – Sep" },
  { icon: Sparkles, label: "Experiencia", value: "Observación" },
] as const;

export function AstroSection() {
  return (
    <section className="relative overflow-hidden bg-night py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_20%_80%,rgba(61,143,217,0.12),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_85%_15%,rgba(255,203,5,0.08),transparent_55%)]" />

      <div className="pointer-events-none absolute inset-0 opacity-30">
        {[...Array(48)].map((_, i) => (
          <span
            key={i}
            className="absolute h-0.5 w-0.5 rounded-full bg-white animate-shimmer"
            style={{
              left: `${(i * 19) % 100}%`,
              top: `${(i * 27) % 100}%`,
              animationDelay: `${i * 0.12}s`,
            }}
          />
        ))}
      </div>

      <div className="container-wide relative grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <SectionHeading
            dark
            icon={HOME_SECTION_ICONS.astro}
            eyebrow="Astroturismo"
            title="Aquí las estrellas no compiten con nadie"
            description="Contempla cielos únicos en el Valle del Limarí. Noches despejadas, silencio del desierto y una de las mejores ventanas astronómicas del norte de Chile."
          />
          <Stagger className="mt-8 grid gap-3 sm:grid-cols-3" stagger={0.08}>
            {ASTRO_STATS.map((item) => (
              <StaggerItem key={item.label}>
                <div className="group dark-stat-card cursor-default p-4 sm:p-5">
                  <div className="dark-stat-icon">
                    <item.icon size={18} strokeWidth={1.75} />
                  </div>
                  <p className="dark-stat-label">{item.label}</p>
                  <p className="dark-stat-value">{item.value}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/descubre/astroturismo">Ver astroturismo</Button>
            <Button href="/servicios#alojamiento" variant="secondary">
              Alojamientos astro
            </Button>
          </div>
        </Reveal>

        <Reveal direction="right" className="relative aspect-[4/5] overflow-hidden rounded-3xl">
          <div className="orbit-ring absolute -right-8 -top-8 h-24 w-24 opacity-40" />
          <div className="orbit-ring absolute -bottom-6 -left-6 h-16 w-16 opacity-30 [animation-direction:reverse]" />
          <Image
            src={IMAGES.encanto}
            alt="Astroturismo Valle del Encanto"
            fill
            className="object-cover transition duration-700 ease-premium hover:scale-[1.03]"
            sizes="(max-width:1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-transparent to-night/20" />
          <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10" />
        </Reveal>
      </div>
    </section>
  );
}
