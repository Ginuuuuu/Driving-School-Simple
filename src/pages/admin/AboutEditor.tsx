import React, { useState } from 'react';
import {
  Save,
  ShieldCheck,
  Award,
  Sliders,
  Compass,
  CheckCircle2,
  Plus,
  Trash2,
  Info,
} from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { Button } from '../../components/common/Button';
import { SEO } from '../../components/common/SEO';
import { AboutContent } from '../../types';

export const AboutEditor: React.FC = () => {
  const { siteData, updateAbout } = useContent();
  const { about } = siteData;

  const [activeTab, setActiveTab] = useState<'mission' | 'pledge' | 'pillars' | 'fleet'>('mission');

  const [formData, setFormData] = useState<AboutContent>({
    missionHeadline: about.missionHeadline || '',
    missionBody: about.missionBody || '',
    visionHeadline: about.visionHeadline || '',
    visionBody: about.visionBody || '',
    safetyPledge: [...(about.safetyPledge || [])],
    fourPillars: [...(about.fourPillars || [])],
    fleetStandards: [...(about.fleetStandards || [])],
  });

  const handleFieldChange = (field: keyof AboutContent, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePledgeChange = (index: number, val: string) => {
    const updated = [...formData.safetyPledge];
    updated[index] = val;
    setFormData((prev) => ({ ...prev, safetyPledge: updated }));
  };

  const addPledgeItem = () => {
    setFormData((prev) => ({
      ...prev,
      safetyPledge: [...prev.safetyPledge, 'New safety commitment protocol.'],
    }));
  };

  const removePledgeItem = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      safetyPledge: prev.safetyPledge.filter((_, i) => i !== index),
    }));
  };

  const handlePillarChange = (index: number, field: string, val: string) => {
    const updated = [...formData.fourPillars];
    updated[index] = { ...updated[index], [field]: val };
    setFormData((prev) => ({ ...prev, fourPillars: updated }));
  };

  const handleFleetChange = (index: number, field: string, val: string) => {
    const updated = [...formData.fleetStandards];
    updated[index] = { ...updated[index], [field]: val };
    setFormData((prev) => ({ ...prev, fleetStandards: updated }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateAbout(formData);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <SEO title="About Page Editor | Admin Panel" />

      {/* Header with Title and Global Save CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider mb-1">
            <Info className="w-4 h-4" />
            <span>Page Content Editor</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
            About Us & Safety Philosophy
          </h2>
          <p className="text-xs text-slate-500">
            Edit the mission, vision, 5-point safety pledge, 4 learning pillars, and fleet standards.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button variant="primary" size="md" onClick={handleSave} icon={<Save className="w-4 h-4" />}>
            Save About Content
          </Button>
        </div>
      </div>

      {/* Tabbed Navigation Bar */}
      <div className="flex items-center gap-2 overflow-x-auto p-1.5 bg-slate-200/60 rounded-2xl border border-slate-200">
        <button
          onClick={() => setActiveTab('mission')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'mission'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <Compass className="w-3.5 h-3.5 text-emerald-600" />
          Mission & Vision
        </button>

        <button
          onClick={() => setActiveTab('pledge')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'pledge'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          Safety Pledge ({formData.safetyPledge.length})
        </button>

        <button
          onClick={() => setActiveTab('pillars')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'pillars'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <Sliders className="w-3.5 h-3.5 text-emerald-600" />
          Four Pillars ({formData.fourPillars.length})
        </button>

        <button
          onClick={() => setActiveTab('fleet')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'fleet'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <Award className="w-3.5 h-3.5 text-emerald-600" />
          Fleet Standards ({formData.fleetStandards.length})
        </button>
      </div>

      {/* TAB 1: MISSION & VISION */}
      {activeTab === 'mission' && (
        <form onSubmit={handleSave} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Mission Statement & Vision
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Mission Headline
              </label>
              <input
                type="text"
                value={formData.missionHeadline}
                onChange={(e) => handleFieldChange('missionHeadline', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Mission Detailed Body
              </label>
              <textarea
                rows={4}
                value={formData.missionBody}
                onChange={(e) => handleFieldChange('missionBody', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div className="pt-4 border-t border-slate-100">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Vision Headline
              </label>
              <input
                type="text"
                value={formData.visionHeadline}
                onChange={(e) => handleFieldChange('visionHeadline', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Vision Detailed Body
              </label>
              <textarea
                rows={4}
                value={formData.visionBody}
                onChange={(e) => handleFieldChange('visionBody', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <Button variant="primary" size="md" type="submit" icon={<Save className="w-4 h-4" />}>
              Save Mission & Vision
            </Button>
          </div>
        </form>
      )}

      {/* TAB 2: SAFETY PLEDGE */}
      {activeTab === 'pledge' && (
        <form onSubmit={handleSave} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                5-Point Safety & Dignity Pledge
              </h3>
              <p className="text-xs text-slate-500">
                Commitments shown in the dark callout box on the About page.
              </p>
            </div>

            <button
              type="button"
              onClick={addPledgeItem}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-xs hover:bg-emerald-100 flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> Add Pledge Point
            </button>
          </div>

          <div className="space-y-3">
            {formData.safetyPledge.map((pledge, idx) => (
              <div key={idx} className="flex items-start gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0 mt-1">
                  {idx + 1}
                </span>

                <textarea
                  rows={2}
                  value={pledge}
                  onChange={(e) => handlePledgeChange(idx, e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 bg-white"
                />

                <button
                  type="button"
                  onClick={() => removePledgeItem(idx)}
                  className="p-2 text-slate-400 hover:text-red-600 rounded-lg shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <Button variant="primary" size="md" type="submit" icon={<Save className="w-4 h-4" />}>
              Save Safety Pledge
            </Button>
          </div>
        </form>
      )}

      {/* TAB 3: FOUR PILLARS */}
      {activeTab === 'pillars' && (
        <form onSubmit={handleSave} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Four Pillars of Driving Excellence
            </h3>
            <p className="text-xs text-slate-500">
              The proprietary pedagogical method used by DriveCraft mentors.
            </p>
          </div>

          <div className="space-y-4">
            {formData.fourPillars.map((pillar, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                  <span>PILLAR #{idx + 1}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-[0.7rem] font-bold text-slate-600 uppercase mb-1">
                      Pillar Title
                    </label>
                    <input
                      type="text"
                      value={pillar.title}
                      onChange={(e) => handlePillarChange(idx, 'title', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-bold text-slate-900 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[0.7rem] font-bold text-slate-600 uppercase mb-1">
                      Icon Name
                    </label>
                    <input
                      type="text"
                      value={pillar.icon}
                      onChange={(e) => handlePillarChange(idx, 'icon', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono bg-white"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-[0.7rem] font-bold text-slate-600 uppercase mb-1">
                      Description & Learning Objective
                    </label>
                    <textarea
                      rows={2}
                      value={pillar.description}
                      onChange={(e) => handlePillarChange(idx, 'description', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-700 bg-white"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <Button variant="primary" size="md" type="submit" icon={<Save className="w-4 h-4" />}>
              Save Pillars
            </Button>
          </div>
        </form>
      )}

      {/* TAB 4: FLEET STANDARDS */}
      {activeTab === 'fleet' && (
        <form onSubmit={handleSave} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Fleet Standards & Verification Badges
            </h3>
            <p className="text-xs text-slate-500">
              The 4 key vehicle standards displayed in the fleet grid.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {formData.fleetStandards.map((fleet, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                  <span>METRIC #{idx + 1}</span>
                </div>

                <div>
                  <label className="block text-[0.7rem] font-bold text-slate-600 uppercase mb-1">
                    Metric Value (e.g. 100% Fleet, &lt; 3 Years)
                  </label>
                  <input
                    type="text"
                    value={fleet.metric}
                    onChange={(e) => handleFleetChange(idx, 'metric', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-bold text-emerald-700 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[0.7rem] font-bold text-slate-600 uppercase mb-1">
                    Standard Title
                  </label>
                  <input
                    type="text"
                    value={fleet.title}
                    onChange={(e) => handleFleetChange(idx, 'title', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-semibold bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[0.7rem] font-bold text-slate-600 uppercase mb-1">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    value={fleet.description}
                    onChange={(e) => handleFleetChange(idx, 'description', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-600 bg-white"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <Button variant="primary" size="md" type="submit" icon={<Save className="w-4 h-4" />}>
              Save Fleet Standards
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
