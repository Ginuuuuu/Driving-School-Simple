import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WordLogoIntroProps {
  onComplete?: () => void;
  forceShow?: boolean;
}

const INTRO_SESSION_KEY = 'drivecraft_intro_played';

export const WordLogoIntro: React.FC<WordLogoIntroProps> = ({
  onComplete,
  forceShow = false,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(() => {
    if (forceShow) return true;
    try {
      const played = sessionStorage.getItem(INTRO_SESSION_KEY) === 'true';
      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      return !played && !prefersReducedMotion;
    } catch {
      return false;
    }
  });

  const [progress, setProgress] = useState(0);

  const handleFinish = useCallback(() => {
    try {
      sessionStorage.setItem(INTRO_SESSION_KEY, 'true');
    } catch {
      // Safe fallback if sessionStorage is restricted
    }
    setIsVisible(false);
    onComplete?.();
  }, [onComplete]);

  useEffect(() => {
    if (!isVisible) {
      onComplete?.();
      return;
    }

    // High precision progress tick
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 5;
      });
    }, 45);

    // Auto finish after 2.0s
    const exitTimer = setTimeout(() => {
      handleFinish();
    }, 2100);

    return () => {
      clearInterval(timer);
      clearTimeout(exitTimer);
    };
  }, [isVisible, handleFinish, onComplete]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{
          opacity: 0,
          scale: 1.04,
          filter: 'blur(12px)',
          transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
        }}
        className="fixed inset-0 z-[100] flex flex-col items-center justify-between backdrop-blur-2xl bg-[#082B4C]/80 text-white select-none overflow-hidden py-10 sm:py-14 px-4"
        role="status"
        aria-label="DriveCraft Motor Academy"
        aria-live="polite"
      >
        {/* Subtle Ambient Blurred Background Glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: [0.9, 1.1, 1], opacity: [0.25, 0.4, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[280px] sm:w-[700px] sm:h-[400px] bg-gradient-to-tr from-[#F4C400]/25 via-[#FFD21A]/15 to-transparent rounded-full blur-[100px]"
          />
        </div>

        {/* Top Spacer */}
        <div className="w-full" />

        {/* Center: Pure Letter Logo Only */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-2xl my-auto px-2">
          {/* Main Typographic Letter Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            {/* "DRIVECRAFT" Letter Logo */}
            <div className="relative flex items-center justify-center font-display font-black tracking-tight text-5xl sm:text-7xl md:text-8xl leading-none">
              <motion.span
                initial={{ opacity: 0, x: -18, filter: 'blur(8px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.55, delay: 0.15, ease: 'easeOut' }}
                className="text-white drop-shadow-[0_4px_24px_rgba(255,255,255,0.2)]"
              >
                Drive
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: 18, filter: 'blur(8px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.55, delay: 0.25, ease: 'easeOut' }}
                className="bg-gradient-to-r from-[#F4C400] via-[#FFD21A] to-[#F4C400] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(244,196,0,0.45)] ml-1"
              >
                Craft
              </motion.span>
            </div>

            {/* "MOTOR ACADEMY" Letter Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 8, letterSpacing: '0.15em' }}
              animate={{ opacity: 1, y: 0, letterSpacing: '0.35em' }}
              transition={{ duration: 0.55, delay: 0.45, ease: 'easeOut' }}
              className="mt-3 sm:mt-4 text-xs sm:text-sm font-extrabold uppercase text-[#FFD21A]"
            >
              Motor Academy
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Loading Progress */}
        <div className="relative z-10 w-full max-w-xs flex flex-col items-center">
          {/* Frosted Progress Track */}
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden backdrop-blur-md border border-white/10 p-0.5">
            <motion.div
              className="h-full bg-gradient-to-r from-[#F4C400] via-[#FFD21A] to-[#F4C400] rounded-full shadow-[0_0_10px_rgba(244,196,0,0.6)]"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
