import React from "react";
import { motion } from "motion/react";
import { Terminal, Zap, Megaphone, Palette, Mail, ChevronRight } from "lucide-react";
import dananjayaImg from "../../assets/dananjaya.jpeg";
import janadaImg from "../../assets/janada.jpeg";
import thusalImg from "../../assets/thusal.jpeg";
import thurunuImg from "../../assets/thurunu.jpeg";

interface TeamMember {
  name: string;
  role: string;
  nickname: string;
  emoji: string;
  bio: string;
  gradient: string;
  icon: React.ReactNode;
  initials: string;
  badges: string[];
  image: string;
}

export default function Team() {
  const team: TeamMember[] = [
    {
      name: "Dananjaya",
      role: "CEO & Founder",
      nickname: "The Tech Wizard",
      emoji: "🤖",
      bio: "Need a mobile app? He'll build it. Need a robot? He'll build that too. Need a cinematic promo video for the robot and mobile app? Somehow, that's already rendering in the background. Dananjaya is our CEO, Founder, and unofficial supplier of impossible ideas. With expertise in mobile development, IoT, electronics, robotics, and video editing, he's living proof that 24 hours a day is apparently just a suggestion.",
      gradient: "from-cyan-500 via-blue-600 to-indigo-600",
      icon: <Terminal className="h-6 w-6 text-cyan-400" />,
      initials: "D",
      badges: ["Mobile Dev", "IoT & Robotics", "Video Editing", "CEO"],
      image: dananjayaImg,
    },
    {
      name: "Janada",
      role: "Co-Founder",
      nickname: "The Speedrunner",
      emoji: "🏃‍♂️",
      bio: "Nobody knows why Janada walks so fast. Some say he's optimizing his travel time. Others believe he's late for a meeting scheduled three weeks from now. As a gym enthusiast and backend engineer, he's an all-in-one package of strength, speed, and technical expertise. Whether it's designing scalable systems or speed-walking across campus at Mach 2, Janada approaches everything with maximum efficiency.",
      gradient: "from-violet-500 via-purple-600 to-fuchsia-600",
      icon: <Zap className="h-6 w-6 text-violet-400" />,
      initials: "J",
      badges: ["Backend Sys", "Scalable SQL", "Gym Lover", "Co-Founder"],
      image: janadaImg,
    },
    {
      name: "Thusal",
      role: "Co-Founder",
      nickname: "The Human Loudspeaker",
      emoji: "📢",
      bio: "If intelligence could be measured in gigabytes, Thusal would need cloud storage. Widely recognized as the highest brain in the university and one of the fastest people to become a Software Engineer, he's the team's academic powerhouse. The only thing larger than his knowledge is his voice. You don't need notifications when Thusal is around—his natural volume settings ensure everyone stays informed.",
      gradient: "from-amber-400 via-orange-500 to-rose-500",
      icon: <Megaphone className="h-6 w-6 text-amber-400" />,
      initials: "T",
      badges: ["Cloud Storage", "Logic Architect", "High-Volume CAO", "Co-Founder"],
      image: thusalImg,
    },
    {
      name: "Thurunu",
      role: "Co-Founder",
      nickname: "The Pixel Federer",
      emoji: "🎾",
      bio: "While others write code, Thurunu crafts experiences. As our frontend developer and UI designer, he transforms complex systems into beautiful interfaces that users actually enjoy. Off the keyboard, he's a part-time tennis player, constantly debating whether fixing CSS bugs or returning a serve is the greater challenge. Current score: CSS bugs are winning.",
      gradient: "from-emerald-400 via-teal-500 to-brand-accent",
      icon: <Palette className="h-6 w-6 text-emerald-400" />,
      initials: "T",
      badges: ["UI/UX Sprints", "Tailwind Master", "Tennis Player", "Co-Founder"],
      image: thurunuImg,
    },
  ];

  return (
    <section
      id="team"
      className="relative overflow-hidden bg-brand-deep py-24 border-b border-white/5"
    >
      {/* Absolute ambient backgrounds */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_bottom_left,rgba(56,189,248,0.06),transparent_50%)]" />
      <div className="absolute top-1/4 right-0 h-96 w-96 rounded-full bg-brand-violet/5 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Module Header */}
        <div className="text-center md:text-left mb-16 md:mb-20 max-w-3xl">
          
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
            Meet the <span className="text-gradient">AppWhiz Dream Team</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-slate-400 leading-relaxed font-light">
            We are a group of specialized engineers, system architects, and creative designers driven by impossible ideas, relentless speed, academic powerhouse logical reasoning, and aesthetic UI execution.
          </p>
        </div>

        {/* Members Cards Bento / Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative rounded-3xl border border-white/10 bg-white/[0.01] p-6 sm:p-8 hover:border-white/20 hover:bg-white/[0.03] transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-2xl"
            >
              {/* Backlit glow for each card corresponding to their brand color gradient */}
              <div className={`absolute top-0 right-0 h-40 w-40 rounded-full bg-gradient-to-tr ${member.gradient} opacity-[0.03] group-hover:opacity-[0.08] blur-[40px] transition-all duration-500`} />
              
              <div className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                
                {/* Team Member Photo */}
                <div className="shrink-0 relative self-center md:self-start">
                  <div className={`h-40 w-40 rounded-2xl bg-gradient-to-br ${member.gradient} p-[1px] shadow-lg shadow-black/40`}>
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="h-full w-full rounded-2xl object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Team Info Block */}
                <div className="flex-grow space-y-3">
                  <div className="text-center md:text-left">
                    <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-2 justify-center md:justify-start">
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                        {member.name}
                      </h3>
                      <span className="font-mono text-xs text-brand-accent tracking-normal font-medium">
                        "{member.nickname}"
                      </span>
                    </div>
                    <p className="font-sans text-xs text-slate-400 font-medium mt-1">
                      {member.role}
                    </p>
                  </div>

                  <p className="font-sans text-xs sm:text-[13px] text-slate-300 leading-relaxed font-light text-center md:text-left pt-1 mb-2">
                    {member.bio}
                  </p>

                  {/* Skills Mini-Badges */}
                  
                </div>

              </div>

              

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
