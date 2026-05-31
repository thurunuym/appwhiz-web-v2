import { useState } from "react";
import { motion } from "motion/react";
import { Code2, Globe, Smartphone, Palette, Cpu, BrainCircuit, ArrowRight, Check } from "lucide-react";
import { ServiceItem } from "../types";

interface ServicesProps {
  onServiceLearnMore: (service: ServiceItem) => void;
}

export default function Services({ onServiceLearnMore }: ServicesProps) {
  const servicesData: ServiceItem[] = [
    {
      id: "soft-dev",
      title: "Software Development",
      description: "Custom enterprise core architectures, database scaling, API microservices design, and stable high-performance system engineering.",
      lucideIconName: "Code2",
    },
    {
      id: "web-dev",
      title: "Web Development",
      description: "Interactive single-page apps (SPAs), SEO-optimized headless e-commerce, high-fidelity corporate hubs, and jamstack architectures.",
      lucideIconName: "Globe",
    },
    {
      id: "mob-dev",
      title: "Mobile App Development",
      description: "Cross-platform Flutter / React Native applications, native iOS/Android development, and offline-first responsive user interfaces.",
      lucideIconName: "Smartphone",
    },
    {
      id: "ui-ux",
      title: "UI/UX Design",
      description: "Polished design systems, responsive wireframes, visual prototypes, deep heuristic usability audits, and elite interactive mockups.",
      lucideIconName: "Palette",
    },
    {
      id: "iot-sol",
      title: "IoT Solutions",
      description: "Integrated physical device nodes, machine status loops, real-time wireless telemetry dashboards, and edge computing automation.",
      lucideIconName: "Cpu",
    },
    {
      id: "ai-sol",
      title: "AI-Powered Solutions",
      description: "Generative AI pipelines, custom semantic searches, automated text/voice synthesizers, and intelligent system auto-categorization.",
      lucideIconName: "BrainCircuit",
    },
  ];

  // Map icon strings to Lucide components safely
  const getIcon = (name: string) => {
    switch (name) {
      case "Code2":
        return <Code2 className="h-6 w-6 text-brand-accent animate-pulse-ring" />;
      case "Globe":
        return <Globe className="h-6 w-6 text-brand-accent" />;
      case "Smartphone":
        return <Smartphone className="h-6 w-6 text-brand-accent animate-pulse-ring" />;
      case "Palette":
        return <Palette className="h-6 w-6 text-brand-accent" />;
      case "Cpu":
        return <Cpu className="h-6 w-6 text-brand-accent" />;
      case "BrainCircuit":
        return <BrainCircuit className="h-6 w-6 text-brand-accent animate-pulse-ring" />;
      default:
        return <Code2 className="h-6 w-6 text-brand-accent" />;
    }
  };

  return (
    <section id="services" className="relative bg-brand-deep py-24 lg:py-32">
      {/* Visual Ambient Spotlights */}
      <div className="absolute top-1/3 right-0 h-96 w-96 rounded-full bg-brand-mid/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 h-80 w-80 rounded-full bg-brand-navy/35 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center">
          <h2 className="font-mono text-xs font-semibold tracking-widest uppercase text-brand-accent">
            Expert Capabilities
          </h2>
          <p className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Comprehensive Digital Solutions
          </p>
          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-brand-accent to-brand-violet" />
          <p className="mx-auto mt-6 max-w-2xl font-sans text-sm sm:text-base text-slate-400">
            We operate at the intersection of engineering excellence and creative execution to fuel your competitive edge in the modern economy.
          </p>
        </div>

        {/* Services Cards Bento Grid */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {servicesData.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl glass-panel p-6 md:p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-accent/40"
            >
              {/* Card Hover Glow effect backdrop */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-mid/0 via-brand-navy/0 to-brand-violet/0 opacity-0 transition-opacity duration-500 group-hover:from-brand-mid/10 group-hover:via-brand-navy/20 group-hover:to-brand-violet/10 group-hover:opacity-100" />
              
              {/* Radial gradient tracker follow */}
              <div className="absolute -right-20 -top-20 -z-10 h-40 w-40 rounded-full bg-brand-accent/5 blur-2xl group-hover:bg-brand-accent/10 transition-all duration-500" />

              <div>
                {/* Icon wrapper with stylish border and background */}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-mid/40 group-hover:border-brand-accent/40">
                  {getIcon(service.lucideIconName)}
                </div>

                <h3 className="mt-6 font-serif text-lg md:text-xl font-semibold tracking-tight text-white group-hover:text-brand-accent transition-colors">
                  {service.title}
                </h3>

                <p className="mt-3.5 font-sans text-xs md:text-sm text-slate-400 leading-relaxed">
                  {service.description}
                </p>

                {/* Capability miniature checklists */}
                <ul className="mt-6 space-y-2 text-xs text-slate-500 group-hover:text-slate-400 transition-colors">
                  <li className="flex items-center gap-2"><Check className="h-3 w-3 text-brand-accent/70" /> High-standard delivery</li>
                  <li className="flex items-center gap-2"><Check className="h-3 w-3 text-brand-accent/70" /> Scalable codebase architecture</li>
                </ul>
              </div>

              {/* Action trigger button */}
              <div className="mt-8 pt-4 border-t border-white/5">
                <button
                  id={`service-learn-${service.id}`}
                  onClick={() => onServiceLearnMore(service)}
                  className="flex items-center gap-2 font-mono text-[11px] font-bold tracking-wider uppercase text-brand-accent transition-all group-hover:gap-3 group-hover:text-white cursor-pointer"
                >
                  Explore Scope
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
