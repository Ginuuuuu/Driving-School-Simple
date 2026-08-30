import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '../common/Logo';
import { Sparkles } from 'lucide-react';

interface LogoIntroProps {
  onComplete?: () => void;
  forceShow?: boolean;
}

const INTRO_SESSION_KEY = 'drivecraft_intro_played';

export const LogoIntro: React.FC<LogoIntroProps> = ({ onComplete, forceShow = false }) => {
  const [isVisible, setIsVisible] = useState<boolean>(() => {
    if (forceShow) return true;
    const played = sessionStorage.getItem(INTRO_SESSION_KEY) === 'true';
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return !played && !prefersReducedMotion;
  });

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      onComplete?.();
      return;
    }

    // Smooth ignition gauge progress
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 5;
      });
    }, 40);

    const finishTimeout = setTimeout(() => {
      sessionStorage.setItem(INTRO_SESSION_KEY, 'true');
      setIsVisible(false);
      onComplete?.();
    }, 1800);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        sessionStorage.setItem(INTRO_SESSION_KEY, 'true');
        setIsVisible(false);
        onComplete?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(timer);
      clearTimeout(finishTimeout);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isVisible, onComplete]);

  const handleSkip = () => {
    sessionStorage.setItem(INTRO_SESSION_KEY, 'true');
    setIsVisible(false);
    onComplete?.();
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.02, transition: { duration: 0.5, ease: 'easeInOut' } }}
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950 text-white select-none overflow-hidden"
        role="dialog"
        aria-label="Welcome to DriveCraft Motor Academy"
      >
        {/* Subtle dynamic background road rays */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.15)_0%,transparent_70%)]" />
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:3rem_3rem]" />

        {/* Central Speedometer Arc & Logo Reveal */}
        <div className="relative z-10 flex flex-col items-center px-4 max-w-sm text-center">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative flex items-center justify-center w-36 h-36 sm:w-44 sm:h-44 mb-4"
          >
            {/* Speedometer Track SVG */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="48"
                stroke="#1E293B"
                strokeWidth="5"
                fill="none"
              />
              <motion.circle
                cx="60"
                cy="60"
                r="48"
                stroke="url(#speedoGrad)"
                strokeWidth="5"
                strokeDasharray="301.6"
                strokeDashoffset={301.6 - (301.6 * progress) / 100}
                strokeLinecap="round"
                fill="none"
              />
              <defs>
                <linearGradient id="speedoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#F59E0B" />
                </linearGradient>
              </defs>
            </svg>

            {/* Glowing Center Logo */}
            <div className="absolute flex items-center justify-center">
              <Logo size="lg" variant="light" isLink={false} />
            </div>
          </motion.div>

          {/* Ignition Status & Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="space-y-2"
          >
            <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-emerald-400 font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Master Every Mile</span>
            </div>

            <div className="w-48 h-1 bg-slate-800 rounded-full mx-auto overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-amber-500 rounded-full transition-all duration-75"
                style={{ width: `${progress}%` }}
              />
            </div>
          </motion.div>
        </div>

        {/* Skip button */}
        <button
          onClick={handleSkip}
          className="absolute bottom-8 text-xs text-slate-400 hover:text-white uppercase tracking-widest px-4 py-1.5 rounded-full border border-slate-800 hover:border-slate-600 transition-colors"
        >
          Skip (Esc)
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
