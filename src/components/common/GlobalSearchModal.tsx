'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowUpRight, Search, X } from 'lucide-react';
import { projects as fallbackProjects } from '@/data/projects';
import { verticals } from '@/data/verticals';
import { celOverview } from '@/data/cel';
import { newsItems as fallbackNews } from '@/data/news';
import { displayTitle } from '@/lib/displayTitle';

const txt = (v: unknown) => (typeof v === 'string' ? v : '').toLowerCase();

const SUGGESTIONS = ['Housing', 'TPQA', 'Water', 'Flood', 'Structural audit', 'Testing'];

const QUICK_LINKS = [
  { label: 'All projects', href: '/projects' },
  { label: 'CEL laboratory', href: '/cel' },
  { label: 'Tenders', href: '/tenders' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
];

const GROUP_LIMIT = 5;

type Result = { title: string; meta: string; href: string };
type Group = { label: string; items: Result[] };

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/** Wraps each case-insensitive match of `q` in a brass underline. */
function Highlight({ text, q }: { text: string; q: string }) {
  if (!q) return <>{text}</>;
  const parts = text.split(new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'ig'));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === q.toLowerCase() ? (
          <mark key={i} className="bg-transparent text-inherit underline decoration-brass-400 decoration-2 underline-offset-4">
            {part}
          </mark>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        ),
      )}
    </>
  );
}

export default function GlobalSearchModal({ isOpen, onClose }: GlobalSearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const [projects, setProjects] = useState<any[]>(fallbackProjects);
  const [newsItems, setNewsItems] = useState<any[]>(fallbackNews);
  const [celServices, setCelServices] = useState<any[]>(celOverview.testingServices);
  const listRef = useRef<HTMLDivElement>(null);

  // Load live CMS data only when the search opens (no cost on normal page loads).
  useEffect(() => {
    if (!isOpen) return;
    const get = (url: string, set: (v: any[]) => void) =>
      fetch(url, { cache: 'no-store' })
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => Array.isArray(d) && set(d))
        .catch(() => {});
    get('/api/public/projects', setProjects);
    get('/api/public/news', setNewsItems);
    get('/api/public/cel', setCelServices);
  }, [isOpen]);

  // Lock body scroll when open. Restore the previous value on close instead of
  // forcing 'auto', which undid other scroll locks (mobile menu, gallery viewer).
  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      return;
    }
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  const q = query.trim();

  const groups = useMemo<Group[]>(() => {
    if (!q) return [];
    const s = q.toLowerCase();

    const vert: Result[] = verticals
      .filter((v) => txt(v.title).includes(s) || txt(v.description).includes(s) || v.capabilities.some((c) => txt(c).includes(s)))
      .map((v) => ({ title: v.title, meta: 'Vertical', href: `/verticals/${v.slug}` }));

    const proj: Result[] = projects
      .filter((p) => p.status !== 'archived')
      .filter((p) => txt(p.title).includes(s) || txt(p.description).includes(s) || txt(p.category).includes(s))
      .map((p) => ({ title: displayTitle(p.title || ''), meta: p.category || 'Project', href: `/projects/${p.slug}` }));

    const cel: Result[] = celServices
      .filter((c) => txt(c.title).includes(s) || txt(c.description).includes(s) || (c.parameters || []).some((x: string) => txt(x).includes(s)))
      .map((c) => ({ title: c.title, meta: 'Testing service', href: '/cel' }));

    const news: Result[] = newsItems
      .filter((n) => txt(n.title).includes(s) || txt(n.summary || n.excerpt).includes(s))
      .map((n) => ({ title: n.title, meta: n.date || 'News', href: `/media/news/${n.slug || n.id}` }));

    return [
      { label: 'Verticals', items: vert },
      { label: 'Projects', items: proj },
      { label: 'CEL Laboratory', items: cel },
      { label: 'News', items: news },
    ].filter((g) => g.items.length > 0);
  }, [q, projects, newsItems, celServices]);

  // Flat list of what's on screen, for arrow-key navigation.
  const flat = useMemo(() => groups.flatMap((g) => g.items.slice(0, GROUP_LIMIT)), [groups]);
  const total = groups.reduce((n, g) => n + g.items.length, 0);

  useEffect(() => setActive(0), [q]);

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const go = (href: string) => {
    onClose();
    router.push(href);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    // Ctrl/⌘ K (open and close) is handled by the Navbar.
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    } else if (e.key === 'ArrowDown' && flat.length) {
      e.preventDefault();
      setActive((i) => (i + 1) % flat.length);
    } else if (e.key === 'ArrowUp' && flat.length) {
      e.preventDefault();
      setActive((i) => (i - 1 + flat.length) % flat.length);
    } else if (e.key === 'Enter' && flat[active]) {
      e.preventDefault();
      go(flat[active].href);
    }
  };

  if (!isOpen) return null;

  let index = -1;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Search the website" onKeyDown={onKeyDown}>
      <div className="search-backdrop absolute inset-0 bg-ink-950/60 backdrop-blur-sm" onClick={onClose} />

      <div className="search-sheet relative max-h-[100svh] overflow-hidden border-b-2 border-brass-400 bg-white shadow-[0_40px_80px_-40px_rgba(11,19,36,0.6)]">
        <div className="px-5 pb-6 pt-6 sm:px-8 sm:pt-8 lg:px-12">
          {/* Top rail */}
          <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.24em] text-stone-500">
            <span>Search CUBE</span>
            <button
              type="button"
              onClick={onClose}
              className="group inline-flex items-center gap-2 transition-colors hover:text-ink"
              aria-label="Close search"
            >
              <span>Close</span>
              <kbd className="border border-stone-300 px-1.5 py-0.5 font-sans text-[9px] tracking-[0.12em] text-stone-500 group-hover:border-ink">
                Esc
              </kbd>
            </button>
          </div>

          {/* Input */}
          <div className="mt-6 flex items-center gap-4 border-b border-stone-300 pb-4 focus-within:border-ink">
            <Search className="h-6 w-6 shrink-0 text-brass-500 sm:h-7 sm:w-7" strokeWidth={1.5} />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Projects, verticals, lab tests, news"
              aria-label="Search"
              aria-controls="search-results"
              aria-activedescendant={flat[active] ? `search-result-${active}` : undefined}
              className="w-full bg-transparent font-display text-2xl font-semibold tracking-[-0.02em] text-ink placeholder:font-medium placeholder:text-stone-300 focus:outline-none sm:text-4xl"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="shrink-0 text-stone-400 transition-colors hover:text-ink"
                aria-label="Clear search"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          <div ref={listRef} id="search-results" className="max-h-[calc(100svh-15rem)] overflow-y-auto overscroll-contain">
            {/* Before typing: suggestions + quick links */}
            {!q && (
              <div className="grid grid-cols-1 gap-10 py-8 md:grid-cols-2 lg:gap-16">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-brass-600">Try searching</div>
                  <ul className="mt-4">
                    {SUGGESTIONS.map((term, i) => (
                      <li key={term} className="border-b border-stone-200">
                        <button
                          type="button"
                          onClick={() => setQuery(term)}
                          className="group flex w-full items-baseline gap-4 py-3 text-left"
                        >
                          <span className="text-[11px] font-bold tabular-nums text-stone-400 group-hover:text-brass-600">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span className="font-display text-lg font-semibold tracking-[-0.01em] text-ink/80 transition-colors group-hover:text-ink">
                            {term}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-brass-600">Go to</div>
                  <ul className="mt-4">
                    {QUICK_LINKS.map((link) => (
                      <li key={link.href} className="border-b border-stone-200">
                        <Link
                          href={link.href}
                          onClick={onClose}
                          className="group flex items-center justify-between py-3 font-display text-lg font-semibold tracking-[-0.01em] text-ink/80 transition-colors hover:text-ink"
                        >
                          <span>{link.label}</span>
                          <ArrowUpRight className="h-4 w-4 text-stone-300 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brass-600" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* No results */}
            {q && total === 0 && (
              <div className="py-12">
                <p className="font-display text-xl font-semibold text-ink">Nothing found for &ldquo;{q}&rdquo;.</p>
                <p className="mt-2 text-sm text-stone-500">
                  Try a shorter word, or browse{' '}
                  <Link href="/projects" onClick={onClose} className="text-ink underline decoration-brass-400 underline-offset-4">
                    all projects
                  </Link>
                  .
                </p>
              </div>
            )}

            {/* Results, grouped */}
            {q && total > 0 && (
              <div className="py-4">
                <p className="text-[11px] text-stone-500" aria-live="polite">
                  {total} {total === 1 ? 'result' : 'results'}
                </p>
                {groups.map((group) => (
                  <section key={group.label} className="mt-6">
                    <div className="flex items-center justify-between border-b border-ink pb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-ink">
                      <span>{group.label}</span>
                      <span className="tabular-nums text-stone-400">{String(group.items.length).padStart(2, '0')}</span>
                    </div>
                    <ul>
                      {group.items.slice(0, GROUP_LIMIT).map((item) => {
                        index += 1;
                        const i = index;
                        const isActive = i === active;
                        return (
                          <li key={`${item.href}-${i}`} className="border-b border-stone-200">
                            <Link
                              id={`search-result-${i}`}
                              data-index={i}
                              href={item.href}
                              onClick={onClose}
                              onMouseEnter={() => setActive(i)}
                              className={`group flex items-center gap-6 py-3.5 pl-0 transition-all ${isActive ? 'pl-3' : ''}`}
                            >
                              <span className={`h-px shrink-0 bg-brass-400 transition-all ${isActive ? 'w-4' : 'w-0'}`} />
                              <span className="min-w-0 flex-1">
                                <span className={`block truncate text-[15px] font-medium transition-colors ${isActive ? 'text-ink' : 'text-ink/75'}`}>
                                  <Highlight text={item.title} q={q} />
                                </span>
                                <span className="mt-0.5 block text-[11px] uppercase tracking-[0.14em] text-stone-400">{item.meta}</span>
                              </span>
                              <ArrowUpRight
                                className={`h-4 w-4 shrink-0 transition-all ${isActive ? 'text-brass-600 opacity-100' : 'opacity-0'}`}
                              />
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                    {group.items.length > GROUP_LIMIT && group.label === 'Projects' && (
                      <Link
                        href="/projects"
                        onClick={onClose}
                        className="mt-3 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-brass-600 hover:text-ink"
                      >
                        All {group.items.length} matching projects <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    )}
                  </section>
                ))}
              </div>
            )}
          </div>

          {/* Keyboard hints (desktop) */}
          <div className="mt-4 hidden items-center gap-5 text-[10px] uppercase tracking-[0.18em] text-stone-400 md:flex">
            <span><kbd className="font-sans text-stone-500">↑ ↓</kbd> Move</span>
            <span><kbd className="font-sans text-stone-500">Enter</kbd> Open</span>
            <span><kbd className="font-sans text-stone-500">Esc</kbd> Close</span>
          </div>
        </div>
      </div>
    </div>
  );
}
