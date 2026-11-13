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
  Compass,
  Calendar,
  Clock,
  MapPin,
  Users,
  ShieldCheck,
  ShieldAlert,
  Download,
  Share2,
  Copy,
  Check,
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
  ChevronRight,
  LogOut,
  Utensils,
  HeartHandshake,
  LifeBuoy,
  Sparkles,
  Phone,
  Mail,
  Award,
} from 'lucide-react';
import { toast } from 'sonner';

type DashboardSection = 'itineraries' | 'archive' | 'safety' | 'profile' | 'concierge';

function DashboardContent() {
  const searchParams = useSearchParams();
  const initialSection = (searchParams?.get('tab') as DashboardSection) || 'itineraries';
  const [activeSection, setActiveSection] = useState<DashboardSection>(
    ['itineraries', 'archive', 'safety', 'profile', 'concierge'].includes(initialSection)
      ? initialSection
      : 'itineraries'
  );

  const {
    user,
    isAuthenticated,
    reservations,
    updateProfile,
    updateEmergencyContact,
    logout,
  } = useAuth();

  // Receipt Modal State
  const [selectedReceipt, setSelectedReceipt] = useState<Reservation | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);
  const [copiedReferral, setCopiedReferral] = useState(false);

  // Profile Form State
  const [name, setName] = useState(user?.name || 'Dr. Zoya Khan');
  const [phone, setPhone] = useState(user?.phone || '+44 7700 900142');
  const [country, setCountry] = useState(user?.country || 'United Kingdom');
  const [dietary, setDietary] = useState<string[]>(
    user?.dietaryPreferences || ['Halal Only', 'No Peanuts']
  );
  const [mobility, setMobility] = useState(
    user?.mobilityNotes || 'Comfortable with walking tours up to 5km'
  );

  // Emergency Contact Form State
  const [emergencyName, setEmergencyName] = useState(
    user?.emergencyContact?.name || 'Farhan Khan'
  );
  const [emergencyRelation, setEmergencyRelation] = useState(
    user?.emergencyContact?.relationship || 'Brother'
  );
  const [emergencyPhone, setEmergencyPhone] = useState(
    user?.emergencyContact?.phone || '+44 7700 900889'
  );
  const [emergencyWhatsapp, setEmergencyWhatsapp] = useState(
    user?.emergencyContact?.whatsapp || '+44 7700 900889'
  );

  const upcomingReservations = reservations.filter(
    (r) => r.status === 'CONFIRMED' || r.status === 'PENDING'
  );
  const pastReservations = reservations.filter((r) => r.status === 'COMPLETED');

  const handleCopyReferral = () => {
    if (user?.referralCode) {
      navigator.clipboard.writeText(user.referralCode);
      setCopiedReferral(true);
      toast.success('Patron invitation code copied');
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
    link.setAttribute('download', `${res.bookingReference}-itinerary.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Calendar pass added to your downloads');
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
    toast.success('Travel profile & preferences updated');
  };

  const handleSaveEmergency = (e: React.FormEvent) => {
    e.preventDefault();
    updateEmergencyContact({
      name: emergencyName,
      relationship: emergencyRelation,
      phone: emergencyPhone,
      whatsapp: emergencyWhatsapp,
    });
    toast.success('Universal Safety emergency contact updated and encrypted');
  };

  const toggleDietary = (item: string) => {
    if (dietary.includes(item)) {
      setDietary(dietary.filter((d) => d !== item));
    } else {
      setDietary([...dietary, item]);
    }
  };

  const primaryUpcoming = upcomingReservations[0];
  const secondaryUpcoming = upcomingReservations.slice(1);

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-stone-900 font-sans flex flex-col antialiased selection:bg-[#B99550]/20 selection:text-[#123C2D]">
      <Header />

      {/* Main Container with Sidebar + Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ============================================================== */}
          {/* LEFT SIDEBAR NAVIGATION PANEL (Col 1-4 on Desktop)             */}
          {/* ============================================================== */}
          <aside className="lg:col-span-4 xl:col-span-3 space-y-6">
            
            {/* Traveller Identity Card */}
            <div className="bg-white rounded-2xl border border-stone-200/80 shadow-sm p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#123C2D] via-[#B99550] to-[#123C2D]" />
              
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={
                      user?.avatarUrl ||
                      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'
                    }
                    alt={user?.name || 'Traveller'}
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-[#B99550]/40 shadow-sm"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#123C2D] rounded-full flex items-center justify-center text-white ring-2 ring-white">
                    <ShieldCheck className="w-3 h-3 text-[#B99550]" />
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <h2 className="text-base font-serif font-bold text-[#123C2D] truncate">
                    {user?.name || 'Dr. Zoya Khan'}
                  </h2>
                  <p className="text-xs text-stone-500 truncate">{user?.email || 'traveller@daastaan.com'}</p>
                  <div className="mt-1.5 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#123C2D]/5 text-[#123C2D] text-[10px] font-semibold tracking-wide uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B99550]" />
                    <span>Heritage Patron</span>
                  </div>
                </div>
              </div>

              {/* Status Overview Mini-Bar */}
              <div className="mt-5 pt-4 border-t border-stone-100 grid grid-cols-2 gap-2 text-center">
                <div className="p-2 rounded-xl bg-stone-50 border border-stone-100">
                  <div className="text-xs text-stone-500 font-medium">Upcoming</div>
                  <div className="text-base font-bold text-[#123C2D] mt-0.5">
                    {upcomingReservations.length} {upcomingReservations.length === 1 ? 'Tour' : 'Tours'}
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-stone-50 border border-stone-100">
                  <div className="text-xs text-stone-500 font-medium">Completed</div>
                  <div className="text-base font-bold text-[#123C2D] mt-0.5">
                    {pastReservations.length} {pastReservations.length === 1 ? 'Tour' : 'Tours'}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Menu Items */}
            <nav className="bg-white rounded-2xl border border-stone-200/80 shadow-sm p-2 space-y-1">
              <button
                type="button"
                onClick={() => setActiveSection('itineraries')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold transition ${
                  activeSection === 'itineraries'
                    ? 'bg-[#123C2D] text-white shadow-sm'
                    : 'text-stone-700 hover:bg-stone-50 hover:text-[#123C2D]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Compass className={`w-4 h-4 ${activeSection === 'itineraries' ? 'text-[#B99550]' : 'text-stone-400'}`} />
                  <span>My Journeys</span>
                </div>
                {upcomingReservations.length > 0 && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      activeSection === 'itineraries'
                        ? 'bg-[#B99550] text-[#123C2D]'
                        : 'bg-stone-100 text-stone-700'
                    }`}
                  >
                    {upcomingReservations.length}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveSection('archive')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold transition ${
                  activeSection === 'archive'
                    ? 'bg-[#123C2D] text-white shadow-sm'
                    : 'text-stone-700 hover:bg-stone-50 hover:text-[#123C2D]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <FileText className={`w-4 h-4 ${activeSection === 'archive' ? 'text-[#B99550]' : 'text-stone-400'}`} />
                  <span>Past Journeys & Invoices</span>
                </div>
                {pastReservations.length > 0 && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      activeSection === 'archive'
                        ? 'bg-[#B99550] text-[#123C2D]'
                        : 'bg-stone-100 text-stone-700'
                    }`}
                  >
                    {pastReservations.length}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveSection('safety')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold transition ${
                  activeSection === 'safety'
                    ? 'bg-[#123C2D] text-white shadow-sm'
                    : 'text-stone-700 hover:bg-stone-50 hover:text-[#123C2D]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <ShieldAlert className={`w-4 h-4 ${activeSection === 'safety' ? 'text-[#B99550]' : 'text-stone-400'}`} />
                  <span>Universal Safety & SOS</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-emerald-100" />
              </button>

              <button
                type="button"
                onClick={() => setActiveSection('profile')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold transition ${
                  activeSection === 'profile'
                    ? 'bg-[#123C2D] text-white shadow-sm'
                    : 'text-stone-700 hover:bg-stone-50 hover:text-[#123C2D]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <User className={`w-4 h-4 ${activeSection === 'profile' ? 'text-[#B99550]' : 'text-stone-400'}`} />
                  <span>Travel Preferences</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setActiveSection('concierge')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold transition ${
                  activeSection === 'concierge'
                    ? 'bg-[#123C2D] text-white shadow-sm'
                    : 'text-stone-700 hover:bg-stone-50 hover:text-[#123C2D]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <HeartHandshake className={`w-4 h-4 ${activeSection === 'concierge' ? 'text-[#B99550]' : 'text-stone-400'}`} />
                  <span>Private Concierge Desk</span>
                </div>
              </button>

              <div className="pt-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition"
                >
                  <LogOut className="w-4 h-4 text-rose-500" />
                  <span>Sign Out</span>
                </button>
              </div>
            </nav>

            {/* Universal Safety Guarantee Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#123C2D] to-[#0A261C] text-white shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-serif text-[#B99550] uppercase tracking-wider font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Safety Protocol 24/7</span>
              </div>
              <p className="text-[11px] text-stone-300 leading-relaxed">
                Every booked journey includes active emergency response, real-time guide verification, and instant WhatsApp SOS.
              </p>
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
                <span className="text-stone-400">Emergency Desk</span>
                <span className="font-mono text-[#B99550] font-semibold">+92 332 4541952</span>
              </div>
            </div>

          </aside>

          {/* ============================================================== */}
          {/* RIGHT MAIN CONTENT AREA (Col 5-12 on Desktop)                 */}
          {/* ============================================================== */}
          <section className="lg:col-span-8 xl:col-span-9 space-y-8">
            
            {/* Top Bar Greeting */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-stone-200">
              <div>
                <span className="text-xs uppercase font-serif tracking-widest text-[#B99550] font-semibold">
                  Member Portal • Daastaan-e-Pakistan
                </span>
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#123C2D] mt-0.5">
                  Khush Amdeed, {user?.name?.split(' ')[0] || 'Zoya'}
                </h1>
                <p className="text-xs text-stone-500 mt-0.5">
                  Manage your active expeditions, verified guides, tax receipts, and travel preferences.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/experiences"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#123C2D] text-white text-xs font-semibold hover:bg-[#123C2D]/90 transition shadow-sm"
                >
                  <Compass className="w-3.5 h-3.5 text-[#B99550]" />
                  <span>Explore Journeys</span>
                </Link>
              </div>
            </div>

            {/* SECTION 1: MY JOURNEYS (Active & Upcoming Itineraries) */}
            {activeSection === 'itineraries' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-serif font-bold text-[#123C2D]">
                    Active Itineraries ({upcomingReservations.length})
                  </h3>
                  <p className="text-xs text-stone-500">
                    Your confirmed departures with meeting points, assigned local storytellers, and safety trackers.
                  </p>
                </div>

                {upcomingReservations.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-stone-200/80 p-12 text-center space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
                      <Compass className="w-7 h-7" />
                    </div>
                    <div className="max-w-md mx-auto space-y-1">
                      <h4 className="font-serif text-lg font-bold text-[#123C2D]">
                        No Active Journeys Scheduled
                      </h4>
                      <p className="text-xs text-stone-500 leading-relaxed">
                        You do not have any upcoming tour departures. Explore our living heritage stories and reserve your next cultural journey through Pakistan.
                      </p>
                    </div>
                    <Link
                      href="/experiences"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#123C2D] text-white text-xs font-semibold hover:bg-[#123C2D]/90 transition"
                    >
                      <span>Discover Available Tours</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#B99550]" />
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* PRIMARY FEATURED EXPEDITION CARD */}
                    {primaryUpcoming && (
                      <div className="bg-white rounded-2xl border border-stone-200/90 shadow-sm overflow-hidden">
                        {/* Status banner */}
                        <div className="bg-gradient-to-r from-[#123C2D] to-[#1E4D3B] px-6 py-3 text-white flex flex-wrap items-center justify-between gap-3 text-xs">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="font-semibold uppercase tracking-wider text-[11px] text-[#B99550]">
                              Next Scheduled Departure
                            </span>
                            <span className="text-stone-300">•</span>
                            <span className="text-stone-200 font-mono text-[11px]">
                              Ref: {primaryUpcoming.bookingReference}
                            </span>
                          </div>
                          <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white font-medium text-[10px] tracking-wide">
                            CONFIRMED & PROTECTED
                          </span>
                        </div>

                        <div className="p-6 space-y-6">
                          {/* Title & Tier Header */}
                          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                            <div className="space-y-1.5">
                              <div className="flex items-center gap-2">
                                <TierBadge tier={primaryUpcoming.tier} />
                                <span className="text-xs text-stone-500 flex items-center gap-1">
                                  <MapPin className="w-3 h-3 text-[#B99550]" />
                                  {primaryUpcoming.city}, Pakistan
                                </span>
                              </div>
                              <h4 className="text-xl sm:text-2xl font-serif font-bold text-[#123C2D]">
                                {primaryUpcoming.packageTitle}
                              </h4>
                            </div>

                            <div className="text-left md:text-right">
                              <span className="text-[11px] text-stone-500 uppercase tracking-wider block">Total Fare Paid</span>
                              <span className="text-xl font-serif font-bold text-[#123C2D]">
                                {formatPrice(primaryUpcoming.totalPricePkr, primaryUpcoming.currency)}
                              </span>
                              <span className="text-[10px] text-stone-500 block">
                                for {primaryUpcoming.partySize} {primaryUpcoming.partySize === 1 ? 'Guest' : 'Guests'} (All taxes included)
                              </span>
                            </div>
                          </div>

                          {/* Logistics Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-stone-50 border border-stone-100 text-xs">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-lg bg-white border border-stone-200 flex items-center justify-center text-[#123C2D] shrink-0">
                                <Calendar className="w-4 h-4 text-[#B99550]" />
                              </div>
                              <div>
                                <span className="text-stone-400 block text-[10px] uppercase font-semibold">Tour Dates</span>
                                <span className="font-semibold text-stone-800">
                                  {new Date(primaryUpcoming.startDate).toLocaleDateString('en-GB', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric',
                                  })}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-lg bg-white border border-stone-200 flex items-center justify-center text-[#123C2D] shrink-0">
                                <Users className="w-4 h-4 text-[#B99550]" />
                              </div>
                              <div>
                                <span className="text-stone-400 block text-[10px] uppercase font-semibold">Party Size</span>
                                <span className="font-semibold text-stone-800">
                                  {primaryUpcoming.partySize} {primaryUpcoming.partySize === 1 ? 'Person' : 'People'} (Private Tour)
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-lg bg-white border border-stone-200 flex items-center justify-center text-[#123C2D] shrink-0">
                                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                              </div>
                              <div>
                                <span className="text-stone-400 block text-[10px] uppercase font-semibold">Safety Token</span>
                                <span className="font-mono text-emerald-700 font-medium text-[11px]">
                                  Active & Synchronized
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Guide Profile & Meeting Spot Side-by-Side */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            
                            {/* Assigned Guide Card */}
                            <div className="p-4 rounded-xl bg-white border border-stone-200 space-y-3">
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-[11px] uppercase tracking-wider font-semibold text-stone-500">
                                  Assigned Local Storyteller
                                </span>
                                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-semibold flex items-center gap-1">
                                  <ShieldCheck className="w-3 h-3" />
                                  3-Point Verified
                                </span>
                              </div>

                              <div className="flex items-center gap-3">
                                <img
                                  src={primaryUpcoming.guide.avatarUrl}
                                  alt={primaryUpcoming.guide.name}
                                  className="w-12 h-12 rounded-full object-cover ring-1 ring-stone-200"
                                />
                                <div className="min-w-0 flex-1">
                                  <h5 className="font-serif font-bold text-sm text-[#123C2D]">
                                    {primaryUpcoming.guide.name}
                                  </h5>
                                  <p className="text-[11px] text-stone-500">
                                    Languages: {primaryUpcoming.guide.languages.join(', ')}
                                  </p>
                                  <div className="flex items-center gap-1 text-[11px] text-amber-600 font-semibold mt-0.5">
                                    <span>★ {primaryUpcoming.guide.rating}</span>
                                    <span className="text-stone-400 font-normal">• Licensed Cultural Guide</span>
                                  </div>
                                </div>
                              </div>

                              <a
                                href={`https://wa.me/${primaryUpcoming.guide.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(primaryUpcoming.guide.name)},%20I%20am%20confirmed%20for%20the%20${encodeURIComponent(primaryUpcoming.packageTitle)}%20(Ref:%20${primaryUpcoming.bookingReference}).`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold transition"
                              >
                                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Connect on WhatsApp</span>
                              </a>
                            </div>

                            {/* Meeting Location Card */}
                            <div className="p-4 rounded-xl bg-white border border-stone-200 space-y-3 flex flex-col justify-between">
                              <div className="space-y-1.5">
                                <span className="text-[11px] uppercase tracking-wider font-semibold text-stone-500 block">
                                  Designated Assembly Point
                                </span>
                                <div className="flex items-start gap-2">
                                  <MapPin className="w-4 h-4 text-[#B99550] shrink-0 mt-0.5" />
                                  <p className="text-xs font-semibold text-stone-800 leading-snug">
                                    {primaryUpcoming.meetingPoint}
                                  </p>
                                </div>
                                <p className="text-[11px] text-stone-500 leading-relaxed">
                                  Please arrive 15 minutes prior to start time. Your guide will be holding the official Daastaan-e-Pakistan emblem badge.
                                </p>
                              </div>

                              <a
                                href={`https://maps.google.com/?q=${encodeURIComponent(primaryUpcoming.meetingPoint)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#123C2D] hover:text-[#B99550] transition pt-2 border-t border-stone-100"
                              >
                                <span>Open in Google Maps</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>

                          </div>

                          {/* Quick Action Button Row */}
                          <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => handleDownloadCalendar(primaryUpcoming)}
                                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold transition cursor-pointer"
                              >
                                <Download className="w-3.5 h-3.5 text-stone-500" />
                                <span>Add to Calendar (.ICS)</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => setSelectedReceipt(primaryUpcoming)}
                                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold transition cursor-pointer"
                              >
                                <FileText className="w-3.5 h-3.5 text-stone-500" />
                                <span>View Voucher / Invoice</span>
                              </button>
                            </div>

                            <a
                              href={`/tours/${primaryUpcoming.packageSlug}`}
                              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#123C2D] hover:bg-[#123C2D]/90 text-white font-semibold transition"
                            >
                              <span>View Tour Details</span>
                              <ChevronRight className="w-3.5 h-3.5 text-[#B99550]" />
                            </a>
                          </div>

                        </div>
                      </div>
                    )}

                    {/* SECONDARY UPCOMING TOURS (If any) */}
                    {secondaryUpcoming.map((res) => (
                      <div
                        key={res.id}
                        className="bg-white rounded-xl border border-stone-200 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <TierBadge tier={res.tier} />
                            <span className="text-[11px] font-mono text-stone-400">Ref: {res.bookingReference}</span>
                          </div>
                          <h5 className="font-serif font-bold text-base text-[#123C2D]">{res.packageTitle}</h5>
                          <p className="text-xs text-stone-500">
                            Departure Date: {res.startDate} • {res.partySize} Guests • Guide: {res.guide.name}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedReceipt(res)}
                            className="px-3 py-1.5 rounded-lg border border-stone-300 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition"
                          >
                            Receipt
                          </button>
                          <Link
                            href={`/tours/${res.packageSlug}`}
                            className="px-3 py-1.5 rounded-lg bg-[#123C2D] text-white text-xs font-semibold hover:bg-[#123C2D]/90 transition"
                          >
                            Details
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* SECTION 2: PAST JOURNEYS & OFFICIAL INVOICES */}
            {activeSection === 'archive' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-serif font-bold text-[#123C2D]">
                    Journey Archive & Invoices ({pastReservations.length})
                  </h3>
                  <p className="text-xs text-stone-500">
                    A permanent record of your completed cultural journeys with official tax invoices and review histories.
                  </p>
                </div>

                <div className="space-y-4">
                  {pastReservations.map((res) => (
                    <div
                      key={res.id}
                      className="bg-white rounded-2xl border border-stone-200/90 shadow-sm p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 transition hover:border-[#B99550]/40"
                    >
                      <div className="flex items-start gap-4">
                        <img
                          src={res.image}
                          alt={res.packageTitle}
                          className="w-20 h-20 rounded-xl object-cover ring-1 ring-stone-200 shrink-0"
                        />
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 text-[10px] font-semibold uppercase tracking-wider">
                              Completed Experience
                            </span>
                            <span className="text-xs text-stone-400 font-mono">Ref: {res.bookingReference}</span>
                          </div>
                          <h4 className="font-serif font-bold text-base sm:text-lg text-[#123C2D]">
                            {res.packageTitle}
                          </h4>
                          <p className="text-xs text-stone-500">
                            Completed on {new Date(res.startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} • {res.city}
                          </p>
                          <p className="text-xs font-semibold text-stone-800">
                            Fare Paid: {formatPrice(res.totalPricePkr, res.currency)}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap md:flex-col items-stretch gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => setSelectedReceipt(res)}
                          className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition"
                        >
                          <FileText className="w-3.5 h-3.5 text-stone-600" />
                          <span>Tax Invoice (PDF)</span>
                        </button>

                        <Link
                          href={`/tours/${res.packageSlug}`}
                          className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#123C2D] hover:bg-[#123C2D]/90 text-white text-xs font-semibold transition"
                        >
                          <Compass className="w-3.5 h-3.5 text-[#B99550]" />
                          <span>Book Again</span>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION 3: UNIVERSAL SAFETY & SOS */}
            {activeSection === 'safety' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-serif font-bold text-[#123C2D]">
                    Universal Safety & Emergency Response
                  </h3>
                  <p className="text-xs text-stone-500">
                    Your next-of-kin emergency contact information is encrypted and only referenced by our 24/7 security dispatch in urgent circumstances.
                  </p>
                </div>

                {/* Hotlines Banner */}
                <div className="bg-[#123C2D] text-white rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <LifeBuoy className="w-5 h-5 text-[#B99550]" />
                      <span className="font-serif font-bold text-sm tracking-wide">
                        Daastaan 24/7 Universal Safety Helpline
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold tracking-wider uppercase">
                      Always Active
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1">
                      <span className="text-stone-400 block text-[11px]">Primary Tour Emergency Desk:</span>
                      <a href="tel:+923324541952" className="text-base font-serif font-bold text-[#B99550] hover:underline">
                        +92 332 4541952
                      </a>
                    </div>
                    <div className="space-y-1">
                      <span className="text-stone-400 block text-[11px]">Secondary Safety WhatsApp:</span>
                      <a href="https://wa.me/923008492551" target="_blank" rel="noopener noreferrer" className="text-base font-serif font-bold text-[#B99550] hover:underline">
                        +92 300 8492551
                      </a>
                    </div>
                  </div>
                </div>

                {/* Emergency Contact Form */}
                <div className="bg-white rounded-2xl border border-stone-200/90 shadow-sm p-6 space-y-5">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif font-bold text-base text-[#123C2D]">
                      Next-of-Kin Emergency Details
                    </h4>
                    <span className="inline-flex items-center gap-1 text-[11px] text-stone-500">
                      <Lock className="w-3 h-3 text-stone-400" />
                      AES-256 Protected
                    </span>
                  </div>

                  <form onSubmit={handleSaveEmergency} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-semibold text-stone-700 mb-1">
                          Emergency Contact Full Name
                        </label>
                        <input
                          type="text"
                          value={emergencyName}
                          onChange={(e) => setEmergencyName(e.target.value)}
                          placeholder="e.g. Farhan Khan"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#123C2D] focus:border-[#123C2D]"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-stone-700 mb-1">
                          Relationship to You
                        </label>
                        <input
                          type="text"
                          value={emergencyRelation}
                          onChange={(e) => setEmergencyRelation(e.target.value)}
                          placeholder="e.g. Spouse / Brother / Parent"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#123C2D] focus:border-[#123C2D]"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-stone-700 mb-1">
                          24/7 Telephone Number
                        </label>
                        <input
                          type="tel"
                          value={emergencyPhone}
                          onChange={(e) => setEmergencyPhone(e.target.value)}
                          placeholder="e.g. +44 7700 900889"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#123C2D] focus:border-[#123C2D]"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-stone-700 mb-1">
                          Emergency WhatsApp Number
                        </label>
                        <input
                          type="tel"
                          value={emergencyWhatsapp}
                          onChange={(e) => setEmergencyWhatsapp(e.target.value)}
                          placeholder="e.g. +44 7700 900889"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#123C2D] focus:border-[#123C2D]"
                        />
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        type="submit"
                        className="px-5 py-2.5 rounded-xl bg-[#123C2D] text-white font-semibold hover:bg-[#123C2D]/90 transition"
                      >
                        Save Emergency Contact
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* SECTION 4: TRAVEL PREFERENCES & CULINARY PROFILE */}
            {activeSection === 'profile' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-serif font-bold text-[#123C2D]">
                    Personal Profile & Dietary Preferences
                  </h3>
                  <p className="text-xs text-stone-500">
                    Help your guides tailor food stops, walking paces, and hospitality amenities to your exact preferences.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-stone-200/90 shadow-sm p-6 space-y-6">
                  <form onSubmit={handleSaveProfile} className="space-y-6 text-xs">
                    
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block font-semibold text-stone-700 mb-1">Full Legal Name</label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#123C2D]"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-stone-700 mb-1">Contact Phone</label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#123C2D]"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-stone-700 mb-1">Country of Residence</label>
                        <input
                          type="text"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#123C2D]"
                        />
                      </div>
                    </div>

                    {/* Dietary Requirements */}
                    <div className="space-y-2 pt-2 border-t border-stone-100">
                      <div className="flex items-center gap-2">
                        <Utensils className="w-4 h-4 text-[#B99550]" />
                        <label className="font-semibold text-stone-800">
                          Dietary Restrictions & Food Preferences
                        </label>
                      </div>
                      <p className="text-[11px] text-stone-500">
                        Select any restrictions so food trail stops and complimentary dining are customized for you.
                      </p>

                      <div className="flex flex-wrap gap-2 pt-1">
                        {[
                          'Halal Only',
                          'Vegetarian',
                          'Vegan',
                          'No Peanuts / Nut Allergy',
                          'Gluten-Free',
                          'Lactose Intolerant',
                          'Diabetic-Friendly',
                          'Mild Spice Only',
                        ].map((item) => {
                          const isSelected = dietary.includes(item);
                          return (
                            <button
                              key={item}
                              type="button"
                              onClick={() => toggleDietary(item)}
                              className={`px-3 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
                                isSelected
                                  ? 'bg-[#123C2D] text-white'
                                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                              }`}
                            >
                              {item}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Mobility Notes */}
                    <div className="space-y-1.5 pt-2 border-t border-stone-100">
                      <label className="block font-semibold text-stone-800">
                        Mobility, Pace & Accessibility Notes
                      </label>
                      <textarea
                        rows={2}
                        value={mobility}
                        onChange={(e) => setMobility(e.target.value)}
                        placeholder="e.g. Comfortable with walking tours; prefer shaded rest stops every 45 minutes."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#123C2D]"
                      />
                    </div>

                    {/* Patron Benefits & Privileges */}
                    <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-0.5">
                        <span className="font-serif font-bold text-sm text-[#123C2D]">
                          Patron Invitation Code: {user?.referralCode || 'ZOYA-PK26'}
                        </span>
                        <p className="text-[11px] text-stone-500">
                          Share with friends to grant them complimentary VIP fast-track entry and concierge upgrades.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={handleCopyReferral}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-300 text-xs font-semibold text-stone-700 hover:bg-stone-100 transition cursor-pointer"
                      >
                        {copiedReferral ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedReferral ? 'Copied' : 'Copy Code'}</span>
                      </button>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        type="submit"
                        className="px-5 py-2.5 rounded-xl bg-[#123C2D] text-white font-semibold hover:bg-[#123C2D]/90 transition"
                      >
                        Save Preferences
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* SECTION 5: PRIVATE CONCIERGE DESK */}
            {activeSection === 'concierge' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-serif font-bold text-[#123C2D]">
                    Private Concierge & Special Itinerary Requests
                  </h3>
                  <p className="text-xs text-stone-500">
                    Our dedicated Lahore concierge desk is at your disposal for bespoke excursions, private transport, and special access.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* WhatsApp Desk */}
                  <div className="bg-white rounded-2xl border border-stone-200/90 shadow-sm p-6 space-y-4 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <MessageCircle className="w-5 h-5" />
                      </div>
                      <h4 className="font-serif font-bold text-base text-[#123C2D]">
                        Direct Concierge WhatsApp
                      </h4>
                      <p className="text-xs text-stone-500 leading-relaxed">
                        Speak directly with a senior Daastaan travel designer for instant itinerary customization, dietary accommodations, or flight arrival coordination.
                      </p>
                    </div>

                    <a
                      href="https://wa.me/923324541952?text=Hello%20Daastaan%20Concierge,%20I%20am%20a%20member%20and%20would%20like%20assistance%20with%20my%20travel%20plans."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Start WhatsApp Conversation</span>
                    </a>
                  </div>

                  {/* Email Support */}
                  <div className="bg-white rounded-2xl border border-stone-200/90 shadow-sm p-6 space-y-4 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="w-10 h-10 rounded-xl bg-stone-100 text-[#123C2D] flex items-center justify-center">
                        <Mail className="w-5 h-5 text-[#B99550]" />
                      </div>
                      <h4 className="font-serif font-bold text-base text-[#123C2D]">
                        VIP Email Dispatch
                      </h4>
                      <p className="text-xs text-stone-500 leading-relaxed">
                        For multi-city private itineraries across Hunza, Skardu, Islamabad, or curated culinary galas. Guaranteed reply within 4 hours.
                      </p>
                    </div>

                    <a
                      href="mailto:info@daastaanpakistan.com?subject=VIP%20Member%20Concierge%20Request"
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-[#123C2D] text-xs font-semibold transition"
                    >
                      <Mail className="w-4 h-4" />
                      <span>info@daastaanpakistan.com</span>
                    </a>
                  </div>
                </div>
              </div>
            )}

          </section>
        </div>
      </main>

      {/* ============================================================== */}
      {/* OFFICIAL TAX INVOICE MODAL                                     */}
      {/* ============================================================== */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-2xl w-full rounded-2xl shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Top Header */}
            <div className="bg-[#123C2D] text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#B99550]" />
                <span className="font-serif font-bold text-sm tracking-wide">
                  Official Travel Tax Invoice & Voucher
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedReceipt(null)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Printable Invoice Body */}
            <div className="p-6 sm:p-8 space-y-6 text-xs text-stone-700 font-sans">
              
              {/* Header Logos & Meta */}
              <div className="flex items-start justify-between pb-6 border-b border-stone-200">
                <div>
                  <img
                    src="/images/logos/Daastaan-e-Pakistan_Horizontal-Logo.png"
                    alt="Daastaan-e-Pakistan"
                    className="h-10 w-auto object-contain"
                  />
                  <p className="text-[11px] text-stone-500 mt-2">
                    Daastaan Tourism & Cultural Ventures Pvt. Ltd.<br />
                    NTN: 8941022-7 • PRA Registered<br />
                    Mall Road, Lahore, Punjab, Pakistan
                  </p>
                </div>

                <div className="text-right space-y-0.5">
                  <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block">INVOICE NO</span>
                  <span className="font-mono text-xs font-bold text-[#123C2D] block">
                    INV-{selectedReceipt.bookingReference}
                  </span>
                  <span className="text-[11px] text-stone-500 block">
                    Date: {new Date(selectedReceipt.startDate).toLocaleDateString('en-GB')}
                  </span>
                </div>
              </div>

              {/* Billed To / Tour Details */}
              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-stone-200">
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block">BILLED TO</span>
                  <span className="font-semibold text-stone-800 text-xs block mt-0.5">
                    {user?.name || 'Dr. Zoya Khan'}
                  </span>
                  <span className="text-[11px] text-stone-500 block">{user?.email || 'traveller@daastaan.com'}</span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block">RESERVATION</span>
                  <span className="font-semibold text-[#123C2D] text-xs block mt-0.5">
                    {selectedReceipt.packageTitle}
                  </span>
                  <span className="text-[11px] text-stone-500 block">
                    City: {selectedReceipt.city} • Guests: {selectedReceipt.partySize}
                  </span>
                </div>
              </div>

              {/* Itemized Table */}
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-stone-200 text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                    <th className="pb-2">Description</th>
                    <th className="pb-2 text-center">Party</th>
                    <th className="pb-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  <tr>
                    <td className="py-2.5">
                      <span className="font-semibold text-stone-800 block">{selectedReceipt.packageTitle}</span>
                      <span className="text-[10px] text-stone-500">Tier: {selectedReceipt.tier} • Guide: {selectedReceipt.guide.name}</span>
                    </td>
                    <td className="py-2.5 text-center">{selectedReceipt.partySize}</td>
                    <td className="py-2.5 text-right font-medium">
                      {formatPrice(selectedReceipt.totalPricePkr, selectedReceipt.currency)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-stone-600">Universal Safety Layer & GPS SOS Dispatch</td>
                    <td className="py-2.5 text-center">Included</td>
                    <td className="py-2.5 text-right font-medium text-emerald-600">Complimentary</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className="border-t border-stone-200">
                    <td colSpan={2} className="pt-3 font-bold text-stone-800 text-right">Total Paid (Inclusive of all taxes):</td>
                    <td className="pt-3 text-right font-serif font-bold text-base text-[#123C2D]">
                      {formatPrice(selectedReceipt.totalPricePkr, selectedReceipt.currency)}
                    </td>
                  </tr>
                </tfoot>
              </table>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                <span className="text-[10px] text-stone-400">Payment Status: Settled via Card</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Invoice</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedReceipt(null)}
                    className="px-4 py-2 rounded-xl bg-[#123C2D] text-white text-xs font-semibold hover:bg-[#123C2D]/90 transition"
                  >
                    Close
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FBF9F5] flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-2 border-[#123C2D] border-t-transparent rounded-full" />
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
