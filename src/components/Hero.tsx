import { Icon } from '@iconify/react';
import { useLocale } from '@/contexts/LocaleContext';
import { translations } from '@/i18n/translations';
import { WHAT_WE_CAN_DO_SECTION_ID } from './CaseStudy';

import unitreeRobotWebp from '@/assets/hero/unitree_robot_g1.webp';

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
      className="min-h-screen flex flex-col justify-center items-center px-8 md:px-16 lg:px-24 py-20 bg-zinc-950 text-zinc-50 relative overflow-hidden"
    >
      {/* Full-bleed robot image */}
      <img
        src={unitreeRobotWebp}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-zinc-950/70" />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.16] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23666666' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Content — centered */}
      <div className="relative z-10 max-w-4xl mx-auto w-full text-center">
        <p className="text-orange-400 text-xs tracking-widest uppercase mb-4">
          {t.eyebrow}
        </p>
        <h1
          className="font-mono text-3xl md:text-5xl lg:text-6xl uppercase font-normal leading-tight mb-6 whitespace-pre-line text-zinc-50"
          style={{ letterSpacing: '-0.02em' }}
        >
          {t.title}
        </h1>
        <p className="text-zinc-300 text-md max-w-xl mx-auto leading-relaxed mb-10 whitespace-pre-line">
          {t.subtitle}
        </p>
        <button
          type="button"
          onClick={scrollToNextSection}
          className="flex items-center gap-2 mx-auto text-zinc-400 animate-scroll-bounce hover:text-zinc-100 transition-colors cursor-pointer"
          aria-label={t.scrollAria}
        >
          <Icon
            icon="mdi:chevron-down"
            className="size-5 shrink-0"
            aria-hidden
          />
          <span className="text-xs uppercase tracking-widest">{t.scroll}</span>
        </button>
      </div>
    </section>
  );
}
