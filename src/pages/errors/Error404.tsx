import React from 'react';
import { Compass, Home, BookOpen, Phone, ArrowLeft } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { Button } from '../../components/common/Button';
import { SEO } from '../../components/common/SEO';

import { defaultErrors } from '../../content/errors';

export const Error404: React.FC = () => {
  const { siteData } = useContent();
  const errors = siteData?.errors || defaultErrors;
  const e404 = errors?.error404 || defaultErrors.error404;

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-8">
      <SEO title="404 - Page Not Found" description="The page you are looking for does not exist." />

      {/* Visual illustration */}
      <div className="w-24 h-24 rounded-full bg-[#FDF2F5] text-[#BC2639] flex items-center justify-center mx-auto shadow-inner">
        <Compass className="w-12 h-12 animate-pulse" />
      </div>

      <div className="space-y-3">
        <span className="text-xs uppercase font-extrabold tracking-widest text-[#39340F] bg-[#FDF2F5] px-3 py-1 rounded-full border border-[#FFC5DC]">
          Navigation Detour
        </span>
        <h1 className="text-3xl sm:text-5xl font-black font-display text-[#39340F]">
          {e404.title}
        </h1>
        <p className="text-base text-[#39340F] font-semibold">
          {e404.subtitle}
        </p>
        <p className="text-xs sm:text-sm text-[#404D68] max-w-md mx-auto leading-relaxed">
          {e404.description}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button variant="primary" size="lg" to="/" icon={<Home className="w-4 h-4" />}>
          {e404.primaryButtonText}
        </Button>
        <Button variant="outline" size="lg" to="/courses" icon={<BookOpen className="w-4 h-4" />}>
          {e404.secondaryButtonText}
        </Button>
      </div>
    </div>
  );
};
