'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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

/* ─── 1. Hero Section ────────────────────────────────── */
const MOUNTAIN_VISTAS = [
  {
    id: 'karakoram',
    name: 'Karakoram & Hunza Valley',
    sub: 'Passu Cones & Alpine Waters',
    image: '/images/hero-cinematic-pakistan.jpg',
  },
  {
    id: 'attabad',
    name: 'Attabad Glacial Lake',
    sub: 'Turquoise Jewel of Gojal',
    image: '/images/hero-mountains-lake.jpg',
  },
  {
    id: 'skardu',
    name: 'Shangrila & Skardu Peaks',
    sub: 'Gateway to the Giants of Baltistan',
    image: '/images/hero-hunza.jpg',
  },
];

function HeroSection() {
  const [activeVistaIndex, setActiveVistaIndex] = useState(0);
  const currentVista = MOUNTAIN_VISTAS[activeVistaIndex];

  return (
    <section className="relative min-h-[95vh] sm:min-h-screen flex items-end justify-start overflow-hidden">
      {/* Background Live Photographic Pakistan Mountain Landscape */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentVista.id}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1.06 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.2 },
              scale: { duration: 20, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
            }}
            className="w-full h-full absolute inset-0"
          >
            <img
              src={currentVista.image}
              alt={currentVista.name}
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>

        {/* Cinematic Subtle Overlays - High Contrast for Text without Muting the Mountains */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/25 to-transparent w-full lg:w-3/4" />

        {/* Ambient Warm Golden Sunlight Scrim */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />
      </div>

      {/* Hero Content - Authentic Left-Aligned Layout Matching Official Brand Mockup */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 pb-16 sm:pb-24 pt-36 lg:pt-40">
        <div className="max-w-2xl space-y-6">
          {/* Tagline Urdu Accent */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-[#B99550]/40 text-[#B99550] text-xs font-semibold tracking-wider uppercase"
          >
            <span className="font-serif">داستان پاکستان</span>
            <span className="text-white/40">•</span>
            <span>Live Photographic Journey Through Pakistan</span>
          </motion.div>

          {/* Main Headline - Matches Image 4 Mockup Exactly */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="font-serif text-white text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]"
          >
            Discover Pakistan.
            <br />
            <span className="text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">Live Its Stories.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-white/95 text-sm sm:text-lg leading-relaxed max-w-xl font-normal drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
          >
            Connect with verified local guides for authentic cultural walks, legendary food trails, and breathtaking mountain expeditions across Pakistan.
          </motion.p>

          {/* Primary CTA - Golden Pill Button Matching Mockup */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <Link
              href="/explore"
              className="inline-flex items-center justify-center px-8 sm:px-10 py-4 rounded-full bg-[#B99550] hover:bg-[#c9a65f] text-[#123C2D] font-bold text-xs sm:text-sm tracking-[0.2em] uppercase shadow-[0_10px_30px_rgba(185,149,80,0.4)] hover:shadow-[0_15px_40px_rgba(185,149,80,0.6)] hover:scale-105 transition-all duration-300"
            >
              Explore Destinations
            </Link>

            <Link
              href="/safety-guide"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white text-xs sm:text-sm font-semibold border border-[#B99550]/40 transition-all duration-300 shadow-lg"
            >
              <ShieldCheck className="w-4 h-4 text-[#B99550]" />
              <span>Universal Safety Protocol</span>
            </Link>
          </motion.div>

          {/* Trust Badges Strip */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
            className="pt-6 border-t border-white/20 flex flex-wrap items-center gap-6 sm:gap-8 text-xs text-white/90 drop-shadow-md"
          >
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#B99550]" />
              <span className="font-medium">175+ Countries Welcome</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="font-medium">Police-Cleared Guides</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-300 fill-amber-300" />
              <span className="font-medium">4.88★ Average Traveler Rating</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Interactive Live Mountain Vista Switcher (Bottom Right) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-6 right-6 sm:right-12 z-20 flex flex-col items-end gap-2"
      >
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-[11px] text-white/90">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-medium">Live Vista:</span>
          <span className="text-[#B99550] font-semibold">{currentVista.name}</span>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20">
          {MOUNTAIN_VISTAS.map((vista, idx) => (
            <button
              key={vista.id}
              onClick={() => setActiveVistaIndex(idx)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                activeVistaIndex === idx
                  ? 'bg-[#B99550] text-[#123C2D] font-bold shadow-md'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
              title={`Switch to ${vista.name}`}
            >
              {idx === 0 ? '🏔️ Karakoram' : idx === 1 ? '🌊 Attabad' : '🌲 Skardu'}
            </button>
          ))}
        </div>
      </motion.div>
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
    <>
      <Header transparent />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <PackageCategoriesSection />
        <FeaturedPackagesSection />
        <TrustedGuidesSection />
        <LatestReviewsSection />
        <FromTheBlogSection />
        <CTABannerSection />
      </main>
      <Footer />
    </>
  );
}
