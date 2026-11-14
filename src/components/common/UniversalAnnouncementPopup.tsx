'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { useCmsUpdates } from '@/lib/live';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Briefcase, ArrowUpRight, ShieldCheck, Sparkles, 
  Bell, FileText, Calendar, ChevronRight
} from 'lucide-react';

interface Announcement {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  type: string;
  badge?: string;
  imageUrl?: string;
  ctaText?: string;
  ctaUrl?: string;
  frequency: string;
  isActive: boolean;
}

export default function UniversalAnnouncementPopup() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);

  const pathname = usePathname();

  // Load announcements targeted at THIS page (previously the page was never
  // sent, so home-only popups appeared on every page). Reloads on navigation
  // and instantly when an admin changes announcements.
  const loadAnnouncements = useCallback(async () => {
    try {
      const res = await fetch(`/api/public/announcements?page=${encodeURIComponent(pathname || '/')}`, {
        cache: 'no-store',
      });
      if (!res.ok) return;
      const data = await res.json();
      if (!Array.isArray(data)) return;
      const visible = data.filter((ann: Announcement) => {
        if (ann.frequency === 'once_per_session') {
          try {
            return !sessionStorage.getItem(`cube_ann_seen_${ann.id}`);
          } catch {
            return true;
          }
        }
        return true;
      });
      setAnnouncements(visible.slice(0, 3)); // Stack up to 3 announcements
    } catch {
      // Offline: keep current state.
    }
  }, [pathname]);

  useEffect(() => {
    loadAnnouncements();
  }, [loadAnnouncements]);

  useCmsUpdates(loadAnnouncements);

  const dismiss = (id: string, frequency: string) => {
    if (frequency === 'once_per_session') {
      sessionStorage.setItem(`cube_ann_seen_${id}`, 'true');
    }
    setDismissedIds((prev) => [...prev, id]);
  };

  const activeAnnouncements = announcements.filter(
    (a) => !dismissedIds.includes(a.id)
  );

  if (activeAnnouncements.length === 0) return null;

  return (
    <div className="fixed z-50 flex flex-col gap-3 pointer-events-none left-3 right-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] sm:left-auto sm:bottom-auto sm:top-24 sm:right-8 sm:w-full sm:max-w-sm">
      <AnimatePresence>
        {activeAnnouncements.map((ann, idx) => (
          <motion.div
            key={ann.id}
            initial={{ opacity: 0, y: -25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.92, transition: { duration: 0.2 } }}
            transition={{ type: 'spring', stiffness: 350, damping: 28, delay: idx * 0.1 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={(_, info) => {
              if (Math.abs(info.offset.x) > 60) {
                dismiss(ann.id, ann.frequency);
              }
            }}
            className="pointer-events-auto rounded-none bg-white cube-glass backdrop-blur-2xl border border-[#E7E3D9] shadow-[0_20px_50px_rgba(7,14,92,0.18),0_4px_16px_rgba(36,39,43,0.08)] p-4 sm:p-5 relative select-none max-h-[70vh] overflow-y-auto"
          >
            {/* Specular highlight line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E7E3D9] to-transparent opacity-90" />

            {ann.imageUrl && (
              <div className="relative hidden sm:block h-36 w-full rounded-none overflow-hidden mb-3.5 border border-[#E7E3D9]/80 shadow-xs">
                <Image
                  src={ann.imageUrl}
                  alt={ann.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2.5 left-2.5 px-3 py-1 rounded-none bg-[#C29A3E] text-white text-[10px] font-bold tracking-wider shadow-sm flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-none bg-white animate-pulse" />
                  <span>{ann.badge || 'WE ARE HIRING'}</span>
                </div>
              </div>
            )}

            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-none bg-[#C29A3E] animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0B1324] bg-[#F4F2EC] px-3 py-1 rounded-none border border-[#E7E3D9]">
                  {ann.badge || ann.type || 'Announcement'}
                </span>
              </div>

              <button
                onClick={() => dismiss(ann.id, ann.frequency)}
                className="text-[#5B6474] hover:text-[#0B1324] p-2.5 -m-1 rounded-none hover:bg-[#F4F2EC] transition-colors cursor-pointer"
                aria-label="Dismiss announcement"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-3 space-y-1.5">
              <h4 className="text-sm sm:text-base font-bold font-serif text-[#0B1324] tracking-tight line-clamp-2">
                {ann.title}
              </h4>
              <p className="text-xs text-[#1F2633] font-medium leading-relaxed line-clamp-2 sm:line-clamp-3">
                {ann.description}
              </p>
            </div>

            {ann.ctaUrl && (
              <div className="mt-4 pt-3 border-t border-[#E7E3D9] flex items-center justify-between">
                <Link
                  href={ann.ctaUrl}
                  onClick={() => dismiss(ann.id, ann.frequency)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 sm:py-1.5 rounded-none bg-[#F4F2EC] hover:bg-[#0B1324] text-[#0B1324] hover:text-white font-bold text-xs border border-[#E7E3D9] transition-all shadow-2xs hover:shadow-xs active:scale-95"
                >
                  <span>{ann.ctaText || 'Learn More'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#C29A3E]" />
                </Link>
                <button
                  onClick={() => dismiss(ann.id, ann.frequency)}
                  className="text-[10px] font-semibold text-[#5B6474] hover:text-[#0B1324] uppercase tracking-wider cursor-pointer px-2 py-2.5 -my-2"
                >
                  Dismiss
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
