'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ShieldCheck, FlaskConical, ArrowUpRight } from 'lucide-react';
import { aboutContent } from '@/data/about';

const PILLARS = [
  {
    icon: ShieldCheck,
    title: 'Independent TPQA & Durability',
    body: 'Third-party audits, non-destructive testing (NDT), and concrete durability verification for mega public housing schemes.',
    link: 'Explore TPQA Standards',
    href: '/verticals/building-construction',
  },
  {
    icon: FlaskConical,
    title: 'Applied Academic Translation',
    body: 'Direct access to IIT Madras civil engineering faculty, advanced computational tools, and state environmental laboratories.',
    link: 'Faculty Advisory Panel',
    href: '/about/advisory-panel',
  },
];

export default function Interactive3DAbout() {
  const cardRef = useRef<HTMLDivElement>(null);

  // Gentle 3D tilt that follows the pointer
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-6, 6]);
  const floatingOffset = useTransform(smoothMouseY, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-32 select-none">
      <div aria-hidden className="absolute inset-y-0 right-0 w-1/2 blueprint-grid opacity-60 [mask-image:linear-gradient(to_left,black,transparent)]" />

      <div className="relative z-10 mx-auto max-w-none px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-20">
          {/* Imagery stage */}
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative lg:col-span-5 [perspective:1200px]"
          >
            <motion.div style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }} className="relative">
              <div className="crop-marks relative">
                <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-ink shadow-premium-lg">
                  <Image
                    src="/images/about/about_about.jpg"
                    alt="CUBE at IIT Madras Research Park"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-brass-300">
                      Headquarters &middot; Chennai
                    </div>
                    <div className="mt-2 max-w-xs font-display text-lg font-semibold leading-snug">
                      First Floor, IIT Madras Research Park, Taramani
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating secondary photograph */}
              <motion.div
                style={{ translateZ: 60, y: floatingOffset }}
                className="absolute -bottom-10 -right-4 hidden w-[58%] overflow-hidden rounded-lg border-[6px] border-white bg-white shadow-premium-lg sm:block lg:-right-12"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src="/images/hero/slides_building-training-team.jpg"
                    alt="IIT Madras Applied Capacity Building"
                    fill
                    sizes="300px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-[11px] font-semibold text-white">
                    IIT Madras Faculty &amp; Research Engineers
                  </div>
                </div>
              </motion.div>

              {/* Emblem plate */}
              <motion.div
                style={{ translateZ: 80 }}
                className="absolute -left-4 -top-6 z-10 flex items-center gap-3 rounded-lg border border-stone-200 bg-white/95 p-3 pr-5 shadow-premium-lg backdrop-blur"
              >
                <div className="relative h-11 w-11 shrink-0">
                  <Image src="/images/branding/cube-primary-logo.png" alt="CUBE Emblem" fill sizes="44px" className="object-contain" />
                </div>
                <div>
                  <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-brass-600">Established 2017</div>
                  <div className="font-display text-xs font-bold text-ink">IIT Madras &middot; Govt of TN</div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Narrative */}
          <div className="lg:col-span-7" data-reveal data-reveal-delay="1">
            <div className="flex items-center gap-4">
              <span className="section-index">02</span>
              <span className="eyebrow">Foundational Mandate</span>
            </div>

            <h2 className="display-h2 mt-6 !text-[2.4rem] sm:!text-6xl lg:!text-[4.2rem]">
              Research. Engineering.
              <br />
              <span className="font-editorial italic font-medium tracking-[-0.02em] text-brass-600">
                A resilient future.
              </span>
            </h2>

            <p className="lead mt-8 max-w-2xl">
              {aboutContent.overview[0]} {aboutContent.overview[1]}
            </p>

            <div className="mt-12 grid grid-cols-1 border-t border-stone-200 sm:grid-cols-2">
              {PILLARS.map((pillar, i) => {
                const Icon = pillar.icon;
                return (
                  <Link
                    key={pillar.title}
                    href={pillar.href}
                    className={`group relative block py-8 transition-colors sm:px-8 ${
                      i === 0 ? 'sm:pl-0' : 'border-t border-stone-200 sm:border-l sm:border-t-0 sm:pr-0'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-stone-100 text-ink transition-colors group-hover:bg-ink group-hover:text-brass-300">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="text-[11px] font-bold tabular-nums text-stone-400">0{i + 1}</span>
                    </div>
                    <h3 className="mt-6 font-display text-lg font-semibold tracking-[-0.01em] text-ink">{pillar.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#5B6474]">{pillar.body}</p>
                    <div className="mt-5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-brass-600">
                      <span>{pillar.link}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-stone-200 pt-10">
              <Link href="/about" className="btn-primary">
                <span>Governance &amp; Objectives</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link href="/about/team" className="btn-outline">
                <span>Our Specialists (80+)</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
