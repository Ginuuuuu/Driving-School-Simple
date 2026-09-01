import React from 'react';
import { Shield } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { SEO } from '../components/common/SEO';

export const Privacy: React.FC = () => {
  const { siteData } = useContent();
  const { legal } = siteData;
  const policy = legal.privacyPolicy;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      <SEO
        title="Privacy Policy"
        description="DriveCraft Motor Academy privacy policy regarding learner information, WhatsApp communications, and Indian DPDP compliance."
        canonicalPath="/privacy"
      />

      <div className="space-y-1">
        <h1 className="text-2xl sm:text-4xl font-extrabold font-display text-[#39340F] tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-[#404D68] font-mono">
          Last Updated: {policy.lastUpdated}
        </p>
      </div>

      <div className="p-6 sm:p-10 bg-white rounded-3xl border border-[#D4E2DF] shadow-sm space-y-8 text-[#39340F]">
        {policy.sections.map((section, idx) => (
          <section key={idx} className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold font-display text-[#39340F]">
              {section.heading}
            </h2>
            <p className="text-xs sm:text-sm text-[#404D68] leading-relaxed">
              {section.body}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
};
