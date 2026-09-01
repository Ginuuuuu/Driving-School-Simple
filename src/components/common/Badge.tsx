import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'emerald' | 'amber' | 'blue' | 'slate' | 'red' | 'purple';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'emerald',
  size = 'md',
  icon,
  className,
}) => {
  const sizeStyles = {
    sm: 'text-[0.7rem] px-2 py-0.5 gap-1 font-semibold rounded-md',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-semibold rounded-lg',
    lg: 'text-sm px-3.5 py-1.5 gap-2 font-bold rounded-xl',
  };

  const variantStyles = {
    emerald: 'bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold',
    amber: 'bg-[#F4C400]/20 text-[#082B4C] border border-[#F4C400]/40 font-bold',
    blue: 'bg-[#082B4C]/10 text-[#082B4C] border border-[#082B4C]/20 font-semibold',
    slate: 'bg-[#F5F6F7] text-[#202B33] border border-[#E5E7EB] font-medium',
    red: 'bg-red-50 text-red-700 border border-red-200 font-semibold',
    purple: 'bg-[#082B4C]/10 text-[#082B4C] border border-[#082B4C]/20 font-semibold',
  };

  return (
    <span className={twMerge(clsx('inline-flex items-center tracking-wide leading-none', sizeStyles[size], variantStyles[variant], className))}>
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
