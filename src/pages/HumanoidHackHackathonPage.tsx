import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Footer } from '@/components/Footer/Footer';
import { useLocale, useLocaleHref } from '@/contexts/LocaleContext';
import { useSeo } from '@/seo/useSeo';
import { ArrowOut, ArrowRight, DiscordMark, SectionHeading, btnOutlineOnDark, btnSolidOnDark, sectionInner, sectionPad } from '@/components/ui';

import floor from '@/assets/hht/floor.webp';

// Lands in #hht-3-team-up, the same invite the Luma page uses
const DISCORD_URL = 'https://discord.gg/2kScQ8tWqf';
const EVENT_URL = 'https://luma.com/929bbo10';
// Separate free ticket for people who only watch the Dec 20 demos
const VIEWER_URL = 'https://luma.com/fvbbx29u';

type Row = { time: string; cols: string[] };

// Everything below follows the Luma event page; change both together.
const scheduleDay1: Row[] = [
  { time: '10:00', cols: ['チェックイン & コーヒー', 'Check-in & coffee'] },
  { time: '11:00', cols: ['開会式 & ルール説明', 'Opening & rules'] },
  { time: '12:00', cols: ['開発スタート', 'Hacking begins'] },
  { time: '12:30', cols: ['昼食（提供）', 'Lunch (provided)'] },
  { time: '18:30', cols: ['夕食（提供）', 'Dinner (provided)'] },
  { time: '22:00', cols: ['会場クローズ', 'Venue closes'] },
];

const scheduleDay2: Row[] = [
  { time: '08:00', cols: ['会場オープン', 'Venue opens'] },
  { time: '09:00', cols: ['開発再開', 'Hacking resumes'] },
  { time: '12:00', cols: ['昼食（提供）', 'Lunch (provided)'] },
  { time: '14:00', cols: ['開発終了 / 見学者入場（観覧チケット必要）', 'Development ends / viewers enter (viewer ticket required)'] },
  { time: '15:00', cols: ['デモ発表（6チーム、各約7分）', 'Demos (6 teams, about 7 min each)'] },
  { time: '16:00', cols: ['審査', 'Judging'] },
  { time: '16:45', cols: ['結果発表 & 授賞式', 'Results & awards'] },
  { time: '17:30', cols: ['懇親会（軽食 & ドリンク）', 'Networking (food & drinks)'] },
  { time: '18:30', cols: ['閉会', 'Close'] },
];

const partnerTiers = [
  { label: { ja: '主催', en: 'Organizer' }, names: { ja: ['Orboh, Inc.'], en: ['Orboh, Inc.'] } },
  {
    label: { ja: 'Co-Host', en: 'Co-Host' },
    names: { ja: ['GMO AI＆ロボティクス商事株式会社', 'RobotMateHub'], en: ['GMO AI & Robotics Corporation', 'RobotMateHub'] },
  },
];

export function HumanoidHackHackathonPage() {
  const { locale } = useLocale();
  const l = useLocaleHref();
  const ja = locale === 'ja';

  useSeo('humanoidhack/hackathon', { scrollToTop: true });

  const T = (j: string, e: string) => (ja ? j : e);

  return (
    <Layout>
      {/* Hero */}
      <section className={`relative overflow-hidden bg-carbon text-canvas pt-28 pb-20 md:pt-36 md:pb-24 ${sectionPad}`}>
        <div className="absolute inset-0">
          <img src={floor} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-carbon/78" />
        </div>
        <div className={`relative z-10 ${sectionInner}`}>
          <div className="border-t border-canvas/25 pt-3.5"><p className="type-label text-carbon-muted">{T('参加者向け — ハッカソン概要', 'For participants — Hackathon guide')}</p></div>
          <h1 className="type-display-lg text-[2.4rem] sm:text-[3.4rem] lg:text-[4.2rem] mt-7 mb-6">
            Humanoid Hack Tokyo 3
          </h1>
          <p className="text-carbon-muted text-[19px] leading-[1.95] max-w-2xl mb-8">
            {T(
              '2026年12月19日（土）・20日（日）、渋谷。GMO ヒューマノイド・ラボの開幕を記念して開催します。テーマは物流です。応募方法・当日の進め方・ルールをここにまとめます。',
              'December 19–20, 2026, Shibuya. Held to mark the opening of GMO Humanoid Lab, themed on logistics. How to apply, how the two days run, and the rules.'
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href={EVENT_URL} target="_blank" rel="noopener noreferrer" className={btnSolidOnDark}>
              {T('Luma で登録する', 'Register on Luma')}
              <ArrowOut />
            </a>
            <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className={btnOutlineOnDark}>
              <DiscordMark />
              {T('Discord でチームを組む', 'Form a team on Discord')}
            </a>
          </div>
        </div>
      </section>

      {/* At a glance */}
      <section className={`${sectionPad} py-20 md:py-24 bg-canvas`}>
        <div className={sectionInner}>
          <dl className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
            {[
              { l: T('日程', 'Dates'), v: T('12月19日（土）・20日（日）', 'Dec 19 (Sat) – 20 (Sun)') },
              { l: T('会場', 'Venue'), v: T('GMO ヒューマノイド・ラボ（東京・渋谷 セルリアンタワー）', 'GMO Humanoid Lab (Cerulean Tower, Shibuya, Tokyo)') },
              { l: T('テーマ', 'Theme'), v: T('物流の現場の作業', 'Work from logistics sites') },
              { l: T('定員', 'Capacity'), v: T('30名（6チーム × 5名）', '30 people (6 teams of 5)') },
              { l: T('ロボット', 'Robots'), v: T('Unitree G1（台数は確定次第ご案内します）', 'Unitree G1 (number of units to be confirmed)') },
              { l: T('参加費', 'Fee'), v: T('無料（食事は両日ご用意します）', 'Free (meals provided on both days)') },
            ].map((f) => (
              <div key={f.l} className="border-t border-hairline pt-4">
                <dt className="type-label text-muted mb-2">{f.l}</dt>
                <dd className="text-sm font-medium text-ink">{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Theme */}
      <Section dark title={T('開発テーマ：物流', 'Theme: logistics')}>
        <div className="max-w-3xl space-y-4 text-carbon-muted text-sm md:text-base leading-relaxed">
          <p>
            {T(
              '具体的なお題は、10月22日の物流セミナーで物流事業者の皆さまから集めた現場の課題をもとに決め、確定次第 Luma のイベントページでお知らせします。お題の例は、棚やコンテナから荷物を取り出し、指定の場所へ移すピックアンドプレースです。',
              'The specific challenge is being set from the on-site problems logistics companies raised at our October 22 seminar, and will be announced on the Luma event page once confirmed. An example: picking items from a shelf or container and placing them at a set location.'
            )}
          </p>
          <p>
            {T(
              '対象物・治具は運営が用意します。手法は自由です（VLA / LLM / テレオペ / 古典制御など）。',
              'Objects and jigs are provided by the organizers. Any approach is welcome: VLA, LLM, teleoperation, classical control and more.'
            )}
          </p>
        </div>
      </Section>

      {/* How to apply */}
      <Section title={T('参加方法', 'How to take part')} label={T('5人1チーム', 'Teams of five')}>
        <ul className="border-t border-ink max-w-3xl">
          {[
            T('Luma で個別に登録します。', 'Register individually on Luma.'),
            T('Discord の #hht-3-team-up でチームを組みます。', 'Form a team in #hht-3-team-up on Discord.'),
            T('チームとして応募します（締切：12月6日（日）23:59）。チーム応募フォームは、お題の確定後に Luma のイベントページでご案内します。', 'Apply as a team by December 6 (Sun) 23:59 JST. The team application form opens on the Luma event page once the challenge is announced.'),
            T('結果発表は12月7日（月）。選出チームにはハッカーチケットをお送りします。', 'Results on December 7 (Mon). Selected teams receive Hacker tickets.'),
          ].map((s, i) => (
            <li key={s} className="grid grid-cols-[auto_1fr] gap-4 py-3 border-b border-hairline text-sm text-muted">
              <span className="type-label text-accent">{String(i + 1).padStart(2, '0')}</span>{s}
            </li>
          ))}
        </ul>
        <p className="text-sm text-muted mt-6 max-w-3xl">
          {T(
            'チーム内に Ubuntu が動く環境をお持ちの方が最低1名必要です（PC・WSL2・VM 可）。ロボティクスの経験は必須ではありません。',
            'At least one team member needs an Ubuntu environment (PC, WSL2 or VM). Prior robotics experience is not required.'
          )}
        </p>
      </Section>

      {/* Schedule */}
      <Section dark title={T('スケジュール', 'Schedule')} label={T('2日間', 'Two days')}>
        <div className="grid lg:grid-cols-2 gap-8">
          <ScheduleTable heading={T('Day 1 — 12/19（土）', 'Day 1 — Dec 19 (Sat)')} rows={scheduleDay1} ja={ja} />
          <ScheduleTable heading={T('Day 2 — 12/20（日）', 'Day 2 — Dec 20 (Sun)')} rows={scheduleDay2} ja={ja} />
        </div>
      </Section>

      {/* Judging & prizes */}
      <Section title={T('審査・賞', 'Judging & prizes')}>
        <p className="text-sm text-muted max-w-3xl">
          {T(
            '審査員と賞は、確定次第 Luma のイベントページで公開します。選考基準はチーム応募フォームに記載します。',
            'The judges and prizes will be published on the Luma event page once confirmed. The selection criteria are listed on the team application form.'
          )}
        </p>
      </Section>

      {/* Partners */}
      <Section dark title={T('主催・Co-Host', 'Organizer & co-hosts')}>
        <div className="grid sm:grid-cols-2 gap-6">
          {partnerTiers.map((tier) => (
            <div key={tier.label.en}>
              <p className="type-label text-carbon-muted mb-3">{ja ? tier.label.ja : tier.label.en}</p>
              <ul className="space-y-1.5">
                {tier.names[locale].map((n) => (
                  <li key={n} className="text-sm font-medium text-canvas">{n}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* FleetSeek */}
      <Section title={T('Orboh FleetSeek について', 'About Orboh FleetSeek')}>
        <div className="max-w-3xl space-y-4 text-muted text-sm md:text-base leading-relaxed">
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
      <Section dark title={T('参加者注意事項', 'Participant guidelines')}>
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
          <NoticeGroup
            title={T('参加にあたって', 'Before you come')}
            items={[
              T('機体は複数チームでの共用です。開発時間の割り当ては当日ご案内します。', 'Robots are shared between teams; development slots are assigned on the day.'),
              T('GPU の提供はありません。学習環境は各チームでご用意ください。', 'No GPU is provided; please prepare your own training environment.'),
              T('PC は Linux または Windows をご持参ください。Mac は SDK・ネットワークの制約により対応できません。', 'Bring a Linux or Windows laptop; macOS is not supported because of SDK and network constraints.'),
              T('当日入場できるのは、選考を通過した方（◆ Hacker 券）と運営・招待者のみです。▷ 応募受付の登録だけでは入場できません。', 'Only selected participants (◆ Hacker ticket), organizers and invited guests can enter. Registering for the ▷ application ticket alone does not grant entry.'),
              T('チケット1枚につき1名様のみ入場できます。再入場は可能です（受付でお名前を確認します）。', 'One person per ticket. Re-entry is allowed; please give your name at reception.'),
            ]}
          />
          <NoticeGroup
            title={T('成果物の提出（必須）', 'Submissions (required)')}
            items={[
              T('チームごとに GitHub で git リポジトリを1つ作成してください（公開・非公開は問いません。非公開の場合は運営アカウントを招待してください）。', 'Each team creates one git repository on GitHub (public or private; if private, invite the organizer account).'),
              T('12/19（土）18:00 までに、リポジトリの URL を Discord のチーム別チャンネルへ投稿してください。以降 12/20 まで随時 push してください。', 'Post the repository URL in your team channel on Discord by Dec 19 (Sat) 18:00, and keep pushing through Dec 20.'),
              T('12/20（日）14:00 の開発終了までに、運営が用意する提出フォームから成果物（概要・リポジトリ URL・発表スライド・デモ動画）を提出してください。', 'By the end of development at 14:00 on Dec 20 (Sun), submit your summary, repository URL, slides and demo video through the form we provide.'),
              T('未提出のチームも発表はできますが、受賞の対象外となります。', 'Teams that do not submit can still present, but are not eligible for awards.'),
              T('成果物の権利は各チームに帰属します。オープンソース化を求めるものではありません。', 'Teams keep the rights to what they build; open-sourcing is not required.'),
            ]}
          />
          <NoticeGroup
            title={T('禁止事項', 'Prohibited')}
            items={[
              T('持ち込み禁止：刃物・銃器・火気、個包装ではない食品・生鮮食品、個人飲用以外の液体物。', 'Not allowed in: knives, firearms, open flames; non-packaged or perishable food; liquids other than your own drinks.'),
              T('備品・機材・治具・対象物を壊しかねない行為、および治具・対象物のラボ外への持ち出し。', 'Anything that could damage equipment, jigs or task objects, and taking jigs or task objects out of the lab.'),
              T('ゲストカードの流用、事前登録のない方の入場。', 'Misuse of guest passes; entry without prior registration.'),
              T('公共の秩序を乱す行為。', 'Disruptive behavior.'),
              T('指定区域以外への立ち入り・撮影。', 'Entering or photographing restricted areas.'),
            ]}
          />
          <NoticeGroup
            title={T('弁償・免責', 'Liability')}
            items={[
              T('備品・機材を破損した場合、また盗難・紛失についても弁償をお願いします。', 'You are responsible for reimbursing damage to equipment or facilities, and for theft or loss.'),
              T('ハッカソン中の怪我・事故は参加者の責任となります。主催者は責任を負いません。', 'Injuries or accidents during the hackathon are the participant’s responsibility; organizers bear no liability.'),
            ]}
          />
          <NoticeGroup
            title={T('撮影・個人情報', 'Media & privacy')}
            items={[
              T('主催側および共同開催者が写真・動画を撮影し、各種媒体（X、Instagram、YouTube など）に掲載します。', 'The organizers and co-hosts take photos and video and publish them on various media (X, Instagram, YouTube, etc.).'),
              T('登録情報は、本ハッカソンの選考・運営・連絡のために使用します。', 'Your registration details are used for selection, operations and communication for this hackathon.'),
              T('運営およびイベント後のご案内のため、氏名・所属先・主な役割・メールアドレスを共同開催者（GMO AI＆ロボティクス商事株式会社、RobotMateHub）へ提供します。', 'Your name, organization, role and email address are shared with the co-hosts (GMO AI & Robotics Corporation and RobotMateHub) for operations and post-event communication.'),
            ]}
          />
        </div>
      </Section>

      {/* Discord + viewing footer strip */}
      <section className={`${sectionPad} py-20 md:py-24 bg-surface`}>
        <div className={`${sectionInner} grid md:grid-cols-2 gap-8`}>
          <div className="border-t border-hairline pt-6">
            <p className="type-label text-muted mb-2">Discord</p>
            <p className="text-sm text-muted mb-4">
              {T('チームアップ・質問・運営への連絡は Discord で受け付けています（X の DM には返信していません）。', 'Team-up, questions and contact with the organizers all happen on Discord (we do not reply to X DMs).')}
            </p>
            <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-accent hover:text-ink transition-colors duration-150 break-all">
              {DISCORD_URL}
            </a>
          </div>
          <div className="border-t border-hairline pt-6">
            <p className="type-label text-muted mb-2">{T('観覧', 'Viewing')}</p>
            <p className="text-sm text-muted mb-4">
              {T('12/20 の発表・授賞式だけを観覧する方は、別の観覧チケット（無料）にご登録ください。', 'To watch only the Dec 20 demos and awards, register for the separate viewer ticket (free).')}
            </p>
            <a href={VIEWER_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-ink transition-colors duration-150">
              {T('観覧チケットに登録する', 'Get a viewer ticket')}
              <ArrowOut />
            </a>
          </div>
        </div>
        <div className={`${sectionInner} mt-12`}>
          <Link to={l('/humanoidhack')} className="type-label inline-flex items-center gap-2 text-muted hover:text-ink transition-colors duration-150">
            <ArrowRight className="w-3.5 h-3.5 rotate-180" />
            {T('Humanoid Hack に戻る', 'Back to Humanoid Hack')}
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
    <section className={`${sectionPad} py-20 md:py-24 ${dark ? 'bg-carbon text-canvas' : 'bg-surface'}`}>
      <div className={sectionInner}>
        {label ? (
          <SectionHeading label={label} title={title} tone={dark ? 'dark' : 'light'} className="mb-8" />
        ) : (
          <div className={`border-t pt-6 mb-8 ${dark ? 'border-carbon-hairline' : 'border-hairline'}`}>
            <h2 className={`type-display text-[1.95rem] sm:text-[2.4rem] lg:text-[2.9rem] ${dark ? 'text-canvas' : 'text-ink'}`}>{title}</h2>
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

function ScheduleTable({ heading, rows, ja }: { heading: string; rows: Row[]; ja: boolean }) {
  return (
    <div className="border border-carbon-hairline overflow-x-auto">
      <div className="border-b border-carbon-hairline px-4 py-3">
        <p className="type-display text-sm text-canvas">{heading}</p>
      </div>
      <table className="w-full text-sm">
        <tbody>
          {rows.map((r) => (
            <tr key={r.time + r.cols[0]} className="border-t border-carbon-hairline align-top">
              <td className="px-4 py-2.5 type-label text-accent whitespace-nowrap w-28">{r.time}</td>
              <td className="px-4 py-2.5 text-carbon-muted">{ja ? r.cols[0] : r.cols[1]}</td>
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
      <h3 className="type-display text-canvas text-base mb-4">{title}</h3>
      <ul className="border-t border-carbon-hairline">
        {items.map((it, i) => (
          <li key={it} className="grid grid-cols-[auto_1fr] gap-4 py-2.5 border-b border-carbon-hairline text-sm text-carbon-muted">
            <span className="type-label text-accent">{String(i + 1).padStart(2, '0')}</span>{it}
          </li>
        ))}
      </ul>
    </div>
  );
}
