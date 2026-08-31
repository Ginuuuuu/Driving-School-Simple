import React, { useState } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  Star,
  MessageSquare,
  CheckCircle2,
} from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { Testimonial } from '../../types';
import { Button } from '../../components/common/Button';
import { SEO } from '../../components/common/SEO';

export const TestimonialsEditor: React.FC = () => {
  const { siteData, updateTestimonials } = useContent();
  const { testimonials } = siteData;

  const [list, setList] = useState<Testimonial[]>([...testimonials]);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  const startEdit = (item: Testimonial) => {
    setEditingItem(JSON.parse(JSON.stringify(item)));
    setIsCreatingNew(false);
  };

  const startCreate = () => {
    const newItem: Testimonial = {
      id: `test-${Date.now()}`,
      name: 'New Student Name',
      city: 'Delhi NCR',
      age: 24,
      courseTitle: 'Comprehensive Beginner Mastery',
      rating: 5,
      date: 'Recent',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      story: 'The dual-control safety vehicle and patient coaching gave me complete peace of mind. Cleared my RTO test on the first attempt!',
      vehicleLearned: 'Hatchback (Manual)',
      instructorName: 'Rajesh Verma',
      firstTimePass: true,
      tag: 'First-time Driver',
    };
    setEditingItem(newItem);
    setIsCreatingNew(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    let updated: Testimonial[];
    if (isCreatingNew) {
      updated = [...list, editingItem];
    } else {
      updated = list.map((t) => (t.id === editingItem.id ? editingItem : t));
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

  return (
    <div className="space-y-6 max-w-5xl">
      <SEO title="Testimonials Editor | Admin Panel" />

      {/* Header with Title and Global Add CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider mb-1">
            <MessageSquare className="w-4 h-4" />
            <span>Reviews Management</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
            Learner Stories & Testimonials ({list.length})
          </h2>
          <p className="text-xs text-slate-500">
            Manage verified student reviews, ratings, vehicle details, and success stories.
          </p>
        </div>

        <Button variant="primary" size="md" onClick={startCreate} icon={<Plus className="w-4 h-4" />}>
          Add Review
        </Button>
      </div>

      {/* Testimonials List */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
        {list.map((item) => (
          <div
            key={item.id}
            className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors"
          >
            <div className="flex items-center gap-4 min-w-0">
              <img
                src={item.avatarUrl}
                alt={item.name}
                className="w-12 h-12 rounded-full object-cover border border-slate-200 bg-white shrink-0"
              />
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-slate-900 text-base">{item.name}</span>
                  <span className="text-xs text-slate-500 font-medium">({item.city})</span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {item.rating}/5
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {item.tag}
                  </span>
                  {item.firstTimePass && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-slate-900 text-white">
                      1st Pass
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 line-clamp-1 italic max-w-xl">
                  "{item.story}"
                </p>
                <p className="text-[0.7rem] text-slate-400">
                  Course: {item.courseTitle} • Vehicle: {item.vehicleLearned} • Mentor: {item.instructorName}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => startEdit(item)}
                className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 border border-slate-200 transition-colors flex items-center gap-1.5"
              >
                <Edit2 className="w-3.5 h-3.5" /> Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-2 rounded-xl text-slate-400 hover:text-red-700 hover:bg-red-50 border border-slate-200 transition-colors"
                title="Delete Testimonial"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Drawer Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 my-8 max-h-[88vh] overflow-y-auto space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 inline-block mb-1">
                  {isCreatingNew ? 'Add New Review' : 'Edit Student Story'}
                </span>
                <h3 className="text-xl font-bold font-display text-slate-900">
                  {editingItem.name}
                </h3>
              </div>

              <button
                onClick={() => setEditingItem(null)}
                className="p-2 text-slate-400 hover:text-slate-900 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Student Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.name}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    City / Location
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.city}
                    onChange={(e) => setEditingItem({ ...editingItem, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Age
                  </label>
                  <input
                    type="number"
                    value={editingItem.age || 25}
                    onChange={(e) => setEditingItem({ ...editingItem, age: parseInt(e.target.value) || 25 })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Course Taken
                  </label>
                  <input
                    type="text"
                    value={editingItem.courseTitle}
                    onChange={(e) => setEditingItem({ ...editingItem, courseTitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Star Rating (1 - 5)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={editingItem.rating}
                    onChange={(e) => setEditingItem({ ...editingItem, rating: parseInt(e.target.value) || 5 })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Learner Persona Tag
                  </label>
                  <select
                    value={editingItem.tag}
                    onChange={(e) => setEditingItem({ ...editingItem, tag: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold"
                  >
                    <option value="First-time Driver">First-time Driver</option>
                    <option value="Nervous Driver">Nervous Driver</option>
                    <option value="Working Professional">Working Professional</option>
                    <option value="Senior Citizen">Senior Citizen</option>
                    <option value="Highway Commuter">Highway Commuter</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Vehicle Trained In
                  </label>
                  <input
                    type="text"
                    value={editingItem.vehicleLearned}
                    onChange={(e) => setEditingItem({ ...editingItem, vehicleLearned: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800"
                    placeholder="Hatchback (Manual)"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Instructor / Mentor Name
                  </label>
                  <input
                    type="text"
                    value={editingItem.instructorName}
                    onChange={(e) => setEditingItem({ ...editingItem, instructorName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800"
                  />
                </div>

                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingItem.firstTimePass}
                      onChange={(e) => setEditingItem({ ...editingItem, firstTimePass: e.target.checked })}
                      className="rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>Passed RTO on 1st Attempt</span>
                  </label>
                </div>

                <div className="sm:col-span-3 space-y-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Avatar Photo URL
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="url"
                      value={editingItem.avatarUrl}
                      onChange={(e) => setEditingItem({ ...editingItem, avatarUrl: e.target.value })}
                      className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-mono text-slate-800"
                    />
                    <img
                      src={editingItem.avatarUrl}
                      alt="Preview"
                      className="w-10 h-10 rounded-full object-cover border border-slate-200 bg-white shrink-0"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Student Review & Feedback Story
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={editingItem.story}
                    onChange={(e) => setEditingItem({ ...editingItem, story: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 leading-relaxed"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <Button variant="ghost" size="md" onClick={() => setEditingItem(null)}>
                  Cancel
                </Button>
                <Button variant="primary" size="md" type="submit" icon={<Save className="w-4 h-4" />}>
                  Save Testimonial
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
