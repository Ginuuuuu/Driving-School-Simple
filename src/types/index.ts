export type TransmissionType = 'manual' | 'automatic' | 'both';
export type ExperienceLevel = 'absolute_beginner' | 'some_experience' | 'test_prep' | 'refresher';
export type TimeSlot = 'early_morning' | 'morning' | 'afternoon' | 'evening' | 'weekend_only';

export interface SiteConfig {
  brandName: string;
  tagline: string;
  shortDescription: string;
  phoneDisplay: string;
  phoneDial: string;
  whatsappNumber: string;
  whatsappDefaultMessage: string;
  email: string;
  emergencyHelpline: string;
  foundedYear: string;
  operatingHours: {
    weekdays: string;
    weekends: string;
    note: string;
  };
  branches: {
    id: string;
    name: string;
    address: string;
    city: string;
    pincode: string;
    isMainBranch: boolean;
    phone: string;
    googleMapsUrl: string;
  }[];
  socialLinks: {
    platform: 'instagram' | 'youtube' | 'facebook' | 'linkedin' | 'x';
    url: string;
    label: string;
  }[];
  trustStats: {
    label: string;
    value: string;
    subtext: string;
  }[];
  serviceCities: string[];
}

export interface CourseModule {
  sessionNumber: number;
  title: string;
  durationMinutes: number;
  objective: string;
  topics: string[];
  isRtoTrackSpecific?: boolean;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  badge?: string;
  category: 'beginner' | 'refresher' | 'automatic' | 'manual' | 'highway_defensive' | 'rto_prep';
  transmission: TransmissionType;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  durationHours: number;
  sessionsCount: number;
  price: number;
  originalPrice?: number;
  summary: string;
  description: string;
  suitableFor: string[];
  whatIncluded: string[];
  learningOutcomes: string[];
  syllabus: CourseModule[];
  faqs: { question: string; answer: string }[];
  popular?: boolean;
}

export interface RoadmapStep {
  id: string;
  stepNumber: number;
  title: string;
  subtitle: string;
  stageName: string;
  approxDuration: string;
  rtoPortalUrl?: string;
  summary: string;
  details: string;
  requiredDocuments: string[];
  rtoTrackManeuvers?: string[];
  keyRulesToRemember: string[];
  instructorProTip: string;
  isSimulatorPhase?: boolean;
  checklistItems: {
    id: string;
    task: string;
    officialRequirement: boolean;
  }[];
}

export interface Instructor {
  id: string;
  name: string;
  role: string;
  experienceYears: number;
  rating: number;
  studentCount: number;
  photoUrl: string;
  bio: string;
  languages: string[];
  specialties: string[];
  transmissionSpecialty: TransmissionType;
  verifiedBadges: string[];
  quote: string;
}

export interface PricingPackage {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  durationHours: number;
  sessionsCount: number;
  popular?: boolean;
  badge?: string;
  idealFor: string;
  featuresIncluded: string[];
  featuresExcluded: string[];
  vehicleTypesIncluded: string[];
  emiAvailable: boolean;
}

export interface PricingAddOn {
  id: string;
  title: string;
  description: string;
  price: number;
  perUnit: string;
  badge?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  city: string;
  age?: number;
  courseTitle: string;
  rating: number;
  date: string;
  avatarUrl: string;
  story: string;
  vehicleLearned: string;
  instructorName: string;
  firstTimePass: boolean;
  tag: 'First-time Driver' | 'Nervous Driver' | 'Working Professional' | 'Senior Citizen' | 'Highway Commuter';
}

export interface FAQItem {
  id: string;
  category: 'Licence & RTO' | 'Lessons & Scheduling' | 'Vehicles & Safety' | 'Pricing & Payments' | 'Beginners';
  question: string;
  answer: string;
  popular?: boolean;
}

export interface ResourceGuide {
  id: string;
  slug: string;
  title: string;
  category: 'RTO Test' | 'Road Signs' | 'Driving Technique' | 'Car Maintenance' | 'Safety';
  readTimeMinutes: number;
  publishDate: string;
  summary: string;
  keyTakeaways: string[];
  sections: {
    heading: string;
    content: string;
    illustration?: string;
  }[];
}

export interface AboutContent {
  missionHeadline: string;
  missionBody: string;
  visionHeadline: string;
  visionBody: string;
  safetyPledge: string[];
  fourPillars: {
    title: string;
    description: string;
    icon: string;
  }[];
  fleetStandards: {
    title: string;
    description: string;
    metric: string;
  }[];
}

export interface LegalContent {
  privacyPolicy: {
    lastUpdated: string;
    sections: { heading: string; body: string }[];
  };
  termsAndConditions: {
    lastUpdated: string;
    sections: { heading: string; body: string }[];
  };
}

export interface ErrorContent {
  error404: {
    title: string;
    subtitle: string;
    description: string;
    primaryButtonText: string;
    secondaryButtonText: string;
  };
  error403: {
    title: string;
    subtitle: string;
    description: string;
  };
  error500: {
    title: string;
    subtitle: string;
    description: string;
  };
  error503: {
    title: string;
    subtitle: string;
    description: string;
  };
  offline: {
    title: string;
    subtitle: string;
    description: string;
  };
}

export interface EnquiryFormState {
  fullName: string;
  phoneNumber: string;
  email: string;
  courseSlug: string;
  transmission: TransmissionType;
  preferredDate: string;
  preferredTimeSlot: TimeSlot;
  pickupArea: string;
  city: string;
  experienceLevel: ExperienceLevel;
  preferredInstructorId?: string;
  message: string;
  agreeToTerms: boolean;
}

export interface AllSiteData {
  siteConfig: SiteConfig;
  courses: Course[];
  roadmap: RoadmapStep[];
  instructors: Instructor[];
  pricing: {
    packages: PricingPackage[];
    addOns: PricingAddOn[];
    comparisonFeatures: {
      category: string;
      features: {
        name: string;
        starter: boolean | string;
        standard: boolean | string;
        mastery: boolean | string;
      }[];
    }[];
  };
  testimonials: Testimonial[];
  faqs: FAQItem[];
  resources: ResourceGuide[];
  about: AboutContent;
  legal: LegalContent;
  errors: ErrorContent;
}
