// ============================================
// About Section - Bento Grid Layout
// ============================================

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  MapPin,
  Zap,
  BookOpen,
  Lightbulb,
  Code2,
  Briefcase,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { bentoCard, staggerContainer } from "@/animations/variants";
import type { AboutConfig } from "@/types/portfolio";

interface AboutSectionProps {
  data: AboutConfig;
}

// Animated counter component
const AnimatedCounter = ({
  value,
  suffix = "",
  duration = 2000,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

const typeIcons: Record<string, React.ReactNode> = {
  text: <Code2 size={18} />,
  stat: <Briefcase size={18} />,
  focus: <Zap size={18} />,
  location: <MapPin size={18} />,
  tech: <Code2 size={18} />,
  learning: <BookOpen size={18} />,
  philosophy: <Lightbulb size={18} />,
};

const typeGradients: Record<string, string> = {
  text: "from-cyan-500/10 to-teal-500/5",
  stat: "from-blue-500/10 to-cyan-500/5",
  focus: "from-amber-500/10 to-orange-500/5",
  location: "from-emerald-500/10 to-green-500/5",
  tech: "from-pink-500/10 to-rose-500/5",
  learning: "from-cyan-500/10 to-blue-500/5",
  philosophy: "from-teal-500/10 to-cyan-500/5",
};

export const AboutSection = ({ data }: AboutSectionProps) => {
  return (
    <section id="about" className="relative py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={data.heading} subtitle={data.subtitle} />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {data.cards.map((card, index) => {
            const gridSpan =
              card.gridSpan === "large"
                ? "md:col-span-2 lg:col-span-2"
                : card.gridSpan === "medium"
                  ? "md:col-span-1 lg:col-span-2"
                  : "";

            return (
              <motion.div
                key={index}
                variants={bentoCard}
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ duration: 0.2 }}
                className={`group relative rounded-2xl border border-border/60 bg-gradient-to-br ${typeGradients[card.type] || typeGradients.text} p-6 hover:border-primary/30 transition-all duration-300 ${gridSpan}`}
              >
                {/* Icon */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    {typeIcons[card.type] || <Code2 size={18} />}
                  </div>
                  <h3 className="font-semibold text-foreground">{card.title}</h3>
                </div>

                {/* Content */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {card.content}
                </p>

                {/* Stat counter */}
                {card.stat && (
                  <div className="mt-4">
                    <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                      <AnimatedCounter
                        value={card.stat.value}
                        suffix={card.stat.suffix}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground mt-1 block">
                      {card.stat.label}
                    </span>
                  </div>
                )}

                {/* Technologies list */}
                {card.technologies && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {card.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-secondary/80 text-secondary-foreground border border-border/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/0 to-teal-500/0 group-hover:from-cyan-500/5 group-hover:to-teal-500/5 transition-all duration-300 pointer-events-none" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
