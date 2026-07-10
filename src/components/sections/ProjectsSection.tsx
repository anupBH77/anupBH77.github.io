// ============================================
// Projects Section with Filtering
// ============================================

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { staggerContainer, staggerItem } from "@/animations/variants";
import type { ProjectsConfig } from "@/types/portfolio";

interface ProjectsSectionProps {
  data: ProjectsConfig;
}

export const ProjectsSection = ({ data }: ProjectsSectionProps) => {
  const [activeFilter, setActiveFilter] = useState("All");

  // Derive categories from project data
  const categories = useMemo(() => {
    const cats = new Set(data.items.map((p) => p.category));
    return ["All", ...Array.from(cats)];
  }, [data.items]);

  // Filter projects
  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return data.items;
    return data.items.filter((p) => p.category === activeFilter);
  }, [activeFilter, data.items]);

  const featuredProjects = filteredProjects.filter((p) => p.featured);
  const regularProjects = filteredProjects.filter((p) => !p.featured);

  return (
    <section id="projects" className="relative py-20 md:py-32">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={data.heading} subtitle={data.subtitle} />

        {/* Category Filters */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              variants={staggerItem}
              onClick={() => setActiveFilter(category)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${activeFilter === category
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "bg-secondary/50 text-muted-foreground hover:text-foreground border border-border/50"
                }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Featured Projects */}
            {featuredProjects.length > 0 && (
              <div className="mb-8 space-y-8">
                {featuredProjects.map((project, index) => (
                  <ProjectCard
                    key={project.slug}
                    project={project}
                    index={index}
                    featured
                  />
                ))}
              </div>
            )}

            {/* Regular Projects */}
            {regularProjects.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularProjects.map((project, index) => (
                  <ProjectCard
                    key={project.slug}
                    project={project}
                    index={index}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
