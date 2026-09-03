import React, { useState } from 'react';
import {
  Save,
  CreditCard,
  Plus,
  Trash2,
  CheckCircle2,
  XCircle,
  Sparkles,
  Layers,
} from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { PricingPackage, PricingAddOn } from '../../types';
import { Button } from '../../components/common/Button';
import { SEO } from '../../components/common/SEO';

export const PricingEditor: React.FC = () => {
  const { siteData, updatePricingPackages, updatePricingAddOns } = useContent();
  const { pricing } = siteData;

  const [activeTab, setActiveTab] = useState<'packages' | 'addons'>('packages');
  const [packages, setPackages] = useState<PricingPackage[]>([...pricing.packages]);
  const [addOns, setAddOns] = useState<PricingAddOn[]>([...pricing.addOns]);

  const handlePackageChange = (index: number, field: keyof PricingPackage, value: any) => {
    const updated = [...packages];
    updated[index] = { ...updated[index], [field]: value };
    setPackages(updated);
  };

  const handleFeatureIncludedChange = (pkgIdx: number, featIdx: number, val: string) => {
    const updated = [...packages];
    const feats = [...updated[pkgIdx].featuresIncluded];
    feats[featIdx] = val;
    updated[pkgIdx].featuresIncluded = feats;
    setPackages(updated);
  };

  const addFeatureIncluded = (pkgIdx: number) => {
    const updated = [...packages];
    updated[pkgIdx].featuresIncluded = [...updated[pkgIdx].featuresIncluded, 'New Included Feature Benefit'];
    setPackages(updated);
  };

  const removeFeatureIncluded = (pkgIdx: number, featIdx: number) => {
    const updated = [...packages];
    updated[pkgIdx].featuresIncluded = updated[pkgIdx].featuresIncluded.filter((_, i) => i !== featIdx);
    setPackages(updated);
  };

  const handleAddOnChange = (index: number, field: keyof PricingAddOn, value: any) => {
    const updated = [...addOns];
    updated[index] = { ...updated[index], [field]: value };
    setAddOns(updated);
  };

  const addAddOn = () => {
    const newAddOn: PricingAddOn = {
      id: `addon-${Date.now()}`,
      title: 'New Add-On Service',
      description: 'Description of supplementary service...',
      price: 999,
      perUnit: 'per session',
      badge: 'Optional',
    };
    setAddOns([...addOns, newAddOn]);
  };

  const removeAddOn = (index: number) => {
    setAddOns(addOns.filter((_, i) => i !== index));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updatePricingPackages(packages);
    updatePricingAddOns(addOns);
  };

  return (
    <div className="space-y-6 w-full max-w-5xl mx-auto">
      <SEO title="Pricing & Packages Editor | Admin Panel" />

      {/* Header with Title and Global Save CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider mb-1">
            <CreditCard className="w-4 h-4" />
            <span>Page Content Editor</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
            Pricing Packages & Add-On Services
          </h2>
          <p className="text-xs text-slate-500">
            Configure tiered course packages, original/discount prices, inclusions, and add-on services.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button variant="primary" size="md" onClick={handleSave} icon={<Save className="w-4 h-4" />}>
            Save All Pricing Data
          </Button>
        </div>
      </div>

      {/* Tabbed Navigation Bar */}
      <div className="flex items-center gap-2 overflow-x-auto p-1.5 bg-slate-200/60 rounded-2xl border border-slate-200">
        <button
          onClick={() => setActiveTab('packages')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'packages'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
          Course Packages ({packages.length})
        </button>

        <button
          onClick={() => setActiveTab('addons')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'addons'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          Add-On Services ({addOns.length})
        </button>
      </div>

      {/* TAB 1: PACKAGES */}
      {activeTab === 'packages' && (
        <form onSubmit={handleSave} className="space-y-5">
          {packages.map((pkg, idx) => (
            <div key={pkg.id} className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5">
              <div className="flex flex-wrap items-center justify-between border-b border-slate-100 pb-3 gap-2">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 inline-block mb-1">
                    Tier #{idx + 1} • {pkg.badge || 'Standard'}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold font-display text-slate-900">
                    {pkg.name}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                    <input
                      type="checkbox"
                      checked={pkg.popular || false}
                      onChange={(e) => handlePackageChange(idx, 'popular', e.target.checked)}
                      className="rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>Highlight as Popular</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Package Name
                  </label>
                  <input
                    type="text"
                    value={pkg.name}
                    onChange={(e) => handlePackageChange(idx, 'name', e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={pkg.tagline}
                    onChange={(e) => handlePackageChange(idx, 'tagline', e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Badge Text (e.g. Most Popular)
                  </label>
                  <input
                    type="text"
                    value={pkg.badge || ''}
                    onChange={(e) => handlePackageChange(idx, 'badge', e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Active Offer Price (₹)
                  </label>
                  <input
                    type="number"
                    value={pkg.price}
                    onChange={(e) => handlePackageChange(idx, 'price', parseInt(e.target.value, 10) || 0)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-sm font-bold text-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Original Price (₹ Strikethrough)
                  </label>
                  <input
                    type="number"
                    value={pkg.originalPrice || ''}
                    onChange={(e) => handlePackageChange(idx, 'originalPrice', parseInt(e.target.value, 10) || undefined)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-sm text-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Ideal For Persona
                  </label>
                  <input
                    type="text"
                    value={pkg.idealFor}
                    onChange={(e) => handlePackageChange(idx, 'idealFor', e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Total Duration (Hours)
                  </label>
                  <input
                    type="number"
                    value={pkg.durationHours}
                    onChange={(e) => handlePackageChange(idx, 'durationHours', parseInt(e.target.value, 10) || 0)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Number of Sessions
                  </label>
                  <input
                    type="number"
                    value={pkg.sessionsCount}
                    onChange={(e) => handlePackageChange(idx, 'sessionsCount', parseInt(e.target.value, 10) || 0)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold"
                  />
                </div>

                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={pkg.emiAvailable}
                      onChange={(e) => handlePackageChange(idx, 'emiAvailable', e.target.checked)}
                      className="rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>0% Interest EMI Available</span>
                  </label>
                </div>
              </div>

              {/* Features Included */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Included Features & Perks ({pkg.featuresIncluded.length})
                  </label>
                  <button
                    type="button"
                    onClick={() => addFeatureIncluded(idx)}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Perk
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {pkg.featuresIncluded.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={feat}
                        onChange={(e) => handleFeatureIncludedChange(idx, fIdx, e.target.value)}
                        className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900"
                      />
                      <button
                        type="button"
                        onClick={() => removeFeatureIncluded(idx, fIdx)}
                        className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          <div className="pt-4 flex justify-end">
            <Button variant="primary" size="md" type="submit" icon={<Save className="w-4 h-4" />}>
              Save Package Rates
            </Button>
          </div>
        </form>
      )}

      {/* TAB 2: ADD-ONS */}
      {activeTab === 'addons' && (
        <form onSubmit={handleSave} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                Supplementary Add-On Services ({addOns.length})
              </h3>
              <p className="text-xs text-slate-500">
                Doorstep pickup, weekend flexibility, mock tests, and personalized hours.
              </p>
            </div>

            <button
              type="button"
              onClick={addAddOn}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-xs hover:bg-emerald-100 flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> Add Service
            </button>
          </div>

          <div className="space-y-4">
            {addOns.map((addon, idx) => (
              <div key={addon.id || idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                  <span>ADD-ON #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeAddOn(idx)}
                    className="p-1 text-slate-400 hover:text-red-600 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-[0.7rem] font-bold text-slate-600 uppercase mb-1">
                      Service Title
                    </label>
                    <input
                      type="text"
                      value={addon.title}
                      onChange={(e) => handleAddOnChange(idx, 'title', e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-bold text-slate-900 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[0.7rem] font-bold text-slate-600 uppercase mb-1">
                      Price (₹)
                    </label>
                    <input
                      type="number"
                      value={addon.price}
                      onChange={(e) => handleAddOnChange(idx, 'price', parseInt(e.target.value, 10) || 0)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-bold text-emerald-700 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[0.7rem] font-bold text-slate-600 uppercase mb-1">
                      Per Unit / Frequency
                    </label>
                    <input
                      type="text"
                      value={addon.perUnit}
                      onChange={(e) => handleAddOnChange(idx, 'perUnit', e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 bg-white"
                    />
                  </div>

                  <div className="sm:col-span-4">
                    <label className="block text-[0.7rem] font-bold text-slate-600 uppercase mb-1">
                      Description
                    </label>
                    <input
                      type="text"
                      value={addon.description}
                      onChange={(e) => handleAddOnChange(idx, 'description', e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 bg-white"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <Button variant="primary" size="md" type="submit" icon={<Save className="w-4 h-4" />}>
              Save Add-On Services
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
