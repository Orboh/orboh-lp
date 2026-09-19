import type { ReactNode } from 'react';

/**
 * Shared marks, buttons and the section header.
 *
 * The Discord glyph was pasted into Hero, CTA, Header and Footer one copy each,
 * and the arrows into Hero, Notes and HumanoidHackPromo; they live here now.
 * Styling follows the Refero references: 0px radius, flat fills, no shadow and
 * no transform on hover — colour is the only thing that changes.
 */

export function DiscordMark({ className = 'size-4 shrink-0' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.042.033.055a19.83 19.83 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.07 13.07 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

/** Arrow pointing right — continues on this site. */
export function ArrowRight({ className = 'w-4 h-4 shrink-0' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="square" strokeWidth={1.5} d="M4 12h15m0 0l-5.5-5.5M19 12l-5.5 5.5" />
    </svg>
  );
}

/** Arrow leaving the page — opens somewhere else. */
export function ArrowOut({ className = 'w-3.5 h-3.5 shrink-0' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="square" strokeWidth={1.5} d="M7 17L17 7m0 0H8m9 0v9" />
    </svg>
  );
}

const btnBase =
  'inline-flex items-center justify-center gap-2.5 px-7 py-4 text-sm font-medium transition-colors duration-150';

export const btnSolid = `${btnBase} bg-ink text-canvas hover:bg-accent`;
export const btnOutline = `${btnBase} border border-ink text-ink hover:bg-ink hover:text-canvas`;
export const btnSolidOnDark = `${btnBase} bg-canvas text-ink hover:bg-accent hover:text-canvas`;
export const btnOutlineOnDark = `${btnBase} border border-canvas/40 text-canvas hover:bg-canvas hover:text-ink`;
/* The accent band can't hover to accent, so the solid button inverts instead. */
export const btnSolidOnAccent = `${btnBase} bg-ink text-canvas hover:bg-canvas hover:text-ink`;

/** Standard outer padding for a full-width section. */
export const sectionPad = 'px-6 sm:px-10 lg:px-16';

/** Centred column, matching the 1200px page width of both references. */
export const sectionInner = 'max-w-[1200px] mx-auto w-full';

/**
 * Every section opens the same way: a 1px rule, a small mono label sitting on
 * it, then the heading. This replaces the orange uppercase eyebrow that used to
 * sit above all eight home-page sections and was the loudest template tell.
 */
interface SectionHeadingProps {
  label: string;
  title: string;
  /** Intro paragraph under the heading, when the section has one. */
  lead?: string;
  /**
   * Dark bands invert the hairline and the muted tones. `photo` is a dark band
   * laid over a tinted photograph: the carbon hairline disappears against the
   * image, so the rule and the lead lift to the light neutral instead.
   */
  tone?: 'light' | 'dark' | 'photo';
  className?: string;
  children?: ReactNode;
}

export function SectionHeading({
  label,
  title,
  lead,
  tone = 'light',
  className = '',
  children,
}: SectionHeadingProps) {
  const onDark = tone !== 'light';
  const rule = tone === 'photo' ? 'border-canvas/25' : onDark ? 'border-carbon-hairline' : 'border-hairline';
  const leadTone = tone === 'photo' ? 'text-carbon-muted' : onDark ? 'text-carbon-muted' : 'text-muted';
  return (
    <div className={className}>
      <div className={`border-t pt-3.5 ${rule}`}>
        <p className={`type-label ${onDark ? 'text-carbon-muted' : 'text-muted'}`}>{label}</p>
      </div>
      <h2
        className={`type-display text-[1.95rem] sm:text-[2.4rem] lg:text-[2.9rem] mt-6 whitespace-pre-line ${
          onDark ? 'text-canvas' : 'text-ink'
        }`}
      >
        {title}
      </h2>
      {lead && <p className={`mt-6 text-[19px] leading-[1.95] max-w-2xl ${leadTone}`}>{lead}</p>}
      {children}
    </div>
  );
}
