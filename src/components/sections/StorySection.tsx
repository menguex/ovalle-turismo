"use client";

import SiteImage from "@/components/ui/SiteImage";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { HOME_COPY, IMAGES } from "@/lib/data/site";
import { HOME_SECTION_ICONS } from "@/lib/icons/page-icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InfoHighlights } from "@/components/sections/DestinationStats";
import { Reveal } from "@/components/ui/Reveal";
import { TextRevealOnScroll } from "@/components/ui/TextRevealOnScroll";

export function StorySection() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const imgRotate = useTransform(scrollYProgress, [0, 1], [-1, 1]);
  const floatY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <section ref={sectionRef} className="overflow-hidden section-alt py-20 lg:py-28">
      <div className="container-wide grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal direction="left" className="relative order-2 lg:order-1">
          <motion.div
            className="image-frame-glow relative aspect-[4/5]"
            style={reduced ? undefined : { y: imgY, rotate: imgRotate }}
          >
            <SiteImage
              src={IMAGES.collage}
              alt="Experiencias en Ovalle"
              fill
              className="object-cover transition duration-700 hover:scale-[1.03]"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
          </motion.div>
          <motion.div
            className="absolute -bottom-5 -right-5 hidden aspect-square w-36 overflow-hidden rounded-2xl border-4 border-bg shadow-xl lg:block"
            style={reduced ? undefined : { y: floatY }}
            whileHover={reduced ? undefined : { scale: 1.08, rotate: 3 }}
            transition={{ duration: 0.4 }}
          >
            <SiteImage
              src={IMAGES.heroPlaza}
              alt="Plaza de Armas Ovalle"
              fill
              className="object-cover"
            />
          </motion.div>
        </Reveal>

        <Reveal direction="right" className="order-1 lg:order-2">
          <SectionHeading
            icon={HOME_SECTION_ICONS.story}
            eyebrow="Ovalle Turismo"
            title="Donde la cultura se vive en lo cotidiano"
          />
          <div className="mt-8 max-w-prose space-y-5">
            {HOME_COPY.intro.map((paragraph) => (
              <TextRevealOnScroll
                key={paragraph.slice(0, 40)}
                text={paragraph}
                className="font-sans text-body-lg leading-relaxed text-muted-fg"
              />
            ))}
          </div>
          <InfoHighlights />
        </Reveal>
      </div>
    </section>
  );
}
