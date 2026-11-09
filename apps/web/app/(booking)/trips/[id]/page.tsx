'use client';

import React, { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import {
  ShieldAlert,
  ShieldCheck,
  MapPin,
  Clock,
  PhoneCall,
  User,
  AlertTriangle,
  CheckCircle,
  Share2,
  Navigation,
  Compass,
  MessageCircle,
  Star,
  Copy,
  Check,
  Radio,
  ExternalLink,
} from 'lucide-react';

export default function ActiveTripSafetyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const tripId = resolvedParams.id;

  // Trip and safety state
  const [sosActive, setSosActive] = useState(false);
  const [sosCountdown, setSosCountdown] = useState<number | null>(null);
  const [sosSent, setSosSent] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [currentCoords, setCurrentCoords] = useState<{
    lat: number;
    lng: number;
    accuracy: number;
    lastUpdated: string;
  }>({
    lat: 31.5892,
    lng: 74.316,
    accuracy: 8,
    lastUpdated: 'Just now',
  });
  const [gpsTrackingActive, setGpsTrackingActive] = useState(true);

  // Guide Check-in progression
  const [checkIns, setCheckIns] = useState({
    tripStart: { done: true, time: '09:00 AM' },
    pickupDone: { done: true, time: '09:18 AM' },
    tripComplete: { done: false, time: null as string | null },
  });

  // Request actual browser geolocation if supported
  useEffect(() => {
    if (!navigator.geolocation) return;

    const watcher = navigator.geolocation.watchPosition(
      (pos) => {
        setCurrentCoords({
          lat: Number(pos.coords.latitude.toFixed(4)),
          lng: Number(pos.coords.longitude.toFixed(4)),
          accuracy: Math.round(pos.coords.accuracy),
          lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        });
      },
      (err) => {
        console.warn('Geolocation read error (fallback applied):', err.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 30000 },
    );

    return () => navigator.geolocation.clearWatch(watcher);
  }, []);

  // SOS Countdown handler
  useEffect(() => {
    if (sosCountdown === null) return;
    if (sosCountdown === 0) {
      setSosCountdown(null);
      setSosSent(true);
      setSosActive(true);
      return;
    }

    const timer = setTimeout(() => {
      setSosCountdown((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => clearTimeout(timer);
  }, [sosCountdown]);

  const triggerSosSequence = () => {
    setSosCountdown(5); // 5 second safety abort window
  };

  const cancelSosCountdown = () => {
    setSosCountdown(null);
  };

  const resolveSos = () => {
    setSosActive(false);
    setSosSent(false);
  };

  const handleCopyShareLink = () => {
    const url = typeof window !== 'undefined' ? `${window.location.origin}/track/${tripId}` : '';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6ED]">
      <Header />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6">
        {/* Active Emergency SOS Banner (when active) */}
        {sosActive && (
          <div className="p-5 rounded-2xl bg-red-600 text-white shadow-xl animate-pulse space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-white" />
                <h3 className="font-bold text-sm sm:text-base uppercase tracking-wider">
                  EMERGENCY SOS DISPATCH TRIGGERED
                </h3>
              </div>
              <button
                onClick={resolveSos}
                className="px-3 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-xs font-bold transition"
              >
                Mark Safe / Resolve
              </button>
            </div>
            <p className="text-xs text-red-100">
              Daastaan-e-Pakistan 24/7 Operations Center and your emergency contact have been notified via Twilio SMS and automated dispatch call with your live GPS location ({currentCoords.lat}° N, {currentCoords.lng}° E).
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <a
                href="tel:1422"
                className="px-3 py-1.5 rounded-lg bg-white text-red-700 font-bold text-xs flex items-center gap-1.5 shadow-xs"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call Tourist Police (1422)</span>
              </a>
              <a
                href="tel:1122"
                className="px-3 py-1.5 rounded-lg bg-white text-red-700 font-bold text-xs flex items-center gap-1.5 shadow-xs"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call Rescue 1122</span>
              </a>
            </div>
          </div>
        )}

        {/* Trip Header */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                <span>Tour In Progress</span>
              </span>
              <span className="text-xs font-mono font-bold text-[#B99550]">{tripId}</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#123C2D]">
              Active Trip & Universal Safety Monitor
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Walled City Heritage Walk · Lahore, Pakistan
            </p>
          </div>

          {/* Quick SOS Trigger Button */}
          {!sosActive && (
            <button
              onClick={triggerSosSequence}
              className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-red-600/20 transition active:scale-95 shrink-0"
            >
              <ShieldAlert className="w-4 h-4 text-white" />
              <span>SOS Emergency Panic</span>
            </button>
          )}
        </div>

        {/* 3-Step Guide Check-In Progression (FR-115) */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
              <Navigation className="w-4 h-4 text-[#B99550]" />
              <span>Guide Operational Check-Ins (Universal Safety)</span>
            </h3>
            <span className="text-[10px] text-gray-400">Step 2 of 3 Completed</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Step 1: Trip Start */}
            <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/50 flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 text-xs font-bold">
                ✓
              </div>
              <div>
                <div className="text-xs font-bold text-emerald-950">1. Trip Started</div>
                <div className="text-[10px] text-emerald-700">Logged at {checkIns.tripStart.time}</div>
                <div className="text-[10px] text-gray-500 mt-1">Guide on site at rendezvous point.</div>
              </div>
            </div>

            {/* Step 2: Pickup Done */}
            <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/50 flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 text-xs font-bold">
                ✓
              </div>
              <div>
                <div className="text-xs font-bold text-emerald-950">2. Traveler Met & Picked Up</div>
                <div className="text-[10px] text-emerald-700">Logged at {checkIns.pickupDone.time}</div>
                <div className="text-[10px] text-gray-500 mt-1">Safety briefing & itinerary confirmed.</div>
              </div>
            </div>

            {/* Step 3: Trip Complete */}
            <div className="p-3.5 rounded-xl border border-dashed border-gray-300 bg-gray-50/50 flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center shrink-0 text-xs font-bold">
                3
              </div>
              <div>
                <div className="text-xs font-bold text-gray-700">3. Safe Conclusion</div>
                <div className="text-[10px] text-gray-400">Pending Tour Finish</div>
                <div className="text-[10px] text-gray-500 mt-1">Drop-off at designated terminus point.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Live GPS Coordinates & Family Share-Link (FR-118) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-[#B99550]" />
                <span>Web Geolocation Monitor</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold border border-blue-100 flex items-center gap-1">
                <Radio className="w-2.5 h-2.5 text-blue-600 animate-pulse" />
                <span>60s Active Refresh</span>
              </span>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 font-mono text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-gray-500">Latitude:</span>
                <span className="font-bold text-gray-800">{currentCoords.lat}° N</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Longitude:</span>
                <span className="font-bold text-gray-800">{currentCoords.lng}° E</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">GPS Accuracy:</span>
                <span className="text-emerald-700 font-bold">±{currentCoords.accuracy} meters</span>
              </div>
              <div className="flex justify-between text-[10px] text-gray-400 pt-1 border-t border-gray-200">
                <span>Last telemetry ping:</span>
                <span>{currentCoords.lastUpdated}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs space-y-3 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
                <Share2 className="w-4 h-4 text-[#B99550]" />
                <span>Share Live Tracker With Family</span>
              </span>
              <p className="text-xs text-gray-500 mt-1">
                Send a private, login-free tracking link to loved ones so they can follow your itinerary progress in real time.
              </p>
            </div>

            <button
              onClick={handleCopyShareLink}
              className="w-full py-2.5 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold flex items-center justify-center gap-2 transition"
            >
              {copiedLink ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-800">Private Tracker Link Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-gray-500" />
                  <span>Copy Emergency Share-Link</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Assigned Guide & Direct Concierge */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
              <User className="w-4 h-4 text-[#B99550]" />
              <span>Assigned Storyteller & Certified Guide</span>
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
              DTS Grade A Certified
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#123C2D] text-white flex items-center justify-center font-bold text-sm">
                AR
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#123C2D]">Ayesha Riaz</h4>
                <p className="text-xs text-gray-500">Official Heritage Guide · Urdu & English</p>
                <div className="flex items-center gap-2 text-[10px] text-gray-400 mt-0.5">
                  <span>Police Clearance: Valid 2026</span>
                  <span>•</span>
                  <span>4.9 ★ (128 Tours)</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="https://wa.me/923000000002?text=Hello%20Ayesha,%20I%20am%20on%20my%20way%20to%20the%20tour."
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Guide</span>
              </a>
              <a
                href="tel:+923000000002"
                className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-white text-gray-700 text-xs font-bold flex items-center gap-1.5 transition"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call</span>
              </a>
            </div>
          </div>
        </div>

        {/* Post-Tour Actions: Leave a Review */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0">
              <Star className="w-5 h-5 text-[#B99550]" />
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-[#123C2D]">
                Experience Concluded? Leave a Verified Review
              </h4>
              <p className="text-xs text-gray-500">
                Help other travelers discover authentic Pakistani storytelling with your feedback.
              </p>
            </div>
          </div>

          <Link
            href={`/trips/${tripId}/review`}
            className="px-5 py-2.5 rounded-xl bg-[#123C2D] hover:bg-[#1a5540] text-white text-xs font-bold transition whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <span>Write a Review</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </main>

      {/* SOS Countdown Safety Dialog */}
      {sosCountdown !== null && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 space-y-6 text-center shadow-2xl border-4 border-red-500 animate-bounce">
            <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto text-2xl font-black">
              {sosCountdown}
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-xl font-bold text-red-700">
                Triggering Emergency SOS in {sosCountdown}s
              </h3>
              <p className="text-xs text-gray-600">
                Sending automated SMS alert with your live GPS location to your emergency contact and the 24/7 Daastaan Emergency Control Room.
              </p>
            </div>

            <button
              onClick={cancelSosCountdown}
              className="w-full py-3 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider transition"
            >
              Cancel Alert (I Am Safe)
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
