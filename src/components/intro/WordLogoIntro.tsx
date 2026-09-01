import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

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

  const brandLetters = 'DRIVECRAFT'.split('');

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{
          opacity: 0,
          scale: 1.04,
          filter: 'blur(12px)',
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        }}
        className="fixed inset-0 z-[100] flex flex-col items-center justify-between backdrop-blur-2xl bg-[#082B4C]/80 text-white select-none overflow-hidden py-8 sm:py-12 px-4"
        role="status"
        aria-label="Welcome to DriveCraft Motor Academy"
        aria-live="polite"
      >
        {/* Ambient Blurred Background Lights */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Central Golden Glow Bloom */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [0.9, 1.15, 1], opacity: [0.2, 0.45, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[300px] sm:w-[700px] sm:h-[450px] bg-gradient-to-tr from-[#F4C400]/25 via-[#FFD21A]/20 to-[#082B4C]/0 rounded-full blur-[100px]"
          />

          {/* Secondary Top-Right Navy Glow */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#F4C400]/15 rounded-full blur-[90px]" />
          
          {/* Subtle Horizon Grid Texture with radial mask */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_65%_55%_at_50%_50%,#000_60%,transparent_100%)] opacity-30" />
        </div>

        {/* Top Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative z-10 flex items-center gap-2 text-[0.68rem] sm:text-xs font-bold tracking-[0.2em] uppercase text-[#FFD21A] px-4 py-1.5 rounded-full bg-white/[0.08] border border-white/15 backdrop-blur-xl shadow-lg"
        >
          <span className="w-2 h-2 rounded-full bg-[#F4C400] animate-pulse" />
          <span>Government Certified • Motor Academy</span>
        </motion.div>

        {/* Central Master Letter Logo & Typographic Reveal */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-2xl my-auto px-2">
          
          {/* Bespoke Monogram Letter Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="relative mb-5 sm:mb-7 group"
          >
            {/* Outer Ambient Glow Aura */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#F4C400]/30 to-[#FFD21A]/20 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition-opacity" />

            {/* Lettermark Glass Frame */}
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-[#082B4C]/70 backdrop-blur-xl border-2 border-[#F4C400]/50 shadow-[0_0_35px_rgba(244,196,0,0.25)] flex items-center justify-center overflow-hidden">
              
              {/* Inner Speedlines Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/30 pointer-events-none" />

              {/* Animated Geometric Vector Letter Logo: DC Monogram */}
              <svg
                viewBox="0 0 120 120"
                className="w-16 h-16 sm:w-20 sm:h-20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="35%" stopColor="#FFD21A" />
                    <stop offset="100%" stopColor="#F4C400" />
                  </linearGradient>
                  <linearGradient id="whiteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="#E2E8F0" />
                  </linearGradient>
                </defs>

                {/* Letter 'D' Path */}
                <motion.path
                  d="M 28 26 L 56 26 C 74 26 84 38 84 60 C 84 82 74 94 56 94 L 28 94 Z M 42 40 L 42 80 L 54 80 C 66 80 70 72 70 60 C 70 48 66 40 54 40 Z"
                  fill="url(#whiteGradient)"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.55, delay: 0.2, ease: 'easeOut' }}
                />

                {/* Letter 'C' Intersecting Path */}
                <motion.path
                  d="M 94 36 C 89 28 80 24 68 24 C 48 24 38 40 38 60 C 38 80 48 96 68 96 C 80 96 89 92 94 84 L 83 75 C 80 80 75 83 68 83 C 56 83 50 73 50 60 C 50 47 56 37 68 37 C 75 37 80 40 83 45 Z"
                  fill="url(#goldGradient)"
                  initial={{ opacity: 0, x: 12, scale: 0.95 }}
                  animate={{ opacity: 0.95, x: 0, scale: 1 }}
                  transition={{ duration: 0.55, delay: 0.35, ease: 'easeOut' }}
                />
              </svg>
            </div>
          </motion.div>

          {/* Staggered Animated Brand Name: DRIVECRAFT */}
          <div className="flex items-center justify-center gap-1 sm:gap-2">
            {brandLetters.map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 15, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{
                  duration: 0.45,
                  delay: 0.35 + index * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-wider leading-none ${
                  index >= 5
                    ? 'bg-gradient-to-b from-[#FFD21A] to-[#F4C400] bg-clip-text text-transparent drop-shadow-[0_2px_15px_rgba(244,196,0,0.4)]'
                    : 'text-white drop-shadow-[0_2px_15px_rgba(255,255,255,0.2)]'
                }`}
              >
                {char}
              </motion.span>
            ))}
          </div>

          {/* Academy Subtitle with Golden Hairlines */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-3.5 sm:mt-4 flex items-center gap-3"
          >
            <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-[#F4C400]" />
            <span className="text-[0.7rem] sm:text-xs font-extrabold uppercase tracking-[0.35em] text-[#FFD21A]">
              Motor Academy
            </span>
            <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-[#F4C400]" />
          </motion.div>

          {/* Dynamic Light Sweep Bar */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-40 sm:w-64 h-[2px] mt-5 bg-white/10 rounded-full overflow-hidden"
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '200%' }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut', delay: 0.8 }}
              className="absolute top-0 bottom-0 w-20 bg-gradient-to-r from-transparent via-[#F4C400] to-transparent shadow-[0_0_10px_#F4C400]"
            />
          </motion.div>

          {/* Tagline Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.85 }}
            className="mt-3.5 flex items-center justify-center gap-2 text-[0.68rem] sm:text-xs uppercase tracking-[0.25em] text-slate-200 font-semibold"
          >
            <Sparkles className="w-3 h-3 text-[#F4C400]" />
            <span>Master Every Mile</span>
            <Sparkles className="w-3 h-3 text-[#F4C400]" />
          </motion.div>
        </div>

        {/* Bottom Ignition Progress & Skip Accessibility Controls */}
        <div className="relative z-10 w-full max-w-xs flex flex-col items-center gap-3">
          {/* Frosted Progress Track */}
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden backdrop-blur-md border border-white/10 p-0.5">
            <motion.div
              className="h-full bg-gradient-to-r from-[#F4C400] via-[#FFD21A] to-[#F4C400] rounded-full shadow-[0_0_10px_rgba(244,196,0,0.6)]"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>

          {/* Frosted Glass Skip Button */}
          <button
            onClick={handleFinish}
            className="text-[10px] sm:text-[11px] uppercase tracking-widest text-slate-200 hover:text-white px-4 py-1.5 rounded-full border border-white/15 hover:border-[#F4C400]/60 bg-white/[0.08] hover:bg-white/[0.15] backdrop-blur-md transition-all focus:outline-none focus:ring-2 focus:ring-[#F4C400]"
            aria-label="Skip introduction"
          >
            Skip Intro <span className="text-slate-400 ml-1 font-mono text-[10px]">(Esc)</span>
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
