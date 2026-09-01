import React from 'react';

interface RoadmapCarProps {
  className?: string;
  isCompact?: boolean;
}

export const RoadmapCar: React.FC<RoadmapCarProps> = ({ className = '', isCompact = false }) => {
  return (
    <div className={`relative flex items-center justify-center filter drop-shadow-md select-none ${className}`}>
      {/* Top-down modern hatchback/sedan illustration */}
      <svg
        viewBox="0 0 60 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={isCompact ? 'w-8 h-14' : 'w-10 h-16'}
      >
        {/* Car Body Shadow */}
        <rect x="6" y="8" width="48" height="84" rx="14" fill="#000000" opacity="0.35" filter="blur(2px)" />

        {/* Outer Chassis / Body */}
        <rect x="8" y="6" width="44" height="84" rx="12" fill="#082B4C" stroke="#F4C400" strokeWidth="1.5" />

        {/* Front & Rear Bumpers */}
        <rect x="12" y="5" width="36" height="4" rx="2" fill="#F4C400" />
        <rect x="14" y="87" width="32" height="3" rx="1.5" fill="#F4C400" />

        {/* Wheels (4 corners) */}
        <rect x="4" y="16" width="5" height="14" rx="2" fill="#111827" stroke="#374151" />
        <rect x="51" y="16" width="5" height="14" rx="2" fill="#111827" stroke="#374151" />
        <rect x="4" y="66" width="5" height="14" rx="2" fill="#111827" stroke="#374151" />
        <rect x="51" y="66" width="5" height="14" rx="2" fill="#111827" stroke="#374151" />

        {/* Windshield & Rear Window */}
        <path d="M14 26C14 22 18 19 30 19C42 19 46 22 46 26L43 38H17L14 26Z" fill="#CBD5E1" opacity="0.9" />
        <path d="M16 66H44L42 76C42 78 38 80 30 80C22 80 18 78 18 76L16 66Z" fill="#CBD5E1" opacity="0.8" />

        {/* Side Windows */}
        <path d="M14 41H18V62H14V41Z" fill="#CBD5E1" opacity="0.75" />
        <path d="M42 41H46V62H42V41Z" fill="#CBD5E1" opacity="0.75" />

        {/* Car Roof with "L" Learner Magnet / Academy Logo */}
        <rect x="18" y="38" width="24" height="26" rx="4" fill="#061F36" />
        <rect x="22" y="42" width="16" height="18" rx="2" fill="#FFFFFF" />
        {/* Red 'L' Symbol */}
        <path d="M26 46V56H34" stroke="#DC2626" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter" />

        {/* Headlight Beams */}
        <circle cx="15" cy="8" r="2.5" fill="#F4C400" />
        <circle cx="45" cy="8" r="2.5" fill="#F4C400" />

        {/* Taillights */}
        <circle cx="15" cy="88" r="2" fill="#EF4444" />
        <circle cx="45" cy="88" r="2" fill="#EF4444" />
      </svg>
    </div>
  );
};
