import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, Mail } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success('Welcome back!');
      navigate('/admin');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy-900 flex items-center justify-center px-4">
      {/* Background */}
      <div className="absolute inset-0 opacity-10">
        <img src="https://images.unsplash.com/photo-1569025743873-ea3a9ade89f9?w=1400&q=60" alt=""
          className="w-full h-full object-cover" />
      </div>
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-crimson-500" />

      <div className="relative z-10 w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-crimson-500 mb-4">
            <span className="font-heading font-bold text-white text-2xl">G</span>
          </div>
          <h1 className="font-heading text-white text-2xl uppercase tracking-wider font-bold">Grit to Grace</h1>
          <p className="text-white/40 text-xs uppercase tracking-widest mt-1">Admin Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 p-8 space-y-5">
          <h2 className="font-heading text-white uppercase tracking-wide text-center text-lg mb-6">Sign In</h2>

          <div>
            <label className="text-white/50 text-xs uppercase tracking-widest block mb-2">Email</label>
            <div className="relative">
              <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required
                className="w-full bg-white/5 border border-white/10 text-white pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-crimson-500 transition-colors placeholder:text-white/20"
                placeholder="admin@grit-to-grace.com" />
            </div>
          </div>

          <div>
            <label className="text-white/50 text-xs uppercase tracking-widest block mb-2">Password</label>
            <div className="relative">
              <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required
                className="w-full bg-white/5 border border-white/10 text-white pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-crimson-500 transition-colors placeholder:text-white/20"
                placeholder="••••••••" />
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-crimson-500 hover:bg-crimson-600 text-white font-heading font-bold uppercase tracking-wider py-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-white/20 text-xs mt-6">
          © {new Date().getFullYear()} Grit to Grace Mentorship LLC
        </p>
      </div>
    </div>
  );
}
