import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
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
  FileCode,
  Sparkles,
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
  const navigate = useNavigate();

  // If not authenticated, redirect to /admin/login
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  const adminNavItems = [
    { label: 'Dashboard', to: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'General Settings', to: '/admin/settings', icon: Settings },
    { label: 'Homepage Editor', to: '/admin/homepage', icon: Sparkles },
    { label: 'Courses Catalog', to: '/admin/courses', icon: BookOpen },
    { label: 'Licence Roadmap', to: '/admin/roadmap', icon: MapPin },
    { label: 'Instructors Roster', to: '/admin/instructors', icon: Users },
    { label: 'Pricing & Packages', to: '/admin/pricing', icon: CreditCard },
    { label: 'Testimonials', to: '/admin/testimonials', icon: MessageSquare },
    { label: 'FAQ Manager', to: '/admin/faqs', icon: HelpCircle },
    { label: 'Contact & Branches', to: '/admin/contact', icon: Phone },
    { label: 'SEO Metadata', to: '/admin/seo', icon: Search },
    { label: 'Legal Policies', to: '/admin/legal', icon: Shield },
    { label: 'Error Templates', to: '/admin/errors', icon: AlertTriangle },
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

  return (
    <div className="min-h-screen flex bg-slate-100 text-slate-900 font-sans">
      {/* Mobile Drawer Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/60 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Admin Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-slate-900 text-white flex flex-col justify-between border-r border-slate-800 transition-transform duration-300 lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div>
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <Logo variant="light" size="sm" isLink={false} />
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-1.5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Notice Badge */}
          <div className="px-4 pt-3">
            <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300">
              <div className="flex items-center justify-between font-bold text-white mb-1">
                <span>Content Engine</span>
                {isCustomized ? (
                  <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 text-[0.65rem]">
                    Live Draft Active
                  </span>
                ) : (
                  <span className="px-1.5 py-0.2 rounded bg-slate-700 text-slate-300 text-[0.65rem]">
                    Factory Default
                  </span>
                )}
              </div>
              <p className="text-[0.68rem] text-slate-400 leading-tight">
                Static frontend architecture with reactive local edits. Export JSON to persist into code.
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 max-h-[calc(100vh-280px)] overflow-y-auto">
            {adminNavItems.map((item) => {
              const isActive = location.pathname === item.to;
              const Icon = item.icon;

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Actions */}
        <div className="p-4 border-t border-slate-800 space-y-2 bg-slate-950/40">
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-emerald-300 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              View Live Website
            </span>
            <span className="text-[0.65rem] bg-emerald-950 px-1.5 py-0.5 rounded text-emerald-400">Preview</span>
          </Link>

          <button
            onClick={logout}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-950/40 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out Administrator</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Area */}
      <div className="flex-1 lg:ml-64 flex flex-col min-w-0">
        {/* Admin Top Bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-base sm:text-lg font-bold font-display text-slate-900 leading-tight">
                DriveCraft Content Control Center
              </h1>
              <p className="text-xs text-slate-500 hidden sm:block">
                Centralized CMS & Live Configuration Manager (No Database Required)
              </p>
            </div>
          </div>

          {/* Quick Config Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={exportConfigAsJSON}
              className="text-xs hidden sm:inline-flex"
              icon={<Download className="w-3.5 h-3.5" />}
              title="Download content data as JSON to save into repository"
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
              <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors">
                <Upload className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Import JSON</span>
              </span>
            </label>

            {isCustomized && (
              <Button
                variant="outline"
                size="sm"
                onClick={resetToDefaults}
                className="text-xs border-red-200 text-red-600 hover:bg-red-50"
                icon={<RotateCcw className="w-3.5 h-3.5" />}
                title="Reset all modified fields back to factory code defaults"
              >
                Reset
              </Button>
            )}

            <Button
              variant="primary"
              size="sm"
              to="/"
              className="text-xs"
              icon={<ExternalLink className="w-3.5 h-3.5" />}
            >
              Live Site
            </Button>
          </div>
        </header>

        {/* Dynamic Admin Body */}
        <main className="p-4 sm:p-8 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
