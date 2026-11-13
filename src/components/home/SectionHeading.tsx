import React from 'react';

interface SectionHeadingProps {
  index?: string;
  eyebrow: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  tone?: 'light' | 'dark';
  align?: 'split' | 'center';
  action?: React.ReactNode;
  className?: string;
}

/**
 * Shared header for homepage sections: numbered index, brass eyebrow,
 * display title and an optional supporting paragraph / action.
 */
export default function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  tone = 'light',
  align = 'split',
  action,
  className = '',
}: SectionHeadingProps) {
  const dark = tone === 'dark';

  if (align === 'center') {
    return (
      <div data-reveal className={`mx-auto max-w-3xl text-center ${className}`}>
        <div className="flex items-center justify-center gap-4">
          {index && <span className={`section-index ${dark ? '!text-white/35' : ''}`}>{index}</span>}
          <span className={`eyebrow ${dark ? 'eyebrow-light' : ''}`}>{eyebrow}</span>
        </div>
        {title && <h2 className={`display-h2 mt-5 ${dark ? '!text-white' : ''}`}>{title}</h2>}
        {description && (
          <p className={`lead mx-auto mt-5 max-w-2xl ${dark ? '!text-white/65' : ''}`}>{description}</p>
        )}
        {action && <div className="mt-8 flex justify-center">{action}</div>}
      </div>
    );
  }

  return (
    <div
      data-reveal
      className={`grid grid-cols-1 gap-8 border-t pt-8 lg:grid-cols-12 lg:gap-12 ${
        dark ? 'border-white/10' : 'border-stone-200'
      } ${className}`}
    >
      <div className="lg:col-span-7">
        <div className="flex items-center gap-4">
          {index && <span className={`section-index ${dark ? '!text-white/35' : ''}`}>{index}</span>}
          <span className={`eyebrow ${dark ? 'eyebrow-light' : ''}`}>{eyebrow}</span>
        </div>
        {title && <h2 className={`display-h2 mt-5 ${dark ? '!text-white' : ''}`}>{title}</h2>}
      </div>
      {(description || action) && (
        <div className="flex flex-col justify-end gap-6 lg:col-span-5">
          {description && <p className={`lead ${dark ? '!text-white/65' : ''}`}>{description}</p>}
          {action && <div>{action}</div>}
        </div>
      )}
    </div>
  );
}
