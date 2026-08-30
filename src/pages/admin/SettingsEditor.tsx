import React, { useState } from 'react';
import { Save, Sparkles, Phone, MessageCircle, Mail, MapPin, Globe } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { Button } from '../../components/common/Button';
import { SEO } from '../../components/common/SEO';

export const SettingsEditor: React.FC = () => {
  const { siteData, updateSiteConfig } = useContent();
  const { siteConfig } = siteData;

  const [form, setForm] = useState({ ...siteConfig });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteConfig(form);
  };

  return (
    <div className="max-w-4xl space-y-8">
      <SEO title="General Settings Editor | Admin Panel" />

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
            General Site Settings & Contacts
          </h2>
          <p className="text-xs text-slate-500">
            Configure business identity, WhatsApp booking destination, and contact channels.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
        {/* Brand & Identity */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-800 border-b border-slate-100 pb-2">
            Brand Identity
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Academy Brand Name
              </label>
              <input
                type="text"
                value={form.brandName}
                onChange={(e) => setForm({ ...form, brandName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Tagline
              </label>
              <input
                type="text"
                value={form.tagline}
                onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Short Description (Meta / Footer Bio)
            </label>
            <textarea
              rows={2}
              value={form.shortDescription}
              onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none"
            />
          </div>
        </div>

        {/* Contact & WhatsApp Destination */}
        <div className="space-y-4 pt-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-800 border-b border-slate-100 pb-2">
            Contact & WhatsApp Booking Destination
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                WhatsApp Number (with country code)
              </label>
              <input
                type="text"
                placeholder="e.g. 919876543210"
                value={form.whatsappNumber}
                onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Display Phone
              </label>
              <input
                type="text"
                value={form.phoneDisplay}
                onChange={(e) => setForm({ ...form, phoneDisplay: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Admissions Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Default WhatsApp Greeting
            </label>
            <input
              type="text"
              value={form.whatsappDefaultMessage}
              onChange={(e) => setForm({ ...form, whatsappDefaultMessage: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Operating Hours */}
        <div className="space-y-4 pt-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-800 border-b border-slate-100 pb-2">
            Operating Hours
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Weekday Timings
              </label>
              <input
                type="text"
                value={form.operatingHours.weekdays}
                onChange={(e) =>
                  setForm({
                    ...form,
                    operatingHours: { ...form.operatingHours, weekdays: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Weekend Timings
              </label>
              <input
                type="text"
                value={form.operatingHours.weekends}
                onChange={(e) =>
                  setForm({
                    ...form,
                    operatingHours: { ...form.operatingHours, weekends: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Save button */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
          <Button variant="primary" size="lg" type="submit" icon={<Save className="w-4 h-4" />}>
            Save General Settings
          </Button>
        </div>
      </form>
    </div>
  );
};
