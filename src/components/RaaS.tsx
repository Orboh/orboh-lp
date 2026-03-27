import { Icon } from '@iconify/react';
import { useLocale } from '@/contexts/LocaleContext';
import { translations } from '@/i18n/translations';

export const RAAS_SECTION_ID = 'raas-section';

export function RaaSSection() {
  const { locale } = useLocale();
  const t = translations[locale].raas;

  return (
    <section id={RAAS_SECTION_ID} className="px-8 md:px-16 lg:px-24 py-24 bg-orange-50 text-orange-950">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Left */}
          <div>
            <p className="text-orange-400 text-xs tracking-widest uppercase mb-4">{t.eyebrow}</p>
            <h2 className="text-3xl md:text-4xl font-light mb-6" style={{ letterSpacing: '-0.02em' }}>
              {t.title}
            </h2>
            <p className="text-orange-600 text-sm md:text-base leading-relaxed mb-8">{t.subtitle}</p>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-orange-400 text-sm mr-1">{t.verticals.label}</span>
              {t.verticals.items.map((v) => (
                <span key={v} className="px-3 py-1 rounded-full border border-orange-200 text-orange-600 text-sm">
                  {v}
                </span>
              ))}
            </div>
          </div>
          {/* Right: 2×2 cards */}
          <div className="grid grid-cols-2 gap-4">
            {t.cards.map((card, i) => (
              <div key={i} className="flex flex-col gap-3 p-5 rounded-xl border border-orange-200 bg-white">
                <div className="h-9 w-9 flex items-center justify-center rounded-lg bg-orange-50">
                  <Icon icon={card.icon} className="size-5 text-orange-700" aria-hidden />
                </div>
                <h3 className="font-medium text-orange-950 text-sm">{card.title}</h3>
                <p className="text-orange-400 text-sm leading-relaxed">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
