import React from 'react';
import { useContent } from '../context/ContentContext';
import { SEO } from '../components/common/SEO';

export const Terms: React.FC = () => {
  const { siteData } = useContent();
  const { legal } = siteData;
  const terms = legal.termsAndConditions;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      <SEO
        title="Terms & Conditions"
        description="DriveCraft Motor Academy terms of service regarding lesson bookings, rescheduling, vehicle dual-control insurance, and student guidelines."
        canonicalPath="/terms"
      />

      <div className="space-y-1">
        <h1 className="text-2xl sm:text-4xl font-extrabold font-display text-[#26423E] tracking-tight">
          Terms & Conditions
        </h1>
        <p className="text-xs text-[#56776A] font-mono">
          Last Updated: {terms.lastUpdated}
        </p>
      </div>

      <div className="p-6 sm:p-10 bg-white rounded-3xl border border-[#C2D3D0] shadow-sm space-y-8 text-[#26423E]">
        {terms.sections.map((section, idx) => (
          <section key={idx} className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold font-display text-[#26423E]">
              {section.heading}
            </h2>
            <p className="text-xs sm:text-sm text-[#56776A] leading-relaxed">
              {section.body}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
};
