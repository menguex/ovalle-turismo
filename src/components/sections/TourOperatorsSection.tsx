"use client";

import type { Ficha } from "@/lib/types/ficha";
import { Compass } from "lucide-react";
import { TOUR_OPERATORS } from "@/lib/data/fichas";
import { ServiceListingGrid } from "@/components/ui/ServiceListingGrid";
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
          description="Guías y operadores del Valle del Limarí para armar tu ruta de mar a cordillera. Haz clic en cada ficha para ver contacto, servicios y cómo reservar."
        />
      </div>
      <ServiceListingGrid items={items} pageSize={9} showTypeFilters={false} />
    </section>
  );
}
