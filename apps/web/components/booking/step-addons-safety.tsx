'use client';

import React from 'react';
import { ShieldCheck, Car, Sparkles, ShoppingBag, Gift, Check, Shield } from 'lucide-react';
import { formatPrice } from '@/lib/currency';

export interface AddOnOption {
  id: string;
  name: string;
  description: string;
  pricePkr: number; // in paisa
  iconType: 'car' | 'makeover' | 'shopping' | 'gift';
}

const DEFAULT_ADDONS: AddOnOption[] = [
  {
    id: 'addon_pickup',
    name: 'Hotel Pickup & Return Transport',
    description: 'Chauffeured air-conditioned private car from and back to any hotel or residence in the city.',
    pricePkr: 250000, // PKR 2,500
    iconType: 'car',
  },
  {
    id: 'addon_makeover',
    name: 'Traditional Attire & Cultural Styling',
    description: 'Authentic Lahori kurta/dupatta styling, local artisan jewelry rental & photo-ready grooming.',
    pricePkr: 400000, // PKR 4,000
    iconType: 'makeover',
  },
  {
    id: 'addon_shopping',
    name: 'Curated Artisan Shopping Concierge',
    description: 'Personal guided navigation through hidden alleys for pashminas, brassware, spices & antique rugs with fair pricing advice.',
    pricePkr: 300000, // PKR 3,000
    iconType: 'shopping',
  },
  {
    id: 'addon_gift',
    name: 'Handcrafted Pakistani Souvenir Gifting Box',
    description: 'Artisanal gift box containing hand-painted pottery, dried fruits, floral teas, and calligraphy keepsake.',
    pricePkr: 350000, // PKR 3,500
    iconType: 'gift',
  },
];

interface StepAddonsSafetyProps {
  selectedAddOnIds: string[];
  onToggleAddOn: (id: string) => void;
  safetyLayerActive: boolean;
  onToggleSafetyLayer: (active: boolean) => void;
  currency: 'PKR' | 'USD' | 'GBP';
}

export function StepAddonsSafety({
  selectedAddOnIds,
  onToggleAddOn,
  safetyLayerActive,
  onToggleSafetyLayer,
  currency,
}: StepAddonsSafetyProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'car':
        return <Car className="w-5 h-5 text-[#B99550]" />;
      case 'makeover':
        return <Sparkles className="w-5 h-5 text-[#B99550]" />;
      case 'shopping':
        return <ShoppingBag className="w-5 h-5 text-[#B99550]" />;
      case 'gift':
        return <Gift className="w-5 h-5 text-[#B99550]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#B99550]" />;
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#123C2D]">
          Step 3: Enhance Your Experience & Safety
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Select optional concierge add-ons and verify your universal safety protections.
        </p>
      </div>

      {/* Universal Safety Layer Feature Banner (FR-068 / FR-069) */}
      <div className="bg-[#123C2D] text-[#F7F3E9] rounded-2xl p-6 border border-[#B99550]/40 shadow-lg space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#B99550] text-[#123C2D] flex items-center justify-center font-bold shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-base sm:text-lg font-bold">
                  Universal Safety & Care Layer
                </h3>
                <span className="text-[10px] font-bold bg-[#B99550] text-[#123C2D] px-2 py-0.5 rounded-full uppercase">
                  Included Free
                </span>
              </div>
              <p className="text-xs text-gray-300 mt-0.5">
                Our signature safety protocol included with every booking at no extra charge.
              </p>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={safetyLayerActive}
              onChange={(e) => onToggleSafetyLayer(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#B99550]"></div>
          </label>
        </div>

        {safetyLayerActive ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs border-t border-[#B99550]/20">
            <div className="bg-white/10 p-3 rounded-xl">
              <span className="font-bold text-[#B99550] block">✓ Live Web GPS</span>
              <span className="text-[11px] text-gray-300">
                Encrypted share link sent to your emergency contact.
              </span>
            </div>
            <div className="bg-white/10 p-3 rounded-xl">
              <span className="font-bold text-[#B99550] block">✓ One-Touch SOS</span>
              <span className="text-[11px] text-gray-300">
                Instant SMS alert with exact coordinates to our operations hub.
              </span>
            </div>
            <div className="bg-white/10 p-3 rounded-xl">
              <span className="font-bold text-[#B99550] block">✓ 3-Point Guide Check-In</span>
              <span className="text-[11px] text-gray-300">
                Trip Start, Pickup Done & Drop-off safely tracked.
              </span>
            </div>
          </div>
        ) : (
          <p className="text-xs text-rose-300 pt-1">
            ⚠️ Safety layer is currently disabled. We strongly recommend leaving it enabled for solo & female travellers.
          </p>
        )}
      </div>

      {/* Optional Concierge Add-Ons List */}
      <div className="space-y-4">
        <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
          Optional Concierge Add-Ons
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {DEFAULT_ADDONS.map((addon) => {
            const isSelected = selectedAddOnIds.includes(addon.id);
            return (
              <div
                key={addon.id}
                onClick={() => onToggleAddOn(addon.id)}
                className={`p-5 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#123C2D] bg-[#123C2D]/5 shadow-md'
                    : 'border-gray-200 bg-white hover:border-[#B99550]'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#123C2D]/10 flex items-center justify-center shrink-0">
                      {getIcon(addon.iconType)}
                    </div>

                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        isSelected
                          ? 'border-[#123C2D] bg-[#123C2D] text-white'
                          : 'border-gray-300'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 text-white" />}
                    </div>
                  </div>

                  <h4 className="font-bold text-sm text-[#123C2D] mt-3">
                    {addon.name}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    {addon.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-medium">Add-on Price:</span>
                  <span className="font-serif font-bold text-sm text-[#123C2D]">
                    +{formatPrice(addon.pricePkr, currency)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

