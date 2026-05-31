import React from "react";
import { motion } from "motion/react";
import { Terminal, Zap, Megaphone, Palette } from "lucide-react";
import dananjayaImg from "../../assets/dananjaya.jpeg";
import janadaImg from "../../assets/janada.jpeg";
import thusalImg from "../../assets/thusal.jpeg";
import thurunuImg from "../../assets/thurunu.jpeg";

interface TeamMember {
  name: string;
  role: string;
  nickname: string;
  bio: string;
  gradient: string;
  gradientFrom: string;
  icon: React.ReactNode;
  badges: string[];
  image: string;
}

export default function Team() {
  const team: TeamMember[] = [
    {
      name: "Dananjaya",
      role: "CEO & Founder",
      nickname: "The Tech Wizard",
      bio: "Need a mobile app? He'll build it. Need a robot? He'll build that too. Need a cinematic promo video for the robot and mobile app? Somehow, that's already rendering in the background. Dananjaya is our CEO, Founder, and unofficial supplier of impossible ideas. With expertise in mobile development, IoT, electronics, robotics, and video editing, he's living proof that 24 hours a day is apparently just a suggestion.",
      gradient: "from-cyan-500 via-blue-600 to-indigo-600",
      gradientFrom: "cyan",
      icon: <Terminal className="h-5 w-5" />,
      badges: ["Mobile Dev", "IoT & Robotics", "Video Editing", "CEO"],
      image: dananjayaImg,
    },
    {
      name: "Janada",
      role: "Co-Founder",
      nickname: "The Speedrunner",
      bio: "Nobody knows why Janada walks so fast. Some say he's optimizing his travel time. Others believe he's late for a meeting scheduled three weeks from now. As a gym enthusiast and backend engineer, he's an all-in-one package of strength, speed, and technical expertise. Whether it's designing scalable systems or speed-walking across campus at Mach 2, Janada approaches everything with maximum efficiency.",
      gradient: "from-violet-500 via-purple-600 to-fuchsia-600",
      gradientFrom: "violet",
      icon: <Zap className="h-5 w-5" />,
      badges: ["Backend Sys", "Scalable SQL", "Gym Lover", "Co-Founder"],
      image: janadaImg,
    },
    {
      name: "Thusal",
      role: "Co-Founder",
      nickname: "The Human Loudspeaker",
      bio: "If intelligence could be measured in gigabytes, Thusal would need cloud storage. Widely recognized as the highest brain in the university and one of the fastest people to become a Software Engineer, he's the team's academic powerhouse. The only thing larger than his knowledge is his voice. You don't need notifications when Thusal is around—his natural volume settings ensure everyone stays informed.",
      gradient: "from-amber-400 via-orange-500 to-rose-500",
      gradientFrom: "amber",
      icon: <Megaphone className="h-5 w-5" />,
      badges: ["Cloud Storage", "Logic Architect", "High-Volume CAO", "Co-Founder"],
      image: thusalImg,
    },
    {
      name: "Thurunu",
      role: "Co-Founder",
      nickname: "The Pixel Federer",
      bio: "While others write code, Thurunu crafts experiences. As our frontend developer and UI designer, he transforms complex systems into beautiful interfaces that users actually enjoy. Off the keyboard, he's a part-time tennis player, constantly debating whether fixing CSS bugs or returning a serve is the greater challenge. Current score: CSS bugs are winning.",
      gradient: "from-emerald-400 via-teal-500 to-brand-accent",
      gradientFrom: "emerald",
      icon: <Palette className="h-5 w-5" />,
      badges: ["UI/UX Sprints", "Tailwind Master", "Tennis Player", "Co-Founder"],
      image: thurunuImg,
    },
  ];

  return (
    <section
      id="team"
      className="relative overflow-hidden bg-brand-deep py-24 lg:py-32 border-b border-white/5"
    >
      {/* Absolute ambient backgrounds */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_bottom_left,rgba(56,189,248,0.05),transparent_50%)]" />
      <div className="absolute top-1/4 right-0 h-[500px] w-[500px] rounded-full bg-brand-violet/5 blur-[150px]" />
      <div className="absolute bottom-1/4 left-0 h-[400px] w-[400px] rounded-full bg-brand-accent/5 blur-[130px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Module Header */}
        <div className="text-center mb-16 lg:mb-24 max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-mono text-xs font-semibold tracking-widest uppercase text-brand-accent"
          >
            Our People
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
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-brand-accent to-brand-violet origin-center"
          />
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-6 font-sans text-sm sm:text-base text-slate-400 leading-relaxed font-light"
          >
            We are a group of specialized engineers, system architects, and creative designers driven by impossible ideas, relentless speed, academic powerhouse logical reasoning, and aesthetic UI execution.
          </motion.p>
        </div>

        {/* Members — 4 rows × 1 column, alternating image/text sides */}
        <div className="flex flex-col gap-10 lg:gap-14">
          {team.map((member, index) => {
            const isEven = index % 2 === 0; // Image left for even, image right for odd

            return (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="group relative rounded-3xl border border-white/[0.06] bg-white/[0.01] hover:border-white/[0.12] hover:bg-white/[0.02] transition-all duration-500 overflow-hidden shadow-2xl"
              >
                {/* Backlit glow */}
                <div className={`absolute top-0 ${isEven ? 'left-0' : 'right-0'} h-full w-1/2 bg-gradient-to-br ${member.gradient} opacity-[0.02] group-hover:opacity-[0.05] blur-[40px] transition-all duration-700 pointer-events-none`} />

                <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} min-h-[320px] lg:min-h-[380px]`}>
                  
                  {/* Image column — full height with angled edge */}
                  <div className={`relative w-full lg:w-[32%] xl:w-[28%] shrink-0 overflow-hidden ${isEven ? "clip-team-even" : "clip-team-odd"}`}>
                    {/* The image */}
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full min-h-[280px] lg:min-h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-102"
                      style={{ willChange: "filter, transform" }}
                    />

                    {/* Gradient overlay on image */}
                    <div className={`absolute inset-0 bg-gradient-to-${isEven ? 'r' : 'l'} from-transparent via-transparent to-brand-deep/80 pointer-events-none`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/60 via-transparent to-transparent pointer-events-none lg:hidden" />
                  </div>

                  {/* Text content column */}
                  <div className={`flex-1 flex flex-col justify-center p-6 sm:p-8 lg:p-10 xl:p-14 ${isEven ? 'lg:pl-12 xl:pl-16' : 'lg:pr-12 xl:pr-16'}`}>
                    
                    {/* Role badge */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${member.gradient} text-white`}>
                        {member.icon}
                      </div>
                      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-slate-500 font-medium">
                        {member.role}
                      </span>
                    </div>

                    {/* Name & Nickname */}
                    <div className="mb-4">
                      <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white group-hover:text-gradient transition-colors duration-300">
                        {member.name}
                      </h3>
                      <span className="font-mono text-xs text-brand-accent tracking-normal font-medium mt-1 inline-block">
                        "{member.nickname}"
                      </span>
                    </div>

                    {/* Bio */}
                    <p className="font-sans text-[13px] sm:text-sm text-slate-300/90 leading-relaxed font-light mb-6 max-w-2xl">
                      {member.bio}
                    </p>

                    {/* Skills Mini-Badges */}
                    <div className="flex flex-wrap gap-2">
                      {member.badges.map(badge => (
                        <span
                          key={badge}
                          className="rounded-lg bg-white/[0.04] border border-white/[0.08] px-3 py-1.5 font-mono text-[10px] text-slate-400 tracking-wide group-hover:border-white/15 group-hover:text-slate-300 transition-all duration-300"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>

                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
