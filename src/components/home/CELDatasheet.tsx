'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Droplets, Waves, Recycle, Microscope } from 'lucide-react';
import { CELService } from '@/types';

const CATEGORY_META: Record<string, { image: string; icon: React.ElementType; code: string }> = {
  Water: { image: '/images/cel/about_cel.jpg', icon: Droplets, code: 'WTR' },
  Wastewater: { image: '/images/cel/about_cel1.jpg', icon: Waves, code: 'WWT' },
  'Solid Waste': { image: '/images/cel/about_cel2.jpg', icon: Recycle, code: 'SLW' },
  Specialized: { image: '/images/cel/about_cel.jpg', icon: Microscope, code: 'SPL' },
};
const metaFor = (category: string) => CATEGORY_META[category] || CATEGORY_META.Specialized;

/**
 * Laboratory "datasheet": category tabs on the left, a technical spec sheet
 * (parameters, instruments, standards) for the selected service on the right.
 */
export default function CELDatasheet({ services }: { services: CELService[] }) {
  const [active, setActive] = useState(0);
  if (!services.length) return null;

  const svc = services[Math.min(active, services.length - 1)];
  const meta = metaFor(svc.category);
  const parameters = svc.parameters || [];
  const equipment = svc.equipment || [];
  const sheetNo = `CEL-${meta.code}-${String(active + 1).padStart(2, '0')}`;

  return (
    <div className="overflow-hidden rounded-none border border-stone-200 bg-white shadow-premium-lg">
      {/* Sheet header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 bg-ink px-6 py-3.5 text-[10px] font-bold uppercase tracking-[0.22em] text-white/60">
        <span className="flex items-center gap-2.5">
          <span className="h-1.5 w-1.5 rounded-none bg-brass-400" />
          Technical Datasheet
        </span>
        <span className="tabular-nums text-brass-300">{sheetNo}</span>
        <span className="hidden sm:inline">BIS · ISO · CPCB Protocols</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Tabs */}
        <div role="tablist" aria-label="CEL testing services" className="flex overflow-x-auto no-scrollbar border-b border-stone-200 lg:col-span-4 lg:flex-col lg:border-b-0 lg:border-r">
          {services.map((s, i) => {
            const m = metaFor(s.category);
            const Icon = m.icon;
            const on = i === active;
            return (
              <button
                key={s.id}
                role="tab"
                aria-selected={on}
                onClick={() => setActive(i)}
                className={`group relative flex min-w-[220px] items-center gap-4 border-r border-stone-200 px-6 py-5 text-left transition-colors lg:min-w-0 lg:border-b lg:border-r-0 lg:py-6 ${
                  on ? 'bg-stone-50' : 'bg-white hover:bg-stone-50'
                }`}
              >
                <span
                  aria-hidden
                  className={`absolute bottom-0 left-0 h-[2px] w-full bg-brass-400 transition-transform duration-300 origin-left lg:bottom-auto lg:top-0 lg:h-full lg:w-[2px] lg:origin-top ${
                    on ? 'scale-100' : 'scale-0'
                  }`}
                />
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-none transition-colors ${
 on ? 'bg-ink text-brass-300' : 'bg-stone-100 text-ink/60 group-hover:text-ink'
 }`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">
                    {String(i + 1).padStart(2, '0')} · {s.category}
                  </span>
                  <span className={`mt-1 block font-display text-[15px] font-semibold leading-snug tracking-[-0.01em] ${on ? 'text-ink' : 'text-ink/60'}`}>
                    {s.title}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Sheet body */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={svc.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-5"
            >
              <div className="relative min-h-[260px] md:col-span-2 md:min-h-full">
                <Image src={meta.image} alt={svc.title} fill sizes="(max-width: 768px) 100vw, 26vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <span className="chip-brass">CEL Certified</span>
                </div>
              </div>

              <div className="p-6 sm:p-9 md:col-span-3">
                <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-brass-600">{svc.category} Analysis</div>
                <h3 className="mt-3 font-display text-2xl sm:text-[1.75rem] font-semibold leading-tight tracking-[-0.025em] text-ink">
                  {svc.title}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-[#5B6474]">{svc.description}</p>

                {parameters.length > 0 && (
                  <div className="mt-7">
                    <div className="flex items-center justify-between border-b border-ink pb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-ink">
                      <span>Tested Parameters</span>
                      <span className="tabular-nums text-stone-400">{parameters.length} items</span>
                    </div>
                    <dl className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-8">
                      {parameters.slice(0, 8).map((p, i) => (
                        <div key={p} className="flex items-baseline gap-3 border-b border-stone-200 py-2.5">
                          <dt className="text-[10px] font-bold tabular-nums text-brass-600">P{String(i + 1).padStart(2, '0')}</dt>
                          <dd className="text-[13px] leading-snug text-ink/80 line-clamp-2">{p}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}

                {equipment.length > 0 && (
                  <div className="mt-6">
                    <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-stone-400">Key Instruments</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {equipment.slice(0, 5).map((e) => (
                        <span key={e} className="rounded-none border border-stone-200 bg-stone-50 px-2.5 py-1 text-[12px] text-ink/75">
                          {e}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/cel#enquiry" className="btn-primary">
                    <span>Book Laboratory Testing</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <Link href="/cel" className="link-arrow self-center px-2">
                    <span>Full Protocols</span>
                    <ArrowUpRight className="h-4 w-4 text-brass-600" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
