import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FileUp, Trash2, Mail, Send, CheckCircle2 } from "lucide-react";
import { CareersApplication } from "../types";

export default function Careers() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Local state for candidate application form
  const [formData, setFormData] = useState<CareersApplication>({
    name: "",
    email: "",
    skills: "",
    message: "",
  });

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  // Validation, errors and success feedback states
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Drag over handler
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  // Drag leave handler
  const handleDragLeave = () => {
    setIsDragging(false);
  };

  // Drop handler
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      validateAndSetFile(file);
    }
  };

  // Traditional file selector handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      validateAndSetFile(file);
    }
  };

  const validateAndSetFile = (file: File) => {
    const fileExt = file.name.split(".").pop()?.toLowerCase();
    const allowedTypes = ["pdf", "doc", "docx"];
    
    if (!fileExt || !allowedTypes.includes(fileExt)) {
      setErrors(prev => ({ ...prev, resume: "Only PDF, DOC, or DOCX formats are accepted." }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setErrors(prev => ({ ...prev, resume: "Maximum file size supported is 5MB." }));
      return;
    }

    setResumeFile(file);
    setFormData(prev => ({ ...prev, resumeFileName: file.name }));
    setErrors(prev => {
      const copy = { ...prev };
      delete copy.resume;
      return copy;
    });
  };

  const removeResume = () => {
    setResumeFile(null);
    setFormData(prev => ({ ...prev, resumeFileName: undefined }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple verification checking
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Full Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email Address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please input a valid email address.";
    }
    if (!formData.skills.trim()) newErrors.skills = "Core skills list is required.";
    if (!resumeFile) newErrors.resume = "Please upload your professional resume/CV.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Trigger simulation
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", skills: "", message: "" });
    setResumeFile(null);
    setIsSuccess(false);
    setErrors({});
  };

  return (
    <section id="careers" className="relative overflow-hidden bg-brand-deep py-24 lg:py-32 border-t border-white/5">
      {/* Background visual designs */}
      <div className="absolute top-10 right-0 h-96 w-96 rounded-full bg-brand-navy/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 h-80 w-80 rounded-full bg-brand-accent/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Core Header info */}
        <div className="text-center">
          <h2 className="font-mono text-xs font-semibold tracking-widest uppercase text-brand-accent">
            Work With Us
          </h2>
          <p className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Work Where Freedom is the Greatest Gift
          </p>
          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-brand-accent to-brand-violet" />
          <p className="mx-auto mt-4 font-sans text-sm text-brand-violet tracking-wide font-semibold uppercase">
            Careers at AppWhiz Solutions
          </p>
        </div>

        {/* Info Box + Application Split Portal */}
        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          
          {/* Left info description column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl glass-panel p-6 md:p-8 space-y-6">
              <h3 className="font-serif text-2xl font-bold text-white">
                Open Positions
              </h3>
              
              {/* No Positions Alert Panel */}
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                <span className="font-mono text-xs font-bold text-slate-500 uppercase">Status</span>
                <p className="mt-2 font-sans text-sm text-slate-300 font-medium">
                  No open roles right now — we hire when the work truly needs someone new.
                </p>
                <p className="mt-3 font-sans text-xs text-slate-400">
                  We value organic, deliberate scaling over hype. If you are highly talented and self-guided, drop your details. We read every inquiry.
                </p>
              </div>

              {/* Direct email display section */}
              <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-accent/10 text-brand-accent">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">Inquire Directly</div>
                  <a
                    href="mailto:appwhizsolutions.official@gmail.com"
                    className="font-sans text-sm font-semibold text-white hover:text-brand-accent transition-colors"
                  >
                    appwhizsolutions.official@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Experience details block */}
            <div className="rounded-2xl bg-gradient-to-br from-brand-navy/30 to-brand-mid/10 border border-white/5 p-6 space-y-3">
              <h4 className="font-sans text-sm font-bold text-white">AppWhiz Culture Principles</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-brand-accent mt-0.5">•</span>
                  <span><strong>Highest Trust Levels</strong>: High remote autonomy, client alignment and flat team hierarchy.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-accent mt-0.5">•</span>
                  <span><strong>Engineering Sincerity</strong>: No bureaucratic overhead. We code, style, deploy and improve.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Application interactive portal column */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl glass-panel p-6 md:p-8 relative">
              
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form
                    key="careers-form"
                    id="careers-application-form"
                    onSubmit={handleFormSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5"
                  >
                    <h4 className="font-serif text-xl font-bold text-white border-b border-white/10 pb-3">
                      Drop Your Candidacy
                    </h4>

                    {/* Full Name input */}
                    <div>
                      <label htmlFor="candidates-name" className="block font-mono text-[11px] text-slate-400 uppercase tracking-wider mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="candidates-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={`w-full rounded-xl bg-white/5 border px-4 py-3 font-sans text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 transition-all ${
                          errors.name
                            ? "border-red-500/50 focus:ring-red-500/20"
                            : "border-white/10 focus:border-brand-accent focus:ring-brand-accent/20"
                        }`}
                      />
                      {errors.name && <p className="mt-1.5 font-sans text-xs text-red-400">{errors.name}</p>}
                    </div>

                    {/* Email Input */}
                    <div>
                      <label htmlFor="candidates-email" className="block font-mono text-[11px] text-slate-400 uppercase tracking-wider mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="candidates-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="johndoe@example.com"
                        className={`w-full rounded-xl bg-white/5 border px-4 py-3 font-sans text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 transition-all ${
                          errors.email
                            ? "border-red-500/50 focus:ring-red-500/20"
                            : "border-white/10 focus:border-brand-accent focus:ring-brand-accent/20"
                        }`}
                      />
                      {errors.email && <p className="mt-1.5 font-sans text-xs text-red-400">{errors.email}</p>}
                    </div>

                    {/* Skills description list Input */}
                    <div>
                      <label htmlFor="candidates-skills" className="block font-mono text-[11px] text-slate-400 uppercase tracking-wider mb-2">
                        Core Skills <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="candidates-skills"
                        type="text"
                        name="skills"
                        value={formData.skills}
                        onChange={handleChange}
                        placeholder="React, TypeScript, AWS, CI/CD, Figma..."
                        className={`w-full rounded-xl bg-white/5 border px-4 py-3 font-sans text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 transition-all ${
                          errors.skills
                            ? "border-red-500/50 focus:ring-red-500/20"
                            : "border-white/10 focus:border-brand-accent focus:ring-brand-accent/20"
                        }`}
                      />
                      {errors.skills && <p className="mt-1.5 font-sans text-xs text-red-400">{errors.skills}</p>}
                    </div>

                    {/* Personal Message block Input */}
                    <div>
                      <label htmlFor="candidates-message" className="block font-mono text-[11px] text-slate-400 uppercase tracking-wider mb-2">
                        Tell Us About Yourself (Optional)
                      </label>
                      <textarea
                        id="candidates-message"
                        name="message"
                        rows={3}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Share a short bio or link to products you engineered..."
                        className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 font-sans text-sm text-white placeholder-slate-600 focus:outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 transition-all resize-none"
                      />
                    </div>

                    {/* Drag-and-Drop Resume Upload Area */}
                    <div>
                      <span className="block font-mono text-[11px] text-slate-400 uppercase tracking-wider mb-2">
                        Attach Resume/CV <span className="text-red-500">*</span>
                      </span>

                      {!resumeFile ? (
                        <div
                          id="resume-drag-zone"
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                          onClick={() => fileInputRef.current?.click()}
                          className={`flex flex-col items-center justify-center rounded-xl border border-dashed p-6 text-center cursor-pointer transition-all ${
                            isDragging
                              ? "border-brand-accent bg-brand-accent/5"
                              : "border-white/20 bg-white/[0.01] hover:border-white/40 hover:bg-white/[0.03]"
                          }`}
                        >
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept=".pdf,.doc,.docx"
                            className="hidden"
                            onChange={handleFileChange}
                          />
                          <FileUp className="h-8 w-8 text-slate-400 animate-pulse" />
                          <p className="mt-3 font-sans text-xs text-white">
                            <span className="font-semibold text-brand-accent">Click to upload</span> or drag and drop
                          </p>
                          <p className="mt-1 font-mono text-[9px] text-slate-500">
                            PDF, DOC, DOCX up to 5MB
                          </p>
                        </div>
                      ) : (
                        <div
                          id="uploaded-resume-card"
                          className="flex items-center justify-between rounded-xl border border-brand-accent/30 bg-brand-accent/5 p-4"
                        >
                          <div className="flex items-center gap-3 overflow-hidden">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-accent/10 text-brand-accent">
                              <FileUp className="h-5 w-5" />
                            </div>
                            <div className="overflow-hidden">
                              <p className="truncate font-sans text-xs font-semibold text-white">
                                {resumeFile.name}
                              </p>
                              <p className="font-mono text-[9px] text-slate-400">
                                {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          
                          <button
                            id="remove-resume-btn"
                            type="button"
                            onClick={removeResume}
                            className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                            aria-label="Remove uploaded resume"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      )}

                      {errors.resume && <p className="mt-1.5 font-sans text-xs text-red-400">{errors.resume}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                      id="submit-careers-btn"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full relative group inline-flex items-center justify-center gap-2 overflow-hidden rounded-full py-3.5 px-6 font-sans text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 bg-gradient-to-r from-brand-mid to-brand-violet shadow-lg hover:brightness-110 active:scale-95 disabled:opacity-50 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                          Registering Candidates...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Submit Application
                          <Send className="h-3.5 w-3.5" />
                        </span>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="careers-success"
                    id="careers-submit-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-12 text-center"
                  >
                    <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-400 animate-bounce" />
                    
                    <h4 className="mt-6 font-serif text-2xl font-bold text-white">
                      Application Submitted!
                    </h4>
                    
                    <p className="mt-3 mx-auto max-w-md font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Thank you for applying to AppWhiz Solutions, <strong>{formData.name}</strong>! We have parsed your skills listed (<span className="font-mono text-brand-accent text-xs">{formData.skills}</span>) and received your resume <strong>{formData.resumeFileName}</strong>.
                    </p>

                    <p className="mt-4 font-sans text-xs text-slate-500">
                      Our engineering leads will evaluate your profile and get back to you at <strong>{formData.email}</strong> as soon as a fitting workload emerges.
                    </p>

                    <div className="mt-8">
                      <button
                        id="careers-reset-btn"
                        onClick={resetForm}
                        className="rounded-xl border border-white/20 bg-white/5 px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-slate-300 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                      >
                        Submit Another Profile
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
