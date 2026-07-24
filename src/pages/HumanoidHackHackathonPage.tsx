import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Footer } from '@/components/Footer/Footer';
import { useLocale } from '@/contexts/LocaleContext';

import poster from '@/assets/hht/hht2-poster.webp';
import floor from '@/assets/hht/floor.webp';

const DISCORD_URL = 'https://discord.gg/fDAWmeTV6f';
const ALLOCATION_SHEET_URL =
  'https://docs.google.com/spreadsheets/d/15eOr7hGGeSXiX6Ns398gNgDCAW8Eedp5dcjYL-Ow1lo/edit';

type Row = { time: string; cols: string[] };

const scheduleDay1: Row[] = [
  { time: '10:00', cols: ['受付開始（1F）', 'Check-in opens (1F)'] },
  { time: '11:00', cols: ['キックオフ（Orboh 挨拶・共同主催 RobotMateHub 紹介）', 'Kickoff (Orboh welcome · co-host RobotMateHub)'] },
  { time: '11:05', cols: ['施設ルール説明', 'Facility rules'] },
  { time: '11:10', cols: ['ハッカソンルール・審査基準・賞の紹介', 'Hackathon rules, judging & prizes'] },
  { time: '11:25', cols: ['Unitree G1 使い方レクチャー（約30分）', 'Unitree G1 hands-on lecture (~30 min)'] },
  { time: '11:55', cols: ['発表順くじ引き', 'Presentation-order draw'] },
  { time: '12:00', cols: ['開発スタート／昼食（弁当）配布', 'Hacking begins / lunch (bento) served'] },
  { time: '18:30', cols: ['夕食（ピザ）配布', 'Dinner (pizza) served'] },
  { time: '22:00', cols: ['ラボ解散（Day1 終了）', 'Lab closes (end of Day 1)'] },
];

const scheduleDay2: Row[] = [
  { time: '08:00', cols: ['会場オープン・受付開始', 'Venue & check-in open'] },
  { time: '12:00', cols: ['昼食（弁当）配布', 'Lunch (bento) served'] },
  { time: '14:00', cols: ['開発終了（コードフリーズ）', 'Development ends (code freeze)'] },
  { time: '14:00–14:30', cols: ['発表エリアへ転換／観覧者受付（1F）', 'Switch to demo area / audience check-in (1F)'] },
  { time: '14:30', cols: ['審査員ブリーフィング', 'Judge briefing'] },
  { time: '15:00–16:00', cols: ['デモ・発表（6チーム × 各7分）', 'Demos & presentations (6 teams × 7 min)'] },
  { time: '16:00–16:20', cols: ['審査タイム', 'Judging'] },
  { time: '16:40', cols: ['スポンサー・パートナー紹介', 'Sponsor & partner showcase'] },
  { time: '17:00', cols: ['結果発表・授賞式', 'Results & award ceremony'] },
  { time: '17:30', cols: ['ネットワーキング（軽食・ドリンク）', 'Networking (food & drinks)'] },
  { time: '18:30', cols: ['観覧者 退場開始', 'Audience departure begins'] },
];

const teams = [
  'MotionLink',
  'Spark',
  'G1 Mimamori Copilot',
  'ロボット go go go',
  'Rescue G1',
  'Snow Guard',
];

const allocation = [
  { unit: 'G1-1', teams: 'MotionLink / Spark' },
  { unit: 'G1-2', teams: 'G1 Mimamori Copilot / ロボット go go go' },
  { unit: 'G1-3', teams: 'Rescue G1 / Snow Guard' },
];

const partnerTiers = [
  { label: { ja: '主催', en: 'Organizer' }, names: ['Orboh', 'RobotMateHub'] },
  { label: { ja: '運営協力', en: 'Operational Support Partner' }, names: ['GMO AI & Robotics Corporation', 'Unitree Robotics'] },
  { label: { ja: 'メディアパートナー', en: 'Media Partner' }, names: ['thehype'] },
];

export function HumanoidHackHackathonPage() {
  const { locale } = useLocale();
  const ja = locale === 'ja';

  useEffect(() => {
    const prev = document.title;
    document.title = ja
      ? 'ハッカソン概要 — Humanoid Hack Tokyo'
      : 'Hackathon Guide — Humanoid Hack Tokyo';
    window.scrollTo(0, 0);
    return () => {
      document.title = prev;
    };
  }, [ja]);

  const T = (j: string, e: string) => (ja ? j : e);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-zinc-950 pt-28 pb-16 md:pt-36 md:pb-20 px-8 md:px-16 lg:px-24">
        <div className="absolute inset-0">
          <img src={floor} alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/85 to-zinc-950/70" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <p className="text-orange-400 text-xs tracking-widest uppercase mb-5">
              {T('参加者向け — ハッカソン概要', 'For participants — Hackathon guide')}
            </p>
            <h1 className="font-mono text-4xl sm:text-5xl font-normal text-zinc-50 mb-6" style={{ letterSpacing: '-0.02em' }}>
              Humanoid Hack Tokyo Vol.2
            </h1>
            <p className="text-zinc-300 text-base md:text-lg max-w-xl mb-8">
              {T(
                '2026年7月11日（土）–12日（日）、渋谷。当日の進め方・ルール・G1 の割り当てをここにまとめます。参加チームは必ず目を通してください。',
                'July 11–12, 2026, Shibuya. Everything you need for the two days — schedule, rules, and your G1 assignment. Required reading for all teams.'
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold tracking-widest uppercase text-white rounded transition-all hover:scale-105"
                style={{ backgroundColor: '#5865F2' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 shrink-0" aria-hidden>
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.042.033.055a19.83 19.83 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.07 13.07 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
                {T('Discord に参加', 'Join Discord')}
              </a>
            </div>
          </div>
          <div className="relative">
            <img
              src={poster}
              alt="Humanoid Hack Tokyo Vol.2 — Jul 11–12, 2026, Shibuya"
              className="w-full max-w-md mx-auto rounded-xl shadow-2xl ring-1 ring-white/10"
            />
          </div>
        </div>
      </section>

      {/* At a glance */}
      <section className="px-8 md:px-16 lg:px-24 py-16 bg-zinc-50">
        <div className="max-w-7xl mx-auto w-full">
          <dl className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
            {[
              { l: T('日程', 'Dates'), v: T('7月11日（土）– 12日（日）', 'Jul 11 (Sat) – 12 (Sun)') },
              { l: T('会場', 'Venue'), v: T('GMO ヒューマノイドラボ（セルリアンタワー 11F）', 'GMO Humanoid Lab (Cerulean Tower 11F)') },
              { l: T('受付', 'Check-in'), v: T('セルリアンタワー 1F（Luma QR 照合）', 'Cerulean Tower 1F (Luma QR)') },
              { l: T('ロボット', 'Robots'), v: 'Unitree G1 EDU (29DOF) × 3' },
            ].map((f) => (
              <div key={f.l} className="border-t border-zinc-300 pt-4">
                <dt className="text-[10px] tracking-widest uppercase text-zinc-400 mb-2">{f.l}</dt>
                <dd className="text-sm font-medium text-zinc-900">{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Schedule */}
      <Section dark title={T('スケジュール', 'Schedule')} label={T('2日間', 'Two days')}>
        <p className="text-sm text-zinc-400 mb-8">
          {T('発表は各チーム7分（発表5分＋質疑2分）。日英どちらでも可、スライドは任意です。', 'Presentations are 7 min per team (5 min talk + 2 min Q&A). Japanese or English; slides optional.')}
        </p>
        <div className="grid lg:grid-cols-2 gap-8">
          <ScheduleTable heading={T('Day 1 — 7/11（土）', 'Day 1 — Jul 11 (Sat)')} rows={scheduleDay1} ja={ja} />
          <ScheduleTable heading={T('Day 2 — 7/12（日）', 'Day 2 — Jul 12 (Sun)')} rows={scheduleDay2} ja={ja} />
        </div>
      </Section>

      {/* Teams */}
      <Section title={T('参加チーム', 'Teams')} label={T('6チーム', '6 teams')}>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {teams.map((t, i) => (
            <div key={t} className="flex items-center gap-3 border border-zinc-200 rounded-lg px-4 py-3">
              <span className="font-mono text-xs text-orange-600">{String(i + 1).padStart(2, '0')}</span>
              <span className="text-sm font-medium text-zinc-900">{t}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* G1 allocation */}
      <Section dark title={T('G1 割り当て', 'G1 assignment')} label={T('運営が割り当て', 'Assigned by organizers')}>
        <p className="text-sm text-zinc-400 mb-6 max-w-2xl">
          {T(
            'G1 EDU は全3台。2チームで1台を共有します。時間帯ごとの割り当ては運営が決定し、下記の割り当て表で管理します。実機を使わない開発（シミュレーション・コーディング）はいつでも進められます。',
            'Three G1 EDU units, each shared by two teams. Time-slot assignments are set by the organizers and tracked in the sheet below. Non-robot work (simulation, coding) can proceed at any time.'
          )}
        </p>
        <div className="overflow-x-auto rounded-lg border border-zinc-700">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-zinc-800 text-zinc-300">
                <th className="text-left font-medium px-4 py-3 tracking-wider uppercase text-[11px]">{T('機体', 'Unit')}</th>
                <th className="text-left font-medium px-4 py-3 tracking-wider uppercase text-[11px]">{T('共有チーム', 'Shared by')}</th>
              </tr>
            </thead>
            <tbody>
              {allocation.map((a) => (
                <tr key={a.unit} className="border-t border-zinc-800">
                  <td className="px-4 py-3 font-mono text-orange-400">{a.unit}</td>
                  <td className="px-4 py-3 text-zinc-200">{a.teams}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <a
          href={ALLOCATION_SHEET_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 text-xs font-medium tracking-widest uppercase rounded bg-zinc-50 text-zinc-950 hover:bg-zinc-200 transition-colors"
        >
          {T('時間帯別の割り当て表を開く', 'Open the time-slot assignment sheet')}
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </Section>

      {/* G1 handling rules */}
      <Section title={T('Unitree G1 取り扱いルール', 'Unitree G1 handling rules')}>
        <ul className="space-y-3 max-w-3xl">
          {[
            T('稼働範囲は 1台あたり半径 1.5m 以内。アプリケーションはこの制約内で動作する前提で設計してください。', 'Keep each robot within a 1.5m radius. Applications must be designed to run within this constraint.'),
            T('ダンスなど大きく激しい全身モーションの開発は禁止です。', 'No large or violent whole-body motions (e.g. dancing).'),
            T('刃物など鋭利物・危険物をロボットに把持させないでください。', 'Never let the robot hold sharp or dangerous objects.'),
            T('エンドエフェクタは変更・持ち込み自由です（ダミーハンド装着済み）。', 'End effectors may be swapped or brought in freely (a dummy hand is pre-installed).'),
            T('開発用 PC は Linux または Windows を持参してください。Mac は SDK・ネットワーク制約により使用できません。', 'Bring a Linux or Windows dev PC. Mac cannot be used due to SDK and network constraints.'),
            T('SDK・クイックスタート・PC2 アクセス方法は当日レクチャーと Discord で共有します。', 'SDK, quick-start, and PC2 access details are shared at the lecture and on Discord.'),
            T('転倒・異常時はすぐに運営スタッフを呼んでください。', 'Call a staff member immediately if a robot falls or behaves abnormally.'),
          ].map((r) => (
            <li key={r} className="flex items-start gap-2.5 text-sm text-zinc-700">
              <span className="mt-1.5 size-1.5 rounded-full bg-orange-500 shrink-0" />
              {r}
            </li>
          ))}
        </ul>
      </Section>

      {/* Judging & prizes */}
      <Section dark title={T('審査・賞', 'Judging & prizes')}>
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-zinc-100 text-sm font-semibold tracking-wider uppercase mb-4">{T('審査基準', 'Judging')}</h3>
            <p className="text-sm text-zinc-400 mb-4">
              {T('審査員が全6チームのデモを見て、以下の観点を参考に順位をつけます。', 'Judges watch all six demos and rank the teams, guided by these criteria:')}
            </p>
            <ul className="space-y-2">
              {[
                T('実機完成度（実機でどこまで動くか）', 'Robot execution (how much runs on the real robot)'),
                T('創造性', 'Creativity'),
                T('実用性', 'Practicality'),
                T('プレゼンテーション', 'Presentation'),
              ].map((c) => (
                <li key={c} className="flex items-start gap-2.5 text-sm text-zinc-300">
                  <span className="mt-1.5 size-1.5 rounded-full bg-orange-500 shrink-0" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-zinc-100 text-sm font-semibold tracking-wider uppercase mb-4">{T('賞', 'Prizes')}</h3>
            <ul className="space-y-3 text-sm text-zinc-300">
              <li className="flex items-start gap-2.5"><span className="mt-1.5 size-1.5 rounded-full bg-orange-500 shrink-0" />{T('1位 / 2位 — 表彰と賞（詳細は当日発表）', '1st / 2nd place — awards announced on the day')}</li>
              <li className="flex items-start gap-2.5"><span className="mt-1.5 size-1.5 rounded-full bg-orange-500 shrink-0" />{T('スポンサー特別賞', 'Sponsor special awards')}</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Partners */}
      <Section title={T('主催・パートナー', 'Organizers & partners')}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {partnerTiers.map((tier) => (
            <div key={tier.label.en}>
              <p className="text-[10px] tracking-widest uppercase text-zinc-400 mb-3">{ja ? tier.label.ja : tier.label.en}</p>
              <ul className="space-y-1.5">
                {tier.names.map((n) => (
                  <li key={n} className="text-sm font-medium text-zinc-900">{n}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* FleetSeek */}
      <Section dark title={T('Orboh FleetSeek について', 'About Orboh FleetSeek')}>
        <div className="max-w-3xl space-y-4 text-zinc-300 text-sm md:text-base leading-relaxed">
          <p>
            {T(
              'FleetSeek は Orboh が開発する、ロボットたちの「経験」を持ち寄って蓄積・共有するネットワークです。',
              'FleetSeek is Orboh’s network for pooling and sharing what robots learn in the field.'
            )}
          </p>
          <p>
            {T(
              '一台のロボットの中だけで賢さが完結するのではなく、複数の現場・複数のメーカーのロボットが、実際の現場で得た経験（スキルと実行ログ）を FleetSeek に集めることで、フリート全体が賢くなっていきます。あるロボットが覚えたことを、別のロボットが引き出して使える——そんな「みんなのポケット」のような仕組みです。',
              'Instead of intelligence living inside a single robot, robots from many sites and many makers contribute the skills and execution logs they gather on the job. The whole fleet gets smarter together — what one robot learns, another can pull out and use, like a shared pocket everyone reaches into.'
            )}
          </p>
          <p>
            {T(
              'このハッカソンで皆さんが Unitree G1 上に作り上げたデモやノウハウも、こうしたネットワークにつながっていく成果の一つです。開発者コミュニティの輪を広げ、次のロボット開発を加速させる場として Humanoid Hack Tokyo を開催しています。',
              'The demos and know-how you build on the Unitree G1 this weekend feed into that network. Humanoid Hack Tokyo exists to grow the developer community and accelerate what comes next.'
            )}
          </p>
        </div>
      </Section>

      {/* Notices — full */}
      <Section title={T('参加者注意事項', 'Participant guidelines')}>
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
          <NoticeGroup
            title={T('持ち物・参加要件', 'What to bring')}
            items={[
              T('開発用ノート PC（チーム内に Ubuntu が動く環境を1台以上）。Mac は不可。', 'A dev laptop — at least one Ubuntu-capable machine per team. No Mac.'),
              T('名刺（ネットワーキングで交換の機会があります）。', 'Business cards (there will be networking).'),
              T('入館時にゲストカードを1人1枚配布。退出時に必ず返却してください。', 'One guest pass per person on entry — return it when you leave.'),
              T('入場は Luma チケット保持者のみ。受付は 1F で Luma QR を照合します。', 'Entry is for Luma ticket holders only; we verify your Luma QR at the 1F desk.'),
            ]}
          />
          <NoticeGroup
            title={T('開発ルール', 'Hackathon rules')}
            items={[
              T('チーム構成は4名（固定）。', 'Teams are four members (fixed).'),
              T('開発時間は Day1 昼〜Day2 14:00（コードフリーズ）。', 'Development runs from Day 1 midday to 14:00 on Day 2 (code freeze).'),
              T('G1 は2チームで1台を共有。稼働範囲は半径 1.5m 以内。', 'Each G1 is shared by two teams; movement is limited to a 1.5m radius.'),
              T('テーマは自由（VLA / LLM / テレオペ / 古典制御 など何でも可）。', 'Any theme — VLA, LLM, teleop, classical control, anything.'),
              T('公用語は日本語（英語サポートあり）。', 'The working language is Japanese (English support available).'),
              T('発表準備は1チーム前の発表中から待機席で開始可能。', 'You may set up at the standby seat while the previous team presents.'),
              T('知的財産は各チームに帰属。Orboh は事例紹介・コミュニティ共有の権利を持ちます。', 'IP stays with each team; Orboh may showcase and share work with the community.'),
            ]}
          />
          <NoticeGroup
            title={T('禁止事項', 'Prohibited')}
            items={[
              T('持ち込み禁止：刃物・銃器・火気、個包装ではない食品・生鮮食品。', 'No blades, firearms, or open flame; no unpackaged or fresh food.'),
              T('禁止テーマ：火器・刃物・液体物・生鮮食品の使用、人への危害リスクがあるアプリケーション。', 'Prohibited themes: use of fire, blades, liquids, or fresh food; anything that risks harming a person.'),
              T('備品・機材を壊しかねない行為、公共の秩序を乱す行為。', 'Actions that could damage equipment or disturb public order.'),
              T('ゲストカードの流用、事前登録のない方の入場。', 'Misuse of guest passes; entry by unregistered persons.'),
              T('指定区域以外への立ち入り・撮影。', 'Entering or photographing restricted areas.'),
            ]}
          />
          <NoticeGroup
            title={T('会場・入退場', 'Venue & access')}
            items={[
              T('立ち入り可能なのは 11F ヒューマノイドラボ内の開発用 G1 スペースのみ。他階・個室・工事中エリアは禁止。', 'Access is limited to the G1 dev space inside the 11F lab. Other floors, private rooms, and construction areas are off-limits.'),
              T('一時退場は原則不可。やむを得ない場合は申請の上、ゲストカードを付与します。', 'Temporary exit is generally not allowed; if unavoidable, request one and a guest pass will be issued.'),
              T('遅れて到着する場合は Discord または運営に連絡を。スタッフが 1F までお迎えにあがります。', 'Arriving late? Message Discord or staff and we’ll meet you at 1F (staff escort required).'),
              T('静電気対策のため、機材に触れる前にドア等で放電してください。', 'Discharge static (e.g. on a door) before touching equipment.'),
              T('GMO の冷蔵庫は使用禁止。会場内に喫煙所はありません。', 'The GMO fridge is off-limits. There is no smoking area on site.'),
              T('ゲストカードに関する問題はすぐに運営（藤間）まで。', 'Any guest-pass issue — tell the organizers (Fujima) right away.'),
            ]}
          />
          <NoticeGroup
            title={T('弁償・免責', 'Liability')}
            items={[
              T('備品・機材を破損した場合、また盗難・紛失についても弁償をお願いします。', 'You are responsible for repair or replacement of damaged, stolen, or lost equipment.'),
              T('ハッカソン中の怪我・事故は参加者の責任となります。主催者は責任を負いません。', 'Injuries or accidents during the hackathon are the participant’s responsibility; organizers are not liable.'),
            ]}
          />
          <NoticeGroup
            title={T('撮影・プライバシー', 'Media & privacy')}
            items={[
              T('主催側が写真・動画を撮影し、SNS・メディアに掲載することがあります。', 'Organizers photograph and film the event and may post to social media and press.'),
              T('ラボ内での撮影・投稿は歓迎。#HumanoidHackTokyo を付けてください（運営タグ付けでリポスト）。', 'Your own photos and posts are welcome — tag #HumanoidHackTokyo (tag us and we’ll repost).'),
              T('登録情報（氏名・属性・スキル等）は運営および協賛スポンサーと共有します。希望しない場合は事前に主催へご連絡ください。', 'Registration details are shared with organizers and sponsors; contact the organizer beforehand to opt out.'),
              T('Day2 の観覧は別チケット・本人確認が必須です。', 'Day 2 viewing requires a separate ticket and ID check.'),
            ]}
          />
        </div>
      </Section>

      {/* Discord + wifi footer strip */}
      <section className="px-8 md:px-16 lg:px-24 py-16 bg-zinc-950">
        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-8">
          <div className="rounded-lg border border-zinc-800 p-6">
            <p className="text-[10px] tracking-widest uppercase text-zinc-500 mb-2">Discord</p>
            <p className="text-sm text-zinc-300 mb-4">
              {T('質問・チームアップ・運営への連絡はすべて公式 Discord で。', 'Questions, team-up, and staff contact all happen on the official Discord.')}
            </p>
            <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-orange-400 hover:text-orange-300 break-all">
              {DISCORD_URL}
            </a>
          </div>
          <div className="rounded-lg border border-zinc-800 p-6">
            <p className="text-[10px] tracking-widest uppercase text-zinc-500 mb-2">Wi-Fi</p>
            <p className="text-sm text-zinc-300">
              {T('会場 Wi-Fi の SSID・パスワードは当日、各テーブルの案内用紙でご案内します。', 'Venue Wi-Fi SSID and password are provided on the day via cards at each table.')}
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto w-full mt-12 text-center">
          <Link to="/humanoidhack" className="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-100 text-xs tracking-widest uppercase transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {T('Humanoid Hack Tokyo に戻る', 'Back to Humanoid Hack Tokyo')}
          </Link>
        </div>
      </section>

      <Footer />
    </Layout>
  );
}

function Section({
  title,
  label,
  dark,
  children,
}: {
  title: string;
  label?: string;
  dark?: boolean;
  children: ReactNode;
}) {
  return (
    <section className={`px-8 md:px-16 lg:px-24 py-20 ${dark ? 'bg-zinc-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto w-full">
        {label && (
          <p className={`text-xs tracking-widest uppercase mb-3 ${dark ? 'text-orange-400' : 'text-orange-600'}`}>{label}</p>
        )}
        <h2 className={`font-mono text-2xl md:text-3xl font-normal mb-8 ${dark ? 'text-zinc-50' : 'text-zinc-900'}`} style={{ letterSpacing: '-0.01em' }}>
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}

function ScheduleTable({ heading, rows, ja }: { heading: string; rows: Row[]; ja: boolean }) {
  return (
    <div className="rounded-lg border border-zinc-700 overflow-hidden">
      <div className="bg-zinc-800 px-4 py-3">
        <p className="font-mono text-sm text-zinc-100">{heading}</p>
      </div>
      <table className="w-full text-sm">
        <tbody>
          {rows.map((r) => (
            <tr key={r.time + r.cols[0]} className="border-t border-zinc-800 align-top">
              <td className="px-4 py-2.5 font-mono text-orange-400 whitespace-nowrap w-28">{r.time}</td>
              <td className="px-4 py-2.5 text-zinc-200">{ja ? r.cols[0] : r.cols[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function NoticeGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-zinc-900 text-sm font-semibold tracking-wider uppercase mb-4">{title}</h3>
      <ul className="space-y-2.5">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-2.5 text-sm text-zinc-700">
            <span className="mt-1.5 size-1.5 rounded-full bg-orange-500 shrink-0" />
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}
