import React, { useState } from 'react';
import { Save, AlertTriangle, RefreshCw, Sparkles, WifiOff, ShieldAlert } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { Button } from '../../components/common/Button';
import { SEO } from '../../components/common/SEO';
import { ErrorContent } from '../../types';

export const ErrorsEditor: React.FC = () => {
  const { siteData, updateErrors } = useContent();
  const { errors } = siteData;

  const [activeTab, setActiveTab] = useState<'404' | '500' | 'offline'>('404');
  const [errorState, setErrorState] = useState<ErrorContent>(JSON.parse(JSON.stringify(errors)));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateErrors(errorState);
  };

  return (
    <div className="space-y-6 sm:space-y-8 w-full">
      <SEO title="Error Templates Editor | Admin Panel" />

      {/* Header with Title and Global Save CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider mb-1">
            <AlertTriangle className="w-4 h-4" />
            <span>Detour & Error Pages</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
            Error & Offline Fallback Messaging
          </h2>
          <p className="text-xs text-slate-500">
            Customize 404 detour messaging, 500 server error notices, and offline network reconnect copy.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button variant="primary" size="md" onClick={handleSave} icon={<Save className="w-4 h-4" />}>
            Save Error Messaging
          </Button>
        </div>
      </div>

      {/* Tabbed Navigation Bar */}
      <div className="flex items-center gap-2 overflow-x-auto p-1.5 bg-slate-200/60 rounded-2xl border border-slate-200">
        <button
          onClick={() => setActiveTab('404')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === '404'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5 text-emerald-600" />
          404 Page Not Found
        </button>

        <button
          onClick={() => setActiveTab('500')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === '500'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5 text-emerald-600" />
          500 Server Exception
        </button>

        <button
          onClick={() => setActiveTab('offline')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'offline'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <WifiOff className="w-3.5 h-3.5 text-emerald-600" />
          Offline Reconnect
        </button>
      </div>

      {/* TAB 1: 404 NOT FOUND */}
      {activeTab === '404' && (
        <form onSubmit={handleSave} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              404 Road Detour Page (Page Not Found)
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                404 Headline Title
              </label>
              <input
                type="text"
                value={errorState.error404.title}
                onChange={(e) =>
                  setErrorState({
                    ...errorState,
                    error404: { ...errorState.error404, title: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                404 Description Copy
              </label>
              <textarea
                rows={3}
                value={errorState.error404.description}
                onChange={(e) =>
                  setErrorState({
                    ...errorState,
                    error404: { ...errorState.error404, description: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 leading-relaxed"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <Button variant="primary" size="md" type="submit" icon={<Save className="w-4 h-4" />}>
              Save 404 Copy
            </Button>
          </div>
        </form>
      )}

      {/* TAB 2: 500 SERVER ERROR */}
      {activeTab === '500' && (
        <form onSubmit={handleSave} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              500 Internal Server Stalled Message
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                500 Headline Title
              </label>
              <input
                type="text"
                value={errorState.error500?.title || 'Engine Stalled (Server Error)'}
                onChange={(e) =>
                  setErrorState({
                    ...errorState,
                    error500: {
                      ...errorState.error500,
                      title: e.target.value,
                    },
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                500 Description Copy
              </label>
              <textarea
                rows={3}
                value={errorState.error500?.description || 'Our roadside technical assistance team has been dispatched. Please refresh the page in a moment.'}
                onChange={(e) =>
                  setErrorState({
                    ...errorState,
                    error500: {
                      ...errorState.error500,
                      description: e.target.value,
                    },
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 leading-relaxed"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <Button variant="primary" size="md" type="submit" icon={<Save className="w-4 h-4" />}>
              Save 500 Copy
            </Button>
          </div>
        </form>
      )}

      {/* TAB 3: OFFLINE */}
      {activeTab === 'offline' && (
        <form onSubmit={handleSave} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Offline / Disconnected State Banner
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Offline Notification Headline
              </label>
              <input
                type="text"
                value={errorState.offline?.title || 'You Are Currently Offline'}
                onChange={(e) =>
                  setErrorState({
                    ...errorState,
                    offline: {
                      ...errorState.offline,
                      title: e.target.value,
                    },
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Offline Explanation Copy
              </label>
              <textarea
                rows={3}
                value={errorState.offline?.description || 'Please check your internet connection to continue browsing driving slots and updates.'}
                onChange={(e) =>
                  setErrorState({
                    ...errorState,
                    offline: {
                      ...errorState.offline,
                      description: e.target.value,
                    },
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 leading-relaxed"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <Button variant="primary" size="md" type="submit" icon={<Save className="w-4 h-4" />}>
              Save Offline Copy
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
