import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowRight, Layers } from "lucide-react";

interface HeaderProps {
  onLetsTalkClick: () => void;
  activeSection: string;
}

export default function Header({ onLetsTalkClick, activeSection }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
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

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "border-b border-white/10 bg-brand-deep/80 py-3 shadow-[0_10px_30px_rgba(4,7,50,0.5)] backdrop-blur-md"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`relative px-3.5 py-2 font-sans text-xs lg:text-[13px] font-medium transition-all ${
                    isActive ? "text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavigationUnderline"
                      className="absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-gradient-to-r from-brand-accent to-brand-violet"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Let's Talk CTA button */}
          <div className="hidden md:flex items-center">
            <button
              id="header-talk-btn"
              onClick={onLetsTalkClick}
              className="relative inline-flex items-center gap-2 overflow-hidden rounded-full px-5 py-2.5 font-sans text-[13px] font-semibold text-white transition-all cursor-pointer shadow-[0_0_20px_rgba(56,189,248,0.15)] group hover:shadow-[0_0_30px_rgba(96,165,250,0.3)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-brand-mid via-brand-navy to-brand-violet transition-transform duration-300 group-hover:scale-105" />
              <span className="relative z-10 flex items-center gap-1.5">
                Let's Talk
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </button>
          </div>

          {/* Mobile hamburger menu button */}
          <div className="md:hidden">
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-lg p-2 text-slate-300 hover:bg-white/5 hover:text-white transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden border-t border-white/10 bg-brand-deep/95 backdrop-blur-xl"
          >
            <div className="space-y-1.5 px-4 pt-3 pb-6">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`block rounded-lg px-4 py-3 font-sans text-sm font-medium transition-colors ${
                      isActive 
                        ? "bg-brand-mid/50 text-white border-l-2 border-brand-accent pl-3.5" 
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
              
              {/* Talk button inside mobile menu */}
              <div className="pt-4 px-4">
                <button
                  id="mobile-drawer-talk-btn"
                  onClick={() => {
                    setIsOpen(false);
                    onLetsTalkClick();
                  }}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-mid to-brand-violet py-3 font-sans text-sm font-medium text-white shadow-lg cursor-pointer hover:opacity-90 active:scale-95 transition-transform"
                >
                  Let's Talk
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
