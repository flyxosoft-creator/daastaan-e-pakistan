import React from 'react';
import { AdminSidebar } from '@/components/layout/admin-sidebar';
import { AdminHeader } from '@/components/layout/admin-header';

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      <AdminSidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto p-6 sm:p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}

