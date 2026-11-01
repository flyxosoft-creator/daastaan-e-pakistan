'use client';

import React, { useState } from 'react';
import { StatusBadge } from '@/components/ui/status-badge';
import { Search, Filter, Eye, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';

const MOCK_BOOKINGS = [
  {
    id: 'BK-1089',
    customer: 'Sara Jenkins',
    email: 'sara.jenkins@gmail.com',
    packageTitle: 'Walled City Heritage Walk',
    city: 'Lahore',
    date: '2026-11-05',
    partySize: 2,
    guide: 'Tariq Mehmood',
    status: 'CONFIRMED',
    totalPkr: 10000,
    gateway: 'STRIPE (USD)',
    safetyActive: true,
  },
  {
    id: 'BK-1088',
    customer: 'Amina & Haris',
    email: 'amina.h@outlook.com',
    packageTitle: 'Gawalmandi Food Trail',
    city: 'Lahore',
    date: '2026-11-04',
    partySize: 2,
    guide: 'Ayesha Riaz',
    status: 'IN_PROGRESS',
    totalPkr: 7000,
    gateway: 'SAFEPAY (PKR)',
    safetyActive: true,
  },
  {
    id: 'BK-1087',
    customer: 'David Miller',
    email: 'david.m@yahoo.com',
    packageTitle: 'Margalla Sunrise Hike',
    city: 'Islamabad',
    date: '2026-11-04',
    partySize: 2,
    guide: 'Bilal Hussain',
    status: 'COMPLETED',
    totalPkr: 6000,
    gateway: 'STRIPE (GBP)',
    safetyActive: false,
  },
  {
    id: 'BK-1086',
    customer: 'Fatima Malik',
    email: 'fatima.m@company.ae',
    packageTitle: 'Capital City Cultural Tour',
    city: 'Islamabad',
    date: '2026-11-03',
    partySize: 2,
    guide: 'Zara Ahmed',
    status: 'COMPLETED',
    totalPkr: 12000,
    gateway: 'STRIPE (USD)',
    safetyActive: true,
  },
  {
    id: 'BK-1085',
    customer: 'Usman Qureshi',
    email: 'usman.q@gmail.com',
    packageTitle: 'Walled City Heritage Walk',
    city: 'Lahore',
    date: '2026-11-02',
    partySize: 4,
    guide: 'Tariq Mehmood',
    status: 'CANCELLED',
    totalPkr: 20000,
    gateway: 'SAFEPAY (JazzCash)',
    safetyActive: false,
  },
];

export default function BookingsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filtered = MOCK_BOOKINGS.filter((b) => {
    if (statusFilter && b.status !== statusFilter) return false;
    if (searchTerm) {
      const matchName = b.customer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchId = b.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchPkg = b.packageTitle.toLowerCase().includes(searchTerm.toLowerCase());
      return matchName || matchId || matchPkg;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#123C2D]">
            Bookings Management
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Review customer reservations, guide assignments, payment states & cancellations
          </p>
        </div>

        <button className="px-4 py-2 bg-[#123C2D] text-white text-xs font-bold rounded-xl hover:bg-[#1a5540] transition shadow-sm">
          Download CSV
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by customer, booking ID, tour..."
            className="w-full pl-9 pr-4 py-2 text-xs border border-gray-200 rounded-xl bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#B99550] focus:bg-white transition"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs border border-gray-200 rounded-xl px-3 py-2 bg-gray-50 text-gray-700 focus:outline-none focus:border-[#B99550] w-full sm:w-auto"
          >
            <option value="">All Statuses</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-4">Booking ID</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Experience</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Assigned Guide</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Gateway</th>
                <th className="py-3.5 px-4 text-right">Total (PKR)</th>
                <th className="py-3.5 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {filtered.map((b) => (
                <tr key={b.id} className="hover:bg-gray-50/70 transition">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#123C2D]">
                    {b.id}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-gray-900">{b.customer}</div>
                    <div className="text-[10px] text-gray-400">{b.email}</div>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-gray-800">
                    <div>{b.packageTitle}</div>
                    <div className="text-[10px] text-gray-400">
                      📍 {b.city} • {b.partySize} {b.partySize === 1 ? 'person' : 'people'}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-gray-500">{b.date}</td>
                  <td className="py-3.5 px-4 text-[#123C2D] font-medium">{b.guide}</td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={b.status} />
                  </td>
                  <td className="py-3.5 px-4 text-[11px] font-mono text-gray-600">
                    {b.gateway}
                  </td>
                  <td className="py-3.5 px-4 text-right font-bold text-[#123C2D]">
                    ₨ {b.totalPkr.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      className="p-1.5 rounded-lg text-gray-500 hover:text-[#123C2D] hover:bg-gray-100 transition"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

