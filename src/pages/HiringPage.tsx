import { Layout } from '@/components/Layout';
import { Footer } from '@/components/Footer/Footer';
import { useLocale } from '@/contexts/LocaleContext';
import { useSeo } from '@/seo/useSeo';
import { ArrowOut, DiscordMark, btnSolid, sectionInner, sectionPad } from '@/components/ui';

const DISCORD_URL = 'https://discord.gg/fDAWmeTV6f';

type Localized = { en: string; ja: string };

/**
 * HERP's job board top. It lists every open role with the full posting and the
 * application form, so roles are added, closed and edited there only.
 */
const HERP_CAREERS_URL = 'https://herp.careers/v1/orboh';

/** Plain-language summary of each posting's 募集背景 on HERP. */
const HIRING_REASONS: { key: string; role: Localized; body: Localized }[] = [
  {
    key: 'hardware',
    role: { ja: 'ハードウェア開発エンジニア', en: 'Hardware Engineer' },
    body: {
      ja: 'これまでは市販の汎用ヒューマノイドで現場に実装してきました。しかし産業廃棄物の現場では、持てる重さやカメラの位置など、汎用機の限界が見えてきました。現場に合ったロボットを自分たちで設計して作るために募集します。',
      en: 'So far we have deployed off-the-shelf humanoids. On industrial waste sites we have hit their limits — how much they can lift, where the cameras sit. We are hiring to design and build a robot of our own that fits the site.',
    },
  },
  {
    key: 'deployment',
    role: { ja: '現場実装エンジニア', en: 'Field Deployment Engineer' },
    body: {
      ja: '現場は一つとして同じではなく、行くたびに想定外のことが起こります。そうした現場へのロボットの導入を、創業メンバーと一緒に担う人を募集します。',
      en: 'No two sites are alike, and something unexpected happens on every visit. We are hiring someone to take robots into those sites alongside the founders.',
    },
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
          <div className="text-carbon-muted text-[19px] leading-[1.95] max-w-2xl space-y-6">
            <p>
              {ja
                ? '産業廃棄物の現場で動く歩行ロボットを、一緒に作るエンジニアを募集しています。'
                : 'We are hiring engineers to build legged robots that work on industrial waste sites.'}
            </p>
            <p>
              {ja
                ? '世の中の Physical AI ロボットの多くは、まだラボのデモに留まっています。私たちはクライアントの現場に朝から晩まで入り、動かない理由が AI モデルにあるのかハードウェアにあるのかを突き止めながら、現場で役に立つロボットを作ってきました。'
                : 'Most physical AI robots are still lab demos. We have spent whole days on client sites, working out whether a failure comes from the AI model or the hardware, and building robots that are actually useful there.'}
            </p>
            <div>
              <p className="text-canvas">{ja ? 'なぜ募集するのか' : 'Why we are hiring'}</p>
              <ul className="mt-3 space-y-4 border-l border-carbon-hairline pl-5">
                {HIRING_REASONS.map((reason) => (
                  <li key={reason.key}>
                    <span className="text-canvas">{reason.role[locale]}</span>
                    <span className="block">{reason.body[locale]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className={`${sectionPad} py-20 md:py-24 bg-canvas`}>
        <div className={sectionInner}>
          <div className="border-t border-ink pt-6">
            <h2 className="type-display text-[1.95rem] sm:text-[2.4rem] lg:text-[2.9rem] text-ink mb-4">
              {ja ? '募集要項と応募' : 'Roles and applications'}
            </h2>
            <p className="text-[19px] text-muted leading-[1.95] mb-8 max-w-2xl">
              {ja
                ? '募集中の職種の一覧と詳細、応募フォームは採用ページにまとめています。'
                : 'All open roles, their full details and the application form are on our careers page.'}
            </p>
            <a
              href={HERP_CAREERS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={btnSolid}
            >
              {ja ? '募集中の職種を見る' : 'See open roles'}
              <ArrowOut />
            </a>
          </div>
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
