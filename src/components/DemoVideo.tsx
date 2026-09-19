import { useLocale } from '@/contexts/LocaleContext';
import { translations } from '@/i18n/translations';
import { SectionHeading, sectionPad, sectionInner } from './ui';

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
    <section className={`${sectionPad} py-20 md:py-24 bg-carbon`}>
      <div className={sectionInner}>
        <SectionHeading label={t.eyebrow} title={t.title} tone="dark" className="mb-12" />

        <div className="aspect-video bg-black relative overflow-hidden">
          {showPlaceholder ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-left">
                <p className="text-carbon-muted mb-3">{t.placeholder}</p>
                <p className="text-carbon-muted/70 text-sm">{t.placeholderHint}</p>
              </div>
            </div>
          ) : (
            <iframe
              src={videoUrl}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              title="Demo video"
            />
          )}
        </div>
      </div>
    </section>
  );
}
