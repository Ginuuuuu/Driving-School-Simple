import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X, HelpCircle, Star, Filter } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { FAQItem } from '../../types';
import { Button } from '../../components/common/Button';
import { SEO } from '../../components/common/SEO';

const CATEGORIES = [
  'All',
  'Licence & RTO',
  'Lessons & Scheduling',
  'Vehicles & Safety',
  'Pricing & Payments',
  'Beginners',
] as const;

export const FAQEditor: React.FC = () => {
  const { siteData, updateFAQs } = useContent();
  const { faqs } = siteData;

  const [list, setList] = useState<FAQItem[]>([...faqs]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [editingFAQ, setEditingFAQ] = useState<FAQItem | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  const filteredList =
    selectedCategory === 'All'
      ? list
      : list.filter((f) => f.category === selectedCategory);

  const startEdit = (faq: FAQItem) => {
    setEditingFAQ(JSON.parse(JSON.stringify(faq)));
    setIsCreatingNew(false);
  };

  const startCreate = () => {
    const newFAQ: FAQItem = {
      id: `faq-${Date.now()}`,
      category: (selectedCategory === 'All' ? 'Licence & RTO' : selectedCategory) as any,
      question: 'New Question Title?',
      answer: 'Comprehensive and helpful answer explanation for driving students.',
      popular: false,
    };
    setEditingFAQ(newFAQ);
    setIsCreatingNew(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFAQ) return;

    let updated: FAQItem[];
    if (isCreatingNew) {
      updated = [...list, editingFAQ];
    } else {
      updated = list.map((f) => (f.id === editingFAQ.id ? editingFAQ : f));
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

  return (
    <div className="space-y-6 sm:space-y-8 w-full">
      <SEO title="FAQ Editor | Admin Panel" />

      {/* Header with Title and Global Add CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider mb-1">
            <HelpCircle className="w-4 h-4" />
            <span>Support & FAQs</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
            Frequently Asked Questions ({list.length})
          </h2>
          <p className="text-xs text-slate-500">
            Add, update, or reorganize answers to common learner questions by category.
          </p>
        </div>

        <Button variant="primary" size="md" onClick={startCreate} icon={<Plus className="w-4 h-4" />}>
          Add New Question
        </Button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto p-1.5 bg-slate-200/60 rounded-2xl border border-slate-200">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            {cat} {cat !== 'All' && `(${list.filter((f) => f.category === cat).length})`}
          </button>
        ))}
      </div>

      {/* FAQ List */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
        {filteredList.map((faq) => (
          <div
            key={faq.id}
            className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors"
          >
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[0.65rem] uppercase font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {faq.category}
                </span>
                {faq.popular && (
                  <span className="text-[0.65rem] uppercase font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 flex items-center gap-1">
                    <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" /> Pinned
                  </span>
                )}
                <h4 className="font-bold text-slate-900 text-sm sm:text-base">{faq.question}</h4>
              </div>
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {faq.answer}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => startEdit(faq)}
                className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 border border-slate-200 transition-colors flex items-center gap-1.5"
              >
                <Edit2 className="w-3.5 h-3.5" /> Edit
              </button>
              <button
                onClick={() => handleDelete(faq.id)}
                className="p-2 rounded-xl text-slate-400 hover:text-red-700 hover:bg-red-50 border border-slate-200 transition-colors"
                title="Delete Question"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Drawer Modal */}
      {editingFAQ && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 inline-block mb-1">
                  {isCreatingNew ? 'Add New Question' : 'Edit FAQ Item'}
                </span>
                <h3 className="text-lg font-bold font-display text-slate-900">
                  {isCreatingNew ? 'New FAQ' : editingFAQ.question}
                </h3>
              </div>

              <button onClick={() => setEditingFAQ(null)} className="p-2 text-slate-400 hover:text-slate-900 rounded-xl">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Category
                  </label>
                  <select
                    value={editingFAQ.category}
                    onChange={(e) => setEditingFAQ({ ...editingFAQ, category: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  >
                    <option value="Licence & RTO">Licence & RTO</option>
                    <option value="Lessons & Scheduling">Lessons & Scheduling</option>
                    <option value="Vehicles & Safety">Vehicles & Safety</option>
                    <option value="Pricing & Payments">Pricing & Payments</option>
                    <option value="Beginners">Beginners</option>
                  </select>
                </div>

                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingFAQ.popular || false}
                      onChange={(e) => setEditingFAQ({ ...editingFAQ, popular: e.target.checked })}
                      className="rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>Pin to Top as Popular FAQ</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Question
                </label>
                <input
                  type="text"
                  required
                  value={editingFAQ.question}
                  onChange={(e) => setEditingFAQ({ ...editingFAQ, question: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  placeholder="e.g. Do you provide doorstep pickup for daily lessons?"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Detailed Answer
                </label>
                <textarea
                  rows={4}
                  required
                  value={editingFAQ.answer}
                  onChange={(e) => setEditingFAQ({ ...editingFAQ, answer: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 leading-relaxed"
                  placeholder="Provide a clear, reassuring answer..."
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <Button variant="ghost" size="md" onClick={() => setEditingFAQ(null)}>
                  Cancel
                </Button>
                <Button variant="primary" size="md" type="submit" icon={<Save className="w-4 h-4" />}>
                  Save FAQ
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
