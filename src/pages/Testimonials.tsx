import React, { useState, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ShieldCheck, CheckCircle2, MessageSquare, Sparkles } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { TestimonialCard } from '../components/cards/TestimonialCard';
import { Button } from '../components/common/Button';
import { SEO } from '../components/common/SEO';

import { defaultTestimonials } from '../content/testimonials';

export const Testimonials: React.FC = () => {
  const { siteData } = useContent();
  const testimonials = siteData?.testimonials || defaultTestimonials;
  const { onOpenBooking } = useOutletContext<{ onOpenBooking: (courseSlug?: string) => void }>();

  const [selectedTag, setSelectedTag] = useState<string>('all');

  const allTags = useMemo(() => {
    const set = new Set<string>();
    testimonials.forEach((t) => set.add(t.tag));
    return Array.from(set);
  }, [testimonials]);

  const filteredTestimonials = useMemo(() => {
    if (selectedTag === 'all') return testimonials;
    return testimonials.filter((t) => t.tag === selectedTag);
  }, [testimonials, selectedTag]);

  return (
    <div className="site-container py-4 sm:py-10 space-y-6 sm:space-y-12">
      <SEO
        title="Student Reviews & First-Attempt Pass Stories"
        description="Read authentic learner reviews from nervous first-timers, working professionals, and seniors who gained safe lifelong driving confidence."
        canonicalPath="/testimonials"
      />

      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold font-display text-[#202B33] tracking-tight">
          Student Reviews & Testimonials
        </h1>
      </div>

      {/* Filter Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1 sm:p-1.5 bg-[#F5F6F7] border border-[#E5E7EB] rounded-xl sm:rounded-2xl max-w-2xl mx-auto text-[0.7rem] sm:text-xs font-bold"
      >
        <button
          onClick={() => setSelectedTag('all')}
          className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl transition-all ${
            selectedTag === 'all' ? 'bg-white text-[#202B33] border border-[#E5E7EB] shadow-xs' : 'text-[#6B7280] hover:text-[#082B4C]'
          }`}
        >
          All ({testimonials.length})
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl transition-all ${
              selectedTag === tag ? 'bg-white text-[#202B33] border border-[#E5E7EB] shadow-xs' : 'text-[#6B7280] hover:text-[#082B4C]'
            }`}
          >
            {tag}
          </button>
        ))}
      </motion.div>

      {/* Testimonials Grid with Staggered Motion */}
      <motion.div
        layout
<<<<<<< HEAD
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-stretch"
=======
        className="cards-grid-centered"
>>>>>>> f9da9236e7e30d399b1b7cf1d862c30139c4c05e
      >
        <AnimatePresence mode="popLayout">
          {filteredTestimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
<<<<<<< HEAD
              className="h-full flex flex-col"
=======
              className="card-col-4"
>>>>>>> f9da9236e7e30d399b1b7cf1d862c30139c4c05e
            >
              <TestimonialCard testimonial={testimonial} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* CTA Box */}
      <motion.section
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.45 }}
        className="relative overflow-hidden rounded-2xl sm:rounded-3xl p-6 sm:p-12 text-center max-w-3xl mx-auto bg-gradient-to-br from-[#082B4C] via-[#061F36] to-[#041424] border border-white/10 text-white space-y-3 sm:space-y-4 shadow-2xl"
      >
        {/* Ambient Flowing Light Glow Orbs */}
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#F4C400]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#082B4C]/30 rounded-full blur-3xl pointer-events-none" />

        <h2 className="relative z-10 text-xl sm:text-3xl font-bold font-display text-white">
          Ready to Write Your Own Driving Success Story?
        </h2>
        <p className="relative z-10 text-xs sm:text-sm text-slate-200 max-w-xl mx-auto leading-relaxed">
          Start with a zero-pressure trial lesson. Doorstep pickup, dual-control safety, and patient certified mentors.
        </p>
        <div className="relative z-10 pt-2">
          <Button
            variant="primary"
            size="md"
            onClick={() => onOpenBooking()}
            className="text-xs sm:text-sm py-2.5 sm:py-3 hover-lift shadow-lg"
            icon={<Sparkles className="w-4 h-4 text-[#082B4C]" />}
          >
            Book Your First Lesson
          </Button>
        </div>
      </motion.section>
    </div>
  );
};
