import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero, PlannerCTA } from "@/components/sections/PageHero";
import { IconBadge } from "@/components/ui/IconBadge";
import { getPillarIcon } from "@/lib/icons/page-icons";
import { IMAGES, PILLARS } from "@/lib/data/site";

export const metadata = {
  title: "Descubre Ovalle",
};

export default function DescubrePage() {
  return (
    <>
      <PageHero
        icon="experiencias"
        eyebrow="Experiencias"
        title="Siempre hay algo que vivir en Ovalle"
        subtitle="Cultura, patrimonio y naturaleza en el corazón del Valle del Limarí."
        image={IMAGES.experiencias}
      />
      <section className="py-20 lg:py-28">
        <div className="container-wide grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((pillar) => {
            const PillarIcon = getPillarIcon(pillar.id);
            return (
            <Link
              key={pillar.id}
              href={pillar.href}
              className="tech-card-frame group rounded-3xl border border-border bg-surface p-8 transition hover:-translate-y-1 hover:shadow-lg card-hover"
            >
              <IconBadge icon={PillarIcon} size="sm" variant="brand" className="mb-4" />
              <p className="font-accent text-xs uppercase tracking-wider text-brand-orange">
                {pillar.subtitle}
              </p>
              <h2 className="mt-3 font-display text-3xl text-fg">{pillar.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-fg">{pillar.description}</p>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-brand-blue">
                Explorar <ArrowUpRight size={16} />
              </span>
            </Link>
            );
          })}
        </div>
      </section>
      <PlannerCTA />
    </>
  );
}
