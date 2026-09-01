import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  CheckCircle2,
  Lightbulb,
  ExternalLink,
  ChevronDown,
  Sparkles,
  Clock,
  Award,
  Layers,
} from 'lucide-react';
import { RoadmapStep } from '../../types';
import { Button } from '../common/Button';

interface RoadmapMobileProps {
  steps: RoadmapStep[];
  onOpenBookingModal?: () => void;
  isCompactPreview?: boolean;
}

export const RoadmapMobile: React.FC<RoadmapMobileProps> = ({
  steps,
  onOpenBookingModal,
  isCompactPreview = false,
}) => {
  // Allow multiple or single open state; default Stage 1 (index 0) open
  const [expandedIndices, setExpandedIndices] = useState<Set<number>>(new Set([0]));

  const displaySteps = isCompactPreview ? steps.slice(0, 6) : steps;

  const toggleExpand = (index: number) => {
    setExpandedIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const allExpanded = displaySteps.every((_, i) => expandedIndices.has(i));

  const toggleAll = () => {
    if (allExpanded) {
      setExpandedIndices(new Set());
    } else {
      setExpandedIndices(new Set(displaySteps.map((_, i) => i)));
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Mobile Top Control Bar */}
      <div className="flex items-center justify-between gap-2 px-1 py-1 text-xs text-[#6B7280]">
        <div className="flex items-center gap-1.5 font-medium text-[#202B33]">
          <Layers className="w-3.5 h-3.5 text-[#082B4C]" />
          <span>{displaySteps.length} Step Process</span>
          <span className="text-[#6B7280]/60">• Tap title for details</span>
        </div>

        <button
          onClick={toggleAll}
          className="font-semibold text-[#082B4C] hover:text-[#061F36] underline transition-colors cursor-pointer py-1 px-1.5 rounded"
          aria-label={allExpanded ? 'Collapse all stages' : 'Expand all stages'}
        >
          {allExpanded ? 'Collapse All' : 'Expand All'}
        </button>
      </div>

      {/* Accordion List */}
      <div className="space-y-2.5">
        {displaySteps.map((step, idx) => {
          const isExpanded = expandedIndices.has(idx);

          return (
            <div
              key={step.id || idx}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isExpanded
                  ? 'bg-white border-[#F4C400] shadow-md ring-2 ring-[#F4C400]/25'
                  : 'bg-white/90 border-[#E5E7EB] hover:border-[#082B4C]/40 hover:bg-white shadow-2xs'
              }`}
            >
              {/* Accordion Header Button — Title Only Focus */}
              <button
                type="button"
                onClick={() => toggleExpand(idx)}
                aria-expanded={isExpanded}
                className="w-full text-left p-3.5 sm:p-4 flex items-center justify-between gap-3 min-h-[56px] transition-colors select-none cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  {/* Step Number Circle Badge */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-all duration-200 ${
                      isExpanded
                        ? 'bg-[#082B4C] text-[#F4C400] shadow-xs'
                        : 'bg-[#F5F6F7] text-[#202B33] group-hover:bg-[#F4C400]/20 group-hover:text-[#082B4C]'
                    }`}
                  >
                    {step.stepNumber < 10 ? `0${step.stepNumber}` : step.stepNumber}
                  </div>

                  {/* Title & Duration Pill */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#082B4C]">
                        Stage {step.stepNumber}
                      </span>
                      {step.approxDuration && (
                        <span className="inline-flex items-center gap-1 text-[0.68rem] text-[#6B7280] font-medium">
                          • <Clock className="w-2.5 h-2.5 inline text-[#082B4C]" /> {step.approxDuration}
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm sm:text-base font-bold font-display text-[#202B33] leading-snug mt-0.5 group-hover:text-[#082B4C] transition-colors">
                      {step.title}
                    </h3>
                  </div>
                </div>

                {/* Animated Chevron Indicator */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${
                    isExpanded
                      ? 'bg-[#F4C400]/20 text-[#082B4C]'
                      : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                  }`}
                >
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ease-out ${
                      isExpanded ? 'rotate-180 text-[#082B4C]' : 'text-slate-500'
                    }`}
                  />
                </div>
              </button>

              {/* Expandable Details Container */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.28, ease: [0.04, 0.62, 0.23, 0.98] }}
                    className="overflow-hidden"
                  >
                    <div className="px-3.5 pb-4 pt-1 sm:px-4 sm:pb-5 space-y-3.5 border-t border-[#E5E7EB] bg-[#F5F6F7]/50">
                      {/* Subtitle & Summary */}
                      {step.subtitle && (
                        <div className="pt-1">
                          <span className="text-[0.68rem] font-bold uppercase tracking-wider text-[#6B7280]">
                            {step.subtitle}
                          </span>
                        </div>
                      )}

                      <p className="text-xs sm:text-sm text-[#202B33] leading-relaxed font-normal">
                        {step.summary}
                      </p>

                      {/* Deep-Dive Operational Details */}
                      {step.details && (
                        <p className="text-[0.78rem] sm:text-xs text-[#6B7280] leading-relaxed">
                          {step.details}
                        </p>
                      )}

                      {/* Required Documents Checklist */}
                      {step.requiredDocuments && step.requiredDocuments.length > 0 && (
                        <div className="p-3 rounded-xl bg-white border border-[#E5E7EB] space-y-2">
                          <span className="text-[0.7rem] font-bold text-[#202B33] uppercase tracking-wider flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5 text-[#082B4C]" />
                            Required Documents & Formalities:
                          </span>
                          <ul className="space-y-1.5 text-xs text-[#6B7280]">
                            {step.requiredDocuments.map((doc, docIdx) => (
                              <li key={docIdx} className="flex items-start gap-2">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                <span>{doc}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* RTO ADTT Track Maneuvers (if present) */}
                      {step.rtoTrackManeuvers && step.rtoTrackManeuvers.length > 0 && (
                        <div className="p-3 rounded-xl bg-[#F4C400]/15 border border-[#F4C400]/30 space-y-1.5">
                          <span className="text-[0.7rem] font-bold text-[#202B33] uppercase tracking-wider flex items-center gap-1.5">
                            <Award className="w-3.5 h-3.5 text-[#082B4C]" />
                            Automated Camera Track Drills:
                          </span>
                          <div className="flex flex-wrap gap-1.5 pt-0.5">
                            {step.rtoTrackManeuvers.map((drill, drillIdx) => (
                              <span
                                key={drillIdx}
                                className="px-2 py-1 rounded-lg bg-white border border-[#F4C400]/30 text-[0.7rem] text-[#202B33] font-medium shadow-2xs"
                              >
                                {drill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Instructor Pro-Tip */}
                      {step.instructorProTip && (
                        <div className="p-3 rounded-xl bg-[#F4C400]/15 border border-[#F4C400]/30 flex items-start gap-2.5 text-xs text-[#202B33]">
                          <Lightbulb className="w-4 h-4 text-[#082B4C] shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-[0.68rem] uppercase tracking-wider text-[#202B33] block">
                              Instructor Pro-Tip:
                            </span>
                            <p className="mt-0.5 italic text-[#6B7280] leading-snug">
                              "{step.instructorProTip}"
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                        {step.rtoPortalUrl && (
                          <a
                            href={step.rtoPortalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-1.5 text-xs text-[#082B4C] hover:text-[#061F36] font-bold hover:underline py-1.5"
                          >
                            <span>Sarathi Parivahan Portal</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}

                        {onOpenBookingModal && (
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={onOpenBookingModal}
                            className="w-full sm:w-auto justify-center text-xs py-2 shadow-2xs font-bold"
                            icon={<Sparkles className="w-3.5 h-3.5 text-[#082B4C]" />}
                          >
                            Book Training for Stage {step.stepNumber}
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Global Booking CTA at bottom of mobile roadmap */}
      {onOpenBookingModal && (
        <div className="pt-3 text-center">
          <Button
            variant="primary"
            size="md"
            className="w-full justify-center shadow-sm text-xs font-bold py-2.5"
            onClick={onOpenBookingModal}
            icon={<Sparkles className="w-4 h-4 text-[#082B4C]" />}
          >
            Book Full RTO Driving Program
          </Button>
        </div>
      )}
    </div>
  );
};
