import scaffoldAssemblyImage from '../assets/case-study/scaffold_assembly.jpg';
import scaffoldStairsImage from '../assets/case-study/climbing_up_scaffolding.jpg';
import transportingMaterialsImage from '../assets/case-study/transporting_materials.jpg';
import constructionInspectionImage from '../assets/case-study/construction_inspection.jpg';

export type Locale = 'en' | 'ja';

export const translations = {
  en: {
    hero: {
      eyebrow: 'VLA-POWERED PHYSICAL LABOR',
      title: 'Redefining physical labor\nwith intelligent\nhumanoid robots.',
      subtitle:
        'Construction, manufacturing, logistics, agriculture.\nNo CapEx. 24/7. Smarter with every shift.',
      scroll: 'Scroll',
      scrollAria: 'Scroll to next section',
    },
    caseStudy: {
      eyebrow: 'CONSTRUCTION — FIRST VERTICAL',
      title: 'What robots can do on a construction site.',
      demos: [
        {
          number: '01',
          title: 'Scaffolding assembly',
          quote: 'Robots handle repetitive tasks so workers can focus on skilled work—site setup accelerates and readiness is consistent.',
          description:
            'Robots assemble site-wide scaffolding in advance so everything is ready before workers arrive. They don’t require skilled craftsmanship for these tasks.',
          imageAlt: 'Scaffolding assembly',
          imageSrc: scaffoldAssemblyImage,
          features: [
            { icon: 'mdi:cog', title: 'Pre-assembly', description: 'Scaffolding ready before the team arrives.' },
            { icon: 'mdi:clock-fast', title: 'Faster setup', description: 'Shorten site preparation time.' },
            { icon: 'mdi:shield-check', title: 'Consistent quality', description: 'Repeatable, reliable assembly.' },
          ],
        },
        {
          number: '02',
          title: 'Climbing scaffold stairs',
          quote: 'Moves freely on narrow scaffold stairs—same routes as humans for material transport and work at height.',
          description:
            'The robot uses the same narrow stairways and paths as workers. For material transport and high-place work, it reaches the same areas without special infrastructure.',
          imageAlt: 'Scaffold stairs',
          imageSrc: scaffoldStairsImage,
          features: [
            { icon: 'mdi:stairs', title: 'Human-like routes', description: 'Uses existing scaffold access paths.' },
            { icon: 'mdi:package-variant', title: 'Material transport', description: 'Carries materials to the work area.' },
            { icon: 'mdi:arrow-up-down', title: 'Vertical mobility', description: 'Accesses construction work areas at heights.' },
          ],
        },
        {
          number: '03',
          title: 'Transporting materials',
          quote: 'Heavy materials are carried safely through human-robot collaboration—from outside the scaffold to the interior.',
          description:
            'Lumber and building materials are moved efficiently in tandem with workers. From outside the scaffold to the interior, human-robot collaboration keeps the flow steady and safe.',
          imageAlt: 'Material transport',
          imageSrc: transportingMaterialsImage,
          features: [
            { icon: 'mdi:handshake', title: 'Collaborative carry', description: 'Works alongside human workers.' },
            { icon: 'mdi:weight', title: 'Heavy loads', description: 'Handles lumber and building materials.' },
            { icon: 'mdi:map-marker-path', title: 'End-to-end', description: 'From outside to interior of the scaffold.' },
          ],
        },
        {
          number: '04',
          title: 'Cleaning and inspection',
          quote: 'Detailed inspection and documentation—from screw points to quality checks—supports site quality control.',
          description:
            'Performs detailed inspection tasks such as photographing screw points on lumber with a smartphone. Supports quality control and record-keeping on site.',
          imageAlt: 'Cleaning and inspection',
          imageSrc: constructionInspectionImage,
          features: [
            { icon: 'mdi:camera', title: 'Documentation', description: 'Capture details for inspection.' },
            { icon: 'mdi:clipboard-check', title: 'Quality checks', description: 'Support site quality control workflows.' },
            { icon: 'mdi:broom', title: 'Cleaning', description: 'Keep work areas tidy for safety.' },
          ],
        },
      ],
    },
    raas: {
      eyebrow: 'PHASE 1 — ROBOT-AS-A-SERVICE',
      title: 'Deploy robots. Pay for labor hours. Nothing else.',
      subtitle: 'No hardware purchase. No maintenance overhead. No facility modification. Orboh robots operate 24/7 in human-designed environments — the same scaffolding, stairs, and passageways your workers already use.',
      cards: [
        { icon: 'mdi:clock-outline', title: 'No CapEx', description: 'Pay per hour or per month. Predictable costs, zero upfront investment.' },
        { icon: 'mdi:clock-check-outline', title: '24/7 Availability', description: 'Robots do not take breaks, call in sick, or require shift rotations.' },
        { icon: 'mdi:brain', title: 'Gets smarter every shift', description: 'Each deployment generates experience data. Your robots improve automatically.' },
        { icon: 'mdi:domain', title: 'No facility modification', description: 'Operates in human-designed environments without retrofitting.' },
      ],
      verticals: { label: 'Verticals', items: ['Construction', 'Manufacturing', 'Logistics', 'Agriculture'] },
    },
    fleetseek: {
      eyebrow: 'PHASE 2 — FLEETSEEK: THE SKILL MARKET FOR PHYSICAL AI',
      title: 'A standalone robot learns from itself.\nAn Orboh robot learns from every robot in the network.',
      subtitle: 'FleetSeek is the skill market for physical AI — robots autonomously share the data they collect on-site. As more robots join from different worksites around the world, the system gets smarter for everyone.',
      analogy: 'Slack became indispensable by being the place where teams communicate. FleetSeek becomes indispensable by being the place where robots learn.',
      layers: [
        { number: '01', title: 'Skill Feed', description: 'Real-time stream of robot skill data from sites worldwide. See what robots are doing, learning, and encountering across the network.', icon: 'mdi:rss' },
        { number: '02', title: 'Data Registry', description: "Structured catalog of experience data organized by task type, environment, and robot model. The world's most comprehensive physical-AI dataset.", icon: 'mdi:database-outline' },
        { number: '03', title: 'Model Marketplace', description: 'Trained models published, evaluated, and deployed. Buy, sell, or contribute specialized robot behaviors.', icon: 'mdi:store-outline' },
      ],
      pricing: {
        label: 'Freemium SaaS',
        tiers: [
          { name: 'Free', detail: 'Up to 5 robots · Read-only access' },
          { name: 'Pro', detail: 'Per robot / month · Full access' },
          { name: 'Enterprise', detail: 'Custom · Dedicated support' },
        ],
      },
    },
    demoVideo: {
      eyebrow: 'DEMO VIDEO',
      title: 'See Orboh robots at work',
      placeholder: 'Video embed will go here',
      placeholderHint: 'Set your YouTube URL',
    },
    whitepaper: {
      eyebrow: 'WHITEPAPER',
      title: 'FleetSeek White Paper',
      subtitle: 'Our technical approach to VLA-powered humanoid robotics, the FleetSeek shared intelligence network, and the physical labor market opportunity.',
      downloadButton: 'Download PDF',
    },
    cta: {
      title: 'Ready to deploy intelligent robots?',
      subtitle: 'We offer live demos for construction, manufacturing, and logistics teams. See RaaS pricing and FleetSeek access.',
      button: 'Book a demo',
      whitepaper: 'Download Whitepaper',
    },
    footer: {
      tagline: 'VLA-POWERED PHYSICAL LABOR PLATFORM.',
      columns: {
        company: {
          title: 'Company',
          links: ['About', 'Team', 'Careers'],
        },
        social: {
          title: 'Social',
          links: ['X', 'LinkedIn', 'GitHub', 'YouTube'],
        },
        legal: {
          title: 'Legal',
          links: ['Terms of Use', 'Privacy & Cookies', 'Support'],
        },
      },
      copyright: '© Orboh 2026',
    },
  },
  ja: {
    hero: {
      eyebrow: 'VLA-POWERED PHYSICAL LABOR',
      title: 'VLAを搭載したロボットで、\n労働の未来を\n再定義する。',
      subtitle:
        '建設・製造・物流・農業。初期費用ゼロ。24時間稼働。\nシフトを重ねるたびに賢くなる。',
      scroll: 'Scroll',
      scrollAria: '次のセクションへスクロール',
    },
    caseStudy: {
      eyebrow: 'CONSTRUCTION — FIRST VERTICAL',
      title: '建設現場でロボットができること。',
      demos: [
        {
          number: '01',
          title: '足場の組み立て',
          quote: '単調な作業をロボットが担当し、現場の立ち上げが加速。準備が一貫して整います。',
          description:
            '職人技を必要としない作業をロボットが担当。家全体を囲う足場を事前に組み立て、大工さんが現場に来る前に準備を完了させます。',
          imageAlt: '足場の組み立て',
          imageSrc: scaffoldAssemblyImage,
          features: [
            { icon: 'mdi:cog', title: '事前組み立て', description: 'チーム到着前に足場を準備。' },
            { icon: 'mdi:clock-fast', title: '立ち上げの短縮', description: '現場準備時間を削減。' },
            { icon: 'mdi:shield-check', title: '品質の一貫性', description: '繰り返し可能な組み立て。' },
          ],
        },
        {
          number: '02',
          title: '足場の階段を登る',
          quote: '狭い足場の階段を自在に移動。資材運搬や高所作業も人間と同じ動線で。',
          description:
            '狭い足場の階段を自在に移動。資材運搬や高所作業の際も、人間と同じ動線で作業エリアにアクセスできます。',
          imageAlt: '足場の階段',
          imageSrc: scaffoldStairsImage,
          features: [
            { icon: 'mdi:stairs', title: '人間と同じ動線', description: '既存の足場でアクセス。' },
            { icon: 'mdi:package-variant', title: '資材運搬', description: '作業エリアまで運搬。' },
            { icon: 'mdi:arrow-up-down', title: '高所移動', description: '安全に高所で移動。' },
          ],
        },
        {
          number: '03',
          title: '資材運搬',
          quote: '重い資材も人とロボットの協働で安全に。足場の外から内部まで効率よく。',
          description:
            '重い資材も、人間とロボットの協働で安全に運搬。足場の外から内部まで、木材や建材を効率よく移動させます。',
          imageAlt: '資材運搬',
          imageSrc: transportingMaterialsImage,
          features: [
            { icon: 'mdi:handshake', title: '協働運搬', description: '作業者と一緒に搬送。' },
            { icon: 'mdi:weight', title: '重い荷物', description: '木材・建材を扱う。' },
            { icon: 'mdi:map-marker-path', title: '一貫したルート', description: '外から内部まで。' },
          ],
        },
        {
          number: '04',
          title: '清掃・点検作業',
          quote: 'ネジ打ちの撮影から品質管理まで、細かな点検で現場をサポート。',
          description:
            'スマートフォンで木材のネジ打ち部分を撮影するなど、細かな点検作業も実施。現場の品質管理をサポートします。',
          imageAlt: '清掃点検',
          imageSrc: constructionInspectionImage,
          features: [
            { icon: 'mdi:camera', title: '撮影記録', description: '点検内容を撮影。' },
            { icon: 'mdi:clipboard-check', title: '品質チェック', description: '現場QCを支援。' },
            { icon: 'mdi:broom', title: '清掃', description: '作業エリアを整備。' },
          ],
        },
      ],
    },
    raas: {
      eyebrow: 'PHASE 1 — ロボット・アズ・ア・サービス',
      title: 'ロボットを導入する。労働時間分だけ払う。それだけ。',
      subtitle: 'ハードウェア購入不要。メンテナンス不要。設備改修不要。Orbohのロボットは、現場の既存環境のまま24時間稼働します。',
      cards: [
        { icon: 'mdi:clock-outline', title: '初期費用ゼロ', description: '時間単位または月単位の料金制。予測可能なコスト。' },
        { icon: 'mdi:clock-check-outline', title: '24時間365日稼働', description: '休憩なし、欠勤なし、シフト管理不要。' },
        { icon: 'mdi:brain', title: 'シフトを重ねるほど賢くなる', description: '稼働のたびに経験データを生成。ロボットは自動的に改善されます。' },
        { icon: 'mdi:domain', title: '設備改修不要', description: '人間向けに設計された既存環境でそのまま動作します。' },
      ],
      verticals: { label: '対応業界', items: ['建設', '製造', '物流', '農業'] },
    },
    fleetseek: {
      eyebrow: 'PHASE 2 — FLEETSEEK: PHYSICAL AIのスキルマーケット',
      title: '単独のロボットは自分の経験から学ぶ。\nOrbohのロボットは、ネットワーク全体から学ぶ。',
      subtitle: 'FleetSeekはPhysical AIのためのスキルマーケットです。ロボットが現場で収集したデータをロボット自身が自律的に共有します。世界中の多様な現場からロボットが参加するほど、システム全体がより賢くなります。',
      analogy: 'Slackはチームがコミュニケーションをとる場所として不可欠になった。FleetSeekはロボットが学習する場所として不可欠になる。',
      layers: [
        { number: '01', title: 'スキルフィード', description: '世界中の現場からロボットのスキルデータをリアルタイムに配信。ネットワーク全体の動きをリアルタイムで把握。', icon: 'mdi:rss' },
        { number: '02', title: 'データレジストリ', description: 'タスクタイプ・環境・ロボットモデル別に整理された経験データのカタログ。世界最大の物理AIデータセット。', icon: 'mdi:database-outline' },
        { number: '03', title: 'モデルマーケットプレイス', description: 'トレーニング済みモデルを公開・評価・デプロイ。特定用途のロボット行動を売買・提供できます。', icon: 'mdi:store-outline' },
      ],
      pricing: {
        label: 'フリーミアム SaaS',
        tiers: [
          { name: 'Free', detail: '最大5台 · 読み取り専用' },
          { name: 'Pro', detail: '1台あたり / 月 · フルアクセス' },
          { name: 'Enterprise', detail: 'カスタム · 専任サポート' },
        ],
      },
    },
    demoVideo: {
      eyebrow: 'DEMO VIDEO',
      title: 'Orbohロボットの稼働映像',
      placeholder: '動画をここに埋め込み',
      placeholderHint: 'YouTube URLを設定してください',
    },
    whitepaper: {
      eyebrow: 'ホワイトペーパー',
      title: 'FleetSeek ホワイトペーパー',
      subtitle: 'VLA搭載ヒューマノイドロボティクスの技術的アプローチ、FleetSeek共有知能ネットワーク、および物理労働市場の機会についての詳細。',
      downloadButton: 'PDFをダウンロード',
    },
    cta: {
      title: 'インテリジェントなロボットを現場に導入しませんか？',
      subtitle: '建設・製造・物流チーム向けにライブデモを提供しています。RaaS料金とFleetSeekアクセスについてご相談ください。',
      button: 'デモを予約する',
      whitepaper: 'ホワイトペーパーをダウンロード',
    },
    footer: {
      tagline: 'VLAを搭載した物理労働プラットフォーム。',
      columns: {
        company: {
          title: 'Company',
          links: ['About', 'Team', 'Careers'],
        },
        social: {
          title: 'Social',
          links: ['X', 'LinkedIn', 'GitHub', 'YouTube'],
        },
        legal: {
          title: 'Legal',
          links: ['利用規約', 'プライバシーとクッキー', 'サポート'],
        },
      },
      copyright: '© Orboh 2026',
    },
  },
} as const;
