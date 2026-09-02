import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Heart, CheckCircle2, Sliders, Compass, Sparkles, Users } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { Button } from '../components/common/Button';
import { SEO } from '../components/common/SEO';

import { defaultAbout } from '../content/about';
import { defaultSiteConfig } from '../content/siteConfig';

export const About: React.FC = () => {
  const { siteData } = useContent();
  const about = siteData?.about || defaultAbout;
  const siteConfig = siteData?.siteConfig || defaultSiteConfig;
  const { onOpenBooking } = useOutletContext<{ onOpenBooking: (courseSlug?: string) => void }>();

  return (
    <div className="site-container py-4 sm:py-10 space-y-10 sm:space-y-16 lg:space-y-24">
      <SEO
        title="About Our Academy & Safety Philosophy"
        description="Learn about DriveCraft Motor Academy's mission to transform Indian drivers through dual-control safety cars, patient certified instructors, and structured muscle memory training."
        canonicalPath="/about"
      />

      {/* Hero Story Section */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center"
      >
        <div className="lg:col-span-7 space-y-4 sm:space-y-6">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#202B33] tracking-tight leading-tight">
            {about.missionHeadline}
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-[#6B7280] leading-relaxed">
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
          className="lg:col-span-5 relative w-full"
        >
          <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[1.15/1] w-full min-h-[300px] sm:min-h-[360px] lg:min-h-[400px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl border border-[#E5E7EB] bg-white">
            <img
              src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80"
              alt="DriveCraft training fleet and certified mentors"
<<<<<<< HEAD
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
=======
              className="w-full h-64 sm:h-80 md:h-96 lg:h-[460px] xl:h-[500px] object-cover transition-transform duration-700 hover:scale-105"
>>>>>>> f9da9236e7e30d399b1b7cf1d862c30139c4c05e
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Safety Pledge Section — Flowing Deep Navy Gradient with Glass Cards */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.45 }}
        className="relative overflow-hidden rounded-2xl sm:rounded-3xl p-6 sm:p-12 lg:p-16 bg-gradient-to-br from-[#082B4C] via-[#061F36] to-[#041424] border border-white/10 text-white shadow-2xl space-y-6 sm:space-y-8"
      >
        {/* Ambient Flowing Light Glow Orbs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#F4C400]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#082B4C]/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[0.7rem] sm:text-xs font-bold uppercase tracking-wider text-[#F4C400]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#F4C400]" />
            <span>Safety & Dignity Guarantee</span>
          </div>
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold font-display text-white tracking-tight">
            Our 5-Point Safety & Dignity Pledge
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            We hold ourselves to the highest standards of safety, instructor empathy, and student respect in the country.
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 lg:gap-5 items-stretch text-xs sm:text-sm text-white">
          {about.safetyPledge.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white/[0.08] backdrop-blur-md border border-white/15 hover:bg-white/[0.14] hover:border-[#F4C400]/40 hover-lift-subtle transition-all h-full"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#F4C400]/20 border border-[#F4C400]/40 flex items-center justify-center shrink-0 mt-0.5 text-[#F4C400]">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#F4C400]" />
              </div>
              <span className="leading-relaxed text-[0.78rem] sm:text-sm font-medium text-slate-100 pt-0.5">{item}</span>
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
        <div>
          <h2 className="text-lg sm:text-2xl font-bold font-display text-[#202B33] tracking-tight">
            Engineered for Safety & Precision
          </h2>
        </div>

<<<<<<< HEAD
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 items-stretch">
          {about.fleetStandards.map((std, idx) => (
            <div key={idx} className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-[#E5E7EB] shadow-xs space-y-2 flex flex-col justify-between hover-lift h-full">
              <div>
                <div className="text-xl sm:text-2xl font-black font-display text-[#082B4C]">
                  {std.metric}
                </div>
                <h3 className="text-sm sm:text-base font-bold font-display text-[#202B33] mt-1">
                  {std.title}
                </h3>
              </div>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                {std.description}
              </p>
=======
        <div className="cards-grid-centered">
          {about.fleetStandards.map((std, idx) => (
            <div key={idx} className="card-col-4">
              <div className="w-full h-full p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl bg-white border border-[#E5E7EB] shadow-xs space-y-2 sm:space-y-3 hover-lift">
                <div className="text-2xl sm:text-3xl font-black font-display text-[#082B4C]">
                  {std.metric}
                </div>
                <h3 className="text-base sm:text-lg font-bold font-display text-[#202B33]">
                  {std.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                  {std.description}
                </p>
              </div>
>>>>>>> f9da9236e7e30d399b1b7cf1d862c30139c4c05e
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
        className="bg-[#F5F6F7] rounded-2xl sm:rounded-3xl p-6 sm:p-12 lg:p-16 border border-[#E5E7EB] text-center max-w-5xl xl:max-w-6xl mx-auto space-y-3 sm:space-y-5 shadow-sm"
      >
        <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold font-display text-[#202B33]">
          {about.visionHeadline}
        </h2>
        <p className="text-xs sm:text-base lg:text-lg text-[#6B7280] leading-relaxed max-w-3xl mx-auto">
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
