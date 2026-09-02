import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, ArrowRight, MessageCircle, Phone, HelpCircle } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { Button } from '../components/common/Button';
import { SEO } from '../components/common/SEO';
import { generateDirectWhatsAppChatLink } from '../utils/whatsapp';

import { defaultFAQs } from '../content/faqs';
import { defaultSiteConfig } from '../content/siteConfig';

export const FAQ: React.FC = () => {
  const { siteData } = useContent();
  const faqs = siteData?.faqs || defaultFAQs;
  const siteConfig = siteData?.siteConfig || defaultSiteConfig;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openMobileId, setOpenMobileId] = useState<string | null>(faqs[0]?.id || null);

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

  const toggleMobileFaq = (id: string) => {
    setOpenMobileId(openMobileId === id ? null : id);
  };

  const whatsappUrl = generateDirectWhatsAppChatLink(siteConfig);

  return (
    <div className="py-4 sm:py-10">
      <SEO
        title="Frequently Asked Questions | RTO Rules & Lesson FAQs"
        description="Got questions about getting your learner's licence, dual-control cars, automated RTO tracks, or scheduling? Browse our comprehensive FAQ."
        canonicalPath="/faq"
      />

      {/* ============================================================ */}
      {/* DESKTOP UI (md:block) — Clean 3-Column Direct Grid Layout     */}
      {/* ============================================================ */}
      <div className="hidden md:block site-container space-y-10 lg:space-y-12">
        {/* Page Header */}
        <div className="space-y-3">
          <h1 className="text-3xl lg:text-4xl font-extrabold font-display text-[#202B33] tracking-tight">
            Frequently Asked Questions
          </h1>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#082B4C] text-white shadow-sm'
                    : 'bg-white border border-[#E5E7EB] text-[#6B7280] hover:bg-[#F5F6F7] hover:text-[#082B4C]'
                }`}
              >
                {cat === 'all' ? 'All Questions' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3-Column Grid of Questions and Direct Answers */}
        {filteredFAQs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 items-stretch">
            {filteredFAQs.map((faq) => (
              <div
                key={faq.id}
                className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-[#E5E7EB] shadow-xs hover:shadow-md hover-lift-subtle space-y-2 h-full flex flex-col justify-start transition-all"
              >
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#082B4C] bg-[#F4C400]/15 px-2.5 py-0.5 rounded-md w-fit border border-[#F4C400]/30">
                  <HelpCircle className="w-3.5 h-3.5 text-[#082B4C]" />
                  <span>{faq.category}</span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-[#202B33] leading-snug">
                  {faq.question}
                </h3>
                <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed pt-1">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-10 text-center bg-white rounded-3xl border border-[#E5E7EB] max-w-md mx-auto space-y-2">
            <p className="text-sm font-bold text-[#202B33]">No questions found</p>
            <p className="text-xs text-[#6B7280]">Try selecting a different category or contact our team directly.</p>
          </div>
        )}

        {/* Desktop Bottom CTA Card */}
        <div className="p-8 lg:p-10 rounded-3xl bg-[#F5F6F7] border border-[#E5E7EB] flex items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold font-display text-[#202B33]">
              Still have questions?
            </h3>
            <p className="text-sm text-[#6B7280]">
              We understand. Let's get in touch directly with our team, then.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Button
              variant="outline"
              size="md"
              href={whatsappUrl}
              isExternal
              className="rounded-full px-5 py-2.5 font-bold hover-lift"
              icon={<MessageCircle className="w-4 h-4 text-[#082B4C]" />}
            >
              WhatsApp Us
            </Button>
            <Button
              variant="primary"
              size="md"
              to="/contact"
              className="rounded-full px-6 py-2.5 font-bold shadow-md hover-lift"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* MOBILE UI (md:hidden) — Clean Help Desk Accordion Layout      */}
      {/* ============================================================ */}
      <div className="md:hidden max-w-md mx-auto px-4 space-y-6">
        {/* Mobile Header */}
        <div className="space-y-2">
          <h1 className="text-xl font-bold font-display text-[#202B33] tracking-tight">
            Frequently Asked Questions
          </h1>

          {/* Search Help Input */}
          <div className="relative pt-1">
            <Search className="w-4 h-4 text-[#6B7280] absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search Help"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E5E7EB] rounded-full text-xs text-[#202B33] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#F4C400] transition-all"
            />
          </div>
        </div>

        {/* Section Label */}
        <div className="space-y-2">
          <div className="text-[0.7rem] uppercase tracking-wider font-extrabold text-[#6B7280] px-1">
            FAQ
          </div>

          {/* Mobile Accordion Card List */}
          {filteredFAQs.length > 0 ? (
            <div className="bg-white rounded-2xl border border-[#E5E7EB] divide-y divide-[#E5E7EB] overflow-hidden shadow-xs">
              {filteredFAQs.map((faq) => {
                const isOpen = openMobileId === faq.id;

                return (
                  <div key={faq.id} className="transition-colors">
                    <button
                      onClick={() => toggleMobileFaq(faq.id)}
                      className="w-full py-3.5 px-4 text-left flex items-center justify-between gap-3 hover:bg-[#F5F6F7]/50 transition-colors"
                    >
                      <span className={`text-xs leading-snug ${isOpen ? 'font-bold text-[#202B33]' : 'font-semibold text-[#202B33]'}`}>
                        {faq.question}
                      </span>
                      <Plus
                        className={`w-4 h-4 text-[#6B7280] shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-45 text-[#082B4C]' : ''
                        }`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: 'easeOut' }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-3.5 pt-0 text-xs text-[#6B7280] leading-relaxed border-t border-[#E5E7EB] bg-[#F5F6F7]/30">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-6 text-center bg-white rounded-2xl border border-[#E5E7EB] space-y-1">
              <p className="text-xs font-bold text-[#202B33]">No questions found</p>
              <p className="text-[0.7rem] text-[#6B7280]">Try searching a different keyword.</p>
            </div>
          )}
        </div>

        {/* Mobile Bottom CTA Card */}
        <div className="p-5 bg-white rounded-2xl border border-[#E5E7EB] text-center space-y-3 shadow-xs">
          <div className="space-y-0.5">
            <h4 className="text-sm font-bold font-display text-[#202B33]">
              Still stuck? Help is a message away
            </h4>
            <p className="text-xs text-[#6B7280]">
              Chat directly with our instructors on WhatsApp.
            </p>
          </div>

          <Button
            variant="whatsapp"
            size="md"
            href={whatsappUrl}
            isExternal
            className="w-full justify-center rounded-full font-bold shadow-sm py-2.5 text-xs"
            icon={<MessageCircle className="w-4 h-4 fill-current" />}
          >
            Send a message
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;

