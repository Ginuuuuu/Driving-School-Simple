import React, { useState } from 'react';
import {
  Save,
  MapPin,
  Plus,
  Trash2,
  Phone,
  Clock,
  Mail,
  MessageCircle,
  Building,
} from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { Button } from '../../components/common/Button';
import { SEO } from '../../components/common/SEO';

export const ContactEditor: React.FC = () => {
  const { siteData, updateSiteConfig } = useContent();
  const { siteConfig } = siteData;

  const [activeTab, setActiveTab] = useState<'contact' | 'hours' | 'branches'>('contact');

  const [phoneDisplay, setPhoneDisplay] = useState(siteConfig.phoneDisplay || '');
  const [phoneDial, setPhoneDial] = useState(siteConfig.phoneDial || '');
  const [whatsappNumber, setWhatsappNumber] = useState(siteConfig.whatsappNumber || '');
  const [whatsappDefaultMessage, setWhatsappDefaultMessage] = useState(siteConfig.whatsappDefaultMessage || '');
  const [email, setEmail] = useState(siteConfig.email || '');
  const [emergencyHelpline, setEmergencyHelpline] = useState(siteConfig.emergencyHelpline || '');
  const [foundedYear, setFoundedYear] = useState(siteConfig.foundedYear || '2016');

  const [operatingHours, setOperatingHours] = useState({
    weekdays: siteConfig.operatingHours?.weekdays || '',
    weekends: siteConfig.operatingHours?.weekends || '',
    note: siteConfig.operatingHours?.note || '',
  });

  const [branches, setBranches] = useState([...siteConfig.branches]);
  const [serviceCitiesStr, setServiceCitiesStr] = useState(siteConfig.serviceCities.join(', '));

  const handleBranchChange = (index: number, field: string, value: any) => {
    const updated = [...branches];
    updated[index] = { ...updated[index], [field]: value };
    setBranches(updated);
  };

  const addBranch = () => {
    setBranches([
      ...branches,
      {
        id: `branch-${Date.now()}`,
        name: 'New Training Branch',
        address: 'Street address details...',
        city: 'New City',
        pincode: '000000',
        isMainBranch: false,
        phone: phoneDisplay,
        googleMapsUrl: 'https://maps.google.com',
      },
    ]);
  };

  const removeBranch = (index: number) => {
    setBranches(branches.filter((_, i) => i !== index));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const cities = serviceCitiesStr.split(',').map((c) => c.trim()).filter(Boolean);
    updateSiteConfig({
      phoneDisplay,
      phoneDial,
      whatsappNumber,
      whatsappDefaultMessage,
      email,
      emergencyHelpline,
      foundedYear,
      operatingHours,
      branches,
      serviceCities: cities,
    });
  };

  return (
    <div className="space-y-6 sm:space-y-8 w-full">
      <SEO title="Contact & Branches Editor | Admin Panel" />

      {/* Header with Title and Global Save CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider mb-1">
            <Phone className="w-4 h-4" />
            <span>Locations & Support</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
            Contact Channels, Branches & Hours
          </h2>
          <p className="text-xs text-slate-500">
            Configure phone lines, WhatsApp integration, operating schedule, and branch hubs.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button variant="primary" size="md" onClick={handleSave} icon={<Save className="w-4 h-4" />}>
            Save All Contact Details
          </Button>
        </div>
      </div>

      {/* Tabbed Navigation Bar */}
      <div className="flex items-center gap-2 overflow-x-auto p-1.5 bg-slate-200/60 rounded-2xl border border-slate-200">
        <button
          onClick={() => setActiveTab('contact')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'contact'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <Phone className="w-3.5 h-3.5 text-emerald-600" />
          Helpline & WhatsApp
        </button>

        <button
          onClick={() => setActiveTab('hours')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'hours'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <Clock className="w-3.5 h-3.5 text-emerald-600" />
          Operating Hours
        </button>

        <button
          onClick={() => setActiveTab('branches')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'branches'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <Building className="w-3.5 h-3.5 text-emerald-600" />
          Branches ({branches.length})
        </button>
      </div>

      {/* TAB 1: CONTACT CHANNELS */}
      {activeTab === 'contact' && (
        <form onSubmit={handleSave} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Direct Contact Lines & Support
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Phone Number (Display Format)
              </label>
              <input
                type="text"
                value={phoneDisplay}
                onChange={(e) => setPhoneDisplay(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-900"
                placeholder="+91 98765 43210"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Phone Number (Dial String)
              </label>
              <input
                type="text"
                value={phoneDial}
                onChange={(e) => setPhoneDial(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-mono text-slate-800"
                placeholder="+919876543210"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                WhatsApp Phone Number (with Country Code)
              </label>
              <input
                type="text"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-mono text-emerald-700 font-bold"
                placeholder="919876543210"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Admissions Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800"
                placeholder="admissions@drivecraft.in"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Emergency Helpline
              </label>
              <input
                type="text"
                value={emergencyHelpline}
                onChange={(e) => setEmergencyHelpline(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-red-700"
                placeholder="1800-200-SAFE"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Academy Founded Year
              </label>
              <input
                type="text"
                value={foundedYear}
                onChange={(e) => setFoundedYear(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold"
                placeholder="2016"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Default WhatsApp Inbound Message
              </label>
              <textarea
                rows={2}
                value={whatsappDefaultMessage}
                onChange={(e) => setWhatsappDefaultMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 leading-relaxed"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <Button variant="primary" size="md" type="submit" icon={<Save className="w-4 h-4" />}>
              Save Contact Settings
            </Button>
          </div>
        </form>
      )}

      {/* TAB 2: OPERATING HOURS & CITIES */}
      {activeTab === 'hours' && (
        <form onSubmit={handleSave} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Operating Schedule & Serviceable Cities
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Weekday Driving Schedule
              </label>
              <input
                type="text"
                value={operatingHours.weekdays}
                onChange={(e) => setOperatingHours({ ...operatingHours, weekdays: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Weekend Driving Schedule
              </label>
              <input
                type="text"
                value={operatingHours.weekends}
                onChange={(e) => setOperatingHours({ ...operatingHours, weekends: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Office & Helpline Support Hours Note
              </label>
              <input
                type="text"
                value={operatingHours.note}
                onChange={(e) => setOperatingHours({ ...operatingHours, note: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800"
              />
            </div>

            <div className="pt-2 border-t border-slate-100">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Doorstep Pickup Service Cities (Comma-Separated)
              </label>
              <input
                type="text"
                value={serviceCitiesStr}
                onChange={(e) => setServiceCitiesStr(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-900"
                placeholder="Delhi NCR, Bengaluru, Mumbai, Pune, Hyderabad, Chennai"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <Button variant="primary" size="md" type="submit" icon={<Save className="w-4 h-4" />}>
              Save Operating Hours
            </Button>
          </div>
        </form>
      )}

      {/* TAB 3: BRANCH HUBS */}
      {activeTab === 'branches' && (
        <form onSubmit={handleSave} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                Academy Training Hubs & Simulator Labs ({branches.length})
              </h3>
              <p className="text-xs text-slate-500">
                Physical branch locations and contact phones.
              </p>
            </div>

            <button
              type="button"
              onClick={addBranch}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-xs hover:bg-emerald-100 flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> Add Branch
            </button>
          </div>

          <div className="space-y-4">
            {branches.map((b, idx) => (
              <div key={b.id || idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                  <div className="flex items-center gap-2">
                    <span>BRANCH #{idx + 1}</span>
                    {b.isMainBranch && (
                      <span className="px-2 py-0.5 rounded-full text-[0.65rem] uppercase font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                        Main Academy Hub
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => removeBranch(idx)}
                    className="p-1 text-slate-400 hover:text-red-600 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[0.7rem] font-bold text-slate-600 uppercase mb-1">
                      Branch Name
                    </label>
                    <input
                      type="text"
                      value={b.name}
                      onChange={(e) => handleBranchChange(idx, 'name', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[0.7rem] font-bold text-slate-600 uppercase mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      value={b.city}
                      onChange={(e) => handleBranchChange(idx, 'city', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[0.7rem] font-bold text-slate-600 uppercase mb-1">
                      Pincode
                    </label>
                    <input
                      type="text"
                      value={b.pincode}
                      onChange={(e) => handleBranchChange(idx, 'pincode', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono bg-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[0.7rem] font-bold text-slate-600 uppercase mb-1">
                      Full Street Address
                    </label>
                    <input
                      type="text"
                      value={b.address}
                      onChange={(e) => handleBranchChange(idx, 'address', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[0.7rem] font-bold text-slate-600 uppercase mb-1">
                      Branch Phone
                    </label>
                    <input
                      type="text"
                      value={b.phone}
                      onChange={(e) => handleBranchChange(idx, 'phone', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono bg-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[0.7rem] font-bold text-slate-600 uppercase mb-1">
                      Google Maps URL
                    </label>
                    <input
                      type="text"
                      value={b.googleMapsUrl}
                      onChange={(e) => handleBranchChange(idx, 'googleMapsUrl', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono bg-white"
                    />
                  </div>

                  <div className="flex items-center pt-4">
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={b.isMainBranch || false}
                        onChange={(e) => handleBranchChange(idx, 'isMainBranch', e.target.checked)}
                        className="rounded text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>Main Headquarters Hub</span>
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <Button variant="primary" size="md" type="submit" icon={<Save className="w-4 h-4" />}>
              Save Branch Locations
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
