import Image from "next/image";
import { PARTNERS } from "@/lib/data/site";
import { Reveal } from "@/components/ui/Reveal";

export function PartnersSection() {
  return (
    <section className="border-y border-border bg-surface py-14 lg:py-16">
      <div className="container-wide">
        <Reveal>
          <p className="mb-8 text-center font-accent text-label-sm uppercase tracking-wider text-muted">
            Con el apoyo de
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="flex flex-wrap items-center justify-center gap-x-14 gap-y-8 sm:gap-x-16 lg:gap-x-20">
            {PARTNERS.map((partner) => (
              <Image
                key={partner.name}
                src={partner.image}
                alt={partner.name}
                width={140}
                height={80}
                className="h-14 w-auto object-contain opacity-70 transition duration-500 hover:opacity-100 hover:scale-105 dark:brightness-110 sm:h-16"
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
