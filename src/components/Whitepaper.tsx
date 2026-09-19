import { useLocale } from '@/contexts/LocaleContext';
import { translations } from '@/i18n/translations';
import { SectionHeading, btnOutline, sectionInner, sectionPad } from './ui';

export function WhitepaperSection() {
  const { locale } = useLocale();
  const t = translations[locale].whitepaper;

  return (
    <section className={`${sectionPad} py-20 md:py-24 bg-canvas`}>
      <div className={sectionInner}>
        <SectionHeading label={t.eyebrow} title={t.title} lead={t.subtitle} className="mb-12" />

        <div className="overflow-hidden bg-surface border border-hairline">
          <embed
            src="/FleetSeek_WhitePaper.pdf"
            type="application/pdf"
            width="100%"
            height="800"
            className="w-full"
          />
        </div>

        <div className="mt-8">
          <a
            href="/FleetSeek_WhitePaper.pdf"
            download
            className={btnOutline}
          >
            {t.downloadButton}
          </a>
        </div>
      </div>
    </section>
  );
}
