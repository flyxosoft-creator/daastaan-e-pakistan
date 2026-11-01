'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Lock, Mail, User, ShieldCheck, Check } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Password rules validation
  const hasMinLen = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasDigit = /[0-9]/.test(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasMinLen || !hasUpper || !hasDigit) {
      setError('Please fulfill all password requirements.');
      return;
    }
    if (!acceptTerms) {
      setError('You must accept the Terms of Service to create an account.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      setTimeout(() => {
        setLoading(false);
        router.push('/explore');
      }, 900);
    } catch (err: any) {
      setLoading(false);
      setError('Unable to register. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F3E9] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md space-y-3">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#123C2D] hover:text-[#B99550] transition mx-auto"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>

        {/* Official Final Logo */}
        <div className="flex flex-col items-center">
          <Link href="/">
            <img
              src="/images/final-official-logo.png"
              alt="Daastaan-e-Pakistan — Official Logo"
              className="h-20 sm:h-24 w-auto object-contain mx-auto drop-shadow-md"
            />
          </Link>
          <h2 className="mt-3 text-center font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#123C2D]">
            Begin Your Pakistan Story
          </h2>
          <p className="mt-1 text-center text-xs text-gray-600">
            Create an account to book tours, connect with guides & activate live safety tracking
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl sm:rounded-2xl sm:px-10 border border-[#B99550]/30 space-y-6">
          {error && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700">
              {error}
            </div>
          )}

          {/* Social Sign Up */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-xs font-semibold text-gray-700 hover:bg-gray-50 transition"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Sign up with Google</span>
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-gray-500 font-semibold">Or with email</span>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                Full Name
              </label>
              <div className="mt-1 relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ayesha Khan"
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:border-[#B99550] focus:ring-1 focus:ring-[#B99550]"
                />
                <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                Email Address
              </label>
              <div className="mt-1 relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:border-[#B99550] focus:ring-1 focus:ring-[#B99550]"
                />
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                Create Password
              </label>
              <div className="mt-1 relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:border-[#B99550] focus:ring-1 focus:ring-[#B99550]"
                />
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              </div>

              {/* Password Requirements Indicator */}
              <div className="mt-2 space-y-1 text-[11px] text-gray-500">
                <div className="flex items-center gap-1.5">
                  <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${hasMinLen ? 'bg-emerald-600 text-white' : 'bg-gray-200'}`}>
                    {hasMinLen && <Check className="w-2.5 h-2.5" />}
                  </div>
                  <span>At least 8 characters</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${hasUpper ? 'bg-emerald-600 text-white' : 'bg-gray-200'}`}>
                    {hasUpper && <Check className="w-2.5 h-2.5" />}
                  </div>
                  <span>At least one uppercase letter (A-Z)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${hasDigit ? 'bg-emerald-600 text-white' : 'bg-gray-200'}`}>
                    {hasDigit && <Check className="w-2.5 h-2.5" />}
                  </div>
                  <span>At least one number (0-9)</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="rounded text-[#123C2D] focus:ring-[#B99550] mt-0.5"
                />
                <span className="text-xs text-gray-600 leading-tight">
                  I agree to Daastaan’s{' '}
                  <Link href="/terms" className="text-[#123C2D] font-bold underline">Terms of Service</Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-[#123C2D] font-bold underline">Privacy Policy</Link>.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-[#B99550] hover:bg-[#c9a65f] text-[#123C2D] font-bold text-sm shadow-md transition disabled:opacity-50"
            >
              {loading ? 'Creating Your Account...' : 'Create Account'}
            </button>
          </form>

          <div className="text-center pt-2 border-t border-gray-100">
            <span className="text-xs text-gray-600">Already have an account? </span>
            <Link
              href="/login"
              className="text-xs font-bold text-[#123C2D] hover:text-[#B99550]"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

