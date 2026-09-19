import { Link } from 'react-router-dom';
import { useLocale, useLocaleHref } from '@/contexts/LocaleContext';
import { translations } from '@/i18n/translations';
import { ArrowRight, sectionPad, sectionInner, SectionHeading, btnSolidOnDark } from './ui';
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
          <SectionHeading
            label={t.eyebrow}
            title={t.title}
            lead={t.subtitle}
            tone="photo"
            className="mb-9"
          />
          <Link to={l('/humanoidhack')} className={btnSolidOnDark}>
            {t.cta}
            <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
