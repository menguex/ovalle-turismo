"use client";

import { MapPin, Moon, Sun, Wine } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";

const STATS = [
  {
    icon: MapPin,
    value: "400 km",
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
    label: "Experiencias clave",
    detail: "Naturaleza · vino · cultura",
  },
] as const;

export function DestinationStats() {
  return (
    <section className="relative z-10 -mt-16 pb-4 lg:-mt-20">
      <div className="container-wide">
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.07}>
          {STATS.map((stat) => (
            <StaggerItem key={stat.label}>
              <div className="group glass-tech rounded-2xl p-5 shadow-card transition duration-500 hover:border-brand-orange/25 hover:shadow-card dark:hover:shadow-card-dark">
                <div className="stat-pill-icon mb-4">
                  <stat.icon size={18} strokeWidth={1.75} />
                </div>
                <p className="stat-value">{stat.value}</p>
                <p className="mt-1 font-sans text-sm font-semibold text-fg">{stat.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted">{stat.detail}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

export function InfoHighlights() {
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
          <span className="info-chip transition duration-300 hover:-translate-y-0.5 hover:shadow-md">
            {item}
          </span>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
