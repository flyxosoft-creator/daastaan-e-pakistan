'use client';

import React, { use, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import {
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Users,
  ShieldCheck,
  MessageCircle,
  Download,
  Share2,
  ArrowRight,
  Smartphone,
  ExternalLink,
  Printer,
  FileText,
  X,
  BadgeCheck,
} from 'lucide-react';

export default function BookingSuccessPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const searchParams = useSearchParams();
  const city = searchParams?.get('city') || 'Lahore';
  const partySize = searchParams?.get('party') || '2';
  const currency = searchParams?.get('currency') || 'USD';
  const startDate = searchParams?.get('startDate') || 'Tomorrow';
  const endDate = searchParams?.get('endDate') || startDate;

  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  // Generate downloadable .ics calendar file
  const handleDownloadCalendar = () => {
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Daastaan-e-Pakistan//Tour Booking//EN
BEGIN:VEVENT
SUMMARY:Walled City Heritage Walk with Daastaan-e-Pakistan
DESCRIPTION:Your guided tour in ${city} with a verified local storyteller. Universal safety tracking included.
LOCATION:${city}, Pakistan
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Daastaan-Tour-${resolvedParams.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#F7F3E9] flex flex-col font-sans">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-32 flex-1 w-full space-y-8">
        {/* Success Header Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border-2 border-[#B99550]/40 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase font-bold tracking-widest text-[#B99550]">
              Reservation Confirmed • Booking #{resolvedParams.id}
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#123C2D]">
              Shukriya! Your Journey is Booked
            </h1>
            <p className="text-sm text-gray-600 max-w-lg mx-auto leading-relaxed">
              We have dispatched your receipt, guide contact, and confirmation email. Your verified storyteller is preparing an unforgettable experience in {city}.
            </p>
          </div>

          {/* Quick Action Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setShowInvoiceModal(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#123C2D] text-[#FAF6ED] text-xs font-bold hover:bg-[#1a5540] transition shadow-md"
            >
              <FileText className="w-4 h-4 text-[#B99550]" />
              <span>Download Official PDF Receipt</span>
            </button>

            <button
              onClick={handleDownloadCalendar}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-50 transition"
            >
              <Calendar className="w-4 h-4 text-[#B99550]" />
              <span>Add to Calendar (.ICS)</span>
            </button>

            <a
              href={`https://wa.me/923001234567?text=Hello%20Daastaan%20Team!%20I%20have%20booked%20tour%20${resolvedParams.id}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Operations Hub</span>
            </a>
          </div>
        </div>

        {/* Universal Safety Guarantee Card */}
        <div className="bg-[#123C2D] text-[#F7F3E9] rounded-2xl p-6 sm:p-8 border border-[#B99550]/30 shadow-lg space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#B99550] text-[#123C2D] flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold">
                Universal Safety Protocol Activated
              </h3>
              <p className="text-xs text-gray-300">
                Your emergency contact has been logged. When your tour starts, they will receive a real-time web tracking link.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs border-t border-[#B99550]/20">
            <div className="bg-white/10 p-3 rounded-xl space-y-1">
              <span className="font-bold text-[#B99550]">Emergency Contact</span>
              <p className="text-[11px] text-gray-300">
                Encrypted at rest & alerted automatically on trip departure.
              </p>
            </div>
            <div className="bg-white/10 p-3 rounded-xl space-y-1">
              <span className="font-bold text-[#B99550]">Assigned Guide Vetted</span>
              <p className="text-[11px] text-gray-300">
                Police cleared, CNIC verified, and checked-in.
              </p>
            </div>
            <div className="bg-white/10 p-3 rounded-xl space-y-1">
              <span className="font-bold text-[#B99550]">One-Touch SOS</span>
              <p className="text-[11px] text-gray-300">
                Available in your browser throughout the active tour.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            <Link
              href={`/trips/${resolvedParams.id}`}
              className="px-4 py-2.5 rounded-xl bg-[#B99550] hover:bg-[#a88440] text-black text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
            >
              <ShieldCheck className="w-4 h-4 text-black" />
              <span>Launch Live Trip & Safety Tracker</span>
            </Link>
            <a
              href={`https://wa.me/923000000000?text=Hello%20Daastaan%20Team,%20my%20booking%20reference%20is%20${resolvedParams.id}.%20I%20have%20an%20inquiry.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Concierge (24/7)</span>
            </a>
          </div>
        </div>

        {/* PWA Home-Screen Install Prompt (FR-127b) */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0">
              <Smartphone className="w-5 h-5 text-[#B99550]" />
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-[#123C2D]">
                Install Daastaan to Your Phone Home-Screen
              </h4>
              <p className="text-xs text-gray-500">
                Tap your mobile browser menu and select "Add to Home Screen" to access offline tour itineraries & SOS button on trip day.
              </p>
            </div>
          </div>

          <Link
            href="/explore"
            className="px-5 py-2.5 rounded-xl bg-[#123C2D] text-white text-xs font-bold hover:bg-[#1a5540] transition whitespace-nowrap shrink-0"
          >
            Explore More Tours
          </Link>
        </div>
      </main>

      {/* Official Printable PDF Voucher Modal */}
      {showInvoiceModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-gray-200 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#B99550]" />
                <h3 className="font-serif text-lg font-bold text-[#123C2D]">
                  Official Booking Voucher & Tax Receipt
                </h3>
              </div>
              <button
                onClick={() => setShowInvoiceModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Printable Area */}
            <div className="space-y-6 text-xs text-gray-800 border p-6 rounded-xl bg-gray-50/50">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-serif text-xl font-bold text-[#123C2D]">
                    Daastaan-e-Pakistan
                  </div>
                  <div className="text-[11px] text-gray-500">
                    Department of Tourist Services Lic. #DTS-PAK-2026
                  </div>
                  <div className="text-[11px] text-gray-500">
                    Official Inquiries: info@daastaanepakistan.com
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-[#123C2D] text-sm">
                    {resolvedParams.id}
                  </div>
                  <div className="text-[11px] text-gray-500">
                    Date: {new Date().toLocaleDateString('en-GB')}
                  </div>
                  <div className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full mt-1">
                    <BadgeCheck className="w-3.5 h-3.5" />
                    <span>PAID IN FULL</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-b border-gray-200 py-3">
                <div>
                  <span className="font-bold text-gray-600 block text-[10px] uppercase">
                    Experience
                  </span>
                  <span className="font-bold text-gray-900 text-sm">
                    Walled City Heritage Walk
                  </span>
                  <span className="text-gray-500 block">Destination: {city}</span>
                </div>
                <div>
                  <span className="font-bold text-gray-600 block text-[10px] uppercase">
                    Schedule & Guests
                  </span>
                  <span className="font-bold text-gray-900">
                    {startDate} {endDate !== startDate ? `→ ${endDate}` : ''}
                  </span>
                  <span className="text-gray-500 block">
                    Party: {partySize} Registered {parseInt(partySize) === 1 ? 'Guest' : 'Guests'}
                  </span>
                </div>
              </div>

              {/* Financial Breakdown */}
              <div className="space-y-2">
                <span className="font-bold text-gray-700 uppercase text-[10px] block">
                  Invoice Itemization ({currency})
                </span>
                <div className="flex justify-between text-gray-600">
                  <span>Tour Base Fee ({partySize} Guests)</span>
                  <span className="font-medium text-gray-900">
                    {currency === 'GBP' ? '£28.00' : '$35.00'}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Universal GPS Safety Layer & Twilio SOS</span>
                  <span className="text-emerald-700 font-semibold">INCLUDED</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Local Municipal & Heritage Surcharges</span>
                  <span className="font-medium text-gray-900">
                    {currency === 'GBP' ? '£2.00' : '$2.50'}
                  </span>
                </div>
                <div className="border-t border-gray-300 pt-2 flex justify-between font-bold text-sm text-[#123C2D]">
                  <span>Total Amount Paid</span>
                  <span>{currency === 'GBP' ? '£30.00' : '$37.50'}</span>
                </div>
              </div>

              <div className="text-[10px] text-gray-500 border-t pt-3 space-y-1">
                <p>• Verified Guide: Tariq Mehmood (Phone: +92 300 4567890)</p>
                <p>• Meeting Point: Delhi Gate, Lahore (Pickup arranged per booking request)</p>
                <p>• Free cancellation policy: 100% refund up to 48 hours prior to start.</p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#123C2D] text-[#FAF6ED] text-xs font-bold hover:bg-[#1a5540] transition shadow-md"
              >
                <Printer className="w-4 h-4 text-[#B99550]" />
                <span>Print or Save as PDF</span>
              </button>
              <button
                type="button"
                onClick={() => setShowInvoiceModal(false)}
                className="px-4 py-2.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-100 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
