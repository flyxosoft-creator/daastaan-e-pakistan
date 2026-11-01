import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
  reviewCount?: number;
}

export function StarRating({
  rating,
  maxStars = 5,
  size = 'md',
  showNumber = false,
  reviewCount,
}: StarRatingProps) {
  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center text-[#B99550]">
        {Array.from({ length: maxStars }).map((_, index) => {
          const filled = index + 1 <= Math.round(rating);
          return (
            <Star
              key={index}
              className={`${iconSizes[size]} ${
                filled ? 'fill-[#B99550] text-[#B99550]' : 'text-gray-300'
              }`}
            />
          );
        })}
      </div>
      {showNumber && (
        <span className={`font-semibold text-gray-800 ${textSizes[size]}`}>
          {rating.toFixed(1)}
        </span>
      )}
      {reviewCount !== undefined && (
        <span className={`text-gray-500 ${textSizes[size]}`}>
          ({reviewCount})
        </span>
      )}
    </div>
  );
}

