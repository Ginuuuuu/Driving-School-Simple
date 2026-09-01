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
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [scrollProgressRatio, setScrollProgressRatio] = useState<number>(0);

  // For mobile full roadmap: tap-to-expand details
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
        isCompactPreview ? 'py-3 sm:py-6' : 'py-6 sm:py-10 space-y-8'
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
                isCompactPreview ? 'pb-4 sm:pb-6' : 'pb-6 sm:pb-10'
              }`}
            >
              {/* Heading — Two-Line Mobile Title Layout & Full Desktop Title */}
              <TimelineHeading
                side="right"
                variant={isCurrent || isDone ? 'primary' : 'secondary'}
                className="mb-1 cursor-pointer select-none"
                onClick={() => !isCompactPreview && toggleStep(idx)}
              >
                {/* Mobile Heading (< md): STAGE on top, 2-line title below */}
                <div className="block md:hidden pr-2">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <span className="font-mono text-[0.68rem] uppercase tracking-wider font-bold text-[#BC2639]">
                      Stage {step.stepNumber}
                    </span>
                    {step.approxDuration && (
                      <span className="text-[0.65rem] text-[#404D68] font-mono">
                        {step.approxDuration}
                      </span>
                    )}
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-bold font-display text-[#39340F] leading-snug break-words max-w-[calc(100vw-85px)] group-hover:text-[#BC2639] transition-colors">
                      {step.title}
                    </h3>
                    {!isCompactPreview && (
                      <ChevronDown
                        className={`w-4 h-4 shrink-0 text-[#404D68] transition-transform duration-200 mt-0.5 ${
                          isExpanded ? 'rotate-180 text-[#BC2639]' : ''
                        }`}
                      />
                    )}
                  </div>
                </div>

                {/* Desktop Heading (>= md): Inline Stage + Title + Duration */}
                <div className="hidden md:flex items-center gap-2.5">
                  <span className="font-mono text-xs uppercase tracking-wider font-bold text-[#BC2639]">
                    Stage {step.stepNumber}
                  </span>
                  <span className="text-base sm:text-lg font-semibold font-display text-[#39340F] group-hover:text-[#BC2639] transition-colors">
                    {step.title}
                  </span>
                  {step.approxDuration && (
                    <span className="text-xs text-[#404D68] font-mono">
                      • {step.approxDuration}
                    </span>
                  )}
                </div>
              </TimelineHeading>

              {/* Dot */}
              <TimelineDot
                status={status}
                className={`transition-all duration-300 ${
                  isCurrent
                    ? 'ring-4 ring-[#FFC5DC] scale-125 border-[#BC2639] bg-[#BC2639] text-white shadow-sm'
                    : isDone
                    ? 'border-[#BC2639] bg-[#BC2639] text-white shadow-xs'
                    : 'border-[#D4E2DF] bg-white text-[#404D68]'
                }`}
              />

              {/* Line */}
              {idx < displaySteps.length - 1 && (
                <TimelineLine
                  done={isDone}
                  className={`transition-colors duration-300 ${
                    isDone ? 'bg-[#BC2639]' : 'bg-[#D4E2DF]'
                  }`}
                />
              )}

              {/* Content Section:
                  - On Desktop (>= md): Always shows previous rich layout.
                  - On Mobile (< md): Only shows details on full /roadmap page when expanded. */}
              <TimelineContent side="right" className="pt-1 max-w-3xl">
                {/* ── DESKTOP CONTENT (>= md): PREVIOUS COMPLETE RICH LAYOUT ── */}
                <div className="hidden md:block space-y-3 pb-8">
                  {/* Subtitle / Stage name */}
                  {step.subtitle && (
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#404D68]">
                      {step.subtitle}
                    </p>
                  )}

                  {/* Summary text */}
                  <p className="text-sm text-[#39340F] leading-relaxed">
                    {step.summary}
                  </p>

                  {/* Additional Details */}
                  {!isCompactPreview && step.details && (
                    <p className="text-xs text-[#404D68] leading-relaxed pt-1">
                      {step.details}
                    </p>
                  )}

                  {/* Checklist & Key Rules */}
                  {!isCompactPreview && step.requiredDocuments && step.requiredDocuments.length > 0 && (
                    <div className="pt-2 space-y-1.5">
                      <span className="text-xs font-bold text-[#39340F] flex items-center gap-1.5 uppercase tracking-wider">
                        <FileText className="w-3.5 h-3.5 text-[#BC2639]" />
                        Key Requirements:
                      </span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-[#404D68] pl-1">
                        {step.requiredDocuments.slice(0, 4).map((doc, docIdx) => (
                          <li key={docIdx} className="flex items-start gap-1.5">
                            <Check className="w-3.5 h-3.5 text-[#BC2639] shrink-0 mt-0.5" />
                            <span>{doc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* ADTT Automated Track Maneuvers */}
                  {!isCompactPreview && step.rtoTrackManeuvers && (
                    <div className="pt-2 space-y-1.5">
                      <span className="text-xs font-bold text-[#39340F] flex items-center gap-1.5 uppercase tracking-wider">
                        <Award className="w-3.5 h-3.5 text-[#BC2639]" />
                        Track Drills:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {step.rtoTrackManeuvers.map((drill, drillIdx) => (
                          <span
                            key={drillIdx}
                            className="px-2.5 py-1 rounded-lg bg-[#FDF2F5] border border-[#FFC5DC] text-[0.72rem] text-[#39340F]"
                          >
                            {drill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Instructor Pro-Tip */}
                  {!isCompactPreview && step.instructorProTip && (
                    <div className="pt-2 flex items-start gap-2 text-xs text-[#39340F] bg-[#FDF2F5] border border-[#FFC5DC] p-2.5 rounded-xl">
                      <Lightbulb className="w-4 h-4 text-[#BC2639] shrink-0 mt-0.5" />
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
                        className="inline-flex items-center gap-1 text-[#BC2639] font-semibold hover:underline"
                      >
                        Official Sarathi Portal <ExternalLink className="w-3 h-3" />
                      </a>
                    )}

                    {onOpenBookingModal && (
                      <button
                        onClick={onOpenBookingModal}
                        className="text-[#39340F] font-bold hover:text-[#BC2639] underline transition-colors cursor-pointer"
                      >
                        Book Training for this Stage →
                      </button>
                    )}
                  </div>
                </div>

                {/* ── MOBILE CONTENT (< md): TAP-TO-EXPAND ONLY IN FULL ROADMAP PAGE ── */}
                {!isCompactPreview && (
                  <div className="block md:hidden">
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="space-y-2.5 pt-1 pb-4"
                        >
                          <p className="text-xs text-[#39340F] leading-relaxed">
                            {step.summary}
                          </p>

                          {step.details && (
                            <p className="text-[0.75rem] text-[#404D68] leading-relaxed">
                              {step.details}
                            </p>
                          )}

                          {step.requiredDocuments && step.requiredDocuments.length > 0 && (
                            <div className="p-2.5 rounded-xl bg-white/90 border border-[#D4E2DF] space-y-1">
                              <span className="text-[0.68rem] font-bold text-[#39340F] uppercase tracking-wider flex items-center gap-1">
                                <FileText className="w-3 h-3 text-[#BC2639]" />
                                Requirements:
                              </span>
                              <ul className="space-y-1 text-xs text-[#404D68]">
                                {step.requiredDocuments.slice(0, 3).map((doc, docIdx) => (
                                  <li key={docIdx} className="flex items-start gap-1.5">
                                    <Check className="w-3 h-3 text-[#BC2639] shrink-0 mt-0.5" />
                                    <span>{doc}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {step.instructorProTip && (
                            <div className="p-2.5 rounded-xl bg-[#FDF2F5] border border-[#FFC5DC] text-xs text-[#39340F] flex items-start gap-2">
                              <Lightbulb className="w-3.5 h-3.5 text-[#BC2639] shrink-0 mt-0.5" />
                              <p className="italic text-[0.75rem]">"{step.instructorProTip}"</p>
                            </div>
                          )}

                          <div className="pt-1 flex flex-col gap-2">
                            {step.rtoPortalUrl && (
                              <a
                                href={step.rtoPortalUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs text-[#BC2639] font-bold hover:underline"
                              >
                                Sarathi Portal <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                            {onOpenBookingModal && (
                              <Button
                                variant="primary"
                                size="sm"
                                onClick={onOpenBookingModal}
                                className="w-full justify-center shadow-xs"
                                icon={<Sparkles className="w-3 h-3 text-[#FFC5DC]" />}
                              >
                                Book for Stage {step.stepNumber}
                              </Button>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </TimelineContent>
            </TimelineItem>
          );
        })}
      </Timeline>
    </div>
  );
};
