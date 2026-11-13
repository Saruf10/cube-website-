'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Building2, CheckCircle2, ExternalLink, ArrowUpRight } from 'lucide-react';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const projectHref = `/projects/${project.slug || (project as any).id || ''}`;
  return (
    <Link
      href={projectHref}
      className="group card-premium flex flex-col justify-between cursor-pointer"
    >
      <div>
        {/* Project Thumbnail Image with Apple-style Fluid Zoom */}
        <div className="relative aspect-[16/11] w-full overflow-hidden bg-ink">
          <Image
            src={project.heroImage || '/images/about/about_about.jpg'}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-[1.06] transition-transform duration-[1.2s] ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent pointer-events-none" />

          {/* Frosted Glass Category Pill */}
          <div className="absolute top-3.5 left-3.5 z-10">
            <span className="chip-light">
              {project.category}
            </span>
          </div>

          {project.featured && (
            <div className="absolute top-3.5 right-3.5 z-10">
              <span className="chip-brass">
                Key Project
              </span>
            </div>
          )}

          {/* Subtle Hover Action Badge */}
          <div className="absolute bottom-3.5 right-3.5 z-10 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex items-center space-x-1 px-3 py-1.5 rounded-[3px] bg-white text-ink text-[10px] font-bold uppercase tracking-[0.14em] shadow-premium">
            <span>View Scheme</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-brass-600" />
          </div>
        </div>

        {/* Content Body with Architectural Light Refinement */}
        <div className="p-6">
          <h3 className="font-display text-lg font-semibold tracking-[-0.015em] text-ink transition-colors line-clamp-2 leading-snug">
            {project.title}
          </h3>

          <p className="text-[13px] text-[#5B6474] mt-2.5 line-clamp-2 leading-relaxed font-sans">
            {project.description}
          </p>

          {project.scopeOfWork && project.scopeOfWork.length > 0 && (
            <div className="mt-5 pt-4 border-t border-stone-200 space-y-1.5">
              <div className="text-[10px] font-bold text-brass-600 uppercase tracking-[0.2em] mb-2">
                Key Scope
              </div>
              {project.scopeOfWork.slice(0, 2).map((item, i) => (
                <div key={i} className="flex items-start text-[13px] text-ink/75">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brass-500 mr-2 shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer Pill Action */}
      <div className="mx-6 mb-6 pt-4 flex items-center justify-between text-xs border-t border-stone-200">
        <span className="text-[11px] font-medium text-stone-500 line-clamp-1 pr-3">
          {project.location || 'Tamil Nadu, India'}
        </span>
        <div className="flex items-center space-x-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink group-hover:text-brass-600 transition-colors shrink-0">
          <span>Overview</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
