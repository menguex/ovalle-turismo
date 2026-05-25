"use client";

import Link from "next/link";
import { ArrowUpRight, Bed, Calendar, Compass, Info, UtensilsCrossed } from "lucide-react";
import { QUICK_LINKS } from "@/lib/data/site";
import { HOME_SECTION_ICONS } from "@/lib/icons/page-icons";
import { TechSectionShell } from "@/components/brand/TechSectionShell";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons = {
  bed: Bed,
  utensils: UtensilsCrossed,
  calendar: Calendar,
  info: Info,
  compass: Compass,
};

export function QuickLinks() {
  return (
    <TechSectionShell
      id="explorar"
      variant="subtle"
      glow
      className="border-y border-border bg-surface py-16 lg:py-20"
    >
      <div className="container-wide">
        <Reveal>
          <SectionHeading
            align="center"
            icon={HOME_SECTION_ICONS.pillars}
            eyebrow="Acceso rápido"
            title="¿Qué necesitas?"
            description="Encuentra alojamiento, gastronomía, eventos e información práctica para armar tu visita."
            className="mx-auto mb-12"
          />
        </Reveal>
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5" stagger={0.06}>
          {QUICK_LINKS.map((item) => {
            const Icon = icons[item.icon];
            return (
              <StaggerItem key={item.href}>
                <Link
                  href={item.href}
                  className="tech-card-frame group flex h-full flex-col p-5 transition duration-500 hover:border-brand-orange/30 hover:shadow-lg hover:shadow-glow card-hover"
                >
                  <div className="mb-4 inline-flex w-fit rounded-full bg-gradient-to-br from-brand-yellow/15 to-brand-blue/10 p-3 text-brand-orange shadow-sm transition duration-300 group-hover:bg-brand-gradient group-hover:text-night">
                    <Icon size={22} strokeWidth={1.75} />
                  </div>
                  <span className="font-sans text-sm font-semibold text-fg">{item.label}</span>
                  <span className="mt-1 flex-1 text-xs leading-relaxed text-muted-fg">
                    {item.description}
                  </span>
                  <span className="mt-4 inline-flex items-center gap-1 rounded-full bg-brand-blue/10 px-2.5 py-1 font-accent text-[10px] uppercase tracking-wider text-brand-blue opacity-0 transition group-hover:opacity-100">
                    Ir <ArrowUpRight size={12} />
                  </span>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </TechSectionShell>
  );
}
