import Layout from '../components/layout/Layout';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import Reveal from '../components/common/Reveal';
import { serviceAPI } from '../services/api';
import { getIcon } from '../utils/iconMap';

const fallback = [
  { _id: '1', icon: 'User', title: 'One-on-One Mentorship', desc: 'Personalized support focused on accountability, confidence, life skills, personal growth, and purpose.', details: 'Our one-on-one mentorship is the foundation of everything we do. You will work directly with a mentor who understands your journey and is committed to walking alongside you toward lasting change.', audience: 'Any individual seeking personal growth' },
  { _id: '2', icon: 'Users', title: 'Youth Mentorship', desc: 'Guidance and encouragement that helps young people develop character, discipline, confidence, healthy decision-making, and a stronger sense of purpose.', details: 'Young people need strong mentors who believe in them. Our youth mentorship program meets teens and young adults where they are and helps them build the character and confidence to thrive.', audience: 'Youth & teenagers' },
  { _id: '3', icon: 'Shield', title: 'Veteran Support & Mentorship', desc: 'Peer-based mentorship and guidance for veterans navigating transition, purpose, relationships, education, employment, and life after military service.', details: 'The transition from military to civilian life is one of the hardest challenges a veteran faces. Our veteran-owned mentorship program provides peer-based support from someone who has walked that road.', audience: 'U.S. Military Veterans' },
  { _id: '4', icon: 'Heart', title: 'Recovery Support & Accountability', desc: 'Mentorship for individuals working to overcome addiction, unhealthy patterns, past struggles, and other barriers while building a healthier path forward.', details: 'Recovery is a journey, not a destination. We walk alongside individuals in recovery with compassion, accountability, and practical guidance — without judgment.', audience: 'Adults in recovery' },
  { _id: '5', icon: 'Mic', title: 'Group Workshops & Community Programs', desc: 'Mentorship groups, workshops, speaking engagements, and collaborative programs for schools, churches, veteran organizations, and community partners.', details: 'We bring the power of mentorship to your organization. From speaking engagements to facilitated workshops, we partner with schools, churches, and community groups to create lasting impact.', audience: 'Schools, churches, organizations' },
  { _id: '6', icon: 'Home', title: 'Family & Parent Support', desc: 'Guidance, resources, encouragement, and referrals for families seeking additional support for themselves or their children.', details: 'Families are the foundation of a strong community. We provide guidance and resources for parents navigating difficult challenges with their children or seeking support for the whole family.', audience: 'Families & parents' },
  { _id: '7', icon: 'Compass', title: 'Resource Navigation & Referrals', desc: 'Connecting individuals and families with appropriate community, educational, employment, veteran, counseling, and other professional resources when needs extend beyond mentorship.', details: 'Sometimes the best help we can offer is connecting you with the right professionals. We maintain a network of trusted resources and will help you find the support you need.', audience: 'All individuals & families' },
];

export default function ServicesPage() {
  const [services, setServices] = useState(fallback);

  useEffect(() => {
    serviceAPI.getAll()
      .then(res => { if (res.data.data.length > 0) setServices(res.data.data); })
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
          <p className="text-crimson-400 font-heading text-xs uppercase tracking-widest mb-3">What We Offer</p>
          <h1 className="font-heading text-white text-5xl md:text-6xl font-bold uppercase">Our Services</h1>
          <div className="w-16 h-1 bg-crimson-500 mx-auto mt-4" />
        </div>
      </div>

      <Reveal as="section" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {services.map(({ _id, icon, title, desc, details, audience }, i) => {
              const Icon = getIcon(icon);
              return (
                <div key={_id} className={`bg-white shadow-md flex flex-col lg:flex-row ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className="bg-navy-800 p-10 lg:w-64 flex flex-col items-center justify-center text-center shrink-0">
                    <div className="bg-crimson-500/20 w-16 h-16 flex items-center justify-center mb-4">
                      <Icon size={32} className="text-crimson-400" />
                    </div>
                    <p className="text-white/40 text-xs uppercase tracking-widest">Serves</p>
                    <p className="text-crimson-400 text-sm font-heading mt-1">{audience}</p>
                  </div>
                  <div className="p-10 flex-1 border-l-4 border-crimson-500">
                    <h3 className="font-heading font-bold text-navy-700 uppercase tracking-wide text-2xl mb-3">{title}</h3>
                    <p className="text-gray-700 font-medium mb-3">{desc}</p>
                    <p className="text-gray-500 text-sm leading-relaxed">{details}</p>
                    <Link to="/contact" className="inline-flex items-center gap-2 mt-6 text-crimson-500 font-heading font-semibold uppercase tracking-wider text-sm hover:gap-3 transition-all duration-200">
                      Get Started <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="py-20 bg-crimson-500 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-heading text-4xl font-bold uppercase mb-4">Not Sure Where to Start?</h2>
          <p className="text-white/80 leading-relaxed mb-8">Reach out and we will help you figure out which service or package is the right fit for your situation. There is no pressure — just a conversation.</p>
          <Link to="/contact" className="bg-white text-crimson-500 font-heading font-bold uppercase tracking-wider px-10 py-4 inline-block hover:bg-navy-900 hover:text-white transition-all duration-300">
            Contact Us Today
          </Link>
        </div>
      </Reveal>
    </Layout>
  );
}
