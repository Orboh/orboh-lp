import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { AppRoutes } from './App';
import { allRoutes } from './i18n/routing';
import { getAlternates, getMeta, SITE_URL, DEFAULT_OG_IMAGE } from './seo/meta';

/** Render one URL to a static HTML string. Called once per route at build time. */
export function render(url: string): string {
  return renderToString(
    <StaticRouter location={url}>
      <AppRoutes />
    </StaticRouter>
  );
}

/**
 * Everything scripts/prerender.mjs needs to write the files. Exported from the
 * SSR bundle so the build has a single source of truth for routes and meta.
 */
export function prerenderTargets() {
  return allRoutes().map(({ locale, path, url }) => ({
    locale,
    path,
    url,
    meta: getMeta(path, locale),
    alternates: getAlternates(path),
  }));
}

export { SITE_URL, DEFAULT_OG_IMAGE };
