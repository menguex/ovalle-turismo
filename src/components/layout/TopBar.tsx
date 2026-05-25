import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { SITE } from "@/lib/data/site";

export function TopBar() {
  return (
    <div className="relative z-[51] hidden border-b border-white/5 bg-night/90 text-sand/80 backdrop-blur-md md:block">
      <div className="brand-accent-bar-animated absolute inset-x-0 top-0 opacity-90" aria-hidden />
      <div className="container-wide flex h-9 items-center justify-between text-xs">
        <p className="font-accent uppercase tracking-[0.12em] text-sand/75">
          Corazón del Valle del Limarí · Coquimbo, Chile
        </p>
        <div className="flex items-center gap-5">
          <a
            href={`tel:${SITE.phones[0].replace(/\s/g, "")}`}
            className="inline-flex items-center gap-1.5 transition hover:text-white"
          >
            <Phone size={12} />
            {SITE.phones[0]}
          </a>
          <a
            href={`mailto:${SITE.email}`}
            className="inline-flex items-center gap-1.5 transition hover:text-white"
          >
            <Mail size={12} />
            {SITE.email}
          </a>
          <Link
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-white"
          >
            Instagram
          </Link>
        </div>
      </div>
    </div>
  );
}
