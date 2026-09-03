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
  ArrowRight,
  Search,
  Shield,
  AlertTriangle,
  Info,
  Layers,
} from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { Button } from '../../components/common/Button';
import { SEO } from '../../components/common/SEO';

export const Dashboard: React.FC = () => {
  const { siteData, isCustomized, exportConfigAsJSON } = useContent();
  const { siteConfig, courses, roadmap, instructors, pricing, testimonials, faqs, resources } = siteData;

  const quickStats = [
    { label: 'Courses Catalog', count: courses.length, to: '/admin/courses', icon: BookOpen, color: 'text-[#082B4C] bg-[#F4C400]/20 border-[#F4C400]/40' },
    { label: 'Licence Milestones', count: roadmap.length, to: '/admin/roadmap', icon: MapPin, color: 'text-amber-700 bg-amber-50 border-amber-200' },
    { label: 'Certified Mentors', count: instructors.length, to: '/admin/instructors', icon: Users, color: 'text-blue-700 bg-blue-50 border-blue-200' },
    { label: 'Pricing Packages', count: pricing.packages.length, to: '/admin/pricing', icon: CreditCard, color: 'text-purple-700 bg-purple-50 border-purple-200' },
    { label: 'Student Reviews', count: testimonials.length, to: '/admin/testimonials', icon: MessageSquare, color: 'text-pink-700 bg-pink-50 border-pink-200' },
    { label: 'Learning Guides', count: resources.length, to: '/admin/resources', icon: BookOpen, color: 'text-[#082B4C] bg-[#F5F6F7] border-[#E5E7EB]' },
    { label: 'Active FAQs', count: faqs.length, to: '/admin/faqs', icon: HelpCircle, color: 'text-indigo-700 bg-indigo-50 border-indigo-200' },
    { label: 'Branch Hubs', count: siteConfig.branches.length, to: '/admin/contact', icon: Phone, color: 'text-rose-700 bg-rose-50 border-rose-200' },
  ];

  const editorCategories = [
    {
      title: 'Page Content Editors',
      description: 'Manage homepage banners, team showcase, about story, learning hub, and course catalogue.',
      links: [
        { name: 'Homepage (Hero, Stats, Values, Team)', to: '/admin/homepage', icon: Sparkles },
        { name: 'About Us (Mission, Pledge, Pillars)', to: '/admin/about', icon: Info },
        { name: 'Courses Catalog & Syllabus', to: '/admin/courses', icon: BookOpen, count: courses.length },
        { name: 'Resources & RTO Learning Guides', to: '/admin/resources', icon: BookOpen, count: resources.length },
      ],
    },
    {
      title: 'Learner Experience & Proof',
      description: 'Update the 6-step RTO licence roadmap, certified instructor roster, and learner reviews.',
      links: [
        { name: 'Licence Roadmap & ADTT Drills', to: '/admin/roadmap', icon: MapPin, count: roadmap.length },
        { name: 'Pricing Packages & Add-Ons', to: '/admin/pricing', icon: CreditCard, count: pricing.packages.length },
        { name: 'Instructors & Mentors Roster', to: '/admin/instructors', icon: Users, count: instructors.length },
        { name: 'Learner Reviews & Testimonials', to: '/admin/testimonials', icon: MessageSquare, count: testimonials.length },
      ],
    },
    {
      title: 'Site Identity & System',
      description: 'Configure brand settings, WhatsApp / phone support channels, FAQs, and SEO tags.',
      links: [
        { name: 'Brand Identity & Socials', to: '/admin/settings', icon: Settings },
        { name: 'Contact, Hours & Branch Hubs', to: '/admin/contact', icon: Phone, count: siteConfig.branches.length },
        { name: 'FAQ Support Center', to: '/admin/faqs', icon: HelpCircle, count: faqs.length },
        { name: 'SEO & SERP Metadata', to: '/admin/seo', icon: Search },
        { name: 'Legal Policies (DPDP & Terms)', to: '/admin/legal', icon: Shield },
        { name: 'Error Pages & Detour Copy', to: '/admin/errors', icon: AlertTriangle },
      ],
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 w-full max-w-6xl mx-auto">
      <SEO title="Admin Dashboard | DriveCraft Content Control Center" />

      {/* Welcome Banner */}
      <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-[#082B4C] text-white border border-[#061F36] shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#F4C400]/20 text-[#F4C400] border border-[#F4C400]/40">
            <Sparkles className="w-3.5 h-3.5 text-[#F4C400]" /> Content Control Center
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-display text-white">
            Welcome, {siteConfig.brandName} Administrator
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 max-w-xl leading-relaxed">
            Every page across your website is fully editable in real time. Use the structured editors below to customize hero copy, team members, courses, milestones, and branch hubs.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 relative z-10">
          <Button
            variant="primary"
            size="md"
            onClick={exportConfigAsJSON}
            icon={<Download className="w-4 h-4" />}
          >
            Export JSON Backup
          </Button>

          <Button
            variant="outline"
            size="md"
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="border-slate-500 text-slate-100 hover:text-white"
            icon={<ExternalLink className="w-4 h-4" />}
          >
            View Live Site
          </Button>
        </div>
      </div>

      {/* KPI Overview Cards */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold font-display uppercase tracking-wider text-slate-500">
            Live Catalog & Metrics Overview
          </h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-3.5">
          {quickStats.map((stat, idx) => {
            const Icon = stat.icon;

            return (
              <Link
                key={idx}
                to={stat.to}
                className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md hover:border-slate-300 hover-lift transition-all space-y-1.5 group flex flex-col justify-between"
              >
                <div className={`w-7 h-7 rounded-xl border flex items-center justify-center ${stat.color}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xl font-bold font-display text-slate-900 group-hover:text-[#082B4C] transition-colors">
                    {stat.count}
                  </div>
                  <div className="text-[0.7rem] font-semibold text-slate-600 truncate">
                    {stat.label}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Categorized Quick Editors Grid */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold font-display uppercase tracking-wider text-slate-500">
          All Page & Module Editors
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch">
          {editorCategories.map((cat, cIdx) => (
            <div
              key={cIdx}
              className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between hover:shadow-sm transition-all h-full"
            >
              <div className="space-y-1.5">
                <h4 className="text-base font-bold font-display text-slate-900">
                  {cat.title}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                {cat.links.map((link, lIdx) => {
                  const LinkIcon = link.icon;

                  return (
                    <Link
                      key={lIdx}
                      to={link.to}
                      className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-slate-50 hover:bg-[#F4C400]/10 text-slate-700 hover:text-[#082B4C] border border-slate-100 hover:border-[#F4C400]/40 transition-all group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <LinkIcon className="w-4 h-4 text-slate-400 group-hover:text-[#082B4C] shrink-0 transition-colors" />
                        <span className="text-xs font-semibold truncate">{link.name}</span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {link.count !== undefined && (
                          <span className="px-1.5 py-0.5 rounded-md bg-white border border-slate-200 text-[0.68rem] font-mono font-bold text-slate-600">
                            {link.count}
                          </span>
                        )}
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#082B4C] group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Persistence Guide */}
      <div className="p-5 sm:p-6 rounded-3xl bg-slate-100/90 border border-slate-200 text-xs text-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1 max-w-2xl">
          <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <FileCode className="w-4 h-4 text-[#082B4C]" />
            Instant Browser State & Repository Sync
          </div>
          <p className="text-slate-600 leading-relaxed">
            All modifications you save in the Admin Panel update the live website immediately using persistent browser storage. You can click <strong>"Export JSON Backup"</strong> anytime to download a snapshot or commit it to your repository.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={exportConfigAsJSON}
          className="shrink-0 bg-white"
          icon={<Download className="w-3.5 h-3.5" />}
        >
          Export JSON
        </Button>
      </div>
    </div>
  );
};
