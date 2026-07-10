// ============================================
// Theme Registry - Maps configuration to Tailwind classes
// ============================================

export type AccentColor = "violet" | "blue" | "cyan" | "emerald" | "orange";
export type BackgroundEffect = "grid" | "dots" | "gradient-mesh" | "minimal";

// Accent color mappings to Tailwind classes
export const accentColorMap: Record<
  AccentColor,
  {
    primary: string;
    light: string;
    dark: string;
    glow: string;
    text: string;
    border: string;
    ring: string;
    gradient: string;
  }
> = {
  violet: {
    primary: "text-violet-500",
    light: "text-violet-400",
    dark: "text-violet-600",
    glow: "shadow-violet-500/20",
    text: "text-violet-500",
    border: "border-violet-500/30",
    ring: "ring-violet-500/30",
    gradient: "from-violet-500 to-purple-600",
  },
  blue: {
    primary: "text-blue-500",
    light: "text-blue-400",
    dark: "text-blue-600",
    glow: "shadow-blue-500/20",
    text: "text-blue-500",
    border: "border-blue-500/30",
    ring: "ring-blue-500/30",
    gradient: "from-blue-500 to-cyan-500",
  },
  cyan: {
    primary: "text-cyan-500",
    light: "text-cyan-400",
    dark: "text-cyan-600",
    glow: "shadow-cyan-500/20",
    text: "text-cyan-500",
    border: "border-cyan-500/30",
    ring: "ring-cyan-500/30",
    gradient: "from-cyan-500 to-teal-500",
  },
  emerald: {
    primary: "text-emerald-500",
    light: "text-emerald-400",
    dark: "text-emerald-600",
    glow: "shadow-emerald-500/20",
    text: "text-emerald-500",
    border: "border-emerald-500/30",
    ring: "ring-emerald-500/30",
    gradient: "from-emerald-500 to-green-600",
  },
  orange: {
    primary: "text-orange-500",
    light: "text-orange-400",
    dark: "text-orange-600",
    glow: "shadow-orange-500/20",
    text: "text-orange-500",
    border: "border-orange-500/30",
    ring: "ring-orange-500/30",
    gradient: "from-orange-500 to-amber-500",
  },
};

// Background effect styles
export const backgroundEffectMap: Record<BackgroundEffect, string> = {
  grid: "bg-grid-pattern",
  dots: "bg-dots-pattern",
  "gradient-mesh": "bg-gradient-mesh",
  minimal: "",
};

// Get accent classes for a color
export const getAccentClasses = (accent: AccentColor) => {
  return accentColorMap[accent];
};

// Get background effect class
export const getBackgroundEffectClass = (effect: BackgroundEffect) => {
  return backgroundEffectMap[effect];
};

// CSS variables for the selected accent color
export const getAccentCSSVariables = (accent: AccentColor) => {
  const colorMap: Record<AccentColor, { h: number; s: number; l: number }> = {
    violet: { h: 258, s: 90, l: 66 },
    blue: { h: 217, s: 91, l: 60 },
    cyan: { h: 189, s: 94, l: 43 },
    emerald: { h: 160, s: 84, l: 39 },
    orange: { h: 25, s: 95, l: 53 },
  };

  const color = colorMap[accent];
  return {
    "--accent-h": color.h,
    "--accent-s": `${color.s}%`,
    "--accent-l": `${color.l}%`,
    "--accent-color": `hsl(${color.h}, ${color.s}%, ${color.l}%)`,
    "--accent-light": `hsl(${color.h}, ${color.s}%, ${color.l + 15}%)`,
    "--accent-dark": `hsl(${color.h}, ${color.s}%, ${color.l - 10}%)`,
  };
};
