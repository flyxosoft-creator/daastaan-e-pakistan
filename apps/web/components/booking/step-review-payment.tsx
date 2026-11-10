'use client';

import React, { useState } from 'react';
import { StripeEmbeddedForm } from './stripe-embedded-form';
import {
  CreditCard,
  ShieldCheck,
  Tag,
  Check,
  AlertCircle,
  MapPin,
  PhoneCall,
  User,
  Heart,
  ArrowRight,
  Lock,
} from 'lucide-react';
import { formatPrice } from '@/lib/currency';

interface EmergencyContactData {
  name: string;
  relationship: string;
  phone: string;
  email: string;
}

interface StepReviewPaymentProps {
  packageTitle: string;
  cityName: string;
  selectedDate: string;
  selectedTimeSlot: string;
  partySize: number;
  guideName: string;
  basePricePkr: number;
  selectedAddOns: Array<{ id: string; name: string; pricePkr: number }>;
  safetyLayerActive: boolean;
  emergencyContact: EmergencyContactData;
  onChangeEmergencyContact: (contact: EmergencyContactData) => void;
  pickupLocation: string;
  onChangePickupLocation: (location: string) => void;
  specialRequests: string;
  onChangeSpecialRequests: (req: string) => void;
  promoCode: string;
  onApplyPromoCode: (code: string) => void;
  promoDiscountPkr: number;
  hasHotelPickup: boolean;
  acceptTerms: boolean;
  onToggleAcceptTerms: (accept: boolean) => void;
  currency: 'USD' | 'GBP';
  onChangeCurrency: (curr: 'USD' | 'GBP') => void;
  startDate?: string;
  endDate?: string;
  onCompleteBooking: () => void;
  loading: boolean;
}

export function StepReviewPayment({
  packageTitle,
  cityName,
  selectedDate,
  selectedTimeSlot,
  partySize,
  guideName,
  basePricePkr,
  selectedAddOns,
  safetyLayerActive,
  emergencyContact,
  onChangeEmergencyContact,
  pickupLocation,
  onChangePickupLocation,
  specialRequests,
  onChangeSpecialRequests,
  promoCode,
  onApplyPromoCode,
  promoDiscountPkr,
  hasHotelPickup,
  acceptTerms,
  onToggleAcceptTerms,
  currency,
  onChangeCurrency,
  onCompleteBooking,
  loading,
}: StepReviewPaymentProps) {
  const [promoInput, setPromoInput] = useState(promoCode);
  const [selectedGateway, setSelectedGateway] = useState<'SAFEPAY' | 'STRIPE'>('STRIPE');

  const subtotalPkr =
    basePricePkr * partySize +
    selectedAddOns.reduce((acc, a) => acc + a.pricePkr, 0);

  const totalPkr = Math.max(0, subtotalPkr - promoDiscountPkr);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#123C2D]">
          Step 4: Review, Details & Secure Payment
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Review your reservation breakdown, provide safety contact details, and complete payment.
        </p>
      </div>

      {/* Emergency Contact Inline Form (FR-072 - Required when Safety Layer active) */}
      {safetyLayerActive && (
        <div className="bg-white rounded-2xl p-6 border-2 border-[#B99550]/30 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-[#B99550]" />
            <h3 className="font-serif text-base font-bold text-[#123C2D]">
              Nominated Emergency Contact (Required for Universal Safety)
            </h3>
          </div>
          <p className="text-xs text-gray-500">
            We will SMS this contact your live GPS tracking link when the tour begins. Stored with AES-256 encryption.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700">
                Contact Full Name *
              </label>
              <input
                type="text"
                required
                value={emergencyContact.name}
                onChange={(e) =>
                  onChangeEmergencyContact({ ...emergencyContact, name: e.target.value })
                }
                placeholder="e.g. Farhan Tariq"
                className="mt-1 w-full text-xs border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:border-[#B99550]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700">
                Relationship *
              </label>
              <input
                type="text"
                required
                value={emergencyContact.relationship}
                onChange={(e) =>
                  onChangeEmergencyContact({ ...emergencyContact, relationship: e.target.value })
                }
                placeholder="e.g. Spouse, Sibling, Friend"
                className="mt-1 w-full text-xs border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:border-[#B99550]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700">
                WhatsApp / Phone Number *
              </label>
              <input
                type="tel"
                required
                value={emergencyContact.phone}
                onChange={(e) =>
                  onChangeEmergencyContact({ ...emergencyContact, phone: e.target.value })
                }
                placeholder="+92 300 1234567"
                className="mt-1 w-full text-xs border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:border-[#B99550]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={emergencyContact.email}
                onChange={(e) =>
                  onChangeEmergencyContact({ ...emergencyContact, email: e.target.value })
                }
                placeholder="emergency.contact@example.com"
                className="mt-1 w-full text-xs border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:border-[#B99550]"
              />
            </div>
          </div>
        </div>
      )}

      {/* Hotel Pickup Location (FR-073 - Required if Hotel Pickup selected) */}
      {hasHotelPickup && (
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#123C2D] flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#B99550]" />
            <span>Hotel Pickup & Drop-Off Address *</span>
          </label>
          <input
            type="text"
            required
            value={pickupLocation}
            onChange={(e) => onChangePickupLocation(e.target.value)}
            placeholder="e.g. Pearl Continental Hotel, Mall Road, Lahore"
            className="w-full text-xs border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:border-[#B99550]"
          />
        </div>
      )}

      {/* Special Dietary / Travel Requests (FR-074) */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
          Special Requests or Dietary Requirements (Optional)
        </label>
        <textarea
          rows={2}
          maxLength={500}
          value={specialRequests}
          onChange={(e) => onChangeSpecialRequests(e.target.value)}
          placeholder="Mention dietary preferences (e.g. vegetarian, halal only), mobility needs, or anniversary/birthday requests..."
          className="w-full text-xs border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:border-[#B99550]"
        />
        <div className="text-[10px] text-gray-400 text-right">
          {specialRequests.length}/500
        </div>
      </div>

      {/* Promo Code Input (FR-075) */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-3">
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
          <Tag className="w-3.5 h-3.5 text-[#B99550]" />
          <span>Have a Promo or Referral Code?</span>
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={promoInput}
            onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
            placeholder="e.g. DAASTAAN10"
            className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2 uppercase font-mono tracking-wider focus:outline-none focus:border-[#B99550]"
          />
          <button
            type="button"
            onClick={() => onApplyPromoCode(promoInput)}
            className="px-4 py-2 bg-[#123C2D] text-white text-xs font-bold rounded-lg hover:bg-[#1a5540] transition whitespace-nowrap"
          >
            Apply Code
          </button>
        </div>
        {promoDiscountPkr > 0 && (
          <div className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
            <Check className="w-3.5 h-3.5" />
            <span>Code applied: Saved {formatPrice(promoDiscountPkr, currency)}!</span>
          </div>
        )}
      </div>

      {/* Payment Gateway Routing Selection (FR-081 & FR-082) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
            <CreditCard className="w-3.5 h-3.5 text-[#B99550]" />
            <span>Select Payment Method</span>
          </label>

          {/* Currency Switcher (USD and GBP ONLY) */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-gray-500 font-semibold">Currency:</span>
            <div className="inline-flex rounded-lg border border-gray-200 p-0.5 bg-gray-50">
              <button
                type="button"
                onClick={() => onChangeCurrency('USD')}
                className={`px-2.5 py-1 text-xs font-bold rounded-md transition ${
                  currency === 'USD'
                    ? 'bg-[#123C2D] text-white shadow-xs'
                    : 'text-gray-600 hover:text-[#123C2D]'
                }`}
              >
                USD ($)
              </button>
              <button
                type="button"
                onClick={() => onChangeCurrency('GBP')}
                className={`px-2.5 py-1 text-xs font-bold rounded-md transition ${
                  currency === 'GBP'
                    ? 'bg-[#123C2D] text-white shadow-xs'
                    : 'text-gray-600 hover:text-[#123C2D]'
                }`}
              >
                GBP (£)
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Safepay for Local PKR */}
          <div
            onClick={() => setSelectedGateway('SAFEPAY')}
            className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
              selectedGateway === 'SAFEPAY'
                ? 'border-[#123C2D] bg-[#123C2D]/5 shadow-md'
                : 'border-gray-200 bg-white hover:border-[#B99550]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-[#123C2D]">
                Safepay (Pakistan Local)
              </span>
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  selectedGateway === 'SAFEPAY'
                    ? 'border-[#123C2D] bg-[#123C2D] text-white'
                    : 'border-gray-300'
                }`}
              >
                {selectedGateway === 'SAFEPAY' && <Check className="w-2.5 h-2.5 text-white" />}
              </div>
            </div>
            <p className="text-[11px] text-gray-500 mt-1 leading-snug">
              JazzCash, Easypaisa, Pakistani Visa/Mastercard Debit/Credit & 1Link transfer.
            </p>
          </div>

          {/* Stripe for International Cards */}
          <div
            onClick={() => setSelectedGateway('STRIPE')}
            className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
              selectedGateway === 'STRIPE'
                ? 'border-[#123C2D] bg-[#123C2D]/5 shadow-md'
                : 'border-gray-200 bg-white hover:border-[#B99550]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-[#123C2D]">
                Stripe (International Cards)
              </span>
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  selectedGateway === 'STRIPE'
                    ? 'border-[#123C2D] bg-[#123C2D] text-white'
                    : 'border-gray-300'
                }`}
              >
                {selectedGateway === 'STRIPE' && <Check className="w-2.5 h-2.5 text-white" />}
              </div>
            </div>
            <p className="text-[11px] text-gray-500 mt-1 leading-snug">
              Instant 3D-Secure checkout in USD/GBP for overseas visitors & diaspora travellers.
            </p>
          </div>
        </div>

        {/* Stripe Elements / Embedded Form Container */}
        {selectedGateway === 'STRIPE' && (
          <div className="p-5 rounded-2xl bg-white border border-[#B99550]/40 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#B99550]" />
                <span>Secure Stripe Checkout (Dahlia SDK)</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                Stripe 3D-Secure
              </span>
            </div>

            {/* Embedded Form Component (Synchronized with exact trip total & currency) */}
            <StripeEmbeddedForm
              key={`${currency}-${totalPkr}-${partySize}`}
              totalAmountPaisa={totalPkr}
              currency={currency}
              packageTitle={packageTitle}
              partySize={partySize}
            />
          </div>
        )}
      </div>

      {/* Mandatory Terms & Conditions (FR-076) */}
      <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            required
            checked={acceptTerms}
            onChange={(e) => onToggleAcceptTerms(e.target.checked)}
            className="rounded text-[#123C2D] focus:ring-[#B99550] mt-0.5"
          />
          <span className="text-xs text-gray-700 leading-relaxed">
            I agree to the Daastaan-e-Pakistan Terms of Service, Cancellation Policy (100% refund up to 48 hours before tour start), and Code of Conduct.
          </span>
        </label>
      </div>

      {/* Final Submit Button */}
      {selectedGateway === 'SAFEPAY' ? (
        <button
          type="button"
          disabled={loading || !acceptTerms}
          onClick={onCompleteBooking}
          className="w-full py-4 px-6 bg-[#B99550] hover:bg-[#c9a65f] text-[#123C2D] font-bold text-base rounded-2xl flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transition-all disabled:opacity-50"
        >
          <span>
            {loading
              ? 'Processing Secure Reservation...'
              : `Confirm & Pay via Safepay (${formatPrice(totalPkr, currency)})`}
          </span>
          <ArrowRight className="w-5 h-5" />
        </button>
      ) : (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-1">
          <div className="text-xs font-bold text-emerald-900 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Complete Card Checkout via Stripe Form Above ↑</span>
          </div>
          <p className="text-[11px] text-emerald-800">
            Submit your payment directly inside the secure 256-bit encrypted Stripe container above.
          </p>
        </div>
      )}

      <div className="text-center text-xs text-gray-500 flex items-center justify-center gap-2">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span>SSL 256-bit encrypted checkout • Zero deposit fee</span>
      </div>
    </div>
  );
}

