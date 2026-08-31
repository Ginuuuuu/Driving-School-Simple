import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  ExternalLink,
  Lightbulb,
  Check,
  Compass,
  FileText,
  Award,
} from 'lucide-react';
import { RoadmapStep } from '../../types';
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

  const displaySteps = isCompactPreview ? steps.slice(0, 6) : steps;

  return (
    <div ref={containerRef} className="relative w-full max-w-4xl mx-auto py-6 sm:py-10 space-y-8 select-none">
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

          return (
            <TimelineItem
              key={step.id}
              status={status}
              className="transition-colors duration-300 group"
            >
              {/* Heading */}
              <TimelineHeading
                side="right"
                variant={isCurrent || isDone ? 'primary' : 'secondary'}
                className="flex items-center gap-2.5 mb-1.5"
              >
                <span className="font-mono text-xs uppercase tracking-wider font-bold text-emerald-600">
                  Stage {step.stepNumber}
                </span>
                <span className="text-base sm:text-lg font-semibold font-display text-slate-900">
                  {step.title}
                </span>
                <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                  • {step.approxDuration}
                </span>
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

              {/* Content (Flowing, clean, non-card layout) */}
              <TimelineContent side="right" className="pb-10 pt-1 space-y-3 max-w-3xl">
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

                {/* Additional Details (if not compact) */}
                {!isCompactPreview && step.details && (
                  <p className="text-xs text-slate-600 leading-relaxed pt-1">
                    {step.details}
                  </p>
                )}

                {/* Checklist & Key Rules (Flowing inline list) */}
                {!isCompactPreview && step.requiredDocuments && step.requiredDocuments.length > 0 && (
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
                {!isCompactPreview && step.rtoTrackManeuvers && (
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
                {!isCompactPreview && step.instructorProTip && (
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
              </TimelineContent>
            </TimelineItem>
          );
        })}
      </Timeline>
    </div>
  );
};
