import React from 'react';

interface SectionHeadingProps {
  pillText?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  isLight?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  pillText,
  title,
  subtitle,
  align = 'center',
  isLight = false,
  className = '',
}) => {
  const isCentered = align === 'center';

  return (
    <div className={`mb-12 md:mb-16 ${isCentered ? 'text-center mx-auto max-w-3xl' : 'max-w-2xl'} ${className}`}>
      {pillText && (
        <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-3.5 ${
          isLight
            ? 'bg-[#F4C400]/20 text-[#FFD21A] border border-[#F4C400]/40'
            : 'bg-[#F4C400]/15 text-[#082B4C] border border-[#F4C400]/30'
        }`}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#F4C400] animate-pulse" />
          {pillText}
        </div>
      )}

      <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight font-display leading-[1.2] ${
        isLight ? 'text-white' : 'text-[#202B33]'
      }`}>
        {title}
      </h2>

      {subtitle && (
        <p className={`mt-4 text-sm sm:text-base lg:text-lg leading-relaxed ${
          isLight ? 'text-[#F5F6F7]/85' : 'text-[#6B7280]'
        }`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};
