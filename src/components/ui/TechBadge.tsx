// ============================================
// Tech Badge Component
// ============================================

import { motion } from "framer-motion";

interface TechBadgeProps {
  name: string;
  variant?: "default" | "outline" | "glow";
  size?: "sm" | "md";
}

export const TechBadge = ({
  name,
  variant = "default",
  size = "sm",
}: TechBadgeProps) => {
  const sizeClasses = {
    sm: "px-2.5 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
  };

  const variantClasses = {
    default:
      "bg-secondary/80 text-secondary-foreground border border-border/50 hover:bg-secondary",
    outline:
      "bg-transparent text-muted-foreground border border-border hover:border-primary/50 hover:text-foreground",
    glow: "bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20",
  };

  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`inline-flex items-center rounded-full font-medium transition-colors duration-200 ${sizeClasses[size]} ${variantClasses[variant]}`}
    >
      {name}
    </motion.span>
  );
};
