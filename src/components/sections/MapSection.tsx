import { SectionHeading } from "@/components/ui/SectionHeading";
import { HOME_SECTION_ICONS } from "@/lib/icons/page-icons";
import { Reveal } from "@/components/ui/Reveal";
import { MapExplorer } from "@/components/sections/MapExplorer";

export function MapSection() {
  return (
    <section className="section-alt py-20 lg:py-28">
      <div className="container-wide mb-12">
        <Reveal>
          <SectionHeading
            icon={HOME_SECTION_ICONS.map}
            eyebrow="Mapa interactivo"
            title="Explora el territorio"
            description="Navega el Valle del Limarí: filtra por categoría, selecciona un punto y planifica tu ruta entre naturaleza, enoturismo, cultura y cielos estrellados."
          />
        </Reveal>
      </div>

      <div className="container-wide">
        <Reveal delay={0.1}>
          <MapExplorer />
        </Reveal>
      </div>
    </section>
  );
}
