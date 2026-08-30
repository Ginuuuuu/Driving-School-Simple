import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  AllSiteData,
  SiteConfig,
  Course,
  RoadmapStep,
  Instructor,
  PricingPackage,
  PricingAddOn,
  Testimonial,
  FAQItem,
  ResourceGuide,
  AboutContent,
  LegalContent,
  ErrorContent,
} from '../types';
import { initialSiteData } from '../content/defaultData';
import { useToast } from './ToastContext';

interface ContentContextType {
  siteData: AllSiteData;
  isCustomized: boolean;
  updateSiteConfig: (config: Partial<SiteConfig>) => void;
  updateCourses: (courses: Course[]) => void;
  updateSingleCourse: (course: Course) => void;
  addCourse: (course: Course) => void;
  deleteCourse: (id: string) => void;
  updateRoadmap: (roadmap: RoadmapStep[]) => void;
  updateInstructors: (instructors: Instructor[]) => void;
  updatePricingPackages: (packages: PricingPackage[]) => void;
  updatePricingAddOns: (addOns: PricingAddOn[]) => void;
  updateTestimonials: (testimonials: Testimonial[]) => void;
  updateFAQs: (faqs: FAQItem[]) => void;
  updateResources: (resources: ResourceGuide[]) => void;
  updateAbout: (about: AboutContent) => void;
  updateLegal: (legal: LegalContent) => void;
  updateErrors: (errors: ErrorContent) => void;
  resetToDefaults: () => void;
  exportConfigAsJSON: () => void;
  importConfigFromJSON: (jsonString: string) => boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);
const CONTENT_STORAGE_KEY = 'drivecraft_site_content_v1';

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [siteData, setSiteData] = useState<AllSiteData>(() => {
    try {
      const saved = localStorage.getItem(CONTENT_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Merge with defaults to ensure all keys exist
        return {
          ...initialSiteData,
          ...parsed,
          siteConfig: { ...initialSiteData.siteConfig, ...(parsed.siteConfig || {}) },
          pricing: { ...initialSiteData.pricing, ...(parsed.pricing || {}) },
          about: { ...initialSiteData.about, ...(parsed.about || {}) },
          legal: { ...initialSiteData.legal, ...(parsed.legal || {}) },
          errors: { ...initialSiteData.errors, ...(parsed.errors || {}) },
        };
      }
    } catch (e) {
      console.error('Failed to load saved site data from localStorage:', e);
    }
    return initialSiteData;
  });

  const [isCustomized, setIsCustomized] = useState<boolean>(() => {
    return !!localStorage.getItem(CONTENT_STORAGE_KEY);
  });

  const { showToast } = useToast();

  // Helper to persist state
  const persist = useCallback((newData: AllSiteData) => {
    setSiteData(newData);
    try {
      localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(newData));
      setIsCustomized(true);
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }, []);

  const updateSiteConfig = useCallback(
    (config: Partial<SiteConfig>) => {
      persist({
        ...siteData,
        siteConfig: { ...siteData.siteConfig, ...config },
      });
      showToast({ type: 'success', title: 'Settings Updated', message: 'Site configuration saved to active state.' });
    },
    [siteData, persist, showToast]
  );

  const updateCourses = useCallback(
    (courses: Course[]) => {
      persist({ ...siteData, courses });
      showToast({ type: 'success', title: 'Courses Updated', message: 'Course catalog refreshed.' });
    },
    [siteData, persist, showToast]
  );

  const updateSingleCourse = useCallback(
    (course: Course) => {
      const newCourses = siteData.courses.map((c) => (c.id === course.id ? course : c));
      persist({ ...siteData, courses: newCourses });
      showToast({ type: 'success', title: 'Course Saved', message: `Updated details for ${course.shortTitle}.` });
    },
    [siteData, persist, showToast]
  );

  const addCourse = useCallback(
    (course: Course) => {
      persist({ ...siteData, courses: [...siteData.courses, course] });
      showToast({ type: 'success', title: 'Course Added', message: `${course.shortTitle} added to curriculum.` });
    },
    [siteData, persist, showToast]
  );

  const deleteCourse = useCallback(
    (id: string) => {
      const course = siteData.courses.find((c) => c.id === id);
      persist({ ...siteData, courses: siteData.courses.filter((c) => c.id !== id) });
      showToast({ type: 'info', title: 'Course Removed', message: `${course?.shortTitle || 'Course'} deleted.` });
    },
    [siteData, persist, showToast]
  );

  const updateRoadmap = useCallback(
    (roadmap: RoadmapStep[]) => {
      persist({ ...siteData, roadmap });
      showToast({ type: 'success', title: 'Licence Roadmap Updated', message: 'Milestone data refreshed.' });
    },
    [siteData, persist, showToast]
  );

  const updateInstructors = useCallback(
    (instructors: Instructor[]) => {
      persist({ ...siteData, instructors });
      showToast({ type: 'success', title: 'Instructors Roster Updated', message: 'Team profiles saved.' });
    },
    [siteData, persist, showToast]
  );

  const updatePricingPackages = useCallback(
    (packages: PricingPackage[]) => {
      persist({
        ...siteData,
        pricing: { ...siteData.pricing, packages },
      });
      showToast({ type: 'success', title: 'Pricing Packages Updated', message: 'Rates & inclusions saved.' });
    },
    [siteData, persist, showToast]
  );

  const updatePricingAddOns = useCallback(
    (addOns: PricingAddOn[]) => {
      persist({
        ...siteData,
        pricing: { ...siteData.pricing, addOns },
      });
      showToast({ type: 'success', title: 'Add-Ons Updated', message: 'Extra services updated.' });
    },
    [siteData, persist, showToast]
  );

  const updateTestimonials = useCallback(
    (testimonials: Testimonial[]) => {
      persist({ ...siteData, testimonials });
      showToast({ type: 'success', title: 'Testimonials Updated', message: 'Learner stories refreshed.' });
    },
    [siteData, persist, showToast]
  );

  const updateFAQs = useCallback(
    (faqs: FAQItem[]) => {
      persist({ ...siteData, faqs });
      showToast({ type: 'success', title: 'FAQs Saved', message: 'Frequently Asked Questions updated.' });
    },
    [siteData, persist, showToast]
  );

  const updateResources = useCallback(
    (resources: ResourceGuide[]) => {
      persist({ ...siteData, resources });
      showToast({ type: 'success', title: 'Resources Saved', message: 'Driving guides updated.' });
    },
    [siteData, persist, showToast]
  );

  const updateAbout = useCallback(
    (about: AboutContent) => {
      persist({ ...siteData, about });
      showToast({ type: 'success', title: 'About Content Saved', message: 'Mission and standards updated.' });
    },
    [siteData, persist, showToast]
  );

  const updateLegal = useCallback(
    (legal: LegalContent) => {
      persist({ ...siteData, legal });
      showToast({ type: 'success', title: 'Legal Policies Saved', message: 'Privacy & Terms updated.' });
    },
    [siteData, persist, showToast]
  );

  const updateErrors = useCallback(
    (errors: ErrorContent) => {
      persist({ ...siteData, errors });
      showToast({ type: 'success', title: 'Error Messaging Saved', message: 'Custom error templates updated.' });
    },
    [siteData, persist, showToast]
  );

  const resetToDefaults = useCallback(() => {
    localStorage.removeItem(CONTENT_STORAGE_KEY);
    setSiteData(initialSiteData);
    setIsCustomized(false);
    showToast({
      type: 'info',
      title: 'Restored Factory Defaults',
      message: 'All site content reset to original configuration files.',
    });
  }, [showToast]);

  const exportConfigAsJSON = useCallback(() => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(siteData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `drivecraft-content-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    showToast({
      type: 'success',
      title: 'JSON Export Complete',
      message: 'Downloaded updated site content JSON for your codebase/backup.',
    });
  }, [siteData, showToast]);

  const importConfigFromJSON = useCallback(
    (jsonString: string): boolean => {
      try {
        const parsed = JSON.parse(jsonString);
        if (!parsed.siteConfig || !parsed.courses || !parsed.roadmap) {
          throw new Error('Invalid schema: Missing required top-level content keys.');
        }
        persist(parsed);
        showToast({
          type: 'success',
          title: 'Config Imported Successfully',
          message: 'Website content updated from JSON file.',
        });
        return true;
      } catch (err: any) {
        showToast({
          type: 'error',
          title: 'Import Failed',
          message: err?.message || 'Invalid JSON format or corrupted schema.',
        });
        return false;
      }
    },
    [persist, showToast]
  );

  return (
    <ContentContext.Provider
      value={{
        siteData,
        isCustomized,
        updateSiteConfig,
        updateCourses,
        updateSingleCourse,
        addCourse,
        deleteCourse,
        updateRoadmap,
        updateInstructors,
        updatePricingPackages,
        updatePricingAddOns,
        updateTestimonials,
        updateFAQs,
        updateResources,
        updateAbout,
        updateLegal,
        updateErrors,
        resetToDefaults,
        exportConfigAsJSON,
        importConfigFromJSON,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
