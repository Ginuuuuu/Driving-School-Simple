import React from 'react';
import { Compass, Home, BookOpen, Phone, ArrowLeft } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { Button } from '../../components/common/Button';
import { SEO } from '../../components/common/SEO';

export const Error404: React.FC = () => {
  const { siteData } = useContent();
  const { errors } = siteData;
  const e404 = errors.error404;

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-8">
      <SEO title="404 - Page Not Found" description="The page you are looking for does not exist." />

      {/* Visual illustration */}
      <div className="w-24 h-24 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-inner">
        <Compass className="w-12 h-12 animate-pulse" />
      </div>

      <div className="space-y-3">
        <span className="text-xs uppercase font-extrabold tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          Navigation Detour
        </span>
        <h1 className="text-3xl sm:text-5xl font-black font-display text-slate-900">
          {e404.title}
        </h1>
        <p className="text-base text-slate-700 font-semibold">
          {e404.subtitle}
        </p>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
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
