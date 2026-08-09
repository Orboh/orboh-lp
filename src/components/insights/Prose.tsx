import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

/**
 * Long-form reading primitives for /insights. Kept as explicit components
 * rather than a typography plugin so the article surface matches the rest of
 * the site (font-mono headings, zinc palette, orange accent).
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
    <section className="px-8 md:px-16 lg:px-24 pt-36 pb-16 md:pb-20 bg-zinc-950 text-zinc-50">
      <div className="max-w-3xl mx-auto w-full">
        <p className="text-orange-400 text-xs tracking-widest uppercase mb-5">{eyebrow}</p>
        <h1
          className="font-mono text-3xl sm:text-4xl md:text-5xl font-normal mb-6 leading-tight"
          style={{ letterSpacing: '-0.02em' }}
        >
          {title}
        </h1>
        <p className="text-zinc-300 text-base md:text-lg leading-relaxed mb-8">{lead}</p>
        <p className="text-zinc-500 text-xs tracking-widest uppercase">{date}</p>
      </div>
    </section>
  );
}

export function ArticleBody({ children }: { children: ReactNode }) {
  return (
    <section className="px-8 md:px-16 lg:px-24 py-16 md:py-24 bg-zinc-50">
      <article className="max-w-3xl mx-auto w-full">{children}</article>
    </section>
  );
}

export function H2({ children }: { children: ReactNode }) {
  return (
    <h2
      className="font-mono text-2xl md:text-3xl font-normal text-zinc-900 mt-16 first:mt-0 mb-6 scroll-mt-24"
      style={{ letterSpacing: '-0.01em' }}
    >
      {children}
    </h2>
  );
}

export function H3({ children }: { children: ReactNode }) {
  return <h3 className="text-lg md:text-xl font-semibold text-zinc-900 mt-10 mb-4">{children}</h3>;
}

export function P({ children }: { children: ReactNode }) {
  return <p className="text-zinc-700 leading-loose mb-6">{children}</p>;
}

export function Ul({ children }: { children: ReactNode }) {
  return <ul className="mb-6 space-y-3">{children}</ul>;
}

export function Li({ children }: { children: ReactNode }) {
  return (
    <li className="text-zinc-700 leading-loose pl-5 relative">
      <span className="absolute left-0 top-[0.85em] w-2 h-px bg-orange-500" aria-hidden />
      {children}
    </li>
  );
}

/** Set-aside context: caveats, dates, sourcing notes. */
export function Note({ children }: { children: ReactNode }) {
  return (
    <aside className="mb-6 border-l-2 border-orange-500 bg-white px-6 py-5 rounded-r">
      <p className="text-zinc-600 text-sm leading-loose">{children}</p>
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
      <div className="overflow-x-auto rounded border border-zinc-200 bg-white">
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-100">
              {head.map((cell) => (
                <th key={cell} className="px-4 py-3 font-semibold text-zinc-900 whitespace-nowrap">
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-zinc-100 last:border-0 align-top">
                {row.map((cell, j) => (
                  <td key={j} className="px-4 py-3 text-zinc-700 leading-relaxed">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption && <figcaption className="mt-3 text-xs text-zinc-500">{caption}</figcaption>}
    </figure>
  );
}

export type RelatedItem = { label: string; to?: string; href?: string; note: string };

/** Internal cross-links. The cluster grows by adding entries here. */
export function Related({ title, items }: { title: string; items: readonly RelatedItem[] }) {
  return (
    <nav className="mt-16 pt-10 border-t border-zinc-200">
      <h2 className="text-xs tracking-widest uppercase text-zinc-500 mb-5">{title}</h2>
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.label}>
            {item.to ? (
              <Link
                to={item.to}
                className="text-zinc-900 font-medium hover:text-orange-600 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-900 font-medium hover:text-orange-600 transition-colors"
              >
                {item.label}
              </a>
            )}
            <p className="text-sm text-zinc-500 mt-1">{item.note}</p>
          </li>
        ))}
      </ul>
    </nav>
  );
}
