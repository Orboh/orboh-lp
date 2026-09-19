import { useLocale } from '@/contexts/LocaleContext';
import { translations } from '@/i18n/translations';
import {
  ArrowRight,
  DiscordMark,
  sectionPad,
  sectionInner,
  btnSolidOnAccent,
  btnOutlineOnDark,
} from './ui';

const DISCORD_URL = 'https://discord.gg/fDAWmeTV6f';
const CONTACT_FORM_URL = 'https://tally.so/r/2EzoQg';

/**
 * The single accent block in the system. Both references reserve one
 * full-bleed chromatic section for the highest-prominence moment; here it is
 * the closing call to action, and it is the only place the accent fills a
 * whole band rather than marking a detail.
 */
export function CTASection() {
  const { locale } = useLocale();
  const t = translations[locale].cta;
  const contact = translations[locale].contact;

  return (
    <section className={`${sectionPad} py-24 md:py-28 bg-accent text-canvas`}>
      <div className={sectionInner}>
        <div className="max-w-3xl">
          <h2 className="type-display-lg text-[2.15rem] sm:text-[2.75rem] lg:text-[3.3rem] text-canvas mb-6">
            {t.title}
          </h2>
          <p className="text-[19px] leading-[1.95] text-canvas mb-10 max-w-2xl">{t.subtitle}</p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <a
              href={CONTACT_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={btnSolidOnAccent}
            >
              {contact.formButton}
              <ArrowRight />
            </a>
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

          <p className="text-canvas text-xs mt-8">{contact.noSolicitation}</p>
        </div>
      </div>
    </section>
  );
}
