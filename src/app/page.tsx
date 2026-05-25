import { Hero } from "@/components/sections/Hero";
import { QuickLinks } from "@/components/sections/QuickLinks";
import { StorySection } from "@/components/sections/StorySection";
import { Pillars } from "@/components/sections/Pillars";
import { AstroSection } from "@/components/sections/AstroSection";
import { ExperiencesGrid } from "@/components/sections/ExperiencesGrid";
import { MapSection } from "@/components/sections/MapSection";
import { Tour360Showcase } from "@/components/sections/Tour360Showcase";
import { EventsPreview } from "@/components/sections/EventsPreview";
import { NewsPreview } from "@/components/sections/NewsPreview";
import { PlannerCTA } from "@/components/sections/PageHero";
import { PartnersSection } from "@/components/sections/PartnersSection";
import { TourOperatorsPreview } from "@/components/sections/TourOperatorsPreview";
import { SectionDivider } from "@/components/ui/SectionDivider";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SectionDivider />
      <QuickLinks />
      <SectionDivider />
      <StorySection />
      <SectionDivider />
      <Pillars />
      <SectionDivider />
      <AstroSection />
      <SectionDivider />
      <ExperiencesGrid />
      <SectionDivider />
      <MapSection />
      <SectionDivider />
      <Tour360Showcase variant="home" />
      <SectionDivider />
      <EventsPreview />
      <SectionDivider />
      <NewsPreview />
      <SectionDivider />
      <TourOperatorsPreview />
      <SectionDivider />
      <PartnersSection />
      <PlannerCTA />
    </>
  );
}
