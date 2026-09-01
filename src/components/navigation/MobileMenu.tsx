import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Phone, MessageCircle, Sparkles, Shield, ChevronRight, MapPin } from 'lucide-react';
import { Logo } from '../common/Logo';
import { Button } from '../common/Button';
import { useContent } from '../../context/ContentContext';
import { generateDirectWhatsAppChatLink } from '../../utils/whatsapp';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBookingModal: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, onOpenBookingModal }) => {
  const location = useLocation();
  const { siteData } = useContent();
  const { siteConfig } = siteData;

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close on route change
  useEffect(() => {
    onClose();
  }, [location.pathname]);

  if (!isOpen) return null;

  const links = [
    { label: 'Home', to: '/' },
    { label: 'About Us', to: '/about' },
    { label: 'Driving Courses', to: '/courses' },
    { label: 'Licence Roadmap', to: '/roadmap' },
    { label: 'Meet Our Instructors', to: '/instructors' },
    { label: 'Pricing & Packages', to: '/pricing' },
    { label: 'Learner Reviews', to: '/testimonials' },
    { label: 'Driving Resources & Guides', to: '/resources' },
    { label: 'Frequently Asked Questions', to: '/faq' },
    { label: 'Contact & Service Branches', to: '/contact' },
  ];

  const whatsappUrl = generateDirectWhatsAppChatLink(siteConfig);

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#082B4C]/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="relative w-full max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto z-10 animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#E5E7EB] flex items-center justify-between">
          <Logo size="md" />
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#6B7280] hover:text-[#202B33] hover:bg-[#F5F6F7] transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation List */}
        <div className="p-5 space-y-1.5 flex-1">
          <div className="text-[0.7rem] uppercase tracking-wider font-bold text-[#6B7280] mb-2 px-3">
            Menu Navigation
          </div>

          {links.map((link) => {
            const isActive = location.pathname === link.to;

            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-base font-semibold transition-all ${
                  isActive
                    ? 'bg-[#F4C400]/20 text-[#082B4C] font-bold border border-[#F4C400]/30'
                    : 'text-[#202B33] hover:bg-[#F5F6F7]'
                }`}
              >
                <span>{link.label}</span>
                <ChevronRight className={`w-4 h-4 ${isActive ? 'text-[#082B4C]' : 'text-[#9CA3AF]'}`} />
              </Link>
            );
          })}

          {/* Service Areas Note */}
          <div className="mt-4 p-3 rounded-xl bg-[#F5F6F7] border border-[#E5E7EB] text-xs text-[#6B7280]">
            <div className="flex items-center gap-1.5 font-bold text-[#202B33] mb-1">
              <MapPin className="w-3.5 h-3.5 text-[#082B4C]" />
              Doorstep Pickup Available in:
            </div>
            <p className="leading-relaxed text-[#6B7280]">
              {siteConfig.serviceCities.join(' • ')}
            </p>
          </div>
        </div>

        {/* Bottom Drawer Actions */}
        <div className="p-5 border-t border-[#E5E7EB] bg-white space-y-3">
          <Button
            variant="primary"
            size="lg"
            className="w-full justify-center shadow-md text-[#082B4C] font-bold"
            onClick={() => {
              onClose();
              onOpenBookingModal();
            }}
            icon={<Sparkles className="w-5 h-5 text-[#082B4C]" />}
          >
            Book a Driving Lesson
          </Button>

          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="whatsapp"
              size="md"
              href={whatsappUrl}
              isExternal
              className="w-full justify-center"
              icon={<MessageCircle className="w-4 h-4 fill-current" />}
            >
              WhatsApp
            </Button>

            <Button
              variant="secondary"
              size="md"
              href={`tel:${siteConfig.phoneDial}`}
              className="w-full justify-center"
              icon={<Phone className="w-4 h-4" />}
            >
              Call Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
