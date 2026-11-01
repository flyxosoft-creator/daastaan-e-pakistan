// ─── Brand Constants ──────────────────────────────────────────────────────────

export const BRAND = {
  name: 'Daastaan-e-Pakistan',
  nameUrdu: 'داستان پاکستان',
  tagline: 'Discover Pakistan. Live Its Stories.',
  shortHandle: 'DeP',
  supportEmail: 'support@daastaan-e-pakistan.com',
  adminEmail: 'admin@daastaan-e-pakistan.com',
  whatsappNumber: '+923001234567', // TODO: Replace with real number
  socialLinks: {
    instagram: 'https://instagram.com/daastaaanepakistan',
    facebook: 'https://facebook.com/daastaaanepakistan',
    twitter: 'https://twitter.com/daastaaanepk',
  },
} as const

// ─── Cities (v1 Launch Set) ───────────────────────────────────────────────────

export const V1_CITIES = ['lahore', 'islamabad'] as const
export type V1City = (typeof V1_CITIES)[number]

// ─── Package Tiers ────────────────────────────────────────────────────────────

export const TIER_LABELS = {
  CULTURAL: 'Cultural Heritage',
  FOOD: 'Food Trail',
  FAMILY: 'Family',
  NATURE: 'Nature',
} as const

export const TIER_DESCRIPTIONS = {
  CULTURAL: "Explore Pakistan's rich history, architecture & traditions",
  FOOD: "A culinary journey through Pakistan's diverse flavours",
  FAMILY: "Memorable adventures designed for families of all sizes",
  NATURE: "Mountains, valleys & wilderness — Pakistan's natural wonders",
} as const

// ─── Booking Constants ────────────────────────────────────────────────────────

export const BOOKING = {
  maxPartySize: 12,
  minPartySize: 1,
  slotHoldMinutes: 15,             // FR-090: slot held for 15 min on payment failure
  paymentReminderMinutes: 10,      // FR-092: reminder at 10 min
  availabilityWindowDays: 180,     // FR-059: calendar shows next 180 days
  reviewWindowDays: 30,            // FR-100: review window 30 days after completion
  checkInAlertMinutes: 30,         // FR-126: alert if guide misses check-in by 30 min
  reviewPromptHours: 24,           // FR-106: review prompt 24h after completion
  reviewReminderDays: 7,           // FR-107: reminder after 7 days
} as const

// ─── Safety Constants ─────────────────────────────────────────────────────────

export const SAFETY = {
  locationUpdateIntervalSeconds: 60,   // FR-122: GPS update every 60s
  trackingLinkExpiryHoursAfterTrip: 1, // FR-123: share link expires 1h after trip
} as const

// ─── Currency ─────────────────────────────────────────────────────────────────

export const CURRENCIES = {
  PKR: { symbol: '₨', name: 'Pakistani Rupee', flag: '🇵🇰' },
  USD: { symbol: '$', name: 'US Dollar', flag: '🇺🇸' },
  GBP: { symbol: '£', name: 'British Pound', flag: '🇬🇧' },
} as const

export const FX_CACHE_TTL_SECONDS = 86400 // 24 hours

// ─── Auth Constants ───────────────────────────────────────────────────────────

export const AUTH = {
  sessionTtlHours: 24,
  rememberMeTtlDays: 30,
  jwtAccessTtlMinutes: 15,
  jwtRefreshTtlDays: 30,
  emailVerifyTtlHours: 24,
  passwordResetTtlHours: 1,
  maxLoginAttempts: 5,
  lockoutMinutes: 15,
} as const

// ─── Pagination ───────────────────────────────────────────────────────────────

export const PAGINATION = {
  defaultLimit: 12,
  maxLimit: 24,
} as const

// ─── File Upload ──────────────────────────────────────────────────────────────

export const UPLOAD = {
  maxReviewPhotos: 5,
  maxReviewPhotoSizeMb: 5,
  acceptedImageTypes: ['image/jpeg', 'image/png', 'image/webp'],
  maxPackageImages: 8,
  minPackageImages: 3,
} as const

// ─── Review ───────────────────────────────────────────────────────────────────

export const REVIEW = {
  minBodyLength: 20,
  maxBodyLength: 2000,
  maxTitleLength: 80,
} as const

