import { useLocale } from '@/contexts/LocaleContext';
import { translations } from '@/i18n/translations';
import { FEATURED_NOTE, NOTE_PROFILE_URL, OTHER_NOTES } from '@/content/notes';
import { ArrowOut, SectionHeading, sectionPad, sectionInner } from './ui';
import ueda from '@/assets/team/ueda-avatar.webp';

/** note's own mark, used small next to the byline so the source is obvious. */
function NoteBadge({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  return (
    <span
      className={`type-label inline-flex items-center border px-2 py-0.5 text-[12px] lowercase ${
        tone === 'dark' ? 'border-carbon-hairline text-carbon-muted' : 'border-hairline text-muted'
      }`}
    >
      note
    </span>
  );
}

/**
 * The CTO's note posts, surfaced on the home page: one large featured block
 * plus the rest of the robotics writing. Everything links out to note — the
 * articles live there, we only give them a front door.
 */
export function NotesSection() {
  const { locale } = useLocale();
  const t = translations[locale].notes;
  const en = locale === 'en';

  return (
    <section className={`${sectionPad} py-20 md:py-24 bg-canvas`}>
      <div className={sectionInner}>
        <SectionHeading label={t.eyebrow} title={t.title} lead={t.lead} className="mb-14" />

        {/* Featured post — a dark band inside a light section, which is how
            both references carry the eye without a shadow or a gradient. */}
        <a
          href={FEATURED_NOTE.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group block bg-carbon text-canvas mb-10"
        >
          <div className="grid lg:grid-cols-2">
            <div className="relative aspect-[1.91/1] lg:aspect-auto lg:min-h-[420px] overflow-hidden">
              <img
                src={FEATURED_NOTE.image}
                alt={FEATURED_NOTE.imageAlt[locale]}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center gap-6 p-8 sm:p-12">
              <div className="flex flex-wrap items-center gap-4 type-label text-carbon-muted">
                <span className="text-accent">{FEATURED_NOTE.tag[locale]}</span>
                <span>{FEATURED_NOTE.date}</span>
                {en && <span>{t.japanese}</span>}
              </div>
              <h3 className="type-display text-xl sm:text-2xl lg:text-[2.25rem] text-canvas">
                {FEATURED_NOTE.title[locale]}
              </h3>
              <p className="text-[19px] leading-[1.95] text-carbon-muted">
                {FEATURED_NOTE.excerpt[locale]}
              </p>
              <div className="flex items-center gap-3 border-t border-carbon-hairline pt-5">
                <img
                  src={ueda}
                  alt={t.byline.name}
                  loading="lazy"
                  className="h-9 w-9 object-cover"
                />
                <div className="text-sm leading-tight">
                  <p className="text-canvas">{t.byline.name}</p>
                  <p className="text-carbon-muted text-xs mt-0.5">{t.byline.role}</p>
                </div>
                <span className="ml-auto">
                  <NoteBadge />
                </span>
              </div>
              <span className="inline-flex items-center gap-2.5 self-start px-7 py-4 bg-canvas text-ink text-sm font-medium transition-colors duration-150 group-hover:bg-accent group-hover:text-canvas">
                {t.read}
                <ArrowOut />
              </span>
            </div>
          </div>
        </a>

        <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {OTHER_NOTES.map((article) => (
            <li key={article.key}>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col"
              >
                <div className="relative aspect-[1.91/1] overflow-hidden bg-hairline">
                  <img
                    src={article.image}
                    alt={article.imageAlt[locale]}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col border-t border-ink mt-4 pt-3.5">
                  <div className="mb-3.5 flex flex-wrap items-center gap-3 type-label">
                    <span className="text-accent">{article.tag[locale]}</span>
                    <span className="text-muted">{article.date}</span>
                  </div>
                  <h3 className="type-display text-[19px] text-ink mb-3 transition-colors group-hover:text-accent">
                    {article.title[locale]}
                  </h3>
                  <p className="text-[17px] text-muted leading-[1.85] line-clamp-3">
                    {article.excerpt[locale]}
                  </p>
                  <div className="mt-5 flex items-center gap-2.5 pt-1">
                    <NoteBadge tone="light" />
                    {en && <span className="type-label text-muted">{t.japanese}</span>}
                    <ArrowOut className="ml-auto w-3.5 h-3.5 text-muted transition-colors group-hover:text-accent" />
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-12">
          <a
            href={NOTE_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent text-sm font-medium border-b border-accent pb-0.5"
          >
            {t.more}
            <ArrowOut />
          </a>
        </p>
      </div>
    </section>
  );
}
