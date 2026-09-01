import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  Copy,
  Mail,
  RefreshCw,
  Phone,
  ArrowRight,
  Shield,
  Clock,
  Car,
} from 'lucide-react';
import { EnquiryFormState, TransmissionType, ExperienceLevel, TimeSlot } from '../../types';
import { useContent } from '../../context/ContentContext';
import { generateWhatsAppLink, formatWhatsAppMessage } from '../../utils/whatsapp';
import { useToast } from '../../context/ToastContext';
import { Button } from '../common/Button';

interface EnquiryFormProps {
  preselectedCourseSlug?: string;
  preselectedInstructorId?: string;
  onSuccess?: () => void;
  isModal?: boolean;
}

export const EnquiryForm: React.FC<EnquiryFormProps> = ({
  preselectedCourseSlug,
  preselectedInstructorId,
  onSuccess,
  isModal = false,
}) => {
  const { siteData } = useContent();
  const { siteConfig, courses, instructors } = useContent().siteData;
  const { showToast } = useToast();

  const [formState, setFormState] = useState<EnquiryFormState>({
    fullName: '',
    phoneNumber: '',
    email: '',
    courseSlug: preselectedCourseSlug || courses[0]?.slug || 'beginner-driving-mastery',
    transmission: 'manual',
    preferredDate: '',
    preferredTimeSlot: 'morning',
    pickupArea: '',
    city: siteConfig.serviceCities[0] || 'Delhi NCR',
    experienceLevel: 'absolute_beginner',
    preferredInstructorId: preselectedInstructorId || '',
    message: '',
    agreeToTerms: true,
  });

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLink, setSubmittedLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const validateAll = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formState.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.';
    } else if (formState.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters.';
    }

    const cleanPhone = formState.phoneNumber.replace(/[^0-9]/g, '');
    if (!cleanPhone) {
      newErrors.phoneNumber = 'Phone number is required for lesson coordination.';
    } else if (cleanPhone.length < 10) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit mobile number.';
    } else if (!/^[6-9]\d{9}$/.test(cleanPhone.slice(-10))) {
      newErrors.phoneNumber = 'Enter a valid 10-digit mobile number.';
    }

    if (!formState.pickupArea.trim()) {
      newErrors.pickupArea = 'Please provide your locality/area for doorstep pickup.';
    }

    if (formState.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formState.agreeToTerms) {
      newErrors.agreeToTerms = 'Please confirm that you agree to terms & lesson guidelines.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formState.fullName.trim()) {
        newErrors.fullName = 'Please enter your full name.';
      } else if (formState.fullName.trim().length < 2) {
        newErrors.fullName = 'Name must be at least 2 characters.';
      }

      const cleanPhone = formState.phoneNumber.replace(/[^0-9]/g, '');
      if (!cleanPhone) {
        newErrors.phoneNumber = 'Phone number is required for lesson coordination.';
      } else if (cleanPhone.length < 10) {
        newErrors.phoneNumber = 'Please enter a valid 10-digit mobile number.';
      } else if (!/^[6-9]\d{9}$/.test(cleanPhone.slice(-10))) {
        newErrors.phoneNumber = 'Enter a valid 10-digit mobile number.';
      }

      if (!formState.pickupArea.trim()) {
        newErrors.pickupArea = 'Please provide your locality/area for doorstep pickup.';
      }
    }

    if (step === 3) {
      if (formState.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
        newErrors.email = 'Please enter a valid email address.';
      }

      if (!formState.agreeToTerms) {
        newErrors.agreeToTerms = 'Please confirm that you agree to terms & lesson guidelines.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    } else {
      showToast({
        type: 'error',
        title: 'Please check your inputs',
        message: 'Fill in the required fields marked in red to continue.',
      });
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateAll()) {
      showToast({
        type: 'error',
        title: 'Please check your inputs',
        message: 'Fill in all required fields marked in red to generate your WhatsApp booking.',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const waLink = generateWhatsAppLink(formState, siteConfig);
      setSubmittedLink(waLink);

      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.65 },
        });
      } catch (err) {
        // Confetti non-fatal
      }

      showToast({
        type: 'success',
        title: 'Enquiry Ready!',
        message: 'Your lesson booking details are prepared for WhatsApp.',
      });

      onSuccess?.();
    } catch (err) {
      showToast({
        type: 'error',
        title: 'Submission Error',
        message: 'Could not generate WhatsApp message. Please try again or call us directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyText = () => {
    const message = formatWhatsAppMessage(formState, siteConfig);
    navigator.clipboard.writeText(message);
    setCopied(true);
    showToast({
      type: 'info',
      title: 'Copied to Clipboard',
      message: 'You can paste this message directly into WhatsApp or SMS.',
    });
    setTimeout(() => setCopied(false), 3000);
  };

  const handleReset = () => {
    setSubmittedLink(null);
    setCurrentStep(1);
  };

  // SUCCESS CONFIRMATION STATE
  if (submittedLink) {
    const selectedCourse = courses.find((c) => c.slug === formState.courseSlug);

    return (
      <div className="p-5 sm:p-8 bg-[#FDF2F5]/60 rounded-2xl border border-[#FFC5DC] text-center animate-in fade-in zoom-in-95 duration-300">
        <div className="w-14 h-14 bg-[#FDF2F5] text-[#BC2639] rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
          <CheckCircle2 className="w-7 h-7" />
        </div>

        <h3 className="text-lg sm:text-2xl font-bold font-display text-[#39340F]">
          Your Lesson Enquiry is Ready!
        </h3>
        <p className="mt-1.5 text-xs sm:text-sm text-[#404D68] max-w-md mx-auto leading-relaxed">
          We have generated your structured booking request. Click below to open WhatsApp and send it directly to our admissions team for immediate confirmation.
        </p>

        {/* Enquiry Summary Card */}
        <div className="mt-4 p-3.5 rounded-xl bg-white border border-[#D4E2DF] text-left text-xs text-[#39340F] space-y-2 shadow-sm max-w-md mx-auto">
          <div className="flex justify-between border-b border-[#D4E2DF]/50 pb-1.5">
            <span className="font-semibold text-[#404D68]">Student:</span>
            <span className="font-bold text-[#39340F]">{formState.fullName}</span>
          </div>
          <div className="flex justify-between border-b border-[#D4E2DF]/50 pb-1.5">
            <span className="font-semibold text-[#404D68]">Course:</span>
            <span className="font-bold text-[#BC2639]">{selectedCourse?.shortTitle || formState.courseSlug}</span>
          </div>
          <div className="flex justify-between border-b border-[#D4E2DF]/50 pb-1.5">
            <span className="font-semibold text-[#404D68]">Pickup Area:</span>
            <span className="font-medium text-[#39340F]">{formState.pickupArea}, {formState.city}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-[#404D68]">Slot & Gear:</span>
            <span className="font-medium text-[#39340F] capitalize">
              {formState.preferredTimeSlot.replace('_', ' ')} • {formState.transmission}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-2.5 max-w-md mx-auto">
          <Button
            variant="whatsapp"
            size="md"
            href={submittedLink}
            isExternal
            className="w-full justify-center shadow-lg font-bold py-2.5 sm:py-3"
            icon={<MessageCircle className="w-4 h-4 fill-current" />}
          >
            Continue to WhatsApp
          </Button>

          <Button
            variant="outline"
            size="md"
            onClick={handleCopyText}
            className="w-full sm:w-auto justify-center text-xs"
            icon={<Copy className="w-3.5 h-3.5" />}
          >
            {copied ? 'Copied!' : 'Copy Text'}
          </Button>
        </div>

        {/* Fallback assistance */}
        <div className="mt-5 pt-3 border-t border-[#D4E2DF]/60 text-[0.72rem] text-[#404D68] flex flex-col sm:flex-row items-center justify-between gap-2">
          <button
            onClick={handleReset}
            className="text-[#404D68] hover:text-[#39340F] underline flex items-center gap-1 mx-auto"
          >
            <RefreshCw className="w-3 h-3" /> Edit details / Make another enquiry
          </button>
          <a
            href={`tel:${siteConfig.phoneDial}`}
            className="text-[#BC2639] hover:underline font-semibold flex items-center gap-1 mx-auto"
          >
            <Phone className="w-3.5 h-3.5" /> Call directly: {siteConfig.phoneDisplay}
          </a>
        </div>
      </div>
    );
  }

  const selectedCourse = courses.find((c) => c.slug === formState.courseSlug);

  return (
    <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4" noValidate>
      {/* ======================================================== */}
      {/* 1. MOBILE UI: STEP-BY-STEP WIZARD (Visible only on mobile: sm:hidden) */}
      {/* ======================================================== */}
      <div className="sm:hidden space-y-3.5">
        {/* Multi-Step Visual Progress Indicator */}
        <div className="space-y-1.5 pb-1">
          <div className="flex items-center justify-between text-xs font-bold text-[#39340F]">
            <span className="flex items-center gap-1.5 text-[#39340F] font-bold">
              <span className="w-5 h-5 rounded-full bg-[#BC2639] text-white flex items-center justify-center text-[0.68rem] shadow-xs">
                {currentStep}
              </span>
              {currentStep === 1 && 'Step 1: Contact & Pickup Area'}
              {currentStep === 2 && 'Step 2: Course & Vehicle Gear'}
              {currentStep === 3 && 'Step 3: Timing & Review'}
            </span>
            <span className="text-[0.7rem] text-[#404D68] font-medium">
              Step {currentStep} of 3
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-[#D4E2DF]/50 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#BC2639] to-[#5F1618] h-full transition-all duration-300 rounded-full"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* MOBILE STEP 1: CONTACT & LOCATION */}
        {currentStep === 1 && (
          <div className="space-y-3 animate-in fade-in zoom-in-95 duration-200">
            <div className="space-y-3">
              <div>
                <label htmlFor="fullName-mobile" className="block text-xs font-semibold text-[#39340F] mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="fullName-mobile"
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formState.fullName}
                  onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                  className={`w-full px-3.5 py-2 rounded-xl border text-xs transition-colors focus:ring-2 focus:ring-[#BC2639] focus:outline-none ${
                    errors.fullName ? 'border-red-400 bg-red-50/50' : 'border-[#D4E2DF] bg-white text-[#39340F]'
                  }`}
                />
                {errors.fullName && <p className="mt-1 text-[0.7rem] text-red-600 font-medium">{errors.fullName}</p>}
              </div>

              <div>
                <label htmlFor="phoneNumber-mobile" className="block text-xs font-semibold text-[#39340F] mb-1">
                  WhatsApp Mobile <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-[#404D68] text-xs font-semibold">+91</span>
                  <input
                    id="phoneNumber-mobile"
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="98765 43210"
                    value={formState.phoneNumber}
                    onChange={(e) => setFormState({ ...formState, phoneNumber: e.target.value.replace(/[^0-9]/g, '') })}
                    className={`w-full pl-11 pr-3.5 py-2 rounded-xl border text-xs transition-colors focus:ring-2 focus:ring-[#BC2639] focus:outline-none ${
                      errors.phoneNumber ? 'border-red-400 bg-red-50/50' : 'border-[#D4E2DF] bg-white text-[#39340F]'
                    }`}
                  />
                </div>
                {errors.phoneNumber && <p className="mt-1 text-[0.7rem] text-red-600 font-medium">{errors.phoneNumber}</p>}
              </div>

              <div>
                <label htmlFor="city-mobile" className="block text-xs font-semibold text-[#39340F] mb-1">
                  City / Metro Area
                </label>
                <select
                  id="city-mobile"
                  value={formState.city}
                  onChange={(e) => setFormState({ ...formState, city: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#D4E2DF] bg-white text-[#39340F] text-xs focus:ring-2 focus:ring-[#BC2639] focus:outline-none"
                >
                  {siteConfig.serviceCities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="pickupArea-mobile" className="block text-xs font-semibold text-[#39340F] mb-1">
                  Pickup Locality / Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="pickupArea-mobile"
                  type="text"
                  required
                  placeholder="e.g. Indiranagar / Sector 62 / Bandra"
                  value={formState.pickupArea}
                  onChange={(e) => setFormState({ ...formState, pickupArea: e.target.value })}
                  className={`w-full px-3.5 py-2 rounded-xl border text-xs transition-colors focus:ring-2 focus:ring-[#BC2639] focus:outline-none ${
                    errors.pickupArea ? 'border-red-400 bg-red-50/50' : 'border-[#D4E2DF] bg-white text-[#39340F]'
                  }`}
                />
                {errors.pickupArea && <p className="mt-1 text-[0.7rem] text-red-600 font-medium">{errors.pickupArea}</p>}
              </div>
            </div>

            {/* Next Button */}
            <div className="pt-2">
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={handleNextStep}
                className="w-full justify-center text-xs py-2.5 shadow-md font-bold"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Continue to Course Selection
              </Button>
            </div>
          </div>
        )}

        {/* MOBILE STEP 2: COURSE & TRANSMISSION */}
        {currentStep === 2 && (
          <div className="space-y-3 animate-in fade-in zoom-in-95 duration-200">
            <div className="space-y-3">
              <div>
                <label htmlFor="courseSlug-mobile" className="block text-xs font-semibold text-[#39340F] mb-1">
                  Preferred Driving Program
                </label>
                <select
                  id="courseSlug-mobile"
                  value={formState.courseSlug}
                  onChange={(e) => setFormState({ ...formState, courseSlug: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#D4E2DF] bg-white text-[#39340F] text-xs focus:ring-2 focus:ring-[#BC2639] focus:outline-none"
                >
                  {courses.map((course) => (
                    <option key={course.slug} value={course.slug}>
                      {course.shortTitle} (₹{course.price.toLocaleString('en-IN')})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#39340F] mb-1">
                  Vehicle Transmission
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormState({ ...formState, transmission: 'manual' })}
                    className={`py-2 px-2.5 rounded-xl border text-xs font-semibold transition-all ${
                      formState.transmission === 'manual'
                        ? 'border-[#BC2639] bg-[#FDF2F5] text-[#39340F] shadow-xs font-bold'
                        : 'border-[#D4E2DF] bg-[#FAF6F8] text-[#404D68] hover:bg-white'
                    }`}
                  >
                    Manual Gearbox
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormState({ ...formState, transmission: 'automatic' })}
                    className={`py-2 px-2.5 rounded-xl border text-xs font-semibold transition-all ${
                      formState.transmission === 'automatic'
                        ? 'border-[#BC2639] bg-[#FDF2F5] text-[#39340F] shadow-xs font-bold'
                        : 'border-[#D4E2DF] bg-[#FAF6F8] text-[#404D68] hover:bg-white'
                    }`}
                  >
                    Automatic (AT)
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="preferredTimeSlot-mobile" className="block text-xs font-semibold text-[#39340F] mb-1">
                  Preferred Time Slot
                </label>
                <select
                  id="preferredTimeSlot-mobile"
                  value={formState.preferredTimeSlot}
                  onChange={(e) => setFormState({ ...formState, preferredTimeSlot: e.target.value as TimeSlot })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#D4E2DF] bg-white text-[#39340F] text-xs focus:ring-2 focus:ring-[#BC2639] focus:outline-none"
                >
                  <option value="early_morning">Early Morning (6 AM – 8 AM)</option>
                  <option value="morning">Morning (8 AM – 12 PM)</option>
                  <option value="afternoon">Afternoon (12 PM – 4 PM)</option>
                  <option value="evening">Evening (4 PM – 8 PM)</option>
                  <option value="weekend_only">Weekends (Sat/Sun)</option>
                </select>
              </div>

              <div>
                <label htmlFor="experienceLevel-mobile" className="block text-xs font-semibold text-[#39340F] mb-1">
                  Driving Experience Level
                </label>
                <select
                  id="experienceLevel-mobile"
                  value={formState.experienceLevel}
                  onChange={(e) => setFormState({ ...formState, experienceLevel: e.target.value as ExperienceLevel })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#D4E2DF] bg-white text-[#39340F] text-xs focus:ring-2 focus:ring-[#BC2639] focus:outline-none"
                >
                  <option value="absolute_beginner">Absolute Beginner (Never driven)</option>
                  <option value="some_experience">Basic Steering & Clutch Knowledge</option>
                  <option value="test_prep">RTO Test Track Preparation</option>
                  <option value="refresher">Refresher (Need Road Confidence)</option>
                </select>
              </div>
            </div>

            {/* Stepper Buttons */}
            <div className="grid grid-cols-2 gap-2.5 pt-2">
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={handlePrevStep}
                className="justify-center text-xs"
              >
                ← Back
              </Button>
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={handleNextStep}
                className="justify-center text-xs shadow-md font-bold"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Continue to Review
              </Button>
            </div>
          </div>
        )}

        {/* MOBILE STEP 3: CUSTOMIZATION, REVIEW & SUBMIT */}
        {currentStep === 3 && (
          <div className="space-y-3 animate-in fade-in zoom-in-95 duration-200">
            <div>
              <label htmlFor="email-mobile" className="block text-xs font-semibold text-[#39340F] mb-1">
                Email Address (Optional)
              </label>
              <input
                id="email-mobile"
                type="email"
                placeholder="e.g. rahul@example.com"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                className={`w-full px-3.5 py-2 rounded-xl border text-xs transition-colors focus:ring-2 focus:ring-[#BC2639] focus:outline-none ${
                  errors.email ? 'border-red-400 bg-red-50/50' : 'border-[#D4E2DF] bg-white text-[#39340F]'
                }`}
              />
              {errors.email && <p className="mt-1 text-[0.7rem] text-red-600 font-medium">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="message-mobile" className="block text-xs font-semibold text-[#39340F] mb-1">
                Special Notes / Requests (Optional)
              </label>
              <input
                id="message-mobile"
                type="text"
                placeholder="e.g. Female instructor, office route"
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-[#D4E2DF] bg-white text-[#39340F] text-xs focus:ring-2 focus:ring-[#BC2639] focus:outline-none"
              />
            </div>

            {/* Quick Summary Review Box */}
            <div className="p-3 rounded-xl bg-[#FAF6F8] border border-[#D4E2DF] text-xs space-y-1.5">
              <div className="flex justify-between items-center text-[#404D68] pb-1 border-b border-[#D4E2DF]">
                <span className="font-semibold">Student & Pickup:</span>
                <span className="font-bold text-[#39340F]">{formState.fullName} • {formState.pickupArea || formState.city}</span>
              </div>
              <div className="flex justify-between items-center text-[#404D68]">
                <span className="font-semibold">Program:</span>
                <span className="font-bold text-[#BC2639]">{selectedCourse?.shortTitle} ({formState.transmission})</span>
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="pt-0.5">
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formState.agreeToTerms}
                  onChange={(e) => setFormState({ ...formState, agreeToTerms: e.target.checked })}
                  className="mt-0.5 rounded border-[#D4E2DF] text-[#BC2639] focus:ring-[#BC2639] w-3.5 h-3.5"
                />
                <span className="text-[0.72rem] text-[#404D68] leading-snug">
                  I agree to receive lesson scheduling details via WhatsApp/SMS. 100% dual-control safety.
                </span>
              </label>
              {errors.agreeToTerms && <p className="mt-1 text-[0.7rem] text-red-600 font-medium">{errors.agreeToTerms}</p>}
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-3 gap-2.5 pt-1">
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={handlePrevStep}
                className="col-span-1 justify-center text-xs"
              >
                ← Back
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={isSubmitting}
                className="col-span-2 justify-center text-xs py-2.5 shadow-md font-bold"
                icon={<Sparkles className="w-4 h-4 text-[#FFC5DC]" />}
              >
                Send WhatsApp Enquiry
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* 2. DESKTOP UI: SINGLE-PAGE ALL-IN-ONE FORM (hidden on mobile, visible sm:block) */}
      {/* ======================================================== */}
      <div className="hidden sm:block space-y-4">
        {/* Row 1: Name & Phone */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="fullName-desktop" className="block text-xs font-semibold text-[#39340F] mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              id="fullName-desktop"
              type="text"
              required
              placeholder="e.g. Rahul Sharma"
              value={formState.fullName}
              onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-colors focus:ring-2 focus:ring-[#BC2639] focus:outline-none ${
                errors.fullName ? 'border-red-400 bg-red-50/50' : 'border-[#D4E2DF] bg-white text-[#39340F]'
              }`}
            />
            {errors.fullName && <p className="mt-1 text-xs text-red-600 font-medium">{errors.fullName}</p>}
          </div>

          <div>
            <label htmlFor="phoneNumber-desktop" className="block text-xs font-semibold text-[#39340F] mb-1">
              WhatsApp Mobile <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-[#404D68] text-sm font-semibold">+91</span>
              <input
                id="phoneNumber-desktop"
                type="tel"
                required
                maxLength={10}
                placeholder="98765 43210"
                value={formState.phoneNumber}
                onChange={(e) => setFormState({ ...formState, phoneNumber: e.target.value.replace(/[^0-9]/g, '') })}
                className={`w-full pl-11 pr-3.5 py-2.5 rounded-xl border text-sm transition-colors focus:ring-2 focus:ring-[#BC2639] focus:outline-none ${
                  errors.phoneNumber ? 'border-red-400 bg-red-50/50' : 'border-[#D4E2DF] bg-white text-[#39340F]'
                }`}
              />
            </div>
            {errors.phoneNumber && <p className="mt-1 text-xs text-red-600 font-medium">{errors.phoneNumber}</p>}
          </div>
        </div>

        {/* Row 2: City & Pickup Area */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="city-desktop" className="block text-xs font-semibold text-[#39340F] mb-1">
              City / Metro Area
            </label>
            <select
              id="city-desktop"
              value={formState.city}
              onChange={(e) => setFormState({ ...formState, city: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#D4E2DF] bg-white text-[#39340F] text-sm focus:ring-2 focus:ring-[#BC2639] focus:outline-none"
            >
              {siteConfig.serviceCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="pickupArea-desktop" className="block text-xs font-semibold text-[#39340F] mb-1">
              Pickup Locality / Address <span className="text-red-500">*</span>
            </label>
            <input
              id="pickupArea-desktop"
              type="text"
              required
              placeholder="e.g. Indiranagar / Sector 62 / Bandra"
              value={formState.pickupArea}
              onChange={(e) => setFormState({ ...formState, pickupArea: e.target.value })}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-colors focus:ring-2 focus:ring-[#BC2639] focus:outline-none ${
                errors.pickupArea ? 'border-red-400 bg-red-50/50' : 'border-[#D4E2DF] bg-white text-[#39340F]'
              }`}
            />
            {errors.pickupArea && <p className="mt-1 text-xs text-red-600 font-medium">{errors.pickupArea}</p>}
          </div>
        </div>

        {/* Row 3: Program & Transmission */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="courseSlug-desktop" className="block text-xs font-semibold text-[#39340F] mb-1">
              Preferred Driving Program
            </label>
            <select
              id="courseSlug-desktop"
              value={formState.courseSlug}
              onChange={(e) => setFormState({ ...formState, courseSlug: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#D4E2DF] bg-white text-[#39340F] text-sm focus:ring-2 focus:ring-[#BC2639] focus:outline-none"
            >
              {courses.map((course) => (
                <option key={course.slug} value={course.slug}>
                  {course.shortTitle} (₹{course.price.toLocaleString('en-IN')})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#39340F] mb-1">
              Vehicle Transmission
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setFormState({ ...formState, transmission: 'manual' })}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                  formState.transmission === 'manual'
                    ? 'border-[#BC2639] bg-[#FDF2F5] text-[#39340F] shadow-xs font-bold'
                    : 'border-[#D4E2DF] bg-[#FAF6F8] text-[#404D68] hover:bg-white'
                }`}
              >
                Manual Gearbox
              </button>
              <button
                type="button"
                onClick={() => setFormState({ ...formState, transmission: 'automatic' })}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                  formState.transmission === 'automatic'
                    ? 'border-[#BC2639] bg-[#FDF2F5] text-[#39340F] shadow-xs font-bold'
                    : 'border-[#D4E2DF] bg-[#FAF6F8] text-[#404D68] hover:bg-white'
                }`}
              >
                Automatic (AT)
              </button>
            </div>
          </div>
        </div>

        {/* Row 4: Slot & Experience */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="preferredTimeSlot-desktop" className="block text-xs font-semibold text-[#39340F] mb-1">
              Preferred Time Slot
            </label>
            <select
              id="preferredTimeSlot-desktop"
              value={formState.preferredTimeSlot}
              onChange={(e) => setFormState({ ...formState, preferredTimeSlot: e.target.value as TimeSlot })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#D4E2DF] bg-white text-[#39340F] text-sm focus:ring-2 focus:ring-[#BC2639] focus:outline-none"
            >
              <option value="early_morning">Early Morning (6 AM – 8 AM)</option>
              <option value="morning">Morning (8 AM – 12 PM)</option>
              <option value="afternoon">Afternoon (12 PM – 4 PM)</option>
              <option value="evening">Evening (4 PM – 8 PM)</option>
              <option value="weekend_only">Weekends (Sat/Sun)</option>
            </select>
          </div>

          <div>
            <label htmlFor="experienceLevel-desktop" className="block text-xs font-semibold text-[#39340F] mb-1">
              Driving Experience Level
            </label>
            <select
              id="experienceLevel-desktop"
              value={formState.experienceLevel}
              onChange={(e) => setFormState({ ...formState, experienceLevel: e.target.value as ExperienceLevel })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#D4E2DF] bg-white text-[#39340F] text-sm focus:ring-2 focus:ring-[#BC2639] focus:outline-none"
            >
              <option value="absolute_beginner">Absolute Beginner (Never driven)</option>
              <option value="some_experience">Basic Steering & Clutch Knowledge</option>
              <option value="test_prep">RTO Test Track Preparation</option>
              <option value="refresher">Refresher (Need Road Confidence)</option>
            </select>
          </div>
        </div>

        {/* Row 5: Email & Notes (Optional) */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="email-desktop" className="block text-xs font-semibold text-[#39340F] mb-1">
              Email Address (Optional)
            </label>
            <input
              id="email-desktop"
              type="email"
              placeholder="e.g. rahul@example.com"
              value={formState.email}
              onChange={(e) => setFormState({ ...formState, email: e.target.value })}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-colors focus:ring-2 focus:ring-[#BC2639] focus:outline-none ${
                errors.email ? 'border-red-400 bg-red-50/50' : 'border-[#D4E2DF] bg-white text-[#39340F]'
              }`}
            />
            {errors.email && <p className="mt-1 text-xs text-red-600 font-medium">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="message-desktop" className="block text-xs font-semibold text-[#39340F] mb-1">
              Special Notes / Requests (Optional)
            </label>
            <input
              id="message-desktop"
              type="text"
              placeholder="e.g. Female instructor, office route"
              value={formState.message}
              onChange={(e) => setFormState({ ...formState, message: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#D4E2DF] bg-white text-[#39340F] text-sm focus:ring-2 focus:ring-[#BC2639] focus:outline-none"
            />
          </div>
        </div>

        {/* Terms Agreement Checkbox */}
        <div className="pt-1">
          <label className="flex items-start gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={formState.agreeToTerms}
              onChange={(e) => setFormState({ ...formState, agreeToTerms: e.target.checked })}
              className="mt-0.5 rounded border-[#D4E2DF] text-[#BC2639] focus:ring-[#BC2639] w-4 h-4"
            />
            <span className="text-xs text-[#404D68] leading-snug">
              I agree to receive lesson scheduling details via WhatsApp/SMS. 100% dual-control safety.
            </span>
          </label>
          {errors.agreeToTerms && <p className="mt-1 text-xs text-red-600 font-medium">{errors.agreeToTerms}</p>}
        </div>

        {/* Desktop Single-Page Submit Button */}
        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isSubmitting}
            className="w-full justify-center text-sm sm:text-base py-3 shadow-md hover-lift font-bold"
            icon={<Sparkles className="w-4 h-4 text-[#FFC5DC]" />}
          >
            Send WhatsApp Enquiry
          </Button>
        </div>
      </div>

      {/* Security & Response SLA Note */}
      <div className="flex items-center justify-center gap-3 text-[0.68rem] sm:text-xs text-[#404D68] pt-0.5">
        <span className="flex items-center gap-1">
          <Shield className="w-3.5 h-3.5 text-[#BC2639]" /> No Advance Payment Required
        </span>
        <span>•</span>
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-[#BC2639]" /> Instant Response on WhatsApp
        </span>
      </div>
    </form>
  );
};
