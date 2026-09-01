import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, X, Shield, Clock, Plus, Sparkles, HelpCircle } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { PricingCard } from '../components/cards/PricingCard';
import { Button } from '../components/common/Button';
import { SEO } from '../components/common/SEO';

export const Pricing: React.FC = () => {
  const { siteData } = useContent();
  const { pricing } = siteData;
  const { onOpenBooking } = useOutletContext<{ onOpenBooking: (courseSlug?: string) => void }>();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-10 space-y-10 sm:space-y-16 lg:space-y-24">
      <SEO
        title="Transparent Driving Lesson Pricing & Packages"
        description="Affordable and all-inclusive driving package pricing with zero hidden fees. Starter, Standard, and Mastery Pro courses with doorstep pickup."
        canonicalPath="/pricing"
      />

      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold font-display text-[#26423E] tracking-tight">
          Pricing & Lesson Packages
        </h1>
      </div>

      {/* Main Pricing Cards Grid with Staggered Entrance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-8"
      >
        {pricing.packages.slice(0, 3).map((pkg) => (
          <PricingCard
            key={pkg.id}
            pkg={pkg}
            onSelectPackage={(slug) => onOpenBooking(slug)}
          />
        ))}
      </motion.div>

      {/* Add-On Services Grid */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.45 }}
        className="space-y-6 sm:space-y-8"
      >
        <div className="text-center max-w-2xl mx-auto space-y-1.5 sm:space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 sm:py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#E2F3F0] text-[#26423E] border border-[#C2D3D0]">
            <Plus className="w-3.5 h-3.5 text-[#42B7A7]" /> Extra Services
          </div>
          <h2 className="text-xl sm:text-3xl font-bold font-display text-[#26423E]">
            Customize with Targeted Add-On Modules
          </h2>
          <p className="text-xs sm:text-sm text-[#56776A]">
            Enhance any package with specific specialized modules according to your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {pricing.addOns.map((addon) => (
            <div
              key={addon.id}
              className="p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-[#C2D3D0] shadow-xs flex flex-col justify-between space-y-2.5 sm:space-y-4 hover-lift"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5 sm:mb-2">
                  <span className="text-base sm:text-lg font-bold text-[#26423E]">₹{addon.price}</span>
                  <span className="text-[0.65rem] text-[#56776A] font-medium">/{addon.perUnit}</span>
                </div>
                <h3 className="text-xs sm:text-sm font-bold font-display text-[#26423E]">
                  {addon.title}
                </h3>
                <p className="text-[0.72rem] sm:text-xs text-[#56776A] mt-1 leading-relaxed">
                  {addon.description}
                </p>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => onOpenBooking()}
                className="w-full justify-center text-xs py-1.5 sm:py-2 hover:border-[#42B7A7] hover:text-[#42B7A7]"
              >
                Add to Booking
              </Button>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Feature Comparison Table */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.45 }}
        className="space-y-6"
      >
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#26423E]">
            Detailed Package Comparison Matrix
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#56776A]">
            Compare all features across Starter, Standard, and Mastery packages.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-[#C2D3D0] overflow-x-auto shadow-sm">
          <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-[#C2D3D0] bg-[#EDEFF4]">
                <th className="p-4 sm:p-5 font-bold text-[#26423E]">Features</th>
                <th className="p-4 sm:p-5 font-bold text-[#26423E] text-center">Starter (10h)</th>
                <th className="p-4 sm:p-5 font-bold text-[#26423E] text-center bg-[#E2F3F0]">Standard (20h)</th>
                <th className="p-4 sm:p-5 font-bold text-[#26423E] text-center">Mastery Pro (30h)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#C2D3D0]/60">
              {pricing.comparisonFeatures.map((cat, catIdx) => (
                <React.Fragment key={catIdx}>
                  <tr className="bg-[#EDEFF4]/70">
                    <td colSpan={4} className="p-3 px-5 text-xs font-bold uppercase tracking-wider text-[#26423E]">
                      {cat.category}
                    </td>
                  </tr>
                  {cat.features.map((feat, featIdx) => (
                    <tr key={featIdx} className="hover:bg-[#EDEFF4]/50 transition-colors">
                      <td className="p-4 sm:px-5 font-medium text-[#26423E]">{feat.name}</td>
                      <td className="p-4 text-center text-[#56776A]">
                        {typeof feat.starter === 'boolean' ? (
                          feat.starter ? <Check className="w-4 h-4 text-[#42B7A7] mx-auto" /> : <X className="w-4 h-4 text-[#56776A]/40 mx-auto" />
                        ) : (
                          feat.starter
                        )}
                      </td>
                      <td className="p-4 text-center font-bold text-[#26423E] bg-[#E2F3F0]/40">
                        {typeof feat.standard === 'boolean' ? (
                          feat.standard ? <Check className="w-4 h-4 text-[#42B7A7] mx-auto" /> : <X className="w-4 h-4 text-[#56776A]/40 mx-auto" />
                        ) : (
                          feat.standard
                        )}
                      </td>
                      <td className="p-4 text-center font-semibold text-[#26423E]">
                        {typeof feat.mastery === 'boolean' ? (
                          feat.mastery ? <Check className="w-4 h-4 text-[#42B7A7] mx-auto" /> : <X className="w-4 h-4 text-[#56776A]/40 mx-auto" />
                        ) : (
                          feat.mastery
                        )}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>

      {/* No Hidden Fee Guarantee Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.45 }}
        className="p-6 sm:p-8 rounded-3xl bg-[#E2F3F0] border border-[#C2D3D0] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white text-[#42B7A7] flex items-center justify-center shrink-0 shadow-xs">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold font-display text-[#26423E]">
              100% Transparent Zero-Hidden-Fee Guarantee
            </h3>
            <p className="text-xs text-[#56776A] leading-relaxed mt-0.5">
              No extra fuel surcharges, zero tips expected, and free lesson rescheduling with 6 hours notice.
            </p>
          </div>
        </div>

        <Button variant="primary" size="md" onClick={() => onOpenBooking()} className="hover-lift">
          Book With Zero Advance
        </Button>
      </motion.div>
    </div>
  );
};
