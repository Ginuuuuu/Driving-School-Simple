import React, { useState } from 'react';
import { Save, Sparkles, Plus, Trash2 } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { Button } from '../../components/common/Button';
import { SEO } from '../../components/common/SEO';

export const HomepageEditor: React.FC = () => {
  const { siteData, updateSiteConfig } = useContent();
  const { siteConfig } = siteData;

  const [stats, setStats] = useState([...siteConfig.trustStats]);

  const handleStatChange = (index: number, field: string, val: string) => {
    const updated = [...stats];
    updated[index] = { ...updated[index], [field]: val };
    setStats(updated);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteConfig({ trustStats: stats });
  };

  return (
    <div className="max-w-4xl space-y-8">
      <SEO title="Homepage Content Editor | Admin Panel" />

      <div>
        <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
          Homepage Content & Trust Highlights
        </h2>
        <p className="text-xs text-slate-500">
          Update the trust counters, why choose us metrics, and key marketing copy.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-800 border-b border-slate-100 pb-2">
            Trust Statistics Bar (4 Badges)
          </h3>

          <div className="space-y-4">
            {stats.map((stat, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                <div>
                  <label className="block text-[0.7rem] font-bold text-slate-600 uppercase mb-1">
                    Value / Metric
                  </label>
                  <input
                    type="text"
                    value={stat.value}
                    onChange={(e) => handleStatChange(idx, 'value', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-bold text-emerald-700 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[0.7rem] font-bold text-slate-600 uppercase mb-1">
                    Main Label
                  </label>
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) => handleStatChange(idx, 'label', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-semibold bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[0.7rem] font-bold text-slate-600 uppercase mb-1">
                    Subtext Note
                  </label>
                  <input
                    type="text"
                    value={stat.subtext}
                    onChange={(e) => handleStatChange(idx, 'subtext', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-600 bg-white"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
          <Button variant="primary" size="lg" type="submit" icon={<Save className="w-4 h-4" />}>
            Save Homepage Stats
          </Button>
        </div>
      </form>
    </div>
  );
};
