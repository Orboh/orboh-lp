import { Layout } from '@/components/Layout';
import { Footer } from '@/components/Footer/Footer';
import { useLocale } from '@/contexts/LocaleContext';
import { useSeo } from '@/seo/useSeo';

const DISCORD_URL = 'https://discord.gg/fDAWmeTV6f';

/**
 * Placeholder careers page. We deliberately publish no roles, no team size and
 * no process here — the page exists so the URL is live and so anyone looking
 * for openings lands in the Discord, where we announce them first.
 */
export function HiringPage() {
  const { locale } = useLocale();
  const ja = locale === 'ja';

  useSeo('hiring', { scrollToTop: true });

  return (
    <Layout>
      <section className="px-8 md:px-16 lg:px-24 pt-36 pb-16 md:pb-20 bg-zinc-950 text-zinc-50">
        <div className="max-w-5xl mx-auto w-full">
          <p className="text-orange-400 text-xs tracking-widest uppercase mb-5">HIRING</p>
          <h1
            className="font-mono text-3xl sm:text-4xl md:text-5xl font-normal mb-6"
            style={{ letterSpacing: '-0.02em' }}
          >
            {ja ? '採用情報は準備中です' : 'No open roles listed yet'}
          </h1>
          <p className="text-zinc-300 text-base md:text-lg max-w-2xl leading-relaxed">
            {ja
              ? 'このページにはまだ募集要項を掲載していません。募集を始めるときは、Discord コミュニティで最初にお知らせします。'
              : 'We are not publishing any positions on this page yet. When we open one, we announce it in our Discord community first.'}
          </p>
        </div>
      </section>

      <section className="px-8 md:px-16 lg:px-24 py-16 md:py-24 bg-zinc-50">
        <div className="max-w-5xl mx-auto w-full">
          <div className="rounded border border-zinc-200 bg-white p-8 sm:p-10">
            <h2
              className="font-mono text-xl md:text-2xl font-normal text-zinc-900 mb-4"
              style={{ letterSpacing: '-0.01em' }}
            >
              {ja ? '最新情報は Discord で' : 'Updates go out on Discord'}
            </h2>
            <p className="text-sm md:text-base text-zinc-600 leading-relaxed mb-8 max-w-2xl">
              {ja
                ? '採用に関するアップデートを知りたい方は、Discord に参加してお待ちください。'
                : 'If you want to hear about hiring updates, join the Discord and watch for the announcement.'}
            </p>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold tracking-wide text-white rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95"
              style={{ backgroundColor: '#5865F2' }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5 shrink-0"
                aria-hidden
              >
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.042.033.055a19.83 19.83 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.07 13.07 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              {ja ? 'Discord に参加' : 'Join Discord'}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </Layout>
  );
}
