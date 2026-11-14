'use client';

import React, { useRef } from 'react';
import { useScrollSpy } from '@/lib/useScrollSpy';
import Image from 'next/image';
import Link from 'next/link';
import PageHeader from '@/components/common/PageHeader';
import { 
  Newspaper, Calendar, Image as ImageIcon, BookOpen, 
  ArrowRight, ArrowUpRight, Sparkles, MapPin, ExternalLink, Download
} from 'lucide-react';
import { newsItems as fallbackNewsItems } from '@/data/news';
import { useLiveList } from '@/lib/live';
import { cubeEvents, lifeAtCubeImages } from '@/data/media';
import GalleryGrid from '@/components/media/GalleryGrid';

export default function CompleteMediaExperience() {
  // Live CMS news: published items only, updates instantly on admin changes.
  const newsItems = useLiveList<any>('/api/public/news', fallbackNewsItems as any[]);

  const navAnchors = [
    { id: 'news', label: 'News' },
    { id: 'events', label: 'Events' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'life-at-cube', label: 'Life at CUBE' },
  ];

  // Highlight follows scrolling; tapping a pill still jumps to its section.
  const anchorBarRef = useRef<HTMLDivElement>(null);
  const [activeMediaTab, setActiveMediaTab] = useScrollSpy(navAnchors.map((a) => a.id), anchorBarRef);

  const scrollTo = (id: string) => {
    setActiveMediaTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const sampleEvents = cubeEvents;

  // Photos from the original homepage's Media section (they carry no captions).

  return (
    <div className="bg-[#FFFFFF] text-[#1F2633] min-h-screen">
      <PageHeader
        badge="Media"
        title="Media"
        description="News, events, gallery and life at CUBE."
        breadcrumbs={[{ label: 'Media' }]}
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
                aria-current={activeMediaTab === item.id ? 'true' : undefined}
                onClick={() => scrollTo(item.id)}
                className={`px-4 py-2 rounded-none text-xs font-semibold tracking-wider transition-all duration-300 whitespace-nowrap ${
 activeMediaTab === item.id
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

      {/* 1. NEWS & ANNOUNCEMENTS */}
      <section id="news" className="py-20 sm:py-24 bg-gradient-to-b from-[#FFFFFF] to-[#FAF9F6] border-b border-[#E7E3D9]">
        <div className="max-w-none mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0B1324] bg-white px-3.5 py-1 rounded-none border border-[#E7E3D9]">
                News
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B1324] mt-2">
                News
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsItems.slice(0, 6).map((item) => (
              <div
                key={item.id}
                className="rounded-none bg-white cube-glass border border-[#E7E3D9] p-6 shadow-2xs hover:shadow-md hover:border-[#E7E3D9] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-semibold text-[#5B6474] mb-3">
                    <span className="px-2.5 py-0.5 rounded-none bg-[#F4F2EC] text-[#0B1324] border border-[#E7E3D9]">
                      {item.category || 'News'}
                    </span>
                    <span>{item.date}</span>
                  </div>

                  <h3 className="font-serif font-bold text-lg text-[#0B1324] leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#1F2633]/80 mt-2 line-clamp-3 leading-relaxed">
                    {item.summary || item.content}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E7E3D9] flex items-center justify-between text-xs">
                  <span className="text-[#C29A3E] font-semibold">CUBE</span>
                  <Link href={`/media/news/${(item as any).slug || item.id}`} className="font-bold text-[#0B1324] hover:underline flex items-center gap-1">
                    <span>Read More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. TECHNICAL EVENTS & WORKSHOPS */}
      <section id="events" className="py-20 sm:py-24 bg-white border-b border-[#E7E3D9]">
        <div className="max-w-none mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B1324] bg-[#F4F2EC] px-3.5 py-1 rounded-none border border-[#E7E3D9]">
              Events
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B1324] mt-2">
              Events
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {sampleEvents.map((evt, idx) => (
              <div key={idx} className="rounded-none bg-[#FAF9F6] cube-glass border border-[#E7E3D9] p-6 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="relative h-48 w-full rounded-none overflow-hidden mb-4 border border-white ring-1 ring-[#E7E3D9]">
                    <Image src={evt.image} alt={evt.title} fill className="object-cover" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C29A3E]">{evt.category}{evt.date ? <> &bull; {evt.date}</> : null}</span>
                  <h3 className="font-serif font-bold text-base text-[#0B1324] mt-1 leading-snug">{evt.title}</h3>
                  {evt.location && (
                    <p className="text-xs text-[#5B6474] mt-2 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#C29A3E]" />
                      <span>{evt.location}</span>
                    </p>
                  )}
                  <p className="text-xs text-[#1F2633]/80 mt-3 line-clamp-3 leading-relaxed">{evt.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PHOTO GALLERY */}
      <section id="gallery" className="py-20 sm:py-24 bg-gradient-to-b from-[#FFFFFF] to-[#FAF9F6] border-b border-[#E7E3D9]">
        <div className="max-w-none mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B1324] bg-[#F4F2EC] px-3.5 py-1 rounded-none border border-[#E7E3D9]">
              Gallery
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B1324] mt-2">
              Gallery
            </h2>
          </div>

          <GalleryGrid limit={6} />

          <div className="mt-12 text-center">
            <Link
              href="/media/gallery"
              className="inline-flex items-center px-8 py-3.5 rounded-none text-xs font-semibold text-[#0B1324] bg-white border border-[#E7E3D9] hover:bg-[#C29A3E] hover:text-[#1F2633] shadow-sm transition-all"
            >
              <span>View Full Gallery</span>
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. LIFE AT CUBE */}
      <section id="life-at-cube" className="py-20 sm:py-24 bg-white border-b border-[#E7E3D9]">
        <div className="max-w-none mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B1324] bg-[#F4F2EC] px-3.5 py-1 rounded-none border border-[#E7E3D9]">
              Workplace Culture
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B1324] mt-2">
              Life at CUBE
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {lifeAtCubeImages.map((src) => (
              <div key={src} className="group rounded-none overflow-hidden border border-[#E7E3D9] bg-white cube-glass shadow-2xs hover:shadow-md transition-all">
                <div className="relative h-60 w-full overflow-hidden">
                  <Image
                    src={src}
                    alt="Life at CUBE"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
