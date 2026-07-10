// ============================================
// Animated Button Component
// ============================================

import { motion } from "framer-motion";
import { ArrowUpRight, Download, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: "arrow" | "download" | "external" | "none";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

export const AnimatedButton = ({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  icon = "arrow",
  className = "",
  type = "button",
  disabled = false,
}: AnimatedButtonProps) => {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm gap-1.5",
    md: "px-6 py-3 text-sm gap-2",
    lg: "px-8 py-4 text-base gap-2.5",
  };

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-cyan-600 to-teal-600 text-white hover:from-cyan-500 hover:to-teal-500 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40",
    secondary:
      "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border",
    outline:
      "bg-transparent text-foreground border-2 border-border hover:border-primary/50 hover:bg-primary/5",
    ghost:
      "bg-transparent text-muted-foreground hover:text-foreground hover:bg-secondary/50",
  };

  const iconComponents = {
    arrow: ArrowUpRight,
    download: Download,
    external: ExternalLink,
    none: null,
  };

  const IconComponent = iconComponents[icon];

  const buttonContent = (
    <>
      <span className="font-medium">{children}</span>
      {IconComponent && (
        <IconComponent
          size={size === "lg" ? 18 : size === "sm" ? 14 : 16}
          className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </>
  );

  const baseClasses = cn(
    "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 group",
    sizeClasses[size],
    variantClasses[variant],
    disabled && "opacity-50 cursor-not-allowed",
    className
  );

  if (href) {
    return (
      <motion.a
        href={href}
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        className={baseClasses}
        onClick={onClick}
      >
        {buttonContent}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={baseClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {buttonContent}
    </motion.button>
  );
};
