'use client';

import React, { useRef, useState } from 'react';
import { useScrollSpy } from '@/lib/useScrollSpy';
import Image from 'next/image';
import Link from 'next/link';
import PageHeader from '@/components/common/PageHeader';
import DocumentRequestModal from '@/components/common/DocumentRequestModal';
import { 
  Newspaper, Calendar, Image as ImageIcon, BookOpen, 
  ArrowRight, Sparkles, MapPin, ExternalLink, Download
} from 'lucide-react';
import { newsItems as fallbackNewsItems } from '@/data/news';
import { useLiveList } from '@/lib/live';
import { cubeEvents, cubeReports } from '@/data/media';

export default function CompleteMediaExperience() {
  // Live CMS news: published items only, updates instantly on admin changes.
  const newsItems = useLiveList<any>('/api/public/news', fallbackNewsItems as any[]);
  const [selectedDoc, setSelectedDoc] = useState<{ title: string; authors?: string } | null>(null);

  const navAnchors = [
    { id: 'news', label: 'News & Announcements' },
    { id: 'events', label: 'Events & Milestones' },
    { id: 'gallery', label: 'Project Photo Gallery' },
    { id: 'life-at-cube', label: 'Life at CUBE' },
    { id: 'publications', label: 'Reports & Publications' },
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

  const galleryImages = [
    { src: '/images/hero/slides_iit-tirupathi.jpg', title: 'IIT Tirupati Campus Structural PMC' },
    { src: '/images/hero/slides_cpcl-arc.jpg', title: 'CPCL Industrial & ARHC Precast Housing' },
    { src: '/images/hero/slides_ashiana.jpg', title: 'Affordable Housing Structural Assurance' },
    { src: '/images/hero/slides_design-engineering-consultancy.jpg', title: 'Design Engineering & Hydrodynamic Modeling' },
    { src: '/images/hero/slides_building-training-team.jpg', title: 'CUBE Team' },
    { src: '/images/hero/slides_07-cat.jpg', title: 'Precast Quality Assurance & Field Testing' },
  ];

  const publications = cubeReports.map((r) => ({ title: r.title, authors: r.authors, date: r.year, desc: r.description }));

  return (
    <div className="bg-[#FFFFFF] text-[#1F2633] min-h-screen">
      <PageHeader
        badge="Media & Dispatches"
        title="Institutional Media Centre"
        description="News, events, photo gallery, reports and life at CUBE."
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
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 whitespace-nowrap ${
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
              <span className="text-xs font-bold uppercase tracking-wider text-[#0B1324] bg-white px-3.5 py-1 rounded-full border border-[#E7E3D9]">
                Press Dispatches
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B1324] mt-2">
                Latest News &amp; Announcements
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#5B6474] mt-2 sm:mt-0">
              Verified institutional reports and state project updates
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsItems.slice(0, 6).map((item) => (
              <div
                key={item.id}
                className="rounded-3xl bg-white border border-[#E7E3D9] p-6 shadow-2xs hover:shadow-md hover:border-[#E7E3D9] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-semibold text-[#5B6474] mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#F4F2EC] text-[#0B1324] border border-[#E7E3D9]">
                      {item.category || 'Press Release'}
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
                  <span className="text-[#C29A3E] font-semibold">IIT Madras &amp; GoTN</span>
                  <Link href={`/media/news/${(item as any).slug || item.id}`} className="font-bold text-[#0B1324] hover:underline flex items-center gap-1">
                    <span>Read Full Story</span>
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
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B1324] bg-[#F4F2EC] px-3.5 py-1 rounded-full border border-[#E7E3D9]">
              Events
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B1324] mt-2">
              Events &amp; Milestones
            </h2>
            <p className="text-xs sm:text-sm text-[#5B6474] mt-2">
              Meetings, project milestones and events at CUBE.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {sampleEvents.map((evt, idx) => (
              <div key={idx} className="rounded-3xl bg-[#FAF9F6] border border-[#E7E3D9] p-6 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-4 border border-white ring-1 ring-[#E7E3D9]">
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
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B1324] bg-[#F4F2EC] px-3.5 py-1 rounded-full border border-[#E7E3D9]">
              Site Documentation
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B1324] mt-2">
              Curated Project &amp; Laboratory Gallery
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((img, i) => (
              <div key={i} className="group rounded-3xl overflow-hidden border border-[#E7E3D9] bg-white shadow-2xs hover:shadow-md transition-all">
                <div className="relative h-60 w-full overflow-hidden">
                  <Image
                    src={img.src}
                    alt={img.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-5">
                    <p className="text-white text-xs font-semibold leading-snug">{img.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. LIFE AT CUBE */}
      <section id="life-at-cube" className="py-20 sm:py-24 bg-white border-b border-[#E7E3D9]">
        <div className="max-w-none mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0B1324] bg-[#F4F2EC] px-3.5 py-1 rounded-full border border-[#E7E3D9]">
                Workplace Culture
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B1324]">
                Life at CUBE: Applied Engineering Innovation at IITM Research Park
              </h2>
              <p className="text-sm text-[#1F2633]/85 leading-relaxed font-sans">
                Operating out of the premier IIT Madras Research Park in Chennai, CUBE brings together young engineering minds, seasoned state advisors, and world-renowned faculty in an open, vibrant research environment.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E7E3D9]">
                  <h4 className="text-xs font-bold text-[#0B1324] uppercase tracking-wider">Faculty Collaboration</h4>
                  <p className="text-xs text-[#5B6474] mt-1">Direct daily liaison with IIT Madras departments and research labs.</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E7E3D9]">
                  <h4 className="text-xs font-bold text-[#0B1324] uppercase tracking-wider">Field Impact</h4>
                  <p className="text-xs text-[#5B6474] mt-1">Direct oversight of major infrastructure works shaping Tamil Nadu.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative h-80 w-full rounded-3xl overflow-hidden border border-[#E7E3D9] shadow-md">
                <Image src="/images/hero/slides_building-training-team.jpg" alt="Team at CUBE" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TECHNICAL PUBLICATIONS */}
      <section id="publications" className="py-20 sm:py-24 bg-gradient-to-b from-[#FAF9F6] to-[#FFFFFF]">
        <div className="max-w-none mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B1324] bg-[#F4F2EC] px-3.5 py-1 rounded-full border border-[#E7E3D9]">
              Reports
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B1324] mt-2">
              Reports &amp; Publications
            </h2>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {publications.map((pub, idx) => (
              <div key={idx} className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E7E3D9] shadow-2xs hover:shadow-xs transition">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C29A3E]">{pub.authors} &bull; {pub.date}</span>
                <h3 className="font-serif font-bold text-lg sm:text-xl text-[#0B1324] mt-1 leading-snug">{pub.title}</h3>
                <p className="text-xs sm:text-sm text-[#1F2633]/80 mt-2 leading-relaxed">{pub.desc}</p>
                <div className="mt-5 pt-3 border-t border-[#E7E3D9] flex items-center justify-between text-xs">
                  <span className="text-[#5B6474]">Published by CUBE IIT Madras</span>
                  <button 
                    type="button"
                    onClick={() => setSelectedDoc({ title: pub.title, authors: pub.authors })}
                    className="font-bold text-[#0B1324] hover:text-[#C29A3E] flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-[#C29A3E]" />
                    <span>Request Technical Document</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Modal for Document Requests */}
      <DocumentRequestModal
        isOpen={!!selectedDoc}
        onClose={() => setSelectedDoc(null)}
        documentTitle={selectedDoc?.title || ''}
        documentAuthor={selectedDoc?.authors}
      />

    </div>
  );
}
