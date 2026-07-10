// ============================================
// Project Card Component
// ============================================

import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { TechBadge } from "./TechBadge";
import type { Project } from "@/types/portfolio";
interface ProjectCardProps {
  project: Project;
  index: number;
  featured?: boolean;
}

export const ProjectCard = ({
  project,
  index,
  featured = false,
}: ProjectCardProps) => {
  if (featured) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: 0.7,
          delay: index * 0.1,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className="group relative"
      >
        <div className="relative overflow-hidden rounded-2xl bg-card/50 border border-border/60 hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-primary/5">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image */}
            <div className="relative h-64 flex items-center md:h-full overflow-hidden bg-gradient-to-br from-secondary/50 to-secondary">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl font-bold text-muted/20">
                  {project.title.charAt(0)}
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <motion.div
                className="absolute inset-0 bg-primary/10"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >

              </motion.div>
              {project.isImage ? (
                <img src={project.src} alt={project.title} className="absolute inset-0 w-full h-full " />
              ) : (
                <video src={project.src} autoPlay loop muted />
              )}
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary">
                  {project.category}
                </span>
                {project.featured && (
                  <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-amber-500/10 text-amber-500">
                    Featured
                  </span>
                )}
              </div>

              <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                {project.title}
              </h3>

              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                {project.description}
              </p>

              <div className="mb-4">
                <h4 className="text-xs font-medium text-foreground mb-2 uppercase tracking-wide">
                  Problem Solved
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.problem}
                </p>
              </div>

              <div className="mb-5">
                <h4 className="text-xs font-medium text-foreground mb-2 uppercase tracking-wide">
                  Highlights
                </h4>
                <ul className="space-y-1">
                  {project.highlights.map((highlight, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <ArrowUpRight
                        size={14}
                        className="text-primary mt-0.5 flex-shrink-0"
                      />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech) => (
                  <TechBadge key={tech} name={tech} variant="outline" size="sm" />
                ))}
              </div>

              <div className="flex items-center gap-3">
                {project.github && (
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl bg-secondary/50 text-foreground hover:bg-secondary border border-border/50 transition-colors duration-200"
                  >
                    <Github size={16} />
                    Code
                  </motion.a>
                )}
                {project.liveDemo && (
                  <motion.a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </motion.a>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Regular project card
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ y: -8 }}
      className="group relative bg-card/50 backdrop-blur-sm border border-border/60 rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-primary/5"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-secondary/50 to-secondary">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-5xl font-bold text-muted/20">
            {project.title.charAt(0)}
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        <motion.div
          className="absolute inset-0 bg-primary/10"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary">
            {project.category}
          </span>
        </div>

        <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
          {project.title}
        </h3>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.technologies.slice(0, 4).map((tech) => (
            <TechBadge key={tech} name={tech} variant="outline" size="sm" />
          ))}
          {project.technologies.length > 4 && (
            <TechBadge
              name={`+${project.technologies.length - 4}`}
              variant="outline"
              size="sm"
            />
          )}
        </div>

        <div className="flex items-center gap-3">
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg bg-secondary/50 text-foreground hover:bg-secondary border border-border/50 transition-colors duration-200"
            >
              <Github size={14} />
              Code
            </motion.a>
          )}
          {project.liveDemo && (
            <motion.a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
            >
              <ExternalLink size={14} />
              Demo
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
};
