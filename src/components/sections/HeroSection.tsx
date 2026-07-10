// ============================================
// Hero Section
// ============================================

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import {
  heroAvailability,
  heroName,
  heroTitle,
  heroDescription,
  heroButtons,
  heroSocials,
} from "@/animations/variants";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { SocialLinksGroup } from "@/components/ui/SocialLink";
import type { HeroConfig } from "@/types/portfolio";

interface HeroSectionProps {
  data: HeroConfig;
}

export const HeroSection = ({ data }: HeroSectionProps) => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  useEffect(() => {
    if (data.rotatingRoles.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) =>
        prev === data.rotatingRoles.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [data.rotatingRoles.length]);

  const availabilityColors = {
    available: "bg-emerald-500",
    limited: "bg-amber-500",
    unavailable: "bg-red-500",
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-background">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Radial gradient */}
        <div className="absolute inset-0 bg-gradient-radial from-cyan-500/5 via-transparent to-transparent" />
        {/* Floating orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl pt-[148px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Availability Badge */}
        <motion.div
          variants={heroAvailability}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 mb-8"
        >
          <span
            className={`w-2 h-2 rounded-full ${availabilityColors[data.availabilityStatus]} animate-pulse`}
          />
          <span className="text-sm text-muted-foreground">
            {data.availabilityText}
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={heroName}
          initial="hidden"
          animate="visible"
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4"
        >
          <span className="bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
            {data.name}
          </span>
        </motion.h1>

        {/* Rotating Role */}
        <motion.div
          variants={heroTitle}
          initial="hidden"
          animate="visible"
          className="h-12 md:h-14 mb-6 flex items-center justify-center"
        >
          <motion.span
            key={currentRoleIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-xl sm:text-2xl md:text-3xl font-medium bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent"
          >
            {data.rotatingRoles[currentRoleIndex]}
          </motion.span>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={heroDescription}
          initial="hidden"
          animate="visible"
          className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {data.description}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={heroButtons}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <AnimatedButton
            href={data.primaryCta.link}
            variant="primary"
            size="lg"
            icon="arrow"
          >
            {data.primaryCta.text}
          </AnimatedButton>
          <AnimatedButton
            href={data.secondaryCta.link}
            variant="outline"
            size="lg"
            icon="external"
          >
            {data.secondaryCta.text}
          </AnimatedButton>
          <AnimatedButton
            href={data.resumeButton.link}
            variant="ghost"
            size="lg"
            icon="download"
          >
            {data.resumeButton.text}
          </AnimatedButton>
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={heroSocials}
          initial="hidden"
          animate="visible"
        >
          <SocialLinksGroup socials={data.socials} size="md" variant="default" />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground">Scroll down</span>
          <ChevronDown size={20} className="text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
};
