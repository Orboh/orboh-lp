import type { Locale } from '@/i18n/translations';
import { href, routeExists, LOCALES } from '@/i18n/routing';

export const SITE_URL = 'https://orboh.com';
export const DEFAULT_OG_IMAGE = '/og-image-teleop.webp';

export type PageMeta = {
  title: string;
  description: string;
  /** Absolute path under the site root, e.g. '/og-image-teleop.webp' */
  ogImage?: string;
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
  'Orboh is the humanoid FDE (Forward Deployed Engineer). Our engineers embed at construction and manufacturing sites, narrow the task, fix the workflow, and implement humanoid robots — as a service, with no CapEx.';

const JA_HOME_DESCRIPTION =
  'Orbohはヒューマノイド版FDE（Forward Deployed Engineer）の会社です。エンジニアが建設・製造の現場に入り込み、タスクを絞り、ワークフローを固定してヒューマノイドを実装します。初期投資なしのサービス提供です。';

/** Route path (locale-free, '' = home) -> meta, per locale. */
export const PAGE_META: Record<Locale, Record<string, PageMeta>> = {
  en: {
    '': {
      title: 'Orboh – Forward Deployed Engineers for Humanoid Robots',
      description: EN_HOME_DESCRIPTION,
    },
    fleetseek: {
      title: 'FleetSeek — The knowledge network for Physical AI | Orboh',
      description:
        'FleetSeek is the knowledge network for Physical AI. Robots and their engineers document what they debug once, so no other team gets stuck on the same problem twice.',
    },
    humanoidhack: {
      title: 'Humanoid Hack — Humanoid robot hackathon series by Orboh',
      description:
        'Humanoid Hack is a hackathon series where engineers build on real humanoid robots over a weekend. Editions, results, photos and how to join.',
    },
    'humanoidhack/hackathon': {
      title: 'Hackathon Guide — Humanoid Hack Tokyo',
      description:
        'Schedule, rules, hardware, judging criteria and sponsors for Humanoid Hack Tokyo. Everything participants need before the event.',
    },
    insights: {
      title: 'Insights — Field notes on humanoid robotics | Orboh',
      description:
        'Reports from the field by the Orboh engineering team: humanoid robot deployments, the supply chain behind them, and what actually works on real sites.',
      // Nothing published in English yet. Drop this once the first EN article ships.
      noindex: true,
    },
  },
  ja: {
    '': {
      title: 'Orboh（オルボー）| ヒューマノイドを現場に実装するFDE',
      description: JA_HOME_DESCRIPTION,
    },
    fleetseek: {
      title: 'FleetSeek — Physical AIのための知識ネットワーク | Orboh',
      description:
        'FleetSeekはPhysical AIのための知識ネットワークです。ロボットとエンジニアがデバッグの記録を共有し、同じ問題で二度詰まらない環境をつくります。',
    },
    humanoidhack: {
      title: 'Humanoid Hack — Orbohが主催するヒューマノイドロボットのハッカソン',
      description:
        'Humanoid Hackは、実機のヒューマノイドロボットを使って週末で開発するハッカソンシリーズです。開催実績・レポート・参加方法を掲載しています。',
    },
    'humanoidhack/hackathon': {
      title: 'ハッカソン概要 — Humanoid Hack Tokyo',
      description:
        'Humanoid Hack Tokyoのスケジュール・ルール・使用機材・審査基準・協賛企業。参加前に確認しておく情報をまとめています。',
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
