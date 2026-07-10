// ============================================
// Personal Details Section - Developer Identity Card
// ============================================

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, User, MapPin, Mail, Phone, Languages, Clock, Monitor, Award } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { staggerContainer, staggerItem } from "@/animations/variants";
import type { PersonalDetailsConfig } from "@/types/portfolio";

interface PersonalDetailsSectionProps {
  data: PersonalDetailsConfig;
}

const fieldIcons: Record<string, React.ReactNode> = {
  user: <User size={18} />,
  badge: <Award size={18} />,
  mapPin: <MapPin size={18} />,
  mail: <Mail size={18} />,
  phone: <Phone size={18} />,
  languages: <Languages size={18} />,
  clock: <Clock size={18} />,
  monitor: <Monitor size={18} />,
};

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.button
      onClick={handleCopy}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="ml-2 p-1.5 rounded-lg bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors duration-200"
      title="Copy to clipboard"
    >
      {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
    </motion.button>
  );
};

export const PersonalDetailsSection = ({ data }: PersonalDetailsSectionProps) => {
  return (
    <section id="personal" className="relative py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={data.heading} subtitle={data.subtitle} />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          {/* Identity Card */}
          <motion.div
            variants={staggerItem}
            className="relative bg-card/50 backdrop-blur-sm border border-border/60 rounded-3xl p-8 md:p-10 overflow-hidden"
          >
            {/* Decorative gradient */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/5 to-teal-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-500/5 to-cyan-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            {/* Card Header */}
            <div className="relative flex items-center gap-5 mb-8">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center shadow-lg shadow-cyan-500/25">
                <User size={36} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">
                  {data.fields.find((f) => f.label === "Full Name")?.value || "Developer"}
                </h3>
                <p className="text-muted-foreground">
                  {data.fields.find((f) => f.label === "Title")?.value || "Full Stack Developer"}
                </p>
              </div>
            </div>

            {/* Fields Grid */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.fields
                .filter((f) => f.label !== "Full Name" && f.label !== "Title")
                .map((field) => {
                  const icon = fieldIcons[field.icon] || <User size={18} />;
                  const isClickable = field.type === "email" || field.type === "phone";
                  const href =
                    field.type === "email"
                      ? `mailto:${field.value}`
                      : field.type === "phone"
                        ? `tel:${field.value}`
                        : undefined;

                  return (
                    <motion.div
                      key={field.label}
                      variants={staggerItem}
                      whileHover={{ scale: 1.01 }}
                      className="flex items-center gap-3 p-4 rounded-xl bg-secondary/30 border border-border/50 hover:border-primary/20 transition-all duration-200"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                        {icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground mb-0.5">
                          {field.label}
                        </p>
                        <div className="flex items-center">
                          {isClickable ? (
                            <a
                              href={href}
                              className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200"
                            >
                              {field.value}
                            </a>
                          ) : (
                            <span className="text-sm font-medium text-foreground">
                              {field.value}
                            </span>
                          )}
                          {(field.type === "email" || field.type === "phone") && (
                            <CopyButton text={field.value} />
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
