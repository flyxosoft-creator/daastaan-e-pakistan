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
  HeartHandshake
} from 'lucide-react';

export default function SafetyGuidePage() {
  return (
    <div className="min-h-screen bg-[#F7F3E9] flex flex-col font-sans">
      <Header />

      {/* Hero */}
      <section className="bg-[#123C2D] text-[#F7F3E9] pt-32 pb-16 px-4 border-b border-[#B99550]/20">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B99550]/20 text-[#B99550] text-xs font-semibold uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5" />
            <span>Universal Safety Architecture</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">
            Safety & Care on Every Daastaan Journey
          </h1>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            We believe that exploring Pakistan should be accessible, empowering, and completely secure — especially for solo travellers, overseas Pakistanis, and women explorers.
          </p>
        </div>
      </section>

      {/* 4 Pillars of Safety */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1 w-full space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Pillar 1 */}
          <div className="bg-white rounded-2xl p-6 border border-[#B99550]/20 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#123C2D] text-[#B99550] flex items-center justify-center font-bold text-xl">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#123C2D]">
              Verified Local Guides
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Every guide undergoes in-person interviews, CNIC identity verification, and local police background clearance before leading any tour.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white rounded-2xl p-6 border border-[#B99550]/20 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#123C2D] text-[#B99550] flex items-center justify-center font-bold text-xl">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#123C2D]">
              Live GPS Trip Tracking
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              During active tours, the web app shares live geolocation updates directly with your nominated emergency contact via a secure, no-login web link.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white rounded-2xl p-6 border border-[#B99550]/20 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-rose-900 text-rose-200 flex items-center justify-center font-bold text-xl">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-rose-900">
              Instant One-Touch SOS
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              An active SOS button triggers immediate SMS and email alerts with exact GPS coordinates to your emergency contact and flags our operations dashboard.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="bg-white rounded-2xl p-6 border border-[#B99550]/20 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#123C2D] text-[#B99550] flex items-center justify-center font-bold text-xl">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#123C2D]">
              Mandatory Guide Check-Ins
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Guides must complete 3 mandatory check-in steps on every trip: Trip Start, Pickup Done, and Trip Complete, monitored by our ops team.
            </p>
          </div>
        </div>

        {/* Detailed Safety Breakdown */}
        <div className="bg-white rounded-2xl p-8 sm:p-12 border border-[#B99550]/20 shadow-sm space-y-8">
          <div className="max-w-2xl">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#123C2D]">
              How the Safety Layer Works in Practice
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Our safety layer is built directly into our mobile-responsive web platform (PWA) — no separate download required to activate protection.
            </p>
          </div>

          <div className="space-y-6 text-sm text-gray-700">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-200">
              <div className="w-8 h-8 rounded-full bg-[#B99550] text-[#123C2D] font-bold flex items-center justify-center shrink-0">
                1
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-[#123C2D]">Nominate an Emergency Contact</h4>
                <p className="text-xs text-gray-600">
                  During booking or in your account settings, provide your emergency contact’s name, relationship, and WhatsApp/phone number. This information is encrypted with AES-256 at rest.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-200">
              <div className="w-8 h-8 rounded-full bg-[#B99550] text-[#123C2D] font-bold flex items-center justify-center shrink-0">
                2
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-[#123C2D]">Automated Live Tracking Link</h4>
                <p className="text-xs text-gray-600">
                  When your tour begins, your emergency contact receives an SMS containing a temporary tracking link. They can open it in any web browser to see your live progress on a map without needing an account.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-200">
              <div className="w-8 h-8 rounded-full bg-[#B99550] text-[#123C2D] font-bold flex items-center justify-center shrink-0">
                3
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-[#123C2D]">Direct WhatsApp & Phone Line to Operations</h4>
                <p className="text-xs text-gray-600">
                  Our operations team in Lahore monitors every active booking. If a guide misses a scheduled check-in window by more than 30 minutes, an automated escalation procedure is immediately initiated.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center space-y-4 pt-4">
          <h3 className="font-serif text-2xl font-bold text-[#123C2D]">
            Ready to explore Pakistan with total confidence?
          </h3>
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#B99550] text-[#123C2D] font-bold text-sm shadow-md hover:shadow-xl hover:bg-[#c9a65f] transition-all"
          >
            <span>Browse Verified Tours</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

