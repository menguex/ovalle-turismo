"use client";

import Image from "next/image";
import { Moon, Sparkles, Star } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { IMAGES } from "@/lib/data/site";
import { HOME_SECTION_ICONS } from "@/lib/icons/page-icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { FloatingParticles } from "@/components/ui/FloatingParticles";
import { CursorGlow } from "@/components/ui/CursorGlow";
import { MagneticWrapper } from "@/components/ui/MagneticWrapper";

const ASTRO_STATS = [
  { icon: Star, label: "Cielos limpios", value: "Norte de Chile" },
  { icon: Moon, label: "Mejor época", value: "Abr – Sep" },
  { icon: Sparkles, label: "Experiencia", value: "Observación" },
] as const;

export function AstroSection() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-night py-24 lg:py-32">
      <CursorGlow color="rgba(61, 143, 217, 0.08)" size={500} />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_20%_80%,rgba(61,143,217,0.12),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_85%_15%,rgba(255,203,5,0.08),transparent_55%)]" />

      {/* Enhanced star field with FloatingParticles */}
      <FloatingParticles
        className="absolute inset-0"
        count={80}
        colors={["#ffffff", "#ffffff", "#3D8FD9", "#FFCB05"]}
        maxSize={2.5}
        speed={0.3}
      />

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
                <motion.div
                  className="group dark-stat-card cursor-default p-4 sm:p-5"
                  whileHover={reduced ? undefined : { y: -4, scale: 1.02 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="dark-stat-icon">
                    <item.icon size={18} strokeWidth={1.75} />
                  </div>
                  <p className="dark-stat-label">{item.label}</p>
                  <p className="dark-stat-value">{item.value}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
          <motion.div
            className="mt-10 flex flex-wrap gap-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <MagneticWrapper strength={0.25}>
              <Button href="/descubre/astroturismo">Explorar astroturismo</Button>
            </MagneticWrapper>
            <MagneticWrapper strength={0.25}>
              <Button href="/descubre/astroturismo#alojamiento" variant="secondary">
                Dónde dormir bajo las estrellas
              </Button>
            </MagneticWrapper>
          </motion.div>
        </Reveal>

        <Reveal direction="right" className="relative aspect-[4/5] overflow-hidden rounded-3xl">
          <div className="orbit-ring absolute -right-8 -top-8 h-24 w-24 opacity-40" />
          <div className="orbit-ring absolute -bottom-6 -left-6 h-16 w-16 opacity-30 [animation-direction:reverse]" />
          <motion.div className="relative h-full w-full" style={reduced ? undefined : { y: imageY }}>
            <Image
              src={IMAGES.encanto}
              alt="Astroturismo Valle del Encanto"
              fill
              className="object-cover transition duration-700 ease-premium hover:scale-[1.03]"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-transparent to-night/20" />
          <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10" />
        </Reveal>
      </div>
    </section>
  );
}
