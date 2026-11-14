'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '@/components/home/SectionHeading';

interface StripItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  category: string;
  link: string;
}

// Projects shown on the original CUBE homepage (https://cubeiitm.org/), with their original titles.
const STRIP_ITEMS: StripItem[] = [
  {
    id: 's1',
    title: 'IIT Tirupati Permanent Campus',
    subtitle: 'Third Party Quality Assurance (TPQA)',
    image: '/images/hero/slides_iit-tirupathi.jpg',
    category: "Building and Construction",
    link: '/projects/iit-tirupathi',
  },
  {
    id: 's2',
    title: 'Chennai Tenement Re-evaluation',
    subtitle: 'Structural Vulnerability & Residual Life Assessment',
    image: '/images/hero/slides_revaluation.jpg',
    category: "Building and Construction",
    link: '/projects/reevaluation-scheme',
  },
  {
    id: 's3',
    title: 'Parayan Kuttai Water Body',
    subtitle: 'Surface Water Optimisation for Caterpillar India',
    image: '/images/hero/slides_07-cat.jpg',
    category: "Environment & Sustainability",
    link: '/projects/caterpillar',
  },
  {
    id: 's4',
    title: 'NICHE Industrial Park',
    subtitle: 'Smart Model Park, SIPCOT Irungattukottai',
    image: '/images/hero/slides_niche.jpg',
    category: "Urban Planning & Transportation",
    link: '/projects/upt6',
  },
  {
    id: 's5',
    title: 'Origins by Mahindra, Ponneri',
    subtitle: 'Relocation of Two Waterbodies',
    image: '/images/hero/slides_mahindra.jpg',
    category: "Environment & Sustainability",
    link: '/projects/mahindara',
  },
];

const COUNT = STRIP_ITEMS.length;

export default function CinematicImageStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Pinned (scroll-driven, one card per scroll step) unless the visitor prefers reduced motion.
  const [pinned, setPinned] = useState(true);
  const [index, setIndex] = useState(0);

  // Native horizontal scrolling state (reduced-motion fallback only).
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setPinned(!mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  // Horizontal offset that puts card `i` in place. The last card stops flush with the content edge.
  const measure = useCallback((i: number) => {
    const el = trackRef.current;
    if (!el) return 0;
    const cards = el.querySelectorAll<HTMLElement>('[data-card]');
    const first = cards[0];
    const last = cards[cards.length - 1];
    if (!first || !last || !cards[i]) return 0;
    const padRight = parseFloat(getComputedStyle(el).paddingRight) || 0;
    const maxX = Math.max(0, last.offsetLeft + last.offsetWidth - el.clientWidth + padRight);
    return Math.min(cards[i].offsetLeft - first.offsetLeft, maxX);
  }, []);

  // Map vertical scroll to the active card: each card gets one viewport-height of scroll.
  useEffect(() => {
    if (!pinned) return;
    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const range = section.offsetHeight - window.innerHeight;
      if (range <= 0) return;
      const scrolled = -section.getBoundingClientRect().top;
      const p = Math.min(1, Math.max(0, scrolled / range));
      setIndex(Math.min(COUNT - 1, Math.floor(p * COUNT)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [pinned]);

  // Slide the track to the active card.
  useEffect(() => {
    const apply = () => {
      const el = trackRef.current;
      if (!el) return;
      el.style.transform = pinned ? `translate3d(${-measure(index)}px,0,0)` : '';
    };
    apply();
    window.addEventListener('resize', apply);
    return () => window.removeEventListener('resize', apply);
  }, [index, pinned, measure]);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  }, []);

  useEffect(() => {
    if (pinned) return;
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [update, pinned]);

  const barProgress = pinned ? index / (COUNT - 1) : progress;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-x-clip bg-stone-50"
      style={pinned ? { height: `${(COUNT + 1) * 100}vh` } : undefined}
    >
      <div
        className={
          pinned
            ? 'sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden py-[clamp(1rem,4vh,3rem)]'
            : 'py-24 sm:py-32'
        }
      >
        <div className="mx-auto w-full max-w-none px-5 sm:px-8 lg:px-12">
          <SectionHeading
            index="01"
            eyebrow="Our Projects"
            title={
              <>
                Selected work across <span className="text-brass-300">public infrastructure.</span>
              </>
            }
          />
        </div>

        <div data-reveal data-reveal-delay="1">
          <div
            ref={trackRef}
            onScroll={pinned ? undefined : update}
            className={
              pinned
                ? 'relative mx-auto mt-[clamp(1.25rem,4vh,3.5rem)] flex max-w-none gap-6 px-5 transition-transform duration-[900ms] ease-out will-change-transform sm:px-8 lg:px-12'
                : 'mx-auto mt-14 flex max-w-none snap-x snap-mandatory gap-6 overflow-x-auto no-scrollbar scroll-smooth px-5 scroll-px-5 sm:px-8 sm:scroll-px-8 lg:px-12 lg:scroll-px-12'
            }
          >
            {STRIP_ITEMS.map((item, idx) => {
              const featured = idx === 0;
              return (
                <Link
                  key={item.id}
                  href={item.link}
                  data-card
                  className={`group shrink-0 snap-start focus:outline-none ${
                    'w-[86vw] sm:w-[620px] lg:w-[720px]'
                  }`}
                >
                  <div
                    className={`relative overflow-hidden bg-ink ${
                      pinned
                        ? 'h-[clamp(160px,calc(100svh-34rem),520px)] lg:h-[clamp(200px,calc(100svh-24rem),520px)]'
                        : 'aspect-[4/3] sm:aspect-auto sm:h-[460px]'
                    }`}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="720px"
                      className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-ink-950/0 transition-colors duration-500 group-hover:bg-ink-950/25" />
                    <span className="absolute left-5 top-5 chip-light">{item.category}</span>
                    <span className="absolute bottom-5 right-5 flex h-12 w-12 translate-y-2 items-center justify-center bg-brass-400 text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                  </div>
                  <div className="mt-5 flex gap-5 border-t border-stone-200 pt-5">
                    <span className="text-[11px] font-bold tabular-nums text-brass-600">{String(idx + 1).padStart(2, '0')}</span>
                    <div className="min-w-0">
                      <h3 className={`font-display font-semibold leading-snug tracking-[-0.02em] text-ink ${featured ? 'text-2xl' : 'text-lg'}`}>
                        {item.title}
                      </h3>
                      {item.subtitle && (
                        <p className="mt-1 text-[13px] text-stone-500 line-clamp-1">{item.subtitle}</p>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
            {!pinned && <div aria-hidden className="w-1 shrink-0" />}
          </div>
        </div>

        {/* Progress rule */}
        <div className="mx-auto mt-[clamp(1rem,3vh,2.5rem)] w-full max-w-none px-5 sm:px-8 lg:px-12">
          <div className="relative h-px w-full bg-stone-200">
            <div
              className="absolute -top-px left-0 h-[3px] bg-ink transition-[width] duration-200"
              style={{ width: `${Math.max(8, barProgress * 100)}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
