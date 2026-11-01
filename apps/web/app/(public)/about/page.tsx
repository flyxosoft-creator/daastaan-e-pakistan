'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Compass, Users, Shield, Heart, Award, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F7F3E9] flex flex-col font-sans">
      <Header />

      {/* Hero */}
      <section className="bg-[#123C2D] text-[#F7F3E9] pt-32 pb-16 px-4 border-b border-[#B99550]/20">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B99550]/20 text-[#B99550] text-xs font-semibold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            <span>Our Story & Mission</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">
            Discover Pakistan. Live Its Stories.
          </h1>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            Daastaan-e-Pakistan was born to bridge the gap between world travellers and the authentic, untold heritage of Pakistan through vetted local guides.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1 w-full space-y-16">
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold text-[#B99550] uppercase tracking-wider">
              The Genesis
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#123C2D] leading-tight">
              Moving Beyond WhatsApp Screenshots to a Trusted Experience
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              For decades, exploring Pakistan meant navigating fragmented Facebook groups, negotiating over WhatsApp, and wiring deposits into personal bank accounts with fingers crossed. Solo female travellers and diaspora visitors were especially hesitant, lacking clear assurances of safety and verified credentials.
            </p>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              We founded <strong>Daastaan-e-Pakistan</strong> to set a new commercial benchmark: an enterprise-grade digital marketplace with instant online booking, multi-currency credit card checkout, verified guide background checks, and an automated universal safety layer.
            </p>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-[#B99550]/30 h-96">
            <img
              src="https://images.unsplash.com/photo-1598890777032-bde835ba27c2?q=80&w=1000&auto=format&fit=crop"
              alt="Mughal Architecture Lahore"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#123C2D]/80 via-transparent to-transparent flex items-end p-6">
              <span className="text-white font-serif text-lg italic">
                "Real places. Warm welcomes. Untold stories."
              </span>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="bg-white rounded-2xl p-8 sm:p-12 border border-[#B99550]/20 shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#123C2D]">
              Our Guiding Principles
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              Every package, guide partnership, and technology feature is anchored in these six commitments:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="p-5 rounded-xl bg-gray-50 border border-gray-100 space-y-2">
              <h4 className="font-serif font-bold text-base text-[#123C2D]">
                1. Authenticity
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Real places, real people, real stories. Never sanitized tourist theatre.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-gray-50 border border-gray-100 space-y-2">
              <h4 className="font-serif font-bold text-base text-[#123C2D]">
                2. Trust Through Verification
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Every guide is police-cleared and CNIC-vetted. Every review is from an authentic paid booking.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-gray-50 border border-gray-100 space-y-2">
              <h4 className="font-serif font-bold text-base text-[#123C2D]">
                3. Responsible Tourism
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Economic value flows directly to local storytellers, artisan families, and neighborhood communities.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-gray-50 border border-gray-100 space-y-2">
              <h4 className="font-serif font-bold text-base text-[#123C2D]">
                4. Cultural Dignity
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Representing Pakistan’s regional cultures, traditions, and faiths with care, nuance, and historical accuracy.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-gray-50 border border-gray-100 space-y-2">
              <h4 className="font-serif font-bold text-base text-[#123C2D]">
                5. Safety & Inclusion
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                A universal safety layer that protects solo travellers, female explorers, and overseas visitors.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-gray-50 border border-gray-100 space-y-2">
              <h4 className="font-serif font-bold text-base text-[#123C2D]">
                6. Digital Excellence
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Flawless web and mobile performance, transparent pricing, and instant multi-gateway checkout.
              </p>
            </div>
          </div>
        </div>

        {/* Founding Team Note */}
        <div className="bg-[#123C2D] text-[#F7F3E9] rounded-2xl p-8 sm:p-12 border border-[#B99550]/40 shadow-xl space-y-6">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-[#B99550] uppercase tracking-wider">
              Leadership & Commitment
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold">
              Built for Pakistan, Designed for the World
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Daastaan-e-Pakistan is founded by Aiman Mokham, Umaimah, Waqar Ullah, and Ahmad Fawad. Backed by technology engineering from Flyxosoft, we are committed to building Pakistan’s preeminent digital tourism gateway.
            </p>
            <div className="pt-4">
              <Link
                href="/explore"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#B99550] text-[#123C2D] font-bold text-xs hover:bg-[#c9a65f] transition"
              >
                <span>Experience Our Tours</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

