import { motion } from "motion/react";
import { ArrowUpRight, ArrowDown, Terminal, Radio, Shield, HeartHandshake } from "lucide-react";

interface HeroProps {
  onGetStartedClick: () => void;
  onViewProjectsClick: () => void;
}

export default function Hero({ onGetStartedClick, onViewProjectsClick }: HeroProps) {
  // Mock stack logos representing our development capabilities for the logo ticker
  const logos = [
    { name: "React", icon: "⚛️" },
    { name: "Next.js", icon: "▲" },
    { name: "TypeScript", icon: "TS" },
    { name: "Node.js", icon: "🟢" },
    { name: "Swift", icon: "🍊" },
    { name: "Kotlin", icon: "🟣" },
    { name: "Flutter", icon: "💙" },
    { name: "AWS", icon: "☁️" },
    { name: "GraphQL", icon: "🚀" },
    { name: "Docker", icon: "🐳" },
  ];

  // Double the list to allow infinite looping scroll
  const duplicateLogos = [...logos, ...logos, ...logos];

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-brand-deep pt-28 md:pt-36 lg:pt-40 pb-20 border-b border-white/5"
    >
      {/* 1. Futuristic moving background gradients & subtle grid pattern */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_bottom,rgba(4,7,50,0.6),rgba(4,25,97,0.3))] opacity-90 animate-pan" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Floating Glowing Ambient Circles */}
      <div className="absolute top-1/4 left-1/10 h-72 w-72 rounded-full bg-brand-navy/30 blur-[100px] animate-float" />
      <div className="absolute bottom-1/4 right-1/10 h-96 w-96 rounded-full bg-brand-violet/25 blur-[120px] animate-float-delayed" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-brand-accent/15 blur-[120px]" />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 flex-grow flex flex-col justify-center py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center text-left">
          
          {/* Left Column: Company Motto & Relevant Details */}
          <div className="lg:col-span-7 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
            
           

            {/* Primary Majestic Serif Title / Motto */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] text-white">
              <span className="block text-gradient">Code Your Vision</span>
              <span className="block mt-2 text-gradient-creative">
                with Creativity
              </span>
            </h1>

            {/* Deep professional tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-6 max-w-2xl font-sans text-sm sm:text-base md:text-lg text-slate-300/90 leading-relaxed font-light"
            >
              Transforming innovative ideas into powerful digital products through cutting-edge software engineering, creative design, and scalable technology.
            </motion.p>

            {/* Buttons Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 w-full sm:w-auto"
            >
              <button
                id="hero-get-started"
                onClick={onGetStartedClick}
                className="w-full sm:w-auto relative group inline-flex items-center justify-center gap-2 overflow-hidden rounded-full py-3.5 px-8 font-sans text-sm font-semibold text-white transition-all duration-300 bg-gradient-to-r from-brand-accent via-blue-600 to-indigo-600 shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:shadow-[0_0_35px_rgba(56,189,248,0.5)] cursor-pointer"
              >
                Get Started
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <button
                id="hero-view-projects"
                onClick={onViewProjectsClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 py-3.5 px-8 font-sans text-sm font-semibold text-slate-200 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-slate-300 hover:text-white cursor-pointer"
              >
                View Projects
                <ArrowDown className="h-4 w-4 text-slate-400 group-hover:text-white" />
              </button>
            </motion.div>

            

          </div>

          {/* Right Column: Premium IT Illustration with Gradients */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-5 relative w-full aspect-[4/3] sm:aspect-square lg:aspect-auto h-full min-h-[350px] md:min-h-[420px] rounded-3xl overflow-hidden self-center"
          >
            {/* Ambient Back Glow mesh of gradients */}
            <div className="absolute inset-x-8 inset-y-12 bg-gradient-to-tr from-brand-accent/30 via-indigo-500/25 to-brand-violet/30 blur-[60px] animate-pulse-ring pointer-events-none" />
            
            {/* The Glassmorphic IT Device / Dashboard Container */}
            <div className="absolute inset-0 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-lg shadow-2xl flex flex-col p-6 overflow-hidden">
              {/* Window Controls */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ef4444]/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#10b981]/80" />
                </div>
                <span className="font-mono text-[9px] text-slate-500 tracking-wider">appwhiz-engine.sh</span>
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              </div>
              
              {/* Central Abstract IT Graphic mapping */}
              <div className="flex-grow flex flex-col justify-between relative">
                
                {/* Simulated Grid Matrix Overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff04_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
                
                {/* Neon flow lines connecting components */}
                <svg className="absolute inset-0 w-full h-full opacity-60 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="glow-line-1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                  <path d="M 50 150 Q 150 50 250 120 T 350 180" fill="none" stroke="url(#glow-line-1)" strokeWidth="1.5" strokeDasharray="4 4" />
                  <path d="M 80 80 Q 200 200 300 80" fill="none" stroke="url(#glow-line-1)" strokeWidth="1.5" />
                </svg>

                {/* Simulated Cloud Endpoint Nodes with real Gradient Badges */}
                <div className="relative z-10 flex justify-between items-start">
                  <div className="rounded-xl border border-brand-accent/20 bg-brand-deep/80 p-3 shadow-lg">
                    <span className="block font-mono text-[8px] text-brand-accent font-bold uppercase tracking-wider mb-1">Database API</span>
                    <span className="font-sans text-xs font-semibold text-white">PostgreSQL Connected</span>
                    <div className="mt-1.5 h-1 w-12 rounded bg-gradient-to-r from-brand-accent to-blue-500" />
                  </div>
                  
                  <div className="rounded-xl border border-brand-violet/20 bg-brand-deep/80 p-3 shadow-lg text-right">
                    <span className="block font-mono text-[8px] text-brand-violet font-bold uppercase tracking-wider mb-1">Cloud Engine</span>
                    <span className="font-sans text-xs font-semibold text-white">Cloud Run Active</span>
                    <div className="mt-1.5 h-1 w-12 ml-auto rounded bg-gradient-to-r from-brand-violet to-purple-500" />
                  </div>
                </div>

                {/* Animated Core Cluster Block */}
                <div className="my-auto relative flex justify-center items-center">
                  <div className="absolute h-32 w-32 rounded-full bg-gradient-to-tr from-brand-accent/20 to-brand-violet/20 animate-spin" style={{ animationDuration: "20s" }} />
                  <div className="absolute h-24 w-24 rounded-full bg-slate-950/80 border border-white/10 flex items-center justify-center backdrop-blur-md">
                    <div className="text-center">
                      <span className="block font-serif text-lg font-bold text-gradient">99.9%</span>
                      <span className="block font-mono text-[8px] text-slate-500 uppercase tracking-widest">SLA Uptime</span>
                    </div>
                  </div>
                </div>

                {/* Simulated Server Infrastructure status block with Gradient overlays */}
                <div className="relative z-10 grid grid-cols-2 gap-3 mt-4">
                  <div className="rounded-xl border border-white/5 bg-white/[0.01] p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-[8px] text-slate-500 uppercase">Process.Memory</span>
                      <span className="font-mono text-[8.5px] text-brand-accent font-semibold">14.2 MB</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full w-2/5 bg-gradient-to-r from-brand-accent to-blue-500 rounded-full" />
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/5 bg-white/[0.01] p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-[8px] text-slate-500 uppercase">CDN.Response</span>
                      <span className="font-mono text-[8.5px] text-brand-violet font-semibold">140ms</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full w-4/5 bg-gradient-to-r from-brand-violet to-purple-500 rounded-full" />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
