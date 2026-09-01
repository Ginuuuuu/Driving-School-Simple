import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, MessageCircle, Menu, Shield, Sparkles } from 'lucide-react';
import { Logo } from '../common/Logo';
import { Button } from '../common/Button';
import { useContent } from '../../context/ContentContext';
import { generateDirectWhatsAppChatLink } from '../../utils/whatsapp';

interface NavbarProps {
  onOpenMobileMenu: () => void;
  onOpenBookingModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenMobileMenu, onOpenBookingModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { siteData } = useContent();
  const { siteConfig } = siteData;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Courses', to: '/courses' },
    { label: 'Roadmap', to: '/roadmap' },
    { label: 'Instructors', to: '/instructors' },
    { label: 'Pricing', to: '/pricing' },
    { label: 'Resources', to: '/resources' },
    { label: 'FAQ', to: '/faq' },
    { label: 'Contact', to: '/contact' },
  ];

  const whatsappUrl = generateDirectWhatsAppChatLink(siteConfig);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3'
          : 'bg-white/80 backdrop-blur-sm border-b border-slate-100 py-4'
      }`}
    >
      {/* Top Announcement Micro-Bar (Only when top) */}
      {!isScrolled && (
        <div className="hidden lg:block border-b border-slate-100 pb-2 mb-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs text-slate-600">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                <Shield className="w-3.5 h-3.5 text-emerald-600" />
                Govt. Certified Training Fleet & Doorstep Pickup
              </span>
              <span className="text-slate-300">•</span>
              <span>Available in {siteConfig.serviceCities.slice(0, 4).join(', ')} & more</span>
            </div>

            <div className="flex items-center gap-5">
              <a
                href={`tel:${siteConfig.phoneDial}`}
                className="flex items-center gap-1.5 hover:text-emerald-700 font-semibold text-slate-700 transition-colors"
                aria-label={`Call ${siteConfig.phoneDisplay}`}
              >
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                {siteConfig.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Main Navbar Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Logo size="md" showTagline={!isScrolled} />

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 text-sm font-medium text-slate-700">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;

              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap text-sm font-medium ${
                    isActive
                      ? 'text-emerald-700 font-bold bg-emerald-50'
                      : 'hover:text-slate-950 hover:bg-slate-100/80 text-slate-700'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Direct WhatsApp trigger */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all duration-200"
              aria-label="Chat on WhatsApp"
              title="Quick WhatsApp Enquiry"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
            </a>

            {/* Quick Call Button */}
            <a
              href={`tel:${siteConfig.phoneDial}`}
              className="hidden md:inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 transition-colors"
              aria-label={`Call us at ${siteConfig.phoneDisplay}`}
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>Call Us</span>
            </a>

            {/* Primary CTA: Book a Lesson */}
            <Button
              variant="primary"
              size="sm"
              onClick={onOpenBookingModal}
              className="text-xs sm:text-sm px-2.5 sm:px-4 py-2 sm:py-2.5 shadow-sm font-bold shrink-0"
              icon={<Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 shrink-0" />}
            >
              <span className="hidden sm:inline">Book a Lesson</span>
              <span className="sm:hidden">Book</span>
            </Button>

            {/* Mobile Hamburger Three-Bar Menu Button */}
            <button
              type="button"
              onClick={onOpenMobileMenu}
              className="xl:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100/90 hover:bg-slate-200 text-slate-800 border border-slate-200/80 focus:ring-2 focus:ring-emerald-500 active:scale-95 transition-all shrink-0 cursor-pointer"
              aria-label="Open Mobile Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
