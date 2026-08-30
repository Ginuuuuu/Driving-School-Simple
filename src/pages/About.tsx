import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Heart, CheckCircle2, Sliders, Compass, Sparkles, Users } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { SectionHeading } from '../components/common/SectionHeading';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Button } from '../components/common/Button';
import { SEO } from '../components/common/SEO';

export const About: React.FC = () => {
  const { siteData } = useContent();
  const { about, siteConfig } = siteData;
  const { onOpenBooking } = useOutletContext<{ onOpenBooking: (courseSlug?: string) => void }>();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-10 space-y-10 sm:space-y-16 lg:space-y-24">
      <SEO
        title="About Our Academy & Safety Philosophy"
        description="Learn about DriveCraft Motor Academy's mission to transform Indian drivers through dual-control safety cars, patient certified instructors, and structured muscle memory training."
        canonicalPath="/about"
      />

      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'About Us' }]} />

      {/* Hero Story Section */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center"
      >
        <div className="lg:col-span-7 space-y-3 sm:space-y-4">
          <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold font-display text-slate-900 tracking-tight leading-tight">
            {about.missionHeadline}
          </h1>

          <p className="text-xs sm:text-base text-slate-600 leading-relaxed">
            {about.missionBody}
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <Button variant="primary" size="md" onClick={() => onOpenBooking()} className="text-xs sm:text-base py-2.5 sm:py-3 hover-lift">
              Book a Lesson With Us
            </Button>
            <Button variant="outline" size="md" to="/instructors" className="text-xs sm:text-base py-2.5 sm:py-3 hover-lift">
              Meet Our Mentors
            </Button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-5 relative"
        >
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl border border-slate-200 bg-white">
            <img
              src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80"
              alt="DriveCraft training fleet and certified mentors"
              className="w-full h-64 sm:h-96 object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Safety Pledge Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.45 }}
        className="bg-slate-900 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-12 lg:p-16 border border-slate-800 shadow-xl space-y-6 sm:space-y-8"
      >
        <div className="max-w-3xl space-y-1.5 sm:space-y-2">
          <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold font-display text-white tracking-tight">
            Our 5-Point Safety & Dignity Pledge
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            We hold ourselves to the highest standards of safety, instructor empathy, and student respect in the country.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-4 text-xs sm:text-sm text-slate-300">
          {about.safetyPledge.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-800/60 border border-slate-700/60 hover-lift-subtle transition-all">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span className="leading-relaxed text-[0.75rem] sm:text-sm">{item}</span>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Fleet Standards Grid */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.45 }}
        className="space-y-4 sm:space-y-6"
      >
        <div className="space-y-0.5">
          <h2 className="text-lg sm:text-2xl font-bold font-display text-slate-900 tracking-tight">
            Engineered for Safety & Precision
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            All training vehicles are maintained to stringent safety benchmarks.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {about.fleetStandards.map((std, idx) => (
            <div key={idx} className="p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-xs space-y-1.5 sm:space-y-2 hover-lift">
              <div className="text-xl sm:text-2xl font-black font-display text-emerald-600">
                {std.metric}
              </div>
              <h3 className="text-sm sm:text-base font-bold font-display text-slate-900">
                {std.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {std.description}
              </p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Vision Statement */}
      <motion.section
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.45 }}
        className="bg-emerald-50/60 rounded-2xl sm:rounded-3xl p-5 sm:p-12 border border-emerald-200 text-center max-w-4xl mx-auto space-y-3 sm:space-y-4 shadow-sm"
      >
        <h2 className="text-xl sm:text-3xl font-extrabold font-display text-slate-900">
          {about.visionHeadline}
        </h2>
        <p className="text-xs sm:text-base text-slate-700 leading-relaxed max-w-2xl mx-auto">
          {about.visionBody}
        </p>
        <div className="pt-2 sm:pt-4">
          <Button variant="primary" size="md" onClick={() => onOpenBooking()} className="text-xs sm:text-base py-2.5 sm:py-3 hover-lift">
            Start Your Journey With Us
          </Button>
        </div>
      </motion.section>
    </div>
  );
};
