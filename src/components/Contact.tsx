import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Phone, Mail, ShieldAlert, CheckCircle2, Copy, Sparkles, Send } from "lucide-react";
import { ContactSubmission } from "../types";
// 1. Import the browser email module integration
import emailjs from "@emailjs/browser";

interface ContactProps {
  onBookCallClick: () => void;
}

export default function Contact({ onBookCallClick }: ContactProps) {
  const [form, setForm] = useState<ContactSubmission>({
    fullName: "",
    email: "",
    contactNumber: "",
    companyName: "",
    projectDescription: "",
    helpType: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  // 2. Core integration point with EmailJS API endpoint pipeline
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Form Validations
    const newErrors: Record<string, string> = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!form.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please input a valid email.";
    }
    if (!form.contactNumber.trim()) newErrors.contactNumber = "Contact number is required.";
    if (!form.companyName.trim()) newErrors.companyName = "Company name is required.";
    if (!form.projectDescription.trim()) newErrors.projectDescription = "Please provide project description details.";
    if (!form.helpType) newErrors.helpType = "Please select what you need help with.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    // 3. Compile transaction payload parameters 
    const templateParams = {
      fullName: form.fullName,
      email: form.email,
      contactNumber: form.contactNumber,
      companyName: form.companyName,
      helpType: form.helpType,
      projectDescription: form.projectDescription,
    };

    // 4. Fire the direct delivery request transmission
    // Replace placeholders with strings provided inside your dashboard
    emailjs
      .send(
        "service_3lj81dh",     // e.g., 'service_abc123'
        "template_h47csl3",    // e.g., 'template_xyz456'
        templateParams,
        {
          publicKey: "t3KORAOVydZi2lI39"
        }      // e.g., 'user_L92kXjs...'
      )
      .then(
        (response) => {
          console.log("Email pipeline successful status:", response.status, response.text);
          setIsSubmitting(false);
          setIsSuccess(true);
        },
        (error) => {
          console.error("Email dispatch failed completely:", error);
          setIsSubmitting(false);
          setErrors({ form: "Transmission failure over support architecture." });
        }
      );
  };

  const handleResetForm = () => {
    setForm({
      fullName: "",
      email: "",
      contactNumber: "",
      companyName: "",
      projectDescription: "",
      helpType: "",
    });
    setErrors({});
    setIsSuccess(false);
  };

  return (
    <section id="contact" className="relative bg-brand-deep py-24 lg:py-32 border-t border-white/5">
      <div className="absolute top-1/3 left-0 h-96 w-96 rounded-full bg-brand-navy/35 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 h-96 w-96 rounded-full bg-brand-violet/10 blur-[130px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          
          {/* Left Side Info Area */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="font-mono text-xs font-semibold tracking-widest uppercase text-brand-accent">
                Work Initiation
              </h2>
              <h3 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
                Tell Us About Your Problem
              </h3>
              <div className="mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-brand-accent to-brand-violet" />
              <p className="mt-6 font-sans text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                Share your current bottlenecks and goals. We will map the right software, web architectures, or wireless IoT/automation direction for your team.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.01] p-6 space-y-4">
              <h4 className="font-sans text-sm font-semibold text-white flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-brand-accent animate-pulse" />
                Need a fast-track meeting instead?
              </h4>
              <p className="font-sans text-xs text-slate-400 leading-relaxed">
                If you are ready to move quickly, bypass the form and book an interactive, direct 15-minute discovery call with our solutions director.
              </p>
              <div className="pt-2 relative group inline-block w-full">
                <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-brand-accent via-pink-500 to-brand-violet opacity-30 blur group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                <button
                  id="book-discovery-call-btn"
                  onClick={onBookCallClick}
                  className="w-full relative flex items-center justify-center gap-2 rounded-xl bg-brand-deep px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-white border border-white/10 hover:border-transparent transition-all cursor-pointer"
                >
                  Book a Discovery Call
                </button>
              </div>
            </div>
          </div>

          {/* Right Side Form Portal */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl glass-panel p-6 md:p-8">
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form
                    key="contact-form"
                    id="contact-consult-form"
                    onSubmit={handleFormSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <h4 className="font-serif text-xl font-bold text-white border-b border-white/10 pb-3">
                      Consultation Request
                    </h4>

                    {/* Network Fallback Error Banner */}
                    {errors.form && (
                      <div className="flex items-center gap-2 rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-xs text-red-400 font-sans">
                        <ShieldAlert className="h-4 w-4 shrink-0" />
                        <p>{errors.form}</p>
                      </div>
                    )}

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="fullname" className="block font-mono text-[10px] text-slate-400 uppercase tracking-wider mb-1.5">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="fullname"
                          type="text"
                          name="fullName"
                          value={form.fullName}
                          onChange={handleChange}
                          placeholder="John Smith"
                          className={`w-full rounded-lg bg-white/5 border px-3.5 py-2.5 font-sans text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-2 transition-all ${
                            errors.fullName ? "border-red-500/50 focus:ring-red-500/20" : "border-white/10 focus:border-brand-accent focus:ring-brand-accent/20"
                          }`}
                        />
                        {errors.fullName && <p className="mt-1 font-sans text-[10px] text-red-400">{errors.fullName}</p>}
                      </div>

                      <div>
                        <label htmlFor="email" className="block font-mono text-[10px] text-slate-400 uppercase tracking-wider mb-1.5">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="john@company.com"
                          className={`w-full rounded-lg bg-white/5 border px-3.5 py-2.5 font-sans text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-2 transition-all ${
                            errors.email ? "border-red-500/50 focus:ring-red-500/20" : "border-white/10 focus:border-brand-accent focus:ring-brand-accent/20"
                          }`}
                        />
                        {errors.email && <p className="mt-1 font-sans text-[10px] text-red-400">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="contactnumber" className="block font-mono text-[10px] text-slate-400 uppercase tracking-wider mb-1.5">
                          Contact Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="contactnumber"
                          type="text"
                          name="contactNumber"
                          value={form.contactNumber}
                          onChange={handleChange}
                          placeholder="+94 71 123 4567"
                          className={`w-full rounded-lg bg-white/5 border px-3.5 py-2.5 font-sans text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-2 transition-all ${
                            errors.contactNumber ? "border-red-500/50 focus:ring-red-500/20" : "border-white/10 focus:border-brand-accent focus:ring-brand-accent/20"
                          }`}
                        />
                        {errors.contactNumber && <p className="mt-1 font-sans text-[10px] text-red-400">{errors.contactNumber}</p>}
                      </div>

                      <div>
                        <label htmlFor="companyname" className="block font-mono text-[10px] text-slate-400 uppercase tracking-wider mb-1.5">
                          Company Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="companyname"
                          type="text"
                          name="companyName"
                          value={form.companyName}
                          onChange={handleChange}
                          placeholder="AppWhiz Global Ltd"
                          className={`w-full rounded-lg bg-white/5 border px-3.5 py-2.5 font-sans text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-2 transition-all ${
                            errors.companyName ? "border-red-500/50 focus:ring-red-500/20" : "border-white/10 focus:border-brand-accent focus:ring-brand-accent/20"
                          }`}
                        />
                        {errors.companyName && <p className="mt-1 font-sans text-[10px] text-red-400">{errors.companyName}</p>}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="helptype" className="block font-mono text-[10px] text-slate-400 uppercase tracking-wider mb-1.5">
                        What Do You Need Help With? <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="helptype"
                        name="helpType"
                        value={form.helpType}
                        onChange={handleChange}
                        className={`w-full rounded-lg bg-brand-deep/90 border px-3.5 py-2.5 font-sans text-xs text-slate-300 focus:outline-none focus:ring-2 transition-all ${
                          errors.helpType ? "border-red-500/50 focus:ring-red-500/20" : "border-white/10 focus:ring-brand-accent/20 focus:border-brand-accent"
                        }`}
                      >
                        <option value="" disabled className="bg-brand-deep font-sans">-- Select core requirement --</option>
                        <option value="software" className="bg-brand-deep font-sans">Software Architecture / Development</option>
                        <option value="web" className="bg-brand-deep font-sans">Custom Responsive Web Development</option>
                        <option value="mobile" className="bg-brand-deep font-sans">iOS & Android App Engineering</option>
                        <option value="uiux" className="bg-brand-deep font-sans">UI/UX Systems & Wireframes</option>
                        <option value="iot" className="bg-brand-deep font-sans">IoT Solutions & Sensors Telemetry</option>
                        <option value="ai" className="bg-brand-deep font-sans">Generative AI Pipelines Integration</option>
                        <option value="other" className="bg-brand-deep font-sans">Other Solutions</option>
                      </select>
                      {errors.helpType && <p className="mt-1 font-sans text-[10px] text-red-400">{errors.helpType}</p>}
                    </div>

                    <div>
                      <label htmlFor="description" className="block font-mono text-[10px] text-slate-400 uppercase tracking-wider mb-1.5">
                        Describe Your Project <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="description"
                        name="projectDescription"
                        rows={4}
                        value={form.projectDescription}
                        onChange={handleChange}
                        placeholder="Please tell us about your goals, current infrastructure, timeline ideas..."
                        className={`w-full rounded-lg bg-white/5 border px-3.5 py-2.5 font-sans text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-2 transition-all resize-none ${
                          errors.projectDescription ? "border-red-500/50 focus:ring-red-500/20" : "border-white/10 focus:border-brand-accent focus:ring-brand-accent/20"
                        }`}
                      />
                      {errors.projectDescription && <p className="mt-1 font-sans text-[10px] text-red-400">{errors.projectDescription}</p>}
                    </div>

                    <div className="pt-2">
                      <button
                        id="contact-form-submit-btn"
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full relative group inline-flex items-center justify-center gap-2 overflow-hidden rounded-full py-3.5 px-6 font-sans text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 bg-gradient-to-r from-brand-accent via-blue-600 to-brand-violet hover:brightness-110 active:scale-95 disabled:opacity-50 cursor-pointer shadow-lg"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                            Dispatching Request...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            Tell Us Your Problem
                            <Send className="h-4 w-4" />
                          </span>
                        )}
                      </button>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="contact-success"
                    id="contact-submit-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-12 text-center"
                  >
                    <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-400 animate-bounce" />
                    <h4 className="mt-6 font-serif text-2xl font-bold text-white">
                      Problem Received!
                    </h4>
                    <p className="mt-3 mx-auto max-w-md font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Thank you, <strong>{form.fullName}</strong>. Your inquiry for <strong>{form.companyName}</strong> has been logged. Our solution designers are already reviewing your project description.
                    </p>
                    
                    <div className="mt-8">
                      <button
                        id="contact-success-reset"
                        onClick={handleResetForm}
                        className="rounded-xl border border-white/20 bg-white/5 px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-slate-300 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                      >
                        Log Another Problem
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

        {/* Channels Information Footer Block */}
        <div className="mt-20 border-t border-white/10 pt-16">
          <div className="text-center mb-10">
            <h4 className="font-mono text-xs font-semibold tracking-widest text-slate-400 uppercase">
              Direct Channels
            </h4>
            <p className="font-serif text-2xl text-white mt-1">Contact Information</p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 max-w-4xl mx-auto">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-5 rounded-2xl glass-panel p-6 relative overflow-hidden group"
            >
              <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-brand-accent to-blue-500" />
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-accent/10 text-brand-accent">
                <Mail className="h-6 w-6" />
              </div>
              <div className="flex-grow overflow-hidden">
                <div className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">Office Email</div>
                <a
                  href="mailto:appwhizsolutions.official@gmail.com"
                  className="block font-sans text-sm md:text-base font-semibold text-white hover:text-brand-accent transition-colors truncate"
                >
                  appwhizsolutions.official@gmail.com
                </a>
              </div>
              <button
                id="copy-email-btn"
                onClick={() => handleCopyText("appwhizsolutions.official@gmail.com", "email")}
                className="rounded-lg p-2 text-slate-500 hover:bg-white/10 hover:text-white transition-colors cursor-pointer self-center shrink-0"
                aria-label="Copy Email address"
              >
                <span className="font-mono text-[9px] text-brand-accent uppercase mr-1 inline-block">
                  {copiedText === "email" ? "Copied!" : ""}
                </span>
                <Copy className="h-4 w-4 inline-block" />
              </button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-5 rounded-2xl glass-panel p-6 relative overflow-hidden group"
            >
              <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-brand-violet to-purple-500" />
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-violet/20 text-brand-violet">
                <Phone className="h-6 w-6" />
              </div>
              <div className="flex-grow overflow-hidden">
                <div className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">Telephone</div>
                <a
                  href="tel:+94716435472"
                  className="block font-sans text-sm md:text-base font-semibold text-white hover:text-brand-accent transition-colors truncate"
                >
                  +94 71 643 5472
                </a>
              </div>
              <button
                id="copy-phone-btn"
                onClick={() => handleCopyText("+94716435472", "phone")}
                className="rounded-lg p-2 text-slate-500 hover:bg-white/10 hover:text-white transition-colors cursor-pointer self-center shrink-0"
                aria-label="Copy Phone number"
              >
                <span className="font-mono text-[9px] text-brand-violet uppercase mr-1 inline-block">
                  {copiedText === "phone" ? "Copied!" : ""}
                </span>
                <Copy className="h-4 w-4 inline-block" />
              </button>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}