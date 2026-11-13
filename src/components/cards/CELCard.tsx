'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle2, FlaskConical, Sparkles, ChevronUp, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CELService } from '@/types';

interface CELCardProps {
  service: CELService;
}

export default function CELCard({ service }: CELCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D Tilt State
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const getImageForService = (category: string) => {
    switch (category) {
      case 'Water':
        return '/images/cel/about_cel.jpg';
      case 'Wastewater':
        return '/images/cel/about_cel1.jpg';
      case 'Solid Waste':
        return '/images/cel/about_cel2.jpg';
      default:
        return '/images/cel/about_cel.jpg';
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -5;
    const rY = ((x - centerX) / centerX) * 5;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsExpanded(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onPointerEnter={(e) => e.pointerType === 'mouse' && setIsExpanded(true)}
      onClick={() => setIsExpanded(!isExpanded)}
      style={{ perspective: 1000 }}
      className="w-full h-[470px] select-none group relative cursor-pointer"
      tabIndex={0}
      role="region"
      aria-label={`${service.title} CEL interactive 3D card`}
    >
      <motion.div
        animate={{
          rotateX,
          rotateY,
          scale: isExpanded ? 1.01 : 1,
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        style={{
          transformStyle: 'flat',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
        className="relative w-full h-full rounded-xl overflow-hidden bg-white border border-stone-200 shadow-premium hover:shadow-premium-lg hover:border-stone-300 transition-[border-color,box-shadow] duration-300 flex flex-col justify-between"
      >
        {/* TOP CINEMATIC IMAGE WITH 3D ZOOM DEPTH */}
        <div className="relative h-60 w-full overflow-hidden bg-ink shrink-0">
          <motion.div
            animate={{ scale: isExpanded ? 1.08 : 1 }}
            transition={{ duration: 0.6 }}
            className="relative w-full h-full"
          >
            <Image
              src={getImageForService(service.category)}
              alt={service.title}
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Soft atmospheric overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/75 via-ink-950/10 to-transparent" />

          {/* Floating Badges */}
          <div className="absolute top-3.5 left-3.5 right-3.5 flex justify-between items-center z-10">
            <span className="chip-light">
              {service.category}
            </span>
            <span className="chip-brass">
              CEL Certified
            </span>
          </div>

          {/* Dynamic 3D Drawer Pill */}
          <div className="absolute bottom-3.5 right-3.5 z-10 flex items-center space-x-1.5 px-2.5 py-1 rounded-[3px] bg-ink/70 text-white text-[11px] backdrop-blur-md">
            <Sparkles className="w-3 h-3 text-brass-300" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em]">
              {isExpanded ? 'Testing Parameters' : (<><span className="hidden [@media(hover:hover)]:inline">Hover to Expand</span><span className="[@media(hover:hover)]:hidden">Tap to Expand</span></>)}
            </span>
            {isExpanded ? (
              <ChevronDown className="w-3 h-3 text-brass-300" />
            ) : (
              <ChevronUp className="w-3 h-3 text-brass-300" />
            )}
          </div>
        </div>

        {/* CARD BODY CONTENT */}
        <div className="p-6 flex-1 flex flex-col justify-between bg-white relative z-10">
          <div className="space-y-1">
            <span className="text-[10px] font-semibold text-brass-600 uppercase tracking-[0.2em] block mb-1 truncate">
              CUBE Environmental Laboratory (CEL)
            </span>
            <h3 className="font-display text-lg font-semibold tracking-[-0.015em] text-ink leading-snug line-clamp-2">
              {service.title}
            </h3>
            <p className="text-[13px] text-[#5B6474] mt-2 line-clamp-3 leading-relaxed font-sans font-normal">
              {service.description}
            </p>
          </div>

          <div className="pt-4 border-t border-stone-200 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.14em] text-ink">
            <span>Protocols &amp; equipment</span>
            <ArrowUpRight className="w-4 h-4 text-brass-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>

        {/* 3D ELEVATING SLIDE-UP SPECIFICATIONS DRAWER OVERLAY */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              className="absolute inset-x-0 bottom-0 top-14 bg-ink text-white blueprint-grid-dark p-6 flex flex-col justify-between z-20 border-t-2 border-brass-400 rounded-b-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center space-x-1.5">
                    <FlaskConical className="w-3.5 h-3.5 text-brass-300" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brass-300">
                      CEL Analytical Specifications
                    </span>
                  </div>
                  <span className="h-2 w-2 rounded-full bg-brass-400 animate-pulse" />
                </div>

                <h4 className="font-display text-lg font-semibold tracking-[-0.015em] text-white mt-3 line-clamp-1">
                  {service.title}
                </h4>

                <p className="text-[13px] text-white/60 mt-1.5 leading-relaxed line-clamp-2">
                  Rigorous laboratory testing in accordance with Bureau of Indian Standards (BIS) and CPCB protocols.
                </p>

                {service.parameters && service.parameters.length > 0 && (
                  <div className="mt-3.5 space-y-2">
                    <div className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">
                      Tested Parameters
                    </div>
                    <div className="space-y-1.5">
                      {service.parameters.slice(0, 3).map((pt, idx) => (
                        <div key={idx} className="flex items-start text-[13px] text-white/85">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brass-400 mr-2 shrink-0 mt-0.5" />
                          <span className="line-clamp-1 font-medium">{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {service.equipment && service.equipment.length > 0 && (
                  <div className="mt-3 text-[11px] text-white/55">
                    <span className="font-semibold text-white/85">Key Instruments: </span>
                    <span>{service.equipment.slice(0, 2).join(', ')}</span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-white/10">
                <Link
                  href="/cel#enquiry"
                  className="btn-brass w-full !py-3 group/btn"
                >
                  <span>Book Laboratory Testing</span>
                  <ArrowUpRight className="w-4 h-4 ml-1.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
