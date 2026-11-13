'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, MapPin } from 'lucide-react';

interface HeroSlide {
  id: number;
  image: string;
  category: string;
  title: string;
  italicWord: string;
  subtitle: string;
  description: string;
  projectHref: string;
  projectName: string;
  location: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    image: '/images/hero/slides_iit-tirupathi.jpg',
    category: 'Institutional Campus PMC',
    title: 'Engineering Ideas.',
    italicWord: 'Shaping',
    subtitle: 'Tomorrow.',
    description: 'Translating advanced structural modeling, soil mechanics, and sustainable hydrology from IIT Madras into high-performance public infrastructure.',
    projectHref: '/projects/iit-tirupathi',
    projectName: 'IIT Tirupati Permanent Campus',
    location: 'Andhra Pradesh & IIT Madras',
  },
  {
    id: 2,
    image: '/images/hero/slides_cpcl-arc.jpg',
    category: 'Third Party Quality Assurance',
    title: 'Precision Quality.',
    italicWord: 'Resilient',
    subtitle: 'Housing.',
    description: 'Independent Third Party Quality Assurance (TPQA), precast structural design verification, and concrete durability testing ensuring multi-generational safety.',
    projectHref: '/projects/cpcl-arhc',
    projectName: 'CPCL Industrial & ARHC Precast Housing',
    location: 'Tamil Nadu & Chennai',
  },
  {
    id: 3,
    image: '/images/hero/slides_ashiana.jpg',
    category: 'Housing Proof Checking',
    title: 'Structural Assurance.',
    italicWord: 'Community',
    subtitle: 'Impact.',
    description: 'Providing comprehensive structural design, foundation analysis, and third-party engineering consultancy for affordable housing schemes across Tamil Nadu.',
    projectHref: '/projects',
    projectName: 'Pradhan Mantri Awas Yojana (PMAY TN)',
    location: 'Statewide Tamil Nadu',
  },
  {
    id: 4,
    image: '/images/hero/slides_design-engineering-consultancy.jpg',
    category: 'Applied Research Translation',
    title: 'Academic Intellect.',
    italicWord: 'Public',
    subtitle: 'Governance.',
    description: 'Bridging world-renowned civil engineering faculty with municipal field execution across smart cities, water resources, and transport networks.',
    projectHref: '/about',
    projectName: 'Government of Tamil Nadu & IIT Madras',
    location: 'IIT Madras Research Park',
  },
];

const SLIDE_MS = 7000;

const HERO_STATS = [
  { value: '2017', label: 'Established as a Centre of Excellence' },
  { value: '40+', label: 'Public schemes assured & engineered' },
  { value: '04', label: 'Core engineering verticals' },
  { value: '80+', label: 'Engineers, researchers & specialists' },
];

export default function ArchitecturalHero() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const slide = HERO_SLIDES[currentIdx];
  const videoRef = useRef<HTMLVideoElement>(null);

  // Keep the background video looping forever. `loop` alone is not enough in
  // practice: browsers pause muted autoplay video in background tabs, in
  // power-saving mode, or block the first autoplay; some ignore `loop` on large
  // non-streaming files. Restart on end, resume when visible, and retry on the
  // first user interaction if autoplay was blocked.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const play = () => video.play().catch(() => {});
    const onEnded = () => {
      video.currentTime = 0;
      play();
    };
    const onVisible = () => {
      if (document.visibilityState === 'visible' && video.paused) play();
    };
    // Only needed until playback has started once (autoplay blocked).
    const retryOnInteraction = () => {
      if (video.paused) play();
    };
    const stopRetrying = () => {
      window.removeEventListener('pointerdown', retryOnInteraction);
      window.removeEventListener('touchstart', retryOnInteraction);
      window.removeEventListener('scroll', retryOnInteraction);
    };

    video.addEventListener('ended', onEnded);
    video.addEventListener('playing', stopRetrying, { once: true });
    document.addEventListener('visibilitychange', onVisible);
    window.addEventListener('pointerdown', retryOnInteraction, { passive: true });
    window.addEventListener('touchstart', retryOnInteraction, { passive: true });
    window.addEventListener('scroll', retryOnInteraction, { passive: true });
    play();

    return () => {
      video.removeEventListener('ended', onEnded);
      video.removeEventListener('playing', stopRetrying);
      document.removeEventListener('visibilitychange', onVisible);
      stopRetrying();
    };
  }, []);

  // Restarts whenever the slide changes (auto or manual), so every slide gets
  // the full interval and the progress bar stays in sync.
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIdx((prev) => (prev + 1) % HERO_SLIDES.length);
    }, SLIDE_MS);
    return () => clearTimeout(timer);
  }, [currentIdx]);

  return (
    <section className="relative w-full min-h-[100svh] bg-ink-950 text-white pt-[5.5rem] sm:pt-28 lg:pt-[7rem] flex flex-col overflow-hidden select-none">
      {/* Background: looping video under a directional ink wash */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          disablePictureInPicture
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center contrast-[1.08] brightness-[0.8] saturate-[0.7]"
        >
          <source src="/videos/cube-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/85 to-ink-950/65" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/70" />
        <div
          aria-hidden
          className="absolute inset-0 blueprint-grid-dark opacity-70 [mask-image:radial-gradient(ellipse_at_30%_50%,black_20%,transparent_75%)]"
        />
        <div className="absolute -left-40 top-1/3 h-[520px] w-[520px] rounded-full bg-brass-500/10 blur-[140px]" />
      </div>

      {/* Institutional metadata rail */}
      <div className="relative z-10 mx-auto w-full max-w-none px-5 sm:px-8 lg:px-12">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/55">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brass-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brass-400" />
            </span>
            <span className="text-white/90">Centre of Excellence</span>
            <span className="hidden sm:inline text-white/25">/</span>
            <span className="hidden sm:inline">Govt of Tamil Nadu &amp; IIT Madras</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-brass-400" />
            <span>IIT Madras Research Park, Chennai</span>
          </div>
        </div>
      </div>

      {/* Main stage */}
      <div className="relative z-10 mx-auto w-full max-w-none flex-1 px-5 sm:px-8 lg:px-12 flex items-center py-[clamp(1.5rem,4vh,3rem)]">
        <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 lg:items-end">
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={`cat-${slide.id}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
                className="eyebrow eyebrow-light"
              >
                {slide.category}
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.h1
                key={`headline-${slide.id}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="display-xl mt-[clamp(1rem,2.4vh,1.75rem)] text-[clamp(2.1rem,8.5vw,4rem)] lg:text-[clamp(2.75rem,min(4.9vw,8.5vh),4.8rem)] text-white"
              >
                <span className="block lg:whitespace-nowrap">{slide.title}</span>
                <span className="block lg:whitespace-nowrap">
                  <span className="font-editorial italic font-medium tracking-[-0.02em] text-brass-300">
                    {slide.italicWord}
                  </span>{' '}
                  {slide.subtitle}
                </span>
              </motion.h1>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.p
                key={`desc-${slide.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-[clamp(1rem,2.6vh,1.75rem)] max-w-[40rem] text-[15px] sm:text-base lg:text-[clamp(0.95rem,2.1vh,1.125rem)] leading-relaxed text-white/70 lg:min-h-[4.9em]"
              >
                {slide.description}
              </motion.p>
            </AnimatePresence>

            <div className="mt-[clamp(1.5rem,4vh,2.5rem)] flex flex-wrap items-center gap-4">
              <Link href="/projects" className="btn-brass">
                <span>Explore Our Projects</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link href="/about" className="btn-outline-light">
                <span>About Us</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Featured project plate */}
          <div className="hidden lg:col-span-4 lg:block">
            <AnimatePresence mode="wait">
              <motion.div
                key={`plate-${slide.id}`}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={slide.projectHref}
                  className="crop-marks group block rounded-lg border border-white/15 bg-ink-950/55 p-5 lg:p-6 backdrop-blur-xl transition-colors hover:bg-ink-950/70"
                >
                  <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.24em] text-white/50">
                    <span>Featured Engagement</span>
                    <span className="tabular-nums">
                      {String(currentIdx + 1).padStart(2, '0')} / {String(HERO_SLIDES.length).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="mt-5 lg:mt-6 min-h-[2.75em] font-display text-xl lg:text-[clamp(1.25rem,2.8vh,1.5rem)] font-semibold leading-snug tracking-[-0.02em] text-white">
                    {slide.projectName}
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-sm text-white/60">
                    <MapPin className="h-3.5 w-3.5 text-brass-400" />
                    {slide.location}
                  </div>
                  <div className="mt-5 lg:mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-brass-300">
                    <span>View Engagement</span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-brass-400/40 transition-all group-hover:bg-brass-400 group-hover:text-ink">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Slide navigator: timed progress segments */}
      <div className="relative z-10 mx-auto w-full max-w-none px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-4 gap-3 sm:gap-6">
          {HERO_SLIDES.map((item, idx) => {
            const active = idx === currentIdx;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentIdx(idx)}
                aria-label={`Go to slide ${idx + 1}: ${item.category}`}
                aria-current={active}
                className="group text-left"
              >
                <div className="relative h-[2px] w-full overflow-hidden bg-white/15">
                  {active && (
                    <motion.div
                      key={`bar-${currentIdx}`}
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: SLIDE_MS / 1000, ease: 'linear' }}
                      className="absolute inset-y-0 left-0 bg-brass-400"
                    />
                  )}
                </div>
                <div className="mt-3 flex items-baseline gap-3">
                  <span className={`text-[11px] font-bold tabular-nums ${active ? 'text-brass-300' : 'text-white/35'}`}>
                    0{idx + 1}
                  </span>
                  <span
                    className={`hidden sm:block truncate text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors ${
                      active ? 'text-white' : 'text-white/40 group-hover:text-white/70'
                    }`}
                  >
                    {item.category}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Credentials band */}
      <div className="relative z-10 mt-[clamp(1.25rem,3vh,2rem)] border-t border-white/10 bg-ink-950/60 backdrop-blur-md">
        <div className="mx-auto grid w-full max-w-none grid-cols-2 lg:grid-cols-4">
          {HERO_STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`px-5 py-[clamp(0.85rem,2.2vh,1.5rem)] sm:px-8 2xl:px-12 ${i % 2 === 1 ? 'border-l border-white/10' : ''} ${
                i >= 2 ? 'border-t border-white/10 lg:border-t-0' : ''
              } ${i === 2 ? 'lg:border-l' : ''}`}
            >
              <div className="font-display text-2xl sm:text-3xl lg:text-[clamp(1.5rem,3.8vh,2.25rem)] font-semibold tracking-[-0.03em] text-white">
                {stat.value}
              </div>
              <div className="mt-1.5 text-[11px] sm:text-xs leading-snug text-white/50">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
