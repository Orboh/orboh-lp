/**
 * schema.org output for every prerendered page, emitted as one @graph block.
 *
 * The hackathon pages are the reason this exists: an event query like
 * "ヒューマノイド ハッカソン" is answered by pages that declare what the event
 * is, who runs it and when it ran. Prose alone does not carry that.
 */
import type { Locale } from '@/i18n/translations';
import { translations } from '@/i18n/translations';
import { href } from '@/i18n/routing';
import { getMeta, SITE_URL, DEFAULT_OG_IMAGE } from './meta';

const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;
const SERIES_ID = `${SITE_URL}/#humanoid-hack`;
const LOGO = `${SITE_URL}/favicon.svg`;
const OG_IMAGE = `${SITE_URL}${DEFAULT_OG_IMAGE}`;

/** Same set the footer links to. */
const SOCIAL = [
  'https://x.com/kotaueda999',
  'https://www.linkedin.com/company/orboh',
  'https://github.com/Orboh',
  'https://www.youtube.com/@Orboh2026',
];

type Json = Record<string, unknown>;

/**
 * Machine-readable facts per edition. Deliberately separate from the localized
 * copy in translations.ts: dates and venues are not translations, and an
 * edition must never appear here before it is confirmed.
 */
const EDITIONS = [
  {
    slug: 'tokyo-vol-01',
    startDate: '2026-05-30',
    endDate: '2026-05-31',
    eventUrl: 'https://luma.com/rqy67zpa',
    ja: {
      name: 'Humanoid Hack Tokyo（第1回）',
      description:
        '東京で初めてのヒューマノイド特化ハッカソン。Unitree G1 の実機2台を使い、4チーム16名以上が1.5日で開発しました。事前登録は100名超。',
    },
    en: {
      name: 'Humanoid Hack Tokyo (Vol.01)',
      description:
        'The first humanoid-focused hackathon in Tokyo. Four teams and 16+ hackers built on two Unitree G1 units over 1.5 days, with 100+ pre-registrations.',
    },
  },
  {
    slug: 'tokyo-vol-02',
    startDate: '2026-07-11',
    endDate: '2026-07-12',
    eventUrl: 'https://luma.com/m8k94z4o',
    ja: {
      name: 'Humanoid Hack Tokyo 2（第2回）',
      description:
        '第2回は Unitree G1 の実機3台に拡大。19チームの応募から選考された6チーム24名が参加し、災害レスキュー支援「Rescue G1」が最優秀賞を受賞しました。',
    },
    en: {
      name: 'Humanoid Hack Tokyo 2 (Vol.02)',
      description:
        'The second edition scaled to three Unitree G1 units. Six teams and 24 hackers were selected from 19 applications; "Rescue G1", a disaster-response project, took first place.',
    },
  },
] as const;

function venue(locale: Locale): Json {
  return {
    '@type': 'Place',
    name: locale === 'ja' ? 'GMO ヒューマノイド・ラボ' : 'GMO Humanoid Lab',
    address: {
      '@type': 'PostalAddress',
      addressLocality: locale === 'ja' ? '渋谷区' : 'Shibuya',
      addressRegion: locale === 'ja' ? '東京都' : 'Tokyo',
      addressCountry: 'JP',
    },
  };
}

function organization(locale: Locale): Json {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: 'Orboh',
    alternateName: locale === 'ja' ? 'オーボー' : 'Orboh, Inc.',
    url: SITE_URL,
    logo: LOGO,
    image: OG_IMAGE,
    description: getMeta('', locale).description,
    sameAs: SOCIAL,
  };
}

function website(locale: Locale): Json {
  return {
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: SITE_URL,
    name: 'Orboh',
    inLanguage: locale,
    publisher: { '@id': ORG_ID },
  };
}

function events(locale: Locale): Json[] {
  const pageUrl = `${SITE_URL}${href('humanoidhack', locale)}`;
  return EDITIONS.map((edition) => {
    const copy = edition[locale];
    return {
      '@type': 'Event',
      '@id': `${pageUrl}#${edition.slug}`,
      name: copy.name,
      description: copy.description,
      startDate: edition.startDate,
      endDate: edition.endDate,
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      location: venue(locale),
      image: [OG_IMAGE],
      inLanguage: locale,
      isAccessibleForFree: true,
      url: pageUrl,
      organizer: { '@id': ORG_ID },
      superEvent: { '@id': SERIES_ID },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'JPY',
        // Both editions have been held; registration is closed.
        availability: 'https://schema.org/SoldOut',
        url: edition.eventUrl,
      },
    };
  });
}

function eventSeries(locale: Locale): Json {
  const meta = getMeta('humanoidhack', locale);
  return {
    '@type': 'EventSeries',
    '@id': SERIES_ID,
    name:
      locale === 'ja' ? 'Humanoid Hack（ヒューマノイドハッカソン）' : 'Humanoid Hack',
    alternateName:
      locale === 'ja' ? 'ヒューマノイドハッカソン' : 'Humanoid Hackathon Series',
    description: meta.description,
    url: `${SITE_URL}${href('humanoidhack', locale)}`,
    image: [OG_IMAGE],
    inLanguage: locale,
    isAccessibleForFree: true,
    location: venue(locale),
    organizer: { '@id': ORG_ID },
    subEvent: events(locale).map((event) => ({ '@id': event['@id'] })),
  };
}

function faqPage(locale: Locale): Json {
  const t = translations[locale].humanoidHack;
  return {
    '@type': 'FAQPage',
    '@id': `${SITE_URL}${href('humanoidhack', locale)}#faq`,
    inLanguage: locale,
    mainEntity: t.faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

/** Short names for the breadcrumb trail — page titles are too long for it. */
const CRUMBS: Record<Locale, Record<string, string>> = {
  en: {
    '': 'Home',
    fleetseek: 'FleetSeek',
    humanoidhack: 'Humanoid Hack',
    'humanoidhack/hackathon': 'Hackathon guide',
    hiring: 'Hiring',
    insights: 'Insights',
    'insights/shenzhen-robotics': 'Robotics in Shenzhen',
  },
  ja: {
    '': 'ホーム',
    fleetseek: 'FleetSeek',
    humanoidhack: 'ヒューマノイドハッカソン',
    'humanoidhack/hackathon': 'ハッカソン概要',
    hiring: '採用情報',
    insights: 'Insights',
    'insights/shenzhen-robotics': '深圳のロボット産業',
  },
};

function breadcrumbs(path: string, locale: Locale): Json | null {
  if (!path) return null;
  const segments = path.split('/');
  const trail = ['', ...segments.map((_, i) => segments.slice(0, i + 1).join('/'))];
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumbPath, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: CRUMBS[locale][crumbPath] ?? getMeta(crumbPath, locale).title,
      item: `${SITE_URL}${href(crumbPath, locale)}`,
    })),
  };
}

function article(path: string, locale: Locale): Json | null {
  const meta = getMeta(path, locale);
  if (!meta.article) return null;
  return {
    '@type': 'Article',
    headline: meta.article.headline,
    description: meta.description,
    datePublished: meta.article.datePublished,
    dateModified: meta.article.dateModified,
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    image: [OG_IMAGE],
    mainEntityOfPage: `${SITE_URL}${href(path, locale)}`,
    inLanguage: locale,
  };
}

/** The @graph for one route, or null when the page should carry no markup. */
export function getStructuredData(path: string, locale: Locale): Json | null {
  const clean = path.replace(/^\/+/, '').replace(/\/+$/, '');
  const meta = getMeta(clean, locale);
  if (meta.noindex) return null;

  const graph: Json[] = [organization(locale), website(locale)];

  const crumbs = breadcrumbs(clean, locale);
  if (crumbs) graph.push(crumbs);

  if (clean === 'humanoidhack') {
    graph.push(eventSeries(locale), ...events(locale), faqPage(locale));
  }

  const articleNode = article(clean, locale);
  if (articleNode) graph.push(articleNode);

  return { '@context': 'https://schema.org', '@graph': graph };
}
