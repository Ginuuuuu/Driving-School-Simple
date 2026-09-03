import React, { useState } from 'react';
import { useParams, Link, useOutletContext, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { SEO } from '../components/common/SEO';
import { generateDirectWhatsAppChatLink } from '../utils/whatsapp';

import { defaultCourses } from '../content/courses';
import { defaultSiteConfig } from '../content/siteConfig';

export const CourseDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { siteData } = useContent();
  const courses = siteData?.courses || defaultCourses;
  const siteConfig = siteData?.siteConfig || defaultSiteConfig;
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
    <div className="site-container py-4 sm:py-10 space-y-6 sm:space-y-12 lg:space-y-16">
      <SEO
        title={course.title}
        description={course.summary}
        canonicalPath={`/courses/${course.slug}`}
      />

      {/* Course Hero Banner */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative overflow-hidden rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-14 bg-gradient-to-br from-[#082B4C] via-[#061F36] to-[#041424] border border-white/10 text-white shadow-2xl"
      >
        {/* Ambient Flowing Light Glow Orbs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#F4C400]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#082B4C]/30 rounded-full blur-3xl pointer-events-none" />

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

            <p className="text-xs sm:text-base text-slate-200 leading-relaxed max-w-2xl">
              {course.description}
            </p>

            {/* Quick Metrics */}
            <div className="pt-1 sm:pt-2 flex flex-wrap gap-2.5 sm:gap-6 text-[0.72rem] sm:text-sm font-semibold text-slate-100">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F4C400]" />
                <span>{course.durationHours} Practical Hours</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Car className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F4C400]" />
                <span>{course.sessionsCount} Daily Sessions</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F4C400]" />
                <span>Dual-Control Safety</span>
              </div>
            </div>
          </div>

          {/* Pricing & Booking Glass Card (4 cols) */}
          <div className="lg:col-span-4 p-5 sm:p-7 rounded-2xl bg-white/[0.08] backdrop-blur-md border border-white/15 shadow-xl space-y-3 sm:space-y-4">
            <div className="text-[0.65rem] sm:text-xs uppercase font-bold text-[#F4C400] tracking-wider">
              All-Inclusive Course Fee
            </div>

            <div className="flex items-baseline gap-1.5 sm:gap-2">
              <span className="text-2xl sm:text-4xl font-black font-display text-[#F4C400]">
                ₹{course.price.toLocaleString('en-IN')}
              </span>
              {course.originalPrice && (
                <span className="text-xs sm:text-sm text-slate-300 line-through">
                  ₹{course.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            <p className="text-[0.68rem] sm:text-[0.7rem] text-slate-100 leading-relaxed">
              Includes fuel, vehicle maintenance, doorstep pickup, and mock RTO testing. Zero hidden fees.
            </p>

            <Button
              variant="primary"
              size="md"
              onClick={() => onOpenBooking(course.slug)}
              className="w-full justify-center shadow-md font-bold text-xs sm:text-sm py-2.5 sm:py-3 hover-lift"
              icon={<Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#082B4C]" />}
            >
              Book This Course Now
            </Button>

            <Button
              variant="whatsapp"
              size="md"
              href={whatsappUrl}
              isExternal
              className="w-full justify-center text-xs sm:text-sm py-2 sm:py-2.5 hover-lift"
              icon={<MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />}
            >
              Enquire on WhatsApp
            </Button>
          </div>
        </div>
      </motion.section>

      {/* 2-Column Content Grid: Left Syllabus, Right Inclusions & Prerequisites */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-start">
        {/* Left Column: Complete Session-by-Session Syllabus (7 Cols) */}
        <div className="lg:col-span-7 space-y-5 sm:space-y-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#202B33] tracking-tight flex items-center gap-2">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-[#082B4C]" />
              Complete Session Curriculum
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[#6B7280]">
              Every lesson is structured around concrete competencies and spatial muscle memory.
            </p>
          </div>

          <div className="space-y-2 sm:space-y-3">
            {course.syllabus.map((mod, idx) => {
              const isOpen = openModuleIndex === idx;

              return (
                <div
                  key={idx}
                  className="rounded-xl sm:rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden shadow-xs transition-all hover:border-[#082B4C]"
                >
                  <button
                    onClick={() => toggleModule(idx)}
                    className="w-full p-3 sm:p-5 text-left flex items-start justify-between gap-2.5 sm:gap-3 hover:bg-[#F5F6F7]/80 transition-colors"
                  >
                    <div className="flex items-start gap-2.5 sm:gap-3 min-w-0">
                      <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#F4C400]/20 text-[#082B4C] text-[0.7rem] sm:text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                        {mod.sessionNumber}
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-xs sm:text-base font-bold text-[#202B33] truncate sm:whitespace-normal">
                          {mod.title}
                        </h3>
                        <p className="text-[0.7rem] sm:text-xs text-[#6B7280] mt-0.5">
                          {mod.durationMinutes} mins • {mod.isRtoTrackSpecific ? 'RTO Track Drill' : 'Road Drive'}
                        </p>
                      </div>
                    </div>

                    <ChevronDown
                      className={`w-4 h-4 sm:w-5 sm:h-5 text-[#6B7280] transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 text-[#082B4C]' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-3.5 sm:px-5 pb-3.5 sm:pb-5 pt-1 border-t border-[#E5E7EB] bg-[#F5F6F7]/50 space-y-2.5 sm:space-y-3">
                          <div>
                            <span className="text-[0.65rem] sm:text-[0.7rem] uppercase font-bold text-[#6B7280] tracking-wider">
                              Session Objective:
                            </span>
                            <p className="text-xs sm:text-sm text-[#202B33] mt-0.5 leading-relaxed">
                              {mod.objective}
                            </p>
                          </div>

                          <div>
                            <span className="text-[0.65rem] sm:text-[0.7rem] uppercase font-bold text-[#6B7280] tracking-wider">
                              Key Topics Covered:
                            </span>
                            <ul className="mt-1 space-y-1 text-xs text-[#6B7280]">
                              {mod.topics.map((t, i) => (
                                <li key={i} className="flex items-center gap-2">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                  <span className="text-[0.72rem] sm:text-xs text-[#202B33]">{t}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Learning Outcomes */}
          <div className="p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#F4C400]/15 border border-[#F4C400]/30 space-y-2 sm:space-y-3">
            <h3 className="text-sm sm:text-base font-bold font-display text-[#202B33]">
              What You Will Confidently Master:
            </h3>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-[#202B33]">
              {course.learningOutcomes.map((outcome, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#082B4C] shrink-0 mt-0.5" />
                  <span className="leading-relaxed text-[0.75rem] sm:text-sm">{outcome}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Inclusions, Suitable For & FAQs (5 Cols) */}
        <div className="lg:col-span-5 space-y-4 sm:space-y-6">
          {/* What's Included */}
          <div className="p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-[#E5E7EB] shadow-xs space-y-3 sm:space-y-4">
            <h3 className="text-sm sm:text-base font-bold font-display text-[#202B33] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
              What’s Included in This Course:
            </h3>
            <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm text-[#202B33]">
              {course.whatIncluded.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 sm:gap-2.5">
                  <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-snug text-[0.75rem] sm:text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Suitable For */}
          <div className="p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-[#E5E7EB] shadow-xs space-y-3 sm:space-y-4">
            <h3 className="text-sm sm:text-base font-bold font-display text-[#202B33]">
              Ideal Candidate Profile:
            </h3>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-[#6B7280]">
              {course.suitableFor.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#082B4C] shrink-0 mt-1.5" />
                  <span className="text-[0.75rem] sm:text-sm text-[#202B33]">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Course FAQs */}
          {course.faqs && course.faqs.length > 0 && (
            <div className="p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-[#E5E7EB] shadow-xs space-y-3 sm:space-y-4">
              <h3 className="text-sm sm:text-base font-bold font-display text-[#202B33] flex items-center gap-2">
                <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#082B4C]" />
                Course Specific Questions:
              </h3>
              <div className="space-y-2 sm:space-y-3 text-xs">
                {course.faqs.map((faq, idx) => (
                  <div key={idx} className="pb-2.5 sm:pb-3 border-b border-[#E5E7EB] last:border-none last:pb-0">
                    <h4 className="font-bold text-[#202B33] mb-0.5 text-[0.75rem] sm:text-xs">{faq.question}</h4>
                    <p className="text-[#6B7280] leading-relaxed text-[0.72rem] sm:text-xs">{faq.answer}</p>
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
