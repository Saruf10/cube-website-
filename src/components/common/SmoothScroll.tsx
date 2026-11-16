'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * Inertial "glide" scrolling for the public site (Lenis), plus a gentle
 * reveal for elements marked `data-reveal` as they enter the viewport.
 *
 * - Disabled entirely for users who prefer reduced motion.
 * - Pauses automatically while any dialog locks the page
 *   (anything that sets `document.body.style.overflow = 'hidden'`).
 * - Inner scroll areas (menus, modals, horizontal galleries) keep native
 *   scrolling via `allowNestedScroll`.
 */
export default function SmoothScroll() {
  const pathname = usePathname();

  // Always open the site at the top (the hero), instead of the browser
  // restoring the last scroll position on reload. Links to a #section still work.
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    if (!window.location.hash) window.scrollTo(0, 0);
  }, []);

  // Smooth scrolling
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.25,
      // easeOutExpo: quick response, long silky settle
      easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.4,
      anchors: { offset: -96 },
      allowNestedScroll: true,
      autoRaf: true,
    });
    window.__lenis = lenis;
    if (!window.location.hash) lenis.scrollTo(0, { immediate: true });

    // Pause while a modal / drawer has locked the body.
    const syncLock = () => {
      if (document.body.style.overflow === 'hidden') lenis.stop();
      else lenis.start();
    };
    const observer = new MutationObserver(syncLock);
    observer.observe(document.body, { attributes: true, attributeFilter: ['style'] });
    syncLock();

    return () => {
      observer.disconnect();
      lenis.destroy();
      if (window.__lenis === lenis) delete window.__lenis;
    };
  }, []);

  // Reveal-on-scroll for [data-reveal] elements
  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    root.classList.add('reveal-ready');

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.08 }
    );

    const observeAll = () =>
      document.querySelectorAll('[data-reveal]:not(.is-revealed)').forEach((el) => io.observe(el));
    observeAll();

    // Pick up content rendered after data loads.
    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
