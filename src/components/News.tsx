import { useLocale } from '@/contexts/LocaleContext';
import { translations } from '@/i18n/translations';
import { NEWS_ITEMS } from '@/content/news';
import { ArrowOut, SectionHeading, sectionPad, sectionInner } from './ui';

/**
 * Company news as a plain dated list: date and tag on the left, the headline
 * and a line of context on the right, one hairline between rows.
 */
export function NewsSection() {
  const { locale } = useLocale();
  const t = translations[locale].news;

  return (
    <section className={`${sectionPad} py-20 md:py-24 bg-canvas`}>
      <div className={sectionInner}>
        <SectionHeading label={t.eyebrow} title={t.title} className="mb-12" />

        <ul className="border-t border-ink">
          {NEWS_ITEMS.map((item) => {
            const content = (
              <div className="grid gap-3 py-7 md:grid-cols-[200px_1fr] md:gap-10">
                <div className="flex flex-wrap items-center gap-3 type-label md:flex-col md:items-start md:gap-2">
                  <span className="text-muted">{item.date}</span>
                  <span className="text-accent">{item.tag[locale]}</span>
                </div>
                <div>
                  <h3 className="type-display text-[19px] sm:text-[21px] text-ink transition-colors group-hover:text-accent">
                    {item.title[locale]}
                  </h3>
                  <p className="mt-3 text-[17px] leading-[1.85] text-muted max-w-3xl">
                    {item.body[locale]}
                  </p>
                  {item.url && (
                    <span className="mt-4 inline-flex items-center gap-2 text-accent text-sm font-medium">
                      {t.visit}
                      <ArrowOut />
                    </span>
                  )}
                </div>
              </div>
            );

            return (
              <li key={item.key} className="border-b border-hairline">
                {item.url ? (
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="group block">
                    {content}
                  </a>
                ) : (
                  content
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
