import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useContent } from '../context/ContentContext';
import { InstructorCard } from '../components/cards/InstructorCard';
import { SEO } from '../components/common/SEO';

import { defaultInstructors } from '../content/instructors';

export const Instructors: React.FC = () => {
  const { siteData } = useContent();
  const instructors = siteData?.instructors || defaultInstructors;
  const { onOpenBooking } = useOutletContext<{ onOpenBooking: (courseSlug?: string, instructorId?: string) => void }>();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-10 space-y-6 sm:space-y-10">
      <SEO
        title="Meet Our Certified Driving Instructors"
        description="Learn with patient, certified male and female driving instructors with over 10+ years of experience across Hindi, English, and regional languages."
        canonicalPath="/instructors"
      />

      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold font-display text-[#202B33] tracking-tight">
          Certified Driving Instructors
        </h1>
      </div>

      {/* Instructors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-stretch">
        {instructors.map((inst, idx) => (
          <motion.div
            key={inst.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className="h-full flex flex-col"
          >
            <InstructorCard
              instructor={inst}
              onSelectInstructor={(id) => onOpenBooking(undefined, id)}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
