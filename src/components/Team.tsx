import React from "react";
import { motion } from "motion/react";
import { Terminal, Zap, Megaphone, Palette } from "lucide-react";
import dananjayaImg from "../../assets/dananjaya.png";
import janadaImg from "../../assets/janada.png";
import thusalImg from "../../assets/thusal.png";
import thurunuImg from "../../assets/thurunu.png";

interface TeamMember {
  name: string;
  role: string;
  gradient: string;
  icon: React.ReactNode;
  badges: string[];
  image: string;
}

export default function Team() {
  const team: TeamMember[] = [
    {
      name: "Dananjaya",
      role: "Co-Founder",
      gradient: "from-cyan-500 to-indigo-600",
      icon: <Terminal className="h-3.5 w-3.5" />,
      badges: ["Mobile Dev", "IoT & Robotics"],
      image: dananjayaImg,
    },
    {
      name: "Janada",
      role: "Co-Founder",
      gradient: "from-cyan-500 to-indigo-600",
      icon: <Zap className="h-3.5 w-3.5" />,
      badges: ["Backend Sys", "Scalable SQL"],
      image: janadaImg,
    },
    {
      name: "Thusal",
      role: "Co-Founder",
      gradient: "from-cyan-500 to-indigo-600",
      icon: <Megaphone className="h-3.5 w-3.5" />,
      badges: ["Cloud Storage", "Logic Systems"],
      image: thusalImg,
    },
    {
      name: "Thurunu",
      role: "Co-Founder",
      gradient: "from-cyan-500 to-indigo-600",
      icon: <Palette className="h-3.5 w-3.5" />,
      badges: ["UI/UX Sprints", "Tailwind Master"],
      image: thurunuImg,
    },
  ];

  return (
    <section
      id="team"
      className="relative overflow-hidden bg-brand-deep py-24 lg:py-32 border-b border-white/5"
    >
      {/* Structural Ambient Underlays */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.005),transparent_60%)]" />
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 h-64 w-full max-w-7xl rounded-full bg-brand-accent/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Module Header */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="font-mono text-xs font-semibold tracking-widest uppercase text-brand-accent"
          >
            Leadership
          </motion.h2>
          <motion.p
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white"
                    >
                      Meet the <span className="text-gradient">AppWhiz Dream Team</span>
                    </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto mt-4 h-0.5 w-16 bg-gradient-to-r from-brand-accent to-brand-violet origin-center"
          />
        </div>

        {/* Professional Enterprise Row Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group flex flex-col rounded-2xl border border-white/[0.04] bg-white/[0.01] p-4 transition-all duration-400 hover:border-white/[0.1] hover:bg-white/[0.02] hover:shadow-[0_20px_40px_rgba(2,3,26,0.5)]"
            >
              {/* Image Framer */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-white/[0.02]">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover object-top grayscale contrast-[1.05] transition-all duration-500 group-hover:scale-103 group-hover:grayscale-0 group-hover:contrast-100"
                  style={{ willChange: "filter, transform" }}
                />
                
                {/* Micro Ambient Backlit Rim Fill */}
                <div className={`absolute inset-0 bg-gradient-to-t from-brand-deep via-transparent to-transparent opacity-80 pointer-events-none`} />
                <div className={`absolute inset-0 bg-gradient-to-tr ${member.gradient} mix-blend-color opacity-0 transition-opacity duration-500 group-hover:opacity-10 pointer-events-none`} />
              </div>

              {/* Profile Details Container */}
              <div className="mt-5 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-white transition-colors duration-300 group-hover:text-brand-accent">
                      {member.name}
                    </h3>
                    <p className="font-sans text-xs font-medium text-slate-400 mt-0.5">
                      {member.role}
                    </p>
                  </div>
                  
                  {/* Subtle Technical Domain Icon Indicator */}
                  <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-md bg-white/[0.03] border border-white/5 text-slate-500 transition-all duration-400 group-hover:text-white group-hover:border-white/10 group-hover:bg-white/[0.06]">
                    {member.icon}
                  </div>
                </div>

                {/* Technical Segment Tags */}
                {/* <div className="mt-4 flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.03]">
                  {member.badges.map((badge) => (
                    <span 
                      key={badge} 
                      className="font-mono text-[9px] tracking-wide font-medium bg-white/[0.03] text-slate-400 px-2 py-0.5 rounded border border-white/[0.02]"
                    >
                      {badge}
                    </span>
                  ))}
                </div> */}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}