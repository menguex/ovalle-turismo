"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PILLARS } from "@/lib/data/site";
import { HOME_SECTION_ICONS } from "@/lib/icons/page-icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";

export function Pillars() {
  return (
    <section className="section-surface py-20 lg:py-28">
      <Reveal className="container-wide mb-12">
        <SectionHeading
          icon={HOME_SECTION_ICONS.pillars}
          eyebrow="Experiencias"
          title="¿Qué quieres vivir?"
          description="Seis formas de descubrir Ovalle: desde cielos estrellados hasta sabores de origen y tradiciones vivas."
        />
      </Reveal>

      <Stagger className="container-wide grid gap-4 sm:grid-cols-2 xl:grid-cols-3" stagger={0.07}>
        {PILLARS.map((pillar) => (
          <StaggerItem key={pillar.id}>
            <Link
              href={pillar.href}
              className="group relative block aspect-[4/5] overflow-hidden rounded-3xl card-hover ring-1 ring-white/0 transition duration-500 hover:ring-white/15"
            >
              <div className="pillar-card-shine" aria-hidden />
              <Image
                src={pillar.image}
                alt={pillar.title}
                fill
                className="object-cover transition duration-700 ease-premium group-hover:scale-105"
                sizes="(max-width:768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night via-night/45 to-night/10" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <p className="eyebrow-light !text-[10px]">{pillar.subtitle}</p>
                <h3 className="heading-md mt-2 text-white">{pillar.title}</h3>
                <p className="mt-2 line-clamp-2 font-sans text-sm leading-relaxed text-sand/90">
                  {pillar.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 font-sans text-sm font-semibold text-gold opacity-90 transition group-hover:gap-2">
                  Descubrir <ArrowUpRight size={15} />
                </span>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
