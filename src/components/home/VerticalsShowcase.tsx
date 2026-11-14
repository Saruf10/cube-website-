'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Plus } from 'lucide-react';
import { Vertical } from '@/types';

/**
 * Expanding panel gallery: one vertical is open at a time, the others
 * collapse into slim numbered spines (columns on desktop, rows on mobile).
 */
export default function VerticalsShowcase({ verticals }: { verticals: Vertical[] }) {
  const [active, setActive] = useState(0);
  // Desktop: the parent section is pinned and scrolling opens each vertical in turn.
  const [scrollDriven, setScrollDriven] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const lastStepRef = useRef(-1);
  const lastScrollRef = useRef(0);
  const lastPointerRef = useRef<{ x: number; y: number } | null>(null);
  const count = verticals.length;

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const sync = () => setScrollDriven(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (!scrollDriven || !count) return;
    lastStepRef.current = -1;
    const onScroll = () => {
      lastScrollRef.current = Date.now();
      const section = rootRef.current?.closest('section');
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const range = rect.height - window.innerHeight;
      if (range <= 0) return;
      const p = Math.min(1, Math.max(0, -rect.top / range));
      const step = Math.min(count - 1, Math.floor(p * count));
      // Only react when the scroll step changes, so a panel opened by hover stays open
      // until the visitor scrolls on to the next step.
      if (step !== lastStepRef.current) {
        lastStepRef.current = step;
        setActive(step);
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [scrollDriven, count]);

  // Clicking a collapsed vertical: on desktop scroll to its step, otherwise open it directly.
  const open = (i: number) => {
    const section = rootRef.current?.closest('section');
    if (!scrollDriven || !section) {
      setActive(i);
      return;
    }
    const range = section.offsetHeight - window.innerHeight;
    const top = section.getBoundingClientRect().top + window.scrollY;
    const y = top + ((i + 0.5) / count) * range;
    if (window.__lenis) window.__lenis.scrollTo(y, { duration: 1.1 });
    else window.scrollTo({ top: y, behavior: 'smooth' });
  };

  if (!count) return null;

  return (
    <div ref={rootRef} className="flex flex-col gap-3 lg:h-[clamp(360px,calc(100svh-22rem),620px)] lg:flex-row">
      {verticals.map((v, i) => {
        const isOpen = i === active;
        const capabilities = (v.capabilities || []).slice(0, 4);
        return (
          <div
            key={v.id || v.slug}
            onPointerMove={(e) => {
              // Real mouse movement only: ignore the synthetic pointer events the browser
              // fires while the page scrolls under a resting cursor, so scrolling keeps
              // advancing the panels even when the cursor sits over them.
              if (e.pointerType !== 'mouse' || active === i) return;
              const last = lastPointerRef.current;
              lastPointerRef.current = { x: e.clientX, y: e.clientY };
              if (last && last.x === e.clientX && last.y === e.clientY) return;
              if (Date.now() - lastScrollRef.current < 250) return;
              setActive(i);
            }}
            className={`group relative overflow-hidden rounded-none bg-ink transition-[flex-grow,height] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
 isOpen ? 'h-[560px] lg:h-auto lg:flex-[4.2]' : 'h-[92px] lg:h-auto lg:flex-[1]'
 }`}
          >
            <Image
              src={v.heroImage}
              alt={v.title}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className={`object-cover transition-all duration-[1.2s] ease-out ${
                isOpen ? 'scale-100 opacity-100' : 'scale-110 opacity-45 grayscale'
              }`}
            />
            <div
              className={`absolute inset-0 transition-opacity duration-700 ${
                isOpen
                  ? 'bg-gradient-to-t from-ink-950 via-ink-950/55 to-ink-950/10'
                  : 'bg-ink-950/75 group-hover:bg-ink-950/60'
              }`}
            />

            {/* Collapsed spine */}
            <button
              type="button"
              onClick={() => open(i)}
              aria-expanded={isOpen}
              aria-label={`Open ${v.title}`}
              className={`absolute inset-0 z-10 flex items-center justify-between px-6 text-left transition-opacity duration-300 lg:flex-col lg:items-center lg:justify-between lg:px-0 lg:py-8 ${
                isOpen ? 'pointer-events-none opacity-0' : 'opacity-100'
              }`}
            >
              <span className="text-[11px] font-bold tabular-nums text-brass-300">0{i + 1}</span>
              <span className="min-w-0 flex-1 truncate px-4 font-display text-lg font-semibold tracking-[-0.01em] text-white lg:flex-none lg:max-h-[400px] lg:px-0 lg:py-4 lg:[writing-mode:vertical-rl] lg:rotate-180 lg:text-[clamp(1.35rem,3vh,2rem)] lg:tracking-[-0.02em] [text-shadow:0_2px_12px_rgba(0,0,0,0.45)]">
                {v.shortTitle || v.title}
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-white">
                <Plus className="h-4 w-4" />
              </span>
            </button>

            {/* Open content */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.25, duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  className="absolute inset-0 z-20 flex flex-col justify-between p-6 sm:p-10 lg:p-[clamp(1.5rem,3.5vh,2.5rem)]"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <span className="font-display text-5xl sm:text-6xl font-semibold tabular-nums tracking-[-0.05em] text-white/90">
                        0{i + 1}
                      </span>
                      <span className="h-12 w-px bg-white/20" />
                      <span className="text-[10px] font-bold uppercase leading-relaxed tracking-[0.22em] text-white/60">
                        Engineering
                        <br />
                        Vertical
                      </span>
                    </div>
                    {v.projectCount ? (
                      <div className="text-right">
                        <div className="font-display text-3xl font-semibold tracking-[-0.03em] text-brass-300">
                          {v.projectCount}+
                        </div>
                        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">Projects</div>
                      </div>
                    ) : null}
                  </div>

                  <div className="grid grid-cols-1 gap-8 xl:grid-cols-12 xl:items-end">
                    <div className="xl:col-span-7">
                      <div className="eyebrow eyebrow-light line-clamp-1 lg:[@media(max-height:760px)]:hidden">{v.tagline}</div>
                      <h3 className="display-xl mt-4 text-3xl sm:text-5xl lg:text-[clamp(2.4rem,6.4vh,3.75rem)] text-white">{v.title}</h3>
                      <p className="mt-4 max-w-xl text-sm sm:text-[15px] lg:text-[clamp(0.95rem,2.1vh,1.0625rem)] leading-relaxed text-white/80 line-clamp-3">
                        {v.description}
                      </p>
                      <Link href={`/verticals/${v.slug}`} className="btn-brass mt-7">
                        <span>Explore {v.shortTitle || 'Vertical'}</span>
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </div>
                    {capabilities.length > 0 && (
                      <ul className="hidden sm:block border-t border-white/15 xl:col-span-5">
                        {capabilities.map((c, ci) => (
                          <li
                            key={c}
                            className="flex items-baseline gap-4 border-b border-white/15 py-3 text-[13px] text-white/80"
                          >
                            <span className="text-[10px] font-bold tabular-nums text-brass-300">
                              {String(ci + 1).padStart(2, '0')}
                            </span>
                            <span className="line-clamp-1">{c}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
