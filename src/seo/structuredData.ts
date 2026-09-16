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
    venue: 'tokyo',
    past: true,
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
    venue: 'tokyo',
    past: true,
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
  {
    slug: 'tokyo-vol-03',
    venue: 'tokyo',
    past: false,
    startDate: '2026-10-31T10:00:00+09:00',
    endDate: '2026-11-03T17:00:00+09:00',
    // Registration runs through a private, approval-gated Luma page, so the
    // public pointer is the series calendar rather than that link.
    eventUrl: null,
    ja: {
      name: 'Humanoid Hack Tokyo 3',
      description:
        'GMO ヒューマノイド・ラボのグランドオープンに合わせて開催する第3回。Unitree G1 の実機4台を使い、8チーム40名が10月31日から11月3日までヒューマノイドの実装に取り組みます。参加費は無料です。',
    },
    en: {
      name: 'Humanoid Hack Tokyo 3',
      description:
        'The third Tokyo edition, marking the grand opening of GMO Humanoid Lab. Eight teams and 40 hackers build on four Unitree G1 units from October 31 to November 3. Free to enter.',
    },
  },
  {
    slug: 'singapore-vol-01',
    venue: 'singapore',
    past: false,
    startDate: '2026-10-31T10:00:00+08:00',
    endDate: '2026-11-01T18:30:00+08:00',
    eventUrl: 'https://luma.com/8lqlwh2x',
    ja: {
      name: 'Humanoid Hack Singapore',
      description:
        'Humanoid Hack シリーズ初のシンガポール開催。実機のヒューマノイドを使い、2日間でアプリケーションを開発します。参加費は無料です。',
    },
    en: {
      name: 'Humanoid Hack Singapore',
      description:
        'The first Humanoid Hack edition outside Japan. Teams build applications on real humanoid robots over two days in Singapore. Free to enter.',
    },
  },
  {
    slug: 'logistics-vol-01',
    venue: 'tokyo',
    past: false,
    startDate: '2026-12-05T10:00:00+09:00',
    endDate: '2026-12-06T18:00:00+09:00',
    eventUrl: 'https://luma.com/7mkzd6d4',
    ja: {
      name: 'Humanoid Hack Logistics',
      description:
        '物流の現場課題をテーマにした Humanoid Hack。実機のヒューマノイドを使い、12月5日・6日の2日間で開発します。12月6日午後の発表・デモは観覧できます。参加費は無料です。',
    },
    en: {
      name: 'Humanoid Hack Logistics',
      description:
        'A Humanoid Hack edition themed on real problems from logistics sites. Teams build on real humanoids across December 5-6; the demos on the afternoon of December 6 are open to viewers. Free to enter.',
    },
  },
] as const;

type VenueKey = 'tokyo' | 'singapore';

function venue(key: VenueKey, locale: Locale): Json {
  if (key === 'singapore') {
    return {
      '@type': 'Place',
      name: 'Singapore',
      address: { '@type': 'PostalAddress', addressCountry: 'SG' },
    };
  }
  return {
    '@type': 'Place',
    name: locale === 'ja' ? 'GMO ヒューマノイド・ラボ' : 'GMO Humanoid Lab',
    address: {
      '@type': 'PostalAddress',
      streetAddress:
        locale === 'ja' ? '桜丘町26-1 セルリアンタワー' : '26-1 Sakuragaokacho, Cerulean Tower',
      addressLocality: locale === 'ja' ? '渋谷区' : 'Shibuya',
      addressRegion: locale === 'ja' ? '東京都' : 'Tokyo',
      postalCode: '150-0031',
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
    const event: Json = {
      '@type': 'Event',
      '@id': `${pageUrl}#${edition.slug}`,
      name: copy.name,
      description: copy.description,
      startDate: edition.startDate,
      endDate: edition.endDate,
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      location: venue(edition.venue, locale),
      image: [OG_IMAGE],
      inLanguage: locale,
      isAccessibleForFree: true,
      url: pageUrl,
      organizer: { '@id': ORG_ID },
      superEvent: { '@id': SERIES_ID },
    };
    // An edition with no public registration page carries no Offer at all —
    // better to say nothing than to advertise a link people cannot use.
    if (edition.eventUrl) {
      event.offers = {
        '@type': 'Offer',
        price: '0',
        priceCurrency: edition.venue === 'singapore' ? 'SGD' : 'JPY',
        availability: edition.past
          ? 'https://schema.org/SoldOut'
          : 'https://schema.org/InStock',
        url: edition.eventUrl,
      };
    }
    return event;
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
    location: venue('tokyo', locale),
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
    agri: 'Agriculture',
    insights: 'Insights',
    'insights/shenzhen-robotics': 'Robotics in Shenzhen',
  },
  ja: {
    '': 'ホーム',
    fleetseek: 'FleetSeek',
    humanoidhack: 'ヒューマノイドハッカソン',
    'humanoidhack/hackathon': 'ハッカソン概要',
    hiring: '採用情報',
    agri: '農業ヒューマノイド',
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

/**
 * The agriculture page as a Service. A query like "農業 ヒューマノイド" is asking
 * who does this and for whom — prose answers that for a reader, not a crawler.
 */
function agriService(locale: Locale): Json {
  const url = `${SITE_URL}${href('agri', locale)}`;
  const ja = locale === 'ja';
  return {
    '@type': 'Service',
    '@id': `${url}#service`,
    name: ja
      ? '農業ヒューマノイドによる収穫の自動化'
      : 'Humanoid robots for agricultural harvesting',
    alternateName: ja ? '農業ロボット・自律収穫の実装' : 'Agricultural robotics deployment',
    serviceType: ja ? '農業ロボットの実装' : 'Agricultural robotics',
    description: getMeta('agri', locale).description,
    url,
    image: [`${SITE_URL}/og-image-agri.jpg`],
    inLanguage: locale,
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'Country', name: ja ? '日本' : 'Japan' },
    audience: {
      '@type': 'BusinessAudience',
      name: ja ? '農家・農業法人' : 'Farms and agricultural businesses',
    },
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

  if (clean === 'agri') {
    graph.push(agriService(locale));
  }

  const articleNode = article(clean, locale);
  if (articleNode) graph.push(articleNode);

  return { '@context': 'https://schema.org', '@graph': graph };
}
