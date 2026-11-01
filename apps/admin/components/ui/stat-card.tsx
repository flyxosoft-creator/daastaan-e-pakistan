import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: LucideIcon;
  subtext?: string;
}

export function StatCard({
  title,
  value,
  change,
  trend = 'up',
  icon: Icon,
  subtext,
}: StatCardProps) {
  const trendColors = {
    up: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    down: 'text-rose-700 bg-rose-50 border-rose-200',
    neutral: 'text-gray-700 bg-gray-50 border-gray-200',
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
          {title}
        </span>
        <div className="w-10 h-10 rounded-xl bg-[#123C2D]/10 text-[#123C2D] flex items-center justify-center">
          <Icon className="w-5 h-5 text-[#B99550]" />
        </div>
      </div>

      <div className="mt-4 flex items-baseline justify-between">
        <div className="text-2xl sm:text-3xl font-bold font-serif text-[#123C2D]">
          {value}
        </div>
        {change && (
          <span
            className={`text-xs font-bold px-2 py-0.5 rounded-full border ${trendColors[trend]}`}
          >
            {change}
          </span>
        )}
      </div>

      {subtext && (
        <p className="mt-2 text-xs text-gray-500">
          {subtext}
        </p>
      )}
    </div>
  );
}

