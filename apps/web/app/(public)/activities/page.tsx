'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import {
  Compass,
  MapPin,
  Clock,
  Users,
  Star,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Filter,
  CheckCircle2,
  Calendar,
  ChevronRight,
} from 'lucide-react';

type ActivityCategory = 'all' | 'festivals' | 'food' | 'fun' | 'cooking' | 'painting' | 'sports';

interface ActivityItem {
  id: string;
  slug: string;
  title: string;
  category: 'festivals' | 'food' | 'fun' | 'cooking' | 'painting' | 'sports';
  categoryLabel: string;
  city: string;
  duration: string;
  groupSize: string;
  difficulty: 'Relaxed' | 'Moderate' | 'Active' | 'Intense';
  rating: number;
  reviewsCount: number;
  image: string;
  guideName: string;
  guideRole: string;
  description: string;
  highlights: string[];
  seasonalTiming?: string;
}

const ACTIVITIES_DATA: ActivityItem[] = [
  // ─── 1. Festivals ────────────────────────────────────────────────────────
  {
    id: 'act-1',
    slug: 'shandur-polo-festival-expedition',
    title: 'Shandur High-Altitude Polo Festival & Pamir Camp',
    category: 'festivals',
    categoryLabel: 'Festivals',
    city: 'Shandur Pass, Gilgit-Chitral Border',
    duration: '4 Days / 3 Nights',
    groupSize: '2–10 Guests',
    difficulty: 'Moderate',
    rating: 4.9,
    reviewsCount: 38,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200&auto=format&fit=crop',
    guideName: 'Col. (R) Tariq Baig',
    guideRole: 'Karakoram Mountain & Polo Historian',
    description:
      'Witness the legendary free-style "Polo on the Roof of the World" at 3,700m elevation. Pure unwritten rules, thunderous mountain crowds, traditional music, and starlit camps.',
    highlights: ['Front-row seats to Gilgit vs Chitral polo derby', 'Folk dancing by mountain fires', 'High-altitude tented camp under milky way'],
    seasonalTiming: 'Annual Season: July',
  },
  {
    id: 'act-2',
    slug: 'kalash-chilam-joshi-spring-festival',
    title: 'Kalash Valley Chilam Joshi Spring Festival',
    category: 'festivals',
    categoryLabel: 'Festivals',
    city: 'Bumburet & Rumbur Valleys, Chitral',
    duration: '3 Days / 2 Nights',
    groupSize: '1–8 Guests',
    difficulty: 'Relaxed',
    rating: 4.9,
    reviewsCount: 42,
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop',
    guideName: 'Yasmeen Kalash',
    guideRole: 'Indigenous Kalash Anthropologist',
    description:
      'Immerse in the vibrant ancient spring rites of the Kalash indigenous people. Intricate embroidered dresses, walnut flower garlands, communal chants, and sacred rites welcoming spring.',
    highlights: ['Authentic community homestay access', 'Traditional milk ceremony & folk dancing', 'Sacred juniper incense cleansing ceremony'],
    seasonalTiming: 'Annual Season: May',
  },
  {
    id: 'act-3',
    slug: 'lahore-sufi-qawwali-and-urs-culture',
    title: 'Mystical Sufi Shrine Qawwali & Urs Cultural Night',
    category: 'festivals',
    categoryLabel: 'Festivals',
    city: 'Old Lahore & Data Darbar',
    duration: '5 Hours',
    groupSize: '2–8 Guests',
    difficulty: 'Relaxed',
    rating: 4.8,
    reviewsCount: 65,
    image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=1200&auto=format&fit=crop',
    guideName: 'Ustad Mian Zubair',
    guideRole: 'Heritage Sufi Music Scholar',
    description:
      'An evening of spiritual transcendence inside centuries-old shrines. Listen to hypnotic live Qawwali poetry, observe devotional dhamal drumming, and taste traditional Niaz feasts.',
    highlights: ['VIP access to private courtyard Qawwali', 'Spiritual commentary and poetry translation', 'Late-night saffron tea and jalebi pairing'],
    seasonalTiming: 'Available Year-Round (Thursday Evenings)',
  },

  // ─── 2. Food Experiences ──────────────────────────────────────────────────
  {
    id: 'act-4',
    slug: 'gawalmandi-anarkali-royal-food-walk',
    title: 'Gawalmandi & Old Anarkali Living Food Trail',
    category: 'food',
    categoryLabel: 'Food Experiences',
    city: 'Lahore (Walled City & Anarkali)',
    duration: '4 Hours',
    groupSize: '1–8 Guests',
    difficulty: 'Relaxed',
    rating: 5.0,
    reviewsCount: 114,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=1200&auto=format&fit=crop',
    guideName: 'Chef Kamran Butt',
    guideRole: '3rd-Generation Lahori Gastronomist',
    description:
      'Eat your way through the world’s most intense culinary capital. Sample 100-year-old recipe Nihari, sizzling tawa chicken, slow-churned rabri falooda, and steaming kulchas.',
    highlights: ['Taste 7 historic secret family street spots', 'Meet culinary ustads cooking with brass degs', 'Digestive Kashmiri kahwa on rooftop terrace'],
  },
  {
    id: 'act-5',
    slug: 'karachi-burns-road-night-street-feast',
    title: 'Burns Road Karachi Legendary Midnight Food Safari',
    category: 'food',
    categoryLabel: 'Food Experiences',
    city: 'Burns Road & Saddar, Karachi',
    duration: '3.5 Hours',
    groupSize: '2–10 Guests',
    difficulty: 'Relaxed',
    rating: 4.9,
    reviewsCount: 89,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop',
    guideName: 'Farhan Qureshi',
    guideRole: 'Karachi Street Culture Archivist',
    description:
      'The buzzing heart of Karachi night dining: melt-in-mouth Waheed kababs, spicy fry-katakat, bun kababs, saffron matka kulfi, and Karachi spiced limca soda.',
    highlights: ['Behind-the-scenes grill watching', 'Taste 1947 refugee heritage recipes', 'Late-night Dhoraji gola ganda finale'],
  },
  {
    id: 'act-6',
    slug: 'peshawar-namak-mandi-shinwari-trail',
    title: 'Peshawar Namak Mandi & Qissa Khwani Chai Safari',
    category: 'food',
    categoryLabel: 'Food Experiences',
    city: 'Old Peshawar (Namak Mandi)',
    duration: '4 Hours',
    groupSize: '1–8 Guests',
    difficulty: 'Relaxed',
    rating: 4.9,
    reviewsCount: 51,
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?q=80&w=1200&auto=format&fit=crop',
    guideName: 'Arbab Khan',
    guideRole: 'Pashtun Culinary Heritage Guide',
    description:
      'Taste mutton cooked with nothing but natural mountain lamb fat, rock salt, and green chilies. Sip green cardamom tea where ancient caravanserai merchants exchanged stories.',
    highlights: ['Select your cuts directly with master butchers', 'Famous Peshawari Chapli Kabab tasting', 'Historic Qissa Khwani storyteller bazaar walk'],
  },

  // ─── 3. Fun Activities ────────────────────────────────────────────────────
  {
    id: 'act-7',
    slug: 'attabad-lake-jet-ski-and-boating-adventure',
    title: 'Turquoise Attabad Lake Jet Skiing & Speedboat Cruise',
    category: 'fun',
    categoryLabel: 'Fun Activities',
    city: 'Hunza Valley, Gilgit-Baltistan',
    duration: '3 Hours',
    groupSize: '1–6 Guests',
    difficulty: 'Moderate',
    rating: 4.9,
    reviewsCount: 67,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop',
    guideName: 'Sherbaz Karim',
    guideRole: 'Certified Alpine Watersports Instructor',
    description:
      'Glide over the crystal-clear azure waters of Attabad Lake flanked by towering 6,000m peaks. High-speed jet skiing, private wooden boat cruise, and lakeside apricot tea.',
    highlights: ['High-performance Yamaha jet ski ride', 'Life jacket & safety boat escort provided', 'Lakeside fresh local cherry & walnut snack'],
  },
  {
    id: 'act-8',
    slug: 'katpana-desert-dune-bashing-and-camping',
    title: 'Cold Desert Katpana 4x4 Dune Bashing & Stargazing',
    category: 'fun',
    categoryLabel: 'Fun Activities',
    city: 'Skardu, Baltistan',
    duration: '5 Hours (Sunset to Night)',
    groupSize: '2–8 Guests',
    difficulty: 'Moderate',
    rating: 4.8,
    reviewsCount: 44,
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1200&auto=format&fit=crop',
    guideName: 'Ali Raza Balti',
    guideRole: 'High-Altitude 4x4 Expedition Driver',
    description:
      'Conquer the world’s highest cold sand dunes with skilled desert drivers. As night falls over Skardu, warm up by a crackling juniper fire beneath pristine cosmic skies.',
    highlights: ['Adrenaline-fueled 4x4 desert dune navigation', 'High-altitude telescope for Saturn & Milky Way', 'Warm Balti butter tea and dry apricot treats'],
  },
  {
    id: 'act-9',
    slug: 'karachi-mangroves-kayaking-safari',
    title: 'Indus Delta Mangroves Kayaking & Birding Safari',
    category: 'fun',
    categoryLabel: 'Fun Activities',
    city: 'Karachi Coastal Delta',
    duration: '4 Hours',
    groupSize: '2–10 Guests',
    difficulty: 'Moderate',
    rating: 4.7,
    reviewsCount: 33,
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1200&auto=format&fit=crop',
    guideName: 'Capt. Zeeshan',
    guideRole: 'Marine Biologist & Kayak Guide',
    description:
      'Paddle through serene tidal waterways sheltered by ancient mangrove forests. Spot migratory flamingos, pelicans, and kingfishers just minutes away from urban Karachi.',
    highlights: ['Single & tandem ocean touring kayaks', 'Binoculars and coastal wildlife guide', 'Fresh coconut water & island picnic break'],
  },

  // ─── 4. Cooking Masterclasses ─────────────────────────────────────────────
  {
    id: 'act-10',
    slug: 'royal-mughal-dum-biryani-masterclass',
    title: 'Royal Mughal Dum Biryani & Shahi Tukray Masterclass',
    category: 'cooking',
    categoryLabel: 'Cooking',
    city: 'Haveli Kitchen, Old Lahore',
    duration: '4 Hours',
    groupSize: '2–6 Guests',
    difficulty: 'Relaxed',
    rating: 5.0,
    reviewsCount: 58,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=1200&auto=format&fit=crop',
    guideName: 'Begum Salma Qureshi',
    guideRole: 'Mughal Royal Court Recipe Custodian',
    description:
      'Learn the secretive alchemy of layering aged basmati rice, tender spiced lamb, saffron-infused milk, and edible silver vark inside a dough-sealed clay pot (Dum pukht).',
    highlights: ['Hands-on spice grinding with stone mortar', 'Dough-sealed handi technique masterclass', 'Full sit-down family banquet dining together'],
  },
  {
    id: 'act-11',
    slug: 'traditional-shinwari-lamb-karahi-cooking',
    title: 'Open-Flame Pashtun Shinwari Karahi Cooking Workshop',
    category: 'cooking',
    categoryLabel: 'Cooking',
    city: 'Peshawar & Margalla Foothills',
    duration: '3.5 Hours',
    groupSize: '2–8 Guests',
    difficulty: 'Relaxed',
    rating: 4.9,
    reviewsCount: 39,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop',
    guideName: 'Ustad Gulzar Shinwari',
    guideRole: 'Tribal Open-Fire Pit Master',
    description:
      'Master the art of cooking Pakistan’s most celebrated rustic barbecue in pure iron woks. Work directly with woodfire, tomatoes, and natural sheep fat rendering.',
    highlights: ['Cast-iron wok fire temperature control', 'Kandahari flatbread baking on pebble stones', 'Take-home secret hand-blended spice pouch'],
  },
  {
    id: 'act-12',
    slug: 'hunza-mountain-apricot-cuisine-workshop',
    title: 'Hunza Centenarian Organic Apricot Cooking Class',
    category: 'cooking',
    categoryLabel: 'Cooking',
    city: 'Karimabad, Hunza Valley',
    duration: '3 Hours',
    groupSize: '2–8 Guests',
    difficulty: 'Relaxed',
    rating: 4.9,
    reviewsCount: 27,
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1200&auto=format&fit=crop',
    guideName: 'Bibigul Hunzai',
    guideRole: 'Pamir Herbal & Nutritional Elder',
    description:
      'Discover the secret longevity foods of the Hunza people: fresh apricot oil pressing, barley Chapshuro meat pies, and wild mountain herbal teas.',
    highlights: ['Traditional wood-fired stone oven baking', 'Hand-press cold apricot kernel oil', 'Centenarian longevity dietary insights and booklet'],
  },

  // ─── 5. Painting & Traditional Crafts ─────────────────────────────────────
  {
    id: 'act-13',
    slug: 'authentic-pakistani-truck-art-workshop',
    title: 'Authentic Pakistani Truck Art Workshop with Master Ustad',
    category: 'painting',
    categoryLabel: 'Painting & Crafts',
    city: 'Rawalpindi & Lahore Artisan Studios',
    duration: '4 Hours',
    groupSize: '1–6 Guests',
    difficulty: 'Relaxed',
    rating: 5.0,
    reviewsCount: 78,
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1200&auto=format&fit=crop',
    guideName: 'Ustad Haider Ali',
    guideRole: 'World-Renowned Truck Art Master',
    description:
      'Paint vibrant floral motifs, kaleidoscopic poetic couplets, and chamakpatti reflective sticker art under Pakistan’s foremost living truck art master.',
    highlights: ['Learn authentic calligraphy & bright enamel brushwork', 'Custom-paint your own wooden keepsake box or tray', 'Complete toolkit and certificate of completion included'],
  },
  {
    id: 'act-14',
    slug: 'multan-blue-pottery-kashigari-workshop',
    title: 'Multani Kashigari (Blue Pottery) Hand-Glazing Class',
    category: 'painting',
    categoryLabel: 'Painting & Crafts',
    city: 'Multan Old Craft Quarter',
    duration: '3.5 Hours',
    groupSize: '1–8 Guests',
    difficulty: 'Relaxed',
    rating: 4.8,
    reviewsCount: 31,
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=1200&auto=format&fit=crop',
    guideName: 'Mohammad Akram',
    guideRole: 'Master Potter (8th-Generation Family Studio)',
    description:
      'Work with clay shaped on potter’s wheels, then hand-paint intricate Persian blue and cobalt turquoise patterns with squirrel-hair brushes before kiln-firing.',
    highlights: ['Throw clay on traditional kick-wheel', 'Apply cobalt oxide and natural copper glazes', 'Your glazed ceramic piece packed & shipped to your address'],
  },
  {
    id: 'act-15',
    slug: 'mughal-miniature-painting-masterclass',
    title: 'Mughal Miniature Painting & Calligraphy Workshop',
    category: 'painting',
    categoryLabel: 'Painting & Crafts',
    city: 'National College of Arts Quarter, Lahore',
    duration: '3.5 Hours',
    groupSize: '2–6 Guests',
    difficulty: 'Relaxed',
    rating: 4.9,
    reviewsCount: 29,
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=1200&auto=format&fit=crop',
    guideName: 'Zehra Fatima',
    guideRole: 'Classical Ustad & Miniature Artist',
    description:
      'Learn the centuries-old technique of single-hair squirrel brushes, handmade wasli paper, natural lapis lazuli pigments, and authentic 24k gold leaf illumination.',
    highlights: ['Paint on burnished handmade wasli parchment', 'Master delicate Mughal leaf and bird borders', 'Take home your framed illuminated miniature artwork'],
  },

  // ─── 6. Sports & Adventure ────────────────────────────────────────────────
  {
    id: 'act-16',
    slug: 'swat-river-white-water-rafting',
    title: 'Swat & Kunhar River White-Water Rafting Adventure',
    category: 'sports',
    categoryLabel: 'Sports',
    city: 'Kalam Valley & Swat River',
    duration: '5 Hours',
    groupSize: '2–12 Guests',
    difficulty: 'Active',
    rating: 4.9,
    reviewsCount: 62,
    image: 'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?q=80&w=1200&auto=format&fit=crop',
    guideName: 'Naveed Akhtar',
    guideRole: 'Rescue-3 Certified River Master',
    description:
      'Tackle thrilling Class III & IV rapids roaring down glacial gorges in Swat and Kaghan. Full safety briefings, international standard drysuits, and riverside trout lunch.',
    highlights: ['14km continuous alpine river run', 'High-end self-bailing rafts with dual safety kayakers', 'Riverside grilled fresh river trout BBQ'],
  },
  {
    id: 'act-17',
    slug: 'pir-chinasi-paragliding-expedition',
    title: 'Tandem Paragliding Flight over Pir Chinasi Valleys',
    category: 'sports',
    categoryLabel: 'Sports',
    city: 'Pir Chinasi (2,900m), Azad Kashmir',
    duration: '3 Hours',
    groupSize: '1–4 Guests',
    difficulty: 'Active',
    rating: 4.9,
    reviewsCount: 46,
    image: 'https://images.unsplash.com/photo-1507034589631-9433cc6bc453?q=80&w=1200&auto=format&fit=crop',
    guideName: 'Capt. Shahbaz',
    guideRole: 'FAI Licensed Tandem Flight Pilot',
    description:
      'Soar like an eagle above the clouds with certified pilots, taking off from mountain meadows and gliding with panoramic views of snowcapped Himalayan ridges.',
    highlights: ['20-minute panoramic high-altitude flight', '4K GoPro action footage of your entire flight included', 'Zero prior experience required — fly safely tandem'],
  },
  {
    id: 'act-18',
    slug: 'karakoram-granite-rock-climbing',
    title: 'Karakoram Granite Bouldering & Rock Climbing Clinic',
    category: 'sports',
    categoryLabel: 'Sports',
    city: 'Passu & Karimabad, Hunza',
    duration: 'Full Day (6 Hours)',
    groupSize: '1–6 Guests',
    difficulty: 'Intense',
    rating: 4.8,
    reviewsCount: 25,
    image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?q=80&w=1200&auto=format&fit=crop',
    guideName: 'Sirbaz Ali',
    guideRole: '8,000m Pakistani High-Altitude Climber',
    description:
      'Climb clean solid granite faces overlooking ancient glaciers. Suitable for motivated beginners through experienced climbers seeking iconic Karakoram exposure.',
    highlights: ['UIAA-certified ropes, harnesses, and climbing shoes', 'Top-rope & lead belay coaching from 8,000m veteran', 'Summit crag tea with views of Passu Cathedral peaks'],
  },
];

export default function ActivitiesPage() {
  const [selectedCategory, setSelectedCategory] = useState<ActivityCategory>('all');
  const [searchFilter, setSearchFilter] = useState('');

  const filteredActivities = ACTIVITIES_DATA.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      searchFilter === '' ||
      item.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.city.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.description.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FAF6ED] flex flex-col font-sans">
      <Header />

      {/* ─── Breadcrumb Strip ────────────────────────────────────────── */}
      <div className="bg-[#F3ECE0] border-b border-[#E8DFD0] py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-gray-600">
          <Link href="/" className="hover:text-[#123C2D]">Home</Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-[#123C2D] font-bold">Activities & Experiences</span>
        </div>
      </div>

      {/* ─── Hero Section ────────────────────────────────────────────── */}
      <section className="relative min-h-[380px] sm:min-h-[440px] flex items-center bg-gray-950 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1600&auto=format&fit=crop"
          alt="Activities in Pakistan"
          className="absolute inset-0 w-full h-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/60" />

        <div className="relative max-w-5xl mx-auto w-full text-center px-4 py-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-[#E5B558] text-xs font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Lifestyle, Cultural & Outdoor Pursuits</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
            Discover Pakistan Through Activities
          </h1>

          <p className="text-[#E5B558] font-serif text-base sm:text-xl italic max-w-2xl mx-auto drop-shadow-sm">
            Festivals, Master Culinary Trails, Fun Adventures, Truck Art Workshops & Alpine Sports
          </p>

          <p className="text-white/85 max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed pt-1">
            Experience the living heritage of Pakistan by doing. Connect with master craftsmen, legendary polo players, royal chefs, and certified outdoor guides.
          </p>
        </div>
      </section>

      {/* ─── Interactive Category Tabs ───────────────────────────────── */}
      <section className="sticky top-[68px] sm:top-[74px] z-30 bg-[#FAF6ED]/95 backdrop-blur-md border-b border-[#E8DFD0] py-3.5 px-4 sm:px-6 lg:px-8 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'all', label: 'All Activities', icon: Compass },
              { id: 'festivals', label: 'Festivals', icon: Sparkles },
              { id: 'food', label: 'Food Experiences', icon: Star },
              { id: 'fun', label: 'Fun Activities', icon: Compass },
              { id: 'cooking', label: 'Cooking', icon: CheckCircle2 },
              { id: 'painting', label: 'Painting & Crafts', icon: Sparkles },
              { id: 'sports', label: 'Sports', icon: ShieldCheck },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id as ActivityCategory)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#123C2D] text-white shadow-sm'
                      : 'bg-white/80 border border-[#DACFBF] text-gray-700 hover:bg-[#F3ECE0] hover:text-[#123C2D]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#B99550]' : 'text-gray-500'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Search inside activities */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search activities or cities..."
              className="w-full pl-3 pr-8 py-1.5 text-xs bg-white border border-[#DACFBF] rounded-full text-gray-800 placeholder-gray-500 focus:outline-none focus:border-[#123C2D]"
            />
            {searchFilter && (
              <button
                onClick={() => setSearchFilter('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ─── Activities Grid ─────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#123C2D]">
              {selectedCategory === 'all'
                ? 'All Experiences & Activities'
                : selectedCategory === 'festivals'
                ? 'Cultural Festivals & Traditional Gatherings'
                : selectedCategory === 'food'
                ? 'Living Food Trails & Heritage Dining'
                : selectedCategory === 'fun'
                ? 'Fun Activities, Watersports & Desert Adventures'
                : selectedCategory === 'cooking'
                ? 'Authentic Pakistani Cooking Masterclasses'
                : selectedCategory === 'painting'
                ? 'Truck Art, Blue Pottery & Painting Masterclasses'
                : 'Alpine Sports, Rafting & Himalayan Treks'}
            </h2>
            <p className="text-xs text-gray-600">
              Showing {filteredActivities.length} verified activities conducted by certified local hosts
            </p>
          </div>
        </div>

        {/* Grid Cards */}
        {filteredActivities.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-[#DACFBF] p-8 space-y-3">
            <p className="text-sm font-semibold text-gray-700">No activities match your search.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchFilter('');
              }}
              className="px-4 py-2 bg-[#123C2D] text-white rounded-full text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredActivities.map((act) => (
              <div
                key={act.id}
                className="group bg-white rounded-2xl overflow-hidden border border-[#DACFBF]/80 hover:border-[#B99550] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Image Banner */}
                <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                  <img
                    src={act.image}
                    alt={act.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

                  {/* Category Pill */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#123C2D]/90 text-[#F7F3E9] backdrop-blur-md border border-[#B99550]/40">
                      {act.categoryLabel}
                    </span>
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-bold">
                    <Star className="w-3.5 h-3.5 text-[#B99550] fill-[#B99550]" />
                    <span>{act.rating.toFixed(1)}</span>
                    <span className="text-[10px] text-gray-300 font-normal">({act.reviewsCount})</span>
                  </div>

                  {/* City Tag on Image */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5 text-xs text-white/95 font-medium drop-shadow">
                    <MapPin className="w-3.5 h-3.5 text-[#B99550] shrink-0" />
                    <span className="truncate">{act.city}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-serif text-lg font-bold text-[#123C2D] group-hover:text-[#B99550] transition-colors leading-snug line-clamp-2">
                      {act.title}
                    </h3>

                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                      {act.description}
                    </p>
                  </div>

                  {/* Key Metadata Pill Badges */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-600 pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#B99550] shrink-0" />
                      <span>{act.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#B99550] shrink-0" />
                      <span>{act.groupSize}</span>
                    </div>
                  </div>

                  {/* Host Attribution */}
                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-gray-700">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span className="font-semibold">{act.guideName}</span>
                    </div>
                    <span className="text-[10px] text-[#B99550] font-bold uppercase tracking-wider">
                      {act.difficulty}
                    </span>
                  </div>

                  {/* Booking / Details CTA */}
                  <Link
                    href={`/package/${act.slug}`}
                    className="w-full py-2.5 rounded-xl bg-[#123C2D] hover:bg-[#0B251B] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs group-hover:bg-[#B99550] group-hover:text-[#123C2D]"
                  >
                    <span>Reserve Activity</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

