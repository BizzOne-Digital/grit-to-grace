import Layout from '../components/layout/Layout';
import { useEffect, useState } from 'react';
import { Star, Quote, Users, HeartHandshake, Mic2, Users2 } from 'lucide-react';
import { testimonialAPI } from '../services/api';
import Reveal from '../components/common/Reveal';

const impactAreas = [
  { icon: Users, title: 'Youth Work', desc: 'Mentoring young people toward character, confidence, and purpose.' },
  { icon: HeartHandshake, title: 'Veteran Outreach', desc: 'Peer-based support for veterans navigating transition and purpose.' },
  { icon: Users2, title: 'Community Partnerships', desc: 'Working alongside schools, churches, and local organizations.' },
  { icon: Mic2, title: 'Events & Workshops', desc: 'Speaking engagements and workshops that bring mentorship to the community.' },
];

const fallback = [
  { _id: 1, name: 'Youth Mentee', role: 'Youth Program', rating: 5, quote: 'Grit to Grace changed my life. They believed in me when I didn\'t believe in myself and helped me take the right steps forward.' },
  { _id: 2, name: 'U.S. Veteran', role: 'Veteran Support', rating: 5, quote: 'As a veteran, it\'s hard to transition. Their mentorship gave me direction, purpose, and a community that truly cares.' },
  { _id: 3, name: 'Grateful Parent', role: 'Family Support', rating: 5, quote: 'The support my family received has been amazing. We finally have hope, guidance, and practical help moving forward.' },
];

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState(fallback);

  useEffect(() => {
    testimonialAPI.getAll()
      .then(res => { if (res.data.data.length > 0) setTestimonials(res.data.data); })
      .catch(() => {});
  }, []);

  return (
    <Layout>
      <div className="relative py-24 bg-navy-800 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=70" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900 to-navy-800/50" />
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-crimson-500" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <p className="text-crimson-400 font-heading text-xs uppercase tracking-widest mb-3">Testimonials &amp; Community</p>
          <h1 className="font-heading text-white text-5xl md:text-6xl font-bold uppercase">Impact &amp; Community</h1>
          <div className="w-16 h-1 bg-crimson-500 mx-auto mt-4" />
        </div>
      </div>

      {/* Impact areas */}
      <Reveal as="section" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="section-subtitle mb-3">★ ★ ★ How We Show Up ★ ★ ★</p>
            <h2 className="section-title">Making an Impact Together</h2>
            <div className="w-16 h-1 bg-crimson-500 mx-auto mt-4" />
            <p className="text-gray-500 max-w-2xl mx-auto mt-6 leading-relaxed">
              Grit to Grace Mentorship LLC is more than one-on-one mentorship — we are active in the community through partnerships, youth work, veteran outreach, and events that bring people together.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactAreas.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card p-6 text-center group">
                <div className="bg-crimson-500/10 w-14 h-14 mx-auto flex items-center justify-center mb-4 group-hover:bg-crimson-500 transition-colors duration-300">
                  <Icon size={24} className="text-crimson-500 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-heading font-bold text-navy-700 uppercase tracking-wide text-sm mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Testimonials */}
      <Reveal as="section" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="section-subtitle mb-3">★ ★ ★ Stories of Change ★ ★ ★</p>
            <h2 className="section-title">What People Are Saying</h2>
            <div className="w-16 h-1 bg-crimson-500 mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t._id} className="card p-8 relative">
                <Quote size={32} className="text-crimson-500/10 absolute top-4 right-4" />
                <div className="flex gap-1 mb-5">
                  {[...Array(t.rating || 5)].map((_, i) => <Star key={i} size={14} fill="#f5c842" className="text-gold-400" />)}
                </div>
                <p className="font-script text-lg text-navy-700 leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
                <div className="border-t border-gray-100 pt-4">
                  {t.image && <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover mb-3" />}
                  <p className="font-heading font-bold text-navy-700 uppercase tracking-wide text-sm">{t.name}</p>
                  <p className="text-crimson-500 text-xs uppercase tracking-widest mt-0.5">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Layout>
  );
}
