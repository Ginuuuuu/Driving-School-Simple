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
    emerald: 'bg-[#FDF2F5] text-[#BC2639] border border-[#FFC5DC]',
    amber: 'bg-[#FFC5DC]/60 text-[#39340F] border border-[#FFC5DC] font-bold',
    blue: 'bg-[#D4E2DF]/50 text-[#404D68] border border-[#9FBAB4]',
    slate: 'bg-[#FAF6F8] text-[#39340F] border border-[#D4E2DF]',
    red: 'bg-[#FDF2F5] text-[#BC2639] border border-[#FFC5DC]',
    purple: 'bg-[#FDF2F5] text-[#BC2639] border border-[#FFC5DC]',
  };

  return (
    <span className={twMerge(clsx('inline-flex items-center tracking-wide leading-none', sizeStyles[size], variantStyles[variant], className))}>
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
