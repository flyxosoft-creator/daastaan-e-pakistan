import React from 'react';
import { PackageTier } from '@dep/shared';

interface TierBadgeProps {
  tier: PackageTier | string;
  className?: string;
}

const BADGE_STYLES: Record<string, string> = {
  CULTURAL:  'bg-[#B99550]/20 text-[#B99550] border-[#B99550]/40',
  FOOD:      'bg-amber-500/20 text-amber-300 border-amber-500/40',
  FAMILY:    'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
  NATURE:    'bg-sky-500/20 text-sky-300 border-sky-500/40',
  SPIRITUAL: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
  ADVENTURE: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
  LIFESTYLE: 'bg-pink-400/20 text-pink-300 border-pink-400/40',
  HERITAGE:  'bg-[#B99550]/20 text-[#D4AF6E] border-[#B99550]/40',
  SIGNATURE: 'bg-gradient-to-r from-[#B99550]/30 to-[#D4AF6E]/20 text-[#D4AF6E] border-[#B99550]/60',
  ARTS:      'bg-rose-500/20 text-rose-300 border-rose-500/40',
  SPORTS:    'bg-blue-500/20 text-blue-300 border-blue-500/40',
  CORPORATE: 'bg-slate-500/20 text-slate-300 border-slate-500/40',
};

const BADGE_LABELS: Record<string, string> = {
  CULTURAL:  'Cultural Heritage',
  FOOD:      'Food Trail',
  FAMILY:    'Family Adventure',
  NATURE:    'Nature & Scenic',
  SPIRITUAL: 'Spiritual & Sufi',
  ADVENTURE: 'Adventure Trek',
  LIFESTYLE: 'Lifestyle',
  HERITAGE:  'Heritage',
  SIGNATURE: '✦ Signature',
  ARTS:      'Arts & Crafts',
  SPORTS:    'Sports Tourism',
  CORPORATE: 'Corporate',
};

export function TierBadge({ tier, className = '' }: TierBadgeProps) {
  const key = typeof tier === 'string' ? tier : String(tier);
  const style = BADGE_STYLES[key] ?? 'bg-[#B99550]/20 text-[#B99550] border-[#B99550]/40';
  const label = BADGE_LABELS[key] ?? key;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border backdrop-blur-sm ${style} ${className}`}
    >
      {label}
    </span>
  );
}

