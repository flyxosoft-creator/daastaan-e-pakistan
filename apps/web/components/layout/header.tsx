'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = pathname === '/';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !isHome
          ? 'bg-[#123C2D]/95 backdrop-blur-md shadow-xl py-2 sm:py-3 border-b border-[#B99550]/20'
          : 'bg-gradient-to-b from-black/80 via-black/35 to-transparent py-4 sm:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Daastaan-e-Pakistan Official Horizontal Logo */}
          <Link href="/" className="flex items-center group py-1">
            <div className="relative flex items-center">
              <img
                src="/images/logo-official-horizontal.png"
                alt="Daastaan-e-Pakistan — Discover Pakistan. Live Its Stories."
                className="h-14 sm:h-18 lg:h-20 xl:h-22 w-auto max-w-[320px] sm:max-w-[420px] lg:max-w-[480px] object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]"
              />
            </div>
          </Link>

          {/* Desktop Nav - Only Important Navigation Matching Brand Mockup */}
          <nav className="hidden md:flex items-center space-x-8 lg:space-x-12 text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase text-white drop-shadow-md">
            <Link
              href="/explore"
              className="hover:text-[#B99550] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#B99550] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              Destinations
            </Link>
            <Link
              href="/explore"
              className="hover:text-[#B99550] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#B99550] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              Experiences
            </Link>
            <Link
              href="/about"
              className="hover:text-[#B99550] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#B99550] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="hover:text-[#B99550] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#B99550] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#F7F3E9] hover:bg-white/10 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#123C2D]/98 backdrop-blur-xl border-b border-[#B99550]/30 px-6 py-6 space-y-4">
          <Link
            href="/explore"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#F7F3E9] text-base font-semibold tracking-wider uppercase hover:text-[#B99550]"
          >
            Destinations
          </Link>
          <Link
            href="/explore"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#F7F3E9] text-base font-semibold tracking-wider uppercase hover:text-[#B99550]"
          >
            Experiences
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#F7F3E9] text-base font-semibold tracking-wider uppercase hover:text-[#B99550]"
          >
            About
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#F7F3E9] text-base font-semibold tracking-wider uppercase hover:text-[#B99550]"
          >
            Contact
          </Link>
        </div>
      )}
    </header>
  );
}

