'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
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
  User,
  ShieldCheck,
  Calendar,
  LogOut,
  Sparkles,
  ArrowRight,
  Award,
} from 'lucide-react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();
  const accountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close account dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setAccountMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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

          {/* Desktop Right: Search, Account & Action Button */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link
              href="/explore"
              className="p-2 rounded-full hover:bg-[#123C2D]/8 text-gray-600 hover:text-[#123C2D] transition-all duration-250"
              aria-label="Search tours and destinations"
            >
              <Search className="w-4 h-4" />
            </Link>

            {/* Authenticated Member Pill / Unauthenticated Sign In Buttons */}
            {isAuthenticated && user ? (
              <div className="relative" ref={accountRef}>
                <button
                  type="button"
                  onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                  className="flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-full bg-[#123C2D]/5 hover:bg-[#123C2D]/10 border border-[#B99550]/40 transition shadow-2xs cursor-pointer group"
                >
                  <img
                    src={user.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name)}&backgroundColor=123c2d&textColor=b99550`}
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover border border-[#B99550] shadow-xs"
                  />
                  <div className="text-left hidden xl:block">
                    <div className="text-xs font-bold text-[#123C2D] leading-tight flex items-center gap-1">
                      <span>{user.name.split(' ')[0]}</span>
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-500 group-hover:text-[#123C2D] transition-transform duration-200" />
                </button>

                {/* Account Dropdown Menu */}
                {accountMenuOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-[#B99550]/30 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* User Header */}
                    <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-br from-[#123C2D]/5 via-white to-transparent">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name)}&backgroundColor=123c2d&textColor=b99550`}
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover border-2 border-[#B99550]"
                        />
                        <div className="overflow-hidden">
                          <p className="text-xs font-bold text-[#123C2D] truncate">{user.name}</p>
                          <p className="text-[11px] text-gray-500 truncate">{user.email}</p>
                        </div>
                      </div>
                      <div className="mt-2.5 flex items-center justify-between text-[10px] font-semibold text-[#123C2D] bg-[#FAF6ED] px-2.5 py-1.5 rounded-lg border border-[#B99550]/30">
                        <span className="flex items-center gap-1 text-[#B99550]">
                          <Award className="w-3.5 h-3.5" />
                          <span>Member Tier</span>
                        </span>
                        <span className="font-serif font-bold text-[#123C2D]">Heritage Patron</span>
                      </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="py-1 text-xs text-gray-700 font-medium">
                      <Link
                        href="/dashboard"
                        onClick={() => setAccountMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 hover:bg-[#FAF6ED] hover:text-[#123C2D] transition"
                      >
                        <User className="w-4 h-4 text-[#B99550]" />
                        <span>Traveller Dashboard</span>
                      </Link>
                      <Link
                        href="/dashboard?tab=upcoming"
                        onClick={() => setAccountMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 hover:bg-[#FAF6ED] hover:text-[#123C2D] transition"
                      >
                        <Calendar className="w-4 h-4 text-[#B99550]" />
                        <span>Upcoming Reservations</span>
                      </Link>
                      <Link
                        href="/dashboard?tab=past"
                        onClick={() => setAccountMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 hover:bg-[#FAF6ED] hover:text-[#123C2D] transition"
                      >
                        <Sparkles className="w-4 h-4 text-[#B99550]" />
                        <span>Past Journeys &amp; Reviews</span>
                      </Link>
                      <Link
                        href="/dashboard?tab=safety"
                        onClick={() => setAccountMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 hover:bg-[#FAF6ED] hover:text-[#123C2D] transition"
                      >
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        <span>Safety &amp; SOS Contact</span>
                      </Link>
                    </div>

                    <div className="pt-1 mt-1 border-t border-gray-100">
                      <button
                        type="button"
                        onClick={() => {
                          logout();
                          setAccountMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <Link
                  href="/login"
                  className="px-3.5 py-1.5 text-xs font-semibold text-[#123C2D] hover:text-[#B99550] transition rounded-full hover:bg-[#123C2D]/5"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="px-3 py-1.5 rounded-full border border-[#B99550]/40 text-xs font-semibold text-[#123C2D] hover:bg-[#123C2D] hover:text-white transition shadow-2xs"
                >
                  Register
                </Link>
              </div>
            )}

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
        <div className="lg:hidden bg-[#FAF6ED] shadow-2xl border-b border-[#E8DFD0] px-6 py-5 space-y-4">
          {/* Member Card or Login Triggers at top of mobile menu */}
          {isAuthenticated && user ? (
            <div className="p-3 bg-white rounded-xl border border-[#B99550]/30 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src={user.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name)}&backgroundColor=123c2d&textColor=b99550`}
                  alt={user.name}
                  className="w-9 h-9 rounded-full object-cover border border-[#B99550]"
                />
                <div>
                  <p className="text-xs font-bold text-[#123C2D]">{user.name}</p>
                  <p className="text-[10px] text-gray-500">{user.email}</p>
                </div>
              </div>
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-bold text-[#B99550] hover:underline"
              >
                Dashboard
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 pt-1 pb-2 border-b border-[#E8DFD0]">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2 rounded-xl bg-white border border-gray-200 text-xs font-bold text-[#123C2D]"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2 rounded-xl bg-[#123C2D] text-white text-xs font-bold"
              >
                Register
              </Link>
            </div>
          )}

          <Link
            href="/explore"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#123C2D] font-bold text-sm py-1"
          >
            DESTINATIONS
          </Link>
          <Link
            href="/activities"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-700 font-semibold text-sm py-1 hover:text-[#123C2D]"
          >
            ACTIVITIES
          </Link>
          <Link
            href="/explore?type=experiences"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-700 font-semibold text-sm py-1 hover:text-[#123C2D]"
          >
            EXPERIENCES
          </Link>
          <Link
            href="/safety-guide"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-700 font-semibold text-sm py-1 hover:text-[#123C2D]"
          >
            UNIVERSAL SAFETY
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-700 font-semibold text-sm py-1 hover:text-[#123C2D]"
          >
            ABOUT US
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-700 font-semibold text-sm py-1 hover:text-[#123C2D]"
          >
            CONTACT
          </Link>

          {isAuthenticated && (
            <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-bold text-[#123C2D]"
              >
                View My Reservations
              </Link>
              <button
                type="button"
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="text-xs text-rose-600 font-semibold"
              >
                Sign Out
              </button>
            </div>
          )}

          <div className="pt-2 border-t border-gray-100">
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

