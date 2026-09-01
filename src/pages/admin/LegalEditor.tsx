import React, { useState } from 'react';
import { Save, Shield, Plus, Trash2, FileText, CheckCircle2 } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { Button } from '../../components/common/Button';
import { SEO } from '../../components/common/SEO';
import { LegalContent } from '../../types';

import { defaultLegal } from '../../content/legal';

export const LegalEditor: React.FC = () => {
  const { siteData, updateLegal } = useContent();
  const legal = siteData?.legal || defaultLegal;

  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>('privacy');
  const [legalData, setLegalData] = useState<LegalContent>(() => {
    const raw = legal || defaultLegal;
    return JSON.parse(JSON.stringify(raw));
  });

  const handlePrivacySectionChange = (index: number, field: 'heading' | 'body', val: string) => {
    const updated = [...(legalData.privacyPolicy?.sections || [])];
    updated[index] = { ...updated[index], [field]: val };
    setLegalData({
      ...legalData,
      privacyPolicy: { ...legalData.privacyPolicy, sections: updated },
    });
  };

  const addPrivacySection = () => {
    setLegalData({
      ...legalData,
      privacyPolicy: {
        ...legalData.privacyPolicy,
        sections: [
          ...(legalData.privacyPolicy?.sections || []),
          { heading: 'New Privacy Clause', body: 'Clause details...' },
        ],
      },
    });
  };

  const removePrivacySection = (index: number) => {
    setLegalData({
      ...legalData,
      privacyPolicy: {
        ...legalData.privacyPolicy,
        sections: (legalData.privacyPolicy?.sections || []).filter((_, i) => i !== index),
      },
    });
  };

  const handleTermsSectionChange = (index: number, field: 'heading' | 'body', val: string) => {
    const updated = [...(legalData.termsAndConditions?.sections || [])];
    updated[index] = { ...updated[index], [field]: val };
    setLegalData({
      ...legalData,
      termsAndConditions: { ...legalData.termsAndConditions, sections: updated },
    });
  };

  const addTermsSection = () => {
    setLegalData({
      ...legalData,
      termsAndConditions: {
        ...legalData.termsAndConditions,
        sections: [
          ...(legalData.termsAndConditions?.sections || []),
          { heading: 'New Terms Clause', body: 'Clause terms and student agreement...' },
        ],
      },
    });
  };

  const removeTermsSection = (index: number) => {
    setLegalData({
      ...legalData,
      termsAndConditions: {
        ...legalData.termsAndConditions,
        sections: (legalData.termsAndConditions?.sections || []).filter((_, i) => i !== index),
      },
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateLegal(legalData);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <SEO title="Legal Policies Editor | Admin Panel" />

      {/* Header with Title and Global Save CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider mb-1">
            <Shield className="w-4 h-4" />
            <span>Compliance & Legal</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
            Legal Policies & Student Agreement Terms
          </h2>
          <p className="text-xs text-slate-500">
            Manage clauses for Privacy Policy (DPDP compliant) and Terms & Conditions.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button variant="primary" size="md" onClick={handleSave} icon={<Save className="w-4 h-4" />}>
            Save All Legal Documents
          </Button>
        </div>
      </div>

      {/* Tabbed Navigation Bar */}
      <div className="flex items-center gap-2 overflow-x-auto p-1.5 bg-slate-200/60 rounded-2xl border border-slate-200">
        <button
          onClick={() => setActiveTab('privacy')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'privacy'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <FileText className="w-3.5 h-3.5 text-emerald-600" />
          Privacy Policy ({legalData.privacyPolicy.sections.length} Clauses)
        </button>

        <button
          onClick={() => setActiveTab('terms')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'terms'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <Shield className="w-3.5 h-3.5 text-emerald-600" />
          Terms & Conditions ({legalData.termsAndConditions.sections.length} Clauses)
        </button>
      </div>

      {/* TAB 1: PRIVACY POLICY */}
      {activeTab === 'privacy' && (
        <form onSubmit={handleSave} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                Privacy Policy Clauses
              </h3>
              <p className="text-xs text-slate-500">
                Last Updated: {legalData.privacyPolicy.lastUpdated}
              </p>
            </div>

            <button
              type="button"
              onClick={addPrivacySection}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-xs hover:bg-emerald-100 flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> Add Clause
            </button>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Last Updated Timestamp
            </label>
            <input
              type="text"
              value={legalData.privacyPolicy.lastUpdated}
              onChange={(e) =>
                setLegalData({
                  ...legalData,
                  privacyPolicy: { ...legalData.privacyPolicy, lastUpdated: e.target.value },
                })
              }
              className="w-full max-w-sm px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold"
            />
          </div>

          <div className="space-y-4">
            {legalData.privacyPolicy.sections.map((sec, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-600 uppercase">CLAUSE #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => removePrivacySection(idx)}
                    className="p-1 text-slate-400 hover:text-red-600 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <label className="block text-[0.7rem] font-bold text-slate-600 uppercase mb-1">
                    Heading
                  </label>
                  <input
                    type="text"
                    value={sec.heading}
                    onChange={(e) => handlePrivacySectionChange(idx, 'heading', e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[0.7rem] font-bold text-slate-600 uppercase mb-1">
                    Content
                  </label>
                  <textarea
                    rows={3}
                    value={sec.content}
                    onChange={(e) => handlePrivacySectionChange(idx, 'content', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 bg-white"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <Button variant="primary" size="md" type="submit" icon={<Save className="w-4 h-4" />}>
              Save Privacy Policy
            </Button>
          </div>
        </form>
      )}

      {/* TAB 2: TERMS AND CONDITIONS */}
      {activeTab === 'terms' && (
        <form onSubmit={handleSave} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                Terms & Conditions Clauses
              </h3>
              <p className="text-xs text-slate-500">
                Last Updated: {legalData.termsAndConditions.lastUpdated}
              </p>
            </div>

            <button
              type="button"
              onClick={addTermsSection}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-xs hover:bg-emerald-100 flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> Add Clause
            </button>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Last Updated Timestamp
            </label>
            <input
              type="text"
              value={legalData.termsAndConditions.lastUpdated}
              onChange={(e) =>
                setLegalData({
                  ...legalData,
                  termsAndConditions: { ...legalData.termsAndConditions, lastUpdated: e.target.value },
                })
              }
              className="w-full max-w-sm px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold"
            />
          </div>

          <div className="space-y-4">
            {legalData.termsAndConditions.sections.map((sec, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-600 uppercase">CLAUSE #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeTermsSection(idx)}
                    className="p-1 text-slate-400 hover:text-red-600 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <label className="block text-[0.7rem] font-bold text-slate-600 uppercase mb-1">
                    Heading
                  </label>
                  <input
                    type="text"
                    value={sec.heading}
                    onChange={(e) => handleTermsSectionChange(idx, 'heading', e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[0.7rem] font-bold text-slate-600 uppercase mb-1">
                    Content
                  </label>
                  <textarea
                    rows={3}
                    value={sec.content}
                    onChange={(e) => handleTermsSectionChange(idx, 'content', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 bg-white"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <Button variant="primary" size="md" type="submit" icon={<Save className="w-4 h-4" />}>
              Save Terms & Conditions
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
