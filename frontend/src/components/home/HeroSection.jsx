import { Link } from 'react-router-dom';
import { ChevronDown, Shield, Star } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function HeroSection() {
  const parallaxRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${window.scrollY * 0.3}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-white">
      {/* Background image (parallax) */}
      <div ref={parallaxRef} className="absolute inset-0 scale-110">
        <img
          src="/hero.png"
          alt="Two people climbing a mountain - one helping the other"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* White gradient overlay so left-side text stays readable, right side stays clear */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white via-45% to-transparent to-65%" />

      {/* American flag watermark */}
      <div className="absolute inset-0 opacity-[0.06] bg-no-repeat bg-left bg-contain pointer-events-none"
        style={{ backgroundImage: "url('/images/flag-bg.png')" }} />

      {/* Content */}
      <div className="relative z-10 max-w-7xl px-4 sm:px-6 lg:px-12 py-16 lg:py-24">
        {/* Text */}
        <div className="max-w-2xl text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-navy-900 text-white px-4 py-2 text-xs font-heading uppercase tracking-widest mb-8">
            <Shield size={12} className="text-crimson-400" />
            Faith-Rooted · Veteran-Owned · Community-Focused
          </div>

          {/* Main headline */}
          <h1 className="font-display text-navy-800 leading-[1.15] mb-2">
            <span className="block text-5xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-wide">
              YOUR PAST
            </span>
            <span className="block text-5xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-wide">
              DOESN&apos;T DEFINE YOU.
            </span>
          </h1>

          <h2 className="font-display text-crimson-500 text-5xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-wide leading-[1.15] mb-6">
            YOUR NEXT<br />STEPS DO.
          </h2>

          {/* Red/navy line accent */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-20 h-1 bg-navy-800" />
            <Star size={14} fill="currentColor" className="text-navy-800" />
            <div className="w-20 h-1 bg-crimson-500" />
          </div>

          {/* Tagline */}
          <p className="font-script text-2xl text-navy-800 mb-4">
            Strengthened by <span className="text-crimson-500 font-semibold">Grit.</span> Led by <span className="text-crimson-500 font-semibold">Grace.</span>
          </p>

          <p className="text-navy-800/70 text-base leading-relaxed max-w-lg mb-10">
            We walk alongside youth, veterans, individuals in recovery, and families through mentorship, support, and guidance to build confidence, discover purpose, and move forward.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Link to="/services" className="btn-primary flex items-center gap-2">
              Our Services
            </Link>
            <Link to="/contact" className="border-2 border-navy-800 text-navy-800 font-heading font-semibold tracking-wider uppercase px-8 py-3 transition-all duration-300 hover:bg-navy-800 hover:text-white flex items-center gap-2">
              Get Started
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-navy-800/30 animate-bounce">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <ChevronDown size={18} />
      </div>
    </section>
  );
}
