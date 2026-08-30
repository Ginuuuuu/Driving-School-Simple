import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, Clock, CheckCircle2, Car } from 'lucide-react';
import { EnquiryForm } from '../components/forms/EnquiryForm';
import { SEO } from '../components/common/SEO';

export const Book: React.FC = () => {
  const [searchParams] = useSearchParams();
  const courseParam = searchParams.get('course') || undefined;
  const instructorParam = searchParams.get('instructor') || undefined;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-10 space-y-6 sm:space-y-10">
      <SEO
        title="Book a Driving Lesson | Online Lesson Enquiry Studio"
        description="Book your driving lessons online with DriveCraft Motor Academy. Doorstep pickup, dual-control safety cars, and patient certified mentors."
        canonicalPath="/book"
      />

      <div className="space-y-1">
        <h1 className="text-lg sm:text-2xl font-bold font-display text-slate-900 tracking-tight">
          Book a Driving Lesson
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Complete the details below for instant scheduling with doorstep pickup and zero advance payment.
        </p>
      </div>

      {/* Main Form Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="p-3.5 sm:p-10 bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xs"
      >
        <EnquiryForm
          preselectedCourseSlug={courseParam}
          preselectedInstructorId={instructorParam}
        />
      </motion.div>

      {/* Trust Guarantee Cards */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 text-center"
      >
        <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1 hover-lift">
          <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 mx-auto" />
          <h4 className="text-xs font-bold text-slate-900">100% Dual-Control</h4>
          <p className="text-[0.65rem] sm:text-[0.7rem] text-slate-500">Secondary instructor safety pedals</p>
        </div>

        <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1 hover-lift">
          <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 mx-auto" />
          <h4 className="text-xs font-bold text-slate-900">Flexible Scheduling</h4>
          <p className="text-[0.65rem] sm:text-[0.7rem] text-slate-500">Daily 1-hour slots from 6 AM to 8 PM</p>
        </div>

        <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1 hover-lift">
          <Car className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 mx-auto" />
          <h4 className="text-xs font-bold text-slate-900">Doorstep Pickup</h4>
          <p className="text-[0.65rem] sm:text-[0.7rem] text-slate-500">Directly from your home or office</p>
        </div>
      </motion.div>
    </div>
  );
};
