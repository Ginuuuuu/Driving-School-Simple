import React, { useState } from 'react';
import { Save, AlertTriangle } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { Button } from '../../components/common/Button';
import { SEO } from '../../components/common/SEO';

export const ErrorsEditor: React.FC = () => {
  const { siteData, updateErrors } = useContent();
  const { errors } = siteData;

  const [e404Title, setE404Title] = useState(errors.error404.title);
  const [e404Desc, setE404Desc] = useState(errors.error404.description);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateErrors({
      ...errors,
      error404: {
        ...errors.error404,
        title: e404Title,
        description: e404Desc,
      },
    });
  };

  return (
    <div className="max-w-4xl space-y-8">
      <SEO title="Error Templates Editor | Admin Panel" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
            Error Pages Messaging Editor
          </h2>
          <p className="text-xs text-slate-500">
            Customize 404 detour messaging and friendly recovery copy.
          </p>
        </div>

        <Button variant="primary" size="md" onClick={handleSave} icon={<Save className="w-4 h-4" />}>
          Save Error Messaging
        </Button>
      </div>

      <form onSubmit={handleSave} className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-800 border-b border-slate-100 pb-2">
            404 Not Found Page
          </h3>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              404 Headline Title
            </label>
            <input
              type="text"
              value={e404Title}
              onChange={(e) => setE404Title(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              404 Description Copy
            </label>
            <textarea
              rows={3}
              value={e404Desc}
              onChange={(e) => setE404Desc(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none"
            />
          </div>
        </div>
      </form>
    </div>
  );
};
