import { useEffect, useState, useRef } from 'react';
import { Save, Upload, Loader, CheckCircle } from 'lucide-react';
import { settingsAPI, uploadAPI } from '../../services/api';
import toast from 'react-hot-toast';

const TABS = ['General', 'Hero', 'Contact Info', 'Social'];

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('General');
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState({});
  const logoRef = useRef();
  const heroRef = useRef();

  useEffect(() => {
    settingsAPI.get()
      .then(res => {
        // Merge with defaults so fields are pre-filled
        setSettings({
          site_name: 'Grit to Grace Mentorship',
          site_tagline: 'Strengthened by Grit. Led by Grace.',
          hero_headline_1: 'YOUR PAST DOESN\'T DEFINE YOU.',
          hero_headline_2: 'YOUR NEXT STEPS DO.',
          hero_subtext: 'We walk alongside youth, veterans, individuals in recovery, and families through mentorship, support, and guidance to build confidence, discover purpose, and move forward.',
          hero_image: '',
          contact_name: 'David Arenas',
          contact_phone: '832-856-2254',
          contact_email: 'GTGMentorship@gmail.com',
          contact_address: 'Texas, USA',
          facebook_url: 'https://www.facebook.com/GTGMentorship',
          site_logo: '',
          ...res.data.data
        });
      })
      .catch(() => toast.error('Failed to load settings.'))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (key, value) => setSettings(s => ({ ...s, [key]: value }));

  const handleImageUpload = async (key, file, folder = 'grit-to-grace/site') => {
    if (!file) return;
    setUploading(u => ({ ...u, [key]: true }));
    try {
      const res = await uploadAPI.image(file, folder);
      handleChange(key, res.data.url);
      toast.success('Image uploaded to Cloudinary.');
    } catch { toast.error('Upload failed.'); }
    finally { setUploading(u => ({ ...u, [key]: false })); }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await settingsAPI.update(settings);
      toast.success('Settings saved successfully.');
    } catch { toast.error('Failed to save settings.'); }
    finally { setSaving(false); }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <Loader size={24} className="animate-spin text-crimson-500" />
    </div>
  );

  const InputField = ({ label, settingKey, type = 'text', placeholder = '' }) => (
    <div>
      <label className="text-xs font-heading uppercase tracking-widest text-gray-500 block mb-1.5">{label}</label>
      <input type={type} value={settings[settingKey] || ''} onChange={e => handleChange(settingKey, e.target.value)}
        placeholder={placeholder}
        className="w-full border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-navy-400 transition-colors" />
    </div>
  );

  const TextareaField = ({ label, settingKey, rows = 3 }) => (
    <div>
      <label className="text-xs font-heading uppercase tracking-widest text-gray-500 block mb-1.5">{label}</label>
      <textarea value={settings[settingKey] || ''} onChange={e => handleChange(settingKey, e.target.value)} rows={rows}
        className="w-full border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-navy-400 transition-colors resize-none" />
    </div>
  );

  const ImageUploadField = ({ label, settingKey, inputRef, folder }) => (
    <div>
      <label className="text-xs font-heading uppercase tracking-widest text-gray-500 block mb-1.5">{label}</label>
      {settings[settingKey] ? (
        <div className="flex items-center gap-4">
          <img src={settings[settingKey]} alt={label} className="h-14 w-auto object-contain border border-gray-200 p-1" />
          <div className="space-y-1">
            <button onClick={() => inputRef.current.click()}
              className="text-xs text-navy-600 hover:text-crimson-500 transition-colors block">Replace Image</button>
            <button onClick={() => handleChange(settingKey, '')}
              className="text-xs text-crimson-500 hover:underline block">Remove</button>
          </div>
        </div>
      ) : (
        <button onClick={() => inputRef.current.click()} disabled={uploading[settingKey]}
          className="flex items-center gap-2 border border-dashed border-gray-300 px-5 py-3 text-sm text-gray-400 hover:border-navy-400 hover:text-navy-600 transition-colors w-full justify-center">
          {uploading[settingKey] ? <Loader size={14} className="animate-spin" /> : <Upload size={14} />}
          {uploading[settingKey] ? 'Uploading...' : `Upload ${label}`}
        </button>
      )}
      <input type="file" accept="image/*" ref={inputRef} className="hidden"
        onChange={e => handleImageUpload(settingKey, e.target.files[0], folder)} />
    </div>
  );

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-navy-800 text-3xl font-bold uppercase tracking-wide">Site Settings</h1>
          <p className="text-gray-400 text-sm mt-1">Update website content and configuration</p>
        </div>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 bg-crimson-500 hover:bg-crimson-600 text-white text-xs font-heading uppercase tracking-wider px-5 py-2.5 transition-colors disabled:opacity-60">
          {saving ? <Loader size={14} className="animate-spin" /> : <Save size={14} />}
          {saving ? 'Saving...' : 'Save All'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-gray-200">
        {TABS.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 text-xs font-heading uppercase tracking-wider transition-colors
            ${activeTab === tab ? 'border-b-2 border-crimson-500 text-crimson-500' : 'text-gray-400 hover:text-navy-700'}`}>
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white shadow-sm border border-gray-100 p-7 space-y-6">
        {activeTab === 'General' && (
          <>
            <h3 className="font-heading font-bold text-navy-700 uppercase tracking-wide text-sm pb-3 border-b border-gray-100">General Information</h3>
            <InputField label="Site Name" settingKey="site_name" />
            <InputField label="Tagline" settingKey="site_tagline" />
            <ImageUploadField label="Site Logo" settingKey="site_logo" inputRef={logoRef} folder="grit-to-grace/logo" />
          </>
        )}

        {activeTab === 'Hero' && (
          <>
            <h3 className="font-heading font-bold text-navy-700 uppercase tracking-wide text-sm pb-3 border-b border-gray-100">Hero Section</h3>
            <InputField label="Headline Line 1" settingKey="hero_headline_1" placeholder="YOUR PAST DOESN'T DEFINE YOU." />
            <InputField label="Headline Line 2" settingKey="hero_headline_2" placeholder="YOUR NEXT STEPS DO." />
            <TextareaField label="Hero Subtext" settingKey="hero_subtext" rows={4} />
            <ImageUploadField label="Hero Background Image" settingKey="hero_image" inputRef={heroRef} folder="grit-to-grace/hero" />
          </>
        )}

        {activeTab === 'Contact Info' && (
          <>
            <h3 className="font-heading font-bold text-navy-700 uppercase tracking-wide text-sm pb-3 border-b border-gray-100">Contact Information</h3>
            <InputField label="Contact Name" settingKey="contact_name" />
            <InputField label="Phone Number" settingKey="contact_phone" placeholder="832-856-2254" />
            <InputField label="Email Address" settingKey="contact_email" type="email" placeholder="GTGMentorship@gmail.com" />
            <InputField label="Location / Address" settingKey="contact_address" placeholder="Texas, USA" />
          </>
        )}

        {activeTab === 'Social' && (
          <>
            <h3 className="font-heading font-bold text-navy-700 uppercase tracking-wide text-sm pb-3 border-b border-gray-100">Social Media Links</h3>
            <InputField label="Facebook Page URL" settingKey="facebook_url" placeholder="https://www.facebook.com/GTGMentorship" />
            <InputField label="Instagram URL (optional)" settingKey="instagram_url" />
            <InputField label="YouTube URL (optional)" settingKey="youtube_url" />
          </>
        )}

        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-gray-400 text-xs">Changes are saved to the database and reflected on the live site.</p>
          <button onClick={handleSave} disabled={saving}
            className="flex items-center gap-2 bg-navy-800 hover:bg-navy-700 text-white text-xs font-heading uppercase tracking-wider px-5 py-2.5 transition-colors disabled:opacity-60">
            {saving ? <Loader size={12} className="animate-spin" /> : <CheckCircle size={12} />}
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
