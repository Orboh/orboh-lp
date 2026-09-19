import { Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Footer } from '@/components/Footer/Footer';
import { CTASection } from '@/components/CTA';
import { useLocale, useLocaleHref } from '@/contexts/LocaleContext';
import { articlesFor } from '@/content/insights/articles';
import { useSeo } from '@/seo/useSeo';
import { sectionInner, sectionPad } from '@/components/ui';

export function InsightsIndexPage() {
  const { locale } = useLocale();
  const l = useLocaleHref();
  const ja = locale === 'ja';
  const articles = articlesFor(locale);

  useSeo('insights', { scrollToTop: true });

  return (
    <Layout>
      <section className={`${sectionPad} pt-36 pb-20 md:pb-24 bg-carbon text-canvas`}>
        <div className={sectionInner}>
          <div className="border-t border-carbon-hairline pt-3.5"><p className="type-label text-carbon-muted">INSIGHTS</p></div>
          <h1 className="type-display-lg text-[2.4rem] sm:text-[3.4rem] lg:text-[4.2rem] mt-7 mb-6">
            {ja ? '現場からのレポート' : 'Field notes'}
          </h1>
          <p className="text-carbon-muted text-[19px] max-w-2xl leading-[1.95]">
            {ja
              ? 'ヒューマノイドを現場に実装する過程で見えたこと、その裏側にあるサプライチェーン、実際に機能した方法を記録しています。'
              : 'What we learn putting humanoids to work on real sites, the supply chain behind them, and the approaches that actually hold up.'}
          </p>
        </div>
      </section>

      <section className={`${sectionPad} py-20 md:py-24 bg-canvas`}>
        <div className={sectionInner}>
          {articles.length === 0 ? (
            <p className="text-muted">
              {ja ? '記事を準備しています。' : 'Articles are on the way.'}
            </p>
          ) : (
            <ul className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
              {articles.map((article) => (
                <li key={article.path}>
                  <Link
                    to={l(article.path)}
                    className="group flex h-full flex-col border-t border-ink pt-4"
                  >
                    <div className="mb-4 flex items-center gap-3 type-label">
                      <span className="text-accent">{article.tag}</span>
                      <span className="text-muted">{article.date}</span>
                    </div>
                    <h2 className="type-display text-xl md:text-2xl text-ink mb-4 group-hover:text-accent transition-colors duration-150">
                      {article.title}
                    </h2>
                    <p className="text-sm text-muted leading-[1.9]">{article.excerpt}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <CTASection />
      <Footer />
    </Layout>
  );
}
