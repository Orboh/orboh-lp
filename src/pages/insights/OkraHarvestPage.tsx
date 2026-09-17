import { Layout } from '@/components/Layout';
import { Footer } from '@/components/Footer/Footer';
import { CTASection } from '@/components/CTA';
import { useLocale, useLocaleHref } from '@/contexts/LocaleContext';
import { useSeo } from '@/seo/useSeo';
import {
  ArticleBody,
  ArticleHero,
  H2,
  H3,
  Li,
  Note,
  P,
  Related,
  Table,
  Ul,
} from '@/components/insights/Prose';

const NOTE_REPORT_URL = 'https://note.com/lovely_camel67/n/n5650033a2d57';

/** One harvest cycle, in the order the robot executes it. */
const CYCLE_JA = [
  ['移動', 'オクラを探しながら畝に沿って横に歩く', '歩行ポリシーへの速度指令（LocoClient）'],
  ['検出', 'カメラ画像からオクラの実を検出・セグメントする', 'オクラ画像でファインチューニングしたYOLO'],
  ['3D化', '検出した実を点群として取得し、重心の座標を出す', 'ZED-Mステレオカメラの深度'],
  ['座標変換', 'カメラ基準の座標を右腕基準の座標に変換する', '幾何計算'],
  ['接近', 'ハンドを実の近くまで伸ばす', '逆運動学（IK）'],
  ['位置合わせ', 'カッターが茎を挟める位置までハンドを詰める', 'Diffusion Policy'],
  ['切断把持', 'ハンドの開度を変えて茎を切り、実を掴む', '開度制御'],
  ['収納', '左腕のカゴに実を入れ、次の株へ向かう', '固定モーション'],
] as const;

const CYCLE_EN = [
  ['Walk', 'Move sideways along the row, looking for pods', 'Velocity commands to the walking policy (LocoClient)'],
  ['Detect', 'Find and segment okra pods in the camera image', 'YOLO fine-tuned on okra images'],
  ['Locate', 'Turn the detection into a point cloud and take its centroid', 'Depth from the ZED-M stereo camera'],
  ['Transform', 'Convert camera coordinates into right-arm coordinates', 'Geometry'],
  ['Reach', 'Bring the hand close to the pod', 'Inverse kinematics (IK)'],
  ['Align', 'Close the last centimeters until the cutter straddles the stem', 'Diffusion Policy'],
  ['Cut and grasp', 'Change the hand aperture to cut the stem and hold the pod', 'Aperture control'],
  ['Stow', 'Drop the pod in the basket on the left arm and move to the next plant', 'Fixed motion'],
] as const;

export function OkraHarvestPage() {
  const { locale } = useLocale();
  useSeo('insights/okra-harvest', { scrollToTop: true });

  return (
    <Layout>
      {locale === 'ja' ? <JaArticle /> : <EnArticle />}
      <CTASection />
      <Footer />
    </Layout>
  );
}

function JaArticle() {
  const l = useLocaleHref();

  return (
    <>
      <ArticleHero
        eyebrow="現場レポート"
        title="ヒューマノイドに屋外でオクラを収穫させる"
        lead="2026年6月から9月まで、トヨタ車体研究所と共同で、ヒューマノイドによるオクラ収穫に取り組みました。屋外の圃場で実を掴むところまで到達した70日間で、何をAIに任せ、何を任せなかったかを整理します。"
        date="2026年9月17日"
      />

      <ArticleBody>
        <P>
          農業の収穫は、屋外で、対象の位置も形も毎回違う作業です。ヒューマノイドで自動化した先行事例はほとんどなく、参照できる文献も限られています。このPoCは、その条件で実際にどこまで動くのかを確かめるために走らせました。
        </P>
        <P>
          結果として、屋外の圃場でオクラを検出し、ハンドを伸ばして実を掴むところまで到達しました。屋内の検証環境での把持成功率は20回中16回、開発日数は70日です。切断用のカッターを作り込むところで時間切れとなり、収穫工程の完走までは届いていません。
        </P>
        <Note>
          この記事は、実装の進め方と設計判断をまとめたものです。使用したモデルやデータ収集の手順といった技術的な詳細は、開発を担当した上田による
          <a
            href={NOTE_REPORT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-600 underline underline-offset-4 hover:text-orange-700"
          >
            noteの記事
          </a>
          にあります。
        </Note>

        <H2>何を組んだか</H2>
        <P>
          機体はUnitree G1です。胸部にZED-Mステレオカメラを固定してオクラを検出し、右手にはハンドとカッター用のアタッチメント、左腕には収穫した実を入れるカゴを取り付けました。背中にJetson
          Orinとバッテリーを積み、推論はすべて機体の上で完結させています。
        </P>
        <P>
          収穫の流れはロボットOS上でワークフローとして定義し、1サイクルを次の8工程に分けました。
        </P>
        <Table
          head={['工程', 'やっていること', '使っている技術']}
          rows={CYCLE_JA.map((row) => [...row])}
          caption="オクラ1本あたりの処理。この8工程をループさせる"
        />

        <H2>AIに任せる範囲を先に絞る</H2>
        <P>
          この8工程のうち、学習したモデルが動かしているのは「位置合わせ」だけです。歩行も、検出から座標算出も、腕を実の近くまで伸ばす動作も、古典的な制御と幾何計算でやっています。
        </P>
        <P>
          実際、YOLOとステレオカメラと逆運動学の組み合わせだけで、実の近くまでは手を伸ばせます。計算量が少なく、動きも速く、学習データも要りません。モデルが必要になるのは、風で株が揺れ、日光でコントラストが変わり、葉が実を隠すという、事前に書き下せない残りの数センチです。
        </P>
        <P>
          AIに任せる範囲を広げるほど、動作の不確実性が上がり、必要なデータ量とデバッグの手間が増えます。先にロボットの動きの流れを固定し、本当にAIでなければ吸収できない部分だけを切り出す。この線引きが、開発期間をそのまま決めます。
        </P>

        <H2>データの品質を見られる状態にしておく</H2>
        <P>
          学習したモデルが期待どおりに動かないとき、原因の候補は、データの質、データの量、収集時と実行時の環境差など多数あります。従来の制御ならコードを読めば動きの理由が分かりますが、学習したモデルではコードを読んでも分かりません。どのデータで学習させたかを確認することが、事実上唯一のデバッグ手段になります。
        </P>
        <P>
          そのため、データを後から見返せる単位に保つことが設計上の制約になります。今回は1エピソードを2秒に切りました。500エピソードなら合計1,000秒で、品質の確認が現実的な範囲に収まります。同じ500エピソードでも1本60秒にすれば、確認すべき映像は30倍になります。工程を長く取るほど、デバッグの手間は加速度的に増えます。
        </P>
        <P>
          切断まで学習に含めなかったのも同じ理由です。切断の学習データを揃えるには、実を500本以上落とすことになります。実を落とさずに繰り返し収集できる「位置合わせ」と、確実に再現できる「切断」を分けたほうが、同じ圃場から取れるデータの量が増えます。
        </P>

        <H2>現場で効いた細かい判断</H2>
        <Ul>
          <Li>
            動作データは相対表現で持つ。「今の状態からどう動かすか」で記録しておくと、絶対位置に依存せず、別の場所で撮ったデータも使える
          </Li>
          <Li>
            ハンド先のカメラは魚眼にする。通常のレンズだと画面の大部分を対象物が占めてしまい、周囲の文脈が写らない
          </Li>
          <Li>
            データ収集は方式を使い分ける。ロボットを直接動かす方式は精度が高い代わりに時間がかかり、カメラで人の手元の軌道を取る方式は精度が落ちる代わりに3倍以上の速さで集まる
          </Li>
          <Li>
            実機に出す前に、圃場と屋内環境を3Dスキャンしてシミュレーションに取り込み、フロー全体を通しておく
          </Li>
        </Ul>

        <H2>屋外がPoCに持ち込む条件</H2>
        <P>
          屋外は、認識の難しさだけでなく、機体側の制約も持ち込みます。二足歩行は姿勢の維持と移動に電力を使い、G1のバッテリーは2時間ほどで切れます。移動が多い日はそれより短くなります。加えて、物を掴むときに下半身が揺れるとカメラも揺れ、把持の成功率が落ちます。
        </P>
        <P>
          この2点から、収穫のように屋外を長時間動き回る作業では、下半身を車輪にしたセミヒューマノイドのほうが条件に合うと考えています。バッテリーは6時間程度まで伸び、上体も安定します。二足である必要があるのは、工場で車体の内部に入り込むような、しゃがんで狭い空間に入る作業のほうです。
        </P>

        <H2>このPoCで作りたかったもの</H2>
        <P>
          目的はオクラ収穫そのものだけではありません。対象物を検出し、近くまで古典制御で運び、最後の数センチを学習したモデルで詰めるという構成は、収穫に限りません。工場や建設現場の作業にも、同じ形で持ち込めます。今回確立した開発手法を、後続の現場にそのまま転用できるソフトウェア基盤にすることが、このPoCの本来の狙いです。
        </P>
        <P>
          Orbohはエンジニアが現場に入り、タスクを絞り、ワークフローを固定してヒューマノイドを実装します。今回のオクラ収穫は、その進め方を屋外という一番条件の悪い場所で試した記録です。
        </P>

        <H3>協力</H3>
        <Ul>
          <Li>トヨタ車体研究所</Li>
          <Li>鹿児島県農業開発支援センター</Li>
          <Li>九州工業大学のインターン生および関係者</Li>
        </Ul>

        <Related
          title="関連"
          items={[
            {
              label: '農業ヒューマノイド — 収穫の自動化',
              to: l('/agri'),
              note: '収穫工程へのヒューマノイド実装と、早期パートナーの募集',
            },
            {
              label: 'Orbohのヒューマノイド実装（FDE）',
              to: l('/'),
              note: 'エンジニアが現場に入り、ヒューマノイドを実装するまでの進め方',
            },
            {
              label: '深圳のロボット産業はいまどうなっているか',
              to: l('/insights/shenzhen-robotics'),
              note: '機体と部品がどこから来ているかを産業構造として整理したレポート',
            },
            {
              label: 'オクラ収穫プロジェクトの技術レポート（note）',
              href: NOTE_REPORT_URL,
              note: 'モデル・データ収集・学習環境まで含めた、開発担当による詳細',
            },
          ]}
        />
      </ArticleBody>
    </>
  );
}

function EnArticle() {
  const l = useLocaleHref();

  return (
    <>
      <ArticleHero
        eyebrow="FIELD REPORT"
        title="Making a humanoid harvest okra outdoors"
        lead="From June to September 2026 we ran a humanoid okra harvesting PoC with Toyota Auto Body Research. In the 70 days it took to grasp a pod in an open field, here is what we handed to a learned policy and what we deliberately did not."
        date="17 September 2026"
      />

      <ArticleBody>
        <P>
          Harvesting happens outdoors, and the target sits in a different place and a different shape every
          time. Almost nobody has automated it with a humanoid, and there is little prior work to copy. We ran
          this PoC to find out how far the current stack actually gets under those conditions.
        </P>
        <P>
          It got to the point where the robot finds an okra pod in an open field, reaches for it and grasps it.
          In an indoor test setup the grasp succeeded 16 times out of 20. Development took 70 days. We ran out
          of time while building the cutter, so the full harvest cycle is not closed yet.
        </P>
        <Note>
          This is a write-up of how the work was sequenced and where the design lines were drawn. The
          engineering detail — models, data collection, training setup — is in the
          <a
            href={NOTE_REPORT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-600 underline underline-offset-4 hover:text-orange-700"
          >
            {' '}
            report by Ueda, who led the build
          </a>
          .
        </Note>

        <H2>What we put together</H2>
        <P>
          The robot is a Unitree G1. A ZED-M stereo camera is fixed to its chest to find the pods, the right
          hand carries a gripper and a mount for the cutter, and a basket for the harvested pods hangs off the
          left arm. A Jetson Orin and a battery ride on its back, so all inference runs on the machine itself.
        </P>
        <P>
          The harvest is defined as a workflow on the robot OS, and one cycle is split into these eight steps.
        </P>
        <Table
          head={['Step', 'What happens', 'How']}
          rows={CYCLE_EN.map((row) => [...row])}
          caption="One pod, start to finish. The eight steps run in a loop."
        />

        <H2>Decide what the model is allowed to do, first</H2>
        <P>
          Of those eight steps, a learned policy drives exactly one: the alignment. Walking, detection,
          coordinate math and the reach itself are all classical control and geometry.
        </P>
        <P>
          YOLO, a stereo camera and inverse kinematics are enough to put the hand near the pod. That path is
          cheap to compute, fast to execute, and needs no training data at all. What needs a model is the last
          few centimeters, where the plant moves in the wind, the contrast shifts with the sun and a leaf hides
          the pod — the part you cannot write down in advance.
        </P>
        <P>
          Every step you hand to a model adds uncertainty, and with it more data to collect and more failure
          modes to debug. Fix the sequence of motions first, then carve out only the part that genuinely
          requires a policy. That line is what sets your development time.
        </P>

        <H2>Keep the training data small enough to inspect</H2>
        <P>
          When a policy does not behave, the candidate causes are the data quality, the amount of data, or a
          change between collection and execution. With conventional control you read the code to understand a
          motion; with a learned policy the code tells you nothing. Checking what it was trained on is
          effectively the only debugging method you have.
        </P>
        <P>
          That turns data reviewability into a design constraint. We cut episodes at two seconds. Five hundred
          episodes is then 1,000 seconds of footage, which a person can actually go through. Keep the same 500
          episodes but make each one 60 seconds and you have thirty times the footage to inspect. The longer the
          task you hand over, the faster debugging cost grows.
        </P>
        <P>
          The cut is excluded from the policy for the same reason. Training the cut would mean dropping more
          than 500 pods to collect it. Splitting the repeatable alignment from the deterministic cut gets far
          more usable data out of the same field.
        </P>

        <H2>Small decisions that mattered</H2>
        <Ul>
          <Li>
            Record actions as relative motion. &ldquo;Where to move from here&rdquo; does not depend on absolute
            position, so data collected elsewhere stays usable
          </Li>
          <Li>
            Use a fisheye lens on the gripper camera. With a normal lens the target fills the frame and none of
            the surrounding context is captured
          </Li>
          <Li>
            Mix your collection methods. Moving the robot directly gives precise data but costs hours; filming a
            human hand trajectory is less precise and more than three times faster
          </Li>
          <Li>
            Before going to the robot, 3D-scan the field and the indoor rig, load them into simulation and run
            the whole flow there
          </Li>
        </Ul>

        <H2>What outdoors adds to the problem</H2>
        <P>
          Outdoors is not only harder to perceive; it constrains the machine. Bipedal walking spends power on
          staying upright and moving, and the G1 runs about two hours on a charge — less on a day with a lot of
          walking. On top of that, a lower body that sways while the hand closes moves the camera with it, and
          the grasp success rate drops.
        </P>
        <P>
          For work like harvesting, which means covering ground outdoors for hours, a semi-humanoid on wheels
          fits the conditions better: roughly six hours of battery and a steadier upper body. Legs earn their
          keep somewhere else — crouching into the inside of a car body on a factory line, for instance.
        </P>

        <H2>What the PoC was really for</H2>
        <P>
          The goal was never okra alone. Detect the target, carry the arm most of the way with classical
          control, close the last centimeters with a learned policy: that structure is not specific to
          harvesting. It transfers to factory and construction tasks in the same shape. Building a software base
          that carries to the next site is what this PoC was actually for.
        </P>
        <P>
          Orboh puts engineers on site, narrows the task, fixes the workflow and implements the robot. The okra
          harvest is that method tried in the least forgiving place we could find.
        </P>

        <H3>With</H3>
        <Ul>
          <Li>Toyota Auto Body Research</Li>
          <Li>Kagoshima Prefectural Agricultural Development Support Center</Li>
          <Li>Interns and faculty from Kyushu Institute of Technology</Li>
        </Ul>

        <Related
          title="Related"
          items={[
            {
              label: 'Humanoid robots for agriculture',
              to: l('/agri'),
              note: 'Putting humanoids into the harvest, and the farms we are looking for',
            },
            {
              label: 'Orboh as a humanoid FDE',
              to: l('/'),
              note: 'How our engineers take a site from task to working robot',
            },
            {
              label: 'The full technical report on the okra project',
              href: NOTE_REPORT_URL,
              note: 'Models, data collection and training setup, by the engineer who led the build',
            },
          ]}
        />
      </ArticleBody>
    </>
  );
}
