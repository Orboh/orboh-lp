import { useEffect } from 'react';
import { useLocale } from '@/contexts/LocaleContext';
import { href } from '@/i18n/routing';
import { getMeta, SITE_URL, DEFAULT_OG_IMAGE } from './meta';

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(url: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    document.head.appendChild(el);
  }
  el.href = url;
}

/**
 * Keeps the document head in sync on client-side navigations. Crawlers read the
 * tags baked in by scripts/prerender.mjs; this is what keeps the tab title and
 * share metadata correct once the SPA takes over.
 */
export function useSeo(path: string, options: { scrollToTop?: boolean } = {}) {
  const { locale } = useLocale();
  const { scrollToTop = false } = options;

  useEffect(() => {
    const meta = getMeta(path, locale);
    const url = `${SITE_URL}${href(path, locale)}`;
    const image = `${SITE_URL}${meta.ogImage ?? DEFAULT_OG_IMAGE}`;

    document.title = meta.title;
    setMeta('name', 'description', meta.description);
    setMeta('name', 'robots', meta.noindex ? 'noindex, follow' : 'index, follow');
    setCanonical(url);
    setMeta('property', 'og:title', meta.title);
    setMeta('property', 'og:description', meta.description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', image);
    setMeta('name', 'twitter:title', meta.title);
    setMeta('name', 'twitter:description', meta.description);
    setMeta('name', 'twitter:url', url);
    setMeta('name', 'twitter:image', image);

    if (scrollToTop) window.scrollTo(0, 0);
  }, [path, locale, scrollToTop]);
}
