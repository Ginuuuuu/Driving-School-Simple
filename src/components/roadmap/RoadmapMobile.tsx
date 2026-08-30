import React, { useState } from 'react';
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ExternalLink,
  ChevronDown,
  Sparkles,
  Clock,
} from 'lucide-react';
import { RoadmapStep } from '../../types';
import { RoadmapCar } from './RoadmapCar';
import { Button } from '../common/Button';

interface RoadmapMobileProps {
  steps: RoadmapStep[];
  onOpenBookingModal?: () => void;
}

export const RoadmapMobile: React.FC<RoadmapMobileProps> = ({ steps, onOpenBookingModal }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="relative bg-slate-900 text-white rounded-2xl p-4 sm:p-6 border border-slate-800 shadow-xl overflow-hidden">
      {/* Header Pill */}
      <div className="flex items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-800">
        <span className="px-3 py-1 rounded-full text-[0.7rem] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
          Indian Driving Licence Journey
        </span>
        <span className="text-xs text-slate-400">6 Step Process</span>
      </div>

      {/* Vertical Road Trail with Moving Nodes */}
      <div className="relative pl-6 space-y-6">
        {/* Vertical Asphalt Road Line */}
        <div className="absolute left-[19px] top-4 bottom-4 w-3 bg-slate-800 rounded-full z-0">
          <div className="absolute inset-y-0 left-1/2 w-0.5 border-r border-dashed border-amber-400/40 -translate-x-1/2" />
        </div>

        {steps.map((step, idx) => {
          const isExpanded = expandedIndex === idx;

          return (
            <div key={step.id} className="relative z-10">
              {/* Step Marker Node */}
              <button
                onClick={() => toggleExpand(idx)}
                className={`w-full text-left flex items-start gap-3 p-3.5 rounded-2xl border transition-all ${
                  isExpanded
                    ? 'bg-slate-800/90 border-emerald-500/50 shadow-md ring-2 ring-emerald-500/20'
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Node Number Circle / Car Icon */}
                <div
                  className={`-ml-7 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 border transition-colors ${
                    isExpanded
                      ? 'bg-emerald-500 text-slate-950 border-emerald-300 shadow-glow-emerald'
                      : 'bg-slate-800 text-slate-300 border-slate-700'
                  }`}
                >
                  {step.stepNumber}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[0.65rem] font-bold uppercase tracking-wider text-emerald-400">
                      Stage {step.stepNumber} • {step.approxDuration}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                        isExpanded ? 'rotate-180 text-emerald-400' : ''
                      }`}
                    />
                  </div>

                  <h3 className="text-sm font-bold text-white mt-0.5 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {step.summary}
                  </p>
                </div>
              </button>

              {/* Expandable Deep-Dive Content */}
              {isExpanded && (
                <div className="mt-3 p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 animate-in fade-in duration-200">
                  {/* Detailed Description */}
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {step.details}
                  </p>

                  {/* Documents */}
                  {step.requiredDocuments.length > 0 && (
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <h4 className="text-[0.7rem] font-bold uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-1">
                        <FileText className="w-3.5 h-3.5" /> Required Documents:
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {step.requiredDocuments.map((doc, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400 mt-0.5 shrink-0" />
                            <span>{doc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* RTO Track info if available */}
                  {step.rtoTrackManeuvers && (
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <h4 className="text-[0.7rem] font-bold uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" /> Automated Track Drills:
                      </h4>
                      <div className="space-y-1.5 text-xs text-slate-300">
                        {step.rtoTrackManeuvers.map((m, i) => (
                          <div key={i} className="p-2 rounded-lg bg-slate-800/60">
                            <span className="font-semibold text-white block">{m.split(':')[0]}</span>
                            <span className="text-slate-400">{m.split(':')[1]}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Instructor Pro-Tip */}
                  <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-start gap-2.5">
                    <Lightbulb className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[0.68rem] font-bold uppercase tracking-wider text-emerald-300 block">
                        Instructor Pro-Tip:
                      </span>
                      <p className="text-xs text-slate-200 mt-0.5 italic">
                        "{step.instructorProTip}"
                      </p>
                    </div>
                  </div>

                  {/* Portal Link */}
                  {step.rtoPortalUrl && (
                    <div className="pt-2">
                      <a
                        href={step.rtoPortalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:underline font-bold"
                      >
                        Visit Official Parivahan Portal <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Booking Trigger */}
      {onOpenBookingModal && (
        <div className="mt-8 pt-6 border-t border-slate-800 text-center">
          <Button
            variant="amber"
            size="md"
            className="w-full justify-center shadow-md"
            onClick={onOpenBookingModal}
            icon={<Sparkles className="w-4 h-4 text-slate-950" />}
          >
            Book Practical Training With Us
          </Button>
        </div>
      )}
    </div>
  );
};
