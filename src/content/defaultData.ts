import { AllSiteData } from '../types';
import { defaultSiteConfig } from './siteConfig';
import { defaultCourses } from './courses';
import { defaultRoadmap } from './roadmap';
import { defaultInstructors } from './instructors';
import { defaultPricingPackages, defaultPricingAddOns, defaultComparisonCategories } from './pricing';
import { defaultTestimonials } from './testimonials';
import { defaultFAQs } from './faqs';
import { defaultResources } from './resources';
import { defaultAbout } from './about';
import { defaultLegal } from './legal';
import { defaultErrors } from './errors';

export const initialSiteData: AllSiteData = {
  siteConfig: defaultSiteConfig,
  courses: defaultCourses,
  roadmap: defaultRoadmap,
  instructors: defaultInstructors,
  pricing: {
    packages: defaultPricingPackages,
    addOns: defaultPricingAddOns,
    comparisonFeatures: defaultComparisonCategories,
  },
  testimonials: defaultTestimonials,
  faqs: defaultFAQs,
  resources: defaultResources,
  about: defaultAbout,
  legal: defaultLegal,
  errors: defaultErrors,
};
