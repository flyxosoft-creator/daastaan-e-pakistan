import React from 'react';
import { PackageTier } from '@dep/shared';

interface TierBadgeProps {
  tier: PackageTier | string;
  className?: string;
}

export function TierBadge({ tier, className = '' }: TierBadgeProps) {
  const getBadgeStyle = () => {
    switch (tier) {
      case 'CULTURAL':
      case PackageTier.CULTURAL:
        return 'bg-[#B99550]/20 text-[#B99550] border-[#B99550]/40';
      case 'FOOD':
      case PackageTier.FOOD:
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'FAMILY':
      case PackageTier.FAMILY:
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'NATURE':
      case PackageTier.NATURE:
        return 'bg-sky-500/20 text-sky-300 border-sky-500/40';
      default:
        return 'bg-[#B99550]/20 text-[#B99550] border-[#B99550]/40';
    }
  };

  const getLabel = () => {
    switch (tier) {
      case 'CULTURAL':
      case PackageTier.CULTURAL:
        return 'Cultural Heritage';
      case 'FOOD':
      case PackageTier.FOOD:
        return 'Food Trail';
      case 'FAMILY':
      case PackageTier.FAMILY:
        return 'Family Adventure';
      case 'NATURE':
      case PackageTier.NATURE:
        return 'Nature & Scenic';
      default:
        return tier;
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border backdrop-blur-sm ${getBadgeStyle()} ${className}`}
    >
      {getLabel()}
    </span>
  );
}

