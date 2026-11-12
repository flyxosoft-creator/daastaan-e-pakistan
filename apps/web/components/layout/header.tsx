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
    <header
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#FAF6ED]/98 backdrop-blur-2xl shadow-[0_4px_32px_-4px_rgba(18,60,45,0.12)]'
          : 'bg-[#FAF6ED]/95 backdrop-blur-md shadow-xs'
      }`}
    >
      {/* Gold gradient border line — always visible, brighter on scroll */}
      <div
        className={`h-[1.5px] w-full transition-opacity duration-500 ${isScrolled ? 'opacity-100' : 'opacity-40'}`}
        style={{ background: 'linear-gradient(90deg, transparent 0%, #B99550 20%, #D4AF6E 50%, #B99550 80%, transparent 100%)' }}
      />
      {/* ─── Light Subtle Top Utility Bar ────────────────────────────── */}
      <div className="bg-[#F3ECE0] text-gray-700 text-[11px] sm:text-xs border-b border-[#E8DFD0] py-1.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: Contact Info */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            <a
              href="mailto:info@daastaanepakista.com"
              className="flex items-center gap-1.5 hover:text-[#123C2D] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#B99550]" />
              <span className="hidden sm:inline">info@daastaanepakista.com</span>
              <span className="sm:hidden">Email</span>
            </a>
            <span className="text-gray-300">|</span>
            <a
              href="tel:+923324541952"
              className="flex items-center gap-1.5 hover:text-[#123C2D] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#B99550]" />
              <span>+92 332 4541952</span>
              <span className="hidden md:inline">| +92 300 8492551</span>
            </a>
          </div>

          {/* Right: Socials */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="flex items-center space-x-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-5 h-5 rounded-full bg-[#EAE1D2] hover:bg-[#123C2D] flex items-center justify-center text-gray-700 hover:text-white transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-3 h-3" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-5 h-5 rounded-full bg-[#EAE1D2] hover:bg-[#123C2D] flex items-center justify-center text-gray-700 hover:text-white transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Main Clean Navigation Bar ──────────────────────────────── */}
      <div className="py-2.5 sm:py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Official Daastaan-e-Pakistan Horizontal Logo (Prominent, High-Res, Crisp) */}
          <Link href="/" className="flex items-center group py-0.5">
            <img
              src="/images/logos/Daastaan-e-Pakistan_Horizontal-Logo.png"
              alt="Daastaan-e-Pakistan — Discover Pakistan. Live Its Stories."
              className="h-12 sm:h-14 lg:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </Link>

          {/* Desktop Nav Items - Clean, Uncluttered, Essential */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 text-xs xl:text-sm font-semibold tracking-wider text-gray-700">
            {[
              { label: 'DESTINATIONS', href: '/explore', match: (p: string) => p === '/explore' && !p.includes('experiences') },
              { label: 'ACTIVITIES',   href: '/activities', match: (p: string) => p === '/activities' },
              { label: 'EXPERIENCES',  href: '/explore?type=experiences', match: () => false },
              { label: 'UNIVERSAL SAFETY', href: '/safety-guide', match: (p: string) => p === '/safety-guide' },
              { label: 'ABOUT',   href: '/about',   match: (p: string) => p === '/about' },
              { label: 'CONTACT', href: '/contact', match: (p: string) => p === '/contact' },
            ].map(({ label, href, match }) => {
              const active = match(pathname);
              return (
                <Link
                  key={label}
                  href={href}
                  className={`relative group pb-0.5 transition-colors duration-250 hover:text-[#123C2D] ${active ? 'text-[#123C2D] font-bold' : ''}`}
                >
                  {label}
                  {/* Animated underline */}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-[2px] rounded-full bg-gradient-to-r from-[#B99550] to-[#D4AF6E] transition-all duration-350 ${
                      active ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right: Search & Action Button */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link
              href="/explore"
              className="p-2 rounded-full hover:bg-[#123C2D]/8 text-gray-600 hover:text-[#123C2D] transition-all duration-250"
              aria-label="Search tours and destinations"
            >
              <Search className="w-4 h-4" />
            </Link>
            <Link
              href="/explore"
              className="btn-premium text-xs"
            >
              <span>Book a Tour</span>
              <span className="text-[#D4AF6E]">↗</span>
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
        <div className="lg:hidden bg-[#FAF6ED] shadow-2xl border-b border-[#E8DFD0] px-6 py-5 space-y-3">
          <Link
            href="/explore"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#123C2D] font-bold text-sm py-1.5"
          >
            DESTINATIONS
          </Link>
          <Link
            href="/activities"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-700 font-semibold text-sm py-1.5 hover:text-[#123C2D]"
          >
            ACTIVITIES
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

