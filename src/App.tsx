import React, { useState, useEffect } from "react";
import { Calendar as LucideCalendar, Clock, Check, ArrowRight } from "lucide-react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import LogoBar from "./components/LogoBar";
import Services from "./components/Services";
import Process from "./components/Process";
import About from "./components/About";
import Projects from "./components/Projects";
import Careers from "./components/Careers";
import Team from "./components/Team";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import { ServiceItem, ProjectItem } from "./types";

export default function App() {
  // Navigation active state
  const [activeSection, setActiveSection] = useState("home");

  // Modal active states
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [bookingApplicant, setBookingApplicant] = useState({ name: "", email: "" });

  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Time slot options
  const timeSlots = ["09:00 AM", "11:30 AM", "01:30 PM", "03:45 PM", "05:00 PM"];

  // Weekday items for interactive scheduler (Next 5 weekdays starting from current date 2026-05-30 which is Saturday)
  const weekdays = [
    { label: "Mon", date: "June 01", full: "Monday, June 01, 2026" },
    { label: "Tue", date: "June 02", full: "Tuesday, June 02, 2026" },
    { label: "Wed", date: "June 03", full: "Wednesday, June 03, 2026" },
    { label: "Thu", date: "June 04", full: "Thursday, June 04, 2026" },
    { label: "Fri", date: "June 05", full: "Friday, June 05, 2026" },
  ];

  // Auto-scroll section tracking
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "services", "process", "about", "projects", "careers", "team", "contact"];
      const scrollPosition = window.scrollY + 200; // Offset for header

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // CTA triggers
  const handleLetsTalkClick = () => {
    // Open discovery book right away!
    setIsBookingOpen(true);
  };

  const handleGetStartedClick = () => {
    setIsBookingOpen(true);
  };

  const handleViewProjectsClick = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  // Booking submit triggers
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTimeSlot || !bookingApplicant.name.trim() || !bookingApplicant.email.trim()) {
      alert("Please complete all sections of the discovery calendar card.");
      return;
    }
    setBookingSuccess(true);
  };

  const handleBookingClose = () => {
    setIsBookingOpen(false);
    // Delay slightly to prevent jarring flashes on dialog exit states
    setTimeout(() => {
      setBookingSuccess(false);
      setSelectedDate("");
      setSelectedTimeSlot("");
      setBookingApplicant({ name: "", email: "" });
    }, 300);
  };

  return (
    <div id="landing-root" className="relative min-h-screen bg-brand-deep text-slate-200">
      
      {/* Dynamic ambient header and content */}
      <Header onLetsTalkClick={handleLetsTalkClick} activeSection={activeSection} />
      
      <Hero
        onGetStartedClick={handleGetStartedClick}
        onViewProjectsClick={handleViewProjectsClick}
      />

      <LogoBar />
      
      <Services onServiceLearnMore={(service) => setSelectedService(service)} />
      
      <Process />
      
      <About />
      
      <Projects onProjectClick={(proj) => setSelectedProject(proj)} />
      
      <Careers />
      
      <Team />
      
      <Contact onBookCallClick={() => setIsBookingOpen(true)} />
      
      <Footer />

      {/* ----------------- INTERACTIVE DIALOGS / POPUPS ----------------- */}

      {/* 1. DISCOVERY APPOINTMENT BOOKING MODAL */}
      <Modal
        isOpen={isBookingOpen}
        onClose={handleBookingClose}
        title={bookingSuccess ? "Appointment Secured" : "Schedule a 15-Min Discovery Call"}
      >
        {!bookingSuccess ? (
          <form id="discovery-booker-form" onSubmit={handleBookingSubmit} className="space-y-5">
            <p className="font-sans text-xs text-slate-400">
              Select one of our upcoming team slots. We'll map the technical blueprints for your venture completely free of charge.
            </p>

            {/* Steps 1: Pick Date */}
            <div>
              <span className="block font-mono text-[9px] text-slate-500 uppercase tracking-widest mb-2">
                1. Select Working Date:
              </span>
              <div className="grid grid-cols-5 gap-2">
                {weekdays.map(day => (
                  <button
                    key={day.label}
                    type="button"
                    onClick={() => setSelectedDate(day.full)}
                    className={`rounded-lg py-2.5 px-1 text-center font-sans tracking-tight transition-all cursor-pointer ${
                      selectedDate === day.full
                        ? "bg-brand-accent text-brand-deep font-semibold"
                        : "bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10"
                    }`}
                  >
                    <div className="text-[10px] uppercase font-mono">{day.label}</div>
                    <div className="text-xs mt-0.5 whitespace-nowrap font-semibold">{day.date}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Steps 2: Pick Time slot */}
            <div>
              <span className="block font-mono text-[9px] text-slate-500 uppercase tracking-widest mb-2">
                2. Select Available Slot (GMT+5:30):
              </span>
              <div className="flex flex-wrap gap-2">
                {timeSlots.map(time => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTimeSlot(time)}
                    className={`rounded-full px-3 py-1.5 font-sans text-xs transition-colors cursor-pointer ${
                      selectedTimeSlot === time
                        ? "bg-brand-violet text-white font-semibold"
                        : "bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Steps 3: Candidate name block */}
            <div className="space-y-3 pt-2 border-t border-white/5">
              <span className="block font-mono text-[9px] text-slate-500 uppercase tracking-widest">
                3. Your Personal Details:
              </span>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={bookingApplicant.name}
                  onChange={e => setBookingApplicant({ ...bookingApplicant, name: e.target.value })}
                  className="w-full rounded bg-white/5 border border-white/10 px-3 py-2 font-sans text-xs text-white focus:outline-none focus:border-brand-accent"
                />
                <input
                  type="email"
                  required
                  placeholder="Business Email"
                  value={bookingApplicant.email}
                  onChange={e => setBookingApplicant({ ...bookingApplicant, email: e.target.value })}
                  className="w-full rounded bg-white/5 border border-white/10 px-3 py-2 font-sans text-xs text-white focus:outline-none focus:border-brand-accent"
                />
              </div>
            </div>

            {/* Submit scheduler */}
            <div className="pt-2">
              <button
                id="confirm-appointment-btn"
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-accent to-brand-violet py-3.5 font-mono text-[10px] font-bold uppercase tracking-wider text-white hover:brightness-110 active:scale-95 transition-all cursor-pointer"
              >
                Confirm Appointment Slot
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        ) : (
          <div id="booking-success-indicator" className="py-8 text-center space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
              <Check className="h-8 w-8 animate-pulse" />
            </div>
            
            <h4 className="font-serif text-xl font-bold text-white">
              Calendar Slot Confirmed!
            </h4>
            
            <p className="font-sans text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
              Outstanding! We have allocated a 15-minute slot for <strong>{bookingApplicant.name}</strong> on <span className="text-brand-accent font-semibold">{selectedDate}</span> starting at <span className="text-brand-violet font-semibold">{selectedTimeSlot}</span>.
            </p>

            <p className="font-sans text-[11px] text-slate-500 max-w-xs mx-auto">
              A calendars secure video coordinate link was compiled and emailed to <strong>{bookingApplicant.email}</strong>. See you soon!
            </p>

            <div className="pt-4">
              <button
                id="close-success-booking-btn"
                onClick={handleBookingClose}
                className="rounded-xl border border-white/15 bg-white/5 px-6 py-2 font-mono text-xs font-bold uppercase tracking-wider text-slate-200 hover:bg-white/10"
              >
                Dismiss Window
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* 2. SERVICES CAPABILITIES SCOPE DRILLDOWN MODAL */}
      <Modal
        isOpen={selectedService !== null}
        onClose={() => setSelectedService(null)}
        title={selectedService?.title || ""}
      >
        {selectedService && (
          <div id="service-drilldown-content" className="space-y-5">
            <p className="font-sans text-xs text-slate-300 leading-relaxed">
              Explore the strict compliance standards, system structures, and design sprints we utilize under our professional <strong>{selectedService.title}</strong> division:
            </p>

            {/* Simulated Architecture Highlights */}
            <div className="rounded-xl bg-white/[0.02] border border-white/5 p-4 space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-brand-accent/10 font-mono text-[10px] font-bold text-brand-accent mt-0.5">01</div>
                <div>
                  <h5 className="font-semibold text-xs text-white">Technical Architecture Mapping</h5>
                  <p className="font-sans text-[11px] text-slate-400 mt-1 leading-relaxed">We trace back every project specification to modular, highly reusable structures supporting clean interfaces and robust type safety features.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-brand-violet/20 font-mono text-[10px] font-bold text-brand-violet mt-0.5">02</div>
                <div>
                  <h5 className="font-semibold text-xs text-white">Advanced Testing Routines</h5>
                  <p className="font-sans text-[11px] text-slate-400 mt-1 leading-relaxed">Strict schema validations, edge scenarios testing, automated builds, and comprehensive QA metrics prevent downstream failures.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-brand-accent/10 font-mono text-[10px] font-bold text-brand-accent mt-0.5">03</div>
                <div>
                  <h5 className="font-semibold text-xs text-white">Continuous Deployment Setup</h5>
                  <p className="font-sans text-[11px] text-slate-400 mt-1 leading-relaxed">Automatic lint runs, bundled server compilation, performance tracing, and rapid container routing are standard.</p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-between gap-3 border-t border-white/5">
              <a
                href="#contact"
                onClick={() => {
                  setSelectedService(null);
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex-grow inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-mid to-brand-violet py-2.5 font-sans text-xs font-semibold text-white hover:brightness-110"
              >
                Inquire For This Service
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
              <button
                id="close-service-scope-btn"
                onClick={() => setSelectedService(null)}
                className="rounded-xl border border-white/10 px-4 py-2.5 font-sans text-xs text-slate-400 hover:text-white"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* 3. CURATED PORTFOLIO CASES MODAL */}
      <Modal
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.name || ""}
      >
        {selectedProject && (
          <div id="project-case-content" className="space-y-4">
            <span className="inline-flex items-center gap-1 rounded bg-brand-accent/10 px-1.5 py-0.5 font-mono text-[8px] font-bold uppercase text-brand-accent">
              Platform Profile
            </span>

            <p className="font-sans text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
              {selectedProject.description}
            </p>

            {/* Case Study Details Table block */}
            <div className="rounded-xl bg-white/[0.02] border border-white/5 p-4 space-y-3 font-sans text-xs text-slate-400">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Integrated Tech:</span>
                <span className="font-mono text-[10px] text-white font-semibold">
                  {selectedProject.tags.join(" • ")}
                </span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Production Environment:</span>
                <span className="text-white font-medium">Cloud Run Containerized</span>
              </div>
              <div className="flex justify-between">
                <span>Engineering Lead-Time:</span>
                <span className="text-brand-accent font-semibold">4 Weeks Delivery Sprint</span>
              </div>
            </div>

            <p className="font-sans text-xs text-slate-400 leading-relaxed">
              Interested in launching a similar digital platform or migrating your existing spreadsheets / legacy tools into containerized high-SLA software architectures?
            </p>

            <div className="pt-3 border-t border-white/5 flex gap-3">
              <a
                href="#contact"
                onClick={() => {
                  setSelectedProject(null);
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex-grow inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-brand-accent to-blue-600 py-3 font-sans text-xs font-semibold text-white hover:brightness-110"
              >
                Discuss Similar Architecture
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
              <button
                id="close-project-study-btn"
                onClick={() => setSelectedProject(null)}
                className="rounded-xl border border-white/10 px-4 py-3 font-sans text-xs text-slate-400 hover:text-white"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
}
