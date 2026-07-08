import { Link } from 'react-router-dom';
import { useLocale } from '@/contexts/LocaleContext';
import { translations } from '@/i18n/translations';
import heroGroup from '@/assets/hht/hero-group.webp';

export function HumanoidHackPromoSection() {
  const { locale } = useLocale();
  const t = translations[locale].humanoidHackPromo;

  return (
    <section className="relative px-8 md:px-16 lg:px-24 py-24 overflow-hidden bg-zinc-950 text-zinc-50">
      <img
        src={heroGroup}
        alt="Humanoid Hack Tokyo"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-zinc-950/40" />
      <div className="relative z-10 max-w-7xl mx-auto w-full text-center">
        <p className="text-orange-400 text-xs tracking-widest uppercase mb-4">{t.eyebrow}</p>
        <h2
          className="font-mono text-3xl md:text-4xl font-normal mb-5"
          style={{ letterSpacing: '-0.02em' }}
        >
          {t.title}
        </h2>
        <p className="text-zinc-300 text-sm md:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
          {t.subtitle}
        </p>
        <Link
          to="/humanoidhack"
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-zinc-50 text-zinc-900 text-xs font-medium tracking-widest uppercase hover:bg-orange-400 hover:text-zinc-950 transition-colors rounded"
        >
          {t.cta}
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
