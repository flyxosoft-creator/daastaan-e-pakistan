import React from 'react';

interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getStyle = () => {
    switch (status) {
      case 'CONFIRMED':
      case 'ACTIVE':
      case 'APPROVED':
      case 'CLEARED':
      case 'SUCCESS':
        return 'bg-emerald-50 text-emerald-800 border-emerald-300';

      case 'IN_PROGRESS':
        return 'bg-sky-50 text-sky-800 border-sky-300 animate-pulse';

      case 'PENDING_PAYMENT':
      case 'PENDING':
      case 'PENDING_MODERATION':
        return 'bg-amber-50 text-amber-800 border-amber-300';

      case 'CANCELLED':
      case 'FAILED':
      case 'REJECTED':
      case 'SUSPENDED':
        return 'bg-rose-50 text-rose-800 border-rose-300';

      case 'COMPLETED':
        return 'bg-gray-100 text-gray-800 border-gray-300';

      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const formatText = (text: string) => {
    return text.replace(/_/g, ' ');
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border uppercase tracking-wide ${getStyle()}`}
    >
      {formatText(status)}
    </span>
  );
}

