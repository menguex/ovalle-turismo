"use client";

import Image from "next/image";
import { HOME_COPY, IMAGES } from "@/lib/data/site";
import { HOME_SECTION_ICONS } from "@/lib/icons/page-icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InfoHighlights } from "@/components/sections/DestinationStats";
import { Reveal } from "@/components/ui/Reveal";

export function StorySection() {
  return (
    <section className="overflow-hidden section-alt py-20 lg:py-28">
      <div className="container-wide grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal direction="left" className="relative order-2 lg:order-1">
          <div className="image-frame-glow relative aspect-[4/5]">
            <Image
              src={IMAGES.collage}
              alt="Experiencias en Ovalle"
              fill
              className="object-cover transition duration-700 hover:scale-[1.03]"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
          </div>
          <div className="absolute -bottom-5 -right-5 hidden aspect-square w-36 overflow-hidden rounded-2xl border-4 border-bg shadow-xl lg:block">
            <Image
              src={IMAGES.heroPlaza}
              alt="Plaza de Armas Ovalle"
              fill
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal direction="right" className="order-1 lg:order-2">
          <SectionHeading
            icon={HOME_SECTION_ICONS.story}
            eyebrow="Ovalle Turismo"
            title="Donde la cultura se vive en lo cotidiano"
          />
          <div className="prose-valle mt-8">
            {HOME_COPY.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
          <InfoHighlights />
        </Reveal>
      </div>
    </section>
  );
}
