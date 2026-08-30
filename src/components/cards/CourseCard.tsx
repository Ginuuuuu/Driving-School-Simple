import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ShieldCheck, Award, ArrowRight, Sparkles, Check, Car } from 'lucide-react';
import { Course } from '../../types';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

interface CourseCardProps {
  course: Course;
  onBookNow?: (slug: string) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onBookNow }) => {
  const transmissionBadge = {
    manual: { label: 'Manual Gearbox', variant: 'slate' as const },
    automatic: { label: 'Automatic AT/CVT', variant: 'blue' as const },
    both: { label: 'Manual & Automatic', variant: 'emerald' as const },
  }[course.transmission];

  return (
    <div
      className={`group flex flex-col justify-between rounded-2xl sm:rounded-3xl bg-white border transition-all duration-300 hover-lift ${
        course.popular
          ? 'border-emerald-500/80 shadow-md ring-2 ring-emerald-500/10'
          : 'border-slate-200/90 shadow-sm'
      }`}
    >
      {/* Card Header & Badges */}
      <div className="p-4 sm:p-6 pb-3 sm:pb-4">
        <div className="flex items-center justify-between gap-1.5 mb-2 sm:mb-3">
          <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
            <Badge variant={transmissionBadge.variant} size="sm">
              {transmissionBadge.label}
            </Badge>
            <Badge variant="slate" size="sm">
              {course.level}
            </Badge>
          </div>

          {course.badge && (
            <Badge variant={course.popular ? 'amber' : 'emerald'} size="sm" icon={<Sparkles className="w-3 h-3" />}>
              {course.badge}
            </Badge>
          )}
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-xl font-bold font-display text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
          <Link to={`/courses/${course.slug}`}>
            {course.title}
          </Link>
        </h3>

        {/* Summary Description */}
        <p className="mt-1.5 sm:mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
          {course.summary}
        </p>

        {/* Key Stats Bar */}
        <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-[0.72rem] sm:text-xs text-slate-700">
          <div className="flex items-center gap-1.5 font-semibold">
            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0" />
            <span className="truncate">{course.durationHours} hrs Practical</span>
          </div>
          <div className="flex items-center gap-1.5 font-semibold">
            <Car className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0" />
            <span className="truncate">{course.sessionsCount} Sessions</span>
          </div>
        </div>

        {/* Included Highlights List */}
        <div className="mt-3 sm:mt-4 space-y-1 sm:space-y-1.5">
          {course.whatIncluded.slice(0, 3).map((item, idx) => (
            <div key={idx} className={`flex items-start gap-1.5 sm:gap-2 text-[0.72rem] sm:text-xs text-slate-600 ${idx === 2 ? 'hidden sm:flex' : 'flex'}`}>
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span className="line-clamp-1">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Card Footer with Price & Actions (One-hand horizontal fit) */}
      <div className="p-3.5 sm:p-6 pt-3 sm:pt-4 border-t border-slate-100 bg-slate-50/60 rounded-b-2xl sm:rounded-b-3xl flex items-center justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl sm:text-2xl font-extrabold text-slate-900">
              ₹{course.price.toLocaleString('en-IN')}
            </span>
            {course.originalPrice && (
              <span className="text-[0.7rem] sm:text-xs text-slate-400 line-through">
                ₹{course.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
          <span className="text-[0.65rem] sm:text-[0.7rem] text-slate-500 font-medium block truncate">
            All-Inclusive (Fuel + Doorstep)
          </span>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <Link
            to={`/courses/${course.slug}`}
            className="text-xs font-bold text-slate-700 hover:text-emerald-700 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            Details
          </Link>
          <Button
            variant="primary"
            size="sm"
            onClick={() => onBookNow?.(course.slug)}
            className="shadow-xs text-xs px-3 py-1.5 sm:px-4 sm:py-2"
          >
            Book Slot
          </Button>
        </div>
      </div>
    </div>
  );
};
