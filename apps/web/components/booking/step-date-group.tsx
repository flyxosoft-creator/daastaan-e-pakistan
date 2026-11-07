'use client';

import React from 'react';
import { Calendar as CalendarIcon, Clock, Users, Check, AlertCircle } from 'lucide-react';

interface StepDateGroupProps {
  startDate: string;
  onSelectStartDate: (date: string) => void;
  endDate: string;
  onSelectEndDate: (date: string) => void;
  selectedTimeSlot: string;
  onSelectTimeSlot: (slot: string) => void;
  partySize: number;
  onSelectPartySize: (size: number) => void;
  maxParty: number;
  durationText?: string;
  isMultiDay?: boolean;
}

export function StepDateGroup({
  startDate,
  onSelectStartDate,
  endDate,
  onSelectEndDate,
  selectedTimeSlot,
  onSelectTimeSlot,
  partySize,
  onSelectPartySize,
  maxParty,
  durationText,
  isMultiDay = false,
}: StepDateGroupProps) {
  // Generate dates for the next 14 days for quick selection
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

  const calcDays = () => {
    if (!startDate || !endDate) return 1;
    const s = new Date(startDate);
    const e = new Date(endDate);
    const diff = Math.round((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    return Math.max(1, diff);
  };

  const calculatedDays = calcDays();
  const isSingleDay = calculatedDays === 1;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#123C2D]">
          Step 1: Choose Tour Dates & Group Size
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Select your tour start and end dates (available for single or multi-day tours) and number of guests.
        </p>
      </div>

      {/* Tour Start & End Date Selection */}
      <div className="space-y-4 bg-white p-5 rounded-xl border border-[#B99550]/30 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
            <CalendarIcon className="w-4 h-4 text-[#B99550]" />
            <span>Tour Schedule & Duration</span>
          </label>
          <span className="inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#123C2D]/10 text-[#123C2D]">
            {isSingleDay ? 'Single Day Tour (1 Day)' : `${calculatedDays} Days Multi-Day Journey`}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Start Date Input */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-700">Tour Start Date</span>
              <span className="text-[10px] text-gray-400">Begins</span>
            </div>
            <input
              type="date"
              value={startDate}
              min={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
              max={new Date(Date.now() + 180 * 86400000).toISOString().split('T')[0]}
              onChange={(e) => {
                const newStart = e.target.value;
                onSelectStartDate(newStart);
                if (new Date(endDate) < new Date(newStart)) {
                  onSelectEndDate(newStart);
                }
              }}
              className="w-full text-xs font-medium border border-gray-300 rounded-lg px-3 py-2 bg-gray-50/50 text-gray-900 focus:outline-none focus:border-[#B99550] focus:bg-white"
            />
          </div>

          {/* End Date Input */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-700">Tour End Date</span>
              <span className="text-[10px] text-gray-400">Concludes</span>
            </div>
            <input
              type="date"
              value={endDate}
              min={startDate || new Date(Date.now() + 86400000).toISOString().split('T')[0]}
              max={new Date(Date.now() + 200 * 86400000).toISOString().split('T')[0]}
              onChange={(e) => {
                const newEnd = e.target.value;
                if (new Date(newEnd) >= new Date(startDate)) {
                  onSelectEndDate(newEnd);
                }
              }}
              className="w-full text-xs font-medium border border-gray-300 rounded-lg px-3 py-2 bg-gray-50/50 text-gray-900 focus:outline-none focus:border-[#B99550] focus:bg-white"
            />
          </div>
        </div>

        {/* Quick Date Shortcuts for Start Date */}
        <div className="pt-2">
          <span className="text-[11px] font-semibold text-gray-500 block mb-2">
            Quick Select Start Date (Upcoming):
          </span>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {dateOptions.map((item) => {
              const isSelected = startDate === item.iso;
              return (
                <button
                  key={item.iso}
                  type="button"
                  onClick={() => {
                    onSelectStartDate(item.iso);
                    if (isSingleDay || new Date(endDate) < new Date(item.iso)) {
                      onSelectEndDate(item.iso);
                    }
                  }}
                  className={`flex flex-col items-center justify-center min-w-[62px] p-2 rounded-xl border text-center transition-all ${
                    isSelected
                      ? 'bg-[#123C2D] text-[#F7F3E9] border-[#123C2D] shadow-sm scale-105'
                      : 'bg-white border-gray-200 text-gray-700 hover:border-[#B99550] hover:bg-gray-50'
                  }`}
                >
                  <span className="text-[9px] uppercase font-bold text-[#B99550]">
                    {item.dayName}
                  </span>
                  <span className="text-base font-bold font-serif my-0.5">
                    {item.dayNum}
                  </span>
                  <span className="text-[9px] text-gray-400">
                    {item.monthName}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Timeslot Selector (Mainly for single-day tours or first day departure) */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-[#B99550]" />
          <span>{isSingleDay ? 'Select Departure Time Window' : 'Day 1 Departure Time'}</span>
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
