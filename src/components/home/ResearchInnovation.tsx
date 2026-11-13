'use client';

import React from 'react';
import Link from 'next/link';
import { Cpu, FileCheck2, FlaskConical, ArrowUpRight, Building2, CheckCircle2 } from 'lucide-react';
import SectionHeading from '@/components/home/SectionHeading';

const INNOVATION_DOMAINS = [
  {
    title: 'Digital Twin & Smart Infrastructure',
    tag: 'Vertical 3: Smart Cities',
    description: 'Developing IoT telemetry, dynamic structural vibration monitoring, and predictive failure analysis for critical bridges, high-rises, and industrial towers.',
    deliverable: 'Real-time telemetry proof checking & sensor analytics',
    icon: Cpu,
  },
  {
    title: 'Advanced Materials & Concrete Durability',
    tag: 'Vertical 1: Building Systems',
    description: 'Rapid chloride penetration testing (RCPT), carbonation resistance, non-destructive testing (NDT), and precast seismic connection assessments.',
    deliverable: '50-100 year structural design service-life validation',
    icon: Building2,
  },
  {
    title: 'Environmental Diagnostics & Micro-Pollutants',
    tag: 'CEL Analytical Testing',
    description: 'ICP-MS and atomic absorption spectroscopy for heavy metals, organic micropollutants, industrial wastewater profiling, and groundwater hydrology.',
    deliverable: 'CPCB / BIS compliant ISO testing certifications',
    icon: FlaskConical,
  },
  {
    title: 'Applied Engineering Policy & Codes',
    tag: 'Governance Translation',
    description: 'Formulating technical specifications, state government public works tenders, precast design codes, and green building performance standards.',
    deliverable: 'Independent technical guidelines for government departments',
    icon: FileCheck2,
  },
];

export default function ResearchInnovation() {
  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-32 lg:flex lg:min-h-[100svh] lg:flex-col lg:justify-center lg:[&>*:not(.absolute)]:w-full">
      <div className="relative z-10 mx-auto max-w-none px-5 sm:px-8 lg:px-12">
        <SectionHeading
          index="08"
          eyebrow="Applied Research Translation"
          title={null}
          description="Uniting world-renowned academic intellect with practical municipal engineering to solve high-stakes challenges across South India."
          action={
            <Link href="/about/advisory-panel" className="btn-primary">
              <span>IIT Madras Advisory Panel</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          }
        />

        <div data-reveal data-reveal-delay="1" className="mt-16 grid grid-cols-1 overflow-hidden rounded-xl border border-stone-200 bg-stone-200 gap-px md:grid-cols-2 lg:grid-cols-4">
          {INNOVATION_DOMAINS.map((domain, idx) => {
            const Icon = domain.icon;
            return (
              <div
                key={domain.title}
                className="group relative flex flex-col justify-between bg-white p-7 sm:p-8 transition-colors duration-500 hover:bg-ink"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-stone-100 text-ink transition-colors duration-500 group-hover:bg-brass-400">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-display text-4xl font-semibold tabular-nums tracking-[-0.04em] text-stone-200 transition-colors duration-500 group-hover:text-white/10">
                      0{idx + 1}
                    </span>
                  </div>
                  <div className="mt-8 text-[10px] font-bold uppercase tracking-[0.2em] text-brass-600 transition-colors duration-500 group-hover:text-brass-300">
                    {domain.tag}
                  </div>
                  <h3 className="mt-3 font-display text-xl font-semibold leading-snug tracking-[-0.015em] text-ink transition-colors duration-500 group-hover:text-white">
                    {domain.title}
                  </h3>
                  <p className="mt-3 text-[13px] leading-relaxed text-[#5B6474] transition-colors duration-500 group-hover:text-white/60">
                    {domain.description}
                  </p>
                </div>
                <div className="mt-8 flex items-start gap-2 border-t border-stone-200 pt-5 transition-colors duration-500 group-hover:border-white/10">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brass-500" />
                  <p className="text-[12px] font-semibold leading-snug text-ink transition-colors duration-500 group-hover:text-white/90">
                    {domain.deliverable}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
