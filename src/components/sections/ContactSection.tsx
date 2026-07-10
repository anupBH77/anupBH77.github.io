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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left - Info */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={staggerItem} className="mb-8">
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

          {/* Right - Form */}
          {data.formEnabled && (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <form
                onSubmit={handleSubmit}
                className="bg-card/50 backdrop-blur-sm border border-border/60 rounded-2xl p-6 md:p-8"
              >
                <AnimatePresence mode="wait">
                  {submitStatus === "success" ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center py-12 text-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4">
                        <CheckCircle
                          size={32}
                          className="text-emerald-500"
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        Message Sent!
                      </h3>
                      <p className="text-sm text-muted-foreground mb-6">
                        Thank you for reaching out. I'll get back to you soon.
                      </p>
                      <motion.button
                        type="button"
                        onClick={() => setSubmitStatus("idle")}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-6 py-2.5 rounded-xl bg-secondary text-foreground font-medium hover:bg-secondary/80 transition-colors duration-200"
                      >
                        Send Another Message
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-5"
                    >
                      {/* Name */}
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-foreground mb-1.5"
                        >
                          {data.formFields.name.label}
                          {data.formFields.name.required && (
                            <span className="text-red-500 ml-1">*</span>
                          )}
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder={data.formFields.name.placeholder}
                          className={`w-full px-4 py-3 rounded-xl bg-secondary/50 border ${
                            errors.name
                              ? "border-red-500/50 focus:border-red-500"
                              : "border-border/50 focus:border-primary/50"
                          } text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200`}
                        />
                        {errors.name && (
                          <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle size={14} />
                            {errors.name}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-foreground mb-1.5"
                        >
                          {data.formFields.email.label}
                          {data.formFields.email.required && (
                            <span className="text-red-500 ml-1">*</span>
                          )}
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder={data.formFields.email.placeholder}
                          className={`w-full px-4 py-3 rounded-xl bg-secondary/50 border ${
                            errors.email
                              ? "border-red-500/50 focus:border-red-500"
                              : "border-border/50 focus:border-primary/50"
                          } text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200`}
                        />
                        {errors.email && (
                          <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle size={14} />
                            {errors.email}
                          </p>
                        )}
                      </div>

                      {/* Subject */}
                      <div>
                        <label
                          htmlFor="subject"
                          className="block text-sm font-medium text-foreground mb-1.5"
                        >
                          {data.formFields.subject.label}
                          {data.formFields.subject.required && (
                            <span className="text-red-500 ml-1">*</span>
                          )}
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder={data.formFields.subject.placeholder}
                          className={`w-full px-4 py-3 rounded-xl bg-secondary/50 border ${
                            errors.subject
                              ? "border-red-500/50 focus:border-red-500"
                              : "border-border/50 focus:border-primary/50"
                          } text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200`}
                        />
                        {errors.subject && (
                          <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle size={14} />
                            {errors.subject}
                          </p>
                        )}
                      </div>

                      {/* Message */}
                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium text-foreground mb-1.5"
                        >
                          {data.formFields.message.label}
                          {data.formFields.message.required && (
                            <span className="text-red-500 ml-1">*</span>
                          )}
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder={data.formFields.message.placeholder}
                          rows={5}
                          className={`w-full px-4 py-3 rounded-xl bg-secondary/50 border ${
                            errors.message
                              ? "border-red-500/50 focus:border-red-500"
                              : "border-border/50 focus:border-primary/50"
                          } text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-none`}
                        />
                        {errors.message && (
                          <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle size={14} />
                            {errors.message}
                          </p>
                        )}
                      </div>

                      {/* Submit Error */}
                      {submitStatus === "error" && (
                        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-500 flex items-center gap-2">
                          <AlertCircle size={16} />
                          Something went wrong. Please try again.
                        </div>
                      )}

                      {/* Submit Button */}
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 text-white font-medium hover:from-cyan-500 hover:to-teal-500 shadow-lg shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2
                              size={18}
                              className="animate-spin"
                            />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send size={18} />
                            Send Message
                          </>
                        )}
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
