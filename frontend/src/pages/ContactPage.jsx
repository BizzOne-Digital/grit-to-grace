import Layout from '../components/layout/Layout';
import { useState } from 'react';
import { Phone, Mail, Facebook, Send, CheckCircle } from 'lucide-react';
import { contactAPI } from '../services/api';
import toast from 'react-hot-toast';
import Reveal from '../components/common/Reveal';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', interestedIn: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return toast.error('Please fill in all required fields.');
    setLoading(true);
    try {
      await contactAPI.submit(form);
      setSubmitted(true);
      toast.success('Message sent! We will be in touch soon.');
    } catch {
      toast.error('Something went wrong. Please try again or call us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="relative py-24 bg-navy-800 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1200&q=70" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900 to-navy-800/50" />
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-crimson-500" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <p className="text-crimson-400 font-heading text-xs uppercase tracking-widest mb-3">We Are Here For You</p>
          <h1 className="font-heading text-white text-5xl md:text-6xl font-bold uppercase">Contact Us</h1>
          <div className="w-16 h-1 bg-crimson-500 mx-auto mt-4" />
        </div>
      </div>

      <Reveal as="section" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact info */}
          <div className="space-y-6">
            <div>
              <p className="section-subtitle mb-2">Get In Touch</p>
              <h2 className="font-heading text-navy-700 text-3xl font-bold uppercase">Reach Out Today</h2>
              <div className="w-12 h-1 bg-crimson-500 mt-3" />
            </div>
            <p className="text-gray-500 leading-relaxed text-sm">
              We are here to help. Whether you have questions, want to schedule a consultation, or are ready to get started — reach out and we will respond promptly.
            </p>

            <div className="space-y-4">
              <a href="tel:8328562254" className="flex items-center gap-4 group">
                <div className="bg-crimson-500 w-10 h-10 flex items-center justify-center shrink-0 group-hover:bg-navy-800 transition-colors">
                  <Phone size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest">Phone</p>
                  <p className="font-heading font-semibold text-navy-700">832-856-2254</p>
                </div>
              </a>

              <a href="mailto:GTGMentorship@gmail.com" className="flex items-center gap-4 group">
                <div className="bg-crimson-500 w-10 h-10 flex items-center justify-center shrink-0 group-hover:bg-navy-800 transition-colors">
                  <Mail size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest">Email</p>
                  <p className="font-heading font-semibold text-navy-700">GTGMentorship@gmail.com</p>
                </div>
              </a>

              <a href="https://www.facebook.com/GTGMentorship" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                <div className="bg-crimson-500 w-10 h-10 flex items-center justify-center shrink-0 group-hover:bg-navy-800 transition-colors">
                  <Facebook size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest">Facebook</p>
                  <p className="font-heading font-semibold text-navy-700">@GTGMentorship</p>
                </div>
              </a>
            </div>

            <div className="bg-navy-800 p-6 mt-6">
              <p className="text-crimson-400 font-heading text-xs uppercase tracking-widest mb-2">David Arenas</p>
              <p className="text-white font-heading font-bold uppercase">Founder & Lead Mentor</p>
              <p className="text-white/50 text-sm mt-2">Payment plans available for all mentorship packages.</p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2 bg-white shadow-lg border-t-4 border-crimson-500 p-8">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-20 text-center gap-4">
                <CheckCircle size={56} className="text-green-500" />
                <h3 className="font-heading font-bold text-navy-700 text-2xl uppercase">Message Received!</h3>
                <p className="text-gray-500">Thank you for reaching out. We will contact you within 1–2 business days.</p>
                <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', interestedIn: '', message: '' }); }}
                  className="btn-primary mt-4">Send Another Message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="font-heading font-bold text-navy-700 text-2xl uppercase mb-6">Send Us a Message</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-heading uppercase tracking-widest text-gray-500 block mb-1.5">Full Name *</label>
                    <input name="name" value={form.name} onChange={handleChange} required
                      className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-crimson-500 transition-colors"
                      placeholder="Your full name" />
                  </div>
                  <div>
                    <label className="text-xs font-heading uppercase tracking-widest text-gray-500 block mb-1.5">Email Address *</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} required
                      className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-crimson-500 transition-colors"
                      placeholder="your@email.com" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-heading uppercase tracking-widest text-gray-500 block mb-1.5">Phone Number</label>
                    <input name="phone" value={form.phone} onChange={handleChange}
                      className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-crimson-500 transition-colors"
                      placeholder="(832) 000-0000" />
                  </div>
                  <div>
                    <label className="text-xs font-heading uppercase tracking-widest text-gray-500 block mb-1.5">Interested In</label>
                    <select name="interestedIn" value={form.interestedIn} onChange={handleChange}
                      className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-crimson-500 transition-colors bg-white">
                      <option value="">Select a service...</option>
                      <option>One-on-One Mentorship</option>
                      <option>Youth Mentorship</option>
                      <option>Veteran Support</option>
                      <option>Recovery Support</option>
                      <option>Group Workshops</option>
                      <option>Family & Parent Support</option>
                      <option>Resource Navigation</option>
                      <option>General Information</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-heading uppercase tracking-widest text-gray-500 block mb-1.5">Your Message *</label>
                  <textarea name="message" value={form.message} onChange={handleChange} required rows={5}
                    className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-crimson-500 transition-colors resize-none"
                    placeholder="Tell us a bit about yourself and how we can help..." />
                </div>
                <button type="submit" disabled={loading}
                  className="btn-primary flex items-center gap-2 w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed">
                  {loading ? 'Sending...' : (<><Send size={16} /> Send Message</>)}
                </button>
              </form>
            )}
          </div>
        </div>
      </Reveal>
    </Layout>
  );
}
