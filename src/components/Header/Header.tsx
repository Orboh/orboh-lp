import { useState, useRef, useEffect } from 'react';
import { useLocale } from '@/contexts/LocaleContext';
import type { Locale } from '@/i18n/translations';

const langLabels: Record<Locale, string> = {
  en: 'English',
  ja: '日本語',
};

export function Header() {
  const { locale, setLocale } = useLocale();
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

  const FLEETSEEK_APP_URL = 'https://web-ebon-zeta-33.vercel.app/';
  const FLEETSEEK_X_AUTH_URL = 'https://web-ebon-zeta-33.vercel.app/api/auth/x';

  const handleBookDemo = () => {
    const url = 'https://calendly.com/soutamiyajima/30min';
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-8 md:px-16 lg:px-24 border-b border-zinc-200 transition-all duration-300 ease-out transform ${
        scrolled
          ? '-translate-y-full opacity-0 pointer-events-none'
          : 'translate-y-0 opacity-100'
      }`}
      style={{ backgroundColor: '#f0ece6' }}
    >
      <div className="max-w-7xl mx-auto w-full h-16 flex items-center justify-between">
        <a
          href="/"
          className="font-mono text-zinc-900 font-bold tracking-tight text-xl hover:text-zinc-600 transition-colors"
        >
          Orboh
        </a>

        <nav className="flex items-center gap-6">
          <a
            href={FLEETSEEK_APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 text-zinc-600 hover:text-zinc-900 text-xs uppercase tracking-widest transition-colors rounded hover:bg-zinc-100"
          >
            FleetSeek
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          <div className="relative" ref={ref}>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="flex items-center gap-1.5 px-3 py-2 text-zinc-600 hover:text-zinc-900 text-xs uppercase tracking-widest transition-colors rounded hover:bg-zinc-100"
              aria-expanded={open}
              aria-haspopup="listbox"
              aria-label="Select language"
            >
              <span>{langLabels[locale]}</span>
              <svg
                className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {open && (
              <ul
                role="listbox"
                className="absolute right-0 top-full mt-1 py-1 w-36 bg-white border border-zinc-200 rounded shadow-lg z-10"
              >
                {(['en', 'ja'] as const).map((option) => (
                  <li key={option} role="option" aria-selected={locale === option}>
                    <button
                      type="button"
                      onClick={() => {
                        setLocale(option);
                        setOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        locale === option
                          ? 'bg-zinc-100 text-zinc-900 font-medium'
                          : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900'
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
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 border border-zinc-300 text-zinc-800 hover:bg-zinc-900 hover:text-zinc-50 hover:border-zinc-900 text-xs font-medium tracking-widest uppercase transition-colors rounded"
          >
            <svg viewBox="0 0 24 24" className="size-3" fill="currentColor" aria-hidden>
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Sign in
          </a>
          <button
            type="button"
            onClick={handleBookDemo}
            className="px-4 py-2.5 border border-zinc-800 text-zinc-900 text-xs font-medium tracking-widest uppercase hover:bg-zinc-900 hover:text-zinc-50 transition-colors rounded"
          >
            Book a demo
          </button>
        </nav>
      </div>
    </header>
  );
}
