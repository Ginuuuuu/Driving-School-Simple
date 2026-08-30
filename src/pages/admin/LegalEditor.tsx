import React, { useState } from 'react';
import { Save, Shield } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { Button } from '../../components/common/Button';
import { SEO } from '../../components/common/SEO';

export const LegalEditor: React.FC = () => {
  const { siteData, updateLegal } = useContent();
  const { legal } = siteData;

  const [policyDate, setPolicyDate] = useState(legal.privacyPolicy.lastUpdated);
  const [termsDate, setTermsDate] = useState(legal.termsAndConditions.lastUpdated);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateLegal({
      ...legal,
      privacyPolicy: { ...legal.privacyPolicy, lastUpdated: policyDate },
      termsAndConditions: { ...legal.termsAndConditions, lastUpdated: termsDate },
    });
  };

  return (
    <div className="max-w-4xl space-y-8">
      <SEO title="Legal Pages Editor | Admin Panel" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
            Legal & Policy Documents
          </h2>
          <p className="text-xs text-slate-500">
            Update Privacy Policy, Terms of Service, and compliance effective dates.
          </p>
        </div>

        <Button variant="primary" size="md" onClick={handleSave} icon={<Save className="w-4 h-4" />}>
          Save Policy Timestamps
        </Button>
      </div>

      <form onSubmit={handleSave} className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Privacy Policy Last Updated
            </label>
            <input
              type="text"
              value={policyDate}
              onChange={(e) => setPolicyDate(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Terms & Conditions Last Updated
            </label>
            <input
              type="text"
              value={termsDate}
              onChange={(e) => setTermsDate(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed">
          <p>
            Privacy Policy sections: <strong>{legal.privacyPolicy.sections.length} clauses</strong> (DPDP & IT Act compliant).
          </p>
          <p className="mt-1">
            Terms & Conditions sections: <strong>{legal.termsAndConditions.sections.length} clauses</strong> (Dual-control liability & cancellation guidelines).
          </p>
        </div>
      </form>
    </div>
  );
};
