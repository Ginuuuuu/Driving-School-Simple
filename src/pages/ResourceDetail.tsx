import React from 'react';
import { useParams, Link, Navigate, useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, CheckCircle2, ArrowLeft, Sparkles, BookOpen } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { SEO } from '../components/common/SEO';

import { defaultResources } from '../content/resources';

export const ResourceDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { siteData } = useContent();
  const resources = siteData?.resources || defaultResources;
  const { onOpenBooking } = useOutletContext<{ onOpenBooking: (courseSlug?: string) => void }>();

  const guide = resources.find((r) => r.slug === slug);

  if (!guide) {
    return <Navigate to="/resources" replace />;
  }

  return (
    <div className="site-container max-w-4xl lg:max-w-5xl py-6 sm:py-10 space-y-10">
      <SEO
        title={guide.title}
        description={guide.summary}
        canonicalPath={`/resources/${guide.slug}`}
      />

      {/* Article Header */}
      <motion.header
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-3">
          <Badge variant="emerald" size="sm">
            {guide.category}
          </Badge>
          <span className="text-xs text-[#6B7280] flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#082B4C]" />
            {guide.readTimeMinutes} min read • Published {guide.publishDate}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold font-display text-[#202B33] leading-tight">
          {guide.title}
        </h1>

        <p className="text-sm sm:text-base text-[#202B33] leading-relaxed border-l-4 border-[#082B4C] pl-4 py-1 italic bg-[#F5F6F7] rounded-r-xl">
          {guide.summary}
        </p>
      </motion.header>

      {/* Key Takeaways Box */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#082B4C] via-[#061F36] to-[#041424] text-white border border-white/10 space-y-3 shadow-xl"
      >
        <div className="absolute -top-16 -right-16 w-60 h-60 bg-[#F4C400]/15 rounded-full blur-2xl pointer-events-none" />
        <h2 className="relative z-10 text-sm uppercase tracking-wider font-bold text-[#F4C400]">
          Key Takeaways & Golden Rules:
        </h2>
        <ul className="relative z-10 space-y-2 text-xs sm:text-sm text-slate-100">
          {guide.keyTakeaways.map((takeaway, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#F4C400] mt-0.5 shrink-0" />
              <span className="leading-relaxed">{takeaway}</span>
            </li>
          ))}
        </ul>
      </motion.section>

      {/* Article Body Sections */}
      <div className="space-y-8 text-[#202B33] leading-relaxed">
        {guide.sections.map((section, idx) => (
          <motion.section
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.4 }}
            className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs space-y-3 hover-lift-subtle transition-all"
          >
            <h2 className="text-lg sm:text-xl font-bold font-display text-[#202B33]">
              {section.heading}
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
              {section.content}
            </p>
          </motion.section>
        ))}
      </div>

      {/* Booking CTA Callout */}
      <motion.section
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.4 }}
        className="p-8 rounded-3xl bg-[#F5F6F7] border border-[#E5E7EB] text-center space-y-3 shadow-xs"
      >
        <h3 className="text-xl font-bold font-display text-[#202B33]">
          Want to Practice This with a Certified Mentor?
        </h3>
        <p className="text-xs sm:text-sm text-[#6B7280] max-w-md mx-auto">
          Our dual-control cars and patient instructors help you apply these theories into muscle memory on real roads.
        </p>
        <div className="pt-2">
          <Button variant="primary" size="md" onClick={() => onOpenBooking()} className="hover-lift">
            Book a Practical Lesson
          </Button>
        </div>
      </motion.section>
    </div>
  );
};
