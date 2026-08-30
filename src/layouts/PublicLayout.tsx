import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Phone, Sparkles } from 'lucide-react';
import { Navbar } from '../components/navigation/Navbar';
import { MobileMenu } from '../components/navigation/MobileMenu';
import { Footer } from '../components/navigation/Footer';
import { EnquiryModal } from '../components/forms/EnquiryModal';
import { LogoIntro } from '../components/intro/LogoIntro';
import { useContent } from '../context/ContentContext';
import { generateDirectWhatsAppChatLink } from '../utils/whatsapp';

export const PublicLayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedCourseForModal, setSelectedCourseForModal] = useState<string | undefined>(undefined);
  const [selectedInstructorForModal, setSelectedInstructorForModal] = useState<string | undefined>(undefined);

  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { siteData } = useContent();
  const { siteConfig } = siteData;

  const handleOpenBooking = (courseSlug?: string, instructorId?: string) => {
    setSelectedCourseForModal(courseSlug);
    setSelectedInstructorForModal(instructorId);
    setIsBookingModalOpen(true);
  };

  const whatsappUrl = generateDirectWhatsAppChatLink(siteConfig);

  return (
    <div className="min-h-screen flex flex-col bg-brand-50 text-brand-900 font-sans selection:bg-safety-500 selection:text-white">
      {/* Show Logo Intro on initial Homepage visit */}
      {isHomePage && <LogoIntro />}

      {/* Accessible skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-emerald-600 text-white rounded-lg font-bold shadow-lg"
      >
        Skip to main content
      </a>

      {/* Desktop & Sticky Header Navbar */}
      <Navbar
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        onOpenBookingModal={() => handleOpenBooking()}
      />

      {/* Mobile Drawer Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenBookingModal={() => handleOpenBooking()}
      />

      {/* Global Booking Modal */}
      <EnquiryModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        preselectedCourseSlug={selectedCourseForModal}
        preselectedInstructorId={selectedInstructorForModal}
      />

      {/* Main Page Body with Instant Smooth Fade */}
      <main id="main-content" className="flex-1 pt-24 sm:pt-28 lg:pt-36 focus:outline-none overflow-x-hidden">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          <Outlet context={{ onOpenBooking: handleOpenBooking }} />
        </motion.div>
      </main>

      {/* Floating Bottom-Right Quick WhatsApp Hub */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-30 flex flex-col gap-3 print:hidden">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 p-2.5 sm:px-4 sm:py-3 rounded-full bg-[#25D366] text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all group"
          aria-label="Chat directly on WhatsApp"
        >
          <MessageCircle className="w-5 h-5 fill-current transform group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline text-xs">WhatsApp Us</span>
        </a>
      </div>

      {/* Site Footer */}
      <Footer />
    </div>
  );
};
