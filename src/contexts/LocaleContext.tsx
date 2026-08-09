import { createContext, useContext, useCallback, useEffect, useMemo, type ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { Locale } from '@/i18n/translations';
import { href, localePath } from '@/i18n/routing';

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

/**
 * The locale comes from the URL (`/ja/...` vs `/...`), not from component
 * state, so every page exists as its own indexable URL. Switching language is
 * a navigation to the mirrored path.
 */
export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();

  const setLocale = useCallback(
    (next: Locale) => {
      if (next === locale) return;
      navigate(localePath(location.pathname, next) + location.search + location.hash);
    },
    [locale, location.hash, location.pathname, location.search, navigate]
  );

  // Keep the <html lang="..."> attribute in sync with the current locale
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const value = useMemo(() => ({ locale, setLocale }), [locale, setLocale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider');
  return ctx;
}

/**
 * Builds internal links that stay in the current locale.
 * `l('/fleetseek')` -> '/fleetseek' in English, '/ja/fleetseek' in Japanese.
 */
export function useLocaleHref() {
  const { locale } = useLocale();
  return useCallback((path: string) => href(path, locale), [locale]);
}
