import React, { useState } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  BookOpen,
  Clock,
  Car,
  CheckCircle2,
  Layers,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { Course, CourseModule } from '../../types';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { SEO } from '../../components/common/SEO';

export const CoursesEditor: React.FC = () => {
  const { siteData, updateCourses, deleteCourse, addCourse, updateSingleCourse } = useContent();
  const { courses } = siteData;

  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [modalTab, setModalTab] = useState<'info' | 'syllabus' | 'outcomes'>('info');

  const startEdit = (course: Course) => {
    setEditingCourse(JSON.parse(JSON.stringify(course)));
    setIsCreatingNew(false);
    setModalTab('info');
  };

  const startCreate = () => {
    const newCourse: Course = {
      id: `course-${Date.now()}`,
      slug: `new-course-${Date.now().toString().slice(-4)}`,
      title: 'New Driving Course',
      shortTitle: 'New Course',
      badge: 'Certified',
      category: 'beginner',
      transmission: 'both',
      level: 'Beginner',
      durationHours: 15,
      sessionsCount: 15,
      price: 4999,
      originalPrice: 5999,
      popular: false,
      summary: 'Comprehensive driving coaching for all skill levels with dual-control cars.',
      description: 'Detailed description of the course curriculum, RTO preparation, and student learning outcomes.',
      suitableFor: ['Beginners with zero prior experience', 'Learner licence holders'],
      whatIncluded: ['15 hours 1-on-1 practical training', 'Doorstep pickup & drop', 'Automated track drills'],
      learningOutcomes: ['Clutch bite-point mastery', 'Parallel & reverse bay parking', 'Safe highway merging'],
      syllabus: [
        {
          sessionNumber: 1,
          title: 'Cockpit Orientation & Fundamentals',
          durationMinutes: 60,
          objective: 'Master mirrors, seating, and pedal controls.',
          topics: ['DSSSM routine', 'Blind spot check', 'Clutch modulation'],
          isRtoTrackSpecific: false,
        },
      ],
      faqs: [
        { question: 'Is doorstep pickup included?', answer: 'Yes, daily 1-hour sessions include doorstep pickup from your registered address.' },
      ],
    };
    setEditingCourse(newCourse);
    setIsCreatingNew(true);
    setModalTab('info');
  };

  const handleFieldChange = (field: keyof Course, val: any) => {
    if (!editingCourse) return;
    setEditingCourse({ ...editingCourse, [field]: val });
  };

  const handleArrayFieldChange = (field: 'suitableFor' | 'whatIncluded' | 'learningOutcomes', idx: number, val: string) => {
    if (!editingCourse) return;
    const arr = [...(editingCourse[field] || [])];
    arr[idx] = val;
    setEditingCourse({ ...editingCourse, [field]: arr });
  };

  const addArrayItem = (field: 'suitableFor' | 'whatIncluded' | 'learningOutcomes') => {
    if (!editingCourse) return;
    const arr = [...(editingCourse[field] || []), 'New feature / item point'];
    setEditingCourse({ ...editingCourse, [field]: arr });
  };

  const removeArrayItem = (field: 'suitableFor' | 'whatIncluded' | 'learningOutcomes', idx: number) => {
    if (!editingCourse) return;
    const arr = (editingCourse[field] || []).filter((_, i) => i !== idx);
    setEditingCourse({ ...editingCourse, [field]: arr });
  };

  const handleModuleChange = (idx: number, field: keyof CourseModule, val: any) => {
    if (!editingCourse) return;
    const syll = [...editingCourse.syllabus];
    syll[idx] = { ...syll[idx], [field]: val };
    setEditingCourse({ ...editingCourse, syllabus: syll });
  };

  const addModule = () => {
    if (!editingCourse) return;
    const nextSessionNum = editingCourse.syllabus.length + 1;
    const newMod: CourseModule = {
      sessionNumber: nextSessionNum,
      title: `Session ${nextSessionNum}: Core Driving Skills`,
      durationMinutes: 60,
      objective: 'Skill progression and road awareness.',
      topics: ['Steering precision', 'Lane changes'],
      isRtoTrackSpecific: false,
    };
    setEditingCourse({ ...editingCourse, syllabus: [...editingCourse.syllabus, newMod] });
  };

  const removeModule = (idx: number) => {
    if (!editingCourse) return;
    const syll = editingCourse.syllabus.filter((_, i) => i !== idx);
    setEditingCourse({ ...editingCourse, syllabus: syll });
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
    <div className="space-y-6 max-w-5xl">
      <SEO title="Courses Catalog Editor | Admin Panel" />

      {/* Header with Title and Global Add CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider mb-1">
            <BookOpen className="w-4 h-4" />
            <span>Catalog Management</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
            Driving Programs & Curriculum Editor
          </h2>
          <p className="text-xs text-slate-500">
            Manage course tiers, session counts, duration, syllabus modules, and pricing.
          </p>
        </div>

        <Button variant="primary" size="md" onClick={startCreate} icon={<Plus className="w-4 h-4" />}>
          Add New Program
        </Button>
      </div>

      {/* Courses List Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
        {courses.map((course) => (
          <div
            key={course.id}
            className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors"
          >
            <div className="space-y-1.5 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold font-display text-slate-900 text-base">{course.title}</span>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold font-mono bg-emerald-50 text-emerald-700 border border-emerald-200">
                  ₹{course.price}
                </span>
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                  {course.durationHours} Hours • {course.sessionsCount} Sessions
                </span>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-900 text-white">
                  {course.transmission}
                </span>
              </div>
              <p className="text-xs text-slate-500 line-clamp-1 max-w-xl">
                {course.summary}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => startEdit(course)}
                className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 border border-slate-200 transition-colors flex items-center gap-1.5"
              >
                <Edit2 className="w-3.5 h-3.5" /> Edit
              </button>
              <button
                onClick={() => deleteCourse(course.id)}
                className="p-2 rounded-xl text-slate-400 hover:text-red-700 hover:bg-red-50 border border-slate-200 transition-colors"
                title="Delete Course"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Course Edit Drawer Modal */}
      {editingCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto space-y-6 animate-in zoom-in-95 duration-150">
            {/* Modal Top Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 inline-block mb-1">
                  {isCreatingNew ? 'Create New Course' : `Editing: ${editingCourse.shortTitle}`}
                </span>
                <h3 className="text-xl font-bold font-display text-slate-900">
                  {editingCourse.title || 'Course Details'}
                </h3>
              </div>

              <button
                onClick={() => setEditingCourse(null)}
                className="p-2 text-slate-400 hover:text-slate-900 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Internal Navigation Tabs */}
            <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl">
              <button
                type="button"
                onClick={() => setModalTab('info')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                  modalTab === 'info' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                1. General & Pricing
              </button>
              <button
                type="button"
                onClick={() => setModalTab('outcomes')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                  modalTab === 'outcomes' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                2. Inclusions & Outcomes
              </button>
              <button
                type="button"
                onClick={() => setModalTab('syllabus')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                  modalTab === 'syllabus' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                3. Syllabus Modules ({editingCourse.syllabus.length})
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-5">
              {/* TAB 1: INFO */}
              {modalTab === 'info' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Course Full Title
                      </label>
                      <input
                        type="text"
                        required
                        value={editingCourse.title}
                        onChange={(e) => handleFieldChange('title', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Short Title (for badges/cards)
                      </label>
                      <input
                        type="text"
                        required
                        value={editingCourse.shortTitle}
                        onChange={(e) => handleFieldChange('shortTitle', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        URL Slug
                      </label>
                      <input
                        type="text"
                        required
                        value={editingCourse.slug}
                        onChange={(e) => handleFieldChange('slug', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-mono text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Badge Text (e.g. Most Popular, Beginner Best)
                      </label>
                      <input
                        type="text"
                        value={editingCourse.badge || ''}
                        onChange={(e) => handleFieldChange('badge', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Transmission
                      </label>
                      <select
                        value={editingCourse.transmission}
                        onChange={(e) => handleFieldChange('transmission', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold"
                      >
                        <option value="both">Both (Manual & Auto)</option>
                        <option value="manual">Manual Only</option>
                        <option value="automatic">Automatic Only</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Skill Level
                      </label>
                      <select
                        value={editingCourse.level}
                        onChange={(e) => handleFieldChange('level', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold"
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="All Levels">All Levels</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Active Price (₹)
                      </label>
                      <input
                        type="number"
                        required
                        value={editingCourse.price}
                        onChange={(e) => handleFieldChange('price', parseInt(e.target.value, 10) || 0)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-bold text-emerald-700"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Original Strikethrough Price (₹)
                      </label>
                      <input
                        type="number"
                        value={editingCourse.originalPrice || ''}
                        onChange={(e) => handleFieldChange('originalPrice', parseInt(e.target.value, 10) || undefined)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Duration Hours
                      </label>
                      <input
                        type="number"
                        required
                        value={editingCourse.durationHours}
                        onChange={(e) => handleFieldChange('durationHours', parseInt(e.target.value, 10) || 0)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Sessions Count
                      </label>
                      <input
                        type="number"
                        required
                        value={editingCourse.sessionsCount}
                        onChange={(e) => handleFieldChange('sessionsCount', parseInt(e.target.value, 10) || 0)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Course Summary Teaser
                    </label>
                    <textarea
                      rows={2}
                      value={editingCourse.summary}
                      onChange={(e) => handleFieldChange('summary', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Full Detailed Description
                    </label>
                    <textarea
                      rows={3}
                      value={editingCourse.description}
                      onChange={(e) => handleFieldChange('description', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800"
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: OUTCOMES & INCLUSIONS */}
              {modalTab === 'outcomes' && (
                <div className="space-y-5">
                  {/* What's Included */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                      <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        What's Included in Package
                      </label>
                      <button
                        type="button"
                        onClick={() => addArrayItem('whatIncluded')}
                        className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add
                      </button>
                    </div>

                    {(editingCourse.whatIncluded || []).map((inc, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={inc}
                          onChange={(e) => handleArrayFieldChange('whatIncluded', i, e.target.value)}
                          className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900"
                        />
                        <button
                          type="button"
                          onClick={() => removeArrayItem('whatIncluded', i)}
                          className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Learning Outcomes */}
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                      <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Key Learning Outcomes
                      </label>
                      <button
                        type="button"
                        onClick={() => addArrayItem('learningOutcomes')}
                        className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add
                      </button>
                    </div>

                    {(editingCourse.learningOutcomes || []).map((out, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={out}
                          onChange={(e) => handleArrayFieldChange('learningOutcomes', i, e.target.value)}
                          className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900"
                        />
                        <button
                          type="button"
                          onClick={() => removeArrayItem('learningOutcomes', i)}
                          className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: SYLLABUS */}
              {modalTab === 'syllabus' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                      Syllabus Session Modules ({editingCourse.syllabus.length})
                    </span>
                    <button
                      type="button"
                      onClick={addModule}
                      className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Session
                    </button>
                  </div>

                  <div className="space-y-3">
                    {editingCourse.syllabus.map((mod, mIdx) => (
                      <div key={mIdx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-600 uppercase">
                            SESSION #{mod.sessionNumber || mIdx + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeModule(mIdx)}
                            className="p-1 text-slate-400 hover:text-red-600 rounded-lg"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div className="sm:col-span-2">
                            <label className="block text-[0.7rem] font-bold text-slate-600 uppercase mb-1">
                              Session Title
                            </label>
                            <input
                              type="text"
                              value={mod.title}
                              onChange={(e) => handleModuleChange(mIdx, 'title', e.target.value)}
                              className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 bg-white"
                            />
                          </div>

                          <div>
                            <label className="block text-[0.7rem] font-bold text-slate-600 uppercase mb-1">
                              Duration (Mins)
                            </label>
                            <input
                              type="number"
                              value={mod.durationMinutes}
                              onChange={(e) => handleModuleChange(mIdx, 'durationMinutes', parseInt(e.target.value) || 60)}
                              className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs bg-white"
                            />
                          </div>

                          <div className="sm:col-span-3">
                            <label className="block text-[0.7rem] font-bold text-slate-600 uppercase mb-1">
                              Objective & Drills
                            </label>
                            <input
                              type="text"
                              value={mod.objective}
                              onChange={(e) => handleModuleChange(mIdx, 'objective', e.target.value)}
                              className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs bg-white"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <Button variant="ghost" size="md" onClick={() => setEditingCourse(null)}>
                  Cancel
                </Button>
                <Button variant="primary" size="md" type="submit" icon={<Save className="w-4 h-4" />}>
                  Save Course Program
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
