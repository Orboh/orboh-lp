import { Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Footer } from '@/components/Footer/Footer';
import { useLocale, useLocaleHref } from '@/contexts/LocaleContext';
import { translations } from '@/i18n/translations';
import { useSeo } from '@/seo/useSeo';
import { ArrowOut, ArrowRight, DiscordMark, SectionHeading, btnOutline, btnOutlineOnDark, btnSolid, btnSolidOnDark, sectionInner, sectionPad } from '@/components/ui';

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

// Series calendar on Luma — every edition, past and upcoming
const CALENDAR_URL = 'https://luma.com/humanoidhack';
// lt=light は Luma 埋め込みのライトテーマ。白背景のセクションに合わせる
const CALENDAR_EMBED_URL = 'https://lu.ma/embed/calendar/cal-JmAbxMIliBGO4XB/events?lt=light';

// Where each upcoming edition sends people (index-aligned with upcomingItems)
const UPCOMING_URLS = [CALENDAR_URL, 'https://luma.com/8lqlwh2x', 'https://luma.com/7mkzd6d4'];

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
  const l = useLocaleHref();
  const t = translations[locale].humanoidHack;

  useSeo('humanoidhack', { scrollToTop: true });

  return (
    <Layout>
      {/* Hero */}
      <section className={`relative min-h-[88vh] flex items-end overflow-hidden bg-carbon ${sectionPad}`}>
        <img
          src={heroGroup}
          alt="Humanoid Hack Tokyo group photo"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-carbon/72" />
        <div className={`relative z-10 w-full ${sectionInner} pb-16 pt-32`}>
            <div className="border-t border-canvas/25 pt-3.5"><p className="type-label text-carbon-muted">{t.eyebrow}</p></div>
            <h1 className="type-display-lg text-[2.4rem] sm:text-[3.4rem] lg:text-[4.2rem] text-canvas mt-7 mb-6">
              {t.title}
              <span className="block mt-3 text-lg sm:text-xl md:text-2xl text-carbon-muted">
                {t.titleSub}
              </span>
            </h1>
            <p className="text-carbon-muted text-[19px] leading-[1.95] max-w-2xl mb-8">
              {t.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={EDITION_URLS[1]}
                target="_blank"
                rel="noopener noreferrer"
                className={btnSolidOnDark}
              >
                {t.register}
                <ArrowOut />
              </a>
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={btnOutlineOnDark}
              >
                <DiscordMark />
                {t.joinDiscord}
              </a>
            </div>
        </div>
      </section>

      {/* Intro */}
      <section className={`${sectionPad} py-20 md:py-24 bg-canvas`}>
        <div className={sectionInner}>
          <p className="text-ink text-lg md:text-xl leading-[1.9] max-w-3xl">
            {t.intro}
          </p>
        </div>
      </section>

      {/* What a humanoid hackathon is — the page's topical body */}
      <section className={`${sectionPad} py-20 md:py-24 bg-surface border-t border-hairline`}>
        <div className={sectionInner}>
          <SectionHeading label={t.aboutLabel} title={t.aboutTitle} className="mb-8" />
          <div className="space-y-6">
            {t.aboutBody.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="text-muted text-sm md:text-base leading-[1.95] max-w-3xl">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming — Luma series calendar */}
      <section className={`${sectionPad} py-20 md:py-24 bg-surface border-t border-hairline`}>
        <div className={sectionInner}>
          <SectionHeading label={t.upcomingLabel} title={t.upcomingTitle} lead={t.upcomingNote} className="mb-10" />

          <p className="type-label text-muted mb-4">
            {t.upcomingItemsLabel}
          </p>
          <ul className="mb-14 border-t border-ink">
            {t.upcomingItems.map((item, i) => (
              <li
                key={item.name}
                className="flex flex-col gap-3 border-b border-hairline py-6 md:flex-row md:items-center md:justify-between md:gap-8"
              >
                <div>
                  <h3 className="type-display text-lg md:text-xl text-ink mb-1">
                    {item.name}
                  </h3>
                  <p className="text-ink text-sm">
                    {item.dates}
                    <span className="text-muted"> / </span>
                    {item.venue}
                  </p>
                  <p className="text-muted text-xs mt-1">{item.entry}</p>
                </div>
                <a
                  href={UPCOMING_URLS[i] ?? CALENDAR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${btnOutline} shrink-0 self-start md:self-auto`}
                >
                  {item.cta}
                  <ArrowOut />
                </a>
              </li>
            ))}
          </ul>

          <div className="overflow-hidden border border-hairline bg-canvas">
            <iframe
              src={CALENDAR_EMBED_URL}
              title="Humanoid Hack series calendar on Luma"
              loading="lazy"
              allowFullScreen
              className="block w-full h-[560px] md:h-[620px] border-0"
            />
          </div>

          <div className="mt-8">
            <a
              href={CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={btnSolid}
            >
              {t.calendarCta}
              <ArrowOut />
            </a>
          </div>
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
            className={`${sectionPad} py-20 md:py-24 ${dark ? 'bg-carbon text-canvas' : 'bg-surface'}`}
          >
            <div className={sectionInner}>
              <div
                className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
                  i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
                }`}
              >
                {/* Image */}
                <div className="relative overflow-hidden aspect-[4/3] bg-hairline">
                  <img src={image} alt={edition.name} className="absolute inset-0 w-full h-full object-cover" />
                </div>

                {/* Content */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="type-label text-accent">
                      {edition.tag}
                    </span>
                    <span
                      className={`type-label ${dark ? 'text-carbon-muted' : 'text-muted'}`}
                    >
                      {edition.status}
                    </span>
                  </div>
                  <h2 className={`type-display text-[1.95rem] sm:text-[2.4rem] lg:text-[2.9rem] mb-4 ${dark ? 'text-canvas' : 'text-ink'}`}>
                    {edition.name}
                  </h2>
                  <p className={`text-sm md:text-base leading-[1.95] mb-8 ${dark ? 'text-carbon-muted' : 'text-muted'}`}>
                    {edition.lead}
                  </p>

                  {/* Facts */}
                  <dl className={`grid grid-cols-2 gap-x-6 gap-y-4 mb-8 border-t pt-6 ${dark ? 'border-carbon-hairline' : 'border-hairline'}`}>
                    {edition.facts.map((f) => (
                      <div key={f.label}>
                        <dt className={`type-label mb-1 ${dark ? 'text-carbon-muted' : 'text-muted'}`}>
                          {f.label}
                        </dt>
                        <dd className={`text-sm font-medium ${dark ? 'text-canvas' : 'text-ink'}`}>
                          {f.value}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  {/* Highlights */}
                  <ul className={`mb-6 border-t ${dark ? 'border-carbon-hairline' : 'border-hairline'}`}>
                    {edition.highlights.map((h, hi) => (
                      <li key={h} className={`grid grid-cols-[auto_1fr] gap-4 py-2.5 border-b text-sm ${dark ? 'text-carbon-muted border-carbon-hairline' : 'text-muted border-hairline'}`}>
                        <span className="type-label text-accent">{String(hi + 1).padStart(2, '0')}</span>{h}
                      </li>
                    ))}
                  </ul>

                  <p className={`text-xs mb-8 ${dark ? 'text-carbon-muted' : 'text-muted'}`}>
                    <span className="uppercase tracking-widest mr-2">{t.partnersLabel}</span>
                    {edition.partners}
                  </p>

                  <div className="flex flex-wrap items-center gap-4">
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={dark ? btnSolidOnDark : btnOutline}
                    >
                      {t.register}
                      <ArrowOut />
                    </a>
                    {PRESS_URLS[i] && (
                      <a
                        href={PRESS_URLS[i] ?? undefined}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`type-label inline-flex items-center gap-2 text-accent transition-colors duration-150 ${dark ? 'hover:text-canvas' : 'hover:text-ink'}`}
                      >
                        {t.pressLabel}
                        <ArrowOut />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* FAQ */}
      <section className={`${sectionPad} py-20 md:py-24 bg-canvas border-t border-hairline`}>
        <div className={sectionInner}>
          <SectionHeading label={t.faqLabel} title={t.faqTitle} className="mb-10" />
          <dl className="divide-y divide-hairline border-t border-ink max-w-3xl">
            {t.faq.map((item) => (
              <div key={item.q} className="py-6">
                <dt className="type-display text-ink text-base mb-2">{item.q}</dt>
                <dd className="text-muted text-sm md:text-base leading-relaxed">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Gallery */}
      <section className={`${sectionPad} py-20 md:py-24 bg-carbon text-canvas`}>
        <div className={sectionInner}>
          <SectionHeading label={t.galleryLabel} title={t.galleryNote} tone="dark" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mt-10">
            {GALLERY.map((g) => (
              <div key={g.alt} className="relative overflow-hidden aspect-[4/3] bg-carbon-hairline">
                <img
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          <div className="mt-14">
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
