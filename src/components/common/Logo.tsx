import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'auto';
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
  isLink?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'dark',
  showTagline = false,
  size = 'md',
  isLink = true,
}) => {
  const isLight = variant === 'light';

  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const content = (
    <div className={`flex items-center gap-2.5 group select-none ${className}`}>
      {/* Emblem Icon */}
      <div className={`relative flex items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105 ${iconSizes[size]}`}>
        <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
          {/* Base badge */}
          <rect width="44" height="44" rx="12" fill={isLight ? '#FFFFFF' : '#082B4C'} />
          
          {/* Steering Wheel Outer Arc */}
          <circle cx="22" cy="22" r="15" stroke={isLight ? '#082B4C' : '#F4C400'} strokeWidth="2.5" strokeDasharray="3 2" />
          
          {/* Internal spokes */}
          <path d="M22 10V18M10 22H18M34 22H26M15 29L20 24M29 29L24 24" stroke={isLight ? '#082B4C' : '#FFD21A'} strokeWidth="2" strokeLinecap="round" />
          
          {/* Forward Highway Perspective Arrow */}
          <path d="M18 34L22 14L26 34H18Z" fill="#F4C400" opacity="0.95" />
          <path d="M22 14L22 28" stroke={isLight ? '#082B4C' : '#FFFFFF'} strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2" />
          
          {/* Center Hub */}
          <circle cx="22" cy="22" r="4.5" fill={isLight ? '#082B4C' : '#F4C400'} />
          <circle cx="22" cy="22" r="2" fill={isLight ? '#FFFFFF' : '#082B4C'} />
        </svg>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col">
        <div className="flex items-center font-display font-extrabold tracking-tight leading-none">
          <span className={isLight ? 'text-white' : 'text-[#082B4C]'}>Drive</span>
          <span className="text-[#F4C400] font-black">Craft</span>
          <span className={`ml-1 text-[0.65em] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded ${isLight ? 'bg-white/15 text-[#FFD21A]' : 'bg-[#082B4C]/10 text-[#082B4C]'}`}>
            Academy
          </span>
        </div>
        {showTagline && (
          <span className={`text-[0.68rem] tracking-wider uppercase font-medium mt-0.5 hidden sm:block ${isLight ? 'text-[#F5F6F7]/80' : 'text-[#6B7280]'}`}>
            Master Every Mile
          </span>
        )}
      </div>
    </div>
  );

  if (isLink) {
    return (
      <Link to="/" aria-label="DriveCraft Motor Academy Home" className="focus-visible:ring-2 ring-[#F4C400] rounded-lg">
        {content}
      </Link>
    );
  }

  return content;
};
