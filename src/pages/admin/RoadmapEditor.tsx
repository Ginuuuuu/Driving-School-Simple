import React, { useState } from 'react';
import { Save, MapPin, Edit2, CheckCircle2, AlertTriangle, Lightbulb } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { RoadmapStep } from '../../types';
import { Button } from '../../components/common/Button';
import { SEO } from '../../components/common/SEO';

export const RoadmapEditor: React.FC = () => {
  const { siteData, updateRoadmap } = useContent();
  const { roadmap } = siteData;

  const [steps, setSteps] = useState([...roadmap]);
  const [activeEditIndex, setActiveEditIndex] = useState(0);

  const handleStepChange = (field: keyof RoadmapStep, value: any) => {
    const updated = [...steps];
    updated[activeEditIndex] = { ...updated[activeEditIndex], [field]: value };
    setSteps(updated);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateRoadmap(steps);
  };

  const activeStep = steps[activeEditIndex] || steps[0];

  return (
    <div className="max-w-4xl space-y-8">
      <SEO title="Licence Roadmap Editor | Admin Panel" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
            Licence Roadmap & RTO Milestones Editor
          </h2>
          <p className="text-xs text-slate-500">
            Edit the 6-stage Indian driving licence steps, required document checklists, and instructor tips.
          </p>
        </div>

        <Button variant="primary" size="md" onClick={handleSave} icon={<Save className="w-4 h-4" />}>
          Save All Milestones
        </Button>
      </div>

      {/* Step Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto p-1.5 bg-white rounded-2xl border border-slate-200 shadow-xs">
        {steps.map((step, idx) => (
          <button
            key={step.id}
            onClick={() => setActiveEditIndex(idx)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeEditIndex === idx
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Stage {step.stepNumber}: {step.subtitle.slice(0, 20)}...
          </button>
        ))}
      </div>

      {/* Active Milestone Form */}
      <form onSubmit={handleSave} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Milestone Main Title
            </label>
            <input
              type="text"
              required
              value={activeStep.title}
              onChange={(e) => handleStepChange('title', e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Subtitle / Action Summary
            </label>
            <input
              type="text"
              required
              value={activeStep.subtitle}
              onChange={(e) => handleStepChange('subtitle', e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Stage Category Tag
            </label>
            <input
              type="text"
              value={activeStep.stageName}
              onChange={(e) => handleStepChange('stageName', e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Approx Duration
            </label>
            <input
              type="text"
              value={activeStep.approxDuration}
              onChange={(e) => handleStepChange('approxDuration', e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
            Detailed Explanation & RTO Process
          </label>
          <textarea
            rows={3}
            value={activeStep.details}
            onChange={(e) => handleStepChange('details', e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
            Instructor Pro-Tip
          </label>
          <input
            type="text"
            value={activeStep.instructorProTip}
            onChange={(e) => handleStepChange('instructorProTip', e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
          <Button variant="primary" size="md" type="submit" icon={<Save className="w-4 h-4" />}>
            Save Milestone {activeStep.stepNumber}
          </Button>
        </div>
      </form>
    </div>
  );
};
