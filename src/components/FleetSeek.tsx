import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useLocale } from '@/contexts/LocaleContext';
import { translations } from '@/i18n/translations';
import { FleetSeekDiagram } from './FleetSeekDiagram';

const FLEETSEEK_APP_URL = 'https://web-ebon-zeta-33.vercel.app/';
const FLEETSEEK_X_AUTH_URL = 'https://web-ebon-zeta-33.vercel.app/api/auth/x';

export const FLEETSEEK_SECTION_ID = 'fleetseek-section';

export function FleetSeekSection() {
  const { locale } = useLocale();
  const t = translations[locale].fleetseek;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(t.install.instruction);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id={FLEETSEEK_SECTION_ID} className="px-8 md:px-16 lg:px-24 py-24 bg-zinc-900 text-zinc-50">
      <div className="max-w-7xl mx-auto w-full">
        <p className="text-orange-400 text-xs tracking-widest uppercase mb-4">{t.eyebrow}</p>
        <h2 className="font-mono text-3xl md:text-4xl font-normal mb-6 whitespace-pre-line" style={{ letterSpacing: '-0.02em' }}>
          {t.title}
        </h2>
        <p className="text-zinc-400 text-sm md:text-base max-w-2xl mb-5 leading-relaxed">{t.subtitle}</p>
        <blockquote className="border-l-2 border-zinc-700 pl-5 mb-14 text-zinc-400 text-sm italic max-w-2xl leading-relaxed">
          {t.analogy}
        </blockquote>

        {/* FleetSeek Diagram */}
        <div className="my-14">
          <FleetSeekDiagram />
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {t.layers.map((layer) => (
            <div key={layer.number} className="rounded border border-zinc-700 p-7 bg-zinc-950/60 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <Icon icon={layer.icon} className="size-5 text-zinc-300" aria-hidden />
                <span className="text-zinc-500 text-sm">{layer.number}</span>
              </div>
              <h3 className="text-lg font-medium text-zinc-100">{layer.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{layer.description}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-zinc-700 pt-8">
          <p className="text-orange-400 text-xs tracking-widest uppercase mb-5">{t.pricing.label}</p>
          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            {t.pricing.tiers.map((tier) => (
              <a
                key={tier.name}
                href={FLEETSEEK_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded border border-zinc-700 px-5 py-4 flex items-center justify-between hover:border-zinc-500 hover:bg-zinc-900 transition-colors"
              >
                <span className="text-zinc-100 font-medium text-sm">{tier.name}</span>
                <span className="text-zinc-500 text-xs">{tier.detail}</span>
              </a>
            ))}
          </div>

          {/* Claude Code integration — primary CTA */}
          <div className="rounded border border-orange-400/30 bg-zinc-950/60 overflow-hidden mb-4">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-zinc-700 bg-zinc-800/60">
              <Icon icon="simple-icons:claudeai" className="size-4 text-orange-400" aria-hidden />
              <span className="text-xs font-medium tracking-widest uppercase text-orange-400">{t.install.claudeCodeLabel}</span>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <p className="text-zinc-400 text-xs">{t.install.claudeCodeDesc}</p>
              <div className="relative">
                <pre className="bg-zinc-900 border border-zinc-700 rounded px-5 py-4 text-zinc-200 text-sm font-mono leading-relaxed whitespace-pre-wrap break-all pr-20">
                  {t.install.instruction}
                </pre>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 bg-orange-400 hover:bg-orange-300 text-zinc-950 text-xs font-semibold rounded transition-colors"
                >
                  <Icon icon={copied ? 'mdi:check' : 'mdi:content-copy'} className="size-3.5" aria-hidden />
                  {copied ? t.install.copied : t.install.copy}
                </button>
              </div>
              <ol className="flex flex-col gap-2">
                {t.install.steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-zinc-400 text-xs">
                    <span className="text-orange-400 font-mono shrink-0">{i + 1}.</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Secondary: Sign in with X */}
          <div className="rounded border border-zinc-700 p-5 bg-zinc-950/40 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <p className="text-zinc-400 text-xs font-medium uppercase tracking-widest mb-1">{t.install.xLoginLabel}</p>
              <p className="text-zinc-500 text-xs">{t.install.xLoginSub}</p>
            </div>
            <a
              href={FLEETSEEK_X_AUTH_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-zinc-950 border border-zinc-600 text-zinc-100 text-xs font-semibold tracking-widest uppercase hover:bg-zinc-800 hover:border-zinc-400 transition-colors rounded shrink-0"
            >
              <svg viewBox="0 0 24 24" className="size-3.5 shrink-0" fill="currentColor" aria-hidden>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              {t.install.xLoginCta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
