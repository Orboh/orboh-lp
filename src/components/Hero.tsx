import { Icon } from '@iconify/react';
import { useLocale } from '@/contexts/LocaleContext';
import { translations } from '@/i18n/translations';
import { WHAT_WE_CAN_DO_SECTION_ID } from './CaseStudy';

const DISCORD_URL = 'https://discord.gg/fDAWmeTV6f';

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

        {/* Discord CTA — highly visible */}
        <a
          href={DISCORD_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 mb-12 rounded-lg font-semibold text-base tracking-wide text-white transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
          style={{ backgroundColor: '#5865F2' }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6 shrink-0"
            aria-hidden
          >
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.042.033.055a19.83 19.83 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.07 13.07 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
          </svg>
          Join our Discord Community
        </a>

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
