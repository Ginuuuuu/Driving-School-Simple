import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
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
  Navigation,
} from 'lucide-react';
import { RoadmapStep } from '../../types';
import { RoadmapCar } from './RoadmapCar';
import { Button } from '../common/Button';

interface ScrollFlowingRoadmapProps {
  steps: RoadmapStep[];
  onOpenBookingModal?: () => void;
  isCompactPreview?: boolean;
}

export const ScrollFlowingRoadmap: React.FC<ScrollFlowingRoadmapProps> = ({
  steps,
  onOpenBookingModal,
  isCompactPreview = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeModalStep, setActiveModalStep] = useState<RoadmapStep | null>(null);

  // Scroll Progress binding to the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end 35%'],
  });

  // Smooth spring physics for natural car movement
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    restDelta: 0.001,
  });

  // Car translation along the vertical path (from top 4% to bottom 96%)
  const carY = useTransform(smoothProgress, [0, 1], ['2%', '96%']);

  // Car gentle horizontal serpentine sway as it drives down
  const carX = useTransform(
    smoothProgress,
    [0, 0.18, 0.36, 0.54, 0.72, 0.9, 1],
    ['0px', '28px', '-28px', '28px', '-28px', '20px', '0px']
  );

  // Car dynamic steering angle into each turn
  const carRotate = useTransform(
    smoothProgress,
    [0, 0.18, 0.36, 0.54, 0.72, 0.9, 1],
    [0, 18, -18, 18, -18, 10, 0]
  );

  // Road progress line fill height percentage
  const roadFillHeight = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  const milestoneIcons = [
    { badge: '1. APPLY & E-KYC', icon: FileText, color: 'text-blue-500 bg-blue-50 border-blue-200' },
    { badge: '2. THEORY LL TEST', icon: ShieldCheck, color: 'text-amber-500 bg-amber-50 border-amber-200' },
    { badge: '3. DUAL-CONTROL LESSONS', icon: Car, color: 'text-emerald-500 bg-emerald-50 border-emerald-300' },
    { badge: '4. 30-DAY PRACTICE GAP', icon: Sparkles, color: 'text-purple-500 bg-purple-50 border-purple-200' },
    { badge: '5. AUTOMATED RTO TEST', icon: Award, color: 'text-indigo-500 bg-indigo-50 border-indigo-200' },
    { badge: '6. SMART CARD DL LAUNCH', icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-100 border-emerald-400' },
  ];

  return (
    <div ref={containerRef} className="relative w-full py-8 lg:py-16 select-none">
      {/* FLOWING CENTRAL SERPENTINE ROAD SPINE */}
      <div className="absolute left-6 md:left-1/2 top-10 bottom-10 -translate-x-1/2 w-10 sm:w-14 z-0 flex flex-col items-center">
        {/* Outer Asphalt Road Layer */}
        <div className="relative w-full h-full bg-slate-900 rounded-full border-2 border-slate-700 shadow-xl overflow-hidden flex justify-center">
          {/* Dashed Center Road Line */}
          <div className="absolute inset-y-0 w-0.5 border-r-2 border-dashed border-slate-600/70" />

          {/* Dynamic Scroll-Linked Road Highlight Fill */}
          <motion.div
            style={{ height: roadFillHeight }}
            className="absolute top-0 inset-x-0 bg-gradient-to-b from-emerald-500 via-emerald-400 to-amber-400 opacity-90 rounded-full"
          />
        </div>

        {/* SMALL MOVING CAR (Follows Scroll Dynamically) */}
        <motion.div
          style={{
            top: carY,
            x: carX,
            rotate: carRotate,
          }}
          className="absolute z-20 -translate-x-1/2 pointer-events-none filter drop-shadow-2xl transition-transform"
        >
          {/* Headlights Glow Beam */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-10 h-10 bg-amber-300/30 rounded-full blur-md" />

          {/* Illustrated Top-Down Learner Car */}
          <div className="w-8 h-14 sm:w-10 sm:h-16 relative">
            <RoadmapCar isCompact />
          </div>
        </motion.div>
      </div>

      {/* MILESTONE STATIONS LIST (Alternating Left & Right on Desktop) */}
      <div className="relative z-10 space-y-12 sm:space-y-20 lg:space-y-28">
        {steps.map((step, idx) => {
          const isEven = idx % 2 === 0;
          const meta = milestoneIcons[idx] || milestoneIcons[0];
          const IconComponent = meta.icon;

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
            >
              {/* Desktop Left Side Card (if Even) */}
              <div
                className={`hidden md:flex md:col-span-5 ${
                  isEven ? 'justify-end' : 'justify-end invisible pointer-events-none'
                }`}
              >
                {isEven && (
                  <MilestoneCard
                    step={step}
                    meta={meta}
                    IconComponent={IconComponent}
                    onClick={() => setActiveModalStep(step)}
                  />
                )}
              </div>

              {/* Center Node Pin (Station Marker on the Road) */}
              <div className="pl-14 md:pl-0 md:col-span-2 flex justify-start md:justify-center">
                <button
                  onClick={() => setActiveModalStep(step)}
                  className="group relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border-2 border-slate-800 shadow-lg hover:scale-110 hover:border-emerald-500 transition-transform duration-200 z-10 cursor-pointer"
                  title={`Stage ${step.stepNumber}: ${step.title}`}
                >
                  <span className="text-xs sm:text-sm font-black font-display text-slate-900 group-hover:text-emerald-700">
                    {step.stepNumber}
                  </span>

                  {/* Pulsing ring indicator */}
                  <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-20 group-hover:animate-ping pointer-events-none" />
                </button>
              </div>

              {/* Desktop Right Side Card (if Odd) */}
              <div
                className={`hidden md:flex md:col-span-5 ${
                  !isEven ? 'justify-start' : 'justify-start invisible pointer-events-none'
                }`}
              >
                {!isEven && (
                  <MilestoneCard
                    step={step}
                    meta={meta}
                    IconComponent={IconComponent}
                    onClick={() => setActiveModalStep(step)}
                  />
                )}
              </div>

              {/* Mobile View Card (Always visible on smaller screens) */}
              <div className="block md:hidden pl-12 sm:pl-16 pr-1 -mt-8 sm:-mt-10">
                <MilestoneCard
                  step={step}
                  meta={meta}
                  IconComponent={IconComponent}
                  onClick={() => setActiveModalStep(step)}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* INTERACTIVE MILESTONE DETAILS MODAL / DRAWER */}
      {activeModalStep && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 my-8 max-h-[85vh] overflow-y-auto space-y-6 animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 inline-block mb-1.5">
                  Stage {activeModalStep.stepNumber} • {activeModalStep.approxDuration}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 leading-tight">
                  {activeModalStep.title}
                </h3>
              </div>

              <button
                onClick={() => setActiveModalStep(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Details */}
            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <p className="text-slate-600">{activeModalStep.details}</p>

              {/* Required Documents */}
              {activeModalStep.requiredDocuments.length > 0 && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h4 className="font-bold text-slate-900 flex items-center gap-2 text-xs uppercase tracking-wider">
                    <FileText className="w-4 h-4 text-emerald-600" />
                    Required Documents Checklist:
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {activeModalStep.requiredDocuments.map((doc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* RTO ADTT Track Maneuvers (if applicable) */}
              {activeModalStep.rtoTrackManeuvers && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
                  <h4 className="font-bold text-amber-950 flex items-center gap-2 text-xs uppercase tracking-wider">
                    <Award className="w-4 h-4 text-amber-600" />
                    Automated Camera Track Drills:
                  </h4>
                  <div className="space-y-1 text-xs text-amber-900">
                    {activeModalStep.rtoTrackManeuvers.map((m, i) => (
                      <div key={i} className="p-2 rounded-lg bg-white/80 border border-amber-200/60 font-medium">
                        {m}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Instructor Pro-Tip */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-emerald-950 block text-xs uppercase tracking-wider mb-0.5">
                    DriveCraft Instructor Pro-Tip:
                  </span>
                  <p className="text-xs text-emerald-900 italic">
                    "{activeModalStep.instructorProTip}"
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              {activeModalStep.rtoPortalUrl ? (
                <a
                  href={activeModalStep.rtoPortalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:underline"
                >
                  Visit Parivahan Sarathi Gov Portal <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <div />
              )}

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => setActiveModalStep(null)}>
                  Close
                </Button>
                {onOpenBookingModal && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      setActiveModalStep(null);
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

// Subcomponent: Milestone Card with Micro-interactions
interface MilestoneCardProps {
  step: RoadmapStep;
  meta: { badge: string; icon: any; color: string };
  IconComponent: any;
  onClick: () => void;
}

const MilestoneCard: React.FC<MilestoneCardProps> = ({ step, meta, IconComponent, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group relative w-full max-w-md p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-xs hover:shadow-xl hover:border-emerald-400/80 transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer text-left space-y-2 sm:space-y-3 overflow-hidden"
    >
      {/* Top Banner & Badge */}
      <div className="flex items-center justify-between gap-2">
        <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[0.65rem] sm:text-[0.68rem] font-extrabold uppercase tracking-wider bg-slate-900 text-white group-hover:bg-emerald-600 transition-colors shadow-xs">
          {meta.badge}
        </span>

        <span className="text-[0.65rem] sm:text-[0.7rem] font-bold text-slate-500">
          {step.approxDuration}
        </span>
      </div>

      {/* Title & Icon Header */}
      <div className="flex items-start gap-2.5 sm:gap-3.5">
        <div className={`w-8 h-8 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 border ${meta.color}`}>
          <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>

        <div className="space-y-0.5 sm:space-y-1 min-w-0">
          <h4 className="text-xs sm:text-base font-bold font-display text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug truncate sm:whitespace-normal">
            {step.title}
          </h4>
          <p className="text-[0.72rem] sm:text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {step.summary}
          </p>
        </div>
      </div>

      {/* Bottom Action Prompt */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[0.7rem] sm:text-xs font-bold text-emerald-700 group-hover:text-emerald-800">
        <span className="uppercase tracking-wider">Inspect Checklist & Tips</span>
        <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transform group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
};
