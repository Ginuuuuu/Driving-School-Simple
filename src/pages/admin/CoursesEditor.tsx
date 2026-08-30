import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X, BookOpen, Clock, Car, Check } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { Course } from '../../types';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { SEO } from '../../components/common/SEO';

export const CoursesEditor: React.FC = () => {
  const { siteData, updateCourses, deleteCourse, addCourse, updateSingleCourse } = useContent();
  const { courses } = siteData;

  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  const startEdit = (course: Course) => {
    setEditingCourse({ ...course });
    setIsCreatingNew(false);
  };

  const startCreate = () => {
    const newCourse: Course = {
      id: `course-${Date.now()}`,
      slug: `new-course-${Date.now()}`,
      title: 'New Driving Course',
      shortTitle: 'New Course',
      category: 'beginner',
      transmission: 'both',
      level: 'Beginner',
      durationHours: 15,
      sessionsCount: 15,
      price: 4999,
      originalPrice: 5999,
      summary: 'Comprehensive driving coaching for all skill levels.',
      description: 'Detailed description of the new course curriculum and outcomes.',
      suitableFor: ['Beginners', 'New drivers'],
      whatIncluded: ['15 hours 1-on-1 practical training', 'Doorstep pickup'],
      learningOutcomes: ['Clutch control', 'Safe city driving'],
      syllabus: [
        {
          sessionNumber: 1,
          title: 'Cockpit Orientation & Fundamentals',
          durationMinutes: 60,
          objective: 'Master mirrors and pedals.',
          topics: ['Seat adjustment', 'Mirror checks'],
        },
      ],
      faqs: [],
    };
    setEditingCourse(newCourse);
    setIsCreatingNew(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCourse) return;

    if (isCreatingNew) {
      addCourse(editingCourse);
    } else {
      updateSingleCourse(editingCourse);
    }
    setEditingCourse(null);
  };

  return (
    <div className="space-y-8">
      <SEO title="Courses Catalog Editor | Admin Panel" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
            Driving Courses & Curriculum Editor
          </h2>
          <p className="text-xs text-slate-500">
            Add, update, or remove driving courses, session modules, and package fees.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={startCreate} icon={<Plus className="w-4 h-4" />}>
          Add New Course
        </Button>
      </div>

      {/* Editing Modal / Drawer */}
      {editingCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 my-8 max-h-[85vh] overflow-y-auto space-y-6 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold font-display text-slate-900">
                {isCreatingNew ? 'Create New Driving Course' : `Edit: ${editingCourse.title}`}
              </h3>
              <button
                onClick={() => setEditingCourse(null)}
                className="p-2 text-slate-400 hover:text-slate-900 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Course Full Title
                  </label>
                  <input
                    type="text"
                    required
                    value={editingCourse.title}
                    onChange={(e) => setEditingCourse({ ...editingCourse, title: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Short Title (Menu / Card)
                  </label>
                  <input
                    type="text"
                    required
                    value={editingCourse.shortTitle}
                    onChange={(e) => setEditingCourse({ ...editingCourse, shortTitle: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    required
                    value={editingCourse.price}
                    onChange={(e) => setEditingCourse({ ...editingCourse, price: parseInt(e.target.value, 10) || 0 })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-bold text-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Original Price (₹)
                  </label>
                  <input
                    type="number"
                    value={editingCourse.originalPrice || ''}
                    onChange={(e) => setEditingCourse({ ...editingCourse, originalPrice: parseInt(e.target.value, 10) || undefined })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Duration Hours
                  </label>
                  <input
                    type="number"
                    required
                    value={editingCourse.durationHours}
                    onChange={(e) => setEditingCourse({ ...editingCourse, durationHours: parseInt(e.target.value, 10) || 0 })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Summary Teaser
                </label>
                <textarea
                  rows={2}
                  required
                  value={editingCourse.summary}
                  onChange={(e) => setEditingCourse({ ...editingCourse, summary: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Full Detailed Description
                </label>
                <textarea
                  rows={3}
                  required
                  value={editingCourse.description}
                  onChange={(e) => setEditingCourse({ ...editingCourse, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <Button variant="ghost" size="md" onClick={() => setEditingCourse(null)}>
                  Cancel
                </Button>
                <Button variant="primary" size="md" type="submit" icon={<Save className="w-4 h-4" />}>
                  Save Course Details
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Courses List Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="divide-y divide-slate-100">
          {courses.map((course) => (
            <div key={course.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-slate-900 text-base">{course.title}</span>
                  <Badge variant="emerald" size="sm">
                    ₹{course.price}
                  </Badge>
                  <Badge variant="slate" size="sm">
                    {course.durationHours} Hours
                  </Badge>
                </div>
                <p className="text-xs text-slate-500 line-clamp-1 max-w-xl">
                  {course.summary}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => startEdit(course)}
                  className="p-2 rounded-xl text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 border border-slate-200 transition-colors"
                  title="Edit Course"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteCourse(course.id)}
                  className="p-2 rounded-xl text-slate-400 hover:text-red-700 hover:bg-red-50 border border-slate-200 transition-colors"
                  title="Delete Course"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
