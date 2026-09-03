import React, { useState } from 'react';
import { Save, Sparkles, Globe, Share2, Plus, Trash2 } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { Button } from '../../components/common/Button';
import { SEO } from '../../components/common/SEO';

export const SettingsEditor: React.FC = () => {
  const { siteData, updateSiteConfig } = useContent();
  const { siteConfig } = siteData;

  const [brandName, setBrandName] = useState(siteConfig.brandName || '');
  const [tagline, setTagline] = useState(siteConfig.tagline || '');
  const [shortDescription, setShortDescription] = useState(siteConfig.shortDescription || '');
  const [socialLinks, setSocialLinks] = useState([...siteConfig.socialLinks]);

  const handleSocialChange = (index: number, field: string, value: string) => {
    const updated = [...socialLinks];
    updated[index] = { ...updated[index], [field]: value };
    setSocialLinks(updated);
  };

  const addSocialLink = () => {
    setSocialLinks([
      ...socialLinks,
      { platform: 'youtube', url: 'https://youtube.com', label: 'New Social Channel' },
    ]);
  };

  const removeSocialLink = (index: number) => {
    setSocialLinks(socialLinks.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteConfig({
      brandName,
      tagline,
      shortDescription,
      socialLinks: socialLinks as any,
    });
  };

  return (
    <div className="space-y-6 w-full max-w-5xl mx-auto">
      <SEO title="Site & Brand Settings | Admin Panel" />

      {/* Header with Title and Global Save CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider mb-1">
            <Globe className="w-4 h-4" />
            <span>Identity & Socials</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
            Brand Identity & Social Channels
          </h2>
          <p className="text-xs text-slate-500">
            Configure business legal name, global tagline, footer bio, and social profiles.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button variant="primary" size="md" onClick={handleSubmit} icon={<Save className="w-4 h-4" />}>
            Save Brand Settings
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
        {/* Brand & Identity */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">
            Brand Identity
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Academy Brand Name
              </label>
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Brand Tagline
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Short Description (Used in Footer & Meta Bios)
            </label>
            <textarea
              rows={3}
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 leading-relaxed"
            />
          </div>
        </div>

        {/* Social Media Profiles */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Social Media Channels ({socialLinks.length})
            </h3>
            <button
              type="button"
              onClick={addSocialLink}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-xs hover:bg-emerald-100 flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> Add Channel
            </button>
          </div>

          <div className="space-y-3">
            {socialLinks.map((s, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                  <span className="uppercase">{s.platform} PROFILE</span>
                  <button
                    type="button"
                    onClick={() => removeSocialLink(idx)}
                    className="p-1 text-slate-400 hover:text-red-600 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[0.7rem] font-bold text-slate-600 uppercase mb-1">
                      Platform
                    </label>
                    <select
                      value={s.platform}
                      onChange={(e) => handleSocialChange(idx, 'platform', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold bg-white"
                    >
                      <option value="youtube">YouTube</option>
                      <option value="instagram">Instagram</option>
                      <option value="facebook">Facebook</option>
                      <option value="linkedin">LinkedIn</option>
                      <option value="x">X (Twitter)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[0.7rem] font-bold text-slate-600 uppercase mb-1">
                      Display Label / Topic
                    </label>
                    <input
                      type="text"
                      value={s.label}
                      onChange={(e) => handleSocialChange(idx, 'label', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[0.7rem] font-bold text-slate-600 uppercase mb-1">
                      Profile URL
                    </label>
                    <input
                      type="url"
                      value={s.url}
                      onChange={(e) => handleSocialChange(idx, 'url', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono bg-white"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
          <Button variant="primary" size="md" type="submit" icon={<Save className="w-4 h-4" />}>
            Save Brand Settings
          </Button>
        </div>
      </form>
    </div>
  );
};
