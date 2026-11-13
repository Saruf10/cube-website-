'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import SideMenu from '@/components/layout/SideMenu';
import Footer from '@/components/layout/Footer';
import UniversalAnnouncementPopup from '@/components/common/UniversalAnnouncementPopup';
import ScrollProgressBar from '@/components/common/ScrollProgressBar';
import LiveSync from '@/components/common/LiveSync';
import SmoothScroll from '@/components/common/SmoothScroll';

export default function PublicShellWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) {
    // Admin interface must be completely separate from public website header/footer
    return (
      <main className="min-h-screen bg-slate-100">
        {pathname !== '/admin/login' && <LiveSync />}
        {children}
      </main>
    );
  }

  return (
    <div className="relative min-h-screen bg-white flex flex-col">
      <LiveSync />
      <SmoothScroll />
      <ScrollProgressBar />
      <UniversalAnnouncementPopup />

      {/*
        The Navbar (fixed header, mobile drawer, search dialog) must live OUTSIDE
        any element with `filter` / `backdrop-filter` / `transform`: those turn
        the element into the containing block for position:fixed children, which
        made the header scroll away with the page instead of staying on screen.
      */}
      <Navbar />
      <SideMenu />

      {/* Full-bleed page canvas: edge to edge, no outer frame.
          overflow-clip (not overflow-hidden) does not create a scroll container,
          so position:sticky keeps working inside. */}
      <div className="w-full bg-white flex flex-col flex-1 overflow-clip relative">
        {/* Anything position:fixed rendered inside pages must use a portal to <body>. */}
        <div className="flex flex-col flex-1">
          <main className="flex-1 w-full overflow-x-clip">{children}</main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
