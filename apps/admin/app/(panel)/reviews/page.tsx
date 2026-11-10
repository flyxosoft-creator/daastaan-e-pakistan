'use client';

import React, { useState } from 'react';
import {
  Star,
  CheckCircle,
  XCircle,
  Eye,
  MessageSquare,
  AlertTriangle,
  Filter,
  Check,
  X,
  Search,
  Camera,
  Heart,
  User,
  ShieldCheck,
} from 'lucide-react';

interface ReviewItem {
  id: string;
  bookingId: string;
  customerName: string;
  customerEmail: string;
  packageTitle: string;
  city: string;
  guideName: string;
  overallRating: number;
  guideRating: number;
  safetyRating: number;
  title: string;
  body: string;
  photos: string[];
  createdAt: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  rejectionReason?: string;
  featured: boolean;
}

const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: 'REV-201',
    bookingId: 'BK-1088',
    customerName: 'Amina & Haris',
    customerEmail: 'amina.haris@example.com',
    packageTitle: 'Gawalmandi Food Trail',
    city: 'Lahore',
    guideName: 'Ayesha Riaz',
    overallRating: 5,
    guideRating: 5,
    safetyRating: 5,
    title: 'Unbelievable culinary storytelling in the heart of Old Lahore',
    body: 'Ayesha took us deep into the historic lanes that tourists would never dare enter alone. From the secret Kashmiri chai to the rich halwa puri, every bite had three centuries of oral history behind it. We felt deeply safe and well looked after.',
    photos: [
      'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?auto=format&fit=crop&w=400&q=80',
    ],
    createdAt: 'Today, 10:45 AM',
    status: 'PENDING',
    featured: false,
  },
  {
    id: 'REV-202',
    bookingId: 'BK-1042',
    customerName: 'Marcus Vance',
    customerEmail: 'm.vance@uktraveler.co.uk',
    packageTitle: 'Walled City Heritage Walk',
    city: 'Lahore',
    guideName: 'Ayesha Riaz',
    overallRating: 5,
    guideRating: 5,
    safetyRating: 5,
    title: 'The highlight of our two weeks across Pakistan',
    body: 'Outstanding cultural immersion. The restoration of Shahi Hammam and Wazir Khan mosque were explained with such scholarly passion. The live GPS tracking link gave my family back in Manchester total peace of mind.',
    photos: [],
    createdAt: 'Yesterday, 04:15 PM',
    status: 'APPROVED',
    featured: true,
  },
  {
    id: 'REV-203',
    bookingId: 'BK-1035',
    customerName: 'Tariq Mehmood',
    customerEmail: 'tariq.m@gmail.com',
    packageTitle: 'Badshahi Mosque Twilight Excursion',
    city: 'Lahore',
    guideName: 'Tariq Mansoor',
    overallRating: 4,
    guideRating: 4,
    safetyRating: 5,
    title: 'Peaceful sunset views and respectful guidance',
    body: 'Very well coordinated. The audio headsets worked smoothly and the guide respected our pace with elderly parents.',
    photos: [],
    createdAt: '3 days ago',
    status: 'APPROVED',
    featured: false,
  },
];

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<ReviewItem[]>(INITIAL_REVIEWS);
  const [activeTab, setActiveTab] = useState<'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED'>('PENDING');
  const [searchQuery, setSearchQuery] = useState('');
  const [rejectModalReview, setRejectModalReview] = useState<ReviewItem | null>(null);
  const [rejectionReason, setRejectionReason] = useState('Violates community verification guidelines');

  // Stats
  const pendingCount = reviews.filter((r) => r.status === 'PENDING').length;
  const approvedCount = reviews.filter((r) => r.status === 'APPROVED').length;
  const rejectedCount = reviews.filter((r) => r.status === 'REJECTED').length;

  const handleApprove = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'APPROVED' } : r)),
    );
  };

  const handleOpenReject = (review: ReviewItem) => {
    setRejectModalReview(review);
  };

  const handleConfirmReject = () => {
    if (!rejectModalReview) return;
    setReviews((prev) =>
      prev.map((r) =>
        r.id === rejectModalReview.id
          ? { ...r, status: 'REJECTED', rejectionReason }
          : r,
      ),
    );
    setRejectModalReview(null);
  };

  const handleToggleFeatured = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, featured: !r.featured } : r)),
    );
  };

  const filteredReviews = reviews.filter((r) => {
    if (activeTab !== 'ALL' && r.status !== activeTab) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        r.customerName.toLowerCase().includes(q) ||
        r.packageTitle.toLowerCase().includes(q) ||
        r.guideName.toLowerCase().includes(q) ||
        r.body.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#123C2D]">
            Review Moderation Queue
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Approve, audit, and curate verified post-trip traveler reviews across all Pakistani heritage tours
          </p>
        </div>

        <div className="flex items-center gap-2">
          {pendingCount > 0 && (
            <span className="px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              <span>{pendingCount} Pending Moderation</span>
            </span>
          )}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-xs">
          <div className="text-[10px] uppercase font-bold text-gray-400">Pending Approval</div>
          <div className="text-2xl font-bold text-amber-600 mt-1">{pendingCount}</div>
          <div className="text-[10px] text-gray-500 mt-0.5">Requires Ops sign-off</div>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-xs">
          <div className="text-[10px] uppercase font-bold text-gray-400">Approved & Live</div>
          <div className="text-2xl font-bold text-emerald-700 mt-1">{approvedCount}</div>
          <div className="text-[10px] text-gray-500 mt-0.5">Published on public tours</div>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-xs">
          <div className="text-[10px] uppercase font-bold text-gray-400">Rejected / Hidden</div>
          <div className="text-2xl font-bold text-red-600 mt-1">{rejectedCount}</div>
          <div className="text-[10px] text-gray-500 mt-0.5">Spam / non-compliant</div>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-xs">
          <div className="text-[10px] uppercase font-bold text-gray-400">Platform Rating</div>
          <div className="text-2xl font-bold text-[#B99550] mt-1 flex items-center gap-1">
            <span>4.92</span>
            <Star className="w-5 h-5 fill-[#B99550] text-[#B99550]" />
          </div>
          <div className="text-[10px] text-gray-500 mt-0.5">Across 148 verified tours</div>
        </div>
      </div>

      {/* Controls Bar: Tabs & Search */}
      <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl w-full sm:w-auto">
          {(['PENDING', 'ALL', 'APPROVED', 'REJECTED'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === tab
                  ? 'bg-white text-[#123C2D] shadow-xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <span>
                {tab === 'PENDING' && 'Pending Queue'}
                {tab === 'ALL' && 'All Reviews'}
                {tab === 'APPROVED' && 'Approved'}
                {tab === 'REJECTED' && 'Rejected'}
              </span>
              {tab === 'PENDING' && pendingCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] flex items-center justify-center font-bold">
                  {pendingCount}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search traveler, tour, or guide..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:border-[#B99550]"
          />
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-gray-200 text-gray-400 space-y-2">
            <MessageSquare className="w-10 h-10 mx-auto text-gray-300" />
            <h4 className="font-bold text-sm text-gray-700">No Reviews in this Queue</h4>
            <p className="text-xs">There are no traveler reviews matching your active filter.</p>
          </div>
        ) : (
          filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs space-y-4 hover:border-gray-300 transition"
            >
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-gray-100">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#123C2D] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    {rev.customerName.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-[#123C2D]">{rev.customerName}</h4>
                      <span className="text-[10px] text-gray-400">{rev.customerEmail}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      Tour: <span className="font-bold text-gray-700">{rev.packageTitle}</span> ({rev.city}) · Guide: <span className="text-[#B99550] font-bold">{rev.guideName}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {rev.status === 'PENDING' && (
                    <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold border border-amber-200">
                      Pending Moderation
                    </span>
                  )}
                  {rev.status === 'APPROVED' && (
                    <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                      Approved & Published
                    </span>
                  )}
                  {rev.status === 'REJECTED' && (
                    <span className="px-2.5 py-1 rounded-full bg-red-50 text-red-700 text-[10px] font-bold border border-red-200">
                      Rejected
                    </span>
                  )}
                  <span className="text-[10px] text-gray-400">{rev.createdAt}</span>
                </div>
              </div>

              {/* Rating & Content */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="flex text-[#B99550]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < rev.overallRating ? 'fill-[#B99550]' : 'text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-bold text-xs text-gray-800">{rev.title}</span>
                  <div className="text-[10px] text-gray-400 flex items-center gap-2 border-l pl-2">
                    <span>Storytelling: {rev.guideRating}/5</span>
                    <span>•</span>
                    <span>Safety: {rev.safetyRating}/5</span>
                  </div>
                </div>

                <p className="text-xs text-gray-700 leading-relaxed">{rev.body}</p>

                {/* Photos */}
                {rev.photos.length > 0 && (
                  <div className="flex gap-2 pt-2">
                    {rev.photos.map((p, idx) => (
                      <div
                        key={idx}
                        className="w-16 h-16 rounded-xl overflow-hidden border border-gray-200 shrink-0"
                      >
                        <img src={p} alt="Review attachment" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}

                {rev.rejectionReason && (
                  <div className="p-3 rounded-xl bg-red-50 text-red-800 text-[11px] border border-red-100 mt-2">
                    <strong>Rejection Reason:</strong> {rev.rejectionReason}
                  </div>
                )}
              </div>

              {/* Moderation Actions Bar */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleFeatured(rev.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                      rev.featured
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${rev.featured ? 'fill-amber-600 text-amber-600' : ''}`} />
                    <span>{rev.featured ? 'Featured on Homepage' : 'Feature Testimonial'}</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {rev.status !== 'APPROVED' && (
                    <button
                      onClick={() => handleApprove(rev.id)}
                      className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Approve & Publish</span>
                    </button>
                  )}

                  {rev.status !== 'REJECTED' && (
                    <button
                      onClick={() => handleOpenReject(rev)}
                      className="px-4 py-2 rounded-xl border border-red-200 text-red-700 hover:bg-red-50 text-xs font-bold transition flex items-center gap-1.5"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Reject</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Rejection Reason Modal */}
      {rejectModalReview && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-gray-200">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-serif text-base font-bold text-red-700 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                <span>Reject Review ({rejectModalReview.id})</span>
              </h3>
              <button
                onClick={() => setRejectModalReview(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-gray-600">
              Please specify a reason for rejecting this traveler review. An automated notification will be sent to the traveler.
            </p>

            <select
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="w-full text-xs border border-gray-300 rounded-xl p-3 bg-gray-50 focus:bg-white focus:outline-none focus:border-red-500"
            >
              <option value="Contains promotional or commercial links">Contains promotional or commercial links</option>
              <option value="Inappropriate or abusive language">Inappropriate or abusive language</option>
              <option value="Off-topic or irrelevant to the booked tour">Off-topic or irrelevant to the booked tour</option>
              <option value="Disputed service facts requiring ops investigation">Disputed service facts requiring ops investigation</option>
            </select>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setRejectModalReview(null)}
                className="px-4 py-2 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReject}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

