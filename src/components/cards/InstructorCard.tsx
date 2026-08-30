import React from 'react';
import { Star, ShieldCheck, Award, Globe, Car, MessageCircle } from 'lucide-react';
import { Instructor } from '../../types';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

interface InstructorCardProps {
  instructor: Instructor;
  onSelectInstructor?: (id: string) => void;
}

export const InstructorCard: React.FC<InstructorCardProps> = ({ instructor, onSelectInstructor }) => {
  return (
    <div className="flex flex-col justify-between rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
      <div>
        {/* Photo & Rating Banner */}
        <div className="relative h-40 sm:h-56 w-full bg-slate-100 overflow-hidden">
          <img
            src={instructor.photoUrl}
            alt={`Instructor ${instructor.name}`}
            loading="lazy"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

          {/* Rating Pill */}
          <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-white/95 backdrop-blur-sm text-slate-900 text-[0.7rem] sm:text-xs font-extrabold shadow-sm">
            <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-500" />
            <span>{instructor.rating.toFixed(2)}</span>
            <span className="text-[0.6rem] sm:text-[0.65rem] text-slate-500 font-normal">({instructor.studentCount}+)</span>
          </div>

          {/* Experience Badge */}
          <div className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 flex items-center gap-1.5 text-white">
            <Badge variant="emerald" size="sm" icon={<ShieldCheck className="w-3 h-3" />}>
              {instructor.experienceYears}+ Yrs Coaching
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-3.5 sm:p-6">
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="text-base sm:text-xl font-bold font-display text-slate-900 leading-tight">
              {instructor.name}
            </h3>
            <span className="text-[0.68rem] sm:text-xs font-semibold text-emerald-700 shrink-0">
              {instructor.role}
            </span>
          </div>

          <p className="mt-1.5 sm:mt-3 text-xs text-slate-600 leading-relaxed line-clamp-2 sm:line-clamp-3">
            {instructor.bio}
          </p>

          {/* Languages Spoken */}
          <div className="mt-2.5 sm:mt-4 pt-2 sm:pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-600">
            <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="font-semibold text-slate-700 text-[0.72rem] sm:text-xs">Languages:</span>
            <span className="truncate text-[0.72rem] sm:text-xs">{instructor.languages.join(', ')}</span>
          </div>

          {/* Specialties Pills */}
          <div className="mt-2 sm:mt-3 flex flex-wrap gap-1">
            {instructor.specialties.map((spec, idx) => (
              <span
                key={idx}
                className="px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[0.65rem] sm:text-[0.68rem] font-medium"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Booking Trigger */}
      <div className="p-3.5 sm:p-6 pt-0 sm:pt-0">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onSelectInstructor?.(instructor.id)}
          className="w-full justify-center text-xs py-2 sm:py-2.5 hover:border-emerald-600 hover:text-emerald-700 font-bold"
        >
          Request Lessons with {instructor.name.split(' ')[0]}
        </Button>
      </div>
    </div>
  );
};
