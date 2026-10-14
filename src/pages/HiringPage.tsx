import { Layout } from '@/components/Layout';
import { Footer } from '@/components/Footer/Footer';
import { useLocale } from '@/contexts/LocaleContext';
import { useSeo } from '@/seo/useSeo';
import { ArrowOut, DiscordMark, btnSolid, sectionInner, sectionPad } from '@/components/ui';

const DISCORD_URL = 'https://discord.gg/fDAWmeTV6f';

type Localized = { en: string; ja: string };

/**
 * Open roles. Each one links out to its HERP posting, which is the source of
 * truth for the full description, conditions and the application form — keep
 * only the title, a one-line summary and the basics here.
 */
const ROLES: { key: string; url: string; title: Localized; summary: Localized; location: Localized }[] = [
  {
    key: 'hardware',
    url: 'https://herp.careers/v1/orboh/cksAp8_r14Oa',
    title: {
      ja: '産業廃棄物用の歩行ロボットのハードウェア開発エンジニア（システム統合）',
      en: 'Hardware Engineer, System Integration — Legged Robots for Industrial Waste',
    },
    summary: {
      ja: '現場の要求からロボット全体の上流設計を行い、自社の歩行ロボットを作り上げる。機体の設計・製作から、通信・電源・制御周期を含むハードウェアとソフトウェアの統合と試験までを担当。',
      en: 'Design our own legged robot from site requirements upward: build the airframe, then integrate and test hardware and software end to end — communication, power and control loops included.',
    },
    location: { ja: '北九州オフィス', en: 'Kitakyushu office' },
  },
  {
    key: 'deployment',
    url: 'https://herp.careers/v1/orboh/4tTjLkHHL5tM',
    title: {
      ja: '産業廃棄物用の歩行ロボットの現場実装エンジニア',
      en: 'Field Deployment Engineer — Legged Robots for Industrial Waste',
    },
    summary: {
      ja: 'クライアントの現場に入り込み、要求の調整からデータ収集・フィジカル AI モデルの学習・実機へのデプロイまでを一気通貫で担当し、ロボットを実際に動かす。',
      en: 'Work on client sites and own the whole loop — requirements, data collection, physical AI model training and deployment on the robot — until it actually runs.',
    },
    location: { ja: '東京オフィス / 北九州オフィス / 在宅', en: 'Tokyo office / Kitakyushu office / Remote' },
  },
];

export function HiringPage() {
  const { locale } = useLocale();
  const ja = locale === 'ja';

  useSeo('hiring', { scrollToTop: true });

  return (
    <Layout>
      <section className={`${sectionPad} pt-36 pb-20 md:pb-24 bg-carbon text-canvas`}>
        <div className={sectionInner}>
          <div className="border-t border-carbon-hairline pt-3.5"><p className="type-label text-carbon-muted">HIRING</p></div>
          <h1 className="type-display-lg text-[2.4rem] sm:text-[3.4rem] lg:text-[4.2rem] mt-7 mb-6">
            {ja ? '募集中の職種' : 'Open roles'}
          </h1>
          <p className="text-carbon-muted text-[19px] leading-[1.95] max-w-2xl">
            {ja
              ? '産業廃棄物の現場で動く歩行ロボットを、一緒に作るエンジニアを募集しています。募集要項の詳細と応募は、各職種のページからどうぞ。'
              : 'We are hiring engineers to build legged robots that work on industrial waste sites. Full details and the application form are on each role’s page.'}
          </p>
        </div>
      </section>

      <section className={`${sectionPad} py-20 md:py-24 bg-canvas`}>
        <div className={sectionInner}>
          <ul className="border-t border-ink">
            {ROLES.map((role) => (
              <li key={role.key} className="border-b border-hairline">
                <a href={role.url} target="_blank" rel="noopener noreferrer" className="group block">
                  <div className="grid gap-3 py-8 md:grid-cols-[200px_1fr] md:gap-10">
                    <div className="flex flex-wrap items-center gap-3 type-label md:flex-col md:items-start md:gap-2">
                      <span className="text-accent">{ja ? '正社員' : 'Full-time'}</span>
                      <span className="text-muted">{role.location[locale]}</span>
                    </div>
                    <div>
                      <h2 className="type-display text-[21px] sm:text-[24px] text-ink transition-colors group-hover:text-accent">
                        {role.title[locale]}
                      </h2>
                      <p className="mt-3 text-[17px] leading-[1.85] text-muted max-w-3xl">
                        {role.summary[locale]}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-2 text-accent text-sm font-medium">
                        {ja ? '募集要項を見て応募する' : 'View role and apply'}
                        <ArrowOut />
                      </span>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`${sectionPad} pb-20 md:pb-24 bg-canvas`}>
        <div className={sectionInner}>
          <div className="border-t border-ink pt-6">
            <h2 className="type-display text-[1.95rem] sm:text-[2.4rem] lg:text-[2.9rem] text-ink mb-4">
              {ja ? '最新情報は Discord で' : 'Updates go out on Discord'}
            </h2>
            <p className="text-[19px] text-muted leading-[1.95] mb-8 max-w-2xl">
              {ja
                ? '新しい募集はまず Discord コミュニティでお知らせします。'
                : 'New openings are announced first in our Discord community.'}
            </p>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={btnSolid}
            >
              <DiscordMark className="size-5 shrink-0" />
              {ja ? 'Discord に参加' : 'Join Discord'}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </Layout>
  );
}
