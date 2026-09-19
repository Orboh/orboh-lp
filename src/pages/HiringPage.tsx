import { Layout } from '@/components/Layout';
import { Footer } from '@/components/Footer/Footer';
import { useLocale } from '@/contexts/LocaleContext';
import { useSeo } from '@/seo/useSeo';
import { DiscordMark, btnSolid, sectionInner, sectionPad } from '@/components/ui';

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
      <section className={`${sectionPad} pt-36 pb-20 md:pb-24 bg-carbon text-canvas`}>
        <div className={sectionInner}>
          <div className="border-t border-carbon-hairline pt-3.5"><p className="type-label text-carbon-muted">HIRING</p></div>
          <h1 className="type-display-lg text-[2.4rem] sm:text-[3.4rem] lg:text-[4.2rem] mt-7 mb-6">
            {ja ? '採用情報は準備中です' : 'No open roles listed yet'}
          </h1>
          <p className="text-carbon-muted text-[19px] leading-[1.95] max-w-2xl">
            {ja
              ? 'このページにはまだ募集要項を掲載していません。募集を始めるときは、Discord コミュニティで最初にお知らせします。'
              : 'We are not publishing any positions on this page yet. When we open one, we announce it in our Discord community first.'}
          </p>
        </div>
      </section>

      <section className={`${sectionPad} py-20 md:py-24 bg-canvas`}>
        <div className={sectionInner}>
          <div className="border-t border-ink pt-6">
            <h2 className="type-display text-[1.95rem] sm:text-[2.4rem] lg:text-[2.9rem] text-ink mb-4">
              {ja ? '最新情報は Discord で' : 'Updates go out on Discord'}
            </h2>
            <p className="text-[19px] text-muted leading-[1.95] mb-8 max-w-2xl">
              {ja
                ? '採用に関するアップデートを知りたい方は、Discord に参加してお待ちください。'
                : 'If you want to hear about hiring updates, join the Discord and watch for the announcement.'}
            </p>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={btnSolid}
            >
              <DiscordMark className="size-5 shrink-0" />
              {ja ? 'Discord に参加' : 'Join Discord'}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </Layout>
  );
}
