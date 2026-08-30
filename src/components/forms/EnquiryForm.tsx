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

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLink, setSubmittedLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formState.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.';
    } else if (formState.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters.';
    }

    // Indian 10-digit mobile number validation
    const cleanPhone = formState.phoneNumber.replace(/[^0-9]/g, '');
    if (!cleanPhone) {
      newErrors.phoneNumber = 'Phone number is required for lesson coordination.';
    } else if (cleanPhone.length < 10) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit mobile number.';
    } else if (!/^[6-9]\d{9}$/.test(cleanPhone.slice(-10))) {
      newErrors.phoneNumber = 'Enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.';
    }

    if (formState.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formState.pickupArea.trim()) {
      newErrors.pickupArea = 'Please provide your locality/area for doorstep pickup.';
    }

    if (!formState.agreeToTerms) {
      newErrors.agreeToTerms = 'Please confirm that you agree to terms & lesson guidelines.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      showToast({
        type: 'error',
        title: 'Please check your inputs',
        message: 'Fill in the required fields marked in red.',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const waLink = generateWhatsAppLink(formState, siteConfig);
      setSubmittedLink(waLink);

      // Trigger confetti celebration
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
  };

  // SUCCESS CONFIRMATION STATE
  if (submittedLink) {
    const selectedCourse = courses.find((c) => c.slug === formState.courseSlug);

    return (
      <div className="p-6 sm:p-8 bg-emerald-50/50 rounded-2xl border border-emerald-200 text-center animate-in fade-in zoom-in-95 duration-300">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
          Your Lesson Enquiry is Ready!
        </h3>
        <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
          We have generated your structured booking request. Click below to open WhatsApp and send it directly to our admissions team for immediate confirmation.
        </p>

        {/* Enquiry Summary Card */}
        <div className="mt-6 p-4 rounded-xl bg-white border border-slate-200 text-left text-xs text-slate-700 space-y-2 shadow-sm max-w-md mx-auto">
          <div className="flex justify-between border-b border-slate-100 pb-2">
            <span className="font-semibold text-slate-500">Student:</span>
            <span className="font-bold text-slate-900">{formState.fullName}</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-2">
            <span className="font-semibold text-slate-500">Course:</span>
            <span className="font-bold text-emerald-800">{selectedCourse?.shortTitle || formState.courseSlug}</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-2">
            <span className="font-semibold text-slate-500">Pickup Area:</span>
            <span className="font-medium text-slate-900">{formState.pickupArea}, {formState.city}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-slate-500">Preferred Slot:</span>
            <span className="font-medium text-slate-900 capitalize">{formState.preferredTimeSlot.replace('_', ' ')}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
          <Button
            variant="whatsapp"
            size="lg"
            href={submittedLink}
            isExternal
            className="w-full justify-center shadow-lg"
            icon={<MessageCircle className="w-5 h-5 fill-current" />}
          >
            Continue to WhatsApp
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={handleCopyText}
            className="w-full sm:w-auto justify-center"
            icon={<Copy className="w-4 h-4" />}
          >
            {copied ? 'Copied!' : 'Copy Text'}
          </Button>
        </div>

        {/* Fallback assistance */}
        <div className="mt-6 pt-4 border-t border-emerald-200/60 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handleReset}
            className="text-slate-600 hover:text-slate-900 underline flex items-center gap-1 mx-auto"
          >
            <RefreshCw className="w-3 h-3" /> Edit details / Make another enquiry
          </button>
          <a
            href={`tel:${siteConfig.phoneDial}`}
            className="text-emerald-700 hover:underline font-semibold flex items-center gap-1 mx-auto"
          >
            <Phone className="w-3.5 h-3.5" /> Call directly: {siteConfig.phoneDisplay}
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4" noValidate>
      {/* Row 1: Full Name & WhatsApp Mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div>
          <label htmlFor="fullName" className="block text-xs font-semibold text-slate-700 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="fullName"
            type="text"
            required
            placeholder="e.g. Rahul Sharma"
            value={formState.fullName}
            onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
            className={`w-full px-3.5 py-2 sm:py-2.5 rounded-xl border text-xs sm:text-sm transition-colors focus:ring-2 focus:ring-emerald-500 focus:outline-none ${
              errors.fullName ? 'border-red-400 bg-red-50/50' : 'border-slate-200 bg-white'
            }`}
          />
          {errors.fullName && <p className="mt-1 text-[0.7rem] text-red-600 font-medium">{errors.fullName}</p>}
        </div>

        <div>
          <label htmlFor="phoneNumber" className="block text-xs font-semibold text-slate-700 mb-1">
            WhatsApp Mobile <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 sm:top-2.5 text-slate-400 text-xs sm:text-sm font-semibold">+91</span>
            <input
              id="phoneNumber"
              type="tel"
              required
              maxLength={10}
              placeholder="98765 43210"
              value={formState.phoneNumber}
              onChange={(e) => setFormState({ ...formState, phoneNumber: e.target.value.replace(/[^0-9]/g, '') })}
              className={`w-full pl-11 pr-3.5 py-2 sm:py-2.5 rounded-xl border text-xs sm:text-sm transition-colors focus:ring-2 focus:ring-emerald-500 focus:outline-none ${
                errors.phoneNumber ? 'border-red-400 bg-red-50/50' : 'border-slate-200 bg-white'
              }`}
            />
          </div>
          {errors.phoneNumber && <p className="mt-1 text-[0.7rem] text-red-600 font-medium">{errors.phoneNumber}</p>}
        </div>
      </div>

      {/* Row 2: City & Pickup Area */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div>
          <label htmlFor="city" className="block text-xs font-semibold text-slate-700 mb-1">
            City / Metro Area
          </label>
          <select
            id="city"
            value={formState.city}
            onChange={(e) => setFormState({ ...formState, city: e.target.value })}
            className="w-full px-3.5 py-2 sm:py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          >
            {siteConfig.serviceCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="pickupArea" className="block text-xs font-semibold text-slate-700 mb-1">
            Pickup Locality / Address <span className="text-red-500">*</span>
          </label>
          <input
            id="pickupArea"
            type="text"
            required
            placeholder="e.g. Indiranagar / Sector 62 / Bandra"
            value={formState.pickupArea}
            onChange={(e) => setFormState({ ...formState, pickupArea: e.target.value })}
            className={`w-full px-3.5 py-2 sm:py-2.5 rounded-xl border text-xs sm:text-sm transition-colors focus:ring-2 focus:ring-emerald-500 focus:outline-none ${
              errors.pickupArea ? 'border-red-400 bg-red-50/50' : 'border-slate-200 bg-white'
            }`}
          />
          {errors.pickupArea && <p className="mt-1 text-[0.7rem] text-red-600 font-medium">{errors.pickupArea}</p>}
        </div>
      </div>

      {/* Row 3: Course Selection & Transmission */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div>
          <label htmlFor="courseSlug" className="block text-xs font-semibold text-slate-700 mb-1">
            Preferred Driving Program
          </label>
          <select
            id="courseSlug"
            value={formState.courseSlug}
            onChange={(e) => setFormState({ ...formState, courseSlug: e.target.value })}
            className="w-full px-3.5 py-2 sm:py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          >
            {courses.map((course) => (
              <option key={course.slug} value={course.slug}>
                {course.shortTitle} (₹{course.price.toLocaleString('en-IN')})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Vehicle Transmission
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setFormState({ ...formState, transmission: 'manual' })}
              className={`py-2 px-2.5 rounded-xl border text-xs font-semibold transition-all ${
                formState.transmission === 'manual'
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-900 shadow-xs font-bold'
                  : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              Manual Gearbox
            </button>
            <button
              type="button"
              onClick={() => setFormState({ ...formState, transmission: 'automatic' })}
              className={`py-2 px-2.5 rounded-xl border text-xs font-semibold transition-all ${
                formState.transmission === 'automatic'
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-900 shadow-xs font-bold'
                  : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              Automatic (AT)
            </button>
          </div>
        </div>
      </div>

      {/* Row 4: Preferred Time Slot & Experience Level */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div>
          <label htmlFor="preferredTimeSlot" className="block text-xs font-semibold text-slate-700 mb-1">
            Preferred Time Slot
          </label>
          <select
            id="preferredTimeSlot"
            value={formState.preferredTimeSlot}
            onChange={(e) => setFormState({ ...formState, preferredTimeSlot: e.target.value as TimeSlot })}
            className="w-full px-3.5 py-2 sm:py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          >
            <option value="early_morning">Early Morning (6 AM – 8 AM)</option>
            <option value="morning">Morning (8 AM – 12 PM)</option>
            <option value="afternoon">Afternoon (12 PM – 4 PM)</option>
            <option value="evening">Evening (4 PM – 8 PM)</option>
            <option value="weekend_only">Weekends (Sat/Sun)</option>
          </select>
        </div>

        <div>
          <label htmlFor="experienceLevel" className="block text-xs font-semibold text-slate-700 mb-1">
            Driving Experience Level
          </label>
          <select
            id="experienceLevel"
            value={formState.experienceLevel}
            onChange={(e) => setFormState({ ...formState, experienceLevel: e.target.value as ExperienceLevel })}
            className="w-full px-3.5 py-2 sm:py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          >
            <option value="absolute_beginner">Absolute Beginner (Never driven)</option>
            <option value="some_experience">Basic Steering & Clutch Knowledge</option>
            <option value="test_prep">RTO Test Track Preparation</option>
            <option value="refresher">Refresher (Need Road Confidence)</option>
          </select>
        </div>
      </div>

      {/* Row 5: Email & Special Note */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div>
          <label htmlFor="email" className="block text-xs font-semibold text-slate-700 mb-1">
            Email Address (Optional)
          </label>
          <input
            id="email"
            type="email"
            placeholder="e.g. rahul@example.com"
            value={formState.email}
            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
            className={`w-full px-3.5 py-2 sm:py-2.5 rounded-xl border text-xs sm:text-sm transition-colors focus:ring-2 focus:ring-emerald-500 focus:outline-none ${
              errors.email ? 'border-red-400 bg-red-50/50' : 'border-slate-200 bg-white'
            }`}
          />
          {errors.email && <p className="mt-1 text-[0.7rem] text-red-600 font-medium">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="message" className="block text-xs font-semibold text-slate-700 mb-1">
            Special Notes / Requests (Optional)
          </label>
          <input
            id="message"
            type="text"
            placeholder="e.g. Female instructor, office route practice"
            value={formState.message}
            onChange={(e) => setFormState({ ...formState, message: e.target.value })}
            className="w-full px-3.5 py-2 sm:py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Terms Agreement */}
      <div className="pt-0.5">
        <label className="flex items-start gap-2.5 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={formState.agreeToTerms}
            onChange={(e) => setFormState({ ...formState, agreeToTerms: e.target.checked })}
            className="mt-0.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5 sm:w-4 sm:h-4"
          />
          <span className="text-[0.72rem] sm:text-xs text-slate-600 leading-snug">
            I agree to receive lesson scheduling and instructor details via WhatsApp/SMS. 100% dual-control safety guaranteed.
          </span>
        </label>
        {errors.agreeToTerms && <p className="mt-1 text-[0.7rem] text-red-600 font-medium">{errors.agreeToTerms}</p>}
      </div>

      {/* Primary Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="md"
        isLoading={isSubmitting}
        className="w-full justify-center text-xs sm:text-sm py-2.5 sm:py-3 shadow-md font-bold"
        icon={<Sparkles className="w-4 h-4 text-amber-300" />}
      >
        Generate WhatsApp Booking Request
      </Button>

      {/* Security & Response SLA Note */}
      <div className="flex items-center justify-center gap-3 text-[0.68rem] sm:text-xs text-slate-500 pt-0.5">
        <span className="flex items-center gap-1">
          <Shield className="w-3.5 h-3.5 text-emerald-600" /> No Advance Payment Required
        </span>
        <span>•</span>
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-emerald-600" /> Instant Response on WhatsApp
        </span>
      </div>
    </form>
  );
};
