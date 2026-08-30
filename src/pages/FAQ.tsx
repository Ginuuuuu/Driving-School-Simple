import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, MessageCircle, Phone, HelpCircle } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { SectionHeading } from '../components/common/SectionHeading';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Button } from '../components/common/Button';
import { SEO } from '../components/common/SEO';
import { generateDirectWhatsAppChatLink } from '../utils/whatsapp';

export const FAQ: React.FC = () => {
  const { siteData } = useContent();
  const { faqs, siteConfig } = siteData;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openItemIds, setOpenItemIds] = useState<Set<string>>(new Set([faqs[0]?.id || '']));

  const categories = ['all', 'Licence & RTO', 'Lessons & Scheduling', 'Vehicles & Safety', 'Pricing & Payments', 'Beginners'];

  const filteredFAQs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesSearch =
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'all' || faq.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [faqs, searchQuery, selectedCategory]);

  const toggleItem = (id: string) => {
    setOpenItemIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleExpandAll = () => {
    setOpenItemIds(new Set(filteredFAQs.map((f) => f.id)));
  };

  const handleCollapseAll = () => {
    setOpenItemIds(new Set());
  };

  const whatsappUrl = generateDirectWhatsAppChatLink(siteConfig);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-10 space-y-6 sm:space-y-12">
      <SEO
        title="Frequently Asked Questions | RTO Rules & Lesson FAQs"
        description="Got questions about getting your learner's licence, dual-control cars, automated RTO tracks, or scheduling? Browse our comprehensive FAQ."
        canonicalPath="/faq"
      />

      <div className="space-y-1">
        <Breadcrumbs items={[{ label: 'FAQ' }]} />
        <h1 className="text-lg sm:text-2xl font-bold font-display text-slate-900 tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Everything you need to know about driving lessons, government licence procedures, and dual-control safety.
        </p>
      </div>

      {/* Search & Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="space-y-3 sm:space-y-4"
      >
        <div className="relative">
          <Search className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 absolute left-3.5 sm:left-4 top-2.5 sm:top-3.5" />
          <input
            type="text"
            placeholder="Search questions (e.g. licence, test track, doorstep)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 sm:pl-12 pr-3.5 sm:pr-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl border border-slate-200 bg-white text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none shadow-xs transition-all"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-3">
          <div className="flex flex-wrap gap-1 sm:gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-lg sm:rounded-xl text-[0.7rem] sm:text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {cat === 'all' ? 'All Questions' : cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-[0.7rem] sm:text-xs font-semibold text-slate-500">
            <button onClick={handleExpandAll} className="hover:text-emerald-700 underline transition-colors">
              Expand All
            </button>
            <span>•</span>
            <button onClick={handleCollapseAll} className="hover:text-emerald-700 underline transition-colors">
              Collapse All
            </button>
          </div>
        </div>
      </motion.div>

      {/* Accordion FAQ List */}
      {filteredFAQs.length > 0 ? (
        <div className="space-y-2 sm:space-y-3">
          {filteredFAQs.map((faq) => {
            const isOpen = openItemIds.has(faq.id);

            return (
              <div
                key={faq.id}
                className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden transition-all hover:border-slate-300"
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full p-3 sm:p-5 text-left flex items-start justify-between gap-3 hover:bg-slate-50/80 transition-colors"
                >
                  <div className="flex items-start gap-2 sm:gap-3">
                    <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-base font-bold text-slate-900 leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 sm:w-5 sm:h-5 text-slate-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-emerald-600' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-3.5 sm:px-5 pb-3.5 sm:pb-5 pt-1 border-t border-slate-100 bg-slate-50/50">
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6 sm:pl-8">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-6 sm:p-8 text-center bg-white rounded-2xl sm:rounded-3xl border border-slate-200 max-w-md mx-auto space-y-2">
          <p className="text-xs sm:text-sm font-bold text-slate-800">No questions found matching your search</p>
          <p className="text-xs text-slate-500">Try searching a different keyword or chat with us directly.</p>
        </div>
      )}

      {/* Still Have Questions? Banner */}
      <motion.section
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.4 }}
        className="p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-slate-900 text-white border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 shadow-xl"
      >
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-sm sm:text-lg font-bold font-display text-white">
            Have a Specific Question About Your RTO Zone?
          </h3>
          <p className="text-xs text-slate-300">
            Our admissions team responds within 15 minutes on WhatsApp.
          </p>
        </div>

        <Button
          variant="whatsapp"
          size="sm"
          href={whatsappUrl}
          isExternal
          className="shrink-0 shadow-md text-xs sm:text-sm py-2 sm:py-2.5 w-full sm:w-auto justify-center hover-lift"
          icon={<MessageCircle className="w-4 h-4 fill-current" />}
        >
          Chat on WhatsApp
        </Button>
      </motion.section>
    </div>
  );
};
