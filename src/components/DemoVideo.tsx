import { useLocale } from '@/contexts/LocaleContext';
import { translations } from '@/i18n/translations';
import { SectionHeading, sectionPad, sectionInner } from './ui';

// Autoplay, muted, and without the Loom top bar so the frame is all video.
const DEFAULT_VIDEO_URL =
  'https://www.loom.com/embed/d99c9192aa50466f881a330a0813f732?autoplay=1&muted=true&hideEmbedTopBar=true&hide_owner=true&hide_share=true&hide_title=true';

// Okra harvest, shot in the field on 2026-09-19.
const OKRA_CLIP_SRC = '/okra-harvest-2026-09.mp4';
const OKRA_CLIP_POSTER = '/okra-harvest-poster.jpg';

// The two clips sit side by side at equal height: flex-grow is set to each
// clip's aspect ratio, so the widths come out proportional and the heights match.
// Loom's oembed reports a 4:3 canvas, but the recording itself is portrait
// (the thumbnail is 576x1024) — a 4:3 frame pillarboxes it with black bars.
const SEALING_ASPECT = 9 / 16;
const OKRA_ASPECT = 16 / 9;

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
    <section className={`${sectionPad} py-20 md:py-24 bg-carbon border-b border-carbon-hairline`}>
      <div className="w-full">
        {/* The heading stays on the page's 1200px grid like every other section;
            only the media below it breaks out to the full padded width. */}
        <div className={sectionInner}>
          <SectionHeading label={t.eyebrow} title={t.title} tone="dark" className="mb-12" />
        </div>

        <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-4 lg:gap-6">
          <figure
            className="m-0 min-w-0 w-full md:w-auto md:basis-0"
            style={{ flexGrow: SEALING_ASPECT }}
          >
            <div className="flex items-baseline justify-between gap-4 border-t border-carbon-hairline py-3">
              <p className="type-label text-accent">01</p>
              <p className="type-label text-carbon-muted text-right">{t.clips.sealingField}</p>
            </div>
            <div
              className="relative overflow-hidden bg-carbon w-full"
              style={{ aspectRatio: String(SEALING_ASPECT) }}
            >
              {showPlaceholder ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-left">
                    <p className="text-carbon-muted mb-3">{t.placeholder}</p>
                    <p className="text-carbon-muted text-sm">{t.placeholderHint}</p>
                  </div>
                </div>
              ) : (
                <iframe
                  src={videoUrl}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  title={t.clips.sealing}
                />
              )}
            </div>
            <figcaption className="border-b border-carbon-hairline py-3 text-[17px] leading-relaxed text-canvas">
              {t.clips.sealing}
            </figcaption>
          </figure>

          <figure
            className="m-0 min-w-0 w-full md:w-auto md:basis-0"
            style={{ flexGrow: OKRA_ASPECT }}
          >
            <div className="flex items-baseline justify-between gap-4 border-t border-carbon-hairline py-3">
              <p className="type-label text-accent">02</p>
              <p className="type-label text-carbon-muted text-right">{t.clips.okraField}</p>
            </div>
            <video
              src={OKRA_CLIP_SRC}
              poster={OKRA_CLIP_POSTER}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="block w-full bg-carbon object-cover"
              style={{ aspectRatio: String(OKRA_ASPECT) }}
            />
            <figcaption className="border-b border-carbon-hairline py-3 text-[17px] leading-relaxed text-canvas">
              {t.clips.okra}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
