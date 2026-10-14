import { Link } from 'react-router-dom';
import { useLocale, useLocaleHref } from '@/contexts/LocaleContext';
import { translations } from '@/i18n/translations';
import { ArrowRight, SectionHeading, sectionPad, sectionInner } from './ui';

export const LABOR_BURDEN_SECTION_ID = 'heavy-work';
export const WASTE_FOCUS_SECTION_ID = 'industrial-waste';

/**
 * The problem the company exists for, in one heading and one figure: work
 * that is heavy and dangerous. Public statistics only — no customer numbers.
 */
export function LaborBurdenSection() {
  const { locale } = useLocale();
  const t = translations[locale].laborBurden;

  return (
    <section id={LABOR_BURDEN_SECTION_ID} className={`${sectionPad} py-20 md:py-24 bg-canvas`}>
      <div className={`${sectionInner} grid lg:grid-cols-[1fr_minmax(0,400px)] gap-12 lg:gap-20 items-end`}>
        <SectionHeading label={t.eyebrow} title={t.title} lead={t.lead} />

        {/* Ruled figures rather than cards, matching the rest of the system. */}
        <div>
          <p className="type-label text-muted">{t.stat.label}</p>
          <div className="mt-6 grid grid-cols-2 border-t border-ink">
            <div className="pt-5 pr-4">
              <p className="type-display text-[3rem] sm:text-[3.6rem] text-accent leading-none">
                {t.stat.waste}
              </p>
              <p className="text-sm text-ink mt-3">{t.stat.wasteLabel}</p>
            </div>
            <div className="pt-5 pl-4 border-l border-hairline">
              <p className="type-display text-[3rem] sm:text-[3.6rem] text-ink leading-none">
                {t.stat.all}
              </p>
              <p className="text-sm text-ink mt-3">{t.stat.allLabel}</p>
            </div>
          </div>
          <p className="text-xs leading-relaxed text-muted mt-5">{t.stat.source}</p>
        </div>
      </div>
    </section>
  );
}

/**
 * Industrial waste is where the company is putting its weight. Kept to a
 * heading and a lead on purpose: no task breakdown and no progress timeline.
 */
export function WasteFocusSection() {
  const { locale } = useLocale();
  const l = useLocaleHref();
  const t = translations[locale].wasteFocus;

  return (
    <section id={WASTE_FOCUS_SECTION_ID} className={`${sectionPad} py-20 md:py-24 bg-carbon text-canvas`}>
      <div className={sectionInner}>
        <SectionHeading label={t.eyebrow} title={t.title} lead={t.lead} tone="dark" />
        <Link
          to={l('/hiring')}
          className="inline-flex items-center gap-2.5 mt-10 text-sm font-medium text-canvas hover:text-accent transition-colors"
        >
          {t.hiringLink}
          <ArrowRight />
        </Link>
      </div>
    </section>
  );
}
