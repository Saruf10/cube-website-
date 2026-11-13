'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Mail, Phone, ArrowUpRight, Linkedin, Twitter, Facebook } from 'lucide-react';
import { contactInfo } from '@/data/contact';

const VERTICAL_LINKS = [
  { label: 'Building & Construction', href: '/verticals/building-construction' },
  { label: 'Environment & Sustainability', href: '/verticals/environment-sustainability' },
  { label: 'Smart Cities', href: '/verticals/smart-cities' },
  { label: 'Urban Planning & Transportation', href: '/verticals/urban-planning-transportation' },
  { label: 'CEL', href: '/cel' },
];

const GOVERNANCE_LINKS = [
  { label: 'About CUBE', href: '/about' },
  { label: 'Vision & Mission', href: '/about/vision-mission' },
  { label: 'Chairman Message', href: '/about/chairman-message' },
  { label: 'Board Members', href: '/about#governing-board' },
  { label: 'IIT Advisory Panel', href: '/about/advisory-panel' },
  { label: 'Our Team', href: '/about/team' },
];

const SOCIAL = [
  { label: 'LinkedIn', href: contactInfo.socialLinks.linkedin, icon: Linkedin },
  { label: 'Twitter', href: contactInfo.socialLinks.twitter, icon: Twitter },
  { label: 'Facebook', href: contactInfo.socialLinks.facebook, icon: Facebook },
];

const CREDENTIALS = [
  {
    title: 'Centre of Excellence',
    body: 'Raised by IIT Madras and the Government of Tamil Nadu.',
  },
  {
    title: 'Applied Technology & Consultancy',
    body: 'An Applied Technology, Consultancy, Advisory and Research Centre.',
  },
  {
    title: 'CUBE Environmental Laboratory (CEL)',
    body: 'Analytical, testing and consultancy services across water, wastewater and solid waste domains.',
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
              Centre for Urbanization, Buildings &amp; Environment (CUBE) has been raised by IIT Madras and the Government of
              Tamil Nadu as an Applied Technology, Consultancy, Advisory and Research Centre.
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
            <FooterHeading>Verticals</FooterHeading>
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
            <FooterHeading>About</FooterHeading>
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
            <FooterHeading>Contact Us</FooterHeading>
            <div className="space-y-4 text-[14px] text-white/65">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brass-400" />
                <span className="leading-relaxed">
                  {contactInfo.address}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-brass-400" />
                <a href={`mailto:${contactInfo.email}`} className="font-medium text-white transition-colors hover:text-brass-300">
                  {contactInfo.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-brass-400" />
                <a href={contactInfo.phoneHref} className="font-medium text-white transition-colors hover:text-brass-300">
                  {contactInfo.phone}
                </a>
              </div>
            </div>
            <Link href="/contact" className="btn-brass mt-8">
              <span>Get in Touch</span>
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
              IIT Madras &amp; Government of Tamil Nadu.
            </span>
          </div>
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.16em]">
            {[
              ['Tenders', '/tenders'],
              ['Careers', '/careers'],
              ['Media', '/media'],
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
