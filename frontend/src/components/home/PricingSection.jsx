import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import Reveal from '../common/Reveal';
import { packageAPI } from '../../services/api';

const fallback = [
  {
    _id: '1',
    name: 'Foundation',
    price: 75,
    frequency: '/ month',
    tagline: 'One meeting per month',
    desc: 'A starting point for individuals looking for guidance, encouragement, and accountability. Together we\'ll identify goals, discuss challenges, and begin building practical steps forward.',
    features: ['1 mentorship meeting/month', 'Goal identification', 'Accountability check-in', 'Email support'],
    featured: false,
  },
  {
    _id: '2',
    name: 'Growth',
    price: 150,
    frequency: '/ month',
    tagline: 'Two meetings per month',
    desc: 'For individuals ready for greater structure, consistency, and support. Builds upon Foundation with more frequent mentorship and increased accountability.',
    features: ['2 mentorship meetings/month', 'Goal development', 'Increased accountability', 'Action planning', 'Email & message support'],
    featured: true,
  },
  {
    _id: '3',
    name: 'Transformation',
    price: 250,
    frequency: '/ month',
    tagline: 'Weekly + phone/text support',
    desc: 'Our highest level of individualized mentorship for those ready to go deeper. Consistent support, personalized strategy, and greater accountability.',
    features: [
      '4 meetings/month (weekly)',
      'Phone/text between sessions',
      'Personalized goals & action plan',
      'Increased accountability',
      'Parent/guardian check-ins (youth)',
    ],
    featured: false,
  },
];

export default function PricingSection() {
  const [plans, setPlans] = useState(fallback);

  useEffect(() => {
    packageAPI.getAll()
      .then(res => { if (res.data.data.length > 0) setPlans(res.data.data); })
      .catch(() => {});
  }, []);

  return (
    <Reveal as="section" className="py-20 bg-navy-800 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-crimson-400 font-heading text-xs uppercase tracking-widest mb-3">★ ★ ★ Investment in Your Future ★ ★ ★</p>
          <h2 className="font-heading text-white text-4xl md:text-5xl font-bold uppercase tracking-wide">Mentorship Packages</h2>
          <div className="w-16 h-1 bg-crimson-500 mx-auto mt-4" />
          <p className="text-white/50 text-sm mt-4">Payment plans are available — reach out to discuss options.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan) => (
            <div key={plan._id}
              className={`relative flex flex-col transition-all duration-300 hover:-translate-y-2 ${
                plan.featured
                  ? 'bg-crimson-500 text-white shadow-2xl scale-105 border-0'
                  : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
              }`}>
              {plan.featured && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <span className="bg-gold-400 text-navy-900 text-xs font-heading font-bold uppercase tracking-wider px-4 py-1">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-8 border-b border-white/20">
                <p className={`font-heading uppercase tracking-widest text-sm mb-1 ${plan.featured ? 'text-white/80' : 'text-crimson-400'}`}>
                  {plan.name}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="font-heading text-5xl font-bold">${plan.price}</span>
                  <span className="text-sm opacity-60">{plan.frequency}</span>
                </div>
                <p className={`text-xs mt-1 ${plan.featured ? 'text-white/70' : 'text-white/40'}`}>{plan.tagline}</p>
              </div>

              <div className="p-8 flex-1 flex flex-col">
                <p className={`text-sm leading-relaxed mb-6 ${plan.featured ? 'text-white/80' : 'text-white/50'}`}>{plan.desc}</p>

                <ul className="space-y-3 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check size={14} className={`shrink-0 mt-0.5 ${plan.featured ? 'text-white' : 'text-crimson-400'}`} />
                      <span className={plan.featured ? 'text-white/90' : 'text-white/60'}>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/contact"
                  className={`mt-8 block text-center font-heading font-bold uppercase tracking-wider py-3 px-6 transition-all duration-300 ${
                    plan.featured
                      ? 'bg-white text-crimson-500 hover:bg-navy-900 hover:text-white'
                      : 'bg-crimson-500 text-white hover:bg-crimson-600'
                  }`}>
                  Get Started
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
