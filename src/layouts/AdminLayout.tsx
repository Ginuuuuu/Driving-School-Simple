import React, { useState } from 'react';
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Settings,
  BookOpen,
  MapPin,
  Users,
  CreditCard,
  MessageSquare,
  HelpCircle,
  Phone,
  Search,
  Shield,
  AlertTriangle,
  LogOut,
  ExternalLink,
  Download,
  Upload,
  RotateCcw,
  Menu,
  X,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Info,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useContent } from '../context/ContentContext';
import { Logo } from '../components/common/Logo';
import { Button } from '../components/common/Button';

export const AdminLayout: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const { isCustomized, resetToDefaults, exportConfigAsJSON, importConfigFromJSON } = useContent();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // If not authenticated, redirect to /admin/login cleanly
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  const navCategories = [
    {
      group: 'Overview',
      items: [
        { label: 'Dashboard', to: '/admin/dashboard', icon: LayoutDashboard },
      ],
    },
    {
      group: 'Page Editors',
      items: [
        { label: 'Homepage Editor', to: '/admin/homepage', icon: Sparkles },
        { label: 'About Us Editor', to: '/admin/about', icon: Info },
        { label: 'Courses Catalog', to: '/admin/courses', icon: BookOpen },
        { label: 'Licence Roadmap', to: '/admin/roadmap', icon: MapPin },
        { label: 'Pricing & Packages', to: '/admin/pricing', icon: CreditCard },
        { label: 'Instructors Roster', to: '/admin/instructors', icon: Users },
        { label: 'Learner Testimonials', to: '/admin/testimonials', icon: MessageSquare },
        { label: 'Resources Hub', to: '/admin/resources', icon: BookOpen },
        { label: 'FAQ Manager', to: '/admin/faqs', icon: HelpCircle },
      ],
    },
    {
      group: 'Site & System',
      items: [
        { label: 'Brand & Identity', to: '/admin/settings', icon: Settings },
        { label: 'Contact & Branches', to: '/admin/contact', icon: Phone },
        { label: 'SEO Metadata', to: '/admin/seo', icon: Search },
        { label: 'Legal Policies', to: '/admin/legal', icon: Shield },
        { label: 'Error Templates', to: '/admin/errors', icon: AlertTriangle },
      ],
    },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        if (text) {
          importConfigFromJSON(text);
        }
      };
      reader.readAsText(file);
    }
  };

  // Find active item label
  const allItems = navCategories.flatMap((c) => c.items);
  const activeItem = allItems.find((i) => i.to === location.pathname) || {
    label: 'Dashboard',
    icon: LayoutDashboard,
  };
  const ActiveIcon = activeItem.icon;

  return (
    <div className="min-h-screen flex bg-[#F5F6F7] text-[#202B33] font-sans">
      {/* Mobile Drawer Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#082B4C]/60 backdrop-blur-xs lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Admin Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#082B4C] text-white flex flex-col justify-between border-r border-[#061F36] shadow-2xl transition-transform duration-300 lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex flex-col h-full overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-[#061F36] flex items-center justify-between shrink-0">
            <Logo variant="light" size="sm" isLink={false} />
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-1.5 text-[#F5F6F7] hover:text-white rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Notice Pill */}
          <div className="px-4 pt-3 pb-1 shrink-0">
            <div className="p-2.5 rounded-xl bg-[#061F36]/80 border border-[#0A3660]/80 text-xs text-[#F5F6F7]">
              <div className="flex items-center justify-between font-bold text-white mb-0.5">
                <span className="text-[0.72rem] tracking-wide uppercase text-[#9CA3AF]">Content Engine</span>
                {isCustomized ? (
                  <span className="px-1.5 py-0.5 rounded bg-[#F4C400]/20 text-[#FFD21A] font-bold text-[0.65rem]">
                    Draft Active
                  </span>
                ) : (
                  <span className="px-1.5 py-0.5 rounded bg-[#0A3660]/80 text-[#F5F6F7] font-medium text-[0.65rem]">
                    Default
                  </span>
                )}
              </div>
              <p className="text-[0.68rem] text-[#9CA3AF] leading-tight">
                Live reactive edits. Export JSON to persist changes into code.
              </p>
            </div>
          </div>

          {/* Categorized Navigation Links */}
          <nav className="p-3 space-y-4 flex-1 overflow-y-auto custom-scrollbar">
            {navCategories.map((cat, cIdx) => (
              <div key={cIdx} className="space-y-1">
                <div className="px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-[#9CA3AF]">
                  {cat.group}
                </div>
                {cat.items.map((item) => {
                  const isActive = location.pathname === item.to;
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setIsSidebarOpen(false)}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-[#F4C400] text-[#082B4C] shadow-sm font-bold'
                          : 'text-[#F5F6F7]/80 hover:text-white hover:bg-[#061F36]/80'
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#082B4C]' : 'text-[#F5F6F7]/80'}`} />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>

          {/* Sidebar Footer Actions */}
          <div className="p-3 border-t border-[#061F36] space-y-1.5 bg-[#061F36]/60 shrink-0">
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full px-3 py-2 rounded-xl bg-[#061F36] hover:bg-[#041525] text-xs font-semibold text-[#FFD21A] transition-colors"
            >
              <span className="flex items-center gap-2">
                <ExternalLink className="w-3.5 h-3.5" />
                Live Website
              </span>
              <span className="text-[0.65rem] bg-[#082B4C] px-1.5 py-0.5 rounded text-[#FFD21A] font-mono">
                Preview ↗
              </span>
            </Link>

            <button
              onClick={logout}
              className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-950/40 transition-colors text-left"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out Admin</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Admin Area */}
      <div className="flex-1 lg:ml-64 flex flex-col min-w-0">
        {/* Admin Top Bar */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#E5E7EB] px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-[#202B33] hover:bg-[#F5F6F7] transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-[#F4C400]/15 text-[#082B4C] border border-[#E5E7EB] flex items-center justify-center shrink-0 hidden sm:flex">
                <ActiveIcon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h1 className="text-sm sm:text-base font-bold font-display text-[#202B33] truncate leading-tight">
                  {activeItem.label}
                </h1>
                <p className="text-[0.7rem] text-[#6B7280] truncate hidden md:block">
                  DriveCraft CMS & Live Content Engine
                </p>
              </div>
            </div>
          </div>

          {/* Quick Config Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={exportConfigAsJSON}
              className="text-xs hidden sm:inline-flex py-1.5"
              icon={<Download className="w-3.5 h-3.5" />}
              title="Download content data as JSON backup"
            >
              Export JSON
            </Button>

            <label className="cursor-pointer">
              <input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="sr-only"
              />
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E5E7EB] bg-white hover:bg-[#F5F6F7] text-[#202B33] text-xs font-semibold transition-colors shadow-xs">
                <Upload className="w-3.5 h-3.5 text-[#6B7280]" />
                <span className="hidden sm:inline">Import JSON</span>
              </span>
            </label>

            {isCustomized && (
              <Button
                variant="outline"
                size="sm"
                onClick={resetToDefaults}
                className="text-xs border-red-200 text-red-600 hover:bg-red-50 py-1.5"
                icon={<RotateCcw className="w-3.5 h-3.5" />}
                title="Reset all modified fields back to factory defaults"
              >
                Reset
              </Button>
            )}

            <Button
              variant="primary"
              size="sm"
              to="/"
              className="text-xs py-1.5"
              icon={<ExternalLink className="w-3.5 h-3.5" />}
            >
              Live Site
            </Button>
          </div>
        </header>

        {/* Dynamic Admin Body with Clean Padding and Spacing */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1 w-full max-w-6xl 2xl:max-w-7xl mx-auto flex flex-col items-center">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
