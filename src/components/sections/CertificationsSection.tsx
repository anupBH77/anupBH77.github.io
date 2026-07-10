// ============================================
// Certifications Section
// ============================================

import { motion } from "framer-motion";
import { Award, ExternalLink, Calendar } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getIcon } from "@/config/iconRegistry";
import { staggerContainer, staggerItem } from "@/animations/variants";
import type { CertificationsConfig } from "@/types/portfolio";

interface CertificationsSectionProps {
  data: CertificationsConfig;
}

export const CertificationsSection = ({
  data,
}: CertificationsSectionProps) => {
  return (
    <section id="certifications" className="relative py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={data.heading} />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {data.items.map((cert, index) => {
            const IconComponent = cert.icon
              ? getIcon(cert.icon)
              : Award;

            return (
              <motion.div
                key={index}
                variants={staggerItem}
                whileHover={{ y: -4 }}
                className="group relative bg-card/50 backdrop-blur-sm border border-border/60 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/10 to-teal-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0 text-cyan-400">
                    <IconComponent size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors duration-200 mb-1">
                      {cert.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {cert.issuer}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Calendar size={12} />
                        {cert.issueDate}
                      </span>
                      {cert.credentialUrl && (
                        <motion.a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors duration-200"
                        >
                          Verify
                          <ExternalLink size={12} />
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
