import { Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Footer } from '@/components/Footer/Footer';
import { useLocale, useLocaleHref } from '@/contexts/LocaleContext';

export function NotFoundPage() {
  const { locale } = useLocale();
  const l = useLocaleHref();
  const ja = locale === 'ja';

  return (
    <Layout>
      <section className="px-8 md:px-16 lg:px-24 pt-40 pb-32 bg-zinc-950 text-zinc-50 min-h-[70vh] flex items-center">
        <div className="max-w-3xl mx-auto w-full">
          <p className="text-orange-400 text-xs tracking-widest uppercase mb-5">404</p>
          <h1
            className="font-mono text-3xl md:text-4xl font-normal mb-6"
            style={{ letterSpacing: '-0.02em' }}
          >
            {ja ? 'ページが見つかりませんでした' : 'Page not found'}
          </h1>
          <p className="text-zinc-400 mb-10 max-w-xl">
            {ja
              ? 'お探しのページは移動または削除された可能性があります。'
              : 'The page you are looking for may have been moved or removed.'}
          </p>
          <Link
            to={l('/')}
            className="inline-flex items-center justify-center px-6 py-3 bg-zinc-50 text-zinc-950 text-xs font-semibold tracking-widest uppercase rounded hover:bg-zinc-200 transition-colors"
          >
            {ja ? 'トップへ戻る' : 'Back to home'}
          </Link>
        </div>
      </section>
      <Footer />
    </Layout>
  );
}
