'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Compass, Users, Shield, Heart, Award, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAF6ED] flex flex-col font-sans">
      <Header />

      {/* Modern Light Hero Strip with Subtle Grid & Ambient Glow */}
      <section className="relative pt-12 pb-12 sm:pt-16 sm:pb-16 px-4 bg-[#FAF6ED] border-b border-[#E8DFD0] overflow-hidden bg-tech-grid">
        <div className="ambient-glow absolute inset-0 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#123C2D]/5 border border-[#123C2D]/10 text-[#123C2D] text-xs font-semibold tracking-wide shadow-xs">
            <Compass className="w-3.5 h-3.5 text-[#B99550]" />
            <span>Our Story & Mission</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
            Discover Pakistan.{' '}
            <span className="text-gradient-brand">Live Its Stories.</span>
          </h1>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Daastaan-e-Pakistan was born to bridge the gap between world travellers and the authentic, untold heritage of Pakistan through vetted local storytellers.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1 w-full space-y-20">
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B99550]/10 text-[#B99550] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Genesis</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-gray-900 leading-tight">
              Moving Beyond WhatsApp Screenshots to a{' '}
              <span className="text-gradient-brand">Trusted Marketplace</span>
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              For decades, exploring Pakistan meant navigating fragmented Facebook groups, negotiating over WhatsApp, and wiring deposits into personal bank accounts with fingers crossed. Solo female travellers and diaspora visitors were especially hesitant, lacking clear assurances of safety and verified credentials.
            </p>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              We founded <strong>Daastaan-e-Pakistan</strong> to set a new commercial benchmark: an enterprise-grade digital marketplace with instant online booking, multi-currency credit card checkout, verified guide background checks, and an automated universal safety layer.
            </p>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-xl border border-gray-200 h-96 group">
            <img
              src="/images/hero-lahore.jpg"
              alt="Mughal Architecture Lahore"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8">
              <span className="text-white font-serif text-lg sm:text-xl italic drop-shadow-md">
                &ldquo;Real places. Warm welcomes. Untold stories.&rdquo;
              </span>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="bg-[#F3ECE0] rounded-3xl p-8 sm:p-14 border border-[#E8DFD0] shadow-xs space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <p className="text-xs font-bold uppercase tracking-widest text-[#B99550]">
              Our Commitments
            </p>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-gray-900">
              Our Guiding{' '}
              <span className="text-gradient-brand">Principles</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              Every package, guide partnership, and technology feature is anchored in these six commitments:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {[
              {
                num: '01',
                title: 'Authenticity',
                desc: 'Real places, real people, real stories. Never sanitized tourist theatre.',
              },
              {
                num: '02',
                title: 'Trust Through Verification',
                desc: 'Every guide is police-cleared and CNIC-vetted. Every review is from an authentic paid booking.',
              },
              {
                num: '03',
                title: 'Responsible Tourism',
                desc: 'Economic value flows directly to local storytellers, artisan families, and neighborhood communities.',
              },
              {
                num: '04',
                title: 'Cultural Dignity',
                desc: 'Representing Pakistan’s regional cultures, traditions, and faiths with care, nuance, and historical accuracy.',
              },
              {
                num: '05',
                title: 'Safety & Inclusion',
                desc: 'A universal safety layer that protects solo travellers, female explorers, and overseas visitors.',
              },
              {
                num: '06',
                title: 'Digital Excellence',
                desc: 'Flawless web and mobile performance, transparent pricing, and instant multi-gateway checkout.',
              },
            ].map((principle) => (
              <div
                key={principle.num}
                className="p-6 rounded-2xl bg-white border border-gray-200/80 hover:border-[#B99550]/50 hover:shadow-md transition-all space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-[#123C2D]/5 text-[#123C2D]">
                    {principle.num}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-[#B99550]" />
                </div>
                <h4 className="font-serif font-bold text-base text-gray-900">
                  {principle.title}
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {principle.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Founding Team Banner */}
        <div className="bg-gradient-to-r from-[#123C2D] via-[#1a5540] to-[#123C2D] text-white rounded-3xl p-8 sm:p-14 shadow-xl border border-[#B99550]/30 space-y-6">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-[#E5B558] uppercase tracking-wider">
              Leadership & Vision
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl font-bold">
              Built for Pakistan, Designed for the World
            </h3>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed">
              Daastaan-e-Pakistan is founded by Aiman Mokham, Umaimah, Waqar Ullah, and Ahmad Fawad. Backed by technology engineering from Flyxosoft, we are committed to building Pakistan’s preeminent digital tourism gateway.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                href="/explore"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#B99550] hover:bg-[#d4ad5b] text-[#0A2418] font-bold text-xs sm:text-sm tracking-wide shadow-lg transition-all"
              >
                <span>Explore Experiences</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 text-white font-bold text-xs sm:text-sm tracking-wide transition-all"
              >
                <span>Contact Our Team</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
