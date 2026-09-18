import type { Locale } from '@/i18n/translations';
import okraImage from '@/assets/notes/okra-physical-ai.webp';
import internImage from '@/assets/notes/kyutech-intern.webp';
import danceImage from '@/assets/notes/ohara-dance.webp';
import aiStackImage from '@/assets/notes/ai-stack.webp';
import hiringImage from '@/assets/notes/hiring-kyushu.webp';

/** Kota Ueda (CTO) writes from the field on note. */
export const NOTE_PROFILE_URL = 'https://note.com/lovely_camel67';

type Localized = Readonly<Record<Locale, string>>;

export type NoteArticle = {
  /** note's own article key — also the id of its official embed */
  key: string;
  url: string;
  /** The article is Japanese; the English entry is a gloss for /ja-less pages */
  title: Localized;
  excerpt: Localized;
  tag: Localized;
  /** ISO date, rendered as-is */
  date: string;
  image: string;
  imageAlt: Localized;
};

/**
 * Hand-curated: the robotics and company posts, newest first. Kept static so
 * the prerenderer bakes them into the HTML — no client fetch to note.
 */
export const NOTE_ARTICLES: readonly NoteArticle[] = [
  {
    key: 'n5650033a2d57',
    url: 'https://note.com/lovely_camel67/n/n5650033a2d57',
    title: {
      ja: 'ヒューマノイドロボットにオクラ収穫をやらせて分かった「フィジカルAIの凄さと課題」',
      en: 'What making a humanoid harvest okra taught us about physical AI',
    },
    excerpt: {
      ja: '6月から9月まで、トヨタ車体研究所と共同で取り組んだオクラ収穫プロジェクト。屋外の圃場で実機を動かして分かった、フィジカルAIでいまできること・まだできないことを、設計と実装の両面から書いています。',
      en: 'Three months of okra harvesting with Toyota Auto Body Research, ending in an open field. What physical AI could and could not do yet, seen from both the design and the implementation side.',
    },
    tag: { ja: '現場レポート', en: 'Field report' },
    date: '2026-09-17',
    image: okraImage,
    imageAlt: {
      ja: '圃場でオクラを収穫するヒューマノイドロボット',
      en: 'A humanoid robot harvesting okra in a field',
    },
  },
  {
    key: 'n8dd148bcfc4e',
    url: 'https://note.com/lovely_camel67/n/n8dd148bcfc4e',
    title: {
      ja: '九工大の学生と２週間ヒューマノイド開発を一緒にした時の学び',
      en: 'Two weeks of humanoid development with students from Kyushu Institute of Technology',
    },
    excerpt: {
      ja: 'noteをきっかけにプロジェクトへ参加してくれた九州工業大学の学生2名と、2週間ヒューマノイド開発を共にした記録。先行文献のほとんどない「農業×ヒューマノイド」で何を任せ、何が残ったか。',
      en: 'Two students joined the okra project for a fortnight after reading this blog. What we handed them, and what stuck, in a field with almost no prior literature.',
    },
    tag: { ja: 'インターン', en: 'Internship' },
    date: '2026-07-26',
    image: internImage,
    imageAlt: {
      ja: '九工大の学生とヒューマノイド開発に取り組む様子',
      en: 'Students and engineers working on a humanoid robot',
    },
  },
  {
    key: 'ndcf82c19c77d',
    url: 'https://note.com/lovely_camel67/n/ndcf82c19c77d',
    title: {
      ja: '九工大発・SF育ちのロボットスタートアップが、九州で挑戦する仲間を募集します',
      en: 'A robotics startup out of Kyushu, raised in San Francisco — and who we want to build it with',
    },
    excerpt: {
      ja: '九州工業大学の同級生3名でサンフランシスコに渡り、創業してからのこと。何をやっている会社で、どういう人と九州で挑戦したいのかを書いています。',
      en: 'Three classmates from Kyushu Institute of Technology who moved to San Francisco and founded Orboh — what we build, and the people we want building it with us back in Kyushu.',
    },
    tag: { ja: '採用', en: 'Hiring' },
    date: '2026-05-05',
    image: hiringImage,
    imageAlt: {
      ja: 'Orbohの創業メンバー3名',
      en: "Orboh's three founders",
    },
  },
  {
    key: 'n35e5a255fa29',
    url: 'https://note.com/lovely_camel67/n/n35e5a255fa29',
    title: {
      ja: 'ヒューマノイドロボットに踊りを教える方法 — Unitree G1で鹿児島のおはら節を踊らせるまでの全工程',
      en: 'Teaching a humanoid to dance — a Unitree G1 performing Kagoshima’s Ohara-bushi',
    },
    excerpt: {
      ja: 'YouTubeの踊り動画を入力に、Unitree G1 に鹿児島の伝統舞踊「おはら節」を踊らせるまで。動画からモーションを起こし、物理シミュレーションで安定させるまでの全パイプラインを解説しています。',
      en: 'From a YouTube clip to a Unitree G1 dancing a Kagoshima folk dance: the whole pipeline, from extracting the motion to stabilising it in physics simulation.',
    },
    tag: { ja: '技術解説', en: 'Engineering' },
    date: '2026-03-31',
    image: danceImage,
    imageAlt: {
      ja: 'おはら節を踊る Unitree G1',
      en: 'A Unitree G1 humanoid performing a dance',
    },
  },
  {
    key: 'n67d7f097d8da',
    url: 'https://note.com/lovely_camel67/n/n67d7f097d8da',
    title: {
      ja: 'dimOS・VLA・World Model — ヒューマノイドロボットのAIスタック全体像を解説',
      en: 'dimOS, VLA and world models — the humanoid AI stack, one layer at a time',
    },
    excerpt: {
      ja: 'dimOS、VLA（GR00T N1.6）、World Model、WBC。名前だけでは繋がりの見えないヒューマノイドのソフトウェアスタックを、どの層が何を担っているかという視点で整理しました。',
      en: 'dimOS, VLA (GR00T N1.6), world models, WBC. The humanoid software stack laid out layer by layer — what each part actually does, and where it hands off to the next.',
    },
    tag: { ja: '技術解説', en: 'Engineering' },
    date: '2026-03-31',
    image: aiStackImage,
    imageAlt: {
      ja: 'ヒューマノイドロボットのAIスタック図',
      en: 'A diagram of the humanoid AI software stack',
    },
  },
];

export const FEATURED_NOTE = NOTE_ARTICLES[0];
export const OTHER_NOTES = NOTE_ARTICLES.slice(1);
