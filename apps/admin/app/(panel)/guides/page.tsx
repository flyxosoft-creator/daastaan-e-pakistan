'use client';

import React, { useState } from 'react';
import { StatusBadge } from '@/components/ui/status-badge';
import {
  Search,
  UserPlus,
  ShieldCheck,
  Check,
  X,
  Eye,
  FileText,
  BadgeCheck,
  AlertTriangle,
  Lock,
} from 'lucide-react';

interface GuideData {
  id: string;
  name: string;
  gender: string;
  city: string;
  specialities: string[];
  languages: string[];
  rating: number;
  reviewCount: number;
  completedTours: number;
  status: string;
  policeStatus: string;
  cnicVerified: boolean;
  cnicMasked?: string;
}

const INITIAL_GUIDES: GuideData[] = [
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
    cnicMasked: '35202-*******-1',
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
    cnicMasked: '35201-*******-4',
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
    cnicMasked: '61101-*******-7',
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
    cnicMasked: '61101-*******-2',
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
    cnicMasked: '35202-*******-9',
  },
];

export default function GuidesManagementPage() {
  const [guides, setGuides] = useState<GuideData[]>(INITIAL_GUIDES);
  const [searchTerm, setSearchTerm] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [inspectingGuide, setInspectingGuide] = useState<GuideData | null>(null);

  const filtered = guides.filter((g) => {
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

  const handleUpdateStatus = (guideId: string, newStatus: string, newPoliceStatus: string) => {
    setGuides((prev) =>
      prev.map((g) =>
        g.id === guideId
          ? { ...g, status: newStatus, policeStatus: newPoliceStatus }
          : g,
      ),
    );
    if (inspectingGuide && inspectingGuide.id === guideId) {
      setInspectingGuide((prev) =>
        prev
          ? { ...prev, status: newStatus, policeStatus: newPoliceStatus }
          : null,
      );
    }
  };

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
                <th className="py-3.5 px-4 text-center">Inspect Verification</th>
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
                      onClick={() => setInspectingGuide(g)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#B99550]/40 bg-[#FAF6ED] text-[#123C2D] font-bold text-xs hover:bg-[#123C2D] hover:text-white transition shadow-xs"
                      title="Inspect Verification Documents"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-[#B99550]" />
                      <span>Inspect</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Guide Verification Modal */}
      {inspectingGuide && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-6 shadow-2xl border border-gray-200">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#B99550]" />
                <h3 className="font-serif text-lg font-bold text-[#123C2D]">
                  Guide Verification Dossier — {inspectingGuide.name}
                </h3>
              </div>
              <button
                onClick={() => setInspectingGuide(null)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-gray-700">
              <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3 rounded-xl border border-gray-200">
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">
                    Guide ID
                  </span>
                  <span className="font-mono font-bold text-gray-900">
                    {inspectingGuide.id}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">
                    Base Destination
                  </span>
                  <span className="font-semibold text-gray-900">
                    {inspectingGuide.city}, Pakistan
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">
                    Languages
                  </span>
                  <span className="font-medium text-gray-800">
                    {inspectingGuide.languages.join(', ')}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">
                    Completed Tours
                  </span>
                  <span className="font-bold text-[#123C2D]">
                    {inspectingGuide.completedTours} Verified Expeditions
                  </span>
                </div>
              </div>

              {/* Verified Documents Checklist */}
              <div className="space-y-2.5">
                <span className="font-bold text-gray-800 uppercase tracking-wider text-[10px] block">
                  Mandatory Legal Verification Files:
                </span>

                <div className="flex items-center justify-between p-3 rounded-xl border border-emerald-200 bg-emerald-50/50">
                  <div className="flex items-center gap-2.5">
                    <BadgeCheck className="w-4 h-4 text-emerald-600" />
                    <div>
                      <span className="font-bold text-gray-900 block">
                        Government CNIC (Encrypted)
                      </span>
                      <span className="text-[10px] text-gray-500 font-mono">
                        {inspectingGuide.cnicMasked || '35202-*******-1'} • AES-256 Storage
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700">VERIFIED</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl border border-emerald-200 bg-emerald-50/50">
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <div>
                      <span className="font-bold text-gray-900 block">
                        Police Character Clearance
                      </span>
                      <span className="text-[10px] text-gray-500">
                        Certificate #{inspectingGuide.id}-POL-2026 • Issued by Special Branch
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700">
                    {inspectingGuide.policeStatus}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl border border-gray-200 bg-gray-50">
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-[#B99550]" />
                    <div>
                      <span className="font-bold text-gray-900 block">
                        Department of Tourist Services (DTS) Card
                      </span>
                      <span className="text-[10px] text-gray-500">
                        License Grade A • Heritage Storyteller
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-gray-600">VALID</span>
                </div>
              </div>
            </div>

            {/* Workflow Action Buttons */}
            <div className="pt-2 border-t border-gray-200 flex flex-wrap items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setInspectingGuide(null)}
                className="px-4 py-2 border border-gray-300 text-gray-700 text-xs font-bold rounded-xl hover:bg-gray-100 transition"
              >
                Close
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    handleUpdateStatus(inspectingGuide.id, 'SUSPENDED', 'FLAGGED')
                  }
                  className="px-3.5 py-2 border border-rose-300 text-rose-700 text-xs font-bold rounded-xl hover:bg-rose-50 transition"
                >
                  Suspend Guide
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleUpdateStatus(inspectingGuide.id, 'ACTIVE', 'CLEARED')
                  }
                  className="px-4 py-2 bg-emerald-700 text-white text-xs font-bold rounded-xl hover:bg-emerald-800 transition shadow-sm"
                >
                  Approve & Activate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
