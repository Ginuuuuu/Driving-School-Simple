import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  ShieldCheck,
  Award,
  Globe,
  Sparkles,
  CheckCircle2,
  Quote,
} from 'lucide-react';
import { Instructor, TeamMember } from '../../types';
import { Button } from '../common/Button';
import { defaultInstructors } from '../../content/instructors';

interface TeamShowcaseProps {
  instructors?: Instructor[];
  members?: TeamMember[];
  onSelectInstructor?: (instructorId?: string) => void;
}

export const TeamShowcase: React.FC<TeamShowcaseProps> = ({
  instructors,
  members,
  onSelectInstructor,
}) => {
  // Normalize items to Instructor format
  const normalizedInstructors: Instructor[] = React.useMemo(() => {
    if (instructors && instructors.length > 0) {
      return instructors;
    }
    if (members && members.length > 0) {
      // Map members and merge with defaultInstructors fallback data
      return members.map((m, idx) => {
        const fallback = defaultInstructors[idx % defaultInstructors.length];
        return {
          id: m.id,
          name: m.name,
          role: m.role || fallback.role,
          experienceYears: fallback.experienceYears,
          rating: fallback.rating,
          studentCount: fallback.studentCount,
          photoUrl: m.image || fallback.photoUrl,
          bio: fallback.bio,
          languages: fallback.languages,
          specialties: fallback.specialties,
          transmissionSpecialty: fallback.transmissionSpecialty,
          verifiedBadges: fallback.verifiedBadges,
          quote: fallback.quote,
        };
      });
    }
    return defaultInstructors;
  }, [instructors, members]);

  const [selectedId, setSelectedId] = useState<string>(
    normalizedInstructors[0]?.id || 'inst-1'
  );

  const activeInstructor =
    normalizedInstructors.find((i) => i.id === selectedId) ||
    normalizedInstructors[0];

  return (
    <div className="w-full space-y-6 sm:space-y-8 select-none">
      {/* ── DESKTOP & TABLET VIEW (md and up) ── */}
      <div className="hidden md:grid md:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        {/* Left 7 Cols: Interactive 8-9 Photo Grid Gallery */}
        <div className="md:col-span-7 lg:col-span-7 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Select a Mentor to View Credentials
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {normalizedInstructors.length} Verified Instructors
              </span>
            </div>

            {/* Photo Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-3 gap-3">
              {normalizedInstructors.map((inst) => {
                const isSelected = inst.id === activeInstructor.id;

                return (
                  <button
                    key={inst.id}
                    type="button"
                    onClick={() => setSelectedId(inst.id)}
                    onMouseEnter={() => setSelectedId(inst.id)}
                    className={`group relative rounded-2xl overflow-hidden aspect-[4/5] text-left transition-all duration-300 border-2 cursor-pointer ${
                      isSelected
                        ? 'border-emerald-500 shadow-lg ring-4 ring-emerald-500/20 scale-[1.03] z-10'
                        : 'border-slate-200/80 hover:border-slate-300 hover:scale-[1.01] opacity-85 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={inst.photoUrl}
                      alt={inst.name}
                      loading="lazy"
                      className={`w-full h-full object-cover object-top transition-transform duration-500 ${
                        isSelected ? 'scale-105 filter-none' : 'filter grayscale-[30%] group-hover:grayscale-0'
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />

                    {/* Active Status Beacon */}
                    <div className="absolute top-2 right-2 flex items-center gap-1">
                      {isSelected && (
                        <span className="flex h-2.5 w-2.5 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                        </span>
                      )}
                    </div>

                    {/* Bottom Info Overlay */}
                    <div className="absolute bottom-2 left-2 right-2 text-white pointer-events-none">
                      <div className="flex items-center justify-between text-[0.68rem] text-emerald-300 font-bold">
                        <span className="truncate">{inst.experienceYears}+ Yrs Exp</span>
                        <span className="flex items-center gap-0.5 text-amber-300">
                          <Star className="w-2.5 h-2.5 fill-current" />
                          {inst.rating.toFixed(2)}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold font-display text-white truncate mt-0.5">
                        {inst.name}
                      </h4>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom helper microcopy */}
          <p className="text-[0.72rem] text-slate-500 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            All instructors undergo strict police background checks and annual defensive driving certification.
          </p>
        </div>

        {/* Right 5 Cols: Live Active Spotlight Card */}
        <div className="md:col-span-5 lg:col-span-5 flex">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeInstructor.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="w-full flex flex-col justify-between rounded-3xl bg-white border border-slate-200/90 shadow-xl p-5 lg:p-6 relative overflow-hidden"
            >
              {/* Top Row: Photo Thumbnail + Name + Rating */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="relative w-20 h-24 lg:w-24 lg:h-28 rounded-2xl overflow-hidden shrink-0 border border-slate-200 shadow-sm">
                    <img
                      src={activeInstructor.photoUrl}
                      alt={activeInstructor.name}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-slate-900/90 text-amber-400 font-extrabold text-[0.68rem] flex items-center gap-0.5">
                      <Star className="w-2.5 h-2.5 fill-current" />
                      {activeInstructor.rating.toFixed(2)}
                    </div>
                  </div>

                  <div className="min-w-0 flex-1 space-y-1">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100/90 text-[0.68rem] font-bold text-emerald-900">
                      <Award className="w-3 h-3 text-emerald-600" />
                      {activeInstructor.verifiedBadges[0] || 'MoRTH Certified'}
                    </span>

                    <h3 className="text-lg lg:text-xl font-bold font-display text-slate-900 leading-tight">
                      {activeInstructor.name}
                    </h3>

                    <p className="text-xs font-semibold text-emerald-700 leading-tight">
                      {activeInstructor.role}
                    </p>

                    <div className="pt-1 flex items-center gap-3 text-xs text-slate-500 font-medium">
                      <span>{activeInstructor.experienceYears}+ Yrs Coaching</span>
                      <span>•</span>
                      <span>{activeInstructor.studentCount}+ Learners</span>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-xs text-slate-600 leading-relaxed">
                  {activeInstructor.bio}
                </p>

                {/* Languages */}
                <div className="flex items-center gap-1.5 text-xs text-slate-600 pt-1 border-t border-slate-100">
                  <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="font-semibold text-slate-700">Languages:</span>
                  <span className="text-slate-600 truncate">{activeInstructor.languages.join(', ')}</span>
                </div>

                {/* Specialties Pills */}
                <div className="space-y-1.5">
                  <span className="text-[0.68rem] font-bold text-slate-700 uppercase tracking-wider block">
                    Specialized Coaching:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeInstructor.specialties.map((spec, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 rounded-lg bg-slate-100 text-slate-700 text-[0.7rem] font-medium"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quote */}
                {activeInstructor.quote && (
                  <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200/60 relative">
                    <Quote className="w-4 h-4 text-emerald-400 absolute top-2.5 right-2.5 opacity-60" />
                    <p className="text-xs text-emerald-950 italic leading-snug pr-4">
                      "{activeInstructor.quote}"
                    </p>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-4 mt-4 border-t border-slate-100">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => onSelectInstructor?.(activeInstructor.id)}
                  className="w-full justify-center shadow-md font-bold text-xs py-2.5"
                  icon={<Sparkles className="w-3.5 h-3.5 text-amber-300" />}
                >
                  Request Lessons with {activeInstructor.name.split(' ')[0]}
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── MOBILE VIEW (< md) ── */}
      <div className="block md:hidden space-y-4">
        {/* Horizontal Mentor Selector Strip */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs px-1 text-slate-600">
            <span className="font-bold text-slate-800">Tap to Switch Instructor:</span>
            <span className="text-[0.7rem] text-slate-400">← Swipe mentors →</span>
          </div>

          <div className="flex gap-2.5 overflow-x-auto pb-2 pt-1 -mx-4 px-4 snap-x snap-mandatory scrollbar-none">
            {normalizedInstructors.map((inst) => {
              const isSelected = inst.id === activeInstructor.id;

              return (
                <button
                  key={inst.id}
                  type="button"
                  onClick={() => setSelectedId(inst.id)}
                  className={`flex flex-col items-center gap-1.5 shrink-0 snap-center p-2 rounded-2xl transition-all duration-200 cursor-pointer min-w-[76px] ${
                    isSelected
                      ? 'bg-emerald-50 border-2 border-emerald-500 shadow-sm scale-105'
                      : 'bg-white border border-slate-200 opacity-80 hover:opacity-100'
                  }`}
                >
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-slate-200">
                    <img
                      src={inst.photoUrl}
                      alt={inst.name}
                      className="w-full h-full object-cover object-top"
                    />
                    {isSelected && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
                    )}
                  </div>

                  <span className={`text-[0.68rem] font-bold text-center leading-tight truncate w-16 ${
                    isSelected ? 'text-emerald-950 font-extrabold' : 'text-slate-700'
                  }`}>
                    {inst.name.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Instructor Mobile Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeInstructor.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-md overflow-hidden"
          >
            {/* Header Photo Banner */}
            <div className="relative h-48 w-full bg-slate-100">
              <img
                src={activeInstructor.photoUrl}
                alt={activeInstructor.name}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

              {/* Rating Pill */}
              <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 text-slate-900 text-xs font-extrabold shadow-sm backdrop-blur-xs">
                <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                <span>{activeInstructor.rating.toFixed(2)}</span>
                <span className="text-[0.65rem] text-slate-500 font-normal">
                  ({activeInstructor.studentCount}+)
                </span>
              </div>

              {/* Experience Badge */}
              <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded-md bg-emerald-500 text-white font-bold text-[0.68rem] shadow-xs flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  {activeInstructor.experienceYears}+ Yrs Coaching
                </span>
              </div>
            </div>

            {/* Body */}
            <div className="p-4 space-y-3">
              <div>
                <h3 className="text-base font-bold font-display text-slate-900 leading-snug">
                  {activeInstructor.name}
                </h3>
                <p className="text-xs font-semibold text-emerald-700 mt-0.5">
                  {activeInstructor.role}
                </p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                {activeInstructor.bio}
              </p>

              {/* Languages & Specialties */}
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <div className="flex items-center gap-1.5 text-xs text-slate-600">
                  <Globe className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="font-semibold text-slate-700">Languages:</span>
                  <span className="text-slate-600 truncate">{activeInstructor.languages.join(', ')}</span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {activeInstructor.specialties.map((spec, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[0.68rem] font-medium"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quote */}
              {activeInstructor.quote && (
                <div className="p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200/80 text-xs text-emerald-950 italic">
                  "{activeInstructor.quote}"
                </div>
              )}

              {/* Action Button */}
              <div className="pt-2">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => onSelectInstructor?.(activeInstructor.id)}
                  className="w-full justify-center shadow-md font-bold text-xs py-2.5"
                  icon={<Sparkles className="w-3.5 h-3.5 text-amber-300" />}
                >
                  Request Lessons with {activeInstructor.name.split(' ')[0]}
                </Button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TeamShowcase;
