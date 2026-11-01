'use client';

import React, { useState } from 'react';
import { StatusBadge } from '@/components/ui/status-badge';
import {
  ShieldAlert,
  ShieldCheck,
  MapPin,
  Clock,
  PhoneCall,
  User,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';

const ACTIVE_TRIPS = [
  {
    bookingId: 'BK-1088',
    customerName: 'Amina & Haris',
    customerPhone: '+92 321 4455667',
    emergencyContact: {
      name: 'Farhan Tariq (Brother)',
      phone: '+92 300 8899001',
    },
    packageTitle: 'Gawalmandi Food Trail',
    city: 'Lahore',
    guideName: 'Ayesha Riaz',
    guidePhone: '+92 300 0000002',
    startTime: '07:00 PM',
    duration: '3 Hours',
    checkIns: {
      tripStart: { done: true, time: '07:02 PM' },
      pickupDone: { done: true, time: '07:15 PM' },
      tripComplete: { done: false, time: null },
    },
    lastKnownLocation: 'Near Fort Road Food Street, Lahore (31.5892° N, 74.3160° E)',
    lastLocationUpdate: '2 mins ago',
    sosActive: false,
  },
];

export default function SafetyBoardPage() {
  const [sosAlerts, setSosAlerts] = useState<any[]>([]);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#123C2D]">
            Live Safety & Active Trips Board
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Real-time monitoring of in-progress tours, Web GPS coordinates, guide check-ins & emergency SOS
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            Live Polling Active (Every 30s)
          </span>
          <button className="p-2 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 text-gray-600 transition">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* SOS Alert Section (If Active) */}
      {sosAlerts.length > 0 ? (
        <div className="bg-rose-50 border-2 border-rose-500 rounded-2xl p-6 shadow-xl space-y-4 animate-bounce">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-rose-600" />
            <h2 className="text-lg font-bold text-rose-900 font-serif">
              EMERGENCY SOS ALERT TRIGGERED
            </h2>
          </div>
          {/* Detailed alerts */}
        </div>
      ) : (
        <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-xs text-emerald-900 font-semibold">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>All active trips are operating smoothly. No emergency alerts flagged.</span>
          </div>
          <span className="text-[11px] text-emerald-700">0 Open SOS</span>
        </div>
      )}

      {/* In-Progress Trips Board */}
      <div className="space-y-4">
        <h2 className="font-serif text-lg font-bold text-[#123C2D]">
          Active In-Progress Tours ({ACTIVE_TRIPS.length})
        </h2>

        <div className="grid grid-cols-1 gap-6">
          {ACTIVE_TRIPS.map((trip) => (
            <div
              key={trip.bookingId}
              className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-6"
            >
              {/* Trip Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#123C2D] text-[#B99550] flex items-center justify-center font-bold text-sm">
                    {trip.bookingId}
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-bold text-[#123C2D]">
                      {trip.packageTitle}
                    </h3>
                    <div className="text-xs text-gray-500">
                      📍 {trip.city} • Started at {trip.startTime} ({trip.duration})
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-sky-50 text-sky-800 border border-sky-200 text-xs font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                    Trip In Progress
                  </span>
                </div>
              </div>

              {/* 3-Point Guide Check-In Progress */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                  Mandatory 3-Point Guide Check-Ins
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Step 1 */}
                  <div
                    className={`p-3 rounded-xl border flex items-center gap-2.5 text-xs ${
                      trip.checkIns.tripStart.done
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-900 font-semibold'
                        : 'bg-gray-50 border-gray-200 text-gray-400'
                    }`}
                  >
                    <CheckCircle
                      className={`w-4 h-4 ${
                        trip.checkIns.tripStart.done ? 'text-emerald-600' : 'text-gray-300'
                      }`}
                    />
                    <div>
                      <div>1. Trip Start</div>
                      <div className="text-[10px] text-gray-500">
                        {trip.checkIns.tripStart.time || 'Pending'}
                      </div>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div
                    className={`p-3 rounded-xl border flex items-center gap-2.5 text-xs ${
                      trip.checkIns.pickupDone.done
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-900 font-semibold'
                        : 'bg-gray-50 border-gray-200 text-gray-400'
                    }`}
                  >
                    <CheckCircle
                      className={`w-4 h-4 ${
                        trip.checkIns.pickupDone.done ? 'text-emerald-600' : 'text-gray-300'
                      }`}
                    />
                    <div>
                      <div>2. Pickup Done</div>
                      <div className="text-[10px] text-gray-500">
                        {trip.checkIns.pickupDone.time || 'Pending'}
                      </div>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div
                    className={`p-3 rounded-xl border flex items-center gap-2.5 text-xs ${
                      trip.checkIns.tripComplete.done
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-900 font-semibold'
                        : 'bg-gray-50 border-gray-200 text-gray-400'
                    }`}
                  >
                    <CheckCircle
                      className={`w-4 h-4 ${
                        trip.checkIns.tripComplete.done ? 'text-emerald-600' : 'text-gray-300'
                      }`}
                    />
                    <div>
                      <div>3. Trip Complete</div>
                      <div className="text-[10px] text-gray-500">
                        {trip.checkIns.tripComplete.time || 'Awaiting drop-off'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location & Contacts Information */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 text-xs">
                {/* Location */}
                <div className="space-y-1 bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <div className="font-bold text-gray-700 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#B99550]" />
                    <span>Last Known Geolocation</span>
                  </div>
                  <p className="text-gray-600 text-[11px] leading-relaxed">
                    {trip.lastKnownLocation}
                  </p>
                  <span className="text-[10px] text-gray-400">
                    Updated {trip.lastLocationUpdate}
                  </span>
                </div>

                {/* Assigned Guide */}
                <div className="space-y-1 bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <div className="font-bold text-gray-700 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#B99550]" />
                    <span>Assigned Guide</span>
                  </div>
                  <div className="font-semibold text-gray-900">{trip.guideName}</div>
                  <div className="text-[11px] text-gray-600">{trip.guidePhone}</div>
                  <div className="text-[10px] text-emerald-700 font-semibold">
                    ✓ Verified & Checked-In
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="space-y-1 bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <div className="font-bold text-gray-700 flex items-center gap-1.5">
                    <PhoneCall className="w-3.5 h-3.5 text-rose-500" />
                    <span>Emergency Contact</span>
                  </div>
                  <div className="font-semibold text-gray-900">
                    {trip.emergencyContact.name}
                  </div>
                  <div className="text-[11px] text-gray-600">
                    {trip.emergencyContact.phone}
                  </div>
                  <div className="text-[10px] text-gray-400">
                    Live Web link delivered via SMS
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

