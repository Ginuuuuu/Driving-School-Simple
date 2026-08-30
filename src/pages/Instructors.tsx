import React, { useState, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Globe, ShieldCheck, Star, Users } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { InstructorCard } from '../components/cards/InstructorCard';
import { SEO } from '../components/common/SEO';

export const Instructors: React.FC = () => {
  const { siteData } = useContent();
  const { instructors } = siteData;
  const { onOpenBooking } = useOutletContext<{ onOpenBooking: (courseSlug?: string, instructorId?: string) => void }>();

  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [selectedTransmission, setSelectedTransmission] = useState<string>('all');

  const allLanguages = useMemo(() => {
    const langs = new Set<string>();
    instructors.forEach((i) => i.languages.forEach((l) => langs.add(l)));
    return Array.from(langs);
  }, [instructors]);

  const filteredInstructors = useMemo(() => {
    return instructors.filter((inst) => {
      const matchLang =
        selectedLanguage === 'all' || inst.languages.includes(selectedLanguage);
      const matchTrans =
        selectedTransmission === 'all' ||
        inst.transmissionSpecialty === selectedTransmission ||
        inst.transmissionSpecialty === 'both';
      return matchLang && matchTrans;
    });
  }, [instructors, selectedLanguage, selectedTransmission]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-10 space-y-6 sm:space-y-12">
      <SEO
        title="Meet Our Certified Driving Instructors"
        description="Learn with patient, certified male and female driving instructors with over 10+ years of experience across Hindi, English, and regional languages."
        canonicalPath="/instructors"
      />

      <div className="space-y-1">
        <Breadcrumbs items={[{ label: 'Instructors' }]} />
        <h1 className="text-lg sm:text-2xl font-bold font-display text-slate-900 tracking-tight">
          Certified Driving Instructors
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Patient, verified male & female instructors with a zero-shouting guarantee.
        </p>
      </div>

      {/* Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="p-3.5 sm:p-6 bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4"
      >
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
          {/* Language filter */}
          <div className="flex-1 sm:flex-initial">
            <label className="text-[0.65rem] sm:text-[0.7rem] uppercase font-bold text-slate-500 block mb-1">
              Language Preference:
            </label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full sm:w-auto px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white transition-all"
            >
              <option value="all">All Languages</option>
              {allLanguages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          {/* Transmission filter */}
          <div className="flex-1 sm:flex-initial">
            <label className="text-[0.65rem] sm:text-[0.7rem] uppercase font-bold text-slate-500 block mb-1">
              Transmission Specialty:
            </label>
            <select
              value={selectedTransmission}
              onChange={(e) => setSelectedTransmission(e.target.value)}
              className="w-full sm:w-auto px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white transition-all"
            >
              <option value="all">All Transmissions</option>
              <option value="manual">Manual Transmission</option>
              <option value="automatic">Automatic (AT/CVT)</option>
            </select>
          </div>
        </div>

        <div className="text-[0.72rem] sm:text-xs text-slate-500 self-start sm:self-center">
          Showing <span className="font-bold text-slate-900">{filteredInstructors.length}</span> instructors
        </div>
      </motion.div>

      {/* Instructors Grid with Staggered Entrance */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredInstructors.map((inst, idx) => (
            <motion.div
              key={inst.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
            >
              <InstructorCard
                instructor={inst}
                onSelectInstructor={(id) => onOpenBooking(undefined, id)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
