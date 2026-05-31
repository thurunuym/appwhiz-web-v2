import { motion } from "motion/react";
import { Compass, Lightbulb, Code2, Rocket } from "lucide-react";
import { ProcessStep } from "../types";

export default function Process() {
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
    switch (id) {
      case 1:
        return <Compass className="h-5 w-5 text-brand-accent group-hover:rotate-45 transition-transform duration-500" />;
      case 2:
        return <Lightbulb className="h-5 w-5 text-brand-violet group-hover:scale-125 transition-transform duration-500" />;
      case 3:
        return <Code2 className="h-5 w-5 text-brand-accent group-hover:translate-x-1 transition-transform duration-500" />;
      case 4:
        return <Rocket className="h-5 w-5 text-brand-violet group-hover:-translate-y-1 transition-transform duration-500" />;
      default:
        return <Compass className="h-5 w-5" />;
    }
  };

  return (
    <section id="process" className="relative overflow-hidden bg-brand-deep py-24 lg:py-32 border-t border-white/5">
      {/* Background Ambience Grid and Glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-brand-navy/20 blur-[130px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center">
          <h2 className="font-mono text-xs font-semibold tracking-widest uppercase text-brand-violet">
            Methodology
          </h2>
          <p className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Our Development Process
          </p>
          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-brand-violet to-brand-accent" />
          <p className="mx-auto mt-6 max-w-2xl font-sans text-sm sm:text-base text-slate-400">
            A battle-tested 4-stage engineering sprint model designed to drive velocity, manage deployment hazards, and secure maximum business alignment.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative mt-20">
          
          {/* Connecting Line (Desktop) */}
          <div className="absolute top-1/2 left-[12%] right-[12%] hidden h-[2px] -translate-y-1/2 bg-gradient-to-r from-brand-accent/20 via-brand-violet/50 to-brand-accent/20 lg:block z-0">
            {/* Animated Glow Runner along the line */}
            <motion.div
              animate={{
                left: ["0%", "100%"],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute top-0 h-[2px] w-24 bg-gradient-to-r from-transparent via-brand-accent to-transparent"
            />
          </div>

          {/* Timeline Nodes Grid */}
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group relative"
              >
                {/* Connecting Line (Mobile/Tablet vertical) */}
                {index < 3 && (
                  <div className="absolute left-[26px] top-14 bottom-[-48px] w-[2px] bg-gradient-to-b from-brand-accent/45 to-transparent sm:hidden" />
                )}

                {/* Main Card with premium glass hover effects */}
                <div className="relative rounded-2xl glass-panel p-6 pb-8 text-left transition-all duration-300 hover:border-brand-violet/40 hover:shadow-[0_15px_35px_rgba(4,7,50,0.8)]">
                  
                  {/* Glowing bubble back-overlay */}
                  <div className="absolute inset-0 -z-10 rounded-2xl bg-white/[0.01] transition-colors group-hover:bg-white/[0.03]" />

                  {/* Icon Node & Step count bubble row */}
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-mid to-brand-navy border border-white/10 transition-all duration-300 group-hover:scale-105 group-hover:border-brand-violet/40">
                      {getStepIcon(step.id)}
                    </div>
                    
                    {/* Visual node count index */}
                    <span className="font-mono text-xs font-bold text-slate-500 group-hover:text-brand-accent transition-colors">
                      0{step.id} / STEP
                    </span>
                  </div>

                  {/* Stage titles and body */}
                  <h3 className="mt-6 font-serif text-xl font-bold text-white group-hover:text-brand-accent transition-colors">
                    {step.name}
                  </h3>

                  <p className="mt-3 font-sans text-xs sm:text-sm text-slate-400 leading-relaxed min-h-[72px]">
                    {step.description}
                  </p>

                  {/* Micro-interaction highlight bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl bg-gradient-to-r from-brand-accent/0 to-brand-violet/0 transition-all duration-300 group-hover:from-brand-accent group-hover:to-brand-violet" />

                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
