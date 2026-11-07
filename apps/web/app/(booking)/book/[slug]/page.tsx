'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { StepDateGroup } from '@/components/booking/step-date-group';
import { StepGuideSelect, GuideOption } from '@/components/booking/step-guide-select';
import { StepAddonsSafety, AddOnOption } from '@/components/booking/step-addons-safety';
import { StepReviewPayment } from '@/components/booking/step-review-payment';
import { formatPrice } from '@/lib/currency';
import {
  Calendar,
  Clock,
  Users,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  MapPin,
  Lock,
} from 'lucide-react';

const MOCK_GUIDES: GuideOption[] = [
  {
    id: 'guide-01',
    name: 'Tariq Mehmood',
    gender: 'MALE',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
    rating: 4.9,
    reviewCount: 47,
    specialities: ['Walled City', 'Mughal Architecture', 'Street Food'],
    languages: ['Urdu', 'English', 'Punjabi'],
    bio: 'Third-generation Lahorite with 12 years of guiding through Androon Lahore.',
    isVerified: true,
  },
  {
    id: 'guide-02',
    name: 'Ayesha Riaz',
    gender: 'FEMALE',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
    rating: 4.9,
    reviewCount: 38,
    specialities: ['Women\'s Heritage', 'Crafts & Bazaars', 'Food Trail'],
    languages: ['Urdu', 'English'],
    bio: 'Cultural historian specializing in female solo travellers and local crafts.',
    isVerified: true,
  },
  {
    id: 'guide-03',
    name: 'Bilal Hussain',
    gender: 'MALE',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop',
    rating: 4.8,
    reviewCount: 29,
    specialities: ['Hiking', 'Margalla Hills', 'Flora & Fauna'],
    languages: ['Urdu', 'English'],
    bio: 'Certified trekking guide and Islamabad native leading trails since 2015.',
    isVerified: true,
  },
];

export default function BookTourPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resolvedParams = use(params);

  // Initial parameters from URL query param if present
  const initialParty = parseInt(searchParams?.get('partySize') || '2', 10);
  const paramStartDate = searchParams?.get('startDate');
  const paramEndDate = searchParams?.get('endDate');
  const paramCurrency = (searchParams?.get('currency') as 'USD' | 'GBP') || 'USD';

  const defaultTomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  // Stepper State (1 to 4)
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1 State: Dates & Group
  const [startDate, setStartDate] = useState(paramStartDate || defaultTomorrow);
  const [endDate, setEndDate] = useState(paramEndDate || paramStartDate || defaultTomorrow);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('09:00 AM');
  const [partySize, setPartySize] = useState(initialParty || 2);

  const calcDays = () => {
    if (!startDate || !endDate) return 1;
    const s = new Date(startDate);
    const e = new Date(endDate);
    const diff = Math.round((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    return Math.max(1, diff);
  };
  const totalDays = calcDays();

  // Step 2 State: Guide Selection
  const [selectedGuideId, setSelectedGuideId] = useState<string | null>(null);
  const [genderPreference, setGenderPreference] = useState<'ANY' | 'FEMALE' | 'MALE'>('ANY');

  // Step 3 State: Add-ons & Universal Safety
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([]);
  const [safetyLayerActive, setSafetyLayerActive] = useState(true);

  // Step 4 State: Emergency Contact, Pickup, Promo & Terms
  const [emergencyContact, setEmergencyContact] = useState({
    name: '',
    relationship: '',
    phone: '',
    email: '',
  });
  const [pickupLocation, setPickupLocation] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscountPkr, setPromoDiscountPkr] = useState(0);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [currency, setCurrency] = useState<'USD' | 'GBP'>(paramCurrency === 'GBP' ? 'GBP' : 'USD');
  const [loading, setLoading] = useState(false);

  // Package Data (Walled City Heritage Walk default)
  const packageTitle = 'Walled City Heritage Walk — 2,000 Years of Lahore';
  const cityName = 'Lahore';
  const basePricePkr = 500000; // PKR 5,000 in paisa
  const maxParty = 8;
  const durationText = '4 Hours';

  // Add-ons dictionary
  const ADDONS_MAP: Record<string, { name: string; pricePkr: number }> = {
    addon_pickup: { name: 'Hotel Pickup & Return Transport', pricePkr: 250000 },
    addon_makeover: { name: 'Traditional Attire & Cultural Styling', pricePkr: 400000 },
    addon_shopping: { name: 'Curated Artisan Shopping Concierge', pricePkr: 300000 },
    addon_gift: { name: 'Handcrafted Pakistani Souvenir Gifting Box', pricePkr: 350000 },
  };

  const selectedAddOns = selectedAddOnIds.map((id) => ({
    id,
    name: ADDONS_MAP[id]?.name || id,
    pricePkr: ADDONS_MAP[id]?.pricePkr || 0,
  }));

  const hasHotelPickup = selectedAddOnIds.includes('addon_pickup');

  // Financial calculations
  const subtotalPkr =
    basePricePkr * partySize +
    selectedAddOns.reduce((acc, a) => acc + a.pricePkr, 0);

  const totalPkr = Math.max(0, subtotalPkr - promoDiscountPkr);

  // Toggle Add-on
  const handleToggleAddOn = (id: string) => {
    setSelectedAddOnIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Promo Code Validation
  const handleApplyPromoCode = (code: string) => {
    setPromoCode(code);
    if (code === 'DAASTAAN10' || code === 'WELCOME10') {
      setPromoDiscountPkr(Math.round(subtotalPkr * 0.1)); // 10% off
    } else if (code === 'EXPLORE500') {
      setPromoDiscountPkr(50000); // PKR 500 flat off
    } else {
      alert('Invalid promo code. Try "DAASTAAN10" for 10% off.');
      setPromoDiscountPkr(0);
    }
  };

  // Step Progression Validator
  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!startDate || !endDate) {
        alert('Please choose tour start and end dates.');
        return;
      }
    }
    if (currentStep === 3) {
      // Nothing strictly blocking
    }
    setCurrentStep((prev) => Math.min(4, prev + 1));
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  // Complete Booking
  const handleCompleteBooking = () => {
    if (safetyLayerActive && (!emergencyContact.name || !emergencyContact.phone)) {
      alert('Please fill out your Emergency Contact name and phone number for Universal Safety.');
      return;
    }
    if (hasHotelPickup && !pickupLocation.trim()) {
      alert('Please provide your hotel pickup address.');
      return;
    }
    if (!acceptTerms) {
      alert('Please accept the Terms of Service to complete your booking.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      // Route to success page with booking ID
      router.push(`/booking/BK-1090/success?city=${cityName}&party=${partySize}`);
    }, 1200);
  };

  const assignedGuideObj = MOCK_GUIDES.find((g) => g.id === selectedGuideId);
  const guideDisplayName = assignedGuideObj
    ? assignedGuideObj.name
    : 'Best Available Verified Specialist';

  return (
    <div className="min-h-screen bg-[#F7F3E9] flex flex-col font-sans">
      <Header />

      {/* Booking Header & Stepper Indicator */}
      <section className="bg-[#123C2D] text-[#F7F3E9] pt-28 pb-8 px-4 border-b border-[#B99550]/20">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs uppercase font-bold text-[#B99550] tracking-wider">
                Experience Reservation Checkout
              </span>
              <h1 className="font-serif text-xl sm:text-3xl font-bold tracking-tight">
                {packageTitle}
              </h1>
            </div>

            <span className="text-xs text-gray-300 flex items-center gap-1.5 self-start sm:self-auto">
              <Lock className="w-3.5 h-3.5 text-[#B99550]" />
              <span>Encrypted Secure Checkout</span>
            </span>
          </div>

          {/* Stepper Progress Bar */}
          <div className="grid grid-cols-4 gap-2 pt-2">
            {[
              { num: 1, label: 'Date & Guests' },
              { num: 2, label: 'Guide Choice' },
              { num: 3, label: 'Add-Ons & Safety' },
              { num: 4, label: 'Review & Pay' },
            ].map((s) => {
              const isPast = currentStep > s.num;
              const isCurrent = currentStep === s.num;

              return (
                <div key={s.num} className="space-y-1.5">
                  <div
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      isPast || isCurrent ? 'bg-[#B99550]' : 'bg-white/20'
                    }`}
                  />
                  <div className="flex items-center gap-1.5 text-xs">
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        isCurrent
                          ? 'bg-[#B99550] text-[#123C2D]'
                          : isPast
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white/10 text-gray-400'
                      }`}
                    >
                      {isPast ? '✓' : s.num}
                    </span>
                    <span
                      className={`hidden sm:inline font-semibold text-[11px] ${
                        isCurrent ? 'text-[#B99550]' : 'text-gray-300'
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Stepper Body & Live Summary Sidebar */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left 2 Columns: Active Step Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#B99550]/20 shadow-sm min-h-[480px] flex flex-col justify-between">
              <div>
                {currentStep === 1 && (
                  <StepDateGroup
                    startDate={startDate}
                    onSelectStartDate={setStartDate}
                    endDate={endDate}
                    onSelectEndDate={setEndDate}
                    selectedTimeSlot={selectedTimeSlot}
                    onSelectTimeSlot={setSelectedTimeSlot}
                    partySize={partySize}
                    onSelectPartySize={setPartySize}
                    maxParty={maxParty}
                    durationText={durationText}
                  />
                )}

                {currentStep === 2 && (
                  <StepGuideSelect
                    guides={MOCK_GUIDES}
                    selectedGuideId={selectedGuideId}
                    onSelectGuide={setSelectedGuideId}
                    genderPreference={genderPreference}
                    onChangeGenderPreference={setGenderPreference}
                  />
                )}

                {currentStep === 3 && (
                  <StepAddonsSafety
                    selectedAddOnIds={selectedAddOnIds}
                    onToggleAddOn={handleToggleAddOn}
                    safetyLayerActive={safetyLayerActive}
                    onToggleSafetyLayer={setSafetyLayerActive}
                    currency={currency}
                  />
                )}

                {currentStep === 4 && (
                  <StepReviewPayment
                    packageTitle={packageTitle}
                    cityName={cityName}
                    selectedDate={startDate === endDate ? startDate : `${startDate} to ${endDate}`}
                    startDate={startDate}
                    endDate={endDate}
                    selectedTimeSlot={selectedTimeSlot}
                    partySize={partySize}
                    guideName={guideDisplayName}
                    basePricePkr={basePricePkr}
                    selectedAddOns={selectedAddOns}
                    safetyLayerActive={safetyLayerActive}
                    emergencyContact={emergencyContact}
                    onChangeEmergencyContact={setEmergencyContact}
                    pickupLocation={pickupLocation}
                    onChangePickupLocation={setPickupLocation}
                    specialRequests={specialRequests}
                    onChangeSpecialRequests={setSpecialRequests}
                    promoCode={promoCode}
                    onApplyPromoCode={handleApplyPromoCode}
                    promoDiscountPkr={promoDiscountPkr}
                    hasHotelPickup={hasHotelPickup}
                    acceptTerms={acceptTerms}
                    onToggleAcceptTerms={setAcceptTerms}
                    currency={currency}
                    onChangeCurrency={setCurrency}
                    onCompleteBooking={handleCompleteBooking}
                    loading={loading}
                  />
                )}
              </div>

              {/* Navigation Buttons Row */}
              <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 text-xs font-bold hover:bg-gray-50 transition"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Previous Step</span>
                  </button>
                ) : (
                  <Link
                    href={`/package/${resolvedParams.slug}`}
                    className="text-xs font-semibold text-gray-500 hover:text-[#123C2D]"
                  >
                    ← Return to Tour Details
                  </Link>
                )}

                {currentStep < 4 && (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#123C2D] hover:bg-[#1a5540] text-[#F7F3E9] text-xs font-bold shadow-md transition"
                  >
                    <span>Continue to Step {currentStep + 1}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#B99550]" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Live Booking Summary Sidebar (Persistent across all steps) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl p-6 border-2 border-[#B99550]/40 shadow-xl space-y-6">
              <h3 className="font-serif text-lg font-bold text-[#123C2D] pb-3 border-b border-gray-100 flex items-center justify-between">
                <span>Trip Summary</span>
                <span className="text-xs bg-[#B99550]/20 text-[#123C2D] px-2.5 py-0.5 rounded-full font-sans font-bold">
                  📍 {cityName}
                </span>
              </h3>

              {/* Itinerary Highlights */}
              <div className="space-y-2.5 text-xs text-gray-700">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#B99550]" />
                    <span>Tour Dates:</span>
                  </span>
                  <span className="font-bold text-[#123C2D]">
                    {startDate === endDate ? startDate : `${startDate} → ${endDate}`}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-500 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#B99550]" />
                    <span>Duration:</span>
                  </span>
                  <span className="font-bold text-[#123C2D]">
                    {totalDays === 1 ? '1 Day (Single Day)' : `${totalDays} Days Multi-Day`}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-500 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#B99550]" />
                    <span>Departure Time:</span>
                  </span>
                  <span className="font-bold text-[#123C2D]">{selectedTimeSlot}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-500 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#B99550]" />
                    <span>Party Size:</span>
                  </span>
                  <span className="font-bold text-[#123C2D]">
                    {partySize} {partySize === 1 ? 'Guest' : 'Guests'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-500 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Guide:</span>
                  </span>
                  <span className="font-bold text-[#123C2D] truncate max-w-[150px]">
                    {guideDisplayName}
                  </span>
                </div>
              </div>

              {/* Selected Add-ons Summary */}
              {selectedAddOns.length > 0 && (
                <div className="pt-3 border-t border-gray-100 space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    Selected Concierge Add-Ons:
                  </span>
                  {selectedAddOns.map((addon) => (
                    <div
                      key={addon.id}
                      className="flex items-center justify-between text-xs text-gray-700"
                    >
                      <span className="truncate max-w-[180px]">• {addon.name}</span>
                      <span className="font-medium text-[#123C2D]">
                        +{formatPrice(addon.pricePkr, currency)}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Price Breakdown */}
              <div className="pt-4 border-t border-gray-100 space-y-2 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>
                    Tour Base ({partySize} × {formatPrice(basePricePkr, currency)})
                  </span>
                  <span className="font-semibold text-gray-900">
                    {formatPrice(basePricePkr * partySize, currency)}
                  </span>
                </div>

                {selectedAddOns.length > 0 && (
                  <div className="flex justify-between text-gray-600">
                    <span>Add-ons Total</span>
                    <span className="font-semibold text-gray-900">
                      +{formatPrice(
                        selectedAddOns.reduce((acc, a) => acc + a.pricePkr, 0),
                        currency
                      )}
                    </span>
                  </div>
                )}

                {promoDiscountPkr > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Promo Discount</span>
                    <span>-{formatPrice(promoDiscountPkr, currency)}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-gray-200 flex items-baseline justify-between">
                  <span className="font-bold text-sm text-[#123C2D]">Total Due</span>
                  <span className="font-serif text-2xl font-bold text-[#123C2D]">
                    {formatPrice(totalPkr, currency)}
                  </span>
                </div>
              </div>

              {/* Universal Safety Active Flag */}
              <div
                className={`p-3 rounded-xl border flex items-center gap-2 text-xs ${
                  safetyLayerActive
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : 'bg-gray-50 border-gray-200 text-gray-500'
                }`}
              >
                <ShieldCheck
                  className={`w-4 h-4 ${
                    safetyLayerActive ? 'text-emerald-600' : 'text-gray-400'
                  }`}
                />
                <span className="font-semibold">
                  {safetyLayerActive
                    ? 'Universal Safety & GPS Tracking Active'
                    : 'Safety Layer Disabled'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

