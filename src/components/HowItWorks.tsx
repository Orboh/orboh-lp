import { useLocale } from '@/contexts/LocaleContext';
import { translations } from '@/i18n/translations';

const TELEOP_VIDEO_URL =
  'https://www.youtube.com/embed/pNjr2f_XHoo?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&fs=0&disablekb=1&loop=1&playlist=pNjr2f_XHoo';

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

          {/* Right: embedded teleoperation video, frameless inside its border */}
          <div className="border border-stone-300 md:border md:rounded-2xl overflow-hidden">
            <div className="relative w-full aspect-video">
              <iframe
                src={TELEOP_VIDEO_URL}
                className="absolute inset-0 w-full h-full pointer-events-none"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Teleoperation video"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
