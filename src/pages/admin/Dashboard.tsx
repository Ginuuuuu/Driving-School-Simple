import React from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  MapPin,
  Users,
  CreditCard,
  MessageSquare,
  HelpCircle,
  Phone,
  Settings,
  Sparkles,
  Download,
  Upload,
  RotateCcw,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  FileCode,
} from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { Button } from '../../components/common/Button';
import { SEO } from '../../components/common/SEO';

export const Dashboard: React.FC = () => {
  const { siteData, isCustomized, exportConfigAsJSON, resetToDefaults } = useContent();
  const { siteConfig, courses, roadmap, instructors, pricing, testimonials, faqs } = siteData;

  const quickStats = [
    { label: 'Active Courses', count: courses.length, to: '/admin/courses', icon: BookOpen, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Licence Milestones', count: roadmap.length, to: '/admin/roadmap', icon: MapPin, color: 'text-amber-600 bg-amber-50' },
    { label: 'Instructors Roster', count: instructors.length, to: '/admin/instructors', icon: Users, color: 'text-blue-600 bg-blue-50' },
    { label: 'Pricing Packages', count: pricing.packages.length, to: '/admin/pricing', icon: CreditCard, color: 'text-purple-600 bg-purple-50' },
    { label: 'Learner Testimonials', count: testimonials.length, to: '/admin/testimonials', icon: MessageSquare, color: 'text-pink-600 bg-pink-50' },
    { label: 'Frequently Asked Questions', count: faqs.length, to: '/admin/faqs', icon: HelpCircle, color: 'text-indigo-600 bg-indigo-50' },
  ];

  return (
    <div className="space-y-8">
      <SEO title="Admin Dashboard | DriveCraft Control Center" />

      {/* Top Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
            <Sparkles className="w-3.5 h-3.5" /> Content Control Center
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
            Welcome to {siteConfig.brandName} CMS
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Edit courses, pricing, RTO roadmap steps, instructor profiles, and contact channels in real time.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="primary"
            size="md"
            onClick={exportConfigAsJSON}
            icon={<Download className="w-4 h-4" />}
          >
            Export JSON Config
          </Button>

          <Button
            variant="outline"
            size="md"
            to="/"
            className="border-slate-700 text-slate-200 hover:text-white"
            icon={<ExternalLink className="w-4 h-4" />}
          >
            View Live Site
          </Button>
        </div>
      </div>

      {/* Content Overview Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {quickStats.map((stat, idx) => {
          const Icon = stat.icon;

          return (
            <Link
              key={idx}
              to={stat.to}
              className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md hover:border-slate-300 transition-all space-y-2 group"
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${stat.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl font-black font-display text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {stat.count}
                </div>
                <div className="text-xs font-semibold text-slate-600 truncate">
                  {stat.label}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Architecture Transparency Note */}
      <div className="p-6 rounded-3xl bg-blue-50/70 border border-blue-200 text-xs text-blue-950 space-y-2">
        <h3 className="font-bold text-sm flex items-center gap-2 text-blue-900">
          <FileCode className="w-4 h-4 text-blue-700" />
          Zero-Database Architecture Guide for Administrators:
        </h3>
        <p className="text-blue-900/90 leading-relaxed">
          This website is built with a high-performance static frontend architecture without an external database.
          When you make edits in this admin panel, your changes are saved immediately to your active browser session and local draft storage.
          To commit changes permanently to production, click <strong>"Export JSON Config"</strong> and save the exported configuration file into your project source code.
        </p>
      </div>

      {/* Quick Access Editor Grid */}
      <div>
        <h3 className="text-lg font-bold font-display text-slate-900 mb-4">
          Quick Content Editors
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            to="/admin/settings"
            className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">General Site Settings</span>
              <Settings className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 transition-colors" />
            </div>
            <p className="text-xs text-slate-500">
              Manage WhatsApp number ({siteConfig.whatsappNumber}), phone display, email, and social media handles.
            </p>
          </Link>

          <Link
            to="/admin/courses"
            className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">Courses & Syllabus</span>
              <BookOpen className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 transition-colors" />
            </div>
            <p className="text-xs text-slate-500">
              Edit course descriptions, session modules, pricing tiers, and prerequisites.
            </p>
          </Link>

          <Link
            to="/admin/roadmap"
            className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">Licence Roadmap</span>
              <MapPin className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 transition-colors" />
            </div>
            <p className="text-xs text-slate-500">
              Update Sarathi Parivahan documents checklist, RTO automated track rules, and instructor tips.
            </p>
          </Link>

          <Link
            to="/admin/instructors"
            className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">Instructors Roster</span>
              <Users className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 transition-colors" />
            </div>
            <p className="text-xs text-slate-500">
              Manage instructor bios, photos, languages spoken, and experience badges.
            </p>
          </Link>

          <Link
            to="/admin/pricing"
            className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">Pricing & Add-Ons</span>
              <CreditCard className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 transition-colors" />
            </div>
            <p className="text-xs text-slate-500">
              Update package pricing, hourly rates, and extra add-on service modules.
            </p>
          </Link>

          <Link
            to="/admin/faqs"
            className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">FAQ Knowledge Base</span>
              <HelpCircle className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 transition-colors" />
            </div>
            <p className="text-xs text-slate-500">
              Add and edit categorized FAQs for students and beginners.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};
