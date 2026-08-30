import React, { useRef, useState, useEffect } from 'react';
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
  const [activeStationIndex, setActiveStationIndex] = useState<number>(0);
  const [activeModalStep, setActiveModalStep] = useState<RoadmapStep | null>(null);

  // Scroll Progress binding to the container (starts at station 1 on initial load)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 180px', 'end 80%'],
  });

  // Smooth, gentle spring physics for slow and seamless car cruising
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 22,
    mass: 1.1,
    restDelta: 0.001,
  });

  // Track active checkpoint station with smooth transition thresholds
  useEffect(() => {
    const unsubscribe = smoothProgress.on('change', (v) => {
      if (v < 0.16) setActiveStationIndex(0);
      else if (v < 0.34) setActiveStationIndex(1);
      else if (v < 0.52) setActiveStationIndex(2);
      else if (v < 0.70) setActiveStationIndex(3);
      else if (v < 0.88) setActiveStationIndex(4);
      else setActiveStationIndex(5);
    });
    return () => unsubscribe();
  }, [smoothProgress]);

  // Wide, gradual transitions so the car drives slow and steady, then rests at each station
  const progressCheckpoints = [
    0.00, 0.05,    // Station 1 Stop
    0.18, 0.23,    // Smooth cruise & Station 2 Stop
    0.36, 0.41,    // Smooth cruise & Station 3 Stop
    0.54, 0.59,    // Smooth cruise & Station 4 Stop
    0.72, 0.77,    // Smooth cruise & Station 5 Stop
    0.90, 1.00,    // Smooth cruise & Station 6 Stop
  ];

  const carYCheckpoints = [
    '2%', '2%',    // Station 1 Stop
    '21%', '21%',  // Station 2 Stop
    '40%', '40%',  // Station 3 Stop
    '59%', '59%',  // Station 4 Stop
    '78%', '78%',  // Station 5 Stop
    '96%', '96%',  // Station 6 Stop
  ];

  const roadFillCheckpoints = [
    '4%', '4%',    // Station 1 Progress
    '22%', '22%',  // Station 2 Progress
    '41%', '41%',  // Station 3 Progress
    '60%', '60%',  // Station 4 Progress
    '79%', '79%',  // Station 5 Progress
    '100%', '100%',// Station 6 Progress
  ];

  const carRotateCheckpoints = [
    0, 0,          // Station 1: Stopped straight
    8, 0,          // Gentle steering to Station 2 -> Straighten & Stop
    -8, 0,         // Gentle steering to Station 3 -> Straighten & Stop
    8, 0,          // Gentle steering to Station 4 -> Straighten & Stop
    -8, 0,         // Gentle steering to Station 5 -> Straighten & Stop
    6, 0,          // Gentle steering to Station 6 -> Straighten & Stop
  ];

  // Car translation along the vertical path stopping at each checkpoint
  const carY = useTransform(smoothProgress, progressCheckpoints, carYCheckpoints);

  // Car dynamic steering angle into turns and straightening at each station
  const carRotate = useTransform(smoothProgress, progressCheckpoints, carRotateCheckpoints);

  // Road progress line fill height percentage syncing with each checkpoint stop
  const roadFillHeight = useTransform(smoothProgress, progressCheckpoints, roadFillCheckpoints);

  const milestoneIcons = [
    { badge: '1. APPLY & E-KYC', icon: FileText, color: 'text-blue-500 bg-blue-50 border-blue-200' },
    { badge: '2. THEORY LL TEST', icon: ShieldCheck, color: 'text-amber-500 bg-amber-50 border-amber-200' },
    { badge: '3. DUAL-CONTROL LESSONS', icon: Car, color: 'text-emerald-500 bg-emerald-50 border-emerald-300' },
    { badge: '4. 30-DAY PRACTICE GAP', icon: Sparkles, color: 'text-purple-500 bg-purple-50 border-purple-200' },
    { badge: '5. AUTOMATED RTO TEST', icon: Award, color: 'text-indigo-500 bg-indigo-50 border-indigo-200' },
    { badge: '6. SMART CARD DL LAUNCH', icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-100 border-emerald-400' },
  ];

  return (
    <div ref={containerRef} className="relative w-full py-4 lg:py-6 select-none">
      {/* FLOWING CENTRAL ROAD SPINE (Left on mobile, Center on desktop) */}
      <div className="absolute left-[1.125rem] md:left-1/2 top-4 bottom-4 -translate-x-1/2 w-6 md:w-10 z-0 flex flex-col items-center">
        {/* Outer Asphalt Road Layer */}
        <div className="relative w-full h-full bg-slate-900 rounded-full border-2 border-slate-700 shadow-md overflow-hidden flex justify-center">
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
            x: 0,
            rotate: carRotate,
          }}
          className="absolute z-20 -translate-x-1/2 pointer-events-none filter drop-shadow-xl transition-transform"
        >
          {/* Headlights Glow Beam */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-8 h-8 bg-amber-300/30 rounded-full blur-sm" />

          {/* Illustrated Top-Down Learner Car */}
          <div className="w-6 h-10 md:w-8 md:h-14 relative">
            <RoadmapCar isCompact />
          </div>
        </motion.div>
      </div>

      {/* MILESTONE STATIONS LIST */}
      <div className="relative z-10 space-y-4 sm:space-y-7 lg:space-y-9">
        {steps.map((step, idx) => {
          const isEven = idx % 2 === 0;
          const meta = milestoneIcons[idx] || milestoneIcons[0];
          const IconComponent = meta.icon;
          const isCurrentStation = activeStationIndex === idx;

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: idx * 0.04 }}
            >
              {/* DESKTOP LAYOUT (md:grid) — Alternating Left & Right Cards */}
              <div className="hidden md:grid grid-cols-12 gap-3 lg:gap-6 items-center">
                {/* Desktop Left Side Card (if Even) */}
                <div
                  className={`flex col-span-5 ${
                    isEven ? 'justify-end' : 'justify-end invisible pointer-events-none'
                  }`}
                >
                  {isEven && (
                    <MilestoneCard
                      step={step}
                      meta={meta}
                      IconComponent={IconComponent}
                      isActive={isCurrentStation}
                      onClick={() => setActiveModalStep(step)}
                    />
                  )}
                </div>

                {/* Center Node Pin (Station Marker on the Road) */}
                <div className="col-span-2 flex justify-center">
                  <button
                    onClick={() => setActiveModalStep(step)}
                    className={`group relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 transition-all duration-300 z-10 cursor-pointer shadow-sm ${
                      isCurrentStation
                        ? 'bg-emerald-600 border-white text-white scale-110 shadow-lg ring-4 ring-emerald-400/30'
                        : 'bg-white border-slate-800 text-slate-900 hover:scale-105 hover:border-emerald-500'
                    }`}
                    title={`Stage ${step.stepNumber}: ${step.title}`}
                  >
                    <span className={`text-xs font-black font-display ${isCurrentStation ? 'text-white' : 'text-slate-900 group-hover:text-emerald-700'}`}>
                      {step.stepNumber}
                    </span>

                    {/* Pulsing ring indicator */}
                    {isCurrentStation && (
                      <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-30 animate-ping pointer-events-none" />
                    )}
                  </button>
                </div>

                {/* Desktop Right Side Card (if Odd) */}
                <div
                  className={`flex col-span-5 ${
                    !isEven ? 'justify-start' : 'justify-start invisible pointer-events-none'
                  }`}
                >
                  {!isEven && (
                    <MilestoneCard
                      step={step}
                      meta={meta}
                      IconComponent={IconComponent}
                      isActive={isCurrentStation}
                      onClick={() => setActiveModalStep(step)}
                    />
                  )}
                </div>
              </div>

              {/* MOBILE LAYOUT (md:hidden) — Clean Flex Row without Any Pin Overlap */}
              <div className="flex md:hidden items-start gap-3 pl-1 pr-0.5">
                {/* Station Node Pin over Left Road */}
                <button
                  onClick={() => setActiveModalStep(step)}
                  className={`w-7 h-7 rounded-full border-2 shadow-sm flex items-center justify-center font-black text-[0.7rem] shrink-0 mt-3 z-10 transition-all ${
                    isCurrentStation
                      ? 'bg-emerald-600 border-white text-white scale-110 shadow-md ring-4 ring-emerald-400/30'
                      : 'bg-white border-slate-900 text-slate-900'
                  }`}
                  title={`Stage ${step.stepNumber}: ${step.title}`}
                >
                  {step.stepNumber}
                </button>

                {/* Mobile Card */}
                <div className="flex-1 min-w-0">
                  <MilestoneCard
                    step={step}
                    meta={meta}
                    IconComponent={IconComponent}
                    isActive={isCurrentStation}
                    onClick={() => setActiveModalStep(step)}
                  />
                </div>
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
  isActive?: boolean;
  onClick: () => void;
}

const MilestoneCard: React.FC<MilestoneCardProps> = ({ step, meta, IconComponent, isActive = false, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`group relative w-full max-w-lg lg:max-w-xl p-3.5 sm:p-4 lg:p-4.5 rounded-2xl bg-white border transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer text-left space-y-2 overflow-hidden ${
        isActive
          ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-md'
          : 'border-slate-200 shadow-xs hover:border-slate-300 hover:shadow-md'
      }`}
    >
      {/* Top Banner & Badge */}
      <div className="flex items-center justify-between gap-2">
        <span
          className={`px-2.5 py-0.5 sm:px-3 sm:py-0.5 rounded-full text-[0.65rem] sm:text-[0.68rem] font-extrabold uppercase tracking-wider transition-colors shadow-xs ${
            isActive
              ? 'bg-emerald-600 text-white'
              : 'bg-slate-900 text-white group-hover:bg-emerald-600'
          }`}
        >
          {meta.badge}
        </span>

        <span className="text-[0.65rem] sm:text-[0.7rem] font-bold text-slate-500 font-mono">
          {step.approxDuration}
        </span>
      </div>

      {/* Title & Icon Header */}
      <div className="flex items-start gap-2.5 sm:gap-3">
        <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 border ${meta.color}`}>
          <IconComponent className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
        </div>

        <div className="space-y-0.5 min-w-0 flex-1">
          <h4 className="text-xs sm:text-sm lg:text-base font-bold font-display text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
            {step.title}
          </h4>
          <p className="text-[0.72rem] sm:text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {step.summary}
          </p>
        </div>
      </div>

      {/* Bottom Action Prompt */}
      <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[0.7rem] sm:text-xs font-bold text-emerald-700 group-hover:text-emerald-800">
        <span className="uppercase tracking-wider">Inspect Checklist & Tips</span>
        <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
};
