import React, { useState } from 'react';
import { Save, Search, Globe, Share2, Sparkles } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { Button } from '../../components/common/Button';
import { SEO } from '../../components/common/SEO';

export const SEOEditor: React.FC = () => {
  const { siteData, updateSiteConfig } = useContent();
  const { siteConfig } = siteData;

  const [tagline, setTagline] = useState(siteConfig.tagline || '');
  const [description, setDescription] = useState(siteConfig.shortDescription || '');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteConfig({ tagline, shortDescription: description });
  };

  return (
    <div className="space-y-6 w-full max-w-5xl mx-auto">
      <SEO title="SEO & Meta Editor | Admin Panel" />

      {/* Header with Title and Global Save CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider mb-1">
            <Search className="w-4 h-4" />
            <span>Search & Metadata</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
            SEO & Search Engine Optimization
          </h2>
          <p className="text-xs text-slate-500">
            Configure OpenGraph title templates and meta descriptions for search engine indexing.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button variant="primary" size="md" onClick={handleSave} icon={<Save className="w-4 h-4" />}>
            Save SEO Settings
          </Button>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Global Title Tagline / Suffix
            </label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Global Default Meta Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 leading-relaxed"
            />
          </div>
        </div>

        {/* Live Search Engine Result Simulator */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Google Search Snippet Preview
          </label>
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 max-w-2xl">
            <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-1">
              <span className="w-4 h-4 rounded-full bg-emerald-600 flex items-center justify-center text-[0.6rem] text-white font-bold">
                D
              </span>
              <span className="text-slate-800 font-semibold">{siteConfig.brandName}</span>
              <span className="text-slate-400">›</span>
              <span className="text-slate-500">https://drivecraft-academy.in</span>
            </div>
            <div className="text-base font-medium text-blue-800 hover:underline cursor-pointer leading-snug">
              {siteConfig.brandName} | {tagline}
            </div>
            <div className="text-xs text-slate-600 leading-relaxed pt-0.5">
              {description}
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
          <Button variant="primary" size="md" type="submit" icon={<Save className="w-4 h-4" />}>
            Save SEO Metadata
          </Button>
        </div>
      </form>
    </div>
  );
};
