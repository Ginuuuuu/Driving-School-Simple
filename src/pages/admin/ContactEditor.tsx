import React, { useState } from 'react';
import { Save, MapPin, Plus, Trash2 } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { Button } from '../../components/common/Button';
import { SEO } from '../../components/common/SEO';

export const ContactEditor: React.FC = () => {
  const { siteData, updateSiteConfig } = useContent();
  const { siteConfig } = siteData;

  const [branches, setBranches] = useState([...siteConfig.branches]);
  const [serviceCitiesStr, setServiceCitiesStr] = useState(siteConfig.serviceCities.join(', '));

  const handleBranchChange = (index: number, field: string, value: string) => {
    const updated = [...branches];
    updated[index] = { ...updated[index], [field]: value };
    setBranches(updated);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const cities = serviceCitiesStr.split(',').map((c) => c.trim()).filter(Boolean);
    updateSiteConfig({ branches, serviceCities: cities });
  };

  return (
    <div className="max-w-4xl space-y-8">
      <SEO title="Locations & Branches Editor | Admin Panel" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
            Training Hubs & Service Locations
          </h2>
          <p className="text-xs text-slate-500">
            Manage training branch addresses and service cities for doorstep pickup.
          </p>
        </div>

        <Button variant="primary" size="md" onClick={handleSave} icon={<Save className="w-4 h-4" />}>
          Save Location Settings
        </Button>
      </div>

      <form onSubmit={handleSave} className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
            Service Cities (Comma-separated)
          </label>
          <input
            type="text"
            value={serviceCitiesStr}
            onChange={(e) => setServiceCitiesStr(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
          <p className="text-[0.7rem] text-slate-500 mt-1">e.g. Delhi NCR, Bengaluru, Mumbai, Pune, Hyderabad</p>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-800">
            Branch Addresses ({branches.length})
          </h3>

          {branches.map((b, idx) => (
            <div key={b.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[0.7rem] font-bold text-slate-600 uppercase mb-1">Branch Name</label>
                  <input
                    type="text"
                    value={b.name}
                    onChange={(e) => handleBranchChange(idx, 'name', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-semibold bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[0.7rem] font-bold text-slate-600 uppercase mb-1">City</label>
                  <input
                    type="text"
                    value={b.city}
                    onChange={(e) => handleBranchChange(idx, 'city', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[0.7rem] font-bold text-slate-600 uppercase mb-1">Full Street Address</label>
                <input
                  type="text"
                  value={b.address}
                  onChange={(e) => handleBranchChange(idx, 'address', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm bg-white"
                />
              </div>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};
