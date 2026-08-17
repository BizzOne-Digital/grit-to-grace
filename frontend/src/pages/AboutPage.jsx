import Layout from '../components/layout/Layout';
import { Link } from 'react-router-dom';
import { Shield, Heart, Users, Star, Target, Anchor } from 'lucide-react';
import Reveal from '../components/common/Reveal';

const values = [
  { icon: Shield, title: 'Faith-Rooted', desc: 'Everything we do is grounded in faith, compassion, and the belief that every person has inherent worth and potential.' },
  { icon: Anchor, title: 'Veteran-Owned', desc: 'Founded and led by a veteran who understands the challenges of transition, purpose-finding, and service to community.' },
  { icon: Users, title: 'Community-Focused', desc: 'We believe in the power of community. Together, we are stronger and capable of achieving lasting change.' },
  { icon: Target, title: 'Purpose-Driven', desc: 'We help each person discover and pursue their unique purpose — the reason they were put on this earth.' },
  { icon: Heart, title: 'Compassion-Led', desc: 'Every interaction is guided by genuine care, empathy, and a deep desire to see each person thrive.' },
  { icon: Star, title: 'Accountability-Based', desc: 'Real growth happens with structure and accountability. We walk alongside you and hold you to your potential.' },
];

export default function AboutPage() {
  return (
    <Layout>
      {/* Page Header */}
      <div className="relative py-24 bg-navy-800 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1200&q=70" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900 to-navy-800/50" />
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-crimson-500" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <p className="text-crimson-400 font-heading text-xs uppercase tracking-widest mb-3">Our Story</p>
          <h1 className="font-heading text-white text-5xl md:text-6xl font-bold uppercase">About Us</h1>
          <div className="w-16 h-1 bg-crimson-500 mx-auto mt-4" />
        </div>
      </div>

      {/* Story section */}
      <Reveal as="section" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="section-subtitle mb-3">Who We Are</p>
            <h2 className="section-title mb-6">From Grit to Grace</h2>
            <div className="w-16 h-1 bg-crimson-500 mb-6" />
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>Grit to Grace Mentorship LLC is a faith-rooted, veteran-owned mentorship organization committed to walking alongside individuals who feel stuck, lost, or unsure of their next step.</p>
              <p>Through shared experience, compassion, accountability, and practical guidance, we help youth, veterans, adults in recovery, and families build confidence, discover purpose, and move forward.</p>
              <p>We believe our past does not have to define our future — and that with grit, guidance, community, and God&apos;s grace, a new path is always possible.</p>
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/services" className="btn-primary">Our Services</Link>
              <Link to="/contact" className="btn-navy">Get In Touch</Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-navy-200" />
            <img src="/personimg.png"
              alt="David Arenas - Founder" className="relative z-10 w-full h-96 object-cover object-top" />
            <div className="absolute bottom-4 left-4 bg-crimson-500 text-white px-6 py-4 z-20">
              <p className="font-heading font-bold uppercase">David Arenas</p>
              <p className="text-white/80 text-sm">Founder & Lead Mentor</p>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Values */}
      <Reveal as="section" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="section-subtitle mb-3">What Drives Us</p>
            <h2 className="section-title">Our Core Values</h2>
            <div className="w-16 h-1 bg-crimson-500 mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card p-8 group">
                <div className="bg-crimson-500/10 w-14 h-14 flex items-center justify-center mb-5 group-hover:bg-crimson-500 transition-colors duration-300">
                  <Icon size={24} className="text-crimson-500 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-heading font-bold text-navy-700 uppercase tracking-wide text-lg mb-3">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Who we serve */}
      <Reveal as="section" className="py-20 bg-navy-800 text-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-crimson-400 font-heading text-xs uppercase tracking-widest mb-3">Our Community</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase mb-6">Who We Serve</h2>
          <div className="w-16 h-1 bg-crimson-500 mx-auto mb-10" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Youth & Teenagers', 'U.S. Veterans', 'Adults in Recovery', 'Families & Parents',
              'Schools & Churches', 'Community Orgs', 'Potential Partners', 'Donors & Sponsors'].map(group => (
              <div key={group} className="border border-white/10 p-5 hover:border-crimson-500/50 hover:bg-white/5 transition-all duration-300">
                <p className="font-heading uppercase tracking-wide text-sm">{group}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Layout>
  );
}
