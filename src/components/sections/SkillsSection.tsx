// ============================================
// Skills Section
// ============================================

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getIcon } from "@/config/iconRegistry";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillCard } from "@/components/ui/SkillCard";
import {
  staggerContainer,
  staggerItem,
} from "@/animations/variants";
import type { SkillsConfig } from "@/types/portfolio";

interface SkillsSectionProps {
  data: SkillsConfig;
}

export const SkillsSection = ({ data }: SkillsSectionProps) => {
  const [activeCategory, setActiveCategory] = useState(0);

  const category = data.categories[activeCategory];

  return (
    <section id="skills" className="relative py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={data.heading} subtitle={data.subtitle} />

        {/* Category Tabs */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {data.categories.map((cat, index) => {
            const IconComponent = getIcon(cat.icon);
            return (
              <motion.button
                key={cat.name}
                variants={staggerItem}
                onClick={() => setActiveCategory(index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeCategory === index
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "bg-secondary/50 text-muted-foreground hover:text-foreground border border-border/50"
                }`}
              >
                <IconComponent size={16} />
                {cat.name}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Featured Skills */}
            {category.skills.filter((s) => s.featured).length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide text-center">
                  Featured
                </h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {category.skills
                    .filter((s) => s.featured)
                    .map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.08 }}
                        whileHover={{ scale: 1.08, y: -4 }}
                        className="group flex items-center gap-3 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500/10 to-teal-500/10 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-200"
                      >
                        <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/20 transition-colors duration-200">
                          {(() => {
                            const Icon = getIcon(skill.icon);
                            return <Icon size={20} />;
                          })()}
                        </div>
                        <span className="font-semibold text-foreground">
                          {skill.name}
                        </span>
                      </motion.div>
                    ))}
                </div>
              </div>
            )}

            {/* All Skills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {category.skills.map((skill, index) => (
                <SkillCard key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
