'use client';

import React, { useState } from 'react';
import { StatusBadge } from '@/components/ui/status-badge';
import { Search, UserPlus, ShieldCheck, Check, X, Eye } from 'lucide-react';

const MOCK_GUIDES = [
  {
    id: 'G-101',
    name: 'Tariq Mehmood',
    gender: 'MALE',
    city: 'Lahore',
    specialities: ['Walled City', 'Mughal Architecture', 'Street Food'],
    languages: ['Urdu', 'English', 'Punjabi'],
    rating: 4.9,
    reviewCount: 47,
    completedTours: 68,
    status: 'ACTIVE',
    policeStatus: 'CLEARED',
    cnicVerified: true,
  },
  {
    id: 'G-102',
    name: 'Ayesha Riaz',
    gender: 'FEMALE',
    city: 'Lahore',
    specialities: ['Women\'s Heritage', 'Crafts & Bazaars', 'Food Trail'],
    languages: ['Urdu', 'English'],
    rating: 4.9,
    reviewCount: 38,
    completedTours: 42,
    status: 'ACTIVE',
    policeStatus: 'CLEARED',
    cnicVerified: true,
  },
  {
    id: 'G-103',
    name: 'Bilal Hussain',
    gender: 'MALE',
    city: 'Islamabad',
    specialities: ['Margalla Hiking', 'Flora & Fauna', 'Trail 3 & 5'],
    languages: ['Urdu', 'English'],
    rating: 4.8,
    reviewCount: 29,
    completedTours: 35,
    status: 'ACTIVE',
    policeStatus: 'CLEARED',
    cnicVerified: true,
  },
  {
    id: 'G-104',
    name: 'Zara Ahmed',
    gender: 'FEMALE',
    city: 'Islamabad',
    specialities: ['Faisal Mosque Architecture', 'Lok Virsa Folk Art'],
    languages: ['Urdu', 'English', 'French'],
    rating: 4.7,
    reviewCount: 22,
    completedTours: 26,
    status: 'ACTIVE',
    policeStatus: 'CLEARED',
    cnicVerified: true,
  },
  {
    id: 'G-105',
    name: 'Hamza Farooq',
    gender: 'MALE',
    city: 'Lahore',
    specialities: ['Photography Tours', 'Colonial Lahore'],
    languages: ['Urdu', 'English'],
    rating: 0,
    reviewCount: 0,
    completedTours: 0,
    status: 'PENDING',
    policeStatus: 'PENDING',
    cnicVerified: true,
  },
];

export default function GuidesManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cityFilter, setCityFilter] = useState('');

  const filtered = MOCK_GUIDES.filter((g) => {
    if (cityFilter && g.city !== cityFilter) return false;
    if (searchTerm) {
      const matchName = g.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchSpec = g.specialities.some((s) =>
        s.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      return matchName || matchSpec;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#123C2D]">
            Guide Roster & Verification
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage local guide profiles, police clearance records, CNIC encryption status & availability
          </p>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 bg-[#123C2D] text-white text-xs font-bold rounded-xl hover:bg-[#1a5540] transition shadow-sm">
          <UserPlus className="w-4 h-4 text-[#B99550]" />
          <span>Add New Guide</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search guide by name or speciality..."
            className="w-full pl-9 pr-4 py-2 text-xs border border-gray-200 rounded-xl bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#B99550] focus:bg-white transition"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
        </div>

        <select
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          className="text-xs border border-gray-200 rounded-xl px-3 py-2 bg-gray-50 text-gray-700 focus:outline-none focus:border-[#B99550]"
        >
          <option value="">All Cities</option>
          <option value="Lahore">Lahore</option>
          <option value="Islamabad">Islamabad</option>
        </select>
      </div>

      {/* Guides Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-4">Guide</th>
                <th className="py-3.5 px-4">City & Gender</th>
                <th className="py-3.5 px-4">Specialities</th>
                <th className="py-3.5 px-4">Rating</th>
                <th className="py-3.5 px-4">Completed</th>
                <th className="py-3.5 px-4">Police Status</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {filtered.map((g) => (
                <tr key={g.id} className="hover:bg-gray-50/70 transition">
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-gray-900">{g.name}</div>
                    <div className="text-[10px] text-gray-400 font-mono">{g.id}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div>📍 {g.city}</div>
                    <div className="text-[10px] text-gray-400">{g.gender}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {g.specialities.map((s, idx) => (
                        <span
                          key={idx}
                          className="px-1.5 py-0.5 rounded bg-gray-100 text-[10px] text-gray-600"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    {g.rating > 0 ? (
                      <span className="font-bold text-[#123C2D]">
                        {g.rating.toFixed(1)} ★ ({g.reviewCount})
                      </span>
                    ) : (
                      <span className="text-gray-400">New Guide</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-gray-800">
                    {g.completedTours} tours
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={g.policeStatus} />
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={g.status} />
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      className="p-1.5 rounded-lg text-gray-500 hover:text-[#123C2D] hover:bg-gray-100 transition"
                      title="Manage Profile"
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

