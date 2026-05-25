import Image from "next/image";
import { PageHero, PlannerCTA } from "@/components/sections/PageHero";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { PagePanel } from "@/components/ui/PagePanel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PAGE_ICONS } from "@/lib/icons/page-icons";
import { HOME_COPY, IMAGES, PARTNERS } from "@/lib/data/site";

export const metadata = {
  title: "Nosotros",
};

export default function NosotrosPage() {
  return (
    <>
      <PageHero
        icon="nosotros"
        eyebrow="Ovalle Turismo"
        title="¡Bienvenidos a Ovalle, el corazón del Limarí!"
        subtitle="Déjate sorprender por paisajes encantadores, sabores únicos y una cultura que mezcla historia, naturaleza y calidez humana."
        image={IMAGES.alameda}
      />
      <section className="py-20 lg:py-28">
        <div className="container-wide grid items-center gap-8 lg:grid-cols-2">
          <PagePanel className="p-8 lg:p-10">
            <div className="prose-valle space-y-5">
              <p>
                Explora el Valle del Encanto, degusta nuestros quesos y piscos, y
                vive la experiencia del norte chico como nunca antes.
              </p>
              {HOME_COPY.about.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
          </PagePanel>
          <PagePanel className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-night">
            <BrandLogo variant="preloader" background="dark" />
          </PagePanel>
        </div>
      </section>
      <section className="section-alt py-16">
        <div className="container-wide">
          <SectionHeading
            align="center"
            icon={PAGE_ICONS.nosotros}
            title="Nuestros socios"
            className="mx-auto mb-10 text-center"
          />
          <PagePanel className="p-10">
            <div className="flex flex-wrap items-center justify-center gap-12">
              {PARTNERS.map((partner) => (
                <Image
                  key={partner.name}
                  src={partner.image}
                  alt={partner.name}
                  width={120}
                  height={80}
                  className="h-16 w-auto object-contain opacity-80"
                />
              ))}
            </div>
          </PagePanel>
        </div>
      </section>
      <PlannerCTA />
    </>
  );
}
