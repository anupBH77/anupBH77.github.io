// ============================================
// Experience Card Component
// ============================================

import { motion } from "framer-motion";
import { MapPin, Calendar, Briefcase } from "lucide-react";
import { TechBadge } from "./TechBadge";
import type { Experience } from "@/types/portfolio";

interface ExperienceCardProps {
  experience: Experience;
  index: number;
  isLeft: boolean;
}

export const ExperienceCard = ({
  experience,
  index,
  isLeft,
}: ExperienceCardProps) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: isLeft ? -50 : 50,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={`relative ${isLeft ? "md:ml-auto md:mr-[50%] md:pr-12" : "md:mr-auto md:ml-[50%] md:pl-12"} md:w-[50%] mb-8 md:mb-0`}
    >
      {/* Timeline dot */}
      <div
        className={`hidden md:flex absolute top-6 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-lg shadow-primary/30 z-10 ${isLeft ? "right-[-8px]" : "left-[-8px]"}`}
      />

      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="bg-card/50 backdrop-blur-sm border border-border/60 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-primary/5"
      >
        {/* Header */}
        <div className="mb-4">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-foreground">
              {experience.role}
            </h3>
            <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary">
              {experience.employmentType}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Briefcase size={14} />
              {experience.company}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={14} />
              {experience.location}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
            <Calendar size={14} />
            <span>
              {experience.startDate} — {experience.endDate}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          {experience.description}
        </p>

        {/* Achievements */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-foreground mb-2">
            Key Achievements
          </h4>
          <ul className="space-y-1.5">
            {experience.achievements.map((achievement, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                {achievement}
              </li>
            ))}
          </ul>
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {experience.technologies.map((tech) => (
            <TechBadge key={tech} name={tech} variant="outline" size="sm" />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};
