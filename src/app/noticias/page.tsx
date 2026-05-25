import { PageHero } from "@/components/sections/PageHero";
import { NewsShowcase } from "@/components/sections/NewsShowcase";
import { IMAGES } from "@/lib/data/site";

export const metadata = {
  title: "Noticias",
};

export default function NoticiasPage() {
  return (
    <>
      <PageHero
        icon="noticias"
        eyebrow="Blog"
        title="Noticias del valle"
        subtitle="Eventos, vendimia, temporada estival y novedades turísticas de Ovalle."
        image={IMAGES.vendimia}
      />
      <NewsShowcase fullPage />
    </>
  );
}
