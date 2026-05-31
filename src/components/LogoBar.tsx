import logo2 from "../../assets/logo-bar/logo2.png";
import logo3 from "../../assets/logo-bar/logo3.png";
import logo4 from "../../assets/logo-bar/logo4.png";
import logo5 from "../../assets/logo-bar/logo5.png";

export default function LogoBar() {
  const logos = [
    { src: logo2, alt: "Partner 2" },
    { src: logo3, alt: "Partner 3" },
    { src: logo4, alt: "Partner 4" },
    { src: logo5, alt: "Partner 5" },
  ];

  // Quadruple the logos for seamless infinite loop and full screen coverage
  const quadrupled = [...logos, ...logos, ...logos, ...logos];

  return (
    <section
      id="logo-bar"
      className="relative overflow-hidden bg-brand-deep py-6 border-b border-white/5"
    >
      {/* Top/bottom fade masks */}
      <div className="absolute inset-y-0 left-0 w-36 sm:w-64 bg-gradient-to-r from-brand-deep via-brand-deep/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-36 sm:w-64 bg-gradient-to-l from-brand-deep via-brand-deep/80 to-transparent z-10 pointer-events-none" />

      {/* Scrolling Track */}
      <div className="flex animate-logo-slider" style={{ width: "max-content" }}>
        {quadrupled.map((logo, i) => (
          <div
            key={i}
            className="flex-shrink-0 mx-8 sm:mx-12 flex items-center justify-center h-12 sm:h-14 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
          >
            <img
              src={logo.src}
              alt={logo.alt}
              className="h-full w-auto max-w-[120px] sm:max-w-[150px] object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
