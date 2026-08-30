import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Clock, ArrowRight, Award, Compass, Shield } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { SectionHeading } from '../components/common/SectionHeading';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Badge } from '../components/common/Badge';
import { SEO } from '../components/common/SEO';

export const Resources: React.FC = () => {
  const { siteData } = useContent();
  const { resources } = siteData;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-10 space-y-6 sm:space-y-12">
      <SEO
        title="Driving Resources, Road Signs & RTO Guides"
        description="Free educational resources on Indian road signs, parallel parking formulas, automated test track secrets, and defensive driving techniques."
        canonicalPath="/resources"
      />

      <div className="space-y-1">
        <Breadcrumbs items={[{ label: 'Resources & Guides' }]} />
        <h1 className="text-lg sm:text-2xl font-bold font-display text-slate-900 tracking-tight">
          Road Safety & Driving Guides
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Practical cheatsheets and technical advice written by our senior instructors.
        </p>
      </div>

      {/* Guides Grid with Staggered Entrance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-8"
      >
        {resources.map((guide, idx) => (
          <motion.div
            key={guide.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: idx * 0.08 }}
            className="p-3.5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-xs hover:shadow-md hover-lift transition-all flex flex-col justify-between space-y-3 sm:space-y-4"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3">
                <Badge variant="emerald" size="sm">
                  {guide.category}
                </Badge>
                <span className="text-[0.7rem] sm:text-xs text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {guide.readTimeMinutes} min read
                </span>
              </div>

              <h2 className="text-base sm:text-xl font-bold font-display text-slate-900 leading-snug">
                <Link to={`/resources/${guide.slug}`} className="hover:text-emerald-700 transition-colors">
                  {guide.title}
                </Link>
              </h2>

              <p className="mt-1.5 sm:mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                {guide.summary}
              </p>

              {/* Key Takeaway Bullet preview */}
              <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-slate-100 space-y-1 sm:space-y-1.5">
                <span className="text-[0.65rem] sm:text-[0.7rem] uppercase font-bold text-slate-500 tracking-wider">
                  Highlights:
                </span>
                <ul className="text-xs text-slate-700 space-y-1">
                  {guide.keyTakeaways.slice(0, 2).map((takeaway, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                      <span className="line-clamp-1 text-[0.72rem] sm:text-xs">{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-1.5 sm:pt-2">
              <Link
                to={`/resources/${guide.slug}`}
                className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
              >
                Read Complete Guide →
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
