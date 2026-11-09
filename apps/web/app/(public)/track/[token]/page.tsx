'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import {
  ShieldCheck,
  MapPin,
  Clock,
  Compass,
  PhoneCall,
  User,
  Radio,
  ExternalLink,
} from 'lucide-react';

export default function PublicLiveTrackingPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const resolvedParams = use(params);
  const trackId = resolvedParams.token;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6ED]">
      <Header />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6">
        {/* Banner */}
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-700" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Official Family Safety Link · Verified Active Tour
            </span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-600 text-white font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            <span>LIVE</span>
          </span>
        </div>

        {/* Live Trip Header */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-2">
          <div className="text-xs font-mono font-bold text-[#B99550]">{trackId}</div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#123C2D]">
            Walled City Heritage Walk · Lahore
          </h1>
          <p className="text-xs text-gray-500">
            Traveler has shared their live journey progress with you via Daastaan-e-Pakistan Universal Safety.
          </p>
        </div>

        {/* Live Location telemetry */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-[#B99550]" />
              <span>Current Itinerary Stop & Coordinates</span>
            </span>
            <span className="text-[10px] text-gray-400">Refreshed 1m ago</span>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-emerald-700" />
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-gray-800">
                  Wazir Khan Mosque & Kashmiri Bazaar
                </h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  Near Delhi Gate, Walled City of Lahore (31.5892° N, 74.3160° E)
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-200 text-xs font-mono">
              <div>
                <span className="text-gray-400 block text-[10px] uppercase">Tour Status</span>
                <span className="font-bold text-emerald-700">Trip In Progress</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px] uppercase">Safety Check-In</span>
                <span className="font-bold text-gray-800">Pickup Completed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Assigned Verified Guide Info */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
              <User className="w-4 h-4 text-[#B99550]" />
              <span>Certified Tour Guide</span>
            </span>
            <span className="text-[10px] text-emerald-700 font-bold">DTS License #G-2026-LHE</span>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-100">
            <div>
              <h4 className="font-bold text-sm text-[#123C2D]">Ayesha Riaz</h4>
              <p className="text-xs text-gray-500">Government Certified Tourism Guide</p>
            </div>
            <a
              href="tel:+923000000002"
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Call Guide</span>
            </a>
          </div>
        </div>

        {/* 24/7 Operations Center Helpline */}
        <div className="p-6 rounded-2xl bg-[#123C2D] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-serif text-lg font-bold">Daastaan-e-Pakistan Safety Desk</h4>
            <p className="text-xs text-white/70">
              For any urgent inquiries regarding this live booking, contact our operations desk 24/7.
            </p>
          </div>
          <a
            href="tel:+923000000000"
            className="px-4 py-2.5 rounded-xl bg-[#B99550] hover:bg-[#a88440] text-black font-bold text-xs whitespace-nowrap transition"
          >
            Call Ops +92 300 0000000
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
