import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Award,
  AlertTriangle,
} from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { RoadmapSection } from '../components/roadmap/RoadmapSection';
import { Button } from '../components/common/Button';
import { SEO } from '../components/common/SEO';

import { defaultRoadmap } from '../content/roadmap';

export const Roadmap: React.FC = () => {
  const { siteData } = useContent();
  const roadmap = siteData?.roadmap || defaultRoadmap;
  const { onOpenBooking } = useOutletContext<{ onOpenBooking: (courseSlug?: string) => void }>();

  return (
    <div className="site-container py-4 sm:py-8 space-y-8 sm:space-y-12 lg:space-y-16">
      <SEO
        title="How to Get Your Driving Licence in India | Step-by-Step RTO Roadmap"
        description="Comprehensive official guide to the Indian driving licence process: Sarathi Parivahan LL application, theory test, 30-day dual-control training, and automated ADTT track tests."
        canonicalPath="/roadmap"
      />

      {/* Page Header */}
      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold font-display text-[#202B33] tracking-tight">
          Indian Driving Licence Roadmap
        </h1>
      </div>

      {/* Interactive Roadmap Simulator (Desktop & Mobile) */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.45 }}
        className="w-full"
      >
        <RoadmapSection steps={roadmap} onOpenBookingModal={() => onOpenBooking()} />
      </motion.section>

      {/* RTO ADTT Automated Track Guide Callout */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.45 }}
        className="relative overflow-hidden rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 bg-gradient-to-br from-[#082B4C] via-[#061F36] to-[#041424] border border-white/10 text-white shadow-2xl space-y-4 sm:space-y-6"
      >
        {/* Ambient Flowing Light Glow Orbs */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#F4C400]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#082B4C]/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex items-center gap-2 text-[#F4C400] font-bold text-[0.7rem] sm:text-xs uppercase tracking-wider">
          <Award className="w-4 h-4 text-[#F4C400]" />
          Camera-Monitored Automated Test Tracks (ADTT)
        </div>

        <h2 className="relative z-10 text-lg sm:text-2xl lg:text-3xl font-bold font-display text-white">
          Why 70% of Self-Learners Fail the Automated Camera Track
        </h2>

        <p className="relative z-10 text-xs sm:text-sm text-slate-200 leading-relaxed max-w-3xl">
          Unlike manual driving tests of the past where an inspector sat inside, modern Indian RTOs use automated electronic sensors and high-speed overhead cameras. Touching a sensor pole on the Figure-8 or rolling back on the gradient slope results in an immediate computerized disqualification.
        </p>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 pt-1 sm:pt-2 items-stretch">
          <div className="p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl bg-white/[0.08] backdrop-blur-md border border-white/15 hover:bg-white/[0.14] hover:border-[#F4C400]/40 space-y-1.5 hover-lift-subtle transition-all h-full flex flex-col justify-between">
            <div>
              <h3 className="text-xs sm:text-sm lg:text-base font-bold text-[#F4C400]">Figure "8" Track</h3>
              <p className="text-[0.72rem] sm:text-xs text-slate-100 leading-relaxed mt-1">
                Evaluates steering lock timing and constant creep speed without touching yellow boundary lines.
              </p>
            </div>
          </div>

          <div className="p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl bg-white/[0.08] backdrop-blur-md border border-white/15 hover:bg-white/[0.14] hover:border-[#F4C400]/40 space-y-1.5 hover-lift-subtle transition-all h-full flex flex-col justify-between">
            <div>
              <h3 className="text-xs sm:text-sm lg:text-base font-bold text-[#F4C400]">"H" Box Parking</h3>
              <p className="text-[0.72rem] sm:text-xs text-slate-100 leading-relaxed mt-1">
                Forward entry and tight reverse parking into parallel bay without halting or extra turns.
              </p>
            </div>
          </div>

          <div className="p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl bg-white/[0.08] backdrop-blur-md border border-white/15 hover:bg-white/[0.14] hover:border-[#F4C400]/40 space-y-1.5 hover-lift-subtle transition-all h-full flex flex-col justify-between">
            <div>
              <h3 className="text-xs sm:text-sm lg:text-base font-bold text-[#F4C400]">Gradient Slope Stop & Go</h3>
              <p className="text-[0.72rem] sm:text-xs text-slate-100 leading-relaxed mt-1">
                Stop on a 15-degree slope and restart within 10 seconds with less than 2 inches of rollback.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* RTO State Nuances Disclaimer */}
      <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-[#F5F6F7] border border-[#E5E7EB] flex items-start gap-2.5 sm:gap-3.5 text-xs text-[#202B33]">
        <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-[#082B4C] shrink-0 mt-0.5" />
        <div className="space-y-0.5 sm:space-y-1">
          <h4 className="font-bold text-xs sm:text-sm text-[#202B33]">Important State & RTO Notice:</h4>
          <p className="leading-relaxed text-[0.72rem] sm:text-xs text-[#6B7280]">
            While the Motor Vehicles Act is a central legislation, specific slot fees, automated track layouts, and appointment wait times vary slightly across states (e.g. Delhi, Maharashtra, Karnataka, Tamil Nadu). DriveCraft instructors assist you with the specific procedures applicable to your local RTO zone.
          </p>
        </div>
      </div>
    </div>
  );
};
