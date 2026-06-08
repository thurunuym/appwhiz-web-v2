import React from "react";
import { Linkedin, Facebook, Instagram, Github } from "lucide-react";
import logoFooterImg from "../../assets/logo_footer.png";

export default function Footer() {
  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "About Us", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Careers", href: "#careers" },
    { name: "Contact Us", href: "#contact" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer id="main-footer" className="relative bg-[#02031a]">
      {/* Visual top border gradient line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-brand-accent/20 via-brand-violet/60 to-brand-accent/20" />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-12 lg:gap-12">
          
          {/* Column 1: Logo & Motto info block */}
          <div className="md:col-span-2 lg:col-span-5 flex flex-col items-start space-y-4">
            <a href="#home" onClick={(e) => handleLinkClick(e, "#home")} className="group block">
              <img
                src={logoFooterImg}
                alt="AppWhiz Logo"
                className="h-26 w-auto object-contain transition-transform duration-300 group-hover:scale-102"
              />
            </a>
            <p className="font-sans text-xs text-slate-400 leading-relaxed max-w-md text-justify">
              We specialize in custom web architectures, cross-platform mobile apps, secure databases, scalable microservices, and physical IoT endpoints. Designed and engineered for maximum digital leverage.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-3 space-y-4">
            <h5 className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-white/5 pb-2">
              Sitemap Navigation
            </h5>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="font-sans text-[13px] text-slate-400 hover:text-brand-accent transition-colors block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Channels overview */}
          <div className="lg:col-span-4 space-y-4">
            <h5 className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-white/5 pb-2">
              Headquarters Channel
            </h5>
            <p className="font-sans text-xs text-slate-400">
              Drop by or start a project consult over our high-priority support queues.
            </p>
            <div className="space-y-1.5 font-sans text-xs text-slate-300">
              <div className="flex justify-between gap-4">
                <span className="text-slate-500">Email:</span>
                <a href="mailto:appwhizsolutions.official@gmail.com" className="hover:text-brand-accent transition-colors font-medium truncate">
                  appwhizsolutions.official@gmail.com
                </a>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-slate-500">Phone:</span>
                <a href="tel:+94716435472" className="hover:text-brand-accent transition-colors font-medium whitespace-nowrap">
                  +94 71 643 5472
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Social Media and Copyright row bar */}
        <div className="mt-12 border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Social Icons row */}
          <div className="flex items-center gap-4">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/appwhiz-solutions/"
              target="_blank"
              rel="noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:bg-brand-accent hover:text-brand-deep hover:border-brand-accent hover:brightness-110 active:scale-95 transition-all"
              aria-label="AppWhiz LinkedIn link"
            >
              <Linkedin className="h-4 w-4" />
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/share/14irWeZVyeb/"
              target="_blank"
              rel="noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:bg-brand-accent hover:text-brand-deep hover:border-brand-accent hover:brightness-110 active:scale-95 transition-all"
              aria-label="AppWhiz Facebook link"
            >
              <Facebook className="h-4 w-4" />
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/appwhiz_solutions"
              target="_blank"
              rel="noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:bg-brand-accent hover:text-brand-deep hover:border-brand-accent hover:brightness-110 active:scale-95 transition-all"
              aria-label="AppWhiz Instagram link"
            >
              <Instagram className="h-4 w-4" />
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/AppWhiz-Solutions"
              target="_blank"
              rel="noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:bg-brand-accent hover:text-brand-deep hover:border-brand-accent hover:brightness-110 active:scale-95 transition-all"
              aria-label="AppWhiz GitHub link"
            >
              <Github className="h-4 w-4" />
            </a>
          </div>

          {/* Legal Stamp */}
          <div className="text-center sm:text-right">
            <p className="font-mono text-[10px] text-slate-500">
              © 2026 AppWhiz Solutions. All rights reserved.
            </p>
          </div>

        </div>

      </div>
    </footer>
  );
}