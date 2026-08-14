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
    <section className="relative min-h-screen flex flex-col justify-start lg:justify-center overflow-hidden bg-white">
      {/* Background image (parallax) */}
      <div ref={parallaxRef} className="absolute inset-0 scale-110">
        <picture>
          <source media="(max-width: 767px)" srcSet="/mobile-hero.png" />
          <img
            src="/hero.png"
            alt="Two people climbing a mountain - one helping the other"
            className="w-full h-full object-cover object-center"
          />
        </picture>
      </div>

      {/* White gradient overlay so left-side text stays readable, right side stays clear */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white via-45% to-transparent to-65%" />

      {/* American flag watermark */}
      <div className="absolute inset-0 opacity-[0.06] bg-no-repeat bg-left bg-contain pointer-events-none"
        style={{ backgroundImage: "url('/images/flag-bg.png')" }} />

      {/* Content */}
      <div className="relative z-10 max-w-7xl px-4 sm:px-6 lg:px-12 pt-8 pb-16 lg:py-24">
        {/* Text */}
        <div className="max-w-2xl text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-navy-900 text-white px-4 py-2 text-xs font-heading uppercase tracking-widest mb-8">
            <Shield size={12} className="text-crimson-400" />
            Faith-Rooted · Veteran-Owned · Community-Focused
          </div>

          {/* Main headline */}
          <h1 className="font-display text-navy-800 leading-[1.15] mb-2">
            <span className="block text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-wide">
              MENTORSHIP ISN&apos;T
            </span>
            <span className="block text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-wide">
              FOR THE WEAK.
            </span>
          </h1>

          <h2 className="font-display text-crimson-500 text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-wide leading-[1.15] mb-6">
            IT&apos;S FOR<br />THE MEEK.
          </h2>

          {/* Red/navy line accent */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-20 h-1 bg-navy-800" />
            <Star size={14} fill="currentColor" className="text-navy-800" />
            <div className="w-20 h-1 bg-crimson-500" />
          </div>

          <p className="text-navy-800/80 text-base leading-relaxed max-w-lg mb-6">
            Strength isn&apos;t pretending you don&apos;t need help. It&apos;s having the humility to seek guidance, the courage to face what&apos;s holding you back, and the discipline to grow through it.
          </p>

          {/* Tagline */}
          <p className="font-script text-2xl text-navy-800 mb-10">
            Strengthened by <span className="text-crimson-500 font-semibold">Grit.</span> Led by <span className="text-crimson-500 font-semibold">Grace.</span>
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Link to="/contact" className="btn-primary flex items-center gap-2">
              Start Your Journey
            </Link>
            <Link to="/services" className="border-2 border-navy-800 text-navy-800 font-heading font-semibold tracking-wider uppercase px-8 py-3 transition-all duration-300 hover:bg-navy-800 hover:text-white flex items-center gap-2">
              Our Services
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
