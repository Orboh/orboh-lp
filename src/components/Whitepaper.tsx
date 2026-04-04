import { useLocale } from '@/contexts/LocaleContext';
import { translations } from '@/i18n/translations';

export function WhitepaperSection() {
  const { locale } = useLocale();
  const t = translations[locale].whitepaper;

  return (
    <section className="px-8 md:px-16 lg:px-24 py-20 bg-zinc-50">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-12">
          <p className="text-xs md:text-sm font-medium tracking-widest text-orange-400 uppercase mb-3">
            {t.eyebrow}
          </p>
          <h2 className="font-mono text-3xl md:text-4xl font-normal text-zinc-900 mb-4">
            {t.title}
          </h2>
          <p className="text-zinc-600 text-sm md:text-base max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="rounded overflow-hidden shadow-lg bg-white border border-zinc-200">
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
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-zinc-800 text-zinc-900 text-xs font-medium tracking-widest uppercase hover:bg-zinc-900 hover:text-zinc-50 transition-colors rounded"
          >
            {t.downloadButton}
          </a>
        </div>
      </div>
    </section>
  );
}
