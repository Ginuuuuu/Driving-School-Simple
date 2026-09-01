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
    <div className="relative bg-slate-900 text-white rounded-3xl p-6 lg:p-10 border border-slate-800 shadow-2xl overflow-hidden">
      {/* Background road texture */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#38BDF8_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Top Milestone Navigation Bar */}
      <div className="relative z-10 mb-8 border-b border-slate-800 pb-6">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#BC2639]/20 text-[#FFC5DC] border border-[#BC2639]/30">
              Interactive Licence Journey
            </span>
            <span className="text-xs text-slate-400">
              Step {activeStepIndex + 1} of {steps.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={activeStepIndex === 0}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none text-slate-300 hover:text-white transition-colors"
              aria-label="Previous milestone"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              disabled={activeStepIndex === steps.length - 1}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none text-slate-300 hover:text-white transition-colors"
              aria-label="Next milestone"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Milestone Steps Bar with Car Marker */}
        <div className="relative grid grid-cols-6 gap-2">
          {/* Track Progress Line */}
          <div className="absolute top-1/2 left-4 right-4 h-1 bg-slate-800 -translate-y-1/2 z-0 rounded-full" />
          <div
            className="absolute top-1/2 left-4 h-1 bg-gradient-to-r from-[#BC2639] to-[#FFC5DC] -translate-y-1/2 z-0 transition-all duration-500 rounded-full"
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
                      ? 'bg-[#BC2639] text-white border-[#FFC5DC] shadow-sm ring-4 ring-[#FFC5DC]/30'
                      : isCompleted
                      ? 'bg-[#5F1618] text-[#FFC5DC] border-[#BC2639]'
                      : 'bg-slate-800 text-slate-400 border-slate-700 group-hover:border-slate-500'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-5 h-5 text-[#FFC5DC]" /> : idx + 1}
                </div>

                {/* Short Milestone Title */}
                <span className={`text-[0.75rem] font-semibold line-clamp-1 leading-tight ${
                  isActive ? 'text-[#FFC5DC] font-bold' : isCompleted ? 'text-slate-300' : 'text-slate-500'
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
        <div className="lg:col-span-5 bg-slate-950/80 rounded-2xl p-6 border border-slate-800/80 flex flex-col justify-between min-h-[440px]">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-4 pb-3 border-b border-slate-800">
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <Clock className="w-3.5 h-3.5" />
                Est. Duration: {activeStep.approxDuration}
              </span>
              <span className="text-slate-400">{activeStep.stageName}</span>
            </div>

            {/* Road SVG Simulation */}
            <div className="relative h-64 w-full bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center border border-slate-800">
              {/* Asphalt Road Canvas */}
              <div className="absolute inset-x-8 inset-y-4 bg-slate-800/90 rounded-2xl border-x-2 border-dashed border-amber-400/40 flex items-center justify-center">
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
                  <div className="mt-2 px-2.5 py-0.5 rounded-full bg-slate-950/90 border border-emerald-500/50 text-[0.65rem] font-mono text-emerald-300 font-bold uppercase tracking-wider">
                    Stage {activeStep.stepNumber} Active
                  </div>
                </motion.div>
              </div>

              {/* Start and Finish Flags */}
              <div className="absolute top-2 left-3 text-[0.65rem] font-bold uppercase tracking-wider text-slate-500">
                Start: Form 2
              </div>
              <div className="absolute bottom-2 right-3 text-[0.65rem] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                <Award className="w-3 h-3" /> Finish: Smart DL
              </div>
            </div>
          </div>

          {/* Quick Official Portal Action */}
          {activeStep.rtoPortalUrl && (
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Official Portal:</span>
              <a
                href={activeStep.rtoPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-bold underline"
              >
                Parivahan Sarathi Gov Portal <ExternalLink className="w-3 h-3" />
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
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20 mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  {activeStep.stageName}
                </div>

                <h3 className="text-2xl font-bold font-display text-white tracking-tight">
                  {activeStep.title}
                </h3>
                <p className="mt-2 text-slate-300 text-sm leading-relaxed">
                  {activeStep.details}
                </p>
              </div>

              {/* Required Documents Card */}
              {activeStep.requiredDocuments.length > 0 && (
                <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-1.5">
                    <FileText className="w-4 h-4" />
                    Required Documents & Prerequisites:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                    {activeStep.requiredDocuments.map((doc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                        <span className="leading-snug">{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* RTO Track Specific Maneuvers (if applicable) */}
              {activeStep.rtoTrackManeuvers && (
                <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3 flex items-center gap-1.5">
                    <Award className="w-4 h-4" />
                    Automated Track Test (ADTT) Camera Drills:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-300">
                    {activeStep.rtoTrackManeuvers.map((m, i) => (
                      <div key={i} className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                        <span className="font-semibold text-white block mb-0.5">{m.split(':')[0]}</span>
                        <span className="text-slate-400 leading-tight">{m.split(':')[1] || ''}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Instructor Pro-Tip Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-slate-800/60 border border-emerald-500/30 flex items-start gap-3.5">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300 shrink-0">
                  <Lightbulb className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                    DriveCraft Instructor Pro-Tip:
                  </h5>
                  <p className="mt-1 text-xs text-slate-200 leading-relaxed italic">
                    "{activeStep.instructorProTip}"
                  </p>
                </div>
              </div>

              {/* Practical Checklist Checklist */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                  Milestone Action Checklist:
                </h4>
                <div className="space-y-2">
                  {activeStep.checklistItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/40 border border-slate-800 text-xs text-slate-300"
                    >
                      <span className={`px-2 py-0.5 rounded text-[0.65rem] font-bold ${
                        item.officialRequirement
                          ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                          : 'bg-emerald-400/20 text-emerald-300 border border-emerald-400/30'
                      }`}>
                        {item.officialRequirement ? 'Official Rule' : 'Academy Step'}
                      </span>
                      <span className="flex-1">{item.task}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Stage Navigation Actions */}
              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  {activeStepIndex > 0 && (
                    <Button variant="outline" size="sm" onClick={handlePrev} className="border-slate-700 text-slate-300 hover:text-white">
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
                  <Button variant="amber" size="sm" onClick={onOpenBookingModal}>
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
