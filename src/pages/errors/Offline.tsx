import React from 'react';
import { WifiOff, RefreshCw, Phone } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { Button } from '../../components/common/Button';
import { SEO } from '../../components/common/SEO';

export const Offline: React.FC = () => {
  const { siteData } = useContent();
  const { errors, siteConfig } = siteData;
  const off = errors.offline;

  return (
    <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-6">
      <SEO title="Offline - Connection Lost" description="You are currently offline." />

      <div className="w-20 h-20 rounded-full bg-[#E2F3F0] text-[#26423E] flex items-center justify-center mx-auto">
        <WifiOff className="w-10 h-10 text-[#42B7A7]" />
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl sm:text-4xl font-extrabold font-display text-[#26423E]">
          {off.title}
        </h1>
        <p className="text-sm font-semibold text-[#26423E]">
          {off.subtitle}
        </p>
        <p className="text-xs text-[#56776A] max-w-md mx-auto leading-relaxed">
          {off.description}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button
          variant="primary"
          size="md"
          onClick={() => window.location.reload()}
          icon={<RefreshCw className="w-4 h-4" />}
        >
          Retry Connection
        </Button>
        <Button
          variant="outline"
          size="md"
          href={`tel:${siteConfig.phoneDial}`}
          icon={<Phone className="w-4 h-4" />}
        >
          Call Offline Support
        </Button>
      </div>
    </div>
  );
};
