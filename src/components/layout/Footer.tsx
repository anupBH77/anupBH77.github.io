// ============================================
// Footer Component
// ============================================

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { SocialLinksGroup } from "@/components/ui/SocialLink";
import type { FooterConfig } from "@/types/portfolio";

interface FooterProps {
  footer: FooterConfig;
}

export const Footer = ({ footer }: FooterProps) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative border-t border-border/50 bg-background/50 backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left - Name and tagline */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-foreground mb-1">
              {footer.name}
            </h3>
            <p className="text-sm text-muted-foreground">{footer.tagline}</p>
          </div>

          {/* Center - Social links */}
          <SocialLinksGroup
            socials={footer.socials}
            size="sm"
            variant="outline"
          />

          {/* Right - Back to top and copyright */}
          <div className="flex flex-col items-center md:items-end gap-3">
            {footer.showBackToTop && (
              <motion.button
                onClick={scrollToTop}
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl bg-secondary/50 text-muted-foreground hover:text-foreground border border-border/50 transition-colors duration-200"
              >
                <ArrowUp size={14} />
                Back to Top
              </motion.button>
            )}
            <p className="text-xs text-muted-foreground">{footer.copyright}</p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};
