import Layout from '../components/layout/Layout';
import { Link } from 'react-router-dom';
import { Award, Flame, HeartHandshake, BookOpen, Mountain } from 'lucide-react';
import Reveal from '../components/common/Reveal';

const values = [
  { icon: Award, title: 'Honor', desc: 'We lead with integrity, honesty, and respect, modeling accountability in everything we do.' },
  { icon: Flame, title: 'Courage', desc: "We face life's challenges head-on, encouraging others to overcome fear, embrace growth, and boldly pursue their purpose." },
  { icon: HeartHandshake, title: 'Commitment', desc: 'We walk alongside those we serve through the struggles, the victories, and every step in between.' },
  { icon: BookOpen, title: 'Faith', desc: "We are rooted in God's guidance, using Scripture and biblical principles to inspire hope, growth, and transformation." },
  { icon: Mountain, title: 'Resilience', desc: "We believe obstacles don't have to define the outcome. Through perseverance, we help individuals develop the strength to keep moving forward." },
];

export default function AboutPage() {
  return (
    <Layout>
      {/* Page Header */}
      <div className="relative py-24 bg-navy-800 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="/our.png" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900 to-navy-800/50" />
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-crimson-500" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <p className="text-crimson-400 font-heading text-xs uppercase tracking-widest mb-3">Our Story</p>
          <h1 className="font-heading text-white text-5xl md:text-6xl font-bold uppercase">Our Founder</h1>
          <div className="w-16 h-1 bg-crimson-500 mx-auto mt-4" />
        </div>
      </div>

      {/* Story section */}
      <Reveal as="section" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="section-subtitle mb-3">Our Founder</p>
            <h2 className="section-title mb-6">David Arenas</h2>
            <div className="w-16 h-1 bg-crimson-500 mb-6" />
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>I was born and raised in Houston, Texas, and graduated from Milby High School. Growing up, I faced generational cycles, adversity, and the expectation that I would simply become a product of my environment. Determined to create a different future for myself and my family, I joined the United States Marine Corps, where I served from 2009 to 2020.</p>
              <p>But my journey didn&apos;t end when the uniform came off. Life after the military brought challenges of its own and ultimately led me to a deeper relationship with Jesus Christ, a renewed sense of purpose, and a calling to serve others.</p>
              <p>I earned my Bachelor of Social Work from Angelo State University and am continuing my education there through the Master of Social Work program. My passion for serving others has also led me into youth ministry, recovery ministry, mentorship, and community outreach.</p>
              <p>I know what it feels like to be stuck, to face hard seasons, and to need someone willing to walk beside you. That&apos;s why I founded Grit to Grace Mentorship.</p>
              <p>Grit to Grace was born from lived experience, faith, and a simple belief: your past may be part of your story, but it does not have to define your future.</p>
              <p className="font-script text-xl text-navy-700">Strengthened by <span className="text-crimson-500 font-semibold">Grit.</span> Led by <span className="text-crimson-500 font-semibold">Grace.</span></p>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card p-6 group">
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
