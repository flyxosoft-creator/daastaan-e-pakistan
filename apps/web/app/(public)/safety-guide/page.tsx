'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import {
  Shield,
  PhoneCall,
  MapPin,
  CheckCircle2,
  Users,
  AlertTriangle,
  Lock,
  ArrowRight,
  HeartHandshake,
  Sparkles,
  Phone,
} from 'lucide-react';

export default function SafetyGuidePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header />

      {/* Modern Light Hero Strip with Subtle Grid & Ambient Glow */}
      <section className="relative pt-12 pb-12 sm:pt-16 sm:pb-16 px-4 bg-white border-b border-gray-100 overflow-hidden bg-tech-grid">
        <div className="ambient-glow absolute inset-0 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#123C2D]/5 border border-[#123C2D]/10 text-[#123C2D] text-xs font-semibold tracking-wide shadow-xs">
            <Shield className="w-3.5 h-3.5 text-[#B99550]" />
            <span>Universal Safety Architecture</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
            Safety & Care on Every{' '}
            <span className="text-gradient-brand">Daastaan Journey</span>
          </h1>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            We believe exploring Pakistan should be accessible, empowering, and completely secure — especially for solo travellers, overseas visitors, and women explorers.
          </p>
        </div>
      </section>

      {/* 4 Pillars of Safety */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1 w-full space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Pillar 1 */}
          <div className="bg-[#FAF9F5] rounded-3xl p-6 sm:p-7 border border-gray-200/90 shadow-xs hover:shadow-lg transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#123C2D] to-[#1F5C45] text-[#B99550] flex items-center justify-center shadow-xs">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-gray-900">
              Verified Local Guides
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Every guide undergoes in-person interviews, CNIC identity verification, and local police background clearance before leading any tour.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="bg-[#FAF9F5] rounded-3xl p-6 sm:p-7 border border-gray-200/90 shadow-xs hover:shadow-lg transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#123C2D] to-[#1F5C45] text-[#B99550] flex items-center justify-center shadow-xs">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-gray-900">
              Live GPS Trip Tracking
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              During active tours, the web app shares live geolocation updates directly with your nominated emergency contact via a secure, no-login link.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="bg-[#FAF9F5] rounded-3xl p-6 sm:p-7 border border-gray-200/90 shadow-xs hover:shadow-lg transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-700 text-white flex items-center justify-center shadow-xs">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-rose-900">
              Instant One-Touch SOS
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              An active SOS button triggers immediate SMS and email alerts with exact GPS coordinates to your emergency contact and flags our operations dashboard.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="bg-[#FAF9F5] rounded-3xl p-6 sm:p-7 border border-gray-200/90 shadow-xs hover:shadow-lg transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#123C2D] to-[#1F5C45] text-[#B99550] flex items-center justify-center shadow-xs">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-gray-900">
              Mandatory Guide Check-Ins
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Guides must complete 3 mandatory check-in steps on every trip: Trip Start, Pickup Done, and Trip Complete, monitored by our operations desk.
            </p>
          </div>
        </div>

        {/* Detailed Safety Breakdown */}
        <div className="bg-[#FAF9F5] rounded-3xl p-8 sm:p-14 border border-gray-200/90 shadow-xs space-y-8">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs font-bold uppercase tracking-widest text-[#B99550]">
              Operational Framework
            </p>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-gray-900">
              How the Safety Layer{' '}
              <span className="text-gradient-brand">Works in Practice</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              From the moment you confirm a booking to when you safely return home:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="p-6 rounded-2xl bg-white border border-gray-200/80 shadow-xs space-y-3">
              <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-[#123C2D]/5 text-[#123C2D]">
                Step 1: Before the Tour
              </span>
              <h4 className="font-serif font-bold text-base text-gray-900">
                Contact & Route Verification
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                You receive the guide’s verified profile, national ID verification status, badge number, and exact vehicle details if transport is included.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-gray-200/80 shadow-xs space-y-3">
              <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-[#123C2D]/5 text-[#123C2D]">
                Step 2: During the Tour
              </span>
              <h4 className="font-serif font-bold text-base text-gray-900">
                Active Tracking & Checkpoints
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                A live web link allows your designated loved ones to track your location in real time with zero required app installs or account signups.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-gray-200/80 shadow-xs space-y-3">
              <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-[#123C2D]/5 text-[#123C2D]">
                Step 3: After the Tour
              </span>
              <h4 className="font-serif font-bold text-base text-gray-900">
                Safe Return & Verified Reviews
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                The guide confirms trip completion. You receive a follow-up check-in and an invitation to leave a verified review that holds guides accountable.
              </p>
            </div>
          </div>
        </div>

        {/* Emergency Assistance Hotlines */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">
              24/7 Operations & Emergency Support
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 max-w-xl">
              Our safety desk is staffed around the clock. In an emergency, our dispatch team coordinates directly with local law enforcement (15) and Rescue (1122).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="tel:+923324541952"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#123C2D] to-[#1F5C45] text-white font-bold text-xs sm:text-sm shadow-md hover:scale-[1.02] transition-all"
            >
              <Phone className="w-4 h-4 text-[#B99550]" />
              <span>+92 332 4541952 (24/7)</span>
            </a>
            <a
              href="tel:15"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-rose-50 text-rose-700 border border-rose-200 font-bold text-xs sm:text-sm hover:bg-rose-100 transition-all"
            >
              <span>National Police: 15</span>
            </a>
            <a
              href="tel:1122"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-xs sm:text-sm hover:bg-emerald-100 transition-all"
            >
              <span>Rescue: 1122</span>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
