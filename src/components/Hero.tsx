import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import logoHeroImg from "../../assets/logo_hero.png";

interface HeroProps {
  onGetStartedClick: () => void;
  onViewProjectsClick: () => void;
}

/* ── Rotating 3D Globe built with pure canvas ── */
function TechGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const rotationRef = useRef({ x: -0.3, y: 0 });
  const dragRef = useRef({ dragging: false, lastX: 0, lastY: 0 });
  const velocityRef = useRef({ x: 0.003, y: 0 });
  const [size, setSize] = useState(400);
  const [logoImg, setLogoImg] = useState<HTMLImageElement | null>(null);

  // Load logo image
  useEffect(() => {
    const img = new Image();
    img.src = logoHeroImg;
    img.onload = () => {
      setLogoImg(img);
    };
  }, []);

  // Responsive sizing
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const w = containerRef.current.clientWidth;
        const h = containerRef.current.clientHeight;
        setSize(Math.min(w, h, 500));
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    dragRef.current = { dragging: true, lastX: e.clientX, lastY: e.clientY };
    velocityRef.current = { x: 0, y: 0 };
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragRef.current.dragging) return;
    const dx = e.clientX - dragRef.current.lastX;
    const dy = e.clientY - dragRef.current.lastY;
    rotationRef.current.y += dx * 0.005;
    rotationRef.current.x += dy * 0.005;
    rotationRef.current.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, rotationRef.current.x));
    velocityRef.current = { x: dx * 0.002, y: dy * 0.002 };
    dragRef.current.lastX = e.clientX;
    dragRef.current.lastY = e.clientY;
  }, []);

  const handlePointerUp = useCallback(() => {
    dragRef.current.dragging = false;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const R = size * 0.38;
    const cx = size / 2;
    const cy = size / 2;

    // Dot-grid points on the sphere
    const dots: { lat: number; lon: number; s: number }[] = [];
    for (let lat = -80; lat <= 80; lat += 8) {
      const rLat = (lat * Math.PI) / 180;
      const count = Math.round(Math.cos(rLat) * 44);
      for (let i = 0; i < count; i++) {
        const lon = (i / count) * 360 - 180;
        dots.push({ lat, lon: lon, s: 0.6 + Math.random() * 0.6 });
      }
    }

    // Connection arcs between random cities
    const arcs = [
      { from: { lat: 40, lon: -74 }, to: { lat: 51, lon: 0 } },
      { from: { lat: 35, lon: 139 }, to: { lat: -33, lon: 151 } },
      { from: { lat: 1, lon: 103 }, to: { lat: 48, lon: 2 } },
      { from: { lat: 28, lon: 77 }, to: { lat: 55, lon: 37 } },
      { from: { lat: -23, lon: -46 }, to: { lat: 40, lon: -3 } },
    ];

    function project(lat: number, lon: number): { x: number; y: number; z: number } {
      const phi = (lat * Math.PI) / 180;
      const theta = (lon * Math.PI) / 180;
      const rX = rotationRef.current.x;
      const rY = rotationRef.current.y;

      let x = R * Math.cos(phi) * Math.sin(theta);
      let y = R * Math.sin(phi);
      let z = R * Math.cos(phi) * Math.cos(theta);

      // Rotate around Y
      const x1 = x * Math.cos(rY) - z * Math.sin(rY);
      const z1 = x * Math.sin(rY) + z * Math.cos(rY);
      x = x1;
      z = z1;

      // Rotate around X
      const y1 = y * Math.cos(rX) - z * Math.sin(rX);
      const z2 = y * Math.sin(rX) + z * Math.cos(rX);
      y = y1;
      z = z2;

      return { x: cx + x, y: cy - y, z };
    }

    let time = 0;

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, size, size);
      time++;

      // Auto-rotate when not dragging
      if (!dragRef.current.dragging) {
        rotationRef.current.y += 0.004;
        // Dampen velocity
        velocityRef.current.x *= 0.95;
        velocityRef.current.y *= 0.95;
      }

      // Outer glow
      const glowGrad = ctx.createRadialGradient(cx, cy, R * 0.8, cx, cy, R * 1.4);
      glowGrad.addColorStop(0, "rgba(56, 189, 248, 0.06)");
      glowGrad.addColorStop(0.5, "rgba(139, 92, 246, 0.03)");
      glowGrad.addColorStop(1, "transparent");
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, size, size);

      // Globe sphere fill
      const sphereGrad = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.3, 0, cx, cy, R);
      sphereGrad.addColorStop(0, "rgba(11, 37, 110, 0.35)");
      sphereGrad.addColorStop(0.6, "rgba(4, 25, 97, 0.2)");
      sphereGrad.addColorStop(1, "rgba(4, 7, 50, 0.15)");
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = sphereGrad;
      ctx.fill();

      // Globe border ring
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(56, 189, 248, 0.15)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw back-facing latitude lines
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath();
        let started = false;
        for (let lon = -180; lon <= 180; lon += 3) {
          const p = project(lat, lon);
          if (p.z >= 0) { started = false; continue; }
          if (!started) { ctx.moveTo(p.x, p.y); started = true; }
          else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = `rgba(56, 189, 248, ${0.02 + Math.sin(time * 0.02) * 0.005})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Draw back-facing longitude lines
      for (let lon = -180; lon < 180; lon += 30) {
        ctx.beginPath();
        let started = false;
        for (let lat = -90; lat <= 90; lat += 3) {
          const p = project(lat, lon);
          if (p.z >= 0) { started = false; continue; }
          if (!started) { ctx.moveTo(p.x, p.y); started = true; }
          else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = `rgba(139, 92, 246, ${0.015 + Math.sin(time * 0.015 + lon) * 0.005})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Draw back-facing dots
      for (const dot of dots) {
        const p = project(dot.lat, dot.lon);
        if (p.z >= 0) continue;
        const alpha = 0.05 + (Math.abs(p.z) / R) * 0.1;
        const pulse = 0.8 + Math.sin(time * 0.03 + dot.lat * 0.1 + dot.lon * 0.05) * 0.2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, dot.s * pulse * 0.7, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${alpha * 0.4})`;
        ctx.fill();
      }

      // Draw immersed Logo
      if (logoImg) {
        const hoverOffset = Math.sin(time * 0.02) * 8; // subtle floating
        const scalePulse = 1 + Math.sin(time * 0.015) * 0.02; // subtle pulse
        
        // Glow / Aura behind the logo
        const logoGlow = ctx.createRadialGradient(cx, cy + hoverOffset, R * 0.1, cx, cy + hoverOffset, R * 0.5);
        logoGlow.addColorStop(0, "rgba(56, 189, 248, 0.25)");
        logoGlow.addColorStop(0.5, "rgba(139, 92, 246, 0.08)");
        logoGlow.addColorStop(1, "transparent");
        ctx.fillStyle = logoGlow;
        ctx.beginPath();
        ctx.arc(cx, cy + hoverOffset, R * 0.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.save();
        ctx.translate(cx, cy + hoverOffset);

        // React to velocity/drag for an interactive tilt
        const wobbleX = Math.sin(time * 0.01) * 0.02;
        const wobbleY = Math.cos(time * 0.01) * 0.02;
        const tiltX = wobbleX + velocityRef.current.y * 1.2;
        const tiltY = wobbleY + velocityRef.current.x * 1.2;

        // Apply dynamic scale and slight rotation
        ctx.scale((1 - Math.min(0.2, Math.abs(tiltY))) * scalePulse, (1 - Math.min(0.2, Math.abs(tiltX))) * scalePulse);
        ctx.rotate(wobbleX * 0.5 + velocityRef.current.x * 0.3);

        ctx.globalAlpha = 0.88; // subtle transparency to blend with the globe
        
        // Draw the image
        const logoSize = R * 0.85;
        ctx.drawImage(logoImg, -logoSize / 2, -logoSize / 2, logoSize, logoSize);
        
        ctx.restore();
        ctx.globalAlpha = 1.0; // reset alpha
      }

      // Draw front-facing latitude lines
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath();
        let started = false;
        for (let lon = -180; lon <= 180; lon += 3) {
          const p = project(lat, lon);
          if (p.z < 0) { started = false; continue; }
          if (!started) { ctx.moveTo(p.x, p.y); started = true; }
          else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = `rgba(56, 189, 248, ${0.06 + Math.sin(time * 0.02) * 0.02})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Draw front-facing longitude lines
      for (let lon = -180; lon < 180; lon += 30) {
        ctx.beginPath();
        let started = false;
        for (let lat = -90; lat <= 90; lat += 3) {
          const p = project(lat, lon);
          if (p.z < 0) { started = false; continue; }
          if (!started) { ctx.moveTo(p.x, p.y); started = true; }
          else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = `rgba(139, 92, 246, ${0.05 + Math.sin(time * 0.015 + lon) * 0.02})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Draw front-facing dots
      for (const dot of dots) {
        const p = project(dot.lat, dot.lon);
        if (p.z < 0) continue;
        const alpha = 0.2 + (p.z / R) * 0.5;
        const pulse = 0.8 + Math.sin(time * 0.03 + dot.lat * 0.1 + dot.lon * 0.05) * 0.2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, dot.s * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${alpha * 0.7})`;
        ctx.fill();
      }

      // Draw arcs
      for (let a = 0; a < arcs.length; a++) {
        const arc = arcs[a];
        const from = project(arc.from.lat, arc.from.lon);
        const to = project(arc.to.lat, arc.to.lon);
        if (from.z < 0 && to.z < 0) continue;

        // Compute midpoint elevated above the globe surface
        const steps = 30;
        ctx.beginPath();
        let firstVisible = true;
        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          const lat = arc.from.lat + (arc.to.lat - arc.from.lat) * t;
          const lon = arc.from.lon + (arc.to.lon - arc.from.lon) * t;
          // Elevate mid-points
          const elevation = 1 + Math.sin(t * Math.PI) * 0.15;
          const phi = (lat * Math.PI) / 180;
          const theta = (lon * Math.PI) / 180;
          const rX = rotationRef.current.x;
          const rY = rotationRef.current.y;

          let x = R * elevation * Math.cos(phi) * Math.sin(theta);
          let y = R * elevation * Math.sin(phi);
          let z = R * elevation * Math.cos(phi) * Math.cos(theta);

          const x1 = x * Math.cos(rY) - z * Math.sin(rY);
          const z1 = x * Math.sin(rY) + z * Math.cos(rY);
          x = x1; z = z1;
          const y1 = y * Math.cos(rX) - z * Math.sin(rX);
          const z2 = y * Math.sin(rX) + z * Math.cos(rX);
          y = y1; z = z2;

          if (z < 0) { firstVisible = true; continue; }
          if (firstVisible) { ctx.moveTo(cx + x, cy - y); firstVisible = false; }
          else ctx.lineTo(cx + x, cy - y);
        }

        // Animated dash offset
        const dashPhase = (time * 2 + a * 60) % 200;
        ctx.setLineDash([4, 8]);
        ctx.lineDashOffset = -dashPhase;
        ctx.strokeStyle = `rgba(139, 92, 246, ${0.5 + Math.sin(time * 0.04 + a) * 0.2})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.setLineDash([]);

        // Glowing endpoint dots
        if (from.z > 0) {
          ctx.beginPath();
          ctx.arc(from.x, from.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(56, 189, 248, 0.9)";
          ctx.fill();
          ctx.beginPath();
          ctx.arc(from.x, from.y, 6, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(56, 189, 248, 0.15)";
          ctx.fill();
        }
        if (to.z > 0) {
          ctx.beginPath();
          ctx.arc(to.x, to.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(139, 92, 246, 0.9)";
          ctx.fill();
          ctx.beginPath();
          ctx.arc(to.x, to.y, 6, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(139, 92, 246, 0.15)";
          ctx.fill();
        }
      }

      // Traveling pulse along one arc
      const activeArc = arcs[Math.floor(time / 150) % arcs.length];
      const pulseT = ((time % 150) / 150);
      const pLat = activeArc.from.lat + (activeArc.to.lat - activeArc.from.lat) * pulseT;
      const pLon = activeArc.from.lon + (activeArc.to.lon - activeArc.from.lon) * pulseT;
      const elevation = 1 + Math.sin(pulseT * Math.PI) * 0.15;
      const pp = project(pLat, pLon);
      // Apply elevation manually for pulse
      if (pp.z > 0) {
        ctx.beginPath();
        ctx.arc(pp.x, pp.y, 4 + Math.sin(time * 0.1) * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(56, 189, 248, 0.8)";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(pp.x, pp.y, 10, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(56, 189, 248, 0.12)";
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [size, logoImg]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex items-center justify-center relative cursor-grab active:cursor-grabbing select-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* Background tech grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#38bdf808_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.08),transparent_70%)] pointer-events-none" />
      
      <canvas
        ref={canvasRef}
        style={{ width: size, height: size }}
        className="relative z-10"
      />
    </div>
  );
}

export default function Hero({ onGetStartedClick, onViewProjectsClick }: HeroProps) {
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

          {/* Right Column: Interactive 3D Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-5 relative w-full aspect-square lg:aspect-auto h-full min-h-[350px] md:min-h-[420px] rounded-3xl overflow-hidden self-center"
          >
            {/* Ambient Back Glow mesh of gradients */}
            <div className="absolute inset-x-8 inset-y-12 bg-gradient-to-tr from-brand-accent/30 via-indigo-500/25 to-brand-violet/30 blur-[60px] animate-pulse-ring pointer-events-none" />
            
            <TechGlobe />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
