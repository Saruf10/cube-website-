'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { Project } from '@/types';

const hrefFor = (p: Project) => `/projects/${p.slug || (p as unknown as { id?: string }).id || ''}`;

/**
 * Editorial portfolio: a large feature plate on the left, an indexed list on
 * the right. Hovering (or focusing) a row previews it in the feature plate.
 */
export default function ProjectsShowcase({ projects }: { projects: Project[] }) {
  // The parent keys this component by filter, so `active` resets on filter change.
  const [active, setActive] = useState(0);

  if (!projects.length) {
    return (
      <div className="rounded-xl border border-dashed border-stone-300 p-16 text-center text-sm text-stone-500">
        No projects published in this vertical yet.
      </div>
    );
  }

  const current = projects[Math.min(active, projects.length - 1)];
  const scope = (current.scopeOfWork || []).slice(0, 3);

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
      {/* Feature plate */}
      <div className="lg:col-span-7">
        <Link href={hrefFor(current)} className="group block">
          <div className="crop-marks relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-ink">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={current.slug}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={current.heroImage || '/images/about/about_about.jpg'}
                    alt={current.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/10 to-transparent" />

              <div className="absolute left-5 right-5 top-5 flex items-center justify-between">
                <span className="chip-light">{current.category}</span>
                {current.featured && <span className="chip-brass">Key Project</span>}
              </div>

              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.slug}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.45 }}
                  >
                    <h3 className="max-w-2xl font-display text-2xl sm:text-[2rem] font-semibold leading-tight tracking-[-0.025em] text-white">
                      {current.title}
                    </h3>
                    <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-[13px] text-white/65">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-brass-300" />
                        {current.location || 'Tamil Nadu, India'}
                      </span>
                      {current.client && <span>Client · {current.client}</span>}
                      {current.year && <span>{current.year}</span>}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Link>

        {/* Brief beneath the plate */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-12">
          <p className="text-[15px] leading-relaxed text-[#5B6474] sm:col-span-7 line-clamp-4">{current.description}</p>
          {scope.length > 0 && (
            <div className="sm:col-span-5">
              <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-brass-600">Scope of Work</div>
              <ul className="mt-3 space-y-2">
                {scope.map((s) => (
                  <li key={s} className="flex gap-3 text-[13px] text-ink/80">
                    <span className="mt-[9px] h-px w-3 shrink-0 bg-brass-500" />
                    <span className="line-clamp-2">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Indexed list */}
      <div className="lg:col-span-5">
        <div className="flex items-center justify-between border-b border-ink pb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-ink">
          <span>Project Index</span>
          <span className="tabular-nums text-stone-400">
            {String(active + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </span>
        </div>
        <ol>
          {projects.map((p, i) => {
            const isActive = i === active;
            return (
              <li key={p.slug} className="border-b border-stone-200">
                <Link
                  href={hrefFor(p)}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group relative flex items-center gap-5 py-5 pl-1"
                >
                  <span
                    aria-hidden
                    className={`absolute left-0 top-1/2 h-8 w-[2px] -translate-y-1/2 bg-brass-400 transition-transform duration-300 origin-center ${
                      isActive ? 'scale-y-100' : 'scale-y-0'
                    }`}
                  />
                  <span className={`w-7 pl-3 text-[11px] font-bold tabular-nums transition-colors ${isActive ? 'text-brass-600' : 'text-stone-400'}`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-md bg-stone-200">
                    <Image
                      src={p.heroImage || '/images/about/about_about.jpg'}
                      alt=""
                      fill
                      sizes="80px"
                      className={`object-cover transition-all duration-500 ${isActive ? '' : 'grayscale opacity-80'}`}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-400 truncate">{p.category}</div>
                    <div
                      className={`mt-1 font-display text-[15px] font-semibold leading-snug tracking-[-0.01em] line-clamp-2 transition-colors ${
                        isActive ? 'text-ink' : 'text-ink/60 group-hover:text-ink'
                      }`}
                    >
                      {p.title}
                    </div>
                  </div>
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                      isActive ? 'border-ink bg-ink text-white' : 'border-stone-200 text-stone-400'
                    }`}
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
