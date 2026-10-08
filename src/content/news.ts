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
    key: 'kyutech-office-2026',
    date: '2026-10-08',
    tag: { ja: 'お知らせ', en: 'Company' },
    title: {
      ja: '九州工業大学 戸畑キャンパスに開発拠点を開設しました',
      en: 'We have opened a development office on the Kyushu Institute of Technology Tobata campus',
    },
    body: {
      ja: '九州工業大学のインキュベーション施設「未来テラス」（福岡県北九州市戸畑区）に入居し、開発拠点を開設しました。創業メンバー3人の出身校でもある九工大のそばで、ヒューマノイドロボットのハードウェア開発と現場実装を進めます。',
      en: 'Orboh has moved into Mirai Terrace, the incubation facility of Kyushu Institute of Technology in Tobata, Kitakyushu, Fukuoka. All three founders are Kyutech graduates, and the new office is where we will build humanoid robot hardware and prepare it for deployment in the field.',
    },
  },
  {
    key: 'junctionx-kyutech-2026-judge',
    date: '2026-09-27',
    tag: { ja: 'イベント', en: 'Event' },
    title: {
      ja: 'CTO 上田康太が JunctionX Kyutech 2026 の審査員を務めました',
      en: 'Our CTO Kota Ueda served as a judge at JunctionX Kyutech 2026',
    },
    body: {
      ja: 'フィンランド発祥の国際ハッカソン JUNCTION の九州工業大学版として、2026年9月25日から27日まで九工大戸畑キャンパスで開催された JunctionX Kyutech 2026 に、CTO 上田康太が審査員として参加しました。日本・中国・韓国・マレーシア・インドなどから47人が参加して13チームを編成し、「Hack the Physical World」トラックではヒューマノイドロボット Unitree G1 を使って農作業の支援に取り組みました。',
      en: 'JUNCTION is an international hackathon that started in Finland. Its Kyushu Institute of Technology edition ran September 25–27, 2026 on the Tobata campus, and Kota Ueda, CTO of Orboh, sat on the judging panel. 47 participants from Japan, China, Korea, Malaysia, India and elsewhere formed 13 teams, and the "Hack the Physical World" track had them work on agricultural tasks with a Unitree G1 humanoid.',
    },
    url: 'https://www.kyutech.ac.jp/whats-new/topics/entry-12396.html',
  },
];
