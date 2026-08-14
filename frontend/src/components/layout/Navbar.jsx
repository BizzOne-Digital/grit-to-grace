import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail } from 'lucide-react';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/services', label: 'Services' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/testimonials', label: 'Impact & Community' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [location]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top bar */}
      <div className="bg-navy-800 text-white text-xs py-1.5 px-4 hidden md:flex justify-between items-center">
        <div className="flex gap-6 items-center">
          <a href="tel:8328562254" className="flex items-center gap-1.5 hover:text-crimson-400 transition-colors">
            <Phone size={12} /> 832-856-2254
          </a>
          <a href="mailto:GTGMentorship@gmail.com" className="flex items-center gap-1.5 hover:text-crimson-400 transition-colors">
            <Mail size={12} /> GTGMentorship@gmail.com
          </a>
        </div>
        <a href="https://www.facebook.com/GTGMentorship" target="_blank" rel="noopener noreferrer"
          className="hover:text-crimson-400 transition-colors flex items-center gap-1.5">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          Follow Us
        </a>
      </div>

      {/* Main nav */}
      <nav className={`transition-all duration-300 ${scrolled ? 'bg-white shadow-lg py-2' : 'bg-white py-3'}`}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="Grit to Grace Mentorship" className="h-14 w-auto" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <NavLink key={link.to} to={link.to} end={link.to === '/'}
                className={({ isActive }) =>
                  `px-4 py-2 font-heading font-medium text-sm uppercase tracking-wider transition-colors duration-200 relative group
                  ${isActive ? 'text-crimson-500' : 'text-navy-700 hover:text-crimson-500'}`
                }>
                {link.label}
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-crimson-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center" />
              </NavLink>
            ))}
            <Link to="/contact" className="ml-4 btn-primary text-sm">Get Started</Link>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} className="lg:hidden p-2 text-navy-700 hover:text-crimson-500 transition-colors">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="bg-navy-800 px-4 py-4 flex flex-col gap-1">
            {navLinks.map(link => (
              <NavLink key={link.to} to={link.to} end={link.to === '/'}
                className={({ isActive }) =>
                  `px-4 py-3 font-heading font-medium text-sm uppercase tracking-wider border-b border-navy-700
                  ${isActive ? 'text-crimson-400' : 'text-white hover:text-crimson-400'}`
                }>
                {link.label}
              </NavLink>
            ))}
            <Link to="/contact" className="mt-4 btn-primary text-center text-sm">Get Started</Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
