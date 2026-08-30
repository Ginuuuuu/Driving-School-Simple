import React, { useState } from 'react';
import { useParams, Link, useOutletContext, Navigate } from 'react-router-dom';
import {
  Clock,
  Car,
  ShieldCheck,
  CheckCircle2,
  Check,
  Sparkles,
  ArrowRight,
  BookOpen,
  HelpCircle,
  ChevronDown,
  Phone,
  MessageCircle,
} from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { SEO } from '../components/common/SEO';
import { generateDirectWhatsAppChatLink } from '../utils/whatsapp';

export const CourseDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { siteData } = useContent();
  const { courses, siteConfig } = siteData;
  const { onOpenBooking } = useOutletContext<{ onOpenBooking: (courseSlug?: string) => void }>();

  const [openModuleIndex, setOpenModuleIndex] = useState<number | null>(0);

  const course = courses.find((c) => c.slug === slug);

  if (!course) {
    return <Navigate to="/courses" replace />;
  }

  const toggleModule = (idx: number) => {
    setOpenModuleIndex(openModuleIndex === idx ? null : idx);
  };

  const whatsappUrl = generateDirectWhatsAppChatLink(siteConfig, `Hello! I would like to book the "${course.title}" course.`);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-10 space-y-6 sm:space-y-12 lg:space-y-16">
      <SEO
        title={course.title}
        description={course.summary}
        canonicalPath={`/courses/${course.slug}`}
      />

      <Breadcrumbs
        items={[
          { label: 'Courses', to: '/courses' },
          { label: course.shortTitle },
        ]}
      />

      {/* Course Hero Banner */}
      <section className="bg-slate-900 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-10 lg:p-14 border border-slate-800 shadow-xl sm:shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center relative z-10">
          <div className="lg:col-span-8 space-y-3 sm:space-y-4">
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <Badge variant="emerald" size="sm">
                {course.level}
              </Badge>
              <Badge variant="slate" size="sm">
                {course.transmission === 'manual' ? 'Manual Gearbox' : course.transmission === 'automatic' ? 'Automatic AT/CVT' : 'Manual & Automatic'}
              </Badge>
              {course.badge && (
                <Badge variant="amber" size="sm" icon={<Sparkles className="w-3 h-3" />}>
                  {course.badge}
                </Badge>
              )}
            </div>

            <h1 className="text-xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white tracking-tight leading-tight">
              {course.title}
            </h1>

            <p className="text-xs sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              {course.description}
            </p>

            {/* Quick Metrics */}
            <div className="pt-1 sm:pt-2 flex flex-wrap gap-2.5 sm:gap-6 text-[0.72rem] sm:text-sm font-semibold text-slate-300">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                <span>{course.durationHours} Practical Hours</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Car className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                <span>{course.sessionsCount} Daily Sessions</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                <span>Dual-Control Safety</span>
              </div>
            </div>
          </div>

          {/* Pricing & Booking Card (4 cols) */}
          <div className="lg:col-span-4 p-4 sm:p-7 rounded-xl sm:rounded-2xl bg-slate-800/90 border border-slate-700 shadow-lg space-y-3 sm:space-y-4">
            <div className="text-[0.65rem] sm:text-xs uppercase font-bold text-slate-400 tracking-wider">
              All-Inclusive Course Fee
            </div>

            <div className="flex items-baseline gap-1.5 sm:gap-2">
              <span className="text-2xl sm:text-4xl font-black font-display text-emerald-400">
                ₹{course.price.toLocaleString('en-IN')}
              </span>
              {course.originalPrice && (
                <span className="text-xs sm:text-sm text-slate-400 line-through">
                  ₹{course.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            <p className="text-[0.68rem] sm:text-[0.7rem] text-slate-400 leading-relaxed">
              Includes fuel, vehicle maintenance, doorstep pickup, and mock RTO testing. Zero hidden fees.
            </p>

            <Button
              variant="amber"
              size="md"
              onClick={() => onOpenBooking(course.slug)}
              className="w-full justify-center shadow-md font-bold text-xs sm:text-sm py-2.5 sm:py-3"
              icon={<Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-950" />}
            >
              Book This Course Now
            </Button>

            <Button
              variant="whatsapp"
              size="md"
              href={whatsappUrl}
              isExternal
              className="w-full justify-center text-xs sm:text-sm py-2 sm:py-2.5"
              icon={<MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />}
            >
              Enquire on WhatsApp
            </Button>
          </div>
        </div>
      </section>

      {/* 2-Column Content Grid: Left Syllabus, Right Inclusions & Prerequisites */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-start">
        {/* Left Column: Complete Session-by-Session Syllabus (7 Cols) */}
        <div className="lg:col-span-7 space-y-5 sm:space-y-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 tracking-tight flex items-center gap-2">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
              Complete Session Curriculum
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-600">
              Every lesson is structured around concrete competencies and spatial muscle memory.
            </p>
          </div>

          <div className="space-y-2 sm:space-y-3">
            {course.syllabus.map((mod, idx) => {
              const isOpen = openModuleIndex === idx;

              return (
                <div
                  key={idx}
                  className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs transition-all"
                >
                  <button
                    onClick={() => toggleModule(idx)}
                    className="w-full p-3 sm:p-5 text-left flex items-start justify-between gap-2.5 sm:gap-3 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-start gap-2.5 sm:gap-3 min-w-0">
                      <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-emerald-100 text-emerald-800 text-[0.7rem] sm:text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                        {mod.sessionNumber}
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-xs sm:text-base font-bold text-slate-900 truncate sm:whitespace-normal">
                          {mod.title}
                        </h3>
                        <p className="text-[0.7rem] sm:text-xs text-slate-500 mt-0.5">
                          {mod.durationMinutes} mins • {mod.isRtoTrackSpecific ? 'RTO Track Drill' : 'Road Drive'}
                        </p>
                      </div>
                    </div>

                    <ChevronDown
                      className={`w-4 h-4 sm:w-5 sm:h-5 text-slate-400 transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 text-emerald-600' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-3.5 sm:px-5 pb-3.5 sm:pb-5 pt-1 border-t border-slate-100 bg-slate-50/50 space-y-2.5 sm:space-y-3 animate-in fade-in duration-150">
                      <div>
                        <span className="text-[0.65rem] sm:text-[0.7rem] uppercase font-bold text-slate-500 tracking-wider">
                          Session Objective:
                        </span>
                        <p className="text-xs sm:text-sm text-slate-700 mt-0.5 leading-relaxed">
                          {mod.objective}
                        </p>
                      </div>

                      <div>
                        <span className="text-[0.65rem] sm:text-[0.7rem] uppercase font-bold text-slate-500 tracking-wider">
                          Key Topics Covered:
                        </span>
                        <ul className="mt-1 space-y-1 text-xs text-slate-600">
                          {mod.topics.map((t, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span className="text-[0.72rem] sm:text-xs">{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Learning Outcomes */}
          <div className="p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl bg-emerald-50/70 border border-emerald-200 space-y-2 sm:space-y-3">
            <h3 className="text-sm sm:text-base font-bold font-display text-emerald-950">
              What You Will Confidently Master:
            </h3>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-emerald-900">
              {course.learningOutcomes.map((outcome, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed text-[0.75rem] sm:text-sm">{outcome}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Inclusions, Suitable For & FAQs (5 Cols) */}
        <div className="lg:col-span-5 space-y-4 sm:space-y-6">
          {/* What's Included */}
          <div className="p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3 sm:space-y-4">
            <h3 className="text-sm sm:text-base font-bold font-display text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
              What’s Included in This Course:
            </h3>
            <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm text-slate-700">
              {course.whatIncluded.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 sm:gap-2.5">
                  <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-snug text-[0.75rem] sm:text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Suitable For */}
          <div className="p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3 sm:space-y-4">
            <h3 className="text-sm sm:text-base font-bold font-display text-slate-900">
              Ideal Candidate Profile:
            </h3>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-slate-600">
              {course.suitableFor.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                  <span className="text-[0.75rem] sm:text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Course FAQs */}
          {course.faqs && course.faqs.length > 0 && (
            <div className="p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3 sm:space-y-4">
              <h3 className="text-sm sm:text-base font-bold font-display text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
                Course Specific Questions:
              </h3>
              <div className="space-y-2 sm:space-y-3 text-xs">
                {course.faqs.map((faq, idx) => (
                  <div key={idx} className="pb-2.5 sm:pb-3 border-b border-slate-100 last:border-none last:pb-0">
                    <h4 className="font-bold text-slate-900 mb-0.5 text-[0.75rem] sm:text-xs">{faq.question}</h4>
                    <p className="text-slate-600 leading-relaxed text-[0.72rem] sm:text-xs">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
