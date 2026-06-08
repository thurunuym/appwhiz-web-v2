import { motion } from "motion/react";
import { Compass, Lightbulb, Code2, Rocket } from "lucide-react";
import { ProcessStep } from "../types";
import { useState } from "react";

export default function Process() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const steps: ProcessStep[] = [
    {
      id: 1,
      name: "Discover",
      description: "First we listen and strip down your idea to reveal the core of your idea's value proposition.",
    },
    {
      id: 2,
      name: "Design",
      description: "We create a lean go-to-market product strategy that best supports the user's experience.",
    },
    {
      id: 3,
      name: "Develop",
      description: "Our creative team code your idea with precision.",
    },
    {
      id: 4,
      name: "Deploy",
      description: "Real artists ship. We partner with you to launch and iterate to find true product-market fit.",
    },
  ];

  const getStepIcon = (id: number) => {
    const baseClass = "h-5 w-5 transition-all duration-500";
    switch (id) {
      case 1:
        return <Compass className={`${baseClass} text-brand-accent group-hover:rotate-[360deg] group-hover:scale-105`} />;
      case 2:
        return <Lightbulb className={`${baseClass} text-brand-violet group-hover:scale-110 group-hover:drop-shadow-[0_0_6px_rgba(139,92,246,0.4)]`} />;
      case 3:
        return <Code2 className={`${baseClass} text-brand-accent group-hover:translate-x-0.5 group-hover:drop-shadow-[0_0_6px_rgba(56,189,248,0.4)]`} />;
      case 4:
        return <Rocket className={`${baseClass} text-brand-violet group-hover:-translate-y-1 group-hover:drop-shadow-[0_0_6px_rgba(139,92,246,0.4)]`} />;
      default:
        return <Compass className="h-5 w-5" />;
    }
  };

  const getStepGradient = (id: number) => {
    switch (id) {
      case 1: return "from-brand-accent/10 to-blue-600/10";
      case 2: return "from-brand-violet/10 to-purple-600/10";
      case 3: return "from-brand-accent/10 to-cyan-500/10";
      case 4: return "from-brand-violet/10 to-fuchsia-600/10";
      default: return "from-brand-accent/10 to-brand-violet/10";
    }
  };

  return (
    <section id="process" className="relative overflow-hidden bg-brand-deep py-24 lg:py-32 border-t border-white/5">
      {/* Background Ambience Grid and Glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.006)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.006)_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-brand-navy/10 blur-[130px] pointer-events-none" />

      {/* Subtle Dynamic Ambient Glow Behind Panels */}
      {hoveredId && (
        <motion.div
          key={hoveredId}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          className={`absolute top-1/2 h-48 w-48 rounded-full bg-gradient-to-br ${getStepGradient(hoveredId)} blur-[80px] pointer-events-none transition-all duration-700`}
          style={{
            left: `${17 + (hoveredId - 1) * 22}%`,
            transform: "translateY(-50%)",
          }}
        />
      )}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="font-mono text-xs font-semibold tracking-widest uppercase text-brand-violet"
          >
            Methodology
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="mt-3 font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white"
          >
            Our Development Process
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto mt-4 h-0.5 w-16 bg-gradient-to-r from-brand-violet/60 to-brand-accent/60 origin-center"
          />
        </div>

        {/* Timeline Layout */}
        <div className="relative mt-24">
          
          {/* Subtle Dashed Connecting Line (Desktop) */}
          <div className="absolute top-1/2 left-[14%] right-[14%] hidden h-0.5 -translate-y-1/2 lg:block z-0">
            <div className="absolute inset-0 border-t border-dashed border-white/10" />
            
            {/* Minimal Glow Micro-Runner */}
            <motion.div
              animate={{ left: ["-10%", "110%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute top-[-1px] h-[1px] w-20 bg-gradient-to-r from-transparent via-brand-accent/40 to-transparent"
            />
          </div>

          {/* Minimal Node Dots on Desktop Line */}
          <div className="absolute top-1/2 left-[14%] right-[14%] hidden -translate-y-1/2 lg:flex justify-between z-[1] pointer-events-none">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                  hoveredId === step.id
                    ? "bg-brand-accent scale-125 ring-4 ring-brand-accent/10"
                    : "bg-white/10"
                }`}
              />
            ))}
          </div>

          {/* Timeline Nodes Grid */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
                onMouseEnter={() => setHoveredId(step.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Subtle Connecting Line (Mobile/Tablet vertical) */}
                {index < 3 && (
                  <div className="absolute left-[23px] top-12 bottom-[-40px] w-0.5 border-l border-dashed border-white/10 sm:hidden" />
                )}

                {/* Main Card Element */}
                <div className="relative h-full rounded-xl bg-white/[0.02] border border-white/5 p-6 pb-8 transition-all duration-500 hover:bg-white/[0.04] hover:border-white/15 hover:shadow-[0_20px_40px_rgba(2,3,26,0.6)] hover:-translate-y-1">
                  
                  {/* Clean Icon Wrapper */}
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/[0.03] border border-white/10 transition-all duration-500 group-hover:border-white/20 group-hover:bg-white/[0.05]">
                      {getStepIcon(step.id)}
                    </div>
                    
                    {/* Index tracker */}
                    <span className="font-mono text-[10px] tracking-wider font-bold text-slate-600 transition-colors duration-300 group-hover:text-slate-400">
                      0{step.id}
                    </span>
                  </div>

                  {/* Text Details */}
                  <h3 className="mt-5 font-serif text-lg font-bold text-white transition-colors duration-300 group-hover:text-brand-accent">
                    {step.name}
                  </h3>

                  <p className="mt-2.5 font-sans text-xs text-slate-400 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Animated Minimal Bottom accent Indicator */}
                  <div className="absolute bottom-0 left-4 right-4 h-[1px] overflow-hidden">
                    <div 
                      className="h-full w-full bg-gradient-to-r from-transparent via-brand-accent/60 to-transparent translate-x-[-100%] transition-transform duration-500 group-hover:translate-x-[0%]" 
                    />
                  </div>

                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}