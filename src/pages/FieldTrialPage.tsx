import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Footer } from '@/components/Footer/Footer';
import { CTASection } from '@/components/CTA';
import { DemoVideoSection } from '@/components/DemoVideo';
import { useSeo } from '@/seo/useSeo';
import { SectionHeading, sectionInner, sectionPad } from '@/components/ui';

/**
 * Field trial plan (Japanese only).
 *
 * The plan itself was settled in the founders' Slack thread on 2026-10-15:
 * up to three free meetings, then either a paid field trial or an advisory
 * contract. The advisory contract comes in two plans (weekly or twice weekly).
 * Source of truth: orboh-company-vault 02Strategy/strategy/discussion/2026-10-14-founder-slack-orboh-plan.md
 */

const DAY_RATE_MAN = 10; // 万円 per trial day
const PREP_MAN = 10; // 万円 flat: travel, lodging and shipping the robot

const REPORT_ITEMS = [
  {
    title: '作業ごとの結果',
    body: '試した作業ごとに、どこまでできたか、どこで止まったか、人の手助けが何回要ったか。',
    use: '導入を検討する作業の優先順位が決まる',
  },
  {
    title: '現場の条件',
    body: '通路の幅、床や段差、明るさ、電源、周りの作業者との動線など、ロボットにとっての障害。',
    use: '導入前に現場側で整えることが分かる',
  },
  {
    title: '自律化までの道筋',
    body: 'その作業を自動で動かすには、どんなデータがどれだけ要り、どんな段階を踏むか。',
    use: '追加の投資をするかどうかを判断できる',
  },
  {
    title: '記録映像',
    body: '実証中の作業の映像。ご希望があれば、作業中の動きのデータも記録します。',
    use: '社内での説明や稟議にそのまま使える',
  },
] as const;

const NEXT_STEPS = [
  '別の作業や別の現場で、もう一度実証する',
  '自律で動かすプロジェクトに進む（見積もりは別途ご相談）',
  '顧問として、導入の条件づくりを続ける',
  'いまは導入を見送る',
] as const;

const TASKS = [
  { title: '資材・長尺物の運搬', body: '金属の長尺物を持ち上げて運ぶ', status: '現場で実施' },
  { title: '仕上げの反復作業', body: 'ヘラでのパテ塗り', status: '現場で実施' },
  { title: '廃材の回収・片付け', body: '廃材を集めて分別・搬出する', status: '社内検証で実施' },
  { title: '作業者のそばでの補助', body: '部材の保持、工具の受け渡し・回収', status: '候補' },
] as const;

const FAQ = [
  {
    q: '実証がうまくいかなかった場合はどうなりますか',
    a: '成果ではなく工数で請求します。実施する期間は最初に確定させ、その期間で分かったこと・できなかったこと・次に試すべきことをレポートにまとめてお渡しします。',
  },
  {
    q: '実証のあとに何が手元に残りますか',
    a: '作業ごとの結果、現場の条件、自律化までの道筋、記録映像をまとめたレポートが残ります。追加で実証するか、自律化に進むか、見送るかを決めるための材料になります。',
  },
  {
    q: '無料の打ち合わせは何回までですか',
    a: '最大3回です。4回目からは現場実証か顧問のどちらかになります。初回からおよそ3週間で決めることを目安にしています。',
  },
  {
    q: 'ロボットは自律で動くのですか',
    a: '実証では、人がロボットの全身を遠隔で操作するテレオペで作業し、その現場でロボットが使えるかを確かめます。ご希望があれば作業中の動きのデータも記録できますが、3日ほどの実証では学習（自律化）までは進めません。自律で動かすプロジェクトに進む場合の見積もりは、別途ご相談します。',
  },
  {
    q: '現場実証のあと、次の進め方はいつ決めますか',
    a: '初回の現場実証が終わってから2週間以内に、次のアクションを一緒に確定させます。レポートをもとに、追加の実証・自律化のプロジェクト・顧問のどれで進めるかを決めます。',
  },
] as const;

function Label({ children }: { children: string }) {
  return <p className="type-label text-accent">{children}</p>;
}

function TrialEstimate() {
  const [days, setDays] = useState(3);
  const dayTotal = days * DAY_RATE_MAN;
  const total = dayTotal + PREP_MAN;
  const row = 'flex items-baseline justify-between gap-4 border-t border-hairline py-3.5';

  return (
    <div className="border border-ink bg-surface p-6 sm:p-8 min-w-0">
      <p className="type-label text-muted">ESTIMATE</p>
      <h3 className="type-display text-2xl text-ink mt-4">現場実証の概算</h3>
      <p className="text-sm text-muted mt-2">実証日数 × 10万円 ＋ 準備 10万円</p>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <label htmlFor="trial-days" className="text-sm font-medium text-ink">
          実証日数
        </label>
        <input
          id="trial-days"
          type="range"
          min={1}
          max={10}
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="flex-1 min-w-[160px] accent-[var(--color-accent)]"
        />
        <output htmlFor="trial-days" className="text-sm font-medium text-ink tabular-nums w-12 text-right">
          {days}日
        </output>
      </div>

      <div className="mt-6 tabular-nums">
        <div className={row}>
          <span className="text-sm text-ink">実証日（10万円 × {days}日）</span>
          <span className="text-sm text-ink shrink-0 whitespace-nowrap">{dayTotal}万円</span>
        </div>
        <div className={row}>
          <span className="text-sm text-ink">準備（交通費・宿泊費・ロボットの発送を含む）</span>
          <span className="text-sm text-ink shrink-0 whitespace-nowrap">{PREP_MAN}万円</span>
        </div>
        <div className={row}>
          <span className="text-sm text-ink">準備開発（現場に合わせた開発が要る場合）</span>
          <span className="text-sm text-muted shrink-0 whitespace-nowrap">別途見積</span>
        </div>
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t border-ink pt-4">
          <span className="text-base font-medium text-ink">合計（税別・準備開発なし）</span>
          <span className="type-display text-[2rem] text-accent whitespace-nowrap">{total}万円</span>
        </div>
      </div>
      <p className="text-xs text-muted mt-4">例: 実証3日なら40万円。交通費・宿泊費は準備の10万円に含みます。</p>
    </div>
  );
}

export function FieldTrialPage() {
  useSeo('field-trial', { scrollToTop: true });

  return (
    <Layout>
      <section className={`${sectionPad} pt-36 pb-20 md:pb-24 bg-carbon text-canvas`}>
        <div className={sectionInner}>
          <div className="border-t border-carbon-hairline pt-3.5">
            <p className="type-label text-carbon-muted">FIELD TRIAL</p>
          </div>
          <h1 className="type-display-lg text-[2.4rem] sm:text-[3.4rem] lg:text-[4.2rem] mt-7 mb-6">
            ヒューマノイドを、
            <br />
            あなたの現場で3日動かしてみる
          </h1>
          <p className="text-carbon-muted text-[19px] leading-[1.95] max-w-2xl">
            Orbohは建設現場や農場、産業廃棄物の選別現場で、ヒューマノイドを動かしてきました。あなたの現場でロボットに何ができるかを、全身テレオペによる短い実証で確かめます。
          </p>
          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-canvas">
            <li>無料相談は最大3回</li>
            <li>実証は人日10万円から</li>
            <li>2週間以内に次の一手を決める</li>
          </ul>
        </div>
      </section>

      <DemoVideoSection />

      <section className={`${sectionPad} py-20 md:py-24 bg-canvas`}>
        <div className={sectionInner}>
          <SectionHeading
            label="HOW IT WORKS"
            title="3回まで無料。そのあとは現場実証か顧問"
            lead="最初の3回は無料で、現場と作業をうかがいます。4回目からは、現場で実際に動かす「現場実証」か、実証に入らずに検討を続ける「顧問」のどちらかで進めます。"
          />

          <div className="mt-14 grid gap-px bg-hairline border border-hairline md:grid-cols-[1fr_auto_2fr]">
            <div className="bg-canvas p-6 sm:p-8 flex flex-col gap-3 min-w-0">
              <Label>まず</Label>
              <h3 className="type-display text-2xl text-ink">打ち合わせ</h3>
              <p className="text-sm text-muted leading-[1.85]">
                現場の写真や図面、やりたい作業をうかがい、いまのロボットでできること・できないことをお伝えします。初回からおよそ3週間で、次の進め方を決めます。
              </p>
              <p className="mt-auto pt-4 text-lg font-medium text-ink">無料・最大3回まで</p>
            </div>
            <div className="bg-canvas px-6 py-4 md:py-8 flex items-center justify-center">
              <p className="type-label text-accent text-center leading-[1.6]">
                4回目から
                <br />
                どちらかを選ぶ →
              </p>
            </div>
            <div className="grid gap-px bg-hairline sm:grid-cols-2 min-w-0">
              <div className="bg-surface p-6 sm:p-8 flex flex-col gap-3 min-w-0">
                <Label>A</Label>
                <h3 className="type-display text-2xl text-ink">現場実証</h3>
                <p className="text-sm text-muted leading-[1.85]">
                  ロボットを現場に持ち込み、全身テレオペで実際の作業ができるかを確かめる、現場適合性の検証です。期間は最初に確定させ、工数で請求します。終わったら結果をレポートにまとめてお渡しします。
                </p>
                <p className="mt-auto pt-4 text-lg font-medium text-ink">人日10万円＋準備10万円</p>
              </div>
              <div className="bg-canvas p-6 sm:p-8 flex flex-col gap-3 min-w-0">
                <Label>B</Label>
                <h3 className="type-display text-2xl text-ink">顧問</h3>
                <p className="text-sm text-muted leading-[1.85]">
                  実証には入らず、対象作業の選び方や現場の条件を定例の打ち合わせで詰めていきます。
                </p>
                <p className="mt-auto pt-4 text-lg font-medium text-ink">月15万円（週1回）／月25万円（週2回）</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${sectionPad} pb-20 md:pb-24 bg-canvas`}>
        <div className={sectionInner}>
          <SectionHeading
            label="PRICING"
            title="実証の費用は、日数でそのまま決まる"
            lead="成功の保証ではなく、現場で動いた日数で請求します。移動（交通費・宿泊費を含む）と発送の準備は一律で、現場に合わせた開発が要る場合だけ別に見積もります。"
          />
          <div className="mt-14 grid gap-8 lg:grid-cols-[1.3fr_1fr] items-start">
            <TrialEstimate />
            <div className="border-t border-ink pt-6 min-w-0">
              <h3 className="type-display text-2xl text-ink">顧問</h3>
              <div className="mt-6 tabular-nums">
                <div className="flex items-baseline justify-between gap-4 border-t border-hairline py-4">
                  <span className="text-sm text-ink">週1回の定例</span>
                  <span className="type-display text-[1.6rem] text-ink whitespace-nowrap">15万円／月</span>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-t border-hairline py-4">
                  <span className="text-sm text-ink">週2回の定例</span>
                  <span className="type-display text-[1.6rem] text-ink whitespace-nowrap">25万円／月</span>
                </div>
              </div>
              <p className="text-sm text-muted leading-[1.85] mt-4">
                1回の定例は、打ち合わせ1時間と準備2時間の計3時間で設計しています。現場実証に入らずに検討を続ける場合の契約です。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={`${sectionPad} py-20 md:py-24 bg-surface border-y border-hairline`}>
        <div className={sectionInner}>
          <SectionHeading
            label="REPORT"
            title="次に何をするかを決めるための材料"
            lead="現場実証の価値は、動いた映像よりも「この現場で、次に何をすべきか」が分かることにあります。レポートには次の4つをまとめます。"
          />
          <div className="mt-14 grid gap-px bg-hairline border border-hairline sm:grid-cols-2">
            {REPORT_ITEMS.map((item) => (
              <div key={item.title} className="bg-surface p-6 sm:p-8 flex flex-col gap-3 min-w-0">
                <h3 className="type-display text-xl text-ink">{item.title}</h3>
                <p className="text-sm text-muted leading-[1.85]">{item.body}</p>
                <p className="text-sm font-medium text-accent">→ {item.use}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 border-t border-ink pt-6">
            <p className="text-base font-medium text-ink">
              レポートをもとに、初回の現場実証が終わってから2週間以内に次を決めます
            </p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {NEXT_STEPS.map((step) => (
                <li key={step} className="text-sm text-muted leading-[1.85] flex gap-3">
                  <span className="text-accent">—</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={`${sectionPad} py-20 md:py-24 bg-canvas`}>
        <div className={sectionInner}>
          <SectionHeading
            label="FIRST TASKS"
            title="人の作業空間のまま入れる作業から"
            lead="現場の仕事を工程ごとに分け、いまのヒューマノイドで試しやすいものから選びます。Orbohが実際に動かした作業と、次に試す候補です。"
          />
          <div className="mt-14 grid gap-px bg-hairline border border-hairline sm:grid-cols-2 lg:grid-cols-4">
            {TASKS.map((task) => (
              <div key={task.title} className="bg-canvas p-6 flex flex-col gap-2 min-w-0">
                <h3 className="text-base font-medium text-ink">{task.title}</h3>
                <p className="text-sm text-muted leading-[1.75]">{task.body}</p>
                <p
                  className={`type-label mt-auto pt-4 ${task.status === '候補' ? 'text-muted' : 'text-accent'}`}
                >
                  {task.status}
                </p>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted mt-6">
            どの作業から試すかは、最初の打ち合わせで現場の写真と工程をうかがって決めます。
          </p>
        </div>
      </section>

      <section className={`${sectionPad} pb-20 md:pb-24 bg-canvas`}>
        <div className={sectionInner}>
          <SectionHeading label="FAQ" title="始める前に" />
          <div className="mt-10 border-b border-hairline">
            {FAQ.map((item) => (
              <details key={item.q} className="group border-t border-hairline py-5">
                <summary className="cursor-pointer list-none flex items-baseline justify-between gap-6 text-base font-medium text-ink focus-visible:outline-2 focus-visible:outline-accent">
                  <span>{item.q}</span>
                  <span className="text-accent shrink-0 group-open:rotate-45 transition-transform">＋</span>
                </summary>
                <p className="mt-4 text-sm text-muted leading-[1.85] max-w-3xl">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </Layout>
  );
}
