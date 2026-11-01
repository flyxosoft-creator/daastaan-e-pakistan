import { z } from 'zod'
import { SupportedCurrency, Gender, PackageTier } from '../types'

// ─── Auth Validators ─────────────────────────────────────────────────────────

export const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one digit'),
  acceptTerms: z.boolean().refine((v) => v === true, 'You must accept the Terms & Conditions'),
})

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
})

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
})

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1),
    password: z
      .string()
      .min(8)
      .regex(/[A-Z]/)
      .regex(/[0-9]/),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

// ─── Profile Validators ───────────────────────────────────────────────────────

export const updateProfileSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  phone: z
    .string()
    .regex(/^\+?[0-9\s\-().]{7,20}$/, 'Invalid phone number')
    .optional()
    .nullable(),
  country: z.string().max(100).optional().nullable(),
})

export const emergencyContactSchema = z.object({
  name: z.string().min(2, 'Name is required').max(100),
  relationship: z.string().min(2, 'Relationship is required').max(50),
  phone: z
    .string()
    .regex(/^\+?[0-9\s\-().]{7,20}$/, 'Invalid phone number'),
  email: z.string().email('Invalid email address'),
})

// ─── Booking Validators ───────────────────────────────────────────────────────

export const bookingStep1Schema = z.object({
  packageId: z.string().cuid(),
  startDate: z.string().datetime(),
  slotId: z.string().optional(),
  partySize: z.number().int().min(1).max(12),
})

export const bookingStep2Schema = z.object({
  guideId: z.string().cuid().optional(), // null = auto-assign
  genderPreference: z.nativeEnum(Gender).optional(),
})

export const bookingStep3Schema = z.object({
  selectedAddOnIds: z.array(z.string().cuid()),
  safetyLayerOn: z.boolean(),
  pickupLocation: z.string().max(500).optional(),
})

export const bookingStep4Schema = z.object({
  promoCode: z.string().max(50).optional(),
  specialRequests: z.string().max(500).optional(),
  acceptTerms: z.boolean().refine((v) => v, 'You must accept the Terms & Conditions'),
  currency: z.nativeEnum(SupportedCurrency),
})

// ─── Review Validators ────────────────────────────────────────────────────────

export const reviewSchema = z.object({
  bookingId: z.string().cuid(),
  rating: z.number().int().min(1).max(5),
  title: z.string().max(80).optional(),
  body: z.string().min(20, 'Review must be at least 20 characters').max(2000),
})

// ─── Newsletter ───────────────────────────────────────────────────────────────

export const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
  gdprConsent: z.boolean().optional(),
})

// ─── Contact Form ─────────────────────────────────────────────────────────────

export const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  subject: z.string().min(3).max(200),
  message: z.string().min(10).max(2000),
})

// ─── Catalog Filter ───────────────────────────────────────────────────────────

export const catalogFilterSchema = z.object({
  city: z.string().optional(),
  tier: z.nativeEnum(PackageTier).optional(),
  durationMin: z.number().optional(),
  durationMax: z.number().optional(),
  groupSize: z.number().int().optional(),
  language: z.string().optional(),
  guideRating: z.number().min(1).max(5).optional(),
  sort: z.enum(['popular', 'rating', 'newest']).optional().default('popular'),
  page: z.number().int().min(1).optional().default(1),
  limit: z.number().int().min(1).max(24).optional().default(12),
})

// ─── Exported Types ───────────────────────────────────────────────────────────

export type SignupInput = z.infer<typeof signupSchema>
export type LoginInput = z.infer<typeof loginSchema>
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>
export type EmergencyContactInput = z.infer<typeof emergencyContactSchema>
export type BookingStep1Input = z.infer<typeof bookingStep1Schema>
export type BookingStep2Input = z.infer<typeof bookingStep2Schema>
export type BookingStep3Input = z.infer<typeof bookingStep3Schema>
export type BookingStep4Input = z.infer<typeof bookingStep4Schema>
export type ReviewInput = z.infer<typeof reviewSchema>
export type NewsletterInput = z.infer<typeof newsletterSchema>
export type ContactInput = z.infer<typeof contactSchema>
export type CatalogFilterInput = z.infer<typeof catalogFilterSchema>

