import React from 'react';
import { RoadmapStep } from '../../types';
import { ScrollFlowingRoadmap } from './ScrollFlowingRoadmap';

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
      <ScrollFlowingRoadmap
        steps={steps}
        onOpenBookingModal={onOpenBookingModal}
        isCompactPreview={isCompactPreview}
      />
    </div>
  );
};
