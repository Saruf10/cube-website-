'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Mail, Phone, Clock, ArrowUpRight, Linkedin, Twitter, Facebook } from 'lucide-react';

const VERTICAL_LINKS = [
  { label: 'Building & Construction', href: '/verticals/building-construction' },
  { label: 'Environment & Sustainability', href: '/verticals/environment-sustainability' },
  { label: 'Smart Cities & IoT', href: '/verticals/smart-cities' },
  { label: 'Urban Planning & Transportation', href: '/verticals/urban-planning-transportation' },
  { label: 'CEL Laboratory Testing', href: '/cel' },
];

const GOVERNANCE_LINKS = [
  { label: 'About Overview', href: '/about' },
  { label: 'Vision & Mission', href: '/about/vision-mission' },
  { label: 'Chairman Message', href: '/about/chairman-message' },
  { label: 'Governing Board', href: '/about#governing-board' },
  { label: 'IIT Advisory Panel', href: '/about/advisory-panel' },
  { label: 'Our Team (80+)', href: '/about/team' },
];

const SOCIAL = [
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
  { label: 'Twitter', href: 'https://twitter.com', icon: Twitter },
  { label: 'Facebook', href: 'https://facebook.com', icon: Facebook },
];

const CREDENTIALS = [
  {
    title: 'Centre of Excellence',
    body: 'Established jointly by the Government of Tamil Nadu & Indian Institute of Technology Madras.',
  },
  {
    title: 'Engineering Consultancy',
    body: 'Independent Third Party Quality Assurance (TPQA) & structural proof checking for 40+ schemes.',
  },
  {
    title: 'CUBE Environmental Lab (CEL)',
    body: 'Advanced water, wastewater, soil, and building materials testing facility at IITM Research Park.',
  },
];

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="mb-6 text-[11px] font-bold uppercase tracking-[0.24em] text-brass-300">{children}</h4>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="grain relative overflow-hidden bg-ink-950 text-white">
      <div aria-hidden className="absolute inset-0 blueprint-grid-dark opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />

      {/* Credentials strip */}
      <div className="relative border-b border-white/10">
        <div className="mx-auto grid max-w-none grid-cols-1 md:grid-cols-3">
          {CREDENTIALS.map((item, i) => (
            <div
              key={item.title}
              className={`px-5 py-10 sm:px-8 lg:px-12 ${i > 0 ? 'border-t border-white/10 md:border-l md:border-t-0' : ''}`}
            >
              <div className="flex items-baseline gap-4">
                <span className="text-[11px] font-bold tabular-nums text-brass-400">0{i + 1}</span>
                <div>
                  <div className="font-display text-base font-semibold tracking-[-0.01em] text-white">{item.title}</div>
                  <p className="mt-2 text-[13px] leading-relaxed text-white/50">{item.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main grid */}
      <div className="relative mx-auto max-w-none px-5 py-20 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block">
              <div className="relative h-16 w-72">
                <Image
                  src="/images/branding/cube-logo-darkbg.png"
                  alt="CUBE - Centre for Urbanization, Buildings & Environment"
                  fill
                  sizes="288px"
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="mt-7 max-w-sm text-[14px] leading-relaxed text-white/55">
              An autonomous Centre of Excellence translating cutting-edge academic research from IIT Madras into resilient
              public infrastructure, sustainable water systems, and smart urban environments.
            </p>
            <div className="mt-8 flex items-center gap-2">
              {SOCIAL.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all hover:border-brass-400 hover:bg-brass-400 hover:text-ink"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <FooterHeading>Core Verticals</FooterHeading>
            <ul className="space-y-3.5">
              {VERTICAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="group inline-flex items-center text-[14px] text-white/65 transition-colors hover:text-white">
                    <span className="h-px w-0 bg-brass-400 transition-all duration-300 group-hover:mr-2 group-hover:w-3" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <FooterHeading>Governance</FooterHeading>
            <ul className="space-y-3.5">
              {GOVERNANCE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="group inline-flex items-center text-[14px] text-white/65 transition-colors hover:text-white">
                    <span className="h-px w-0 bg-brass-400 transition-all duration-300 group-hover:mr-2 group-hover:w-3" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <FooterHeading>Institutional Office</FooterHeading>
            <div className="space-y-4 text-[14px] text-white/65">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brass-400" />
                <span className="leading-relaxed">
                  First Floor, IIT Madras Research Park, Kanagam Road, Taramani, Chennai, Tamil Nadu 600113, India
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-brass-400" />
                <a href="mailto:contact@cubeiitm.org" className="font-medium text-white transition-colors hover:text-brass-300">
                  contact@cubeiitm.org
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-brass-400" />
                <a href="tel:+914466469800" className="font-medium text-white transition-colors hover:text-brass-300">
                  +91 44 6646 9800
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 shrink-0 text-brass-400" />
                <span>Monday &ndash; Friday: 9:00 AM &ndash; 5:30 PM (IST)</span>
              </div>
            </div>
            <Link href="/contact" className="btn-brass mt-8">
              <span>Submit Technical Query</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Legal bar */}
      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-none flex-col items-start justify-between gap-4 px-5 py-7 text-[12px] text-white/40 sm:px-8 md:flex-row md:items-center lg:px-12">
          <div>
            &copy; {currentYear} Centre for Urbanization, Buildings &amp; Environment (CUBE). All rights reserved.
            <span className="block text-white/30 sm:ml-2 sm:inline">
              Autonomous Centre of Excellence &middot; Govt of Tamil Nadu &amp; IIT Madras.
            </span>
          </div>
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.16em]">
            {[
              ['Tenders', '/tenders'],
              ['Careers', '/careers'],
              ['Media Center', '/media'],
              ['Contact', '/contact'],
            ].map(([label, href]) => (
              <Link key={href} href={href} className="transition-colors hover:text-brass-300">
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
