import { Link } from 'react-router-dom';
import { Phone, Mail, Facebook, MapPin, Star } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      {/* CTA band */}
      <div className="bg-crimson-500 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-heading text-xl uppercase tracking-wide font-bold">Ready to Take Your Next Step?</p>
            <p className="text-white/80 text-sm">We are here to walk alongside you. Reach out today.</p>
          </div>
          <Link to="/contact" className="bg-white text-crimson-500 font-heading font-bold uppercase tracking-wider px-8 py-3 hover:bg-navy-900 hover:text-white transition-all duration-300 whitespace-nowrap">
            Contact Us Now
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="lg:col-span-1">
          <img src="/logo.png" alt="Grit to Grace" className="h-20 w-auto mb-4 brightness-0 invert" />
          <p className="text-white/60 text-sm leading-relaxed">
            Faith-Rooted. Veteran-Owned. Community-Focused. Walking alongside you toward confidence, purpose, and a brighter future.
          </p>
          <div className="flex items-center gap-1 mt-4">
            {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#f5c842" className="text-gold-400" />)}
            <span className="text-white/50 text-xs ml-2">Faith • Service • Purpose</span>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="font-heading text-crimson-400 uppercase tracking-widest text-sm mb-5">Quick Links</h4>
          <ul className="space-y-2.5">
            {[
              { to: '/', label: 'Home' },
              { to: '/about', label: 'Our Founder' },
              { to: '/services', label: 'Our Services' },
              { to: '/pricing', label: 'Pricing' },
              { to: '/testimonials', label: 'Impact & Community' },
              { to: '/contact', label: 'Contact' },
            ].map(link => (
              <li key={link.to}>
                <Link to={link.to} className="text-white/60 hover:text-crimson-400 transition-colors text-sm flex items-center gap-2">
                  <span className="w-1 h-1 bg-crimson-500 rounded-full" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-heading text-crimson-400 uppercase tracking-widest text-sm mb-5">Our Services</h4>
          <ul className="space-y-2.5">
            {[
              'One-on-One Mentorship',
              'Youth Mentorship',
              'Veteran Support',
              'Recovery Support',
              'Group Workshops',
              'Family Support',
              'Resource Navigation',
            ].map(s => (
              <li key={s}>
                <Link to="/services" className="text-white/60 hover:text-crimson-400 transition-colors text-sm flex items-center gap-2">
                  <span className="w-1 h-1 bg-crimson-500 rounded-full" />
                  {s}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-heading text-crimson-400 uppercase tracking-widest text-sm mb-5">Get In Touch</h4>
          <ul className="space-y-4">
            <li>
              <a href="tel:8328562254" className="flex items-center gap-3 text-white/60 hover:text-crimson-400 transition-colors text-sm">
                <Phone size={16} className="text-crimson-400 shrink-0" />
                832-856-2254
              </a>
            </li>
            <li>
              <a href="mailto:GTGMentorship@gmail.com" className="flex items-center gap-3 text-white/60 hover:text-crimson-400 transition-colors text-sm">
                <Mail size={16} className="text-crimson-400 shrink-0" />
                GTGMentorship@gmail.com
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/GTGMentorship" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/60 hover:text-crimson-400 transition-colors text-sm">
                <Facebook size={16} className="text-crimson-400 shrink-0" />
                Facebook Page
              </a>
            </li>
          </ul>

          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-white/40 text-xs">Payment plans available for all mentorship packages.</p>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="border-t border-white/10 py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-white/30 text-xs leading-relaxed text-center max-w-4xl mx-auto">
            Grit to Grace Mentorship LLC provides mentorship, guidance, accountability, and resource navigation.
            Mentorship services are not a substitute for licensed mental health counseling, medical care, legal services, or emergency/crisis services.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2 text-white/40 text-xs">
          <p>© {new Date().getFullYear()} Grit to Grace Mentorship LLC. All Rights Reserved.</p>
          <p>Faith-Rooted · Veteran-Owned · Community-Focused</p>
        </div>
      </div>
    </footer>
  );
}
