import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowRight } from "lucide-react";
import logoImg from "../../assets/logo.png";

interface HeaderProps {
  onLetsTalkClick: () => void;
  activeSection: string;
}

export default function Header({ onLetsTalkClick, activeSection }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "About Us", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Careers", href: "#careers" },
    { name: "Team", href: "#team" },
    { name: "Contact Us", href: "#contact" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // When scrolled: blur unless hovering
  const isBlurred = isScrolled && !isHovered;

  return (
    <header
      id="main-header"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-400 ease-in-out ${
        isScrolled
          ? "border-b border-slate-200/30 shadow-sm shadow-slate-900/[0.04]"
          : " border-transparent"
      } ${
        isBlurred
          ? "bg-white/20 backdrop-blur-xl"
          : "bg-white/95 backdrop-blur-sm"
      } py-0`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            isScrolled ? "h-14" : "h-16"
          }`}
        >
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, "#home")}
            className="group flex items-center gap-2.5 shrink-0"
          >
            <img
              src={logoImg}
              alt="AppWhiz Logo"
              className={`w-auto object-contain transition-all duration-300 group-hover:scale-[1.03] ${
                isScrolled ? "h-8" : "h-13"
              }`}
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-0.5 lg:gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`relative px-3.5 py-2 rounded-md font-sans text-[12.5px] lg:text-[13px] font-medium tracking-[0.01em] transition-all duration-200 ${
                    isActive
                      ? "text-slate-900"
                      : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  {link.name}

                  {/* Active underline */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavigationUnderline"
                      className="absolute bottom-1 left-3.5 right-3.5 h-[1.5px] rounded-full bg-gradient-to-r from-brand-accent to-brand-violet"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            {/* Subtle divider */}
            <div className="h-5 w-px bg-slate-200" />

            <button
              id="header-talk-btn"
              onClick={onLetsTalkClick}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-slate-900 px-5 py-2.5 font-sans text-[12.5px] font-semibold text-white cursor-pointer transition-all duration-200 hover:bg-slate-800 hover:shadow-md hover:shadow-slate-900/20 active:scale-[0.97]"
            >
              {/* Gradient shimmer overlay */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-brand-mid/20 via-brand-violet/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
              <span className="relative z-10 flex items-center gap-1.5">
                Let's Talk
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden">
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="md:hidden border-t border-slate-100 bg-white/98 backdrop-blur-xl"
          >
            <div className="space-y-0.5 px-4 pt-2 pb-6">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`flex items-center justify-between rounded-lg px-4 py-2.5 font-sans text-[13px] font-medium transition-colors ${
                      isActive
                        ? "bg-slate-50 text-slate-900"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
                    )}
                  </a>
                );
              })}

              <div className="pt-3 px-1">
                <button
                  id="mobile-drawer-talk-btn"
                  onClick={() => {
                    setIsOpen(false);
                    onLetsTalkClick();
                  }}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 font-sans text-[13px] font-semibold text-white cursor-pointer hover:bg-slate-800 active:scale-[0.98] transition-all"
                >
                  Let's Talk
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}