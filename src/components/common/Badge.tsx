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
    emerald: 'bg-emerald-100 text-emerald-900 border border-emerald-300',
    amber: 'bg-amber-100 text-amber-950 border border-amber-300 font-bold',
    blue: 'bg-blue-100 text-blue-900 border border-blue-200',
    slate: 'bg-slate-100 text-slate-800 border border-slate-200',
    red: 'bg-red-100 text-red-900 border border-red-200',
    purple: 'bg-purple-100 text-purple-900 border border-purple-200',
  };

  return (
    <span className={twMerge(clsx('inline-flex items-center tracking-wide leading-none', sizeStyles[size], variantStyles[variant], className))}>
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
