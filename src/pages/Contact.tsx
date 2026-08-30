import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, Mail, MapPin, Clock, ShieldCheck, Sparkles, Navigation } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { SectionHeading } from '../components/common/SectionHeading';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { EnquiryForm } from '../components/forms/EnquiryForm';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { SEO } from '../components/common/SEO';
import { generateDirectWhatsAppChatLink } from '../utils/whatsapp';

export const Contact: React.FC = () => {
  const { siteData } = useContent();
  const { siteConfig } = siteData;

  const whatsappUrl = generateDirectWhatsAppChatLink(siteConfig);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-10 space-y-6 sm:space-y-12 lg:space-y-16">
      <SEO
        title="Contact Us & Training Branch Locations"
        description="Get in touch with DriveCraft Motor Academy. Call us, WhatsApp us, or visit our training branches with doorstep lesson pickup."
        canonicalPath="/contact"
      />

      <Breadcrumbs items={[{ label: 'Contact Us' }]} />

      <SectionHeading
        pillText="Get In Touch"
        title="We’re Here to Help You Start Driving"
        subtitle="Enquire about upcoming batches, schedule a trial lesson, or get assistance with your RTO application."
      />

      {/* Main Grid: Left Contact Info & Branches, Right Enquiry Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-start">
        {/* Left Column: Direct Contact & Locations (5 Cols) */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-5 space-y-4 sm:space-y-6"
        >
          {/* Quick Helpline Cards */}
          <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-md sm:shadow-lg space-y-3.5 sm:space-y-5">
            <h3 className="text-base sm:text-lg font-bold font-display text-white">
              Instant Contact Channels
            </h3>

            <div className="space-y-2.5 sm:space-y-4 text-xs sm:text-sm">
              <a
                href={`tel:${siteConfig.phoneDial}`}
                className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover-lift-subtle transition-all"
              >
                <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-emerald-500/20 text-emerald-400">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <span className="text-[0.6rem] sm:text-[0.65rem] uppercase font-bold text-slate-400 block">Phone Support</span>
                  <span className="font-bold text-white text-sm sm:text-base">{siteConfig.phoneDisplay}</span>
                </div>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-[#25D366]/10 hover:bg-[#25D366]/20 text-slate-200 hover-lift-subtle transition-all border border-[#25D366]/30"
              >
                <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-[#25D366] text-white">
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                </div>
                <div>
                  <span className="text-[0.6rem] sm:text-[0.65rem] uppercase font-bold text-[#25D366] block">WhatsApp Admissions</span>
                  <span className="font-bold text-white text-sm sm:text-base">Chat with Us</span>
                </div>
              </a>

              <div className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-slate-800/80 text-slate-300">
                <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-slate-700 text-slate-300">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <span className="text-[0.6rem] sm:text-[0.65rem] uppercase font-bold text-slate-400 block">Training Hours</span>
                  <span className="font-semibold text-slate-200 text-xs sm:text-sm">{siteConfig.operatingHours.weekdays}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Branch Locations List */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-sm sm:text-base font-bold font-display text-slate-900">
              Training Hubs & Branch Centers:
            </h3>

            {siteConfig.branches.map((branch) => (
              <div
                key={branch.id}
                className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1.5 sm:space-y-2 hover-lift"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">{branch.name}</span>
                  {branch.isMainBranch && (
                    <Badge variant="emerald" size="sm">
                      Main Hub
                    </Badge>
                  )}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {branch.address}, {branch.city} - {branch.pincode}
                </p>

                <div className="pt-1 flex items-center justify-between text-xs text-emerald-700 font-semibold">
                  <span>Phone: {branch.phone}</span>
                  <a
                    href={branch.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:underline text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5" /> Map
                  </a>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Full Enquiry Form (7 Cols) */}
        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="lg:col-span-7 p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4 sm:space-y-6"
        >
          <div>
            <h3 className="text-lg sm:text-xl font-bold font-display text-slate-900">
              Send a Lesson Enquiry
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Fill in your details to immediately generate your pre-formatted WhatsApp booking link.
            </p>
          </div>

          <EnquiryForm />
        </motion.div>
      </div>
    </div>
  );
};
