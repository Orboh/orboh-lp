import { useLocale } from '@/contexts/LocaleContext';
import { translations } from '@/i18n/translations';
import { FEATURED_NOTE, NOTE_PROFILE_URL, OTHER_NOTES } from '@/content/notes';
import ueda from '@/assets/team/ueda-avatar.webp';

/** note's own mark, used small next to the byline so the source is obvious. */
function NoteBadge({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  return (
    <span
      className={`inline-flex items-center rounded-sm border px-2 py-0.5 font-mono text-[10px] tracking-widest lowercase ${
        tone === 'dark' ? 'border-zinc-600 text-zinc-300' : 'border-zinc-300 text-zinc-500'
      }`}
    >
      note
    </span>
  );
}

function ArrowOut({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7m0 0H8m9 0v9" />
    </svg>
  );
}

/**
 * The CTO's note posts, surfaced on the home page: one large featured card
 * plus the rest of the robotics writing. Everything links out to note — the
 * articles live there, we only give them a front door.
 */
export function NotesSection() {
  const { locale } = useLocale();
  const t = translations[locale].notes;
  const en = locale === 'en';

  return (
    <section className="px-8 md:px-16 lg:px-24 py-24 bg-white text-zinc-950">
      <div className="max-w-7xl mx-auto w-full">
        <p className="text-orange-600 text-xs tracking-widest uppercase mb-4">{t.eyebrow}</p>
        <h2
          className="font-mono text-3xl md:text-4xl font-normal text-zinc-900 mb-5 whitespace-pre-line leading-tight"
          style={{ letterSpacing: '-0.02em' }}
        >
          {t.title}
        </h2>
        <p className="text-zinc-600 text-sm md:text-base max-w-2xl mb-12 leading-relaxed">{t.lead}</p>

        {/* Featured post — dark card on a light section, so it carries the eye */}
        <a
          href={FEATURED_NOTE.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group block rounded overflow-hidden bg-zinc-950 text-zinc-50 mb-6"
        >
          <div className="grid lg:grid-cols-2">
            <div className="relative aspect-[1.91/1] lg:aspect-auto lg:min-h-[440px] overflow-hidden">
              <img
                src={FEATURED_NOTE.image}
                alt={FEATURED_NOTE.imageAlt[locale]}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex flex-col justify-center gap-6 p-8 sm:p-12 lg:p-14">
              <div className="flex flex-wrap items-center gap-3 text-xs tracking-widest uppercase">
                <span className="text-orange-400">{FEATURED_NOTE.tag[locale]}</span>
                <span className="text-zinc-500">{FEATURED_NOTE.date}</span>
                {en && <span className="text-zinc-500">{t.japanese}</span>}
              </div>
              <h3
                className="font-mono text-2xl sm:text-3xl lg:text-4xl font-normal leading-snug transition-colors group-hover:text-orange-400"
                style={{ letterSpacing: '-0.02em' }}
              >
                {FEATURED_NOTE.title[locale]}
              </h3>
              <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
                {FEATURED_NOTE.excerpt[locale]}
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={ueda}
                  alt={t.byline.name}
                  loading="lazy"
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div className="text-sm leading-tight">
                  <p className="text-zinc-100">{t.byline.name}</p>
                  <p className="text-zinc-500 text-xs mt-0.5">{t.byline.role}</p>
                </div>
                <span className="ml-auto">
                  <NoteBadge />
                </span>
              </div>
              <span className="inline-flex items-center gap-2 self-start px-7 py-3.5 bg-zinc-50 text-zinc-900 text-xs font-medium tracking-widest rounded transition-colors group-hover:bg-orange-400 group-hover:text-zinc-950">
                {t.read}
                <ArrowOut />
              </span>
            </div>
          </div>
        </a>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {OTHER_NOTES.map((article) => (
            <li key={article.key}>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded border border-zinc-200 bg-white overflow-hidden transition-colors hover:border-zinc-400"
              >
                <div className="relative aspect-[1.91/1] overflow-hidden bg-zinc-100">
                  <img
                    src={article.image}
                    alt={article.imageAlt[locale]}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex flex-wrap items-center gap-2.5 text-[11px] tracking-widest uppercase">
                    <span className="text-orange-600">{article.tag[locale]}</span>
                    <span className="text-zinc-400">{article.date}</span>
                  </div>
                  <h3 className="font-mono text-base font-normal text-zinc-900 leading-snug mb-3 transition-colors group-hover:text-orange-600">
                    {article.title[locale]}
                  </h3>
                  <p className="text-sm text-zinc-600 leading-relaxed line-clamp-3">
                    {article.excerpt[locale]}
                  </p>
                  <div className="mt-5 flex items-center gap-2 pt-1">
                    <NoteBadge tone="light" />
                    {en && (
                      <span className="text-[11px] tracking-widest uppercase text-zinc-400">
                        {t.japanese}
                      </span>
                    )}
                    <ArrowOut className="ml-auto w-3.5 h-3.5 text-zinc-400 transition-colors group-hover:text-orange-600" />
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-10">
          <a
            href={NOTE_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-orange-600 hover:text-orange-500 text-sm font-medium transition-colors"
          >
            {t.more}
            <ArrowOut />
          </a>
        </p>
      </div>
    </section>
  );
}
