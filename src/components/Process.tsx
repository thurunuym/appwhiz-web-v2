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
    const baseClass = "h-6 w-6 transition-all duration-500";
    switch (id) {
      case 1:
        return <Compass className={`${baseClass} text-brand-accent group-hover:rotate-[360deg] group-hover:scale-110`} />;
      case 2:
        return <Lightbulb className={`${baseClass} text-brand-violet group-hover:scale-125 group-hover:drop-shadow-[0_0_8px_rgba(139,92,246,0.6)]`} />;
      case 3:
        return <Code2 className={`${baseClass} text-brand-accent group-hover:translate-x-1 group-hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]`} />;
      case 4:
        return <Rocket className={`${baseClass} text-brand-violet group-hover:-translate-y-1.5 group-hover:drop-shadow-[0_0_8px_rgba(139,92,246,0.6)]`} />;
      default:
        return <Compass className="h-6 w-6" />;
    }
  };

  const getStepGradient = (id: number) => {
    switch (id) {
      case 1: return "from-brand-accent/20 to-blue-600/20";
      case 2: return "from-brand-violet/20 to-purple-600/20";
      case 3: return "from-brand-accent/20 to-cyan-500/20";
      case 4: return "from-brand-violet/20 to-fuchsia-600/20";
      default: return "from-brand-accent/20 to-brand-violet/20";
    }
  };

  return (
    <section id="process" className="relative overflow-hidden bg-brand-deep py-24 lg:py-32 border-t border-white/5">
      {/* Background Ambience Grid and Glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-brand-navy/20 blur-[130px] pointer-events-none" />

      {/* Dynamic glow that follows hovered card */}
      {hoveredId && (
        <motion.div
          key={hoveredId}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className={`absolute top-1/2 h-64 w-64 rounded-full bg-gradient-to-br ${getStepGradient(hoveredId)} blur-[100px] pointer-events-none transition-all duration-700`}
          style={{
            left: `${15 + (hoveredId - 1) * 23}%`,
            transform: "translateY(-50%)",
          }}
        />
      )}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-mono text-xs font-semibold tracking-widest uppercase text-brand-violet"
          >
            Methodology
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white"
          >
            Our Development Process
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-brand-violet to-brand-accent origin-center"
          />
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mx-auto mt-6 max-w-2xl font-sans text-sm sm:text-base text-slate-400"
          >
            A battle-tested 4-stage engineering sprint model designed to drive velocity, manage deployment hazards, and secure maximum business alignment.
          </motion.p>
        </div>

        {/* Timeline Layout */}
        <div className="relative mt-20">
          
          {/* Connecting Line (Desktop) */}
          <div className="absolute top-1/2 left-[12%] right-[12%] hidden h-[2px] -translate-y-1/2 lg:block z-0 overflow-hidden">
            {/* Base line */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-accent/15 via-brand-violet/30 to-brand-accent/15" />
            
            {/* Animated Glow Runner */}
            <motion.div
              animate={{
                left: ["0%", "100%"],
                opacity: [0, 1, 1, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute top-0 h-[2px] w-32 bg-gradient-to-r from-transparent via-brand-accent to-transparent shadow-[0_0_12px_rgba(56,189,248,0.6)]"
            />
            
            {/* Second glow runner (opposite direction, violet) */}
            <motion.div
              animate={{
                right: ["0%", "100%"],
                opacity: [0, 0.7, 0.7, 0]
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "linear",
                delay: 1.5,
              }}
              className="absolute top-0 h-[2px] w-20 bg-gradient-to-r from-transparent via-brand-violet to-transparent shadow-[0_0_12px_rgba(139,92,246,0.5)]"
            />
          </div>

          {/* Pulsing Node Dots on timeline */}
          <div className="absolute top-1/2 left-[12%] right-[12%] hidden -translate-y-1/2 lg:flex justify-between z-[1] pointer-events-none">
            {steps.map((step) => (
              <motion.div
                key={step.id}
                animate={{
                  scale: hoveredId === step.id ? [1, 1.6, 1] : [1, 1.3, 1],
                  opacity: hoveredId === step.id ? [0.8, 1, 0.8] : [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: hoveredId === step.id ? 1 : 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className={`h-3 w-3 rounded-full ${
                  hoveredId === step.id
                    ? "bg-brand-accent shadow-[0_0_16px_rgba(56,189,248,0.8)]"
                    : "bg-brand-violet/60"
                }`}
              />
            ))}
          </div>

          {/* Timeline Nodes Grid */}
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group relative"
                onMouseEnter={() => setHoveredId(step.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Connecting Line (Mobile/Tablet vertical) */}
                {index < 3 && (
                  <div className="absolute left-[26px] top-14 bottom-[-48px] w-[2px] bg-gradient-to-b from-brand-accent/45 to-transparent sm:hidden" />
                )}

                {/* Main Card with premium glass hover effects */}
                <div className="relative rounded-2xl glass-panel p-6 pb-8 text-left transition-all duration-500 hover:border-brand-violet/40 hover:shadow-[0_15px_45px_rgba(4,7,50,0.9),0_0_30px_rgba(139,92,246,0.1)] hover:-translate-y-1">
                  
                  {/* Glowing bubble back-overlay */}
                  <div className={`absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br ${getStepGradient(step.id)} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

                  {/* Icon Node & Step count bubble row */}
                  <div className="flex items-center justify-between">
                    <motion.div
                      whileHover={{ rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 0.5 }}
                      className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-brand-mid to-brand-navy border border-white/10 transition-all duration-500 group-hover:scale-110 group-hover:border-brand-violet/50 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.2)]"
                    >
                      {getStepIcon(step.id)}
                    </motion.div>
                    
                    {/* Visual node count index */}
                    <span className="font-mono text-xs font-bold text-slate-600 group-hover:text-brand-accent transition-all duration-300 group-hover:tracking-wider">
                      0{step.id} / STEP
                    </span>
                  </div>

                  {/* Stage titles and body */}
                  <h3 className="mt-6 font-serif text-xl font-bold text-white group-hover:text-brand-accent transition-colors duration-300">
                    {step.name}
                  </h3>

                  <p className="mt-3 font-sans text-xs sm:text-sm text-slate-400 leading-relaxed min-h-[72px]">
                    {step.description}
                  </p>

                  {/* Animated bottom highlight bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl overflow-hidden">
                    <motion.div
                      initial={{ x: "-100%" }}
                      whileInView={{ x: "0%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.15 + 0.4 }}
                      className="h-full w-full bg-gradient-to-r from-brand-accent/0 to-brand-violet/0 transition-all duration-500 group-hover:from-brand-accent group-hover:to-brand-violet"
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
