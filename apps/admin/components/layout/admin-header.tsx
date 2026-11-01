'use client';

import React from 'react';
import { Bell, ShieldAlert, Search, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export function AdminHeader() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between shrink-0">
      {/* Search Bar */}
      <div className="relative w-80">
        <input
          type="text"
          placeholder="Search bookings, guides, packages..."
          className="w-full pl-9 pr-4 py-2 text-xs border border-gray-200 rounded-xl bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#B99550] focus:bg-white transition"
        />
        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-4">
        {/* View Live Web Site */}
        <a
          href="http://localhost:3000"
          target="_blank"
          rel="noreferrer"
          className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-[#123C2D] hover:text-[#B99550] bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg transition"
        >
          <span>View Public Site</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>

        {/* SOS Alert Quick Link */}
        <Link
          href="/safety"
          className="flex items-center gap-1.5 text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-lg hover:bg-rose-100 transition"
        >
          <ShieldAlert className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
          <span>Active SOS (0)</span>
        </Link>

        {/* Notification Bell */}
        <button
          className="relative p-2 text-gray-500 hover:text-gray-700 rounded-xl hover:bg-gray-100 transition"
          aria-label="View notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="w-2 h-2 rounded-full bg-[#B99550] absolute top-1.5 right-1.5" />
        </button>
      </div>
    </header>
  );
}

