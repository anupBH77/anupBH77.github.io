// ============================================
// Social Link Component
// ============================================

import { motion } from "framer-motion";

import { getIcon } from "@/config/iconRegistry";
import type { SocialLink as SocialLinkType } from "@/types/portfolio";

interface SocialLinkProps {
  social: SocialLinkType;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline";
}

export const SocialLink = ({
  social,
  size = "md",
  variant = "default",
}: SocialLinkProps) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const iconSizes = {
    sm: 14,
    md: 18,
    lg: 22,
  };

  const variantClasses = {
    default:
      "bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary border border-border/50",
    outline:
      "bg-transparent text-muted-foreground hover:text-foreground border border-border hover:border-primary/50",
  };

  const IconComponent = getIcon(social.icon);

  return (
    <motion.a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={social.name}
      whileHover={{ y: -3, scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={`inline-flex items-center justify-center rounded-xl transition-colors duration-200 ${sizeClasses[size]} ${variantClasses[variant]}`}
    >
      <IconComponent size={iconSizes[size]} />
    </motion.a>
  );
};

interface SocialLinksGroupProps {
  socials: SocialLinkType[];
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline";
  className?: string;
}

export const SocialLinksGroup = ({
  socials,
  size = "md",
  variant = "default",
  className = "",
}: SocialLinksGroupProps) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {socials.map((social, index) => (
        <motion.div
          key={social.name}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <SocialLink social={social} size={size} variant={variant} />
        </motion.div>
      ))}
    </div>
  );
};
