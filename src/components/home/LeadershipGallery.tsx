'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from 'lucide-react';
import { Leader } from '@/types';
import SectionHeading from '@/components/home/SectionHeading';

const AUTOPLAY_MS = 5500;

interface Props {
  id?: string;
  sectionNumber?: string;
  members: Leader[];
  title: string;
  subtitle: string;
  tagline: string;
  ctaText: string;
  ctaHref: string;
}

/**
 * Portrait gallery: a large featured portrait with credentials, a timed
 * progress rule, and a filmstrip of the full board beneath.
 */
export default function LeadershipGallery({ id, sectionNumber, members, title, subtitle, tagline, ctaText, ctaHref }: Props) {
  const list = members.length ? members : [];
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const stripRef = useRef<HTMLDivElement>(null);
  const total = list.length;

  useEffect(() => {
    if (paused || total < 2) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % total), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [index, paused, total]);

  // Keep the active thumbnail in view inside the filmstrip (without scrolling the page).
  useEffect(() => {
    const strip = stripRef.current;
    const thumb = strip?.children[index] as HTMLElement | undefined;
    if (strip && thumb) {
      strip.scrollTo({ left: thumb.offsetLeft - strip.clientWidth / 2 + thumb.clientWidth / 2, behavior: 'smooth' });
    }
  }, [index]);

  if (!total) return null;
  const m = list[Math.min(index, total - 1)];
  const bio = ((m as { bio?: string }).bio || '').split(/\n\s*\n/)[0];
  const go = (d: number) => setIndex((i) => (i + d + total) % total);

  return (
    <section id={id} className="relative overflow-hidden bg-stone-100 py-24 sm:py-32 scroll-mt-32">
      <div aria-hidden className="absolute inset-0 blueprint-grid opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
      <div className="relative z-10 mx-auto max-w-none px-5 sm:px-8 lg:px-12">
        <SectionHeading
          index={sectionNumber}
          eyebrow={tagline}
          title={title}
          description={subtitle}
          action={
            <Link href={ctaHref} className="link-arrow">
              <span>{ctaText}</span>
              <ArrowUpRight className="h-4 w-4 text-brass-600" />
            </Link>
          }
        />

        <div
          data-reveal
          data-reveal-delay="1"
          className="mt-16 grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-16"
          onPointerEnter={(e) => e.pointerType === 'mouse' && setPaused(true)}
          onPointerLeave={(e) => e.pointerType === 'mouse' && setPaused(false)}
        >
          {/* Portrait */}
          <div className="lg:col-span-5">
            <div className="crop-marks relative mx-auto max-w-md lg:max-w-none">
              <div className="relative aspect-[4/5] overflow-hidden rounded-none bg-stone-200 shadow-premium-lg">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={`${m.name}-${index}`}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={m.image || '/images/leadership/about_leader.jpg'}
                      alt={m.name}
                      fill
                      sizes="(max-width: 1024px) 90vw, 40vw"
                      className="object-cover object-top"
                      priority={index === 0}
                    />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-950/60 to-transparent" />
                <div className="absolute bottom-5 left-5 font-display text-6xl font-semibold tabular-nums tracking-[-0.05em] text-white/90">
                  {String(index + 1).padStart(2, '0')}
                </div>
              </div>
            </div>
          </div>

          {/* Credentials */}
          <div className="flex flex-col justify-between lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${m.name}-${index}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="chip bg-ink text-white">{m.category || 'Board Member'}</span>
                <h3 className="display-xl mt-6 text-4xl sm:text-5xl lg:text-[3.6rem] text-ink">{m.name}</h3>
                <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1">
                  <span className="font-display text-lg font-semibold text-brass-600">{m.role}</span>
                  {m.organization && (
                    <>
                      <span className="h-4 w-px bg-stone-300" />
                      <span className="text-[15px] text-[#5B6474]">{m.organization}</span>
                    </>
                  )}
                </div>
                {bio && (
                  <blockquote className="mt-8 border-l-2 border-brass-400 pl-6 text-[15px] leading-relaxed text-[#5B6474] line-clamp-5">
                    {bio}
                  </blockquote>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="mt-10">
              <div className="relative h-px w-full bg-stone-300">
                <motion.div
                  key={`progress-${index}-${paused}`}
                  initial={{ width: '0%' }}
                  animate={{ width: paused ? '0%' : '100%' }}
                  transition={{ duration: paused ? 0 : AUTOPLAY_MS / 1000, ease: 'linear' }}
                  className="absolute inset-y-0 left-0 -top-px h-[3px] bg-brass-400"
                />
              </div>
              <div className="mt-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button onClick={() => go(-1)} aria-label="Previous member" className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/15 bg-white text-ink transition-all hover:border-ink hover:bg-ink hover:text-white">
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <button onClick={() => go(1)} aria-label="Next member" className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/15 bg-white text-ink transition-all hover:border-ink hover:bg-ink hover:text-white">
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setPaused((p) => !p)}
                    aria-label={paused ? 'Resume autoplay' : 'Pause autoplay'}
                    className="ml-1 flex h-12 w-12 items-center justify-center rounded-full text-ink/50 transition-colors hover:text-ink"
                  >
                    {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                  </button>
                </div>
                <span className="text-[11px] font-bold uppercase tabular-nums tracking-[0.2em] text-stone-500">
                  {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Filmstrip */}
        <div ref={stripRef} data-reveal data-reveal-delay="2" className="mt-14 flex gap-3 overflow-x-auto no-scrollbar pb-2 scroll-smooth">
          {list.map((p, i) => {
            const on = i === index;
            return (
              <button
                key={`${p.name}-${i}`}
                onClick={() => setIndex(i)}
                aria-label={`Show ${p.name}`}
                aria-current={on}
                className="group w-28 sm:w-32 shrink-0 text-left"
              >
                <div
                  className={`relative aspect-[4/5] overflow-hidden rounded-none bg-stone-200 ring-offset-2 ring-offset-stone-100 transition-all duration-300 ${
 on ? 'ring-2 ring-brass-400' : 'ring-0'
 }`}
                >
                  <Image
                    src={p.image || '/images/leadership/about_leader.jpg'}
                    alt=""
                    fill
                    sizes="128px"
                    className={`object-cover object-top transition-all duration-500 ${on ? '' : 'grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0'}`}
                  />
                </div>
                <div className={`mt-2 text-[11px] font-semibold leading-tight line-clamp-2 transition-colors ${on ? 'text-ink' : 'text-stone-400 group-hover:text-ink'}`}>
                  {p.name}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
