import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ExternalLink,
  Award,
  Sparkles,
  Car,
  ChevronRight,
  ShieldCheck,
  Check,
  X,
} from 'lucide-react';
import { RoadmapStep } from '../../types';
import { RoadmapCar } from './RoadmapCar';
import { Button } from '../common/Button';

interface SerpentineRoadmapProps {
  steps: RoadmapStep[];
  onOpenBookingModal?: () => void;
  isCompactPreview?: boolean;
}

export const SerpentineRoadmap: React.FC<SerpentineRoadmapProps> = ({
  steps,
  onOpenBookingModal,
  isCompactPreview = false,
}) => {
  const [selectedStepIndex, setSelectedStepIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const activeStep = steps[selectedStepIndex] || steps[0];

  // Stage milestone graphic representations
  const stageIcons = [
    {
      badge: '1. APPLY & E-KYC',
      subtext: 'Parivahan Portal Form 2',
      illustration: (
        <div className="w-16 h-16 rounded-2xl bg-blue-50 border-2 border-blue-200 flex items-center justify-center text-blue-600 shadow-sm">
          <FileText className="w-8 h-8" />
        </div>
      ),
    },
    {
      badge: '2. THEORY LL TEST',
      subtext: 'Traffic Signs & Rules Exam',
      illustration: (
        <div className="w-16 h-16 rounded-2xl bg-amber-50 border-2 border-amber-200 flex items-center justify-center text-amber-600 shadow-sm">
          <ShieldCheck className="w-8 h-8" />
        </div>
      ),
    },
    {
      badge: '3. DUAL-CONTROL LESSONS',
      subtext: '1-on-1 In-Car Road Training',
      illustration: (
        <div className="w-16 h-16 rounded-2xl bg-[#FDF2F5] border-2 border-[#FFC5DC] flex items-center justify-center text-[#BC2639] shadow-sm">
          <Car className="w-8 h-8" />
        </div>
      ),
    },
    {
      badge: '4. 30-DAY PRACTICE GAP',
      subtext: 'Parallel & Reverse Parking',
      illustration: (
        <div className="w-16 h-16 rounded-2xl bg-purple-50 border-2 border-purple-200 flex items-center justify-center text-purple-600 shadow-sm">
          <Sparkles className="w-8 h-8" />
        </div>
      ),
    },
    {
      badge: '5. AUTOMATED RTO TEST',
      subtext: 'Figure-8, H-Box & Gradient',
      illustration: (
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 border-2 border-indigo-200 flex items-center justify-center text-indigo-600 shadow-sm">
          <Award className="w-8 h-8" />
        </div>
      ),
    },
    {
      badge: '6. SMART CARD DL LAUNCH',
      subtext: 'Speed Post & DigiLocker Delivery',
      illustration: (
        <div className="w-16 h-16 rounded-2xl bg-[#FDF2F5] border-2 border-[#FFC5DC] flex items-center justify-center text-[#BC2639] shadow-md">
          <CheckCircle2 className="w-9 h-9" />
        </div>
      ),
    },
  ];

  const handleStepClick = (index: number) => {
    setSelectedStepIndex(index);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm relative overflow-hidden">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Indian Licence Roadmap
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold font-display text-slate-900">
            The Complete Step-by-Step Driving Journey
          </h3>
        </div>

        <div className="text-xs text-slate-500 flex items-center gap-2">
          <span>Click any stage for official RTO rules & checklist</span>
        </div>
      </div>

      {/* SERPENTINE ROADMAP DESKTOP VIEW (Visible on md and larger) */}
      <div className="hidden md:block relative max-w-5xl mx-auto py-6 space-y-16">
        {/* ROW 1: Stages 1 & 2 (Left to Right) */}
        <div className="relative">
          {/* Top Horizontal Road Track */}
          <div className="absolute top-[108px] left-8 right-24 h-4 bg-slate-800 rounded-full z-0 flex items-center">
            <div className="w-full border-t-2 border-dashed border-amber-400/80 mx-2" />
          </div>

          {/* Right Curve Downward Connector */}
          <div className="absolute top-[108px] right-8 w-24 h-[180px] border-r-[16px] border-b-[16px] border-slate-800 rounded-tr-[48px] rounded-br-[48px] z-0 pointer-events-none" />

          {/* Stage Nodes Row 1 */}
          <div className="relative z-10 grid grid-cols-2 gap-20 pr-32">
            {[0, 1].map((idx) => {
              const step = steps[idx];
              const iconMeta = stageIcons[idx];
              const isActive = selectedStepIndex === idx;

              return (
                <div
                  key={idx}
                  onClick={() => handleStepClick(idx)}
                  className="flex flex-col items-center text-center cursor-pointer group"
                >
                  {/* Illustration Scene */}
                  <div className="mb-3 transform group-hover:scale-110 transition-transform duration-300">
                    {iconMeta.illustration}
                  </div>

                  {/* Station Chevron Banner */}
                  <div
                    className={`px-5 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-200 shadow-sm flex items-center gap-2 ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-glow-emerald scale-105'
                        : 'bg-slate-900 text-white group-hover:bg-slate-800'
                    }`}
                  >
                    <span>{iconMeta.badge}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />
                  </div>

                  {/* Subtext */}
                  <span className="text-xs text-slate-600 font-semibold mt-2.5 max-w-[200px]">
                    {step?.title || iconMeta.subtext}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ROW 2: Stages 3 & 4 (Right to Left) */}
        <div className="relative">
          {/* Middle Horizontal Road Track */}
          <div className="absolute top-[108px] left-24 right-8 h-4 bg-slate-800 rounded-full z-0 flex items-center">
            <div className="w-full border-t-2 border-dashed border-amber-400/80 mx-2" />
          </div>

          {/* Left Curve Downward Connector */}
          <div className="absolute top-[108px] left-8 w-24 h-[180px] border-l-[16px] border-b-[16px] border-slate-800 rounded-tl-[48px] rounded-bl-[48px] z-0 pointer-events-none" />

          {/* Stage Nodes Row 2 (Reversed Order for flow) */}
          <div className="relative z-10 grid grid-cols-2 gap-20 pl-32">
            {[2, 3].map((idx) => {
              const step = steps[idx];
              const iconMeta = stageIcons[idx];
              const isActive = selectedStepIndex === idx;

              return (
                <div
                  key={idx}
                  onClick={() => handleStepClick(idx)}
                  className="flex flex-col items-center text-center cursor-pointer group"
                >
                  {/* Illustration Scene */}
                  <div className="mb-3 transform group-hover:scale-110 transition-transform duration-300">
                    {iconMeta.illustration}
                  </div>

                  {/* Station Chevron Banner */}
                  <div
                    className={`px-5 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-200 shadow-sm flex items-center gap-2 ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-glow-emerald scale-105'
                        : 'bg-slate-900 text-white group-hover:bg-slate-800'
                    }`}
                  >
                    <span>{iconMeta.badge}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />
                  </div>

                  {/* Subtext */}
                  <span className="text-xs text-slate-600 font-semibold mt-2.5 max-w-[200px]">
                    {step?.title || iconMeta.subtext}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ROW 3: Stages 5 & 6 (Left to Right - Launch!) */}
        <div className="relative">
          {/* Bottom Horizontal Road Track */}
          <div className="absolute top-[108px] left-8 right-8 h-4 bg-slate-800 rounded-full z-0 flex items-center">
            <div className="w-full border-t-2 border-dashed border-amber-400/80 mx-2" />
          </div>

          {/* Stage Nodes Row 3 */}
          <div className="relative z-10 grid grid-cols-2 gap-20 px-12">
            {[4, 5].map((idx) => {
              const step = steps[idx];
              const iconMeta = stageIcons[idx];
              const isActive = selectedStepIndex === idx;

              return (
                <div
                  key={idx}
                  onClick={() => handleStepClick(idx)}
                  className="flex flex-col items-center text-center cursor-pointer group"
                >
                  {/* Illustration Scene */}
                  <div className="mb-3 transform group-hover:scale-110 transition-transform duration-300">
                    {iconMeta.illustration}
                  </div>

                  {/* Station Chevron Banner */}
                  <div
                    className={`px-5 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-200 shadow-sm flex items-center gap-2 ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-glow-emerald scale-105'
                        : idx === 5
                        ? 'bg-gradient-to-r from-emerald-600 to-amber-500 text-slate-950 font-black shadow-md'
                        : 'bg-slate-900 text-white group-hover:bg-slate-800'
                    }`}
                  >
                    <span>{iconMeta.badge}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />
                  </div>

                  {/* Subtext */}
                  <span className="text-xs text-slate-600 font-semibold mt-2.5 max-w-[200px]">
                    {step?.title || iconMeta.subtext}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* SERPENTINE ROADMAP MOBILE VIEW (Visible on small screens) */}
      <div className="block md:hidden relative pl-6 space-y-8 my-4">
        {/* Continuous Vertical Ribbon Track */}
        <div className="absolute left-[19px] top-4 bottom-4 w-3 bg-slate-800 rounded-full z-0 flex justify-center">
          <div className="h-full border-r border-dashed border-amber-400/80" />
        </div>

        {steps.map((step, idx) => {
          const iconMeta = stageIcons[idx] || stageIcons[0];
          const isSelected = selectedStepIndex === idx;

          return (
            <div
              key={idx}
              onClick={() => handleStepClick(idx)}
              className="relative z-10 flex items-start gap-4 cursor-pointer"
            >
              {/* Step Marker Node */}
              <div
                className={`-ml-7 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 border shadow-xs transition-all ${
                  isSelected
                    ? 'bg-emerald-600 text-white border-emerald-300 ring-4 ring-emerald-500/20 scale-110'
                    : 'bg-slate-900 text-white border-slate-700'
                }`}
              >
                {step.stepNumber}
              </div>

              {/* Mobile Card */}
              <div
                className={`flex-1 p-4 rounded-2xl border transition-all ${
                  isSelected
                    ? 'bg-emerald-50/80 border-emerald-300 shadow-sm'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-[0.65rem] font-bold uppercase tracking-wider text-emerald-700">
                    {iconMeta.badge}
                  </span>
                  <span className="text-[0.65rem] text-slate-500 font-medium">
                    {step.approxDuration}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900 leading-snug">
                  {step.title}
                </h4>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                  {step.summary}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* INTERACTIVE MILESTONE DETAIL DRAWER / POPUP */}
      {isModalOpen && activeStep && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 my-8 max-h-[85vh] overflow-y-auto space-y-6 animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FDF2F5] text-[#39340F] border border-[#FFC5DC] inline-block mb-1.5">
                  Stage {activeStep.stepNumber} • {activeStep.approxDuration}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 leading-tight">
                  {activeStep.title}
                </h3>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Details */}
            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <p>{activeStep.details}</p>

              {/* Required Documents */}
              {activeStep.requiredDocuments.length > 0 && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h4 className="font-bold text-slate-900 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#BC2639]" />
                    Required Documents Checklist:
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {activeStep.requiredDocuments.map((doc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#BC2639] mt-0.5 shrink-0" />
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* RTO ADTT Track Maneuvers (if applicable) */}
              {activeStep.rtoTrackManeuvers && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
                  <h4 className="font-bold text-amber-950 flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-600" />
                    Automated Camera Track Drills:
                  </h4>
                  <div className="space-y-1 text-xs text-amber-900">
                    {activeStep.rtoTrackManeuvers.map((m, i) => (
                      <div key={i} className="p-2 rounded-lg bg-white/80 border border-amber-200/60 font-medium">
                        {m}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Instructor Pro-Tip */}
              <div className="p-4 rounded-2xl bg-[#FDF2F5] border border-[#FFC5DC] flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-[#BC2639] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#39340F] block text-xs uppercase tracking-wider mb-0.5">
                    DriveCraft Instructor Pro-Tip:
                  </span>
                  <p className="text-xs text-[#39340F] italic">
                    "{activeStep.instructorProTip}"
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              {activeStep.rtoPortalUrl ? (
                <a
                  href={activeStep.rtoPortalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#BC2639] hover:underline"
                >
                  Visit Parivahan Sarathi Gov Portal <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <div />
              )}

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>
                  Close
                </Button>
                {onOpenBookingModal && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      setIsModalOpen(false);
                      onOpenBookingModal();
                    }}
                  >
                    Start Training With Us
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
