import { useLocale } from '@/contexts/LocaleContext';
import { translations } from '@/i18n/translations';
import { SectionHeading, sectionPad, sectionInner } from './ui';

export const RAAS_SECTION_ID = 'raas-section';

export function RaaSSection() {
  const { locale } = useLocale();
  const t = translations[locale].raas;

  return (
    <section id={RAAS_SECTION_ID} className={`${sectionPad} py-20 md:py-24 bg-canvas`}>
      <div className={`${sectionInner} grid lg:grid-cols-[1fr_minmax(0,560px)] gap-14 lg:gap-20 items-start`}>
        <div>
          <SectionHeading label={t.eyebrow} title={t.title} lead={t.subtitle} />

          <div className="mt-9 flex flex-wrap items-baseline gap-x-5 gap-y-2">
            <span className="type-label text-muted">{t.verticals.label}</span>
            {t.verticals.items.map((v) => (
              <span key={v} className="text-sm text-ink border-b border-hairline pb-0.5">
                {v}
              </span>
            ))}
          </div>
        </div>

        {/* Four points as a ruled list rather than a 2x2 grid of icon tiles. */}
        <dl className="border-t border-ink lg:mt-12">
          {t.cards.map((card, i) => (
            <div
              key={i}
              className="grid grid-cols-[auto_1fr] gap-x-5 sm:gap-x-8 py-6 border-b border-hairline"
            >
              <dt className="font-mono text-[11px] tracking-[0.16em] text-accent pt-1">
                {String(i + 1).padStart(2, '0')}
              </dt>
              <div>
                <p className="type-display text-base text-ink">{card.title}</p>
                <dd className="mt-2.5 text-[13px] leading-[1.9] text-muted max-w-md">
                  {card.description}
                </dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
