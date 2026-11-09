'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { StatusBadge } from '@/components/ui/status-badge';
import {
  Search,
  Plus,
  Compass,
  MapPin,
  Clock,
  Users,
  Edit3,
  ExternalLink,
  CheckCircle,
  Eye,
  Filter,
} from 'lucide-react';

interface AdminPackageItem {
  id: string;
  slug: string;
  title: string;
  city: string;
  tier: string;
  durationText: string;
  basePricePkr: number;
  maxParty: number;
  status: 'ACTIVE' | 'DRAFT' | 'SUSPENDED';
  bookingCount: number;
  rating: number;
}

const INITIAL_PACKAGES: AdminPackageItem[] = [
  {
    id: 'PKG-001',
    slug: 'lahore-walled-city-heritage-walk',
    title: 'Walled City Heritage Walk — 2,000 Years of Lahore',
    city: 'Lahore',
    tier: 'CULTURAL',
    durationText: '4 Hours',
    basePricePkr: 500000,
    maxParty: 8,
    status: 'ACTIVE',
    bookingCount: 142,
    rating: 4.9,
  },
  {
    id: 'PKG-002',
    slug: 'lahore-food-trail-gawalmandi',
    title: 'Gawalmandi Food Trail — A Taste of Living Heritage',
    city: 'Lahore',
    tier: 'FOOD',
    durationText: '3 Hours',
    basePricePkr: 450000,
    maxParty: 10,
    status: 'ACTIVE',
    bookingCount: 118,
    rating: 4.9,
  },
  {
    id: 'PKG-003',
    slug: 'hunza-silk-route-expedition',
    title: 'Hunza Valley Silk Route & Glacier Expedition',
    city: 'Northern Pakistan',
    tier: 'NATURE',
    durationText: '7 Days',
    basePricePkr: 2800000,
    maxParty: 8,
    status: 'ACTIVE',
    bookingCount: 86,
    rating: 5.0,
  },
  {
    id: 'PKG-004',
    slug: 'skardu-deosai-safari',
    title: 'Skardu & Deosai High-Altitude Wilderness Safari',
    city: 'Northern Pakistan',
    tier: 'NATURE',
    durationText: '8 Days',
    basePricePkr: 3200000,
    maxParty: 8,
    status: 'ACTIVE',
    bookingCount: 64,
    rating: 4.9,
  },
  {
    id: 'PKG-005',
    slug: 'islamabad-margalla-hills-sunrise-hike',
    title: 'Margalla Hills Sunrise Hike & Nature Trail',
    city: 'Islamabad',
    tier: 'NATURE',
    durationText: '4 Hours',
    basePricePkr: 350000,
    maxParty: 12,
    status: 'ACTIVE',
    bookingCount: 94,
    rating: 4.8,
  },
  {
    id: 'PKG-006',
    slug: 'karachi-colonial-heritage-mangrove',
    title: 'Colonial Heritage & Arabian Sea Mangrove Kayak',
    city: 'Karachi',
    tier: 'FOOD',
    durationText: '6 Hours',
    basePricePkr: 600000,
    maxParty: 8,
    status: 'DRAFT',
    bookingCount: 12,
    rating: 4.8,
  },
];

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<AdminPackageItem[]>(INITIAL_PACKAGES);
  const [searchTerm, setSearchTerm] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filtered = packages.filter((pkg) => {
    if (cityFilter && pkg.city !== cityFilter) return false;
    if (statusFilter && pkg.status !== statusFilter) return false;
    if (searchTerm) {
      const matchTitle = pkg.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchSlug = pkg.slug.toLowerCase().includes(searchTerm.toLowerCase());
      return matchTitle || matchSlug;
    }
    return true;
  });

  const toggleStatus = (id: string) => {
    setPackages((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, status: p.status === 'ACTIVE' ? 'DRAFT' : 'ACTIVE' }
          : p,
      ),
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#123C2D]">
            Experience Packages
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Create, edit, schedule, and publish curated cultural, culinary & mountain expeditions
          </p>
        </div>

        <Link
          href="/packages/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#123C2D] text-[#FAF6ED] text-xs font-bold rounded-xl hover:bg-[#1a5540] transition shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#B99550]" />
          <span>Create New Experience</span>
        </Link>
      </div>

      {/* Quick Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-gray-400 block">Total Experiences</span>
          <span className="text-xl font-bold font-serif text-[#123C2D]">{packages.length}</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-gray-400 block">Active & Published</span>
          <span className="text-xl font-bold font-serif text-emerald-700">
            {packages.filter((p) => p.status === 'ACTIVE').length}
          </span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-gray-400 block">Draft / Review</span>
          <span className="text-xl font-bold font-serif text-amber-600">
            {packages.filter((p) => p.status === 'DRAFT').length}
          </span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-gray-400 block">Total Bookings</span>
          <span className="text-xl font-bold font-serif text-[#B99550]">
            {packages.reduce((acc, p) => acc + p.bookingCount, 0)}
          </span>
        </div>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by package name or slug..."
            className="w-full pl-9 pr-4 py-2 text-xs border border-gray-200 rounded-xl bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#B99550] focus:bg-white transition"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="text-xs border border-gray-200 rounded-xl px-3 py-2 bg-gray-50 text-gray-700 focus:outline-none focus:border-[#B99550]"
          >
            <option value="">All Destinations</option>
            <option value="Lahore">Lahore</option>
            <option value="Northern Pakistan">Northern Pakistan</option>
            <option value="Islamabad">Islamabad</option>
            <option value="Karachi">Karachi</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs border border-gray-200 rounded-xl px-3 py-2 bg-gray-50 text-gray-700 focus:outline-none focus:border-[#B99550]"
          >
            <option value="">All Statuses</option>
            <option value="ACTIVE">Published (Active)</option>
            <option value="DRAFT">Draft</option>
          </select>
        </div>
      </div>

      {/* Packages Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-4">Experience Package</th>
                <th className="py-3.5 px-4">Destination</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Duration & Party</th>
                <th className="py-3.5 px-4">Base Price</th>
                <th className="py-3.5 px-4">Bookings</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {filtered.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-gray-50/70 transition">
                  <td className="py-3.5 px-4 max-w-xs">
                    <div className="font-semibold text-gray-900 line-clamp-1">{pkg.title}</div>
                    <div className="text-[10px] text-gray-400 font-mono truncate">{pkg.slug}</div>
                  </td>
                  <td className="py-3.5 px-4 font-medium">
                    📍 {pkg.city}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FAF6ED] text-[#123C2D] border border-[#B99550]/30">
                      {pkg.tier}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div>{pkg.durationText}</div>
                    <div className="text-[10px] text-gray-400">Max {pkg.maxParty} guests</div>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-gray-900">
                    ₨ {(pkg.basePricePkr / 100).toLocaleString('en-PK')}
                    <div className="text-[10px] text-gray-400 font-normal">
                      ≈ ${(pkg.basePricePkr / 100 / 280).toFixed(0)} USD
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-[#123C2D]">{pkg.bookingCount}</span>
                    <span className="text-gray-400 text-[10px]"> ({pkg.rating.toFixed(1)} ★)</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={pkg.status} />
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <Link
                        href={`/packages/${pkg.id}`}
                        className="p-1.5 rounded-lg text-gray-500 hover:text-[#123C2D] hover:bg-gray-100 transition"
                        title="Edit Package"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => toggleStatus(pkg.id)}
                        className={`px-2 py-1 rounded text-[10px] font-bold transition ${
                          pkg.status === 'ACTIVE'
                            ? 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                            : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                        }`}
                        title="Toggle Publish Status"
                      >
                        {pkg.status === 'ACTIVE' ? 'Unpublish' : 'Publish'}
                      </button>
                    </div>
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

