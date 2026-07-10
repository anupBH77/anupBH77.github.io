// ============================================
// Education Section
// ============================================

import { motion } from "framer-motion";
import { GraduationCap, MapPin, Calendar, Award, BookOpen } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { staggerContainer, staggerItem } from "@/animations/variants";
import type { EducationConfig } from "@/types/portfolio";

interface EducationSectionProps {
  data: EducationConfig;
}

export const EducationSection = ({ data }: EducationSectionProps) => {
  return (
    <section id="education" className="relative py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={data.heading} subtitle={data.subtitle} />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {data.items.map((edu, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              whileHover={{ y: -4 }}
              className="group relative bg-card/50 backdrop-blur-sm border border-border/60 rounded-2xl p-6 md:p-8 hover:border-primary/30 transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/10 to-teal-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
                  <GraduationCap size={24} className="text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                    {edu.degree}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {edu.institution}
                  </p>
                </div>
              </div>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} />
                  {edu.startDate} — {edu.endDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} />
                  {edu.location}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {edu.description}
              </p>

              {/* Specialization */}
              {edu.specialization && (
                <div className="mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                    <BookOpen size={12} />
                    {edu.specialization}
                  </span>
                </div>
              )}

              {/* Coursework */}
              {edu.coursework && edu.coursework.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-xs font-medium text-foreground mb-2 uppercase tracking-wide">
                    Key Coursework
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {edu.coursework.map((course) => (
                      <span
                        key={course}
                        className="px-2.5 py-1 text-xs rounded-lg bg-secondary/50 text-muted-foreground border border-border/50"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Achievements */}
              {edu.achievements && edu.achievements.length > 0 && (
                <div>
                  <h4 className="text-xs font-medium text-foreground mb-2 uppercase tracking-wide">
                    Achievements
                  </h4>
                  <ul className="space-y-1.5">
                    {edu.achievements.map((achievement, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <Award
                          size={14}
                          className="text-primary mt-0.5 flex-shrink-0"
                        />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
