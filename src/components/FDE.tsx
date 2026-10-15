import { Link } from 'react-router-dom';
import { useLocale, useLocaleHref } from '@/contexts/LocaleContext';
import { translations } from '@/i18n/translations';
import { ArrowRight, SectionHeading, btnOutlineOnDark, sectionPad, sectionInner } from './ui';

import embedFieldImage from '@/assets/fde/embed_field.webp';
import implementSetupImage from '@/assets/fde/implement_setup.webp';
import operateSiteImage from '@/assets/fde/operate_site.webp';

const STEP_IMAGES = [embedFieldImage, implementSetupImage, operateSiteImage];

export function HowWeWorkSection() {
  const { locale } = useLocale();
  const l = useLocaleHref();
  const t = translations[locale].howWeWork;

  return (
    <section className={`${sectionPad} py-20 md:py-24 bg-carbon text-canvas`}>
      <div className={sectionInner}>
        <SectionHeading label={t.eyebrow} title={t.title} lead={t.subtitle} tone="dark" />

        <div className="mt-16 flex flex-col">
          {t.steps.map((step, index) => (
            <div
              key={step.number}
              className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center py-12 border-t border-carbon-hairline first:border-t-0 first:pt-0"
            >
              {/* No padding, no frame, no rounding — the photograph runs to
                  the edge of its cell. */}
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <img
                  src={STEP_IMAGES[index]}
                  alt={step.imageAlt}
                  loading="lazy"
                  className="block w-full aspect-[4/3] object-cover"
                />
              </div>
              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <p className="type-label text-accent">{step.number}</p>
                <h3 className="type-display text-xl md:text-2xl text-canvas mt-4 mb-5">
                  {step.title}
                </h3>
                <p className="text-[19px] leading-[1.95] text-carbon-muted max-w-xl">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* The field trial plan is written for Japanese prospects only. */}
        {locale === 'ja' && (
          <div className="mt-4 border-t border-carbon-hairline pt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <p className="text-[17px] leading-[1.85] text-carbon-muted max-w-xl">
              まずはあなたの現場で、全身テレオペによる短い実証から。料金と進め方をまとめています。
            </p>
            <Link to={l('/field-trial')} className={`${btnOutlineOnDark} shrink-0`}>
              現場実証プランを見る
              <ArrowRight />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
