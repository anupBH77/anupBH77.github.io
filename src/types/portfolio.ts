// ============================================
// Portfolio Configuration TypeScript Types
// ============================================

export interface SiteMetadata {
  title: string;
  description: string;
  keywords: string[];
  author: string;
  language: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  canonicalUrl: string;
}

export interface ThemeConfig {
  defaultMode: "dark" | "light";
  accent: "violet" | "blue" | "cyan" | "emerald" | "orange";
  animations: boolean;
  cursorEffect: boolean;
  backgroundEffect: "grid" | "dots" | "gradient-mesh" | "minimal";
}

export interface NavigationConfig {
  logo: string;
  logoType: "text" | "initials";
  showResumeButton: boolean;
  resumeLink: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface HeroConfig {
  enabled: boolean;
  name: string;
  title: string;
  rotatingRoles: string[];
  description: string;
  availabilityStatus: "available" | "limited" | "unavailable";
  availabilityText: string;
  primaryCta: {
    text: string;
    link: string;
  };
  secondaryCta: {
    text: string;
    link: string;
  };
  resumeButton: {
    text: string;
    link: string;
  };
  socials: SocialLink[];
}

export interface StatItem {
  label: string;
  value: number;
  suffix?: string;
  icon: string;
}

export interface AboutCard {
  type: "text" | "stat" | "focus" | "location" | "tech" | "learning" | "philosophy";
  title: string;
  content: string;
  stat?: StatItem;
  technologies?: string[];
  gridSpan?: "small" | "medium" | "large";
}

export interface AboutConfig {
  enabled: boolean;
  heading: string;
  subtitle: string;
  cards: AboutCard[];
}

export interface Skill {
  name: string;
  icon: string;
  featured?: boolean;
}

export interface SkillCategory {
  name: string;
  icon: string;
  skills: Skill[];
}

export interface SkillsConfig {
  enabled: boolean;
  heading: string;
  subtitle: string;
  categories: SkillCategory[];
}

export interface Experience {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  employmentType: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface ExperienceConfig {
  enabled: boolean;
  heading: string;
  subtitle: string;
  items: Experience[];
}

export interface Project {
  title: string;
  slug: string;
  featured: boolean;
  category: string;
  description: string;
  problem?: string;
  highlights: string[];
  technologies: string[];
  src: string;
  isImage: boolean;
  github?: string;
  liveDemo?: string;
}

export interface ProjectsConfig {
  enabled: boolean;
  heading: string;
  subtitle: string;
  items: Project[];
}

export interface Education {
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  specialization?: string;
  coursework?: string[];
  achievements?: string[];
}

export interface EducationConfig {
  enabled: boolean;
  heading: string;
  subtitle: string;
  items: Education[];
}

export interface Certification {
  name: string;
  issuer: string;
  issueDate: string;
  credentialUrl?: string;
  icon?: string;
}

export interface CertificationsConfig {
  enabled: boolean;
  heading: string;
  items: Certification[];
}

export interface PersonalDetailField {
  label: string;
  value: string;
  type: "text" | "email" | "phone" | "link" | "badge";
  icon: string;
}

export interface PersonalDetailsConfig {
  enabled: boolean;
  heading: string;
  subtitle: string;
  fields: PersonalDetailField[];
}

export interface ContactConfig {
  enabled: boolean;
  heading: string;
  subtitle: string;
  ctaMessage: string;
  email: string;
  availabilityStatus: "available" | "limited" | "unavailable";
  availabilityText: string;
  formEnabled: boolean;
  formFields: {
    name: { label: string; placeholder: string; required: boolean };
    email: { label: string; placeholder: string; required: boolean };
    subject: { label: string; placeholder: string; required: boolean };
    message: { label: string; placeholder: string; required: boolean };
  };
  socials: SocialLink[];
}

export interface FooterConfig {
  enabled: boolean;
  name: string;
  tagline: string;
  socials: SocialLink[];
  copyright: string;
  showBackToTop: boolean;
}

export interface PortfolioConfig {
  metadata: SiteMetadata;
  theme: ThemeConfig;
  sectionOrder: string[];
  navigation: NavigationConfig;
  hero: HeroConfig;
  about: AboutConfig;
  skills: SkillsConfig;
  experience: ExperienceConfig;
  projects: ProjectsConfig;
  education: EducationConfig;
  certifications: CertificationsConfig;
  personal: PersonalDetailsConfig;
  contact: ContactConfig;
  footer: FooterConfig;
}
