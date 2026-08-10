/**
 * Turns the SPA build into static HTML — one file per route, with the app
 * markup and the per-route meta tags baked in. Crawlers get real content and
 * real Japanese pages instead of an empty English shell.
 *
 * Runs after `vite build` (client) and `vite build --ssr` (server bundle).
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const distDir = join(root, 'dist');
const ssrEntry = join(root, 'dist-ssr', 'entry-server.js');

const { render, prerenderTargets, SITE_URL, DEFAULT_OG_IMAGE } = await import(
  pathToFileURL(ssrEntry).href
);

const SEO_BLOCK = /<!-- SEO:start[\s\S]*?<!-- SEO:end -->/;
const ROOT_DIV = '<div id="root"></div>';

function attr(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function jsonLd(target) {
  const { meta, url } = target;
  const data = meta.article
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: meta.article.headline,
        description: meta.description,
        datePublished: meta.article.datePublished,
        dateModified: meta.article.dateModified,
        author: { '@type': 'Organization', name: meta.article.author },
        publisher: { '@type': 'Organization', name: 'Orboh' },
        mainEntityOfPage: `${SITE_URL}${url}`,
        inLanguage: target.locale,
      }
    : target.path === ''
      ? {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Orboh',
          url: SITE_URL,
          description: meta.description,
          logo: `${SITE_URL}/favicon.svg`,
        }
      : null;

  if (!data) return '';
  // '<' cannot appear raw inside a script element
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return `    <script type="application/ld+json">${json}</script>`;
}

function buildHead(target) {
  const { meta, url, alternates } = target;
  const canonical = `${SITE_URL}${url}`;
  const image = `${SITE_URL}${meta.ogImage ?? DEFAULT_OG_IMAGE}`;
  const type = meta.article ? 'article' : 'website';

  const hreflang = alternates.map(
    (a) => `    <link rel="alternate" hreflang="${attr(a.hrefLang)}" href="${attr(a.url)}" />`
  );

  return [
    '<!-- SEO:start -->',
    `    <title>${attr(meta.title)}</title>`,
    `    <meta name="description" content="${attr(meta.description)}" />`,
    `    <link rel="canonical" href="${attr(canonical)}" />`,
    meta.noindex ? '    <meta name="robots" content="noindex, follow" />' : null,
    ...hreflang,
    `    <meta property="og:type" content="${type}" />`,
    `    <meta property="og:url" content="${attr(canonical)}" />`,
    `    <meta property="og:title" content="${attr(meta.title)}" />`,
    `    <meta property="og:description" content="${attr(meta.description)}" />`,
    `    <meta property="og:image" content="${attr(image)}" />`,
    `    <meta property="og:locale" content="${target.locale === 'ja' ? 'ja_JP' : 'en_US'}" />`,
    `    <meta name="twitter:card" content="summary_large_image" />`,
    `    <meta name="twitter:url" content="${attr(canonical)}" />`,
    `    <meta name="twitter:title" content="${attr(meta.title)}" />`,
    `    <meta name="twitter:description" content="${attr(meta.description)}" />`,
    `    <meta name="twitter:image" content="${attr(image)}" />`,
    jsonLd(target),
    '    <!-- SEO:end -->',
  ]
    .filter(Boolean)
    .join('\n');
}

/**
 * Both layouts for the same URL: `ja/index.html` (directory index) and
 * `ja.html` (picked up by Vercel's cleanUrls). Static hosts differ on which
 * one they resolve for an extensionless path, so we write both rather than
 * depend on one behaviour.
 */
function outputPaths(url) {
  const clean = url.replace(/^\/+/, '');
  if (!clean) return [join(distDir, 'index.html')];
  return [join(distDir, clean, 'index.html'), join(distDir, `${clean}.html`)];
}

const template = await readFile(join(distDir, 'index.html'), 'utf8');
if (!SEO_BLOCK.test(template)) {
  throw new Error('index.html is missing the <!-- SEO:start --> … <!-- SEO:end --> block');
}
if (!template.includes(ROOT_DIV)) {
  throw new Error(`index.html is missing ${ROOT_DIV}`);
}

const targets = prerenderTargets();

for (const target of targets) {
  const appHtml = render(target.url);
  const html = template
    .replace('<html lang="en">', `<html lang="${target.locale}">`)
    .replace(SEO_BLOCK, () => buildHead(target))
    .replace(ROOT_DIV, () => `<div id="root">${appHtml}</div>`);

  for (const file of outputPaths(target.url)) {
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, html, 'utf8');
  }
  console.log(`prerendered ${target.url}`);
}

// Branded 404. Vercel serves dist/404.html for paths that match no file, which
// keeps the real 404 status instead of the soft 404 an SPA shell would give.
const notFoundHtml = template
  .replace(
    SEO_BLOCK,
    () =>
      [
        '<!-- SEO:start -->',
        '    <title>Page not found — Orboh</title>',
        '    <meta name="robots" content="noindex, follow" />',
        '    <!-- SEO:end -->',
      ].join('\n')
  )
  .replace(ROOT_DIV, () => `<div id="root">${render('/404')}</div>`);
await writeFile(join(distDir, '404.html'), notFoundHtml, 'utf8');
console.log('prerendered 404.html');

const lastmod = new Date().toISOString().slice(0, 10);
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ...targets
    .filter((target) => !target.meta.noindex)
    .map((target) => {
      const alt = target.alternates
        .filter((a) => a.hrefLang !== 'x-default')
        .map(
          (a) =>
            `\n    <xhtml:link rel="alternate" hreflang="${attr(a.hrefLang)}" href="${attr(a.url)}" />`
        )
        .join('');
      return `  <url>\n    <loc>${attr(`${SITE_URL}${target.url}`)}</loc>\n    <lastmod>${lastmod}</lastmod>${alt}\n  </url>`;
    }),
  '</urlset>',
  '',
].join('\n');
await writeFile(join(distDir, 'sitemap.xml'), sitemap, 'utf8');

const robots = ['User-agent: *', 'Allow: /', '', `Sitemap: ${SITE_URL}/sitemap.xml`, ''].join('\n');
await writeFile(join(distDir, 'robots.txt'), robots, 'utf8');

console.log(`prerendered ${targets.length} routes, wrote sitemap.xml and robots.txt`);
