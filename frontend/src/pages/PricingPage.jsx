import Layout from '../components/layout/Layout';
import PricingSection from '../components/home/PricingSection';
import { Link } from 'react-router-dom';
import Reveal from '../components/common/Reveal';

const faqs = [
  { q: 'Are payment plans available?', a: 'Yes — payment plans are available for all mentorship packages. Please reach out and we will work with you to find an arrangement that fits your situation.' },
  { q: 'How long are mentorship meetings?', a: 'Sessions are typically 45–60 minutes depending on the package and the needs of the individual. Transformation clients also have access to phone and text support between sessions.' },
  { q: 'Can I upgrade or downgrade my package?', a: 'Absolutely. You can change your package level at any time. Simply reach out and we will make the adjustment for your next billing period.' },
  { q: 'Is there a contract or commitment?', a: 'We operate month-to-month. There is no long-term contract required, though consistency is what produces the best results.' },
  { q: 'Do you serve clients outside of Texas?', a: 'Yes. While we are based in Texas, we are able to serve clients virtually. Please reach out to discuss options for your location.' },
];

export default function PricingPage() {
  return (
    <Layout>
      <div className="relative py-24 bg-navy-800 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=1200&q=70" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900 to-navy-800/50" />
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-crimson-500" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <p className="text-crimson-400 font-heading text-xs uppercase tracking-widest mb-3">Investment In Your Growth</p>
          <h1 className="font-heading text-white text-5xl md:text-6xl font-bold uppercase">Pricing</h1>
          <div className="w-16 h-1 bg-crimson-500 mx-auto mt-4" />
        </div>
      </div>

      <PricingSection />

      {/* FAQ */}
      <Reveal as="section" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="section-subtitle mb-3">Common Questions</p>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <div className="w-16 h-1 bg-crimson-500 mx-auto mt-4" />
          </div>
          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <div key={q} className="border-l-4 border-crimson-500 bg-gray-50 p-6">
                <p className="font-heading font-bold text-navy-700 uppercase tracking-wide mb-2">{q}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <p className="text-gray-500 mb-4">Still have questions? We would love to hear from you.</p>
            <Link to="/contact" className="btn-primary inline-block">Contact Us</Link>
          </div>
        </div>
      </Reveal>
    </Layout>
  );
}
