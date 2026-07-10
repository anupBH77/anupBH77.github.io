// ============================================
// Section Heading Component
// ============================================

import { motion } from "framer-motion";
import { fadeUp, defaultViewport } from "@/animations/variants";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  accent?: string;
}

export const SectionHeading = ({
  title,
  subtitle,
  align = "center",
  accent = "violet",
}: SectionHeadingProps) => {
  const alignClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const accentClasses: Record<string, string> = {
    violet: "from-cyan-400 to-teal-400",
    blue: "from-blue-400 to-cyan-400",
    cyan: "from-cyan-400 to-teal-400",
    emerald: "from-emerald-400 to-green-400",
    orange: "from-orange-400 to-amber-400",
  };

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      className={`mb-12 md:mb-16 ${alignClass[align]}`}
    >
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
        <span
          className={`bg-gradient-to-r ${accentClasses[accent] || accentClasses.violet} bg-clip-text text-transparent`}
        >
          {title}
        </span>
      </h2>
      {subtitle && (
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};
