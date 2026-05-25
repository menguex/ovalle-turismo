import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TOUR_OPERATORS } from "@/lib/data/fichas";
import { HOME_SECTION_ICONS } from "@/lib/icons/page-icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function TourOperatorsPreview() {
  const operators = TOUR_OPERATORS.filter((op) => op.id !== "oficina-turismo").slice(0, 4);

  return (
    <section className="section-surface py-20 lg:py-28">
      <div className="container-wide">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            icon={HOME_SECTION_ICONS.operators}
            eyebrow="Servicios"
            title="Tour operadores locales"
            description="Guías y operadores del Valle del Limarí para armar tu ruta con expertos del territorio."
          />
          <Link
            href="/servicios#tours"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-5 py-2.5 font-accent text-sm uppercase tracking-wider text-fg transition hover:border-copper/40"
          >
            Ver todos
            <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {operators.map((op, i) => (
            <Reveal key={op.id} delay={0.05 * i}>
              <div className="tech-card-frame flex h-full flex-col p-5">
                <p className="font-accent text-[10px] uppercase tracking-wider text-copper">
                  {op.type}
                </p>
                <h3 className="mt-2 font-display text-lg font-semibold text-fg">{op.name}</h3>
                <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-fg">
                  {op.description}
                </p>
                {op.phone && (
                  <p className="mt-4 text-xs text-muted">{op.phone.split(" · ")[0]}</p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
