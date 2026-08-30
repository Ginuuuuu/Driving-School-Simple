import React, { useState, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ShieldCheck, CheckCircle2, MessageSquare, Sparkles } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { TestimonialCard } from '../components/cards/TestimonialCard';
import { Button } from '../components/common/Button';
import { SEO } from '../components/common/SEO';

export const Testimonials: React.FC = () => {
  const { siteData } = useContent();
  const { testimonials } = siteData;
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-10 space-y-6 sm:space-y-12">
      <SEO
        title="Student Reviews & First-Attempt Pass Stories"
        description="Read authentic learner reviews from nervous first-timers, working professionals, and seniors who gained safe lifelong driving confidence."
        canonicalPath="/testimonials"
      />

      <div className="space-y-1">
        <h1 className="text-lg sm:text-2xl font-bold font-display text-slate-900 tracking-tight">
          Student Reviews & Testimonials
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Real stories and experiences from learners who mastered driving with our mentors.
        </p>
      </div>

      {/* Filter Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1 sm:p-1.5 bg-slate-100 rounded-xl sm:rounded-2xl max-w-2xl mx-auto text-[0.7rem] sm:text-xs font-bold"
      >
        <button
          onClick={() => setSelectedTag('all')}
          className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl transition-all ${
            selectedTag === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          All ({testimonials.length})
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl transition-all ${
              selectedTag === tag ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {tag}
          </button>
        ))}
      </motion.div>

      {/* Testimonials Grid with Staggered Motion */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-8"
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
        className="bg-slate-900 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-12 text-center max-w-3xl mx-auto border border-slate-800 space-y-3 sm:space-y-4 shadow-xl"
      >
        <h2 className="text-xl sm:text-3xl font-bold font-display text-white">
          Ready to Write Your Own Driving Success Story?
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Start with a zero-pressure trial lesson. Doorstep pickup, dual-control safety, and patient certified mentors.
        </p>
        <div className="pt-2">
          <Button
            variant="amber"
            size="md"
            onClick={() => onOpenBooking()}
            className="text-xs sm:text-sm py-2.5 sm:py-3 hover-lift"
            icon={<Sparkles className="w-4 h-4 text-slate-950" />}
          >
            Book Your First Lesson
          </Button>
        </div>
      </motion.section>
    </div>
  );
};
