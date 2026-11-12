/**
 * Prisma Seed — Daastaan-e-Pakistan v1
 * Seeds: Cities (Lahore, Islamabad), Sample Guides, Sample Packages, Admin User
 */

import { PrismaClient, PackageTier, Gender, GuideStatus, PoliceStatus, PackageStatus, AdminRole } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // ─── Cities ───────────────────────────────────────────────────────────────
  const lahore = await prisma.city.upsert({
    where: { slug: 'lahore' },
    update: {},
    create: {
      name: 'Lahore',
      slug: 'lahore',
      heroImage: 'https://res.cloudinary.com/dep/image/upload/v1/cities/lahore-hero.jpg',
      introCopy:
        'Lahore — the heart of Pakistan. A city of Mughal grandeur, colonial charm, and an unmatched food culture that pulses with life. Home to the Badshahi Mosque, the Walled City, and some of the world's most celebrated street food, Lahore is where Pakistan's story began.',
      seoTitle: 'Explore Lahore — Guided Tours & Authentic Experiences | Daastaan-e-Pakistan',
      seoDescription:
        'Discover Lahore with verified local guides. Book cultural heritage tours, food trail experiences, and family adventures in the City of Gardens.',
      isActive: true,
      sortOrder: 1,
    },
  })

  const islamabad = await prisma.city.upsert({
    where: { slug: 'islamabad' },
    update: {},
    create: {
      name: 'Islamabad',
      slug: 'islamabad',
      heroImage: 'https://res.cloudinary.com/dep/image/upload/v1/cities/islamabad-hero.jpg',
      introCopy:
        'Islamabad — Pakistan's capital and one of the world's most beautiful planned cities. Nestled against the Margalla Hills, it blends modern architecture, lush green spaces, and a serene pace of life. From the iconic Faisal Mosque to scenic hiking trails, Islamabad offers a unique blend of urban sophistication and natural beauty.',
      seoTitle: 'Explore Islamabad — Guided Tours & Nature Experiences | Daastaan-e-Pakistan',
      seoDescription:
        'Book guided tours in Islamabad. Discover Faisal Mosque, Margalla Hills, Daman-e-Koh and the capital's rich cultural scene with verified local guides.',
      isActive: true,
      sortOrder: 2,
    },
  })

  console.log('✅ Cities seeded:', lahore.name, islamabad.name)

  // ─── Guides ───────────────────────────────────────────────────────────────
  const guides = await Promise.all([
    prisma.guide.upsert({
      where: { id: 'guide-lahore-01' },
      update: {},
      create: {
        id: 'guide-lahore-01',
        name: 'Tariq Mehmood',
        bio: 'A third-generation Lahorite with 12 years of guiding experience. Specialises in the Walled City, Mughal architecture, and Lahore's vibrant food scene. Fluent in English, Urdu, and Punjabi.',
        gender: Gender.MALE,
        languages: ['English', 'Urdu', 'Punjabi'],
        specialities: ['Walled City', 'Mughal Heritage', 'Street Food', 'Photography'],
        avatarUrl: 'https://res.cloudinary.com/dep/image/upload/v1/guides/tariq-mehmood.jpg',
        rating: 4.9,
        reviewCount: 47,
        cnicEncrypted: 'PLACEHOLDER_ENCRYPTED_CNIC',
        policeStatus: PoliceStatus.CLEARED,
        status: GuideStatus.ACTIVE,
        isVerified: true,
        cityId: lahore.id,
        whatsappNumber: '+92300000001',
      },
    }),
    prisma.guide.upsert({
      where: { id: 'guide-lahore-02' },
      update: {},
      create: {
        id: 'guide-lahore-02',
        name: 'Ayesha Riaz',
        bio: 'Cultural historian and storyteller with a passion for Lahore's lesser-known gems. Ayesha specialises in curating intimate experiences for solo female travellers, sharing the stories of the women who shaped Lahore's history. Certified guide with a Masters in History from Punjab University.',
        gender: Gender.FEMALE,
        languages: ['English', 'Urdu'],
        specialities: ['Women\'s History', 'Arts & Crafts', 'Cultural Heritage', 'Food'],
        avatarUrl: 'https://res.cloudinary.com/dep/image/upload/v1/guides/ayesha-riaz.jpg',
        rating: 4.8,
        reviewCount: 32,
        cnicEncrypted: 'PLACEHOLDER_ENCRYPTED_CNIC',
        policeStatus: PoliceStatus.CLEARED,
        status: GuideStatus.ACTIVE,
        isVerified: true,
        cityId: lahore.id,
        whatsappNumber: '+92300000002',
      },
    }),
    prisma.guide.upsert({
      where: { id: 'guide-islamabad-01' },
      update: {},
      create: {
        id: 'guide-islamabad-01',
        name: 'Bilal Hussain',
        bio: 'Nature enthusiast and certified trekking guide. Born in Islamabad, Bilal knows every trail in the Margalla Hills and has been guiding hikers since 2015. He brings the ecology and geology of the hills to life with engaging, accessible storytelling.',
        gender: Gender.MALE,
        languages: ['English', 'Urdu'],
        specialities: ['Hiking', 'Nature', 'Wildlife', 'Margalla Hills'],
        avatarUrl: 'https://res.cloudinary.com/dep/image/upload/v1/guides/bilal-hussain.jpg',
        rating: 4.7,
        reviewCount: 28,
        cnicEncrypted: 'PLACEHOLDER_ENCRYPTED_CNIC',
        policeStatus: PoliceStatus.CLEARED,
        status: GuideStatus.ACTIVE,
        isVerified: true,
        cityId: islamabad.id,
        whatsappNumber: '+92300000003',
      },
    }),
    prisma.guide.upsert({
      where: { id: 'guide-islamabad-02' },
      update: {},
      create: {
        id: 'guide-islamabad-02',
        name: 'Zara Ahmed',
        bio: 'Islamabad-based architect turned cultural guide. Zara specialises in the city's modern architecture, Faisal Mosque, the Centaurus, and the story of how this planned city was built from scratch in the 1960s. She also runs curated food experiences across the city's best restaurants.',
        gender: Gender.FEMALE,
        languages: ['English', 'Urdu', 'French'],
        specialities: ['Architecture', 'City History', 'Food & Restaurants', 'Faisal Mosque'],
        avatarUrl: 'https://res.cloudinary.com/dep/image/upload/v1/guides/zara-ahmed.jpg',
        rating: 4.9,
        reviewCount: 19,
        cnicEncrypted: 'PLACEHOLDER_ENCRYPTED_CNIC',
        policeStatus: PoliceStatus.CLEARED,
        status: GuideStatus.ACTIVE,
        isVerified: true,
        cityId: islamabad.id,
        whatsappNumber: '+92300000004',
      },
    }),
  ])

  console.log('✅ Guides seeded:', guides.length)

  // ─── Packages ─────────────────────────────────────────────────────────────
  const packages = await Promise.all([
    // Package 1: Lahore Walled City Heritage Walk
    prisma.package.upsert({
      where: { slug: 'lahore-walled-city-heritage-walk' },
      update: {},
      create: {
        slug: 'lahore-walled-city-heritage-walk',
        title: 'Walled City Heritage Walk',
        tier: PackageTier.CULTURAL,
        cityId: lahore.id,
        durationHours: 4,
        minParty: 1,
        maxParty: 8,
        basePricePkr: 500000, // PKR 5,000 (stored in paisa)
        description:
          'Step inside the ancient gates of Lahore's Walled City and journey through 2,000 years of history. Walk the narrow lanes of Androon Lahore, discover hidden havelis, marvel at Mughal-era mosques, and hear the stories that guidebooks don't tell. This intimate walking tour is led by a certified heritage guide who has spent years uncovering the city's layered past.',
        included: [
          'Expert heritage guide (4 hours)',
          'Entry to Wazir Khan Mosque',
          'Entry to Lahore Fort (Shahi Qila)',
          'Traditional chai at a 100-year-old tea house',
          'Printed heritage map of the Walled City',
          'Pick-up from any Lahore hotel (add-on available)',
        ],
        excluded: [
          'Personal shopping or souvenirs',
          'Additional food and beverages',
          'Transport to start point (unless hotel pickup add-on selected)',
        ],
        itinerary: [
          {
            day: 1,
            title: 'Walled City Heritage Walk',
            activities: [
              {
                time: '09:00',
                title: 'Meet at Delhi Gate',
                description: 'Your guide meets you at the historic Delhi Gate — one of the 13 original gates of the Walled City. Introduction and context-setting.',
                estimatedDuration: '15 min',
              },
              {
                time: '09:15',
                title: 'Wazir Khan Mosque',
                description: 'Explore the most ornately decorated mosque of the Mughal era. Built in 1634, every tile tells a story. Your guide brings the calligraphy and frescoes to life.',
                estimatedDuration: '45 min',
              },
              {
                time: '10:00',
                title: 'The Lanes of Androon Lahore',
                description: 'Wander through the bustling lanes of the inner city — past spice sellers, copper craftsmen, and centuries-old havelis hidden behind ordinary facades.',
                estimatedDuration: '60 min',
              },
              {
                time: '11:00',
                title: 'Lahore Fort (Shahi Qila)',
                description: 'Enter the UNESCO-listed Lahore Fort. See Sheesh Mahal (Palace of Mirrors), Naulakha Pavilion, and the Diwan-e-Aam. Hear stories of emperors, battles, and the Sikh Kingdom.',
                estimatedDuration: '75 min',
              },
              {
                time: '12:15',
                title: 'Tea at a Traditional Teahouse',
                description: 'End your walk at a 100-year-old teahouse in the Walled City, sipping pink Kashmiri chai and reflecting on the morning.',
                estimatedDuration: '30 min',
              },
            ],
          },
        ],
        images: [
          'https://res.cloudinary.com/dep/image/upload/v1/packages/lahore-walled-city-1.jpg',
          'https://res.cloudinary.com/dep/image/upload/v1/packages/lahore-walled-city-2.jpg',
          'https://res.cloudinary.com/dep/image/upload/v1/packages/lahore-walled-city-3.jpg',
        ],
        isFeatured: true,
        status: PackageStatus.PUBLISHED,
        rating: 4.9,
        reviewCount: 23,
        bookingCount: 67,
        seoTitle: 'Walled City Heritage Walk Lahore | Daastaan-e-Pakistan',
        seoDescription:
          'Explore Lahore's ancient Walled City with a certified heritage guide. Visit Wazir Khan Mosque, Lahore Fort & hidden havelis. Book your cultural tour today.',
      },
    }),

    // Package 2: Lahore Food Trail
    prisma.package.upsert({
      where: { slug: 'lahore-food-trail-gawalmandi' },
      update: {},
      create: {
        slug: 'lahore-food-trail-gawalmandi',
        title: 'Gawalmandi Food Trail — A Taste of Lahore',
        tier: PackageTier.FOOD,
        cityId: lahore.id,
        durationHours: 3,
        minParty: 1,
        maxParty: 10,
        basePricePkr: 350000, // PKR 3,500
        description:
          'Lahore's food is legendary — and Gawalmandi is its beating heart. This guided food walk takes you through the most celebrated food street in Pakistan, sampling iconic dishes at legendary establishments. From Lahori karahi and paye to rabri falooda, this is a journey through taste, tradition, and the soul of Punjabi cuisine.',
        included: [
          'Expert food guide (3 hours)',
          '6 food stops with tastings included',
          'Introduction to Lahori food culture and etiquette',
          'Recipes card to take home',
        ],
        excluded: [
          'Additional food beyond included tastings',
          'Personal beverages',
          'Transport to start point',
        ],
        itinerary: [
          {
            day: 1,
            title: 'Gawalmandi Food Trail',
            activities: [
              { time: '19:00', title: 'Meet on Food Street', description: 'Meet your guide at the iconic Gawalmandi Food Street entrance. Brief introduction to Lahori food culture.', estimatedDuration: '10 min' },
              { time: '19:10', title: 'Paye & Nihari', description: 'Start with slow-cooked paye (trotters) and nihari at a legendary establishment open since the 1960s.', estimatedDuration: '30 min' },
              { time: '19:40', title: 'Lahori Karahi', description: 'A stop for Lahore\'s most famous dish — wok-cooked karahi with fresh tomatoes and ginger at a wood-fire restaurant.', estimatedDuration: '30 min' },
              { time: '20:10', title: 'Street Snacks Walk', description: 'Papri chaat, samosas, and Lahori dahi bhalle from street carts — the quick-fire round.', estimatedDuration: '30 min' },
              { time: '20:40', title: 'Bread & Kebabs', description: 'Fresh tandoor naan with seekh kebabs from a renowned kebab house.', estimatedDuration: '25 min' },
              { time: '21:05', title: 'Sweet Finale — Rabri Falooda', description: 'End with rabri falooda or kulfi at Lahore\'s most beloved sweet shop.', estimatedDuration: '25 min' },
            ],
          },
        ],
        images: [
          'https://res.cloudinary.com/dep/image/upload/v1/packages/lahore-food-trail-1.jpg',
          'https://res.cloudinary.com/dep/image/upload/v1/packages/lahore-food-trail-2.jpg',
          'https://res.cloudinary.com/dep/image/upload/v1/packages/lahore-food-trail-3.jpg',
        ],
        isFeatured: true,
        status: PackageStatus.PUBLISHED,
        rating: 4.8,
        reviewCount: 18,
        bookingCount: 42,
        seoTitle: 'Lahore Food Trail — Gawalmandi Street Food Tour | Daastaan-e-Pakistan',
        seoDescription: 'Explore Lahore\'s legendary food scene on a guided Gawalmandi Food Trail. Taste karahi, nihari, falooda and more with a local food expert.',
      },
    }),

    // Package 3: Islamabad Margalla Hills Hike
    prisma.package.upsert({
      where: { slug: 'islamabad-margalla-hills-sunrise-hike' },
      update: {},
      create: {
        slug: 'islamabad-margalla-hills-sunrise-hike',
        title: 'Margalla Hills Sunrise Hike & Nature Walk',
        tier: PackageTier.NATURE,
        cityId: islamabad.id,
        durationHours: 4,
        minParty: 1,
        maxParty: 12,
        basePricePkr: 300000, // PKR 3,000
        description:
          'Rise before dawn and hike through the Margalla Hills National Park as Islamabad awakens below you. A certified nature guide leads you through forested trails teeming with monkeys, birds, and wild boar, reaching a viewpoint just as the sun crests over the Himalayan foothills. One of the most breathtaking urban hikes in Asia.',
        included: [
          'Certified nature & trekking guide (4 hours)',
          'Trail snack pack (energy bars, nuts, water)',
          'Wildlife & ecology briefing',
          'Pick-up from central Islamabad (add-on)',
        ],
        excluded: [
          'Personal hiking gear (guide can advise)',
          'Breakfast post-hike',
          'Park entry fee (PKR 50, payable on-site)',
        ],
        itinerary: [
          {
            day: 1,
            title: 'Margalla Hills Sunrise Hike',
            activities: [
              { time: '05:30', title: 'Trail Start — Trail 3 Entrance', description: 'Meet your guide at Trail 3 entrance in F-6. Pre-hike briefing on safety, wildlife, and what to expect.', estimatedDuration: '15 min' },
              { time: '05:45', title: 'Forest Ascent', description: 'Begin the ascent through dense Himalayan subtropical forest. Your guide points out endemic bird species, medicinal plants, and signs of wildlife.', estimatedDuration: '60 min' },
              { time: '06:45', title: 'Sunrise at Pir Sohawa Ridge', description: 'Reach the ridge viewpoint just as the sun rises over the hills. Islamabad spreads below — a carpet of trees and buildings glowing gold.', estimatedDuration: '30 min' },
              { time: '07:15', title: 'Descent & Nature Observation', description: 'Descend via a different trail, spotting Rhesus macaques, Common Kingfishers, and if lucky, a wild peacock.', estimatedDuration: '60 min' },
              { time: '08:15', title: 'Trail Snack & Debrief', description: 'Enjoy your trail snack pack at the base, sharing observations and Q&A with your guide.', estimatedDuration: '15 min' },
            ],
          },
        ],
        images: [
          'https://res.cloudinary.com/dep/image/upload/v1/packages/islamabad-margalla-1.jpg',
          'https://res.cloudinary.com/dep/image/upload/v1/packages/islamabad-margalla-2.jpg',
          'https://res.cloudinary.com/dep/image/upload/v1/packages/islamabad-margalla-3.jpg',
        ],
        isFeatured: true,
        status: PackageStatus.PUBLISHED,
        rating: 4.7,
        reviewCount: 14,
        bookingCount: 31,
        seoTitle: 'Margalla Hills Sunrise Hike Islamabad | Daastaan-e-Pakistan',
        seoDescription: 'Book a guided sunrise hike in Islamabad\'s Margalla Hills National Park. See wildlife, birds, and panoramic views with a certified nature guide.',
      },
    }),

    // Package 4: Islamabad Cultural City Tour
    prisma.package.upsert({
      where: { slug: 'islamabad-cultural-city-tour' },
      update: {},
      create: {
        slug: 'islamabad-cultural-city-tour',
        title: 'Islamabad: The Capital City Cultural Tour',
        tier: PackageTier.CULTURAL,
        cityId: islamabad.id,
        durationHours: 6,
        minParty: 1,
        maxParty: 8,
        basePricePkr: 600000, // PKR 6,000
        description:
          'A comprehensive guided tour of Pakistan\'s modern capital — from the architectural marvel of Faisal Mosque to Daman-e-Koh\'s panoramic views, Lok Virsa Museum\'s cultural treasures, and the Centaurus. Understand how Islamabad was planned from scratch and discover why it consistently ranks among the world\'s most beautiful capitals.',
        included: [
          'Expert cultural guide (6 hours)',
          'Faisal Mosque entry & guided tour',
          'Lok Virsa Museum entry',
          'Daman-e-Koh viewpoint visit',
          'Lunch at a local restaurant',
          'Air-conditioned transport throughout',
        ],
        excluded: [
          'Personal shopping',
          'Beverages beyond included lunch',
        ],
        itinerary: [
          {
            day: 1,
            title: 'Islamabad Cultural City Tour',
            activities: [
              { time: '09:00', title: 'Hotel Pickup', description: 'Your guide and driver pick you up from your hotel.', estimatedDuration: '30 min' },
              { time: '09:30', title: 'Faisal Mosque', description: 'Pakistan\'s national mosque and one of the largest in the world. Explore the exterior architecture, serene courtyard, and (if appropriate) the interior. Your guide explains its architectural significance and the story of its construction.', estimatedDuration: '60 min' },
              { time: '10:30', title: 'Daman-e-Koh Viewpoint', description: 'Drive up to Daman-e-Koh in the Margalla Hills for a panoramic view of Islamabad. See how the city\'s grid plan unfolds below you.', estimatedDuration: '45 min' },
              { time: '11:15', title: 'Lok Virsa Museum', description: 'Pakistan\'s national folk museum. Explore folk art, music instruments, textile traditions, and regional crafts from all four provinces.', estimatedDuration: '75 min' },
              { time: '12:30', title: 'Lunch', description: 'Lunch at a curated local restaurant — a taste of Pakistani hospitality.', estimatedDuration: '60 min' },
              { time: '13:30', title: 'Pakistan Monument', description: 'Visit the iconic petal-shaped Pakistan Monument representing the four provinces and three territories. Explore the adjacent museum.', estimatedDuration: '45 min' },
              { time: '14:15', title: 'Centaurus & Jinnah Super', description: 'A walk through Islamabad\'s modern face — the Centaurus mall and Jinnah Super market. Your guide provides social context on Islamabad\'s dual identity.', estimatedDuration: '45 min' },
              { time: '15:00', title: 'Hotel Drop-off', description: 'Return to your hotel. Tour concludes.', estimatedDuration: '30 min' },
            ],
          },
        ],
        images: [
          'https://res.cloudinary.com/dep/image/upload/v1/packages/islamabad-city-tour-1.jpg',
          'https://res.cloudinary.com/dep/image/upload/v1/packages/islamabad-city-tour-2.jpg',
          'https://res.cloudinary.com/dep/image/upload/v1/packages/islamabad-city-tour-3.jpg',
        ],
        isFeatured: true,
        status: PackageStatus.PUBLISHED,
        rating: 4.8,
        reviewCount: 11,
        bookingCount: 24,
        seoTitle: 'Islamabad City Cultural Tour — Faisal Mosque & Beyond | Daastaan-e-Pakistan',
        seoDescription: 'Book a guided cultural tour of Islamabad. Visit Faisal Mosque, Lok Virsa, Daman-e-Koh, Pakistan Monument with a knowledgeable local guide.',
      },
    }),
  ])

  console.log('✅ Packages seeded (base):', packages.length)

  // ─── Lahore Packages — Full Collection (34 packages from document) ─────────
  const BASE = 'https://images.unsplash.com'
  const IMG = {
    mughal:     '/images/packages/lahore/shaam-e-mughal.jpg',
    mosque:     '/images/packages/lahore/lahore-heritage-escape.jpg',
    minar:      '/images/packages/lahore/lahore-city-highlights.jpg',
    walledCity: '/images/packages/lahore/lahore-by-night.jpg',
    food:       '/images/packages/lahore/zaiqa-e-lahore-food-trail.jpg',
    bazaar:     '/images/packages/lahore/bazaar-e-lahore.jpg',
    colonial:   '/images/packages/lahore/colonial-lahore.jpg',
    shrine:     '/images/packages/lahore/sufi-lahore.jpg',
    truck:      '/images/packages/lahore/rang-e-pakistan.jpg',
    garden:     '/images/packages/lahore/mughal-gardens.jpg',
    stadium:    '/images/packages/lahore/cricket-lahore.jpg',
    street:     '/images/packages/lahore/lens-on-lahore.jpg',
    family:     '/images/packages/lahore/family-lifestyle-package.jpg',
    kids:       `${BASE}/photo-1503454537195-1dcabb73ffb9?q=80&w=800&auto=format&fit=crop`,
    weekend:    `${BASE}/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop`,
    romantic:   `${BASE}/photo-1518998053901-5348d3961a04?q=80&w=800&auto=format&fit=crop`,
    girls:      `${BASE}/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop`,
    students:   `${BASE}/photo-1427504494785-3a9ca7044f45?q=80&w=800&auto=format&fit=crop`,
    sikh:       `${BASE}/photo-1543418219-44e30b057fea?q=80&w=800&auto=format&fit=crop`,
    nankana:    `${BASE}/photo-1543418219-44e30b057fea?q=80&w=800&auto=format&fit=crop`,
    islamic:    `${BASE}/photo-1564507592333-c60657eea523?q=80&w=800&auto=format&fit=crop`,
    hiran:      `${BASE}/photo-1585320806297-9794b3e4aaae?q=80&w=800&auto=format&fit=crop`,
    forest:     `${BASE}/photo-1448375240586-882707db888b?q=80&w=800&auto=format&fit=crop`,
    kasur:      `${BASE}/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop`,
    harappa:    `${BASE}/photo-1548013146-72479768bada?q=80&w=800&auto=format&fit=crop`,
    saltmine:   `${BASE}/photo-1518623489648-a173ef7824f3?q=80&w=800&auto=format&fit=crop`,
    rohtas:     `${BASE}/photo-1570197788417-0e82375c9371?q=80&w=800&auto=format&fit=crop`,
    katas:      `${BASE}/photo-1585320806297-9794b3e4aaae?q=80&w=800&auto=format&fit=crop`,
    kallar:     `${BASE}/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop`,
    corporate:  `${BASE}/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop`,
    festival:   `${BASE}/photo-1567157577867-05ccb1388e66?q=80&w=800&auto=format&fit=crop`,
    cooking:    `${BASE}/photo-1556909114-f6e7ad7d3136?q=80&w=800&auto=format&fit=crop`,
    basant:     `${BASE}/photo-1596422846543-75c6fc197f07?q=80&w=800&auto=format&fit=crop`,
    qawwali:    `${BASE}/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop`,
    ganda:      `${BASE}/photo-1540747913346-19212a4cf528?q=80&w=800&auto=format&fit=crop`,
  }

  const pkgDef = (slug: string, title: string, tier: PackageTier, durationHours: number | null, durationDays: number | null, basePricePkr: number, description: string, included: string[], excluded: string[], img: string, isFeatured: boolean, rating: number, reviews: number, bookings: number) =>
    prisma.package.upsert({
      where: { slug },
      update: {},
      create: {
        slug, title, tier, cityId: lahore.id,
        ...(durationHours ? { durationHours } : {}),
        ...(durationDays  ? { durationDays  } : {}),
        minParty: 1, maxParty: 12,
        basePricePkr,
        description,
        included,
        excluded,
        itinerary: [{ day: 1, title, activities: [{ title: 'Full Experience', description, estimatedDuration: durationHours ? `${durationHours} hours` : `${durationDays} days` }] }],
        images: [img],
        isFeatured,
        status: PackageStatus.PUBLISHED,
        rating, reviewCount: reviews, bookingCount: bookings,
        seoTitle: `${title} | Daastaan-e-Pakistan`,
        seoDescription: description.slice(0, 160),
      },
    })

  const lahorePkgs = await Promise.all([
    // 01 Shaam-e-Mughal
    pkgDef('lahore-shaam-e-mughal-royal-experience', 'Shaam-e-Mughal – The Royal Lahore Experience', PackageTier.SIGNATURE, null, 3, 2200000,
      'The ultimate Lahore experience spanning 3 days. Arrive at Lahore Airport, visit the Museum, Minar-e-Pakistan, Lahore Fort, and Badshahi Mosque. Day 2: Walled City, Wazir Khan Mosque, Shalimar Gardens, and the Wagah Border flag-lowering ceremony. Day 3: Shahdara tombs of Jahangir, Noor Jahan and Anarkali Bazaar shopping.',
      ['Expert heritage guide (3 days)', 'Hotel transfers', 'Wagah Border visit', 'Fort Road dinner experience', 'Anarkali Bazaar shopping tour'],
      ['Hotel accommodation', 'Personal shopping', 'Meals beyond stated inclusions'], IMG.mughal, true, 4.9, 34, 89),

    // 02 Lahore Heritage Escape
    pkgDef('lahore-heritage-escape-2day', 'Lahore Heritage Escape', PackageTier.HERITAGE, null, 2, 1400000,
      'A refined 2-day Lahore heritage journey. Day 1: Lahore Museum, Minar-e-Pakistan, Jahangir\'s Tomb, Lahore Fort, Badshahi Mosque, and Fort Road Food Street dinner. Day 2: Shahi Hammam, Walled City, Wazir Khan Mosque, Shalimar Gardens, and Wagah Border ceremony.',
      ['Expert guide (2 days)', 'All major heritage site entries', 'Fort Road dinner (Day 1)', 'Hotel/airport transfers'],
      ['Hotel accommodation', 'Personal expenses', 'Meals beyond inclusions'], IMG.mosque, true, 4.8, 28, 67),

    // 03 City Highlights
    pkgDef('lahore-city-highlights-classic-sightseeing', 'City High Lights – Classic Lahore Sightseeing', PackageTier.CULTURAL, 9, null, 650000,
      'The definitive one-day Lahore experience. Begin at Lahore Museum, visit Minar-e-Pakistan and the Digital History Museum, explore Lahore Fort and Badshahi Mosque, enjoy lunch at a local restaurant, and explore Walled City streets. Optional: Jahangir\'s Tomb or Shahi Hammam.',
      ['Expert guide (8–10 hours)', 'Lahore Museum entry', 'Lahore Fort & Badshahi Mosque', 'Lunch at local restaurant'],
      ['Personal shopping', 'Additional beverages', 'Transport to start point (unless hotel pickup)'], IMG.minar, true, 4.7, 52, 134),

    // 04 Lahore by Night
    pkgDef('lahore-by-night-roshan-galiyan', 'Lahore by Night – Roshan Galiyan', PackageTier.CULTURAL, 4, null, 350000,
      'Discover Lahore\'s illuminated Walled City after dark. Walk the glowing Delhi Gate and surrounding historic lanes, visit Wazir Khan Mosque exterior, hear captivating storytelling about Lahore\'s history, and finish with rooftop dining at Fort Road Food Street.',
      ['Expert night guide (3–4 hours)', 'Walled City illuminated walking tour', 'Dinner at Fort Road Food Street'],
      ['Personal beverages beyond dinner', 'Transport to meeting point'], IMG.walledCity, true, 4.9, 41, 98),

    // 05 Zaiqa-e-Lahore Food Trail
    pkgDef('lahore-zaiqa-e-lahore-food-trail', 'Zaiqa-e-Lahore – Food Trail', PackageTier.FOOD, 5, null, 450000,
      'A curated food journey through Androon Lahore. Begin with a traditional Lahori breakfast (halwa puri or nihari), explore Shahi Hammam and Wazir Khan Mosque between food stops, sample lassi and seasonal refreshments, and conclude at a legendary dessert shop for falooda or kulfi.',
      ['Expert food guide (4–5 hours)', '6 food stops with tastings', 'Traditional breakfast', 'Lassi & street snacks', 'Dessert finale'],
      ['Personal additional orders', 'Transport to meeting point'], IMG.food, true, 5.0, 63, 157),

    // 06 Bazaar-e-Lahore Shopping
    pkgDef('lahore-bazaar-e-lahore-shopping', 'Bazaar-e-Lahore – Shopping Experience', PackageTier.LIFESTYLE, 5, null, 350000,
      'Traditional and modern Lahore shopping. Explore Anarkali Bazaar for textiles and souvenirs, Ichhra and Shahalmi markets for local goods, Liberty Market for fashion, an optional khussa or handicraft retailer, and MM Alam Road or a modern mall. Includes refreshment break.',
      ['Local shopping guide (4–6 hours)', 'Visits to Anarkali, Liberty, Ichhra markets', 'Refreshment break'],
      ['Personal shopping costs', 'Transport between markets'], IMG.bazaar, false, 4.6, 29, 71),

    // 07 Colonial Lahore
    pkgDef('lahore-colonial-british-raj-heritage', 'Colonial Lahore – British Raj Heritage', PackageTier.HERITAGE, 4, null, 350000,
      'Walk historic Mall Road and discover Lahore\'s colonial architecture. View Lahore High Court, the General Post Office, old Punjab University campus, Government College University, National College of Arts, and Quaid-e-Azam Library. Ideal for historians, architects, and British heritage enthusiasts.',
      ['Expert colonial heritage guide (half day)', 'Mall Road heritage walk', 'Café refreshments'],
      ['Personal transport', 'Additional meals'], IMG.colonial, false, 4.7, 18, 42),

    // 08 Sufi Lahore
    pkgDef('lahore-sufi-spiritual-cultural-trail', 'Sufi Lahore – Spiritual & Cultural Trail', PackageTier.SPIRITUAL, 4, null, 350000,
      'Journey into the spiritual heart of Lahore. Visit Data Darbar, the shrine of Madho Lal Hussain, and Mian Mir Shrine. Learn about the poetry and traditions of Lahore\'s greatest Sufi mystics. Optional qawwali or Sufi music where a programme is available.',
      ['Expert Sufi heritage guide (half day)', 'Data Darbar visit', 'Madho Lal Hussain & Mian Mir shrines', 'Cultural context & poetry introduction'],
      ['Personal contributions at shrines', 'Transport to meeting point'], IMG.shrine, true, 4.9, 37, 89),

    // 09 Rang-e-Pakistan Arts & Crafts
    pkgDef('lahore-rang-e-pakistan-arts-crafts', 'Rang-e-Pakistan – Arts & Crafts Experience', PackageTier.ARTS, 4, null, 400000,
      'An immersive half-day in Lahore\'s creative soul. Visit NCA (National College of Arts) or PIDFC, witness a truck art demonstration, participate in a pottery, embroidery, or calligraphy workshop, explore miniature painting traditions, and purchase handmade souvenirs directly from artisans.',
      ['Arts guide & workshop host (half day)', 'NCA or PIDFC visit', 'Hands-on craft activity', 'Artisan souvenir opportunity', 'Refreshments'],
      ['Personal souvenir purchases', 'Transport to venue'], IMG.truck, false, 4.8, 22, 54),

    // 10 Mughal Gardens
    pkgDef('lahore-mughal-gardens-architecture-trail', 'Mughal Gardens & Architecture Trail', PackageTier.HERITAGE, 5, null, 450000,
      'Explore Lahore\'s finest Mughal landscape and architectural masterpieces. Begin at Shalimar Gardens and study the terraces, water features, and design philosophy. Continue to Lahore Fort for a guided architectural walk, then Badshahi Mosque, with an optional Wazir Khan Mosque visit.',
      ['Heritage architecture guide (half–full day)', 'Shalimar Gardens entry', 'Lahore Fort architectural tour', 'Badshahi Mosque visit', 'Lunch or refreshments'],
      ['Personal shopping', 'Additional meals'], IMG.garden, false, 4.8, 31, 76),

    // 11 Cricket Lahore
    pkgDef('lahore-cricket-sports-tourism', 'Cricket Lahore – Sports Tourism', PackageTier.SPORTS, 4, null, 300000,
      'A cricket lover\'s dream in the city that lives for the game. Visit Gaddafi Stadium, tour the Cricket Museum and Cricket Academy, learn about Pakistan cricket history and Lahore\'s legendary role in the sport, and conclude with a cricket-themed meal.',
      ['Sports guide (half day)', 'Gaddafi Stadium tour', 'Cricket Museum visit', 'Cricket-themed meal'],
      ['Personal transport', 'Additional purchases'], IMG.stadium, false, 4.6, 15, 38),

    // 12 Lens on Lahore Photography
    pkgDef('lahore-lens-on-lahore-photography-tour', 'Lens on Lahore – Photography Tour', PackageTier.ARTS, 4, null, 400000,
      'A golden-hour photography experience in one of Asia\'s most photogenic cities. Begin before sunrise at Walled City viewpoints, photograph historic streets, ornate doorways, and street life, continue to Lahore Fort and Badshahi Mosque, with optional rooftop photography from a permitted venue.',
      ['Photography guide (half day)', 'Golden hour Walled City tour', 'Lahore Fort & Badshahi Mosque photography', 'Rooftop access (where permitted)', 'Refreshments'],
      ['Camera equipment', 'Personal transport to start point'], IMG.street, false, 4.9, 19, 48),

    // 13 Family Lifestyle Package
    pkgDef('lahore-family-lifestyle-special-package', 'Family, Lifestyle & Special Customer Package', PackageTier.FAMILY, 9, null, 700000,
      'A full-day family adventure across Lahore\'s best family attractions. Visit Lahore Zoo, Safari Park, Jilani Park or Greater Iqbal Park, and enjoy family-friendly rides at Joyland or a selected operating attraction. Lunch at a family restaurant with optional shopping or dessert stop.',
      ['Family guide & coordinator (8–10 hours)', 'Lahore Zoo entry', 'Safari Park visit', 'Joyland or attraction visit', 'Family restaurant lunch'],
      ['Personal shopping', 'Additional rides or activities beyond inclusions'], IMG.family, false, 4.7, 24, 59),

    // 14 Kids Discovery
    pkgDef('lahore-kids-discovery-learning-tour', 'Kids Discovery Lahore', PackageTier.FAMILY, 9, null, 600000,
      'An educational adventure designed for children and school groups. Visit Lahore Museum or a suitable educational attraction, the History Museum at Minar-e-Pakistan, a Science Museum, participate in a supervised craft workshop, enjoy lunch, and complete a guided heritage quiz activity.',
      ['Kids-specialist educator guide (8–10 hours)', 'Lahore Museum educational visit', 'Science Museum', 'Supervised craft workshop', 'Heritage quiz activity', 'Lunch'],
      ['Personal expenses', 'School group transport to start point'], IMG.kids, false, 4.8, 17, 41),

    // 15 Lahore Weekend Getaway
    pkgDef('lahore-weekend-getaway-2day', 'Lahore Weekend Getaway', PackageTier.HERITAGE, null, 2, 1200000,
      'The ideal city break for domestic travellers and families. Day 1: Arrive, check in, visit Lahore Fort and Badshahi Mosque, Walled City streets, History by Night experience, and dinner at Fort Road. Day 2: Shalimar Gardens, Lawrence Garden, lunch, Safari Park, and shopping at Anarkali or Liberty Market.',
      ['Expert guide (2 days)', 'All site entries', 'Fort Road dinner (Day 1)', 'Full day transport'],
      ['Hotel accommodation', 'Personal shopping', 'Additional meals'], IMG.weekend, false, 4.7, 21, 53),

    // 16 Honeymoon & Romantic Escape
    pkgDef('lahore-honeymoon-romantic-escape', 'Lahore Honeymoon & Romantic Escape', PackageTier.SIGNATURE, null, 2, 1800000,
      'A curated romantic escape through Lahore\'s most beautiful and intimate venues. Boutique hotel stay, leisurely heritage visits and photo walks at couple-selected landmarks, a private photography session at iconic Lahore locations, and a pre-arranged romantic dinner at a selected restaurant.',
      ['Dedicated couple guide (2 days)', 'Boutique hotel stay', 'Private couple photo session', 'Romantic dinner arrangement', 'Heritage site visits'],
      ['Personal shopping', 'Additional activities beyond itinerary'], IMG.romantic, true, 5.0, 29, 68),

    // 17 Girls Day Out
    pkgDef('lahore-girls-day-out-lifestyle', 'Girls\' Day Out', PackageTier.LIFESTYLE, 9, null, 600000,
      'A curated day for friends and groups celebrating Lahore\'s lifestyle. Begin with a traditional Lahori breakfast, photo stops at iconic landmarks, Liberty Market or Emporium/Packages Mall, optional beauty or wellness venue, lunch at a stylish restaurant, and a traditional high-tea experience.',
      ['Lifestyle guide (8–10 hours)', 'Traditional breakfast', 'Photo stops at iconic landmarks', 'Shopping at Liberty/Emporium', 'High-tea experience'],
      ['Personal shopping costs', 'Beauty or wellness services'], IMG.girls, false, 4.8, 23, 57),

    // 18 Lahore Student Discovery
    pkgDef('lahore-student-discovery-tour', 'Lahore Student Discovery Tour', PackageTier.CULTURAL, 9, null, 400000,
      'History, culture, and learning designed for schools, colleges, and universities. School group pickup, Lahore Museum with educational briefing, Minar-e-Pakistan and Greater Iqbal Park with History Museum, traditional lunch, Lahore Fort and Badshahi Mosque, and a student reflection or quiz activity.',
      ['Educational expert guide (8–10 hours)', 'Lahore Museum briefing', 'History Museum at Minar-e-Pakistan', 'Traditional lunch', 'Fort & Mosque visit', 'Student quiz activity'],
      ['School transport to meeting point', 'Personal expenses'], IMG.students, false, 4.7, 31, 76),

    // 19 Sikh Heritage Lahore
    pkgDef('lahore-sikh-heritage-tour', 'Sikh Heritage Lahore', PackageTier.HERITAGE, 9, null, 700000,
      'A dedicated tour of Lahore\'s rich Sikh heritage. Visit Gurdwara Dera Sahib, the Samadhi of Maharaja Ranjit Singh, relevant Sikh heritage locations within Lahore Fort, and other selected historic Sikh-era sites. Ideal for international Sikh visitors, diaspora groups, and heritage travellers.',
      ['Sikh heritage specialist guide (8–10 hours)', 'Gurdwara Dera Sahib visit', 'Samadhi of Maharaja Ranjit Singh', 'Lahore Fort Sikh-era sections', 'High-tea or refreshments'],
      ['Personal religious contributions', 'Transport to meeting point'], IMG.sikh, false, 4.9, 26, 62),

    // 20 Nankana Sahib Pilgrimage
    pkgDef('lahore-nankana-sahib-pilgrimage', 'Nankana Sahib Pilgrimage', PackageTier.SPIRITUAL, 9, null, 800000,
      'A respectful and deeply moving day pilgrimage from Lahore to Nankana Sahib — birthplace of Guru Nanak Dev Ji. Visit Gurdwara Janam Asthan, allow time for prayer and reflection, with optional visits to other accessible Sikh heritage locations. Return journey to Lahore.',
      ['Pilgrimage guide & coordinator (8–10 hours)', 'Return transport Lahore–Nankana Sahib', 'Gurdwara Janam Asthan visit', 'Comfort stops', 'Lunch or refreshments'],
      ['Personal religious contributions', 'Entry offerings'], IMG.nankana, false, 4.9, 19, 44),

    // 21 Islamic Heritage of Lahore
    pkgDef('lahore-islamic-heritage-tour', 'Islamic Heritage of Lahore', PackageTier.HERITAGE, 9, null, 650000,
      'A full-day immersion in Lahore\'s Islamic architectural and spiritual heritage. Begin at Badshahi Mosque, explore Wazir Khan Mosque\'s extraordinary tilework and calligraphy, walk the Walled City\'s historic streets, visit Data Darbar shrine, and optionally explore traditional Islamic calligraphy or crafts.',
      ['Islamic heritage guide (8–10 hours)', 'Badshahi Mosque guided tour', 'Wazir Khan Mosque', 'Walled City walk', 'Data Darbar visit', 'Meal or refreshments'],
      ['Personal contributions at shrines', 'Transport to start'], IMG.islamic, false, 4.8, 22, 55),

    // 22 Hiran Minar & Sheikhupura
    pkgDef('lahore-hiran-minar-sheikhupura-fort', 'Hiran Minar & Sheikhupura Fort', PackageTier.HERITAGE, 7, null, 600000,
      'A day excursion from Lahore to explore Mughal-era heritage around Sheikhupura. Visit the stunning Hiran Minar complex — a unique Mughal hunting monument with a reflective lake — and optionally the nearby Sheikhupura Fort. Ideal for families, heritage tourists, and photographers.',
      ['Heritage excursion guide (1 day)', 'Return transport Lahore–Sheikhupura', 'Hiran Minar entry & guided tour', 'Sheikhupura Fort visit (subject to access)', 'Lunch at local restaurant'],
      ['Personal shopping', 'Additional activities'], IMG.hiran, false, 4.7, 16, 39),

    // 23 Changa Manga Forest
    pkgDef('lahore-changa-manga-forest-escape', 'Changa Manga Forest Escape', PackageTier.NATURE, 7, null, 500000,
      'A refreshing day escape from Lahore into one of the world\'s largest man-made forests. Follow designated visitor routes through the Changa Manga Forest, enjoy a guided nature walk, picnic or lunch at an approved area, and optionally ride the forest train if operating.',
      ['Nature guide (1 day)', 'Return transport from Lahore', 'Nature walk', 'Picnic lunch', 'Forest train (if operating)'],
      ['Personal expenses', 'Additional activities'], IMG.forest, false, 4.6, 14, 34),

    // 24 Kasur Sufi & Culinary
    pkgDef('lahore-kasur-sufi-culinary-trail', 'Kasur – Sufi & Culinary Trail', PackageTier.SPIRITUAL, 7, null, 600000,
      'A day journey to the soul of Kasur — birthplace of the great Sufi poet Bulleh Shah. Visit the shrine of Bulleh Shah, learn about his poetry and legacy, explore local cultural sites, enjoy an authentic Kasuri food experience with traditional sweets, and optionally visit local craft businesses.',
      ['Sufi heritage guide (1 day)', 'Return transport Lahore–Kasur', 'Bulleh Shah shrine visit', 'Kasuri food experience & sweets', 'Cultural site explorations'],
      ['Personal contributions at shrine', 'Extra purchases'], IMG.kasur, false, 4.8, 18, 44),

    // 25 Harappa
    pkgDef('lahore-harappa-indus-valley-civilisation', 'Harappa – Indus Valley Civilisation', PackageTier.HERITAGE, 9, null, 900000,
      'An extraordinary archaeological day trip to Harappa — one of the great cities of the Indus Valley Civilisation (3300–1300 BCE). Receive a guided introduction, explore accessible areas of the ancient settlement, visit the Harappa Museum, and gain a deep understanding of one of humanity\'s earliest civilisations.',
      ['Archaeological heritage guide (1 day)', 'Return transport Lahore–Harappa', 'Harappa Museum entry', 'Full guided site tour', 'Lunch or refreshments'],
      ['Personal shopping', 'Additional meals'], IMG.harappa, false, 4.9, 12, 28),

    // 26 Khewra Salt Mine
    pkgDef('lahore-khewra-salt-mine-adventure', 'Khewra Salt Mine Adventure', PackageTier.NATURE, 9, null, 850000,
      'A spectacular day adventure to Khewra Salt Mine — one of the largest salt mines in the world. Travel through the Salt Range, complete the authorised underground mine tour, marvel at pink salt formations, visit approved viewpoints, and enjoy a meal before returning to Lahore.',
      ['Adventure guide (1 day)', 'Return transport Lahore–Khewra', 'Authorised mine tour entry', 'Salt Range viewpoints', 'Lunch or refreshments'],
      ['Personal shopping', 'Additional activities'], IMG.saltmine, false, 4.8, 24, 58),

    // 27 Rohtas Fort
    pkgDef('lahore-rohtas-fort-historical-expedition', 'Rohtas Fort Historical Expedition', PackageTier.HERITAGE, 9, null, 900000,
      'A monumental day expedition to Rohtas Fort — a UNESCO World Heritage Site built by Sher Shah Suri in the 16th century. Explore the fort\'s massive gateways, defensive walls, and accessible structures, learn about its extraordinary history, and enjoy photography time at this rarely-visited gem.',
      ['Heritage expedition guide (1 day)', 'Return transport Lahore–Rohtas', 'Full guided fort exploration', 'Packed lunch at pre-arranged venue'],
      ['Personal expenses', 'Overnight accommodation (if overnight option chosen)'], IMG.rohtas, false, 4.9, 11, 26),

    // 28 Katas Raj & Salt Range
    pkgDef('lahore-katas-raj-salt-range-discovery', 'Katas Raj & Salt Range Discovery', PackageTier.HERITAGE, 9, null, 950000,
      'Explore the sacred Katas Raj temples and the stunning Salt Range. Visit the heritage temple complex, learn about the site\'s ancient Hindu and Buddhist history, continue to selected Salt Range viewpoints, with an optional second day extension to nearby attractions.',
      ['Heritage guide (1–2 days)', 'Return transport from Lahore', 'Katas Raj temple complex entry', 'Salt Range viewpoints', 'Lunch or refreshments'],
      ['Overnight accommodation (2-day option)', 'Personal expenses'], IMG.katas, false, 4.8, 9, 22),

    // 29 Kallar Kahar
    pkgDef('lahore-kallar-kahar-nature-escape', 'Kallar Kahar Nature Escape', PackageTier.NATURE, 7, null, 700000,
      'A serene nature escape to the beautiful Kallar Kahar lake and countryside. Explore the lake area and scenic viewpoints, enjoy a relaxed picnic or lunch, optionally visit nearby Salt Range attractions. The 2-day option includes a leisurely morning and optional nature activity before returning to Lahore.',
      ['Nature guide (1–2 days)', 'Return transport from Lahore', 'Kallar Kahar lake exploration', 'Picnic or restaurant lunch'],
      ['Accommodation (2-day option)', 'Personal expenses', 'Additional activities'], IMG.kallar, false, 4.7, 13, 31),

    // 30 Corporate Lahore
    pkgDef('lahore-corporate-business-experience', 'Corporate Lahore Experience', PackageTier.CORPORATE, 9, null, 1500000,
      'A tailored corporate city experience for business delegations and investors. Airport or hotel pickup, transfer to business meeting or corporate venue, meeting-day transport support, business-friendly lunch, an afternoon heritage or cultural visit tailored to available time, and a networking dinner or hosted meal.',
      ['Corporate coordinator (8–10 hours)', 'Full-day transport & coordination', 'Business-friendly lunch', 'Tailored heritage afternoon visit', 'Networking dinner arrangement'],
      ['Business meeting venue costs', 'Personal expenses'], IMG.corporate, false, 4.8, 8, 19),

    // 31 Lahore Festival & Events
    pkgDef('lahore-festival-events-tour', 'Lahore Festival & Events Tour', PackageTier.CULTURAL, 8, null, 800000,
      'An event-tailored Lahore experience around confirmed festivals, exhibitions, sporting events, or cultural programmes. Includes airport/hotel pickup, transfer to the event, entry and registration support, event-day transport coordination, and an optional Lahore heritage or shopping day extension.',
      ['Event coordinator (event-based)', 'Transport to and from event', 'Entry support & coordination', 'Optional city experience add-on'],
      ['Event tickets (unless specified)', 'Personal expenses', 'Hotel accommodation'], IMG.festival, false, 4.7, 7, 17),

    // 32 Cook with a Lahori Family
    pkgDef('lahore-cook-with-lahori-family', 'Cook with a Lahori Family', PackageTier.FOOD, 4, null, 500000,
      'A warm and immersive home cooking experience with a Lahori family. Meet your hosts, learn about traditional menu selection and food heritage, participate in preparing authentic Pakistani dishes, optionally enjoy a live BBQ, and share a family meal while learning about spices, cooking techniques, and regional food culture.',
      ['Host family & cooking guide (3–4 hours)', 'All ingredients and cooking materials', 'Shared family meal', 'Live BBQ option', 'Recipes to take home'],
      ['Transport to family home', 'Personal purchases'], IMG.cooking, true, 5.0, 31, 78),

    // 33 Basant Festival
    pkgDef('lahore-basant-festival-experience', 'Basant Festival Experience', PackageTier.CULTURAL, 8, null, 1200000,
      'Experience Lahore\'s legendary Basant kite festival — a celebration of spring with music, food, and thousands of kites filling the sky. Includes a cultural briefing, Walled City glimpses of Basant atmosphere, visits to lawfully organised festival venues, traditional food and entertainment, and optional traditional dress or photography.',
      ['Festival guide & coordinator', 'Cultural briefing', 'Authorised festival venue access', 'Traditional food & entertainment', 'Optional dress & photography experience'],
      ['Personal kite purchases', 'Transport between venues', 'Hotel accommodation'], IMG.basant, false, 4.9, 16, 38),

    // 34 Sufi Music & Qawwali Evening
    pkgDef('lahore-sufi-music-qawwali-evening', 'Sufi Music & Qawwali Evening', PackageTier.SPIRITUAL, 8, null, 700000,
      'A transcendent evening of Sufi poetry, music, and qawwali in Lahore. Introduction to the traditions of Sufi music and qawwali, attendance at a scheduled live performance or curated private programme, optional pre-performance dinner, and an optional customised live qawwali arrangement for private groups.',
      ['Sufi music guide & programme curator', 'Live performance or curated programme', 'Introduction to Sufi poetry traditions', 'Optional pre-performance dinner', 'Return transport'],
      ['Private qawwali arrangement (optional add-on cost)', 'Personal expenses'], IMG.qawwali, true, 5.0, 44, 112),

    // Bonus: Ganda Singh Border
    pkgDef('lahore-ganda-singh-border-ceremony', 'Ganda Singh Border – Flag-Lowering Ceremony', PackageTier.CULTURAL, 6, null, 650000,
      'A unique half-day excursion to the Ganda Singh Border flag-lowering ceremony in Kasur. Combined with a visit to the Bulleh Shah shrine, an Old City walk, and a taste of Kasur\'s food culture. Meet the tour coordinator, receive a cultural briefing, and witness the patriotic ceremony.',
      ['Excursion guide & coordinator (5–6 hours)', 'Return transport Lahore–Kasur', 'Border ceremony viewing', 'Bulleh Shah shrine visit', 'Kasur food culture experience'],
      ['Personal contributions at shrine', 'Additional meals'], IMG.ganda, false, 4.8, 13, 32),
  ])

  console.log('✅ Lahore packages seeded:', lahorePkgs.length)

  // ─── Admin User (Super Admin) ──────────────────────────────────────────────
  const superAdminPasswordHash = await bcrypt.hash('ChangeMe@123', 12)
  await prisma.adminUser.upsert({
    where: { email: 'admin@daastaan-e-pakistan.com' },
    update: {},
    create: {
      email: 'admin@daastaan-e-pakistan.com',
      name: 'Ahmad Fawad',
      passwordHash: superAdminPasswordHash,
      role: AdminRole.SUPER_ADMIN,
      isActive: true,
    },
  })

  console.log('✅ Admin user seeded: admin@daastaan-e-pakistan.com / ChangeMe@123')
  console.log('')
  console.log('🎉 Seed complete! Daastaan-e-Pakistan database is ready.')
  console.log('')
  console.log('📋 Summary:')
  console.log('   Cities: 2 (Lahore, Islamabad)')
  console.log('   Guides: 4 (2 per city)')
  console.log('   Packages: 4 base + 35 Lahore collection = 39 total')
  console.log('   Admin: 1 Super Admin')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

