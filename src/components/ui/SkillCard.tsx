// ============================================
// Skill Card Component
// ============================================

import { motion } from "framer-motion";
import { getIcon } from "@/config/iconRegistry";
import { Star } from "lucide-react";
import type { Skill } from "@/types/portfolio";

interface SkillCardProps {
  skill: Skill;
  index: number;
}

export const SkillCard = ({ skill, index }: SkillCardProps) => {
  const IconComponent = getIcon(skill.icon);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        y: -4,
        scale: 1.05,
        transition: { duration: 0.2 },
      }}
      className="group relative flex items-center gap-3 px-4 py-3 rounded-xl bg-secondary/30 border border-border/50 hover:border-primary/30 hover:bg-secondary/50 transition-colors duration-200 cursor-default"
    >
      {skill.featured && (
        <div className="absolute -top-1.5 -right-1.5">
          <Star
            size={12}
            className="fill-amber-400 text-amber-400"
          />
        </div>
      )}
      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors duration-200">
        <IconComponent size={18} />
      </div>
      <span className="text-sm font-medium text-foreground">{skill.name}</span>
    </motion.div>
  );
};
