'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { TierBadge } from '@/components/ui/tier-badge';
import { StarRating } from '@/components/ui/star-rating';
import { formatPrice } from '@/lib/currency';
import {
  Clock,
  Users,
  MapPin,
  Check,
  X,
  ShieldCheck,
  Calendar,
  MessageCircle,
  Share2,
  Heart,
  ChevronRight,
  ArrowRight,
  Sparkles,
  PhoneCall
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
        title: 'Morning Exploration of the Walled City',
        activities: [
          {
            time: '09:00 AM',
            title: 'Rendezvous at Delhi Gate',
            description:
              'Meet your guide at Delhi Gate, one of the original 13 gates of Lahore. Introductory briefing on Walled City architecture and etiquette.',
            estimatedDuration: '20 min',
          },
          {
            time: '09:20 AM',
            title: 'Shahi Hammam (Royal Bathhouse)',
            description:
              'Explore the 17th-century Mughal bathhouse, celebrated for its exquisite fresco restorations and ancient subterranean heating system.',
            estimatedDuration: '40 min',
          },
          {
            time: '10:00 AM',
            title: 'Wazir Khan Mosque (Fresco Masterpiece)',
            description:
              'Admire what architectural historians call "the mole on the cheek of Lahore" — the most richly ornamented Mughal mosque in the subcontinent.',
            estimatedDuration: '50 min',
          },
          {
            time: '11:00 AM',
            title: 'Wandering the Craft Bazaars',
            description:
              'Stroll through Kasera Bazaar (brass & copper), Spice Bazaar (Akbari Mandi), and see hidden wooden balconies of ancient havelis.',
            estimatedDuration: '45 min',
          },
          {
            time: '11:45 AM',
            title: 'Lahore Fort (UNESCO World Heritage)',
            description:
              'Enter the grand fortress: walk the Sheesh Mahal (Palace of Mirrors), Naulakha Pavilion, and hear stories of emperors and royal intrigue.',
            estimatedDuration: '60 min',
          },
          {
            time: '12:45 PM',
            title: 'Chai & Stories at a Century-Old Teahouse',
            description:
              'Wrap up your walk with refreshing chai, samosas, and open conversation with your guide about modern Lahore life.',
            estimatedDuration: '30 min',
          },
        ],
      },
    ],
    guide: {
      name: 'Tariq Mehmood',
      gender: 'MALE',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
      rating: 4.9,
      reviewCount: 47,
      languages: ['English', 'Urdu', 'Punjabi'],
      specialities: ['Mughal Architecture', 'Walled City History', 'Street Photography'],
      bio: 'Third-generation Lahorite with over 12 years uncovering the oral histories of Androon Lahore. Police cleared and certified by Punjab Tourism.',
    },
  },
};

export default function PackageDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const pkg =
    SAMPLE_DETAILS[resolvedParams.slug] ||
    SAMPLE_DETAILS['lahore-walled-city-heritage-walk'];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [partySize, setPartySize] = useState(2);
  const [selectedCurrency, setSelectedCurrency] = useState<'PKR' | 'USD' | 'GBP'>('PKR');

  const durationText = pkg.durationDays
    ? `${pkg.durationDays} ${pkg.durationDays === 1 ? 'Day' : 'Days'}`
    : `${pkg.durationHours || 4} Hours`;

  return (
    <div className="min-h-screen bg-[#FAF6ED] flex flex-col font-sans">
      <Header />

      {/* Breadcrumb Strip */}
      <div className="bg-[#F3ECE0] border-b border-[#E8DFD0] py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-gray-600">
          <Link href="/" className="hover:text-[#123C2D]">Home</Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <Link href="/explore" className="hover:text-[#123C2D]">Tours</Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <Link href={`/explore/${pkg.city.slug}`} className="hover:text-[#123C2D]">{pkg.city.name}</Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-[#123C2D] font-semibold truncate max-w-xs">{pkg.title}</span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column: Media, Details, Itinerary, Guide */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title & Metadata */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <TierBadge tier={pkg.tier} />
                <span className="text-xs bg-white px-3 py-0.5 rounded-full border border-gray-200 text-gray-700 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#B99550]" />
                  {pkg.city.name}
                </span>
                <span className="text-xs bg-white px-3 py-0.5 rounded-full border border-gray-200 text-gray-700 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#B99550]" />
                  {durationText}
                </span>
                <span className="text-xs bg-white px-3 py-0.5 rounded-full border border-gray-200 text-gray-700 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-[#B99550]" />
                  {pkg.minParty}–{pkg.maxParty} guests
                </span>
              </div>

              <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#123C2D] leading-tight">
                {pkg.title}
              </h1>

              <div className="flex items-center gap-4 text-sm">
                <StarRating
                  rating={pkg.rating}
                  reviewCount={pkg.reviewCount}
                  showNumber
                  size="md"
                />
                <span className="text-gray-300">|</span>
                <span className="text-xs text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Universal Safety Protected
                </span>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="space-y-3">
              <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden bg-gray-200 shadow-md">
                <img
                  src={pkg.images[activeImageIndex] || pkg.images[0]}
                  alt={pkg.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3 overflow-x-auto pb-2">
                {pkg.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-24 h-16 rounded-lg overflow-hidden border-2 transition shrink-0 ${
                      activeImageIndex === idx ? 'border-[#B99550] shadow-md scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Overview Section */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#B99550]/20 shadow-sm space-y-4">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#123C2D]">
                Experience Overview
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                {pkg.description}
              </p>
            </div>

            {/* Included & Excluded */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#B99550]/20 shadow-sm space-y-6">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#123C2D]">
                What's Included & Excluded
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Included */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Included in Tour</span>
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                    {pkg.included.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Excluded */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
                    <X className="w-4 h-4 text-rose-600" />
                    <span>Not Included</span>
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                    {pkg.excluded.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Itinerary Timeline */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#B99550]/20 shadow-sm space-y-6">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#123C2D]">
                Tour Itinerary
              </h2>

              {pkg.itinerary.map((dayPlan, dayIdx) => (
                <div key={dayIdx} className="space-y-4">
                  {pkg.itinerary.length > 1 && (
                    <div className="text-sm font-bold text-[#B99550] uppercase tracking-wider">
                      Day {dayPlan.day} — {dayPlan.title}
                    </div>
                  )}

                  <div className="relative border-l-2 border-[#B99550]/40 pl-6 space-y-6 ml-2">
                    {dayPlan.activities.map((act, actIdx) => (
                      <div key={actIdx} className="relative group">
                        {/* Dot indicator */}
                        <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-[#B99550] border-2 border-white ring-2 ring-[#123C2D]/10" />

                        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                          {act.time && (
                            <span className="text-xs font-bold text-[#123C2D] bg-[#B99550]/15 px-2 py-0.5 rounded">
                              {act.time}
                            </span>
                          )}
                          <h4 className="font-serif font-bold text-base text-[#123C2D]">
                            {act.title}
                          </h4>
                          {act.estimatedDuration && (
                            <span className="text-xs text-gray-500">
                              ({act.estimatedDuration})
                            </span>
                          )}
                        </div>

                        <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
                          {act.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Meet Your Guide */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#B99550]/20 shadow-sm space-y-4">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#123C2D]">
                Meet Your Verified Guide
              </h2>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-2">
                <img
                  src={pkg.guide.avatarUrl}
                  alt={pkg.guide.name}
                  className="w-20 h-20 rounded-full object-cover border-2 border-[#B99550] shadow-md"
                />

                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-serif text-lg font-bold text-[#123C2D]">
                      {pkg.guide.name}
                    </h3>
                    <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-700" />
                      CNIC & Police Verified
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-gray-600">
                    <StarRating rating={pkg.guide.rating} reviewCount={pkg.guide.reviewCount} showNumber size="sm" />
                    <span>•</span>
                    <span>Speaks: {pkg.guide.languages.join(', ')}</span>
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed pt-1">
                    {pkg.guide.bio}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {pkg.guide.specialities.map((s, i) => (
                      <span key={i} className="text-[11px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                        #{s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Pricing & Booking Card (Sticky on desktop, sticky on bottom mobile) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl p-6 border-2 border-[#B99550]/40 shadow-xl space-y-6">
              {/* Price Header (Revealed on detail page per FR-016 / FR-058) */}
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

              {/* Guest Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                  Select Number of Guests
                </label>
                <div className="flex items-center justify-between border border-gray-200 rounded-lg p-2 bg-gray-50">
                  <button
                    onClick={() => setPartySize(Math.max(1, partySize - 1))}
                    className="w-8 h-8 rounded-md bg-white border border-gray-200 flex items-center justify-center font-bold text-gray-700 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="text-sm font-bold text-[#123C2D]">
                    {partySize} {partySize === 1 ? 'Person' : 'People'}
                  </span>
                  <button
                    onClick={() => setPartySize(Math.min(pkg.maxParty, partySize + 1))}
                    className="w-8 h-8 rounded-md bg-white border border-gray-200 flex items-center justify-center font-bold text-gray-700 hover:bg-gray-100"
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

              {/* Direct Booking CTA */}
              <Link
                href={`/book/${pkg.slug}?partySize=${partySize}`}
                className="w-full py-3.5 px-4 bg-[#B99550] hover:bg-[#c9a65f] text-[#123C2D] font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
              >
                <span>Reserve Experience</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="text-center text-[11px] text-gray-500">
                🔒 Free 100% refund up to 48 hours before trip start
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

