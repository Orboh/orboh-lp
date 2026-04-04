import { Icon } from '@iconify/react';
import { useLocale } from '@/contexts/LocaleContext';
import { translations } from '@/i18n/translations';
import { RoboNetDiagram } from './RoboNetDiagram';

export const ROBONET_SECTION_ID = 'robonet-section';

export function RoboNetSection() {
  const { locale } = useLocale();
  const t = translations[locale].robonet;

  return (
    <section id={ROBONET_SECTION_ID} className="px-8 md:px-16 lg:px-24 py-24 bg-zinc-900 text-zinc-50">
      <div className="max-w-7xl mx-auto w-full">
        <p className="text-orange-400 text-xs tracking-widest uppercase mb-4">{t.eyebrow}</p>
        <h2 className="font-mono text-3xl md:text-4xl font-normal mb-6 whitespace-pre-line" style={{ letterSpacing: '-0.02em' }}>
          {t.title}
        </h2>
        <p className="text-zinc-400 text-sm md:text-base max-w-2xl mb-5 leading-relaxed">{t.subtitle}</p>
        <blockquote className="border-l-2 border-zinc-700 pl-5 mb-14 text-zinc-400 text-sm italic max-w-2xl leading-relaxed">
          {t.analogy}
        </blockquote>

        {/* RoboNet Diagram */}
        <div className="my-14">
          <RoboNetDiagram />
        </div>
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {t.layers.map((layer) => (
            <div key={layer.number} className="rounded border border-zinc-700 p-7 bg-zinc-950/60 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <Icon icon={layer.icon} className="size-5 text-zinc-300" aria-hidden />
                <span className="text-zinc-500 text-sm">{layer.number}</span>
              </div>
              <h3 className="text-lg font-medium text-zinc-100">{layer.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{layer.description}</p>
            </div>
          ))}
        </div>
        <div className="border-t border-zinc-700 pt-8">
          <p className="text-orange-400 text-xs tracking-widest uppercase mb-5">{t.pricing.label}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            {t.pricing.tiers.map((tier) => (
              <div key={tier.name} className="flex-1 rounded border border-zinc-700 px-5 py-4 flex items-center justify-between">
                <span className="text-zinc-100 font-medium text-sm">{tier.name}</span>
                <span className="text-zinc-500 text-xs">{tier.detail}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
