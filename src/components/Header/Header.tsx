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

  const handleBookDemo = () => {
    const url = 'https://calendly.com/your-link';
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-8 md:px-16 lg:px-24 transition-all duration-300 ease-out transform ${
        scrolled
          ? '-translate-y-full opacity-0 pointer-events-none'
          : 'translate-y-0 opacity-100 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto w-full h-16 flex items-center justify-between">
        <a
          href="/"
          className="text-stone-50 font-bold tracking-tight text-2xl hover:text-stone-100 transition-colors"
        >
          Orboh
        </a>

        <nav className="flex items-center gap-6">
          <div className="relative" ref={ref}>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="flex items-center gap-1.5 px-3 py-2 text-stone-300 hover:text-stone-50 text-sm transition-colors rounded-md hover:bg-stone-800/60"
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
                className="absolute right-0 top-full mt-1 py-1 w-36 bg-stone-900 border border-stone-700 rounded-md shadow-lg z-10"
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
                          ? 'bg-stone-800 text-stone-50 font-medium'
                          : 'text-stone-300 hover:bg-stone-800/80 hover:text-stone-50'
                      }`}
                    >
                      {langLabels[option]}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button
            type="button"
            onClick={handleBookDemo}
            className="px-4 py-2.5 border border-stone-400 text-stone-50 text-sm font-medium tracking-wide hover:border-stone-100 hover:bg-stone-50 hover:text-stone-900 transition-colors rounded-md"
          >
            Book a demo
          </button>
        </nav>
      </div>
    </header>
  );
}
