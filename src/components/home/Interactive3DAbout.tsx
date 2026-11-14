'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  ShieldCheck, FlaskConical, ArrowUpRight, Award, 
  Sparkles, CheckCircle2, ChevronRight, Layers, Building2
} from 'lucide-react';
import { contactInfo } from '@/data/contact';

// "About Us" text from the original CUBE homepage (https://cubeiitm.org/).
const ABOUT_US =
  'Centre for Urbanization, Buildings & Environment (CUBE) has been raised by IIT Madras and the Government of Tamil Nadu as an Applied Technology, Consultancy, Advisory and Research Centre to leverage the research & technological strengths of academia, facilitation & support from the Government, practical & innovative approach of the private sector and act as an enabler to tackle any multifaceted challenges facing the built environment.';

export default function Interactive3DAbout() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hoveredPillar, setHoveredPillar] = useState<number | null>(null);

  // 3D Tilt interactive physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-12, 12]);
  const floatingOffset = useTransform(smoothMouseY, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section className="py-24 bg-[#FFFFFF] border-b border-[#E7E3D9] relative overflow-hidden select-none">
      {/* Subtle architectural grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#1F2633 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="max-w-none mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* LEFT: 3D DYNAMIC MULTI-LAYER INTERACTIVE STAGE (5 cols) */}
          <div 
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="lg:col-span-5 perspective-1000 relative"
          >
            <motion.div
              style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
              }}
              className="relative rounded-none p-3 bg-gradient-to-br from-white via-[#F7F7F4] to-[#F4F2EC] border border-[#E7E3D9] shadow-2xl transition-shadow duration-500 hover:shadow-[0_25px_50px_-12px_rgba(7,14,92,0.18)]"
            >
              {/* PRIMARY 3D MAIN PHOTOGRAPH */}
              <div className="relative h-80 sm:h-96 w-full rounded-none overflow-hidden shadow-lg group">
                <Image
                  src="/images/about/about_about.jpg"
                  alt="CUBE at IIT Madras Research Park"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#C29A3E]">
                      HQ &bull; Chennai
                    </span>
                    <div className="text-sm font-serif font-medium">
                      {contactInfo.addressLines.slice(0, 3).join(' ').replace(/,$/, '')}
                    </div>
                  </div>
                </div>
              </div>

              {/* FLOATING 3D SECONDARY CARD (Elevated in Z-space) */}
              <motion.div
                style={{
                  translateZ: 50,
                  y: floatingOffset,
                }}
                className="absolute -bottom-8 -right-6 w-3/4 h-44 rounded-none overflow-hidden shadow-2xl border-4 border-white bg-white group hidden sm:block"
              >
                <Image
                  src="/images/hero/slides_building-training-team.jpg"
                  alt="IIT Madras Applied Capacity Building"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Floating Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/95 text-[#0B1324] shadow-sm backdrop-blur-sm flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-none bg-[#C29A3E] animate-pulse" />
                    <span>Building &amp; Construction</span>
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="text-xs font-serif font-medium line-clamp-1">
                    Capacity Building Training Program in Best Construction Practices for High Rise Buildings for Engineers.
                  </div>
                </div>
              </motion.div>

              {/* FLOATING CORNER EMBLEM PILL (Z-depth 70) */}
              <motion.div
                style={{ translateZ: 70 }}
                className="absolute -top-5 -left-4 p-3 rounded-none bg-white/95 cube-glass border border-[#E7E3D9] shadow-xl backdrop-blur-md flex items-center gap-3"
              >
                <div className="relative h-10 w-10 shrink-0">
                  <Image
                    src="/images/branding/cube-primary-logo.png"
                    alt="CUBE Emblem"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="pr-2">
                  <div className="text-[9px] uppercase font-bold text-[#C29A3E] tracking-wider">
                    Established 2017
                  </div>
                  <div className="text-xs font-serif font-semibold text-[#0B1324]">
                    IIT Madras &bull; Govt of TN
                  </div>
                </div>
              </motion.div>

            </motion.div>
          </div>

          {/* RIGHT: EDITORIAL TYPOGRAPHY & ANIMATED INTERACTIVE PILLARS (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C29A3E]">
              <span className="w-2 h-2 rounded-none bg-[#C29A3E]" />
              <span>About CUBE</span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#1F2633] leading-[1.08] tracking-tight">
              About <span className="italic font-normal text-[#0B1324]">Us</span>
            </h2>

            <p className="text-sm sm:text-base text-[#5B6474] leading-relaxed font-sans">
              {ABOUT_US}
            </p>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/about"
                className="px-7 py-3 rounded-none bg-[#F4F2EC] text-[#0B1324] hover:bg-[#C29A3E] hover:text-white border border-[#E7E3D9] text-xs font-semibold tracking-wide transition-all shadow-sm hover:shadow-md flex items-center gap-2"
              >
                <span>About CUBE</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#C29A3E]" />
              </Link>

              <Link
                href="/about/team"
                className="px-7 py-3 rounded-none bg-white text-[#1F2633] hover:bg-[#F7F7F4] border border-[#E7E3D9] text-xs font-semibold tracking-wide transition-all shadow-sm"
              >
                Our Team
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

