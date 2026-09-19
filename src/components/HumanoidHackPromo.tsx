import { Link } from 'react-router-dom';
import { useLocale, useLocaleHref } from '@/contexts/LocaleContext';
import { translations } from '@/i18n/translations';
import { ArrowRight, sectionPad, sectionInner } from './ui';
import heroGroup from '@/assets/hht/hero-group.webp';

export function HumanoidHackPromoSection() {
  const { locale } = useLocale();
  const l = useLocaleHref();
  const t = translations[locale].humanoidHackPromo;

  return (
    <section className={`relative ${sectionPad} py-20 md:py-24 overflow-hidden bg-carbon text-canvas`}>
      <img
        src={heroGroup}
        alt="Humanoid Hack Tokyo"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Flat tint in place of the old three-stop gradient. */}
      <div className="absolute inset-0 bg-carbon/78" />

      <div className={`relative z-10 ${sectionInner}`}>
        <div className="max-w-2xl">
          <div className="border-t border-canvas/25 pt-3.5">
            <p className="type-label text-carbon-muted">{t.eyebrow}</p>
          </div>
          <h2 className="type-display text-[1.6rem] sm:text-[2rem] lg:text-[2.4rem] text-canvas mt-6 mb-6">
            {t.title}
          </h2>
          <p className="text-[15px] leading-[1.95] text-canvas/72 mb-9">{t.subtitle}</p>
          <Link
            to={l('/humanoidhack')}
            className="inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-canvas text-ink text-sm font-medium transition-colors duration-150 hover:bg-accent hover:text-canvas"
          >
            {t.cta}
            <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
