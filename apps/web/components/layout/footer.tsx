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
    <footer className="bg-[#F3ECE0] text-gray-800 pt-16 pb-12 border-t border-[#E8DFD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Preferences & Global Quick Access Bar */}
        <div className="mb-12 pb-8 border-b border-[#E8DFD0] flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <span className="text-xs uppercase font-bold tracking-wider text-[#123C2D]">
              Travel Preferences:
            </span>

            {/* City Selector */}
            <div className="relative">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="bg-[#FAF6ED] border border-[#DACFBF] hover:border-[#123C2D] rounded-full px-3.5 py-1.5 text-xs text-gray-800 focus:outline-none focus:border-[#123C2D] cursor-pointer shadow-2xs"
                aria-label="Select Destination City"
              >
                <option value="Lahore">📍 Lahore Tours</option>
                <option value="Islamabad">📍 Islamabad Tours</option>
                <option value="Hunza">🏔️ Hunza & Gilgit</option>
                <option value="Karachi">🌊 Karachi Tours</option>
              </select>
            </div>

            {/* Currency Selector */}
            <div className="relative">
              <select
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                className="bg-[#FAF6ED] border border-[#DACFBF] hover:border-[#123C2D] rounded-full px-3 py-1.5 text-xs text-gray-800 focus:outline-none focus:border-[#123C2D] cursor-pointer shadow-2xs"
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
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FAF6ED] border border-emerald-900/20 text-[#123C2D] text-xs font-semibold hover:bg-emerald-50/50 transition shadow-2xs"
            >
              <Shield className="w-3.5 h-3.5 text-[#B99550]" />
              <span>Universal Safety & SOS</span>
            </Link>

            {/* Member Sign In / Sign Up */}
            <Link
              href="/login"
              className="text-xs font-semibold px-4 py-1.5 rounded-full border border-[#DACFBF] text-gray-800 hover:bg-[#FAF6ED] transition"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="text-xs font-bold px-4 py-1.5 rounded-full bg-[#123C2D] text-white hover:bg-[#0B251B] transition uppercase tracking-wider shadow-sm"
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
                className="h-14 sm:h-16 lg:h-18 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </Link>
            <p className="text-sm text-gray-700 max-w-sm leading-relaxed">
              Nationwide digital tourism marketplace connecting travellers with verified local guides.
              Discover authentic cultural, culinary, and natural experiences across Pakistan.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#FAF6ED] border border-[#DACFBF] flex items-center justify-center text-gray-700 hover:bg-[#123C2D] hover:text-white transition-colors shadow-2xs"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#FAF6ED] border border-[#DACFBF] flex items-center justify-center text-gray-700 hover:bg-[#123C2D] hover:text-white transition-colors shadow-2xs"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#FAF6ED] border border-[#DACFBF] flex items-center justify-center text-gray-700 hover:bg-[#123C2D] hover:text-white transition-colors shadow-2xs"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#123C2D]">
              Destinations
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/explore/lahore" className="hover:text-[#123C2D] transition font-medium">
                  Lahore (Walled City)
                </Link>
              </li>
              <li>
                <Link href="/explore/islamabad" className="hover:text-[#123C2D] transition font-medium">
                  Islamabad & Margalla
                </Link>
              </li>
              <li>
                <Link href="/explore?region=northern" className="hover:text-[#123C2D] transition font-medium">
                  Hunza & Gilgit-Baltistan
                </Link>
              </li>
              <li>
                <Link href="/explore?region=coastal" className="hover:text-[#123C2D] transition font-medium">
                  Karachi & Coastal Trails
                </Link>
              </li>
              <li>
                <Link href="/explore" className="hover:text-[#123C2D] transition font-medium">
                  All Tours & Packages
                </Link>
              </li>
            </ul>
          </div>

          {/* About & Trust */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#123C2D]">
              Company & Care
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/about" className="hover:text-[#123C2D] transition font-medium">
                  About Us & Story
                </Link>
              </li>
              <li>
                <Link href="/safety-guide" className="hover:text-[#123C2D] transition font-medium flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-[#B99550]" />
                  Universal Safety & SOS
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#123C2D] transition font-medium">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Form */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#123C2D]">
              Stay Inspired
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Get stories, cultural tips, and seasonal trip recommendations right to your inbox.
            </p>
            {subscribed ? (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-[#123C2D] font-medium">
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
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#123C2D] shadow-sm"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 px-3 bg-[#123C2D] hover:bg-[#0B251B] text-white rounded-md text-xs font-semibold flex items-center transition"
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
        <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© 2026 Daastaan-e-Pakistan. All rights reserved. Discover Pakistan. Live Its Stories.</p>
          <div className="flex space-x-6">
            <Link href="/safety-guide" className="hover:text-[#123C2D] transition">
              Universal Safety
            </Link>
            <Link href="/about" className="hover:text-[#123C2D] transition">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-[#123C2D] transition">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

