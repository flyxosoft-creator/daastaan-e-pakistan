'use client';

import React from 'react';
import { PackageTier } from '@dep/shared';
import { Filter, RotateCcw } from 'lucide-react';

export interface FilterState {
  city: string;
  tier: string;
  duration: string;
  groupSize: string;
}

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
}

export function FilterSidebar({ filters, onChange, onReset }: FilterSidebarProps) {
  const handleCityChange = (city: string) => {
    onChange({ ...filters, city });
  };

  const handleTierChange = (tier: string) => {
    onChange({ ...filters, tier });
  };

  const handleDurationChange = (duration: string) => {
    onChange({ ...filters, duration });
  };

  const handleGroupSizeChange = (groupSize: string) => {
    onChange({ ...filters, groupSize });
  };

  return (
    <aside className="bg-white rounded-2xl p-6 border border-[#B99550]/20 shadow-sm space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <div className="flex items-center gap-2 text-[#123C2D] font-bold text-base font-serif">
          <Filter className="w-4 h-4 text-[#B99550]" />
          <span>Filters</span>
        </div>
        <button
          onClick={onReset}
          className="text-xs text-gray-500 hover:text-[#B99550] flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* City Filter */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
          Destination City
        </label>
        <div className="space-y-1.5">
          {[
            { id: '', label: 'All Cities' },
            { id: 'lahore', label: 'Lahore (Walled City)' },
            { id: 'islamabad', label: 'Islamabad (Capital)' },
          ].map((item) => (
            <label
              key={item.id}
              className="flex items-center gap-2.5 text-sm text-gray-700 hover:text-[#123C2D] cursor-pointer"
            >
              <input
                type="radio"
                name="city"
                checked={filters.city === item.id}
                onChange={() => handleCityChange(item.id)}
                className="text-[#123C2D] focus:ring-[#B99550] cursor-pointer"
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Experience Tier */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
          Experience Category
        </label>
        <div className="space-y-1.5">
          {[
            { id: '', label: 'All Categories' },
            { id: PackageTier.CULTURAL, label: 'Cultural Heritage' },
            { id: PackageTier.FOOD, label: 'Food Trail' },
            { id: PackageTier.FAMILY, label: 'Family Adventure' },
            { id: PackageTier.NATURE, label: 'Nature & Scenic' },
          ].map((item) => (
            <label
              key={item.id}
              className="flex items-center gap-2.5 text-sm text-gray-700 hover:text-[#123C2D] cursor-pointer"
            >
              <input
                type="radio"
                name="tier"
                checked={filters.tier === item.id}
                onChange={() => handleTierChange(item.id)}
                className="text-[#123C2D] focus:ring-[#B99550] cursor-pointer"
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Duration */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
          Duration
        </label>
        <select
          value={filters.duration}
          onChange={(e) => handleDurationChange(e.target.value)}
          className="w-full text-sm border border-gray-200 rounded-lg p-2.5 bg-gray-50 text-gray-800 focus:outline-none focus:border-[#B99550]"
        >
          <option value="">Any Duration</option>
          <option value="half-day">Half Day (≤ 4 Hours)</option>
          <option value="full-day">Full Day (5–8 Hours)</option>
          <option value="multi-day">Multi-Day Tours</option>
        </select>
      </div>

      {/* Group Size */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
          Group Size
        </label>
        <select
          value={filters.groupSize}
          onChange={(e) => handleGroupSizeChange(e.target.value)}
          className="w-full text-sm border border-gray-200 rounded-lg p-2.5 bg-gray-50 text-gray-800 focus:outline-none focus:border-[#B99550]"
        >
          <option value="">Any Size</option>
          <option value="solo">Solo / Couple (1–2 guests)</option>
          <option value="small">Small Group (3–6 guests)</option>
          <option value="large">Large Group (7–12 guests)</option>
        </select>
      </div>
    </aside>
  );
}

