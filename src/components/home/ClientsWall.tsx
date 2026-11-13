'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { clientDisplayName, clientLogoAlt } from '@/lib/content';
import { ClientPartner } from '@/types';
import SectionHeading from '@/components/home/SectionHeading';

const CELLS = 12;
const SWAP_MS = 1600;
// Visit cells in a scattered order so swaps feel organic rather than sequential.
const SWAP_ORDER = [0, 7, 3, 10, 5, 1, 8, 11, 4, 2, 9, 6];

/**
 * Logo wall: a fixed grid of hairline cells; one cell at a time cross-fades
 * to the next partner, cycling through the whole client list.
 */
export default function ClientsWall({ clients }: { clients: ClientPartner[] }) {
  const list = useMemo(() => clients.filter(Boolean), [clients]);
  const cellCount = Math.min(CELLS, list.length);

  // slots[i] = index into `list` shown in cell i
  const [slots, setSlots] = useState<number[]>(() => Array.from({ length: cellCount }, (_, i) => i));
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setSlots(Array.from({ length: cellCount }, (_, i) => i));
    setTick(0);
  }, [cellCount, list.length]);

  useEffect(() => {
    if (list.length <= cellCount) return;
    const t = setTimeout(() => {
      setSlots((prev) => {
        const cell = SWAP_ORDER.filter((c) => c < cellCount)[tick % cellCount];
        const next = [...prev];
        // Next client after the highest-numbered one on screen, skipping any already shown.
        let candidate = (cellCount + tick) % list.length;
        for (let guard = 0; prev.includes(candidate) && guard < list.length; guard++) {
          candidate = (candidate + 1) % list.length;
        }
        next[cell] = candidate;
        return next;
      });
      setTick((n) => n + 1);
    }, SWAP_MS);
    return () => clearTimeout(t);
  }, [tick, list.length, cellCount]);

  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-32 lg:flex lg:min-h-[100svh] lg:flex-col lg:justify-center lg:[&>*:not(.absolute)]:w-full select-none">
      <div className="mx-auto max-w-none px-5 sm:px-8 lg:px-12">
        <SectionHeading
          index="06"
          eyebrow="Trusted Institutional Ecosystem"
          title={
            <>
              Government departments <span className="text-brass-300">&amp; industry partners.</span>
            </>
          }
          description="Powering state infrastructure, third-party quality assurance, precast engineering, and environmental stewardship across India."
        />

        <div data-reveal data-reveal-delay="1" className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-0">
          {/* Counter panel */}
          <div className="relative flex flex-col justify-between overflow-hidden bg-ink p-8 text-white lg:col-span-3">
            <div aria-hidden className="absolute inset-0 blueprint-grid-dark" />
            <div className="relative">
              <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-brass-300">Partners Served</div>
              <div className="mt-4 font-display text-7xl font-semibold tracking-[-0.05em]">
                {list.length}
                <span className="text-brass-400">+</span>
              </div>
              <p className="mt-3 text-[13px] leading-relaxed text-white/55">
                State departments, public undertakings, municipal bodies and industry leaders.
              </p>
            </div>
            <Link href="/about#clients-partners" className="relative mt-10 link-arrow !text-white hover:!text-brass-300">
              <span>View All Clients</span>
              <ArrowUpRight className="h-4 w-4 text-brass-300" />
            </Link>
          </div>

          {/* Wall */}
          <div className="grid grid-cols-2 border-l border-t border-stone-200 sm:grid-cols-3 md:grid-cols-4 lg:col-span-9">
            {slots.map((clientIdx, cell) => {
              const client = list[clientIdx];
              if (!client) return null;
              const name = clientDisplayName(client.name);
              return (
                <div
                  key={cell}
                  className="group relative h-36 border-b border-r border-stone-200 transition-colors hover:bg-stone-50"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={clientIdx}
                      initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 flex flex-col items-center justify-center px-6"
                    >
                      <div className="relative h-14 w-full">
                        <Image
                          src={client.logo || '/images/clients/client_1.png'}
                          alt={clientLogoAlt(client.name)}
                          fill
                          sizes="220px"
                          className="object-contain grayscale opacity-80 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100"
                        />
                      </div>
                      {name && (
                        <span className="mt-3 max-w-full truncate text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-400 transition-colors group-hover:text-ink">
                          {name}
                        </span>
                      )}
                    </motion.div>
                  </AnimatePresence>
                  <span aria-hidden className="absolute left-0 top-0 h-px w-0 bg-brass-400 transition-all duration-500 group-hover:w-full" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
