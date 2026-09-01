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

export const Roadmap: React.FC = () => {
  const { siteData } = useContent();
  const { roadmap } = siteData;
  const { onOpenBooking } = useOutletContext<{ onOpenBooking: (courseSlug?: string) => void }>();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-6 sm:space-y-8 lg:space-y-10">
      <SEO
        title="How to Get Your Driving Licence in India | Step-by-Step RTO Roadmap"
        description="Comprehensive official guide to the Indian driving licence process: Sarathi Parivahan LL application, theory test, 30-day dual-control training, and automated ADTT track tests."
        canonicalPath="/roadmap"
      />

      {/* Page Header */}
      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold font-display text-slate-900 tracking-tight">
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
        className="bg-slate-900 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-10 border border-slate-800 space-y-4 sm:space-y-6 shadow-xl"
      >
        <div className="flex items-center gap-2 text-amber-400 font-bold text-[0.7rem] sm:text-xs uppercase tracking-wider">
          <Award className="w-4 h-4" />
          Camera-Monitored Automated Test Tracks (ADTT)
        </div>

        <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold font-display text-white">
          Why 70% of Self-Learners Fail the Automated Camera Track
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
          Unlike manual driving tests of the past where an inspector sat inside, modern Indian RTOs use automated electronic sensors and high-speed overhead cameras. Touching a sensor pole on the Figure-8 or rolling back on the gradient slope results in an immediate computerized disqualification.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-4 pt-1 sm:pt-2">
          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-800/70 border border-slate-700 space-y-1 hover-lift-subtle transition-all">
            <h3 className="text-xs sm:text-sm font-bold text-emerald-400">Figure "8" Track</h3>
            <p className="text-[0.72rem] sm:text-xs text-slate-300">
              Evaluates steering lock timing and constant creep speed without touching yellow boundary lines.
            </p>
          </div>

          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-800/70 border border-slate-700 space-y-1 hover-lift-subtle transition-all">
            <h3 className="text-xs sm:text-sm font-bold text-amber-400">"H" Box Parking</h3>
            <p className="text-[0.72rem] sm:text-xs text-slate-300">
              Forward entry and tight reverse parking into parallel bay without halting or extra turns.
            </p>
          </div>

          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-800/70 border border-slate-700 space-y-1 hover-lift-subtle transition-all">
            <h3 className="text-xs sm:text-sm font-bold text-blue-400">Gradient Slope Stop & Go</h3>
            <p className="text-[0.72rem] sm:text-xs text-slate-300">
              Stop on a 15-degree slope and restart within 10 seconds with less than 2 inches of rollback.
            </p>
          </div>
        </div>
      </motion.section>

      {/* RTO State Nuances Disclaimer */}
      <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-2.5 sm:gap-3.5 text-xs text-amber-950">
        <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-0.5 sm:space-y-1">
          <h4 className="font-bold text-xs sm:text-sm">Important State & RTO Notice:</h4>
          <p className="leading-relaxed text-[0.72rem] sm:text-xs text-amber-900">
            While the Motor Vehicles Act is a central legislation, specific slot fees, automated track layouts, and appointment wait times vary slightly across states (e.g. Delhi, Maharashtra, Karnataka, Tamil Nadu). DriveCraft instructors assist you with the specific procedures applicable to your local RTO zone.
          </p>
        </div>
      </div>
    </div>
  );
};
