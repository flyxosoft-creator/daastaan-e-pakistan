import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Users, MapPin, ArrowRight } from 'lucide-react';
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
    <div className="group bg-white rounded-2xl overflow-hidden border border-[#B99550]/20 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1">
      {/* Media Container */}
      <div className="relative h-56 w-full overflow-hidden bg-[#123C2D]">
        <img
          src={coverImage}
          alt={pkg.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
          onError={(e) => {
            // Placeholder styled fallback if remote image not loaded yet
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1598890777032-bde835ba27c2?q=80&w=800&auto=format&fit=crop';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Badges on Image */}
        <div className="absolute top-4 left-4">
          <TierBadge tier={pkg.tier} />
        </div>

        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-semibold text-[#123C2D] flex items-center gap-1 shadow-sm">
          <MapPin className="w-3.5 h-3.5 text-[#B99550]" />
          <span>{pkg.city?.name}</span>
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-medium">
          <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-md">
            <Clock className="w-3.5 h-3.5 text-[#B99550]" />
            <span>{durationText}</span>
          </div>
          <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-md">
            <Users className="w-3.5 h-3.5 text-[#B99550]" />
            <span>Up to {pkg.maxParty} guests</span>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="mb-2">
            <StarRating
              rating={pkg.rating || 4.9}
              reviewCount={pkg.reviewCount || 12}
              showNumber
              size="sm"
            />
          </div>

          <h3 className="font-serif text-lg font-bold text-[#123C2D] group-hover:text-[#B99550] transition-colors line-clamp-2 leading-snug">
            {pkg.title}
          </h3>

          {pkg.description && (
            <p className="text-xs text-gray-600 mt-2 line-clamp-2 leading-relaxed">
              {pkg.description}
            </p>
          )}
        </div>

        {/* Action Link (Price deliberately hidden on catalog card per FR-016) */}
        <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-[#123C2D] font-medium tracking-wide">
            Verified Local Guide
          </span>
          <Link
            href={`/package/${pkg.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#123C2D] group-hover:text-[#B99550] group-hover:translate-x-1 transition-all"
          >
            <span>View Details</span>
            <ArrowRight className="w-4 h-4 text-[#B99550]" />
          </Link>
        </div>
      </div>
    </div>
  );
}

