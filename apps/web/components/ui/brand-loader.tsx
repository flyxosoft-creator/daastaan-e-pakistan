'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function BrandLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Play once per browser session for an unhurried luxury entrance without slowing repeat visits
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
    }, 2400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="dep-brand-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-b from-[#06150E] via-[#0A2418] to-[#123C2D] px-6 select-none overflow-hidden"
          aria-label="Loading Daastaan-e-Pakistan"
        >
          {/* Ambient Gold Radial Spotlight */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1.15 }}
            transition={{ duration: 2.0, ease: 'easeOut' }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at 50% 46%, rgba(185, 149, 80, 0.24) 0%, rgba(185, 149, 80, 0.06) 35%, transparent 65%)',
            }}
          />

          {/* Top Thin Gold Border Line */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, #B99550 30%, #FDE68A 50%, #B99550 70%, transparent 100%)',
            }}
          />

          {/* Zoom-to-Fit Logo + Gold Shimmer Sweep */}
          <motion.div
            initial={{ opacity: 0, scale: 1.32, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.14, filter: 'blur(4px)' }}
            transition={{ duration: 1.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col items-center text-center space-y-6 max-w-lg"
          >
            {/* Logo Wrapper with Diagonal Gold Shimmer Sweep */}
            <div className="relative overflow-hidden px-4 py-2">
              <img
                src="/images/logos/Daastaan-e-Pakistan_Horizontal-Logo.png"
                alt="Daastaan-e-Pakistan"
                className="h-16 sm:h-20 w-auto object-contain brightness-0 invert drop-shadow-[0_6px_28px_rgba(185,149,80,0.4)]"
              />

              {/* Diagonal 24k Gold Light Sweep */}
              <motion.div
                aria-hidden="true"
                initial={{ x: '-140%' }}
                animate={{ x: '220%' }}
                transition={{ duration: 1.4, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-none absolute inset-y-0 w-1/2 skew-x-[-20deg]"
                style={{
                  background:
                    'linear-gradient(90deg, transparent 0%, rgba(253,230,138,0.12) 35%, rgba(253,230,138,0.55) 50%, rgba(185,149,80,0.15) 65%, transparent 100%)',
                }}
              />
            </div>

            {/* Tagline with Gentle Letter-Spacing Settle */}
            <motion.p
              initial={{ opacity: 0, y: 8, letterSpacing: '0.42em' }}
              animate={{ opacity: 1, y: 0, letterSpacing: '0.26em' }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-xs sm:text-sm uppercase text-[#E5C585]"
            >
              Discover Pakistan &middot; Live Its Stories
            </motion.p>

            {/* Unhurried Gold Progress Line */}
            <div className="w-52 sm:w-64 h-[2px] rounded-full bg-white/10 overflow-hidden">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="h-full w-full"
                style={{
                  background:
                    'linear-gradient(90deg, transparent 0%, #B99550 35%, #FDE68A 55%, #B99550 75%, transparent 100%)',
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
