import type { Locale } from './translations';

export const LOCALES = ['en', 'ja'] as const;
export const DEFAULT_LOCALE: Locale = 'en';

/** Path segment that marks the Japanese tree. English lives at the root. */
export const JA_PREFIX = 'ja';

/**
 * Every route, written without a locale prefix. '' is the home page.
 * The router, the prerenderer and the sitemap all read this list, so adding a
 * page here is enough to make it build, get meta tags and be indexed.
 */
export const ROUTE_PATHS = [
  '',
  'fleetseek',
  'humanoidhack',
  'humanoidhack/hackathon',
  'insights',
  'insights/shenzhen-robotics',
] as const;

export type RoutePath = (typeof ROUTE_PATHS)[number];

/**
 * Routes that deliberately exist in one locale only. The Shenzhen report is
 * written for Japanese search intent; we would rather have no English page
 * than a thin machine translation.
 */
export const LOCALE_ONLY_ROUTES: Record<string, Locale> = {
  'insights/shenzhen-robotics': 'ja',
};

export function routeExists(path: string, locale: Locale): boolean {
  const only = LOCALE_ONLY_ROUTES[normalize(path)];
  return only === undefined || only === locale;
}

/** Drop leading/trailing slashes so paths compare cleanly. */
function normalize(path: string): string {
  return path.replace(/^\/+/, '').replace(/\/+$/, '');
}

/** Build a URL for a route in a locale: ('fleetseek', 'ja') -> '/ja/fleetseek' */
export function href(path: string, locale: Locale): string {
  const clean = normalize(path);
  const base = locale === 'ja' ? `/${JA_PREFIX}` : '';
  if (!clean) return base || '/';
  return `${base}/${clean}`;
}

/** Split a real pathname into its locale and its locale-free route path. */
export function parsePath(pathname: string): { locale: Locale; path: string } {
  const clean = normalize(pathname);
  if (clean === JA_PREFIX) return { locale: 'ja', path: '' };
  if (clean.startsWith(`${JA_PREFIX}/`)) {
    return { locale: 'ja', path: clean.slice(JA_PREFIX.length + 1) };
  }
  return { locale: 'en', path: clean };
}

/**
 * The same page in the other locale. Falls back to that locale's home page
 * when the current route does not exist there.
 */
export function localePath(pathname: string, locale: Locale): string {
  const { path } = parsePath(pathname);
  return routeExists(path, locale) ? href(path, locale) : href('', locale);
}

/** All (locale, path) pairs that should be built as static HTML. */
export function allRoutes(): { locale: Locale; path: string; url: string }[] {
  const out: { locale: Locale; path: string; url: string }[] = [];
  for (const locale of LOCALES) {
    for (const path of ROUTE_PATHS) {
      if (!routeExists(path, locale)) continue;
      out.push({ locale, path, url: href(path, locale) });
    }
  }
  return out;
}
