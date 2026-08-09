import type { Locale } from '@/i18n/translations';

export type ArticleSummary = {
  /** Locale-free route path, matching an entry in ROUTE_PATHS */
  path: string;
  locale: Locale;
  title: string;
  excerpt: string;
  /** ISO date, rendered as-is */
  date: string;
  tag: string;
};

/**
 * The /insights index and the sitemap both read this list. Adding an article
 * means: a page component, a route in ROUTE_PATHS, meta in PAGE_META, and an
 * entry here.
 */
export const ARTICLES: readonly ArticleSummary[] = [
  {
    path: 'insights/shenzhen-robotics',
    locale: 'ja',
    title: '深圳のロボット産業はいまどうなっているか',
    excerpt:
      '企業の分布、China Hi-Tech Fairで見えた産業の厚み、ロボット6S店という流通形態、華強北での部品調達まで。現地で確認した内容を、体験記ではなく産業構造として整理しました。',
    date: '2026-08-09',
    tag: '産業レポート',
  },
];

export function articlesFor(locale: Locale): readonly ArticleSummary[] {
  return ARTICLES.filter((a) => a.locale === locale);
}
