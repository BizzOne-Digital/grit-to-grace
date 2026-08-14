import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Star, X, Compass } from 'lucide-react';
import { serviceAPI } from '../../services/api';
import { getIcon, iconOptions } from '../../utils/iconMap';
import toast from 'react-hot-toast';

const emptyForm = { icon: 'User', title: '', desc: '', details: '', audience: '', isActive: true, order: 0 };

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const res = await serviceAPI.getAllAdmin();
      setServices(res.data.data);
    } catch { toast.error('Failed to load services.'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchAll(); }, []);

  const openCreate = () => { setForm(emptyForm); setEditing(null); setShowForm(true); };
  const openEdit = (s) => { setForm({ ...s }); setEditing(s._id); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setEditing(null); setForm(emptyForm); };

  const handleSave = async () => {
    if (!form.title || !form.desc) return toast.error('Title and short description are required.');
    setSaving(true);
    try {
      if (editing) {
        const res = await serviceAPI.update(editing, form);
        setServices(list => list.map(x => x._id === editing ? res.data.data : x));
        toast.success('Service updated.');
      } else {
        const res = await serviceAPI.create(form);
        setServices(list => [...list, res.data.data]);
        toast.success('Service added.');
      }
      closeForm();
    } catch { toast.error('Save failed.'); }
    finally { setSaving(false); }
  };

  const toggleActive = async (s) => {
    try {
      const res = await serviceAPI.update(s._id, { isActive: !s.isActive });
      setServices(list => list.map(x => x._id === s._id ? res.data.data : x));
    } catch { toast.error('Update failed.'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this service?')) return;
    try {
      await serviceAPI.delete(id);
      setServices(list => list.filter(x => x._id !== id));
      toast.success('Deleted.');
    } catch { toast.error('Delete failed.'); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-navy-800 text-3xl font-bold uppercase tracking-wide">Services</h1>
          <p className="text-gray-400 text-sm mt-1">Manage the services shown on the Home and Services pages</p>
        </div>
        <button onClick={openCreate}
          className="flex items-center gap-2 bg-crimson-500 hover:bg-crimson-600 text-white text-xs font-heading uppercase tracking-wider px-5 py-2.5 transition-colors">
          <Plus size={14} /> Add Service
        </button>
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-heading font-bold text-navy-800 uppercase tracking-wide">
                {editing ? 'Edit Service' : 'Add Service'}
              </h2>
              <button onClick={closeForm} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs font-heading uppercase tracking-widest text-gray-500 block mb-1.5">Icon</label>
                <div className="flex flex-wrap gap-2">
                  {iconOptions.map(name => {
                    const Icon = getIcon(name);
                    return (
                      <button key={name} type="button" onClick={() => setForm(f => ({ ...f, icon: name }))}
                        className={`w-10 h-10 flex items-center justify-center border transition-colors ${form.icon === name ? 'bg-crimson-500 border-crimson-500 text-white' : 'border-gray-200 text-gray-400 hover:border-navy-400'}`}>
                        <Icon size={16} />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-xs font-heading uppercase tracking-widest text-gray-500 block mb-1.5">Title *</label>
                <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-navy-400"
                  placeholder="e.g. One-on-One Mentorship" />
              </div>

              <div>
                <label className="text-xs font-heading uppercase tracking-widest text-gray-500 block mb-1.5">Short Description *</label>
                <textarea value={form.desc} onChange={e => setForm(f => ({ ...f, desc: e.target.value }))} rows={2}
                  className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-navy-400 resize-none"
                  placeholder="Shown on the homepage card..." />
              </div>

              <div>
                <label className="text-xs font-heading uppercase tracking-widest text-gray-500 block mb-1.5">Full Details</label>
                <textarea value={form.details} onChange={e => setForm(f => ({ ...f, details: e.target.value }))} rows={3}
                  className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-navy-400 resize-none"
                  placeholder="Shown on the Services page..." />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-heading uppercase tracking-widest text-gray-500 block mb-1.5">Audience</label>
                  <input value={form.audience} onChange={e => setForm(f => ({ ...f, audience: e.target.value }))}
                    className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-navy-400"
                    placeholder="e.g. Youth & teenagers" />
                </div>
                <div>
                  <label className="text-xs font-heading uppercase tracking-widest text-gray-500 block mb-1.5">Display Order</label>
                  <input type="number" value={form.order} onChange={e => setForm(f => ({ ...f, order: Number(e.target.value) }))}
                    className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-navy-400" />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input type="checkbox" id="isActive" checked={form.isActive} onChange={e => setForm(f => ({ ...f, isActive: e.target.checked }))}
                  className="accent-crimson-500" />
                <label htmlFor="isActive" className="text-sm text-gray-600">Show on website</label>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex gap-3 justify-end">
              <button onClick={closeForm} className="px-5 py-2 text-sm text-gray-500 hover:text-gray-700 font-heading uppercase tracking-wider">Cancel</button>
              <button onClick={handleSave} disabled={saving}
                className="px-6 py-2 bg-crimson-500 hover:bg-crimson-600 text-white text-sm font-heading uppercase tracking-wider transition-colors disabled:opacity-50">
                {saving ? 'Saving...' : editing ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* List */}
      <div className="bg-white shadow-sm border border-gray-100">
        {loading ? (
          <div className="p-10 text-center text-gray-400 text-sm">Loading services...</div>
        ) : services.length === 0 ? (
          <div className="p-12 text-center">
            <Compass size={36} className="text-gray-200 mx-auto mb-3" />
            <p className="text-gray-400 text-sm">No services yet. Add your first one.</p>
            <button onClick={openCreate} className="mt-4 btn-primary text-sm">Add Service</button>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {services.map(s => {
              const Icon = getIcon(s.icon);
              return (
                <div key={s._id} className="px-6 py-5 flex items-start gap-5 hover:bg-gray-50 transition-colors">
                  <div className="w-11 h-11 bg-crimson-500/10 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-crimson-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-heading font-bold text-navy-800 uppercase tracking-wide text-sm">{s.title}</span>
                      {s.audience && <span className="text-crimson-500 text-xs">{s.audience}</span>}
                      <span className={`text-xs px-2 py-0.5 font-heading uppercase tracking-wider ${s.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
                        {s.isActive ? 'Active' : 'Hidden'}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm mt-1.5 leading-relaxed line-clamp-2">{s.desc}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button onClick={() => toggleActive(s)} className="p-2 text-gray-400 hover:text-yellow-500 transition-colors" title="Toggle visibility">
                      <Star size={15} className={s.isActive ? 'fill-current text-yellow-400' : ''} />
                    </button>
                    <button onClick={() => openEdit(s)} className="p-2 text-gray-400 hover:text-navy-700 transition-colors">
                      <Pencil size={15} />
                    </button>
                    <button onClick={() => handleDelete(s._id)} className="p-2 text-gray-400 hover:text-crimson-500 transition-colors">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
