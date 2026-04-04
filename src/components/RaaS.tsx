import { Icon } from '@iconify/react';
import { useLocale } from '@/contexts/LocaleContext';
import { translations } from '@/i18n/translations';

export const RAAS_SECTION_ID = 'raas-section';

export function RaaSSection() {
  const { locale } = useLocale();
  const t = translations[locale].raas;

  return (
    <section id={RAAS_SECTION_ID} className="px-8 md:px-16 lg:px-24 py-24 bg-zinc-50 text-zinc-950">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Left */}
          <div>
            <p className="text-orange-400 text-xs tracking-widest uppercase mb-4">{t.eyebrow}</p>
            <h2 className="font-mono text-3xl md:text-4xl font-normal mb-6" style={{ letterSpacing: '-0.02em' }}>
              {t.title}
            </h2>
            <p className="text-zinc-600 text-sm md:text-base leading-relaxed mb-8">{t.subtitle}</p>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-zinc-500 text-sm mr-1">{t.verticals.label}</span>
              {t.verticals.items.map((v) => (
                <span key={v} className="px-3 py-1 rounded border border-zinc-300 text-zinc-600 text-sm">
                  {v}
                </span>
              ))}
            </div>
          </div>
          {/* Right: 2×2 cards */}
          <div className="grid grid-cols-2 gap-4">
            {t.cards.map((card, i) => (
              <div key={i} className="flex flex-col gap-3 p-5 rounded border border-zinc-200 bg-white">
                <div className="h-9 w-9 flex items-center justify-center rounded bg-zinc-100">
                  <Icon icon={card.icon} className="size-5 text-zinc-700" aria-hidden />
                </div>
                <h3 className="font-medium text-zinc-900 text-sm">{card.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
