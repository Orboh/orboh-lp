import type { Locale } from '@/i18n/translations';
import { href, routeExists, LOCALES } from '@/i18n/routing';

// The apex 308-redirects to www, so www is the canonical host. Pointing
// canonical/hreflang/sitemap at the apex would send every signal through a
// redirect.
export const SITE_URL = 'https://www.orboh.com';
export const DEFAULT_OG_IMAGE = '/og-image-teleop.webp';

export type PageMeta = {
  title: string;
  description: string;
  /** Absolute path under the site root, e.g. '/og-image-teleop.webp' */
  ogImage?: string;
  /** 'summary' shows the image as a small square thumbnail, e.g. a logo; defaults to 'summary_large_image' */
  twitterCard?: 'summary' | 'summary_large_image';
  /** Keep the page reachable but out of the index — used for pages with no content yet */
  noindex?: boolean;
  /** Emitted as an Article JSON-LD block instead of the site-wide Organization one */
  article?: {
    headline: string;
    datePublished: string;
    dateModified: string;
    author: string;
  };
};

const EN_HOME_DESCRIPTION =
  'Orboh builds robots that take on heavy, hard work. Our focus is sorting industrial waste; we have also put robots to work in construction and agriculture. Our engineers go on-site and implement robots for the job, as a service.';

const JA_HOME_DESCRIPTION =
  'Orbohは、労働負荷の高い現場の仕事をロボットで助ける会社です。いま最も力を入れているのは産業廃棄物の選別。建設・農業の現場でも、エンジニアが現場に入り込んでロボットを実装しています。';

/** Route path (locale-free, '' = home) -> meta, per locale. */
export const PAGE_META: Record<Locale, Record<string, PageMeta>> = {
  en: {
    '': {
      title: 'Orboh – Robots for Heavy Work, Starting with Industrial Waste',
      description: EN_HOME_DESCRIPTION,
    },
    fleetseek: {
      title: 'FleetSeek — The knowledge network for Physical AI | Orboh',
      description:
        'FleetSeek is the knowledge network for Physical AI. Robots and their engineers document what they debug once, so no other team gets stuck on the same problem twice.',
    },
    humanoidhack: {
      title: 'Humanoid Hackathon — Humanoid Hack by Orboh',
      description:
        'Humanoid Hack is a humanoid hackathon series: teams build on real Unitree G1 humanoids over a weekend. Free to enter. Past editions in Tokyo, winning projects, FAQ and how to join.',
    },
    'humanoidhack/hackathon': {
      title: 'Hackathon Guide — Humanoid Hack Tokyo | Humanoid hackathon',
      description:
        'Schedule, rules, hardware, judging criteria and sponsors for Humanoid Hack Tokyo. Everything participants need before the event.',
    },
    hiring: {
      title: 'All open roles at Orboh, Inc.',
      description: 'All open roles at Orboh, Inc.',
      ogImage: '/og-image-hiring.png',
      twitterCard: 'summary',
    },
    company: {
      title: 'Company — Orboh, Inc.',
      description:
        'Company profile of Orboh, Inc.: founded May 2026, headquartered in Kitakyushu, Fukuoka, with a Kitakyushu office at Mirai Terrace, the Kyushu Institute of Technology incubation facility.',
    },
    insights: {
      title: 'Insights — Field notes on humanoid robotics | Orboh',
      description:
        'Reports from the field by the Orboh engineering team: humanoid robot deployments, the supply chain behind them, and what actually works on real sites.',
    },
    'insights/okra-harvest': {
      title: 'Making a Humanoid Harvest Okra Outdoors — A 70-Day PoC | Orboh',
      description:
        'A field report from our humanoid okra harvesting PoC with Toyota Auto Body Research. Which of the eight harvest steps a learned policy actually drives, how episode length caps the training data you can inspect, and what outdoor operation costs the machine.',
      ogImage: '/og-image-agri.jpg',
      article: {
        headline: 'Making a humanoid harvest okra outdoors',
        datePublished: '2026-09-17',
        dateModified: '2026-09-17',
        author: 'Orboh',
      },
    },
  },
  ja: {
    '': {
      title: 'Orboh（オーボー）| 重労働の現場をロボットで — 産業廃棄物の選別から',
      description: JA_HOME_DESCRIPTION,
    },
    fleetseek: {
      title: 'FleetSeek — Physical AIのための知識ネットワーク | Orboh',
      description:
        'FleetSeekはPhysical AIのための知識ネットワークです。ロボットとエンジニアがデバッグの記録を共有し、同じ問題で二度詰まらない環境をつくります。',
    },
    humanoidhack: {
      title: 'ヒューマノイドハッカソン Humanoid Hack | Orboh主催・参加費無料',
      description:
        'ヒューマノイドハッカソン「Humanoid Hack」はUnitree G1の実機で開発するハッカソンシリーズです。Orboh主催・参加費無料。東京・渋谷での開催実績、受賞テーマ、次回の開催予定と参加方法。',
    },
    'humanoidhack/hackathon': {
      title: 'ハッカソン概要 — ヒューマノイドハッカソン Humanoid Hack Tokyo',
      description:
        'Humanoid Hack Tokyoのスケジュール・ルール・使用機材・審査基準・協賛企業。参加前に確認しておく情報をまとめています。',
    },
    hiring: {
      title: '株式会社Orboh の全ての求人一覧',
      description: '株式会社Orboh の全ての求人一覧です。',
      ogImage: '/og-image-hiring.png',
      twitterCard: 'summary',
    },
    company: {
      title: '会社概要 | 株式会社Orboh（オーボー）',
      description:
        '株式会社Orbohの会社概要。2026年5月設立、本店は福岡県北九州市戸畑区。北九州オフィスは九州工業大学のインキュベーション施設「未来テラス」にあります。',
    },
    insights: {
      title: 'Insights — ヒューマノイド実装の現場レポート | Orboh',
      description:
        'Orbohのエンジニアによる現場レポート。ヒューマノイドロボットの実装、その裏側にあるサプライチェーン、実際に現場で機能したことを記録しています。',
    },
    'insights/shenzhen-robotics': {
      title: '深圳のロボット産業はいまどうなっているか — 企業・展示会・部品調達の現在地',
      description:
        '深圳のロボット産業を構造で捉えるレポート。ヒューマノイドメーカーの分布、China Hi-Tech Fairで見えた産業レイヤ、ロボット6S店という流通形態、華強北での部品調達まで、現地で確認した内容をまとめました。',
      article: {
        headline: '深圳のロボット産業はいまどうなっているか',
        datePublished: '2026-08-09',
        dateModified: '2026-08-09',
        author: 'Orboh',
      },
    },
    'insights/okra-harvest': {
      title: 'ヒューマノイドに屋外でオクラを収穫させる — 70日のPoCで分かったこと | Orboh',
      description:
        'トヨタ車体研究所と共同で取り組んだ、ヒューマノイドによるオクラ収穫PoCの現場レポート。8工程のうちAIに任せたのはどこか、学習データの品質をどう管理したか、屋外という条件が実装に何を持ち込むかを、70日間の開発から整理しました。',
      ogImage: '/og-image-agri.jpg',
      article: {
        headline: 'ヒューマノイドに屋外でオクラを収穫させる',
        datePublished: '2026-09-17',
        dateModified: '2026-09-17',
        author: 'Orboh',
      },
    },
    'field-trial': {
      title: '現場実証プラン — ヒューマノイドをあなたの現場で3日動かす | Orboh',
      description:
        'Orbohの現場実証プラン。無料の打ち合わせは最大3回、その後は全身テレオペによる現場実証（人日10万円＋準備10万円）か顧問契約。実証後のレポートで次の一手を2週間以内に決めます。',
      // Out of the index until the advisory fee is settled (two options still on the table).
      noindex: true,
    },
  },
};

export function getMeta(path: string, locale: Locale): PageMeta {
  const clean = path.replace(/^\/+/, '').replace(/\/+$/, '');
  return PAGE_META[locale][clean] ?? PAGE_META[locale][''];
}

export type Alternate = { hrefLang: string; url: string };

/**
 * hreflang set for a page. Locale-only routes (the Shenzhen report) and pages
 * excluded from the index get no alternates — pointing hreflang at a noindex
 * page contradicts itself.
 */
export function getAlternates(path: string): Alternate[] {
  const available = LOCALES.filter(
    (locale) => routeExists(path, locale) && !getMeta(path, locale).noindex
  );
  if (available.length < 2) return [];
  const alternates: Alternate[] = available.map((locale) => ({
    hrefLang: locale,
    url: `${SITE_URL}${href(path, locale)}`,
  }));
  alternates.push({ hrefLang: 'x-default', url: `${SITE_URL}${href(path, 'en')}` });
  return alternates;
}
