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
      <div className="bg-white/98 backdrop-blur-md shadow-sm border-b border-gray-100 py-2.5 sm:py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Official Daastaan-e-Pakistan Horizontal Logo (Prominent, High-Res, Crisp) */}
          <Link href="/" className="flex items-center group py-0.5">
            <img
              src="/images/logo-official-horizontal-dark.png"
              alt="Daastaan-e-Pakistan — Discover Pakistan. Live Its Stories."
              className="h-12 sm:h-14 lg:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </Link>

          {/* Desktop Nav Items - Clean, Uncluttered, Essential */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 text-xs xl:text-sm font-semibold tracking-wider text-gray-700">
            <Link
              href="/explore"
              className={`transition-colors hover:text-[#123C2D] ${
                pathname === '/explore' && !pathname.includes('type=experiences')
                  ? 'text-[#123C2D] font-bold border-b-2 border-[#123C2D] pb-1'
                  : ''
              }`}
            >
              DESTINATIONS
            </Link>

            <Link
              href="/explore?type=experiences"
              className="transition-colors hover:text-[#123C2D]"
            >
              EXPERIENCES
            </Link>

            <Link
              href="/safety-guide"
              className="transition-colors hover:text-[#123C2D] flex items-center gap-1"
            >
              <span>UNIVERSAL SAFETY</span>
            </Link>

            <Link
              href="/about"
              className={`transition-colors hover:text-[#123C2D] ${
                pathname === '/about' ? 'text-[#123C2D] font-bold border-b-2 border-[#123C2D] pb-1' : ''
              }`}
            >
              ABOUT
            </Link>

            <Link
              href="/contact"
              className={`transition-colors hover:text-[#123C2D] ${
                pathname === '/contact' ? 'text-[#123C2D] font-bold border-b-2 border-[#123C2D] pb-1' : ''
              }`}
            >
              CONTACT
            </Link>
          </nav>

          {/* Desktop Right: Search & Action Button */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link
              href="/explore"
              className="p-2 rounded-full hover:bg-gray-100 text-gray-600 hover:text-[#123C2D] transition-colors"
              aria-label="Search tours and destinations"
            >
              <Search className="w-4 h-4" />
            </Link>
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#123C2D] hover:bg-[#1b4f3c] text-white text-xs font-bold tracking-wide transition-all shadow-sm hover:shadow"
            >
              <span>Book a Tour</span>
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="lg:hidden flex items-center space-x-2">
            <Link
              href="/explore"
              className="p-2 rounded-full text-gray-700 hover:bg-gray-100"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
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
            href="/explore"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#123C2D] font-bold text-sm py-1.5"
          >
            DESTINATIONS
          </Link>
          <Link
            href="/explore?type=experiences"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-700 font-semibold text-sm py-1.5 hover:text-[#123C2D]"
          >
            EXPERIENCES
          </Link>
          <Link
            href="/safety-guide"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-700 font-semibold text-sm py-1.5 hover:text-[#123C2D]"
          >
            UNIVERSAL SAFETY
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-700 font-semibold text-sm py-1.5 hover:text-[#123C2D]"
          >
            ABOUT US
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-700 font-semibold text-sm py-1.5 hover:text-[#123C2D]"
          >
            CONTACT
          </Link>
          <div className="pt-3 border-t border-gray-100">
            <Link
              href="/explore"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-full bg-[#123C2D] text-white font-bold text-xs flex items-center justify-center gap-1.5"
            >
              <Plane className="w-3.5 h-3.5 text-[#B99550]" />
              <span>Book a Tour</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

