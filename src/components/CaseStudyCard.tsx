import { Icon } from '@iconify/react';

export interface CaseStudyFeature {
  icon: string;
  title: string;
  description: string;
}

export interface CaseStudyCardProps {
  number: string;
  title: string;
  quote: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  features: readonly CaseStudyFeature[];
  /** Whether this card is the active (top) card in the stack */
  isActive?: boolean;
  /** Direction the card should animate from when changing */
  transitionDirection?: 'up' | 'down' | null;
}

export function CaseStudyCard({
  number,
  title,
  description,
  imageSrc,
  imageAlt,
  features,
  isActive = false,
  transitionDirection = null,
  quote: _quote,
}: CaseStudyCardProps) {
  const directionClass =
    transitionDirection === 'up'
      ? 'animate-card-up'
      : transitionDirection === 'down'
        ? 'animate-card-down'
        : '';

  return (
    <article
      className={`group rounded overflow-hidden bg-zinc-800 transition-all duration-300 ${directionClass} ${
        isActive ? 'z-10 ring-1 ring-zinc-700' : 'z-0 opacity-95 scale-[0.99]'
      }`}
    >
      {/* Top section: image only; grayscale lifts on hover (desktop only) */}
      <div className="relative aspect-[21/9] w-full overflow-hidden p-4 bg-zinc-800">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="h-full w-full object-cover rounded md:grayscale md:group-hover:grayscale-0 transition-[filter] duration-300"
        />
        <div className="pointer-events-none absolute inset-4 rounded bg-black/40 mix-blend-multiply md:group-hover:opacity-0 transition-opacity duration-300 max-md:opacity-0" />
      </div>

      {/* Bottom section: heading, description, feature blocks */}
      <div className="pt-0 pb-8 md:pb-10 px-8 md:px-10 bg-zinc-800">
        <h3 className="font-mono text-xl md:text-2xl lg:text-3xl font-normal text-zinc-50 mb-4" style={{ letterSpacing: '-0.01em' }}>
          <span className="text-zinc-500 mr-2">{number}</span>
          {title}
        </h3>
        <p className="text-zinc-300 leading-relaxed mb-8 max-w-2xl">
          {description}
        </p>

        <div className="grid gap-6 sm:grid-cols-3">
          {features.map((feature, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-zinc-700 text-zinc-100">
                <Icon icon={feature.icon} className="size-5" aria-hidden />
              </div>
              <h4 className="font-medium text-zinc-50">{feature.title}</h4>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
