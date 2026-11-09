'use client';

import React, { use, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  Compass,
  Clock,
  Calendar,
  CheckCircle,
} from 'lucide-react';

interface ItineraryItem {
  id: string;
  timeSlot: string;
  title: string;
  description: string;
}

export default function EditPackagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();

  const [title, setTitle] = useState('Walled City Heritage Walk — 2,000 Years of Lahore');
  const [slug, setSlug] = useState('lahore-walled-city-heritage-walk');
  const [city, setCity] = useState('Lahore');
  const [tier, setTier] = useState('CULTURAL');
  const [durationUnit, setDurationUnit] = useState<'HOURS' | 'DAYS'>('HOURS');
  const [durationValue, setDurationValue] = useState(4);
  const [basePricePkr, setBasePricePkr] = useState(500000);
  const [minParty, setMinParty] = useState(1);
  const [maxParty, setMaxParty] = useState(8);
  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1598890777032-bde835ba27c2?q=80&w=800&auto=format&fit=crop');
  const [description, setDescription] = useState('Explore ancient gates, Wazir Khan Mosque, Lahore Fort & hidden Mughal havelis with a certified historian.');
  const [status, setStatus] = useState<'DRAFT' | 'ACTIVE'>('ACTIVE');

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
    {
      id: '3',
      timeSlot: '01:00 PM',
      title: 'Haveli Mian Khan & Traditional Chai Gathering',
      description: 'Private courtyard conversation with local artisan family over saffron Kashmiri chai.',
    },
  ]);

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

  const handleAddStop = () => {
    setItinerary((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        timeSlot: '02:00 PM',
        title: 'New Itinerary Stop',
        description: 'Detail the activity or landmark...',
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

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Experience Package "${title}" updated successfully!`);
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
              Edit Package: {resolvedParams.id}
            </h1>
            <p className="text-xs text-gray-500">
              Manage schedule, pricing tiers, and itinerary stops
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
            <span>Update Package</span>
          </button>
        </div>
      </div>

      {/* Core Package Details */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
          <Compass className="w-5 h-5 text-[#B99550]" />
          <h2 className="font-serif text-lg font-bold text-[#123C2D]">
            Core Package Details
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
              onChange={(e) => setTitle(e.target.value)}
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
        </div>
      </div>

      {/* Schedule & Pricing */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
          <Clock className="w-5 h-5 text-[#B99550]" />
          <h2 className="font-serif text-lg font-bold text-[#123C2D]">
            Schedule & Capacity
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
                Hours
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
                Days
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
              Duration ({durationUnit.toLowerCase()})
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
            <input
              type="number"
              value={basePricePkr / 100}
              onChange={(e) => setBasePricePkr((parseInt(e.target.value) || 0) * 100)}
              className="w-full text-xs font-bold border border-gray-300 rounded-xl px-3 py-2.5 bg-gray-50/50 focus:bg-white focus:outline-none focus:border-[#B99550]"
            />
          </div>
        </div>
      </div>

      {/* Itinerary */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#B99550]" />
            <h2 className="font-serif text-lg font-bold text-[#123C2D]">
              Itinerary Stops
            </h2>
          </div>
          <button
            type="button"
            onClick={handleAddStop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#B99550]/40 bg-[#FAF6ED] text-[#123C2D] text-xs font-bold hover:bg-[#123C2D] hover:text-white transition"
          >
            <Plus className="w-3.5 h-3.5 text-[#B99550]" />
            <span>Add Stop</span>
          </button>
        </div>

        <div className="space-y-3">
          {itinerary.map((stop, idx) => (
            <div key={stop.id} className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-1">
                  <span className="w-6 h-6 rounded-full bg-[#123C2D] text-white flex items-center justify-center font-bold text-[11px] shrink-0">
                    {idx + 1}
                  </span>
                  <input
                    type="text"
                    value={stop.timeSlot}
                    onChange={(e) => handleItineraryChange(stop.id, 'timeSlot', e.target.value)}
                    className="w-28 text-xs font-bold border border-gray-300 rounded-lg px-2.5 py-1.5 bg-white text-[#123C2D]"
                  />
                  <input
                    type="text"
                    value={stop.title}
                    onChange={(e) => handleItineraryChange(stop.id, 'title', e.target.value)}
                    className="flex-1 text-xs font-bold border border-gray-300 rounded-lg px-3 py-1.5 bg-white text-gray-900"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveStop(stop.id)}
                  className="text-gray-400 hover:text-rose-600 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <textarea
                rows={2}
                value={stop.description}
                onChange={(e) => handleItineraryChange(stop.id, 'description', e.target.value)}
                className="w-full text-xs border border-gray-300 rounded-lg p-2.5 bg-white focus:outline-none focus:border-[#B99550]"
              />
            </div>
          ))}
        </div>
      </div>
    </form>
  );
}

