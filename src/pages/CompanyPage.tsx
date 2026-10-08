import { Layout } from '@/components/Layout';
import { Footer } from '@/components/Footer/Footer';
import { useLocale } from '@/contexts/LocaleContext';
import { useSeo } from '@/seo/useSeo';
import { ArrowOut, sectionInner, sectionPad } from '@/components/ui';

const CONTACT_FORM_URL = 'https://tally.so/r/2EzoQg';

type Row = { label: string; value: readonly string[] };

/**
 * Company profile as a plain two-column table. The head office is given to
 * the ward only: the registered street address is also a founder's home.
 */
const ROWS: Record<'ja' | 'en', readonly Row[]> = {
  ja: [
    { label: '社名', value: ['株式会社Orboh（英文表記 Orboh, Inc.）'] },
    { label: '設立', value: ['2026年5月1日'] },
    { label: '代表者', value: ['代表取締役 宮嶋 壯太'] },
    {
      label: '取締役',
      value: ['宮嶋 壯太（CEO）', '上田 康太（CTO）', '内山 絢登（COO）'],
    },
    { label: '本店', value: ['福岡県北九州市戸畑区'] },
    {
      label: '北九州オフィス',
      value: ['福岡県北九州市戸畑区', '九州工業大学 インキュベーション施設「未来テラス」'],
    },
    {
      label: '事業内容',
      value: [
        'ヒューマノイドロボットの現場実装（Forward Deployed Engineer）',
        'ヒューマノイドロボットのサービス提供（RaaS）',
        'ヒューマノイドハッカソン「Humanoid Hack」の企画・運営',
      ],
    },
  ],
  en: [
    { label: 'Company name', value: ['Orboh, Inc. (株式会社Orboh)'] },
    { label: 'Founded', value: ['May 1, 2026'] },
    { label: 'Representative', value: ['Sota Miyajima, CEO and Representative Director'] },
    {
      label: 'Directors',
      value: ['Sota Miyajima (CEO)', 'Kota Ueda (CTO)', 'Kento Uchiyama (COO)'],
    },
    { label: 'Head office', value: ['Tobata-ku, Kitakyushu, Fukuoka, Japan'] },
    {
      label: 'Kitakyushu office',
      value: [
        'Mirai Terrace, Kyushu Institute of Technology incubation facility',
        'Tobata-ku, Kitakyushu, Fukuoka, Japan',
      ],
    },
    {
      label: 'Business',
      value: [
        'Deploying humanoid robots on site (Forward Deployed Engineers)',
        'Humanoid robots as a service (RaaS)',
        'Organizing the Humanoid Hack hackathon series',
      ],
    },
  ],
};

export function CompanyPage() {
  const { locale } = useLocale();
  const ja = locale === 'ja';

  useSeo('company', { scrollToTop: true });

  return (
    <Layout>
      <section className={`${sectionPad} pt-36 pb-20 md:pb-24 bg-carbon text-canvas`}>
        <div className={sectionInner}>
          <div className="border-t border-carbon-hairline pt-3.5"><p className="type-label text-carbon-muted">COMPANY</p></div>
          <h1 className="type-display-lg text-[2.4rem] sm:text-[3.4rem] lg:text-[4.2rem] mt-7">
            {ja ? '会社概要' : 'Company'}
          </h1>
        </div>
      </section>

      <section className={`${sectionPad} py-20 md:py-24 bg-canvas`}>
        <div className={sectionInner}>
          <dl className="border-t border-ink">
            {ROWS[locale].map((row) => (
              <div
                key={row.label}
                className="grid gap-2 py-6 border-b border-hairline md:grid-cols-[200px_1fr] md:gap-10"
              >
                <dt className="type-label text-muted md:pt-1">{row.label}</dt>
                <dd className="text-[17px] leading-[1.85] text-ink">
                  {row.value.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </dd>
              </div>
            ))}
            <div className="grid gap-2 py-6 border-b border-hairline md:grid-cols-[200px_1fr] md:gap-10">
              <dt className="type-label text-muted md:pt-1">{ja ? 'お問い合わせ' : 'Contact'}</dt>
              <dd className="text-[17px] leading-[1.85]">
                <a
                  href={CONTACT_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-accent hover:text-ink transition-colors"
                >
                  {ja ? 'お問い合わせフォーム' : 'Contact form'}
                  <ArrowOut />
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <Footer />
    </Layout>
  );
}
