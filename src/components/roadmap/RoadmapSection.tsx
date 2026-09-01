import React from 'react';
import { RoadmapStep } from '../../types';
import { ScrollFlowingRoadmap } from './ScrollFlowingRoadmap';
import { RoadmapMobile } from './RoadmapMobile';

interface RoadmapSectionProps {
  steps: RoadmapStep[];
  onOpenBookingModal?: () => void;
  className?: string;
  isCompactPreview?: boolean;
}

export const RoadmapSection: React.FC<RoadmapSectionProps> = ({
  steps,
  onOpenBookingModal,
  className = '',
  isCompactPreview = false,
}) => {
  return (
    <div className={`w-full ${className}`}>
      {/* Mobile View: Clean Tap-to-Expand Accordion with Title-First Scannability */}
      <div className="block md:hidden">
        <RoadmapMobile
          steps={steps}
          onOpenBookingModal={onOpenBookingModal}
          isCompactPreview={isCompactPreview}
        />
      </div>

      {/* Desktop/Tablet View: Smooth Flowing Interactive Scroll Timeline */}
      <div className="hidden md:block">
        <ScrollFlowingRoadmap
          steps={steps}
          onOpenBookingModal={onOpenBookingModal}
          isCompactPreview={isCompactPreview}
        />
      </div>
    </div>
  );
};

