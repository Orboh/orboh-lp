import { Layout } from '@/components/Layout';
import { Footer } from '@/components/Footer/Footer';
import { useLocale } from '@/contexts/LocaleContext';
import { useSeo } from '@/seo/useSeo';

const WAITLIST_URL = 'https://tally.so/r/0QKz8P';

const CLIP_SRC = '/okra-grasp-2026-09.mp4';
const CLIP_POSTER = '/okra-grasp-poster.jpg';

interface Photo {
  src: string;
  caption: { ja: string; en: string };
  alt: { ja: string; en: string };
}

const PHOTOS: Photo[] = [
  {
    src: '/okra-pods.jpg',
    caption: { ja: '収穫適期のオクラ', en: 'Okra at harvest size' },
    alt: { ja: '株についたオクラの実', en: 'Okra pods on the plant' },
  },
  {
    src: '/okra-demonstration.jpg',
    caption: { ja: '人のお手本を記録する', en: 'Recording the demonstration' },
    alt: { ja: '人の手でオクラを収穫しているところ', en: 'A person harvesting okra by hand' },
  },
  {
    src: '/okra-field.jpg',
    caption: { ja: '実証中の圃場', en: 'The trial field' },
    alt: { ja: '実証に使っているオクラの圃場', en: 'The okra field used for the trial' },
  },
];

const OFFER = [
  {
    tag: 'Capex',
    title: { ja: '初期投資なし', en: 'No upfront investment' },
    body: {
      ja: 'サービスとして提供します。設備を抱えずに始められます。',
      en: 'Delivered as a service. There is no equipment for you to own.',
    },
  },
  {
    tag: 'People',
    title: { ja: '現場に人を出す', en: 'Engineers on site' },
    body: {
      ja: 'エンジニアが入り、その農園に合わせて調整します。',
      en: 'Our engineers come in and tune it to your farm.',
    },
  },
  {
    tag: 'Fit',
    title: { ja: 'その農園の動きで作る', en: 'Built from your own motion' },
    body: {
      ja: 'いまの収穫動作を記録し、それを覚えさせて作ります。',
      en: 'We record how harvesting is done now, and train the robot from it.',
    },
  },
];

const STEPS = [
  {
    tag: { ja: '01 / 記録', en: '01 / Record' },
    title: { ja: '現場でお手本を記録', en: 'Record the demonstration' },
    body: {
      ja: 'ハンドヘルドのグリッパで、収穫の動きを記録します。ロボットを持ち込む前にできます。',
      en: 'A handheld gripper records the harvesting motion. It can be done before a robot arrives.',
    },
  },
  {
    tag: { ja: '02 / 学習', en: '02 / Train' },
    title: { ja: '模倣学習で動作を獲得', en: 'Learn the motion' },
    body: {
      ja: '記録したお手本から、模倣学習（ACT）で動作スキルを学習させます。',
      en: 'The motion skill is learned from those recordings with imitation learning (ACT).',
    },
  },
  {
    tag: { ja: '03 / 現場調整', en: '03 / Tune' },
    title: { ja: '現場で合わせ込む', en: 'Tune it on site' },
    body: {
      ja: '掴み方・高さ・速度を、エンジニアが現場で詰めます。',
      en: 'Grip, height and speed are settled on site by an engineer.',
    },
  },
];

const CROPS = [
  {
    proven: true,
    name: { ja: 'オクラ', en: 'Okra' },
    note: { ja: '実証中。株についた実を掴むところまで。', en: 'In trial. Grasping the pod on the plant.' },
  },
  {
    proven: false,
    name: { ja: 'ハウストマト', en: 'Greenhouse tomato' },
    note: { ja: '環境が安定していて、通年で作業がある。', en: 'Stable conditions, and work all year round.' },
  },
  {
    proven: false,
    name: { ja: 'きゅうり', en: 'Cucumber' },
    note: { ja: '毎日・複数回の収穫で、人が張り付く。', en: 'Picked daily, several times a day, by someone who cannot leave.' },
  },
  {
    proven: false,
    name: { ja: 'そら豆・スナップエンドウ', en: 'Broad bean, snap pea' },
    note: { ja: '繁忙期が短く、一気に人手が要る。', en: 'A short peak that needs many hands at once.' },
  },
  {
    proven: false,
    name: { ja: 'みょうが', en: 'Myoga ginger' },
    note: { ja: '低い位置の屈み作業が長く続く。', en: 'Long stretches of low, stooped work.' },
  },
  {
    proven: false,
    name: { ja: '選果・パッケージング', en: 'Sorting and packing' },
    note: { ja: '屋内で条件が揃い、通年で工程がある。', en: 'Indoors, controlled, and running year round.' },
  },
];

const WORKING = {
  ja: [
    '株についた実に手を伸ばす',
    '実を掴む（屋内・20回中16回）',
    '掴んだまま手を戻す',
    '手首のカメラだけで位置を取る',
  ],
  en: [
    'Reaches for a pod on the plant',
    'Grasps the pod (indoor, 16 of 20)',
    'Brings the arm back holding it',
    'Locates the pod from the wrist camera alone',
  ],
};

const NEXT = {
  ja: ['圃場での連続収穫', '株ごとのばらつきへの対応', '屋外の光や天候への耐性', '収穫適期の判断'],
  en: [
    'Continuous harvesting in the field',
    'Variation between individual plants',
    'Outdoor light and changing weather',
    'Judging whether a pod is ready',
  ],
};

const EYEBROW = 'text-orange-400 text-xs tracking-widest uppercase mb-4';
const EYEBROW_LIGHT = 'text-orange-700 text-xs tracking-widest uppercase mb-4';
const BUTTON =
  'inline-flex items-center justify-center px-8 py-4 bg-orange-400 text-zinc-950 text-sm font-bold tracking-wide rounded hover:bg-orange-300 transition-colors';

/**
 * Agriculture page. The claim stops at grasping — the robot picks the pod off
 * the plant in an indoor rig, and the field work is still ahead. "Where we are"
 * near the bottom says so in full, deliberately, because a farm that finds out
 * later is a farm we have wasted a season of.
 */
export function AgriPage() {
  const { locale } = useLocale();
  const ja = locale === 'ja';

  useSeo('agri', { scrollToTop: true });

  return (
    <Layout>
      {/* Hero — the clip carries this page, so it gets half the width */}
      <section className="px-8 md:px-16 lg:px-24 pt-32 pb-20 md:pb-28 bg-zinc-950 text-zinc-50">
        <div className="max-w-7xl mx-auto w-full grid gap-10 lg:gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] items-center">
          <div>
            <p className={EYEBROW}>Autonomous harvesting</p>
            <h1
              className="font-mono text-3xl sm:text-4xl md:text-5xl font-normal mb-5"
              style={{ letterSpacing: '-0.02em' }}
            >
              {ja ? '収穫の手を、増やします。' : 'More hands at harvest.'}
            </h1>
            <p className="text-zinc-300 text-base md:text-lg leading-relaxed max-w-xl">
              {ja
                ? '農業の収穫工程に、ヒューマノイドを実装します。人のお手本から学習した動作で、株についた実を掴みます。'
                : 'We put humanoid robots into agricultural harvesting. Trained from human demonstrations, the robot grasps the pod on the plant.'}
            </p>

            <div className="mt-7 flex flex-wrap items-baseline gap-x-6 gap-y-2 border border-zinc-800 border-l-[3px] border-l-orange-400 px-6 py-4 max-w-xl">
              <p className="font-mono text-4xl md:text-5xl leading-none tabular-nums">
                16<span className="text-zinc-700 px-1">/</span>
                <span className="text-zinc-500">20</span>
              </p>
              <p className="font-mono text-xs leading-relaxed text-zinc-400 flex-1 min-w-[12rem]">
                {ja ? 'オクラの実の把持。屋内の検証環境。' : 'Okra pods grasped. Indoor test setup.'}
              </p>
            </div>

            <div className="mt-8">
              <a href={WAITLIST_URL} target="_blank" rel="noopener noreferrer" className={BUTTON}>
                {ja ? '早期パートナーに登録する' : 'Join the early partner list'}
              </a>
              <p className="text-zinc-500 text-xs mt-3">
                {ja ? '1分で登録できます。' : 'It takes about a minute.'}
              </p>
            </div>
          </div>

          <figure className="m-0">
            <video
              src={CLIP_SRC}
              poster={CLIP_POSTER}
              autoPlay
              muted
              loop
              playsInline
              controls
              preload="metadata"
              className="block w-full max-w-[560px] aspect-[9/16] object-cover bg-zinc-900 border border-zinc-800 rounded"
            />
            <figcaption className="font-mono text-[11px] text-zinc-500 mt-3 max-w-[560px]">
              {ja ? '2026年9月・屋内の検証環境' : 'September 2026, indoor test setup'}
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Photo strip */}
      <section className="px-8 md:px-16 lg:px-24 py-10 md:py-14 bg-white">
        <div className="max-w-7xl mx-auto w-full grid gap-3 sm:grid-cols-3">
          {PHOTOS.map((photo) => (
            <figure key={photo.src} className="m-0">
              <img
                src={photo.src}
                alt={ja ? photo.alt.ja : photo.alt.en}
                loading="lazy"
                className="block w-full aspect-[4/5] object-cover bg-zinc-200 rounded"
              />
              <figcaption className="font-mono text-[11px] text-zinc-500 mt-2">
                {ja ? photo.caption.ja : photo.caption.en}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* What you get */}
      <section className="px-8 md:px-16 lg:px-24 py-20 md:py-24 bg-zinc-100">
        <div className="max-w-7xl mx-auto w-full">
          <p className={EYEBROW_LIGHT}>What you get</p>
          <h2
            className="font-mono text-2xl md:text-3xl font-normal text-zinc-900"
            style={{ letterSpacing: '-0.01em' }}
          >
            {ja ? '機体を買う話ではありません。' : 'You are not buying a robot.'}
          </h2>
          <p className="text-zinc-600 text-base leading-relaxed max-w-xl mt-4">
            {ja
              ? '農業ロボットを納品して終わりにはしません。その農園で動く収穫動作を作り、運用まで一緒に見ます。'
              : 'We do not deliver an agricultural robot and leave. We build a harvesting motion that works on your farm, and stay through running it.'}
          </p>
          <div className="grid gap-8 md:grid-cols-3 mt-10">
            {OFFER.map((item) => (
              <div key={item.tag}>
                <span className="block font-mono text-[11px] tracking-widest uppercase text-orange-700 pb-3 mb-4 border-b border-zinc-300">
                  {item.tag}
                </span>
                <h3 className="text-base font-bold text-zinc-900 mb-1.5">
                  {ja ? item.title.ja : item.title.en}
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  {ja ? item.body.ja : item.body.en}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it is built */}
      <section className="px-8 md:px-16 lg:px-24 py-20 md:py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto w-full">
          <p className={EYEBROW}>How it is built</p>
          <h2
            className="font-mono text-2xl md:text-3xl font-normal text-zinc-50"
            style={{ letterSpacing: '-0.01em' }}
          >
            {ja ? '人の動きから、覚えさせます。' : 'Trained from human motion, not written as code.'}
          </h2>
          <div className="grid gap-8 md:grid-cols-3 mt-10">
            {STEPS.map((step) => (
              <div key={step.tag.en}>
                <span className="block font-mono text-[11px] tracking-widest uppercase text-orange-400 pb-3 mb-4 border-b border-zinc-800">
                  {ja ? step.tag.ja : step.tag.en}
                </span>
                <h3 className="text-base font-bold text-zinc-50 mb-1.5">
                  {ja ? step.title.ja : step.title.en}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {ja ? step.body.ja : step.body.en}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Crops */}
      <section className="px-8 md:px-16 lg:px-24 py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto w-full">
          <p className={EYEBROW_LIGHT}>Crops</p>
          <h2
            className="font-mono text-2xl md:text-3xl font-normal text-zinc-900"
            style={{ letterSpacing: '-0.01em' }}
          >
            {ja ? 'オクラの次を、一緒に決めてください。' : 'Tell us which crop comes after okra.'}
          </h2>
          <dl className="mt-8 grid lg:grid-cols-2 lg:gap-x-14 border-t border-zinc-300">
            {CROPS.map((crop) => (
              <div
                key={crop.name.en}
                className="grid sm:grid-cols-[13rem_minmax(0,1fr)] gap-x-5 gap-y-0.5 py-4 border-b border-zinc-300"
              >
                <dt className={`text-sm font-bold ${crop.proven ? 'text-orange-700' : 'text-zinc-900'}`}>
                  {ja ? crop.name.ja : crop.name.en}
                </dt>
                <dd className="m-0 text-sm text-zinc-500 leading-relaxed">
                  {ja ? crop.note.ja : crop.note.en}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Where we are */}
      <section className="px-8 md:px-16 lg:px-24 py-20 md:py-24 bg-zinc-100">
        <div className="max-w-7xl mx-auto w-full">
          <p className={EYEBROW_LIGHT}>Where we are</p>
          <h2
            className="font-mono text-2xl md:text-3xl font-normal text-zinc-900"
            style={{ letterSpacing: '-0.01em' }}
          >
            {ja ? '実装の現在地' : 'Where the implementation stands'}
          </h2>

          <div className="mt-7 grid sm:grid-cols-2 border border-zinc-300 bg-white">
            <div className="p-6 sm:p-8">
              <h3 className="font-mono text-[10.5px] tracking-widest uppercase text-orange-700 mb-4">
                {ja ? '動いていること' : 'Working now'}
              </h3>
              <ul className="m-0 p-0 list-none">
                {(ja ? WORKING.ja : WORKING.en).map((item, i) => (
                  <li
                    key={item}
                    className={`text-sm text-zinc-900 leading-relaxed py-2 ${i === 0 ? 'pt-0' : 'border-t border-zinc-100'}`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 sm:p-8 border-t sm:border-t-0 sm:border-l border-zinc-300">
              <h3 className="font-mono text-[10.5px] tracking-widest uppercase text-zinc-500 mb-4">
                {ja ? 'これから' : 'Still ahead'}
              </h3>
              <ul className="m-0 p-0 list-none">
                {(ja ? NEXT.ja : NEXT.en).map((item, i) => (
                  <li
                    key={item}
                    className={`text-sm text-zinc-500 leading-relaxed py-2 ${i === 0 ? 'pt-0' : 'border-t border-zinc-100'}`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="text-xs text-zinc-500 leading-relaxed mt-5 max-w-2xl">
            {ja
              ? '16/20 は、株を固定した屋内環境で測った数字です。圃場での成功率はまだ測れていません。'
              : '16 of 20 was measured indoors, with the plant fixed in place. We have no field success rate yet.'}
          </p>
        </div>
      </section>

      {/* Register */}
      <section className="px-8 md:px-16 lg:px-24 py-20 md:py-28 bg-zinc-950">
        <div className="max-w-7xl mx-auto w-full">
          <p className={EYEBROW}>Register</p>
          <h2
            className="font-mono text-2xl md:text-3xl font-normal text-zinc-50 mb-4"
            style={{ letterSpacing: '-0.01em' }}
          >
            {ja ? '早期パートナーを募集しています。' : 'We are looking for early partners.'}
          </h2>
          <p className="text-zinc-300 text-base leading-relaxed max-w-xl">
            {ja
              ? '進捗と、実証の枠が空いたタイミングをお送りします。いま導入を決める必要はありません。'
              : 'We will send you progress, and let you know when a trial slot opens. Nothing to commit to now.'}
          </p>
          <div className="mt-8">
            <a href={WAITLIST_URL} target="_blank" rel="noopener noreferrer" className={BUTTON}>
              {ja ? '早期パートナーに登録する' : 'Join the early partner list'}
            </a>
          </div>
          <p className="text-xs text-zinc-500 leading-relaxed mt-6 max-w-2xl">
            {ja
              ? 'ご記入いただいた情報は本件のご連絡にのみ利用し、第三者には提供しません。'
              : 'What you submit is used only to contact you about this, and is never shared with third parties.'}
          </p>
        </div>
      </section>

      <Footer />
    </Layout>
  );
}
