import React, { useState } from 'react';
import { Save, Search, Globe } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { Button } from '../../components/common/Button';
import { SEO } from '../../components/common/SEO';

export const SEOEditor: React.FC = () => {
  const { siteData, updateSiteConfig } = useContent();
  const { siteConfig } = siteData;

  const [tagline, setTagline] = useState(siteConfig.tagline);
  const [description, setDescription] = useState(siteConfig.shortDescription);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteConfig({ tagline, shortDescription: description });
  };

  return (
    <div className="max-w-4xl space-y-8">
      <SEO title="SEO Metadata Editor | Admin Panel" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
            SEO & Search Engine Metadata
          </h2>
          <p className="text-xs text-slate-500">
            Configure OpenGraph title templates and meta descriptions for search engine indexing.
          </p>
        </div>

        <Button variant="primary" size="md" onClick={handleSave} icon={<Save className="w-4 h-4" />}>
          Save SEO Meta
        </Button>
      </div>

      <form onSubmit={handleSave} className="space-y-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
            Global Title Suffix / Tagline
          </label>
          <input
            type="text"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
            Default Meta Description
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none"
          />
        </div>

        {/* Google Search Result Preview */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
          <span className="text-[0.65rem] uppercase font-bold text-slate-500">Google SERP Preview:</span>
          <div className="text-sm font-semibold text-blue-800 line-clamp-1">
            {siteConfig.brandName} | {tagline}
          </div>
          <div className="text-xs text-emerald-800">
            https://drivecraft-academy.vercel.app
          </div>
          <div className="text-xs text-slate-600 line-clamp-2">
            {description}
          </div>
        </div>
      </form>
    </div>
  );
};
