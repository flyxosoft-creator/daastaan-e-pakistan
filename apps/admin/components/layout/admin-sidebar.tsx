'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  CalendarCheck,
  Users,
  Compass,
  CreditCard,
  Star,
  ShieldAlert,
  FileText,
  Mail,
  Tag,
  Settings,
  LogOut,
  MapPin,
} from 'lucide-react';

const NAV_ITEMS = [
  { section: 'Overview', items: [{ label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard }] },
  {
    section: 'Operations',
    items: [
      { label: 'Bookings', href: '/bookings', icon: CalendarCheck },
      { label: 'Guides & Vetting', href: '/guides', icon: Users },
      { label: 'Packages & Tiers', href: '/packages', icon: Compass },
      { label: 'Payments & Payouts', href: '/payments', icon: CreditCard },
    ],
  },
  {
    section: 'Safety & Trust',
    items: [
      { label: 'Active Trips & SOS', href: '/safety', icon: ShieldAlert, badge: 'Live' },
      { label: 'Review Moderation', href: '/reviews', icon: Star },
    ],
  },
  {
    section: 'Content & Growth',
    items: [
      { label: 'Promo Codes', href: '/promo-codes', icon: Tag },
      { label: 'Newsletter', href: '/newsletter', icon: Mail },
      { label: 'Blog & Content', href: '/content/blog', icon: FileText },
    ],
  },
  {
    section: 'System',
    items: [
      { label: 'Settings & RBAC', href: '/settings', icon: Settings },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#123C2D] text-[#F7F3E9] flex flex-col h-screen border-r border-[#B99550]/20 shrink-0">
      {/* Brand Header */}
      <div className="p-5 border-b border-[#B99550]/20 flex items-center space-x-3">
        <img
          src="/images/final-official-logo.png"
          alt="Daastaan-e-Pakistan — Official Logo"
          className="h-10 w-auto object-contain drop-shadow-md"
        />
        <div className="flex flex-col">
          <span className="font-serif text-base font-bold tracking-tight text-[#F7F3E9] leading-tight">
            Daastaan
          </span>
          <span className="text-[10px] tracking-widest uppercase text-[#B99550] font-medium">
            Admin Console
          </span>
        </div>
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {NAV_ITEMS.map((group, gIdx) => (
          <div key={gIdx} className="space-y-1">
            <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#B99550]/70">
              {group.section}
            </span>

            {group.items.map((item, iIdx) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={iIdx}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#B99550] text-[#123C2D] shadow-md font-bold'
                      : 'text-gray-300 hover:text-[#F7F3E9] hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#123C2D]' : 'text-[#B99550]'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-600 text-white animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* Footer Profile / Logout */}
      <div className="p-4 border-t border-[#B99550]/20 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-full bg-[#B99550]/20 text-[#B99550] border border-[#B99550]/40 flex items-center justify-center font-bold text-xs">
            AF
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-[#F7F3E9] leading-tight">Ahmad Fawad</span>
            <span className="text-[10px] text-[#B99550]">Super Admin</span>
          </div>
        </div>

        <Link
          href="/login"
          className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition"
          title="Sign Out"
        >
          <LogOut className="w-4 h-4" />
        </Link>
      </div>
    </aside>
  );
}

