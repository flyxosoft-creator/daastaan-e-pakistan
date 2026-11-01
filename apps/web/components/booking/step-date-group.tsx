'use client';

import React from 'react';
import { Calendar as CalendarIcon, Clock, Users, Check, AlertCircle } from 'lucide-react';

interface StepDateGroupProps {
  selectedDate: string;
  onSelectDate: (date: string) => void;
  selectedTimeSlot: string;
  onSelectTimeSlot: (slot: string) => void;
  partySize: number;
  onSelectPartySize: (size: number) => void;
  maxParty: number;
  durationText: string;
  isMultiDay?: boolean;
}

export function StepDateGroup({
  selectedDate,
  onSelectDate,
  selectedTimeSlot,
  onSelectTimeSlot,
  partySize,
  onSelectPartySize,
  maxParty,
  durationText,
  isMultiDay = false,
}: StepDateGroupProps) {
  // Generate dates for the next 14 days for quick selection (plus date input for 180 days)
  const today = new Date();
  const dateOptions = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date();
    d.setDate(today.getDate() + i + 1); // Starting from tomorrow
    const iso = d.toISOString().split('T')[0];
    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
    const monthName = d.toLocaleDateString('en-US', { month: 'short' });
    const dayNum = d.getDate();
    return { iso, dayName, monthName, dayNum };
  });

  const timeSlots = [
    { id: '09:00 AM', label: 'Morning Departure (09:00 AM)', desc: 'Ideal for heritage walks & cooler morning light' },
    { id: '02:00 PM', label: 'Afternoon Departure (02:00 PM)', desc: 'Best for museums & cultural exploration' },
    { id: '06:00 PM', label: 'Evening Food Trail (06:00 PM)', desc: 'Vibrant night bazaars & street food dining' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#123C2D]">
          Step 1: Choose Date, Time & Group Size
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Select when you would like to experience this tour and how many guests are attending.
        </p>
      </div>

      {/* Date Picker Carousel */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
            <CalendarIcon className="w-3.5 h-3.5 text-[#B99550]" />
            <span>Select Date (Next 180 Days)</span>
          </label>
          <span className="text-xs text-gray-500">Duration: {durationText}</span>
        </div>

        {/* Quick Horizontal Date Strip */}
        <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
          {dateOptions.map((item) => {
            const isSelected = selectedDate === item.iso;
            return (
              <button
                key={item.iso}
                type="button"
                onClick={() => onSelectDate(item.iso)}
                className={`flex flex-col items-center justify-center min-w-[70px] p-3 rounded-xl border text-center transition-all ${
                  isSelected
                    ? 'bg-[#123C2D] text-[#F7F3E9] border-[#123C2D] shadow-md scale-105'
                    : 'bg-white border-gray-200 text-gray-700 hover:border-[#B99550] hover:bg-gray-50'
                }`}
              >
                <span className="text-[10px] uppercase font-bold text-[#B99550]">
                  {item.dayName}
                </span>
                <span className="text-lg font-bold font-serif my-0.5">
                  {item.dayNum}
                </span>
                <span className="text-[10px] text-gray-400">
                  {item.monthName}
                </span>
              </button>
            );
          })}
        </div>

        {/* Custom Calendar Date Input for up to 180 days */}
        <div className="flex items-center gap-3 pt-1">
          <span className="text-xs text-gray-500">Or pick specific date:</span>
          <input
            type="date"
            value={selectedDate}
            min={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
            max={new Date(Date.now() + 180 * 86400000).toISOString().split('T')[0]}
            onChange={(e) => onSelectDate(e.target.value)}
            className="text-xs border border-gray-300 rounded-lg px-3 py-1.5 bg-white text-gray-800 focus:outline-none focus:border-[#B99550]"
          />
        </div>
      </div>

      {/* Timeslot Selector (For single-day tours) */}
      {!isMultiDay && (
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#B99550]" />
            <span>Select Departure Time Window</span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {timeSlots.map((slot) => {
              const isSelected = selectedTimeSlot === slot.id;
              return (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => onSelectTimeSlot(slot.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-[#123C2D]/5 border-[#123C2D] ring-2 ring-[#123C2D]'
                      : 'bg-white border-gray-200 hover:border-[#B99550]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#123C2D]">
                      {slot.id}
                    </span>
                    {isSelected && (
                      <span className="w-4 h-4 rounded-full bg-[#123C2D] text-white flex items-center justify-center text-[10px]">
                        ✓
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-gray-500 mt-1 leading-snug">
                    {slot.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Group Size / Party Size Picker */}
      <div className="space-y-3 bg-white p-5 rounded-xl border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#B99550]" />
              <span>Party Size (Guests)</span>
            </label>
            <p className="text-xs text-gray-500 mt-0.5">
              Max capacity {maxParty} guests per booking for an intimate, personal experience.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onSelectPartySize(Math.max(1, partySize - 1))}
              disabled={partySize <= 1}
              className="w-9 h-9 rounded-lg border border-gray-300 flex items-center justify-center font-bold text-gray-700 hover:bg-gray-100 disabled:opacity-40 transition"
            >
              -
            </button>
            <span className="font-serif text-lg font-bold text-[#123C2D] min-w-[28px] text-center">
              {partySize}
            </span>
            <button
              type="button"
              onClick={() => onSelectPartySize(Math.min(maxParty, partySize + 1))}
              disabled={partySize >= maxParty}
              className="w-9 h-9 rounded-lg border border-gray-300 flex items-center justify-center font-bold text-gray-700 hover:bg-gray-100 disabled:opacity-40 transition"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

