'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { TierBadge } from '@/components/ui/tier-badge';
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
      toast.success('Patron invitation code copied to clipboard');
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
    <div className="min-h-screen bg-gradient-to-b from-[#FAF7F2] via-[#F4EFE6] to-[#EFE8DC] text-stone-900 font-sans flex flex-col antialiased selection:bg-[#B99550]/20 selection:text-[#123C2D] relative overflow-x-hidden">
      
      {/* ============================================================== */}
      {/* ATMOSPHERIC AMBIENT GLOW MESH & GRID BACKDROP                  */}
      {/* ============================================================== */}
      <div className="absolute inset-0 bg-tech-grid opacity-30 pointer-events-none" />
      
      {/* Radial Glow Spheres */}
      <div className="absolute -top-32 right-0 w-[650px] h-[650px] bg-gradient-to-br from-[#B99550]/15 via-[#123C2D]/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -left-48 w-[700px] h-[700px] bg-gradient-to-tr from-[#123C2D]/15 via-[#B99550]/10 to-transparent rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-[#123C2D]/10 via-[#B99550]/8 to-transparent rounded-full blur-[120px] pointer-events-none" />

      <Header />

      {/* ============================================================== */}
      {/* EDGE-TO-EDGE FLUID CONTAINER (Full Width Bleed)                */}
      {/* ============================================================== */}
      <main className="flex-1 w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 py-8 lg:py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* ============================================================== */}
          {/* LEFT SIDEBAR NAVIGATION PANEL (Col 1-4 on Desktop)             */}
          {/* ============================================================== */}
          <aside className="lg:col-span-4 xl:col-span-3 space-y-6">
            
            {/* Traveller Identity Card (Frosted Glassmorphism) */}
            <div className="backdrop-blur-xl bg-white/75 border border-white/60 shadow-[0_8px_32px_0_rgba(18,60,45,0.06)] rounded-3xl p-6 relative overflow-hidden transition-all duration-300 hover:shadow-[0_12px_40px_0_rgba(18,60,45,0.09)]">
              {/* Gold gradient top hairline accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#B99550] to-transparent" />
              
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={
                      user?.avatarUrl ||
                      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'
                    }
                    alt={user?.name || 'Traveller'}
                    className="w-16 h-16 rounded-full object-cover ring-2 ring-[#B99550] ring-offset-2 ring-offset-white/80 shadow-md"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#123C2D] rounded-full flex items-center justify-center text-white ring-2 ring-white shadow">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#B99550]" />
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <h2 className="text-lg font-serif font-bold text-[#123C2D] truncate">
                    {user?.name || 'Dr. Zoya Khan'}
                  </h2>
                  <p className="text-xs text-stone-500 truncate">{user?.email || 'traveller@daastaan.com'}</p>
                  
                  <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full backdrop-blur-md bg-gradient-to-r from-[#123C2D]/10 to-[#B99550]/15 border border-[#B99550]/30 text-[#123C2D] text-[10px] font-semibold tracking-wider uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B99550] animate-pulse" />
                    <span>Heritage Patron</span>
                  </div>
                </div>
              </div>

              {/* Status Overview Sub-Pills (Frosted Glass Inside Card) */}
              <div className="mt-6 pt-5 border-t border-stone-200/60 grid grid-cols-2 gap-3 text-center">
                <div className="p-3 rounded-2xl backdrop-blur-md bg-white/60 border border-stone-200/50 shadow-inner">
                  <div className="text-[11px] text-stone-500 font-medium">Upcoming</div>
                  <div className="text-lg font-serif font-bold text-[#123C2D] mt-0.5">
                    {upcomingReservations.length} {upcomingReservations.length === 1 ? 'Tour' : 'Tours'}
                  </div>
                </div>
                <div className="p-3 rounded-2xl backdrop-blur-md bg-white/60 border border-stone-200/50 shadow-inner">
                  <div className="text-[11px] text-stone-500 font-medium">Completed</div>
                  <div className="text-lg font-serif font-bold text-[#123C2D] mt-0.5">
                    {pastReservations.length} {pastReservations.length === 1 ? 'Tour' : 'Tours'}
                  </div>
                </div>
              </div>
            </div>

            {/* Side Navigation Menu (Frosted Glass List) */}
            <nav className="backdrop-blur-xl bg-white/70 border border-white/60 shadow-[0_8px_32px_0_rgba(18,60,45,0.05)] rounded-3xl p-3 space-y-1.5">
              <button
                type="button"
                onClick={() => setActiveSection('itineraries')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  activeSection === 'itineraries'
                    ? 'bg-gradient-to-r from-[#123C2D] via-[#164433] to-[#1E4D3B] text-white shadow-lg shadow-[#123C2D]/20 border border-white/10'
                    : 'text-stone-700 hover:bg-white/80 hover:text-[#123C2D] border border-transparent'
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
                        : 'bg-stone-200/80 text-stone-700'
                    }`}
                  >
                    {upcomingReservations.length}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveSection('archive')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  activeSection === 'archive'
                    ? 'bg-gradient-to-r from-[#123C2D] via-[#164433] to-[#1E4D3B] text-white shadow-lg shadow-[#123C2D]/20 border border-white/10'
                    : 'text-stone-700 hover:bg-white/80 hover:text-[#123C2D] border border-transparent'
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
                        : 'bg-stone-200/80 text-stone-700'
                    }`}
                  >
                    {pastReservations.length}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveSection('safety')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  activeSection === 'safety'
                    ? 'bg-gradient-to-r from-[#123C2D] via-[#164433] to-[#1E4D3B] text-white shadow-lg shadow-[#123C2D]/20 border border-white/10'
                    : 'text-stone-700 hover:bg-white/80 hover:text-[#123C2D] border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <ShieldAlert className={`w-4 h-4 ${activeSection === 'safety' ? 'text-[#B99550]' : 'text-stone-400'}`} />
                  <span>Universal Safety & SOS</span>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-100/80 animate-pulse" />
              </button>

              <button
                type="button"
                onClick={() => setActiveSection('profile')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  activeSection === 'profile'
                    ? 'bg-gradient-to-r from-[#123C2D] via-[#164433] to-[#1E4D3B] text-white shadow-lg shadow-[#123C2D]/20 border border-white/10'
                    : 'text-stone-700 hover:bg-white/80 hover:text-[#123C2D] border border-transparent'
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
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  activeSection === 'concierge'
                    ? 'bg-gradient-to-r from-[#123C2D] via-[#164433] to-[#1E4D3B] text-white shadow-lg shadow-[#123C2D]/20 border border-white/10'
                    : 'text-stone-700 hover:bg-white/80 hover:text-[#123C2D] border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <HeartHandshake className={`w-4 h-4 ${activeSection === 'concierge' ? 'text-[#B99550]' : 'text-stone-400'}`} />
                  <span>Private Concierge Desk</span>
                </div>
              </button>

              <div className="pt-2 border-t border-stone-200/60">
                <button
                  type="button"
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold text-rose-600 hover:bg-rose-50/80 transition-all cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-rose-500" />
                  <span>Sign Out</span>
                </button>
              </div>
            </nav>

            {/* Universal Safety Guarantee Card (Rich Deep Emerald Glass) */}
            <div className="backdrop-blur-xl bg-gradient-to-br from-[#123C2D] via-[#0E3024] to-[#081E16] text-white rounded-3xl p-6 shadow-xl border border-white/10 space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#B99550]/15 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center gap-2 text-xs font-serif text-[#B99550] uppercase tracking-wider font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Safety Protocol 24/7</span>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed font-sans">
                Every booked journey includes active emergency response, real-time guide verification, and instant WhatsApp SOS dispatch.
              </p>
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-stone-400">Emergency Desk</span>
                <span className="font-mono text-[#B99550] font-bold tracking-wide">+92 332 4541952</span>
              </div>
            </div>

          </aside>

          {/* ============================================================== */}
          {/* RIGHT MAIN CONTENT AREA (Col 5-12 on Desktop)                 */}
          {/* ============================================================== */}
          <section className="lg:col-span-8 xl:col-span-9 space-y-8">
            
            {/* Top Bar Greeting Header (Glass Floating Bar) */}
            <div className="backdrop-blur-xl bg-white/70 border border-white/60 shadow-[0_4px_24px_0_rgba(18,60,45,0.04)] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 transition-all">
              <div>
                <span className="text-[11px] uppercase font-serif tracking-widest text-[#B99550] font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Member Portal • Daastaan-e-Pakistan</span>
                </span>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#123C2D] mt-1">
                  Khush Amdeed, {user?.name?.split(' ')[0] || 'Zoya'}
                </h1>
                <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
                  Your private dashboard for confirmed departures, verified storytellers, and concierge services.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Link
                  href="/experiences"
                  className="inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-gradient-to-r from-[#123C2D] via-[#164433] to-[#1E4D3B] text-white text-xs font-semibold hover:shadow-lg hover:shadow-[#123C2D]/20 transition-all duration-300 border border-white/10"
                >
                  <Compass className="w-4 h-4 text-[#B99550]" />
                  <span>Discover Journeys</span>
                </Link>
              </div>
            </div>

            {/* SECTION 1: MY JOURNEYS (Active & Upcoming Itineraries) */}
            {activeSection === 'itineraries' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-[#123C2D]">
                      Active Itineraries ({upcomingReservations.length})
                    </h3>
                    <p className="text-xs text-stone-500">
                      Confirmed departures with meeting locations, assigned local guides, and safety trackers.
                    </p>
                  </div>
                </div>

                {upcomingReservations.length === 0 ? (
                  <div className="backdrop-blur-xl bg-white/70 border border-white/60 rounded-3xl p-12 text-center space-y-4 shadow-sm">
                    <div className="w-16 h-16 rounded-2xl bg-stone-100/80 flex items-center justify-center mx-auto text-stone-400">
                      <Compass className="w-8 h-8" />
                    </div>
                    <div className="max-w-md mx-auto space-y-1">
                      <h4 className="font-serif text-xl font-bold text-[#123C2D]">
                        No Active Journeys Scheduled
                      </h4>
                      <p className="text-xs text-stone-500 leading-relaxed">
                        You do not have any upcoming tour departures. Explore our living heritage stories and reserve your next cultural journey through Pakistan.
                      </p>
                    </div>
                    <Link
                      href="/experiences"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#123C2D] text-white text-xs font-semibold hover:bg-[#123C2D]/90 transition shadow-md shadow-[#123C2D]/10"
                    >
                      <span>Discover Available Tours</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#B99550]" />
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* PRIMARY FEATURED EXPEDITION CARD (Glassmorphic Luxury Hero) */}
                    {primaryUpcoming && (
                      <div className="backdrop-blur-xl bg-white/80 border border-white/70 shadow-[0_12px_40px_0_rgba(18,60,45,0.06)] rounded-3xl overflow-hidden transition-all duration-300">
                        
                        {/* Status Bar with Emerald Gradient */}
                        <div className="bg-gradient-to-r from-[#123C2D] via-[#1A4B3A] to-[#123C2D] px-6 sm:px-8 py-3.5 text-white flex flex-wrap items-center justify-between gap-3 text-xs border-b border-[#B99550]/20">
                          <div className="flex items-center gap-2.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse ring-4 ring-emerald-400/20" />
                            <span className="font-serif uppercase tracking-wider text-[11px] text-[#B99550] font-bold">
                              Next Scheduled Departure
                            </span>
                            <span className="text-stone-400">•</span>
                            <span className="text-stone-200 font-mono text-[11px]">
                              Ref: {primaryUpcoming.bookingReference}
                            </span>
                          </div>
                          
                          <span className="px-3 py-1 rounded-full backdrop-blur-md bg-white/10 text-white font-semibold text-[10px] tracking-wide border border-white/20">
                            CONFIRMED &amp; PROTECTED
                          </span>
                        </div>

                        <div className="p-6 sm:p-8 space-y-6">
                          
                          {/* Title & Price Header */}
                          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-6 border-b border-stone-200/60">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2.5">
                                <TierBadge tier={primaryUpcoming.tier} />
                                <span className="text-xs text-stone-500 flex items-center gap-1">
                                  <MapPin className="w-3.5 h-3.5 text-[#B99550]" />
                                  {primaryUpcoming.city}, Pakistan
                                </span>
                              </div>
                              <h4 className="text-2xl sm:text-3xl font-serif font-bold text-[#123C2D]">
                                {primaryUpcoming.packageTitle}
                              </h4>
                            </div>

                            <div className="text-left md:text-right shrink-0">
                              <span className="text-[11px] text-stone-500 uppercase tracking-wider block">Total Fare Paid</span>
                              <span className="text-2xl sm:text-3xl font-serif font-bold text-[#123C2D]">
                                {formatPrice(primaryUpcoming.totalPricePkr, primaryUpcoming.currency)}
                              </span>
                              <span className="text-[11px] text-stone-500 block mt-0.5">
                                for {primaryUpcoming.partySize} {primaryUpcoming.partySize === 1 ? 'Guest' : 'Guests'} (All taxes included)
                              </span>
                            </div>
                          </div>

                          {/* Logistics Grid (Frosted Glass Sub-Cards) */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs">
                            <div className="flex items-center gap-3.5 p-4 rounded-2xl backdrop-blur-md bg-stone-50/80 border border-stone-200/60 shadow-sm">
                              <div className="w-10 h-10 rounded-xl bg-white border border-stone-200/80 flex items-center justify-center text-[#123C2D] shadow-sm shrink-0">
                                <Calendar className="w-5 h-5 text-[#B99550]" />
                              </div>
                              <div>
                                <span className="text-stone-400 block text-[10px] uppercase font-bold tracking-wider">Departure Date</span>
                                <span className="font-semibold text-stone-800 text-sm">
                                  {new Date(primaryUpcoming.startDate).toLocaleDateString('en-GB', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric',
                                  })}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-3.5 p-4 rounded-2xl backdrop-blur-md bg-stone-50/80 border border-stone-200/60 shadow-sm">
                              <div className="w-10 h-10 rounded-xl bg-white border border-stone-200/80 flex items-center justify-center text-[#123C2D] shadow-sm shrink-0">
                                <Users className="w-5 h-5 text-[#B99550]" />
                              </div>
                              <div>
                                <span className="text-stone-400 block text-[10px] uppercase font-bold tracking-wider">Party Size</span>
                                <span className="font-semibold text-stone-800 text-sm">
                                  {primaryUpcoming.partySize} {primaryUpcoming.partySize === 1 ? 'Person' : 'People'} (Private)
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-3.5 p-4 rounded-2xl backdrop-blur-md bg-stone-50/80 border border-stone-200/60 shadow-sm">
                              <div className="w-10 h-10 rounded-xl bg-white border border-stone-200/80 flex items-center justify-center text-emerald-600 shadow-sm shrink-0">
                                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                              </div>
                              <div>
                                <span className="text-stone-400 block text-[10px] uppercase font-bold tracking-wider">Safety Status</span>
                                <span className="font-mono text-emerald-700 font-semibold text-xs">
                                  Active &amp; Monitored
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Storyteller & Assembly Point Cards Side-by-Side */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            
                            {/* Assigned Guide Glass Card */}
                            <div className="p-5 rounded-2xl backdrop-blur-md bg-gradient-to-b from-white/90 to-stone-50/70 border border-stone-200/70 shadow-sm space-y-4">
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-[11px] uppercase tracking-wider font-bold text-stone-500">
                                  Assigned Local Storyteller
                                </span>
                                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-[10px] font-semibold flex items-center gap-1">
                                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                                  3-Point Verified
                                </span>
                              </div>

                              <div className="flex items-center gap-4">
                                <img
                                  src={primaryUpcoming.guide.avatarUrl}
                                  alt={primaryUpcoming.guide.name}
                                  className="w-14 h-14 rounded-full object-cover ring-2 ring-[#B99550]/40 shadow-sm"
                                />
                                <div className="min-w-0 flex-1">
                                  <h5 className="font-serif font-bold text-base text-[#123C2D]">
                                    {primaryUpcoming.guide.name}
                                  </h5>
                                  <p className="text-xs text-stone-500">
                                    Languages: {primaryUpcoming.guide.languages.join(', ')}
                                  </p>
                                  <div className="flex items-center gap-1.5 text-xs text-amber-600 font-semibold mt-0.5">
                                    <span>★ {primaryUpcoming.guide.rating}</span>
                                    <span className="text-stone-400 font-normal">• Licensed Cultural Historian</span>
                                  </div>
                                </div>
                              </div>

                              <a
                                href={`https://wa.me/${primaryUpcoming.guide.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(primaryUpcoming.guide.name)},%20I%20am%20confirmed%20for%20the%20${encodeURIComponent(primaryUpcoming.packageTitle)}%20(Ref:%20${primaryUpcoming.bookingReference}).`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition shadow-sm"
                              >
                                <MessageCircle className="w-4 h-4" />
                                <span>Connect with Storyteller on WhatsApp</span>
                              </a>
                            </div>

                            {/* Meeting Location Glass Card */}
                            <div className="p-5 rounded-2xl backdrop-blur-md bg-gradient-to-b from-white/90 to-stone-50/70 border border-stone-200/70 shadow-sm space-y-4 flex flex-col justify-between">
                              <div className="space-y-2">
                                <span className="text-[11px] uppercase tracking-wider font-bold text-stone-500 block">
                                  Designated Assembly Point
                                </span>
                                <div className="flex items-start gap-2.5">
                                  <MapPin className="w-4 h-4 text-[#B99550] shrink-0 mt-0.5" />
                                  <p className="text-xs font-bold text-stone-800 leading-snug">
                                    {primaryUpcoming.meetingPoint}
                                  </p>
                                </div>
                                <p className="text-[11px] text-stone-500 leading-relaxed">
                                  Please arrive 15 minutes prior to scheduled start. Your storyteller will be holding the official Daastaan-e-Pakistan heritage emblem.
                                </p>
                              </div>

                              <a
                                href={`https://maps.google.com/?q=${encodeURIComponent(primaryUpcoming.meetingPoint)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-xs font-semibold text-[#123C2D] hover:text-[#B99550] transition pt-3 border-t border-stone-200/60"
                              >
                                <span>Open Pin in Google Maps</span>
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            </div>

                          </div>

                          {/* Quick Actions Row */}
                          <div className="pt-4 border-t border-stone-200/60 flex flex-wrap items-center justify-between gap-3 text-xs">
                            <div className="flex items-center gap-2.5">
                              <button
                                type="button"
                                onClick={() => handleDownloadCalendar(primaryUpcoming)}
                                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl backdrop-blur-md bg-stone-100/90 hover:bg-stone-200 text-stone-700 font-semibold transition cursor-pointer border border-stone-200/60"
                              >
                                <Download className="w-3.5 h-3.5 text-stone-500" />
                                <span>Add to Calendar (.ICS)</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => setSelectedReceipt(primaryUpcoming)}
                                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl backdrop-blur-md bg-stone-100/90 hover:bg-stone-200 text-stone-700 font-semibold transition cursor-pointer border border-stone-200/60"
                              >
                                <FileText className="w-3.5 h-3.5 text-stone-500" />
                                <span>Tax Invoice &amp; Voucher</span>
                              </button>
                            </div>

                            <Link
                              href={`/tours/${primaryUpcoming.packageSlug}`}
                              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#123C2D] to-[#1E4D3B] text-white font-semibold hover:shadow-md hover:shadow-[#123C2D]/20 transition"
                            >
                              <span>Full Tour Details</span>
                              <ChevronRight className="w-4 h-4 text-[#B99550]" />
                            </Link>
                          </div>

                        </div>
                      </div>
                    )}

                    {/* Secondary Upcoming Tours (If any) */}
                    {secondaryUpcoming.map((res) => (
                      <div
                        key={res.id}
                        className="backdrop-blur-xl bg-white/75 border border-white/70 shadow-sm rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <TierBadge tier={res.tier} />
                            <span className="text-[11px] font-mono text-stone-400">Ref: {res.bookingReference}</span>
                          </div>
                          <h5 className="font-serif font-bold text-base text-[#123C2D]">{res.packageTitle}</h5>
                          <p className="text-xs text-stone-500">
                            Departure: {res.startDate} • {res.partySize} Guests • Guide: {res.guide.name}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedReceipt(res)}
                            className="px-3 py-1.5 rounded-xl border border-stone-300 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition"
                          >
                            Receipt
                          </button>
                          <Link
                            href={`/tours/${res.packageSlug}`}
                            className="px-4 py-1.5 rounded-xl bg-[#123C2D] text-white text-xs font-semibold hover:bg-[#123C2D]/90 transition"
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
                  <h3 className="text-xl font-serif font-bold text-[#123C2D]">
                    Journey Archive &amp; Invoices ({pastReservations.length})
                  </h3>
                  <p className="text-xs text-stone-500">
                    A permanent record of your completed cultural journeys with official tax invoices and review histories.
                  </p>
                </div>

                <div className="space-y-4">
                  {pastReservations.map((res) => (
                    <div
                      key={res.id}
                      className="backdrop-blur-xl bg-white/75 border border-white/70 shadow-[0_8px_30px_0_rgba(18,60,45,0.04)] rounded-3xl p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all duration-300 hover:shadow-lg hover:border-[#B99550]/40"
                    >
                      <div className="flex items-start gap-4">
                        <img
                          src={res.image}
                          alt={res.packageTitle}
                          className="w-24 h-24 rounded-2xl object-cover ring-2 ring-stone-200/80 shadow-sm shrink-0"
                        />
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600 text-[10px] font-bold uppercase tracking-wider">
                              Completed Experience
                            </span>
                            <span className="text-xs text-stone-400 font-mono">Ref: {res.bookingReference}</span>
                          </div>
                          <h4 className="font-serif font-bold text-lg sm:text-xl text-[#123C2D]">
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

                      <div className="flex flex-wrap md:flex-col items-stretch gap-2.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => setSelectedReceipt(res)}
                          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl backdrop-blur-md bg-stone-100/90 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition border border-stone-200/60 cursor-pointer"
                        >
                          <FileText className="w-3.5 h-3.5 text-stone-600" />
                          <span>Tax Invoice (PDF)</span>
                        </button>

                        <Link
                          href={`/tours/${res.packageSlug}`}
                          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#123C2D] to-[#1E4D3B] hover:from-[#0E3024] hover:to-[#164433] text-white text-xs font-semibold transition shadow-sm"
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
                  <h3 className="text-xl font-serif font-bold text-[#123C2D]">
                    Universal Safety &amp; Emergency Response
                  </h3>
                  <p className="text-xs text-stone-500">
                    Your next-of-kin emergency contact information is encrypted and only referenced by our 24/7 security dispatch in urgent circumstances.
                  </p>
                </div>

                {/* Hotlines Banner (Deep Forest Emerald Glass) */}
                <div className="backdrop-blur-xl bg-gradient-to-br from-[#123C2D] via-[#10382B] to-[#0A241B] text-white rounded-3xl p-7 shadow-xl border border-white/10 space-y-5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#B99550]/10 rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-2.5">
                      <LifeBuoy className="w-5 h-5 text-[#B99550]" />
                      <span className="font-serif font-bold text-base tracking-wide">
                        Daastaan 24/7 Universal Safety Helpline
                      </span>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold tracking-wider uppercase border border-emerald-500/30">
                      Always Active
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                    <div className="space-y-1">
                      <span className="text-stone-400 block text-[11px]">Primary Tour Emergency Desk:</span>
                      <a href="tel:+923324541952" className="text-lg font-serif font-bold text-[#B99550] hover:underline">
                        +92 332 4541952
                      </a>
                    </div>
                    <div className="space-y-1">
                      <span className="text-stone-400 block text-[11px]">Secondary Safety WhatsApp:</span>
                      <a href="https://wa.me/923008492551" target="_blank" rel="noopener noreferrer" className="text-lg font-serif font-bold text-[#B99550] hover:underline">
                        +92 300 8492551
                      </a>
                    </div>
                  </div>
                </div>

                {/* Emergency Contact Form (Frosted Glass Panel) */}
                <div className="backdrop-blur-xl bg-white/80 border border-white/70 shadow-sm rounded-3xl p-7 space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif font-bold text-lg text-[#123C2D]">
                      Next-of-Kin Emergency Details
                    </h4>
                    <span className="inline-flex items-center gap-1.5 text-xs text-stone-500 bg-stone-100 px-3 py-1 rounded-full">
                      <Lock className="w-3.5 h-3.5 text-stone-400" />
                      AES-256 Protected
                    </span>
                  </div>

                  <form onSubmit={handleSaveEmergency} className="space-y-5 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block font-semibold text-stone-700 mb-1.5">
                          Emergency Contact Full Name
                        </label>
                        <input
                          type="text"
                          value={emergencyName}
                          onChange={(e) => setEmergencyName(e.target.value)}
                          placeholder="e.g. Farhan Khan"
                          className="w-full px-4 py-3 rounded-2xl bg-stone-50/60 border border-stone-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#B99550]/40 focus:border-[#123C2D] transition"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-stone-700 mb-1.5">
                          Relationship to You
                        </label>
                        <input
                          type="text"
                          value={emergencyRelation}
                          onChange={(e) => setEmergencyRelation(e.target.value)}
                          placeholder="e.g. Spouse / Brother / Parent"
                          className="w-full px-4 py-3 rounded-2xl bg-stone-50/60 border border-stone-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#B99550]/40 focus:border-[#123C2D] transition"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-stone-700 mb-1.5">
                          24/7 Telephone Number
                        </label>
                        <input
                          type="tel"
                          value={emergencyPhone}
                          onChange={(e) => setEmergencyPhone(e.target.value)}
                          placeholder="e.g. +44 7700 900889"
                          className="w-full px-4 py-3 rounded-2xl bg-stone-50/60 border border-stone-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#B99550]/40 focus:border-[#123C2D] transition"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-stone-700 mb-1.5">
                          Emergency WhatsApp Number
                        </label>
                        <input
                          type="tel"
                          value={emergencyWhatsapp}
                          onChange={(e) => setEmergencyWhatsapp(e.target.value)}
                          placeholder="e.g. +44 7700 900889"
                          className="w-full px-4 py-3 rounded-2xl bg-stone-50/60 border border-stone-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#B99550]/40 focus:border-[#123C2D] transition"
                        />
                      </div>
                    </div>

                    <div className="pt-3 flex justify-end">
                      <button
                        type="submit"
                        className="px-6 py-3 rounded-2xl bg-[#123C2D] text-white font-semibold hover:bg-[#123C2D]/90 transition shadow-sm cursor-pointer"
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
                  <h3 className="text-xl font-serif font-bold text-[#123C2D]">
                    Personal Profile &amp; Dietary Preferences
                  </h3>
                  <p className="text-xs text-stone-500">
                    Help your storytellers tailor culinary stops, walking paces, and hospitality amenities to your exact preferences.
                  </p>
                </div>

                <div className="backdrop-blur-xl bg-white/80 border border-white/70 shadow-sm rounded-3xl p-7 space-y-7">
                  <form onSubmit={handleSaveProfile} className="space-y-7 text-xs">
                    
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                      <div>
                        <label className="block font-semibold text-stone-700 mb-1.5">Full Legal Name</label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-4 py-3 rounded-2xl bg-stone-50/60 border border-stone-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#B99550]/40 focus:border-[#123C2D] transition"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-stone-700 mb-1.5">Contact Phone</label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-4 py-3 rounded-2xl bg-stone-50/60 border border-stone-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#B99550]/40 focus:border-[#123C2D] transition"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-stone-700 mb-1.5">Country of Residence</label>
                        <input
                          type="text"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          className="w-full px-4 py-3 rounded-2xl bg-stone-50/60 border border-stone-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#B99550]/40 focus:border-[#123C2D] transition"
                        />
                      </div>
                    </div>

                    {/* Dietary Requirements */}
                    <div className="space-y-3 pt-3 border-t border-stone-200/60">
                      <div className="flex items-center gap-2">
                        <Utensils className="w-4 h-4 text-[#B99550]" />
                        <label className="font-semibold text-stone-800 text-sm">
                          Dietary Restrictions &amp; Food Preferences
                        </label>
                      </div>
                      <p className="text-xs text-stone-500">
                        Select your dietary requirements so street food trails, royal dinners, and refreshments are customized for you.
                      </p>

                      <div className="flex flex-wrap gap-2.5 pt-1">
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
                              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                                isSelected
                                  ? 'bg-gradient-to-r from-[#123C2D] to-[#1E4D3B] text-white shadow-md shadow-[#123C2D]/20 border border-white/20'
                                  : 'backdrop-blur-sm bg-stone-100/80 text-stone-700 border border-stone-200/70 hover:bg-white'
                              }`}
                            >
                              {item}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Mobility Notes */}
                    <div className="space-y-2 pt-3 border-t border-stone-200/60">
                      <label className="block font-semibold text-stone-800 text-sm">
                        Mobility, Walking Pace &amp; Accessibility Notes
                      </label>
                      <textarea
                        rows={2}
                        value={mobility}
                        onChange={(e) => setMobility(e.target.value)}
                        placeholder="e.g. Comfortable with walking tours; prefer shaded rest stops every 45 minutes."
                        className="w-full px-4 py-3 rounded-2xl bg-stone-50/60 border border-stone-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#B99550]/40 focus:border-[#123C2D] transition"
                      />
                    </div>

                    {/* Patron Benefits & Privileges */}
                    <div className="p-5 rounded-2xl backdrop-blur-md bg-stone-50/80 border border-stone-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <span className="font-serif font-bold text-base text-[#123C2D]">
                          Patron Invitation Code: {user?.referralCode || 'ZOYA-PK26'}
                        </span>
                        <p className="text-xs text-stone-500">
                          Share with friends and family to extend them VIP heritage passes and storyteller upgrades.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={handleCopyReferral}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-stone-300 bg-white text-xs font-semibold text-stone-700 hover:bg-stone-50 transition cursor-pointer shadow-sm"
                      >
                        {copiedReferral ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedReferral ? 'Copied' : 'Copy Code'}</span>
                      </button>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        type="submit"
                        className="px-6 py-3 rounded-2xl bg-[#123C2D] text-white font-semibold hover:bg-[#123C2D]/90 transition shadow-sm cursor-pointer"
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
                  <h3 className="text-xl font-serif font-bold text-[#123C2D]">
                    Private Concierge &amp; Bespoke Excursions
                  </h3>
                  <p className="text-xs text-stone-500">
                    Our dedicated Lahore concierge desk is at your disposal for bespoke excursions, private transport, and special access.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* WhatsApp Desk Glass Card */}
                  <div className="backdrop-blur-xl bg-gradient-to-br from-white/90 via-white/80 to-[#FAF6ED]/70 border border-white/80 shadow-[0_8px_32px_0_rgba(18,60,45,0.06)] rounded-3xl p-7 space-y-5 flex flex-col justify-between hover:border-[#B99550]/50 transition-all duration-300">
                    <div className="space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-sm">
                        <MessageCircle className="w-6 h-6" />
                      </div>
                      <h4 className="font-serif font-bold text-lg text-[#123C2D]">
                        Direct Concierge WhatsApp
                      </h4>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        Speak directly with a senior Daastaan travel designer for instant itinerary customization, dietary accommodations, or flight arrival coordination.
                      </p>
                    </div>

                    <a
                      href="https://wa.me/923324541952?text=Hello%20Daastaan%20Concierge,%20I%20am%20a%20member%20and%20would%20like%20assistance%20with%20my%20travel%20plans."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition shadow-md shadow-emerald-600/20"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Start WhatsApp Conversation</span>
                    </a>
                  </div>

                  {/* Email Support Glass Card */}
                  <div className="backdrop-blur-xl bg-gradient-to-br from-white/90 via-white/80 to-[#FAF6ED]/70 border border-white/80 shadow-[0_8px_32px_0_rgba(18,60,45,0.06)] rounded-3xl p-7 space-y-5 flex flex-col justify-between hover:border-[#B99550]/50 transition-all duration-300">
                    <div className="space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-stone-100 text-[#123C2D] flex items-center justify-center shadow-sm">
                        <Mail className="w-6 h-6 text-[#B99550]" />
                      </div>
                      <h4 className="font-serif font-bold text-lg text-[#123C2D]">
                        VIP Email Dispatch
                      </h4>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        For multi-city private itineraries across Hunza, Skardu, Islamabad, or curated culinary galas. Guaranteed reply within 4 hours.
                      </p>
                    </div>

                    <a
                      href="mailto:info@daastaanpakistan.com?subject=VIP%20Member%20Concierge%20Request"
                      className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-stone-100 hover:bg-stone-200 text-[#123C2D] text-xs font-semibold transition border border-stone-200"
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
      {/* OFFICIAL TAX INVOICE MODAL (Ultra Frosted Glass)               */}
      {/* ============================================================== */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="backdrop-blur-2xl bg-white/95 max-w-2xl w-full rounded-3xl shadow-2xl border border-white/70 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Top Header */}
            <div className="bg-[#123C2D] text-white px-7 py-4.5 flex items-center justify-between border-b border-[#B99550]/30">
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-[#B99550]" />
                <span className="font-serif font-bold text-sm tracking-wide">
                  Official Travel Tax Invoice &amp; Voucher
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedReceipt(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition cursor-pointer"
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
                    Daastaan Tourism &amp; Cultural Ventures Pvt. Ltd.<br />
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
                    <td className="py-2.5 text-stone-600">Universal Safety Layer &amp; GPS SOS Dispatch</td>
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
                    className="px-5 py-2 rounded-xl bg-[#123C2D] text-white text-xs font-semibold hover:bg-[#123C2D]/90 transition cursor-pointer"
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
