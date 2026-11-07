'use client';

import React, { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  MessageSquare,
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: 'Lahore',
    groupSize: '1-2',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate sending inquiry
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#FAF6ED] flex flex-col font-sans">
      <Header />

      {/* Modern Light Hero Strip with Subtle Grid & Ambient Glow */}
      <section className="relative pt-12 pb-12 sm:pt-16 sm:pb-16 px-4 bg-[#FAF6ED] border-b border-[#E8DFD0] overflow-hidden bg-tech-grid">
        <div className="ambient-glow absolute inset-0 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#123C2D]/5 border border-[#123C2D]/10 text-[#123C2D] text-xs font-semibold tracking-wide shadow-xs">
            <MessageSquare className="w-3.5 h-3.5 text-[#B99550]" />
            <span>24/7 Dedicated Concierge & Support</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
            We’re Here to Plan Your{' '}
            <span className="text-gradient-brand">Unforgettable Journey</span>
          </h1>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Whether you want a private Mughal culinary walk, a bespoke Karakoram expedition, or have safety questions, our team is ready to assist.
          </p>
        </div>
      </section>

      {/* Contact Content Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Contact Info & Guarantees */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-bold text-[#B99550] uppercase tracking-wider">
                Direct Channels
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">
                Reach Out Anytime
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Connect directly with our trip specialists via call, WhatsApp, or email. We respond to all inquiries within 2 hours.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4">
              <a
                href="tel:+923324541952"
                className="flex items-start gap-4 p-5 rounded-2xl bg-[#F3ECE0] border border-[#E8DFD0] hover:border-[#B99550]/50 hover:shadow-md transition-all group"
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#123C2D] to-[#1F5C45] text-[#B99550] flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    Phone & WhatsApp
                  </h4>
                  <p className="font-serif font-bold text-base text-gray-900 mt-0.5">
                    +92 332 4541952
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Secondary: +92 300 8492551 (24/7 Traveller Help)
                  </p>
                </div>
              </a>

              <a
                href="mailto:info@daastaanepakista.com"
                className="flex items-start gap-4 p-5 rounded-2xl bg-[#FAF9F5] border border-gray-200/90 hover:border-[#B99550]/50 hover:shadow-md transition-all group"
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#123C2D] to-[#1F5C45] text-[#B99550] flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    Official Email
                  </h4>
                  <p className="font-serif font-bold text-base text-gray-900 mt-0.5">
                    info@daastaanepakista.com
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    For bookings, press & guide partnerships
                  </p>
                </div>
              </a>

              <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#FAF9F5] border border-gray-200/90">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#123C2D] to-[#1F5C45] text-[#B99550] flex items-center justify-center shrink-0 shadow-xs">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    Offices & Operations
                  </h4>
                  <p className="font-serif font-bold text-base text-gray-900 mt-0.5">
                    Lahore & Islamabad, Pakistan
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Registered Digital Tourism Operator
                  </p>
                </div>
              </div>
            </div>

            {/* Trust Points */}
            <div className="p-6 rounded-2xl bg-[#123C2D]/5 border border-[#123C2D]/10 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#123C2D]">
                <ShieldCheck className="w-4 h-4 text-[#B99550]" />
                <span>The Daastaan Guarantee</span>
              </div>
              <ul className="space-y-2 text-xs text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#123C2D]" />
                  <span>100% vetted & police-cleared local storytellers</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#123C2D]" />
                  <span>Real-time GPS trip monitoring with instant SOS link</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#123C2D]" />
                  <span>Transparent multi-currency checkout with no surprise fees</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#FAF9F5] rounded-3xl p-8 sm:p-12 border border-gray-200/90 shadow-sm space-y-6">
              <div>
                <h3 className="font-serif text-2xl font-bold text-gray-900">
                  Send an Inquiry
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  Tell us what kind of experience you are envisioning, and our itinerary planners will craft a tailored proposal.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-white border border-emerald-200 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-gray-900">
                    Thank You for Reaching Out!
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                    We’ve received your inquiry. A Daastaan travel specialist will contact you via email or WhatsApp within 2 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        destination: 'Lahore',
                        groupSize: '1-2',
                        message: '',
                      });
                    }}
                    className="px-6 py-2.5 rounded-full bg-[#123C2D] text-white text-xs font-bold hover:bg-[#0B251B] transition"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Sarah Khan"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#123C2D] shadow-2xs font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="sarah@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#123C2D] shadow-2xs font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+92 300 1234567"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#123C2D] shadow-2xs font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                        Destination of Interest
                      </label>
                      <select
                        value={formData.destination}
                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-xs sm:text-sm text-gray-800 focus:outline-none focus:border-[#123C2D] shadow-2xs font-medium cursor-pointer"
                      >
                        <option value="Lahore">Lahore (Walled City & Heritage)</option>
                        <option value="Islamabad">Islamabad & Margalla Hills</option>
                        <option value="Hunza">Hunza & Karakoram Highway</option>
                        <option value="Swat">Swat Valley & Kalam</option>
                        <option value="Karachi">Karachi Coastal & Culinary</option>
                        <option value="Custom">Custom Multi-City Itinerary</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Estimated Group Size
                    </label>
                    <select
                      value={formData.groupSize}
                      onChange={(e) => setFormData({ ...formData, groupSize: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-xs sm:text-sm text-gray-800 focus:outline-none focus:border-[#123C2D] shadow-2xs font-medium cursor-pointer"
                    >
                      <option value="1">Solo Traveller</option>
                      <option value="2">Couple / 2 Guests</option>
                      <option value="3-5">Small Group / Family (3–5)</option>
                      <option value="6-10">Group (6–10)</option>
                      <option value="10+">Large Group (10+)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Your Message or Requirements *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about dates, interests, dietary requirements, or any specific requests..."
                      className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#123C2D] shadow-2xs font-medium resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#123C2D] to-[#1F5C45] hover:from-[#0B251B] hover:to-[#123C2D] text-white font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {submitting ? (
                      <span>Sending inquiry...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-[#B99550]" />
                        <span>Submit Inquiry</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

