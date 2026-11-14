'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { PRELOADER_EXIT_EVENT } from '@/components/common/CountUp';

/** Lets on-page animations (e.g. hero counters) start as the preloader lifts. */
function announceExit() {
  (window as any).__cubePreloaderDone = true;
  window.dispatchEvent(new Event(PRELOADER_EXIT_EVENT));
}

const SEEN_KEY = 'cube-preloaded';
const MIN_MS = 2300; // let the logo sequence play through once
const MAX_MS = 4000; // never hold the visitor longer than this
// Exit: content fades out, then COLUMNS strips rise left to right.
const COLUMNS = 5;
const COL_START_MS = 280;
const COL_STAGGER_MS = 70;
const COL_RISE_MS = 900; // must match .cube-preloader__col transition in globals.css
const EXIT_MS = COL_START_MS + (COLUMNS - 1) * COL_STAGGER_MS + COL_RISE_MS + 50;

const WORDS = ['Centre', 'for', 'Urbanization,', 'Buildings', '&', 'Environment'];

/**
 * Animated CUBE logo intro, shown once per browser session on the public site.
 * Sequence: a wireframe cube draws itself, the CUBE emblem settles over it,
 * the full name appears word by word, then the panel lifts away.
 * Rendered in the server HTML so it covers the page from the first paint;
 * an inline script hides it before paint on repeat visits in the same session.
 */
export default function Preloader() {
  const [phase, setPhase] = useState<'show' | 'exit' | 'done'>('show');

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === '1';
    } catch {}
    if (seen) {
      setPhase('done');
      return;
    }

    const root = document.documentElement;
    root.style.overflow = 'hidden';
    const start = performance.now();
    const timers: ReturnType<typeof setTimeout>[] = [];
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      const wait = Math.max(0, MIN_MS - (performance.now() - start));
      timers.push(
        setTimeout(() => {
          try {
            sessionStorage.setItem(SEEN_KEY, '1');
          } catch {}
          root.style.overflow = '';
          setPhase('exit');
          announceExit();
          timers.push(setTimeout(() => setPhase('done'), EXIT_MS));
        }, wait),
      );
    };

    if (document.readyState === 'complete') finish();
    else window.addEventListener('load', finish, { once: true });
    timers.push(setTimeout(finish, MAX_MS));

    return () => {
      window.removeEventListener('load', finish);
      timers.forEach(clearTimeout);
      root.style.overflow = '';
    };
  }, []);

  if (phase === 'done') return null;

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `try{if(sessionStorage.getItem('${SEEN_KEY}')==='1')document.documentElement.setAttribute('data-preloaded','')}catch(e){}`,
        }}
      />
      <div
        id="cube-preloader"
        role="status"
        aria-label="Loading CUBE"
        className={`cube-preloader fixed inset-0 z-[9999] ${phase === 'exit' ? 'is-exiting' : ''}`}
      >
        {/* Exit: the white screen splits into columns that rise one after another */}
        <div aria-hidden className="absolute inset-0 flex">
          {Array.from({ length: COLUMNS }, (_, i) => (
            <span
              key={i}
              className="cube-preloader__col relative -mr-px flex-1 bg-white"
              style={{ transitionDelay: `${COL_START_MS + i * COL_STAGGER_MS}ms` }}
            >
              <span className="absolute inset-x-0 bottom-0 h-[2px] bg-brass-400" />
            </span>
          ))}
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
        <div className="cube-preloader__content flex flex-col items-center px-6 text-center">
          {/* Emblem: wireframe draws in, then the real mark settles over it */}
          <div className="relative h-36 w-[120px] sm:h-44 sm:w-[147px]">
            <svg
              aria-hidden
              viewBox="0 0 120 144"
              className="cube-preloader__wire absolute inset-0 h-full w-full"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path className="cube-wire cube-wire--1" d="M60 10 L110 39 L110 105 L60 134 L10 105 L10 39 Z" stroke="#0B1324" strokeWidth="2" />
              <path className="cube-wire cube-wire--2" d="M10 39 L60 68 L110 39" stroke="#0B1324" strokeWidth="2" />
              <path className="cube-wire cube-wire--3" d="M60 68 L60 134" stroke="#C29A3E" strokeWidth="2" />
            </svg>
            <Image
              src="/images/branding/cube-3d-isometric-logo.png"
              alt="CUBE emblem"
              fill
              priority
              sizes="150px"
              className="cube-preloader__emblem object-contain"
            />
          </div>

          <p className="mt-7 max-w-[22rem] font-display text-[17px] sm:text-xl font-semibold leading-snug tracking-[-0.01em] text-ink">
            {WORDS.map((word, i) => (
              <span
                key={i}
                className="cube-preloader__word inline-block"
                style={{ animationDelay: `${1050 + i * 90}ms` }}
              >
                {word}
                {i < WORDS.length - 1 ? ' ' : ''}
              </span>
            ))}
          </p>

          <div className="cube-preloader__rule mt-5 h-px w-16 bg-brass-400" />

          <p className="cube-preloader__sub mt-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-stone-500">
            IIT Madras &middot; Govt of Tamil Nadu
          </p>
        </div>
        </div>
      </div>
    </>
  );
}
