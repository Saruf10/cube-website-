'use client';

import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import Link from 'next/link';

import { 

  Building2, Leaf, Cpu, Compass, ArrowUpRight, ShieldCheck, 

  FlaskConical, CheckCircle2, Award, Users, ChevronRight, 

  Sparkles, ExternalLink, FileText, Calendar, MapPin

} from 'lucide-react';

import ArchitecturalHero from '@/components/hero/ArchitecturalHero';

import CinematicImageStrip from '@/components/home/CinematicImageStrip';


import SustainabilityStorytelling from '@/components/home/SustainabilityStorytelling';
import SectionHeading from '@/components/home/SectionHeading';
import VerticalsShowcase from '@/components/home/VerticalsShowcase';
import ProjectsShowcase from '@/components/home/ProjectsShowcase';
import CELDatasheet from '@/components/home/CELDatasheet';
import ClientsWall from '@/components/home/ClientsWall';

import { verticals as fallbackVerticals } from '@/data/verticals';
import { CMS_UPDATED_EVENT } from '@/lib/live';

import { projects as fallbackProjects } from '@/data/projects';

import { celOverview } from '@/data/cel';

import { aboutContent } from '@/data/about';

import { boardMembers as fallbackBoardMembers, executiveLeadership } from '@/data/leadership';

const fallbackCeo = executiveLeadership.find((l) => (l.role || '').toUpperCase().includes('CEO'));
const fallbackLeadershipList: any[] = fallbackCeo
  ? [{ ...fallbackCeo, category: 'CEO' }, ...fallbackBoardMembers]
  : fallbackBoardMembers;

import { newsItems as fallbackNewsItems } from '@/data/news';

import { clients as fallbackClients } from '@/data/clients';

export default function HomePage() {

  const [activeProjectTab, setActiveProjectTab] = useState<string>('All');
  const [projectList, setProjectList] = useState<any[]>(fallbackProjects);
  const [verticalList, setVerticalList] = useState<any[]>(fallbackVerticals);
  const [celServiceList, setCelServiceList] = useState<any[]>(celOverview.testingServices);
  const [boardList, setBoardList] = useState<any[]>(fallbackLeadershipList);
  const [clientList, setClientList] = useState<any[]>(fallbackClients);
  const [newsList, setNewsList] = useState<any[]>(fallbackNewsItems);

  useEffect(() => {
    let active = true;

    const getJson = async (url: string) => {
      try {
        const res = await fetch(url, { cache: 'no-store' });
        return res.ok ? await res.json() : null;
      } catch {
        return null;
      }
    };

    const load = async () => {
      const [projectsData, verticalsData, celData, teamData, clientsData, newsData] =
        await Promise.all([
          getJson('/api/public/projects'),
          getJson('/api/public/verticals'),
          getJson('/api/public/cel'),
          getJson('/api/public/team'),
          getJson('/api/public/clients'),
          getJson('/api/public/news'),
        ]);

      if (!active) return;

      if (Array.isArray(projectsData)) {
        setProjectList(projectsData);
      }
      if (Array.isArray(verticalsData)) {
        setVerticalList(verticalsData);
      }
      if (Array.isArray(celData)) {
        setCelServiceList(celData);
      }
      if (Array.isArray(teamData)) {
        const board = teamData
          .filter((member: any) => member.category === 'board')
          .map((member: any) => ({
            ...member,
            role: member.designation || member.role || '',
            organization: member.organization || member.department || 'IIT Madras',
          }));
        const leadership = teamData
          .filter((member: any) => member.category === 'leadership')
          .map((member: any) => ({
            ...member,
            role: member.designation || member.role || '',
            organization: member.organization || member.department || 'IIT Madras',
          }));
        const ceo = leadership.find((l: any) => (l.role || '').toUpperCase().includes('CEO'));
        const leaders = ceo
          ? [{ ...ceo, category: 'CEO' }, ...board]
          : board.length > 0
          ? board
          : leadership;
        setBoardList(leaders);
      }
      if (Array.isArray(clientsData)) {
        setClientList(
          clientsData.map((client: any) => ({
            ...client,
            category: client.category || 'Public Sector',
            logo: client.logo || client.logoUrl || '',
          }))
        );
      }
      if (Array.isArray(newsData)) {
        setNewsList(
          newsData.map((item: any) => ({
            ...item,
            summary: item.summary || item.excerpt || '',
          }))
        );
      }
    };

    load();
    // Refetch instantly whenever an admin saves content (see LiveSync).
    window.addEventListener(CMS_UPDATED_EVENT, load);
    window.addEventListener('focus', load);

    return () => {
      active = false;
      window.removeEventListener(CMS_UPDATED_EVENT, load);
      window.removeEventListener('focus', load);
    };
  }, []);

  const filteredProjects = activeProjectTab === 'All'
    ? projectList.filter(p => p.featured).slice(0, 6)
    : projectList.filter(p => p.category === activeProjectTab).slice(0, 6);

  const projectTabs = [
    { key: 'All', label: 'Featured' },
    { key: 'Building & Construction', label: 'Buildings' },
    { key: 'Environment & Sustainability', label: 'Environment' },
    { key: 'Smart Cities', label: 'Smart Cities' },
    { key: 'Urban Planning & Transportation', label: 'Transport' },
  ];

  const lifeAtCube = [
    {
      image: '/images/life-at-cube/about_life.jpg',
      alt: 'Life at CUBE - Collaborative Engineering',
      title: 'Collaborative Engineering',
      body: 'Interdisciplinary technical reviews and peer audits at IIT Madras Research Park.',
    },
    {
      image: '/images/life-at-cube/about_life1.jpg',
      alt: 'Life at CUBE - Faculty Mentorship',
      title: 'Academic Faculty Guidance',
      body: 'Continuous mentorship from renowned IIT Madras professors and technical panels.',
    },
    {
      image: '/images/life-at-cube/about_life2.jpg',
      alt: 'Life at CUBE - Hands-on Field Testing',
      title: 'Hands-On Site Testing',
      body: 'Precision field inspection and non-destructive testing on high-stakes infrastructure sites.',
    },
  ];

  return (
    <div className="home-page flex flex-col min-h-screen text-ink">
      {/* HERO */}
      <ArchitecturalHero />

      {/* 01 · SELECTED WORK */}
      <CinematicImageStrip />

      {/* 03 · VERTICALS */}
      {/* On desktop the section pins while scrolling opens each vertical in turn. */}
      <section
        className="relative bg-stone-100 py-24 sm:py-32 lg:h-[calc(100svh+var(--vcount)*75svh)] lg:py-0"
        style={{ '--vcount': verticalList.length } as React.CSSProperties}
      >
        <div className="lg:sticky lg:top-0 lg:flex lg:h-[100svh] lg:flex-col lg:justify-center lg:py-[clamp(2rem,6vh,4.5rem)]">
        <div className="mx-auto w-full max-w-none px-5 sm:px-8 lg:px-12">
          <SectionHeading
            index="03"
            eyebrow="Specialized Disciplines"
            title={
              <>
                Four core engineering{' '}
                <span className="block text-[1.45em] leading-[0.95] text-brass-300">verticals.</span>
              </>
            }
            description="Open each discipline to explore core capabilities, testing domains, and verified state projects guided by CUBE specialists."
            action={
              <Link href="/verticals" className="link-arrow">
                <span>All Verticals &amp; Faculties</span>
                <ArrowUpRight className="h-4 w-4 text-brass-600" />
              </Link>
            }
          />

          <div className="mt-16 lg:mt-[clamp(1.5rem,4.5vh,4rem)]" data-reveal data-reveal-delay="1">
            <VerticalsShowcase verticals={verticalList} />
          </div>
        </div>
        </div>
      </section>

      {/* 04 · PROJECTS */}
      <section className="bg-white py-24 sm:py-32 lg:flex lg:min-h-[100svh] lg:flex-col lg:justify-center lg:[&>*:not(.absolute)]:w-full">
        <div className="mx-auto max-w-none px-5 sm:px-8 lg:px-12">
          <SectionHeading
            index="04"
            eyebrow="Applied Execution"
            title={
              <>
                Featured applied <span className="text-brass-300">projects.</span>
              </>
            }
            description="Independent Third Party Quality Assurance (TPQA), PMC, and structural proof checking across 40+ premier public schemes."
          />

          {/* Segmented filter */}
          <div data-reveal data-reveal-delay="1" className="mt-12 flex gap-1 overflow-x-auto no-scrollbar border-b border-stone-200" role="tablist" aria-label="Filter projects by vertical">
            {projectTabs.map((tab) => {
              const active = activeProjectTab === tab.key;
              return (
                <button
                  key={tab.key}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveProjectTab(tab.key)}
                  className={`relative shrink-0 px-4 sm:px-5 pb-4 pt-2 text-[12px] font-semibold uppercase tracking-[0.14em] transition-colors ${
                    active ? 'text-ink' : 'text-stone-400 hover:text-ink'
                  }`}
                >
                  {tab.label}
                  <span
                    aria-hidden
                    className={`absolute inset-x-0 -bottom-px h-[2px] bg-brass-400 transition-transform duration-300 origin-left ${
                      active ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <div className="mt-12" data-reveal data-reveal-delay="2">
            <ProjectsShowcase key={activeProjectTab} projects={filteredProjects} />
          </div>

          <div className="mt-16 flex justify-center">
            <Link href="/projects" className="btn-primary">
              <span>All 40+ Projects &amp; Case Studies</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 05 · SUSTAINABILITY */}
      <SustainabilityStorytelling />

      {/* 06 · CEL LABORATORY */}
      <section className="relative overflow-hidden bg-stone-50 py-24 sm:py-32 lg:flex lg:min-h-[100svh] lg:flex-col lg:justify-center lg:[&>*:not(.absolute)]:w-full">
        <div aria-hidden className="absolute inset-0 blueprint-grid opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_60%)]" />
        <div className="relative z-10 mx-auto max-w-none px-5 sm:px-8 lg:px-12">
          <SectionHeading
            index="06"
            eyebrow="Analytical Testing · IIT Madras Research Park"
            title={
              <>
                CUBE Environmental <span className="text-brass-300">Laboratory.</span>
              </>
            }
            description="CEL is a precision environmental and materials testing facility delivering physical, chemical, and microbiological analysis for water, wastewater, soil, heavy metals, and building materials in compliance with BIS, ISO, and CPCB protocols."
            action={
              <div className="flex flex-wrap gap-3">
                <Link href="/cel" className="btn-primary">
                  <FlaskConical className="h-4 w-4 !transform-none" />
                  <span>Testing Capabilities</span>
                </Link>
                <Link href="/cel#enquiry" className="btn-outline">
                  <span>Book a Sample</span>
                </Link>
              </div>
            }
          />

          <div className="mt-16" data-reveal data-reveal-delay="1">
            <CELDatasheet services={celServiceList} />
          </div>
        </div>
      </section>

      {/* 08 · LIFE AT CUBE */}
      <section className="bg-stone-100 py-24 sm:py-32 lg:flex lg:min-h-[100svh] lg:flex-col lg:justify-center lg:[&>*:not(.absolute)]:w-full">
        <div className="mx-auto max-w-none px-5 sm:px-8 lg:px-12">
          <SectionHeading
            index="08"
            eyebrow="Workplace & Culture"
            title={
              <>
                Life at <span className="font-editorial italic font-medium tracking-[-0.02em] text-brass-600">CUBE.</span>
              </>
            }
            description="A collaborative research ecosystem uniting IIT Madras faculty, senior engineering consultants, and young researchers."
            action={
              <Link href="/life-at-cube" className="link-arrow">
                <span>Gallery &amp; Workplace Culture</span>
                <ArrowUpRight className="h-4 w-4 text-brass-600" />
              </Link>
            }
          />

          <div data-reveal data-reveal-delay="1" className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-12 md:grid-rows-2">
            {lifeAtCube.map((item, i) => (
              <Link
                key={item.title}
                href="/life-at-cube"
                className={`group relative overflow-hidden rounded-xl bg-ink ${
                  i === 0 ? 'aspect-[4/3] md:col-span-7 md:row-span-2 md:aspect-auto md:min-h-[560px]' : 'aspect-[16/10] md:col-span-5 md:aspect-auto md:min-h-[268px]'
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes={i === 0 ? '(max-width: 768px) 100vw, 58vw' : '(max-width: 768px) 100vw, 42vw'}
                  className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <span className="text-[11px] font-bold tabular-nums text-brass-300">0{i + 1}</span>
                  <h3 className={`mt-2 font-display font-semibold tracking-[-0.02em] text-white ${i === 0 ? 'text-2xl sm:text-3xl' : 'text-xl'}`}>
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-md text-[13px] leading-relaxed text-white/65">{item.body}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 09 · CLIENTS */}
      <ClientsWall clients={clientList} />

      {/* 10 · NEWS */}
      <section className="bg-stone-50 py-24 sm:py-32 lg:flex lg:min-h-[100svh] lg:flex-col lg:justify-center lg:[&>*:not(.absolute)]:w-full border-t border-stone-200">
        <div className="mx-auto max-w-none px-5 sm:px-8 lg:px-12">
          <SectionHeading
            index="10"
            eyebrow="Media & Dispatches"
            title={
              <>
                Latest news <span className="text-brass-300">&amp; updates.</span>
              </>
            }
            action={
              <Link href="/media/news" className="link-arrow">
                <span>All Releases</span>
                <ArrowUpRight className="h-4 w-4 text-brass-600" />
              </Link>
            }
          />

          {newsList.length > 0 && (
            <div data-reveal data-reveal-delay="1" className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
              {/* Lead story */}
              <Link href={`/media/news/${newsList[0].slug || newsList[0].id}`} className="group lg:col-span-7">
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-stone-200">
                  <Image
                    src={newsList[0].image || '/images/media/news/images_news1.jpg'}
                    alt={newsList[0].title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute left-5 top-5 flex gap-2">
                    <span className="chip-brass">Latest</span>
                    {newsList[0].category && <span className="chip-light">{newsList[0].category}</span>}
                  </div>
                </div>
                {newsList[0].date && (
                  <div className="mt-7 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-500">
                    <Calendar className="h-3.5 w-3.5 text-brass-500" />
                    <span>{newsList[0].date}</span>
                  </div>
                )}
                <h3 className="mt-7 max-w-2xl font-display text-2xl sm:text-[2rem] font-semibold leading-tight tracking-[-0.025em] text-ink transition-colors group-hover:text-brass-700">
                  {newsList[0].title}
                </h3>
                <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#5B6474] line-clamp-3">{newsList[0].summary}</p>
                <div className="mt-6 link-arrow">
                  <span>Read Release</span>
                  <ArrowUpRight className="h-4 w-4 text-brass-600" />
                </div>
              </Link>

              {/* Dispatch list */}
              <div className="lg:col-span-5">
                <div className="flex items-center justify-between border-b border-ink pb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-ink">
                  <span>More Dispatches</span>
                  <span className="tabular-nums text-stone-400">{String(Math.max(newsList.length - 1, 0)).padStart(2, '0')}</span>
                </div>
                <ul>
                  {newsList.slice(1, 6).map((item, i) => (
                    <li key={item.id} className="border-b border-stone-200">
                      <Link href={`/media/news/${item.slug || item.id}`} className="group flex gap-5 py-6">
                        <span className="pt-1 text-[11px] font-bold tabular-nums text-stone-400 transition-colors group-hover:text-brass-600">
                          {String(i + 2).padStart(2, '0')}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-x-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-400">
                            <span>{item.date}</span>
                            {item.category && (
                              <>
                                <span className="h-2.5 w-px bg-stone-300" />
                                <span className="text-brass-600">{item.category}</span>
                              </>
                            )}
                          </div>
                          <h4 className="mt-2 font-display text-[16px] font-semibold leading-snug tracking-[-0.01em] text-ink/80 line-clamp-2 transition-colors group-hover:text-ink">
                            {item.title}
                          </h4>
                        </div>
                        <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-md bg-stone-200">
                          <Image
                            src={item.image || '/images/media/news/images_news1.jpg'}
                            alt=""
                            fill
                            sizes="96px"
                            className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                          />
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="grain relative overflow-hidden bg-ink py-24 sm:py-32 lg:flex lg:min-h-[100svh] lg:flex-col lg:justify-center lg:[&>*:not(.absolute)]:w-full text-white">
        <div aria-hidden className="absolute inset-0 blueprint-grid-dark" />
        <div aria-hidden className="absolute left-1/2 top-1/2 h-[520px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brass-500/10 blur-[140px]" />

        <div className="relative z-10 mx-auto max-w-none px-5 sm:px-8 lg:px-12">
          <div data-reveal className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <span className="eyebrow eyebrow-light">Collaborate With CUBE</span>
              <h2 className="display-xl mt-6 text-[2.5rem] sm:text-6xl lg:text-7xl text-white">
                Engage CUBE for applied{' '}
                <span className="font-editorial italic font-medium tracking-[-0.02em] text-brass-300">consultancy</span>{' '}
                &amp; testing.
              </h2>
              <p className="mt-8 max-w-2xl text-base leading-relaxed text-white/60">
                Connect with our faculty advisors and multidisciplinary engineering teams at IIT Madras Research Park for
                third-party quality assurance, precast engineering, water resources, or laboratory testing.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/contact" className="btn-brass">
                  <span>Submit Project Enquiry</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link href="/cel" className="btn-outline-light">
                  <span>CEL Testing Schedule</span>
                </Link>
              </div>
            </div>

            <div className="hidden lg:col-span-4 lg:flex lg:justify-end">
              <div className="crop-marks relative flex h-72 w-72 items-center justify-center rounded-2xl bg-white shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]">
                <div className="relative h-52 w-52">
                  <Image
                    src="/images/branding/cube-primary-logo.png"
                    alt="CUBE Primary Institutional Logo"
                    fill
                    sizes="208px"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
