import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X, HelpCircle } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { FAQItem } from '../../types';
import { Button } from '../../components/common/Button';
import { SEO } from '../../components/common/SEO';

export const FAQEditor: React.FC = () => {
  const { siteData, updateFAQs } = useContent();
  const { faqs } = siteData;

  const [list, setList] = useState([...faqs]);
  const [editingFAQ, setEditingFAQ] = useState<FAQItem | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFAQ) return;

    const exists = list.some((f) => f.id === editingFAQ.id);
    let updated: FAQItem[];
    if (exists) {
      updated = list.map((f) => (f.id === editingFAQ.id ? editingFAQ : f));
    } else {
      updated = [...list, editingFAQ];
    }
    setList(updated);
    updateFAQs(updated);
    setEditingFAQ(null);
  };

  const handleDelete = (id: string) => {
    const updated = list.filter((f) => f.id !== id);
    setList(updated);
    updateFAQs(updated);
  };

  const startCreate = () => {
    const newFAQ: FAQItem = {
      id: `faq-${Date.now()}`,
      category: 'Licence & RTO',
      question: 'New Question Title?',
      answer: 'Detailed answer explanation for students.',
      popular: false,
    };
    setEditingFAQ(newFAQ);
  };

  return (
    <div className="space-y-8">
      <SEO title="FAQ Manager | Admin Panel" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
            Frequently Asked Questions Editor
          </h2>
          <p className="text-xs text-slate-500">
            Add and categorize questions about licence rules, lesson schedules, and pricing.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={startCreate} icon={<Plus className="w-4 h-4" />}>
          Add FAQ
        </Button>
      </div>

      {editingFAQ && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Edit FAQ</h3>
              <button onClick={() => setEditingFAQ(null)} className="p-1 text-slate-400 hover:text-slate-900">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Category</label>
                <select
                  value={editingFAQ.category}
                  onChange={(e) => setEditingFAQ({ ...editingFAQ, category: e.target.value as any })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                >
                  <option value="Licence & RTO">Licence & RTO</option>
                  <option value="Lessons & Scheduling">Lessons & Scheduling</option>
                  <option value="Vehicles & Safety">Vehicles & Safety</option>
                  <option value="Pricing & Payments">Pricing & Payments</option>
                  <option value="Beginners">Beginners</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Question</label>
                <input
                  type="text"
                  required
                  value={editingFAQ.question}
                  onChange={(e) => setEditingFAQ({ ...editingFAQ, question: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Answer</label>
                <textarea
                  rows={4}
                  required
                  value={editingFAQ.answer}
                  onChange={(e) => setEditingFAQ({ ...editingFAQ, answer: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <Button variant="ghost" size="sm" onClick={() => setEditingFAQ(null)}>Cancel</Button>
                <Button variant="primary" size="sm" type="submit" icon={<Save className="w-4 h-4" />}>Save FAQ</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
        {list.map((faq) => (
          <div key={faq.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors">
            <div className="space-y-1">
              <span className="text-[0.65rem] uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                {faq.category}
              </span>
              <h4 className="font-bold text-slate-900 text-sm">{faq.question}</h4>
              <p className="text-xs text-slate-500 line-clamp-1">{faq.answer}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setEditingFAQ({ ...faq })}
                className="p-2 rounded-xl text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 border border-slate-200"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(faq.id)}
                className="p-2 rounded-xl text-slate-400 hover:text-red-700 hover:bg-red-50 border border-slate-200"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
