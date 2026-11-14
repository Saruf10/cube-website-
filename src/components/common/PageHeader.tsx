'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { displayTitle } from '@/lib/displayTitle';

interface PageHeaderProps {
  badge: string;
  title: string;
  description: string;
  breadcrumbs: { label: string; href?: string }[];
  backHref?: string;
}

/**
 * Split a title so its last real word can be set in the gold italic accent used on
 * the home hero ("Shaping Tomorrow."). A trailing parenthetical such as "(CEL)"
 * stays plain: "CUBE Environmental *Laboratory* (CEL)".
 */
function splitTitle(title: string) {
  const words = title.trim().split(/\s+/);
  let i = words.length - 1;
  while (i > 0 && !/^[A-Za-z]/.test(words[i])) i -= 1;
  if (words.length < 2 || i === 0) return { before: '', accent: '', after: title };
  return {
    before: words.slice(0, i).join(' '),
    accent: words[i],
    after: words.slice(i + 1).join(' '),
  };
}

/**
 * Inner-page hero, matching the home page: full-bleed dark navy band with the
 * blueprint grid, a metadata rail (back + breadcrumbs), gold eyebrow, large display
 * headline with a gold italic accent word, and a supporting paragraph.
 */
/**
 * Headline size by title length: short page names stay poster-sized, long
 * project titles (often 100-300 characters) step down so they read as a heading.
 */
function headlineSize(length: number): string {
  if (length <= 40) return 'text-[clamp(2.4rem,6vw,5.4rem)]';
  if (length <= 80) return 'text-[clamp(2.1rem,4.6vw,4.25rem)]';
  if (length <= 140) return 'text-[clamp(1.85rem,3.4vw,3.25rem)] leading-[1.08]';
  return 'text-[clamp(1.6rem,2.6vw,2.5rem)] leading-[1.15]';
}

export default function PageHeader({ badge, title: rawTitle, description, breadcrumbs, backHref }: PageHeaderProps) {
  const router = useRouter();
  const title = displayTitle(rawTitle);
  const { before, accent, after } = splitTitle(title);

  const handleBack = () => {
    if (backHref) {
      router.push(backHref);
      return;
    }
    // Only step back through history when the previous page was on this site;
    // otherwise (opened from Google, a shared link, a new tab) "Back" used to
    // leave the website or do nothing. Fall back to the breadcrumb parent.
    const cameFromThisSite =
      typeof document !== 'undefined' &&
      document.referrer.startsWith(window.location.origin) &&
      window.history.length > 1;
    if (cameFromThisSite) {
      router.back();
      return;
    }
    const parent = [...(breadcrumbs || [])].reverse().find((crumb) => crumb.href)?.href;
    router.push(parent || '/');
  };

  return (
    <section className="relative flex min-h-[clamp(520px,72svh,820px)] w-full select-none flex-col overflow-hidden bg-ink-950 pt-[5.5rem] text-white sm:pt-28 lg:pt-[7rem]">
      {/* Background: blueprint grid, brass glow and a directional ink wash */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-ink-950 via-ink-900 to-ink-950" />
        <div
          aria-hidden
          className="absolute inset-0 blueprint-grid-dark opacity-70 [mask-image:radial-gradient(ellipse_at_30%_60%,black_20%,transparent_75%)]"
        />
        <div className="absolute -left-40 top-1/3 h-[520px] w-[520px] rounded-full bg-brass-500/10 blur-[140px]" />
        <div className="absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-ink-600/30 blur-[120px]" />
      </div>

      {/* Metadata rail: back button + breadcrumbs */}
      <div className="relative z-10 w-full px-5 sm:px-8 lg:px-12">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <button
            onClick={handleBack}
            className="group inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/70 transition-colors hover:text-brass-300"
            title="Go back to previous page"
            aria-label="Back"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Back</span>
          </button>

          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-3 overflow-x-auto py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/45 no-scrollbar"
          >
            <Link href="/" className="shrink-0 transition-colors hover:text-brass-300">
              Home
            </Link>
            {breadcrumbs.map((b, i) => (
              <React.Fragment key={i}>
                <span className="shrink-0 text-white/25">/</span>
                {b.href ? (
                  <Link href={b.href} className="shrink-0 transition-colors hover:text-brass-300">
                    {b.label}
                  </Link>
                ) : (
                  <span className="max-w-[40ch] truncate text-white/90">{displayTitle(b.label)}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        </div>
      </div>

      {/* Headline block, anchored to the bottom of the band */}
      <div className="relative z-10 flex w-full flex-1 items-end px-5 pb-[clamp(2.5rem,7vh,5rem)] pt-12 sm:px-8 lg:px-12">
        <div className="max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="eyebrow eyebrow-light"
          >
            {badge}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className={`display-xl mt-6 text-white ${headlineSize(title.length)}`}
          >
            {before && <>{before} </>}
            {accent && (
              <span className="font-editorial italic font-medium tracking-[-0.02em] text-brass-300">{accent}</span>
            )}
            {after && <> {after}</>}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 max-w-3xl text-base leading-relaxed text-white/70 sm:text-lg"
          >
            {description}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
