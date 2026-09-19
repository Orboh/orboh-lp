import { useLocale } from '@/contexts/LocaleContext';
import { translations } from '@/i18n/translations';
import { WHY_FDE_SECTION_ID } from './FDE';
import {
  ArrowRight,
  DiscordMark,
  btnSolidOnDark,
  btnOutlineOnDark,
  sectionPad,
  sectionInner,
} from './ui';

const DISCORD_URL = 'https://discord.gg/fDAWmeTV6f';
const CONTACT_FORM_URL = 'https://tally.so/r/2EzoQg';

import heroTeleopWebp from '@/assets/hero/vr_teleop_workshop.webp';

export const HERO_SECTION_ID = 'hero-section';

export function HeroSection() {
  const { locale } = useLocale();
  const t = translations[locale].hero;

  const scrollToNextSection = () => {
    const next = document.getElementById(WHY_FDE_SECTION_ID);
    next?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id={HERO_SECTION_ID}
      className={`${sectionPad} min-h-[92vh] flex flex-col justify-end pt-32 pb-12 bg-carbon text-canvas relative overflow-hidden`}
    >
      {/* Full-bleed, uncropped, no frame — the photograph is the only rich
          object in the band. */}
      <img
        src={heroTeleopWebp}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      {/* Flat tint, not a gradient: both references build on hard colour
          blocks and treat gradients as a break in the language. */}
      <div className="absolute inset-0 bg-carbon/72" />

      <div className={`relative z-10 ${sectionInner}`}>
        <div className="max-w-3xl">
          <div className="border-t border-canvas/25 pt-3.5">
            <p className="type-label text-carbon-muted">{t.eyebrow}</p>
          </div>

          <h1 className="type-display-lg text-[2rem] sm:text-[2.9rem] lg:text-[3.6rem] mt-7 mb-7 whitespace-pre-line text-canvas">
            {t.title}
          </h1>

          <p className="text-[15px] leading-[1.95] text-canvas/72 max-w-xl mb-10 whitespace-pre-line">
            {t.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <a
              href={CONTACT_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={btnSolidOnDark}
            >
              {t.primaryCta}
              <ArrowRight />
            </a>
            {/* Neutral, not Discord blurple: the system allows a single
                chromatic hue and it is spent on the accent, not on a logo. */}
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={btnOutlineOnDark}
            >
              <DiscordMark />
              Discord
            </a>
          </div>
        </div>
      </div>

      <div className={`relative z-10 ${sectionInner} mt-16`}>
        <button
          type="button"
          onClick={scrollToNextSection}
          className="type-label text-canvas/45 hover:text-canvas transition-colors cursor-pointer"
          aria-label={t.scrollAria}
        >
          {t.scroll} ↓
        </button>
      </div>
    </section>
  );
}
