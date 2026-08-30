import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  Star,
  ArrowRight,
  Car,
  Clock,
  Compass,
  Award,
} from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { Button } from '../components/common/Button';
import { SectionHeading } from '../components/common/SectionHeading';
import { CourseCard } from '../components/cards/CourseCard';
import { TestimonialCard } from '../components/cards/TestimonialCard';
import { RoadmapSection } from '../components/roadmap/RoadmapSection';
import { SEO } from '../components/common/SEO';
import { generateDirectWhatsAppChatLink } from '../utils/whatsapp';

export const Home: React.FC = () => {
  const { siteData } = useContent();
  const { siteConfig, courses, roadmap, testimonials, about } = siteData;
  const { onOpenBooking } = useOutletContext<{ onOpenBooking: (courseSlug?: string, instructorId?: string) => void }>();

  const whatsappUrl = generateDirectWhatsAppChatLink(siteConfig);

  // Select top 3 distinct courses for clean minimal preview
  const featuredCourses = courses.slice(0, 3);
  const featuredTestimonials = testimonials.slice(0, 3);

  return (
    <div className="space-y-10 sm:space-y-16 lg:space-y-24">
      <SEO
        title="India's Premier Certified Driving Academy"
        description="Learn driving with 100% dual-control safety cars, patient certified instructors, automated RTO test-track preparation, and doorstep pickup."
      />

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-4 pb-6 sm:pt-6 lg:pt-8 lg:pb-16">
        {/* Ambient background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-100/50 rounded-full blur-3xl pointer-events-none -z-10 animate-glow" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
            {/* Hero Left Content (7 Cols) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left"
            >
              {/* Trust Badge Pill */}
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-emerald-100/90 border border-emerald-300 text-[0.72rem] sm:text-sm font-bold text-emerald-950 shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 animate-pulse-subtle" />
                <span>100% Dual-Control Safety Fleet • Doorstep Pickup</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-2xl sm:text-5xl lg:text-6xl font-extrabold font-display text-slate-900 tracking-tight leading-[1.18] sm:leading-[1.15]">
                Master Every Mile with <span className="text-gradient-emerald">Confidence</span> & <span className="text-slate-900">Total Safety</span>.
              </h1>

              {/* Subtitle */}
              <p className="text-xs sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Learn driving in modern dual-control cars with patient certified mentors, replica automated RTO track training, and zero hidden fees.
              </p>

              {/* Action Buttons */}
              <div className="pt-1 sm:pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2.5 sm:gap-3.5">
                <Button
                  variant="primary"
                  size="xl"
                  onClick={() => onOpenBooking()}
                  className="w-full sm:w-auto justify-center shadow-md sm:shadow-lg hover:shadow-glow-emerald text-sm sm:text-base py-3 sm:py-3.5 hover-lift"
                  icon={<Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" />}
                >
                  Book a Driving Lesson
                </Button>

                <Button
                  variant="whatsapp"
                  size="xl"
                  href={whatsappUrl}
                  isExternal
                  className="w-full sm:w-auto justify-center shadow-xs sm:shadow-md text-sm sm:text-base py-3 sm:py-3.5 hover-lift"
                  icon={<MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />}
                >
                  WhatsApp Us
                </Button>
              </div>

              {/* Quick Trust Checks */}
              <div className="pt-2 sm:pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-4 text-[0.72rem] sm:text-xs font-semibold text-slate-600">
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0" />
                  <span>98.4% First-Attempt RTO Pass</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0" />
                  <span>Female & Male Mentors</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0" />
                  <span>Manual & Auto</span>
                </div>
              </div>
            </motion.div>

            {/* Hero Right Visual (5 Cols) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, delay: 0.15, ease: 'easeOut' }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl border border-slate-200 bg-white">
                <img
                  src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80"
                  alt="Student learning to drive in dual control safety car"
                  className="w-full h-56 sm:h-96 object-cover object-center transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

                {/* Floating In-Car Safety Badge */}
                <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 flex items-center gap-1.5 sm:gap-2 p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-sm text-xs font-bold text-slate-900 animate-float-slow">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
                    <ShieldCheck className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <span className="block leading-tight font-extrabold text-emerald-900 text-[0.7rem] sm:text-xs">Dual-Control Safe</span>
                    <span className="text-[0.6rem] sm:text-[0.65rem] text-slate-500 font-normal">Secondary brake</span>
                  </div>
                </div>

                {/* Floating Rating Pill */}
                <div className="absolute bottom-2.5 right-2.5 sm:bottom-4 sm:right-4 flex items-center gap-1.5 sm:gap-2 p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700 text-white shadow-sm text-xs animate-float-delayed">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="font-extrabold text-emerald-400 text-[0.7rem] sm:text-xs">4.95 / 5.0</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. SLIM MINIMAL TRUST STATS BAR */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ duration: 0.4 }}
        className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8"
      >
        <div className="py-2.5 sm:py-4 px-2 sm:px-6 bg-slate-900 text-white rounded-xl sm:rounded-2xl border border-slate-800 shadow-sm">
          <div className="grid grid-cols-4 divide-x divide-slate-800 text-center items-center">
            <div className="px-1 sm:px-3">
              <div className="text-sm xs:text-base sm:text-2xl lg:text-3xl font-black font-display text-emerald-400 leading-tight">
                {siteConfig.trustStats[0]?.value || '14,800+'}
              </div>
              <div className="text-[0.6rem] sm:text-xs text-slate-300 font-medium mt-0.5 truncate">
                Learners Trained
              </div>
            </div>

            <div className="px-1 sm:px-3">
              <div className="text-sm xs:text-base sm:text-2xl lg:text-3xl font-black font-display text-emerald-400 leading-tight">
                {siteConfig.trustStats[1]?.value || '98.4%'}
              </div>
              <div className="text-[0.6rem] sm:text-xs text-slate-300 font-medium mt-0.5 truncate">
                RTO Pass Rate
              </div>
            </div>

            <div className="px-1 sm:px-3">
              <div className="text-sm xs:text-base sm:text-2xl lg:text-3xl font-black font-display text-emerald-400 leading-tight">
                {siteConfig.trustStats[2]?.value || '35+'}
              </div>
              <div className="text-[0.6rem] sm:text-xs text-slate-300 font-medium mt-0.5 truncate">
                Top Mentors
              </div>
            </div>

            <div className="px-1 sm:px-3">
              <div className="text-sm xs:text-base sm:text-2xl lg:text-3xl font-black font-display text-emerald-400 leading-tight">
                {siteConfig.trustStats[3]?.value || '100%'}
              </div>
              <div className="text-[0.6rem] sm:text-xs text-slate-300 font-medium mt-0.5 truncate">
                Dual-Control
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 3. CORE VALUE HIGHLIGHTS (3 Cards) */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.45 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex overflow-x-auto gap-3 pb-2 -mx-4 px-4 snap-x snap-mandatory scrollbar-none md:grid md:grid-cols-3 md:gap-6 md:m-0 md:p-0 md:overflow-visible">
          <div className="w-[78vw] max-w-[300px] shrink-0 snap-center md:w-auto md:max-w-none p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2 sm:space-y-3 flex flex-col justify-between hover-lift">
            <div>
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold mb-2">
                <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-sm sm:text-base font-bold font-display text-slate-900">
                100% Dual-Control Safety Fleet
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1">
                Every training vehicle is equipped with secondary dual pedals. Your instructor stops the vehicle instantly if any hazard arises.
              </p>
            </div>
          </div>

          <div className="w-[78vw] max-w-[300px] shrink-0 snap-center md:w-auto md:max-w-none p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2 sm:space-y-3 flex flex-col justify-between hover-lift">
            <div>
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold mb-2">
                <Award className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-sm sm:text-base font-bold font-display text-slate-900">
                Automated RTO Track Readiness
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1">
                Drills on replica Figure-8, H-box parking, and slope hill-hold tracks ensure high first-attempt pass rates on camera-monitored exams.
              </p>
            </div>
          </div>

          <div className="w-[78vw] max-w-[300px] shrink-0 snap-center md:w-auto md:max-w-none p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2 sm:space-y-3 flex flex-col justify-between hover-lift">
            <div>
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold mb-2">
                <Compass className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-sm sm:text-base font-bold font-display text-slate-900">
                Doorstep Pickup & Calm Coaching
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1">
                Daily 1-hour slots scheduled directly from your home or office with background-verified, patient male & female mentors.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 4. FEATURED DRIVING COURSES (Minimal 3 Cards) */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.45 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-4 mb-3 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-0.5 sm:py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 mb-1 sm:mb-2">
              Featured Courses
            </div>
            <h2 className="text-lg sm:text-3xl font-extrabold font-display text-slate-900 tracking-tight">
              Popular Driving Programs
            </h2>
          </div>

          <Link
            to="/courses"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-800 underline shrink-0 transition-colors"
          >
            Explore All Courses & Curriculum →
          </Link>
        </div>

        <div className="flex overflow-x-auto pb-3 pt-1 -mx-4 px-4 snap-x snap-mandatory scrollbar-none gap-3 md:grid md:grid-cols-3 md:gap-6 lg:gap-8 md:overflow-visible md:p-0 md:m-0">
          {featuredCourses.map((course) => (
            <div key={course.id} className="w-[84vw] max-w-[330px] shrink-0 snap-center md:w-auto md:max-w-none hover-lift">
              <CourseCard
                course={course}
                onBookNow={(slug) => onOpenBooking(slug)}
              />
            </div>
          ))}
        </div>
      </motion.section>

      {/* 5. SIGNATURE FEATURE — SERPENTINE LICENCE ROADMAP */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.45 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <SectionHeading
          pillText="Signature Feature"
          title="Your 6-Step Roadmap to an Indian Driving Licence"
          subtitle="A clear visual journey from Sarathi Parivahan online application to automated camera track exam and smart card delivery."
        />

        <RoadmapSection steps={roadmap} onOpenBookingModal={() => onOpenBooking()} isCompactPreview />

        <div className="mt-4 sm:mt-6 text-center">
          <Link
            to="/roadmap"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-800 underline transition-colors"
          >
            View Complete RTO Documentation Checklists & Track Advice →
          </Link>
        </div>
      </motion.section>

      {/* 6. VERIFIED STUDENT STORIES (3 Cards) */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.45 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-4 mb-3 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-0.5 sm:py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 mb-1 sm:mb-2">
              Student Reviews
            </div>
            <h2 className="text-lg sm:text-3xl font-extrabold font-display text-slate-900 tracking-tight">
              Real Drivers • Real Confidence
            </h2>
          </div>

          <Link
            to="/testimonials"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-800 underline shrink-0 transition-colors"
          >
            Read More Reviews ({testimonials.length}+) →
          </Link>
        </div>

        {/* HORIZONTALLY SWIPEABLE REVIEWS ON MOBILE */}
        <div className="flex overflow-x-auto pb-3 pt-1 -mx-4 px-4 snap-x snap-mandatory scrollbar-none gap-3 md:grid md:grid-cols-3 md:gap-6 lg:gap-8 md:overflow-visible md:p-0 md:m-0">
          {featuredTestimonials.map((test) => (
            <div key={test.id} className="w-[82vw] max-w-[320px] shrink-0 snap-center md:w-auto md:max-w-none hover-lift">
              <TestimonialCard testimonial={test} />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-1.5 pt-1.5 text-[0.68rem] text-slate-400 md:hidden">
          <span>← Swipe horizontally to read more reviews →</span>
        </div>
      </motion.section>

      {/* 7. HIGH-CONVERSION WHATSAPP / BOOKING BANNER */}
      <motion.section
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.45 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8"
      >
        <div className="relative rounded-2xl sm:rounded-3xl bg-slate-900 text-white p-5 sm:p-12 lg:p-14 border border-slate-800 shadow-xl overflow-hidden flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-8">
          <div className="space-y-2 sm:space-y-3 text-center md:text-left max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              Get Started This Week
            </div>

            <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold font-display text-white tracking-tight">
              Ready to Start Your Driving Lessons?
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Doorstep pickup, zero-stall training, and patient mentors. Enquire online or chat with our admissions team on WhatsApp.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 shrink-0 w-full md:w-auto">
            <Button
              variant="primary"
              size="lg"
              onClick={() => onOpenBooking()}
              className="w-full sm:w-auto justify-center shadow-lg text-xs sm:text-sm py-2.5 sm:py-3 hover-lift"
              icon={<Sparkles className="w-4 h-4 text-amber-300" />}
            >
              Book a Lesson
            </Button>

            <Button
              variant="whatsapp"
              size="lg"
              href={whatsappUrl}
              isExternal
              className="w-full sm:w-auto justify-center text-xs sm:text-sm py-2.5 sm:py-3 hover-lift"
              icon={<MessageCircle className="w-4 h-4 fill-current" />}
            >
              WhatsApp Us
            </Button>
          </div>
        </div>
      </motion.section>
    </div>
  );
};
