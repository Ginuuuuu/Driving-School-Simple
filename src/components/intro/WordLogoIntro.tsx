import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Compass, Sparkles } from 'lucide-react';

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

    // High precision progress tick for progress indicator
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 4;
      });
    }, 45);

    // Auto complete intro after 2.0s
    const exitTimer = setTimeout(() => {
      handleFinish();
    }, 2100);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handleFinish();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(timer);
      clearTimeout(exitTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isVisible, handleFinish, onComplete]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{
          opacity: 0,
          scale: 1.03,
          transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
        }}
        className="fixed inset-0 z-[100] flex flex-col items-center justify-between bg-[#39340F] text-white select-none overflow-hidden py-10 px-4"
        role="status"
        aria-label="Welcome to DriveCraft Motor Academy"
        aria-live="polite"
      >
        {/* Background Visual Effects: Ambient Headlight Glow & Horizon Grid */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Radial Headlight Light-Cone from Center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] sm:w-[900px] sm:h-[500px] bg-gradient-to-tr from-[#BC2639]/20 via-[#5F1618]/15 to-[#FFC5DC]/10 rounded-full blur-3xl opacity-75" />

          {/* Horizon Perspective Driving Lines (Subtle road grid feel) */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#5F161818_1px,transparent_1px),linear-gradient(to_bottom,#5F161818_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40" />

          {/* Subtle glowing road centerline */}
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#BC2639]/40 to-transparent" />
        </div>

        {/* Top Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative z-10 flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#FFC5DC] px-3 py-1 rounded-full bg-[#26230A]/90 border border-[#5F1618] backdrop-blur-md"
        >
          <Compass className="w-3.5 h-3.5 text-[#BC2639] animate-spin" style={{ animationDuration: '6s' }} />
          <span>Government Certified • Motor Training</span>
        </motion.div>

        {/* Central Master Word Logo & Typographic Animation */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-2xl my-auto px-2">
          
          {/* Wordmark Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            {/* Primary Wordmark Typography */}
            <div className="relative flex items-center justify-center font-display font-black tracking-tight text-5xl sm:text-7xl md:text-8xl leading-none">
              {/* "Drive" in radiant off-white */}
              <motion.span
                initial={{ opacity: 0, x: -20, filter: 'blur(8px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
                className="text-[#FAF6F8] drop-shadow-[0_4px_24px_rgba(255,255,255,0.15)]"
              >
                Drive
              </motion.span>

              {/* "Craft" in crimson electric gradient */}
              <motion.span
                initial={{ opacity: 0, x: 20, filter: 'blur(8px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
                className="bg-gradient-to-r from-[#BC2639] via-[#FFC5DC] to-[#BC2639] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(188,38,57,0.4)] ml-1"
              >
                Craft
              </motion.span>

              {/* Ambient Neon Shimmer behind the word */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.8, 0.4] }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="absolute -inset-x-8 -inset-y-4 bg-[#BC2639]/15 rounded-full blur-2xl pointer-events-none -z-10"
              />
            </div>

            {/* Academy Wordmark Sub-Title & Verification Shield */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-3 sm:mt-4 flex items-center gap-2"
            >
              <div className="h-[1px] w-6 sm:w-12 bg-gradient-to-r from-transparent to-[#BC2639]/60" />
              <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-[#26230A] border border-[#BC2639]/40 text-[#FFC5DC] text-xs sm:text-sm font-extrabold uppercase tracking-[0.25em]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#BC2639]" />
                <span>Academy</span>
              </div>
              <div className="h-[1px] w-6 sm:w-12 bg-gradient-to-l from-transparent to-[#BC2639]/60" />
            </motion.div>
          </motion.div>

          {/* Kinetic Road Speedline */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-48 sm:w-72 md:w-96 h-[2px] mt-6 bg-gradient-to-r from-transparent via-[#5F1618] to-transparent overflow-hidden"
          >
            {/* Speeding Crimson Light Beam */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '200%' }}
              transition={{ repeat: Infinity, duration: 1.1, ease: 'easeInOut', delay: 0.5 }}
              className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-[#BC2639] to-transparent shadow-[0_0_12px_#BC2639]"
            />
          </motion.div>

          {/* Tagline Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-4 flex items-center justify-center gap-2 text-xs sm:text-sm uppercase tracking-[0.3em] text-[#FAF6F8] font-medium"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FFC5DC]" />
            <span>Master Every Mile</span>
            <Sparkles className="w-3.5 h-3.5 text-[#FFC5DC]" />
          </motion.div>
        </div>

        {/* Bottom Ignition Progress & Skip Accessibility Controls */}
        <div className="relative z-10 w-full max-w-xs flex flex-col items-center gap-3">
          {/* Subtle Hairline Progress Bar */}
          <div className="w-full h-1 bg-[#26230A] rounded-full overflow-hidden border border-[#5F1618]">
            <motion.div
              className="h-full bg-gradient-to-r from-[#BC2639] via-[#FFC5DC] to-[#BC2639] rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>

          {/* Keyboard & Clickable Skip Button */}
          <button
            onClick={handleFinish}
            className="text-[11px] uppercase tracking-widest text-[#FFC5DC] hover:text-white px-4 py-1.5 rounded-full border border-[#5F1618] hover:border-[#BC2639] bg-[#26230A]/80 hover:bg-[#26230A] transition-all focus:outline-none focus:ring-2 focus:ring-[#BC2639] focus:ring-offset-2 focus:ring-offset-[#39340F]"
            aria-label="Skip introduction"
          >
            Skip Intro <span className="text-[#9FBAB4] ml-1 font-mono">(Esc)</span>
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
