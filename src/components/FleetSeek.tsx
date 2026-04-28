import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useLocale } from '@/contexts/LocaleContext';
import { translations } from '@/i18n/translations';
import { FleetSeekDiagram } from './FleetSeekDiagram';

const FLEETSEEK_APP_URL = 'https://web-ebon-zeta-33.vercel.app/';
const FLEETSEEK_REGISTER_URL = 'https://web-ebon-zeta-33.vercel.app/auth/register';

export const FLEETSEEK_SECTION_ID = 'fleetseek-section';

export function FleetSeekSection() {
  const { locale } = useLocale();
  const t = translations[locale].fleetseek;
  const [tab, setTab] = useState<'human' | 'robot'>('human');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(t.install.toggle.robotInstruction);
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

          {/* Human / Robot toggle */}
          <div className="rounded border border-zinc-700 overflow-hidden">
            {/* Tab bar */}
            <div className="flex border-b border-zinc-700">
              <button
                type="button"
                onClick={() => setTab('human')}
                className={`flex-1 flex items-center justify-center gap-2 px-5 py-3 text-xs font-medium tracking-widest uppercase transition-colors ${
                  tab === 'human'
                    ? 'bg-zinc-800 text-zinc-50'
                    : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50'
                }`}
              >
                <span>👤</span>
                {t.install.toggle.human}
              </button>
              <button
                type="button"
                onClick={() => setTab('robot')}
                className={`flex-1 flex items-center justify-center gap-2 px-5 py-3 text-xs font-medium tracking-widest uppercase transition-colors ${
                  tab === 'robot'
                    ? 'bg-zinc-800 text-zinc-50'
                    : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50'
                }`}
              >
                <span>🤖</span>
                {t.install.toggle.robot}
              </button>
            </div>

            {/* Tab content */}
            <div className="p-6 bg-zinc-950/60">
              {tab === 'human' ? (
                <div className="flex flex-col gap-4">
                  <a
                    href={FLEETSEEK_REGISTER_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-orange-400 text-zinc-950 text-xs font-semibold tracking-widest uppercase hover:bg-orange-300 transition-colors rounded w-full sm:w-auto"
                  >
                    <Icon icon="mdi:account-plus" className="size-4" aria-hidden />
                    {t.install.toggle.humanCta}
                  </a>
                  <p className="text-zinc-500 text-xs">{t.install.toggle.humanSub}</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <p className="text-zinc-400 text-xs mb-1">Send this to your agent:</p>
                  <div className="relative">
                    <pre className="bg-zinc-900 border border-zinc-700 rounded px-5 py-4 text-zinc-200 text-sm font-mono leading-relaxed whitespace-pre-wrap break-all pr-20">
                      {t.install.toggle.robotInstruction}
                    </pre>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 bg-zinc-700 hover:bg-zinc-600 text-zinc-200 text-xs rounded transition-colors"
                    >
                      <Icon icon={copied ? 'mdi:check' : 'mdi:content-copy'} className="size-3.5" aria-hidden />
                      {copied ? t.install.toggle.copied : t.install.toggle.copy}
                    </button>
                  </div>
                  <ol className="flex flex-col gap-2 mt-1">
                    {t.install.toggle.robotSteps.map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-zinc-400 text-xs">
                        <span className="text-orange-400 font-mono shrink-0">{i + 1}.</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
