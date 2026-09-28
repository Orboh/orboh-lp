import type { Locale } from '@/i18n/translations';

type Localized = Readonly<Record<Locale, string>>;

export type NewsItem = {
  /** Stable key for React; also handy when linking to a single item later. */
  key: string;
  /** ISO date, rendered as-is */
  date: string;
  tag: Localized;
  title: Localized;
  body: Localized;
  /** Outbound link for the item, when there is one. */
  url?: string;
};

/** Hand-curated, newest first. Static so the prerenderer bakes it into the HTML. */
export const NEWS_ITEMS: readonly NewsItem[] = [
  {
    key: 'junctionx-kyutech-2026-judge',
    date: '2026-09-27',
    tag: { ja: 'イベント', en: 'Event' },
    title: {
      ja: 'CTO 上田康太が JunctionX Kyutech 2026 の審査員を務めました',
      en: 'Our CTO Kota Ueda served as a judge at JunctionX Kyutech 2026',
    },
    body: {
      ja: '国際的なハッカソンブランド JunctionX の九州工業大学版として、2026年9月25日から27日まで九工大戸畑キャンパスで開催された JunctionX Kyutech 2026 に、CTO 上田康太が審査員として参加しました。',
      en: 'JunctionX is an international hackathon brand. Its Kyushu Institute of Technology edition ran September 25–27, 2026 on the Tobata campus, and Kota Ueda, CTO of Orboh, sat on the judging panel.',
    },
    url: 'https://kyutech.hackjunction.com/',
  },
];
