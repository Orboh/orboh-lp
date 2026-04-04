import { useLocale } from '@/contexts/LocaleContext';
import { translations } from '@/i18n/translations';

const DEFAULT_MEETING_URL = 'https://calendly.com/soutamiyajima/30min';

interface CTASectionProps {
  meetingUrl?: string;
}

export function CTASection({ meetingUrl = DEFAULT_MEETING_URL }: CTASectionProps) {
  const { locale } = useLocale();
  const t = translations[locale].cta;

  return (
    <section className="px-8 md:px-16 lg:px-24 py-28 bg-zinc-100 text-zinc-50">
      <div className="max-w-4xl mx-auto w-full text-center relative overflow-hidden rounded border border-zinc-700 bg-zinc-950 px-6 sm:px-10 py-16 sm:py-20">
        {/* subtle background cross pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(148, 163, 184, 0.22) 1px, transparent 0)",
            backgroundSize: '20px 20px',
          }}
        />

        <div className="relative z-10">
          <h2
            className="font-mono text-3xl md:text-4xl font-normal mb-5 text-zinc-50"
            style={{ letterSpacing: '-0.02em' }}
          >
            {t.title}
          </h2>
          <p className="text-zinc-400 text-sm md:text-base mb-10 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={meetingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-zinc-400 text-zinc-50 text-xs font-medium tracking-widest uppercase hover:bg-zinc-50 hover:text-zinc-950 transition-colors rounded"
            >
              {t.button}
            </a>
            <a
              href="/RoboNet_WhitePaper.pdf"
              download
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-zinc-400 text-zinc-50 text-xs font-medium tracking-widest uppercase hover:bg-zinc-50 hover:text-zinc-950 transition-colors rounded"
            >
              {t.whitepaper}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
