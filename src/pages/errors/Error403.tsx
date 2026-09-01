import React from 'react';
import { ShieldAlert, Home, LogIn } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { Button } from '../../components/common/Button';
import { SEO } from '../../components/common/SEO';

export const Error403: React.FC = () => {
  const { siteData } = useContent();
  const { errors } = siteData;
  const e403 = errors.error403;

  return (
    <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-6">
      <SEO title="403 - Restricted Access" description="Access restricted to authorized personnel." />

      <div className="w-20 h-20 rounded-full bg-[#FDF2F5] text-[#BC2639] flex items-center justify-center mx-auto">
        <ShieldAlert className="w-10 h-10 text-[#BC2639]" />
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl sm:text-4xl font-extrabold font-display text-[#39340F]">
          {e403.title}
        </h1>
        <p className="text-sm font-semibold text-[#39340F]">
          {e403.subtitle}
        </p>
        <p className="text-xs text-[#404D68] max-w-md mx-auto leading-relaxed">
          {e403.description}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button variant="primary" size="md" to="/" icon={<Home className="w-4 h-4" />}>
          Back to Safety (Home)
        </Button>
      </div>
    </div>
  );
};
