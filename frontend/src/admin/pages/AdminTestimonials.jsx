import { useEffect, useState, useRef } from 'react';
import { Plus, Pencil, Trash2, Star, X, Upload, Loader } from 'lucide-react';
import { testimonialAPI, uploadAPI } from '../../services/api';
import toast from 'react-hot-toast';

const emptyForm = { name: '', role: '', quote: '', rating: 5, isActive: true, order: 0, image: '' };

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef();

  const fetchAll = async () => {
    setLoading(true);
    try {
      const res = await testimonialAPI.getAllAdmin();
      setTestimonials(res.data.data);
    } catch { toast.error('Failed to load testimonials.'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchAll(); }, []);

  const openCreate = () => { setForm(emptyForm); setEditing(null); setShowForm(true); };
  const openEdit = (t) => { setForm({ ...t }); setEditing(t._id); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setEditing(null); setForm(emptyForm); };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const res = await uploadAPI.image(file, 'grit-to-grace/testimonials');
      setForm(f => ({ ...f, image: res.data.url }));
      toast.success('Image uploaded.');
    } catch { toast.error('Image upload failed.'); }
    finally { setUploading(false); }
  };

  const handleSave = async () => {
    if (!form.name || !form.quote || !form.role) return toast.error('Name, role, and quote are required.');
    setSaving(true);
    try {
      if (editing) {
        const res = await testimonialAPI.update(editing, form);
        setTestimonials(t => t.map(x => x._id === editing ? res.data.data : x));
        toast.success('Testimonial updated.');
      } else {
        const res = await testimonialAPI.create(form);
        setTestimonials(t => [res.data.data, ...t]);
        toast.success('Testimonial added.');
      }
      closeForm();
    } catch { toast.error('Save failed.'); }
    finally { setSaving(false); }
  };

  const toggleActive = async (t) => {
    try {
      const res = await testimonialAPI.update(t._id, { isActive: !t.isActive });
      setTestimonials(list => list.map(x => x._id === t._id ? res.data.data : x));
    } catch { toast.error('Update failed.'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this testimonial?')) return;
    try {
      await testimonialAPI.delete(id);
      setTestimonials(t => t.filter(x => x._id !== id));
      toast.success('Deleted.');
    } catch { toast.error('Delete failed.'); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-navy-800 text-3xl font-bold uppercase tracking-wide">Testimonials</h1>
          <p className="text-gray-400 text-sm mt-1">Manage client testimonials displayed on the website</p>
        </div>
        <button onClick={openCreate}
          className="flex items-center gap-2 bg-crimson-500 hover:bg-crimson-600 text-white text-xs font-heading uppercase tracking-wider px-5 py-2.5 transition-colors">
          <Plus size={14} /> Add Testimonial
        </button>
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg shadow-2xl">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-heading font-bold text-navy-800 uppercase tracking-wide">
                {editing ? 'Edit Testimonial' : 'Add Testimonial'}
              </h2>
              <button onClick={closeForm} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-heading uppercase tracking-widest text-gray-500 block mb-1.5">Name *</label>
                  <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-navy-400"
                    placeholder="e.g. Youth Mentee" />
                </div>
                <div>
                  <label className="text-xs font-heading uppercase tracking-widest text-gray-500 block mb-1.5">Role *</label>
                  <input value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
                    className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-navy-400"
                    placeholder="e.g. Youth Program" />
                </div>
              </div>

              <div>
                <label className="text-xs font-heading uppercase tracking-widest text-gray-500 block mb-1.5">Quote *</label>
                <textarea value={form.quote} onChange={e => setForm(f => ({ ...f, quote: e.target.value }))} rows={4}
                  className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-navy-400 resize-none"
                  placeholder="Testimonial quote..." />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-heading uppercase tracking-widest text-gray-500 block mb-1.5">Rating</label>
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(n => (
                      <button key={n} type="button" onClick={() => setForm(f => ({ ...f, rating: n }))}>
                        <Star size={20} className={n <= form.rating ? 'text-gold-400 fill-current' : 'text-gray-300'} />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-heading uppercase tracking-widest text-gray-500 block mb-1.5">Display Order</label>
                  <input type="number" value={form.order} onChange={e => setForm(f => ({ ...f, order: Number(e.target.value) }))}
                    className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-navy-400" />
                </div>
              </div>

              {/* Image upload */}
              <div>
                <label className="text-xs font-heading uppercase tracking-widest text-gray-500 block mb-1.5">Photo (Optional)</label>
                {form.image ? (
                  <div className="flex items-center gap-3">
                    <img src={form.image} alt="Preview" className="w-12 h-12 object-cover rounded-full" />
                    <button onClick={() => setForm(f => ({ ...f, image: '' }))}
                      className="text-crimson-500 text-xs hover:underline">Remove</button>
                  </div>
                ) : (
                  <div>
                    <input type="file" accept="image/*" ref={fileRef} onChange={handleImageUpload} className="hidden" />
                    <button onClick={() => fileRef.current.click()} disabled={uploading}
                      className="flex items-center gap-2 border border-dashed border-gray-300 px-4 py-3 text-sm text-gray-400 hover:border-navy-400 hover:text-navy-600 transition-colors w-full justify-center">
                      {uploading ? <Loader size={14} className="animate-spin" /> : <Upload size={14} />}
                      {uploading ? 'Uploading to Cloudinary...' : 'Upload Photo'}
                    </button>
                  </div>
                )}
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
          <div className="p-10 text-center text-gray-400 text-sm">Loading testimonials...</div>
        ) : testimonials.length === 0 ? (
          <div className="p-12 text-center">
            <Star size={36} className="text-gray-200 mx-auto mb-3" />
            <p className="text-gray-400 text-sm">No testimonials yet. Add your first one.</p>
            <button onClick={openCreate} className="mt-4 btn-primary text-sm">Add Testimonial</button>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {testimonials.map(t => (
              <div key={t._id} className="px-6 py-5 flex items-start gap-5 hover:bg-gray-50 transition-colors">
                {t.image
                  ? <img src={t.image} alt={t.name} className="w-11 h-11 rounded-full object-cover shrink-0" />
                  : <div className="w-11 h-11 bg-crimson-500/10 rounded-full flex items-center justify-center shrink-0">
                      <span className="font-heading text-crimson-500 font-bold">{t.name[0]}</span>
                    </div>
                }
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-heading font-bold text-navy-800 uppercase tracking-wide text-sm">{t.name}</span>
                    <span className="text-crimson-500 text-xs">{t.role}</span>
                    <div className="flex gap-0.5">
                      {[...Array(t.rating)].map((_, i) => <Star key={i} size={12} fill="#f5c842" className="text-gold-400" />)}
                    </div>
                    <span className={`text-xs px-2 py-0.5 font-heading uppercase tracking-wider ${t.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
                      {t.isActive ? 'Active' : 'Hidden'}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mt-1.5 leading-relaxed line-clamp-2">&ldquo;{t.quote}&rdquo;</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => toggleActive(t)} className="p-2 text-gray-400 hover:text-yellow-500 transition-colors" title="Toggle visibility">
                    <Star size={15} className={t.isActive ? 'fill-current text-yellow-400' : ''} />
                  </button>
                  <button onClick={() => openEdit(t)} className="p-2 text-gray-400 hover:text-navy-700 transition-colors">
                    <Pencil size={15} />
                  </button>
                  <button onClick={() => handleDelete(t._id)} className="p-2 text-gray-400 hover:text-crimson-500 transition-colors">
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
