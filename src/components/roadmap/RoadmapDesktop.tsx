import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ExternalLink,
  ShieldCheck,
  Award,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Car,
  Clock,
} from 'lucide-react';
import { RoadmapStep } from '../../types';
import { RoadmapCar } from './RoadmapCar';
import { Button } from '../common/Button';

interface RoadmapDesktopProps {
  steps: RoadmapStep[];
  onOpenBookingModal?: () => void;
}

export const RoadmapDesktop: React.FC<RoadmapDesktopProps> = ({ steps, onOpenBookingModal }) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeStep = steps[activeStepIndex] || steps[0];

  const handleNext = () => {
    if (activeStepIndex < steps.length - 1) {
      setActiveStepIndex(activeStepIndex + 1);
    }
  };

  const handlePrev = () => {
    if (activeStepIndex > 0) {
      setActiveStepIndex(activeStepIndex - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeStepIndex, steps.length]);

  return (
    <div className="relative bg-[#082B4C] text-white rounded-3xl p-6 lg:p-10 border border-[#061F36] shadow-2xl overflow-hidden">
      {/* Background road texture */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#F4C400_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Top Milestone Navigation Bar */}
      <div className="relative z-10 mb-8 border-b border-white/10 pb-6">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#F4C400]/20 text-[#F4C400] border border-[#F4C400]/40">
              Interactive Licence Journey
            </span>
            <span className="text-xs text-slate-300">
              Step {activeStepIndex + 1} of {steps.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={activeStepIndex === 0}
              className="p-2 rounded-xl bg-[#061F36] hover:bg-[#0A3860] disabled:opacity-40 disabled:pointer-events-none text-slate-300 hover:text-white transition-colors border border-white/10"
              aria-label="Previous milestone"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              disabled={activeStepIndex === steps.length - 1}
              className="p-2 rounded-xl bg-[#061F36] hover:bg-[#0A3860] disabled:opacity-40 disabled:pointer-events-none text-slate-300 hover:text-white transition-colors border border-white/10"
              aria-label="Next milestone"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Milestone Steps Bar with Car Marker */}
        <div className="relative grid grid-cols-6 gap-2">
          {/* Track Progress Line */}
          <div className="absolute top-1/2 left-4 right-4 h-1 bg-[#061F36] -translate-y-1/2 z-0 rounded-full" />
          <div
            className="absolute top-1/2 left-4 h-1 bg-gradient-to-r from-[#F4C400] to-[#FFD21A] -translate-y-1/2 z-0 transition-all duration-500 rounded-full"
            style={{ width: `${(activeStepIndex / (steps.length - 1)) * 92}%` }}
          />

          {steps.map((step, idx) => {
            const isActive = idx === activeStepIndex;
            const isCompleted = idx < activeStepIndex;

            return (
              <button
                key={step.id}
                onClick={() => setActiveStepIndex(idx)}
                className={`relative z-10 flex flex-col items-center text-center group py-2 px-1 rounded-xl transition-all ${
                  isActive ? 'scale-105' : 'hover:opacity-100 opacity-80'
                }`}
              >
                {/* Node Circle */}
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-all duration-300 mb-2 border ${
                    isActive
                      ? 'bg-[#F4C400] text-[#082B4C] border-white shadow-sm ring-4 ring-[#F4C400]/30'
                      : isCompleted
                      ? 'bg-[#061F36] text-[#F4C400] border-[#F4C400]'
                      : 'bg-[#061F36]/60 text-slate-400 border-white/10 group-hover:border-white/30'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-5 h-5 text-[#F4C400]" /> : idx + 1}
                </div>

                {/* Short Milestone Title */}
                <span className={`text-[0.75rem] font-semibold line-clamp-1 leading-tight ${
                  isActive ? 'text-[#F4C400] font-bold' : isCompleted ? 'text-slate-200' : 'text-slate-400'
                }`}>
                  {step.subtitle.split('&')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Stage Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Simulated Road & Visual Milestone Map (5 Cols) */}
        <div className="lg:col-span-5 bg-[#061F36]/90 rounded-2xl p-6 border border-white/10 flex flex-col justify-between min-h-[440px]">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-300 mb-4 pb-3 border-b border-white/10">
              <span className="flex items-center gap-1.5 text-[#F4C400] font-bold">
                <Clock className="w-3.5 h-3.5 text-[#F4C400]" />
                Est. Duration: {activeStep.approxDuration}
              </span>
              <span className="text-slate-300">{activeStep.stageName}</span>
            </div>

            {/* Road SVG Simulation */}
            <div className="relative h-64 w-full bg-[#082B4C] rounded-xl overflow-hidden flex items-center justify-center border border-white/10">
              {/* Asphalt Road Canvas */}
              <div className="absolute inset-x-8 inset-y-4 bg-slate-900/90 rounded-2xl border-x-2 border-dashed border-[#F4C400]/40 flex items-center justify-center">
                {/* Lane Divider Dashes */}
                <div className="absolute inset-y-0 w-0.5 border-r-2 border-dashed border-white/30" />

                {/* Animated Car */}
                <motion.div
                  key={activeStepIndex}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  className="relative z-20 flex flex-col items-center"
                >
                  <RoadmapCar />
                  <div className="mt-2 px-2.5 py-0.5 rounded-full bg-[#082B4C] border border-[#F4C400]/50 text-[0.65rem] font-mono text-[#F4C400] font-bold uppercase tracking-wider">
                    Stage {activeStep.stepNumber} Active
                  </div>
                </motion.div>
              </div>

              {/* Start and Finish Flags */}
              <div className="absolute top-2 left-3 text-[0.65rem] font-bold uppercase tracking-wider text-slate-400">
                Start: Form 2
              </div>
              <div className="absolute bottom-2 right-3 text-[0.65rem] font-bold uppercase tracking-wider text-[#F4C400] flex items-center gap-1">
                <Award className="w-3 h-3 text-[#F4C400]" /> Finish: Smart DL
              </div>
            </div>
          </div>

          {/* Quick Official Portal Action */}
          {activeStep.rtoPortalUrl && (
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-slate-300">Official Portal:</span>
              <a
                href={activeStep.rtoPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#F4C400] hover:text-white font-bold underline"
              >
                Parivahan Sarathi Gov Portal <ExternalLink className="w-3 h-3 text-[#F4C400]" />
              </a>
            </div>
          )}
        </div>

        {/* Right Column: Detailed Milestone Content & Requirements (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Title & Summary */}
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#F4C400]/20 text-[#F4C400] border border-[#F4C400]/40 mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#F4C400]" />
                  {activeStep.stageName}
                </div>

                <h3 className="text-2xl font-bold font-display text-white tracking-tight">
                  {activeStep.title}
                </h3>
                <p className="mt-2 text-slate-200 text-sm leading-relaxed">
                  {activeStep.details}
                </p>
              </div>

              {/* Required Documents Card */}
              {activeStep.requiredDocuments.length > 0 && (
                <div className="p-4 rounded-2xl bg-[#061F36]/80 border border-white/10">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#F4C400] mb-3 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-[#F4C400]" />
                    Required Documents & Prerequisites:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-200">
                    {activeStep.requiredDocuments.map((doc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#F4C400] mt-0.5 shrink-0" />
                        <span className="leading-snug">{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* RTO Track Specific Maneuvers (if applicable) */}
              {activeStep.rtoTrackManeuvers && (
                <div className="p-4 rounded-2xl bg-[#061F36]/80 border border-white/10">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#F4C400] mb-3 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-[#F4C400]" />
                    Automated Track Test (ADTT) Camera Drills:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-200">
                    {activeStep.rtoTrackManeuvers.map((m, i) => (
                      <div key={i} className="p-2.5 rounded-xl bg-[#082B4C] border border-white/10">
                        <span className="font-semibold text-white block mb-0.5">{m.split(':')[0]}</span>
                        <span className="text-slate-300 leading-tight">{m.split(':')[1] || ''}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Instructor Pro-Tip Box */}
              <div className="p-4 rounded-2xl bg-[#061F36] border border-[#F4C400]/40 flex items-start gap-3.5">
                <div className="p-2 rounded-xl bg-[#F4C400]/20 text-[#F4C400] shrink-0">
                  <Lightbulb className="w-5 h-5 text-[#F4C400]" />
                </div>
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-[#F4C400]">
                    DriveCraft Instructor Pro-Tip:
                  </h5>
                  <p className="mt-1 text-xs text-slate-100 leading-relaxed italic">
                    "{activeStep.instructorProTip}"
                  </p>
                </div>
              </div>

              {/* Practical Checklist Checklist */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2.5">
                  Milestone Action Checklist:
                </h4>
                <div className="space-y-2">
                  {activeStep.checklistItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-3 rounded-xl bg-[#061F36]/60 border border-white/10 text-xs text-slate-200"
                    >
                      <span className={`px-2 py-0.5 rounded text-[0.65rem] font-bold ${
                        item.officialRequirement
                          ? 'bg-[#F4C400]/20 text-[#F4C400] border border-[#F4C400]/40'
                          : 'bg-white/10 text-slate-200 border border-white/20'
                      }`}>
                        {item.officialRequirement ? 'Official Rule' : 'Academy Step'}
                      </span>
                      <span className="flex-1">{item.task}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Stage Navigation Actions */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  {activeStepIndex > 0 && (
                    <Button variant="outline" size="sm" onClick={handlePrev} className="border-white/20 text-white hover:bg-white/10">
                      ← Step {activeStepIndex}
                    </Button>
                  )}
                  {activeStepIndex < steps.length - 1 && (
                    <Button variant="primary" size="sm" onClick={handleNext}>
                      Next: Step {activeStepIndex + 2} →
                    </Button>
                  )}
                </div>

                {onOpenBookingModal && (
                  <Button variant="primary" size="sm" onClick={onOpenBookingModal}>
                    Start Practical Training with Us
                  </Button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
