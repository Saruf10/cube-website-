'use client';

import React, { useMemo, useRef, useState } from 'react';
import { useScrollSpy } from '@/lib/useScrollSpy';
import Image from 'next/image';
import Link from 'next/link';
import PageHeader from '@/components/common/PageHeader';
import { 
  Building2, ShieldCheck, Users, Award, ArrowRight, 
  CheckCircle2, Compass, Quote, Target, HeartHandshake, 
  Briefcase, Phone, Mail, ExternalLink, ChevronRight
} from 'lucide-react';
import { aboutContent } from '@/data/about';
import { boardMembers as fallbackBoard, advisoryPanel as fallbackAdvisory } from '@/data/leadership';
import LeadershipGallery from '@/components/home/LeadershipGallery';
import { teamMembers as fallbackTeam } from '@/data/team';
import { clients as fallbackClients } from '@/data/clients';
import { useLiveList } from '@/lib/live';
import { clientLogoAlt } from '@/lib/content';

const LEADER_CATEGORIES = new Set(['leadership', 'board', 'advisory']);
const FALLBACK_PEOPLE: any[] = [
  ...fallbackBoard.map((m) => ({ ...m, category: 'board' })),
  ...fallbackAdvisory.map((m) => ({ ...m, category: 'advisory' })),
  ...fallbackTeam.map((m) => ({ ...m, category: m.department })),
];
// Department headings from the original IIT Advisory Panel page, by member name.
const ADVISORY_DEPARTMENTS: Record<string, string> = Object.fromEntries(
  fallbackAdvisory.map((m) => [m.name, m.department || '']),
);
const withRole = (list: any[]) =>
  list.map((m) => ({ ...m, role: m.role || m.designation || '' }));

export default function CompleteAboutExperience() {
  // Live CMS data: archived/edited members and clients update instantly.
  const people = useLiveList<any>('/api/public/team', FALLBACK_PEOPLE, withRole);
  const clients = useLiveList<any>('/api/public/clients', fallbackClients as any[]);
  const { boardMembers, advisoryPanel, teamMembers } = useMemo(() => ({
    boardMembers: people.filter((m) => m.category === 'board'),
    advisoryPanel: people.filter((m) => m.category === 'advisory'),
    teamMembers: people.filter((m) => !LEADER_CATEGORIES.has(m.category)),
  }), [people]);

  // Governing members for the gallery: CEO first, then the board.
  const governingMembers = useMemo(() => {
    const isCEO = (m: any) => `${m.role || ''} ${m.designation || ''}`.toUpperCase().includes('CEO');
    const ceo = people.filter((m) => m.category === 'leadership' && isCEO(m)).map((m) => ({ ...m, category: 'CEO' }));
    return [...ceo, ...boardMembers];
  }, [people, boardMembers]);
  const [showAllTeam, setShowAllTeam] = useState(false);

  const navAnchors = [
    { id: 'overview', label: 'About CUBE' },
    { id: 'vision-mission', label: 'Vision & Mission' },
    { id: 'objectives-values', label: 'Objectives & Core Values' },
    { id: 'chairman-message', label: 'Chairman Message' },
    { id: 'ceo-message', label: 'CEO Message' },
    { id: 'governing-board', label: 'Board Members' },
    { id: 'advisory-panel', label: 'IIT Advisory Panel' },
    { id: 'our-team', label: 'Our Team' },
    { id: 'clients-partners', label: 'Our Clients' },
  ];

  // Highlight follows scrolling; tapping a pill still jumps to its section.
  const anchorBarRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useScrollSpy(navAnchors.map((a) => a.id), anchorBarRef);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-[#FFFFFF] text-[#1F2633] min-h-screen">
      <PageHeader
        badge="Centre of Excellence"
        title="About CUBE IIT Madras"
        description="Centre for Urbanization, Buildings & Environment (CUBE)"
        breadcrumbs={[{ label: 'About CUBE' }]}
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
                aria-current={activeSection === item.id ? 'true' : undefined}
                onClick={() => scrollTo(item.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 whitespace-nowrap cursor-pointer active:scale-95 ${
                  activeSection === item.id
                    ? 'bg-[#0B1324] text-white shadow-sm'
                    : 'bg-white/80 text-[#1F2633] hover:bg-[#F4F2EC] hover:text-[#0B1324] border border-[#E7E3D9]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 1. INSTITUTIONAL OVERVIEW */}
      <section id="overview" className="py-20 sm:py-24 bg-gradient-to-b from-[#FFFFFF] via-[#FAF9F6] to-[#F4F2EC] border-b border-[#E7E3D9]">
        <div className="max-w-none mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0B1324] bg-white px-3.5 py-1 rounded-full border border-[#E7E3D9] shadow-xs">
                About Cube
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0B1324] tracking-tight leading-tight">
                About Centre for Urbanization, Buildings &amp; Environment (CUBE)
              </h2>

              <div className="space-y-4 text-sm sm:text-base text-[#1F2633]/85 leading-relaxed font-sans">
                {aboutContent.overview.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

            </div>

            {/* Right: Institutional Glass Plaque */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="rounded-3xl bg-white/90 backdrop-blur-2xl border border-[#E7E3D9] shadow-[0_20px_50px_rgba(7,14,92,0.08)] p-8 text-center w-full max-w-md relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C29A3E] to-transparent opacity-90" />

                <div className="relative h-44 w-44 mx-auto mb-6 flex items-center justify-center">
                  <Image
                    src="/images/branding/cube-primary-logo.png"
                    alt="Official CUBE Identity"
                    fill
                    className="object-contain drop-shadow-md"
                  />
                </div>

                <h3 className="text-xl font-bold text-[#0B1324] font-serif">
                  Centre of Excellence
                </h3>
                <p className="text-xs text-[#C29A3E] font-semibold tracking-wider uppercase mt-1">
                  IIT Madras &bull; Government of Tamil Nadu
                </p>

                <div className="mt-5 pt-5 border-t border-[#E7E3D9] text-xs text-[#5B6474] leading-relaxed">
                  Module No.6C, 6th Floor, Phase II Building, IIT Madras Research Park, Kanagam Road, Taramani, Chennai 600 113.
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. VISION & MISSION */}
      <section id="vision-mission" className="py-20 sm:py-24 bg-white border-b border-[#E7E3D9]">
        <div className="max-w-none mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B1324] bg-[#F4F2EC] px-3.5 py-1 rounded-full border border-[#E7E3D9]">
              Vision &amp; Mission
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B1324] mt-3">
              Vision &amp; Mission
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#FAF9F6] to-white border border-[#E7E3D9] shadow-sm relative overflow-hidden">
              <Compass className="w-10 h-10 text-[#C29A3E] mb-4" />
              <h3 className="font-serif text-2xl font-bold text-[#0B1324] mb-3">Our Vision</h3>
              <p className="text-sm text-[#1F2633]/85 leading-relaxed font-sans">
                {aboutContent.vision}
              </p>
            </div>

            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#F4F2EC] to-white border border-[#E7E3D9] shadow-sm relative overflow-hidden">
              <Target className="w-10 h-10 text-[#C29A3E] mb-4" />
              <h3 className="font-serif text-2xl font-bold text-[#0B1324] mb-3">Our Mission</h3>
              <ul className="space-y-2 text-sm text-[#1F2633]/85 leading-relaxed font-sans list-disc pl-5">
                {aboutContent.mission.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OBJECTIVES & VALUES */}
      <section id="objectives-values" className="py-20 sm:py-24 bg-gradient-to-b from-[#FAF9F6] to-[#FFFFFF] border-b border-[#E7E3D9]">
        <div className="max-w-none mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B1324] bg-[#F4F2EC] px-3.5 py-1 rounded-full border border-[#E7E3D9]">
              Objectives &amp; Core Values
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B1324] mt-3">
              Objectives &amp; Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Objectives List */}
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#0B1324] pb-2 border-b border-[#E7E3D9]">
                Objectives
              </h3>
              <div className="space-y-3">
                {aboutContent.objectives.map((obj, i) => (
                  <div key={i} className="flex items-start gap-3 p-3.5 rounded-2xl bg-white cube-glass border border-[#E7E3D9]/70 shadow-2xs">
                    <CheckCircle2 className="w-4 h-4 text-[#C29A3E] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-[#1F2633]/90 font-medium leading-relaxed">{obj}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Values List */}
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#0B1324] pb-2 border-b border-[#E7E3D9]">
                Core Values
              </h3>
              <div className="space-y-3">
                {aboutContent.coreValues.map((val, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white cube-glass border border-[#E7E3D9]/70 shadow-2xs">
                    <h4 className="text-sm font-bold text-[#0B1324] flex items-center gap-2">
                      <HeartHandshake className="w-4 h-4 text-[#C29A3E]" />
                      <span>{val.title}</span>
                    </h4>
                    <p className="text-xs text-[#5B6474] mt-1.5 leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. CHAIRMAN MESSAGE */}
      <section id="chairman-message" className="py-14 sm:py-16 bg-white border-b border-[#E7E3D9] relative overflow-hidden">
        {/* Soft Ambient Refractive Glow */}
        <div className="absolute top-1/2 left-10 w-96 h-96 bg-[#E7E3D9]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Clean Frameless Floating Portrait */}
            <div className="md:col-span-4 flex flex-col items-center text-center">
              <div className="relative group">
                {/* Soft ambient aura behind floating portrait */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-[#A8832F]/20 via-[#E7E3D9]/30 to-[#C29A3E]/15 rounded-full blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative h-56 w-56 rounded-full overflow-hidden shadow-[0_16px_40px_rgba(7,14,92,0.12)] border-4 border-white">
                  <Image
                    src="/images/leadership/board_member_kamakoti.jpg"
                    alt="Prof. V. Kamakoti, Chairman CUBE & Director IIT Madras"
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              <div className="mt-5">
                <h3 className="text-xl font-bold text-[#0B1324] font-serif tracking-tight">
                  Prof. V. Kamakoti
                </h3>
                <p className="text-xs text-[#C29A3E] font-bold uppercase tracking-wider mt-1">
                  Chairman
                </p>
                <p className="text-xs text-[#5B6474] mt-0.5 font-medium">
                  Director, IIT Madras
                </p>
              </div>
            </div>

            {/* Seamless Content Flow Without Box */}
            <div className="md:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4F2EC] border border-[#E7E3D9] text-xs font-bold uppercase tracking-wider text-[#0B1324]">
                <Quote className="w-3.5 h-3.5 text-[#C29A3E]" />
                <span>Chairman Message</span>
              </div>

              <div className="space-y-3.5 text-xs sm:text-sm text-[#1F2633]/85 leading-relaxed font-sans">
                {aboutContent.chairmanMessage.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. CEO MESSAGE */}
      <section id="ceo-message" className="py-14 sm:py-16 bg-gradient-to-b from-[#FFFFFF] to-[#FAF9F6] border-b border-[#E7E3D9] relative overflow-hidden">
        {/* Soft Ambient Refractive Glow */}
        <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#E7E3D9]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Clean Frameless Floating Portrait */}
            <div className="md:col-span-4 flex flex-col items-center text-center">
              <div className="relative group">
                {/* Soft ambient aura behind floating portrait */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-[#C29A3E]/15 via-[#E7E3D9]/30 to-[#A8832F]/20 rounded-full blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative h-56 w-56 rounded-full overflow-hidden shadow-[0_16px_40px_rgba(7,14,92,0.12)] border-4 border-white">
                  <Image
                    src="/images/leadership/ceo_padmanaban.jpg"
                    alt="L. Padmanaban, CEO, CUBE"
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              <div className="mt-5">
                <h3 className="text-xl font-bold text-[#0B1324] font-serif tracking-tight">
                  L. PADMANABAN
                </h3>
                <p className="text-xs text-[#C29A3E] font-bold uppercase tracking-wider mt-1">
                  (Major General [Retired]) CEO
                </p>
              </div>
            </div>

            {/* Seamless Content Flow Without Box */}
            <div className="md:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4F2EC] border border-[#E7E3D9] text-xs font-bold uppercase tracking-wider text-[#0B1324]">
                <Quote className="w-3.5 h-3.5 text-[#C29A3E]" />
                <span>CEO Message</span>
              </div>

              <div className="space-y-3.5 text-xs sm:text-sm text-[#1F2633]/85 leading-relaxed font-sans">
                {aboutContent.ceoMessage.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. BOARD MEMBERS */}
      <LeadershipGallery
        id="governing-board"
        members={governingMembers}
        title="Board Members"
        subtitle="Board Members of CUBE"
        tagline="Leadership"
        ctaText="IIT Advisory Panel"
        ctaHref="/about#advisory-panel"
      />

      {/* 7. IIT ADVISORY PANEL */}
      <section id="advisory-panel" className="py-20 sm:py-24 bg-gradient-to-b from-[#FAF9F6] to-[#FFFFFF] border-b border-[#E7E3D9]">
        <div className="max-w-none mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B1324] bg-[#F4F2EC] px-3.5 py-1 rounded-full border border-[#E7E3D9]">
              IIT Advisory Panel
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B1324] mt-3">
              IIT Advisory Panel
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {advisoryPanel.map((advisor, i) => (
              <div key={i} className="p-5 rounded-3xl bg-white cube-glass border border-[#E7E3D9] text-center shadow-2xs hover:shadow-xs transition">
                <div className="relative w-24 h-24 mx-auto rounded-2xl overflow-hidden mb-3 border border-white ring-1 ring-[#E7E3D9]">
                  <Image src={advisor.image || '/images/leadership/about_leader.jpg'} alt={advisor.name} fill className="object-cover" />
                </div>
                <h4 className="font-serif font-bold text-[#0B1324] text-sm leading-snug">{advisor.name}</h4>
                <p className="text-[11px] font-semibold text-[#C29A3E] mt-0.5">{advisor.role}</p>
                <p className="text-[10px] text-[#5B6474] mt-0.5">{advisor.department || ADVISORY_DEPARTMENTS[advisor.name] || 'IIT Madras'}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. OUR TEAM */}
      <section id="our-team" className="py-20 sm:py-24 bg-white border-b border-[#E7E3D9]">
        <div className="max-w-none mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B1324] bg-[#F4F2EC] px-3.5 py-1 rounded-full border border-[#E7E3D9]">
              Our Team
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B1324] mt-3">
              Our Team
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(showAllTeam ? teamMembers : teamMembers.slice(0, 12)).map((tm, i) => (
              <div 
                key={i} 
                className="p-5 rounded-3xl bg-[#FAF9F6] cube-glass border border-[#E7E3D9] flex items-center gap-4 hover:shadow-md hover:border-[#A8832F] transition-all duration-300"
              >
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-white ring-1 ring-[#E7E3D9] bg-white">
                  <Image src={tm.image || '/images/team/team_unknown.png'} alt={tm.name} fill className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-serif font-bold text-[#0B1324] text-sm truncate">{tm.name}</h4>
                  <p className="text-[11px] font-semibold text-[#C29A3E] truncate">{tm.designation}</p>
                  <p className="text-[10px] text-[#5B6474] truncate">{tm.department}</p>
                </div>
              </div>
            ))}
          </div>

          {/* View More / View Less Toggle Button */}
          <div className="mt-12 text-center">
            <button
              onClick={() => setShowAllTeam(!showAllTeam)}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-[#0B1324] hover:bg-[#C29A3E] shadow-[0_8px_24px_rgba(7,14,92,0.15)] hover:shadow-lg transition-all duration-300 active:scale-95 cursor-pointer"
            >
              <span>{showAllTeam ? 'Show Less (12 Members)' : `View All ${teamMembers.length} Members (+${Math.max(teamMembers.length - 12, 0)} More)`}</span>
              <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${showAllTeam ? '-rotate-90' : 'rotate-90'}`} />
            </button>
          </div>
        </div>
      </section>

      {/* 9. CLIENTS & PARTNERS */}
      <section id="clients-partners" className="py-20 sm:py-24 bg-gradient-to-b from-[#FAF9F6] to-[#FFFFFF]">
        <div className="max-w-none mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B1324] bg-[#F4F2EC] px-3.5 py-1 rounded-full border border-[#E7E3D9]">
              Our Clients
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B1324] mt-3">
              Our Clients
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {clients.map((client, i) => (
              <div 
                key={i} 
                className="h-28 p-4 rounded-2xl bg-white/90 cube-glass backdrop-blur-xl border border-[#E7E3D9]/80 shadow-[0_4px_16px_rgba(7,14,92,0.03),inset_0_1px_1px_rgba(255,255,255,0.95)] hover:border-[#A8832F] hover:scale-105 transition-all duration-300 flex flex-col items-center justify-center text-center group"
              >
                <div className="relative h-14 w-full flex items-center justify-center">
                  <Image
                    src={client.logo || '/images/clients/client_1.png'}
                    alt={clientLogoAlt(client.name)}
                    fill
                    className="object-contain filter grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
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
