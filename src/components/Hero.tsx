import { Icon } from '@iconify/react';
import { useLocale } from '@/contexts/LocaleContext';
import { translations } from '@/i18n/translations';
import { WHAT_WE_CAN_DO_SECTION_ID } from './CaseStudy';

import unitreeG1Image from '@/assets/hero/unitree_g1.png';

export const HERO_SECTION_ID = 'hero-section';

export function HeroSection() {
  const { locale } = useLocale();
  const t = translations[locale].hero;

  const scrollToNextSection = () => {
    const next = document.getElementById(WHAT_WE_CAN_DO_SECTION_ID);
    next?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id={HERO_SECTION_ID}
      className="min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 py-20 bg-stone-800 text-stone-50 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div>
          <p className="text-stone-300 text-sm tracking-widest mb-4">
            {t.eyebrow}
          </p>
          <h1
            className="text-2xl md:text-4xl lg:text-5xl uppercase font-light leading-tight mb-6 whitespace-pre-line text-stone-50"
            style={{ letterSpacing: '-0.02em' }}
          >
            {t.title}
          </h1>
          <p className="text-stone-400 text-md max-w-xl leading-relaxed mb-8 whitespace-pre-line">
            {t.subtitle}
          </p>
          <button
            type="button"
            onClick={scrollToNextSection}
            className="flex items-center gap-2 text-stone-400 animate-scroll-bounce hover:text-stone-200 transition-colors cursor-pointer text-md"
            aria-label={t.scrollAria}
          >
            <Icon
              icon="mdi:chevron-down"
              className="size-5 shrink-0"
              aria-hidden
            />
            <span className="text-sm">{t.scroll}</span>
          </button>
        </div>

        <div className="relative flex justify-center md:justify-end items-center min-h-[250px] md:min-h-0 w-full">
          <div
            className="relative z-10 w-full max-w-md md:max-w-lg lg:max-w-xl rounded-2xl overflow-hidden border border-stone-500/80 shadow-xl flex items-center justify-center aspect-square"
            style={{
              backgroundImage:
                'linear-gradient(to bottom, #44403c 0%, #292524 55%, #1c1917 100%)',
            }}
          >
            {/* subtle grain overlay to match page texture */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-soft-light"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='noStitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.45'/%3E%3C/svg%3E\")",
              }}
            />
            <img
              src={unitreeG1Image}
              alt="Unitree G1 humanoid robot"
              className="h-full w-full object-cover object-center md:grayscale md:hover:grayscale-0 transition-[filter] duration-300"
            />
          </div>
        </div>
      </div>

      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.16] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23666666' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
    </section>
  );
}
