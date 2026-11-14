'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '@/components/home/SectionHeading';
import CountUp from '@/components/common/CountUp';

// Every figure is published on (or counted from) the original site, cubeiitm.org, checked 2026-11:
// 55   projects.html lists 55 project cards (counted)
// 33   projects.html "Structural Assessment & Re-evaluation of several tenemental schemes (Phase I, II & III) - 33 Schemes"
// 645  projects.html "flood inundation maps for a site area of 645 acres"
// 25   advisory-panel.html lists 25 IIT Madras faculty (counted)
// 6    homepage "adequacy audit of existing liquid waste management facilities at 6 healthcare facilities in Tamil Nadu"
// 114  projects.html "Quality Audit for the construction of 114 No. Super HIG Flats at SAF Games village, Koyambedu"
const FIGURES = [
  { value: '55', unit: '', tag: 'Portfolio', label: 'Projects delivered and ongoing across our verticals', href: '/projects', cta: 'All projects' },
  { value: '33', unit: '', tag: 'Housing', label: 'Tenement schemes structurally re-evaluated in Chennai', href: '/projects/reevaluation-scheme', cta: 'View project' },
  { value: '645', unit: 'acres', tag: 'Water', label: 'Mapped for flood inundation in a single study', href: '/projects/upt10', cta: 'View project' },
  { value: '25', unit: '', tag: 'Advisory', label: 'IIT Madras faculty on our advisory panel', href: '/about/advisory-panel', cta: 'Meet the panel' },
  { value: '6', unit: '', tag: 'Health', label: 'Healthcare facilities audited for liquid waste management', href: '/media/news', cta: 'Read news' },
  { value: '114', unit: '', tag: 'Quality', label: 'Super HIG flats quality-audited at SAF Games Village', href: '/projects/saf', cta: 'View project' },
];

// The row is rendered COPIES times and slides by one copy's width, so the loop
// is seamless even on very wide screens.
const COPIES = 3;

function ImpactCard({ f, i, hidden }: { f: (typeof FIGURES)[number]; i: number; hidden: boolean }) {
  const featured = i === 0;
  return (
    <Link
      href={f.href}
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
      className={`group relative flex h-[19rem] w-[17.5rem] shrink-0 flex-col overflow-hidden border p-7 transition-colors duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-brass-400 sm:w-[20rem] lg:h-[21rem] lg:w-[22rem] lg:p-8 ${
        featured ? 'border-brass-400/40 bg-ink-950' : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]'
      }`}
    >
      {featured && (
        <>
          <Image
            src="/images/hero/slides_cpcl-arc.jpg"
            alt=""
            fill
            sizes="352px"
            className="object-cover opacity-30 transition-all duration-[1.2s] ease-out group-hover:scale-105 group-hover:opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/70 to-ink-950/30" />
        </>
      )}

      {/* Gold rule sweeps across the top on hover */}
      <span
        aria-hidden
        className={`absolute inset-x-0 top-0 h-[2px] origin-left bg-brass-400 transition-transform duration-500 ease-out ${
          featured ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
        }`}
      />

      <div className="relative flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.24em]">
        <span className={featured ? 'text-brass-300' : 'text-white/45'}>{f.tag}</span>
        <span className="tabular-nums text-white/30">{String(i + 1).padStart(2, '0')}</span>
      </div>

      <div className="relative mt-auto pt-10">
        <div className="flex items-baseline gap-3">
          <CountUp
            value={f.value}
            delay={i * 100}
            className="font-display text-6xl font-semibold leading-none tracking-[-0.04em] text-white lg:text-7xl"
          />
          {f.unit && <span className="font-editorial text-2xl italic text-brass-300">{f.unit}</span>}
        </div>
        <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">{f.label}</p>
      </div>

      <div className="relative mt-7 flex items-center justify-between border-t border-white/10 pt-4 text-[11px] font-semibold uppercase tracking-[0.18em]">
        <span className="text-white/50 transition-colors group-hover:text-brass-300">{f.cta}</span>
        <ArrowUpRight className="h-4 w-4 text-white/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brass-300" />
      </div>
    </Link>
  );
}

export default function ImpactNumbers() {
  return (
    <section className="grain relative overflow-hidden bg-ink py-24 text-white sm:py-32 lg:flex lg:min-h-[100svh] lg:flex-col lg:justify-center lg:[&>*:not(.absolute)]:w-full">
      <style>{`
        @keyframes impact-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-100% / ${COPIES})); }
        }
        .impact-track {
          animation: impact-marquee 48s linear infinite;
        }
        .impact-marquee:hover .impact-track,
        .impact-marquee:focus-within .impact-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .impact-track { animation: none; }
          .impact-marquee { overflow-x: auto; }
        }
      `}</style>

      <div aria-hidden className="absolute inset-0 blueprint-grid-dark opacity-60" />
      <div aria-hidden className="absolute -right-40 top-1/4 h-[520px] w-[520px] rounded-full bg-brass-500/10 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-none px-5 sm:px-8 lg:px-12">
        <SectionHeading
          tone="dark"
          eyebrow="Impact in Numbers"
          title={
            <>
              Measured work, <span className="text-brass-300">on the ground.</span>
            </>
          }
          description="Figures from CUBE's own project records across housing, water and urban infrastructure in Tamil Nadu and beyond."
        />
      </div>

      {/* Continuous card ticker: full-bleed, edges fade out, pauses on hover/focus */}
      <div
        data-reveal
        data-reveal-delay="1"
        className="impact-marquee relative z-10 mt-16 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
      >
        <div className="impact-track flex w-max">
          {Array.from({ length: COPIES }, (_, copy) => (
            <div key={copy} className="flex shrink-0 gap-5 pr-5">
              {FIGURES.map((f, i) => (
                <ImpactCard key={`${copy}-${f.label}`} f={f} i={i} hidden={copy > 0} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
