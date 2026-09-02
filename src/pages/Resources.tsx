import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Clock, ArrowRight, Award, Compass, Shield } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { Badge } from '../components/common/Badge';
import { SEO } from '../components/common/SEO';

import { defaultResources } from '../content/resources';

export const Resources: React.FC = () => {
  const { siteData } = useContent();
  const resources = siteData?.resources || defaultResources;

  return (
    <div className="site-container py-4 sm:py-10 space-y-6 sm:space-y-12">
      <SEO
        title="Driving Resources, Road Signs & RTO Guides"
        description="Free educational resources on Indian road signs, parallel parking formulas, automated test track secrets, and defensive driving techniques."
        canonicalPath="/resources"
      />

      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold font-display text-[#202B33] tracking-tight">
          Road Safety & Driving Guides
        </h1>
      </div>

      {/* Guides Grid with Staggered Entrance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
<<<<<<< HEAD
        className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-stretch"
=======
        className="cards-grid-centered"
>>>>>>> f9da9236e7e30d399b1b7cf1d862c30139c4c05e
      >
        {resources.map((guide, idx) => (
          <motion.div
            key={guide.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: idx * 0.08 }}
<<<<<<< HEAD
            className="h-full flex flex-col"
          >
            <div className="p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border border-[#E5E7EB] shadow-xs hover:shadow-md hover-lift transition-all flex flex-col justify-between space-y-3 sm:space-y-4 h-full">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3">
                <Badge variant="emerald" size="sm">
                  {guide.category}
                </Badge>
                <span className="text-[0.7rem] sm:text-xs text-[#6B7280] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#082B4C]" />
                  {guide.readTimeMinutes} min read
                </span>
=======
            className="card-col-3"
          >
            <div className="w-full h-full p-3.5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border border-[#E5E7EB] shadow-xs hover:shadow-md hover-lift transition-all flex flex-col justify-between space-y-3 sm:space-y-4">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3">
                  <Badge variant="emerald" size="sm">
                    {guide.category}
                  </Badge>
                  <span className="text-[0.7rem] sm:text-xs text-[#6B7280] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#082B4C]" />
                    {guide.readTimeMinutes} min read
                  </span>
                </div>

                <h2 className="text-base sm:text-xl font-bold font-display text-[#202B33] leading-snug">
                  <Link to={`/resources/${guide.slug}`} className="hover:text-[#082B4C] transition-colors">
                    {guide.title}
                  </Link>
                </h2>

                <p className="mt-1.5 sm:mt-2.5 text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                  {guide.summary}
                </p>

                {/* Key Takeaway Bullet preview */}
                <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-[#E5E7EB] space-y-1 sm:space-y-1.5">
                  <span className="text-[0.65rem] sm:text-[0.7rem] uppercase font-bold text-[#6B7280] tracking-wider">
                    Highlights:
                  </span>
                  <ul className="text-xs text-[#202B33] space-y-1">
                    {guide.keyTakeaways.slice(0, 2).map((takeaway, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#082B4C] mt-1.5 shrink-0" />
                        <span className="line-clamp-1 text-[0.72rem] sm:text-xs">{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
>>>>>>> f9da9236e7e30d399b1b7cf1d862c30139c4c05e
              </div>

              <div className="pt-1.5 sm:pt-2">
                <Link
                  to={`/resources/${guide.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#082B4C] hover:text-[#061F36] transition-colors"
                >
                  Read Complete Guide →
                </Link>
              </div>
            </div>
<<<<<<< HEAD

            <div className="pt-1.5 sm:pt-2">
              <Link
                to={`/resources/${guide.slug}`}
                className="inline-flex items-center gap-2 text-xs font-bold text-[#082B4C] hover:text-[#061F36] transition-colors"
              >
                Read Complete Guide →
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
=======
          </motion.div>
        ))}
      </motion.div>
>>>>>>> f9da9236e7e30d399b1b7cf1d862c30139c4c05e
    </div>
  );
};
