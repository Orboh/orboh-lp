import scaffoldAssemblyImage from '../assets/case-study/scaffold_assembly.jpg';
import scaffoldStairsImage from '../assets/case-study/climbing_up_scaffolding.jpg';
import transportingMaterialsImage from '../assets/case-study/transporting_materials.jpg';
import constructionInspectionImage from '../assets/case-study/construction_inspection.jpg';

export type Locale = 'en' | 'ja';

export const translations = {
  en: {
    hero: {
      eyebrow: 'HUMANOID ROBOTICS FOR CONSTRUCTION',
      title: 'Building the future of\nconstruction sites,\nwith robots.',
      subtitle:
        'Scaffolding assembly, material transport, inspection work.\nReducing the burden on workers and accelerating site setup.',
      scroll: 'Scroll',
      scrollAria: 'Scroll to next section',
    },
    caseStudy: {
      eyebrow: 'Our Capabilities',
      title: 'What we can do on the construction site.',
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
    howItWorks: {
      eyebrow: 'HOW IT WORKS',
      title: 'Teleoperation',
      para:
        'A human wearing a VR headset and controllers streams their motion to the robot in real time. By repeating the same actions, the robot learns patterns that can later be automated.',
    },
    demoVideo: {
      eyebrow: 'DEMO VIDEO',
      title: 'See the robot in action',
      placeholder: 'Video embed will go here',
      placeholderHint: 'Set your YouTube URL',
    },
    cta: {
      title: 'Bring robots to your construction site',
      subtitle: 'We offer live demos and adoption support for construction teams.',
      button: 'Book a demo',
    },
    footer: {
      tagline: 'HUMANOID ROBOTICS FOR CONSTRUCTION.',
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
      eyebrow: 'HUMANOID ROBOTICS FOR CONSTRUCTION',
      title: '建築現場の未来を、\nロボットとつくる。',
      subtitle:
        '足場の組み立て、資材の運搬、点検作業。\n職人の負担を減らし、現場の立ち上げを加速する。',
      scroll: 'Scroll',
      scrollAria: '次のセクションへスクロール',
    },
    caseStudy: {
      eyebrow: 'Our Capabilities',
      title: '建築現場で、何ができるか。',
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
          imageSrc: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80',
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
          imageSrc: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
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
          imageSrc: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80',
          features: [
            { icon: 'mdi:camera', title: '撮影記録', description: '点検内容を撮影。' },
            { icon: 'mdi:clipboard-check', title: '品質チェック', description: '現場QCを支援。' },
            { icon: 'mdi:broom', title: '清掃', description: '作業エリアを整備。' },
          ],
        },
      ],
    },
    howItWorks: {
      eyebrow: 'HOW IT WORKS',
      title: 'テレオペレーション',
      para:
        'VRゴーグルとコントローラーを装着した人の動きを、リアルタイムでロボットに伝送します。同じ動きを繰り返し学習させることで、後から自動化できるパターンとして身につけていきます。',
    },
    demoVideo: {
      eyebrow: 'DEMO VIDEO',
      title: 'ロボットの動作を見てみましょう',
      placeholder: '動画をここに埋め込み',
      placeholderHint: 'YouTube URLを設定してください',
    },
    cta: {
      title: 'デモを見てみませんか？',
      subtitle: 'ロボットの動作デモや、導入についてのご相談を承ります。',
      button: 'デモを予約する',
    },
    footer: {
      tagline: '建設現場のためのヒューマノイドロボティクス。',
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
