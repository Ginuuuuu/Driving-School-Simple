import React, { useState } from 'react';
import {
  Save,
  Sparkles,
  ShieldCheck,
  Award,
  Compass,
  Users,
  Plus,
  Trash2,
  Image as ImageIcon,
  ExternalLink,
  MessageCircle,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { Button } from '../../components/common/Button';
import { SEO } from '../../components/common/SEO';
import { TeamMember, CoreValueHighlight } from '../../types';

export const HomepageEditor: React.FC = () => {
  const { siteData, updateSiteConfig } = useContent();
  const { siteConfig } = siteData;

  const [activeTab, setActiveTab] = useState<'hero' | 'stats' | 'values' | 'team'>('hero');

  // Hero state
  const [hero, setHero] = useState({
    badgeText: siteConfig.hero?.badgeText || '100% Dual-Control Safety Fleet • Doorstep Pickup',
    headlineMain: siteConfig.hero?.headlineMain || 'Master Every Mile with ',
    headlineHighlight: siteConfig.hero?.headlineHighlight || 'Confidence',
    headlineEnd: siteConfig.hero?.headlineEnd || ' & Total Safety.',
    subtitle: siteConfig.hero?.subtitle || 'Learn driving in modern dual-control cars with patient certified mentors, replica automated RTO track training, and zero hidden fees.',
    bookingButtonText: siteConfig.hero?.bookingButtonText || 'Book a Driving Lesson',
    whatsappButtonText: siteConfig.hero?.whatsappButtonText || 'WhatsApp Us',
    heroImageUrl: siteConfig.hero?.heroImageUrl || 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80',
    trustChecks: siteConfig.hero?.trustChecks || ['98.4% First-Attempt RTO Pass', 'Female & Male Mentors', 'Manual & Auto'],
  });

  // Trust Stats state
  const [stats, setStats] = useState([...siteConfig.trustStats]);

  // Core values state
  const [coreValues, setCoreValues] = useState<CoreValueHighlight[]>([
    ...(siteConfig.coreValues || [
      { id: 'val-1', title: '100% Dual-Control Safety Fleet', description: 'Every training vehicle is equipped with secondary dual pedals. Your instructor stops the vehicle instantly if any hazard arises.', icon: 'ShieldCheck' },
      { id: 'val-2', title: 'Automated RTO Track Readiness', description: 'Drills on replica Figure-8, H-box parking, and slope hill-hold tracks ensure high first-attempt pass rates on camera-monitored exams.', icon: 'Award' },
      { id: 'val-3', title: 'Doorstep Pickup & Calm Coaching', description: 'Daily 1-hour slots scheduled directly from your home or office with background-verified, patient male & female mentors.', icon: 'Compass' },
    ]),
  ]);

  // Team members state
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    ...(siteConfig.teamMembers || []),
  ]);

  const handleHeroChange = (field: string, val: any) => {
    setHero((prev) => ({ ...prev, [field]: val }));
  };

  const handleTrustCheckChange = (index: number, val: string) => {
    const updated = [...hero.trustChecks];
    updated[index] = val;
    setHero((prev) => ({ ...prev, trustChecks: updated }));
  };

  const addTrustCheck = () => {
    setHero((prev) => ({ ...prev, trustChecks: [...prev.trustChecks, 'New Verification Point'] }));
  };

  const removeTrustCheck = (index: number) => {
    setHero((prev) => ({ ...prev, trustChecks: prev.trustChecks.filter((_, i) => i !== index) }));
  };

  const handleStatChange = (index: number, field: string, val: string) => {
    const updated = [...stats];
    updated[index] = { ...updated[index], [field]: val };
    setStats(updated);
  };

  const handleValueChange = (index: number, field: keyof CoreValueHighlight, val: string) => {
    const updated = [...coreValues];
    updated[index] = { ...updated[index], [field]: val };
    setCoreValues(updated);
  };

  const handleMemberChange = (index: number, field: string, val: string) => {
    const updated = [...teamMembers];
    if (field.startsWith('social.')) {
      const socialKey = field.split('.')[1] as 'twitter' | 'linkedin' | 'instagram' | 'behance';
      updated[index] = {
        ...updated[index],
        social: { ...(updated[index].social || {}), [socialKey]: val },
      };
    } else {
      updated[index] = { ...updated[index], [field]: val };
    }
    setTeamMembers(updated);
  };

  const addTeamMember = () => {
    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: 'New Member',
      role: 'INSTRUCTOR',
      image: 'https://i.pravatar.cc/400?img=' + (teamMembers.length + 10),
      social: { twitter: '#', linkedin: '#' },
    };
    setTeamMembers([...teamMembers, newMember]);
  };

  const removeTeamMember = (index: number) => {
    setTeamMembers(teamMembers.filter((_, i) => i !== index));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteConfig({
      hero,
      trustStats: stats,
      coreValues,
      teamMembers,
    });
  };

  return (
    <div className="space-y-6 sm:space-y-8 w-full">
      <SEO title="Homepage Editor | Admin Panel" />

      {/* Header with Title and Global Save CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Page Content Editor</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
            Homepage Content & Layout
          </h2>
          <p className="text-xs text-slate-500">
            Edit the Hero banner, Trust Counters, Core Values, and Team Showcase on the homepage.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button variant="primary" size="md" onClick={handleSave} icon={<Save className="w-4 h-4" />}>
            Save All Homepage Changes
          </Button>
        </div>
      </div>

      {/* Tabbed Navigation Bar */}
      <div className="flex items-center gap-2 overflow-x-auto p-1.5 bg-slate-200/60 rounded-2xl border border-slate-200">
        <button
          onClick={() => setActiveTab('hero')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'hero'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          Hero Banner
        </button>

        <button
          onClick={() => setActiveTab('stats')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'stats'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <Award className="w-3.5 h-3.5 text-emerald-600" />
          Trust Counters ({stats.length})
        </button>

        <button
          onClick={() => setActiveTab('values')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'values'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          Core Values ({coreValues.length})
        </button>

        <button
          onClick={() => setActiveTab('team')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'team'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <Users className="w-3.5 h-3.5 text-emerald-600" />
          Team Showcase ({teamMembers.length})
        </button>
      </div>

      {/* TAB 1: HERO SECTION */}
      {activeTab === 'hero' && (
        <form onSubmit={handleSave} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Hero Section Banner
            </h3>
            <p className="text-xs text-slate-500">
              Configure the prominent headline, subtitle, image, and primary action buttons.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Top Trust Badge Pill
              </label>
              <input
                type="text"
                value={hero.badgeText}
                onChange={(e) => handleHeroChange('badgeText', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                placeholder="100% Dual-Control Safety Fleet • Doorstep Pickup"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Headline (Prefix)
              </label>
              <input
                type="text"
                value={hero.headlineMain}
                onChange={(e) => handleHeroChange('headlineMain', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                placeholder="Master Every Mile with "
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Headline Highlight (Gradient Word)
              </label>
              <input
                type="text"
                value={hero.headlineHighlight}
                onChange={(e) => handleHeroChange('headlineHighlight', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-bold text-emerald-700 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                placeholder="Confidence"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Headline (Suffix)
              </label>
              <input
                type="text"
                value={hero.headlineEnd}
                onChange={(e) => handleHeroChange('headlineEnd', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                placeholder=" & Total Safety."
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Hero Subtitle Text
              </label>
              <textarea
                rows={3}
                value={hero.subtitle}
                onChange={(e) => handleHeroChange('subtitle', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                placeholder="Detailed description below headline..."
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Primary Button Label
              </label>
              <input
                type="text"
                value={hero.bookingButtonText}
                onChange={(e) => handleHeroChange('bookingButtonText', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                placeholder="Book a Driving Lesson"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                WhatsApp Button Label
              </label>
              <input
                type="text"
                value={hero.whatsappButtonText}
                onChange={(e) => handleHeroChange('whatsappButtonText', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                placeholder="WhatsApp Us"
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Hero Right Showcase Image URL
              </label>
              <div className="flex gap-3 items-center">
                <input
                  type="text"
                  value={hero.heroImageUrl}
                  onChange={(e) => handleHeroChange('heroImageUrl', e.target.value)}
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-mono text-slate-800 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  placeholder="https://images.unsplash.com/..."
                />
                <img
                  src={hero.heroImageUrl}
                  alt="Preview"
                  className="w-16 h-12 object-cover rounded-xl border border-slate-200 shrink-0"
                />
              </div>
            </div>

            {/* Quick Trust Checks */}
            <div className="md:col-span-2 space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Bullet Points under Buttons
                </label>
                <button
                  type="button"
                  onClick={addTrustCheck}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Point
                </button>
              </div>

              <div className="space-y-2">
                {hero.trustChecks.map((check, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={check}
                      onChange={(e) => handleTrustCheckChange(idx, e.target.value)}
                      className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-900"
                    />
                    <button
                      type="button"
                      onClick={() => removeTrustCheck(idx)}
                      className="p-2 text-slate-400 hover:text-red-600 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <Button variant="primary" size="md" type="submit" icon={<Save className="w-4 h-4" />}>
              Save Hero Settings
            </Button>
          </div>
        </form>
      )}

      {/* TAB 2: TRUST STATS */}
      {activeTab === 'stats' && (
        <form onSubmit={handleSave} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Trust Statistics Counters (4 Key Metrics)
            </h3>
            <p className="text-xs text-slate-500">
              These 4 stats appear in the dark counter bar below the hero section.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stats.map((stat, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                  <span>COUNTER #{idx + 1}</span>
                </div>

                <div>
                  <label className="block text-[0.7rem] font-bold text-slate-600 uppercase mb-1">
                    Value / Metric (e.g. 14,800+)
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

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <Button variant="primary" size="md" type="submit" icon={<Save className="w-4 h-4" />}>
              Save Trust Counters
            </Button>
          </div>
        </form>
      )}

      {/* TAB 3: CORE VALUES */}
      {activeTab === 'values' && (
        <form onSubmit={handleSave} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Core Value Highlights (3 Pillars on Homepage)
            </h3>
            <p className="text-xs text-slate-500">
              The 3 white cards highlighting Dual-Control safety, Automated Track readiness, and Doorstep pickup.
            </p>
          </div>

          <div className="space-y-4">
            {coreValues.map((val, idx) => (
              <div key={val.id || idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                  <span>CARD #{idx + 1}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-[0.7rem] font-bold text-slate-600 uppercase mb-1">
                      Card Title
                    </label>
                    <input
                      type="text"
                      value={val.title}
                      onChange={(e) => handleValueChange(idx, 'title', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-bold text-slate-900 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[0.7rem] font-bold text-slate-600 uppercase mb-1">
                      Icon Name
                    </label>
                    <input
                      type="text"
                      value={val.icon}
                      onChange={(e) => handleValueChange(idx, 'icon', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono bg-white"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-[0.7rem] font-bold text-slate-600 uppercase mb-1">
                      Description Text
                    </label>
                    <textarea
                      rows={2}
                      value={val.description}
                      onChange={(e) => handleValueChange(idx, 'description', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-700 bg-white"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <Button variant="primary" size="md" type="submit" icon={<Save className="w-4 h-4" />}>
              Save Core Values
            </Button>
          </div>
        </form>
      )}

      {/* TAB 4: TEAM SHOWCASE */}
      {activeTab === 'team' && (
        <form onSubmit={handleSave} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                Team Showcase Gallery ({teamMembers.length} Members)
              </h3>
              <p className="text-xs text-slate-500">
                Manage the team member photos, names, roles, and social media icons displayed in the staggered grid.
              </p>
            </div>

            <button
              type="button"
              onClick={addTeamMember}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-xs hover:bg-emerald-100 flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> Add Member
            </button>
          </div>

          <div className="space-y-4">
            {teamMembers.map((member, idx) => (
              <div key={member.id || idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                  <div className="flex items-center gap-2">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-10 h-10 rounded-xl object-cover border border-slate-200 bg-white"
                    />
                    <span className="font-bold text-slate-900 text-sm">#{idx + 1} • {member.name}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeTeamMember(idx)}
                    className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg"
                    title="Remove team member"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[0.7rem] font-bold text-slate-600 uppercase mb-1">
                      Member Name
                    </label>
                    <input
                      type="text"
                      value={member.name}
                      onChange={(e) => handleMemberChange(idx, 'name', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-semibold bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[0.7rem] font-bold text-slate-600 uppercase mb-1">
                      Designation / Role
                    </label>
                    <input
                      type="text"
                      value={member.role}
                      onChange={(e) => handleMemberChange(idx, 'role', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono uppercase tracking-wider bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[0.7rem] font-bold text-slate-600 uppercase mb-1">
                      Photo Image URL
                    </label>
                    <input
                      type="text"
                      value={member.image}
                      onChange={(e) => handleMemberChange(idx, 'image', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono bg-white"
                    />
                  </div>

                  {/* Social links */}
                  <div>
                    <label className="block text-[0.7rem] font-bold text-slate-600 uppercase mb-1">
                      Twitter / X Link
                    </label>
                    <input
                      type="text"
                      value={member.social?.twitter || ''}
                      onChange={(e) => handleMemberChange(idx, 'social.twitter', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                      placeholder="https://x.com/username or #"
                    />
                  </div>

                  <div>
                    <label className="block text-[0.7rem] font-bold text-slate-600 uppercase mb-1">
                      LinkedIn Link
                    </label>
                    <input
                      type="text"
                      value={member.social?.linkedin || ''}
                      onChange={(e) => handleMemberChange(idx, 'social.linkedin', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                      placeholder="https://linkedin.com/in/username or #"
                    />
                  </div>

                  <div>
                    <label className="block text-[0.7rem] font-bold text-slate-600 uppercase mb-1">
                      Instagram / Behance Link
                    </label>
                    <input
                      type="text"
                      value={member.social?.instagram || member.social?.behance || ''}
                      onChange={(e) => handleMemberChange(idx, 'social.instagram', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                      placeholder="https://instagram.com/username or #"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <Button variant="primary" size="md" type="submit" icon={<Save className="w-4 h-4" />}>
              Save Team Members
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
