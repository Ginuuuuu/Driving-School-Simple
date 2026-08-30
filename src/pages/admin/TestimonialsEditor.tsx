import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X, Star } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { Testimonial } from '../../types';
import { Button } from '../../components/common/Button';
import { SEO } from '../../components/common/SEO';

export const TestimonialsEditor: React.FC = () => {
  const { siteData, updateTestimonials } = useContent();
  const { testimonials } = siteData;

  const [list, setList] = useState([...testimonials]);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    const exists = list.some((t) => t.id === editingItem.id);
    let updated: Testimonial[];
    if (exists) {
      updated = list.map((t) => (t.id === editingItem.id ? editingItem : t));
    } else {
      updated = [...list, editingItem];
    }
    setList(updated);
    updateTestimonials(updated);
    setEditingItem(null);
  };

  const handleDelete = (id: string) => {
    const updated = list.filter((t) => t.id !== id);
    setList(updated);
    updateTestimonials(updated);
  };

  const startCreate = () => {
    const newItem: Testimonial = {
      id: `test-${Date.now()}`,
      name: 'New Student Name',
      city: 'Delhi NCR',
      courseTitle: 'Beginner Driving Mastery',
      rating: 5,
      date: 'Recent',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      story: 'Great coaching experience. The dual-control car made me feel very safe.',
      vehicleLearned: 'Hatchback (Manual)',
      instructorName: 'Rajesh Verma',
      firstTimePass: true,
      tag: 'First-time Driver',
    };
    setEditingItem(newItem);
  };

  return (
    <div className="space-y-8">
      <SEO title="Testimonials Editor | Admin Panel" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
            Learner Stories & Testimonials Editor
          </h2>
          <p className="text-xs text-slate-500">
            Manage student reviews, ratings, vehicle details, and success stories.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={startCreate} icon={<Plus className="w-4 h-4" />}>
          Add Testimonial
        </Button>
      </div>

      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Edit Student Review</h3>
              <button onClick={() => setEditingItem(null)} className="p-1 text-slate-400 hover:text-slate-900">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Student Name</label>
                  <input
                    type="text"
                    required
                    value={editingItem.name}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={editingItem.city}
                    onChange={(e) => setEditingItem({ ...editingItem, city: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Review Story</label>
                <textarea
                  rows={3}
                  required
                  value={editingItem.story}
                  onChange={(e) => setEditingItem({ ...editingItem, story: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <Button variant="ghost" size="sm" onClick={() => setEditingItem(null)}>Cancel</Button>
                <Button variant="primary" size="sm" type="submit" icon={<Save className="w-4 h-4" />}>Save Review</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
        {list.map((item) => (
          <div key={item.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900">{item.name}</span>
                <span className="text-xs text-slate-500">({item.city})</span>
                <span className="text-amber-500 text-xs font-bold">⭐ {item.rating}/5</span>
              </div>
              <p className="text-xs text-slate-600 line-clamp-1 italic">"{item.story}"</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setEditingItem({ ...item })}
                className="p-2 rounded-xl text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 border border-slate-200"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(item.id)}
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
