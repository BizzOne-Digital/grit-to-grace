import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Star, X, DollarSign } from 'lucide-react';
import { packageAPI } from '../../services/api';
import toast from 'react-hot-toast';

const emptyForm = { name: '', price: 0, frequency: '/ month', tagline: '', desc: '', featuresText: '', featured: false, isActive: true, order: 0 };

export default function AdminPricing() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const res = await packageAPI.getAllAdmin();
      setPackages(res.data.data);
    } catch { toast.error('Failed to load packages.'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchAll(); }, []);

  const openCreate = () => { setForm(emptyForm); setEditing(null); setShowForm(true); };
  const openEdit = (p) => { setForm({ ...p, featuresText: (p.features || []).join('\n') }); setEditing(p._id); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setEditing(null); setForm(emptyForm); };

  const handleSave = async () => {
    if (!form.name || !form.price) return toast.error('Name and price are required.');
    const payload = {
      name: form.name,
      price: Number(form.price),
      frequency: form.frequency,
      tagline: form.tagline,
      desc: form.desc,
      features: form.featuresText.split('\n').map(f => f.trim()).filter(Boolean),
      featured: form.featured,
      isActive: form.isActive,
      order: Number(form.order),
    };
    setSaving(true);
    try {
      if (editing) {
        const res = await packageAPI.update(editing, payload);
        setPackages(list => list.map(x => x._id === editing ? res.data.data : x));
        toast.success('Package updated.');
      } else {
        const res = await packageAPI.create(payload);
        setPackages(list => [...list, res.data.data]);
        toast.success('Package added.');
      }
      closeForm();
    } catch { toast.error('Save failed.'); }
    finally { setSaving(false); }
  };

  const toggleActive = async (p) => {
    try {
      const res = await packageAPI.update(p._id, { isActive: !p.isActive });
      setPackages(list => list.map(x => x._id === p._id ? res.data.data : x));
    } catch { toast.error('Update failed.'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this package?')) return;
    try {
      await packageAPI.delete(id);
      setPackages(list => list.filter(x => x._id !== id));
      toast.success('Deleted.');
    } catch { toast.error('Delete failed.'); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-navy-800 text-3xl font-bold uppercase tracking-wide">Mentorship Packages</h1>
          <p className="text-gray-400 text-sm mt-1">Manage pricing packages shown on the Home and Pricing pages</p>
        </div>
        <button onClick={openCreate}
          className="flex items-center gap-2 bg-crimson-500 hover:bg-crimson-600 text-white text-xs font-heading uppercase tracking-wider px-5 py-2.5 transition-colors">
          <Plus size={14} /> Add Package
        </button>
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-heading font-bold text-navy-800 uppercase tracking-wide">
                {editing ? 'Edit Package' : 'Add Package'}
              </h2>
              <button onClick={closeForm} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-heading uppercase tracking-widest text-gray-500 block mb-1.5">Name *</label>
                  <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-navy-400"
                    placeholder="e.g. Foundation" />
                </div>
                <div>
                  <label className="text-xs font-heading uppercase tracking-widest text-gray-500 block mb-1.5">Price (USD) *</label>
                  <input type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                    className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-navy-400"
                    placeholder="75" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-heading uppercase tracking-widest text-gray-500 block mb-1.5">Frequency</label>
                  <input value={form.frequency} onChange={e => setForm(f => ({ ...f, frequency: e.target.value }))}
                    className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-navy-400"
                    placeholder="/ month" />
                </div>
                <div>
                  <label className="text-xs font-heading uppercase tracking-widest text-gray-500 block mb-1.5">Tagline</label>
                  <input value={form.tagline} onChange={e => setForm(f => ({ ...f, tagline: e.target.value }))}
                    className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-navy-400"
                    placeholder="One meeting per month" />
                </div>
              </div>

              <div>
                <label className="text-xs font-heading uppercase tracking-widest text-gray-500 block mb-1.5">Description</label>
                <textarea value={form.desc} onChange={e => setForm(f => ({ ...f, desc: e.target.value }))} rows={3}
                  className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-navy-400 resize-none"
                  placeholder="Package description..." />
              </div>

              <div>
                <label className="text-xs font-heading uppercase tracking-widest text-gray-500 block mb-1.5">Features (one per line)</label>
                <textarea value={form.featuresText} onChange={e => setForm(f => ({ ...f, featuresText: e.target.value }))} rows={5}
                  className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-navy-400 resize-none"
                  placeholder={'1 mentorship meeting/month\nGoal identification\nAccountability check-in'} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="featured" checked={form.featured} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))}
                    className="accent-crimson-500" />
                  <label htmlFor="featured" className="text-sm text-gray-600">Mark as &quot;Most Popular&quot;</label>
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
          <div className="p-10 text-center text-gray-400 text-sm">Loading packages...</div>
        ) : packages.length === 0 ? (
          <div className="p-12 text-center">
            <DollarSign size={36} className="text-gray-200 mx-auto mb-3" />
            <p className="text-gray-400 text-sm">No packages yet. Add your first one.</p>
            <button onClick={openCreate} className="mt-4 btn-primary text-sm">Add Package</button>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {packages.map(p => (
              <div key={p._id} className="px-6 py-5 flex items-start gap-5 hover:bg-gray-50 transition-colors">
                <div className="w-11 h-11 bg-crimson-500/10 flex items-center justify-center shrink-0">
                  <span className="font-heading text-crimson-500 font-bold text-sm">${p.price}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-heading font-bold text-navy-800 uppercase tracking-wide text-sm">{p.name}</span>
                    <span className="text-crimson-500 text-xs">{p.tagline}</span>
                    {p.featured && (
                      <span className="text-xs px-2 py-0.5 font-heading uppercase tracking-wider bg-gold-400/20 text-gold-500">Most Popular</span>
                    )}
                    <span className={`text-xs px-2 py-0.5 font-heading uppercase tracking-wider ${p.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
                      {p.isActive ? 'Active' : 'Hidden'}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mt-1.5 leading-relaxed line-clamp-2">{p.desc}</p>
                  <p className="text-gray-400 text-xs mt-1">{(p.features || []).length} feature(s)</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => toggleActive(p)} className="p-2 text-gray-400 hover:text-yellow-500 transition-colors" title="Toggle visibility">
                    <Star size={15} className={p.isActive ? 'fill-current text-yellow-400' : ''} />
                  </button>
                  <button onClick={() => openEdit(p)} className="p-2 text-gray-400 hover:text-navy-700 transition-colors">
                    <Pencil size={15} />
                  </button>
                  <button onClick={() => handleDelete(p._id)} className="p-2 text-gray-400 hover:text-crimson-500 transition-colors">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
