import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../common/Reveal';
import { serviceAPI } from '../../services/api';
import { getIcon } from '../../utils/iconMap';

const fallback = [
  { _id: '1', icon: 'User', title: 'One-on-One Mentorship', desc: 'Personalized support focused on accountability, confidence, life skills, personal growth, and purpose.' },
  { _id: '2', icon: 'Users', title: 'Youth Mentorship', desc: 'Guidance and encouragement that helps young people develop character, discipline, confidence, and purpose.' },
  { _id: '3', icon: 'Shield', title: 'Veteran Support & Mentorship', desc: 'Peer-based mentorship for veterans navigating transition, purpose, relationships, education, and employment.' },
  { _id: '4', icon: 'Heart', title: 'Recovery Support & Accountability', desc: 'Mentorship for individuals overcoming addiction, unhealthy patterns, and past struggles toward a healthier path.' },
  { _id: '5', icon: 'Mic', title: 'Group Workshops & Community Programs', desc: 'Mentorship groups, workshops, speaking engagements, and collaborative programs for schools, churches, and partners.' },
  { _id: '6', icon: 'Home', title: 'Family & Parent Support', desc: 'Guidance, resources, encouragement, and referrals for families seeking additional support for themselves or their children.' },
  { _id: '7', icon: 'Compass', title: 'Resource Navigation & Referrals', desc: 'Connecting individuals and families with appropriate community, educational, employment, and professional resources.' },
];

export default function ServicesSection() {
  const [services, setServices] = useState(fallback);

  useEffect(() => {
    serviceAPI.getAll()
      .then(res => { if (res.data.data.length > 0) setServices(res.data.data); })
      .catch(() => {});
  }, []);

  return (
    <Reveal as="section" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="section-subtitle mb-3">★ ★ ★ What We Offer ★ ★ ★</p>
          <h2 className="section-title">Our Services</h2>
          <div className="w-16 h-1 bg-crimson-500 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map(({ _id, icon, title, desc }, i) => {
            const Icon = getIcon(icon);
            return (
              <div key={_id}
                className="card p-6 group cursor-pointer"
                style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="bg-crimson-500/10 w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-crimson-500 transition-colors duration-300">
                  <Icon size={22} className="text-crimson-500 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-heading font-bold text-navy-700 uppercase tracking-wide text-base mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link to="/services" className="btn-navy inline-block">View All Services</Link>
        </div>
      </div>
    </Reveal>
  );
}
