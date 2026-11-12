'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function BrandLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Show once per browser session for a crisp luxury entrance without slowing repeat visits
    if (typeof window !== 'undefined' && sessionStorage.getItem('dep_intro_seen')) {
      setVisible(false);
      return;
    }

    const timer = setTimeout(() => {
      setVisible(false);
      try {
        sessionStorage.setItem('dep_intro_seen', '1');
      } catch {
        // Ignore storage errors in private browsing
      }
    }, 1250);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="dep-brand-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-b from-[#071A12] via-[#0A2418] to-[#123C2D] px-6 select-none"
          aria-label="Loading Daastaan-e-Pakistan"
        >
          {/* Ambient Gold Radial Glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at 50% 45%, rgba(185, 149, 80, 0.18) 0%, transparent 60%)',
            }}
          />

          {/* Top & Bottom Thin Gold Accent Lines */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, #B99550 30%, #E5C585 50%, #B99550 70%, transparent 100%)',
            }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col items-center text-center space-y-5 max-w-md"
          >
            {/* Brand Logo */}
            <img
              src="/images/logos/Daastaan-e-Pakistan_Horizontal-Logo.png"
              alt="Daastaan-e-Pakistan"
              className="h-14 sm:h-16 w-auto object-contain brightness-0 invert drop-shadow-[0_4px_24px_rgba(185,149,80,0.35)]"
            />

            {/* Editorial Subtitle */}
            <p className="font-serif text-xs sm:text-sm tracking-[0.28em] uppercase text-[#E5C585]/90">
              Discover Pakistan &middot; Live Its Stories
            </p>

            {/* Animated Gold Shimmer Bar */}
            <div className="w-48 sm:w-56 h-[2px] rounded-full bg-white/10 overflow-hidden">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
                className="h-full w-full"
                style={{
                  background:
                    'linear-gradient(90deg, transparent 0%, #B99550 40%, #FDE68A 65%, transparent 100%)',
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
