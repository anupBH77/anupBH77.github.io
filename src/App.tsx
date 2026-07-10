// ============================================
// App Component - Dynamic Section Rendering
// ============================================

import { useState, useEffect, useMemo, Suspense } from "react";
import { portfolioSchema } from "@/schemas/portfolio.schema";
import { sectionRegistry, getSectionLabel } from "@/config/sectionRegistry";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import portfolioData from "@/data/portfolio.json";
import type { PortfolioConfig } from "@/types/portfolio";
import type { ValidatedPortfolioConfig } from "@/schemas/portfolio.schema";

// Loading fallback for lazy-loaded sections
const SectionFallback = () => (
  <div className="min-h-[400px] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
  </div>
);

// Validation error display
const ValidationError = ({ error }: { error: string }) => (
  <div className="min-h-screen flex items-center justify-center bg-background p-8">
    <div className="max-w-2xl w-full bg-destructive/10 border border-destructive/20 rounded-2xl p-8">
      <h1 className="text-2xl font-bold text-destructive mb-4">
        Configuration Error
      </h1>
      <p className="text-muted-foreground mb-4">
        Your portfolio.json contains invalid data:
      </p>
      <pre className="bg-background/50 rounded-xl p-4 text-sm text-destructive overflow-auto">
        {error}
      </pre>
      <p className="text-sm text-muted-foreground mt-4">
        Please fix the error in your portfolio.json file and refresh the page.
      </p>
    </div>
  </div>
);

export default function App() {
  const [config, setConfig] = useState<ValidatedPortfolioConfig | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    // Validate configuration on mount
    const result = portfolioSchema.safeParse(portfolioData);

    if (result.success) {
      setConfig(result.data);
    } else {
      const errorMessage = result.error.issues
        .map((err) => `${String(err.path.join("."))}: ${err.message}`)
        .join("\n");
      setValidationError(errorMessage);
      console.error("Portfolio validation failed:", result.error);
    }
  }, []);

  // Build navigation sections from config
  const navSections = useMemo(() => {
    if (!config) return [];

    return config.sectionOrder
      .filter((sectionId) => {
        // Check if section is enabled
        const sectionConfig = config[sectionId as keyof PortfolioConfig];
        if (
          sectionConfig &&
          typeof sectionConfig === "object" &&
          "enabled" in sectionConfig
        ) {
          return (sectionConfig as { enabled: boolean }).enabled;
        }
        return true;
      })
      .filter((sectionId) => sectionRegistry[sectionId]) // Only include registered sections
      .map((sectionId) => ({
        id: sectionId,
        label: getSectionLabel(sectionId),
      }));
  }, [config]);

  // Build ordered sections to render
  const sectionsToRender = useMemo(() => {
    if (!config) return [];

    return config.sectionOrder
      .filter((sectionId) => {
        const sectionConfig = config[sectionId as keyof PortfolioConfig];
        if (
          sectionConfig &&
          typeof sectionConfig === "object" &&
          "enabled" in sectionConfig
        ) {
          return (sectionConfig as { enabled: boolean }).enabled;
        }
        return true;
      })
      .map((sectionId) => ({
        id: sectionId,
        component: sectionRegistry[sectionId]?.component,
        config: config[sectionId as keyof PortfolioConfig],
      }))
      .filter((section) => section.component); // Only include sections with components
  }, [config]);

  // Apply theme
  useEffect(() => {
    if (!config) return;

    // Set dark mode as default
    document.documentElement.classList.add("dark");

    // Apply accent color CSS variable
    const accentMap: Record<string, string> = {
      violet: "258",
      blue: "217",
      cyan: "189",
      emerald: "160",
      orange: "25",
    };

    const accentHue = accentMap[config.theme.accent] || "258";
    document.documentElement.style.setProperty("--accent-hue", accentHue);
  }, [config]);

  if (validationError) {
    return <ValidationError error={validationError} />;
  }

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">

      {/* Navigation */}
      {config.navigation && (
        <Navbar navigation={config.navigation} sections={navSections} />
      )}

      {/* Main Content */}
      <main>
        <Suspense fallback={<SectionFallback />}>
          {sectionsToRender.map((section) => {
            const SectionComponent = section.component;
            if (!SectionComponent) return null;

            return (
              <SectionComponent
                key={section.id}
                data={section.config}
              />
            );
          })}
        </Suspense>
      </main>

      {/* Footer */}
      {config.footer?.enabled && <Footer footer={config.footer} />}
    </div>
  );
}
