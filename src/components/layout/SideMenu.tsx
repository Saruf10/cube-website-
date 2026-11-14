'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, ChevronDown, X } from 'lucide-react';
import { navigationItems } from '@/data/navigation';

/**
 * Classic three-line menu on the right edge. It sits beside the existing
 * horizontal navigation (which is unchanged) and opens a side panel with the
 * same site pages.
 */
export default function SideMenu() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const pathname = usePathname();

  // Close whenever the page changes.
  useEffect(() => {
    setOpen(false);
    setExpanded(null);
  }, [pathname]);

  // Lock page scroll while open; Escape closes.
  useEffect(() => {
    if (!open) {
      document.body.style.overflow = '';
      return;
    }
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      {/* Three-line trigger, pinned to the right edge */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="side-menu"
        className="fixed right-0 top-1/2 z-[60] flex h-16 w-12 -translate-y-1/2 flex-col items-center justify-center gap-[6px] rounded-none bg-ink text-white shadow-[0_18px_40px_-14px_rgba(11,19,36,0.6)] transition-colors duration-300 hover:bg-ink-700"
      >
        <span
          className={`block h-[2px] w-5 bg-white transition-transform duration-300 ${
            open ? 'translate-y-[8px] rotate-45' : ''
          }`}
        />
        <span
          className={`block h-[2px] w-5 bg-brass-300 transition-opacity duration-300 ${open ? 'opacity-0' : ''}`}
        />
        <span
          className={`block h-[2px] w-5 bg-white transition-transform duration-300 ${
            open ? '-translate-y-[8px] -rotate-45' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="side-menu-backdrop"
              aria-hidden
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[62] bg-ink-950/40 backdrop-blur-[2px]"
            />
            <motion.aside
              key="side-menu-panel"
              id="side-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="fixed right-0 top-0 z-[65] flex h-[100dvh] w-[88vw] max-w-sm flex-col bg-white shadow-[-30px_0_60px_-30px_rgba(11,19,36,0.5)]"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-stone-200 px-6 py-5">
                <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-brass-600">Navigate</div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Links */}
              <nav className="flex-1 overflow-y-auto overscroll-contain px-4 py-4" aria-label="Site">
                <ul>
                  {navigationItems.map((item, i) => {
                    const hasChildren = Boolean(item.children && item.children.length > 0);
                    const isOpen = expanded === item.title;
                    const rowClass =
                      'group flex w-full items-center justify-between gap-4 rounded-none px-3 py-3.5 text-left text-[15px] font-semibold text-ink transition-colors hover:bg-stone-100';
                    return (
                      <li key={item.title} className="border-b border-stone-100 last:border-0">
                        {hasChildren ? (
                          <>
                            <button
                              type="button"
                              onClick={() => setExpanded(isOpen ? null : item.title)}
                              aria-expanded={isOpen}
                              className={rowClass}
                            >
                              <span className="flex items-center gap-3">
                                <span className="text-[11px] font-bold tabular-nums text-stone-400">
                                  {String(i + 1).padStart(2, '0')}
                                </span>
                                {item.title}
                              </span>
                              <ChevronDown
                                className={`h-4 w-4 text-stone-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-ink' : ''}`}
                              />
                            </button>
                            {isOpen && (
                              <ul className="pb-3 pl-12 pr-3">
                                <li>
                                  <Link href={item.href} className="block py-2 text-[13px] font-semibold text-brass-600 hover:text-ink">
                                    Overview
                                  </Link>
                                </li>
                                {item.children!.map((sub) => (
                                  <li key={sub.title}>
                                    <Link
                                      href={sub.href}
                                      className="block border-l-2 border-transparent py-2 pl-3 text-[13px] text-ink/70 transition-colors hover:border-brass-400 hover:text-ink"
                                    >
                                      {sub.title}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </>
                        ) : (
                          <Link href={item.href} className={rowClass}>
                            <span className="flex items-center gap-3">
                              <span className="text-[11px] font-bold tabular-nums text-stone-400">
                                {String(i + 1).padStart(2, '0')}
                              </span>
                              {item.title}
                              {item.badge && (
                                <span className="rounded-none bg-brass-100 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-brass-700">
                                  {item.badge}
                                </span>
                              )}
                            </span>
                            <ArrowUpRight className="h-4 w-4 text-stone-300 transition-colors group-hover:text-brass-600" />
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Footer */}
              <div className="border-t border-stone-200 p-6">
                <Link href="/contact" className="btn-primary w-full">
                  <span>Contact CUBE</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
