import { Link } from 'react-router-dom';
import { useLocale, useLocaleHref } from '@/contexts/LocaleContext';
import { translations } from '@/i18n/translations';
import { DiscordMark, sectionPad, sectionInner } from '@/components/ui';
import orbohLogo from '@/assets/orboh-logo.png';

const DISCORD_URL = 'https://discord.gg/fDAWmeTV6f';
const CONTACT_FORM_URL = 'https://tally.so/r/2EzoQg';

const SOCIAL_URLS: Record<string, string> = {
  X: 'https://x.com/kotaueda999',
  LinkedIn: 'https://www.linkedin.com/company/orboh',
  GitHub: 'https://github.com/Orboh',
  YouTube: 'https://www.youtube.com/@Orboh2026',
};

export function Footer() {
  const { locale } = useLocale();
  const l = useLocaleHref();
  const t = translations[locale].footer;
  const contact = translations[locale].contact;

  return (
    <footer className={`${sectionPad} py-16 bg-carbon text-carbon-muted text-sm`}>
      <div className={`${sectionInner} flex flex-col gap-12`}>
        <div className="flex flex-col md:flex-row md:items-start gap-10 md:gap-16">
          <div className="flex-1">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-block mb-3"
            >
              <img src={orbohLogo} alt="Orboh" className="h-7 w-auto brightness-150" />
            </button>
            <p className="text-carbon-muted max-w-sm leading-relaxed">
              {t.tagline}
            </p>
          </div>

          <nav className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-10 text-sm">
            <div>
              <h3 className="type-label text-canvas border-b border-carbon-hairline pb-3 mb-4">
                {t.columns.products.title}
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <Link
                    to={l('/agri')}
                    className="text-carbon-muted hover:text-canvas transition-colors"
                  >
                    {t.columns.products.agri}
                  </Link>
                </li>
                <li>
                  <Link
                    to={l('/fleetseek')}
                    className="text-carbon-muted hover:text-canvas transition-colors"
                  >
                    FleetSeek
                  </Link>
                </li>
                <li>
                  <button type="button" className="text-carbon-muted hover:text-canvas transition-colors">
                    RaaS
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="type-label text-canvas border-b border-carbon-hairline pb-3 mb-4">
                {t.columns.company.title}
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <Link
                    to={l('/humanoidhack')}
                    className="text-carbon-muted hover:text-canvas transition-colors"
                  >
                    Humanoid Hack
                  </Link>
                </li>
                <li>
                  <Link
                    to={l('/hiring')}
                    className="text-carbon-muted hover:text-canvas transition-colors"
                  >
                    {t.columns.company.hiring}
                  </Link>
                </li>
                <li>
                  <Link
                    to={l('/insights')}
                    className="text-carbon-muted hover:text-canvas transition-colors"
                  >
                    Insights
                  </Link>
                </li>
                <li>
                  <a
                    href={`${l('/')}#team`}
                    className="text-carbon-muted hover:text-canvas transition-colors"
                  >
                    Team
                  </a>
                </li>
                {t.columns.company.links.map((label) => (
                  <li key={label}>
                    <button
                      type="button"
                      className="text-carbon-muted hover:text-canvas transition-colors"
                    >
                      {label}
                    </button>
                  </li>
                ))}
                <li>
                  <a
                    href={CONTACT_FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-carbon-muted hover:text-canvas transition-colors"
                  >
                    {contact.footerLink}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="type-label text-canvas border-b border-carbon-hairline pb-3 mb-4">
                {t.columns.social.title}
              </h3>
              <ul className="space-y-2.5">
                {t.columns.social.links.map((label) => (
                  <li key={label}>
                    <a
                      href={SOCIAL_URLS[label] ?? '#'}
                      {...(SOCIAL_URLS[label] ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="text-carbon-muted hover:text-canvas transition-colors"
                    >
                      {label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={DISCORD_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-carbon-muted hover:text-canvas transition-colors"
                  >
                    <DiscordMark className="size-3.5 shrink-0" />
                    Discord
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="type-label text-canvas border-b border-carbon-hairline pb-3 mb-4">
                {t.columns.legal.title}
              </h3>
              <ul className="space-y-2.5">
                {t.columns.legal.links.map((label) => (
                  <li key={label}>
                    <a
                      href="#"
                      className="text-carbon-muted hover:text-canvas transition-colors"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        <div className="border-t border-carbon-hairline pt-6 flex flex-col sm:flex-row items-start justify-between gap-4">
          <div className="flex flex-col items-start gap-1 text-carbon-muted text-xs">
            <p className="text-carbon-muted">
              {t.companyName}
            </p>
            <p>{t.address}</p>
            <p>{t.copyright}</p>
          </div>
          <p className="text-carbon-muted text-xs">
            Built with humanoid robotics in mind.
          </p>
        </div>
      </div>
    </footer>
  );
}
