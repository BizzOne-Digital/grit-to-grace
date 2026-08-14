import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Star, TrendingUp, Users, ArrowRight, Clock, CheckCircle, XCircle } from 'lucide-react';
import { contactAPI, testimonialAPI } from '../../services/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ total: 0, new: 0, contacted: 0, closed: 0, testimonials: 0 });
  const [recentLeads, setRecentLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([contactAPI.getAll(), testimonialAPI.getAllAdmin()])
      .then(([contactRes, testimonialRes]) => {
        const counts = contactRes.data.counts || {};
        setStats({
          total: counts.total || 0,
          new: counts.new || 0,
          contacted: counts.contacted || 0,
          closed: counts.closed || 0,
          testimonials: testimonialRes.data.data.length
        });
        setRecentLeads((contactRes.data.data || []).slice(0, 5));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const statCards = [
    { label: 'Total Leads', value: stats.total, icon: Users, color: 'bg-navy-700', link: '/admin/leads' },
    { label: 'New Inquiries', value: stats.new, icon: TrendingUp, color: 'bg-crimson-500', link: '/admin/leads?status=new' },
    { label: 'In Progress', value: stats.contacted, icon: Clock, color: 'bg-yellow-500', link: '/admin/leads?status=contacted' },
    { label: 'Testimonials', value: stats.testimonials, icon: Star, color: 'bg-green-600', link: '/admin/testimonials' },
  ];

  const statusIcon = (status) => {
    if (status === 'new') return <span className="bg-crimson-100 text-crimson-600 text-xs px-2 py-0.5 font-heading uppercase tracking-wider">New</span>;
    if (status === 'contacted') return <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-0.5 font-heading uppercase tracking-wider">In Progress</span>;
    return <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 font-heading uppercase tracking-wider">Closed</span>;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-heading text-navy-800 text-3xl font-bold uppercase tracking-wide">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">Overview of Grit to Grace Mentorship activity</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map(({ label, value, icon: Icon, color, link }) => (
          <Link to={link} key={label}
            className="bg-white shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow group">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-widest font-heading">{label}</p>
                <p className="font-heading text-4xl font-bold text-navy-800 mt-2">
                  {loading ? '—' : value}
                </p>
              </div>
              <div className={`${color} w-11 h-11 flex items-center justify-center`}>
                <Icon size={20} className="text-white" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4 text-crimson-500 text-xs font-heading uppercase tracking-wider group-hover:gap-2 transition-all">
              View <ArrowRight size={12} />
            </div>
          </Link>
        ))}
      </div>

      {/* Recent leads */}
      <div className="bg-white shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-heading font-bold text-navy-800 uppercase tracking-wide text-sm">Recent Leads</h2>
          <Link to="/admin/leads" className="text-crimson-500 text-xs font-heading uppercase tracking-wider hover:underline flex items-center gap-1">
            View All <ArrowRight size={12} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-10 text-center text-gray-400 text-sm">Loading...</div>
          ) : recentLeads.length === 0 ? (
            <div className="p-10 text-center">
              <MessageSquare size={32} className="text-gray-200 mx-auto mb-3" />
              <p className="text-gray-400 text-sm">No leads yet. Contact form submissions will appear here.</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['Name', 'Email', 'Interested In', 'Date', 'Status'].map(h => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-heading uppercase tracking-widest text-gray-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentLeads.map(lead => (
                  <tr key={lead._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4 font-medium text-navy-800">{lead.name}</td>
                    <td className="px-5 py-4 text-gray-500">{lead.email}</td>
                    <td className="px-5 py-4 text-gray-500">{lead.interestedIn || '—'}</td>
                    <td className="px-5 py-4 text-gray-400 text-xs">
                      {new Date(lead.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-5 py-4">{statusIcon(lead.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Manage Leads', desc: 'View & update contact inquiries', to: '/admin/leads', icon: MessageSquare },
          { label: 'Testimonials', desc: 'Add or edit client testimonials', to: '/admin/testimonials', icon: Star },
          { label: 'Site Settings', desc: 'Update site content & contact info', to: '/admin/settings', icon: CheckCircle },
        ].map(({ label, desc, to, icon: Icon }) => (
          <Link key={label} to={to}
            className="bg-navy-800 text-white p-6 hover:bg-navy-700 transition-colors group flex items-start gap-4">
            <Icon size={20} className="text-crimson-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-heading font-bold uppercase tracking-wide text-sm">{label}</p>
              <p className="text-white/40 text-xs mt-1">{desc}</p>
            </div>
            <ArrowRight size={14} className="ml-auto text-white/20 group-hover:text-crimson-400 transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  );
}
