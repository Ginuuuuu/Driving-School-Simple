import React from 'react';
import { Wrench, RefreshCw, Home } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { Button } from '../../components/common/Button';
import { SEO } from '../../components/common/SEO';

export const Error503: React.FC = () => {
  const { siteData } = useContent();
  const { errors } = siteData;
  const e503 = errors.error503;

  return (
    <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-6">
      <SEO title="503 - Pit Stop Maintenance" description="Service temporarily under maintenance." />

      <div className="w-20 h-20 rounded-full bg-[#E2F3F0] text-[#26423E] flex items-center justify-center mx-auto">
        <Wrench className="w-10 h-10 animate-spin text-[#42B7A7]" />
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl sm:text-4xl font-extrabold font-display text-[#26423E]">
          {e503.title}
        </h1>
        <p className="text-sm font-semibold text-[#26423E]">
          {e503.subtitle}
        </p>
        <p className="text-xs text-[#56776A] max-w-md mx-auto leading-relaxed">
          {e503.description}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button
          variant="primary"
          size="md"
          onClick={() => window.location.reload()}
          icon={<RefreshCw className="w-4 h-4" />}
        >
          Check Again
        </Button>
        <Button variant="outline" size="md" to="/" icon={<Home className="w-4 h-4" />}>
          Back to Home
        </Button>
      </div>
    </div>
  );
};
