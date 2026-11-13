'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, RotateCw, CheckCircle2 } from 'lucide-react';

interface FlipCardProps {
  title: string;
  subtitle?: string;
  category?: string;
  description: string;
  backTitle?: string;
  backDescription?: string;
  keyPoints?: string[];
  imageSrc: string;
  href: string;
  ctaText?: string;
  badge?: string;
  accentColor?: string;
}

export default function FlipCard({
  title,
  subtitle,
  category,
  description,
  backTitle,
  backDescription,
  keyPoints = [],
  imageSrc,
  href,
  ctaText = 'Explore Details',
  badge,
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="w-full h-[470px] select-none group relative cursor-pointer"
      style={{ perspective: '1200px' }}
      // Hover only for real mice: on touch screens a tap fires mouseenter AND
      // click together, which flipped the card and immediately flipped it back.
      onPointerEnter={(e) => e.pointerType === 'mouse' && setIsFlipped(true)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsFlipped(!isFlipped);
        }
      }}
      role="region"
      aria-label={`${title} interactive flip card`}
    >
      <div 
        className="relative w-full h-full rounded-xl transition-all duration-700 ease-out shadow-premium hover:shadow-premium-lg"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        
        {/* FRONT SIDE (Visible when NOT flipped, hidden when flipped) */}
        <div
          className={`absolute inset-0 w-full h-full rounded-xl overflow-hidden bg-white border border-stone-200 flex flex-col justify-between transition-opacity duration-300 ${
            isFlipped ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
          }`}
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(0deg)',
          }}
        >
          {/* Top Image with Badges */}
          <div className="relative h-60 w-full overflow-hidden bg-ink shrink-0">
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-[1.2s] ease-out"
            />
            {/* Soft atmospheric overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-ink-950/5 to-transparent" />

            {/* Badges */}
            <div className="absolute top-3.5 left-3.5 right-3.5 flex justify-between items-center z-10">
              {category && (
                <span className="chip-light">
                  {category}
                </span>
              )}
              {badge && (
                <span className="chip-brass">
                  {badge}
                </span>
              )}
            </div>

            {/* Flip Hint */}
            <div className="absolute bottom-3.5 right-3.5 z-10 flex items-center space-x-1.5 px-2.5 py-1 rounded-[3px] bg-ink/70 text-white text-[11px] backdrop-blur-md">
              <RotateCw className="w-3 h-3 text-brass-300" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.12em]"><span className="hidden [@media(hover:hover)]:inline">Hover to Flip</span><span className="[@media(hover:hover)]:hidden">Tap to Flip</span></span>
            </div>
          </div>

          {/* Front Content Area */}
          <div className="p-6 flex-1 flex flex-col justify-between bg-white">
            <div>
              {subtitle && (
                <span className="text-[10px] font-semibold text-brass-600 uppercase tracking-[0.2em] mb-2 line-clamp-2">
                  {subtitle}
                </span>
              )}
              <h3 className="font-display text-lg font-semibold tracking-[-0.015em] text-ink leading-snug line-clamp-2">
                {title}
              </h3>
              <p className="text-[13px] text-[#5B6474] mt-2 line-clamp-3 leading-relaxed font-sans">
                {description}
              </p>
            </div>

            <div className="pt-4 border-t border-stone-200 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.14em] text-ink">
              <span>Capabilities &amp; mandate</span>
              <ArrowUpRight className="w-4 h-4 text-brass-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        </div>

        {/* BACK SIDE (Visible ONLY when flipped, zero bleed-through) */}
        <div
          className={`absolute inset-0 w-full h-full rounded-xl overflow-hidden bg-ink text-white p-6 flex flex-col justify-between blueprint-grid-dark transition-opacity duration-300 ${
            isFlipped ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brass-300">
                Key Mandates &amp; Capabilities
              </span>
              <button
                type="button"
                className="p-1 text-white/50 hover:text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(false);
                }}
                title="Flip back"
              >
                <RotateCw className="w-3.5 h-3.5 text-brass-300" />
              </button>
            </div>

            <h4 className="font-display text-xl font-semibold tracking-[-0.015em] text-white mt-4">
              {backTitle || title}
            </h4>

            <p className="text-[13px] text-white/60 mt-2 leading-relaxed line-clamp-3">
              {backDescription || description}
            </p>

            {keyPoints && keyPoints.length > 0 && (
              <div className="mt-4 space-y-2">
                <div className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">
                  Highlights
                </div>
                <div className="space-y-1.5">
                  {keyPoints.slice(0, 4).map((pt, idx) => (
                    <div key={idx} className="flex items-start text-[13px] text-white/85">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brass-400 mr-2 shrink-0 mt-0.5" />
                      <span className="line-clamp-1 font-medium">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-white/10" onClick={(e) => e.stopPropagation()}>
            <Link
              href={href}
              className="btn-brass w-full !py-3 group/btn"
            >
              <span>{ctaText}</span>
              <ArrowUpRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
