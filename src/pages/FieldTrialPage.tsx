import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Footer } from '@/components/Footer/Footer';
import { CTASection } from '@/components/CTA';
import { DemoVideoSection } from '@/components/DemoVideo';
import { useLocale } from '@/contexts/LocaleContext';
import type { Locale } from '@/i18n/translations';
import { useSeo } from '@/seo/useSeo';
import { SectionHeading, sectionInner, sectionPad } from '@/components/ui';

/**
 * Field trial plan (noindex for now).
 *
 * The plan itself was settled in the founders' Slack thread on 2026-10-15:
 * up to three free meetings, then either a paid field trial or an advisory
 * contract. The advisory fee is still undecided between two options, which is
 * why the page stays out of the index until that is settled. Prices stay in
 * yen in both locales.
 * Source of truth: orboh-company-vault 02Strategy/strategy/discussion/2026-10-14-founder-slack-orboh-plan.md
 */

const DAY_RATE_YEN = 100_000; // per trial day
const PREP_YEN = 100_000; // flat: travel, lodging and shipping the robot

/** 400000 -> '40万円' / '¥400,000' */
function yen(amount: number, locale: Locale): string {
  return locale === 'ja' ? `${amount / 10_000}万円` : `¥${amount.toLocaleString('en-US')}`;
}

type Item = { title: string; body: string };

type Copy = {
  hero: { title: [string, string]; lead: string; points: string[] };
  how: {
    title: string;
    lead: string;
    first: { label: string; title: string; body: string; price: string };
    choose: [string, string];
    trial: { title: string; body: string; price: string };
    advisory: { title: string; body: string; price: string };
  };
  pricing: {
    title: string;
    lead: string;
    advisoryTitle: string;
    advisoryRows: [string, string][];
    advisoryNote: string;
  };
  estimate: {
    title: string;
    formula: string;
    days: string;
    dayUnit: (n: number) => string;
    dayRow: (n: number) => string;
    prepRow: string;
    devRow: string;
    devValue: string;
    total: string;
    example: string;
  };
  report: {
    title: string;
    lead: string;
    items: (Item & { use: string })[];
    nextTitle: string;
    next: string[];
  };
  tasks: {
    title: string;
    lead: string;
    items: (Item & { status: string; candidate: boolean })[];
    note: string;
  };
  faqTitle: string;
  faq: { q: string; a: string }[];
};

const COPY: Record<Locale, Copy> = {
  ja: {
    hero: {
      title: ['ヒューマノイドを、', 'あなたの現場で3日動かしてみる'],
      lead: 'Orbohは建設現場や農場、産業廃棄物の選別現場で、ヒューマノイドを動かしてきました。あなたの現場でロボットに何ができるかを、全身テレオペによる短い実証で確かめます。',
      points: ['無料相談は最大3回', '実証は人日10万円から', '2週間以内に次の一手を決める'],
    },
    how: {
      title: '3回まで無料。そのあとは現場実証か顧問',
      lead: '最初の3回は無料で、現場と作業をうかがいます。4回目からは、現場で実際に動かす「現場実証」か、実証に入らずに検討を続ける「顧問」のどちらかで進めます。',
      first: {
        label: 'まず',
        title: '打ち合わせ',
        body: '現場の写真や図面、やりたい作業をうかがい、いまのロボットでできること・できないことをお伝えします。初回からおよそ3週間で、次の進め方を決めます。',
        price: '無料・最大3回まで',
      },
      choose: ['4回目から', 'どちらかを選ぶ →'],
      trial: {
        title: '現場実証',
        body: 'ロボットを現場に持ち込み、全身テレオペで実際の作業ができるかを確かめる、現場適合性の検証です。期間は最初に確定させ、工数で請求します。終わったら結果をレポートにまとめてお渡しします。',
        price: '人日10万円＋準備10万円',
      },
      advisory: {
        title: '顧問',
        body: '実証には入らず、対象作業の選び方や現場の条件を定例の打ち合わせで詰めていきます。',
        price: '月15万円〜（週1回の定例）',
      },
    },
    pricing: {
      title: '実証の費用は、日数でそのまま決まる',
      lead: '成功の保証ではなく、現場で動いた日数で請求します。移動（交通費・宿泊費を含む）と発送の準備は一律で、現場に合わせた開発が要る場合だけ別に見積もります。',
      advisoryTitle: '顧問',
      advisoryRows: [
        ['週1回の定例', '15万円／月'],
        ['週2回の定例', '25万円／月'],
      ],
      advisoryNote:
        '1回の定例は、打ち合わせ1時間と準備2時間の計3時間で設計しています。現場実証に入らずに検討を続ける場合の契約です。',
    },
    estimate: {
      title: '現場実証の概算',
      formula: '実証日数 × 10万円 ＋ 準備 10万円',
      days: '実証日数',
      dayUnit: (n) => `${n}日`,
      dayRow: (n) => `実証日（10万円 × ${n}日）`,
      prepRow: '準備（交通費・宿泊費・ロボットの発送を含む）',
      devRow: '準備開発（現場に合わせた開発が要る場合）',
      devValue: '別途見積',
      total: '合計（税別・準備開発なし）',
      example: '例: 実証3日なら40万円。交通費・宿泊費は準備の10万円に含みます。',
    },
    report: {
      title: '次に何をするかを決めるための材料',
      lead: '現場実証の価値は、動いた映像よりも「この現場で、次に何をすべきか」が分かることにあります。レポートには次の4つをまとめます。',
      items: [
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
      ],
      nextTitle: 'レポートをもとに、初回の現場実証が終わってから2週間以内に次を決めます',
      next: [
        '別の作業や別の現場で、もう一度実証する',
        '自律で動かすプロジェクトに進む（見積もりは別途ご相談）',
        '顧問として、導入の条件づくりを続ける',
        'いまは導入を見送る',
      ],
    },
    tasks: {
      title: '人の作業空間のまま入れる作業から',
      lead: '現場の仕事を工程ごとに分け、いまのヒューマノイドで試しやすいものから選びます。Orbohが実際に動かした作業と、次に試す候補です。',
      items: [
        { title: '資材・長尺物の運搬', body: '金属の長尺物を持ち上げて運ぶ', status: '現場で実施', candidate: false },
        { title: '仕上げの反復作業', body: 'ヘラでのパテ塗り', status: '現場で実施', candidate: false },
        { title: '廃材の回収・片付け', body: '廃材を集めて分別・搬出する', status: '社内検証で実施', candidate: false },
        { title: '作業者のそばでの補助', body: '部材の保持、工具の受け渡し・回収', status: '候補', candidate: true },
      ],
      note: 'どの作業から試すかは、最初の打ち合わせで現場の写真と工程をうかがって決めます。',
    },
    faqTitle: '始める前に',
    faq: [
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
    ],
  },
  en: {
    hero: {
      title: ['Put a humanoid to work', 'on your site for three days'],
      lead: 'Orboh has run humanoid robots on construction sites, on farms and at industrial waste sorting sites. A short trial with full-body teleoperation shows what a robot can do on yours.',
      points: ['Up to 3 free meetings', 'Trials from ¥100,000 a day', 'Next step decided within 2 weeks'],
    },
    how: {
      title: 'Three meetings free. Then a field trial or an advisory contract',
      lead: 'The first three meetings are free: we learn about your site and the work. From the fourth, we continue either with a field trial, where the robot works on your site, or with an advisory contract, where we keep working on the plan without a trial.',
      first: {
        label: 'FIRST',
        title: 'Meetings',
        body: 'You show us photos and drawings of the site and the work you have in mind; we tell you what today’s robots can and cannot do. We aim to decide the next step within about three weeks of the first meeting.',
        price: 'Free, up to 3 meetings',
      },
      choose: ['From the 4th', 'choose one →'],
      trial: {
        title: 'Field trial',
        body: 'We bring the robot to your site and check, by full-body teleoperation, whether it can do the actual work. It is a test of fit for your site. The period is fixed up front and billed by the day, and you receive the results as a report.',
        price: '¥100,000 a day + ¥100,000 preparation',
      },
      advisory: {
        title: 'Advisory',
        body: 'Without a trial, we work through which tasks to start with and what the site needs, in regular meetings.',
        price: 'From ¥150,000 a month (weekly meeting)',
      },
    },
    pricing: {
      title: 'The trial price follows the number of days',
      lead: 'We bill for the days the robot works on site, not for a guaranteed result. Travel (including transport and lodging) and shipping are a flat fee; only development needed to fit your site is quoted separately.',
      advisoryTitle: 'Advisory',
      advisoryRows: [
        ['Weekly meeting', '¥150,000 / month'],
        ['Twice-weekly meetings', '¥250,000 / month'],
      ],
      advisoryNote:
        'Each meeting is planned as three hours: one hour together and two hours of preparation. This contract is for continuing without a field trial.',
    },
    estimate: {
      title: 'Field trial estimate',
      formula: 'Trial days × ¥100,000 + ¥100,000 preparation',
      days: 'Trial days',
      dayUnit: (n) => `${n} ${n === 1 ? 'day' : 'days'}`,
      dayRow: (n) => `Trial days (¥100,000 × ${n})`,
      prepRow: 'Preparation (transport, lodging and shipping the robot)',
      devRow: 'Site-specific development, if needed',
      devValue: 'Quoted separately',
      total: 'Total (excl. tax, no development)',
      example: 'Example: a three-day trial is ¥400,000. Transport and lodging are included in the ¥100,000 preparation fee.',
    },
    report: {
      title: 'What you need to decide the next step',
      lead: 'The value of a field trial is less the footage of the robot working than knowing what to do next on your site. The report covers four things.',
      items: [
        {
          title: 'Results by task',
          body: 'For each task we tried: how far the robot got, where it stopped, and how many times a person had to step in.',
          use: 'Tells you which tasks to prioritise',
        },
        {
          title: 'Site conditions',
          body: 'What gets in the robot’s way: aisle widths, floors and steps, lighting, power, and the paths of the people working nearby.',
          use: 'Tells you what to prepare on site first',
        },
        {
          title: 'Path to autonomy',
          body: 'What data, and how much of it, it would take for the robot to do the task on its own, and in what stages.',
          use: 'Lets you decide whether to invest further',
        },
        {
          title: 'Video record',
          body: 'Footage of the work during the trial. If you wish, we also record the robot’s motion data.',
          use: 'Ready to use for internal briefings and approvals',
        },
      ],
      nextTitle: 'Based on the report, we decide the next step within two weeks of the first trial',
      next: [
        'Run another trial, on a different task or site',
        'Start a project to make the task autonomous (quoted separately)',
        'Continue under an advisory contract to prepare for deployment',
        'Hold off on deployment for now',
      ],
    },
    tasks: {
      title: 'Start with work that fits the space as it is',
      lead: 'We break the site’s work into steps and start with those a humanoid can try today. These are tasks Orboh has run, and the next candidates.',
      items: [
        { title: 'Carrying long materials', body: 'Lifting and carrying long metal stock', status: 'Done on site', candidate: false },
        { title: 'Repetitive finishing', body: 'Applying putty with a spatula', status: 'Done on site', candidate: false },
        { title: 'Collecting and clearing scrap', body: 'Gathering, sorting and removing scrap', status: 'Done in-house', candidate: false },
        { title: 'Assisting workers', body: 'Holding parts, handing over and collecting tools', status: 'Candidate', candidate: true },
      ],
      note: 'Which task to try first is decided in the first meeting, from photos of your site and its workflow.',
    },
    faqTitle: 'Before you start',
    faq: [
      {
        q: 'What if the trial does not work out?',
        a: 'We bill for time, not results. The period is fixed up front, and you receive a report on what we learned, what did not work, and what to try next.',
      },
      {
        q: 'What do we have after the trial?',
        a: 'A report covering results by task, site conditions, the path to autonomy, and video. It is what you need to decide whether to run another trial, move toward autonomy, or hold off.',
      },
      {
        q: 'How many free meetings are there?',
        a: 'Up to three. From the fourth, we continue with either a field trial or an advisory contract. We aim to decide within about three weeks of the first meeting.',
      },
      {
        q: 'Does the robot work autonomously?',
        a: 'In the trial, a person operates the robot’s whole body remotely (teleoperation) to see whether it can be used on your site. We can record motion data if you wish, but a trial of about three days does not go as far as training the robot to work on its own. A project toward autonomy is quoted separately.',
      },
      {
        q: 'When do we decide what comes after the trial?',
        a: 'Within two weeks of the first trial, together with you. Based on the report, we choose between another trial, an autonomy project, or an advisory contract.',
      },
    ],
  },
};

function Label({ children }: { children: string }) {
  return <p className="type-label text-accent">{children}</p>;
}

function TrialEstimate({ locale, t }: { locale: Locale; t: Copy['estimate'] }) {
  const [days, setDays] = useState(3);
  const dayTotal = days * DAY_RATE_YEN;
  const total = dayTotal + PREP_YEN;
  const row = 'flex items-baseline justify-between gap-4 border-t border-hairline py-3.5';

  return (
    <div className="border border-ink bg-surface p-6 sm:p-8 min-w-0">
      <p className="type-label text-muted">ESTIMATE</p>
      <h3 className="type-display text-2xl text-ink mt-4">{t.title}</h3>
      <p className="text-sm text-muted mt-2">{t.formula}</p>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <label htmlFor="trial-days" className="text-sm font-medium text-ink">
          {t.days}
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
        <output htmlFor="trial-days" className="text-sm font-medium text-ink tabular-nums w-16 text-right">
          {t.dayUnit(days)}
        </output>
      </div>

      <div className="mt-6 tabular-nums">
        <div className={row}>
          <span className="text-sm text-ink">{t.dayRow(days)}</span>
          <span className="text-sm text-ink shrink-0 whitespace-nowrap">{yen(dayTotal, locale)}</span>
        </div>
        <div className={row}>
          <span className="text-sm text-ink">{t.prepRow}</span>
          <span className="text-sm text-ink shrink-0 whitespace-nowrap">{yen(PREP_YEN, locale)}</span>
        </div>
        <div className={row}>
          <span className="text-sm text-ink">{t.devRow}</span>
          <span className="text-sm text-muted shrink-0 whitespace-nowrap">{t.devValue}</span>
        </div>
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t border-ink pt-4">
          <span className="text-base font-medium text-ink">{t.total}</span>
          <span className="type-display text-[2rem] text-accent whitespace-nowrap">{yen(total, locale)}</span>
        </div>
      </div>
      <p className="text-xs text-muted mt-4">{t.example}</p>
    </div>
  );
}

export function FieldTrialPage() {
  useSeo('field-trial', { scrollToTop: true });
  const { locale } = useLocale();
  const t = COPY[locale];

  return (
    <Layout>
      <section className={`${sectionPad} pt-36 pb-20 md:pb-24 bg-carbon text-canvas`}>
        <div className={sectionInner}>
          <div className="border-t border-carbon-hairline pt-3.5">
            <p className="type-label text-carbon-muted">FIELD TRIAL</p>
          </div>
          <h1 className="type-display-lg text-[2.4rem] sm:text-[3.4rem] lg:text-[4.2rem] mt-7 mb-6">
            {t.hero.title[0]}
            <br />
            {t.hero.title[1]}
          </h1>
          <p className="text-carbon-muted text-[19px] leading-[1.95] max-w-2xl">{t.hero.lead}</p>
          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-canvas">
            {t.hero.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </section>

      <DemoVideoSection />

      <section className={`${sectionPad} py-20 md:py-24 bg-canvas`}>
        <div className={sectionInner}>
          <SectionHeading label="HOW IT WORKS" title={t.how.title} lead={t.how.lead} />

          <div className="mt-14 grid gap-px bg-hairline border border-hairline md:grid-cols-[1fr_auto_2fr]">
            <div className="bg-canvas p-6 sm:p-8 flex flex-col gap-3 min-w-0">
              <Label>{t.how.first.label}</Label>
              <h3 className="type-display text-2xl text-ink">{t.how.first.title}</h3>
              <p className="text-sm text-muted leading-[1.85]">{t.how.first.body}</p>
              <p className="mt-auto pt-4 text-lg font-medium text-ink">{t.how.first.price}</p>
            </div>
            <div className="bg-canvas px-6 py-4 md:py-8 flex items-center justify-center">
              <p className="type-label text-accent text-center leading-[1.6]">
                {t.how.choose[0]}
                <br />
                {t.how.choose[1]}
              </p>
            </div>
            <div className="grid gap-px bg-hairline sm:grid-cols-2 min-w-0">
              <div className="bg-surface p-6 sm:p-8 flex flex-col gap-3 min-w-0">
                <Label>A</Label>
                <h3 className="type-display text-2xl text-ink">{t.how.trial.title}</h3>
                <p className="text-sm text-muted leading-[1.85]">{t.how.trial.body}</p>
                <p className="mt-auto pt-4 text-lg font-medium text-ink">{t.how.trial.price}</p>
              </div>
              <div className="bg-canvas p-6 sm:p-8 flex flex-col gap-3 min-w-0">
                <Label>B</Label>
                <h3 className="type-display text-2xl text-ink">{t.how.advisory.title}</h3>
                <p className="text-sm text-muted leading-[1.85]">{t.how.advisory.body}</p>
                <p className="mt-auto pt-4 text-lg font-medium text-ink">{t.how.advisory.price}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${sectionPad} pb-20 md:pb-24 bg-canvas`}>
        <div className={sectionInner}>
          <SectionHeading label="PRICING" title={t.pricing.title} lead={t.pricing.lead} />
          <div className="mt-14 grid gap-8 lg:grid-cols-[1.3fr_1fr] items-start">
            <TrialEstimate locale={locale} t={t.estimate} />
            <div className="border-t border-ink pt-6 min-w-0">
              <h3 className="type-display text-2xl text-ink">{t.pricing.advisoryTitle}</h3>
              <div className="mt-6 tabular-nums">
                {t.pricing.advisoryRows.map(([label, price]) => (
                  <div key={label} className="flex items-baseline justify-between gap-4 border-t border-hairline py-4">
                    <span className="text-sm text-ink">{label}</span>
                    <span className="type-display text-[1.6rem] text-ink whitespace-nowrap">{price}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted leading-[1.85] mt-4">{t.pricing.advisoryNote}</p>
            </div>
          </div>
        </div>
      </section>

      <section className={`${sectionPad} py-20 md:py-24 bg-surface border-y border-hairline`}>
        <div className={sectionInner}>
          <SectionHeading label="REPORT" title={t.report.title} lead={t.report.lead} />
          <div className="mt-14 grid gap-px bg-hairline border border-hairline sm:grid-cols-2">
            {t.report.items.map((item) => (
              <div key={item.title} className="bg-surface p-6 sm:p-8 flex flex-col gap-3 min-w-0">
                <h3 className="type-display text-xl text-ink">{item.title}</h3>
                <p className="text-sm text-muted leading-[1.85]">{item.body}</p>
                <p className="text-sm font-medium text-accent">→ {item.use}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 border-t border-ink pt-6">
            <p className="text-base font-medium text-ink">{t.report.nextTitle}</p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {t.report.next.map((step) => (
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
          <SectionHeading label="FIRST TASKS" title={t.tasks.title} lead={t.tasks.lead} />
          <div className="mt-14 grid gap-px bg-hairline border border-hairline sm:grid-cols-2 lg:grid-cols-4">
            {t.tasks.items.map((task) => (
              <div key={task.title} className="bg-canvas p-6 flex flex-col gap-2 min-w-0">
                <h3 className="text-base font-medium text-ink">{task.title}</h3>
                <p className="text-sm text-muted leading-[1.75]">{task.body}</p>
                <p className={`type-label mt-auto pt-4 ${task.candidate ? 'text-muted' : 'text-accent'}`}>
                  {task.status}
                </p>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted mt-6">{t.tasks.note}</p>
        </div>
      </section>

      <section className={`${sectionPad} pb-20 md:pb-24 bg-canvas`}>
        <div className={sectionInner}>
          <SectionHeading label="FAQ" title={t.faqTitle} />
          <div className="mt-10 border-b border-hairline">
            {t.faq.map((item) => (
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
