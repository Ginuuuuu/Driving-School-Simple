import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  Star,
  Award,
  Compass,
} from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { Button } from '../components/common/Button';
import { TestimonialCard } from '../components/cards/TestimonialCard';
import { RoadmapSection } from '../components/roadmap/RoadmapSection';
import TeamShowcase from '../components/team/TeamShowcase';
import { SEO } from '../components/common/SEO';
import { generateDirectWhatsAppChatLink } from '../utils/whatsapp';

export const Home: React.FC = () => {
  const { siteData } = useContent();
  const { siteConfig, roadmap, testimonials, instructors } = siteData;
  const { onOpenBooking } = useOutletContext<{ onOpenBooking: (courseSlug?: string, instructorId?: string) => void }>();

  const whatsappUrl = generateDirectWhatsAppChatLink(siteConfig);

  const featuredTestimonials = testimonials.slice(0, 3);

  return (
    <div className="space-y-8 sm:space-y-14 lg:space-y-24">
      <SEO
        title="India's Premier Certified Driving Academy"
        description="Learn driving with 100% dual-control safety cars, patient certified instructors, automated RTO test-track preparation, and doorstep pickup."
      />

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-1 pb-4 sm:pt-6 lg:pt-8 lg:pb-16">
        {/* Ambient background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#F4C400]/15 rounded-full blur-3xl pointer-events-none -z-10 animate-glow" />

        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">
            {/* Hero Left Content (7 Cols) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="lg:col-span-7 space-y-4 sm:space-y-6 lg:space-y-8 text-center lg:text-left"
            >
              {/* Trust Badge Pill */}
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#F4C400]/15 border border-[#F4C400]/30 text-[0.68rem] xs:text-[0.72rem] sm:text-sm font-bold text-[#082B4C] shadow-2xs max-w-full">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#082B4C] shrink-0 animate-pulse-subtle" />
                <span className="leading-snug">{siteConfig.hero?.badgeText || '100% Dual-Control Safety Fleet • Doorstep Pickup'}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-2xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold font-display text-[#202B33] tracking-tight leading-[1.18] sm:leading-[1.12]">
                {siteConfig.hero?.headlineMain || 'Master Every Mile with '}
                <span className="text-[#082B4C]">{siteConfig.hero?.headlineHighlight || 'Confidence'}</span>
                {siteConfig.hero?.headlineEnd || ' & Total Safety.'}
              </h1>

              {/* Subtitle */}
              <p className="text-xs sm:text-base lg:text-lg xl:text-xl text-[#6B7280] leading-relaxed max-w-2xl lg:max-w-3xl mx-auto lg:mx-0">
                {siteConfig.hero?.subtitle || 'Learn driving in modern dual-control cars with patient certified mentors, replica automated RTO track training, and zero hidden fees.'}
              </p>

              {/* Action Buttons */}
              <div className="pt-1 sm:pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2.5 sm:gap-3.5">
                <Button
                  variant="primary"
                  size="xl"
                  onClick={() => onOpenBooking()}
                  className="w-full sm:w-auto justify-center shadow-md sm:shadow-lg text-sm sm:text-base py-3 sm:py-3.5 hover-lift"
                  icon={<Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#082B4C]" />}
                >
                  {siteConfig.hero?.bookingButtonText || 'Book a Driving Lesson'}
                </Button>

                <Button
                  variant="whatsapp"
                  size="xl"
                  href={whatsappUrl}
                  isExternal
                  className="w-full sm:w-auto justify-center shadow-xs sm:shadow-md text-sm sm:text-base py-3 sm:py-3.5 hover-lift"
                  icon={<MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />}
                >
                  {siteConfig.hero?.whatsappButtonText || 'WhatsApp Us'}
                </Button>
              </div>

              {/* Quick Trust Checks */}
              <div className="pt-2 sm:pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-4 text-[0.72rem] sm:text-xs lg:text-sm font-semibold text-[#6B7280]">
                {(siteConfig.hero?.trustChecks || ['98.4% First-Attempt RTO Pass', 'Female & Male Mentors', 'Manual & Auto']).map((check, idx, arr) => (
                  <React.Fragment key={idx}>
                    <div className="flex items-center gap-1 sm:gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#082B4C] shrink-0" />
                      <span className="text-[#202B33]">{check}</span>
                    </div>
                    {idx < arr.length - 1 && <span className="text-[#E5E7EB]">•</span>}
                  </React.Fragment>
                ))}
              </div>
            </motion.div>

            {/* Hero Right Visual (5 Cols) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, delay: 0.15, ease: 'easeOut' }}
              className="lg:col-span-5 relative w-full"
            >
<<<<<<< HEAD
              <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[1.15/1] xl:aspect-[1.2/1] w-full min-h-[320px] sm:min-h-[380px] lg:min-h-[440px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl border border-[#E5E7EB] bg-white">
                <img
                  src={siteConfig.hero?.heroImageUrl || "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80"}
                  alt="Student learning to drive in dual control safety car"
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
=======
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl border border-[#E5E7EB] bg-white w-full">
                <img
                  src={siteConfig.hero?.heroImageUrl || "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80"}
                  alt="Student learning to drive in dual control safety car"
                  className="w-full h-64 sm:h-80 md:h-96 lg:h-[460px] xl:h-[520px] 2xl:h-[580px] object-cover object-center transition-transform duration-700 hover:scale-105"
>>>>>>> f9da9236e7e30d399b1b7cf1d862c30139c4c05e
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#082B4C]/80 via-transparent to-transparent pointer-events-none" />

                {/* Floating In-Car Safety Badge */}
                <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 flex items-center gap-1.5 sm:gap-2 p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-white/95 backdrop-blur-md border border-[#E5E7EB] shadow-sm text-xs font-bold text-[#202B33] animate-float-slow">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-[#F4C400]/20 flex items-center justify-center text-[#082B4C]">
                    <ShieldCheck className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <span className="block leading-tight font-extrabold text-[#202B33] text-[0.7rem] sm:text-xs">Dual-Control Safe</span>
                    <span className="text-[0.6rem] sm:text-[0.65rem] text-[#6B7280] font-normal">Secondary brake</span>
                  </div>
                </div>

                {/* Floating Rating Pill */}
                <div className="absolute bottom-2.5 right-2.5 sm:bottom-4 sm:right-4 flex items-center gap-1.5 sm:gap-2 p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-[#082B4C]/95 backdrop-blur-md border border-white/10 text-white shadow-sm text-xs animate-float-delayed">
                  <div className="flex text-[#F4C400]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="font-extrabold text-[#F4C400] text-[0.7rem] sm:text-xs">4.95 / 5.0</span>
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
        className="site-container"
      >
        <div className="py-3 sm:py-4 lg:py-5 xl:py-6 px-3 sm:px-6 lg:px-8 xl:px-12 bg-[#082B4C] text-white rounded-xl sm:rounded-2xl lg:rounded-3xl border border-[#061F36] shadow-sm">
          <div className="grid grid-cols-4 divide-x divide-[#061F36] text-center items-center">
            <div className="px-1 sm:px-3">
              <div className="text-sm xs:text-base sm:text-2xl lg:text-3xl xl:text-4xl font-black font-display text-[#F4C400] leading-tight">
                {siteConfig.trustStats[0]?.value || '14,800+'}
              </div>
              <div className="text-[0.6rem] sm:text-xs lg:text-sm text-slate-200 font-medium mt-0.5 sm:mt-1 truncate">
                Learners Trained
              </div>
            </div>

            <div className="px-1 sm:px-3">
              <div className="text-sm xs:text-base sm:text-2xl lg:text-3xl xl:text-4xl font-black font-display text-[#F4C400] leading-tight">
                {siteConfig.trustStats[1]?.value || '98.4%'}
              </div>
              <div className="text-[0.6rem] sm:text-xs lg:text-sm text-slate-200 font-medium mt-0.5 sm:mt-1 truncate">
                RTO Pass Rate
              </div>
            </div>

            <div className="px-1 sm:px-3">
              <div className="text-sm xs:text-base sm:text-2xl lg:text-3xl xl:text-4xl font-black font-display text-[#F4C400] leading-tight">
                {siteConfig.trustStats[2]?.value || '35+'}
              </div>
              <div className="text-[0.6rem] sm:text-xs lg:text-sm text-slate-200 font-medium mt-0.5 sm:mt-1 truncate">
                Top Mentors
              </div>
            </div>

            <div className="px-1 sm:px-3">
              <div className="text-sm xs:text-base sm:text-2xl lg:text-3xl xl:text-4xl font-black font-display text-[#F4C400] leading-tight">
                {siteConfig.trustStats[3]?.value || '100%'}
              </div>
              <div className="text-[0.6rem] sm:text-xs lg:text-sm text-slate-200 font-medium mt-0.5 sm:mt-1 truncate">
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
        className="site-container"
      >
<<<<<<< HEAD
        <div className="flex overflow-x-auto gap-3 pb-2 -mx-4 px-4 snap-x snap-mandatory scrollbar-none md:grid md:grid-cols-3 md:gap-6 lg:gap-8 md:m-0 md:p-0 md:overflow-visible md:items-stretch">
=======
        <div className="flex overflow-x-auto gap-3 pb-2 -mx-4 px-4 snap-x snap-mandatory scrollbar-none md:grid md:grid-cols-3 md:gap-6 lg:gap-8 xl:gap-10 md:m-0 md:p-0 md:overflow-visible">
>>>>>>> f9da9236e7e30d399b1b7cf1d862c30139c4c05e
          {(siteConfig.coreValues || [
            {
              id: 'val-1',
              title: '100% Dual-Control Safety Fleet',
              description: 'Every training vehicle is equipped with secondary dual pedals. Your instructor stops the vehicle instantly if any hazard arises.',
              icon: 'ShieldCheck',
            },
            {
              id: 'val-2',
              title: 'Automated RTO Track Readiness',
              description: 'Drills on replica Figure-8, H-box parking, and slope hill-hold tracks ensure high first-attempt pass rates on camera-monitored exams.',
              icon: 'Award',
            },
            {
              id: 'val-3',
              title: 'Doorstep Pickup & Calm Coaching',
              description: 'Daily 1-hour slots scheduled directly from your home or office with background-verified, patient male & female mentors.',
              icon: 'Compass',
            },
          ]).map((item, idx) => (
<<<<<<< HEAD
            <div key={item.id || idx} className="w-[78vw] max-w-[300px] shrink-0 snap-center md:w-auto md:max-w-none p-4 sm:p-6 lg:p-7 rounded-2xl sm:rounded-3xl bg-white border border-[#E5E7EB] shadow-xs space-y-2 sm:space-y-3 flex flex-col justify-between hover-lift h-full">
              <div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center font-bold mb-3 bg-[#F4C400]/20 text-[#082B4C]">
                  {idx === 0 ? <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" /> : idx === 1 ? <Award className="w-5 h-5 sm:w-6 sm:h-6" /> : <Compass className="w-5 h-5 sm:w-6 sm:h-6" />}
                </div>
                <h3 className="text-sm sm:text-base lg:text-lg font-bold font-display text-[#202B33]">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed mt-1.5">
=======
            <div key={item.id || idx} className="w-[78vw] max-w-[300px] shrink-0 snap-center md:w-auto md:max-w-none p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl bg-white border border-[#E5E7EB] shadow-xs space-y-3 sm:space-y-4 flex flex-col justify-between hover-lift">
              <div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center font-bold mb-3 bg-[#F4C400]/20 text-[#082B4C]">
                  {idx === 0 ? <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" /> : idx === 1 ? <Award className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" /> : <Compass className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />}
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-bold font-display text-[#202B33]">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm lg:text-base text-[#6B7280] leading-relaxed mt-1.5">
>>>>>>> f9da9236e7e30d399b1b7cf1d862c30139c4c05e
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* 4. INSTRUCTOR & MENTOR SHOWCASE */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.45 }}
        className="site-container"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 mb-4 sm:mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#082B4C] mb-1">
              <Award className="w-3.5 h-3.5 text-[#082B4C]" />
              MoRTH Certified Safety Mentors
            </div>
            <h2 className="text-lg sm:text-2xl lg:text-3xl xl:text-4xl font-bold font-display text-[#202B33] tracking-tight">
              Learn From Patient, Background-Verified Instructors
            </h2>
          </div>

          <Link
            to="/instructors"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#082B4C] hover:text-[#061F36] underline shrink-0 transition-colors"
          >
            View All Mentors ({instructors?.length || 9}) →
          </Link>
        </div>

        <TeamShowcase
          instructors={instructors}
          members={siteConfig.teamMembers}
          onSelectInstructor={(instructorId) => onOpenBooking(undefined, instructorId)}
        />
      </motion.section>

      {/* 5. SIGNATURE FEATURE — SERPENTINE LICENCE ROADMAP */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.45 }}
        className="site-container"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 mb-3 sm:mb-6">
          <h2 className="text-lg sm:text-2xl lg:text-3xl xl:text-4xl font-bold font-display text-[#202B33] tracking-tight">
            6-Step Licence Roadmap
          </h2>

          <Link
            to="/roadmap"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#082B4C] hover:text-[#061F36] underline shrink-0 transition-colors"
          >
            Full RTO Guide →
          </Link>
        </div>

        <RoadmapSection steps={roadmap} onOpenBookingModal={() => onOpenBooking()} isCompactPreview />
      </motion.section>

      {/* 6. VERIFIED STUDENT STORIES (3 Cards) */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.45 }}
        className="site-container"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 mb-3 sm:mb-6">
          <h2 className="text-lg sm:text-2xl lg:text-3xl xl:text-4xl font-bold font-display text-[#202B33] tracking-tight">
            Student Reviews & Stories
          </h2>

          <Link
            to="/testimonials"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#082B4C] hover:text-[#061F36] underline shrink-0 transition-colors"
          >
            Read All Reviews ({testimonials.length}+) →
          </Link>
        </div>

<<<<<<< HEAD
        {/* HORIZONTALLY SWIPEABLE REVIEWS ON MOBILE / EQUAL HEIGHT GRID ON DESKTOP */}
        <div className="flex overflow-x-auto pb-3 pt-1 -mx-4 px-4 snap-x snap-mandatory scrollbar-none gap-3 md:grid md:grid-cols-3 md:gap-6 lg:gap-8 md:overflow-visible md:p-0 md:m-0 md:items-stretch">
=======
        {/* HORIZONTALLY SWIPEABLE REVIEWS ON MOBILE */}
        <div className="flex overflow-x-auto pb-3 pt-1 -mx-4 px-4 snap-x snap-mandatory scrollbar-none gap-3 md:grid md:grid-cols-3 md:gap-6 lg:gap-8 xl:gap-10 md:overflow-visible md:p-0 md:m-0">
>>>>>>> f9da9236e7e30d399b1b7cf1d862c30139c4c05e
          {featuredTestimonials.map((test) => (
            <div key={test.id} className="w-[82vw] max-w-[320px] shrink-0 snap-center md:w-auto md:max-w-none hover-lift h-full flex flex-col">
              <TestimonialCard testimonial={test} />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-1.5 pt-1.5 text-[0.68rem] text-[#6B7280] md:hidden">
          <span>← Swipe horizontally to read more reviews →</span>
        </div>
      </motion.section>

      {/* 7. HIGH-CONVERSION WHATSAPP / BOOKING BANNER */}
      <motion.section
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.45 }}
        className="site-container pb-10 sm:pb-14"
      >
        <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#082B4C] via-[#061F36] to-[#041424] text-white p-6 sm:p-10 lg:p-14 xl:p-16 border border-white/10 shadow-2xl overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-10">
          {/* Ambient Flowing Light Glow Orbs */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#F4C400]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-[#082B4C]/30 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-2 sm:space-y-3 text-center md:text-left max-w-2xl">
            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold font-display text-white tracking-tight">
              Ready to Start Your Driving Lessons?
            </h2>

            <p className="text-xs sm:text-sm lg:text-base text-slate-200 leading-relaxed">
              Doorstep pickup, zero-stall training, and patient mentors. Enquire online or chat with our admissions team on WhatsApp.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <Button
              variant="primary"
              size="lg"
              onClick={() => onOpenBooking()}
              className="w-full sm:w-auto justify-center shadow-lg text-sm sm:text-base py-3 sm:py-3.5 hover-lift"
              icon={<Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#082B4C]" />}
            >
              Book a Lesson
            </Button>

            <Button
              variant="whatsapp"
              size="lg"
              href={whatsappUrl}
              isExternal
              className="w-full sm:w-auto justify-center text-sm sm:text-base py-3 sm:py-3.5 hover-lift"
              icon={<MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />}
            >
              WhatsApp Us
            </Button>
          </div>
        </div>
      </motion.section>
    </div>
  );
};
