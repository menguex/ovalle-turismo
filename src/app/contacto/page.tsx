import { Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { PagePanel } from "@/components/ui/PagePanel";
import { IMAGES, SITE } from "@/lib/data/site";

export const metadata = {
  title: "Contacto",
};

export default function ContactoPage() {
  return (
    <>
      <PageHero
        icon="contacto"
        eyebrow="Contacto"
        title="Hablemos de tu viaje"
        subtitle="Completa el formulario, escríbenos o contáctanos por redes sociales."
        image={IMAGES.heroPlaza}
      />
      <section className="py-20 lg:py-28">
        <div className="container-wide grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <PagePanel className="space-y-8 p-8 lg:p-10">
            <div className="flex gap-4">
              <Mail className="mt-1 shrink-0 text-copper" size={20} />
              <div>
                <p className="font-accent text-xs uppercase tracking-wider text-muted">Email</p>
                <a href={`mailto:${SITE.email}`} className="text-lg text-fg hover:text-copper">
                  {SITE.email}
                </a>
              </div>
            </div>
            <div className="flex gap-4">
              <Phone className="mt-1 shrink-0 text-copper" size={20} />
              <div>
                <p className="font-accent text-xs uppercase tracking-wider text-muted">Teléfono</p>
                <div className="space-y-1">
                  {SITE.phones.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                      className="block text-lg text-fg hover:text-copper"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <MapPin className="mt-1 shrink-0 text-copper" size={20} />
              <div>
                <p className="font-accent text-xs uppercase tracking-wider text-muted">Dirección</p>
                <a
                  href={SITE.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-fg hover:text-copper"
                >
                  {SITE.address}
                </a>
              </div>
            </div>
          </PagePanel>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
