'use client';

import React from 'react';
import { StatCard } from '@/components/ui/stat-card';
import { StatusBadge } from '@/components/ui/status-badge';
import {
  CalendarCheck,
  CreditCard,
  Users,
  Compass,
  Star,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page Title & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#123C2D]">
            Operations Dashboard
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Real-time commercial metrics, active bookings & guide operations across Pakistan
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select className="text-xs border border-gray-200 rounded-xl px-3 py-2 bg-white text-gray-700 focus:outline-none focus:border-[#B99550]">
            <option>Last 30 Days (Oct–Nov)</option>
            <option>This Quarter</option>
            <option>Year to Date</option>
          </select>
          <button className="px-4 py-2 bg-[#123C2D] text-white text-xs font-bold rounded-xl hover:bg-[#1a5540] transition shadow-sm">
            Export Report
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Confirmed Bookings"
          value="142"
          change="+18.4%"
          trend="up"
          icon={CalendarCheck}
          subtext="18 bookings this week"
        />
        <StatCard
          title="Platform Revenue (PKR)"
          value="₨ 785,000"
          change="+24.1%"
          trend="up"
          icon={CreditCard}
          subtext="Avg ₨ 5,528 per booking"
        />
        <StatCard
          title="Active Verified Guides"
          value="16"
          change="+3"
          trend="up"
          icon={Users}
          subtext="10 in Lahore • 6 in Islamabad"
        />
        <StatCard
          title="Avg Guide Rating"
          value="4.88 ★"
          change="98% Positive"
          trend="up"
          icon={Star}
          subtext="Based on 112 verified reviews"
        />
      </div>

      {/* Two Column Layout: Recent Bookings & Tier Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Bookings Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h2 className="font-serif text-lg font-bold text-[#123C2D]">
              Recent Bookings
            </h2>
            <Link
              href="/bookings"
              className="text-xs font-bold text-[#123C2D] hover:text-[#B99550] flex items-center gap-1 transition"
            >
              <span>View All Bookings</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#B99550]" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-100 text-gray-500 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-2.5">ID</th>
                  <th className="py-2.5">Customer</th>
                  <th className="py-2.5">Experience</th>
                  <th className="py-2.5">Date</th>
                  <th className="py-2.5">Guide</th>
                  <th className="py-2.5">Status</th>
                  <th className="py-2.5 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-gray-700">
                {[
                  {
                    id: 'BK-1089',
                    customer: 'Sara Jenkins',
                    country: '🇬🇧 UK',
                    pkg: 'Walled City Heritage Walk',
                    date: '05 Nov 2026',
                    guide: 'Tariq Mehmood',
                    status: 'CONFIRMED',
                    total: '₨ 10,000',
                  },
                  {
                    id: 'BK-1088',
                    customer: 'Amina & Haris',
                    country: '🇵🇰 PK',
                    pkg: 'Gawalmandi Food Trail',
                    date: '04 Nov 2026',
                    guide: 'Ayesha Riaz',
                    status: 'IN_PROGRESS',
                    total: '₨ 7,000',
                  },
                  {
                    id: 'BK-1087',
                    customer: 'David Miller',
                    country: '🇺🇸 US',
                    pkg: 'Margalla Sunrise Hike',
                    date: '04 Nov 2026',
                    guide: 'Bilal Hussain',
                    status: 'COMPLETED',
                    total: '₨ 6,000',
                  },
                  {
                    id: 'BK-1086',
                    customer: 'Fatima Malik',
                    country: '🇦🇪 UAE',
                    pkg: 'Capital Cultural Tour',
                    date: '03 Nov 2026',
                    guide: 'Zara Ahmed',
                    status: 'COMPLETED',
                    total: '₨ 12,000',
                  },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50/80 transition">
                    <td className="py-3 font-mono font-bold text-[#123C2D]">
                      {row.id}
                    </td>
                    <td className="py-3">
                      <div className="font-semibold text-gray-900">{row.customer}</div>
                      <div className="text-[10px] text-gray-400">{row.country}</div>
                    </td>
                    <td className="py-3 text-gray-800">{row.pkg}</td>
                    <td className="py-3 text-gray-500">{row.date}</td>
                    <td className="py-3 text-[#123C2D] font-medium">{row.guide}</td>
                    <td className="py-3">
                      <StatusBadge status={row.status} />
                    </td>
                    <td className="py-3 text-right font-bold text-[#123C2D]">
                      {row.total}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tier Distribution & Operational Alerts */}
        <div className="space-y-6">
          {/* Tier Share Card */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
            <h2 className="font-serif text-lg font-bold text-[#123C2D]">
              Package Tier Mix
            </h2>

            <div className="space-y-3">
              {[
                { name: 'Cultural Heritage', pct: 45, color: 'bg-[#B99550]' },
                { name: 'Food Trail', pct: 28, color: 'bg-amber-500' },
                { name: 'Nature & Wilderness', pct: 18, color: 'bg-sky-500' },
                { name: 'Family Adventures', pct: 9, color: 'bg-emerald-500' },
              ].map((tier, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-gray-700">
                    <span>{tier.name}</span>
                    <span>{tier.pct}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${tier.color}`}
                      style={{ width: `${tier.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Ops Actions */}
          <div className="bg-[#123C2D] text-[#F7F3E9] rounded-2xl p-6 border border-[#B99550]/30 shadow-md space-y-3">
            <h3 className="font-serif text-base font-bold text-[#B99550]">
              Operational Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <Link
                href="/guides"
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-center font-medium transition"
              >
                + Add Guide
              </Link>
              <Link
                href="/packages"
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-center font-medium transition"
              >
                + New Tour
              </Link>
              <Link
                href="/promo-codes"
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-center font-medium transition"
              >
                + Create Promo
              </Link>
              <Link
                href="/safety"
                className="p-2.5 rounded-xl bg-[#B99550] text-[#123C2D] text-center font-bold transition hover:bg-[#c9a65f]"
              >
                Active Trips
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

