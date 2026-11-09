'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PackageCard, PackageCardData } from '@/components/catalog/package-card';
import { FilterSidebar, FilterState } from '@/components/catalog/filter-sidebar';
import { PackageTier } from '@dep/shared';
import { Compass, Sparkles, Search, X, MapPin } from 'lucide-react';

// Comprehensive catalog packages covering all key destinations
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
    slug: 'hunza-silk-route-expedition',
    title: 'Hunza Valley Silk Route & Glacier Expedition',
    tier: PackageTier.NATURE,
    city: { name: 'Northern Pakistan', slug: 'northern-pakistan' },
    durationDays: 7,
    minParty: 2,
    maxParty: 8,
    images: ['https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop'],
    rating: 5.0,
    reviewCount: 34,
    description: 'Ancient Altit & Baltit forts, Passu Cones, Attabad Lake boating, and sunset views over Rakaposhi (7,788m).',
  },
  {
    id: '4',
    slug: 'skardu-deosai-safari',
    title: 'Skardu & Deosai High-Altitude Wilderness Safari',
    tier: PackageTier.NATURE,
    city: { name: 'Northern Pakistan', slug: 'northern-pakistan' },
    durationDays: 8,
    minParty: 2,
    maxParty: 8,
    images: ['https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop'],
    rating: 4.9,
    reviewCount: 28,
    description: 'Shangrila Resort, Katpana cold desert dunes, 400-year-old Shigar Fort, and the Land of Giants (Deosai Plains).',
  },
  {
    id: '5',
    slug: 'fairy-meadows-nanga-parbat-trek',
    title: 'Fairy Meadows & Nanga Parbat Base Camp Trek',
    tier: PackageTier.NATURE,
    city: { name: 'Northern Pakistan', slug: 'northern-pakistan' },
    durationDays: 6,
    minParty: 2,
    maxParty: 6,
    images: ['https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop'],
    rating: 5.0,
    reviewCount: 19,
    description: 'Legendary mountain Jeep track, pine forest hikes, and front-row camping beneath the 8,126m Killer Mountain.',
  },
  {
    id: '6',
    slug: 'swat-valley-alpine-escape',
    title: 'Swat Valley Heritage & Alpine Escape',
    tier: PackageTier.CULTURAL,
    city: { name: 'Northern Pakistan', slug: 'northern-pakistan' },
    durationDays: 5,
    minParty: 2,
    maxParty: 10,
    images: ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop'],
    rating: 4.8,
    reviewCount: 16,
    description: 'Buddhist Gandhara heritage, Malam Jabba ski chairlift, emerald gemstone markets, and lush pine valleys of Kalam.',
  },
  {
    id: '7',
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
    id: '8',
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
    id: '9',
    slug: 'karachi-colonial-heritage-mangrove',
    title: 'Colonial Heritage & Arabian Sea Mangrove Kayak',
    tier: PackageTier.FOOD,
    city: { name: 'Karachi', slug: 'karachi' },
    durationHours: 6,
    minParty: 1,
    maxParty: 8,
    images: ['https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?q=80&w=800&auto=format&fit=crop'],
    rating: 4.8,
    reviewCount: 24,
    description: 'Empress Market, Mohatta Palace, Burns Road street-food feast, and sunset boat tour through Arabian Sea mangroves.',
  },
  {
    id: '10',
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
];

function ExploreContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read initial filter values from URL query parameters
  const initialCity = searchParams?.get('city') || '';
  const initialTier = searchParams?.get('tier') || '';
  const initialSearch = searchParams?.get('search') || '';
  const initialSort = searchParams?.get('sort') || 'popular';

  const [filters, setFilters] = useState<FilterState>({
    city: initialCity,
    tier: initialTier,
    duration: '',
    groupSize: '',
  });

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortBy, setSortBy] = useState(initialSort);

  // Sync state when URL params change
  useEffect(() => {
    if (searchParams) {
      const c = searchParams.get('city');
      const t = searchParams.get('tier');
      const s = searchParams.get('search');
      if (c !== null && c !== filters.city) setFilters((prev) => ({ ...prev, city: c }));
      if (t !== null && t !== filters.tier) setFilters((prev) => ({ ...prev, tier: t }));
      if (s !== null && s !== searchQuery) setSearchQuery(s);
    }
  }, [searchParams]);

  // Update URL query parameters on filter changes for bookmarking & sharing
  const updateUrl = (newFilters: FilterState, newSearch: string, newSort: string) => {
    const params = new URLSearchParams();
    if (newFilters.city) params.set('city', newFilters.city);
    if (newFilters.tier) params.set('tier', newFilters.tier);
    if (newSearch) params.set('search', newSearch);
    if (newSort && newSort !== 'popular') params.set('sort', newSort);

    const queryStr = params.toString();
    const newPath = queryStr ? `/explore?${queryStr}` : '/explore';
    window.history.replaceState(null, '', newPath);
  };

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    updateUrl(newFilters, searchQuery, sortBy);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    updateUrl(filters, query, sortBy);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    updateUrl(filters, searchQuery, sort);
  };

  const handleResetFilters = () => {
    const emptyFilters = { city: '', tier: '', duration: '', groupSize: '' };
    setFilters(emptyFilters);
    setSearchQuery('');
    setSortBy('popular');
    router.replace('/explore');
  };

  // Filter packages
  const filteredPackages = SAMPLE_PACKAGES.filter((pkg) => {
    if (filters.city && pkg.city.slug !== filters.city) return false;
    if (filters.tier && pkg.tier !== filters.tier) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = pkg.title.toLowerCase().includes(q);
      const matchCity = pkg.city.name.toLowerCase().includes(q);
      const matchDesc = pkg.description?.toLowerCase().includes(q) || false;
      if (!matchTitle && !matchCity && !matchDesc) return false;
    }

    return true;
  }).sort((a, b) => {
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    if (sortBy === 'newest') return parseInt(b.id) - parseInt(a.id);
    return (b.reviewCount || 0) - (a.reviewCount || 0); // popular default
  });

  return (
    <div className="min-h-screen bg-[#FAF6ED] flex flex-col font-sans">
      <Header />

      {/* Modern Light Hero Strip */}
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
            Every journey tells a story. Choose your destination, meet your verified local guide, and experience Pakistan with authentic warmth and safety.
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
              onChange={handleFilterChange}
              onReset={handleResetFilters}
            />
          </div>

          {/* Results Grid */}
          <div className="lg:col-span-3 space-y-6">
            {/* Top Interactive Search & Sort Toolbar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between pb-4 border-b border-[#E8DFD0] gap-3 bg-[#FAF6ED] p-4 rounded-xl shadow-2xs">
              {/* Instant Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="Search by tour name, landmark, or keyword..."
                  className="w-full pl-9 pr-8 py-2 text-xs border border-gray-200 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#B99550] shadow-xs"
                />
                {searchQuery && (
                  <button
                    onClick={() => handleSearchChange('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5 rounded-full"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Status and Sort */}
              <div className="flex items-center justify-between sm:justify-end gap-3">
                <span className="text-xs text-gray-600 font-medium">
                  <strong className="text-[#123C2D] font-bold">{filteredPackages.length}</strong> tours found
                </span>

                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-gray-500 font-medium hidden sm:inline">Sort:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 bg-[#FAF9F5] text-gray-800 focus:outline-none focus:border-[#B99550] cursor-pointer font-medium"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest First</option>
                  </select>
                </div>
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
              /* Smart Zero-State Recovery Card */
              <div className="bg-white rounded-2xl p-10 sm:p-14 text-center border border-gray-200 space-y-4 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-[#123C2D]/5 text-[#B99550] flex items-center justify-center mx-auto">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-xl font-bold text-[#123C2D]">
                    No tours match your current filter
                  </h3>
                  <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
                    We couldn't find matches for <strong className="text-gray-800">{searchQuery || filters.city || filters.tier}</strong>. Try clearing filters or explore one of our top destinations:
                  </p>
                </div>

                {/* Quick Recovery Shortcuts */}
                <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                  <button
                    onClick={() => handleFilterChange({ ...filters, city: 'lahore', tier: '' })}
                    className="px-3.5 py-1.5 text-xs font-semibold rounded-full bg-[#FAF6ED] border border-[#B99550]/40 text-[#123C2D] hover:bg-[#123C2D] hover:text-white transition"
                  >
                    📍 Lahore Heritage
                  </button>
                  <button
                    onClick={() => handleFilterChange({ ...filters, city: 'northern-pakistan', tier: '' })}
                    className="px-3.5 py-1.5 text-xs font-semibold rounded-full bg-[#FAF6ED] border border-[#B99550]/40 text-[#123C2D] hover:bg-[#123C2D] hover:text-white transition"
                  >
                    🏔️ Northern Pakistan
                  </button>
                  <button
                    onClick={() => handleFilterChange({ ...filters, city: '', tier: PackageTier.FOOD })}
                    className="px-3.5 py-1.5 text-xs font-semibold rounded-full bg-[#FAF6ED] border border-[#B99550]/40 text-[#123C2D] hover:bg-[#123C2D] hover:text-white transition"
                  >
                    🍲 Food & Culinary
                  </button>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleResetFilters}
                    className="px-6 py-2.5 bg-[#123C2D] text-white text-xs font-bold rounded-xl hover:bg-[#1c5540] transition shadow-sm"
                  >
                    Reset All Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF6ED]" />}>
      <ExploreContent />
    </Suspense>
  );
}
