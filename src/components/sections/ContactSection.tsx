// ============================================
// Contact Section with Form
// ============================================

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Loader2, Mail } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SocialLinksGroup } from "@/components/ui/SocialLink";
import { staggerContainer, staggerItem, fadeUp } from "@/animations/variants";
import type { ContactConfig } from "@/types/portfolio";

interface ContactSectionProps {
  data: ContactConfig;
}

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const ContactSection = ({ data }: ContactSectionProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const availabilityColors = {
    available: "bg-emerald-500",
    limited: "bg-amber-500",
    unavailable: "bg-red-500",
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (data.formFields.name.required && !formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (data.formFields.email.required) {
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Invalid email address";
      }
    }

    if (data.formFields.subject.required && !formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (data.formFields.message.required && !formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    // Simulate API call - replace with actual backend integration
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section id="contact" className="relative py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={data.heading} subtitle={data.subtitle} />

        <div className=" mx-auto flex justify-center items-center w-[50%] gap-12 lg:gap-16">
          {/* Left - Info */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={staggerItem} className="mb-8 flex flex-col">
              <p className="text-base text-muted-foreground leading-relaxed mb-8">
                {data.ctaMessage}
              </p>

              {/* Email CTA */}
              <motion.a
                href={`mailto:${data.email}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-teal-500/10 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-200 mb-8"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                  <Mail size={24} className="text-cyan-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Email me at</p>
                  <p className="text-lg font-semibold text-foreground">
                    {data.email}
                  </p>
                </div>
              </motion.a>

              {/* Availability */}
              <div className="flex items-center gap-2 mb-8">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${availabilityColors[data.availabilityStatus]} animate-pulse`}
                />
                <span className="text-sm text-muted-foreground">
                  {data.availabilityText}
                </span>
              </div>

              {/* Social Links */}
              <SocialLinksGroup
                socials={data.socials}
                size="lg"
                variant="outline"
              />
            </motion.div>
          </motion.div>


        </div>
      </div>
    </section>
  );
};
