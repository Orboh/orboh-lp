import { useLocale } from '@/contexts/LocaleContext';
import { translations } from '@/i18n/translations';

export function Footer() {
  const { locale } = useLocale();
  const t = translations[locale].footer;

  return (
    <footer className="px-8 md:px-16 lg:px-24 py-14 bg-stone-800 text-stone-400 text-sm">
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-10">
        <div className="flex flex-col md:flex-row md:items-start gap-10 md:gap-16">
          <div className="flex-1">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-block text-2xl font-bold text-stone-200 transition-colors mb-3"
            >
              Orboh
            </button>
            <p className="text-stone-500 max-w-sm">
              {t.tagline}
            </p>
          </div>

          <nav className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
            <div>
              <h3 className="text-stone-300 font-medium mb-3">
                {t.columns.company.title}
              </h3>
              <ul className="space-y-2">
                {t.columns.company.links.map((label) => (
                  <li key={label}>
                    <button
                      type="button"
                      className="text-stone-500 hover:text-stone-200 transition-colors"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-stone-300 font-medium mb-3">
                {t.columns.social.title}
              </h3>
              <ul className="space-y-2">
                {t.columns.social.links.map((label) => (
                  <li key={label}>
                    <a
                      href="#"
                      className="text-stone-500 hover:text-stone-200 transition-colors"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-stone-300 font-medium mb-3">
                {t.columns.legal.title}
              </h3>
              <ul className="space-y-2">
                {t.columns.legal.links.map((label) => (
                  <li key={label}>
                    <a
                      href="#"
                      className="text-stone-500 hover:text-stone-200 transition-colors"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        <div className="border-t border-stone-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-stone-600 text-xs sm:text-sm">
            {t.copyright}
          </p>
          <p className="text-stone-600 text-xs sm:text-sm">
            Built with humanoid robotics in mind.
          </p>
        </div>
      </div>
    </footer>
  );
}
