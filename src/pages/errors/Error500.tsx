import React from 'react';
import { AlertOctagon, RefreshCw, Home } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { Button } from '../../components/common/Button';
import { SEO } from '../../components/common/SEO';

import { defaultErrors } from '../../content/errors';

export const Error500: React.FC = () => {
  const { siteData } = useContent();
  const errors = siteData?.errors || defaultErrors;
  const e500 = errors?.error500 || defaultErrors.error500;

  return (
    <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-6">
      <SEO title="500 - System Breakdown" description="An unexpected error occurred." />

      <div className="w-20 h-20 rounded-full bg-[#F4C400]/20 text-[#082B4C] flex items-center justify-center mx-auto">
        <AlertOctagon className="w-10 h-10 text-[#082B4C]" />
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl sm:text-4xl font-extrabold font-display text-[#202B33]">
          {e500.title}
        </h1>
        <p className="text-sm font-semibold text-[#202B33]">
          {e500.subtitle}
        </p>
        <p className="text-xs text-[#6B7280] max-w-md mx-auto leading-relaxed">
          {e500.description}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button
          variant="primary"
          size="md"
          onClick={() => window.location.reload()}
          icon={<RefreshCw className="w-4 h-4" />}
        >
          Restart Engine (Reload)
        </Button>
        <Button variant="outline" size="md" to="/" icon={<Home className="w-4 h-4" />}>
          Back to Home
        </Button>
      </div>
    </div>
  );
};
