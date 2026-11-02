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

/* ─── 1. Hero Section (Matching Official Montage Mockup) ───────────── */
function HeroSection() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/explore?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/explore');
    }
  };

  return (
    <section className="relative pt-[104px] sm:pt-[112px] bg-[#EAE8E2] overflow-hidden">
      {/* Background Panoramic Montage of Pakistan (Faisal Mosque, Karakoram, Lahore Fort, Truck Art) */}
      <div className="relative min-h-[460px] sm:min-h-[520px] lg:min-h-[580px] w-full flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-pakistan-montage.jpg"
            alt="Daastaan e Pakistan — Faisal Mosque, Karakoram Mountains, Lahore Fort & Truck Art"
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle gradient to ensure flawless readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/60" />
        </div>

        {/* Center Content Overlay */}
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 py-12 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-3"
          >
            {/* Title with Calligraphic Charm */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#123C2D] tracking-tight drop-shadow-sm">
              Daastaan e Pakistan
            </h1>

            {/* Golden Swoosh Underline */}
            <div className="w-44 sm:w-60 h-1.5 bg-gradient-to-r from-transparent via-[#B99550] to-transparent rounded-full mx-auto" />

            {/* Subtitle */}
            <p className="font-serif italic text-sm sm:text-lg lg:text-xl text-[#292D2A] max-w-2xl mx-auto leading-relaxed drop-shadow-sm pt-1">
              Discover the Land, Experience the Culture,
              <br className="hidden sm:inline" /> Be a Part of Our Story
            </p>
          </motion.div>

          {/* Interactive Search Bar Matching Mockup */}
          <motion.form
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onSubmit={handleSearch}
            className="max-w-2xl mx-auto mt-6 sm:mt-8 w-full"
          >
            <div className="relative flex items-center bg-white rounded-full shadow-2xl p-1.5 sm:p-2 border border-gray-200/90 hover:border-[#123C2D]/50 transition-all">
              <Search className="w-5 h-5 text-gray-400 ml-3.5 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Tours, Destinations or Experiences..."
                className="w-full bg-transparent px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm text-gray-800 placeholder-gray-500 focus:outline-none"
              />
              <button
                type="submit"
                className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-[#123C2D] hover:bg-[#0c2b20] text-white font-semibold text-xs sm:text-sm tracking-wide transition shadow-md hover:shadow-lg shrink-0"
              >
                Search
              </button>
            </div>
          </motion.form>
        </div>
      </div>

      {/* ─── Feature Highlights Bar (Directly below hero) ─────────────── */}
      <div className="bg-[#F6F3EC] border-y border-[#E2DCce] py-4 sm:py-5 px-4 sm:px-6 lg:px-8 shadow-inner">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-[#D8D2C2] text-[#123C2D]">
          {/* 1. Breathtaking Landscapes */}
          <div className="flex items-center justify-center gap-3 p-3 text-left">
            <Mountain className="w-7 h-7 text-[#123C2D] shrink-0" />
            <div className="text-xs sm:text-sm font-bold leading-tight">
              Breathtaking<br />Landscapes
            </div>
          </div>

          {/* 2. Rich Cultural Heritage */}
          <div className="flex items-center justify-center gap-3 p-3 text-left">
            <Landmark className="w-7 h-7 text-[#123C2D] shrink-0" />
            <div className="text-xs sm:text-sm font-bold leading-tight">
              Rich Cultural<br />Heritage
            </div>
          </div>

          {/* 3. Vibrant Traditions */}
          <div className="flex items-center justify-center gap-3 p-3 text-left">
            <Sparkles className="w-7 h-7 text-[#123C2D] shrink-0" />
            <div className="text-xs sm:text-sm font-bold leading-tight">
              Vibrant<br />Traditions
            </div>
          </div>

          {/* 4. Warm Hospitality */}
          <div className="flex items-center justify-center gap-3 p-3 text-left">
            <Users className="w-7 h-7 text-[#123C2D] shrink-0" />
            <div className="text-xs sm:text-sm font-bold leading-tight">
              Warm<br />Hospitality
            </div>
          </div>

          {/* 5. Unforgettable Journeys */}
          <div className="flex items-center justify-center gap-3 p-3 text-left col-span-2 md:col-span-1 border-t md:border-t-0">
            <Globe className="w-7 h-7 text-[#123C2D] shrink-0" />
            <div className="text-xs sm:text-sm font-bold leading-tight">
              Unforgettable<br />Journeys
            </div>
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
    <section className="py-14 sm:py-16 bg-[#FDFCF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Header with Horizontal Lines */}
        <div className="flex items-center justify-center gap-4 mb-8 sm:mb-10">
          <div className="h-[1.5px] bg-[#123C2D]/30 w-16 sm:w-28" />
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#123C2D] tracking-tight">
            Discover Pakistan
          </h2>
          <div className="h-[1.5px] bg-[#123C2D]/30 w-16 sm:w-28" />
        </div>

        {/* 5 Photo Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {DISCOVER_CARDS.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-44 sm:h-48 border border-gray-200"
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
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
    <section className="bg-gradient-to-r from-[#0B251B] via-[#123C2D] to-[#0B251B] text-white py-4 sm:py-5 px-4 sm:px-6 lg:px-8 border-y border-[#B99550]/30 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Silhouette Artwork */}
        <div className="hidden lg:flex items-center opacity-85 hover:opacity-100 transition-opacity">
          <img
            src="/images/monuments-silhouette.png"
            alt="Pakistani Architectural Monuments Silhouette"
            className="h-10 sm:h-12 w-auto object-contain brightness-0 invert"
          />
        </div>

        {/* Center: Script Text */}
        <div className="text-center">
          <p className="font-serif italic text-base sm:text-xl lg:text-2xl text-white font-normal drop-shadow-sm">
            Every journey tells a story...{' '}
            <span className="text-[#E5B558] font-semibold underline decoration-[#E5B558]/60 underline-offset-4">
              Let's explore Pakistan together!
            </span>
          </p>
        </div>

        {/* Right: Golden CTA Button */}
        <div>
          <Link
            href="/explore"
            className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#E5A83B] hover:bg-[#d4972a] text-[#0B251B] font-bold text-xs sm:text-sm tracking-wide shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <span>Explore More</span>
            <ChevronRight className="w-4 h-4" />
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
    <section id="how-it-works" className="py-24 bg-brand-ivory" ref={ref}>
      <div className="container-section">
        <AnimatedSection className="text-center mb-16">
          <motion.p variants={fadeUp} className="text-brand-gold font-semibold text-sm uppercase tracking-widest mb-3">
            Simple & Transparent
          </motion.p>
          <motion.h2 variants={fadeUp} className="section-title text-brand-green mb-4">
            How Daastaan Works
          </motion.h2>
          <motion.p variants={fadeUp} className="section-subtitle mx-auto text-brand-charcoal/65">
            Four easy steps to an unforgettable Pakistani adventure
          </motion.p>
        </AnimatedSection>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-brand-gold/25 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 relative z-10">
            {steps.map(({ num, icon: Icon, title, desc }, i) => (
              <motion.div
                key={num}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className="flex flex-col items-center text-center group"
              >
                {/* Number + icon circle */}
                <div className="relative mb-6">
                  <div className="w-24 h-24 rounded-full bg-brand-green flex items-center justify-center shadow-lg group-hover:shadow-card-hover transition-shadow duration-300 group-hover:scale-105 transition-transform">
                    <Icon className="w-8 h-8 text-brand-gold" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-brand-gold text-white text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-bold text-brand-green mb-3">{title}</h3>
                <p className="text-brand-charcoal/65 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── 3. Package Categories ──────────────────────────── */
const categories = [
  {
    icon: Landmark,
    name: 'Cultural Heritage',
    desc: 'Mosques, forts, old cities — immerse in centuries of living history.',
    href: '/explore?tier=CULTURAL',
    bg: 'from-amber-900/30 to-amber-700/20',
    border: 'border-amber-700/30',
    iconBg: 'bg-amber-700/20',
    iconColor: 'text-amber-300',
    tag: 'Cultural',
  },
  {
    icon: UtensilsCrossed,
    name: 'Food Trails',
    desc: "From Lahori charga to Hunza apricots — taste Pakistan's soul.",
    href: '/explore?tier=FOOD',
    bg: 'from-orange-900/30 to-orange-700/20',
    border: 'border-orange-700/30',
    iconBg: 'bg-orange-700/20',
    iconColor: 'text-orange-300',
    tag: 'Food',
  },
  {
    icon: Heart,
    name: 'Family Adventures',
    desc: 'Safe, curated experiences designed for families and all ages.',
    href: '/explore?tier=FAMILY',
    bg: 'from-emerald-900/30 to-emerald-700/20',
    border: 'border-emerald-700/30',
    iconBg: 'bg-emerald-700/20',
    iconColor: 'text-emerald-300',
    tag: 'Family',
  },
  {
    icon: Mountain,
    name: 'Nature & Mountains',
    desc: 'K2, Nanga Parbat, Fairy Meadows — witness the earth at its finest.',
    href: '/explore?tier=NATURE',
    bg: 'from-sky-900/30 to-sky-700/20',
    border: 'border-sky-700/30',
    iconBg: 'bg-sky-700/20',
    iconColor: 'text-sky-300',
    tag: 'Nature',
  },
];

function PackageCategoriesSection() {
  return (
    <section className="py-24 bg-brand-green pattern-overlay">
      <div className="container-section">
        <AnimatedSection className="text-center mb-16">
          <motion.p variants={fadeUp} className="text-brand-gold font-semibold text-sm uppercase tracking-widest mb-3">
            What We Offer
          </motion.p>
          <motion.h2 variants={fadeUp} className="section-title text-white mb-4">
            Explore by Category
          </motion.h2>
          <motion.p variants={fadeUp} className="section-subtitle text-white/65 mx-auto">
            Every kind of journey Pakistan has to offer
          </motion.p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map(({ icon: Icon, name, desc, href, bg, border, iconBg, iconColor, tag }, i) => (
            <motion.div
              key={name}
              variants={fadeUp}
              custom={i}
            >
              <Link
                href={href}
                className={`group block rounded-2xl border ${border} bg-gradient-to-br ${bg} backdrop-blur-sm p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-gold/60 hover:shadow-[0_8px_30px_rgba(185,149,80,0.2)]`}
              >
                <div className={`w-14 h-14 rounded-xl ${iconBg} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className={`w-7 h-7 ${iconColor}`} />
                </div>
                <h3 className="font-serif text-xl font-bold text-white mb-3">{name}</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-5">{desc}</p>
                <span className="inline-flex items-center gap-1 text-brand-gold text-sm font-semibold group-hover:gap-2 transition-all">
                  Explore <ChevronRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>
          ))}
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
  FOOD: 'bg-orange-100 text-orange-700',
  CULTURAL: 'bg-amber-100 text-amber-700',
  FAMILY: 'bg-blue-100 text-blue-700',
  NATURE: 'bg-emerald-100 text-emerald-700',
};

function FeaturedPackagesSection() {
  return (
    <section className="py-24 bg-brand-ivory overflow-hidden">
      <div className="container-section mb-12">
        <AnimatedSection className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <motion.p variants={fadeUp} className="text-brand-gold font-semibold text-sm uppercase tracking-widest mb-2">
              Top Picks
            </motion.p>
            <motion.h2 variants={fadeUp} className="section-title text-brand-green">
              Featured Experiences
            </motion.h2>
          </div>
          <motion.div variants={fadeUp}>
            <Link href="/explore" className="inline-flex items-center gap-1 text-brand-green font-semibold hover:text-brand-gold transition-colors">
              View All Experiences <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </AnimatedSection>
      </div>

      {/* Horizontal scroll carousel */}
      <div className="pl-4 sm:pl-6 lg:pl-8">
        <div className="flex gap-6 overflow-x-auto no-scrollbar pb-4" style={{ paddingRight: '2rem' }}>
          {demoPackages.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              variants={fadeIn}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex-none w-72"
            >
              <Link href={`/package/${pkg.title.toLowerCase().replace(/\s+/g, '-')}`}>
                <div className="card group cursor-pointer">
                  {/* Cover image placeholder */}
                  <div className={`relative h-48 bg-gradient-to-br ${pkg.color} overflow-hidden`}>
                    <div className="absolute inset-0 pattern-overlay-dark opacity-40" />
                    <div className="absolute top-3 left-3">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${tierColors[pkg.tier]}`}>
                        {pkg.tier.charAt(0) + pkg.tier.slice(1).toLowerCase()}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white/90 text-sm">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{pkg.city}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-base font-bold text-brand-charcoal mb-2 line-clamp-1 group-hover:text-brand-green transition-colors">
                      {pkg.title}
                    </h3>
                    <div className="flex items-center gap-3 text-brand-charcoal/55 text-xs mb-4">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{pkg.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-brand-gold text-brand-gold" />
                        <span className="text-sm font-semibold text-brand-charcoal">{pkg.rating}</span>
                        <span className="text-xs text-brand-charcoal/50">({pkg.reviews})</span>
                      </div>
                      <span className="text-xs font-semibold text-brand-green border border-brand-green/30 px-2.5 py-1 rounded-full group-hover:bg-brand-green group-hover:text-white transition-all">
                        View Details
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
  { name: 'Ahmed Raza', specialty: 'Cultural Heritage', rating: 4.9, city: 'Lahore' },
  { name: 'Fatima Khan', specialty: 'Food Trails', rating: 5.0, city: 'Karachi' },
  { name: 'Imran Butt', specialty: 'Mountain Treks', rating: 4.8, city: 'Gilgit' },
  { name: 'Sana Malik', specialty: 'Family Tours', rating: 4.9, city: 'Islamabad' },
  { name: 'Zubair Shah', specialty: 'Nature Walks', rating: 4.7, city: 'Lahore' },
  { name: 'Ayesha Noor', specialty: 'Heritage Trails', rating: 5.0, city: 'Multan' },
];

const avatarColors = [
  'from-emerald-600 to-teal-500',
  'from-orange-500 to-amber-400',
  'from-sky-600 to-blue-500',
  'from-violet-600 to-purple-500',
  'from-rose-600 to-pink-500',
  'from-amber-600 to-yellow-500',
];

function TrustedGuidesSection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container-section">
        <AnimatedSection className="text-center mb-14">
          <motion.p variants={fadeUp} className="text-brand-gold font-semibold text-sm uppercase tracking-widest mb-3">
            Our Community
          </motion.p>
          <motion.h2 variants={fadeUp} className="section-title text-brand-green mb-4">
            Meet Our Verified Guides
          </motion.h2>
          <motion.p variants={fadeUp} className="section-subtitle mx-auto text-brand-charcoal/65">
            Passionate locals who know Pakistan like their own heartbeat
          </motion.p>
        </AnimatedSection>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {demoGuides.map((guide, i) => (
            <motion.div
              key={guide.name}
              variants={fadeUp}
              custom={i}
              className="flex flex-col items-center text-center group cursor-pointer"
            >
              {/* Avatar */}
              <div className="relative mb-4">
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${avatarColors[i]} flex items-center justify-center text-white text-2xl font-bold font-serif shadow-md transition-transform duration-300 group-hover:scale-110`}>
                  {guide.name.charAt(0)}
                </div>
                {/* Verified badge */}
                <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-brand-green border-2 border-white flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 fill-white text-white" />
                </div>
              </div>
              <p className="font-semibold text-brand-charcoal text-sm group-hover:text-brand-green transition-colors">{guide.name}</p>
              <p className="text-brand-charcoal/55 text-xs mt-0.5">{guide.specialty}</p>
              <div className="flex items-center gap-0.5 mt-1.5">
                <Star className="w-3 h-3 fill-brand-gold text-brand-gold" />
                <span className="text-xs font-semibold text-brand-charcoal">{guide.rating}</span>
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
    excerpt: "Absolutely magical! Ahmed took us through streets I would never have found on my own. The food was incredible and the stories behind every dish made it unforgettable.",
    name: 'Sarah L.',
    flag: '🇬🇧',
    package: 'Old Lahore Food Walk',
  },
  {
    stars: 5,
    excerpt: "As someone who was nervous about travelling to Pakistan, this experience completely changed my perspective. Felt completely safe, welcomed, and inspired.",
    name: 'Marco T.',
    flag: '🇮🇹',
    package: 'Badshahi Mosque Heritage Tour',
  },
  {
    stars: 5,
    excerpt: "Fairy Meadows was a dream. Imran guided us with such care and knowledge. The sunrise over Nanga Parbat will stay with me forever. Book this. Now.",
    name: 'Yuki R.',
    flag: '🇯🇵',
    package: 'Fairy Meadows Trek',
  },
];

function LatestReviewsSection() {
  return (
    <section className="py-24 bg-brand-ivory pattern-overlay">
      <div className="container-section">
        <AnimatedSection className="text-center mb-14">
          <motion.p variants={fadeUp} className="text-brand-gold font-semibold text-sm uppercase tracking-widest mb-3">
            Testimonials
          </motion.p>
          <motion.h2 variants={fadeUp} className="section-title text-brand-green mb-4">
            What Travellers Say
          </motion.h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              custom={i}
              className="bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: r.stars }).map((_, s) => (
                  <Star key={s} className="w-4 h-4 fill-brand-gold text-brand-gold" />
                ))}
              </div>
              <p className="text-brand-charcoal/75 text-sm leading-relaxed mb-6 italic">
                &ldquo;{r.excerpt}&rdquo;
              </p>
              <div className="flex items-center gap-3 border-t border-brand-ivory-dark pt-5">
                <div className="w-10 h-10 rounded-full bg-brand-green flex items-center justify-center text-white font-bold text-sm">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-sm text-brand-charcoal">
                    {r.name} <span>{r.flag}</span>
                  </p>
                  <p className="text-xs text-brand-charcoal/55">{r.package}</p>
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
    <div className="min-h-screen bg-[#FDFCF9] flex flex-col font-sans">
      <Header />
      <main className="flex-1">
        {/* 1. Hero with Panorama + Search + Feature Highlights Bar */}
        <HeroSection />

        {/* 2. Discover Pakistan 5 Cards Grid */}
        <DiscoverPakistanSection />

        {/* 3. Callout Ribbon Banner */}
        <CalloutRibbonBanner />

        {/* 4. Core Tour Catalog & Platform Features */}
        <FeaturedPackagesSection />
        <HowItWorksSection />
        <PackageCategoriesSection />
        <TrustedGuidesSection />
        <LatestReviewsSection />
        <FromTheBlogSection />
        <CTABannerSection />
      </main>
      <Footer />
    </div>
  );
}
