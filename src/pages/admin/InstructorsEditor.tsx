import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X, Users, Star, ShieldCheck } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { Instructor } from '../../types';
import { Button } from '../../components/common/Button';
import { SEO } from '../../components/common/SEO';

export const InstructorsEditor: React.FC = () => {
  const { siteData, updateInstructors } = useContent();
  const { instructors } = siteData;

  const [list, setList] = useState([...instructors]);
  const [editingInst, setEditingInst] = useState<Instructor | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingInst) return;

    const exists = list.some((i) => i.id === editingInst.id);
    let updated: Instructor[];
    if (exists) {
      updated = list.map((i) => (i.id === editingInst.id ? editingInst : i));
    } else {
      updated = [...list, editingInst];
    }
    setList(updated);
    updateInstructors(updated);
    setEditingInst(null);
  };

  const handleDelete = (id: string) => {
    const updated = list.filter((i) => i.id !== id);
    setList(updated);
    updateInstructors(updated);
  };

  const startCreate = () => {
    const newInst: Instructor = {
      id: `inst-${Date.now()}`,
      name: 'New Instructor Name',
      role: 'Certified Driving Coach',
      experienceYears: 8,
      rating: 4.95,
      studentCount: 1200,
      photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
      bio: 'Experienced certified driving coach specializing in patient beginner training.',
      languages: ['English', 'Hindi'],
      specialties: ['Dual-Control Safety', 'City Traffic'],
      transmissionSpecialty: 'both',
      verifiedBadges: ['MoRTH Certified', 'Patient Mentor'],
      quote: 'Safe habits lead to lifelong confident driving.',
    };
    setEditingInst(newInst);
  };

  return (
    <div className="space-y-8">
      <SEO title="Instructors Roster Editor | Admin Panel" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
            Instructors & Mentors Roster
          </h2>
          <p className="text-xs text-slate-500">
            Manage certified instructor profiles, photos, student ratings, and languages.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={startCreate} icon={<Plus className="w-4 h-4" />}>
          Add Instructor
        </Button>
      </div>

      {/* Edit Drawer Modal */}
      {editingInst && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 my-8 max-h-[85vh] overflow-y-auto space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold font-display text-slate-900">
                Edit Instructor: {editingInst.name}
              </h3>
              <button onClick={() => setEditingInst(null)} className="p-2 text-slate-400 hover:text-slate-900">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={editingInst.name}
                    onChange={(e) => setEditingInst({ ...editingInst, name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Role / Designation</label>
                  <input
                    type="text"
                    required
                    value={editingInst.role}
                    onChange={(e) => setEditingInst({ ...editingInst, role: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Experience (Yrs)</label>
                  <input
                    type="number"
                    value={editingInst.experienceYears}
                    onChange={(e) => setEditingInst({ ...editingInst, experienceYears: parseInt(e.target.value, 10) || 0 })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Rating (Out of 5)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingInst.rating}
                    onChange={(e) => setEditingInst({ ...editingInst, rating: parseFloat(e.target.value) || 5.0 })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Photo URL</label>
                  <input
                    type="url"
                    value={editingInst.photoUrl}
                    onChange={(e) => setEditingInst({ ...editingInst, photoUrl: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Instructor Bio</label>
                <textarea
                  rows={3}
                  value={editingInst.bio}
                  onChange={(e) => setEditingInst({ ...editingInst, bio: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <Button variant="ghost" size="md" onClick={() => setEditingInst(null)}>
                  Cancel
                </Button>
                <Button variant="primary" size="md" type="submit" icon={<Save className="w-4 h-4" />}>
                  Save Instructor
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Instructors Table List */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
        {list.map((inst) => (
          <div key={inst.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors">
            <div className="flex items-center gap-3">
              <img src={inst.photoUrl} alt={inst.name} className="w-12 h-12 rounded-full object-cover border" />
              <div>
                <h4 className="font-bold text-slate-900 text-base">{inst.name}</h4>
                <p className="text-xs text-slate-500">{inst.role} • {inst.experienceYears}+ yrs exp • ⭐ {inst.rating}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setEditingInst({ ...inst })}
                className="p-2 rounded-xl text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 border border-slate-200 transition-colors"
                title="Edit Instructor"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(inst.id)}
                className="p-2 rounded-xl text-slate-400 hover:text-red-700 hover:bg-red-50 border border-slate-200 transition-colors"
                title="Delete Instructor"
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
