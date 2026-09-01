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
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FFC5DC]/30 rounded-full blur-3xl pointer-events-none -z-10 animate-glow" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Hero Left Content (7 Cols) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="lg:col-span-7 space-y-3 sm:space-y-6 text-center lg:text-left"
            >
              {/* Trust Badge Pill */}
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#FDF2F5] border border-[#FFC5DC] text-[0.68rem] xs:text-[0.72rem] sm:text-sm font-bold text-[#39340F] shadow-2xs max-w-full">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#BC2639] shrink-0 animate-pulse-subtle" />
                <span className="leading-snug">{siteConfig.hero?.badgeText || '100% Dual-Control Safety Fleet • Doorstep Pickup'}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-2xl sm:text-5xl lg:text-6xl font-extrabold font-display text-[#39340F] tracking-tight leading-[1.18] sm:leading-[1.15]">
                {siteConfig.hero?.headlineMain || 'Master Every Mile with '}
                <span className="text-gradient-crimson">{siteConfig.hero?.headlineHighlight || 'Confidence'}</span>
                {siteConfig.hero?.headlineEnd || ' & Total Safety.'}
              </h1>

              {/* Subtitle */}
              <p className="text-xs sm:text-base lg:text-lg text-[#404D68] leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {siteConfig.hero?.subtitle || 'Learn driving in modern dual-control cars with patient certified mentors, replica automated RTO track training, and zero hidden fees.'}
              </p>

              {/* Action Buttons */}
              <div className="pt-1 sm:pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2.5 sm:gap-3.5">
                <Button
                  variant="primary"
                  size="xl"
                  onClick={() => onOpenBooking()}
                  className="w-full sm:w-auto justify-center shadow-md sm:shadow-lg hover:shadow-glow-crimson text-sm sm:text-base py-3 sm:py-3.5 hover-lift"
                  icon={<Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFC5DC]" />}
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
              <div className="pt-2 sm:pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-4 text-[0.72rem] sm:text-xs font-semibold text-[#404D68]">
                {(siteConfig.hero?.trustChecks || ['98.4% First-Attempt RTO Pass', 'Female & Male Mentors', 'Manual & Auto']).map((check, idx, arr) => (
                  <React.Fragment key={idx}>
                    <div className="flex items-center gap-1 sm:gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#BC2639] shrink-0" />
                      <span className="text-[#39340F]">{check}</span>
                    </div>
                    {idx < arr.length - 1 && <span className="text-[#D4E2DF]">•</span>}
                  </React.Fragment>
                ))}
              </div>
            </motion.div>

            {/* Hero Right Visual (5 Cols) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, delay: 0.15, ease: 'easeOut' }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl border border-[#D4E2DF] bg-white">
                <img
                  src={siteConfig.hero?.heroImageUrl || "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80"}
                  alt="Student learning to drive in dual control safety car"
                  className="w-full h-56 sm:h-96 object-cover object-center transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#39340F]/80 via-transparent to-transparent pointer-events-none" />

                {/* Floating In-Car Safety Badge */}
                <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 flex items-center gap-1.5 sm:gap-2 p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-white/95 backdrop-blur-md border border-[#D4E2DF] shadow-sm text-xs font-bold text-[#39340F] animate-float-slow">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-[#FDF2F5] flex items-center justify-center text-[#BC2639]">
                    <ShieldCheck className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <span className="block leading-tight font-extrabold text-[#39340F] text-[0.7rem] sm:text-xs">Dual-Control Safe</span>
                    <span className="text-[0.6rem] sm:text-[0.65rem] text-[#404D68] font-normal">Secondary brake</span>
                  </div>
                </div>

                {/* Floating Rating Pill */}
                <div className="absolute bottom-2.5 right-2.5 sm:bottom-4 sm:right-4 flex items-center gap-1.5 sm:gap-2 p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-[#39340F]/95 backdrop-blur-md border border-[#5F1618]/50 text-white shadow-sm text-xs animate-float-delayed">
                  <div className="flex text-[#BC2639]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="font-extrabold text-[#FFC5DC] text-[0.7rem] sm:text-xs">4.95 / 5.0</span>
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
        <div className="py-2.5 sm:py-4 px-2 sm:px-6 bg-[#39340F] text-white rounded-xl sm:rounded-2xl border border-[#5F1618] shadow-sm">
          <div className="grid grid-cols-4 divide-x divide-[#5F1618] text-center items-center">
            <div className="px-1 sm:px-3">
              <div className="text-sm xs:text-base sm:text-2xl lg:text-3xl font-black font-display text-[#FFC5DC] leading-tight">
                {siteConfig.trustStats[0]?.value || '14,800+'}
              </div>
              <div className="text-[0.6rem] sm:text-xs text-[#D4E2DF] font-medium mt-0.5 truncate">
                Learners Trained
              </div>
            </div>

            <div className="px-1 sm:px-3">
              <div className="text-sm xs:text-base sm:text-2xl lg:text-3xl font-black font-display text-[#FFC5DC] leading-tight">
                {siteConfig.trustStats[1]?.value || '98.4%'}
              </div>
              <div className="text-[0.6rem] sm:text-xs text-[#D4E2DF] font-medium mt-0.5 truncate">
                RTO Pass Rate
              </div>
            </div>

            <div className="px-1 sm:px-3">
              <div className="text-sm xs:text-base sm:text-2xl lg:text-3xl font-black font-display text-[#FFC5DC] leading-tight">
                {siteConfig.trustStats[2]?.value || '35+'}
              </div>
              <div className="text-[0.6rem] sm:text-xs text-[#D4E2DF] font-medium mt-0.5 truncate">
                Top Mentors
              </div>
            </div>

            <div className="px-1 sm:px-3">
              <div className="text-sm xs:text-base sm:text-2xl lg:text-3xl font-black font-display text-[#FFC5DC] leading-tight">
                {siteConfig.trustStats[3]?.value || '100%'}
              </div>
              <div className="text-[0.6rem] sm:text-xs text-[#D4E2DF] font-medium mt-0.5 truncate">
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
            <div key={item.id || idx} className="w-[78vw] max-w-[300px] shrink-0 snap-center md:w-auto md:max-w-none p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-[#D4E2DF] shadow-xs space-y-2 sm:space-y-3 flex flex-col justify-between hover-lift">
              <div>
                <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center font-bold mb-2 bg-[#FDF2F5] text-[#BC2639]">
                  {idx === 0 ? <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" /> : idx === 1 ? <Award className="w-5 h-5 sm:w-6 sm:h-6" /> : <Compass className="w-5 h-5 sm:w-6 sm:h-6" />}
                </div>
                <h3 className="text-sm sm:text-base font-bold font-display text-[#39340F]">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#404D68] leading-relaxed mt-1">
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
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 mb-4 sm:mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#BC2639] mb-1">
              <Award className="w-3.5 h-3.5 text-[#BC2639]" />
              MoRTH Certified Safety Mentors
            </div>
            <h2 className="text-lg sm:text-2xl font-bold font-display text-[#39340F] tracking-tight">
              Learn From Patient, Background-Verified Instructors
            </h2>
          </div>

          <Link
            to="/instructors"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#BC2639] hover:text-[#5F1618] underline shrink-0 transition-colors"
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
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 mb-3 sm:mb-6">
          <h2 className="text-lg sm:text-2xl font-bold font-display text-[#39340F] tracking-tight">
            6-Step Licence Roadmap
          </h2>

          <Link
            to="/roadmap"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#BC2639] hover:text-[#5F1618] underline shrink-0 transition-colors"
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
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 mb-3 sm:mb-6">
          <h2 className="text-lg sm:text-2xl font-bold font-display text-[#39340F] tracking-tight">
            Student Reviews & Stories
          </h2>

          <Link
            to="/testimonials"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#BC2639] hover:text-[#5F1618] underline shrink-0 transition-colors"
          >
            Read All Reviews ({testimonials.length}+) →
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
        <div className="flex items-center justify-center gap-1.5 pt-1.5 text-[0.68rem] text-[#404D68] md:hidden">
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
        <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#2D0A14] via-[#481320] to-[#1E060D] text-white p-6 sm:p-10 lg:p-12 border border-[#BC2639]/30 shadow-2xl overflow-hidden flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-8">
          {/* Ambient Flowing Light Glow Orbs */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#BC2639]/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-[#FFC5DC]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-1.5 sm:space-y-2 text-center md:text-left max-w-xl">
            <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold font-display text-white tracking-tight">
              Ready to Start Your Driving Lessons?
            </h2>

            <p className="text-xs sm:text-sm text-[#FFC5DC]/90 leading-relaxed">
              Doorstep pickup, zero-stall training, and patient mentors. Enquire online or chat with our admissions team on WhatsApp.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 shrink-0 w-full md:w-auto">
            <Button
              variant="primary"
              size="lg"
              onClick={() => onOpenBooking()}
              className="w-full sm:w-auto justify-center shadow-lg text-xs sm:text-sm py-2.5 sm:py-3 hover-lift"
              icon={<Sparkles className="w-4 h-4 text-[#FFC5DC]" />}
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
