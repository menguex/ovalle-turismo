import Link from "next/link";
import SiteImage from "@/components/ui/SiteImage";
import { ArrowUpRight, Mail, MapPin, Phone, Share2 } from "lucide-react";
import { NAV, PARTNERS, SITE } from "@/lib/data/site";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

export function Footer() {
  return (
    <footer className="footer-mesh relative bg-night text-sand">
      {/* Gradient top edge */}
      <div
        className="brand-accent-bar-animated absolute inset-x-0 top-0 opacity-60"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-brand-blue/8 to-transparent"
        aria-hidden
      />

      {/* Pre-footer CTA strip */}
      <div className="border-b border-white/8 bg-gradient-to-r from-night via-[#12141f] to-night">
        <div className="container-wide flex flex-col items-start justify-between gap-6 py-10 sm:flex-row sm:items-center">
          <div>
            <p className="eyebrow-light mb-2">Planifica tu visita</p>
            <h3 className="font-display text-2xl font-bold text-mist sm:text-3xl">
              El Valle del Limarí te espera
            </h3>
          </div>
          <Link
            href="/planifica"
            className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 font-sans text-sm font-semibold text-night transition hover:brightness-105"
          >
            Arma tu itinerario
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>

      <div className="container-wide py-16">
        <Stagger className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <StaggerItem>
            <BrandLogo variant="footer" background="dark" className="mb-6" imageClassName="h-11" />
            <p className="max-w-sm font-sans text-sm leading-relaxed text-sand/85">
              {SITE.tagline}. Descubre el Valle del Limarí a través de experiencias
              auténticas, naturaleza, cultura y cielos únicos del norte de Chile.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/12 p-3 text-sand/80 transition hover:border-brand-orange/40 hover:bg-white/8 hover:text-white"
                aria-label="Instagram"
              >
                <Share2 size={16} />
              </a>
            </div>
          </StaggerItem>

          <StaggerItem>
            <h3 className="stat-label mb-5 text-gold">Explorar</h3>
            <ul className="space-y-3 font-sans text-sm text-sand/85">
              {NAV.slice(0, 4).map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-underline transition hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/nosotros" className="link-underline transition hover:text-white">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/tour-360" className="link-underline transition hover:text-white">
                  Tour 360°
                </Link>
              </li>
            </ul>
          </StaggerItem>

          <StaggerItem>
            <h3 className="stat-label mb-5 text-gold">Contacto</h3>
            <ul className="space-y-4 font-sans text-sm text-sand/85">
              <li className="flex items-start gap-3">
                <Mail size={15} className="mt-0.5 shrink-0 text-copper" />
                <a href={`mailto:${SITE.email}`} className="hover:text-white">
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={15} className="mt-0.5 shrink-0 text-copper" />
                <div className="space-y-1">
                  {SITE.phones.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                      className="block hover:text-white"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={15} className="mt-0.5 shrink-0 text-copper" />
                <a
                  href={SITE.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  {SITE.address}
                </a>
              </li>
            </ul>
          </StaggerItem>

          <StaggerItem>
            <h3 className="stat-label mb-5 text-gold">El Cielo del Limarí</h3>
            <p className="mb-5 font-sans text-sm leading-relaxed text-sand/80">
              Recibe rutas, eventos y las mejores noches para astroturismo en tu correo.
            </p>
            <NewsletterForm />
          </StaggerItem>
        </Stagger>
      </div>

      <div className="border-t border-white/8 bg-white/[0.02]">
        <div className="container-wide py-8 lg:py-10">
          <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-between lg:gap-10">
            <p className="shrink-0 font-accent text-[11px] uppercase tracking-[0.22em] text-sand/50">
              Con el apoyo de
            </p>
            <ul className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
              {PARTNERS.map((partner) => (
                <li key={partner.name}>
                  <a
                    href={partner.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-14 min-w-[7.5rem] items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 transition hover:border-white/20 hover:bg-white/[0.08]"
                    aria-label={partner.name}
                  >
                    <SiteImage
                      src={partner.image}
                      alt=""
                      width={120}
                      height={48}
                      className="h-9 w-auto max-w-[7rem] object-contain opacity-80 transition duration-300 group-hover:opacity-100 sm:h-10 sm:max-w-[8.5rem]"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/8">
        <div className="container-wide flex flex-col gap-3 py-6 font-sans text-xs text-sand/65 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} — {SITE.name}. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            <Link href="https://www.sernatur.cl" target="_blank" className="transition hover:text-sand/80">
              Sernatur
            </Link>
            <Link href="https://muniovalle.cl" target="_blank" className="transition hover:text-sand/80">
              Municipalidad de Ovalle
            </Link>
            <Link href="https://montepatriaturismo.cl/" target="_blank" className="transition hover:text-sand/80">
              Monte Patria Turismo
            </Link>
            <Link href="https://turismoriohurtado.cl/" target="_blank" className="transition hover:text-sand/80">
              Turismo Río Hurtado
            </Link>
            <Link href="/contacto" className="transition hover:text-sand/80">
              Contacto
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
