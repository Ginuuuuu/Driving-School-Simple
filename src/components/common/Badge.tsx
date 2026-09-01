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
    emerald: 'bg-[#E2F3F0] text-[#26423E] border border-[#C2D3D0]',
    amber: 'bg-[#C2D3D0] text-[#26423E] border border-[#56776A]/30 font-bold',
    blue: 'bg-[#E2F3F0] text-[#26423E] border border-[#42B7A7]/40',
    slate: 'bg-[#EDEFF4] text-[#26423E] border border-[#C2D3D0]',
    red: 'bg-[#FDE8E8] text-[#C84040] border border-[#F8B4B4]',
    purple: 'bg-[#E2F3F0] text-[#26423E] border border-[#C2D3D0]',
  };

  return (
    <span className={twMerge(clsx('inline-flex items-center tracking-wide leading-none', sizeStyles[size], variantStyles[variant], className))}>
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
