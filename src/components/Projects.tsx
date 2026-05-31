import { motion } from "motion/react";
import { ArrowUpRight, FolderGit, Calendar, Users, Cpu, ShieldCheck } from "lucide-react";
import { ProjectItem } from "../types";

interface ProjectsProps {
  onProjectClick: (project: ProjectItem) => void;
}

export default function Projects({ onProjectClick }: ProjectsProps) {
  const secondaryProjects: ProjectItem[] = [
    {
      id: 1,
      name: "VibrantNotify",
      description: "An innovative wireless token notification system connected to a mobile application that vibrates to notify users efficiently.",
      tags: ["React Native", "BLE Connectivity", "IoT Integration"],
    },
    {
      id: 2,
      name: "GymKeeper",
      description: "A modern fitness mobile application providing membership management, workout tracking, and user progress monitoring.",
      tags: ["iOS Dev", "SwiftUI", "CoreData", "Charts"],
    },
    {
      id: 3,
      name: "FixitNow",
      description: "A workplace issue reporting platform enabling employees to quickly communicate maintenance and operational concerns.",
      tags: ["VueJS", "Firebase Backend", "Realtime Node"],
    }
  ];

  const featuredProject: ProjectItem = {
    id: 0,
    name: "Wiseway Papers",
    description: "A comprehensive tuition management platform designed to streamline student management, class scheduling, attendance tracking, and educational administration. Designed with high fidelity cloud synchronizations and instant report generations.",
    tags: ["Full-Stack App", "React v19", "Express Engine", "PostgreSQL", "GraphQL API"],
    featured: true
  };

  return (
    <section id="projects" className="relative bg-brand-deep py-24 lg:py-32 border-t border-white/5">
      {/* Background radial spotlights */}
      <div className="absolute top-1/2 left-0 h-96 w-96 rounded-full bg-brand-violet/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 h-80 w-80 rounded-full bg-brand-accent/10 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center">
          <h2 className="font-mono text-xs font-semibold tracking-widest uppercase text-brand-accent">
            Curated Portfolio
          </h2>
          <p className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Featured Projects
          </p>
          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-brand-accent to-brand-violet" />
          <p className="mx-auto mt-6 max-w-2xl font-sans text-sm sm:text-base text-slate-400">
            A handpicked selection of premium digital platforms representing outstanding execution across client sectors.
          </p>
        </div>

        {/* 1. Wiseway Papers: Featured Big Card Block */}
        <div className="mt-16">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="group relative overflow-hidden rounded-3xl glass-panel gradient-border-card p-6 md:p-10 lg:p-12 transition-all duration-300 hover:border-brand-accent/40"
          >
            
            {/* Elegant Background Gradient Overlay */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-accent/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
              
              {/* Featured Card Left Info Panel */}
              <div className="lg:col-span-7">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-accent/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-brand-accent mb-6">
                  Featured Project
                </span>

                <h3 className="font-serif text-3xl md:text-4xl font-bold text-white transition-colors group-hover:text-brand-accent">
                  {featuredProject.name}
                </h3>

                <p className="mt-4 font-sans text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed font-light">
                  {featuredProject.description}
                </p>

                {/* Tech Badges Row */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {featuredProject.tags.map(tag => (
                    <span
                      key={tag}
                      className="rounded-lg bg-white/5 border border-white/10 px-3 py-1 font-mono text-[10px] text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Simulated Metadata Checklist on Wiseway Papers usage */}
                <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Users className="h-4 w-4 text-brand-accent" />
                    <span>2,500+ Active Students</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Calendar className="h-4 w-4 text-brand-violet" />
                    <span>Real-time Scheduler Engine</span>
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    id="featured-project-case"
                    onClick={() => onProjectClick(featuredProject)}
                    className="inline-flex items-center gap-2 rounded-xl bg-white/5 border border-white/15 px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-white hover:bg-brand-accent hover:text-brand-deep hover:border-brand-accent transition-all duration-300 cursor-pointer"
                  >
                    Explore Case Study
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
 
              {/* Featured Card Right - Project Technical Deliverables Schema */}
              <div className="lg:col-span-5 rounded-2xl bg-gradient-to-br from-[#041144] to-[#01031c] border border-white/10 relative overflow-hidden flex flex-col p-6 shadow-2xl space-y-4">
                
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <span className="font-mono text-[9px] text-brand-accent uppercase tracking-widest font-semibold">Technical Deliverables</span>
                </div>

                <p className="font-sans text-xs text-slate-400">
                  A high-end modular stack constructed to solve real administrative bottlenecks safely and efficiently.
                </p>

                {/* Project Modules list - separated horizontally */}
                <div className="space-y-3 flex-grow justify-center flex flex-col">
                  {/* Layer 1 */}
                  <div className="flex items-center gap-3 rounded-xl bg-white/[0.02] border border-white/5 p-3 hover:bg-white/[0.04] transition-all duration-300">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-accent/10 text-brand-accent font-mono text-xs font-bold">
                      01
                    </div>
                    <div>
                      <h4 className="font-sans text-xs font-semibold text-white">React 19 Admin Portal</h4>
                      <p className="font-sans text-[10px] text-slate-400 leading-normal mt-0.5">High-fidelity responsive UI, real-time dashboards & offline states.</p>
                    </div>
                  </div>

                  {/* Layer 2 */}
                  <div className="flex items-center gap-3 rounded-xl bg-white/[0.02] border border-white/5 p-3 hover:bg-white/[0.04] transition-all duration-300">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-violet/20 text-brand-violet font-mono text-xs font-bold">
                      02
                    </div>
                    <div>
                      <h4 className="font-sans text-xs font-semibold text-white">GraphQL API Mesh</h4>
                      <p className="font-sans text-[10px] text-slate-400 leading-normal mt-0.5">Sub-200ms queries, unified data schema & optimized backend caching.</p>
                    </div>
                  </div>

                  {/* Layer 3 */}
                  <div className="flex items-center gap-3 rounded-xl bg-white/[0.02] border border-white/5 p-3 hover:bg-white/[0.04] transition-all duration-300">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-accent/10 text-brand-accent font-mono text-xs font-bold">
                      03
                    </div>
                    <div>
                      <h4 className="font-sans text-xs font-semibold text-white">Encrypted SQL Node</h4>
                      <p className="font-sans text-[10px] text-slate-400 leading-normal mt-0.5">Multi-tenant logical partitions, database audits & regular cloud backups.</p>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </motion.div>
        </div>

        {/* 2. Secondary Projects Section Grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {secondaryProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl glass-panel gradient-border-card p-6 md:p-8 hover:border-brand-violet/40 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-brand-violet/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div>
                {/* Folder icon & Top bar details */}
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-brand-accent group-hover:bg-brand-mid/30 transition-all duration-300">
                    <FolderGit className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wider group-hover:text-brand-accent transition-colors">
                    AppWhiz CodeLab
                  </span>
                </div>

                <h4 className="mt-5 font-serif text-xl font-bold text-white group-hover:text-brand-accent transition-colors">
                  {project.name}
                </h4>

                <p className="mt-3 font-sans text-xs sm:text-sm text-slate-400 leading-relaxed min-h-[66px]">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.tags.map(tag => (
                    <span
                      key={tag}
                      className="rounded bg-white/5 border border-white-5 px-2 py-0.5 font-mono text-[9px] text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action row at bottom */}
              <div className="mt-8 pt-4 border-t border-white/5">
                <button
                  id={`project-learn-${project.id}`}
                  onClick={() => onProjectClick(project)}
                  className="flex items-center gap-1.5 font-mono text-[10px] font-bold tracking-wider uppercase text-slate-400 transition-colors group-hover:text-brand-accent hover:underline cursor-pointer"
                >
                  Explore Showcase
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
