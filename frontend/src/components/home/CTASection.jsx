import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Reveal from '../common/Reveal';

export default function CTASection() {
  return (
    <Reveal as="section" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1400&q=70"
          alt="Community"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-navy-900/85" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <p className="text-crimson-400 font-heading text-xs uppercase tracking-widest mb-4">Take the First Step</p>
        <h2 className="font-heading text-white text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wide leading-tight mb-6">
          A New Path<br />Is Possible
        </h2>
        <div className="w-16 h-1 bg-crimson-500 mx-auto mb-6" />
        <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
          With grit, guidance, community, and God&apos;s grace — you can move forward. We are here to help you take the next step.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/contact"
            className="bg-crimson-500 hover:bg-crimson-600 text-white font-heading font-bold uppercase tracking-wider px-10 py-4 flex items-center gap-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 text-lg">
            Start Your Journey
            <ArrowRight size={20} />
          </Link>
          <Link to="/pricing"
            className="border-2 border-white text-white font-heading font-bold uppercase tracking-wider px-10 py-4 hover:bg-white hover:text-navy-800 transition-all duration-300 text-lg">
            View Packages
          </Link>
        </div>
      </div>
    </Reveal>
  );
}
