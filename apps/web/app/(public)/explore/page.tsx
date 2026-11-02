'use client';

import React, { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PackageCard, PackageCardData } from '@/components/catalog/package-card';
import { FilterSidebar, FilterState } from '@/components/catalog/filter-sidebar';
import { PackageTier } from '@dep/shared';
import { Compass, Sparkles } from 'lucide-react';

// Seed sample catalog packages
const SAMPLE_PACKAGES: PackageCardData[] = [
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
];

export default function ExplorePage() {
  const [filters, setFilters] = useState<FilterState>({
    city: '',
    tier: '',
    duration: '',
    groupSize: '',
  });

  const [sortBy, setSortBy] = useState('popular');

  const filteredPackages = SAMPLE_PACKAGES.filter((pkg) => {
    if (filters.city && pkg.city.slug !== filters.city) return false;
    if (filters.tier && pkg.tier !== filters.tier) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#FAF6ED] flex flex-col font-sans">
      <Header />

      {/* Modern Light Hero Strip with Subtle Grid & Ambient Glow */}
      <section className="relative pt-12 pb-12 sm:pt-16 sm:pb-16 px-4 bg-[#FAF6ED] border-b border-[#E8DFD0] overflow-hidden bg-tech-grid">
        <div className="ambient-glow absolute inset-0 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#123C2D]/5 border border-[#123C2D]/10 text-[#123C2D] text-xs font-semibold tracking-wide shadow-xs">
            <Compass className="w-3.5 h-3.5 text-[#B99550]" />
            <span>Curated Tours by Verified Local Guides</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
            Discover Experiences Across{' '}
            <span className="text-gradient-brand">Pakistan</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Every journey tells a story. Choose your destination, meet your guide, and experience Pakistan with authentic local warmth and safety.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 flex-1 w-full bg-[#F3ECE0]">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <FilterSidebar
              filters={filters}
              onChange={setFilters}
              onReset={() =>
                setFilters({ city: '', tier: '', duration: '', groupSize: '' })
              }
            />
          </div>

          {/* Results Grid */}
          <div className="lg:col-span-3 space-y-6">
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-[#E8DFD0] gap-4 bg-[#FAF6ED] p-4 rounded-xl shadow-2xs">
              <span className="text-sm text-gray-700 font-medium">
                Showing{' '}
                <strong className="text-[#123C2D] font-bold">{filteredPackages.length}</strong>{' '}
                curated tours
              </span>

              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 font-medium">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 bg-[#FAF9F5] text-gray-800 focus:outline-none focus:border-[#B99550] cursor-pointer"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>
            </div>

            {/* Packages Grid */}
            {filteredPackages.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPackages.map((pkg) => (
                  <PackageCard key={pkg.id} pkg={pkg} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 space-y-3 shadow-xs">
                <Sparkles className="w-10 h-10 text-[#B99550] mx-auto opacity-70" />
                <h3 className="font-serif text-lg font-bold text-[#123C2D]">
                  No tours found for this selection
                </h3>
                <p className="text-sm text-gray-500 max-w-md mx-auto">
                  Try adjusting or clearing your filters to discover other experiences across Lahore and Islamabad.
                </p>
                <button
                  onClick={() =>
                    setFilters({ city: '', tier: '', duration: '', groupSize: '' })
                  }
                  className="px-5 py-2.5 bg-[#123C2D] text-white text-xs font-bold rounded-full hover:bg-[#1c5540] transition shadow-sm"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
