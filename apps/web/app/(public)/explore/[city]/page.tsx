'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PackageCard, PackageCardData } from '@/components/catalog/package-card';
import { PackageTier } from '@dep/shared';
import { MapPin, Shield, Star, Users, ArrowRight, Award, Compass, ChevronRight } from 'lucide-react';

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
    heroImage: '/images/hero-lahore.jpg',
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
    tagline: 'Modern Capital Encircling Ancient Himalayan Margalla Ridges',
    heroImage: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=1600&auto=format&fit=crop',
    description:
      'Set against the verdant Margalla Hills, Islamabad pairs cosmopolitan tranquility with centuries-old Potohar settlements. Home to the monumental Faisal Mosque, lush botanical gardens, and panoramic hiking ridges overlooking the capital basin.',
    highlights: ['Faisal Mosque Architecture', 'Margalla Ridge Hiking Trails', 'Lok Virsa Folk Museum', 'Daman-e-Koh Panorama'],
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
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header />

      {/* Hero Banner with Image */}
      <section className="relative min-h-[380px] sm:min-h-[440px] flex items-center bg-gray-950 overflow-hidden">
        <img
          src={cityData.heroImage}
          alt={cityData.name}
          className="absolute inset-0 w-full h-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/60" />

        <div className="relative max-w-7xl mx-auto w-full text-center px-4 py-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-[#E5B558] text-xs font-semibold tracking-wider uppercase">
            <MapPin className="w-3.5 h-3.5" />
            <span>Destination City • {cityData.urduName}</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white tracking-tight">
            Explore {cityData.name}
          </h1>

          <p className="text-[#E5B558] font-serif text-lg sm:text-xl italic max-w-2xl mx-auto drop-shadow-sm">
            {cityData.tagline}
          </p>

          <p className="text-white/90 max-w-2xl mx-auto text-sm leading-relaxed pt-2">
            {cityData.description}
          </p>

          {/* Highlights Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {cityData.highlights.map((h, i) => (
              <span
                key={i}
                className="px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs text-white border border-white/25 font-medium"
              >
                ✓ {h}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* City Packages Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 flex-1 w-full space-y-10 bg-[#FAF9F5]">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between pb-4 border-b border-gray-200 gap-4 bg-white p-5 rounded-2xl shadow-xs">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">
              Featured Tours in{' '}
              <span className="text-gradient-brand">{cityData.name}</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Handcrafted itineraries guided by vetted local storytellers and cultural experts.
            </p>
          </div>

          <Link
            href="/explore"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#123C2D] hover:text-[#B99550] transition-colors"
          >
            <span>View All Pakistan Tours</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cityData.packages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
