"use client";

import type { Ficha } from "@/lib/types/ficha";
import { Compass } from "lucide-react";
import { TOUR_OPERATORS } from "@/lib/data/fichas";
import { InteractiveCardGrid } from "@/components/ui/InteractiveCardGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function TourOperatorsSection({
  items = TOUR_OPERATORS,
}: {
  items?: readonly Ficha[];
}) {
  return (
    <section id="tours" className="section-alt pb-20 lg:pb-28">
      <div className="container-wide mb-8 pt-4">
        <SectionHeading
          icon={Compass}
          eyebrow="Tour operadores"
          title="Operadores locales"
          description="Conoce a los tour operadores locales que harán de tu visita a Ovalle una experiencia inolvidable: guías del valle, patrimonio diaguita, naturaleza y astroturismo cultural."
        />
      </div>
      <InteractiveCardGrid items={items} />
    </section>
  );
}
