import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocale, useLocaleHref } from '@/contexts/LocaleContext';
import { translations, type Locale } from '@/i18n/translations';
import { DiscordMark } from '@/components/ui';
import orbohLogo from '@/assets/orboh-logo.png';

const langLabels: Record<Locale, string> = {
  en: 'English',
  ja: '日本語',
};

const FLEETSEEK_X_AUTH_URL = 'https://web-ebon-zeta-33.vercel.app/api/auth/x';
const DISCORD_URL = 'https://discord.gg/fDAWmeTV6f';
const CONTACT_FORM_URL = 'https://tally.so/r/2EzoQg';

const navLink =
  'hidden md:inline-flex items-center px-3 py-2 text-muted hover:text-ink type-label transition-colors';

export function Header() {
  const { locale, setLocale } = useLocale();
  const l = useLocaleHref();
  const contact = translations[locale].contact;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 10);
    }
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-6 sm:px-10 lg:px-16 border-b border-hairline bg-canvas transition-transform duration-300 ease-out ${
        scrolled ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
      }`}
    >
      <div className="max-w-[1200px] mx-auto w-full h-16 flex items-center justify-between">
        <Link to={l('/')} className="flex items-center">
          <img src={orbohLogo} alt="Orboh" className="h-7 w-auto" />
        </Link>

        <nav className="flex items-center gap-2">
          <Link to={l('/agri')} className={navLink}>
            {locale === 'ja' ? '農業' : 'Agriculture'}
          </Link>
          <Link to={l('/humanoidhack')} className={navLink}>
            Humanoid Hack
          </Link>
          <Link to={l('/hiring')} className={navLink}>
            Hiring
          </Link>
          <Link to={l('/insights')} className={navLink}>
            Insights
          </Link>
          <Link to={l('/fleetseek')} className={navLink}>
            FleetSeek
          </Link>
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            title="Join our Discord"
            className="hidden sm:inline-flex items-center gap-2 px-3 py-2 text-muted hover:text-ink type-label transition-colors"
          >
            <DiscordMark className="size-3.5 shrink-0" />
            Discord
          </a>

          <div className="relative ml-1" ref={ref}>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="flex items-center gap-1.5 px-3 py-2 text-muted hover:text-ink type-label transition-colors"
              aria-expanded={open}
              aria-haspopup="listbox"
              aria-label="Select language"
            >
              <span>{langLabels[locale]}</span>
              <svg
                className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path strokeLinecap="square" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {open && (
              <ul
                role="listbox"
                className="absolute right-0 top-full mt-px w-36 bg-surface border border-ink z-10"
              >
                {(['en', 'ja'] as const).map((option) => (
                  <li key={option} role="option" aria-selected={locale === option}>
                    <button
                      type="button"
                      onClick={() => {
                        setLocale(option);
                        setOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                        locale === option
                          ? 'bg-canvas text-ink font-medium'
                          : 'text-muted hover:text-ink'
                      }`}
                    >
                      {langLabels[option]}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <a
            href={FLEETSEEK_X_AUTH_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-3 py-2 border border-hairline text-ink hover:bg-ink hover:text-canvas hover:border-ink type-label transition-colors"
          >
            <svg viewBox="0 0 24 24" className="size-3" fill="currentColor" aria-hidden>
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Sign in
          </a>
          <a
            href={CONTACT_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 bg-ink text-canvas hover:bg-accent type-label transition-colors"
          >
            {contact.formButton}
          </a>
        </nav>
      </div>
    </header>
  );
}
