// ============================================
// Section Registry - Maps section IDs to components
// ============================================

import { lazy } from "react";
import type { ComponentType } from "react";

// Lazy load all section components for better performance
const HeroSection = lazy(() =>
  import("@/components/sections/HeroSection").then((m) => ({
    default: m.HeroSection,
  }))
);
const AboutSection = lazy(() =>
  import("@/components/sections/AboutSection").then((m) => ({
    default: m.AboutSection,
  }))
);
const SkillsSection = lazy(() =>
  import("@/components/sections/SkillsSection").then((m) => ({
    default: m.SkillsSection,
  }))
);
const ExperienceSection = lazy(() =>
  import("@/components/sections/ExperienceSection").then((m) => ({
    default: m.ExperienceSection,
  }))
);
const ProjectsSection = lazy(() =>
  import("@/components/sections/ProjectsSection").then((m) => ({
    default: m.ProjectsSection,
  }))
);
const EducationSection = lazy(() =>
  import("@/components/sections/EducationSection").then((m) => ({
    default: m.EducationSection,
  }))
);
const CertificationsSection = lazy(() =>
  import("@/components/sections/CertificationsSection").then((m) => ({
    default: m.CertificationsSection,
  }))
);
const PersonalDetailsSection = lazy(() =>
  import("@/components/sections/PersonalDetailsSection").then((m) => ({
    default: m.PersonalDetailsSection,
  }))
);
const ContactSection = lazy(() =>
  import("@/components/sections/ContactSection").then((m) => ({
    default: m.ContactSection,
  }))
);

export interface SectionComponent {
  id: string;
  component: ComponentType<{ data: unknown }>;
  label: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sectionRegistry: Record<string, SectionComponent> = {
  hero: { id: "hero", component: HeroSection as unknown as ComponentType<{ data: unknown }>, label: "Home" },
  about: { id: "about", component: AboutSection as unknown as ComponentType<{ data: unknown }>, label: "About" },
  skills: { id: "skills", component: SkillsSection as unknown as ComponentType<{ data: unknown }>, label: "Skills" },
  experience: {
    id: "experience",
    component: ExperienceSection as unknown as ComponentType<{ data: unknown }>,
    label: "Experience",
  },
  projects: { id: "projects", component: ProjectsSection as unknown as ComponentType<{ data: unknown }>, label: "Projects" },
  education: {
    id: "education",
    component: EducationSection as unknown as ComponentType<{ data: unknown }>,
    label: "Education",
  },
  certifications: {
    id: "certifications",
    component: CertificationsSection as unknown as ComponentType<{ data: unknown }>,
    label: "Certifications",
  },
  personal: {
    id: "personal",
    component: PersonalDetailsSection as unknown as ComponentType<{ data: unknown }>,
    label: "Details",
  },
  contact: { id: "contact", component: ContactSection as unknown as ComponentType<{ data: unknown }>, label: "Contact" },
};

export const getSectionComponent = (
  sectionId: string
): SectionComponent | undefined => {
  return sectionRegistry[sectionId];
};

export const getSectionLabel = (sectionId: string): string => {
  return sectionRegistry[sectionId]?.label || sectionId;
};

export const validSectionIds = Object.keys(sectionRegistry);
