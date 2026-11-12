'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { TierBadge } from '@/components/ui/tier-badge';
import { StarRating } from '@/components/ui/star-rating';
import { formatPrice } from '@/lib/currency';
import { LAHORE_PACKAGE_DETAILS } from '@/lib/lahore-packages';
import {
  Clock,
  Users,
  MapPin,
  Check,
  X,
  ShieldCheck,
  Calendar,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Maximize2,
} from 'lucide-react';

interface ItineraryItem {
  time?: string;
  title: string;
  description: string;
  estimatedDuration?: string;
}

interface PackageDetailData {
  id: string;
  slug: string;
  title: string;
  tier: string;
  city: { name: string; slug: string };
  durationHours?: number;
  durationDays?: number;
  minParty: number;
  maxParty: number;
  basePricePkr: number; // in paisa
  rating: number;
  reviewCount: number;
  description: string;
  images: string[];
  included: string[];
  excluded: string[];
  itinerary: {
    day: number;
    title: string;
    activities: ItineraryItem[];
  }[];
  guide: {
    name: string;
    gender: string;
    avatarUrl: string;
    rating: number;
    reviewCount: number;
    languages: string[];
    specialities: string[];
    bio: string;
  };
}

interface ExperienceTheme {
  backdropFrom: string;
  backdropVia: string;
  backdropTo: string;
  accentHex: string;
  glowRgba: string;
  ctaBg: string;
  ctaText: string;
  moodLabel: string;
}

function getExperienceTheme(tier: string, slug: string): ExperienceTheme {
  const s = slug.toLowerCase();
  if (s.includes('night') || s.includes('qawwali')) {
    return {
      backdropFrom: '#070B14',
      backdropVia: '#111827',
      backdropTo: '#090D16',
      accentHex: '#F59E0B',
      glowRgba: 'rgba(245, 158, 11, 0.22)',
      ctaBg: 'linear-gradient(135deg, #D97706 0%, #F59E0B 100%)',
      ctaText: '#090D16',
      moodLabel: 'After-Dark Lantern Atmosphere',
    };
  }
  if (tier === 'FOOD' || s.includes('food') || s.includes('cook')) {
    return {
      backdropFrom: '#1C0F08',
      backdropVia: '#2B160C',
      backdropTo: '#140A05',
      accentHex: '#E69F45',
      glowRgba: 'rgba(230, 159, 69, 0.22)',
      ctaBg: 'linear-gradient(135deg, #B99550 0%, #E69F45 100%)',
      ctaText: '#140A05',
      moodLabel: 'Culinary & Spice Heritage',
    };
  }
  if (tier === 'SPIRITUAL' || s.includes('sufi') || s.includes('nankana') || s.includes('kasur')) {
    return {
      backdropFrom: '#160E1E',
      backdropVia: '#22152E',
      backdropTo: '#0F0A15',
      accentHex: '#E0A96D',
      glowRgba: 'rgba(224, 169, 109, 0.22)',
      ctaBg: 'linear-gradient(135deg, #B99550 0%, #E0A96D 100%)',
      ctaText: '#0F0A15',
      moodLabel: 'Sacred & Mystical Journey',
    };
  }
  if (tier === 'SIGNATURE' || s.includes('shaam-e-mughal') || s.includes('honeymoon')) {
    return {
      backdropFrom: '#0A1F17',
      backdropVia: '#123C2D',
      backdropTo: '#071711',
      accentHex: '#D4AF6E',
      glowRgba: 'rgba(212, 175, 110, 0.26)',
      ctaBg: 'linear-gradient(135deg, #B99550 0%, #E5C585 100%)',
      ctaText: '#071711',
      moodLabel: 'Royal Signature Collection',
    };
  }
  if (tier === 'NATURE' || tier === 'SPORTS') {
    return {
      backdropFrom: '#081C18',
      backdropVia: '#0F2E28',
      backdropTo: '#061411',
      accentHex: '#D4AF6E',
      glowRgba: 'rgba(110, 231, 183, 0.16)',
      ctaBg: 'linear-gradient(135deg, #B99550 0%, #D4AF6E 100%)',
      ctaText: '#061411',
      moodLabel: 'Open-Air Expedition',
    };
  }
  if (tier === 'ARTS' || tier === 'LIFESTYLE' || tier === 'CORPORATE') {
    return {
      backdropFrom: '#161316',
      backdropVia: '#231E22',
      backdropTo: '#0F0D0F',
      accentHex: '#D4AF6E',
      glowRgba: 'rgba(212, 175, 110, 0.20)',
      ctaBg: 'linear-gradient(135deg, #B99550 0%, #D4AF6E 100%)',
      ctaText: '#0F0D0F',
      moodLabel: 'Curated Cultural Lifestyle',
    };
  }
  return {
    backdropFrom: '#0A2418',
    backdropVia: '#123C2D',
    backdropTo: '#081B12',
    accentHex: '#B99550',
    glowRgba: 'rgba(185, 149, 80, 0.22)',
    ctaBg: 'linear-gradient(135deg, #B99550 0%, #D4AF6E 100%)',
    ctaText: '#081B12',
    moodLabel: 'Living Heritage Story',
  };
}

const SAMPLE_DETAILS: Record<string, PackageDetailData> = {
  'lahore-walled-city-heritage-walk': {
    id: 'pkg_1',
    slug: 'lahore-walled-city-heritage-walk',
    title: 'Walled City Heritage Walk — 2,000 Years of Lahore',
    tier: 'CULTURAL',
    city: { name: 'Lahore', slug: 'lahore' },
    durationHours: 4,
    minParty: 1,
    maxParty: 8,
    basePricePkr: 500000, // PKR 5,000
    rating: 4.9,
    reviewCount: 47,
    description:
      'Step inside the historic gates of Lahore’s ancient Walled City (Androon Lahore) and journey through Mughal, Sikh, and colonial epochs. Walk through narrow brick lanes where spice merchants, calligraphers, and copper craftsmen have worked for centuries. Marvel at the intricate Persian tilework of Wazir Khan Mosque, explore the courtyards of the UNESCO-listed Lahore Fort, and conclude with authentic pink Kashmiri chai at a 100-year-old teahouse.',
    images: [
      'https://images.unsplash.com/photo-1598890777032-bde835ba27c2?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=1200&auto=format&fit=crop',
    ],
    included: [
      'Certified local historian guide (4 hours)',
      'Entry tickets to Wazir Khan Mosque & Shahi Hammam',
      'Entry tickets to Lahore Fort (Shahi Qila)',
      'Traditional tea & local sweets at 100-year-old teahouse',
      'Printed cultural heritage map of the Walled City',
      'Universal Safety Layer: GPS tracking & emergency SOS',
    ],
    excluded: [
      'Personal shopping or souvenirs',
      'Hotel pickup & drop-off (available as optional add-on at checkout)',
      'Gratuities for your guide',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Androon Lahore Discovery Walk',
        activities: [
          {
            time: '08:30',
            title: 'Meet at Delhi Gate',
            description:
              'Gather at the historic Delhi Gate with your certified storyteller for a cultural briefing and safety check-in.',
            estimatedDuration: '15 min',
          },
          {
            time: '08:45',
            title: 'Shahi Hammam & Bazaar Walk',
            description:
              'Explore the 17th-century Mughal royal bathhouse and wind through historic spice and copper bazaars.',
            estimatedDuration: '60 min',
          },
          {
            time: '09:45',
            title: 'Wazir Khan Mosque',
            description:
              'Admire the finest kashi-kari Persian tilework in South Asia and hear the stories of Mughal artisans.',
            estimatedDuration: '45 min',
          },
          {
            time: '10:45',
            title: 'Lahore Fort (Shahi Qila)',
            description:
              'Walk through Sheesh Mahal, Alamgiri Gate, and royal courtyards overlooking Badshahi Mosque.',
            estimatedDuration: '90 min',
          },
          {
            time: '12:15',
            title: 'Pink Kashmiri Chai Finale',
            description:
              'Conclude at a century-old teahouse in the Walled City with traditional tea and local sweets.',
            estimatedDuration: '30 min',
          },
        ],
      },
    ],
    guide: {
      name: 'Tariq Mehmood',
      gender: 'Male',
      avatarUrl:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
      rating: 4.9,
      reviewCount: 47,
      languages: ['English', 'Urdu', 'Punjabi'],
      specialities: ['Mughal Architecture', 'Walled City History', 'Street Photography'],
      bio: 'Third-generation Lahorite with over 12 years uncovering the oral histories of Androon Lahore. Police cleared and certified by Punjab Tourism.',
    },
  },
};

const cardReveal = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function PackageDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const pkg =
    LAHORE_PACKAGE_DETAILS[resolvedParams.slug] ||
    SAMPLE_DETAILS[resolvedParams.slug] ||
    SAMPLE_DETAILS['lahore-walled-city-heritage-walk'];

  const theme = getExperienceTheme(pkg.tier, pkg.slug);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [partySize, setPartySize] = useState(2);
  const [selectedCurrency, setSelectedCurrency] = useState<'USD' | 'GBP'>('USD');

  const activeImage = pkg.images[activeImageIndex] || pkg.images[0];

  // Tour dates setup (Single or Multi-day)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  const defaultEnd = new Date(tomorrow);
  if (pkg.durationDays && pkg.durationDays > 1) {
    defaultEnd.setDate(defaultEnd.getDate() + (pkg.durationDays - 1));
  }
  const defaultEndStr = defaultEnd.toISOString().split('T')[0];

  const [startDate, setStartDate] = useState(tomorrowStr);
  const [endDate, setEndDate] = useState(defaultEndStr);

  const calcDays = () => {
    if (!startDate || !endDate) return 1;
    const s = new Date(startDate);
    const e = new Date(endDate);
    const diff = Math.round((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    return Math.max(1, diff);
  };
  const totalDays = calcDays();

  const durationText = pkg.durationDays
    ? `${pkg.durationDays} ${pkg.durationDays === 1 ? 'Day' : 'Days'}`
    : `${pkg.durationHours || 4} Hours`;

  return (
    <div
      className="relative min-h-screen flex flex-col font-sans overflow-x-clip"
      style={{
        background: `linear-gradient(180deg, ${theme.backdropFrom} 0%, ${theme.backdropVia} 50%, ${theme.backdropTo} 100%)`,
      }}
    >
      {/* ── Full-Viewport Ambient Experience Background ── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeImage}
            src={activeImage}
            alt=""
            aria-hidden="true"
            initial={{ opacity: 0, scale: 1.12 }}
            animate={{ opacity: 0.42, scale: 1.08 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full object-cover blur-2xl saturate-125 will-change-transform"
          />
        </AnimatePresence>

        {/* Dynamic atmospheric scrim & radial spotlight */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 25% 20%, ${theme.glowRgba} 0%, transparent 55%), linear-gradient(180deg, rgba(8,14,12,0.55) 0%, rgba(8,14,12,0.72) 45%, ${theme.backdropTo}E8 100%)`,
          }}
        />
      </div>

      {/* ── Header ── */}
      <div className="relative z-30">
        <Header />
      </div>

      {/* ── Full-Bleed Cinematic Experience Hero ── */}
      <section className="relative z-10 w-full min-h-[54vh] sm:min-h-[60vh] flex items-end overflow-hidden border-b border-white/10">
        {/* Sharp Hero Photo with lazy blur-up & subtle Ken Burns motion */}
        <div className="absolute inset-0">
          {!heroLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/10 to-transparent animate-pulse" />
          )}
          <AnimatePresence mode="wait">
            <motion.img
              key={activeImage}
              src={activeImage}
              alt={pkg.title}
              loading="eager"
              onLoad={() => setHeroLoaded(true)}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: heroLoaded ? 1 : 0.85, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>

          {/* Editorial dark gradient overlay for crisp text legibility */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, rgba(8,14,12,0.35) 0%, rgba(8,14,12,0.28) 38%, rgba(8,14,12,0.82) 78%, ${theme.backdropFrom} 100%)`,
            }}
          />
        </div>

        {/* Hero Foreground Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-10 pb-10 sm:pb-12">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center gap-2 text-xs text-white/75 mb-5"
          >
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-white/40" />
            <Link href="/explore" className="hover:text-white transition-colors">Tours</Link>
            <ChevronRight className="w-3 h-3 text-white/40" />
            <Link href={`/explore/${pkg.city.slug}`} className="hover:text-white transition-colors">
              {pkg.city.name}
            </Link>
            <ChevronRight className="w-3 h-3 text-white/40" />
            <span className="text-[#E5C585] font-semibold truncate max-w-xs">{pkg.title}</span>
          </motion.nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4 max-w-3xl"
            >
              {/* Mood & Metadata Pills */}
              <div className="flex flex-wrap items-center gap-2">
                <TierBadge tier={pkg.tier} />
                <span className="text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[#FDE68A] border border-white/20 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  {theme.moodLabel}
                </span>
                <span className="text-xs bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 text-white/90 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#E5C585]" />
                  {pkg.city.name}
                </span>
                <span className="text-xs bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 text-white/90 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#E5C585]" />
                  {durationText}
                </span>
                <span className="text-xs bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 text-white/90 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#E5C585]" />
                  {pkg.minParty}–{pkg.maxParty} guests
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-[52px] font-bold text-white leading-[1.12] tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)]">
                {pkg.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 pt-1">
                <div className="bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
                  <StarRating rating={pkg.rating} reviewCount={pkg.reviewCount} showNumber size="md" />
                </div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-300 font-semibold bg-emerald-950/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-emerald-400/30">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Universal Safety Protected</span>
                </div>
                <button
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                  className="inline-flex items-center gap-1.5 text-xs text-white/90 hover:text-white bg-black/40 hover:bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 transition cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-[#E5C585]" />
                  <span>View Full Photo</span>
                </button>
              </div>
            </motion.div>

            {/* Floating Gallery Switcher */}
            {pkg.images.length > 1 && (
              <div className="flex items-center gap-2.5 bg-black/40 backdrop-blur-xl p-2 rounded-2xl border border-white/15 self-start lg:self-end">
                {pkg.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-12 rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-[#E5C585] shadow-lg scale-105'
                        : 'border-transparent opacity-65 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`View ${idx + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Main Content Over Frosted Ambient Backdrop ── */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          {/* Left Column: Smoked Glass Editorial Cards */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview Section */}
            <motion.div
              variants={cardReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="bg-black/55 backdrop-blur-2xl rounded-2xl p-6 sm:p-8 border border-white/15 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.55)] space-y-4"
            >
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#E5C585]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Story</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Experience Overview
              </h2>
              <p className="text-[#FAF6ED]/85 leading-relaxed text-sm sm:text-base">
                {pkg.description}
              </p>
            </motion.div>

            {/* Included & Excluded */}
            <motion.div
              variants={cardReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="bg-black/55 backdrop-blur-2xl rounded-2xl p-6 sm:p-8 border border-white/15 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.55)] space-y-6"
            >
              <h2 className="font-serif text-2xl font-bold text-white">
                What&apos;s Included &amp; Excluded
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3 bg-white/10 rounded-xl p-5 border border-emerald-400/20">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Included in Tour</span>
                  </h3>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-[#FAF6ED]/90">
                    {pkg.included.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3 bg-white/10 rounded-xl p-5 border border-rose-400/20">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-rose-300 flex items-center gap-1.5">
                    <X className="w-4 h-4 text-rose-400" />
                    <span>Not Included</span>
                  </h3>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-[#FAF6ED]/85">
                    {pkg.excluded.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Itinerary Timeline */}
            <motion.div
              variants={cardReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="bg-black/55 backdrop-blur-2xl rounded-2xl p-6 sm:p-8 border border-white/15 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.55)] space-y-6"
            >
              <h2 className="font-serif text-2xl font-bold text-white">
                Tour Itinerary
              </h2>

              {pkg.itinerary.map((dayPlan, dayIdx) => (
                <div key={dayIdx} className="space-y-4">
                  {pkg.itinerary.length > 1 && (
                    <div className="text-sm font-bold text-[#E5C585] uppercase tracking-wider">
                      Day {dayPlan.day} — {dayPlan.title}
                    </div>
                  )}

                  <div className="relative border-l-2 border-[#B99550]/60 pl-6 space-y-6 ml-2">
                    {dayPlan.activities.map((act, actIdx) => (
                      <div key={actIdx} className="relative group">
                        <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-[#E5C585] border-2 border-[#0A2418] ring-2 ring-[#E5C585]/30 group-hover:scale-125 transition-transform" />

                        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                          {act.time && (
                            <span className="text-xs font-bold text-[#E5C585] uppercase tracking-wider shrink-0">
                              {act.time}
                            </span>
                          )}
                          <h4 className="font-serif text-base font-bold text-white">
                            {act.title}
                          </h4>
                          {act.estimatedDuration && (
                            <span className="text-[11px] text-[#FAF6ED]/65 font-medium">
                              ({act.estimatedDuration})
                            </span>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-[#FAF6ED]/80 mt-1 leading-relaxed">
                          {act.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Guide Profile Card */}
            <motion.div
              variants={cardReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="bg-black/55 backdrop-blur-2xl rounded-2xl p-6 sm:p-8 border border-white/15 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.55)] space-y-5"
            >
              <div className="flex items-center justify-between border-b border-white/15 pb-4">
                <h2 className="font-serif text-2xl font-bold text-white">
                  Your Verified Local Storyteller
                </h2>
                <span className="text-xs font-semibold text-emerald-300 bg-emerald-950/70 px-3 py-1 rounded-full border border-emerald-400/30">
                  100% Vetted Guide
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-start gap-5">
                <img
                  src={pkg.guide.avatarUrl}
                  alt={pkg.guide.name}
                  loading="lazy"
                  className="w-20 h-20 rounded-full object-cover border-2 border-[#E5C585] shadow-md shrink-0"
                />

                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-serif text-lg font-bold text-white">
                      {pkg.guide.name}
                    </h3>
                    <span className="text-xs bg-emerald-950/70 text-emerald-300 border border-emerald-400/30 px-2.5 py-0.5 rounded-full font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      CNIC &amp; Police Verified
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-[#FAF6ED]/80">
                    <StarRating rating={pkg.guide.rating} reviewCount={pkg.guide.reviewCount} showNumber size="sm" />
                    <span>•</span>
                    <span>Speaks: {pkg.guide.languages.join(', ')}</span>
                  </div>

                  <p className="text-xs text-[#FAF6ED]/80 leading-relaxed pt-1">
                    {pkg.guide.bio}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {pkg.guide.specialities.map((s, i) => (
                      <span key={i} className="text-[11px] bg-white/10 text-[#FAF6ED]/90 px-2.5 py-0.5 rounded-full border border-white/15">
                        #{s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Sticky Glassmorphic Booking Concierge */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="sticky top-24 bg-white/95 backdrop-blur-2xl rounded-2xl p-6 border border-[#B99550]/45 shadow-[0_24px_64px_-12px_rgba(0,0,0,0.55)] space-y-5"
            >
              {/* Currency Selector */}
              <div className="space-y-1.5 pb-3 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    Select Currency
                  </span>
                  <span className="text-[10px] text-gray-400">USD or GBP only</span>
                </div>
                <div className="grid grid-cols-2 gap-2 bg-[#FAF6ED] p-1 rounded-xl border border-[#B99550]/20">
                  <button
                    type="button"
                    onClick={() => setSelectedCurrency('USD')}
                    className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      selectedCurrency === 'USD'
                        ? 'bg-[#123C2D] text-[#FAF6ED] shadow-sm'
                        : 'text-gray-700 hover:text-[#123C2D]'
                    }`}
                  >
                    <span>USD</span>
                    <span className="text-[10px] opacity-80">($)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedCurrency('GBP')}
                    className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      selectedCurrency === 'GBP'
                        ? 'bg-[#123C2D] text-[#FAF6ED] shadow-sm'
                        : 'text-gray-700 hover:text-[#123C2D]'
                    }`}
                  >
                    <span>GBP</span>
                    <span className="text-[10px] opacity-80">(£)</span>
                  </button>
                </div>
              </div>

              {/* Price Header */}
              <div className="space-y-1 pb-4 border-b border-gray-100">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Experience Price
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-3xl font-bold text-[#123C2D]">
                    {formatPrice(pkg.basePricePkr * partySize, selectedCurrency)}
                  </span>
                  <span className="text-xs text-gray-500">
                    total for {partySize} {partySize === 1 ? 'guest' : 'guests'}
                  </span>
                </div>
                <div className="text-[11px] text-gray-500">
                  ({formatPrice(pkg.basePricePkr, selectedCurrency)} per guest)
                </div>
              </div>

              {/* Tour Start & End Date */}
              <div className="space-y-2.5 pb-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#B99550]" />
                    <span>Tour Schedule</span>
                  </label>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#123C2D]/10 text-[#123C2D]">
                    {totalDays === 1 ? 'Single Day Tour' : `${totalDays} Days Multi-Day`}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-gray-500">Start Date</span>
                    <input
                      type="date"
                      value={startDate}
                      min={tomorrowStr}
                      onChange={(e) => {
                        const newStart = e.target.value;
                        setStartDate(newStart);
                        if (new Date(endDate) < new Date(newStart)) {
                          setEndDate(newStart);
                        }
                      }}
                      className="w-full text-xs border border-gray-300 rounded-lg px-2.5 py-1.5 bg-white text-gray-800 focus:outline-none focus:border-[#B99550]"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-gray-500">End Date</span>
                    <input
                      type="date"
                      value={endDate}
                      min={startDate || tomorrowStr}
                      onChange={(e) => {
                        const newEnd = e.target.value;
                        if (new Date(newEnd) >= new Date(startDate)) {
                          setEndDate(newEnd);
                        }
                      }}
                      className="w-full text-xs border border-gray-300 rounded-lg px-2.5 py-1.5 bg-white text-gray-800 focus:outline-none focus:border-[#B99550]"
                    />
                  </div>
                </div>

                <p className="text-[10px] text-gray-500">
                  {totalDays === 1
                    ? 'Same-day return itinerary'
                    : `Multi-day expedition from ${startDate} to ${endDate}`}
                </p>
              </div>

              {/* Guest Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                  Select Number of Guests
                </label>
                <div className="flex items-center justify-between border border-gray-200 rounded-lg p-2 bg-gray-50">
                  <button
                    type="button"
                    onClick={() => setPartySize(Math.max(1, partySize - 1))}
                    className="w-8 h-8 rounded-md bg-white border border-gray-200 flex items-center justify-center font-bold text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="text-sm font-bold text-[#123C2D]">
                    {partySize} {partySize === 1 ? 'Person' : 'People'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setPartySize(Math.min(pkg.maxParty, partySize + 1))}
                    className="w-8 h-8 rounded-md bg-white border border-gray-200 flex items-center justify-center font-bold text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Safety Layer Highlights */}
              <div className="p-3.5 bg-[#123C2D]/5 rounded-xl border border-[#B99550]/20 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#123C2D]">
                  <ShieldCheck className="w-4 h-4 text-[#B99550]" />
                  <span>Universal Safety Included</span>
                </div>
                <ul className="text-[11px] text-gray-600 space-y-1">
                  <li>• Live Web GPS tracking for emergency contacts</li>
                  <li>• One-touch SOS emergency alert button</li>
                  <li>• 3-point verified guide check-ins</li>
                </ul>
              </div>

              {/* Direct Booking CTA with dynamic experience accent */}
              <Link
                href={`/book/${pkg.slug}?partySize=${partySize}&startDate=${startDate}&endDate=${endDate}&currency=${selectedCurrency}`}
                style={{ background: theme.ctaBg, color: theme.ctaText }}
                className="w-full py-3.5 px-4 font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:brightness-105 transition-all"
              >
                <span>Reserve Experience</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="text-center text-[11px] text-gray-500">
                🔒 Free 100% refund up to 48 hours before trip start
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <div className="relative z-20">
        <Footer />
      </div>

      {/* ── Fullscreen Photo Lightbox ── */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
          >
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
              aria-label="Close photo preview"
            >
              <X className="w-5 h-5" />
            </button>
            <motion.img
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.3 }}
              src={activeImage}
              alt={pkg.title}
              className="max-w-full max-h-[88vh] rounded-2xl object-contain shadow-2xl border border-white/15"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
