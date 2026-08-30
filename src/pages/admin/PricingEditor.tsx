import React, { useState } from 'react';
import { Save, CreditCard, Edit2 } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { PricingPackage, PricingAddOn } from '../../types';
import { Button } from '../../components/common/Button';
import { SEO } from '../../components/common/SEO';

export const PricingEditor: React.FC = () => {
  const { siteData, updatePricingPackages } = useContent();
  const { pricing } = siteData;

  const [packages, setPackages] = useState([...pricing.packages]);

  const handlePriceChange = (index: number, price: number, orig?: number) => {
    const updated = [...packages];
    updated[index] = { ...updated[index], price, originalPrice: orig };
    setPackages(updated);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updatePricingPackages(packages);
  };

  return (
    <div className="max-w-4xl space-y-8">
      <SEO title="Pricing Packages Editor | Admin Panel" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
            Pricing Packages & Rates Editor
          </h2>
          <p className="text-xs text-slate-500">
            Update package prices, discounts, and duration hours.
          </p>
        </div>

        <Button variant="primary" size="md" onClick={handleSave} icon={<Save className="w-4 h-4" />}>
          Save Pricing Changes
        </Button>
      </div>

      <div className="space-y-4">
        {packages.map((pkg, idx) => (
          <div key={pkg.id} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">{pkg.name}</h3>
                <p className="text-xs text-slate-500">{pkg.tagline}</p>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                {pkg.durationHours} Hours • {pkg.sessionsCount} Sessions
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Active Price (₹)
                </label>
                <input
                  type="number"
                  value={pkg.price}
                  onChange={(e) => handlePriceChange(idx, parseInt(e.target.value, 10) || 0, pkg.originalPrice)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-bold text-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Original Strikethrough Price (₹)
                </label>
                <input
                  type="number"
                  value={pkg.originalPrice || ''}
                  onChange={(e) => handlePriceChange(idx, pkg.price, parseInt(e.target.value, 10) || undefined)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
