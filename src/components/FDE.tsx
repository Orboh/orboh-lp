import { Icon } from '@iconify/react';
import { useLocale } from '@/contexts/LocaleContext';
import { translations } from '@/i18n/translations';

import embedFieldImage from '@/assets/fde/embed_field.webp';
import implementSetupImage from '@/assets/fde/implement_setup.webp';
import operateSiteImage from '@/assets/fde/operate_site.webp';

export const WHY_FDE_SECTION_ID = 'why-fde';

const STEP_IMAGES = [embedFieldImage, implementSetupImage, operateSiteImage];

/**
 * The implementation-gap diagram from the pitch deck, rebuilt natively:
 * customer site on top, the hardware/AI/OS stack at the bottom, and Orboh
 * bridging the gap between them.
 */
function GapDiagram() {
  const { locale } = useLocale();
  const d = translations[locale].whyFde.diagram;

  return (
    <div className="grid grid-cols-[auto_1fr] gap-x-3 sm:gap-x-4">
      {/* Bridge rail: Orboh spanning from the customer down to the stack */}
      <div className="flex flex-col items-center">
        <Icon icon="mdi:arrow-up" className="size-4 text-orange-500 shrink-0" aria-hidden />
        <div className="w-px flex-1 bg-orange-500" />
        <div className="my-1 rounded bg-orange-500 text-white px-3 py-3 sm:px-4 text-center max-w-28 sm:max-w-40">
          <p className="font-mono text-sm sm:text-base leading-none">{d.bridgeLabel}</p>
          <p className="text-[10px] sm:text-xs mt-1.5 leading-snug text-orange-50">{d.bridgeSub}</p>
        </div>
        <div className="w-px flex-1 bg-orange-500" />
        <Icon icon="mdi:arrow-down" className="size-4 text-orange-500 shrink-0" aria-hidden />
      </div>

      {/* Customer / gap / stack */}
      <div className="flex flex-col">
        <div className="rounded bg-zinc-900 text-zinc-50 px-4 py-3.5 sm:px-5">
          <p className="text-sm font-medium">{d.customer}</p>
          <p className="text-xs text-zinc-400 mt-1 leading-snug">{d.customerSub}</p>
        </div>

        <div className="my-2.5 rounded border-2 border-dashed border-orange-400/70 bg-orange-50 px-4 py-5 sm:px-5">
          <p className="font-mono text-xs tracking-widest uppercase text-orange-600">{d.gapLabel}</p>
          <p className="text-xs text-zinc-600 mt-1 leading-snug">{d.gapNote}</p>
        </div>

        <div className="relative rounded border border-zinc-200 bg-zinc-50 px-3 pt-5 pb-3 sm:px-4">
          <p className="absolute -top-2 left-3 bg-zinc-50 px-1 text-[10px] tracking-widest uppercase text-zinc-400">
            {d.stackLabel}
          </p>
          <div className="flex flex-col gap-1.5">
            {d.layers.map((layer) => (
              <div
                key={layer.name}
                className="rounded border border-zinc-200 bg-white px-3 py-2 sm:px-4 flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3"
              >
                <p className="text-sm font-medium text-zinc-800 shrink-0">{layer.name}</p>
                <p className="text-xs text-zinc-500 leading-snug sm:text-right">{layer.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function WhyFDESection() {
  const { locale } = useLocale();
  const t = translations[locale].whyFde;

  return (
    <section
      id={WHY_FDE_SECTION_ID}
      className="px-8 md:px-16 lg:px-24 py-24 bg-white text-zinc-950"
    >
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <p className="text-orange-600 text-xs tracking-widest uppercase mb-4">
            {t.eyebrow}
          </p>
          <h2
            className="font-mono text-3xl md:text-4xl font-normal text-zinc-900 mb-8 whitespace-pre-line"
            style={{ letterSpacing: '-0.02em' }}
          >
            {t.title}
          </h2>
          <p className="text-zinc-600 text-sm md:text-base leading-relaxed mb-6">
            {t.body1}
          </p>
          <p className="text-zinc-600 text-sm md:text-base leading-relaxed">
            {t.body2}
          </p>
          <p className="mt-6 border-l-2 border-orange-500 pl-4 text-zinc-800 text-sm md:text-base leading-relaxed">
            {t.definition}
          </p>
        </div>

        <GapDiagram />
      </div>
    </section>
  );
}

export function HowWeWorkSection() {
  const { locale } = useLocale();
  const t = translations[locale].howWeWork;

  return (
    <section className="px-8 md:px-16 lg:px-24 py-24 bg-zinc-950 text-zinc-50">
      <div className="max-w-7xl mx-auto w-full">
        <p className="text-orange-400 text-xs tracking-widest uppercase mb-4">
          {t.eyebrow}
        </p>
        <h2
          className="font-mono text-3xl md:text-4xl font-normal mb-6 whitespace-pre-line"
          style={{ letterSpacing: '-0.02em' }}
        >
          {t.title}
        </h2>
        <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-3xl mb-16">
          {t.subtitle}
        </p>

        <div className="flex flex-col">
          {t.steps.map((step, index) => (
            <div key={step.number}>
              {index > 0 && (
                <div className="hidden lg:block w-px h-16 bg-orange-400/30 mx-auto" />
              )}
              <div
                className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                  index > 0 ? 'mt-16 lg:mt-0' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <img
                    src={STEP_IMAGES[index]}
                    alt={step.imageAlt}
                    loading="lazy"
                    className="w-full aspect-[4/3] object-cover rounded border border-zinc-800"
                  />
                </div>
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <span className="block font-mono text-5xl md:text-6xl text-orange-400 mb-4">
                    {step.number}
                  </span>
                  <h3 className="text-xl md:text-2xl font-medium text-zinc-100 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-xl">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
