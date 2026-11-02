'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  Mail,
  Phone,
  Instagram,
  Facebook,
  Search,
  ChevronDown,
  Plane,
} from 'lucide-react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 left-0 right-0 z-50 shadow-md">
      {/* ─── Top Contact Bar ────────────────────────────────────────── */}
      <div className="bg-[#0B251B] text-white/90 text-xs border-b border-[#B99550]/20 py-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: Contact Info */}
          <div className="flex items-center space-x-3 sm:space-x-5 text-[11px] sm:text-xs">
            <a
              href="mailto:enquiries@daastaanepakistan.org"
              className="flex items-center gap-1.5 hover:text-[#B99550] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#B99550]" />
              <span className="hidden sm:inline">enquiries@daastaanepakistan.org</span>
              <span className="sm:hidden">Email Us</span>
            </a>
            <span className="text-white/30">|</span>
            <a
              href="tel:+923324541952"
              className="flex items-center gap-1.5 hover:text-[#B99550] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#B99550]" />
              <span>+92 332 4541952</span>
              <span className="hidden md:inline">| +92 300 8492551</span>
            </a>
          </div>

          {/* Right: Social Icons & Plan Your Trip */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="flex items-center space-x-2.5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-5 h-5 rounded-full bg-white/10 hover:bg-[#B99550] flex items-center justify-center text-white hover:text-[#0B251B] transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-3 h-3" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-5 h-5 rounded-full bg-white/10 hover:bg-[#B99550] flex items-center justify-center text-white hover:text-[#0B251B] transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-3 h-3" />
              </a>
            </div>

            <Link
              href="/explore"
              className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#B99550] hover:bg-[#a38240] text-[#0B251B] text-[11px] sm:text-xs font-bold tracking-wide transition-all shadow-sm"
            >
              <Plane className="w-3 h-3 text-[#0B251B]" />
              <span>Plan Your Trip</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ─── Main White Header / Navigation ─────────────────────────── */}
      <div className="bg-white/98 backdrop-blur-md shadow-sm border-b border-gray-100 py-3 sm:py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Official Daastaan-e-Pakistan Horizontal Logo */}
          <Link href="/" className="flex items-center group py-0.5">
            <img
              src="/images/logo-official-horizontal-dark.png"
              alt="Daastaan-e-Pakistan — Discover Pakistan. Live Its Stories."
              className="h-10 sm:h-12 lg:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 text-xs xl:text-sm font-semibold text-gray-800">
            {/* Home Pill */}
            <Link
              href="/"
              className={`px-3.5 py-2 rounded-full transition-colors ${
                pathname === '/'
                  ? 'bg-[#123C2D] text-white shadow-sm'
                  : 'text-gray-700 hover:text-[#123C2D] hover:bg-gray-100'
              }`}
            >
              Home
            </Link>

            {/* Destinations Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown('destinations')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className="flex items-center gap-1 px-3 py-2 rounded-md hover:text-[#123C2D] hover:bg-gray-100 transition-colors">
                <span>Explore Pakistan</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </button>
              {openDropdown === 'destinations' && (
                <div className="absolute top-full left-0 w-52 bg-white shadow-xl rounded-xl border border-gray-100 py-2 mt-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <Link
                    href="/explore/lahore"
                    className="block px-4 py-2.5 text-xs text-gray-700 hover:bg-[#F7F3E9] hover:text-[#123C2D] font-medium"
                  >
                    📍 Lahore (Walled City)
                  </Link>
                  <Link
                    href="/explore/islamabad"
                    className="block px-4 py-2.5 text-xs text-gray-700 hover:bg-[#F7F3E9] hover:text-[#123C2D] font-medium"
                  >
                    📍 Islamabad & Margalla
                  </Link>
                  <Link
                    href="/explore?region=northern"
                    className="block px-4 py-2.5 text-xs text-gray-700 hover:bg-[#F7F3E9] hover:text-[#123C2D] font-medium"
                  >
                    🏔️ Northern Valleys
                  </Link>
                  <Link
                    href="/explore?region=coastal"
                    className="block px-4 py-2.5 text-xs text-gray-700 hover:bg-[#F7F3E9] hover:text-[#123C2D] font-medium"
                  >
                    🌊 Coastal Beauty
                  </Link>
                </div>
              )}
            </div>

            {/* Tours & Experiences Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown('tours')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className="flex items-center gap-1 px-3 py-2 rounded-md hover:text-[#123C2D] hover:bg-gray-100 transition-colors">
                <span>Tours & Travel</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </button>
              {openDropdown === 'tours' && (
                <div className="absolute top-full left-0 w-52 bg-white shadow-xl rounded-xl border border-gray-100 py-2 mt-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <Link
                    href="/explore"
                    className="block px-4 py-2.5 text-xs text-gray-700 hover:bg-[#F7F3E9] hover:text-[#123C2D] font-medium"
                  >
                    All Curated Tours
                  </Link>
                  <Link
                    href="/explore?tier=PREMIUM"
                    className="block px-4 py-2.5 text-xs text-gray-700 hover:bg-[#F7F3E9] hover:text-[#123C2D] font-medium"
                  >
                    👑 Royal & Luxury Tiers
                  </Link>
                  <Link
                    href="/explore?category=adventure"
                    className="block px-4 py-2.5 text-xs text-gray-700 hover:bg-[#F7F3E9] hover:text-[#123C2D] font-medium"
                  >
                    🧗 Adventure & Expeditions
                  </Link>
                </div>
              )}
            </div>

            {/* Safety Protocol */}
            <Link
              href="/safety-guide"
              className="px-3 py-2 rounded-md hover:text-[#123C2D] hover:bg-gray-100 transition-colors"
            >
              Universal Safety
            </Link>

            {/* About */}
            <Link
              href="/about"
              className="px-3 py-2 rounded-md hover:text-[#123C2D] hover:bg-gray-100 transition-colors"
            >
              About Us
            </Link>

            {/* Contact */}
            <Link
              href="/contact"
              className="px-3 py-2 rounded-md hover:text-[#123C2D] hover:bg-gray-100 transition-colors"
            >
              Contact
            </Link>

            {/* Search Icon Trigger */}
            <Link
              href="/explore"
              className="p-2 rounded-full hover:bg-gray-100 text-gray-700 hover:text-[#123C2D] transition-colors ml-2"
              aria-label="Search tours and destinations"
            >
              <Search className="w-4 h-4" />
            </Link>
          </nav>

          {/* Mobile Menu Trigger */}
          <div className="lg:hidden flex items-center space-x-2">
            <Link
              href="/explore"
              className="p-2 rounded-full text-gray-700 hover:bg-gray-100"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-[#123C2D]" />}
            </button>
          </div>
        </div>
      </div>

      {/* ─── Mobile Menu Drawer ─────────────────────────────────────── */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white shadow-2xl border-b border-gray-200 px-6 py-5 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#123C2D] font-bold text-sm py-1"
          >
            Home
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-700 font-medium text-sm py-1 hover:text-[#123C2D]"
          >
            About Us
          </Link>
          <Link
            href="/explore"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-700 font-medium text-sm py-1 hover:text-[#123C2D]"
          >
            Explore Pakistan
          </Link>
          <Link
            href="/explore"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-700 font-medium text-sm py-1 hover:text-[#123C2D]"
          >
            Tours & Travel
          </Link>
          <Link
            href="/safety-guide"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-700 font-medium text-sm py-1 hover:text-[#123C2D]"
          >
            Our Services & Safety
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-700 font-medium text-sm py-1 hover:text-[#123C2D]"
          >
            Contact Us
          </Link>
          <div className="pt-3 border-t border-gray-100">
            <Link
              href="/explore"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-full bg-[#123C2D] text-white font-bold text-xs flex items-center justify-center gap-1.5"
            >
              <Plane className="w-3.5 h-3.5 text-[#B99550]" />
              <span>Plan Your Trip</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

