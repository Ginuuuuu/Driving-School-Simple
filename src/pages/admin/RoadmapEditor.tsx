import React, { useState } from 'react';
import {
  Save,
  MapPin,
  FileText,
  Award,
  Lightbulb,
  Plus,
  Trash2,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { RoadmapStep } from '../../types';
import { Button } from '../../components/common/Button';
import { SEO } from '../../components/common/SEO';

export const RoadmapEditor: React.FC = () => {
  const { siteData, updateRoadmap } = useContent();
  const { roadmap } = siteData;

  const [steps, setSteps] = useState<RoadmapStep[]>([...roadmap]);
  const [activeEditIndex, setActiveEditIndex] = useState(0);

  const activeStep = steps[activeEditIndex] || steps[0];

  const handleStepChange = (field: keyof RoadmapStep, value: any) => {
    const updated = [...steps];
    updated[activeEditIndex] = { ...updated[activeEditIndex], [field]: value };
    setSteps(updated);
  };

  const handleDocChange = (docIdx: number, val: string) => {
    const updatedDocs = [...(activeStep.requiredDocuments || [])];
    updatedDocs[docIdx] = val;
    handleStepChange('requiredDocuments', updatedDocs);
  };

  const addDoc = () => {
    const updatedDocs = [...(activeStep.requiredDocuments || []), 'New Required Document Proof'];
    handleStepChange('requiredDocuments', updatedDocs);
  };

  const removeDoc = (docIdx: number) => {
    const updatedDocs = (activeStep.requiredDocuments || []).filter((_, i) => i !== docIdx);
    handleStepChange('requiredDocuments', updatedDocs);
  };

  const handleManeuverChange = (mIdx: number, val: string) => {
    const updatedManeuvers = [...(activeStep.rtoTrackManeuvers || [])];
    updatedManeuvers[mIdx] = val;
    handleStepChange('rtoTrackManeuvers', updatedManeuvers);
  };

  const addManeuver = () => {
    const updatedManeuvers = [...(activeStep.rtoTrackManeuvers || []), 'New Track Test Maneuver'];
    handleStepChange('rtoTrackManeuvers', updatedManeuvers);
  };

  const removeManeuver = (mIdx: number) => {
    const updatedManeuvers = (activeStep.rtoTrackManeuvers || []).filter((_, i) => i !== mIdx);
    handleStepChange('rtoTrackManeuvers', updatedManeuvers);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateRoadmap(steps);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <SEO title="Licence Roadmap Editor | Admin Panel" />

      {/* Header with Title and Global Save CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider mb-1">
            <MapPin className="w-4 h-4" />
            <span>Page Content Editor</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
            Indian Licence Roadmap & RTO Stages
          </h2>
          <p className="text-xs text-slate-500">
            Edit the 6-stage licence journey, document checklists, ADTT sensor track drills, and pro tips.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button variant="primary" size="md" onClick={handleSave} icon={<Save className="w-4 h-4" />}>
            Save All 6 Milestones
          </Button>
        </div>
      </div>

      {/* Step Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto p-2 bg-white rounded-2xl border border-slate-200 shadow-xs">
        {steps.map((step, idx) => (
          <button
            key={step.id}
            onClick={() => setActiveEditIndex(idx)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeEditIndex === idx
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span>Stage {step.stepNumber}:</span>
            <span className="truncate max-w-[140px] sm:max-w-[200px]">{step.title}</span>
          </button>
        ))}
      </div>

      {/* Active Milestone Form */}
      {activeStep && (
        <form onSubmit={handleSave} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 inline-block mb-1">
                Stage {activeStep.stepNumber} of {steps.length} • {activeStep.approxDuration}
              </span>
              <h3 className="text-base sm:text-lg font-bold font-display text-slate-900">
                {activeStep.title}
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Milestone Main Title
              </label>
              <input
                type="text"
                required
                value={activeStep.title}
                onChange={(e) => handleStepChange('title', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Subtitle Tagline
              </label>
              <input
                type="text"
                value={activeStep.subtitle}
                onChange={(e) => handleStepChange('subtitle', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Approx Duration (e.g. 1-2 Days, 30 Days)
              </label>
              <input
                type="text"
                value={activeStep.approxDuration}
                onChange={(e) => handleStepChange('approxDuration', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-mono font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Stage Category Name
              </label>
              <input
                type="text"
                value={activeStep.stageName}
                onChange={(e) => handleStepChange('stageName', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Official Parivahan Portal URL
              </label>
              <input
                type="text"
                value={activeStep.rtoPortalUrl || ''}
                onChange={(e) => handleStepChange('rtoPortalUrl', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-mono text-emerald-700"
                placeholder="https://sarathi.parivahan.gov.in"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Short Flowing Summary
              </label>
              <textarea
                rows={2}
                value={activeStep.summary}
                onChange={(e) => handleStepChange('summary', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Comprehensive Process Details
              </label>
              <textarea
                rows={3}
                value={activeStep.details}
                onChange={(e) => handleStepChange('details', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                DriveCraft Instructor Pro-Tip
              </label>
              <input
                type="text"
                value={activeStep.instructorProTip}
                onChange={(e) => handleStepChange('instructorProTip', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs italic text-emerald-900"
              />
            </div>
          </div>

          {/* Required Documents Checklist */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-emerald-600" />
                Required Documents Checklist ({(activeStep.requiredDocuments || []).length})
              </label>
              <button
                type="button"
                onClick={addDoc}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Document
              </button>
            </div>

            <div className="space-y-2">
              {(activeStep.requiredDocuments || []).map((doc, docIdx) => (
                <div key={docIdx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={doc}
                    onChange={(e) => handleDocChange(docIdx, e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900"
                  />
                  <button
                    type="button"
                    onClick={() => removeDoc(docIdx)}
                    className="p-2 text-slate-400 hover:text-red-600 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* ADTT Camera Track Maneuvers (if applicable) */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-600" />
                Automated Test Track Maneuvers ({(activeStep.rtoTrackManeuvers || []).length})
              </label>
              <button
                type="button"
                onClick={addManeuver}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Drill
              </button>
            </div>

            <div className="space-y-2">
              {(activeStep.rtoTrackManeuvers || []).map((m, mIdx) => (
                <div key={mIdx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={m}
                    onChange={(e) => handleManeuverChange(mIdx, e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900"
                  />
                  <button
                    type="button"
                    onClick={() => removeManeuver(mIdx)}
                    className="p-2 text-slate-400 hover:text-red-600 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
            <Button variant="primary" size="md" type="submit" icon={<Save className="w-4 h-4" />}>
              Save Milestone {activeStep.stepNumber}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
