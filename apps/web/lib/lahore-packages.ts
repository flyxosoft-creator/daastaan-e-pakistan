import { PackageTier } from '@dep/shared';
import type { PackageCardData } from '@/components/catalog/package-card';

export interface LahorePackageDetail extends PackageCardData {
  basePricePkr: number;
  included: string[];
  excluded: string[];
  itinerary: {
    day: number;
    title: string;
    activities: {
      time?: string;
      title: string;
      description: string;
      estimatedDuration?: string;
    }[];
  }[];
  guide: {
    name: string;
    gender: string;
    avatarUrl: string;
    rating: number;
    reviewCount: number;
    languages: string[];
    specialities: string[];
    bio: string;
  };
}

const DEFAULT_GUIDE = {
  name: 'Tariq Mehmood',
  gender: 'Male',
  avatarUrl:
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
  rating: 4.9,
  reviewCount: 47,
  languages: ['English', 'Urdu', 'Punjabi'],
  specialities: ['Mughal Architecture', 'Walled City History', 'Cultural Storytelling'],
  bio: 'Third-generation Lahorite with over 12 years uncovering the living histories of Lahore. Police cleared and certified by Punjab Tourism.',
};

const BASE = 'https://images.unsplash.com';
const FALLBACK_IMG = {
  family:    `${BASE}/photo-1511895426328-dc8714191011?q=80&w=800&auto=format&fit=crop`,
  kids:      `${BASE}/photo-1503454537195-1dcabb73ffb9?q=80&w=800&auto=format&fit=crop`,
  weekend:   `${BASE}/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop`,
  romantic:  `${BASE}/photo-1518998053901-5348d3961a04?q=80&w=800&auto=format&fit=crop`,
  girls:     `${BASE}/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop`,
  students:  `${BASE}/photo-1427504494785-3a9ca7044f45?q=80&w=800&auto=format&fit=crop`,
  sikh:      `${BASE}/photo-1543418219-44e30b057fea?q=80&w=800&auto=format&fit=crop`,
  nankana:   `${BASE}/photo-1543418219-44e30b057fea?q=80&w=800&auto=format&fit=crop`,
  islamic:   `${BASE}/photo-1564507592333-c60657eea523?q=80&w=800&auto=format&fit=crop`,
  hiran:     `${BASE}/photo-1585320806297-9794b3e4aaae?q=80&w=800&auto=format&fit=crop`,
  forest:    `${BASE}/photo-1448375240586-882707db888b?q=80&w=800&auto=format&fit=crop`,
  kasur:     `${BASE}/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop`,
  harappa:   `${BASE}/photo-1548013146-72479768bada?q=80&w=800&auto=format&fit=crop`,
  saltmine:  `${BASE}/photo-1518623489648-a173ef7824f3?q=80&w=800&auto=format&fit=crop`,
  rohtas:    `${BASE}/photo-1570197788417-0e82375c9371?q=80&w=800&auto=format&fit=crop`,
  katas:     `${BASE}/photo-1585320806297-9794b3e4aaae?q=80&w=800&auto=format&fit=crop`,
  kallar:    `${BASE}/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop`,
  corporate: `${BASE}/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop`,
  festival:  `${BASE}/photo-1567157577867-05ccb1388e66?q=80&w=800&auto=format&fit=crop`,
  cooking:   `${BASE}/photo-1556909114-f6e7ad7d3136?q=80&w=800&auto=format&fit=crop`,
  basant:    `${BASE}/photo-1596422846543-75c6fc197f07?q=80&w=800&auto=format&fit=crop`,
  qawwali:   `${BASE}/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop`,
  ganda:     `${BASE}/photo-1540747913346-19212a4cf528?q=80&w=800&auto=format&fit=crop`,
};

function makePkg(
  id: string,
  slug: string,
  title: string,
  tier: PackageTier,
  durationHours: number | undefined,
  durationDays: number | undefined,
  basePricePkr: number,
  description: string,
  included: string[],
  excluded: string[],
  img: string,
  rating: number,
  reviewCount: number,
): LahorePackageDetail {
  return {
    id,
    slug,
    title,
    tier,
    city: { name: 'Lahore', slug: 'lahore' },
    ...(durationHours ? { durationHours } : {}),
    ...(durationDays ? { durationDays } : {}),
    minParty: 1,
    maxParty: 12,
    basePricePkr,
    rating,
    reviewCount,
    description,
    images: [img],
    included: [...included, 'Universal Safety Layer: GPS tracking & emergency SOS'],
    excluded,
    itinerary: [
      {
        day: 1,
        title,
        activities: [
          {
            title: 'Curated Experience Overview',
            description,
            estimatedDuration: durationHours ? `${durationHours} hours` : `${durationDays || 1} days`,
          },
        ],
      },
    ],
    guide: DEFAULT_GUIDE,
  };
}

export const LAHORE_PACKAGES: LahorePackageDetail[] = [
  makePkg('lhr-01', 'lahore-shaam-e-mughal-royal-experience', 'Shaam-e-Mughal – The Royal Lahore Experience', PackageTier.SIGNATURE, undefined, 3, 2200000,
    'The ultimate Lahore experience spanning 3 days. Arrive at Lahore Airport, visit the Museum, Minar-e-Pakistan, Lahore Fort, and Badshahi Mosque. Day 2: Walled City, Wazir Khan Mosque, Shalimar Gardens, and the Wagah Border flag-lowering ceremony. Day 3: Shahdara tombs of Jahangir, Noor Jahan and Anarkali Bazaar shopping.',
    ['Expert heritage guide (3 days)', 'Hotel transfers', 'Wagah Border visit', 'Fort Road dinner experience', 'Anarkali Bazaar shopping tour'],
    ['Hotel accommodation', 'Personal shopping', 'Meals beyond stated inclusions'], '/images/packages/lahore/shaam-e-mughal.jpg', 4.9, 34),

  makePkg('lhr-02', 'lahore-heritage-escape-2day', 'Lahore Heritage Escape', PackageTier.HERITAGE, undefined, 2, 1400000,
    'A refined 2-day Lahore heritage journey. Day 1: Lahore Museum, Minar-e-Pakistan, Jahangir\'s Tomb, Lahore Fort, Badshahi Mosque, and Fort Road Food Street dinner. Day 2: Shahi Hammam, Walled City, Wazir Khan Mosque, Shalimar Gardens, and Wagah Border ceremony.',
    ['Expert guide (2 days)', 'All major heritage site entries', 'Fort Road dinner (Day 1)', 'Hotel/airport transfers'],
    ['Hotel accommodation', 'Personal expenses', 'Meals beyond inclusions'], '/images/packages/lahore/lahore-heritage-escape.jpg', 4.8, 28),

  makePkg('lhr-03', 'lahore-city-highlights-classic-sightseeing', 'City High Lights – Classic Lahore Sightseeing', PackageTier.CULTURAL, 9, undefined, 650000,
    'The definitive one-day Lahore experience. Begin at Lahore Museum, visit Minar-e-Pakistan and the Digital History Museum, explore Lahore Fort and Badshahi Mosque, enjoy lunch at a local restaurant, and explore Walled City streets. Optional: Jahangir\'s Tomb or Shahi Hammam.',
    ['Expert guide (8–10 hours)', 'Lahore Museum entry', 'Lahore Fort & Badshahi Mosque', 'Lunch at local restaurant'],
    ['Personal shopping', 'Additional beverages', 'Transport to start point (unless hotel pickup)'], '/images/packages/lahore/lahore-city-highlights.jpg', 4.7, 52),

  makePkg('lhr-04', 'lahore-by-night-roshan-galiyan', 'Lahore by Night – Roshan Galiyan', PackageTier.CULTURAL, 4, undefined, 350000,
    'Discover Lahore\'s illuminated Walled City after dark. Walk the glowing Delhi Gate and surrounding historic lanes, visit Wazir Khan Mosque exterior, hear captivating storytelling about Lahore\'s history, and finish with rooftop dining at Fort Road Food Street.',
    ['Expert night guide (3–4 hours)', 'Walled City illuminated walking tour', 'Dinner at Fort Road Food Street'],
    ['Personal beverages beyond dinner', 'Transport to meeting point'], '/images/packages/lahore/lahore-by-night.jpg', 4.9, 41),

  makePkg('lhr-05', 'lahore-zaiqa-e-lahore-food-trail', 'Zaiqa-e-Lahore – Food Trail', PackageTier.FOOD, 5, undefined, 450000,
    'A curated food journey through Androon Lahore. Begin with a traditional Lahori breakfast (halwa puri or nihari), explore Shahi Hammam and Wazir Khan Mosque between food stops, sample lassi and seasonal refreshments, and conclude at a legendary dessert shop for falooda or kulfi.',
    ['Expert food guide (4–5 hours)', '6 food stops with tastings', 'Traditional breakfast', 'Lassi & street snacks', 'Dessert finale'],
    ['Personal additional orders', 'Transport to meeting point'], '/images/packages/lahore/zaiqa-e-lahore-food-trail.jpg', 5.0, 63),

  makePkg('lhr-06', 'lahore-bazaar-e-lahore-shopping', 'Bazaar-e-Lahore – Shopping Experience', PackageTier.LIFESTYLE, 5, undefined, 350000,
    'Traditional and modern Lahore shopping. Explore Anarkali Bazaar for textiles and souvenirs, Ichhra and Shahalmi markets for local goods, Liberty Market for fashion, an optional khussa or handicraft retailer, and MM Alam Road or a modern mall. Includes refreshment break.',
    ['Local shopping guide (4–6 hours)', 'Visits to Anarkali, Liberty, Ichhra markets', 'Refreshment break'],
    ['Personal shopping costs', 'Transport between markets'], '/images/packages/lahore/bazaar-e-lahore.jpg', 4.6, 29),

  makePkg('lhr-07', 'lahore-colonial-british-raj-heritage', 'Colonial Lahore – British Raj Heritage', PackageTier.HERITAGE, 4, undefined, 350000,
    'Walk historic Mall Road and discover Lahore\'s colonial architecture. View Lahore High Court, the General Post Office, old Punjab University campus, Government College University, National College of Arts, and Quaid-e-Azam Library. Ideal for historians, architects, and British heritage enthusiasts.',
    ['Expert colonial heritage guide (half day)', 'Mall Road heritage walk', 'Café refreshments'],
    ['Personal transport', 'Additional meals'], '/images/packages/lahore/colonial-lahore.jpg', 4.7, 18),

  makePkg('lhr-08', 'lahore-sufi-spiritual-cultural-trail', 'Sufi Lahore – Spiritual & Cultural Trail', PackageTier.SPIRITUAL, 4, undefined, 350000,
    'Journey into the spiritual heart of Lahore. Visit Data Darbar, the shrine of Madho Lal Hussain, and Mian Mir Shrine. Learn about the poetry and traditions of Lahore\'s greatest Sufi mystics. Optional qawwali or Sufi music where a programme is available.',
    ['Expert Sufi heritage guide (half day)', 'Data Darbar visit', 'Madho Lal Hussain & Mian Mir shrines', 'Cultural context & poetry introduction'],
    ['Personal contributions at shrines', 'Transport to meeting point'], '/images/packages/lahore/sufi-lahore.jpg', 4.9, 37),

  makePkg('lhr-09', 'lahore-rang-e-pakistan-arts-crafts', 'Rang-e-Pakistan – Arts & Crafts Experience', PackageTier.ARTS, 4, undefined, 400000,
    'An immersive half-day in Lahore\'s creative soul. Visit NCA (National College of Arts) or PIDFC, witness a truck art demonstration, participate in a pottery, embroidery, or calligraphy workshop, explore miniature painting traditions, and purchase handmade souvenirs directly from artisans.',
    ['Arts guide & workshop host (half day)', 'NCA or PIDFC visit', 'Hands-on craft activity', 'Artisan souvenir opportunity', 'Refreshments'],
    ['Personal souvenir purchases', 'Transport to venue'], '/images/packages/lahore/rang-e-pakistan.jpg', 4.8, 22),

  makePkg('lhr-10', 'lahore-mughal-gardens-architecture-trail', 'Mughal Gardens & Architecture Trail', PackageTier.HERITAGE, 5, undefined, 450000,
    'Explore Lahore\'s finest Mughal landscape and architectural masterpieces. Begin at Shalimar Gardens and study the terraces, water features, and design philosophy. Continue to Lahore Fort for a guided architectural walk, then Badshahi Mosque, with an optional Wazir Khan Mosque visit.',
    ['Heritage architecture guide (half–full day)', 'Shalimar Gardens entry', 'Lahore Fort architectural tour', 'Badshahi Mosque visit', 'Lunch or refreshments'],
    ['Personal shopping', 'Additional meals'], '/images/packages/lahore/mughal-gardens.jpg', 4.8, 31),

  makePkg('lhr-11', 'lahore-cricket-sports-tourism', 'Cricket Lahore – Sports Tourism', PackageTier.SPORTS, 4, undefined, 300000,
    'A cricket lover\'s dream in the city that lives for the game. Visit Gaddafi Stadium, tour the Cricket Museum and Cricket Academy, learn about Pakistan cricket history and Lahore\'s legendary role in the sport, and conclude with a cricket-themed meal.',
    ['Sports guide (half day)', 'Gaddafi Stadium tour', 'Cricket Museum visit', 'Cricket-themed meal'],
    ['Personal transport', 'Additional purchases'], '/images/packages/lahore/cricket-lahore.jpg', 4.6, 15),

  makePkg('lhr-12', 'lahore-lens-on-lahore-photography-tour', 'Lens on Lahore – Photography Tour', PackageTier.ARTS, 4, undefined, 400000,
    'A golden-hour photography experience in one of Asia\'s most photogenic cities. Begin before sunrise at Walled City viewpoints, photograph historic streets, ornate doorways, and street life, continue to Lahore Fort and Badshahi Mosque, with optional rooftop photography from a permitted venue.',
    ['Photography guide (half day)', 'Golden hour Walled City tour', 'Lahore Fort & Badshahi Mosque photography', 'Rooftop access (where permitted)', 'Refreshments'],
    ['Camera equipment', 'Personal transport to start point'], '/images/packages/lahore/lens-on-lahore.jpg', 4.9, 19),

  makePkg('lhr-13', 'lahore-family-lifestyle-special-package', 'Family, Lifestyle & Special Customer Package', PackageTier.FAMILY, 9, undefined, 700000,
    'A full-day family adventure across Lahore\'s best family attractions. Visit Lahore Zoo, Safari Park, Jilani Park or Greater Iqbal Park, and enjoy family-friendly rides at Joyland or a selected operating attraction. Lunch at a family restaurant with optional shopping or dessert stop.',
    ['Family guide & coordinator (8–10 hours)', 'Lahore Zoo entry', 'Safari Park visit', 'Joyland or attraction visit', 'Family restaurant lunch'],
    ['Personal shopping', 'Additional rides or activities beyond inclusions'], FALLBACK_IMG.family, 4.7, 24),

  makePkg('lhr-14', 'lahore-kids-discovery-learning-tour', 'Kids Discovery Lahore', PackageTier.FAMILY, 9, undefined, 600000,
    'An educational adventure designed for children and school groups. Visit Lahore Museum or a suitable educational attraction, the History Museum at Minar-e-Pakistan, a Science Museum, participate in a supervised craft workshop, enjoy lunch, and complete a guided heritage quiz activity.',
    ['Kids-specialist educator guide (8–10 hours)', 'Lahore Museum educational visit', 'Science Museum', 'Supervised craft workshop', 'Heritage quiz activity', 'Lunch'],
    ['Personal expenses', 'School group transport to start point'], FALLBACK_IMG.kids, 4.8, 17),

  makePkg('lhr-15', 'lahore-weekend-getaway-2day', 'Lahore Weekend Getaway', PackageTier.HERITAGE, undefined, 2, 1200000,
    'The ideal city break for domestic travellers and families. Day 1: Arrive, check in, visit Lahore Fort and Badshahi Mosque, Walled City streets, History by Night experience, and dinner at Fort Road. Day 2: Shalimar Gardens, Lawrence Garden, lunch, Safari Park, and shopping at Anarkali or Liberty Market.',
    ['Expert guide (2 days)', 'All site entries', 'Fort Road dinner (Day 1)', 'Full day transport'],
    ['Hotel accommodation', 'Personal shopping', 'Additional meals'], FALLBACK_IMG.weekend, 4.7, 21),

  makePkg('lhr-16', 'lahore-honeymoon-romantic-escape', 'Lahore Honeymoon & Romantic Escape', PackageTier.SIGNATURE, undefined, 2, 1800000,
    'A curated romantic escape through Lahore\'s most beautiful and intimate venues. Boutique hotel stay, leisurely heritage visits and photo walks at couple-selected landmarks, a private photography session at iconic Lahore locations, and a pre-arranged romantic dinner at a selected restaurant.',
    ['Dedicated couple guide (2 days)', 'Boutique hotel stay', 'Private couple photo session', 'Romantic dinner arrangement', 'Heritage site visits'],
    ['Personal shopping', 'Additional activities beyond itinerary'], FALLBACK_IMG.romantic, 5.0, 29),

  makePkg('lhr-17', 'lahore-girls-day-out-lifestyle', 'Girls\' Day Out', PackageTier.LIFESTYLE, 9, undefined, 600000,
    'A curated day for friends and groups celebrating Lahore\'s lifestyle. Begin with a traditional Lahori breakfast, photo stops at iconic landmarks, Liberty Market or Emporium/Packages Mall, optional beauty or wellness venue, lunch at a stylish restaurant, and a traditional high-tea experience.',
    ['Lifestyle guide (8–10 hours)', 'Traditional breakfast', 'Photo stops at iconic landmarks', 'Shopping at Liberty/Emporium', 'High-tea experience'],
    ['Personal shopping costs', 'Beauty or wellness services'], FALLBACK_IMG.girls, 4.8, 23),

  makePkg('lhr-18', 'lahore-student-discovery-tour', 'Lahore Student Discovery Tour', PackageTier.CULTURAL, 9, undefined, 400000,
    'History, culture, and learning designed for schools, colleges, and universities. School group pickup, Lahore Museum with educational briefing, Minar-e-Pakistan and Greater Iqbal Park with History Museum, traditional lunch, Lahore Fort and Badshahi Mosque, and a student reflection or quiz activity.',
    ['Educational expert guide (8–10 hours)', 'Lahore Museum briefing', 'History Museum at Minar-e-Pakistan', 'Traditional lunch', 'Fort & Mosque visit', 'Student quiz activity'],
    ['School transport to meeting point', 'Personal expenses'], FALLBACK_IMG.students, 4.7, 31),

  makePkg('lhr-19', 'lahore-sikh-heritage-tour', 'Sikh Heritage Lahore', PackageTier.HERITAGE, 9, undefined, 700000,
    'A dedicated tour of Lahore\'s rich Sikh heritage. Visit Gurdwara Dera Sahib, the Samadhi of Maharaja Ranjit Singh, relevant Sikh heritage locations within Lahore Fort, and other selected historic Sikh-era sites. Ideal for international Sikh visitors, diaspora groups, and heritage travellers.',
    ['Sikh heritage specialist guide (8–10 hours)', 'Gurdwara Dera Sahib visit', 'Samadhi of Maharaja Ranjit Singh', 'Lahore Fort Sikh-era sections', 'High-tea or refreshments'],
    ['Personal religious contributions', 'Transport to meeting point'], FALLBACK_IMG.sikh, 4.9, 26),

  makePkg('lhr-20', 'lahore-nankana-sahib-pilgrimage', 'Nankana Sahib Pilgrimage', PackageTier.SPIRITUAL, 9, undefined, 800000,
    'A respectful and deeply moving day pilgrimage from Lahore to Nankana Sahib — birthplace of Guru Nanak Dev Ji. Visit Gurdwara Janam Asthan, allow time for prayer and reflection, with optional visits to other accessible Sikh heritage locations. Return journey to Lahore.',
    ['Pilgrimage guide & coordinator (8–10 hours)', 'Return transport Lahore–Nankana Sahib', 'Gurdwara Janam Asthan visit', 'Comfort stops', 'Lunch or refreshments'],
    ['Personal religious contributions', 'Entry offerings'], FALLBACK_IMG.nankana, 4.9, 19),

  makePkg('lhr-21', 'lahore-islamic-heritage-tour', 'Islamic Heritage of Lahore', PackageTier.HERITAGE, 9, undefined, 650000,
    'A full-day immersion in Lahore\'s Islamic architectural and spiritual heritage. Begin at Badshahi Mosque, explore Wazir Khan Mosque\'s extraordinary tilework and calligraphy, walk the Walled City\'s historic streets, visit Data Darbar shrine, and optionally explore traditional Islamic calligraphy or crafts.',
    ['Islamic heritage guide (8–10 hours)', 'Badshahi Mosque guided tour', 'Wazir Khan Mosque', 'Walled City walk', 'Data Darbar visit', 'Meal or refreshments'],
    ['Personal contributions at shrines', 'Transport to start'], FALLBACK_IMG.islamic, 4.8, 22),

  makePkg('lhr-22', 'lahore-hiran-minar-sheikhupura-fort', 'Hiran Minar & Sheikhupura Fort', PackageTier.HERITAGE, 7, undefined, 600000,
    'A day excursion from Lahore to explore Mughal-era heritage around Sheikhupura. Visit the stunning Hiran Minar complex — a unique Mughal hunting monument with a reflective lake — and optionally the nearby Sheikhupura Fort. Ideal for families, heritage tourists, and photographers.',
    ['Heritage excursion guide (1 day)', 'Return transport Lahore–Sheikhupura', 'Hiran Minar entry & guided tour', 'Sheikhupura Fort visit (subject to access)', 'Lunch at local restaurant'],
    ['Personal shopping', 'Additional activities'], FALLBACK_IMG.hiran, 4.7, 16),

  makePkg('lhr-23', 'lahore-changa-manga-forest-escape', 'Changa Manga Forest Escape', PackageTier.NATURE, 7, undefined, 500000,
    'A refreshing day escape from Lahore into one of the world\'s largest man-made forests. Follow designated visitor routes through the Changa Manga Forest, enjoy a guided nature walk, picnic or lunch at an approved area, and optionally ride the forest train if operating.',
    ['Nature guide (1 day)', 'Return transport from Lahore', 'Nature walk', 'Picnic lunch', 'Forest train (if operating)'],
    ['Personal expenses', 'Additional activities'], FALLBACK_IMG.forest, 4.6, 14),

  makePkg('lhr-24', 'lahore-kasur-sufi-culinary-trail', 'Kasur – Sufi & Culinary Trail', PackageTier.SPIRITUAL, 7, undefined, 600000,
    'A day journey to the soul of Kasur — birthplace of the great Sufi poet Bulleh Shah. Visit the shrine of Bulleh Shah, learn about his poetry and legacy, explore local cultural sites, enjoy an authentic Kasuri food experience with traditional sweets, and optionally visit local craft businesses.',
    ['Sufi heritage guide (1 day)', 'Return transport Lahore–Kasur', 'Bulleh Shah shrine visit', 'Kasuri food experience & sweets', 'Cultural site explorations'],
    ['Personal contributions at shrine', 'Extra purchases'], FALLBACK_IMG.kasur, 4.8, 18),

  makePkg('lhr-25', 'lahore-harappa-indus-valley-civilisation', 'Harappa – Indus Valley Civilisation', PackageTier.HERITAGE, 9, undefined, 900000,
    'An extraordinary archaeological day trip to Harappa — one of the great cities of the Indus Valley Civilisation (3300–1300 BCE). Receive a guided introduction, explore accessible areas of the ancient settlement, visit the Harappa Museum, and gain a deep understanding of one of humanity\'s earliest civilisations.',
    ['Archaeological heritage guide (1 day)', 'Return transport Lahore–Harappa', 'Harappa Museum entry', 'Full guided site tour', 'Lunch or refreshments'],
    ['Personal shopping', 'Additional meals'], FALLBACK_IMG.harappa, 4.9, 12),

  makePkg('lhr-26', 'lahore-khewra-salt-mine-adventure', 'Khewra Salt Mine Adventure', PackageTier.NATURE, 9, undefined, 850000,
    'A spectacular day adventure to Khewra Salt Mine — one of the largest salt mines in the world. Travel through the Salt Range, complete the authorised underground mine tour, marvel at pink salt formations, visit approved viewpoints, and enjoy a meal before returning to Lahore.',
    ['Adventure guide (1 day)', 'Return transport Lahore–Khewra', 'Authorised mine tour entry', 'Salt Range viewpoints', 'Lunch or refreshments'],
    ['Personal shopping', 'Additional activities'], FALLBACK_IMG.saltmine, 4.8, 24),

  makePkg('lhr-27', 'lahore-rohtas-fort-historical-expedition', 'Rohtas Fort Historical Expedition', PackageTier.HERITAGE, 9, undefined, 900000,
    'A monumental day expedition to Rohtas Fort — a UNESCO World Heritage Site built by Sher Shah Suri in the 16th century. Explore the fort\'s massive gateways, defensive walls, and accessible structures, learn about its extraordinary history, and enjoy photography time at this rarely-visited gem.',
    ['Heritage expedition guide (1 day)', 'Return transport Lahore–Rohtas', 'Full guided fort exploration', 'Packed lunch at pre-arranged venue'],
    ['Personal expenses', 'Overnight accommodation (if overnight option chosen)'], FALLBACK_IMG.rohtas, 4.9, 11),

  makePkg('lhr-28', 'lahore-katas-raj-salt-range-discovery', 'Katas Raj & Salt Range Discovery', PackageTier.HERITAGE, 9, undefined, 950000,
    'Explore the sacred Katas Raj temples and the stunning Salt Range. Visit the heritage temple complex, learn about the site\'s ancient Hindu and Buddhist history, continue to selected Salt Range viewpoints, with an optional second day extension to nearby attractions.',
    ['Heritage guide (1–2 days)', 'Return transport from Lahore', 'Katas Raj temple complex entry', 'Salt Range viewpoints', 'Lunch or refreshments'],
    ['Overnight accommodation (2-day option)', 'Personal expenses'], FALLBACK_IMG.katas, 4.8, 9),

  makePkg('lhr-29', 'lahore-kallar-kahar-nature-escape', 'Kallar Kahar Nature Escape', PackageTier.NATURE, 7, undefined, 700000,
    'A serene nature escape to the beautiful Kallar Kahar lake and countryside. Explore the lake area and scenic viewpoints, enjoy a relaxed picnic or lunch, optionally visit nearby Salt Range attractions. The 2-day option includes a leisurely morning and optional nature activity before returning to Lahore.',
    ['Nature guide (1–2 days)', 'Return transport from Lahore', 'Kallar Kahar lake exploration', 'Picnic or restaurant lunch'],
    ['Accommodation (2-day option)', 'Personal expenses', 'Additional activities'], FALLBACK_IMG.kallar, 4.7, 13),

  makePkg('lhr-30', 'lahore-corporate-business-experience', 'Corporate Lahore Experience', PackageTier.CORPORATE, 9, undefined, 1500000,
    'A tailored corporate city experience for business delegations and investors. Airport or hotel pickup, transfer to business meeting or corporate venue, meeting-day transport support, business-friendly lunch, an afternoon heritage or cultural visit tailored to available time, and a networking dinner or hosted meal.',
    ['Corporate coordinator (8–10 hours)', 'Full-day transport & coordination', 'Business-friendly lunch', 'Tailored heritage afternoon visit', 'Networking dinner arrangement'],
    ['Business meeting venue costs', 'Personal expenses'], FALLBACK_IMG.corporate, 4.8, 8),

  makePkg('lhr-31', 'lahore-festival-events-tour', 'Lahore Festival & Events Tour', PackageTier.CULTURAL, 8, undefined, 800000,
    'An event-tailored Lahore experience around confirmed festivals, exhibitions, sporting events, or cultural programmes. Includes airport/hotel pickup, transfer to the event, entry and registration support, event-day transport coordination, and an optional Lahore heritage or shopping day extension.',
    ['Event coordinator (event-based)', 'Transport to and from event', 'Entry support & coordination', 'Optional city experience add-on'],
    ['Event tickets (unless specified)', 'Personal expenses', 'Hotel accommodation'], FALLBACK_IMG.festival, 4.7, 7),

  makePkg('lhr-32', 'lahore-cook-with-lahori-family', 'Cook with a Lahori Family', PackageTier.FOOD, 4, undefined, 500000,
    'A warm and immersive home cooking experience with a Lahori family. Meet your hosts, learn about traditional menu selection and food heritage, participate in preparing authentic Pakistani dishes, optionally enjoy a live BBQ, and share a family meal while learning about spices, cooking techniques, and regional food culture.',
    ['Host family & cooking guide (3–4 hours)', 'All ingredients and cooking materials', 'Shared family meal', 'Live BBQ option', 'Recipes to take home'],
    ['Transport to family home', 'Personal purchases'], FALLBACK_IMG.cooking, 5.0, 31),

  makePkg('lhr-33', 'lahore-basant-festival-experience', 'Basant Festival Experience', PackageTier.CULTURAL, 8, undefined, 1200000,
    'Experience Lahore\'s legendary Basant kite festival — a celebration of spring with music, food, and thousands of kites filling the sky. Includes a cultural briefing, Walled City glimpses of Basant atmosphere, visits to lawfully organised festival venues, traditional food and entertainment, and optional traditional dress or photography.',
    ['Festival guide & coordinator', 'Cultural briefing', 'Authorised festival venue access', 'Traditional food & entertainment', 'Optional dress & photography experience'],
    ['Personal kite purchases', 'Transport between venues', 'Hotel accommodation'], FALLBACK_IMG.basant, 4.9, 16),

  makePkg('lhr-34', 'lahore-sufi-music-qawwali-evening', 'Sufi Music & Qawwali Evening', PackageTier.SPIRITUAL, 8, undefined, 700000,
    'A transcendent evening of Sufi poetry, music, and qawwali in Lahore. Introduction to the traditions of Sufi music and qawwali, attendance at a scheduled live performance or curated private programme, optional pre-performance dinner, and an optional customised live qawwali arrangement for private groups.',
    ['Sufi music guide & programme curator', 'Live performance or curated programme', 'Introduction to Sufi poetry traditions', 'Optional pre-performance dinner', 'Return transport'],
    ['Private qawwali arrangement (optional add-on cost)', 'Personal expenses'], FALLBACK_IMG.qawwali, 5.0, 44),

  makePkg('lhr-35', 'lahore-ganda-singh-border-ceremony', 'Ganda Singh Border – Flag-Lowering Ceremony', PackageTier.CULTURAL, 6, undefined, 650000,
    'A unique half-day excursion to the Ganda Singh Border flag-lowering ceremony in Kasur. Combined with a visit to the Bulleh Shah shrine, an Old City walk, and a taste of Kasur\'s food culture. Meet the tour coordinator, receive a cultural briefing, and witness the patriotic ceremony.',
    ['Excursion guide & coordinator (5–6 hours)', 'Return transport Lahore–Kasur', 'Border ceremony viewing', 'Bulleh Shah shrine visit', 'Kasur food culture experience'],
    ['Personal contributions at shrine', 'Additional meals'], FALLBACK_IMG.ganda, 4.8, 13),
];

export const LAHORE_PACKAGE_DETAILS: Record<string, LahorePackageDetail> = Object.fromEntries(
  LAHORE_PACKAGES.map((p) => [p.slug, p]),
);

