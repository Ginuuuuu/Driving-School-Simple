import React from 'react';
import { useContent } from '../context/ContentContext';
import { SEO } from '../components/common/SEO';

import { defaultLegal } from '../content/legal';

export const Terms: React.FC = () => {
  const { siteData } = useContent();
  const legal = siteData?.legal || defaultLegal;
  const terms = legal?.termsAndConditions || defaultLegal.termsAndConditions;

  return (
    <div className="site-container max-w-4xl lg:max-w-5xl py-6 sm:py-10 space-y-8">
      <SEO
        title="Terms & Conditions"
        description="DriveCraft Motor Academy terms of service regarding lesson bookings, rescheduling, vehicle dual-control insurance, and student guidelines."
        canonicalPath="/terms"
      />

      <div className="space-y-1">
        <h1 className="text-2xl sm:text-4xl font-extrabold font-display text-[#202B33] tracking-tight">
          Terms & Conditions
        </h1>
        <p className="text-xs text-[#6B7280] font-mono">
          Last Updated: {terms.lastUpdated}
        </p>
      </div>

      <div className="p-6 sm:p-10 bg-white rounded-3xl border border-[#E5E7EB] shadow-sm space-y-8 text-[#202B33]">
        {(terms.sections || []).map((section, idx) => (
          <section key={idx} className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold font-display text-[#202B33]">
              {section.heading}
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
              {section.body || (section as any).content || ''}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
};
