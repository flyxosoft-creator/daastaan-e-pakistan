// ─── Enums ───────────────────────────────────────────────────────────────────

export enum PackageTier {
  CULTURAL   = 'CULTURAL',
  FOOD       = 'FOOD',
  FAMILY     = 'FAMILY',
  NATURE     = 'NATURE',
  SPIRITUAL  = 'SPIRITUAL',
  ADVENTURE  = 'ADVENTURE',
  LIFESTYLE  = 'LIFESTYLE',
  HERITAGE   = 'HERITAGE',
  SIGNATURE  = 'SIGNATURE',
  ARTS       = 'ARTS',
  SPORTS     = 'SPORTS',
  CORPORATE  = 'CORPORATE',
}

export enum BookingStatus {
  PENDING_PAYMENT = 'PENDING_PAYMENT',
  CONFIRMED = 'CONFIRMED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum PaymentGateway {
  STRIPE = 'STRIPE',
  SAFEPAY = 'SAFEPAY',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

export enum GuideStatus {
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
}

export enum PoliceStatus {
  PENDING = 'PENDING',
  CLEARED = 'CLEARED',
  REJECTED = 'REJECTED',
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export enum ReviewStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  HIDDEN = 'HIDDEN',
}

export enum DiscountType {
  PERCENTAGE = 'PERCENTAGE',
  FLAT = 'FLAT',
}

export enum AdminRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  OPS_ADMIN = 'OPS_ADMIN',
  CONTENT_MANAGER = 'CONTENT_MANAGER',
}

export enum PackageStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
}

export enum CheckInType {
  TRIP_START = 'TRIP_START',
  PICKUP_DONE = 'PICKUP_DONE',
  DAY_START = 'DAY_START',
  DAY_COMPLETE = 'DAY_COMPLETE',
  TRIP_COMPLETE = 'TRIP_COMPLETE',
}

export enum SupportedCurrency {
  PKR = 'PKR',
  USD = 'USD',
  GBP = 'GBP',
}

// ─── Core Interfaces ─────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T
  meta?: PaginationMeta
  error: null
}

export interface ApiError {
  data: null
  error: {
    statusCode: number
    message: string
    errors?: ValidationError[]
  }
}

export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface ValidationError {
  field: string
  message: string
}

// ─── City ────────────────────────────────────────────────────────────────────

export interface City {
  id: string
  name: string
  slug: string
  heroImage: string
  introCopy: string
  seoTitle: string
  seoDescription: string
  isActive: boolean
  createdAt: string
}

// ─── Guide ───────────────────────────────────────────────────────────────────

export interface Guide {
  id: string
  name: string
  bio: string
  gender: Gender
  languages: string[]
  specialities: string[]
  avatarUrl: string
  rating: number
  reviewCount: number
  policeStatus: PoliceStatus
  status: GuideStatus
  cityId: string
  city?: Pick<City, 'id' | 'name' | 'slug'>
  isVerified: boolean
  createdAt: string
}

// ─── Package ─────────────────────────────────────────────────────────────────

export interface ItineraryActivity {
  time?: string
  title: string
  description: string
  imageUrl?: string
  estimatedDuration?: string
}

export interface ItineraryDay {
  day: number
  title: string
  activities: ItineraryActivity[]
}

export interface AddOn {
  id: string
  name: string
  description: string
  pricePkr: number
  isActive: boolean
}

export interface Package {
  id: string
  slug: string
  title: string
  tier: PackageTier
  cityId: string
  city?: Pick<City, 'id' | 'name' | 'slug'>
  durationHours?: number
  durationDays?: number
  minParty: number
  maxParty: number
  basePricePkr: number
  description: string
  included: string[]
  excluded: string[]
  itinerary: ItineraryDay[]
  images: string[]
  isFeatured: boolean
  status: PackageStatus
  addOns: AddOn[]
  rating: number
  reviewCount: number
  seoTitle?: string
  seoDescription?: string
  createdAt: string
}

export type PackageCard = Pick<
  Package,
  | 'id'
  | 'slug'
  | 'title'
  | 'tier'
  | 'city'
  | 'durationHours'
  | 'durationDays'
  | 'minParty'
  | 'maxParty'
  | 'images'
  | 'rating'
  | 'reviewCount'
>

// ─── Booking ─────────────────────────────────────────────────────────────────

export interface Booking {
  id: string
  customerId: string
  packageId: string
  package?: Pick<Package, 'id' | 'slug' | 'title' | 'tier' | 'images'>
  guideId: string
  guide?: Pick<Guide, 'id' | 'name' | 'avatarUrl' | 'rating'>
  startDate: string
  endDate: string
  partySize: number
  status: BookingStatus
  totalPkr: number
  currency: SupportedCurrency
  chargedAmount: number
  gateway: PaymentGateway
  safetyLayerOn: boolean
  pickupLocation?: string
  specialRequests?: string
  promoCodeId?: string
  selectedAddOnIds: string[]
  createdAt: string
}

// ─── Review ──────────────────────────────────────────────────────────────────

export interface Review {
  id: string
  bookingId: string
  customerId: string
  customerName: string
  customerCountry?: string
  packageId: string
  rating: number
  title?: string
  body: string
  photos: string[]
  status: ReviewStatus
  createdAt: string
}

// ─── User ────────────────────────────────────────────────────────────────────

export interface UserProfile {
  id: string
  email: string
  name: string
  phone?: string
  country?: string
  avatarUrl?: string
  emailVerified: boolean
  referralCode: string
  walletCreditPkr: number
  hasEmergencyContact: boolean
  createdAt: string
}

export interface EmergencyContact {
  name: string
  relationship: string
  phone: string
  email: string
}

// ─── Analytics ───────────────────────────────────────────────────────────────

export interface DashboardMetrics {
  totalBookings: number
  confirmedBookings: number
  totalRevenuePkr: number
  avgBookingValuePkr: number
  topPackages: Array<{ packageId: string; title: string; count: number }>
  tierMix: Record<PackageTier, number>
  newsletterSignups: number
  newUsersThisPeriod: number
}

