'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Leaf, Droplets, Recycle, Wind, ArrowUpRight } from 'lucide-react';
import SectionHeading from '@/components/home/SectionHeading';

const SUSTAINABILITY_PILLARS = [
  {
    id: 'water-management',
    title: 'Water & Wastewater Engineering',
    category: 'CEL Facility & IIT Madras',
    metric: 'CEL',
    metricLabel: 'Co-located Environmental Laboratory',
    description: 'Analytical testing, effluent characterization, tertiary water reuse validation, and CETP/STP process optimization for municipal bodies and industrial clusters across South India.',
    icon: Droplets,
    image: '/images/projects/environment-sustainability/cmwssb_01.jpg',
    href: '/cel',
  },
  {
    id: 'circular-economy',
    title: 'Construction & Solid Waste Valorization',
    category: 'Circular Engineering',
    metric: 'Solid Waste',
    metricLabel: 'Testing & Analysis at CEL',
    description: 'Characterization of Construction and Demolition (C&D) waste, fly ash, slag, and quarry dust as structural raw materials, validating sustainable precast concrete alternatives.',
    icon: Recycle,
    image: '/images/projects/environment-sustainability/about_environment.jpg',
    href: '/verticals/environment-sustainability',
  },
  {
    id: 'low-carbon',
    title: 'Low-Carbon Precast Housing',
    category: 'Affordable Sustainable Homes',
    metric: '40+',
    metricLabel: 'Housing for All Schemes',
    description: 'Independent engineering proof checking for mass affordable housing schemes (PMAY/ARHC) evaluating precast EPS sandwich panels, monolithic concrete, and light-gauge steel.',
    icon: Leaf,
    image: '/images/projects/building-construction/hfapmay_01.jpg',
    href: '/projects',
  },
  {
    id: 'urban-heat',
    title: 'Climate-Resilient Urban Mobility',
    category: 'Smart Infrastructure',
    metric: '4 Verticals',
    metricLabel: 'Integrated Interdisciplinary Audits',
    description: 'Urban microclimate mitigation, storm drainage flow modeling, and multi-modal transit planning guiding municipal authorities toward resilient zero-emission infrastructure.',
    icon: Wind,
    image: '/images/projects/urban-planning/images_upt.jpg',
    href: '/verticals/urban-planning-transportation',
  },
];

export default function SustainabilityStorytelling() {
  const [active, setActive] = useState(0);
  const current = SUSTAINABILITY_PILLARS[active];

  return (
    <section className="grain relative overflow-hidden bg-ink py-24 sm:py-32 lg:flex lg:min-h-[100svh] lg:flex-col lg:justify-center lg:[&>*:not(.absolute)]:w-full text-white">
      <div aria-hidden className="absolute inset-0 blueprint-grid-dark opacity-60" />
      <div aria-hidden className="absolute -right-40 top-0 h-[600px] w-[600px] rounded-full bg-brass-500/10 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-none px-5 sm:px-8 lg:px-12">
        <SectionHeading
          index="06"
          tone="dark"
          eyebrow="Environmental Stewardship"
          title={
            <>
              Sustainability &amp;{' '}
              <span className="font-editorial italic font-medium tracking-[-0.02em] text-brass-300">ecological</span>{' '}
              engineering.
            </>
          }
          description="Translating advanced civil and environmental research from IIT Madras into verified low-carbon infrastructure, zero-effluent water reuse, and climate-resilient urbanization."
          action={
            <Link href="/verticals/environment-sustainability" className="btn-outline-light">
              <span>Environmental Vertical</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          }
        />

        <div data-reveal data-reveal-delay="1" className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Pillar index */}
          <div className="lg:col-span-5">
            <ul className="border-t border-white/10">
              {SUSTAINABILITY_PILLARS.map((pillar, i) => {
                const Icon = pillar.icon;
                const isActive = i === active;
                return (
                  <li key={pillar.id} className="border-b border-white/10">
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      onPointerEnter={(e) => e.pointerType === 'mouse' && setActive(i)}
                      aria-pressed={isActive}
                      className="group relative flex w-full items-center gap-5 py-6 text-left"
                    >
                      <span
                        aria-hidden
                        className={`absolute left-0 top-0 h-px bg-brass-400 transition-all duration-500 ${isActive ? 'w-full' : 'w-0'}`}
                      />
                      <span className={`text-[11px] font-bold tabular-nums ${isActive ? 'text-brass-300' : 'text-white/30'}`}>
                        0{i + 1}
                      </span>
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                          isActive ? 'border-brass-400 bg-brass-400 text-ink' : 'border-white/15 text-white/60 group-hover:text-white'
                        }`}
                      >
                        <Icon className="h-[18px] w-[18px]" />
                      </span>
                      <span className="flex-1">
                        <span className={`block font-display text-lg sm:text-xl font-semibold tracking-[-0.015em] transition-colors ${isActive ? 'text-white' : 'text-white/55 group-hover:text-white/85'}`}>
                          {pillar.title}
                        </span>
                        <span className="mt-1 block text-[11px] font-semibold uppercase tracking-[0.18em] text-white/35">
                          {pillar.category}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Active pillar feature */}
          <div className="lg:col-span-7">
            <div key={current.id} className="animate-fade-in overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <Image src={current.image} alt={current.title} fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-6">
                  <div>
                    <div className="font-display text-4xl sm:text-5xl font-semibold tracking-[-0.03em] text-white">{current.metric}</div>
                    <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-brass-300">{current.metricLabel}</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-6 p-6 sm:p-8 sm:flex-row sm:items-end sm:justify-between">
                <p className="max-w-lg text-[15px] leading-relaxed text-white/70">{current.description}</p>
                <Link href={current.href} className="link-arrow !text-brass-300 hover:!text-white shrink-0">
                  <span>Verification Methodology</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
