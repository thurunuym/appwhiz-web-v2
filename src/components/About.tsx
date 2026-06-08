import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import { Award, ShieldCheck, Zap, Users, Sparkles, Code } from "lucide-react";

export default function About() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  // Custom hook-driven counters for numbers to make them animated
  const [projects, setProjects] = useState(0);
  const [retention, setRetention] = useState(0);
  const [experience, setExperience] = useState(0);
  const [developers, setDevelopers] = useState(0);

  useEffect(() => {
    if (isInView) {
      // Animate counts smoothly to targets
      const duration = 1500; // 1.5s
      const steps = 60;
      const stepTime = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        
        setProjects(Math.floor((10 * currentStep) / steps));
        setRetention(parseFloat(((99.4 * currentStep) / steps).toFixed(1)));
        setExperience(Math.floor((4 * currentStep) / steps));
        setDevelopers(Math.floor((5 * currentStep) / steps));

        if (currentStep >= steps) {
          setProjects(10);
          setRetention(99.4);
          setExperience(4);
          setDevelopers(5);
          clearInterval(timer);
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [isInView]);

  return (
    <section id="about" className="relative bg-brand-deep py-24 lg:py-32 border-t border-white/5" ref={containerRef}>
      {/* Background spot glows */}
      <div className="absolute top-1/4 left-0 h-96 w-96 rounded-full bg-brand-accent/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 h-80 w-80 rounded-full bg-brand-violet/10 blur-[130px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Left-Right Split Content Area */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          
          {/* Left Block: Description with Brand Styling */}
          <div>
            <h2 className="font-mono text-xs font-semibold tracking-widest uppercase text-brand-accent">
              Who We Are
            </h2>
            <h3 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              About AppWhiz Solutions
            </h3>
            <div className="mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-brand-accent to-brand-violet" />

            <div className="mt-8 space-y-6 font-sans text-sm sm:text-base text-slate-300 leading-relaxed font-light">
              <p>
                At <strong className="font-semibold text-white">AppWhiz Solutions</strong>, our hard work and dedication have marked our footprint as a top startup company. With the right mix of skilled professionals, we form a great team delivering excellence in IT services across Software Development, Web & Mobile Application Development, and the Internet of Things.
              </p>
              <p>
                As one of the top emerging companies, we take pride in our exceptional team—a perfect blend of creativity, expertise, and passion. Get in touch with us and let us handle all the heavy lifting from there. Our team of experts is dedicated to transforming your vision into reality.
              </p>
            </div>

            
          </div>

          {/* Right Block: Dynamic statistics & Experiential visuals */}
          <div className="grid grid-cols-2 gap-4 lg:gap-6 relative">
            
            {/* Visual background shape for depth */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-navy/20 to-brand-accent/5 rounded-3xl blur-xl -z-10" />

            {/* Statistic Card 1 - Projects Completed */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="rounded-2xl glass-panel p-6 text-center shadow-lg relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-accent to-blue-500" />
              <Code className="mx-auto h-6 w-6 text-brand-accent mb-4" />
              <div className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
                {projects}+
              </div>
              <div className="mt-2 font-mono text-[10px] sm:text-xs text-slate-400 uppercase tracking-widest">
                Projects Completed
              </div>
            </motion.div>

            {/* Statistic Card 2 - Client Retention */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="rounded-2xl glass-panel p-6 text-center shadow-lg relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-brand-violet" />
              <Award className="mx-auto h-6 w-6 text-brand-violet mb-4" />
              <div className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
                {retention}%
              </div>
              <div className="mt-2 font-mono text-[10px] sm:text-xs text-slate-400 uppercase tracking-widest">
                Client Retention
              </div>
            </motion.div>

            {/* Statistic Card 3 - Experience Years */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="rounded-2xl glass-panel p-6 text-center shadow-lg relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-violet to-purple-500" />
              <Sparkles className="mx-auto h-6 w-6 text-brand-violet mb-4" />
              <div className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
                {experience}+ Yrs
              </div>
              <div className="mt-2 font-mono text-[10px] sm:text-xs text-slate-400 uppercase tracking-widest">
                Team Experience
              </div>
            </motion.div>

            {/* Statistic Card 4 - Dedicated Developers */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="rounded-2xl glass-panel p-6 text-center shadow-lg relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-accent to-teal-500" />
              <Users className="mx-auto h-6 w-6 text-brand-accent mb-4" />
              <div className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
                {developers}+
              </div>
              <div className="mt-2 font-mono text-[10px] sm:text-xs text-slate-400 uppercase tracking-widest">
                Core Experts
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}
