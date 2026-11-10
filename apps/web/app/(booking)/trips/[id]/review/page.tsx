'use client';

import React, { use, useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import {
  Star,
  Camera,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  Upload,
  X,
  Heart,
} from 'lucide-react';

export default function SubmitTripReviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const tripId = resolvedParams.id;

  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [guideRating, setGuideRating] = useState(5);
  const [safetyRating, setSafetyRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewContent, setReviewContent] = useState('');
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSimulatePhotoUpload = () => {
    if (uploadedPhotos.length >= 5) return;
    const samplePhotos = [
      'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?auto=format&fit=crop&w=400&q=80',
    ];
    setUploadedPhotos((prev) => [...prev, samplePhotos[prev.length % samplePhotos.length]]);
  };

  const handleRemovePhoto = (index: number) => {
    setUploadedPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF6ED]">
        <Header />
        <main className="flex-1 max-w-xl w-full mx-auto px-4 py-16 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8 text-emerald-700" />
          </div>
          <div className="space-y-2">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#123C2D]">
              Shukriya! Your Review Has Been Submitted
            </h1>
            <p className="text-xs text-gray-600">
              Your feedback helps celebrate verified local storytellers and keeps travel in Pakistan safe, transparent, and authentic.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-gray-200 text-xs text-gray-500">
            Status: <span className="font-bold text-amber-700">Pending Operations Moderation</span> (Publishes within 2 hours)
          </div>
          <div className="flex justify-center gap-3">
            <Link
              href="/explore"
              className="px-6 py-2.5 rounded-xl bg-[#123C2D] text-white text-xs font-bold hover:bg-[#1a5540] transition"
            >
              Explore More Experiences
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6ED]">
      <Header />

      <main className="flex-1 max-w-2xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6">
        <div>
          <span className="text-xs font-mono font-bold text-[#B99550]">{tripId}</span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#123C2D]">
            Share Your Journey Experience
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Walled City Heritage Walk · Storyteller: Ayesha Riaz
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-6">
          {/* Overall Star Rating */}
          <div className="space-y-2 text-center pb-4 border-b border-gray-100">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-600 block">
              Overall Experience Rating
            </label>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(null)}
                  className="p-1 focus:outline-none transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= (hoverRating ?? rating)
                        ? 'text-[#B99550] fill-[#B99550]'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            <div className="text-xs font-bold text-[#123C2D]">
              {rating === 5 && 'Exceptional Heritage Experience'}
              {rating === 4 && 'Very Good Excursion'}
              {rating === 3 && 'Average Tour'}
              {rating === 2 && 'Below Expectations'}
              {rating === 1 && 'Unsatisfactory'}
            </div>
          </div>

          {/* Sub-ratings: Storytelling & Safety */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-gray-100">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 block">
                Guide Storytelling & Depth
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setGuideRating(s)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        s <= guideRating ? 'text-[#B99550] fill-[#B99550]' : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 block">
                Safety & Peace of Mind
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSafetyRating(s)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        s <= safetyRating ? 'text-emerald-600 fill-emerald-600' : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Review Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-700 block">
              Headline or Summary
            </label>
            <input
              type="text"
              required
              value={reviewTitle}
              onChange={(e) => setReviewTitle(e.target.value)}
              placeholder="e.g. Unforgettable evening walk through Wazir Khan and Kashmiri Bazaar"
              className="w-full text-xs border border-gray-300 rounded-xl px-4 py-3 bg-gray-50/50 focus:bg-white focus:outline-none focus:border-[#B99550]"
            />
          </div>

          {/* Review Body */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-700 block">
              Your Detailed Experience
            </label>
            <textarea
              required
              rows={4}
              value={reviewContent}
              onChange={(e) => setReviewContent(e.target.value)}
              placeholder="Describe what made this tour special — the sights, the oral histories told by the guide, local refreshments, and cultural insights..."
              className="w-full text-xs border border-gray-300 rounded-xl p-4 bg-gray-50/50 focus:bg-white focus:outline-none focus:border-[#B99550]"
            />
          </div>

          {/* Photo Uploads */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-700 block">
                Tour Photos (Up to 5)
              </label>
              <span className="text-[10px] text-gray-400">{uploadedPhotos.length} / 5 photos</span>
            </div>

            <div className="flex flex-wrap gap-3">
              {uploadedPhotos.map((url, idx) => (
                <div key={idx} className="relative w-20 h-20 rounded-xl overflow-hidden border border-gray-200">
                  <img src={url} alt="Uploaded review" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemovePhoto(idx)}
                    className="absolute top-1 right-1 p-0.5 rounded-full bg-black/60 text-white hover:bg-black"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}

              {uploadedPhotos.length < 5 && (
                <button
                  type="button"
                  onClick={handleSimulatePhotoUpload}
                  className="w-20 h-20 rounded-xl border-2 border-dashed border-gray-300 hover:border-[#B99550] flex flex-col items-center justify-center gap-1 text-gray-400 hover:text-[#B99550] transition bg-gray-50"
                >
                  <Camera className="w-5 h-5" />
                  <span className="text-[9px] font-bold">Add Photo</span>
                </button>
              )}
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-[#123C2D] hover:bg-[#1a5540] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#123C2D]/15 transition disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Submitting Your Verified Review...</span>
              ) : (
                <>
                  <span>Publish Verified Review</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}

