'use client';

import React, { useState } from 'react';
import { ShieldCheck, Star, Sparkles, User, Check, ChevronDown, ChevronUp } from 'lucide-react';

export interface GuideOption {
  id: string;
  name: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  avatarUrl: string;
  rating: number;
  reviewCount: number;
  specialities: string[];
  languages: string[];
  bio: string;
  isVerified: boolean;
}

interface StepGuideSelectProps {
  guides: GuideOption[];
  selectedGuideId: string | null; // null = auto-assign
  onSelectGuide: (guideId: string | null) => void;
  genderPreference: 'ANY' | 'FEMALE' | 'MALE';
  onChangeGenderPreference: (gender: 'ANY' | 'FEMALE' | 'MALE') => void;
}

export function StepGuideSelect({
  guides,
  selectedGuideId,
  onSelectGuide,
  genderPreference,
  onChangeGenderPreference,
}: StepGuideSelectProps) {
  const [showSpecificGuides, setShowSpecificGuides] = useState(selectedGuideId !== null);

  const filteredGuides = guides.filter((g) => {
    if (genderPreference === 'ANY') return true;
    return g.gender === genderPreference;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#123C2D]">
          Step 2: Guide Selection & Preferences
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Every guide on Daastaan is police background cleared and CNIC verified. Choose the best fit or let our system auto-assign.
        </p>
      </div>

      {/* Default Recommended Option */}
      <div
        onClick={() => {
          onSelectGuide(null);
          setShowSpecificGuides(false);
        }}
        className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
          selectedGuideId === null
            ? 'border-[#123C2D] bg-[#123C2D]/5 shadow-md'
            : 'border-gray-200 bg-white hover:border-[#B99550]'
        }`}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#123C2D] text-[#B99550] flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-[#123C2D]">
                  Assign Best Available Verified Guide
                </span>
                <span className="text-[10px] font-bold bg-[#B99550] text-[#123C2D] px-2 py-0.5 rounded-full">
                  Recommended
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Our operations team matches you with the top-rated specialist available for your selected date and time.
              </p>
            </div>
          </div>

          <div
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-1 ${
              selectedGuideId === null
                ? 'border-[#123C2D] bg-[#123C2D] text-white'
                : 'border-gray-300'
            }`}
          >
            {selectedGuideId === null && <Check className="w-3 h-3 text-white" />}
          </div>
        </div>
      </div>

      {/* Collapsible Specific Guide Picker */}
      <div className="space-y-4">
        <button
          type="button"
          onClick={() => setShowSpecificGuides(!showSpecificGuides)}
          className="text-xs font-bold text-[#123C2D] hover:text-[#B99550] flex items-center gap-1.5 transition"
        >
          <span>Or manually choose your preferred guide</span>
          {showSpecificGuides ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>

        {showSpecificGuides && (
          <div className="space-y-4 pt-2">
            {/* Gender Preference Filter (FR-065) */}
            <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-gray-200">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500 mr-2">
                Filter by Guide Gender:
              </span>
              {(['ANY', 'FEMALE', 'MALE'] as const).map((pref) => (
                <button
                  key={pref}
                  type="button"
                  onClick={() => onChangeGenderPreference(pref)}
                  className={`px-3 py-1 text-xs rounded-lg font-semibold transition ${
                    genderPreference === pref
                      ? 'bg-[#123C2D] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {pref === 'ANY' ? 'Any Gender' : pref === 'FEMALE' ? 'Female Guides Only' : 'Male Guides Only'}
                </button>
              ))}
            </div>

            {/* Guides List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredGuides.map((g) => {
                const isSelected = selectedGuideId === g.id;
                return (
                  <div
                    key={g.id}
                    onClick={() => onSelectGuide(g.id)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#123C2D] bg-[#123C2D]/5 shadow-md'
                        : 'border-gray-200 bg-white hover:border-[#B99550]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={g.avatarUrl}
                        alt={g.name}
                        className="w-14 h-14 rounded-full object-cover border border-[#B99550] shrink-0"
                      />
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-sm text-[#123C2D]">
                            {g.name}
                          </h4>
                          <div
                            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                              isSelected
                                ? 'border-[#123C2D] bg-[#123C2D] text-white'
                                : 'border-gray-300'
                            }`}
                          >
                            {isSelected && <Check className="w-2.5 h-2.5 text-white" />}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-amber-600 font-bold flex items-center gap-0.5">
                            ★ {g.rating.toFixed(1)}
                          </span>
                          <span className="text-gray-400">({g.reviewCount} reviews)</span>
                          <span className="text-emerald-700 font-semibold flex items-center gap-0.5 text-[10px]">
                            <ShieldCheck className="w-3 h-3" />
                            Verified
                          </span>
                        </div>

                        <p className="text-[11px] text-gray-600 line-clamp-2 mt-1">
                          {g.bio}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
                      <span>Speaks: {g.languages.join(', ')}</span>
                      <span className="font-semibold text-[#123C2D]">{g.gender}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

