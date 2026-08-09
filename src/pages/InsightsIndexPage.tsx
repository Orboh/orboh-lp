import { Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Footer } from '@/components/Footer/Footer';
import { CTASection } from '@/components/CTA';
import { useLocale, useLocaleHref } from '@/contexts/LocaleContext';
import { articlesFor } from '@/content/insights/articles';
import { useSeo } from '@/seo/useSeo';

export function InsightsIndexPage() {
  const { locale } = useLocale();
  const l = useLocaleHref();
  const ja = locale === 'ja';
  const articles = articlesFor(locale);

  useSeo('insights', { scrollToTop: true });

  return (
    <Layout>
      <section className="px-8 md:px-16 lg:px-24 pt-36 pb-16 md:pb-20 bg-zinc-950 text-zinc-50">
        <div className="max-w-5xl mx-auto w-full">
          <p className="text-orange-400 text-xs tracking-widest uppercase mb-5">INSIGHTS</p>
          <h1
            className="font-mono text-3xl sm:text-4xl md:text-5xl font-normal mb-6"
            style={{ letterSpacing: '-0.02em' }}
          >
            {ja ? '現場からのレポート' : 'Field notes'}
          </h1>
          <p className="text-zinc-300 text-base md:text-lg max-w-2xl leading-relaxed">
            {ja
              ? 'ヒューマノイドを現場に実装する過程で見えたこと、その裏側にあるサプライチェーン、実際に機能した方法を記録しています。'
              : 'What we learn putting humanoids to work on real sites, the supply chain behind them, and the approaches that actually hold up.'}
          </p>
        </div>
      </section>

      <section className="px-8 md:px-16 lg:px-24 py-16 md:py-24 bg-zinc-50">
        <div className="max-w-5xl mx-auto w-full">
          {articles.length === 0 ? (
            <p className="text-zinc-500">
              {ja ? '記事を準備しています。' : 'Articles are on the way.'}
            </p>
          ) : (
            <ul className="grid gap-6 sm:grid-cols-2">
              {articles.map((article) => (
                <li key={article.path}>
                  <Link
                    to={l(article.path)}
                    className="group flex h-full flex-col rounded border border-zinc-200 bg-white p-7 transition-colors hover:border-zinc-400"
                  >
                    <div className="mb-4 flex items-center gap-3 text-xs tracking-widest uppercase">
                      <span className="text-orange-600">{article.tag}</span>
                      <span className="text-zinc-400">{article.date}</span>
                    </div>
                    <h2
                      className="font-mono text-xl md:text-2xl font-normal text-zinc-900 mb-4 group-hover:text-orange-600 transition-colors"
                      style={{ letterSpacing: '-0.01em' }}
                    >
                      {article.title}
                    </h2>
                    <p className="text-sm text-zinc-600 leading-relaxed">{article.excerpt}</p>
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
