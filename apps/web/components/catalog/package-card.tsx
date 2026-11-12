import React from 'react';
import Link from 'next/link';
import { Clock, Users, MapPin, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { TierBadge } from '../ui/tier-badge';
import { StarRating } from '../ui/star-rating';

export interface PackageCardData {
  id: string;
  slug: string;
  title: string;
  tier: string;
  city: {
    name: string;
    slug: string;
  };
  durationHours?: number | null;
  durationDays?: number | null;
  minParty: number;
  maxParty: number;
  images: string[];
  rating: number;
  reviewCount: number;
  description?: string;
}

interface PackageCardProps {
  pkg: PackageCardData;
}

export function PackageCard({ pkg }: PackageCardProps) {
  const durationText = pkg.durationDays
    ? `${pkg.durationDays} ${pkg.durationDays === 1 ? 'Day' : 'Days'}`
    : `${pkg.durationHours || 4} Hours`;

  // Fallback image gradient if image missing
  const coverImage = pkg.images?.[0] || '/images/default-tour.jpg';

  return (
    <div className="group relative h-[510px] w-full bg-white rounded-2xl overflow-hidden border border-[#E8DFD0] hover:border-[#B99550]/80 shadow-[0_4px_20px_-4px_rgba(18,60,45,0.06)] hover:shadow-[0_28px_60px_-10px_rgba(18,60,45,0.22),inset_0_0_0_1px_rgba(185,149,80,0.18)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col hover:-translate-y-2 will-change-transform">
      {/* Subtle Top Gold Highlight Border on Hover — 2px for visibility */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#B99550] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

      {/* Media Container - Fixed Uniform Height */}
      <div className="relative h-[224px] shrink-0 w-full overflow-hidden bg-[#123C2D]">
        <img
          src={coverImage}
          alt={pkg.title}
          className="w-full h-full object-cover group-hover:scale-[1.08] transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1598890777032-bde835ba27c2?q=80&w=800&auto=format&fit=crop';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/30" />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 z-10">
          <TierBadge tier={pkg.tier} />
        </div>

        <div className="absolute top-3.5 right-3.5 z-10 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-white/95 flex items-center gap-1.5 border border-white/20 shadow-sm">
          <MapPin className="w-3.5 h-3.5 text-[#E5B558]" />
          <span>{pkg.city?.name}</span>
        </div>

        {/* Bottom Media Badges */}
        <div className="absolute bottom-3 left-3.5 right-3.5 z-10 flex items-center justify-between text-white text-[11px] font-medium">
          <div className="flex items-center gap-1.5 bg-black/55 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/15">
            <Clock className="w-3.5 h-3.5 text-[#E5B558]" />
            <span>{durationText}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-black/55 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/15">
            <Users className="w-3.5 h-3.5 text-[#E5B558]" />
            <span>Up to {pkg.maxParty} guests</span>
          </div>
        </div>
      </div>

      {/* Content Container - Fixed Proportions & Typography */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between bg-gradient-to-b from-white via-white to-[#FAF6ED]/50">
        <div>
          <div className="flex items-center justify-between mb-2">
            <StarRating
              rating={pkg.rating || 4.9}
              reviewCount={pkg.reviewCount || 12}
              showNumber
              size="sm"
            />
            {pkg.rating >= 4.9 && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#123C2D] bg-[#123C2D]/8 px-2 py-0.5 rounded-full uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-[#B99550]" />
                Top Rated
              </span>
            )}
          </div>

          <h3 className="font-serif text-[17px] sm:text-[18px] font-bold text-[#123C2D] group-hover:text-[#B99550] transition-colors line-clamp-2 min-h-[3.1rem] leading-snug">
            {pkg.title}
          </h3>

          <p className="text-xs text-gray-600 mt-2 line-clamp-2 min-h-[2.5rem] leading-relaxed">
            {pkg.description || 'Experience Pakistan with vetted local historians and certified storytellers.'}
          </p>
        </div>

        {/* Action Link Footer - Locked at Bottom */}
        <div className="mt-4 pt-4 border-t border-[#E8DFD0]/70 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-[#123C2D] font-medium tracking-wide">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Verified Local Guide</span>
          </div>
          <Link
            href={`/package/${pkg.slug}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#123C2D] group-hover:bg-gradient-to-r group-hover:from-[#B99550] group-hover:to-[#D4AF6E] text-white group-hover:text-[#0A2418] text-xs font-bold transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-sm group-hover:shadow-[0_4px_16px_-2px_rgba(185,149,80,0.5)]"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
