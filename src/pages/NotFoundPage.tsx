import { Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Footer } from '@/components/Footer/Footer';
import { useLocale, useLocaleHref } from '@/contexts/LocaleContext';
import { btnSolidOnDark, sectionInner, sectionPad } from '@/components/ui';

export function NotFoundPage() {
  const { locale } = useLocale();
  const l = useLocaleHref();
  const ja = locale === 'ja';

  return (
    <Layout>
      <section className={`${sectionPad} pt-40 pb-32 bg-carbon text-canvas min-h-[70vh] flex items-center`}>
        <div className={sectionInner}>
          <div className="border-t border-carbon-hairline pt-3.5"><p className="type-label text-carbon-muted">404</p></div>
          <h1 className="type-display-lg text-[2.4rem] sm:text-[3.4rem] lg:text-[4.2rem] mt-7 mb-6">
            {ja ? 'ページが見つかりませんでした' : 'Page not found'}
          </h1>
          <p className="text-carbon-muted mb-10 max-w-xl leading-[1.95]">
            {ja
              ? 'お探しのページは移動または削除された可能性があります。'
              : 'The page you are looking for may have been moved or removed.'}
          </p>
          <Link
            to={l('/')}
            className={btnSolidOnDark}
          >
            {ja ? 'トップへ戻る' : 'Back to home'}
          </Link>
        </div>
      </section>
      <Footer />
    </Layout>
  );
}
