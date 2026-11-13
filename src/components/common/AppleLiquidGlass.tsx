'use client';

import React from 'react';

interface GlassProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'nav' | 'card' | 'panel' | 'modal' | 'pill' | 'subtle';
  interactive?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function GlassPanel({
  variant = 'panel',
  interactive = false,
  children,
  className = '',
  ...props
}: GlassProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'nav':
        return 'bg-white/70 backdrop-blur-[28px] saturate-[180%] border border-white/80 shadow-[0_8px_32px_rgba(36,39,43,0.06),inset_0_1px_1px_rgba(255,255,255,0.95)]';
      case 'card':
        return 'bg-gradient-to-br from-white/90 via-[#FAF9F6]/80 to-[#F4F2EC]/85 backdrop-blur-[24px] saturate-[175%] border border-[#E7E3D9] shadow-[0_12px_36px_rgba(36,39,43,0.05),inset_0_1px_1.5px_rgba(255,255,255,0.95)] rounded-3xl';
      case 'modal':
        return 'bg-white/85 backdrop-blur-[32px] saturate-[190%] border border-white/90 shadow-[0_24px_64px_rgba(36,39,43,0.14),inset_0_1px_2px_rgba(255,255,255,1)] rounded-3xl';
      case 'pill':
        return 'bg-white/75 backdrop-blur-[20px] saturate-[160%] border border-[#E7E3D9]/80 shadow-[0_4px_16px_rgba(36,39,43,0.04),inset_0_1px_1px_rgba(255,255,255,0.9)] rounded-full';
      case 'subtle':
        return 'bg-white/45 backdrop-blur-[16px] border border-white/60 shadow-[0_4px_20px_rgba(36,39,43,0.03)] rounded-2xl';
      case 'panel':
      default:
        return 'bg-white/72 backdrop-blur-[24px] saturate-[160%] border border-white/85 shadow-[0_16px_40px_rgba(36,39,43,0.06),inset_0_1px_1.5px_rgba(255,255,255,0.9)] rounded-3xl';
    }
  };

  const interactiveStyles = interactive
    ? 'transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(36,39,43,0.09)] hover:border-white active:scale-[0.99]'
    : '';

  return (
    <div
      className={`relative overflow-hidden ${getVariantStyles()} ${interactiveStyles} ${className}`}
      {...props}
    >
      {/* Specular Edge Highlight Sheen */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-80 pointer-events-none" />
      {children}
    </div>
  );
}

export function GlassButton({
  children,
  variant = 'solid',
  size = 'md',
  className = '',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'solid' | 'outline' | 'pill' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}) {
  const sizeStyles = {
    sm: 'px-3.5 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-xs sm:text-sm',
    lg: 'px-7 py-3.5 text-sm sm:text-base font-medium',
  }[size];

  const variantStyles = {
    solid:
      'bg-white/90 text-[#0B1324] border border-[#E7E3D9] hover:bg-white hover:shadow-md hover:border-[#A8832F]',
    outline:
      'bg-white/40 text-[#1F2633] border border-white/80 hover:bg-white/80 hover:border-[#E7E3D9]',
    pill:
      'bg-[#F4F2EC]/90 text-[#0B1324] border border-[#E7E3D9] hover:bg-[#C29A3E] hover:text-white hover:border-transparent',
    ghost:
      'bg-transparent text-[#5B6474] hover:text-[#1F2633] hover:bg-white/50 border border-transparent',
  }[variant];

  return (
    <button
      className={`relative inline-flex items-center justify-center font-medium rounded-full backdrop-blur-xl shadow-xs transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] select-none ${sizeStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function GlassStat({
  label,
  value,
  subtext,
  icon: Icon,
  className = '',
}: {
  label: string;
  value: string;
  subtext?: string;
  icon?: any;
  className?: string;
}) {
  return (
    <GlassPanel variant="card" interactive className={`p-6 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] uppercase tracking-widest text-[#5B6474] font-bold">
          {label}
        </span>
        {Icon && <Icon className="w-4 h-4 text-[#C29A3E]" />}
      </div>
      <div className="font-serif text-3xl sm:text-4xl font-light text-[#1F2633] tracking-tight">
        {value}
      </div>
      {subtext && (
        <p className="text-xs text-[#5B6474] mt-1.5 leading-relaxed">
          {subtext}
        </p>
      )}
    </GlassPanel>
  );
}

