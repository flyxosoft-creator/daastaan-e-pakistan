'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, useInView, useAnimation, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  Globe,
  ShieldCheck,
  Star,
  MapPin,
  Clock,
  Users,
  ArrowRight,
  CheckCircle,
  BookOpen,
  Mountain,
  UtensilsCrossed,
  Landmark,
  Heart,
  Instagram,
  Facebook,
  Twitter,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Search,
  X,
} from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PackageCard, PackageCardData } from '@/components/catalog/package-card';

/* ─── Animation Variants ─────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ─── Section Wrapper with InView ───────────────────── */
function AnimatedSection({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={stagger}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── 1. Hero Section (Clean, Modern, Non-Technical Friendly) ──────── */
/* ─── Hero Transitioning Destination Slides ───────────────────────── */
const HERO_SLIDES = [
  {
    id: 'hunza',
    name: 'Hunza & Karakoram',
    location: 'Hunza Valley, Gilgit-Baltistan',
    tagline: 'Towering 7,000m peaks and turquoise alpine waters of Attabad Lake.',
    image: '/images/hero-cinematic-pakistan.jpg',
  },
  {
    id: 'lahore',
    name: 'Lahore Heritage',
    location: 'Badshahi Mosque & Walled City, Lahore',
    tagline: '500 years of living Mughal history, royal poetry, and legendary food streets.',
    image: '/images/hero-lahore.jpg',
  },
  {
    id: 'karachi',
    name: 'Karachi Coast',
    location: 'Clifton Beach & Arabian Sea, Karachi',
    tagline: 'Golden sunsets by the sea, camel trails, and vibrant coastal culture.',
    image: '/images/hero-karachi.jpg',
  },
  {
    id: 'swat',
    name: 'Swat Valley',
    location: 'Kalam Valley & Swat, KP',
    tagline: 'The Switzerland of the East — emerald alpine rivers and ancient Gandhara stupas.',
    image: '/images/hero-mountains-lake.jpg',
  },
];

/* ─── 1. Hero Section (Cinematic Transitioning Hero Under Header) ───── */
function HeroSection() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  // Auto-transition destination images every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim().toLowerCase();
    if (!q) {
      router.push('/explore');
      return;
    }
    if (q.includes('lahore')) {
      router.push('/explore/lahore');
    } else if (
      q.includes('hunza') ||
      q.includes('skardu') ||
      q.includes('swat') ||
      q.includes('north') ||
      q.includes('fairy') ||
      q.includes('kalam')
    ) {
      router.push('/explore/northern-pakistan');
    } else if (
      q.includes('activit') ||
      q.includes('festival') ||
      q.includes('food') ||
      q.includes('cook') ||
      q.includes('sport') ||
      q.includes('paint')
    ) {
      router.push('/activities');
    } else {
      router.push(`/explore?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleQuickSearch = (term: string, directUrl?: string) => {
    if (directUrl) {
      router.push(directUrl);
    } else {
      router.push(`/explore?q=${encodeURIComponent(term)}`);
    }
  };

  const active = HERO_SLIDES[currentSlide];

  return (
    <section className="relative w-full min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] flex items-center justify-center overflow-hidden bg-gray-950">
      {/* ─── Live Transitioning Background Imagery ───────────────────── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="absolute inset-0 z-0"
        >
          <img
            src={active.image}
            alt={active.location}
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
      </AnimatePresence>

      {/* Subtle cinematic gradient overlay to make text and search bar pop */}
      <div className="absolute inset-0 z-1 bg-gradient-to-t from-black/85 via-black/40 to-black/55" />

      {/* ─── Center Hero Content ─────────────────────────────────────── */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16 sm:py-20 space-y-6 sm:space-y-8">
        {/* Floating Trust Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/25 text-white text-xs font-semibold tracking-wide shadow-sm transition-all"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#E5B558]" />
          <span>Pakistan's Premier Certified Tourism Marketplace</span>
          <ArrowRight className="w-3.5 h-3.5 text-white/80" />
        </motion.div>

        {/* Main Headline with Theme Color Gradient Accent */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="space-y-3"
        >
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.12] drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)]">
            Discover Pakistan.{' '}
            <span className="block sm:inline bg-gradient-to-r from-[#E5B558] via-[#F7F3E9] to-[#E5B558] bg-clip-text text-transparent">
              Live Its Stories.
            </span>
          </h1>

          <p className="font-sans text-sm sm:text-base lg:text-lg text-white/95 max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] font-normal">
            Connect with verified local storytellers for authentic cultural walks, legendary food trails, and breathtaking mountain expeditions.
          </p>
        </motion.div>

        {/* ─── Big Clean Intuitive Floating Search Bar ──────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto w-full pt-1"
        >
          <form
            onSubmit={handleSearch}
            className="relative flex items-center bg-white rounded-full shadow-2xl p-1.5 sm:p-2 border-2 border-white hover:border-[#E5B558] transition-all"
          >
            <Search className="w-5 h-5 text-gray-400 ml-4 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Where to? (e.g. Lahore, Hunza, Swat, Karachi...)"
              className="w-full bg-transparent px-3 py-2 text-xs sm:text-sm text-gray-800 placeholder-gray-500 focus:outline-none font-medium"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="mr-2 text-gray-400 hover:text-gray-600 p-1 rounded-full transition"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="submit"
              className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-[#123C2D] via-[#1a5540] to-[#123C2D] hover:from-[#0B251B] hover:to-[#123C2D] text-white font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md shrink-0"
            >
              Search Tours
            </button>
          </form>

          {/* Quick Clickable Suggestions */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 pt-3 text-xs text-white/95 drop-shadow">
            <span className="text-white/75 font-medium">Quick search:</span>
            <button
              type="button"
              onClick={() => handleQuickSearch('Lahore', '/explore/lahore')}
              className="px-3.5 py-1.5 rounded-full bg-white/20 hover:bg-white/35 backdrop-blur-md border border-white/25 transition-all text-white font-medium flex items-center gap-1 cursor-pointer"
            >
              📍 Lahore
            </button>
            <button
              type="button"
              onClick={() => handleQuickSearch('Northern Pakistan', '/explore/northern-pakistan')}
              className="px-3.5 py-1.5 rounded-full bg-white/20 hover:bg-white/35 backdrop-blur-md border border-white/25 transition-all text-white font-medium flex items-center gap-1 cursor-pointer"
            >
              🏔️ Northern Pakistan
            </button>
            <button
              type="button"
              onClick={() => handleQuickSearch('Activities', '/activities')}
              className="px-3.5 py-1.5 rounded-full bg-white/20 hover:bg-white/35 backdrop-blur-md border border-white/25 transition-all text-white font-medium flex items-center gap-1 cursor-pointer"
            >
              🎪 Cultural Activities
            </button>
            <button
              type="button"
              onClick={() => handleQuickSearch('Karachi', '/explore?q=Karachi')}
              className="px-3.5 py-1.5 rounded-full bg-white/20 hover:bg-white/35 backdrop-blur-md border border-white/25 transition-all text-white font-medium flex items-center gap-1 cursor-pointer"
            >
              🌊 Karachi Coast
            </button>
          </div>
        </motion.div>
      </div>

      {/* ─── Bottom Slide Indicator & Current Location Badge ─────────── */}
      <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-8 right-4 sm:right-8 z-10 flex flex-col sm:flex-row items-center justify-between gap-3 text-white">
        {/* Active Location Info */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-xs font-medium">
          <MapPin className="w-3.5 h-3.5 text-[#E5B558]" />
          <span>{active.location}</span>
        </div>

        {/* Clean Destination Selector Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2 bg-black/40 backdrop-blur-md border border-white/20 p-1 rounded-full">
          {HERO_SLIDES.map((slide, idx) => {
            const isActive = idx === currentSlide;
            return (
              <button
                key={slide.id}
                onClick={() => setCurrentSlide(idx)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 ${
                  isActive
                    ? 'bg-[#B99550] text-[#0A2418] shadow-sm'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {slide.name}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── 2. Feature Highlights Bar (Directly below hero) ─────────────── */
function FeatureHighlightsBar() {
  return (
    <section className="bg-[#F3ECE0] border-b border-[#E8DFD0] py-6 px-4 sm:px-6 lg:px-8 shadow-xs">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-[#E8DFD0] text-[#123C2D]">
        {/* 1. Breathtaking Landscapes */}
        <div className="flex items-center justify-center gap-3 p-3 text-left">
          <div className="w-10 h-10 rounded-xl bg-[#FAF6ED] border border-[#E8DFD0] flex items-center justify-center shrink-0 shadow-xs">
            <Mountain className="w-5 h-5 text-[#123C2D]" />
          </div>
          <div className="text-xs sm:text-sm font-bold leading-tight text-[#123C2D]">
            Breathtaking<br /><span className="text-[#B99550] font-semibold text-[11px] sm:text-xs">Landscapes</span>
          </div>
        </div>

        {/* 2. Rich Cultural Heritage */}
        <div className="flex items-center justify-center gap-3 p-3 text-left">
          <div className="w-10 h-10 rounded-xl bg-[#FAF6ED] border border-[#E8DFD0] flex items-center justify-center shrink-0 shadow-xs">
            <Landmark className="w-5 h-5 text-[#123C2D]" />
          </div>
          <div className="text-xs sm:text-sm font-bold leading-tight text-[#123C2D]">
            Rich Cultural<br /><span className="text-[#B99550] font-semibold text-[11px] sm:text-xs">Heritage</span>
          </div>
        </div>

        {/* 3. Vibrant Traditions */}
        <div className="flex items-center justify-center gap-3 p-3 text-left">
          <div className="w-10 h-10 rounded-xl bg-[#FAF6ED] border border-[#E8DFD0] flex items-center justify-center shrink-0 shadow-xs">
            <Sparkles className="w-5 h-5 text-[#123C2D]" />
          </div>
          <div className="text-xs sm:text-sm font-bold leading-tight text-[#123C2D]">
            Vibrant<br /><span className="text-[#B99550] font-semibold text-[11px] sm:text-xs">Traditions</span>
          </div>
        </div>

        {/* 4. Warm Hospitality */}
        <div className="flex items-center justify-center gap-3 p-3 text-left">
          <div className="w-10 h-10 rounded-xl bg-[#FAF6ED] border border-[#E8DFD0] flex items-center justify-center shrink-0 shadow-xs">
            <Users className="w-5 h-5 text-[#123C2D]" />
          </div>
          <div className="text-xs sm:text-sm font-bold leading-tight text-[#123C2D]">
            Warm<br /><span className="text-[#B99550] font-semibold text-[11px] sm:text-xs">Hospitality</span>
          </div>
        </div>

        {/* 5. Unforgettable Journeys */}
        <div className="flex items-center justify-center gap-3 p-3 text-left col-span-2 md:col-span-1 border-t md:border-t-0">
          <div className="w-10 h-10 rounded-xl bg-[#FAF6ED] border border-[#E8DFD0] flex items-center justify-center shrink-0 shadow-xs">
            <Globe className="w-5 h-5 text-[#123C2D]" />
          </div>
          <div className="text-xs sm:text-sm font-bold leading-tight text-[#123C2D]">
            Unforgettable<br /><span className="text-[#B99550] font-semibold text-[11px] sm:text-xs">Journeys</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── 2.1 Trust & Universal Safety Pillars (International Conversion Booster) ── */
function TrustPillarsBanner() {
  return (
    <section className="bg-[#123C2D] text-[#F7F3E9] py-3.5 px-4 border-b border-[#B99550]/20 text-xs shadow-inner">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#B99550] shrink-0" />
          <span className="font-semibold text-white">Universal Safety:</span>
          <span className="text-gray-300 hidden sm:inline">Live Web GPS Tracking & 1-Touch SOS Included with Every Tour</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-[#B99550] shrink-0" />
          <span className="font-semibold text-white">100% Police-Cleared Guides</span>
          <span className="text-gray-300 hidden md:inline">· Verified CNIC & Tourism Accreditation</span>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#B99550] shrink-0" />
          <span className="font-semibold text-white">Flexible Cancellation:</span>
          <span className="text-gray-300 hidden sm:inline">100% Refund up to 48h Before Trip Start</span>
        </div>
      </div>
    </section>
  );
}

/* ─── 2. Discover Pakistan Section (Large Movable Interactive Slider) ── */
const DISCOVER_CARDS = [
  {
    id: 'northern',
    title: 'Northern Pakistan',
    tagline: 'Hunza, Skardu & Gilgit',
    badge: '7,000m Karakoram Peaks',
    description: 'Sapphire alpine lakes, soaring 7,000m glacial pinnacles, and ancient Silk Route fortresses.',
    image: '/images/hero-cinematic-pakistan.jpg',
    toursCount: '14 Curated Tours',
    href: '/explore?region=northern',
  },
  {
    id: 'historical',
    title: 'Historical Cities',
    tagline: 'Lahore, Multan & Peshawar',
    badge: 'Mughal & Living Heritage',
    description: '500 years of living history, UNESCO royal palaces, and world-renowned street food bazaars.',
    image: '/images/hero-lahore.jpg',
    toursCount: '18 Curated Tours',
    href: '/explore/lahore',
  },
  {
    id: 'coastal',
    title: 'Coastal Beauty',
    tagline: 'Karachi, Ormara & Gwadar',
    badge: 'Arabian Sea Coastline',
    description: 'Golden sunlit beaches, azure coastal lagoons, camel trails, and legendary fresh seafood feasts.',
    image: '/images/hero-karachi.jpg',
    toursCount: '8 Curated Tours',
    href: '/explore?region=coastal',
  },
  {
    id: 'culture',
    title: 'Culture & Traditions',
    tagline: 'Folk Art, Shrines & Bazaars',
    badge: 'Folk Art & Heritage',
    description: 'Vibrant truck art workshops, sufi poetry gatherings, and centuries of master artisan craftsmanship.',
    image: '/images/discover-culture-traditions.jpg',
    toursCount: '11 Curated Tours',
    href: '/explore?category=culture',
  },
  {
    id: 'adventure',
    title: 'Adventure Treks',
    tagline: 'Fairy Meadows & Deosai Plains',
    badge: 'High-Altitude Wilderness',
    description: 'Rugged jeep safaris across high-altitude plateaus, alpine passes, and trails facing Nanga Parbat.',
    image: '/images/hero-hunza.jpg',
    toursCount: '12 Curated Tours',
    href: '/explore?category=adventure',
  },
  {
    id: 'swat',
    title: 'Swat Valley & Kalam',
    tagline: 'The Switzerland of the East',
    badge: 'Emerald Valleys & Rivers',
    description: 'Emerald alpine rivers, fragrant pine forests, ancient Gandhara ruins, and snow-kissed meadows.',
    image: '/images/hero-mountains-lake.jpg',
    toursCount: '9 Curated Tours',
    href: '/explore?region=swat',
  },
];

function DiscoverPakistanSection() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  // Mouse Drag to Slide state
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);

  const checkScrollState = () => {
    if (!sliderRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    setCanScrollLeft(scrollLeft > 15);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 15);

    // Approximate active card index based on card width
    const cardWidth = 380;
    const currentIndex = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.max(0, Math.min(DISCOVER_CARDS.length - 1, currentIndex)));
  };

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    checkScrollState();
    el.addEventListener('scroll', checkScrollState);
    window.addEventListener('resize', checkScrollState);
    return () => {
      el.removeEventListener('scroll', checkScrollState);
      window.removeEventListener('resize', checkScrollState);
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return;
    const cardWidth = 400;
    sliderRef.current.scrollBy({
      left: direction === 'left' ? -cardWidth : cardWidth,
      behavior: 'smooth',
    });
  };

  const scrollToCard = (index: number) => {
    if (!sliderRef.current) return;
    const cardWidth = 400;
    sliderRef.current.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth',
    });
  };

  // Mouse drag handling
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsMouseDown(true);
    setHasDragged(false);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeftState(sliderRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(walk) > 6) {
      setHasDragged(true);
    }
    sliderRef.current.scrollLeft = scrollLeftState - walk;
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    setTimeout(() => setHasDragged(false), 50);
  };

  return (
    <section className="py-16 sm:py-24 bg-[#FAF6ED] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Header with Slider Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div className="space-y-2 text-left">
            <p className="text-xs font-bold uppercase tracking-widest text-[#B99550]">
              Curated Regional Trails
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
              Discover{' '}
              <span className="bg-gradient-to-r from-[#123C2D] to-[#B99550] bg-clip-text text-transparent">
                Pakistan
              </span>
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-xl">
              From the Karakoram heights and ancient Mughal havelis to azure Arabian coastlines.
            </p>
          </div>

          {/* Slider Navigation Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all ${
                canScrollLeft
                  ? 'border-gray-300 bg-white hover:bg-[#123C2D] text-gray-700 hover:text-white shadow-sm hover:shadow-md cursor-pointer'
                  : 'border-gray-200 bg-gray-100 text-gray-300 cursor-not-allowed'
              }`}
              aria-label="Previous destination"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all ${
                canScrollRight
                  ? 'border-gray-300 bg-white hover:bg-[#123C2D] text-gray-700 hover:text-white shadow-sm hover:shadow-md cursor-pointer'
                  : 'border-gray-200 bg-gray-100 text-gray-300 cursor-not-allowed'
              }`}
              aria-label="Next destination"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Large Movable Horizontal Slider */}
        <div
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className={`flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none pb-4 pt-1 select-none ${
            isMouseDown ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {DISCOVER_CARDS.map((card) => (
            <Link
              key={card.id}
              href={card.href}
              onClick={(e) => {
                if (hasDragged) {
                  e.preventDefault();
                }
              }}
              className="group relative w-[310px] sm:w-[360px] md:w-[390px] lg:w-[410px] h-[480px] sm:h-[520px] rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-200/90 shrink-0 snap-start flex flex-col justify-between p-6 sm:p-7"
            >
              {/* High-Resolution Background Photography */}
              <div className="absolute inset-0 z-0">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
                />
              </div>

              {/* Dual Direction Cinematic Gradient Overlay */}
              <div className="absolute inset-0 z-1 bg-gradient-to-t from-black/95 via-black/45 to-black/30 group-hover:from-black/90 transition-colors" />

              {/* Card Top Pill Elements */}
              <div className="relative z-10 flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#E5B558]" />
                  <span>{card.badge}</span>
                </span>

                <span className="inline-flex items-center px-3 py-1 rounded-full bg-black/45 backdrop-blur-md border border-white/20 text-[#E5B558] text-xs font-bold shadow-xs">
                  {card.toursCount}
                </span>
              </div>

              {/* Card Bottom Content Elements */}
              <div className="relative z-10 space-y-3 pt-12">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#E5B558]">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{card.tagline}</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white drop-shadow-md leading-tight group-hover:text-[#F7F3E9] transition-colors">
                  {card.title}
                </h3>

                <p className="text-xs sm:text-sm text-white/90 leading-relaxed line-clamp-2 font-normal drop-shadow">
                  {card.description}
                </p>

                {/* Explore Action Button */}
                <div className="pt-2 flex items-center justify-between border-t border-white/20">
                  <span className="text-xs sm:text-sm font-bold text-white group-hover:text-[#E5B558] transition-colors flex items-center gap-1.5">
                    <span>Explore Region</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="w-9 h-9 rounded-full border border-white/40 bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#B99550] group-hover:border-[#B99550] group-hover:text-[#0A2418] transition-all duration-300 group-hover:scale-110 shadow-md">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Pagination Dots & Drag Hint */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-2">
          {/* Subtle Drag Hint */}
          <p className="text-xs text-gray-400 font-medium hidden sm:block">
            ← Drag or swipe horizontally to discover all regions →
          </p>

          {/* Interactive Navigation Dots */}
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            {DISCOVER_CARDS.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => scrollToCard(dotIdx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === dotIdx
                    ? 'w-8 bg-[#123C2D]'
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${dotIdx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── 3. Callout Ribbon Banner ────────────────────────────────────── */
function CalloutRibbonBanner() {
  return (
    <section className="py-6 px-4 sm:px-6 lg:px-8 bg-[#FAF6ED]">
      <div className="max-w-7xl mx-auto bg-gradient-to-r from-[#123C2D] via-[#1a5540] to-[#123C2D] text-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-[#B99550]/30 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Silhouette Artwork */}
        <div className="hidden lg:flex items-center opacity-90 hover:opacity-100 transition-opacity">
          <img
            src="/images/monuments-silhouette.png"
            alt="Pakistani Architectural Monuments Silhouette"
            className="h-10 sm:h-12 w-auto object-contain"
          />
        </div>

        {/* Center: Script Text */}
        <div className="text-center md:text-left space-y-1">
          <p className="font-serif italic text-base sm:text-xl lg:text-2xl text-white font-normal drop-shadow-sm">
            Every journey tells a story...{' '}
            <span className="text-[#E5B558] font-semibold underline decoration-[#E5B558]/60 underline-offset-4">
              Let's explore Pakistan together!
            </span>
          </p>
          <p className="text-xs sm:text-sm text-white/80 font-sans">
            Connect directly with verified local historians, mountaineers, and storytellers.
          </p>
        </div>

        {/* Right: Golden CTA Button */}
        <div className="shrink-0">
          <Link
            href="/explore"
            className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-[#B99550] hover:bg-[#d4ad5b] text-[#0A2418] font-bold text-xs sm:text-sm tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
          >
            <span>Explore Experiences ↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── 2. How It Works ────────────────────────────────── */
const steps = [
  {
    num: '01',
    icon: MapPin,
    title: 'Discover',
    desc: 'Search and browse curated tours crafted by local experts across Pakistan.',
  },
  {
    num: '02',
    icon: CheckCircle,
    title: 'Book',
    desc: 'Secure your spot with online booking in minutes. Pay safely via card or wallet.',
  },
  {
    num: '03',
    icon: Sparkles,
    title: 'Experience',
    desc: "Live Pakistan's untold stories through the eyes of a passionate local guide.",
  },
  {
    num: '04',
    icon: Star,
    title: 'Share',
    desc: 'Leave a review, earn travel credits, and inspire the next adventurer.',
  },
];

function HowItWorksSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="how-it-works" className="py-20 bg-[#FAF6ED]" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14 space-y-2">
          <p className="text-xs font-bold uppercase tracking-widest text-[#B99550]">
            Simple & Transparent
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            How Daastaan{' '}
            <span className="bg-gradient-to-r from-[#123C2D] to-[#B99550] bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
            Four easy steps to a safe and unforgettable journey with certified storytellers.
          </p>
        </AnimatedSection>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gray-200 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative z-10">
            {steps.map(({ num, icon: Icon, title, desc }, i) => (
              <motion.div
                key={num}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className="flex flex-col items-center text-center group bg-[#F3ECE0] hover:bg-[#FAF6ED] p-6 rounded-2xl border border-[#E8DFD0] hover:border-[#B99550]/50 hover:shadow-lg transition-all duration-300"
              >
                {/* Number + icon circle */}
                <div className="relative mb-5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#123C2D] to-[#1F5C45] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                    <Icon className="w-7 h-7 text-[#B99550]" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#B99550] text-[#0A2418] text-xs font-bold flex items-center justify-center shadow-xs">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── 4. Featured Packages ───────────────────────────── */
const FEATURED_PACKAGES: PackageCardData[] = [
  {
    id: '1',
    slug: 'lahore-walled-city-heritage-walk',
    title: 'Walled City Heritage Walk — 2,000 Years of Lahore',
    tier: 'CULTURAL',
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
    tier: 'FOOD',
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
    tier: 'NATURE',
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
    tier: 'NATURE',
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
    tier: 'NATURE',
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
    slug: 'karachi-coastal-heritage-and-mangrove-safari',
    title: 'Karachi Mangroves Safari & Manora Island Cruise',
    tier: 'NATURE',
    city: { name: 'Karachi', slug: 'karachi' },
    durationHours: 5,
    minParty: 2,
    maxParty: 10,
    images: ['https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800&auto=format&fit=crop'],
    rating: 4.8,
    reviewCount: 26,
    description: 'Traditional private wooden boat cruise through Arabian Sea mangrove forests, lighthouse visit, and crab feast.',
  },
];

function FeaturedPackagesSection() {
  return (
    <section className="py-20 bg-[#FAF6ED] border-t border-b border-[#E8DFD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <AnimatedSection className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-widest text-[#B99550]">
              Handcrafted Itineraries
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
              Featured{' '}
              <span className="bg-gradient-to-r from-[#123C2D] via-[#1a5540] to-[#B99550] bg-clip-text text-transparent">
                Experiences
              </span>
            </h2>
          </div>
          <Link
            href="/explore"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#123C2D] hover:text-[#B99550] transition-colors"
          >
            <span>View All Experiences</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </AnimatedSection>
      </div>

      {/* Grid of Packages - Exactly Same Dimensions and Style across App */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_PACKAGES.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 5. Trusted Guides ──────────────────────────────── */
const demoGuides = [
  { name: 'Ahmed Raza', specialty: 'Mughal Heritage', rating: 4.9, city: 'Lahore' },
  { name: 'Fatima Khan', specialty: 'Karachi Food Trails', rating: 5.0, city: 'Karachi' },
  { name: 'Imran Butt', specialty: 'Karakoram Treks', rating: 4.8, city: 'Gilgit' },
  { name: 'Sana Malik', specialty: 'Cultural Walks', rating: 4.9, city: 'Islamabad' },
  { name: 'Zubair Shah', specialty: 'Walled City Trails', rating: 4.7, city: 'Lahore' },
  { name: 'Ayesha Noor', specialty: 'Sufi Shrines & Art', rating: 5.0, city: 'Multan' },
];

const avatarColors = [
  'from-emerald-700 to-teal-600',
  'from-amber-600 to-yellow-500',
  'from-blue-700 to-sky-600',
  'from-emerald-800 to-green-600',
  'from-rose-700 to-orange-500',
  'from-amber-700 to-yellow-600',
];

function TrustedGuidesSection() {
  return (
    <section className="py-20 bg-[#FAF6ED] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12 space-y-1">
          <p className="text-xs font-bold uppercase tracking-widest text-[#B99550]">
            Our Certified Storytellers
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            Meet Your Local{' '}
            <span className="bg-gradient-to-r from-[#123C2D] to-[#B99550] bg-clip-text text-transparent">
              Guides
            </span>
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
            100% CNIC verified, police checked, and trained in first aid and local hospitality.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
          {demoGuides.map((guide, i) => (
            <motion.div
              key={guide.name}
              variants={fadeUp}
              custom={i}
              className="flex flex-col items-center text-center group cursor-pointer bg-[#F3ECE0] hover:bg-[#FAF6ED] p-5 rounded-2xl border border-[#E8DFD0] hover:border-[#B99550]/50 hover:shadow-md transition-all"
            >
              {/* Avatar */}
              <div className="relative mb-3">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${avatarColors[i]} flex items-center justify-center text-white text-xl font-bold font-serif shadow-sm group-hover:scale-105 transition-transform`}>
                  {guide.name.charAt(0)}
                </div>
                {/* Verified badge */}
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#123C2D] border-2 border-white flex items-center justify-center">
                  <CheckCircle className="w-3.5 h-3.5 fill-[#B99550] text-[#123C2D]" />
                </div>
              </div>
              <p className="font-bold text-gray-900 text-xs sm:text-sm group-hover:text-[#123C2D] transition-colors">{guide.name}</p>
              <p className="text-gray-500 text-[11px] mt-0.5">{guide.city}</p>
              <div className="flex items-center gap-1 mt-1 text-[11px] font-semibold text-gray-700">
                <Star className="w-3 h-3 fill-[#B99550] text-[#B99550]" />
                <span>{guide.rating}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 6. Latest Reviews ──────────────────────────────── */
const reviews = [
  {
    stars: 5,
    excerpt: "Absolutely magical! Ahmed took us through Walled City alleys I would never have found on my own. The food and stories behind every gate made it unforgettable.",
    name: 'Sarah L.',
    flag: '🇬🇧',
    package: 'Old Lahore Food Walk',
  },
  {
    stars: 5,
    excerpt: "As a solo traveller, I was cautious about travelling through Pakistan. Daastaan's verified guide and live safety tracking made me feel completely secure and welcomed.",
    name: 'Marco T.',
    flag: '🇮🇹',
    package: 'Badshahi Mosque Heritage Tour',
  },
  {
    stars: 5,
    excerpt: "Fairy Meadows & Hunza were an absolute dream. Imran guided us with immense care and passion. The sunrise over Nanga Parbat will stay with me forever.",
    name: 'Yuki R.',
    flag: '🇯🇵',
    package: 'Fairy Meadows Trek',
  },
];

function LatestReviewsSection() {
  return (
    <section className="py-20 bg-[#F3ECE0] border-t border-b border-[#E8DFD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12 space-y-1">
          <p className="text-xs font-bold uppercase tracking-widest text-[#B99550]">
            Traveller Testimonials
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            Real Stories, Real{' '}
            <span className="bg-gradient-to-r from-[#123C2D] to-[#B99550] bg-clip-text text-transparent">
              Moments
            </span>
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              custom={i}
              className="bg-white rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-lg border border-gray-200/80 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: r.stars }).map((_, s) => (
                    <Star key={s} className="w-4 h-4 fill-[#B99550] text-[#B99550]" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-6 italic">
                  &ldquo;{r.excerpt}&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                <div className="w-9 h-9 rounded-full bg-[#123C2D] text-[#B99550] flex items-center justify-center font-bold text-xs">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-xs sm:text-sm text-gray-900">
                    {r.name} <span>{r.flag}</span>
                  </p>
                  <p className="text-[11px] text-gray-500">{r.package}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 7. From the Blog ───────────────────────────────── */
const blogPosts = [
  {
    title: "10 Hidden Gems in Lahore You've Never Heard Of",
    category: 'Travel Guide',
    readTime: '5 min read',
    color: 'from-amber-800 to-orange-700',
  },
  {
    title: 'A Complete Guide to Travelling the Karakoram Highway',
    category: 'Adventure',
    readTime: '8 min read',
    color: 'from-emerald-800 to-teal-700',
  },
  {
    title: 'Pakistani Street Food: A Beginner\'s Guide',
    category: 'Food & Culture',
    readTime: '4 min read',
    color: 'from-rose-800 to-orange-700',
  },
];

function FromTheBlogSection() {
  return (
    <section className="py-24 bg-[#FAF6ED]">
      <div className="container-section">
        <AnimatedSection className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <motion.p variants={fadeUp} className="text-brand-gold font-semibold text-sm uppercase tracking-widest mb-2">
              Stories & Guides
            </motion.p>
            <motion.h2 variants={fadeUp} className="section-title text-brand-green">
              From the Blog
            </motion.h2>
          </div>
          <motion.div variants={fadeUp}>
            <Link href="/blog" className="inline-flex items-center gap-1 text-brand-green font-semibold hover:text-brand-gold transition-colors">
              All Articles <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, i) => (
            <motion.div key={i} variants={fadeUp} custom={i}>
              <Link href="/blog" className="group block card">
                <div className={`h-48 bg-gradient-to-br ${post.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 pattern-overlay-dark opacity-30" />
                  <div className="absolute top-4 left-4">
                    <span className="text-xs font-semibold bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full border border-white/30">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-lg font-bold text-brand-charcoal mb-3 line-clamp-2 group-hover:text-brand-green transition-colors">
                    {post.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-brand-charcoal/50 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />{post.readTime}
                    </span>
                    <span className="text-brand-gold text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read More <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 8. CTA Banner ──────────────────────────────────── */
function CTABannerSection() {
  return (
    <section className="relative py-28 bg-brand-green overflow-hidden pattern-overlay-dark">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 70% 80% at 50% 50%, rgba(185,149,80,0.1) 0%, transparent 70%)',
      }} />
      <div className="container-section relative z-10 text-center">
        <AnimatedSection>
          <motion.p variants={fadeUp} className="text-brand-gold/80 text-sm font-semibold uppercase tracking-widest mb-4">
            Your Story Awaits
          </motion.p>
          <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Ready to Live Your Story?
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/65 text-lg max-w-xl mx-auto mb-10">
            Join thousands of travellers discovering the real Pakistan, one story at a time.
          </motion.p>
          <motion.div variants={fadeUp}>
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-brand-gold text-white font-bold text-base transition-all duration-300 hover:bg-brand-gold-light hover:shadow-gold-hover hover:-translate-y-0.5 active:scale-95"
            >
              Start Exploring Pakistan
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── Main Export ────────────────────────────────────── */
export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FAF6ED] flex flex-col font-sans">
      <Header />
      <main className="flex-1">
        {/* 1. Cinematic Hero with Transitioning Destinations Directly Under Header */}
        <HeroSection />

        {/* 2. Feature Highlights Bar */}
        <FeatureHighlightsBar />
        <TrustPillarsBanner />

        {/* 3. Discover Pakistan 5 Cards Grid */}
        <DiscoverPakistanSection />

        {/* 4. Callout Ribbon Banner */}
        <CalloutRibbonBanner />

        {/* 5. Core Tour Catalog & Platform Features */}
        <FeaturedPackagesSection />
        <HowItWorksSection />
        <TrustedGuidesSection />
        <LatestReviewsSection />
        <FromTheBlogSection />
        <CTABannerSection />
      </main>
      <Footer />
    </div>
  );
}
