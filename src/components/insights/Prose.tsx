import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { sectionPad } from '@/components/ui';

/**
 * Long-form reading primitives for /insights. Kept as explicit components
 * rather than a typography plugin so the article surface matches the rest of
 * the site design system.
 */

export function ArticleHero({
  eyebrow,
  title,
  lead,
  date,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  date: string;
}) {
  return (
    <section className={`${sectionPad} pt-36 pb-20 md:pb-24 bg-carbon text-canvas`}>
      <div className="max-w-[720px] mx-auto w-full">
        <div className="border-t border-carbon-hairline pt-3.5"><p className="type-label text-carbon-muted">{eyebrow}</p></div>
        <h1 className="type-display-lg text-[2.4rem] sm:text-[3.4rem] lg:text-[4.2rem] mt-7 mb-6">
          {title}
        </h1>
        <p className="text-carbon-muted text-[19px] leading-[1.95] mb-8">{lead}</p>
        <p className="type-label text-carbon-muted">{date}</p>
      </div>
    </section>
  );
}

export function ArticleBody({ children }: { children: ReactNode }) {
  return (
    <section className={`${sectionPad} py-20 md:py-24 bg-canvas`}>
      <article className="max-w-[720px] mx-auto w-full">{children}</article>
    </section>
  );
}

export function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="type-display text-[1.95rem] sm:text-[2.4rem] lg:text-[2.9rem] text-ink mt-16 first:mt-0 mb-6 pt-4 border-t border-hairline scroll-mt-24">
      {children}
    </h2>
  );
}

export function H3({ children }: { children: ReactNode }) {
  return <h3 className="type-display text-lg md:text-xl text-ink mt-10 mb-4">{children}</h3>;
}

export function P({ children }: { children: ReactNode }) {
  return <p className="text-muted text-[19px] leading-loose mb-6">{children}</p>;
}

export function Ul({ children }: { children: ReactNode }) {
  return <ul className="mb-6 space-y-3">{children}</ul>;
}

export function Li({ children }: { children: ReactNode }) {
  return (
    <li className="text-muted text-[19px] leading-loose pl-5 relative">
      <span className="absolute left-0 top-[0.85em] w-2 h-px bg-accent" aria-hidden />
      {children}
    </li>
  );
}

/** Set-aside context: caveats, dates, sourcing notes. */
export function Note({ children }: { children: ReactNode }) {
  return (
    <aside className="mb-6 border-l-2 border-accent bg-surface px-6 py-5">
      <p className="text-muted text-[17px] leading-loose">{children}</p>
    </aside>
  );
}

export function Table({
  caption,
  head,
  rows,
}: {
  caption?: string;
  head: readonly string[];
  rows: readonly (readonly string[])[];
}) {
  return (
    <figure className="mb-8">
      <div className="overflow-x-auto border border-hairline bg-surface">
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="border-b border-hairline bg-canvas">
              {head.map((cell) => (
                <th key={cell} className="px-4 py-3 font-semibold text-ink whitespace-nowrap">
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-hairline last:border-0 align-top">
                {row.map((cell, j) => (
                  <td key={j} className="px-4 py-3 text-muted leading-relaxed">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption && <figcaption className="mt-3 text-xs text-muted">{caption}</figcaption>}
    </figure>
  );
}

export type RelatedItem = { label: string; to?: string; href?: string; note: string };

/** Internal cross-links. The cluster grows by adding entries here. */
export function Related({ title, items }: { title: string; items: readonly RelatedItem[] }) {
  return (
    <nav className="mt-16 pt-10 border-t border-hairline">
      <h2 className="type-label text-muted mb-5">{title}</h2>
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.label}>
            {item.to ? (
              <Link
                to={item.to}
                className="text-ink font-medium hover:text-accent transition-colors duration-150"
              >
                {item.label}
              </Link>
            ) : (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink font-medium hover:text-accent transition-colors duration-150"
              >
                {item.label}
              </a>
            )}
            <p className="text-sm text-muted mt-1">{item.note}</p>
          </li>
        ))}
      </ul>
    </nav>
  );
}
