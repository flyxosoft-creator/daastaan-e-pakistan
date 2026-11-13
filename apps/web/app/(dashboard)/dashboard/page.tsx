'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { TierBadge } from '@/components/ui/tier-badge';
import { StarRating } from '@/components/ui/star-rating';
import { formatPrice } from '@/lib/currency';
import { useAuth, Reservation } from '@/lib/auth-context';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ShieldCheck,
  ShieldAlert,
  Sparkles,
  Download,
  Share2,
  Copy,
  Check,
  CheckCircle2,
  FileText,
  MessageCircle,
  PhoneCall,
  User,
  Settings,
  Lock,
  ArrowRight,
  ExternalLink,
  Printer,
  X,
  Compass,
} from 'lucide-react';
import { toast } from 'sonner';

function DashboardContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams?.get('tab') || 'upcoming';
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'safety' | 'profile'>(
    initialTab as any || 'upcoming',
  );

  const {
    user,
    isAuthenticated,
    reservations,
    updateProfile,
    updateEmergencyContact,
  } = useAuth();

  // Receipt Modal State
  const [selectedReceipt, setSelectedReceipt] = useState<Reservation | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);
  const [copiedReferral, setCopiedReferral] = useState(false);

  // Profile Form State
  const [name, setName] = useState(user?.name || 'Dr. Zoya Khan');
  const [phone, setPhone] = useState(user?.phone || '+44 7700 900142');
  const [country, setCountry] = useState(user?.country || 'United Kingdom');
  const [dietary, setDietary] = useState<string[]>(user?.dietaryPreferences || ['Halal Only', 'No Peanuts']);
  const [mobility, setMobility] = useState(user?.mobilityNotes || 'Comfortable with walking tours up to 5km');

  // Emergency Contact Form State
  const [emergencyName, setEmergencyName] = useState(user?.emergencyContact?.name || 'Farhan Khan');
  const [emergencyRelation, setEmergencyRelation] = useState(user?.emergencyContact?.relationship || 'Brother');
  const [emergencyPhone, setEmergencyPhone] = useState(user?.emergencyContact?.phone || '+44 7700 900889');
  const [emergencyWhatsapp, setEmergencyWhatsapp] = useState(user?.emergencyContact?.whatsapp || '+44 7700 900889');

  const upcomingReservations = reservations.filter(
    (r) => r.status === 'CONFIRMED' || r.status === 'PENDING',
  );
  const pastReservations = reservations.filter((r) => r.status === 'COMPLETED');

  const handleCopyReferral = () => {
    if (user?.referralCode) {
      navigator.clipboard.writeText(user.referralCode);
      setCopiedReferral(true);
      toast.success('Referral code copied to clipboard!');
      setTimeout(() => setCopiedReferral(false), 2000);
    }
  };

  const handleDownloadCalendar = (res: Reservation) => {
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Daastaan-e-Pakistan//Tour Booking//EN
BEGIN:VEVENT
SUMMARY:${res.packageTitle} with Daastaan-e-Pakistan
DESCRIPTION:Booking Reference: ${res.bookingReference}\\nMeeting Spot: ${res.meetingPoint}\\nGuide: ${res.guide.name} (${res.guide.phone})
LOCATION:${res.meetingPoint}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Daastaan-Tour-${res.bookingReference}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Calendar pass (.ics) downloaded');
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      phone,
      country,
      dietaryPreferences: dietary,
      mobilityNotes: mobility,
    });
    toast.success('Profile and preferences updated successfully');
  };

  const handleSaveEmergency = (e: React.FormEvent) => {
    e.preventDefault();
    updateEmergencyContact({
      name: emergencyName,
      relationship: emergencyRelation,
      phone: emergencyPhone,
      whatsapp: emergencyWhatsapp,
    });
    toast.success('Emergency contact updated and encrypted in database');
  };

  const toggleDietary = (item: string) => {
    if (dietary.includes(item)) {
      setDietary(dietary.filter((d) => d !== item));
    } else {
      setDietary([...dietary, item]);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6ED] bg-tech-grid flex flex-col font-sans">
      <Header />

      {/* ── Top Member Identity Hero Banner (Edge-to-Edge) ── */}
      <section className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 pt-8 pb-10 bg-gradient-to-b from-[#0A2418] to-[#123C2D] text-white border-b border-[#B99550]/30 shadow-lg relative overflow-hidden">
        <div className="ambient-glow absolute inset-0 pointer-events-none opacity-25" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Left: Avatar + Details */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="relative">
              <img
                src={
                  user?.avatarUrl ||
                  `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user?.name || 'Guest')}&backgroundColor=123c2d&textColor=b99550`
                }
                alt={user?.name || 'Member'}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-[#B99550] shadow-xl"
              />
              <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center border-2 border-[#0A2418] shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5" />
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  {user ? user.name : 'Welcome, Traveller'}
                </h1>
                <span className="text-[11px] font-bold uppercase tracking-wider bg-[#B99550]/20 text-[#FDE68A] border border-[#B99550]/40 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Verified Member
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-300">
                {user ? user.email : 'Sign in to access your saved trips and emergency safety tracking'}
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-gray-400">
                <span>📍 {user?.country || 'International Guest'}</span>
                <span>•</span>
                <span>📱 {user?.phone || 'Phone verified'}</span>
              </div>
            </div>
          </div>

          {/* Right: Referral & Wallet Card */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 bg-white/10 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-white/15">
            <div className="space-y-1 pr-4 border-r border-white/15">
              <p className="text-[10px] uppercase font-bold tracking-wider text-[#E5C585]">
                Wallet Credit
              </p>
              <p className="font-serif text-xl sm:text-2xl font-bold text-white">
                PKR {(user?.walletCreditPkr || 5000).toLocaleString()}
              </p>
              <p className="text-[10px] text-gray-300">Usable on any tour booking</p>
            </div>

            <div className="space-y-1 pl-2">
              <p className="text-[10px] uppercase font-bold tracking-wider text-[#E5C585]">
                Your Referral Code
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold bg-black/40 px-2.5 py-1 rounded-lg border border-white/20 text-[#FDE68A]">
                  {user?.referralCode || 'DAASTAAN-PK26'}
                </span>
                <button
                  type="button"
                  onClick={handleCopyReferral}
                  className="p-1.5 rounded-lg bg-[#B99550] hover:bg-[#D4AF6E] text-[#0A2418] transition cursor-pointer"
                  title="Copy referral code"
                >
                  {copiedReferral ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <p className="text-[10px] text-gray-300">Give PKR 2,500, Get PKR 2,500</p>
            </div>
          </div>
        </div>

        {/* ── Subnav Tabs ── */}
        <div className="mt-8 flex items-center gap-2 border-b border-white/15 overflow-x-auto pb-px">
          {[
            { id: 'upcoming', label: 'Upcoming Reservations', count: upcomingReservations.length, icon: Calendar },
            { id: 'past', label: 'Past Journeys & Invoices', count: pastReservations.length, icon: Sparkles },
            { id: 'safety', label: 'Safety & Emergency SOS', count: null, icon: ShieldCheck },
            { id: 'profile', label: 'Profile & Preferences', count: null, icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold tracking-wide transition-all border-b-2 whitespace-nowrap cursor-pointer ${
                  active
                    ? 'border-[#B99550] text-[#FDE68A] bg-white/5 rounded-t-xl'
                    : 'border-transparent text-gray-300 hover:text-white hover:bg-white/5 rounded-t-xl'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-[#B99550]' : 'text-gray-400'}`} />
                <span>{tab.label}</span>
                {tab.count !== null && (
                  <span
                    className={`ml-1 text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                      active ? 'bg-[#B99550] text-[#0A2418]' : 'bg-white/15 text-white'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* ── Main Tab Content ── */}
      <main className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-10 flex-1">
        {/* 1. UPCOMING RESERVATIONS TAB */}
        {activeTab === 'upcoming' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8DFD0]">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#123C2D]">
                  Active &amp; Upcoming Experiences
                </h2>
                <p className="text-xs text-gray-600">
                  Confirmed reservations with guide assignments, meeting points &amp; live GPS safety tracking
                </p>
              </div>
              <Link
                href="/explore"
                className="btn-premium text-xs"
              >
                <span>Book Another Tour</span>
                <span className="text-[#D4AF6E]">↗</span>
              </Link>
            </div>

            {upcomingReservations.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {upcomingReservations.map((res) => (
                  <div
                    key={res.id}
                    className="bg-white rounded-2xl overflow-hidden border border-[#E8DFD0] hover:border-[#B99550]/60 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                  >
                    {/* Card Top: Image + Badges */}
                    <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-gray-900">
                      <img
                        src={res.image}
                        alt={res.packageTitle}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

                      <div className="absolute top-3 left-3">
                        <TierBadge tier={res.tier} />
                      </div>

                      <div className="absolute top-3 right-3 bg-emerald-950/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-emerald-300 border border-emerald-400/40 flex items-center gap-1.5 shadow-sm">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Confirmed</span>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-semibold">
                        <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg">
                          <Calendar className="w-3.5 h-3.5 text-[#E5C585]" />
                          <span>{res.startDate} &rarr; {res.endDate}</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg">
                          <Users className="w-3.5 h-3.5 text-[#E5C585]" />
                          <span>{res.partySize} Guests</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 space-y-4 flex-1">
                      <div>
                        <div className="flex items-center justify-between text-xs text-gray-500 font-mono mb-1">
                          <span>Ref: {res.bookingReference}</span>
                          <span className="font-bold text-[#123C2D] font-serif text-sm">
                            {formatPrice(res.totalPricePkr, res.currency)}
                          </span>
                        </div>
                        <Link
                          href={`/package/${res.packageSlug}`}
                          className="font-serif text-lg font-bold text-[#123C2D] hover:text-[#B99550] transition line-clamp-2"
                        >
                          {res.packageTitle}
                        </Link>
                      </div>

                      {/* Meeting Point Box */}
                      <div className="p-3 bg-[#FAF6ED] rounded-xl border border-[#B99550]/20 space-y-1">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#123C2D]">
                          <MapPin className="w-3.5 h-3.5 text-[#B99550] shrink-0" />
                          <span>Meeting Point</span>
                        </div>
                        <p className="text-xs text-gray-700 leading-relaxed pl-5">
                          {res.meetingPoint}
                        </p>
                      </div>

                      {/* Guide Profile Preview */}
                      <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-200/80">
                        <div className="flex items-center gap-3">
                          <img
                            src={res.guide.avatarUrl}
                            alt={res.guide.name}
                            className="w-10 h-10 rounded-full object-cover border border-[#B99550]"
                          />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <p className="text-xs font-bold text-[#123C2D]">{res.guide.name}</p>
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                            </div>
                            <p className="text-[11px] text-gray-500">
                              Verified Guide &middot; {res.guide.languages.join(', ')}
                            </p>
                          </div>
                        </div>

                        <a
                          href={`https://wa.me/${res.guide.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(res.guide.name)},%20I%20am%20travelling%20on%20booking%20${res.bookingReference}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-xs"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </div>

                    {/* Card Actions Footer */}
                    <div className="px-6 py-4 bg-[#FAF6ED]/70 border-t border-[#E8DFD0] flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleDownloadCalendar(res)}
                          className="p-2 rounded-xl bg-white border border-gray-200 text-gray-700 hover:border-[#B99550] text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
                          title="Add to Google / Apple Calendar"
                        >
                          <Calendar className="w-3.5 h-3.5 text-[#B99550]" />
                          <span>.ICS Calendar</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => window.print()}
                          className="p-2 rounded-xl bg-white border border-gray-200 text-gray-700 hover:border-[#B99550] text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
                          title="Print tour voucher"
                        >
                          <Printer className="w-3.5 h-3.5 text-gray-600" />
                          <span>Print Voucher</span>
                        </button>
                      </div>

                      {/* Live Safety Tracker Link */}
                      <Link
                        href={`/track/${res.safetyTrackingToken || 'token_sample'}`}
                        className="px-4 py-2 rounded-xl bg-[#123C2D] hover:bg-[#1a5540] text-white text-xs font-bold flex items-center gap-1.5 transition shadow-sm"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Live GPS Safety Tracker</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center bg-white rounded-2xl border border-[#E8DFD0] space-y-4">
                <Compass className="w-12 h-12 text-[#B99550] mx-auto opacity-70" />
                <h3 className="font-serif text-xl font-bold text-[#123C2D]">
                  No upcoming journeys found
                </h3>
                <p className="text-xs text-gray-600 max-w-md mx-auto">
                  Ready to discover Pakistan's 2,000 years of living history? Browse our 35 curated Lahore sightseeing packages.
                </p>
                <Link
                  href="/explore?city=lahore"
                  className="btn-premium inline-flex text-xs"
                >
                  <span>Explore Lahore Collection</span>
                  <span className="text-[#D4AF6E]">&rarr;</span>
                </Link>
              </div>
            )}
          </div>
        )}

        {/* 2. PAST JOURNEYS & INVOICES TAB */}
        {activeTab === 'past' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8DFD0]">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#123C2D]">
                  Past Experiences &amp; Travel Receipts
                </h2>
                <p className="text-xs text-gray-600">
                  Review your completed adventures, download official tax receipts, and rate your verified storytellers
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {pastReservations.map((res) => (
                <div
                  key={res.id}
                  className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E8DFD0] shadow-sm hover:shadow-md transition flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                >
                  <div className="flex items-center gap-4 sm:gap-5">
                    <img
                      src={res.image}
                      alt={res.packageTitle}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover shrink-0 border border-gray-200"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <TierBadge tier={res.tier} />
                        <span className="text-[11px] font-semibold text-gray-500 font-mono">
                          Ref: {res.bookingReference}
                        </span>
                      </div>
                      <h3 className="font-serif text-lg font-bold text-[#123C2D]">
                        {res.packageTitle}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600">
                        <span>Completed on: {res.startDate}</span>
                        <span>•</span>
                        <span>Party: {res.partySize} guests</span>
                        <span>•</span>
                        <span>Guide: {res.guide.name}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Right */}
                  <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end">
                    {/* Tax Receipt Button */}
                    <button
                      type="button"
                      onClick={() => setSelectedReceipt(res)}
                      className="px-3.5 py-2 rounded-xl bg-white border border-gray-300 hover:border-[#B99550] text-gray-700 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
                    >
                      <FileText className="w-3.5 h-3.5 text-[#B99550]" />
                      <span>Tax Invoice</span>
                    </button>

                    {/* Review Guide CTA */}
                    {res.hasReviewed ? (
                      <span className="px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Reviewed (5★)</span>
                      </span>
                    ) : (
                      <Link
                        href={`/trips/${res.id}/review`}
                        className="px-4 py-2 rounded-xl bg-[#B99550] hover:bg-[#D4AF6E] text-[#0A2418] text-xs font-bold flex items-center gap-1.5 transition shadow-xs"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#0A2418]" />
                        <span>Rate &amp; Review</span>
                      </Link>
                    )}

                    <Link
                      href={`/package/${res.packageSlug}`}
                      className="px-3.5 py-2 rounded-xl bg-[#123C2D] hover:bg-[#1a5540] text-white text-xs font-bold transition shadow-xs"
                    >
                      Book Again
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. SAFETY & EMERGENCY SOS TAB */}
        {activeTab === 'safety' && (
          <div className="max-w-3xl space-y-6">
            <div className="pb-3 border-b border-[#E8DFD0]">
              <h2 className="font-serif text-2xl font-bold text-[#123C2D]">
                Universal Safety &amp; Emergency SOS Setup
              </h2>
              <p className="text-xs text-gray-600">
                Your designated next-of-kin contact is encrypted at rest and will be dispatched immediately in case of an on-tour SOS emergency.
              </p>
            </div>

            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200/80 flex items-start gap-3.5">
              <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div className="text-xs text-emerald-900 space-y-1">
                <p className="font-bold">AES-256 Military Grade Encryption Active</p>
                <p className="text-emerald-800 leading-relaxed">
                  Your safety details are encrypted and only accessible by Daastaan-e-Pakistan’s 24/7 Operations Centre when a tour’s panic SOS sequence is initiated.
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveEmergency} className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8DFD0] shadow-sm space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                    Next-of-Kin Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={emergencyName}
                    onChange={(e) => setEmergencyName(e.target.value)}
                    placeholder="e.g. Farhan Khan"
                    className="mt-1 w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl focus:outline-none focus:border-[#B99550] bg-gray-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                    Relationship
                  </label>
                  <input
                    type="text"
                    required
                    value={emergencyRelation}
                    onChange={(e) => setEmergencyRelation(e.target.value)}
                    placeholder="e.g. Spouse, Brother, Mother"
                    className="mt-1 w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl focus:outline-none focus:border-[#B99550] bg-gray-50/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                    Emergency Phone (With Country Code)
                  </label>
                  <input
                    type="tel"
                    required
                    value={emergencyPhone}
                    onChange={(e) => setEmergencyPhone(e.target.value)}
                    placeholder="+44 7700 900889"
                    className="mt-1 w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl focus:outline-none focus:border-[#B99550] bg-gray-50/50 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                    Emergency WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={emergencyWhatsapp}
                    onChange={(e) => setEmergencyWhatsapp(e.target.value)}
                    placeholder="+44 7700 900889"
                    className="mt-1 w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl focus:outline-none focus:border-[#B99550] bg-gray-50/50 font-mono"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Lock className="w-3.5 h-3.5 text-[#B99550]" />
                  <span>Encrypted in User Record</span>
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#123C2D] hover:bg-[#1a5540] text-white text-xs font-bold transition shadow-sm cursor-pointer"
                >
                  Save &amp; Encrypt Safety Contact
                </button>
              </div>
            </form>
          </div>
        )}

        {/* 4. PROFILE & PREFERENCES TAB */}
        {activeTab === 'profile' && (
          <div className="max-w-3xl space-y-6">
            <div className="pb-3 border-b border-[#E8DFD0]">
              <h2 className="font-serif text-2xl font-bold text-[#123C2D]">
                Traveller Profile &amp; Cultural Preferences
              </h2>
              <p className="text-xs text-gray-600">
                Manage your travel details and culinary requirements so our local host families and certified storytellers can cater to you
              </p>
            </div>

            <form onSubmit={handleSaveProfile} className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8DFD0] shadow-sm space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl focus:outline-none focus:border-[#B99550] bg-gray-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                    Country of Residence
                  </label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="mt-1 w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl focus:outline-none focus:border-[#B99550] bg-gray-50/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                  Primary Mobile / WhatsApp
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl focus:outline-none focus:border-[#B99550] bg-gray-50/50 font-mono"
                />
              </div>

              {/* Dietary Preferences Chips */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                  Dietary Requirements (Shared with Food Guides &amp; Host Families)
                </label>
                <div className="flex flex-wrap gap-2 pt-1">
                  {[
                    'Halal Only',
                    'Vegetarian',
                    'Vegan',
                    'No Peanuts',
                    'Gluten-Free',
                    'Lactose-Free',
                    'Mild Spice Only',
                  ].map((item) => {
                    const selected = dietary.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleDietary(item)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                          selected
                            ? 'bg-[#123C2D] text-[#FAF6ED] shadow-xs'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {item} {selected && '✓'}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mobility Notes */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                  Mobility &amp; Walking Preferences
                </label>
                <textarea
                  rows={3}
                  value={mobility}
                  onChange={(e) => setMobility(e.target.value)}
                  placeholder="e.g. Walking distance preference, stair access, children in strollers..."
                  className="mt-1 w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl focus:outline-none focus:border-[#B99550] bg-gray-50/50"
                />
              </div>

              <div className="pt-3 border-t border-gray-100 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#B99550] hover:bg-[#D4AF6E] text-[#0A2418] text-xs font-bold transition shadow-sm cursor-pointer"
                >
                  Save Profile Settings
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      <Footer />

      {/* ── Official Tax Invoice / Receipt Modal ── */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-gray-200">
            {/* Invoice Header */}
            <div className="flex items-start justify-between border-b border-gray-100 pb-4">
              <div>
                <img
                  src="/images/logos/Daastaan-e-Pakistan_Horizontal-Logo.png"
                  alt="Daastaan-e-Pakistan"
                  className="h-10 w-auto object-contain"
                />
                <p className="text-[10px] text-gray-500 mt-1">
                  Official Travel Receipt &middot; Daastaan-e-Pakistan Ltd.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedReceipt(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Invoice Metadata */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <p className="text-gray-500 uppercase text-[10px] font-bold">Booking Reference</p>
                <p className="font-mono font-bold text-[#123C2D]">{selectedReceipt.bookingReference}</p>
              </div>
              <div>
                <p className="text-gray-500 uppercase text-[10px] font-bold">Travel Date</p>
                <p className="font-semibold text-gray-800">{selectedReceipt.startDate}</p>
              </div>
              <div>
                <p className="text-gray-500 uppercase text-[10px] font-bold">Billed To</p>
                <p className="font-semibold text-gray-800">{user?.name || 'Valued Guest'}</p>
              </div>
              <div>
                <p className="text-gray-500 uppercase text-[10px] font-bold">Payment Method</p>
                <p className="font-semibold text-emerald-700">Paid in Full (Safepay / Card)</p>
              </div>
            </div>

            {/* Line Items */}
            <div className="border border-gray-100 rounded-xl overflow-hidden text-xs">
              <div className="bg-gray-50 px-4 py-2 font-bold text-gray-700 flex justify-between">
                <span>Description</span>
                <span>Amount</span>
              </div>
              <div className="px-4 py-3 border-t border-gray-100 flex justify-between text-gray-700">
                <div>
                  <p className="font-semibold">{selectedReceipt.packageTitle}</p>
                  <p className="text-[11px] text-gray-500">
                    {selectedReceipt.partySize} Guests &middot; Certified Guide included
                  </p>
                </div>
                <span className="font-bold text-[#123C2D]">
                  {formatPrice(selectedReceipt.totalPricePkr, selectedReceipt.currency)}
                </span>
              </div>
              <div className="px-4 py-2.5 bg-gray-50 border-t border-gray-100 flex justify-between font-bold text-sm text-[#123C2D]">
                <span>Total Amount Paid</span>
                <span>{formatPrice(selectedReceipt.totalPricePkr, selectedReceipt.currency)}</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-gray-500">Includes all local taxes and safety levies</span>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-[#123C2D] text-white font-bold text-xs flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Tax Invoice</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF6ED]" />}>
      <DashboardContent />
    </Suspense>
  );
}
