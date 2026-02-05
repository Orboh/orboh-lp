import { useLocale } from '@/contexts/LocaleContext';
import { translations } from '@/i18n/translations';

import teleoperationVideo from '@/assets/videos/teleoperation.mp4';

export function TeleoperationSection() {
  const { locale } = useLocale();
  const t = translations[locale].howItWorks;

  return (
    <section className="px-8 md:px-16 lg:px-24 py-24 bg-stone-200">
      <div className="max-w-7xl mx-auto w-full md:rounded-sm">
        <div className="grid md:grid-cols-2 gap-2">
          {/* Left: text content */}
          <div className="px-6 sm:px-8 lg:px-10 py-8 sm:py-10 lg:py-12 border border-stone-300 md:border md:rounded-3xl flex flex-col justify-end">
            <div>
              <p className="text-stone-500 text-xs sm:text-sm tracking-[0.22em] uppercase mb-4">
                {t.eyebrow}
              </p>
              <h2
                className="text-2xl sm:text-3xl md:text-4xl font-light text-stone-900 mb-4"
                style={{ letterSpacing: '-0.02em' }}
              >
                {t.title}
              </h2>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                {t.para}
              </p>
            </div>
          </div>

          {/* Right: teleoperation video (local) */}
          <div className="border border-stone-300 md:border md:rounded-2xl overflow-hidden">
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
              <video
                src={teleoperationVideo}
                className="absolute inset-0 h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                controls={false}
                aria-label="Teleoperation demo"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
