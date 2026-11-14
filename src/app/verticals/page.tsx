'use client';

import React, { useRef } from 'react';
import { useScrollSpy } from '@/lib/useScrollSpy';
import Image from 'next/image';
import Link from 'next/link';
import PageHeader from '@/components/common/PageHeader';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { verticals } from '@/data/verticals';
import { projects as fallbackProjects } from '@/data/projects';
import { useLiveList } from '@/lib/live';

export default function CompleteVerticalsExperience() {
  const projects = useLiveList<any>('/api/public/projects', fallbackProjects as any[]);

  const navAnchors = [
    { id: 'building-construction', label: 'Building & Construction' },
    { id: 'environment-sustainability', label: 'Environment & Sustainability' },
    { id: 'smart-cities', label: 'Smart Cities' },
    { id: 'urban-planning-transportation', label: 'Urban Planning & Transportation' },
  ];

  // Highlight follows scrolling; tapping a pill still jumps to its section.
  const anchorBarRef = useRef<HTMLDivElement>(null);
  const [activeVertical, setActiveVertical] = useScrollSpy(navAnchors.map((a) => a.id), anchorBarRef);

  const scrollTo = (id: string) => {
    setActiveVertical(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-[#FFFFFF] text-[#1F2633] min-h-screen">
      <PageHeader
        badge="Verticals"
        title="Our Verticals"
        description="Building & Construction · Environment & Sustainability · Smart Cities · Urban Planning & Transportation"
        breadcrumbs={[{ label: 'Verticals' }]}
      />

      {/* Sticky Apple Glass Anchor Navigation Bar */}
      <section className="sticky top-[var(--nav-offset,84px)] transition-[top] duration-500 z-40 bg-white/85 backdrop-blur-2xl border-y border-[#E7E3D9]/70 py-3.5 px-4 sm:px-6 shadow-xs">
        <div ref={anchorBarRef} className="relative max-w-none mx-auto flex items-center justify-start gap-2 overflow-x-auto scrollbar-none no-scrollbar py-1">
          <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
            {navAnchors.map((item) => (
              <button
                key={item.id}
                type="button"
                data-anchor={item.id}
                aria-current={activeVertical === item.id ? 'true' : undefined}
                onClick={() => scrollTo(item.id)}
                className={`px-4 py-2 rounded-none text-xs font-semibold tracking-wider transition-all duration-300 whitespace-nowrap ${
 activeVertical === item.id
 ? 'bg-[#0B1324] text-white shadow-xs'
 : 'bg-white/60 text-[#1F2633] hover:bg-[#F4F2EC] hover:text-[#0B1324] border border-[#E7E3D9]/60'
 }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4 CONTINUOUS SCROLLABLE VERTICAL DIVISIONS */}
      <div className="space-y-0">
        {verticals.map((vert, vIdx) => {
          // The original site lists no projects under Smart Cities.
          const vertProjects = vert.id === 'smart-cities' ? [] : projects.filter((p) => 
            p.category.toLowerCase().includes(vert.title.toLowerCase().split(' ')[0]) ||
            p.category.toLowerCase().includes(vert.id.split('-')[0])
          ).slice(0, 3);

          const isEven = vIdx % 2 === 0;

          return (
            <section
              key={vert.id}
              id={vert.id}
              className={`py-20 sm:py-28 border-b border-[#E7E3D9] ${
                isEven ? 'bg-gradient-to-b from-[#FFFFFF] to-[#FAF9F6]' : 'bg-[#FFFFFF]'
              }`}
            >
              <div className="max-w-none mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
                  
                  <div className="lg:col-span-7 space-y-6">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-none bg-[#C29A3E]" />
                      <span className="text-xs font-bold uppercase tracking-wider text-[#0B1324] bg-[#F4F2EC] px-3.5 py-1 rounded-none border border-[#E7E3D9]">
                        Vertical Division 0{vIdx + 1}
                      </span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0B1324] tracking-tight leading-tight">
                      {vert.title}
                    </h2>

                    {vert.tagline && (
                      <p className="text-base sm:text-lg font-medium text-[#C29A3E]">
                        {vert.tagline}
                      </p>
                    )}

                    {vert.longDescription.split('\n\n').map((para, pIdx) => (
                      <p key={pIdx} className="text-sm sm:text-base text-[#1F2633]/85 leading-relaxed font-sans">
                        {para}
                      </p>
                    ))}

                    {/* Services Checklist */}
                    {vert.capabilities.length > 0 && (
                    <div className="pt-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B1324] mb-3">
                        Services
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {vert.capabilities.map((cap, cIdx) => (
                          <div key={cIdx} className="flex items-start gap-2.5 p-3 rounded-none bg-white cube-glass border border-[#E7E3D9]/70 shadow-2xs">
                            <CheckCircle2 className="w-4 h-4 text-[#C29A3E] shrink-0 mt-0.5" />
                            <span className="text-xs text-[#1F2633] font-semibold">{cap}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    )}
                  </div>

                  {/* Right Image Feature Card */}
                  <div className="lg:col-span-5">
                    <div className="rounded-none bg-white/90 cube-glass backdrop-blur-2xl border border-[#E7E3D9] p-6 shadow-[0_20px_50px_rgba(7,14,92,0.08)] relative overflow-hidden">
                      <div className="relative h-72 sm:h-80 w-full rounded-none overflow-hidden mb-6 border border-white ring-1 ring-[#E7E3D9]">
                        <Image
                          src={vert.heroImage || '/images/hero/slides_07-cat.jpg'}
                          alt={vert.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex items-center justify-between text-xs text-[#5B6474] border-t border-[#E7E3D9] pt-4">
                        <span className="font-semibold text-[#0B1324]">{vert.title}</span>
                        <Link
                          href="/projects"
                          className="font-bold text-[#0B1324] hover:text-[#C29A3E] flex items-center gap-1 transition"
                        >
                          <span>Explore Projects</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Related Projects Showcase */}
                {vertProjects.length > 0 && (
                  <div className="pt-8 border-t border-[#E7E3D9]">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-serif font-bold text-[#0B1324]">
                        Projects in {vert.title}
                      </h3>
                      <Link href="/projects" className="text-xs font-semibold text-[#C29A3E] hover:underline flex items-center gap-1">
                        <span>View All Projects</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {vertProjects.map((proj, pIdx) => (
                        <div key={proj.slug || pIdx} className="p-5 rounded-none bg-white cube-glass border border-[#E7E3D9] shadow-2xs hover:shadow-xs transition">
                          <span className="text-[10px] font-bold text-[#0B1324] uppercase tracking-wider">{proj.client}</span>
                          <h4 className="font-serif font-bold text-base text-[#1F2633] mt-1 leading-snug">{proj.title}</h4>
                          <p className="text-xs text-[#5B6474] mt-2 line-clamp-2">{proj.description}</p>
                          <div className="mt-4 pt-3 border-t border-[#E7E3D9] flex items-center justify-between text-xs">
                            <span className="text-[#C29A3E] font-semibold">{proj.status}</span>
                            <Link href={`/projects/${proj.slug}`} className="font-bold text-[#0B1324] hover:underline">
                              Case Study &rarr;
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

