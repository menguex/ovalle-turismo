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
          <div className="flex flex-wrap items-center justify-center gap-10 lg:gap-16">
            {PARTNERS.map((partner) => (
              <Image
                key={partner.name}
                src={partner.image}
                alt={partner.name}
                width={140}
                height={80}
                className="h-14 w-auto object-contain opacity-90 transition hover:opacity-100 dark:brightness-110"
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );

}
