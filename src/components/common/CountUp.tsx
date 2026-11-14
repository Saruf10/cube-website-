'use client';

import React, { useEffect, useRef, useState } from 'react';

/** Fired by the Preloader as it starts to lift (see Preloader.tsx). */
export const PRELOADER_EXIT_EVENT = 'cube:preloader-exit';

function preloaderGone(): boolean {
  const root = document.documentElement;
  return (
    root.hasAttribute('data-preloaded') ||
    !document.getElementById('cube-preloader') ||
    (window as any).__cubePreloaderDone === true
  );
}

interface CountUpProps {
  /** Final display value, e.g. "2017", "40+", "04". Leading zeros and a suffix are kept. */
  value: string;
  /** Delay before counting starts once visible, in ms. */
  delay?: number;
  duration?: number;
  className?: string;
}

/**
 * Counts a number up when it scrolls into view. Years count up from the start
 * of their century (2000 -> 2017) rather than from zero. Screen readers and
 * search engines get the final value; the moving digits are aria-hidden.
 */
export default function CountUp({ value, delay = 0, duration = 1800, className }: CountUpProps) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : '';
  const width = match ? match[1].length : 0;
  const isYear = target >= 1900 && target <= 2100;
  const from = isYear ? Math.floor(target / 100) * 100 : 0;

  const [current, setCurrent] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !match) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCurrent(target);
      return;
    }

    let raf = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let started = false;
    let inView = false;
    let ready = preloaderGone();

    const run = () => {
      if (started || !inView || !ready) return;
      started = true;
      timer = setTimeout(() => {
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / duration);
          const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p); // ease-out expo
          setCurrent(Math.round(from + (target - from) * eased));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      }, delay);
    };

    const onPreloaderExit = () => {
      ready = true;
      run();
    };
    const fallback = setTimeout(onPreloaderExit, 5000); // never wait forever

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          inView = true;
          run();
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    window.addEventListener(PRELOADER_EXIT_EVENT, onPreloaderExit);

    return () => {
      io.disconnect();
      window.removeEventListener(PRELOADER_EXIT_EVENT, onPreloaderExit);
      clearTimeout(fallback);
      if (timer) clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, delay, duration]);

  if (!match) return <span className={className}>{value}</span>;

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{value}</span>
      <span aria-hidden className="tabular-nums">
        {String(current).padStart(width, '0')}
        {suffix}
      </span>
    </span>
  );
}
