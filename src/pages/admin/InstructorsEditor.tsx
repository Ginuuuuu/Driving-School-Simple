import React, { useState } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  Users,
  Star,
  ShieldCheck,
  Award,
  Languages,
  Car,
} from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { Instructor } from '../../types';
import { Button } from '../../components/common/Button';
import { SEO } from '../../components/common/SEO';

export const InstructorsEditor: React.FC = () => {
  const { siteData, updateInstructors } = useContent();
  const { instructors } = siteData;

  const [list, setList] = useState<Instructor[]>([...instructors]);
  const [editingInst, setEditingInst] = useState<Instructor | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  const startEdit = (inst: Instructor) => {
    setEditingInst(JSON.parse(JSON.stringify(inst)));
    setIsCreatingNew(false);
  };

  const startCreate = () => {
    const newInst: Instructor = {
      id: `inst-${Date.now()}`,
      name: 'New Certified Mentor',
      role: 'Senior Driving Mentor',
      experienceYears: 6,
      rating: 4.95,
      studentCount: 850,
      photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      bio: 'Certified driver coach specializing in calm, stress-free training for nervous learners.',
      languages: ['English', 'Hindi'],
      specialties: ['Dual-Control Safety', 'City Traffic', 'RTO Automated Track Drills'],
      transmissionSpecialty: 'both',
      verifiedBadges: ['MoRTH Certified', 'Zero-Accident Safety Fleet', 'Patient Coach'],
      quote: 'Patience and repetition build unshakeable confidence behind the wheel.',
    };
    setEditingInst(newInst);
    setIsCreatingNew(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingInst) return;

    let updated: Instructor[];
    if (isCreatingNew) {
      updated = [...list, editingInst];
    } else {
      updated = list.map((i) => (i.id === editingInst.id ? editingInst : i));
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

  return (
    <div className="space-y-6 max-w-5xl">
      <SEO title="Instructors Roster Editor | Admin Panel" />

      {/* Header with Title and Global Add CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider mb-1">
            <Users className="w-4 h-4" />
            <span>Roster Management</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
            Certified Instructors & Mentors Roster
          </h2>
          <p className="text-xs text-slate-500">
            Manage certified coach profiles, ratings, languages, vehicle specialties, and safety badges.
          </p>
        </div>

        <Button variant="primary" size="md" onClick={startCreate} icon={<Plus className="w-4 h-4" />}>
          Add New Mentor
        </Button>
      </div>

      {/* Instructors List Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
        {list.map((inst) => (
          <div
            key={inst.id}
            className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors"
          >
            <div className="flex items-center gap-4 min-w-0">
              <img
                src={inst.photoUrl}
                alt={inst.name}
                className="w-14 h-14 rounded-2xl object-cover border border-slate-200 bg-white shrink-0"
              />
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-bold font-display text-slate-900 text-base">{inst.name}</h4>
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {inst.rating}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                    {inst.experienceYears}+ Yrs Exp
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold uppercase bg-slate-900 text-white">
                    {inst.transmissionSpecialty}
                  </span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-1 max-w-xl">
                  {inst.role} • {inst.languages.join(', ')} • {inst.studentCount}+ Learners
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => startEdit(inst)}
                className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 border border-slate-200 transition-colors flex items-center gap-1.5"
              >
                <Edit2 className="w-3.5 h-3.5" /> Edit
              </button>
              <button
                onClick={() => handleDelete(inst.id)}
                className="p-2 rounded-xl text-slate-400 hover:text-red-700 hover:bg-red-50 border border-slate-200 transition-colors"
                title="Delete Mentor"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Drawer Modal */}
      {editingInst && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 my-8 max-h-[88vh] overflow-y-auto space-y-6 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 inline-block mb-1">
                  {isCreatingNew ? 'Create New Mentor' : 'Edit Mentor Profile'}
                </span>
                <h3 className="text-xl font-bold font-display text-slate-900">
                  {editingInst.name}
                </h3>
              </div>

              <button
                onClick={() => setEditingInst(null)}
                className="p-2 text-slate-400 hover:text-slate-900 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={editingInst.name}
                    onChange={(e) => setEditingInst({ ...editingInst, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Role / Designation
                  </label>
                  <input
                    type="text"
                    required
                    value={editingInst.role}
                    onChange={(e) => setEditingInst({ ...editingInst, role: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Experience (Years)
                  </label>
                  <input
                    type="number"
                    value={editingInst.experienceYears}
                    onChange={(e) => setEditingInst({ ...editingInst, experienceYears: parseInt(e.target.value, 10) || 0 })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Star Rating (e.g. 4.95)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingInst.rating}
                    onChange={(e) => setEditingInst({ ...editingInst, rating: parseFloat(e.target.value) || 5.0 })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Student Count Trained
                  </label>
                  <input
                    type="number"
                    value={editingInst.studentCount}
                    onChange={(e) => setEditingInst({ ...editingInst, studentCount: parseInt(e.target.value, 10) || 0 })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Transmission Specialty
                  </label>
                  <select
                    value={editingInst.transmissionSpecialty}
                    onChange={(e) => setEditingInst({ ...editingInst, transmissionSpecialty: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold"
                  >
                    <option value="both">Both (Manual & Automatic)</option>
                    <option value="manual">Manual Specialist</option>
                    <option value="automatic">Automatic Specialist</option>
                  </select>
                </div>

                <div className="sm:col-span-2 space-y-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Photo URL
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="url"
                      value={editingInst.photoUrl}
                      onChange={(e) => setEditingInst({ ...editingInst, photoUrl: e.target.value })}
                      className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-mono text-slate-800"
                    />
                    <img
                      src={editingInst.photoUrl}
                      alt="Preview"
                      className="w-12 h-12 rounded-xl object-cover border border-slate-200 bg-white shrink-0"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Languages (Comma-Separated)
                  </label>
                  <input
                    type="text"
                    value={editingInst.languages.join(', ')}
                    onChange={(e) =>
                      setEditingInst({
                        ...editingInst,
                        languages: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800"
                    placeholder="English, Hindi, Kannada"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Specialties & Track Skills (Comma-Separated)
                  </label>
                  <input
                    type="text"
                    value={editingInst.specialties.join(', ')}
                    onChange={(e) =>
                      setEditingInst({
                        ...editingInst,
                        specialties: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800"
                    placeholder="Dual-Control Safety, Figure-8 Track, Parallel Parking"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Verified Badges (Comma-Separated)
                  </label>
                  <input
                    type="text"
                    value={editingInst.verifiedBadges.join(', ')}
                    onChange={(e) =>
                      setEditingInst({
                        ...editingInst,
                        verifiedBadges: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800"
                    placeholder="MoRTH Certified, Police Verified, Dual-Control Safe"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Coach Bio
                  </label>
                  <textarea
                    rows={3}
                    value={editingInst.bio}
                    onChange={(e) => setEditingInst({ ...editingInst, bio: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Inspiring Coach Quote
                  </label>
                  <input
                    type="text"
                    value={editingInst.quote}
                    onChange={(e) => setEditingInst({ ...editingInst, quote: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs italic text-emerald-900"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
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
    </div>
  );
};
