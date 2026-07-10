// ============================================
// Experience Section - Timeline Layout
// ============================================

import { SectionHeading } from "@/components/ui/SectionHeading";
import { ExperienceCard } from "@/components/ui/ExperienceCard";
import type { ExperienceConfig } from "@/types/portfolio";

interface ExperienceSectionProps {
  data: ExperienceConfig;
}

export const ExperienceSection = ({ data }: ExperienceSectionProps) => {
  return (
    <section id="experience" className="relative py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={data.heading} subtitle={data.subtitle} />

        <div className="relative">
          {/* Timeline line - desktop only */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-border via-primary/30 to-border -translate-x-1/2" />

          {/* Experience items */}
          <div className="space-y-8 md:space-y-0">
            {data.items.map((experience, index) => (
              <ExperienceCard
                key={index}
                experience={experience}
                index={index}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
