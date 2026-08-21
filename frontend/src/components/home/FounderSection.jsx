import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Reveal from '../common/Reveal';

export default function FounderSection() {
  return (
    <Reveal as="section" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Photo */}
          <div className="relative order-2 lg:order-1">
            <div className="absolute -top-4 -left-4 w-full h-full border-2 border-crimson-500" />
            <img
              src="/personimg.png"
              alt="David Arenas - Founder of Grit to Grace Mentorship"
              className="relative z-10 w-full h-80 lg:h-[420px] object-cover object-top"
            />
            <div className="absolute bottom-4 right-4 bg-navy-800 text-white px-6 py-4 z-20">
              <p className="font-heading font-bold uppercase">David Arenas</p>
              <p className="text-white/60 text-sm">Founder & Lead Mentor</p>
            </div>
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <p className="section-subtitle mb-3">★ ★ ★ Who We Are ★ ★ ★</p>
            <h2 className="font-heading text-navy-700 text-4xl md:text-5xl font-bold uppercase tracking-wide leading-tight mb-2">
              From Grit To Grace.
            </h2>
            <p className="font-heading text-crimson-500 text-2xl md:text-3xl font-bold uppercase tracking-wide leading-tight mb-6">
              Not Your Average Mentorship.
            </p>
            <div className="w-16 h-1 bg-crimson-500 mb-6" />
            <p className="text-gray-600 leading-relaxed mb-4">
              Grit to Grace Mentorship LLC is a faith-rooted, veteran-owned organization committed to walking alongside youth, veterans, adults in recovery, families, and anyone who feels stuck or unsure of their next step.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Through real-life experience, accountability, compassion, and practical guidance, we don&apos;t just talk about change, we walk with you through it.
            </p>
            <p className="text-gray-600 leading-relaxed mb-10">
              Your past is part of your story, but it doesn&apos;t have to define your future. With grit, faith, and God&apos;s grace, a new path forward is possible.
            </p>
            <Link to="/about" className="btn-primary inline-flex items-center gap-2">
              Our Founder <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
