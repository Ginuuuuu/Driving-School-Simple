import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  Lightbulb,
  Check,
  FileText,
  Award,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { RoadmapStep } from '../../types';
import { RoadmapCar } from './RoadmapCar';
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
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [scrollProgressRatio, setScrollProgressRatio] = useState<number>(0);

  // For non-compact view on mobile: tap-to-expand details
  const [expandedIndices, setExpandedIndices] = useState<Set<number>>(new Set([0]));

  const toggleStep = (idx: number) => {
    setExpandedIndices((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) {
        next.delete(idx);
      } else {
        next.add(idx);
      }
      return next;
    });
  };

  // Scroll Progress binding to the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 70%', 'end 80%'],
  });

  // Smooth spring physics for scroll synchronization
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 26,
    restDelta: 0.001,
  });

  const totalSteps = steps.length || 6;

  // Track active checkpoint station and percentage
  useEffect(() => {
    const unsubscribe = smoothProgress.on('change', (v) => {
      const clamped = Math.max(0, Math.min(1, v));
      setScrollProgressRatio(clamped);

      // Determine active step index
      const stepIndex = Math.min(
        totalSteps - 1,
        Math.floor(clamped * totalSteps)
      );
      setActiveStepIndex(stepIndex);
    });
    return () => unsubscribe();
  }, [smoothProgress, totalSteps]);

  // Reactive car animations along the vertical timeline line (active on both mobile & desktop)
  const carY = useTransform(smoothProgress, [0, 1], ['0%', '95%']);
  const carRotate = useTransform(
    smoothProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [0, 8, -8, 8, -8, 0]
  );

  const displaySteps = isCompactPreview ? steps.slice(0, 6) : steps;

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-4xl mx-auto select-none ${
        isCompactPreview ? 'py-2 sm:py-4' : 'py-6 sm:py-10 space-y-8'
      }`}
    >
      {/* ANIMATED REACTIVE CAR ON THE TIMELINE LINE (MOBILE & DESKTOP) */}
      <div className="absolute top-7 sm:top-10 bottom-10 left-2 pointer-events-none z-20">
        <motion.div
          style={{
            top: carY,
            rotate: carRotate,
          }}
          className="absolute -translate-x-1/2 select-none filter drop-shadow-md transition-transform"
        >
          {/* Headlight glow beam */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-amber-300/50 rounded-full blur-[2px]" />
          <RoadmapCar isCompact className="scale-75 origin-center" />
        </motion.div>
      </div>

      {/* FLOWING ONE-SIDED TIMELINE */}
      <Timeline positions="left" className="relative z-0">
        {displaySteps.map((step, idx) => {
          const stepThreshold = idx / totalSteps;
          const isDone = scrollProgressRatio > stepThreshold + 0.12;
          const isCurrent = activeStepIndex === idx;

          const status = isDone
            ? 'done'
            : isCurrent
            ? 'current'
            : 'default';

          const isExpanded = expandedIndices.has(idx);

          return (
            <TimelineItem
              key={step.id || idx}
              status={status}
              className={`transition-colors duration-300 group ${
                isCompactPreview ? 'pb-2 sm:pb-3' : ''
              }`}
            >
              {/* Heading — Title-First Scannability */}
              <TimelineHeading
                side="right"
                variant={isCurrent || isDone ? 'primary' : 'secondary'}
                className="flex items-center justify-between gap-2 mb-1 cursor-pointer select-none"
                onClick={() => !isCompactPreview && toggleStep(idx)}
              >
                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                  <span className="font-mono text-xs uppercase tracking-wider font-bold text-emerald-600">
                    Stage {step.stepNumber}
                  </span>
                  <span className="text-sm sm:text-base font-bold font-display text-slate-900 group-hover:text-emerald-800 transition-colors">
                    {step.title}
                  </span>
                  {step.approxDuration && (
                    <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                      • {step.approxDuration}
                    </span>
                  )}
                </div>

                {/* Chevron for mobile tap-to-expand in full roadmap page */}
                {!isCompactPreview && (
                  <div className="md:hidden pr-2 text-slate-400">
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isExpanded ? 'rotate-180 text-emerald-600' : ''
                      }`}
                    />
                  </div>
                )}
              </TimelineHeading>

              {/* Dot */}
              <TimelineDot
                status={status}
                className={`transition-all duration-300 ${
                  isCurrent
                    ? 'ring-4 ring-emerald-400/30 scale-125 border-emerald-600 text-emerald-600'
                    : isDone
                    ? 'border-emerald-600 text-emerald-600'
                    : 'border-slate-300 text-slate-400'
                }`}
              />

              {/* Line */}
              {idx < displaySteps.length - 1 && (
                <TimelineLine
                  done={isDone}
                  className={`transition-colors duration-300 ${
                    isDone ? 'bg-emerald-500' : 'bg-slate-200'
                  }`}
                />
              )}

              {/* Content: ONLY rendered on the full Roadmap page (!isCompactPreview).
                  On the Home page (isCompactPreview), extra stuff is excluded per UX rules */}
              {!isCompactPreview && (
                <TimelineContent side="right" className="pb-8 pt-1 space-y-3 max-w-3xl">
                  {/* Desktop view shows details; Mobile view shows details when tapped/expanded */}
                  <div className="hidden md:block space-y-3">
                    {/* Subtitle / Stage name */}
                    {step.subtitle && (
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                        {step.subtitle}
                      </p>
                    )}

                    {/* Summary text */}
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {step.summary}
                    </p>

                    {/* Additional Details */}
                    {step.details && (
                      <p className="text-xs text-slate-600 leading-relaxed pt-1">
                        {step.details}
                      </p>
                    )}

                    {/* Checklist & Key Rules */}
                    {step.requiredDocuments && step.requiredDocuments.length > 0 && (
                      <div className="pt-2 space-y-1.5">
                        <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wider">
                          <FileText className="w-3.5 h-3.5 text-emerald-600" />
                          Key Requirements:
                        </span>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-600 pl-1">
                          {step.requiredDocuments.slice(0, 4).map((doc, docIdx) => (
                            <li key={docIdx} className="flex items-start gap-1.5">
                              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                              <span>{doc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* ADTT Automated Track Maneuvers */}
                    {step.rtoTrackManeuvers && (
                      <div className="pt-2 space-y-1.5">
                        <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5 uppercase tracking-wider">
                          <Award className="w-3.5 h-3.5 text-amber-600" />
                          Track Drills:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {step.rtoTrackManeuvers.map((drill, drillIdx) => (
                            <span
                              key={drillIdx}
                              className="px-2.5 py-1 rounded-lg bg-amber-50/80 border border-amber-200/80 text-[0.72rem] text-amber-900"
                            >
                              {drill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Instructor Pro-Tip */}
                    {step.instructorProTip && (
                      <div className="pt-2 flex items-start gap-2 text-xs text-emerald-900 bg-emerald-50/70 border border-emerald-200/70 p-2.5 rounded-xl">
                        <Lightbulb className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <p className="italic">
                          <strong className="not-italic font-bold">Instructor Tip: </strong>
                          "{step.instructorProTip}"
                        </p>
                      </div>
                    )}

                    {/* Action Link & CTA */}
                    <div className="pt-2 flex items-center gap-4 text-xs">
                      {step.rtoPortalUrl && (
                        <a
                          href={step.rtoPortalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-emerald-700 font-semibold hover:underline"
                        >
                          Official Sarathi Portal <ExternalLink className="w-3 h-3" />
                        </a>
                      )}

                      {onOpenBookingModal && (
                        <button
                          onClick={onOpenBookingModal}
                          className="text-slate-800 font-bold hover:text-emerald-700 underline transition-colors cursor-pointer"
                        >
                          Book Training for this Stage →
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Mobile Tap-to-Expand Accordion Details */}
                  <div className="block md:hidden">
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="space-y-3 pt-1"
                        >
                          <p className="text-xs text-slate-700 leading-relaxed">
                            {step.summary}
                          </p>

                          {step.details && (
                            <p className="text-[0.75rem] text-slate-600 leading-relaxed">
                              {step.details}
                            </p>
                          )}

                          {step.requiredDocuments && step.requiredDocuments.length > 0 && (
                            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                              <span className="text-[0.68rem] font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1">
                                <FileText className="w-3 h-3 text-emerald-600" />
                                Requirements:
                              </span>
                              <ul className="space-y-1 text-xs text-slate-600">
                                {step.requiredDocuments.slice(0, 3).map((doc, docIdx) => (
                                  <li key={docIdx} className="flex items-start gap-1.5">
                                    <Check className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />
                                    <span>{doc}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {step.instructorProTip && (
                            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2">
                              <Lightbulb className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <p className="italic text-[0.75rem]">"{step.instructorProTip}"</p>
                            </div>
                          )}

                          <div className="pt-1 flex flex-col gap-2">
                            {step.rtoPortalUrl && (
                              <a
                                href={step.rtoPortalUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs text-emerald-700 font-bold hover:underline"
                              >
                                Sarathi Portal <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                            {onOpenBookingModal && (
                              <button
                                onClick={onOpenBookingModal}
                                className="inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-xs"
                              >
                                <Sparkles className="w-3 h-3 text-amber-300" /> Book for Stage {step.stepNumber}
                              </button>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </TimelineContent>
              )}
            </TimelineItem>
          );
        })}
      </Timeline>
    </div>
  );
};
