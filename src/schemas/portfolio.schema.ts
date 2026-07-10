// ============================================
// Zod Schema for Portfolio Configuration
// ============================================

import { z } from "zod";

const siteMetadataSchema = z.object({
  title: z.string().min(1, "Site title is required"),
  description: z.string().min(1, "Site description is required"),
  keywords: z.array(z.string()),
  author: z.string().min(1, "Author name is required"),
  language: z.string().default("en"),
  ogTitle: z.string(),
  ogDescription: z.string(),
  ogImage: z.string(),
  canonicalUrl: z.string(),
});

const themeConfigSchema = z.object({
  defaultMode: z.enum(["dark", "light"]).default("dark"),
  accent: z.enum(["violet", "blue", "cyan", "emerald", "orange"]).default("violet"),
  animations: z.boolean().default(true),
  cursorEffect: z.boolean().default(true),
  backgroundEffect: z.enum(["grid", "dots", "gradient-mesh", "minimal"]).default("grid"),
});

const navigationConfigSchema = z.object({
  logo: z.string(),
  logoType: z.enum(["text", "initials"]).default("text"),
  showResumeButton: z.boolean().default(true),
  resumeLink: z.string().default("#"),
});

const socialLinkSchema = z.object({
  name: z.string(),
  url: z.string().url(),
  icon: z.string(),
});

const heroConfigSchema = z.object({
  enabled: z.boolean().default(true),
  name: z.string().min(1, "Hero name is required"),
  title: z.string(),
  rotatingRoles: z.array(z.string()),
  description: z.string(),
  availabilityStatus: z.enum(["available", "limited", "unavailable"]).default("available"),
  availabilityText: z.string(),
  primaryCta: z.object({
    text: z.string(),
    link: z.string(),
  }),
  secondaryCta: z.object({
    text: z.string(),
    link: z.string(),
  }),
  resumeButton: z.object({
    text: z.string(),
    link: z.string(),
  }),
  socials: z.array(socialLinkSchema),
});

const statItemSchema = z.object({
  label: z.string(),
  value: z.number(),
  suffix: z.string().optional(),
  icon: z.string(),
});

const aboutCardSchema = z.object({
  type: z.enum(["text", "stat", "focus", "location", "tech", "learning", "philosophy"]),
  title: z.string(),
  content: z.string(),
  stat: statItemSchema.optional(),
  technologies: z.array(z.string()).optional(),
  gridSpan: z.enum(["small", "medium", "large"]).optional(),
});

const aboutConfigSchema = z.object({
  enabled: z.boolean().default(true),
  heading: z.string(),
  subtitle: z.string(),
  cards: z.array(aboutCardSchema),
});

const skillSchema = z.object({
  name: z.string(),
  icon: z.string(),
  featured: z.boolean().optional(),
});

const skillCategorySchema = z.object({
  name: z.string(),
  icon: z.string(),
  skills: z.array(skillSchema),
});

const skillsConfigSchema = z.object({
  enabled: z.boolean().default(true),
  heading: z.string(),
  subtitle: z.string(),
  categories: z.array(skillCategorySchema),
});

const experienceSchema = z.object({
  company: z.string(),
  role: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  employmentType: z.string(),
  location: z.string(),
  description: z.string(),
  achievements: z.array(z.string()),
  technologies: z.array(z.string()),
});

const experienceConfigSchema = z.object({
  enabled: z.boolean().default(true),
  heading: z.string(),
  subtitle: z.string(),
  items: z.array(experienceSchema),
});

const projectSchema = z.object({
  title: z.string(),
  slug: z.string(),
  featured: z.boolean().default(false),
  category: z.string(),
  description: z.string(),
  problem: z.string().optional(),
  highlights: z.array(z.string()),
  technologies: z.array(z.string()),
  src: z.string(),
  isImage: z.boolean(),
  github: z.string().optional(),
  liveDemo: z.string().optional(),
});

const projectsConfigSchema = z.object({
  enabled: z.boolean().default(true),
  heading: z.string(),
  subtitle: z.string(),
  items: z.array(projectSchema),
});

const educationSchema = z.object({
  degree: z.string(),
  institution: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  location: z.string(),
  description: z.string(),
  specialization: z.string().optional(),
  coursework: z.array(z.string()).optional(),
  achievements: z.array(z.string()).optional(),
});

const educationConfigSchema = z.object({
  enabled: z.boolean().default(true),
  heading: z.string(),
  subtitle: z.string(),
  items: z.array(educationSchema),
});

const certificationSchema = z.object({
  name: z.string(),
  issuer: z.string(),
  issueDate: z.string(),
  credentialUrl: z.string().optional(),
  icon: z.string().optional(),
});

const certificationsConfigSchema = z.object({
  enabled: z.boolean().default(true),
  heading: z.string(),
  items: z.array(certificationSchema),
});

const personalDetailFieldSchema = z.object({
  label: z.string(),
  value: z.string(),
  type: z.enum(["text", "email", "phone", "link", "badge"]),
  icon: z.string(),
});

const personalDetailsConfigSchema = z.object({
  enabled: z.boolean().default(true),
  heading: z.string(),
  subtitle: z.string(),
  fields: z.array(personalDetailFieldSchema),
});

const contactConfigSchema = z.object({
  enabled: z.boolean().default(true),
  heading: z.string(),
  subtitle: z.string(),
  ctaMessage: z.string(),
  email: z.string().email(),
  availabilityStatus: z.enum(["available", "limited", "unavailable"]).default("available"),
  availabilityText: z.string(),
  formEnabled: z.boolean().default(true),
  formFields: z.object({
    name: z.object({
      label: z.string(),
      placeholder: z.string(),
      required: z.boolean().default(true),
    }),
    email: z.object({
      label: z.string(),
      placeholder: z.string(),
      required: z.boolean().default(true),
    }),
    subject: z.object({
      label: z.string(),
      placeholder: z.string(),
      required: z.boolean().default(true),
    }),
    message: z.object({
      label: z.string(),
      placeholder: z.string(),
      required: z.boolean().default(true),
    }),
  }),
  socials: z.array(socialLinkSchema),
});

const footerConfigSchema = z.object({
  enabled: z.boolean().default(true),
  name: z.string(),
  tagline: z.string(),
  socials: z.array(socialLinkSchema),
  copyright: z.string(),
  showBackToTop: z.boolean().default(true),
});

export const portfolioSchema = z.object({
  metadata: siteMetadataSchema,
  theme: themeConfigSchema,
  sectionOrder: z.array(z.string()),
  navigation: navigationConfigSchema,
  hero: heroConfigSchema,
  about: aboutConfigSchema,
  skills: skillsConfigSchema,
  experience: experienceConfigSchema,
  projects: projectsConfigSchema,
  education: educationConfigSchema,
  certifications: certificationsConfigSchema,
  personal: personalDetailsConfigSchema,
  contact: contactConfigSchema,
  footer: footerConfigSchema,
});

export type ValidatedPortfolioConfig = z.infer<typeof portfolioSchema>;
