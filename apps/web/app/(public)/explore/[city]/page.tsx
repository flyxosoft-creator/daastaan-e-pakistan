'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PackageCard, PackageCardData } from '@/components/catalog/package-card';
import { PackageTier } from '@dep/shared';
import { MapPin, Shield, Star, Users, ArrowRight, Award } from 'lucide-react';

interface CityData {
  name: string;
  slug: string;
  urduName: string;
  tagline: string;
  heroImage: string;
  description: string;
  highlights: string[];
  packages: PackageCardData[];
}

const CITIES: Record<string, CityData> = {
  lahore: {
    name: 'Lahore',
    slug: 'lahore',
    urduName: 'لاہور',
    tagline: 'Heart of Mughal Heritage, Art & World-Class Street Food',
    heroImage: 'https://images.unsplash.com/photo-1598890777032-bde835ba27c2?q=80&w=1600&auto=format&fit=crop',
    description:
      'Known as the cultural capital of Pakistan, Lahore is a city alive with 2,000 years of living history. From the UNESCO World Heritage Lahore Fort and the breathtaking tilework of Wazir Khan Mosque to the bustling lanes of Gawalmandi Food Street, Lahore welcomes every traveller with open arms and unforgettable stories.',
    highlights: ['Walled City (Androon Lahore)', 'Badshahi Mosque & Fort', 'Gawalmandi Food Trail', 'Shalimar Gardens'],
    packages: [
      {
        id: '1',
        slug: 'lahore-walled-city-heritage-walk',
        title: 'Walled City Heritage Walk — 2,000 Years of Lahore',
        tier: PackageTier.CULTURAL,
        city: { name: 'Lahore', slug: 'lahore' },
        durationHours: 4,
        minParty: 1,
        maxParty: 8,
        images: ['https://images.unsplash.com/photo-1598890777032-bde835ba27c2?q=80&w=800&auto=format&fit=crop'],
        rating: 4.9,
        reviewCount: 47,
        description: 'Explore ancient gates, Wazir Khan Mosque, Lahore Fort & hidden Mughal havelis with a certified historian.',
      },
      {
        id: '2',
        slug: 'lahore-food-trail-gawalmandi',
        title: 'Gawalmandi Food Trail — A Taste of Living Heritage',
        tier: PackageTier.FOOD,
        city: { name: 'Lahore', slug: 'lahore' },
        durationHours: 3,
        minParty: 1,
        maxParty: 10,
        images: ['https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop'],
        rating: 4.9,
        reviewCount: 38,
        description: 'Wok-cooked Lahori karahi, slow-simmered nihari, piping hot naan, and rabri falooda with a local food expert.',
      },
      {
        id: '5',
        slug: 'lahore-mughal-gardens-shalimar',
        title: 'Shalimar Gardens & Mughal Architecture Discovery',
        tier: PackageTier.CULTURAL,
        city: { name: 'Lahore', slug: 'lahore' },
        durationHours: 4,
        minParty: 1,
        maxParty: 10,
        images: ['https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?q=80&w=800&auto=format&fit=crop'],
        rating: 4.8,
        reviewCount: 19,
        description: 'Step into Emperor Shah Jahan\'s triple-terraced gardens with 410 fountains and intricate marble pavilions.',
      },
    ],
  },
  islamabad: {
    name: 'Islamabad',
    slug: 'islamabad',
    urduName: 'اسلام آباد',
    tagline: 'Scenic Serenity, Modern Architecture & Margalla Wilderness',
    heroImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1600&auto=format&fit=crop',
    description:
      'Pakistan’s capital nestled right at the foothills of the Himalayas. Islamabad offers a harmonious balance of pristine national parks, modern architecture like the majestic Faisal Mosque, and vibrant handicraft heritage at Lok Virsa Museum. The ideal starting point for nature lovers and families.',
    highlights: ['Margalla Hills National Park', 'Faisal Mosque', 'Daman-e-Koh Overlook', 'Lok Virsa Folk Museum'],
    packages: [
      {
        id: '3',
        slug: 'islamabad-margalla-hills-sunrise-hike',
        title: 'Margalla Hills Sunrise Hike & Nature Trail',
        tier: PackageTier.NATURE,
        city: { name: 'Islamabad', slug: 'islamabad' },
        durationHours: 4,
        minParty: 1,
        maxParty: 12,
        images: ['https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop'],
        rating: 4.8,
        reviewCount: 29,
        description: 'Catch the dawn over the Himalayan foothills, wildlife observation, and breakfast at the panoramic Pir Sohawa ridge.',
      },
      {
        id: '4',
        slug: 'islamabad-cultural-city-tour',
        title: 'Capital City Cultural Tour — Faisal Mosque & Folk Heritage',
        tier: PackageTier.CULTURAL,
        city: { name: 'Islamabad', slug: 'islamabad' },
        durationHours: 6,
        minParty: 1,
        maxParty: 8,
        images: ['https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=800&auto=format&fit=crop'],
        rating: 4.7,
        reviewCount: 22,
        description: 'Faisal Mosque architecture, Lok Virsa folk museum, Daman-e-Koh scenic overlook, and Pakistan Monument.',
      },
      {
        id: '6',
        slug: 'islamabad-daman-e-koh-panoramic-sunset',
        title: 'Sunset Panorama & Lok Virsa Traditional Crafts',
        tier: PackageTier.FAMILY,
        city: { name: 'Islamabad', slug: 'islamabad' },
        durationHours: 3,
        minParty: 1,
        maxParty: 8,
        images: ['https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop'],
        rating: 4.9,
        reviewCount: 15,
        description: 'Family-friendly cultural immersion: pottery making, regional folk art, and sunset tea overlooking Islamabad.',
      },
    ],
  },
};

export default function CityExplorePage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const resolvedParams = use(params);
  const cityKey = resolvedParams.city.toLowerCase();
  const cityData = CITIES[cityKey] || CITIES.lahore;

  return (
    <div className="min-h-screen bg-[#F7F3E9] flex flex-col font-sans">
      <Header />

      {/* Hero Banner with Image */}
      <section className="relative pt-32 pb-20 px-4 min-h-[460px] flex items-center bg-[#123C2D]">
        <img
          src={cityData.heroImage}
          alt={cityData.name}
          className="absolute inset-0 w-full h-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#123C2D] via-[#123C2D]/60 to-transparent" />

        <div className="relative max-w-7xl mx-auto w-full text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B99550]/20 border border-[#B99550]/40 text-[#B99550] text-xs font-semibold tracking-wider uppercase">
            <MapPin className="w-3.5 h-3.5" />
            <span>Destination City • {cityData.urduName}</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#F7F3E9] tracking-tight">
            Explore {cityData.name}
          </h1>

          <p className="text-[#B99550] font-serif text-lg sm:text-xl italic max-w-2xl mx-auto">
            {cityData.tagline}
          </p>

          <p className="text-gray-300 max-w-2xl mx-auto text-sm leading-relaxed pt-2">
            {cityData.description}
          </p>

          {/* Highlights Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {cityData.highlights.map((h, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs text-[#F7F3E9] border border-white/15"
              >
                ✓ {h}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* City Packages Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1 w-full space-y-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between pb-4 border-b border-[#B99550]/20 gap-4">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#123C2D]">
              Featured Tours in {cityData.name}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Handcrafted itineraries guided by vetted local storytellers and cultural experts.
            </p>
          </div>

          <Link
            href="/explore"
            className="text-xs font-bold text-[#123C2D] hover:text-[#B99550] flex items-center gap-1.5 transition"
          >
            <span>View All Pakistan Tours</span>
            <ArrowRight className="w-4 h-4 text-[#B99550]" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cityData.packages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>

        {/* Safety & Trust Banner for the City */}
        <div className="bg-[#123C2D] text-[#F7F3E9] rounded-2xl p-8 border border-[#B99550]/30 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-[#B99550] font-semibold text-sm">
              <Shield className="w-4 h-4" />
              <span>Universal Safety Guarantee in {cityData.name}</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold">
              Travel with Peace of Mind
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 max-w-xl">
              Every tour in {cityData.name} includes police-cleared CNIC-verified guides, real-time trip GPS tracking, emergency SOS alerts, and 24/7 dedicated support.
            </p>
          </div>

          <Link
            href="/safety-guide"
            className="px-6 py-3 rounded-full bg-[#B99550] text-[#123C2D] hover:bg-[#c9a65f] font-semibold text-xs whitespace-nowrap shadow-md transition"
          >
            Learn How Safety Works
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

