import { Shield, Users, Target, Heart } from 'lucide-react';
import Reveal from '../common/Reveal';

const pillars = [
  { icon: Shield, title: 'Faith-Rooted', desc: 'Guided by faith, built on grace and compassion.' },
  { icon: Heart, title: 'Veteran-Owned', desc: 'Led by experience, driven to serve our community.' },
  { icon: Users, title: 'Community-Focused', desc: 'Stronger together, always moving forward.' },
  { icon: Target, title: 'Purpose-Driven', desc: 'Helping you find purpose and live it out daily.' },
];

export default function MissionSection() {
  return (
    <Reveal as="section" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-full h-full border-2 border-crimson-500" />
            <img
              src="/camp.png"
              alt="Community mentorship"
              className="relative z-10 w-full h-80 lg:h-[480px] object-cover"
            />
            <div className="absolute top-4 left-4 bg-navy-800 text-white px-6 py-4 z-20">
              <p className="font-heading text-crimson-400 text-xs uppercase tracking-widest">Our Foundation</p>
              <p className="font-heading text-2xl font-bold">Grit &amp; Grace</p>
              <p className="text-white/60 text-sm">in every step forward</p>
            </div>
          </div>

          {/* Text side */}
          <div>
            <p className="section-subtitle mb-3">★ ★ ★ Our Mission &amp; Vision ★ ★ ★</p>
            <h2 className="section-title mb-6">Our Mission &amp; Vision: You.</h2>
            <div className="w-16 h-1 bg-crimson-500 mb-6" />
            <p className="text-gray-600 leading-relaxed mb-4">
              We&apos;re here to walk alongside those who feel stuck, lost, or without a way forward through personal, faith-rooted mentorship—helping you find purpose, build confidence, and move forward with faith. Through shared experience, compassion, accountability, and practical guidance, we help individuals face life&apos;s challenges with grit, regain confidence, and discover their God-given purpose.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Inspired by 2 Timothy 4:7, our vision is to see people persevere through obstacles, keep the faith, and move forward with discipline, purpose, hope, and God&apos;s grace.
            </p>

            <blockquote className="border-l-4 border-crimson-500 bg-crimson-500/5 px-5 py-4 mb-10">
              <p className="font-script text-lg text-navy-700 leading-relaxed">
                &ldquo;I have fought the good fight, I have finished the race, I have kept the faith.&rdquo;
              </p>
              <p className="text-crimson-500 text-xs uppercase tracking-widest font-heading mt-2">2 Timothy 4:7</p>
            </blockquote>

            {/* Pillars */}
            <div className="grid grid-cols-2 gap-4">
              {pillars.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-3 items-start">
                  <div className="bg-crimson-500/10 p-2 shrink-0 mt-0.5">
                    <Icon size={18} className="text-crimson-500" />
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-navy-700 uppercase tracking-wide text-sm">{title}</p>
                    <p className="text-gray-500 text-xs leading-snug mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
