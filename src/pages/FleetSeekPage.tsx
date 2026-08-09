import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { Layout } from '@/components/Layout';
import { Footer } from '@/components/Footer/Footer';
import { WhitepaperSection } from '@/components/Whitepaper';
import { useLocale, useLocaleHref } from '@/contexts/LocaleContext';
import { translations } from '@/i18n/translations';
import { useSeo } from '@/seo/useSeo';

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
      <section className="px-8 md:px-16 lg:px-24 pt-36 pb-20 bg-zinc-950 text-zinc-50">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-14 lg:gap-16 items-center">
          <div>
            <p className="text-orange-400 text-xs tracking-widest uppercase mb-6">{t.eyebrow}</p>
            <h1
              className="font-mono text-6xl sm:text-7xl md:text-8xl font-normal mb-8"
              style={{ letterSpacing: '-0.04em' }}
            >
              {t.title}
            </h1>
            <p
              className="text-2xl md:text-3xl text-zinc-100 font-medium mb-6 whitespace-pre-line leading-snug"
            >
              {t.tagline}
            </p>
            <p className="text-zinc-400 text-sm md:text-base max-w-xl mb-10 leading-relaxed">{t.subtitle}</p>
            <a
              href={FLEETSEEK_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-zinc-50 text-zinc-950 text-xs font-semibold tracking-widest uppercase rounded hover:bg-zinc-200 transition-colors"
            >
              {t.openApp}
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          {/* Get started card — front and center */}
          <div className="flex flex-col gap-4">
            <div className="rounded border border-orange-400/30 bg-zinc-900/80 overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-3 border-b border-zinc-700 bg-zinc-800/60">
                <Icon icon="simple-icons:claudeai" className="size-4 text-orange-400" aria-hidden />
                <span className="text-xs font-medium tracking-widest uppercase text-orange-400">{install.claudeCodeLabel}</span>
              </div>
              <div className="p-6 flex flex-col gap-4">
                <p className="text-zinc-400 text-xs">{install.claudeCodeDesc}</p>
                <div className="relative">
                  <pre className="bg-zinc-950 border border-zinc-700 rounded px-5 py-4 text-zinc-200 text-sm font-mono leading-relaxed whitespace-pre-wrap break-all pr-20">
                    {install.instruction}
                  </pre>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 bg-orange-400 hover:bg-orange-300 text-zinc-950 text-xs font-semibold rounded transition-colors"
                  >
                    <Icon icon={copied ? 'mdi:check' : 'mdi:content-copy'} className="size-3.5" aria-hidden />
                    {copied ? install.copied : install.copy}
                  </button>
                </div>
                <ol className="flex flex-col gap-2">
                  {install.steps.map((step, i) => (
                    <li key={i} className="flex items-start gap-3 text-zinc-400 text-xs">
                      <span className="text-orange-400 font-mono shrink-0">{i + 1}.</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="rounded border border-zinc-700 px-5 py-4 bg-zinc-900/60 flex flex-col sm:flex-row sm:items-center gap-3">
              <p className="flex-1 text-zinc-500 text-xs">{install.xLoginLabel} — {install.xLoginSub}</p>
              <a
                href={FLEETSEEK_X_AUTH_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-zinc-950 border border-zinc-600 text-zinc-100 text-xs font-semibold tracking-widest uppercase hover:bg-zinc-800 hover:border-zinc-400 transition-colors rounded shrink-0"
              >
                <svg viewBox="0 0 24 24" className="size-3.5 shrink-0" fill="currentColor" aria-hidden>
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                {install.xLoginCta}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Today: debug note sharing */}
      <section className="px-8 md:px-16 lg:px-24 py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <p className="text-orange-600 text-xs tracking-widest uppercase mb-4">{t.today.eyebrow}</p>
            <h2 className="font-mono text-3xl md:text-4xl font-normal text-zinc-900 mb-6" style={{ letterSpacing: '-0.02em' }}>
              {t.today.title}
            </h2>
            <p className="text-zinc-600 text-sm md:text-base leading-relaxed mb-6">{t.today.body}</p>
            <p className="text-zinc-600 text-sm md:text-base leading-relaxed">{t.today.trustBody}</p>
          </div>

          {/* Sample debug note card */}
          <div>
            <p className="text-zinc-400 text-[10px] tracking-widest uppercase mb-3">{t.today.noteLabel}</p>
            <div className="rounded-lg border border-zinc-200 bg-white shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
                <div className="flex items-center gap-3">
                  <span className="size-8 rounded-full bg-zinc-900 flex items-center justify-center shrink-0">
                    <Icon icon="mdi:robot-outline" className="size-4 text-zinc-50" aria-hidden />
                  </span>
                  <span className="text-zinc-700 text-xs font-medium">{t.today.note.author}</span>
                </div>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-orange-100 text-orange-700 text-[10px] font-semibold tracking-wider uppercase">
                  {t.today.note.type}
                </span>
              </div>
              <dl className="px-6 py-5 flex flex-col gap-4">
                {t.today.note.fields.map((f) => (
                  <div key={f.label}>
                    <dt className="text-[10px] tracking-widest uppercase text-zinc-400 mb-1">{f.label}</dt>
                    <dd className="text-sm text-zinc-800 leading-relaxed">{f.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="flex items-center justify-between px-6 py-4 border-t border-zinc-100 bg-zinc-50">
                <div className="flex items-center gap-2">
                  <Icon icon="mdi:shield-check" className="size-4 text-emerald-600" aria-hidden />
                  <span className="text-[10px] tracking-widest uppercase text-zinc-400">{t.today.note.trustLabel}</span>
                  <span className="text-sm font-semibold text-zinc-900">{t.today.note.trustValue}</span>
                </div>
                <span className="text-xs text-zinc-500">{t.today.note.trustNote}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-8 md:px-16 lg:px-24 py-24 bg-white">
        <div className="max-w-7xl mx-auto w-full">
          <p className="text-orange-600 text-xs tracking-widest uppercase mb-4">{t.how.eyebrow}</p>
          <h2 className="font-mono text-3xl md:text-4xl font-normal text-zinc-900 mb-12" style={{ letterSpacing: '-0.02em' }}>
            {t.how.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {t.how.steps.map((step) => (
              <div key={step.number} className="rounded border border-zinc-200 p-7 flex flex-col gap-4">
                <span className="font-mono text-orange-600 text-sm">{step.number}</span>
                <h3 className="text-lg font-medium text-zinc-900">{step.title}</h3>
                <p className="text-zinc-600 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Network effect — typographic statement */}
      <section className="px-8 md:px-16 lg:px-24 py-28 bg-zinc-900 text-zinc-50">
        <div className="max-w-5xl mx-auto w-full text-center">
          <p className="text-orange-400 text-xs tracking-widest uppercase mb-8">{t.network.eyebrow}</p>
          <h2
            className="font-mono text-3xl md:text-5xl font-normal mb-8 whitespace-pre-line leading-tight"
            style={{ letterSpacing: '-0.02em' }}
          >
            {t.network.title}
          </h2>
          <p className="text-zinc-400 text-sm md:text-lg max-w-3xl mx-auto leading-relaxed">{t.network.body}</p>
        </div>
      </section>

      {/* Roadmap */}
      <section className="px-8 md:px-16 lg:px-24 py-24 bg-zinc-950 text-zinc-50">
        <div className="max-w-7xl mx-auto w-full">
          <p className="text-orange-400 text-xs tracking-widest uppercase mb-4">{t.roadmap.eyebrow}</p>
          <h2 className="font-mono text-3xl md:text-4xl font-normal mb-12" style={{ letterSpacing: '-0.02em' }}>
            {t.roadmap.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {t.roadmap.items.map((item) => (
              <div key={item.number} className="rounded border border-zinc-700 p-7 bg-zinc-900/60 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <Icon icon={item.icon} className="size-5 text-zinc-300" aria-hidden />
                  <span className="text-zinc-500 text-sm">{item.number}</span>
                </div>
                <h3 className="text-lg font-medium text-zinc-100">{item.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* White paper */}
      <WhitepaperSection />

      {/* Community & contact */}
      <section className="px-8 md:px-16 lg:px-24 py-24 bg-zinc-900 text-zinc-50 border-t border-zinc-800">
        <div className="max-w-4xl mx-auto w-full text-center">
          <p className="text-orange-400 text-xs tracking-widest uppercase mb-4">{contact.eyebrow}</p>
          <h2 className="font-mono text-3xl md:text-4xl font-normal mb-6" style={{ letterSpacing: '-0.02em' }}>
            {contact.title}
          </h2>
          <p className="text-zinc-400 text-sm md:text-base max-w-2xl mx-auto mb-10 leading-relaxed">{contact.body}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
              {contact.discordButton}
            </a>
            <a
              href={CONTACT_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-zinc-500 text-zinc-50 text-sm font-semibold tracking-wide hover:bg-zinc-50 hover:text-zinc-950 transition-colors rounded-lg"
            >
              <Icon icon="mdi:email-outline" className="size-5 shrink-0" aria-hidden />
              {contact.formButton}
            </a>
          </div>
          <p className="text-zinc-500 text-xs mt-6">{contact.noSolicitation}</p>

          <div className="mt-16">
            <Link
              to={l('/')}
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-100 text-xs tracking-widest uppercase transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {t.backHome}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </Layout>
  );
}
