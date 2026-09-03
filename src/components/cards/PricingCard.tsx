import React from 'react';
import { Check, X, Sparkles, Shield, Clock } from 'lucide-react';
import { PricingPackage } from '../../types';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

interface PricingCardProps {
  pkg: PricingPackage;
  onSelectPackage?: (slug: string) => void;
}

export const PricingCard: React.FC<PricingCardProps> = ({ pkg, onSelectPackage }) => {
  return (
    <div
      className={`relative flex flex-col justify-between w-full h-full rounded-2xl sm:rounded-3xl bg-white border hover-lift transition-all duration-300 ${
        pkg.popular
          ? 'border-[#F4C400] shadow-xl ring-2 ring-[#F4C400]/25 sm:-translate-y-2'
          : 'border-[#E5E7EB] shadow-sm hover:shadow-lg'
      }`}
    >
      {/* Popular Flag Header */}
      {pkg.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge variant={pkg.popular ? 'amber' : 'emerald'} size="sm" icon={<Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}>
            {pkg.badge}
          </Badge>
        </div>
      )}

      {/* Package Header */}
      <div className="p-4 sm:p-8 pb-3.5 sm:pb-6 border-b border-[#E5E7EB]">
        <h3 className="text-lg sm:text-xl font-bold font-display text-[#202B33] leading-tight">
          {pkg.name}
        </h3>
        <p className="mt-1 text-xs text-[#6B7280] leading-relaxed">
          {pkg.tagline}
        </p>

        {/* Pricing Figures */}
        <div className="mt-3 sm:mt-5 flex items-baseline gap-1.5 sm:gap-2">
          <span className="text-2xl sm:text-4xl font-extrabold text-[#082B4C] font-display">
            ₹{pkg.price.toLocaleString('en-IN')}
          </span>
          {pkg.originalPrice && (
            <span className="text-xs sm:text-sm text-[#6B7280] line-through">
              ₹{pkg.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
          <span className="text-[0.7rem] sm:text-xs text-[#6B7280] font-medium ml-auto">
            All-Inclusive
          </span>
        </div>

        {/* Package Highlights */}
        <div className="mt-3 sm:mt-4 flex items-center justify-between text-[0.72rem] sm:text-xs font-semibold text-[#082B4C] bg-[#F4C400]/15 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl border border-[#F4C400]/30">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#082B4C] shrink-0" />
            {pkg.durationHours} Hours Practical
          </span>
          <span>{pkg.sessionsCount} Sessions</span>
        </div>
      </div>

      {/* Feature Inclusions List */}
      <div className="p-4 sm:p-8 py-3.5 sm:py-6 space-y-2 sm:space-y-3.5 flex-1">
        <div className="text-[0.65rem] sm:text-[0.7rem] uppercase tracking-wider font-bold text-[#6B7280]">
          What’s Included:
        </div>

        <ul className="space-y-1.5 sm:space-y-2.5">
          {pkg.featuresIncluded.map((feat, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#202B33]">
              <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span className="leading-snug">{feat}</span>
            </li>
          ))}

          {pkg.featuresExcluded.map((feat, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs text-[#6B7280] opacity-60">
              <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#6B7280] shrink-0 mt-0.5" />
              <span className="leading-snug line-through">{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Package Card CTA */}
      <div className="p-4 sm:p-8 pt-0 sm:pt-0">
        <Button
          variant={pkg.popular ? 'primary' : 'outline'}
          size="md"
          onClick={() => onSelectPackage?.(pkg.slug)}
          className="w-full justify-center shadow-xs font-bold text-xs sm:text-sm py-2.5 sm:py-3"
        >
          Select {pkg.name}
        </Button>
      </div>
    </div>
  );
};
