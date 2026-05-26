"use client";

import { MapPin, Moon, Sun, Wine } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

const STATS = [
  {
    icon: MapPin,
    value: "400 km",
    numericValue: 400,
    suffix: " km",
    label: "Desde Santiago",
    detail: "Ruta 5 · Norte de Chile",
  },
  {
    icon: Moon,
    value: "Abr – Sep",
    label: "Mejor astroturismo",
    detail: "Cielos despejados del valle",
  },
  {
    icon: Sun,
    value: "UNESCO",
    label: "Fray Jorge",
    detail: "Reserva de la Biosfera",
  },
  {
    icon: Wine,
    value: "6+",
    numericValue: 6,
    suffix: "+",
    label: "Experiencias clave",
    detail: "Naturaleza · vino · cultura",
  },
] as const;

export function DestinationStats() {
  const reduced = useReducedMotion();

  return (
    <section className="relative z-10 -mt-16 pb-4 lg:-mt-20">
      <div className="container-wide">
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.07}>
          {STATS.map((stat) => (
            <StaggerItem key={stat.label}>
              <motion.div
                className="group glass-tech rounded-2xl p-5 shadow-card transition duration-500 hover:border-brand-orange/25 hover:shadow-card dark:hover:shadow-card-dark"
                whileHover={reduced ? undefined : { y: -6, scale: 1.02 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div
                  className="stat-pill-icon mb-4"
                  whileHover={reduced ? undefined : { rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <stat.icon size={18} strokeWidth={1.75} />
                </motion.div>
                <p className="stat-value">
                  {"numericValue" in stat ? (
                    <AnimatedCounter
                      value={stat.numericValue}
                      suffix={stat.suffix}
                      duration={2}
                    />
                  ) : (
                    stat.value
                  )}
                </p>
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

export function InfoHighlights() {
  const reduced = useReducedMotion();
  const highlights = [
    "Valle del Encanto",
    "Astroturismo",
    "Vendimia 2026",
    "Ruta enoturística",
    "Cultura diaguita",
  ];

  return (
    <Stagger className="mt-8 flex flex-wrap gap-2" stagger={0.05}>
      {highlights.map((item) => (
        <StaggerItem key={item}>
          <motion.span
            className="info-chip transition duration-300 hover:shadow-md"
            whileHover={reduced ? undefined : { y: -3, scale: 1.05 }}
            whileTap={reduced ? undefined : { scale: 0.97 }}
          >
            {item}
          </motion.span>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
