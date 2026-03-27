import { useLocale } from '@/contexts/LocaleContext';
import { translations } from '@/i18n/translations';

export function WhitepaperSection() {
  const { locale } = useLocale();
  const t = translations[locale].whitepaper;

  return (
    <section className="px-8 md:px-16 lg:px-24 py-20 bg-orange-50">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-12">
          <p className="text-xs md:text-sm font-medium tracking-widest text-orange-600 uppercase mb-3">
            {t.eyebrow}
          </p>
          <h2 className="text-3xl md:text-4xl font-light text-orange-950 mb-4">
            {t.title}
          </h2>
          <p className="text-orange-600 text-sm md:text-base max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="rounded-lg overflow-hidden shadow-lg bg-white border border-orange-200">
          <embed
            src="/RoboNet_WhitePaper.pdf"
            type="application/pdf"
            width="100%"
            height="800"
            className="w-full"
          />
        </div>

        <div className="text-center mt-8">
          <a
            href="/RoboNet_WhitePaper.pdf"
            download
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-orange-900 text-orange-950 text-sm font-medium tracking-wide hover:bg-orange-950 hover:text-stone-50 transition-colors rounded-md"
          >
            {t.downloadButton}
          </a>
        </div>
      </div>
    </section>
  );
}
