'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { clientDisplayName, clientLogoAlt } from '@/lib/content';
import { ClientPartner } from '@/types';
import SectionHeading from '@/components/home/SectionHeading';

interface Interactive3DClientsProps {
  clients: ClientPartner[];
}

function LogoTile({ client }: { client: ClientPartner }) {
  const name = clientDisplayName(client.name);
  return (
    <div className="group flex h-28 w-52 sm:w-60 shrink-0 flex-col items-center justify-center border-r border-stone-200 px-6">
      <div className="relative h-14 w-full">
        <Image
          src={client.logo || '/images/clients/client_1.png'}
          alt={clientLogoAlt(client.name)}
          fill
          sizes="240px"
          className="object-contain grayscale opacity-90 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100"
        />
      </div>
      {name && (
        <span className="mt-2.5 max-w-full truncate text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-500 transition-colors group-hover:text-ink">
          {name}
        </span>
      )}
    </div>
  );
}

export default function Interactive3DClients({ clients }: Interactive3DClientsProps) {
  const displayClients = clients && clients.length > 0 ? clients : [];

  // Each track holds its list twice so a -50% translate loops seamlessly.
  const row1 = [...displayClients, ...displayClients];
  const row2 = [...displayClients.slice().reverse(), ...displayClients.slice().reverse()];

  // ~3s per logo so the rows glide calmly; the second row runs a little slower.
  const baseSeconds = Math.max(30, displayClients.length * 3);

  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-32 select-none">
      <div className="mx-auto mb-16 max-w-none px-5 sm:px-8 lg:px-12">
        <SectionHeading
          index="10"
          eyebrow="Trusted Institutional Ecosystem"
          title={
            <>
              Government departments <span className="text-brass-300">&amp; industry partners.</span>
            </>
          }
          description="Powering state infrastructure, third-party quality assurance, precast engineering, and environmental stewardship across India."
          action={
            <Link href="/about#clients-partners" className="link-arrow">
              <span>All Government &amp; Corporate Clients</span>
              <ArrowUpRight className="h-4 w-4 text-brass-600" />
            </Link>
          }
        />
      </div>

      <div className="relative border-y border-stone-200">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 sm:w-48 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 sm:w-48 bg-gradient-to-l from-white to-transparent" />

        <div className="overflow-hidden border-b border-stone-200">
          <div
            className="flex w-max items-center animate-marquee hover:[animation-play-state:paused] will-change-transform"
            style={{ animationDuration: `${baseSeconds}s` }}
          >
            {row1.map((client, idx) => (
              <LogoTile key={`row1-${client.name}-${idx}`} client={client} />
            ))}
          </div>
        </div>

        <div className="overflow-hidden">
          <div
            className="flex w-max items-center animate-marquee-reverse hover:[animation-play-state:paused] will-change-transform"
            style={{ animationDuration: `${Math.round(baseSeconds * 1.1)}s` }}
          >
            {row2.map((client, idx) => (
              <LogoTile key={`row2-${client.name}-${idx}`} client={client} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
