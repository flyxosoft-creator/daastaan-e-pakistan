'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Shield, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simulate/Authenticate admin session
      setTimeout(() => {
        setLoading(false);
        router.push('/dashboard');
      }, 700);
    } catch (err: any) {
      setLoading(false);
      setError('Invalid admin credentials. Unauthorized attempts are logged.');
    }
  };

  return (
    <div className="min-h-screen bg-[#123C2D] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        {/* Official Final Logo */}
        <div className="flex justify-center">
          <img
            src="/images/final-official-logo.png"
            alt="Daastaan-e-Pakistan — Official Logo"
            className="h-24 sm:h-28 w-auto object-contain drop-shadow-2xl"
          />
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#B99550] text-xs font-semibold uppercase tracking-wider border border-[#B99550]/30">
          <Shield className="w-3.5 h-3.5" />
          <span>Internal Operations & Admin Portal</span>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-2xl sm:rounded-2xl sm:px-10 border border-[#B99550]/30 space-y-6">
          {error && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                Staff Email
              </label>
              <div className="mt-1 relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@daastaan-e-pakistan.com"
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:border-[#B99550] focus:ring-1 focus:ring-[#B99550]"
                />
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:border-[#B99550] focus:ring-1 focus:ring-[#B99550]"
                />
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-[#123C2D] hover:bg-[#1a5540] text-[#F7F3E9] font-bold text-sm shadow-md transition disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Sign In to Console'}
            </button>
          </form>

          <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 text-[11px] text-gray-500 text-center leading-relaxed">
            Restricted access portal for Daastaan-e-Pakistan management and operational leads. Public account registration is disabled.
          </div>
        </div>
      </div>
    </div>
  );
}

