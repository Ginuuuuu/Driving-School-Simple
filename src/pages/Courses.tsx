import React, { useState, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Sparkles, Check, Car, Clock } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { CourseCard } from '../components/cards/CourseCard';
import { Button } from '../components/common/Button';
import { SEO } from '../components/common/SEO';

export const Courses: React.FC = () => {
  const { siteData } = useContent();
  const { courses } = siteData;
  const { onOpenBooking } = useOutletContext<{ onOpenBooking: (courseSlug?: string) => void }>();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTransmission, setSelectedTransmission] = useState<string>('all');

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' || course.category === selectedCategory;

      const matchesTransmission =
        selectedTransmission === 'all' ||
        course.transmission === selectedTransmission ||
        course.transmission === 'both';

      return matchesSearch && matchesCategory && matchesTransmission;
    });
  }, [courses, searchQuery, selectedCategory, selectedTransmission]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-10 space-y-6 sm:space-y-12">
      <SEO
        title="Driving Courses & Training Packages"
        description="Explore our comprehensive driving curriculum: Beginner zero-to-hero, Automatic transmission specialist, Refresher confidence, and Highway defensive driving."
        canonicalPath="/courses"
      />

      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold font-display text-slate-900 tracking-tight">
          Driving Courses & Programs
        </h1>
      </div>

      {/* Filter and Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="p-3.5 sm:p-6 bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xs space-y-3 sm:space-y-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 sm:gap-4 items-center">
          {/* Search Box (6 cols) */}
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5 sm:top-3.5" />
            <input
              type="text"
              placeholder="Search courses, parking, highway, RTO..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-3.5 sm:pr-4 py-2 sm:py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
            />
          </div>

          {/* Category Filter (3 cols) */}
          <div className="sm:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white transition-all"
            >
              <option value="all">All Categories</option>
              <option value="beginner">Beginner Complete</option>
              <option value="automatic">Automatic Only</option>
              <option value="refresher">Refresher & Confidence</option>
              <option value="highway_defensive">Highway & Defensive</option>
              <option value="rto_prep">RTO Track Prep</option>
            </select>
          </div>

          {/* Transmission Filter (3 cols) */}
          <div className="sm:col-span-3">
            <select
              value={selectedTransmission}
              onChange={(e) => setSelectedTransmission(e.target.value)}
              className="w-full px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white transition-all"
            >
              <option value="all">All Transmissions</option>
              <option value="manual">Manual Transmission</option>
              <option value="automatic">Automatic Transmission</option>
            </select>
          </div>
        </div>

        {/* Active Filters summary */}
        {(searchQuery || selectedCategory !== 'all' || selectedTransmission !== 'all') && (
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
            <span>
              Showing {filteredCourses.length} of {courses.length} courses
            </span>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedTransmission('all');
              }}
              className="text-emerald-700 font-bold hover:underline transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </motion.div>

      {/* Courses Grid with Staggered Entrance */}
      {filteredCourses.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((course, idx) => (
              <motion.div
                key={course.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <CourseCard
                  course={course}
                  onBookNow={(slug) => onOpenBooking(slug)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        /* Empty State */
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 shadow-xs max-w-md mx-auto space-y-3">
          <Car className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-900">No courses match your filter</h3>
          <p className="text-xs text-slate-500">
            Try adjusting your search query or reset filters to see all available driving packages.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedTransmission('all');
            }}
          >
            Reset Filters
          </Button>
        </div>
      )}

      {/* Custom Training Enquiry Callout */}
      <section className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
            Need a Customized Lesson Plan or Hourly Batch?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            We can customize lesson hours around your specific office timings, personal car model, or tricky basement parking slot.
          </p>
        </div>

        <Button
          variant="amber"
          size="lg"
          onClick={() => onOpenBooking()}
          className="shrink-0 shadow-md"
        >
          Enquire Custom Plan
        </Button>
      </section>
    </div>
  );
};
