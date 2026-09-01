import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, ArrowRight, MessageCircle, Phone, HelpCircle } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { Button } from '../components/common/Button';
import { SEO } from '../components/common/SEO';
import { generateDirectWhatsAppChatLink } from '../utils/whatsapp';

export const FAQ: React.FC = () => {
  const { siteData } = useContent();
  const { faqs, siteConfig } = siteData;

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
      <div className="hidden md:block max-w-7xl mx-auto px-6 lg:px-8 space-y-10 lg:space-y-12">
        {/* Page Header */}
        <div className="space-y-3">
          <h1 className="text-3xl lg:text-4xl font-extrabold font-display text-[#26423E] tracking-tight">
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
                    ? 'bg-[#26423E] text-white shadow-sm'
                    : 'bg-white border border-[#C2D3D0] text-[#56776A] hover:bg-[#EDEFF4] hover:text-[#26423E]'
                }`}
              >
                {cat === 'all' ? 'All Questions' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3-Column Grid of Questions and Direct Answers */}
        {filteredFAQs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
            {filteredFAQs.map((faq) => (
              <div key={faq.id} className="space-y-2">
                <h3 className="text-base font-bold text-[#26423E] leading-snug">
                  {faq.question}
                </h3>
                <p className="text-sm text-[#56776A] leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-10 text-center bg-white rounded-3xl border border-[#C2D3D0] max-w-md mx-auto space-y-2">
            <p className="text-sm font-bold text-[#26423E]">No questions found</p>
            <p className="text-xs text-[#56776A]">Try selecting a different category or contact our team directly.</p>
          </div>
        )}

        {/* Desktop Bottom CTA Card */}
        <div className="p-8 lg:p-10 rounded-3xl bg-[#EDEFF4] border border-[#C2D3D0] flex items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold font-display text-[#26423E]">
              Still have questions?
            </h3>
            <p className="text-sm text-[#56776A]">
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
              icon={<MessageCircle className="w-4 h-4 text-[#42B7A7]" />}
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
          <h1 className="text-xl font-bold font-display text-[#26423E] tracking-tight">
            Frequently Asked Questions
          </h1>

          {/* Search Help Input */}
          <div className="relative pt-1">
            <Search className="w-4 h-4 text-[#56776A] absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search Help"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#C2D3D0] rounded-full text-xs text-[#26423E] placeholder-[#56776A] focus:outline-none focus:ring-2 focus:ring-[#42B7A7] transition-all"
            />
          </div>
        </div>

        {/* Section Label */}
        <div className="space-y-2">
          <div className="text-[0.7rem] uppercase tracking-wider font-extrabold text-[#56776A] px-1">
            FAQ
          </div>

          {/* Mobile Accordion Card List */}
          {filteredFAQs.length > 0 ? (
            <div className="bg-white rounded-2xl border border-[#C2D3D0] divide-y divide-[#C2D3D0]/60 overflow-hidden shadow-xs">
              {filteredFAQs.map((faq) => {
                const isOpen = openMobileId === faq.id;

                return (
                  <div key={faq.id} className="transition-colors">
                    <button
                      onClick={() => toggleMobileFaq(faq.id)}
                      className="w-full py-3.5 px-4 text-left flex items-center justify-between gap-3 hover:bg-[#EDEFF4]/50 transition-colors"
                    >
                      <span className={`text-xs leading-snug ${isOpen ? 'font-bold text-[#26423E]' : 'font-semibold text-[#26423E]'}`}>
                        {faq.question}
                      </span>
                      <Plus
                        className={`w-4 h-4 text-[#56776A] shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-45 text-[#42B7A7]' : ''
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
                          <div className="px-4 pb-3.5 pt-0 text-xs text-[#56776A] leading-relaxed border-t border-[#C2D3D0]/40 bg-[#EDEFF4]/30">
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
            <div className="p-6 text-center bg-white rounded-2xl border border-[#C2D3D0] space-y-1">
              <p className="text-xs font-bold text-[#26423E]">No questions found</p>
              <p className="text-[0.7rem] text-[#56776A]">Try searching a different keyword.</p>
            </div>
          )}
        </div>

        {/* Mobile Bottom CTA Card */}
        <div className="p-5 bg-white rounded-2xl border border-[#C2D3D0] text-center space-y-3 shadow-xs">
          <div className="space-y-0.5">
            <h4 className="text-sm font-bold font-display text-[#26423E]">
              Still stuck? Help is a message away
            </h4>
            <p className="text-xs text-[#56776A]">
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

