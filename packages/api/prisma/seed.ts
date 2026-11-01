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

  console.log('✅ Packages seeded:', packages.length)

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
  console.log('   Packages: 4 (featured, published)')
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

