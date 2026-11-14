'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, MapPin, Pause, Play } from 'lucide-react';
import CountUp from '@/components/common/CountUp';

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

// Slides from the original CUBE homepage project slider (https://cubeiitm.org/):
// vertical, tagline and project title as published there.
const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    image: '/images/hero/slides_cpcl-arc.jpg',
    category: "Building & Construction",
    title: "Empowering Urban Housing, Enhancing Quality of",
    italicWord: "Life",
    subtitle: '',
    description: "Project Management Consultancy for Construction of Affordable Rental (Urban) Housing Complex (ARHC), Manali, Chennai, Tamil Nadu.",
    projectHref: '/projects/cpcl-arhc',
    projectName: "Project Management Consultancy for Construction of Affordable Rental (Urban) Housing Complex (ARHC), Manali, Chennai, Tamil Nadu.",
    location: "Manali, Chennai, Tamil Nadu",
  },
  {
    id: 2,
    image: '/images/hero/slides_iit-tirupathi.jpg',
    category: "Building & Construction",
    title: "Empowering Excellence Through Third Party Quality",
    italicWord: "Assurance",
    subtitle: '',
    description: "Third Party Quality Assurance (TPQA) Service for Construction of Permanent Campus for Indian Institute of Technology Tirupati, Andhra Pradesh.",
    projectHref: '/projects/iit-tirupathi',
    projectName: "Third Party Quality Assurance (TPQA) Service for Construction of Permanent Campus for Indian Institute of Technology Tirupati, Andhra Pradesh.",
    location: "Tirupati, Andhra Pradesh",
  },
  {
    id: 3,
    image: '/images/hero/slides_design-engineering-consultancy.jpg',
    category: "Building & Construction",
    title: "Housing for All, Building a Brighter",
    italicWord: "Future",
    subtitle: '',
    description: "Design, Engineering & Consultancy Services for Reconstruction of more than forty Housing for All schemes across Tamil Nadu under Pradhan Mantri Awas Yojana.",
    projectHref: '/projects/hfapmay',
    projectName: "Design, Engineering & Consultancy Services for Reconstruction of more than forty Housing for All schemes across Tamil Nadu under Pradhan Mantri Awas Yojana.",
    location: "Tamil Nadu",
  },
  {
    id: 4,
    image: '/images/hero/slides_revaluation.jpg',
    category: "Building & Construction",
    title: "Mapping Stability, Charting Vulnerability, Unlocking",
    italicWord: "Potential.",
    subtitle: '',
    description: "Re-evaluation of Structural Vulnerability, Destress Mapping & Residual Life Assessment of thirty-three dilapidated tenements across Chennai.",
    projectHref: '/projects/reevaluation-scheme',
    projectName: "Re-evaluation of Structural Vulnerability, Destress Mapping & Residual Life Assessment of thirty-three dilapidated tenements across Chennai.",
    location: "Chennai",
  },
  {
    id: 5,
    image: '/images/hero/slides_building-training-team.jpg',
    category: "Building & Construction",
    title: "Advancing Construction Solutions and Engineering",
    italicWord: "Excellence",
    subtitle: '',
    description: "Capacity Building Training Program in Best Construction Practices for High Rise Buildings for Engineers.",
    projectHref: '/projects/capacity-building-training-program',
    projectName: "Capacity Building Training Program in Best Construction Practices for High Rise Buildings for Engineers.",
    location: "",
  },
  {
    id: 6,
    image: '/images/hero/slides_ashiana.jpg',
    category: "Environment & Sustainability",
    title: "Unlocking the Potential of Surface Water Management with Technological",
    italicWord: "Ingenuity",
    subtitle: '',
    description: "Surface Water Management and Flood Inundation Study for the Ashiana Subham - Senior Living",
    projectHref: '/projects/ashiana',
    projectName: "Surface Water Management and Flood Inundation Study for the Ashiana Subham - Senior Living",
    location: "",
  },
  {
    id: 7,
    image: '/images/hero/slides_07-cat.jpg',
    category: "Environment & Sustainability",
    title: "Transforming Water Landscapes: Reshaping Hydrological",
    italicWord: "Balance",
    subtitle: '',
    description: "Feasibility Study on Identification of Alternate Location for Parayan Kuttai Water Body & Surface Water Optimization Plan for Caterpillar India Private Limited, Thiruvallur",
    projectHref: '/projects/caterpillar',
    projectName: "Feasibility Study on Identification of Alternate Location for Parayan Kuttai Water Body & Surface Water Optimization Plan for Caterpillar India Private Limited, Thiruvallur",
    location: "Thiruvallur",
  },
  {
    id: 8,
    image: '/images/hero/slides_mahindra.jpg',
    category: "Environment & Sustainability",
    title: "Nature's Engineering at Work: Conserving Water, Nurturing",
    italicWord: "Life",
    subtitle: '',
    description: "Feasibility Study on the Relocation of Two Waterbodies within the Origins - Mahindra World City, Ponneri, Tamil Nadu",
    projectHref: '/projects/mahindara',
    projectName: "Feasibility Study on the Relocation of Two Waterbodies within the Origins - Mahindra World City, Ponneri, Tamil Nadu",
    location: "Ponneri, Tamil Nadu",
  },
  {
    id: 9,
    image: '/images/hero/slides_slide2.jpg',
    category: "Environment & Sustainability",
    title: "Charting a Sustainable Course: Integrating Inundation Studies into Ecological Campus",
    italicWord: "Development",
    subtitle: '',
    description: "Surface Water Management Plan for IIT Jammu Campus",
    projectHref: '/projects/iit-jammu',
    projectName: "Surface Water Management Plan for IIT Jammu Campus",
    location: "IIT Jammu",
  },
  {
    id: 10,
    image: '/images/hero/slides_niche.jpg',
    category: "Urban Planning & Transportation",
    title: "Designing with Nature, Building for",
    italicWord: "Sustainability",
    subtitle: '',
    description: "NICHE Industrial Park, SIPCOT Irungattukottai",
    projectHref: '/projects/upt6',
    projectName: "NICHE Industrial Park, SIPCOT Irungattukottai",
    location: "SIPCOT Irungattukottai",
  },
  {
    id: 11,
    image: '/images/hero/slides_slide3.jpg',
    category: "Urban Planning & Transportation",
    title: "Honoring Legacy, Sustaining Cultural",
    italicWord: "Treasures",
    subtitle: '',
    description: "Engineering, Structural Assessment and Mitigation Strategies for Protection and Development of Naida Caves, Diu",
    projectHref: '/projects/upt2',
    projectName: "Engineering, Structural Assessment and Mitigation Strategies for Protection and Development of Naida Caves, Diu",
    location: "Diu",
  },
];

const SLIDE_MS = 7000;

// Every figure is published on the original site (cubeiitm.org, checked 2026-11):
// 2017: about.html "Established in May 2017 as a Centre of Excellence of Government
//       of Tamil Nadu in collaboration with IIT Madras"
// 40+:  homepage "more than forty Housing for All schemes across Tamil Nadu under PMAY"
// 04:   about.html "CUBE extends its services under four verticals"
// 80:   our-team.html lists 80 people (counted; the site gives no total)
const HERO_STATS = [
  { value: '2017', label: 'Centre of Excellence of Govt of Tamil Nadu with IIT Madras' },
  { value: '40+', label: 'Housing for All (PMAY) schemes across Tamil Nadu' },
  { value: '04', label: 'Service verticals' },
  { value: '80', label: 'Team members across our verticals' },
];

export default function ArchitecturalHero() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const slide = HERO_SLIDES[currentIdx];
  const videoRef = useRef<HTMLVideoElement>(null);
  // Paused by the visitor (button) or while they hover/focus the slide content.
  const [userPaused, setUserPaused] = useState(false);
  const [hoverPaused, setHoverPaused] = useState(false);
  const isPaused = userPaused || hoverPaused;
  // The 36 MB film is skipped on data-saver / very slow connections; the poster shows instead.
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setUserPaused(true);
    const conn = (navigator as any).connection;
    const constrained = conn && (conn.saveData || /(^|-)2g$/.test(conn.effectiveType || ''));
    setShowVideo(!constrained);
  }, []);

  // Keep the background video looping forever. `loop` alone is not enough in
  // practice: browsers pause muted autoplay video in background tabs, in
  // power-saving mode, or block the first autoplay; some ignore `loop` on large
  // non-streaming files. Restart on end, resume when visible, and retry on the
  // first user interaction if autoplay was blocked.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !showVideo) return;

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
  }, [showVideo]);

  // Restarts whenever the slide changes (auto or manual) or playback resumes,
  // so every slide gets the full interval and the progress bar stays in sync.
  useEffect(() => {
    if (isPaused) return;
    const timer = setTimeout(() => {
      setCurrentIdx((prev) => (prev + 1) % HERO_SLIDES.length);
    }, SLIDE_MS);
    return () => clearTimeout(timer);
  }, [currentIdx, isPaused]);

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
          poster="/images/hero/slides_cpcl-arc.jpg"
          src={showVideo ? '/videos/cube-hero.mp4' : undefined}
          disablePictureInPicture
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center contrast-[1.08] brightness-[0.8] saturate-[0.7]"
        />
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
            <span className="text-white/90">Centre for Urbanization, Buildings &amp; Environment</span>
            <span className="hidden sm:inline text-white/25">/</span>
            <span className="hidden sm:inline">IIT Madras &amp; Govt of Tamil Nadu</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-brass-400" />
            <span>IIT Madras Research Park, Chennai</span>
          </div>
        </div>
      </div>

      {/* Main stage */}
      <div
        className="relative z-10 mx-auto w-full max-w-none flex-1 px-5 sm:px-8 lg:px-12 flex items-center py-[clamp(1.5rem,4vh,3rem)]"
        onMouseEnter={() => setHoverPaused(true)}
        onMouseLeave={() => setHoverPaused(false)}
        onFocusCapture={() => setHoverPaused(true)}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHoverPaused(false);
        }}
      >
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
                className="display-xl mt-[clamp(1rem,2.4vh,1.75rem)] text-[clamp(1.9rem,7vw,3.25rem)] lg:text-[clamp(2.25rem,min(3.6vw,6.5vh),3.75rem)] lg:min-h-[2.2em] text-white"
              >
                {slide.title}{' '}
                <span className="font-editorial italic font-medium tracking-[-0.02em] text-brass-300">
                  {slide.italicWord}
                </span>
                {slide.subtitle ? <>{' '}{slide.subtitle}</> : null}
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
                  className="crop-marks group block rounded-none border border-white/15 bg-ink-950/55 p-5 lg:p-6 backdrop-blur-xl transition-colors hover:bg-ink-950/70"
                >
                  <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.24em] text-white/50">
                    <span>Featured Engagement</span>
                    <span className="tabular-nums">
                      {String(currentIdx + 1).padStart(2, '0')} / {String(HERO_SLIDES.length).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="mt-5 lg:mt-6 line-clamp-3 min-h-[4.1em] font-display text-lg lg:text-[clamp(1.05rem,2.4vh,1.25rem)] font-semibold leading-snug tracking-[-0.02em] text-white">
                    {slide.projectName}
                  </div>
                  {slide.location && (
                    <div className="mt-3 flex items-center gap-2 text-sm text-white/60">
                      <MapPin className="h-3.5 w-3.5 text-brass-400" />
                      {slide.location}
                    </div>
                  )}
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
        <div className="flex items-start gap-2 sm:gap-4">
          <button
            type="button"
            onClick={() => setUserPaused((p) => !p)}
            aria-label={userPaused ? 'Play slideshow' : 'Pause slideshow'}
            aria-pressed={userPaused}
            className="-mt-3 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-brass-400 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brass-400"
          >
            {userPaused ? <Play className="h-3 w-3" /> : <Pause className="h-3 w-3" />}
          </button>
          {HERO_SLIDES.map((item, idx) => {
            const active = idx === currentIdx;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentIdx(idx)}
                aria-label={`Go to slide ${idx + 1}: ${item.category}`}
                aria-current={active}
                className="group min-w-0 flex-1 text-left"
              >
                <div className="relative h-[2px] w-full overflow-hidden bg-white/15">
                  {active && isPaused && <div className="absolute inset-0 bg-brass-400/60" />}
                  {active && !isPaused && (
                    <motion.div
                      key={`bar-${currentIdx}`}
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: SLIDE_MS / 1000, ease: 'linear' }}
                      className="absolute inset-y-0 left-0 bg-brass-400"
                    />
                  )}
                </div>
                <div className="mt-3 hidden sm:flex items-baseline gap-3">
                  <span className={`text-[11px] font-bold tabular-nums ${active ? 'text-brass-300' : 'text-white/35'}`}>
                    {String(idx + 1).padStart(2, '0')}
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
                <CountUp value={stat.value} delay={i * 120} />
              </div>
              <div className="mt-1.5 text-[11px] sm:text-xs leading-snug text-white/50">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
