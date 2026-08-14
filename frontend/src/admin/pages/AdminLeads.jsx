import { useEffect, useState } from 'react';
import { Trash2, ChevronDown, Search, Eye, X } from 'lucide-react';
import { contactAPI } from '../../services/api';
import toast from 'react-hot-toast';

const STATUS_OPTIONS = ['new', 'contacted', 'closed'];

const statusStyle = (s) => ({
  new: 'bg-crimson-100 text-crimson-600',
  contacted: 'bg-yellow-100 text-yellow-700',
  closed: 'bg-green-100 text-green-700',
}[s] || 'bg-gray-100 text-gray-500');

export default function AdminLeads() {
  const [leads, setLeads] = useState([]);
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [notes, setNotes] = useState('');

  const fetchLeads = async (status = '') => {
    setLoading(true);
    try {
      const res = await contactAPI.getAll(status || undefined);
      setLeads(res.data.data);
      setCounts(res.data.counts);
    } catch { toast.error('Failed to load leads.'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchLeads(filter); }, [filter]);

  const updateStatus = async (id, status) => {
    try {
      await contactAPI.update(id, { status });
      setLeads(l => l.map(x => x._id === id ? { ...x, status } : x));
      if (selected?._id === id) setSelected(s => ({ ...s, status }));
      toast.success('Status updated.');
    } catch { toast.error('Update failed.'); }
  };

  const saveNotes = async () => {
    try {
      await contactAPI.update(selected._id, { notes });
      setLeads(l => l.map(x => x._id === selected._id ? { ...x, notes } : x));
      toast.success('Notes saved.');
    } catch { toast.error('Failed to save notes.'); }
  };

  const deleteLead = async (id) => {
    if (!window.confirm('Delete this lead?')) return;
    try {
      await contactAPI.delete(id);
      setLeads(l => l.filter(x => x._id !== id));
      if (selected?._id === id) setSelected(null);
      toast.success('Deleted.');
    } catch { toast.error('Delete failed.'); }
  };

  const filtered = leads.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-navy-800 text-3xl font-bold uppercase tracking-wide">Leads & Contacts</h1>
        <p className="text-gray-400 text-sm mt-1">Manage all contact form submissions and inquiries</p>
      </div>

      {/* Count tabs */}
      <div className="flex flex-wrap gap-2">
        {[['', 'All', counts.total], ['new', 'New', counts.new], ['contacted', 'In Progress', counts.contacted], ['closed', 'Closed', counts.closed]].map(([val, label, count]) => (
          <button key={val} onClick={() => setFilter(val)}
            className={`px-4 py-2 text-xs font-heading uppercase tracking-wider transition-all duration-200 flex items-center gap-2
            ${filter === val ? 'bg-navy-800 text-white' : 'bg-white border border-gray-200 text-gray-500 hover:border-navy-300'}`}>
            {label} <span className={`px-1.5 py-0.5 text-xs ${filter === val ? 'bg-white/20 text-white' : 'bg-gray-100'}`}>{count ?? 0}</span>
          </button>
        ))}
      </div>

      <div className="flex gap-4 flex-col sm:flex-row">
        {/* Table */}
        <div className="flex-1 bg-white shadow-sm border border-gray-100 overflow-hidden">
          {/* Search */}
          <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-3">
            <Search size={14} className="text-gray-400 shrink-0" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by name or email..."
              className="flex-1 text-sm outline-none text-gray-600 placeholder:text-gray-300" />
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-10 text-center text-gray-400 text-sm">Loading leads...</div>
            ) : filtered.length === 0 ? (
              <div className="p-10 text-center text-gray-400 text-sm">No leads found.</div>
            ) : (
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    {['Name', 'Email', 'Service', 'Date', 'Status', 'Actions'].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-heading uppercase tracking-widest text-gray-400">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map(lead => (
                    <tr key={lead._id}
                      className={`hover:bg-gray-50 cursor-pointer transition-colors ${selected?._id === lead._id ? 'bg-crimson-50' : ''}`}>
                      <td className="px-4 py-3 font-medium text-navy-800 whitespace-nowrap">{lead.name}</td>
                      <td className="px-4 py-3 text-gray-500 text-xs">{lead.email}</td>
                      <td className="px-4 py-3 text-gray-400 text-xs max-w-[120px] truncate">{lead.interestedIn || '—'}</td>
                      <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">
                        {new Date(lead.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </td>
                      <td className="px-4 py-3">
                        <select value={lead.status} onClick={e => e.stopPropagation()}
                          onChange={e => updateStatus(lead._id, e.target.value)}
                          className={`text-xs font-heading uppercase tracking-wider px-2 py-1 border-0 outline-none cursor-pointer ${statusStyle(lead.status)}`}>
                          {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button onClick={() => { setSelected(lead); setNotes(lead.notes || ''); }}
                            className="text-gray-400 hover:text-navy-700 transition-colors p-1">
                            <Eye size={14} />
                          </button>
                          <button onClick={() => deleteLead(lead._id)}
                            className="text-gray-400 hover:text-crimson-500 transition-colors p-1">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="w-full sm:w-80 bg-white shadow-sm border border-gray-100 flex flex-col shrink-0">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <p className="font-heading font-bold text-navy-800 uppercase text-sm">Lead Detail</p>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600"><X size={16} /></button>
            </div>
            <div className="p-5 space-y-4 flex-1 overflow-y-auto">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Name</p>
                <p className="font-medium text-navy-800">{selected.name}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Email</p>
                <a href={`mailto:${selected.email}`} className="text-crimson-500 text-sm hover:underline">{selected.email}</a>
              </div>
              {selected.phone && (
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Phone</p>
                  <a href={`tel:${selected.phone}`} className="text-crimson-500 text-sm hover:underline">{selected.phone}</a>
                </div>
              )}
              {selected.interestedIn && (
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Interested In</p>
                  <p className="text-sm text-navy-700">{selected.interestedIn}</p>
                </div>
              )}
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Message</p>
                <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-3">{selected.message}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Status</p>
                <select value={selected.status} onChange={e => updateStatus(selected._id, e.target.value)}
                  className={`text-xs font-heading uppercase tracking-wider px-3 py-1.5 border border-gray-200 outline-none cursor-pointer w-full ${statusStyle(selected.status)}`}>
                  {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Internal Notes</p>
                <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={4}
                  className="w-full border border-gray-200 text-sm p-3 outline-none focus:border-navy-400 resize-none"
                  placeholder="Add your notes here..." />
                <button onClick={saveNotes}
                  className="mt-2 w-full bg-navy-800 text-white text-xs font-heading uppercase tracking-wider py-2 hover:bg-navy-700 transition-colors">
                  Save Notes
                </button>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Received</p>
                <p className="text-sm text-gray-500">
                  {new Date(selected.createdAt).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>
            <div className="p-5 border-t border-gray-100">
              <button onClick={() => deleteLead(selected._id)}
                className="w-full flex items-center justify-center gap-2 text-crimson-500 hover:bg-crimson-50 py-2 text-xs font-heading uppercase tracking-wider transition-colors">
                <Trash2 size={14} /> Delete Lead
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
