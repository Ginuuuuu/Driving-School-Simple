import React from 'react';
import { Star, CheckCircle2, Quote } from 'lucide-react';
import { Testimonial } from '../../types';
import { Badge } from '../common/Badge';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="flex flex-col justify-between h-full rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 p-3.5 sm:p-7 shadow-xs hover:shadow-md transition-all duration-300">
      <div>
        {/* Rating Stars & Verified Tag */}
        <div className="flex items-center justify-between gap-2 mb-2.5 sm:mb-4">
          <div className="flex items-center gap-0.5 sm:gap-1">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 text-amber-500" />
            ))}
          </div>

          <Badge variant="emerald" size="sm" icon={<CheckCircle2 className="w-3 h-3" />}>
            Verified Learner
          </Badge>
        </div>

        {/* Quote Story */}
        <p className="text-slate-700 text-xs sm:text-sm leading-relaxed italic line-clamp-3 sm:line-clamp-4">
          "{testimonial.story}"
        </p>

        {/* Course & Vehicle tag */}
        <div className="mt-2.5 sm:mt-4 pt-2 sm:pt-3 border-t border-slate-100 flex flex-wrap items-center gap-1.5 sm:gap-2 text-[0.7rem] sm:text-xs text-slate-500">
          <span className="font-semibold text-emerald-800 bg-emerald-50 px-1.5 sm:px-2 py-0.5 rounded">
            {testimonial.courseTitle}
          </span>
          <span>•</span>
          <span>{testimonial.vehicleLearned}</span>
        </div>
      </div>

      {/* Author Avatar & Bio */}
      <div className="mt-3 sm:mt-6 flex items-center gap-2.5 sm:gap-3">
        <img
          src={testimonial.avatarUrl}
          alt={testimonial.name}
          loading="lazy"
          className="w-9 h-9 sm:w-11 sm:h-11 rounded-full object-cover border border-slate-200 shadow-xs shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
            {testimonial.name}
          </h4>
          <p className="text-[0.68rem] sm:text-xs text-slate-500 truncate">
            {testimonial.city} • Coached by {testimonial.instructorName}
          </p>
        </div>
      </div>
    </div>
  );
};
