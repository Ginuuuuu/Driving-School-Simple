import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, Mail, MapPin, ShieldCheck, Clock, Award, ArrowUpRight } from 'lucide-react';
import { Logo } from '../common/Logo';
import { useContent } from '../../context/ContentContext';
import { generateDirectWhatsAppChatLink } from '../../utils/whatsapp';

export const Footer: React.FC = () => {
  const { siteData } = useContent();
  const { siteConfig, courses } = siteData;

  const whatsappUrl = generateDirectWhatsAppChatLink(siteConfig);

  return (
    <footer className="bg-slate-950 text-slate-300 pt-8 pb-6 sm:pt-16 sm:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-10 lg:gap-8 mb-6 sm:mb-12">
          {/* Column 1: Brand & Safety Bio */}
          <div className="lg:col-span-2 space-y-2.5 sm:space-y-4">
            <Logo variant="light" size="sm" showTagline />
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm line-clamp-2 sm:line-clamp-none">
              {siteConfig.shortDescription}
            </p>

            {/* Trust Badges */}
            <div className="pt-0.5 sm:pt-2 flex flex-wrap gap-2">
              <div className="flex items-center gap-1.5 px-2 sm:px-3 py-0.5 sm:py-1 rounded-md sm:rounded-lg bg-slate-900 border border-slate-800 text-[0.68rem] sm:text-xs font-semibold text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                100% Dual-Control Fleet
              </div>
              <div className="flex items-center gap-1.5 px-2 sm:px-3 py-0.5 sm:py-1 rounded-md sm:rounded-lg bg-slate-900 border border-slate-800 text-[0.68rem] sm:text-xs font-semibold text-amber-400">
                <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
                MoRTH & RTO Aligned
              </div>
            </div>

            <div className="pt-0.5 text-[0.7rem] sm:text-xs text-slate-500">
              Hours: {siteConfig.operatingHours.weekdays}
            </div>
          </div>

          {/* Columns 2 & 3: Side-by-Side 2-Column Grid on Mobile */}
          <div className="grid grid-cols-2 gap-4 lg:col-span-2 lg:grid-cols-2">
            {/* Column 2: Popular Courses */}
            <div className="space-y-2 sm:space-y-3">
              <h3 className="text-white font-display font-bold text-xs sm:text-base tracking-wide uppercase">
                Courses
              </h3>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-slate-400">
                {courses.slice(0, 5).map((course) => (
                  <li key={course.id}>
                    <Link
                      to={`/courses/${course.slug}`}
                      className="hover:text-emerald-400 transition-colors flex items-center justify-between group"
                    >
                      <span className="truncate">{course.shortTitle}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 text-emerald-400 transition-opacity hidden sm:inline" />
                    </Link>
                  </li>
                ))}
                <li>
                  <Link to="/courses" className="text-emerald-400 font-semibold hover:underline inline-block pt-0.5 text-[0.7rem] sm:text-xs">
                    All Courses →
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Quick Navigation & RTO Resources */}
            <div className="space-y-2 sm:space-y-3">
              <h3 className="text-white font-display font-bold text-xs sm:text-base tracking-wide uppercase">
                Explore
              </h3>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-slate-400">
                <li>
                  <Link to="/roadmap" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                    <span className="truncate">Licence Roadmap</span>
                    <span className="px-1 py-0.2 text-[0.6rem] font-bold bg-amber-400/20 text-amber-300 rounded hidden sm:inline">
                      RTO
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-emerald-400 transition-colors truncate block">
                    About Academy
                  </Link>
                </li>
                <li>
                  <Link to="/instructors" className="hover:text-emerald-400 transition-colors truncate block">
                    Our Instructors
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="hover:text-emerald-400 transition-colors truncate block">
                    Pricing & Plans
                  </Link>
                </li>
                <li>
                  <Link to="/resources" className="hover:text-emerald-400 transition-colors truncate block">
                    Road Signs & Guides
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="hover:text-emerald-400 transition-colors truncate block">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-emerald-400 transition-colors truncate block">
                    Locations & Hubs
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 4: Contact & WhatsApp */}
          <div className="space-y-2 sm:space-y-3">
            <h3 className="text-white font-display font-bold text-xs sm:text-base tracking-wide uppercase">
              Get in Touch
            </h3>
            <div className="grid grid-cols-2 sm:flex sm:flex-col gap-2 sm:gap-2.5 text-xs sm:text-sm text-slate-400">
              <a
                href={`tel:${siteConfig.phoneDial}`}
                className="flex items-center gap-2 p-2 sm:p-0 rounded-lg sm:rounded-none bg-slate-900 sm:bg-transparent border border-slate-800 sm:border-none hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <div className="min-w-0">
                  <span className="font-semibold text-slate-200 block text-xs truncate">{siteConfig.phoneDisplay}</span>
                  <span className="text-[0.62rem] text-slate-500 block truncate">6 AM – 9 PM</span>
                </div>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 sm:p-0 rounded-lg sm:rounded-none bg-[#25D366]/10 sm:bg-transparent border border-[#25D366]/20 sm:border-none hover:text-[#25D366] transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                <div className="min-w-0">
                  <span className="font-semibold text-slate-200 block text-xs truncate">WhatsApp</span>
                  <span className="text-[0.62rem] text-[#25D366] block truncate">Instant Reply</span>
                </div>
              </a>

              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2 col-span-2 sm:col-span-1 p-2 sm:p-0 rounded-lg sm:rounded-none bg-slate-900 sm:bg-transparent border border-slate-800 sm:border-none hover:text-white transition-colors text-xs truncate"
              >
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">{siteConfig.email}</span>
              </a>

              <div className="flex items-start gap-2 col-span-2 sm:col-span-1 p-2 sm:p-0 rounded-lg sm:rounded-none bg-slate-900 sm:bg-transparent border border-slate-800 sm:border-none text-[0.7rem] sm:text-xs text-slate-400 leading-snug">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="truncate sm:whitespace-normal">
                  {siteConfig.branches[0]?.address}, {siteConfig.branches[0]?.city}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 sm:pt-8 mt-4 sm:mt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4 text-[0.7rem] sm:text-xs text-slate-500 text-center sm:text-left">
          <p>
            © {new Date().getFullYear()} {siteConfig.brandName}. All rights reserved.
          </p>

          <div className="flex items-center gap-3 sm:gap-5">
            <Link to="/privacy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-slate-300 transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
