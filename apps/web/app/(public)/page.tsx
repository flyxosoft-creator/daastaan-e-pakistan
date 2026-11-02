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
  ChevronRight,
  Sparkles,
  Search,
} from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

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
    if (searchQuery.trim()) {
      router.push(`/explore?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/explore');
    }
  };

  const handleQuickSearch = (term: string) => {
    router.push(`/explore?q=${encodeURIComponent(term)}`);
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
              onClick={() => handleQuickSearch('Lahore')}
              className="px-3 py-1 rounded-full bg-white/20 hover:bg-white/35 backdrop-blur-md border border-white/25 transition-all text-white font-medium"
            >
              📍 Lahore Walled City
            </button>
            <button
              type="button"
              onClick={() => handleQuickSearch('Hunza')}
              className="px-3 py-1 rounded-full bg-white/20 hover:bg-white/35 backdrop-blur-md border border-white/25 transition-all text-white font-medium"
            >
              🏔️ Hunza Valley
            </button>
            <button
              type="button"
              onClick={() => handleQuickSearch('Food')}
              className="px-3 py-1 rounded-full bg-white/20 hover:bg-white/35 backdrop-blur-md border border-white/25 transition-all text-white font-medium"
            >
              🍲 Food Trails
            </button>
            <button
              type="button"
              onClick={() => handleQuickSearch('Karachi')}
              className="px-3 py-1 rounded-full bg-white/20 hover:bg-white/35 backdrop-blur-md border border-white/25 transition-all text-white font-medium"
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
    <section className="bg-[#FAF9F5] border-b border-gray-200 py-6 px-4 sm:px-6 lg:px-8 shadow-xs">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-gray-200 text-[#123C2D]">
        {/* 1. Breathtaking Landscapes */}
        <div className="flex items-center justify-center gap-3 p-3 text-left">
          <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center shrink-0 shadow-xs">
            <Mountain className="w-5 h-5 text-[#123C2D]" />
          </div>
          <div className="text-xs sm:text-sm font-bold leading-tight text-[#123C2D]">
            Breathtaking<br /><span className="text-[#B99550] font-semibold text-[11px] sm:text-xs">Landscapes</span>
          </div>
        </div>

        {/* 2. Rich Cultural Heritage */}
        <div className="flex items-center justify-center gap-3 p-3 text-left">
          <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center shrink-0 shadow-xs">
            <Landmark className="w-5 h-5 text-[#123C2D]" />
          </div>
          <div className="text-xs sm:text-sm font-bold leading-tight text-[#123C2D]">
            Rich Cultural<br /><span className="text-[#B99550] font-semibold text-[11px] sm:text-xs">Heritage</span>
          </div>
        </div>

        {/* 3. Vibrant Traditions */}
        <div className="flex items-center justify-center gap-3 p-3 text-left">
          <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center shrink-0 shadow-xs">
            <Sparkles className="w-5 h-5 text-[#123C2D]" />
          </div>
          <div className="text-xs sm:text-sm font-bold leading-tight text-[#123C2D]">
            Vibrant<br /><span className="text-[#B99550] font-semibold text-[11px] sm:text-xs">Traditions</span>
          </div>
        </div>

        {/* 4. Warm Hospitality */}
        <div className="flex items-center justify-center gap-3 p-3 text-left">
          <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center shrink-0 shadow-xs">
            <Users className="w-5 h-5 text-[#123C2D]" />
          </div>
          <div className="text-xs sm:text-sm font-bold leading-tight text-[#123C2D]">
            Warm<br /><span className="text-[#B99550] font-semibold text-[11px] sm:text-xs">Hospitality</span>
          </div>
        </div>

        {/* 5. Unforgettable Journeys */}
        <div className="flex items-center justify-center gap-3 p-3 text-left col-span-2 md:col-span-1 border-t md:border-t-0">
          <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center shrink-0 shadow-xs">
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

/* ─── 2. Discover Pakistan Section (Matching 5 Cards Grid) ─────────── */
const DISCOVER_CARDS = [
  {
    title: 'Northern Pakistan',
    image: '/images/card-northern-pakistan.jpg',
    href: '/explore?region=northern',
  },
  {
    title: 'Historical Cities',
    image: '/images/card-historical-cities.jpg',
    href: '/explore/lahore',
  },
  {
    title: 'Coastal Beauty',
    image: '/images/card-coastal-beauty.jpg',
    href: '/explore?region=coastal',
  },
  {
    title: 'Culture & Traditions',
    image: '/images/card-culture-traditions.jpg',
    href: '/explore?category=culture',
  },
  {
    title: 'Adventure Tours',
    image: '/images/card-adventure-tours.jpg',
    href: '/explore?category=adventure',
  },
];

function DiscoverPakistanSection() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Header with Clean Theme Gradient */}
        <div className="text-center space-y-2 mb-10 sm:mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-[#B99550]">
            Curated Regional Trails
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
            Discover{' '}
            <span className="bg-gradient-to-r from-[#123C2D] to-[#B99550] bg-clip-text text-transparent">
              Pakistan
            </span>
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
            From the Karakoram heights to ancient Mughal streets and azure coastal bays.
          </p>
        </div>

        {/* 5 Photo Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
          {DISCOVER_CARDS.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 h-52 sm:h-56 border border-gray-200/80 hover:border-[#B99550]/50"
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between">
                <span className="text-white font-bold text-xs sm:text-sm drop-shadow-md leading-tight">
                  {card.title}
                </span>
                <div className="w-6 h-6 rounded-full border border-white/60 flex items-center justify-center text-white text-xs group-hover:bg-[#B99550] group-hover:border-[#B99550] group-hover:text-[#123C2D] transition-colors shrink-0">
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 3. Callout Ribbon Banner ────────────────────────────────────── */
function CalloutRibbonBanner() {
  return (
    <section className="py-6 px-4 sm:px-6 lg:px-8 bg-white">
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
    <section id="how-it-works" className="py-20 bg-white" ref={ref}>
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
                className="flex flex-col items-center text-center group bg-[#FAF9F5] hover:bg-white p-6 rounded-2xl border border-gray-200/80 hover:border-[#B99550]/50 hover:shadow-lg transition-all duration-300"
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
const demoPackages = [
  { id: 1, title: 'Old Lahore Food Walk', city: 'Lahore', duration: '4 hrs', rating: 4.9, reviews: 128, tier: 'FOOD', color: 'from-orange-800 to-amber-700' },
  { id: 2, title: 'Badshahi Mosque Heritage Tour', city: 'Lahore', duration: '3 hrs', rating: 4.8, reviews: 97, tier: 'CULTURAL', color: 'from-amber-900 to-yellow-800' },
  { id: 3, title: 'Fairy Meadows Trek', city: 'Gilgit', duration: '3 days', rating: 5.0, reviews: 64, tier: 'NATURE', color: 'from-emerald-900 to-teal-800' },
  { id: 4, title: 'Islamabad Family Day Out', city: 'Islamabad', duration: '6 hrs', rating: 4.7, reviews: 83, tier: 'FAMILY', color: 'from-blue-900 to-sky-800' },
  { id: 5, title: 'Hunza Valley Jeep Safari', city: 'Hunza', duration: '2 days', rating: 4.9, reviews: 112, tier: 'NATURE', color: 'from-green-900 to-emerald-800' },
  { id: 6, title: 'Karachi Street Food Safari', city: 'Karachi', duration: '3 hrs', rating: 4.8, reviews: 145, tier: 'FOOD', color: 'from-rose-900 to-orange-800' },
];

const tierColors: Record<string, string> = {
  FOOD: 'bg-orange-50 text-orange-700 border border-orange-200',
  CULTURAL: 'bg-amber-50 text-amber-700 border border-amber-200',
  FAMILY: 'bg-blue-50 text-blue-700 border border-blue-200',
  NATURE: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
};

function FeaturedPackagesSection() {
  return (
    <section className="py-20 bg-[#FAF9F5] border-t border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <AnimatedSection className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-widest text-[#B99550]">
              Handcrafted Itineraries
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
              Featured{' '}
              <span className="bg-gradient-to-r from-[#123C2D] to-[#B99550] bg-clip-text text-transparent">
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

      {/* Grid of Packages */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {demoPackages.slice(0, 6).map((pkg, i) => (
            <motion.div
              key={pkg.id}
              variants={fadeIn}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Link href={`/package/${pkg.title.toLowerCase().replace(/\s+/g, '-')}`}>
                <div className="group rounded-2xl bg-white border border-gray-200/90 hover:border-[#B99550]/50 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300">
                  <div className={`relative h-44 bg-gradient-to-br ${pkg.color} overflow-hidden`}>
                    <div className="absolute top-3 left-3">
                      <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${tierColors[pkg.tier]}`}>
                        {pkg.tier.charAt(0) + pkg.tier.slice(1).toLowerCase()}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white/95 text-xs font-medium bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-full">
                      <MapPin className="w-3 h-3 text-[#E5B558]" />
                      <span>{pkg.city}</span>
                    </div>
                  </div>
                  <div className="p-5 space-y-3">
                    <h3 className="font-serif text-base font-bold text-gray-900 line-clamp-1 group-hover:text-[#123C2D] transition-colors">
                      {pkg.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-gray-500 pt-1 border-t border-gray-100">
                      <span className="flex items-center gap-1 font-medium">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        {pkg.duration}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-[#B99550] text-[#B99550]" />
                        <span className="font-bold text-gray-800">{pkg.rating}</span>
                        <span className="text-gray-400">({pkg.reviews})</span>
                      </div>
                    </div>
                    <div className="pt-2">
                      <span className="block w-full text-center py-2 rounded-xl bg-gray-50 group-hover:bg-[#123C2D] text-gray-700 group-hover:text-white text-xs font-bold transition-all">
                        View Itinerary ↗
                      </span>
                    </div>
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
    <section className="py-20 bg-white overflow-hidden">
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
              className="flex flex-col items-center text-center group cursor-pointer bg-[#FAF9F5] p-5 rounded-2xl border border-gray-200/80 hover:border-[#B99550]/50 hover:shadow-md transition-all"
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
    <section className="py-20 bg-[#FAF9F5] border-t border-b border-gray-200/80">
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
    <section className="py-24 bg-white">
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
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header />
      <main className="flex-1">
        {/* 1. Cinematic Hero with Transitioning Destinations Directly Under Header */}
        <HeroSection />

        {/* 2. Feature Highlights Bar */}
        <FeatureHighlightsBar />

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
