import { useState, useEffect } from 'react';
import { Quote, Star } from 'lucide-react';
import { testimonialAPI } from '../../services/api';
import Reveal from '../common/Reveal';

const fallback = [
  { _id: 1, name: 'Youth Mentee', role: 'Youth Program', rating: 5, quote: 'Grit to Grace changed my life. They believed in me when I didn\'t believe in myself and helped me take the right steps forward.' },
  { _id: 2, name: 'U.S. Veteran', role: 'Veteran Support', rating: 5, quote: 'As a veteran, it\'s hard to transition. Their mentorship gave me direction, purpose, and a community that truly cares.' },
  { _id: 3, name: 'Grateful Parent', role: 'Family Support', rating: 5, quote: 'The support my family received has been amazing. We finally have hope, guidance, and practical help moving forward.' },
];

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState(fallback);
  const [active, setActive] = useState(0);

  useEffect(() => {
    testimonialAPI.getAll()
      .then(res => { if (res.data.data.length > 0) setTestimonials(res.data.data); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setActive(a => (a + 1) % testimonials.length), 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const t = testimonials[active];

  return (
    <Reveal as="section" className="py-20 bg-gray-50 relative">
      {/* Side accent */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-crimson-500" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="section-subtitle mb-3">★ ★ ★ Impact &amp; Community ★ ★ ★</p>
          <h2 className="section-title">Stories of Change</h2>
          <div className="w-16 h-1 bg-crimson-500 mx-auto mt-4" />
        </div>

        <div className="relative bg-white border-l-4 border-crimson-500 shadow-lg p-10 lg:p-14 text-center min-h-[280px] flex flex-col justify-center">
          <Quote size={48} className="text-crimson-500/10 absolute top-6 left-6" />
          <Quote size={48} className="text-crimson-500/10 absolute bottom-6 right-6 rotate-180" />

          <div className="flex justify-center gap-1 mb-6">
            {[...Array(t.rating)].map((_, i) => <Star key={i} size={18} fill="#f5c842" className="text-gold-400" />)}
          </div>

          <p className="font-script text-xl md:text-2xl text-navy-700 leading-relaxed mb-8 max-w-2xl mx-auto">
            &ldquo;{t.quote}&rdquo;
          </p>

          <div>
            <p className="font-heading font-bold text-navy-700 uppercase tracking-wider text-sm">{t.name}</p>
            <p className="text-crimson-500 text-xs uppercase tracking-widest mt-1">{t.role}</p>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setActive(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === active ? 'bg-crimson-500 w-6' : 'bg-gray-300 hover:bg-gray-400'}`} />
          ))}
        </div>
      </div>
    </Reveal>
  );
}
