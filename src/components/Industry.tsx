import { Link } from 'react-router-dom';
import { useLocale, useLocaleHref } from '@/contexts/LocaleContext';
import { translations } from '@/i18n/translations';
import { ArrowRight, SectionHeading, sectionPad, sectionInner } from './ui';

export const LABOR_BURDEN_SECTION_ID = 'heavy-work';
export const WASTE_FOCUS_SECTION_ID = 'industrial-waste';

/**
 * The problem the company exists for: work that is heavy, dirty and dangerous
 * keeps coming even as the people willing to do it disappear. The figures are
 * public statistics only — no customer numbers.
 */
export function LaborBurdenSection() {
  const { locale } = useLocale();
  const t = translations[locale].laborBurden;

  return (
    <section id={LABOR_BURDEN_SECTION_ID} className={`${sectionPad} py-20 md:py-24 bg-canvas`}>
      <div className={`${sectionInner} grid lg:grid-cols-[1fr_minmax(0,440px)] gap-14 lg:gap-20 items-start`}>
        <div>
          <SectionHeading label={t.eyebrow} title={t.title} lead={t.lead} />

          <div className="mt-12 flex flex-col">
            {t.burdens.map((burden) => (
              <div
                key={burden.title}
                className="py-5 border-t border-hairline grid sm:grid-cols-[180px_1fr] gap-2 sm:gap-6"
              >
                <p className="text-base font-medium text-ink">{burden.title}</p>
                <p className="text-[17px] leading-[1.85] text-muted">{burden.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Ruled figures rather than cards, matching the rest of the system. */}
        <div className="lg:pt-12">
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
          <p className="text-[15px] leading-[1.85] text-muted mt-6">{t.stat.note}</p>
          <p className="text-xs leading-relaxed text-muted mt-4">{t.stat.source}</p>
        </div>
      </div>
    </section>
  );
}

/**
 * Industrial waste is where the company is putting its weight. The section
 * says which tasks the robot takes over and where the work actually stands —
 * no facility or customer names, per the vault guardrails.
 */
export function WasteFocusSection() {
  const { locale } = useLocale();
  const l = useLocaleHref();
  const t = translations[locale].wasteFocus;

  return (
    <section id={WASTE_FOCUS_SECTION_ID} className={`${sectionPad} py-20 md:py-24 bg-carbon text-canvas`}>
      <div className={sectionInner}>
        <SectionHeading label={t.eyebrow} title={t.title} lead={t.lead} tone="dark" />

        <div className="mt-14 border-t border-carbon-hairline">
          <div className="hidden md:grid grid-cols-[minmax(0,280px)_1fr] gap-10 py-4 border-b border-carbon-hairline">
            <p className="type-label text-carbon-muted">{t.taskHeader}</p>
            <p className="type-label text-carbon-muted">{t.robotHeader}</p>
          </div>
          {t.tasks.map((task) => (
            <div
              key={task.task}
              className="grid md:grid-cols-[minmax(0,280px)_1fr] gap-3 md:gap-10 py-7 border-b border-carbon-hairline"
            >
              <div>
                <h3 className="type-display text-xl text-canvas">{task.task}</h3>
                <p className="text-[15px] leading-[1.85] text-carbon-muted mt-2">{task.today}</p>
              </div>
              <p className="text-[17px] leading-[1.9] text-canvas">{task.robot}</p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <p className="type-label text-accent">{t.statusLabel}</p>
          <ol className="mt-6 flex flex-col">
            {t.status.map((item) => (
              <li
                key={item.when}
                className="grid sm:grid-cols-[180px_1fr] gap-2 sm:gap-6 py-5 border-t border-carbon-hairline"
              >
                <p className="type-label text-carbon-muted pt-1">{item.when}</p>
                <p className="text-[17px] leading-[1.9] text-canvas">{item.what}</p>
              </li>
            ))}
          </ol>
          <Link
            to={l('/hiring')}
            className="inline-flex items-center gap-2.5 mt-8 text-sm font-medium text-canvas hover:text-accent transition-colors"
          >
            {t.hiringLink}
            <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
