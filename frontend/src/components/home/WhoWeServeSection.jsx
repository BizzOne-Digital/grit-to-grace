import { Users, Shield, Heart, Home, Compass } from 'lucide-react';
import Reveal from '../common/Reveal';

const groups = [
  { icon: Users, title: 'Youth' },
  { icon: Shield, title: 'Veterans' },
  { icon: Heart, title: 'Adults in Recovery' },
  { icon: Home, title: 'Families' },
  { icon: Compass, title: 'Individuals Seeking Direction & Purpose' },
];

export default function WhoWeServeSection() {
  return (
    <Reveal as="section" className="py-20 bg-navy-800 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-crimson-400 font-heading text-xs uppercase tracking-widest mb-3">★ ★ ★ Our Community ★ ★ ★</p>
          <h2 className="font-heading text-white text-4xl md:text-5xl font-bold uppercase tracking-wide">Who We Serve</h2>
          <div className="w-16 h-1 bg-crimson-500 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {groups.map(({ icon: Icon, title }) => (
            <div key={title}
              className="bg-white/5 border border-white/10 p-6 text-center flex flex-col items-center gap-4 hover:bg-white/10 hover:border-crimson-500/50 transition-all duration-300">
              <div className="bg-crimson-500/20 w-14 h-14 flex items-center justify-center shrink-0">
                <Icon size={24} className="text-crimson-400" />
              </div>
              <p className="font-heading text-white uppercase tracking-wide text-sm leading-snug">{title}</p>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
