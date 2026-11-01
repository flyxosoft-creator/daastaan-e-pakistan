'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowRight, Shield, Heart, MapPin, Phone, Instagram, Facebook, Twitter, User } from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('PKR');
  const [selectedCity, setSelectedCity] = useState('Lahore');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#0D241B] text-[#F7F3E9] pt-16 pb-12 border-t border-[#B99550]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Preferences & Global Quick Access Bar (Moved from Header for Cleanliness) */}
        <div className="mb-12 pb-8 border-b border-[#B99550]/20 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <span className="text-xs uppercase font-semibold tracking-wider text-[#B99550]">
              Travel Preferences:
            </span>

            {/* City Selector */}
            <div className="relative">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="bg-[#123C2D] border border-[#B99550]/40 rounded-full px-3.5 py-1.5 text-xs text-[#F7F3E9] focus:outline-none focus:border-[#B99550] cursor-pointer"
                aria-label="Select Destination City"
              >
                <option value="Lahore">📍 Lahore Tours</option>
                <option value="Islamabad">📍 Islamabad Tours</option>
              </select>
            </div>

            {/* Currency Selector */}
            <div className="relative">
              <select
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                className="bg-[#123C2D] border border-[#B99550]/40 rounded-full px-3 py-1.5 text-xs text-[#F7F3E9] focus:outline-none focus:border-[#B99550] cursor-pointer"
                aria-label="Select Currency"
              >
                <option value="PKR">PKR (₨)</option>
                <option value="USD">USD ($)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Universal Safety Protocol Link */}
            <Link
              href="/safety-guide"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#123C2D] border border-[#B99550]/40 text-[#B99550] text-xs font-medium hover:bg-[#B99550]/20 transition"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Universal Safety & SOS</span>
            </Link>

            {/* Member Sign In / Sign Up */}
            <Link
              href="/login"
              className="text-xs font-semibold px-4 py-1.5 rounded-full border border-white/30 text-white hover:bg-white/10 transition"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="text-xs font-bold px-4 py-1.5 rounded-full bg-[#B99550] text-[#123C2D] hover:bg-[#c9a65f] transition uppercase tracking-wider"
            >
              Join Daastaan
            </Link>
          </div>
        </div>

        {/* Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Info - Showcases Official Final Logo */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block group">
              <img
                src="/images/final-official-logo.png"
                alt="Daastaan-e-Pakistan — Official Emblem"
                className="h-20 sm:h-24 w-auto object-contain transition-transform group-hover:scale-105 drop-shadow-xl"
              />
            </Link>
            <p className="text-sm text-gray-300 max-w-sm leading-relaxed">
              Nationwide digital tourism marketplace connecting travellers with verified local guides.
              Discover authentic cultural, culinary, and natural experiences across Pakistan.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#123C2D] flex items-center justify-center text-[#B99550] hover:bg-[#B99550] hover:text-[#123C2D] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#123C2D] flex items-center justify-center text-[#B99550] hover:bg-[#B99550] hover:text-[#123C2D] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#123C2D] flex items-center justify-center text-[#B99550] hover:bg-[#B99550] hover:text-[#123C2D] transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#B99550]">
              Destinations
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/explore/lahore" className="hover:text-[#B99550] transition">
                  Lahore (Walled City)
                </Link>
              </li>
              <li>
                <Link href="/explore/islamabad" className="hover:text-[#B99550] transition">
                  Islamabad & Margalla
                </Link>
              </li>
              <li>
                <Link href="/explore" className="hover:text-[#B99550] transition">
                  All Tours & Packages
                </Link>
              </li>
              <li>
                <span className="text-gray-500 text-xs flex items-center gap-1">
                  Gilgit-Baltistan (Coming Soon)
                </span>
              </li>
            </ul>
          </div>

          {/* About & Trust */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#B99550]">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/about" className="hover:text-[#B99550] transition">
                  About Us & Story
                </Link>
              </li>
              <li>
                <Link href="/safety-guide" className="hover:text-[#B99550] transition flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-[#B99550]" />
                  Universal Safety & SOS
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#B99550] transition">
                  FAQ & Guide
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#B99550] transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Form */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#B99550]">
              Stay Inspired
            </h4>
            <p className="text-xs text-gray-300">
              Get stories, cultural tips, and seasonal trip recommendations right to your inbox.
            </p>
            {subscribed ? (
              <div className="p-3 bg-[#123C2D] border border-[#B99550]/40 rounded-lg text-xs text-[#B99550]">
                Shukriya! You are now subscribed to Daastaan stories.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-[#123C2D] border border-[#B99550]/30 rounded-lg px-3 py-2 text-xs text-[#F7F3E9] placeholder-gray-400 focus:outline-none focus:border-[#B99550]"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 px-3 bg-[#B99550] hover:bg-[#c9a65f] text-[#123C2D] rounded-md text-xs font-semibold flex items-center transition"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[10px] text-gray-400">
                  No spam ever. Unsubscribe with 1 click.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#B99550]/15 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© 2026 Daastaan-e-Pakistan. All rights reserved. Discover Pakistan. Live Its Stories.</p>
          <div className="flex space-x-6">
            <Link href="/terms" className="hover:text-[#B99550] transition">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover:text-[#B99550] transition">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-[#B99550] transition">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

