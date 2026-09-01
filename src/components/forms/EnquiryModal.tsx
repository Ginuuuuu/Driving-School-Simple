import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import { EnquiryForm } from './EnquiryForm';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedCourseSlug?: string;
  preselectedInstructorId?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  preselectedCourseSlug,
  preselectedInstructorId,
}) => {
  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-[#082B4C]/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 320 }}
            className="relative w-full max-w-xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-[#E5E7EB] overflow-hidden z-10 my-4 sm:my-8"
          >
            {/* Modal Header */}
            <div className="px-4 sm:px-6 py-3.5 sm:py-5 border-b border-[#E5E7EB] bg-[#F5F6F7] flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-2.5">
                <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-[#F4C400]/20 text-[#082B4C]">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#082B4C]" />
                </div>
                <div>
                  <h3 id="modal-title" className="text-sm sm:text-lg font-bold font-display text-[#202B33] leading-snug">
                    Book a Driving Lesson
                  </h3>
                  <p className="text-[0.65rem] sm:text-xs text-[#6B7280]">
                    Doorstep pickup • Dual-control safety • Patient certified mentors
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl text-[#6B7280] hover:text-[#202B33] hover:bg-[#E5E7EB] transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-3.5 sm:p-6 max-h-[82vh] overflow-y-auto">
              <EnquiryForm
                preselectedCourseSlug={preselectedCourseSlug}
                preselectedInstructorId={preselectedInstructorId}
                onSuccess={() => {}}
                isModal
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
