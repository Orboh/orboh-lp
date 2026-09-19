import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Footer } from '@/components/Footer/Footer';
import { WhitepaperSection } from '@/components/Whitepaper';
import { useLocale, useLocaleHref } from '@/contexts/LocaleContext';
import { translations } from '@/i18n/translations';
import { useSeo } from '@/seo/useSeo';
import { ArrowOut, ArrowRight, DiscordMark, SectionHeading, btnOutlineOnDark, btnSolidOnDark, sectionInner, sectionPad } from '@/components/ui';

const FLEETSEEK_APP_URL = 'https://web-ebon-zeta-33.vercel.app/';
const FLEETSEEK_X_AUTH_URL = 'https://web-ebon-zeta-33.vercel.app/api/auth/x';
const DISCORD_URL = 'https://discord.gg/fDAWmeTV6f';
const CONTACT_FORM_URL = 'https://tally.so/r/2EzoQg';

export function FleetSeekPage() {
  const { locale } = useLocale();
  const t = translations[locale].fleetseekPage;
  const install = translations[locale].fleetseek.install;
  const contact = translations[locale].contact;
  const [copied, setCopied] = useState(false);
  const l = useLocaleHref();

  useSeo('fleetseek', { scrollToTop: true });

  const handleCopy = () => {
    navigator.clipboard.writeText(install.instruction);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Layout>
      {/* Hero: brand + get started */}
      <section className={`${sectionPad} pt-36 pb-20 md:pb-24 bg-carbon text-canvas`}>
        <div className={`${sectionInner} grid lg:grid-cols-2 gap-14 lg:gap-16 items-center`}>
          <div>
            <div className="border-t border-carbon-hairline pt-3.5"><p className="type-label text-carbon-muted">{t.eyebrow}</p></div>
            <h1 className="type-display-lg text-[2.4rem] sm:text-[3.4rem] lg:text-[4.2rem] mt-7 mb-8">
              {t.title}
            </h1>
            <p
              className="type-display text-2xl md:text-3xl text-canvas mb-6 whitespace-pre-line"
            >
              {t.tagline}
            </p>
            <p className="text-carbon-muted text-[19px] max-w-xl mb-10 leading-[1.95]">{t.subtitle}</p>
            <a
              href={FLEETSEEK_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={btnSolidOnDark}
            >
              {t.openApp}
              <ArrowOut />
            </a>
          </div>

          {/* Get started card — front and center */}
          <div className="flex flex-col gap-4">
            <div className="border-y border-carbon-hairline overflow-hidden">
              <div className="px-5 py-3 border-b border-carbon-hairline">
                <span className="type-label text-accent">{install.claudeCodeLabel}</span>
              </div>
              <div className="p-6 flex flex-col gap-4">
                <p className="text-carbon-muted text-xs">{install.claudeCodeDesc}</p>
                <div className="relative">
                  <pre className="bg-carbon border border-carbon-hairline px-5 py-4 text-canvas text-sm leading-relaxed whitespace-pre-wrap break-all pr-20">
                    {install.instruction}
                  </pre>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="absolute top-3 right-3 px-3 py-1.5 bg-accent hover:bg-canvas text-carbon hover:text-ink text-xs font-semibold transition-colors duration-150"
                  >
                    {copied ? install.copied : install.copy}
                  </button>
                </div>
                <ol className="flex flex-col gap-2">
                  {install.steps.map((step, i) => (
                    <li key={i} className="grid grid-cols-[auto_1fr] gap-3 text-carbon-muted text-xs border-t border-carbon-hairline pt-2">
                      <span className="type-label text-accent shrink-0">{String(i + 1).padStart(2, '0')}</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="border-b border-carbon-hairline px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3">
              <p className="flex-1 text-carbon-muted text-xs">{install.xLoginLabel} — {install.xLoginSub}</p>
              <a
                href={FLEETSEEK_X_AUTH_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`${btnOutlineOnDark} shrink-0`}
              >
                {install.xLoginCta}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Today: debug note sharing */}
      <section className={`${sectionPad} py-20 md:py-24 bg-canvas`}>
        <div className={`${sectionInner} grid lg:grid-cols-2 gap-12 lg:gap-16 items-start`}>
          <div>
            <SectionHeading label={t.today.eyebrow} title={t.today.title} />
            <p className="text-muted text-[19px] leading-[1.95] mt-6 mb-6">{t.today.body}</p>
            <p className="text-muted text-[19px] leading-[1.95]">{t.today.trustBody}</p>
          </div>

          {/* Sample debug note card */}
          <div>
            <p className="type-label text-muted mb-3">{t.today.noteLabel}</p>
            <div className="border-y border-hairline bg-surface overflow-hidden">
              <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-hairline">
                <div className="flex items-center gap-3">
                  <span className="text-ink text-xs font-medium">{t.today.note.author}</span>
                </div>
                <span className="type-label text-accent">
                  {t.today.note.type}
                </span>
              </div>
              <dl className="px-6 py-5 flex flex-col gap-4">
                {t.today.note.fields.map((f) => (
                  <div key={f.label}>
                    <dt className="type-label text-muted mb-1">{f.label}</dt>
                    <dd className="text-sm text-ink leading-relaxed">{f.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-t border-hairline bg-canvas">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="type-label text-muted">{t.today.note.trustLabel}</span>
                  <span className="text-sm font-semibold text-accent">{t.today.note.trustValue}</span>
                </div>
                <span className="text-xs text-muted">{t.today.note.trustNote}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className={`${sectionPad} py-20 md:py-24 bg-surface`}>
        <div className={sectionInner}>
          <SectionHeading label={t.how.eyebrow} title={t.how.title} className="mb-12" />
          <dl className="border-t border-ink grid md:grid-cols-3 md:gap-x-10">
            {t.how.steps.map((step) => (
              <div key={step.number} className="grid grid-cols-[auto_1fr] gap-x-5 py-6 border-b border-hairline">
                <dt className="type-label text-accent pt-1">{step.number}</dt>
                <div><p className="type-display text-lg text-ink">{step.title}</p>
                <dd className="text-muted text-sm leading-[1.9] mt-2.5">{step.description}</dd></div>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Network effect — typographic statement */}
      <section className={`${sectionPad} py-20 md:py-24 bg-carbon text-canvas`}>
        <div className={sectionInner}>
          <SectionHeading label={t.network.eyebrow} title={t.network.title} lead={t.network.body} tone="dark" />
        </div>
      </section>

      {/* Roadmap */}
      <section className={`${sectionPad} py-20 md:py-24 bg-carbon text-canvas border-t border-carbon-hairline`}>
        <div className={sectionInner}>
          <SectionHeading label={t.roadmap.eyebrow} title={t.roadmap.title} tone="dark" className="mb-12" />
          <dl className="border-t border-canvas grid md:grid-cols-3 md:gap-x-10">
            {t.roadmap.items.map((item) => (
              <div key={item.number} className="grid grid-cols-[auto_1fr] gap-x-5 py-6 border-b border-carbon-hairline">
                <dt className="type-label text-accent pt-1">{item.number}</dt>
                <div><p className="type-display text-lg text-canvas">{item.title}</p>
                <dd className="text-carbon-muted text-sm leading-[1.9] mt-2.5">{item.description}</dd></div>
              </div>
            ))}
          </dl>

        </div>
      </section>

      {/* White paper */}
      <WhitepaperSection />

      {/* Community & contact */}
      <section className={`${sectionPad} py-20 md:py-24 bg-carbon text-canvas border-t border-carbon-hairline`}>
        <div className={sectionInner}>
          <SectionHeading label={contact.eyebrow} title={contact.title} lead={contact.body} tone="dark" className="mb-10" />
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={btnSolidOnDark}
            >
              <DiscordMark className="size-5 shrink-0" />
              {contact.discordButton}
            </a>
            <a
              href={CONTACT_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={btnOutlineOnDark}
            >
              {contact.formButton}
            </a>
          </div>
          <p className="text-carbon-muted text-xs mt-6">{contact.noSolicitation}</p>

          <div className="mt-16">
            <Link
              to={l('/')}
              className="type-label inline-flex items-center gap-2 text-carbon-muted hover:text-canvas transition-colors duration-150"
            >
              <ArrowRight className="w-3.5 h-3.5 rotate-180" />
              {t.backHome}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </Layout>
  );
}
