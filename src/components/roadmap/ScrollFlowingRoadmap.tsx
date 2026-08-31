import React, { useRef, useState, useEffect, useMemo } from 'react';
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
  Compass,
  Zap,
} from 'lucide-react';
import { RoadmapStep } from '../../types';
import { RoadmapCar } from './RoadmapCar';
import { Button } from '../common/Button';
import {
  Timeline,
  TimelineDot,
  TimelineItem,
  TimelineContent,
  TimelineHeading,
  TimelineLine,
} from '../ui/timeline';

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
  const [scrollPercent, setScrollPercent] = useState<number>(0);
  const [activeModalStep, setActiveModalStep] = useState<RoadmapStep | null>(null);
  const [isMobileView, setIsMobileView] = useState<boolean>(false);

  // Detect mobile screen for responsive layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scroll Progress binding to the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 65%', 'end 75%'],
  });

  // Smooth, tactile spring physics for scroll synchronization
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 24,
    mass: 1,
    restDelta: 0.001,
  });

  // Dynamic step thresholds
  const totalSteps = steps.length || 6;
  const stepThresholds = useMemo(() => {
    return steps.map((_, idx) => idx / Math.max(1, totalSteps - 1));
  }, [steps, totalSteps]);

  // Track active checkpoint station and percentage
  useEffect(() => {
    const unsubscribe = smoothProgress.on('change', (v) => {
      const clamped = Math.max(0, Math.min(1, v));
      setScrollPercent(Math.round(clamped * 100));

      // Calculate nearest active step
      const stepFraction = 1 / totalSteps;
      let currentIndex = 0;
      for (let i = 0; i < totalSteps; i++) {
        if (clamped >= i * stepFraction - 0.04) {
          currentIndex = i;
        }
      }
      setActiveStationIndex(currentIndex);
    });
    return () => unsubscribe();
  }, [smoothProgress, totalSteps]);

  // Car animation mappings along vertical spine
  const carY = useTransform(smoothProgress, [0, 1], ['0%', '94%']);
  const carRotate = useTransform(
    smoothProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [0, 10, -10, 10, -10, 0]
  );
  const roadFillHeight = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  const milestoneIcons = [
    { badge: 'Stage 1 • Registration', icon: FileText, color: 'text-blue-500 bg-blue-50 border-blue-200' },
    { badge: 'Stage 2 • Theory Test', icon: ShieldCheck, color: 'text-amber-500 bg-amber-50 border-amber-200' },
    { badge: 'Stage 3 • Dual-Control', icon: Car, color: 'text-emerald-500 bg-emerald-50 border-emerald-300' },
    { badge: 'Stage 4 • Legal Gap', icon: Sparkles, color: 'text-purple-500 bg-purple-50 border-purple-200' },
    { badge: 'Stage 5 • ADTT Track', icon: Award, color: 'text-indigo-500 bg-indigo-50 border-indigo-200' },
    { badge: 'Stage 6 • Smart Card DL', icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-100 border-emerald-400' },
  ];

  // Quick jump function
  const scrollToMilestone = (idx: number) => {
    setActiveStationIndex(idx);
    const element = document.getElementById(`timeline-step-${idx}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div ref={containerRef} className="relative w-full py-4 lg:py-6 select-none space-y-6">
      {/* SCROLL PROGRESS HEADER & LIVE STAGE TRACKER */}
      <div className="bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-sm space-y-3 sticky top-16 sm:top-20 z-20">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200">
              <Compass className="w-4 h-4 animate-spin-slow" />
            </div>
            <div>
              <span className="font-bold text-slate-900 font-display">
                Licence Journey: Stage {activeStationIndex + 1} of {totalSteps}
              </span>
              <span className="hidden sm:inline text-slate-500 ml-2">
                ({steps[activeStationIndex]?.title || ''})
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-slate-900 text-white shadow-xs">
              {scrollPercent}% Completed
            </span>
          </div>
        </div>

        {/* Horizontal Mini Progress Bar */}
        <div className="relative w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
          <motion.div
            style={{ width: `${Math.max(scrollPercent, ((activeStationIndex + 1) / totalSteps) * 100 * 0.2)}%` }}
            className="h-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-amber-400 rounded-full transition-all duration-300"
          />
        </div>

        {/* Milestone Fast-Jump Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none pt-1">
          {steps.map((step, idx) => {
            const isPassed = scrollPercent >= (stepThresholds[idx] || 0) * 100;
            const isCurrent = activeStationIndex === idx;

            return (
              <button
                key={step.id}
                onClick={() => scrollToMilestone(idx)}
                className={`px-3 py-1 rounded-xl text-[0.7rem] sm:text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                  isCurrent
                    ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-400/30 scale-105'
                    : isPassed
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                    : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {isPassed && !isCurrent ? (
                  <Check className="w-3 h-3 text-emerald-600" />
                ) : (
                  <span>{idx + 1}</span>
                )}
                <span>Stage {step.stepNumber}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TIMELINE CONTAINER WITH CENTRAL/LEFT SPINE & SCROLL EFFECT */}
      <div className="relative py-4 sm:py-6">
        {/* ANIMATED CRUISING CAR & GLOW ALONG TIMELINE SPINE */}
        <div
          className={`absolute top-6 bottom-8 pointer-events-none z-10 hidden sm:flex flex-col items-center ${
            isMobileView
              ? 'left-[10px] -translate-x-1/2'
              : 'left-1/2 -translate-x-1/2'
          }`}
        >
          {/* Vertical dynamic road highlight bar */}
          <div className="relative w-1.5 h-full bg-transparent overflow-hidden">
            <motion.div
              style={{ height: roadFillHeight }}
              className="absolute top-0 inset-x-0 bg-gradient-to-b from-emerald-500 via-emerald-400 to-amber-400 opacity-90 rounded-full"
            />
          </div>

          {/* Mini Driving Learner Car following scroll */}
          <motion.div
            style={{
              top: carY,
              rotate: carRotate,
            }}
            className="absolute z-30 filter drop-shadow-xl transition-transform"
          >
            {/* Front Headlights Beam Effect */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-6 h-6 bg-amber-300/40 rounded-full blur-[3px]" />
            <div className="w-6 h-10 relative">
              <RoadmapCar isCompact />
            </div>
          </motion.div>
        </div>

        {/* CORE TIMELINE COMPONENT */}
        <Timeline
          positions={isMobileView ? 'left' : 'center'}
          className="relative z-0 space-y-2 sm:space-y-4"
        >
          {steps.map((step, idx) => {
            const isEven = idx % 2 === 0;
            const side = isMobileView ? 'right' : isEven ? 'left' : 'right';
            const meta = milestoneIcons[idx] || milestoneIcons[0];
            const IconComponent = meta.icon;

            // Compute status based on scroll
            const threshold = stepThresholds[idx] || (idx / totalSteps);
            const progressRatio = scrollPercent / 100;
            const isDone = progressRatio > threshold + 0.12;
            const isCurrent = activeStationIndex === idx;

            const status = isDone
              ? 'done'
              : isCurrent
              ? 'current'
              : 'default';

            return (
              <TimelineItem
                key={step.id}
                id={`timeline-step-${idx}`}
                status={status}
                className="transition-all duration-300"
              >
                {/* Timeline Heading with stage badge */}
                <TimelineHeading
                  side={side}
                  variant="primary"
                  className="cursor-pointer group flex items-center gap-2 mb-1"
                  onClick={() => setActiveModalStep(step)}
                >
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[0.65rem] sm:text-xs font-bold uppercase tracking-wider transition-colors ${
                      isCurrent
                        ? 'bg-emerald-600 text-white'
                        : isDone
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-700 group-hover:bg-slate-200'
                    }`}
                  >
                    Stage {step.stepNumber}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-800 truncate">
                    {step.title}
                  </span>
                </TimelineHeading>

                {/* Timeline Dot (Interactive Clickable Checkpoint Pin) */}
                <TimelineDot
                  status={status}
                  onClick={() => scrollToMilestone(idx)}
                  className={`cursor-pointer transition-all duration-300 ${
                    isCurrent
                      ? 'ring-4 ring-emerald-400/30 scale-125 border-emerald-500 bg-emerald-50 text-emerald-600'
                      : isDone
                      ? 'hover:scale-110 shadow-sm border-emerald-600 text-emerald-600'
                      : 'hover:scale-105 border-slate-300 text-slate-400'
                  }`}
                  title={`Stage ${step.stepNumber}: ${step.title}`}
                />

                {/* Timeline Connecting Line */}
                {idx < steps.length - 1 && (
                  <TimelineLine
                    done={isDone}
                    className={`transition-colors duration-300 ${
                      isDone ? 'bg-emerald-500' : 'bg-slate-200'
                    }`}
                  />
                )}

                {/* Timeline Content Card */}
                <TimelineContent side={side} className="w-full pb-8">
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-30px' }}
                    transition={{ duration: 0.4 }}
                  >
                    <div
                      onClick={() => setActiveModalStep(step)}
                      className={`group relative w-full max-w-lg lg:max-w-xl p-4 sm:p-5 rounded-2xl sm:rounded-3xl border transition-all duration-300 cursor-pointer text-left space-y-3 overflow-hidden ${
                        isCurrent
                          ? 'bg-white border-emerald-500 ring-2 ring-emerald-500/20 shadow-lg -translate-y-0.5'
                          : isDone
                          ? 'bg-white/90 border-emerald-200 shadow-xs hover:border-emerald-300 hover:shadow-md'
                          : 'bg-white/80 border-slate-200 shadow-xs hover:border-slate-300 hover:shadow-md'
                      } ${side === 'left' ? 'ml-auto' : 'mr-auto'}`}
                    >
                      {/* Top Header with Icon & Duration */}
                      <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border ${meta.color}`}>
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-[0.68rem] sm:text-xs font-bold text-slate-500 uppercase tracking-wider block">
                              {step.subtitle || meta.badge}
                            </span>
                          </div>
                        </div>

                        <span className="px-2.5 py-0.5 rounded-full text-[0.65rem] sm:text-xs font-mono font-bold bg-slate-100 text-slate-700">
                          {step.approxDuration}
                        </span>
                      </div>

                      {/* Title & Description Summary */}
                      <div className="space-y-1">
                        <h4 className="text-sm sm:text-base font-bold font-display text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                          {step.title}
                        </h4>
                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          {step.summary}
                        </p>
                      </div>

                      {/* Required Documents / Key Highlight Tags */}
                      {step.requiredDocuments && step.requiredDocuments.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[0.65rem] sm:text-[0.7rem] font-medium bg-slate-50 border border-slate-200 text-slate-600">
                            <FileText className="w-3 h-3 text-emerald-600" />
                            {step.requiredDocuments.length} Documents Required
                          </span>

                          {step.instructorProTip && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[0.65rem] sm:text-[0.7rem] font-medium bg-emerald-50 border border-emerald-200 text-emerald-800">
                              <Lightbulb className="w-3 h-3 text-emerald-600" />
                              Instructor Tip Included
                            </span>
                          )}
                        </div>
                      )}

                      {/* Bottom Action Footer */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700 group-hover:text-emerald-800">
                        <span className="uppercase tracking-wider text-[0.7rem] sm:text-xs">
                          Inspect Checklist & Procedures
                        </span>
                        <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </motion.div>
                </TimelineContent>
              </TimelineItem>
            );
          })}
        </Timeline>
      </div>

      {/* DETAILED MODAL DIALOG ON MILESTONE SELECTION */}
      {activeModalStep && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 my-8 max-h-[88vh] overflow-y-auto space-y-6 animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
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
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content Details */}
            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <p className="text-slate-600">{activeModalStep.details}</p>

              {/* Required Documents Checklist */}
              {activeModalStep.requiredDocuments && activeModalStep.requiredDocuments.length > 0 && (
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

              {/* ADTT Automated Track Maneuvers (if applicable) */}
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
              {activeModalStep.instructorProTip && (
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
              )}
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              {activeModalStep.rtoPortalUrl ? (
                <a
                  href={activeModalStep.rtoPortalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:underline"
                >
                  Official Sarathi Portal <ExternalLink className="w-3.5 h-3.5" />
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
