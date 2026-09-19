import { useLocale } from '@/contexts/LocaleContext';
import { translations } from '@/i18n/translations';
import { SectionHeading, sectionPad, sectionInner } from './ui';

import embedFieldImage from '@/assets/fde/embed_field.webp';
import implementSetupImage from '@/assets/fde/implement_setup.webp';
import operateSiteImage from '@/assets/fde/operate_site.webp';

export const WHY_FDE_SECTION_ID = 'why-fde';

const STEP_IMAGES = [embedFieldImage, implementSetupImage, operateSiteImage];

function Caret({ up = false }: { up?: boolean }) {
  return (
    <svg viewBox="0 0 12 8" className="w-2.5 h-1.5 fill-accent shrink-0" aria-hidden>
      <path d={up ? 'M6 0l6 8H0z' : 'M6 8L0 0h12z'} />
    </svg>
  );
}

/**
 * The implementation-gap diagram from the pitch deck, rebuilt natively:
 * customer site on top, the hardware/AI/OS stack at the bottom, and Orboh
 * bridging the gap between them. Drawn as ruled bands rather than rounded
 * cards, per the teenage engineering reference.
 */
function GapDiagram() {
  const { locale } = useLocale();
  const d = translations[locale].whyFde.diagram;

  return (
    <div className="grid grid-cols-[auto_1fr] gap-x-4 sm:gap-x-5">
      {/* Bridge rail: Orboh spanning from the customer down to the stack */}
      <div className="flex flex-col items-center">
        <Caret up />
        <div className="w-px flex-1 bg-accent" />
        <div className="my-2 border border-accent px-3 py-3.5 sm:px-4 text-center max-w-28 sm:max-w-36">
          <p className="type-display text-sm sm:text-base text-accent">{d.bridgeLabel}</p>
          <p className="text-[12px] sm:text-[13px] mt-2 leading-relaxed text-muted">{d.bridgeSub}</p>
        </div>
        <div className="w-px flex-1 bg-accent" />
        <Caret />
      </div>

      {/* Customer / gap / stack */}
      <div className="flex flex-col">
        <div className="bg-carbon text-canvas px-5 py-4">
          <p className="text-sm font-medium">{d.customer}</p>
          <p className="text-xs text-carbon-muted mt-1.5 leading-relaxed">{d.customerSub}</p>
        </div>

        <div className="my-3 border-y border-dashed border-accent/55 px-5 py-5">
          <p className="type-label text-accent">{d.gapLabel}</p>
          <p className="text-xs text-muted mt-2.5 leading-relaxed">{d.gapNote}</p>
        </div>

        <div className="border-t border-ink pt-3">
          <p className="type-label text-muted mb-1">{d.stackLabel}</p>
          <div className="flex flex-col">
            {d.layers.map((layer) => (
              <div
                key={layer.name}
                className="py-3.5 border-b border-hairline flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
              >
                <p className="text-sm font-medium text-ink shrink-0">{layer.name}</p>
                <p className="text-xs text-muted leading-relaxed sm:text-right">{layer.note}</p>
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
    <section id={WHY_FDE_SECTION_ID} className={`${sectionPad} py-20 md:py-24 bg-canvas`}>
      <div className={`${sectionInner} grid lg:grid-cols-[1fr_minmax(0,440px)] gap-14 lg:gap-20 items-start`}>
        <div>
          <SectionHeading label={t.eyebrow} title={t.title} />
          <div className="mt-8 flex flex-col gap-5 max-w-xl">
            <p className="text-[19px] leading-[1.95] text-muted">{t.body1}</p>
            <p className="text-[19px] leading-[1.95] text-muted">{t.body2}</p>
          </div>
          <p className="mt-9 max-w-xl border-l-2 border-accent pl-5 text-[19px] md:text-base leading-[1.9] text-ink">
            {t.definition}
          </p>
        </div>

        <div className="lg:pt-12">
          <GapDiagram />
        </div>
      </div>
    </section>
  );
}

export function HowWeWorkSection() {
  const { locale } = useLocale();
  const t = translations[locale].howWeWork;

  return (
    <section className={`${sectionPad} py-20 md:py-24 bg-carbon text-canvas`}>
      <div className={sectionInner}>
        <SectionHeading label={t.eyebrow} title={t.title} lead={t.subtitle} tone="dark" />

        <div className="mt-16 flex flex-col">
          {t.steps.map((step, index) => (
            <div
              key={step.number}
              className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center py-12 border-t border-carbon-hairline first:border-t-0 first:pt-0"
            >
              {/* No padding, no frame, no rounding — the photograph runs to
                  the edge of its cell. */}
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <img
                  src={STEP_IMAGES[index]}
                  alt={step.imageAlt}
                  loading="lazy"
                  className="block w-full aspect-[4/3] object-cover"
                />
              </div>
              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <p className="type-label text-accent">{step.number}</p>
                <h3 className="type-display text-xl md:text-2xl text-canvas mt-4 mb-5">
                  {step.title}
                </h3>
                <p className="text-[19px] leading-[1.95] text-carbon-muted max-w-xl">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
