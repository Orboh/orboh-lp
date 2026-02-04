import { useLocale } from '@/contexts/LocaleContext';
import { translations } from '@/i18n/translations';

// Autoplay, muted (browser policy), no visible controls/branding, and loop
const DEFAULT_VIDEO_URL =
  'https://www.youtube.com/embed/uVcBa6NXAbk?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&fs=0&disablekb=1&loop=1&playlist=uVcBa6NXAbk';

interface DemoVideoSectionProps {
  videoUrl?: string;
  showPlaceholder?: boolean;
}

export function DemoVideoSection({
  videoUrl = DEFAULT_VIDEO_URL,
  showPlaceholder = false,
}: DemoVideoSectionProps) {
  const { locale } = useLocale();
  const t = translations[locale].demoVideo;

  return (
    <section className="px-8 md:px-16 lg:px-24 py-24 bg-stone-800">
      <div className="max-w-7xl mx-auto w-full">
        <p className="text-stone-500 text-sm tracking-widest mb-4">
          {t.eyebrow}
        </p>
        <h2
          className="text-3xl md:text-4xl font-light text-stone-100 mb-12"
          style={{ letterSpacing: '-0.01em' }}
        >
          {t.title}
        </h2>

        <div className="aspect-video bg-stone-900 relative overflow-hidden rounded-2xl">
          {showPlaceholder ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-stone-500 mb-4">{t.placeholder}</p>
                <p className="text-stone-600 text-sm">{t.placeholderHint}</p>
              </div>
            </div>
          ) : (
            <iframe
              src={videoUrl}
              className="absolute inset-0 w-full h-full pointer-events-none"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Demo video"
            />
          )}
        </div>
      </div>
    </section>
  );
}
