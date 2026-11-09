'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  Image as ImageIcon,
  Compass,
  MapPin,
  Calendar,
  CheckCircle,
  Clock,
  Sparkles,
  HelpCircle,
} from 'lucide-react';

interface ItineraryItem {
  id: string;
  timeSlot: string;
  title: string;
  description: string;
}

export default function NewPackagePage() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [city, setCity] = useState('Lahore');
  const [tier, setTier] = useState('CULTURAL');
  const [durationUnit, setDurationUnit] = useState<'HOURS' | 'DAYS'>('HOURS');
  const [durationValue, setDurationValue] = useState(4);
  const [basePricePkr, setBasePricePkr] = useState(5000);
  const [minParty, setMinParty] = useState(1);
  const [maxParty, setMaxParty] = useState(8);
  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1598890777032-bde835ba27c2?q=80&w=800&auto=format&fit=crop');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'DRAFT' | 'ACTIVE'>('ACTIVE');

  // Interactive Itinerary stops
  const [itinerary, setItinerary] = useState<ItineraryItem[]>([
    {
      id: '1',
      timeSlot: '09:00 AM',
      title: 'Delhi Gate Rendezvous & Shahi Hammam',
      description: 'Meet certified historian at Delhi Gate. Walk through restored 17th-century Mughal royal baths.',
    },
    {
      id: '2',
      timeSlot: '11:00 AM',
      title: 'Wazir Khan Mosque Frescoes & Minarets',
      description: 'Witness intricate Kashikari tile-work, Persian calligraphy, and vibrant living spice bazaars.',
    },
  ]);

  // Inclusions & Exclusions
  const [includedList, setIncludedList] = useState<string[]>([
    'Licensed Department of Tourist Services (DTS) Guide',
    'Monument & Haveli Entrance Fees',
    'Universal Safety Live Web GPS Tracking',
    'Bottled Water & Traditional Welcome Chai',
  ]);
  const [excludedList, setExcludedList] = useState<string[]>([
    'Personal shopping & artisan souvenirs',
    'Guide gratuities / tipping',
  ]);

  const [newIncluded, setNewIncluded] = useState('');
  const [newExcluded, setNewExcluded] = useState('');

  // Auto-generate slug from title
  const handleTitleChange = (val: string) => {
    setTitle(val);
    const generatedSlug = val
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');
    setSlug(generatedSlug);
  };

  const handleAddStop = () => {
    setItinerary((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        timeSlot: '12:00 PM',
        title: 'New Itinerary Highlight',
        description: 'Describe the cultural encounter, architectural stop, or scenic view.',
      },
    ]);
  };

  const handleRemoveStop = (id: string) => {
    setItinerary((prev) => prev.filter((item) => item.id !== id));
  };

  const handleItineraryChange = (id: string, field: keyof ItineraryItem, val: string) => {
    setItinerary((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: val } : item)),
    );
  };

  const handleAddIncluded = () => {
    if (newIncluded.trim()) {
      setIncludedList((prev) => [...prev, newIncluded.trim()]);
      setNewIncluded('');
    }
  };

  const handleAddExcluded = () => {
    if (newExcluded.trim()) {
      setExcludedList((prev) => [...prev, newExcluded.trim()]);
      setNewExcluded('');
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Experience Package "${title || 'Untitled'}" saved successfully as ${status}!`);
    router.push('/packages');
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <Link
            href="/packages"
            className="p-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition text-gray-700"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="font-serif text-2xl font-bold text-[#123C2D]">
              Create New Experience Package
            </h1>
            <p className="text-xs text-gray-500">
              Formulate itineraries, configure pricing, and assign destination tiers
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
            className="text-xs font-bold border border-gray-300 rounded-xl px-3 py-2 bg-white text-[#123C2D] focus:outline-none focus:border-[#B99550]"
          >
            <option value="ACTIVE">Publish (Live)</option>
            <option value="DRAFT">Save as Draft</option>
          </select>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2 bg-[#123C2D] text-[#FAF6ED] text-xs font-bold rounded-xl hover:bg-[#1a5540] transition shadow-md"
          >
            <Save className="w-4 h-4 text-[#B99550]" />
            <span>Save Package</span>
          </button>
        </div>
      </div>

      {/* 1. Basic Information */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
          <Compass className="w-5 h-5 text-[#B99550]" />
          <h2 className="font-serif text-lg font-bold text-[#123C2D]">
            1. Core Package Details
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2 space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
              Experience Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. Walled City Heritage Walk — 2,000 Years of Living Lahore"
              className="w-full text-xs font-medium border border-gray-300 rounded-xl px-3 py-2.5 bg-gray-50/50 focus:bg-white focus:outline-none focus:border-[#B99550]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
              URL Slug *
            </label>
            <input
              type="text"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="e.g. walled-city-heritage-walk"
              className="w-full text-xs font-mono border border-gray-300 rounded-xl px-3 py-2.5 bg-gray-50/50 focus:bg-white focus:outline-none focus:border-[#B99550]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                Destination City *
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full text-xs font-medium border border-gray-300 rounded-xl px-3 py-2.5 bg-gray-50/50 focus:bg-white focus:outline-none focus:border-[#B99550]"
              >
                <option value="Lahore">Lahore</option>
                <option value="Northern Pakistan">Northern Pakistan</option>
                <option value="Islamabad">Islamabad</option>
                <option value="Karachi">Karachi</option>
                <option value="Peshawar">Peshawar</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                Category Tier *
              </label>
              <select
                value={tier}
                onChange={(e) => setTier(e.target.value)}
                className="w-full text-xs font-medium border border-gray-300 rounded-xl px-3 py-2.5 bg-gray-50/50 focus:bg-white focus:outline-none focus:border-[#B99550]"
              >
                <option value="CULTURAL">Cultural Heritage</option>
                <option value="FOOD">Food & Culinary</option>
                <option value="NATURE">Nature & Hiking</option>
                <option value="FAMILY">Family & Leisure</option>
              </select>
            </div>
          </div>

          <div className="sm:col-span-2 space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
              Editorial Description & Story Summary
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a vivid description of the sights, scents, stories, and cultural connections..."
              className="w-full text-xs border border-gray-300 rounded-xl p-3 bg-gray-50/50 focus:bg-white focus:outline-none focus:border-[#B99550]"
            />
          </div>
        </div>
      </div>

      {/* 2. Schedule, Group Size & Pricing */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
          <Clock className="w-5 h-5 text-[#B99550]" />
          <h2 className="font-serif text-lg font-bold text-[#123C2D]">
            2. Schedule, Capacity & Pricing
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
              Duration Format
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setDurationUnit('HOURS')}
                className={`py-2 text-xs font-bold rounded-lg border transition ${
                  durationUnit === 'HOURS'
                    ? 'bg-[#123C2D] text-white border-[#123C2D]'
                    : 'bg-gray-50 text-gray-700 border-gray-200'
                }`}
              >
                Hours (Single Day)
              </button>
              <button
                type="button"
                onClick={() => setDurationUnit('DAYS')}
                className={`py-2 text-xs font-bold rounded-lg border transition ${
                  durationUnit === 'DAYS'
                    ? 'bg-[#123C2D] text-white border-[#123C2D]'
                    : 'bg-gray-50 text-gray-700 border-gray-200'
                }`}
              >
                Days (Multi-Day)
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
              Duration Amount ({durationUnit.toLowerCase()})
            </label>
            <input
              type="number"
              min={1}
              value={durationValue}
              onChange={(e) => setDurationValue(parseInt(e.target.value) || 1)}
              className="w-full text-xs font-medium border border-gray-300 rounded-xl px-3 py-2.5 bg-gray-50/50 focus:bg-white focus:outline-none focus:border-[#B99550]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
              Base Price (PKR)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-xs text-gray-400 font-bold">₨</span>
              <input
                type="number"
                min={1000}
                step={500}
                value={basePricePkr}
                onChange={(e) => setBasePricePkr(parseInt(e.target.value) || 0)}
                className="w-full pl-8 pr-3 py-2.5 text-xs font-bold text-gray-900 border border-gray-300 rounded-xl bg-gray-50/50 focus:bg-white focus:outline-none focus:border-[#B99550]"
              />
            </div>
            <div className="text-[10px] text-gray-400 pt-0.5">
              ≈ ${(basePricePkr / 280).toFixed(2)} USD • £{(basePricePkr / 355).toFixed(2)} GBP
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
              Min Guests
            </label>
            <input
              type="number"
              min={1}
              value={minParty}
              onChange={(e) => setMinParty(parseInt(e.target.value) || 1)}
              className="w-full text-xs font-medium border border-gray-300 rounded-xl px-3 py-2.5 bg-gray-50/50 focus:bg-white focus:outline-none focus:border-[#B99550]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
              Max Guests
            </label>
            <input
              type="number"
              min={1}
              value={maxParty}
              onChange={(e) => setMaxParty(parseInt(e.target.value) || 1)}
              className="w-full text-xs font-medium border border-gray-300 rounded-xl px-3 py-2.5 bg-gray-50/50 focus:bg-white focus:outline-none focus:border-[#B99550]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
              Cover Image URL
            </label>
            <input
              type="url"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="https://..."
              className="w-full text-xs border border-gray-300 rounded-xl px-3 py-2.5 bg-gray-50/50 focus:bg-white focus:outline-none focus:border-[#B99550]"
            />
          </div>
        </div>
      </div>

      {/* 3. Interactive Itinerary Builder */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#B99550]" />
            <h2 className="font-serif text-lg font-bold text-[#123C2D]">
              3. Tour Itinerary Highlights
            </h2>
          </div>
          <button
            type="button"
            onClick={handleAddStop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#B99550]/40 bg-[#FAF6ED] text-[#123C2D] text-xs font-bold hover:bg-[#123C2D] hover:text-white transition"
          >
            <Plus className="w-3.5 h-3.5 text-[#B99550]" />
            <span>Add Itinerary Stop</span>
          </button>
        </div>

        <div className="space-y-3">
          {itinerary.map((stop, idx) => (
            <div
              key={stop.id}
              className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-3"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-1">
                  <span className="w-6 h-6 rounded-full bg-[#123C2D] text-white flex items-center justify-center font-bold text-[11px] shrink-0">
                    {idx + 1}
                  </span>
                  <input
                    type="text"
                    value={stop.timeSlot}
                    onChange={(e) => handleItineraryChange(stop.id, 'timeSlot', e.target.value)}
                    placeholder="e.g. 09:30 AM or Day 2"
                    className="w-28 text-xs font-bold border border-gray-300 rounded-lg px-2.5 py-1.5 bg-white text-[#123C2D]"
                  />
                  <input
                    type="text"
                    value={stop.title}
                    onChange={(e) => handleItineraryChange(stop.id, 'title', e.target.value)}
                    placeholder="Stop title or landmark..."
                    className="flex-1 text-xs font-bold border border-gray-300 rounded-lg px-3 py-1.5 bg-white text-gray-900"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveStop(stop.id)}
                  className="text-gray-400 hover:text-rose-600 p-1"
                  title="Remove Stop"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <textarea
                rows={2}
                value={stop.description}
                onChange={(e) => handleItineraryChange(stop.id, 'description', e.target.value)}
                placeholder="What happens at this stop..."
                className="w-full text-xs border border-gray-300 rounded-lg p-2.5 bg-white focus:outline-none focus:border-[#B99550]"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 4. Inclusions & Exclusions */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
          <CheckCircle className="w-5 h-5 text-[#B99550]" />
          <h2 className="font-serif text-lg font-bold text-[#123C2D]">
            4. Inclusions & Exclusions
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Inclusions */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">
              What's Included
            </span>
            <div className="space-y-1.5">
              {includedList.map((item, i) => (
                <div key={i} className="flex items-center justify-between text-xs p-2 rounded-lg bg-emerald-50/60 border border-emerald-100 text-emerald-950">
                  <span>✓ {item}</span>
                  <button
                    type="button"
                    onClick={() => setIncludedList((prev) => prev.filter((_, idx) => idx !== i))}
                    className="text-gray-400 hover:text-rose-600"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2 pt-1">
              <input
                type="text"
                value={newIncluded}
                onChange={(e) => setNewIncluded(e.target.value)}
                placeholder="Add inclusion..."
                className="flex-1 text-xs border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#B99550]"
              />
              <button
                type="button"
                onClick={handleAddIncluded}
                className="px-3 py-1.5 bg-[#123C2D] text-white text-xs font-bold rounded-lg"
              >
                Add
              </button>
            </div>
          </div>

          {/* Exclusions */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-800 block">
              What's Excluded
            </span>
            <div className="space-y-1.5">
              {excludedList.map((item, i) => (
                <div key={i} className="flex items-center justify-between text-xs p-2 rounded-lg bg-rose-50/60 border border-rose-100 text-rose-950">
                  <span>✕ {item}</span>
                  <button
                    type="button"
                    onClick={() => setExcludedList((prev) => prev.filter((_, idx) => idx !== i))}
                    className="text-gray-400 hover:text-rose-600"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2 pt-1">
              <input
                type="text"
                value={newExcluded}
                onChange={(e) => setNewExcluded(e.target.value)}
                placeholder="Add exclusion..."
                className="flex-1 text-xs border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#B99550]"
              />
              <button
                type="button"
                onClick={handleAddExcluded}
                className="px-3 py-1.5 bg-gray-700 text-white text-xs font-bold rounded-lg"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
