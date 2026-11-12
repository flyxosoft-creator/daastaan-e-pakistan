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
    <footer className="relative bg-[#0a2418] text-white overflow-hidden">
      {/* Gold top border */}
      <div className="h-[2px] w-full" style={{ background: 'linear-gradient(90deg, transparent 0%, #B99550 20%, #D4AF6E 50%, #B99550 80%, transparent 100%)' }} />

      {/* Subtle geometric pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #B99550 0px, #B99550 1px, transparent 1px, transparent 14px),
            repeating-linear-gradient(-45deg, #B99550 0px, #B99550 1px, transparent 1px, transparent 14px)`,
        }}
      />

      {/* Ambient gold glow bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center bottom, rgba(185,149,80,0.08) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        {/* Top Preferences & Global Quick Access Bar */}
        <div className="mb-10 pb-8 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <span className="text-xs uppercase font-bold tracking-wider text-[#D4AF6E]">
              Travel Preferences:
            </span>

            {/* City Selector */}
            <div className="relative">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="bg-white/8 border border-white/15 hover:border-[#B99550]/60 rounded-full px-3.5 py-1.5 text-xs text-white/90 focus:outline-none focus:border-[#B99550] cursor-pointer backdrop-blur-sm transition-colors"
                aria-label="Select Destination City"
              >
                <option value="Lahore" className="text-gray-900">📍 Lahore Tours</option>
                <option value="Islamabad" className="text-gray-900">📍 Islamabad Tours</option>
                <option value="Hunza" className="text-gray-900">🏔️ Hunza & Gilgit</option>
                <option value="Karachi" className="text-gray-900">🌊 Karachi Tours</option>
              </select>
            </div>

            {/* Currency Selector */}
            <div className="relative">
              <select
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                className="bg-white/8 border border-white/15 hover:border-[#B99550]/60 rounded-full px-3 py-1.5 text-xs text-white/90 focus:outline-none focus:border-[#B99550] cursor-pointer backdrop-blur-sm transition-colors"
                aria-label="Select Currency"
              >
                <option value="PKR" className="text-gray-900">PKR (₨)</option>
                <option value="USD" className="text-gray-900">USD ($)</option>
                <option value="GBP" className="text-gray-900">GBP (£)</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Universal Safety Protocol Link */}
            <Link
              href="/safety-guide"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/8 border border-[#B99550]/30 text-[#D4AF6E] text-xs font-semibold hover:bg-[#B99550]/15 transition-all"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Universal Safety & SOS</span>
            </Link>

            {/* Member Sign In / Sign Up */}
            <Link
              href="/login"
              className="text-xs font-semibold px-4 py-1.5 rounded-full border border-white/20 text-white/80 hover:text-white hover:border-white/40 transition-all"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="text-xs font-bold px-4 py-1.5 rounded-full bg-gradient-to-r from-[#B99550] to-[#D4AF6E] text-[#0a2418] hover:shadow-[0_4px_16px_-2px_rgba(185,149,80,0.5)] transition-all uppercase tracking-wider"
            >
              Join Daastaan
            </Link>
          </div>
        </div>

        {/* Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Info - Same Official Horizontal Logo as Header */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block group">
              <img
                src="/images/logos/Daastaan-e-Pakistan_Horizontal-Logo.png"
                alt="Daastaan-e-Pakistan — Discover Pakistan. Live Its Stories."
                className="h-14 sm:h-16 lg:h-18 w-auto object-contain transition-transform group-hover:scale-105 brightness-0 invert"
              />
            </Link>
            <p className="text-sm text-white/60 max-w-sm leading-relaxed">
              Nationwide digital tourism marketplace connecting travellers with verified local guides.
              Discover authentic cultural, culinary, and natural experiences across Pakistan.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/8 border border-white/15 flex items-center justify-center text-white/60 hover:bg-[#B99550] hover:text-[#0a2418] hover:border-[#B99550] transition-all shadow-sm"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/8 border border-white/15 flex items-center justify-center text-white/60 hover:bg-[#B99550] hover:text-[#0a2418] hover:border-[#B99550] transition-all shadow-sm"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/8 border border-white/15 flex items-center justify-center text-white/60 hover:bg-[#B99550] hover:text-[#0a2418] hover:border-[#B99550] transition-all shadow-sm"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-[#D4AF6E]">
              Destinations
            </h4>
            <ul className="space-y-2.5 text-sm text-white/55">
              {[
                { label: 'Lahore (Walled City)', href: '/explore/lahore' },
                { label: 'Islamabad & Margalla', href: '/explore/islamabad' },
                { label: 'Hunza & Gilgit-Baltistan', href: '/explore?region=northern' },
                { label: 'Karachi & Coastal Trails', href: '/explore?region=coastal' },
                { label: 'All Tours & Packages', href: '/explore' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="hover:text-[#D4AF6E] transition-colors font-medium">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About & Trust */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-[#D4AF6E]">
              Company & Care
            </h4>
            <ul className="space-y-2.5 text-sm text-white/55">
              <li>
                <Link href="/about" className="hover:text-[#D4AF6E] transition-colors font-medium">
                  About Us & Story
                </Link>
              </li>
              <li>
                <Link href="/safety-guide" className="hover:text-[#D4AF6E] transition-colors font-medium flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-[#B99550]" />
                  Universal Safety & SOS
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#D4AF6E] transition-colors font-medium">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Form */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-[#D4AF6E]">
              Stay Inspired
            </h4>
            <p className="text-xs text-white/50 leading-relaxed">
              Get stories, cultural tips, and seasonal trip recommendations right to your inbox.
            </p>
            {subscribed ? (
              <div className="p-3 bg-[#B99550]/15 border border-[#B99550]/30 rounded-lg text-xs text-[#D4AF6E] font-medium">
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
                    className="w-full bg-white/8 border border-white/15 rounded-lg px-3 py-2 text-xs text-white placeholder-white/35 focus:outline-none focus:border-[#B99550]/60 transition-colors"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 px-3 bg-gradient-to-r from-[#B99550] to-[#D4AF6E] hover:from-[#A88338] hover:to-[#B99550] text-[#0a2418] rounded-md text-xs font-bold flex items-center transition-all"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[10px] text-white/30">
                  No spam ever. Unsubscribe with 1 click.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/35 gap-4">
          <p>© 2026 Daastaan-e-Pakistan. All rights reserved. Discover Pakistan. Live Its Stories.</p>
          <div className="flex space-x-6">
            <Link href="/safety-guide" className="hover:text-[#D4AF6E] transition-colors">
              Universal Safety
            </Link>
            <Link href="/about" className="hover:text-[#D4AF6E] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-[#D4AF6E] transition-colors">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

