import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Footer } from '@/components/Footer/Footer';
import { useLocale } from '@/contexts/LocaleContext';
import { translations } from '@/i18n/translations';

import heroGroup from '@/assets/hht/hero-group.webp';
import teleopVr from '@/assets/hht/teleop-vr.webp';
import floor from '@/assets/hht/floor.webp';
import team from '@/assets/hht/team.webp';
import robotDemo from '@/assets/hht/robot-demo.webp';
import audience from '@/assets/hht/audience.webp';
import judge from '@/assets/hht/judge.webp';
import humanoid from '@/assets/hht/humanoid.webp';
import quadruped from '@/assets/hht/quadruped.webp';

const DISCORD_URL = 'https://discord.gg/fDAWmeTV6f';

// Event pages per edition (index-aligned with translations.humanoidHack.editions)
const EDITION_URLS = ['https://luma.com/rqy67zpa', 'https://luma.com/m8k94z4o'];
const PRESS_URLS: (string | null)[] = [
  null,
  'https://prtimes.jp/main/html/rd/p/000000001.000187244.html',
];
const EDITION_IMAGES = [teleopVr, floor];

const GALLERY = [
  { src: team, alt: 'Team with a Unitree G1 at Humanoid Hack Tokyo' },
  { src: robotDemo, alt: 'GMO humanoid performing a live demo' },
  { src: audience, alt: 'Participants watching demos on Day 2' },
  { src: humanoid, alt: 'GMO humanoid robot on stand' },
  { src: judge, alt: 'A speaker presenting during judging' },
  { src: quadruped, alt: 'Unitree quadruped robot on the lab floor' },
];

export function HumanoidHackPage() {
  const { locale } = useLocale();
  const t = translations[locale].humanoidHack;

  useEffect(() => {
    const prev = document.title;
    document.title = 'Humanoid Hack Tokyo — Orboh';
    window.scrollTo(0, 0);
    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[88vh] flex items-end overflow-hidden bg-zinc-950">
        <img
          src={heroGroup}
          alt="Humanoid Hack Tokyo group photo"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-zinc-950/30" />
        <div className="relative z-10 w-full px-8 md:px-16 lg:px-24 pb-16 pt-32">
          <div className="max-w-7xl mx-auto w-full">
            <p className="text-orange-400 text-xs tracking-widest uppercase mb-5">
              {t.eyebrow}
            </p>
            <h1
              className="font-mono text-4xl sm:text-5xl md:text-6xl font-normal text-zinc-50 mb-6"
              style={{ letterSpacing: '-0.02em' }}
            >
              {t.title}
            </h1>
            <p className="text-zinc-300 text-base md:text-lg max-w-2xl mb-8">
              {t.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={EDITION_URLS[1]}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-zinc-50 text-zinc-950 text-xs font-semibold tracking-widest uppercase rounded hover:bg-zinc-200 transition-colors"
              >
                {t.register}
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold tracking-widest uppercase text-white rounded transition-all hover:scale-105"
                style={{ backgroundColor: '#5865F2' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 shrink-0" aria-hidden>
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.042.033.055a19.83 19.83 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.07 13.07 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
                {t.joinDiscord}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="px-8 md:px-16 lg:px-24 py-20 bg-zinc-50">
        <div className="max-w-3xl mx-auto w-full">
          <p className="text-zinc-700 text-lg md:text-xl leading-relaxed">
            {t.intro}
          </p>
        </div>
      </section>

      {/* Editions */}
      {t.editions.map((edition, i) => {
        const dark = i % 2 === 1;
        const image = EDITION_IMAGES[i] ?? EDITION_IMAGES[0];
        const url = EDITION_URLS[i] ?? EDITION_URLS[0];
        return (
          <section
            key={edition.name + i}
            className={`px-8 md:px-16 lg:px-24 py-24 ${dark ? 'bg-zinc-900' : 'bg-white'}`}
          >
            <div className="max-w-7xl mx-auto w-full">
              <div
                className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
                  i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
                }`}
              >
                {/* Image */}
                <div className="relative overflow-hidden rounded-lg aspect-[4/3] bg-zinc-800">
                  <img src={image} alt={edition.name} className="absolute inset-0 w-full h-full object-cover" />
                </div>

                {/* Content */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`text-xs tracking-widest uppercase ${dark ? 'text-orange-400' : 'text-orange-600'}`}>
                      {edition.tag}
                    </span>
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase ${
                        dark ? 'bg-orange-500/15 text-orange-300' : 'bg-zinc-900 text-zinc-50'
                      }`}
                    >
                      {edition.status}
                    </span>
                  </div>
                  <h2
                    className={`font-mono text-3xl md:text-4xl font-normal mb-4 ${dark ? 'text-zinc-50' : 'text-zinc-900'}`}
                    style={{ letterSpacing: '-0.01em' }}
                  >
                    {edition.name}
                  </h2>
                  <p className={`text-sm md:text-base mb-8 ${dark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    {edition.lead}
                  </p>

                  {/* Facts */}
                  <dl className={`grid grid-cols-2 gap-x-6 gap-y-4 mb-8 border-t pt-6 ${dark ? 'border-zinc-700' : 'border-zinc-200'}`}>
                    {edition.facts.map((f) => (
                      <div key={f.label}>
                        <dt className={`text-[10px] tracking-widest uppercase mb-1 ${dark ? 'text-zinc-500' : 'text-zinc-400'}`}>
                          {f.label}
                        </dt>
                        <dd className={`text-sm font-medium ${dark ? 'text-zinc-100' : 'text-zinc-900'}`}>
                          {f.value}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  {/* Highlights */}
                  <ul className="space-y-2 mb-6">
                    {edition.highlights.map((h) => (
                      <li key={h} className={`flex items-start gap-2.5 text-sm ${dark ? 'text-zinc-300' : 'text-zinc-700'}`}>
                        <span className="mt-1.5 size-1.5 rounded-full bg-orange-500 shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <p className={`text-xs mb-8 ${dark ? 'text-zinc-500' : 'text-zinc-500'}`}>
                    <span className="uppercase tracking-widest mr-2">{t.partnersLabel}</span>
                    {edition.partners}
                  </p>

                  <div className="flex flex-wrap items-center gap-4">
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium tracking-widest uppercase rounded transition-colors ${
                        dark
                          ? 'bg-zinc-50 text-zinc-950 hover:bg-zinc-200'
                          : 'border border-zinc-800 text-zinc-900 hover:bg-zinc-900 hover:text-zinc-50'
                      }`}
                    >
                      {t.register}
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                    {PRESS_URLS[i] && (
                      <a
                        href={PRESS_URLS[i] ?? undefined}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase transition-colors ${
                          dark ? 'text-orange-400 hover:text-orange-300' : 'text-orange-600 hover:text-orange-700'
                        }`}
                      >
                        {t.pressLabel}
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Gallery */}
      <section className="px-8 md:px-16 lg:px-24 py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto w-full">
          <p className="text-orange-400 text-xs tracking-widest uppercase mb-4">{t.galleryLabel}</p>
          <h2 className="font-mono text-2xl md:text-3xl font-normal text-zinc-100 mb-3" style={{ letterSpacing: '-0.01em' }}>
            {t.galleryNote}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mt-10">
            {GALLERY.map((g) => (
              <div key={g.alt} className="relative overflow-hidden rounded-lg aspect-[4/3] bg-zinc-800 group">
                <img
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              to="/"
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
