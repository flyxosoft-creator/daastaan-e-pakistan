'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PackageCard, PackageCardData } from '@/components/catalog/package-card';
import { LAHORE_PACKAGES } from '@/lib/lahore-packages';
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
      ...LAHORE_PACKAGES,
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
  'northern-pakistan': {
    name: 'Northern Pakistan',
    slug: 'northern-pakistan',
    urduName: 'شمالی علاقہ جات',
    tagline: 'Crown of the Karakoram, Himalayas & Hindu Kush — Hunza, Skardu, Swat & Fairy Meadows',
    heroImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1600&auto=format&fit=crop',
    description:
      'Covering the majestic mountain kingdoms of Gilgit-Baltistan and upper Khyber Pakhtunkhwa, Northern Pakistan is the ultimate frontier where three of the planet’s greatest ranges converge. Home to the world’s highest density of 8,000-metre giants, ancient Silk Route citadels, sapphire alpine tarns, and legendary mountain hospitality.',
    highlights: [
      'Hunza Valley, 900-Yr-Old Baltit Fort & Passu Cathedral Cones',
      'Skardu, Shangrila & Cold Desert Dunes',
      'Swat Valley (Kalam, Ushu Pine Forest & Malam Jabba)',
      'Deosai Plains — The Land of Giants (4,114m)',
      'Fairy Meadows & Nanga Parbat (8,126m) Reflection Lake',
      'Attabad Lake Turquoise Watersports & Boat Cruise',
    ],
    packages: [
      {
        id: 'np-1',
        slug: 'hunza-valley-karakoram-heritage-trail',
        title: 'Hunza Valley & Karakoram Highway Expedition',
        tier: PackageTier.CULTURAL,
        city: { name: 'Hunza & Gilgit', slug: 'northern-pakistan' },
        durationHours: 72,
        durationDays: 4,
        minParty: 1,
        maxParty: 10,
        images: ['https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop'],
        rating: 4.9,
        reviewCount: 52,
        description: 'Baltit & Altit Forts, Attabad Lake boating, Passu suspension bridge, and sunset over Rakaposhi (7,788m) with local elders.',
      },
      {
        id: 'np-2',
        slug: 'skardu-deosai-plains-alpine-safari',
        title: 'Skardu & Deosai Plains (Land of Giants) 4x4 Safari',
        tier: PackageTier.NATURE,
        city: { name: 'Skardu', slug: 'northern-pakistan' },
        durationHours: 96,
        durationDays: 5,
        minParty: 2,
        maxParty: 8,
        images: ['https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=800&auto=format&fit=crop'],
        rating: 4.9,
        reviewCount: 37,
        description: 'Explore Shangrila, Katpana cold desert dunes, Sheosar Lake, and the world’s second-highest alpine plateau at 4,114m.',
      },
      {
        id: 'np-3',
        slug: 'swat-valley-kalam-nature-trail',
        title: 'Swat Valley & Kalam Alpine Meadow Discovery',
        tier: PackageTier.FAMILY,
        city: { name: 'Swat & Kalam', slug: 'northern-pakistan' },
        durationHours: 48,
        durationDays: 3,
        minParty: 2,
        maxParty: 12,
        images: ['https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800&auto=format&fit=crop'],
        rating: 4.8,
        reviewCount: 41,
        description: 'Known as the Switzerland of Pakistan: Ushu dense pine forest, Mahodand Lake trout fishing, and Malam Jabba chairlift.',
      },
      {
        id: 'np-4',
        slug: 'fairy-meadows-nanga-parbat-trek',
        title: 'Fairy Meadows & Nanga Parbat Base Camp Trek',
        tier: PackageTier.NATURE,
        city: { name: 'Fairy Meadows', slug: 'northern-pakistan' },
        durationHours: 72,
        durationDays: 3,
        minParty: 1,
        maxParty: 8,
        images: ['https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop'],
        rating: 5.0,
        reviewCount: 64,
        description: 'Iconic mountain 4x4 jeep track from Raikot Bridge, alpine reflection lake, and front-row view of the 8,126m Killer Mountain.',
      },
    ],
  },
  hunza: {
    name: 'Hunza Valley',
    slug: 'northern-pakistan',
    urduName: 'ہنزہ',
    tagline: 'Terraced Apricot Orchards, Ancient Forts & Cathedral Peaks',
    heroImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1600&auto=format&fit=crop',
    description:
      'Perched along the ancient Silk Route under the gaze of Rakaposhi and Ladyfinger Peak, Hunza is world-famed for its longevity culture, UNESCO-awarded forts, and turquoise lakes.',
    highlights: ['Baltit & Altit Forts', 'Attabad Lake Boating', 'Passu Cones Panorama', 'Karimabad Local Bazaar'],
    packages: [
      {
        id: 'np-1',
        slug: 'hunza-valley-karakoram-heritage-trail',
        title: 'Hunza Valley & Karakoram Highway Expedition',
        tier: PackageTier.CULTURAL,
        city: { name: 'Hunza', slug: 'northern-pakistan' },
        durationHours: 72,
        durationDays: 4,
        minParty: 1,
        maxParty: 10,
        images: ['https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop'],
        rating: 4.9,
        reviewCount: 52,
        description: 'Baltit & Altit Forts, Attabad Lake boating, Passu suspension bridge, and sunset over Rakaposhi (7,788m) with local elders.',
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
    <div className="min-h-screen bg-[#FAF6ED] flex flex-col font-sans">
      <Header />

      {/* Hero Banner with Image */}
      <section className="relative min-h-[380px] sm:min-h-[440px] flex items-center bg-gray-950 overflow-hidden">
        <img
          src={cityData.heroImage}
          alt={cityData.name}
          className="absolute inset-0 w-full h-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/60" />

        <div className="relative w-full max-w-5xl mx-auto text-center px-4 sm:px-8 py-16 sm:py-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-[#E5B558] text-xs font-semibold tracking-wider uppercase">
            <MapPin className="w-3.5 h-3.5" />
            <span>Destination City • {cityData.urduName}</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white tracking-tight leading-tight">
            Explore {cityData.name}
          </h1>

          <p className="text-[#E5B558] font-serif text-lg sm:text-xl italic max-w-2xl mx-auto drop-shadow-sm">
            {cityData.tagline}
          </p>

          <p className="text-white/90 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed pt-2">
            {cityData.description}
          </p>

          {/* Highlights Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {cityData.highlights.map((h, i) => (
              <span
                key={i}
                className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs text-white border border-white/25 font-medium shadow-xs"
              >
                ✓ {h}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* City Packages Section - End-to-End Layout */}
      <main className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 sm:py-16 flex-1 space-y-10 bg-[#FAF6ED]">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between pb-4 border-b border-[#E8DFD0] gap-4 bg-[#F3ECE0]/70 backdrop-blur-sm p-6 rounded-2xl border border-[#E8DFD0] shadow-2xs">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">
              Featured Tours in{' '}
              <span className="bg-gradient-to-r from-[#123C2D] via-[#1a5540] to-[#B99550] bg-clip-text text-transparent">{cityData.name}</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Handcrafted itineraries guided by vetted local storytellers and cultural experts.
            </p>
          </div>

          <Link
            href="/explore"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#123C2D] hover:bg-[#B99550] text-white hover:text-[#0A2418] text-xs font-bold transition-all shadow-xs"
          >
            <span>View All Pakistan Tours</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cityData.packages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
